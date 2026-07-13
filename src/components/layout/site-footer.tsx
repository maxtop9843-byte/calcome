export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} CalcLab</p>
        <p>정확성, 접근성, 속도를 우선합니다.</p>
      </div>
    </footer>
  );
}
