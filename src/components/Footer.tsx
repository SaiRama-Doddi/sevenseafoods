
import { Waves, Facebook, Instagram, Twitter } from "lucide-react"


export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* LOGO */}
          <a href="/" className="flex items-center">
            <div className="relative w-30 h-30 sm:w-30 sm:h-30">
              <img
                src="/logo.png"
                alt="Vivadhara Logo"
                className="object-contain"
     
              />
            </div>
          </a>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/products?category=Fish" className="hover:text-foreground transition-colors">
                  Fish
                </a>
              </li>
              <li>
                <a href="/products?category=Shellfish" className="hover:text-foreground transition-colors">
                  Shellfish
                </a>
              </li>
              <li>
                <a href="/products?category=Specialty" className="hover:text-foreground transition-colors">
                  Specialty
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 7seafoods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
