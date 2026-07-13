export function InfoPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <header>
          <p className="text-sm font-semibold tracking-wide text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </main>
  );
}
