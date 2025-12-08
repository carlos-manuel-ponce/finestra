export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-8 relative z-10 border-t border-white/10">
      <div className="container mx-auto px-6 flex justify-center items-center text-sm text-white/40 font-light tracking-wide">
        <p>© {new Date().getFullYear()} Carlos Manuel Ponce. Pasión por la Excelencia.</p>
      </div>
    </footer>
  );
}
