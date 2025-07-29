import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ElectroMart</h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for premium home appliances and electronics with professional installation and
              extended warranties.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white">
                Contact
              </Link>
              <Link href="/careers" className="block text-gray-400 hover:text-white">
                Careers
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white">
                Blog
              </Link>
              <Link href="/appliance-installation" className="block text-gray-400 hover:text-white">
                Appliance Installation
              </Link>
              <Link href="/warranty-information" className="block text-gray-400 hover:text-white">
                Warranty Information
              </Link>
              <Link href="/energy-efficiency-guide" className="block text-gray-400 hover:text-white">
                Energy Efficiency Guide
              </Link>
              <Link href="/maintenance-tips" className="block text-gray-400 hover:text-white">
                Maintenance Tips
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white">
                Returns
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white">
                Shipping Info
              </Link>
              <Link href="/track-order" className="block text-gray-400 hover:text-white">
                Track Order
              </Link>
              <Link href="/technical-support" className="block text-gray-400 hover:text-white">
                Technical Support
              </Link>
              <Link href="/installation-scheduling" className="block text-gray-400 hover:text-white">
                Installation Scheduling
              </Link>
              <Link href="/warranty-claims" className="block text-gray-400 hover:text-white">
                Warranty Claims
              </Link>
              <Link href="/parts-accessories" className="block text-gray-400 hover:text-white">
                Parts & Accessories
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 ElectroMart. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
