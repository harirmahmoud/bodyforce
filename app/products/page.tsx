"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Filter, Grid, List } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "LG 18,000 BTU Window Air Conditioner",
    price: 899.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=300&width=300&text=Window+AC",
    rating: 4.8,
    reviews: 124,
    category: "Air Conditioners",
    inStock: true,
    badge: "Energy Star",
    energyRating: "A+++",
  },
  {
    id: 2,
    name: 'Samsung 24" Stainless Steel Dishwasher',
    price: 799.99,
    originalPrice: 999.99,
    image: "/placeholder.svg?height=300&width=300&text=Dishwasher",
    rating: 4.6,
    reviews: 89,
    category: "Kitchen Appliances",
    inStock: true,
    badge: "Best Seller",
    energyRating: "A++",
  },
  {
    id: 3,
    name: "Whirlpool 25 cu ft French Door Refrigerator",
    price: 2299.99,
    originalPrice: 2699.99,
    image: "/placeholder.svg?height=300&width=300&text=French+Door+Fridge",
    rating: 4.9,
    reviews: 156,
    category: "Refrigeration",
    inStock: true,
    badge: "New Model",
    energyRating: "A+++",
  },
  {
    id: 4,
    name: "Bosch 800 Series Front Load Washer",
    price: 1399.99,
    originalPrice: 1699.99,
    image: "/placeholder.svg?height=300&width=300&text=Front+Load+Washer",
    rating: 4.7,
    reviews: 203,
    category: "Laundry",
    inStock: false,
    badge: "Popular",
    energyRating: "A++",
  },
  {
    id: 5,
    name: "GE Profile Electric Range with Convection",
    price: 1899.99,
    originalPrice: 2199.99,
    image: "/placeholder.svg?height=300&width=300&text=Electric+Range",
    rating: 4.5,
    reviews: 78,
    category: "Kitchen Appliances",
    inStock: true,
    badge: "Deal",
    energyRating: "A+",
  },
  {
    id: 6,
    name: "Frigidaire 12,000 BTU Portable AC",
    price: 549.99,
    originalPrice: 699.99,
    image: "/placeholder.svg?height=300&width=300&text=Portable+AC",
    rating: 4.4,
    reviews: 92,
    category: "Air Conditioners",
    inStock: true,
    badge: "Compact",
    energyRating: "A+",
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])

  const categories = ["Air Conditioners", "Kitchen Appliances", "Refrigeration", "Laundry", "Small Appliances"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Filters</h3>
            <Button variant="outline" className="w-full mb-4 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>

          {/* Search */}
          <div>
            <h4 className="font-medium mb-2">Search</h4>
            <Input placeholder="Search products..." />
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category])
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category))
                      }
                    }}
                  />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 500])}
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium mb-2">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">All Appliances</h1>
              <p className="text-gray-600">Showing {products.length} results</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-0" : "p-4"}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2" variant="secondary">
                            {product.badge}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button size="sm" disabled={!product.inStock}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                        {product.energyRating && (
                          <Badge variant="outline" className="mt-2">
                            Energy Rating: {product.energyRating}
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {product.badge && (
                          <Badge className="absolute top-1 left-1 text-xs" variant="secondary">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button size="sm" disabled={!product.inStock}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                        {product.energyRating && (
                          <Badge variant="outline" className="mt-2">
                            Energy Rating: {product.energyRating}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
