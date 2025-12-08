export function Footer() {
  return (
    <footer className="bg-white text-black py-8 relative z-10 border-t border-neutral-200">
      <div className="container mx-auto px-6 flex justify-center items-center text-sm text-neutral-500 font-light tracking-wide">
        <p>© {new Date().getFullYear()} Carlos Manuel Ponce. Pasión por la Excelencia.</p>
      </div>
    </footer>
  );
}
