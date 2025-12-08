import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logo from "@assets/ChatGPT_Image_8_dic_2025,_13_37_15_1765213554354.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            {/* Added invert class to make black logo white */}
            <img src={logo} alt="Carlos Manuel Ponce Logo" className="h-10 w-10 object-contain invert" />
            <span className="font-serif text-lg font-medium tracking-wide hidden sm:block text-foreground">
              CARLOS MANUEL PONCE
            </span>
          </a>
        </Link>

        <nav className="flex items-center gap-6">
          <Button 
            variant="outline" 
            className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium tracking-wide"
            asChild
          >
            <a href="https://wa.me/5492664481572" target="_blank" rel="noopener noreferrer">
              CONTACTO
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
