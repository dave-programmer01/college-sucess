/** The phone-width column every app screen sits in; centred on wide screens. */
export function AppColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-canvas sm:border-x sm:border-line">
      {children}
    </div>
  );
}
