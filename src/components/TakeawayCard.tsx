import { CheckBadge } from "./CheckBadge";

export function TakeawayCard({ takeaways }: { takeaways: string[] }) {
  return (
    <section className="rounded-card bg-surface-muted p-4">
      <h2 className="text-h4 text-fg">Key Takeaways</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {takeaways.map((takeaway) => (
          <li key={takeaway} className="flex items-start gap-3 text-small text-fg">
            <CheckBadge />
            {takeaway}
          </li>
        ))}
      </ul>
    </section>
  );
}
