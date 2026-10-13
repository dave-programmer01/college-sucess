import Image from "next/image";
import { MediaPlaceholder } from "./illustrations/MediaPlaceholder";

type ResourceImageProps = {
  /** `image` from levels.ts: a file in /public such as "/images/advising.jpg", or "" for the placeholder. */
  src: string;
  /** How wide the picture is shown, so the browser can pick a file of the right size. */
  sizes: string;
  /** Sets the box: size, shape and corner radius. */
  className?: string;
};

/** A resource's photo, cropped to fill its box, or the placeholder picture when there isn't one. */
export function ResourceImage({ src, sizes, className = "" }: ResourceImageProps) {
  return (
    <span className={`relative block overflow-hidden bg-surface-muted ${className}`}>
      {src ? (
        // Decorative: the resource's name is always right next to it.
        // Files in /public are resized for the device; a full web address is shown as it is.
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          unoptimized={!src.startsWith("/")}
          className="object-cover"
        />
      ) : (
        <MediaPlaceholder className="absolute inset-0 size-full" />
      )}
    </span>
  );
}
