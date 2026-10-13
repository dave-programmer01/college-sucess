"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { pressable } from "@/lib/motion";

const MotionLink = motion.create(Link);

type Variant = "primary" | "soft" | "outline" | "danger";

type StyleProps = {
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  soft: "border border-brand/30 bg-primary-soft text-brand",
  outline: "border border-line bg-surface text-brand",
  danger: "bg-danger text-white hover:bg-danger-hover",
};

function buttonClasses({ variant = "primary", fullWidth, className }: StyleProps) {
  return [
    "inline-flex h-12 items-center justify-center gap-2 rounded-control px-5 text-small font-semibold",
    "transition-[background-color,box-shadow] hover:shadow-raised",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    fullWidth ? "w-full" : "",
    className ?? "",
  ].join(" ");
}

type ButtonProps = StyleProps & Omit<HTMLMotionProps<"button">, "className">;

export function Button({ variant, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return (
    <motion.button
      type={type}
      {...pressable}
      {...props}
      className={buttonClasses({ variant, fullWidth, className })}
    />
  );
}

type ButtonLinkProps = StyleProps & {
  href: string;
  children: React.ReactNode;
};

export function ButtonLink({ variant, fullWidth, className, href, children }: ButtonLinkProps) {
  return (
    <MotionLink
      href={href}
      {...pressable}
      className={buttonClasses({ variant, fullWidth, className })}
    >
      {children}
    </MotionLink>
  );
}
