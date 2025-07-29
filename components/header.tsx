"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, Heart, Package, Settings, LogOut } from "lucide-react"

export function Header() {
  const [cartItems] = useState(3) // Mock cart items count

  return (
    <header className="border-b">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <span>Free installation on major appliances over $500!</span>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:underline">
                Track Order
              </Link>
              <Link href="/help" className="hover:underline">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ElectroMart
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4" />
            </div>
            <Button className="ml-2">Search</Button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Input placeholder="Search products..." />
                  <Link href="/products" className="text-lg font-medium">
                    All Appliances
                  </Link>
                  <Link href="/categories/air-conditioners" className="text-lg font-medium">
                    Air Conditioners
                  </Link>
                  <Link href="/categories/kitchen-appliances" className="text-lg font-medium">
                    Kitchen Appliances
                  </Link>
                  <Link href="/categories/laundry-cleaning" className="text-lg font-medium">
                    Laundry & Cleaning
                  </Link>
                  <Link href="/categories/refrigeration" className="text-lg font-medium">
                    Refrigeration
                  </Link>
                  <Link href="/about" className="text-lg font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Hidden on mobile */}
      <nav className="hidden md:block border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-4">
            <Link href="/products" className="hover:text-blue-600 font-medium">
              All Appliances
            </Link>
            <Link href="/categories/air-conditioners" className="hover:text-blue-600">
              Air Conditioners
            </Link>
            <Link href="/categories/kitchen-appliances" className="hover:text-blue-600">
              Kitchen Appliances
            </Link>
            <Link href="/categories/laundry-cleaning" className="hover:text-blue-600">
              Laundry & Cleaning
            </Link>
            <Link href="/categories/refrigeration" className="hover:text-blue-600">
              Refrigeration
            </Link>
            <Link href="/deals" className="hover:text-blue-600 text-red-600 font-medium">
              Deals
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
