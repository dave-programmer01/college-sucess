import { jsPDF } from "jspdf";
import { levels, TOTAL_LEVELS } from "@/data/levels";

/**
 * Builds the "first-year checklist" PDF: every level ticked off, with its
 * takeaways and Lehman resource. Everything comes from src/data/levels.ts.
 * This file is only downloaded when the student presses the button.
 */

type Rgb = [number, number, number];
const BRAND: Rgb = [15, 118, 110];
const INK: Rgb = [17, 24, 39];
const MUTED: Rgb = [107, 114, 128];
const LINE: Rgb = [229, 231, 235];

const MARGIN = 54; // 0.75 inch
const INDENT = 24; // text sits to the right of the tick box

/**
 * The PDF's built-in font only has Western European characters; anything
 * else would come out blank, so swap the common ones and drop the rest.
 */
function pdfSafe(text: string) {
  return text
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/ /g, " ")
    .replace(/[^\x20-\x7E¡-ÿ]/g, "");
}

export function buildChecklist(completedOn: Date) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  let y = MARGIN;

  const startNewPageIfNeeded = (height: number) => {
    if (y + height <= pageHeight - MARGIN) return;
    doc.addPage();
    y = MARGIN;
  };

  type TextOptions = { size: number; bold?: boolean; italic?: boolean; color?: Rgb; indent?: number };

  /** Wraps text to the page width. Sets the font first, because wrapping depends on it. */
  const wrap = (text: string, { size, bold, italic, indent = 0 }: TextOptions): string[] => {
    doc.setFont("helvetica", bold ? "bold" : italic ? "italic" : "normal");
    doc.setFontSize(size);
    return doc.splitTextToSize(pdfSafe(text), contentWidth - indent);
  };

  const heightOf = (text: string, options: TextOptions) =>
    wrap(text, options).length * options.size * 1.4;

  /** Writes wrapped text at the current position and moves down past it. */
  const write = (text: string, options: TextOptions) => {
    const { size, color = INK, indent = 0 } = options;
    const lineHeight = size * 1.4;
    for (const line of wrap(text, options)) {
      startNewPageIfNeeded(lineHeight);
      doc.setTextColor(...color);
      doc.text(line, MARGIN + indent, y + size);
      y += lineHeight;
    }
  };

  const tickBox = (top: number) => {
    doc.setFillColor(...BRAND);
    doc.roundedRect(MARGIN, top, 14, 14, 3, 3, "F");
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.6);
    doc.line(MARGIN + 3.5, top + 7.5, MARGIN + 6, top + 10);
    doc.line(MARGIN + 6, top + 10, MARGIN + 10.5, top + 4.5);
  };

  // Header
  write("First Year, Level by Level", { size: 22, bold: true, color: BRAND });
  write("My first-year checklist · Lehman College", { size: 12, color: MUTED });
  y += 4;
  const date = completedOn.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const xp = levels.reduce((sum, level) => sum + level.xp, 0);
  write(`Completed on ${date} · ${TOTAL_LEVELS} of ${TOTAL_LEVELS} levels · ${xp} XP`, {
    size: 10,
    color: MUTED,
  });
  y += 10;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(1);
  doc.line(MARGIN, y, pageWidth - MARGIN, y);
  y += 18;

  // One block per level, kept together on a page where it fits
  const title: TextOptions = { size: 13, bold: true, indent: INDENT };
  const small: TextOptions = { size: 9.5, color: MUTED, indent: INDENT };
  const bullet: TextOptions = { size: 10.5, indent: INDENT + 12 };
  const resourceName: TextOptions = { size: 10, bold: true, color: BRAND, indent: INDENT };

  for (const level of levels) {
    const { resource } = level;
    const heading = `Level ${level.id}: ${level.title}`;
    const chapter = level.chapter === null ? null : `Chapter ${level.chapter}`;
    const place = `${resource.location} · ${resource.hours}`;

    startNewPageIfNeeded(
      heightOf(heading, title) +
        (chapter ? heightOf(chapter, small) : 0) +
        level.takeaways.reduce((sum, takeaway) => sum + heightOf(takeaway, bullet), 0) +
        heightOf(`Resource: ${resource.name}`, resourceName) +
        heightOf(place, small) +
        (resource.url ? small.size * 1.4 : 0) +
        6,
    );

    tickBox(y + 1);
    write(heading, title);
    if (chapter) write(chapter, small);
    y += 3;

    for (const takeaway of level.takeaways) {
      startNewPageIfNeeded(bullet.size * 1.4);
      doc.setFillColor(...MUTED);
      doc.circle(MARGIN + INDENT + 3, y + 7.5, 1.4, "F");
      write(takeaway, bullet);
    }
    y += 3;

    write(`Resource: ${resource.name}`, resourceName);
    write(place, small);
    if (resource.url) {
      startNewPageIfNeeded(small.size * 1.4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(small.size);
      doc.setTextColor(...BRAND);
      doc.textWithLink(pdfSafe(resource.url), MARGIN + INDENT, y + small.size, { url: resource.url });
      y += small.size * 1.4;
    }
    y += 14;
  }

  y += 4;
  write("Next chapter: your Lehman story.", { size: 11, italic: true, color: MUTED });

  return doc;
}

export function downloadChecklist(completedOn: Date) {
  buildChecklist(completedOn).save("first-year-checklist.pdf");
}
