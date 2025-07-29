"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Filter, Snowflake, Zap, Volume2 } from "lucide-react"
import Image from "next/image"

const airConditioners = [
  {
    id: 1,
    name: "LG 18,000 BTU Window Air Conditioner",
    price: 899.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=300&width=300&text=LG+Window+AC",
    rating: 4.8,
    reviews: 324,
    btu: 18000,
    roomSize: "Up to 1,000 sq ft",
    energyRating: "A+++",
    type: "Window",
    brand: "LG",
    inStock: true,
    features: ["Wi-Fi Enabled", "Energy Star", "Quiet Operation"],
  },
  {
    id: 2,
    name: "Frigidaire 12,000 BTU Portable AC",
    price: 549.99,
    originalPrice: 699.99,
    image: "/placeholder.svg?height=300&width=300&text=Portable+AC",
    rating: 4.6,
    reviews: 189,
    btu: 12000,
    roomSize: "Up to 550 sq ft",
    energyRating: "A++",
    type: "Portable",
    brand: "Frigidaire",
    inStock: true,
    features: ["Easy Installation", "Remote Control", "Dehumidifier"],
  },
  {
    id: 3,
    name: "Samsung 24,000 BTU Mini Split System",
    price: 1899.99,
    originalPrice: 2299.99,
    image: "/placeholder.svg?height=300&width=300&text=Mini+Split",
    rating: 4.9,
    reviews: 156,
    btu: 24000,
    roomSize: "Up to 1,500 sq ft",
    energyRating: "A+++",
    type: "Mini Split",
    brand: "Samsung",
    inStock: true,
    features: ["Inverter Technology", "Smart Control", "Ultra Quiet"],
  },
  {
    id: 4,
    name: "GE 8,000 BTU Window Unit",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=GE+Window+AC",
    rating: 4.4,
    reviews: 203,
    btu: 8000,
    roomSize: "Up to 350 sq ft",
    energyRating: "A+",
    type: "Window",
    brand: "GE",
    inStock: true,
    features: ["Compact Design", "Easy Install", "Energy Saver"],
  },
]

export default function AirConditionersPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [btuRange, setBtuRange] = useState([8000, 24000])

  const brands = ["LG", "Samsung", "Frigidaire", "GE", "Whirlpool"]
  const types = ["Window", "Portable", "Mini Split", "Central"]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Air Conditioners</h1>
        <p className="text-gray-600 mb-6">
          Stay cool with our energy-efficient air conditioning solutions. From compact window units to powerful central
          systems.
        </p>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Snowflake className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">Energy Star Certified</div>
            <div className="text-sm text-gray-600">Up to 40% energy savings</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-semibold">Free Installation</div>
            <div className="text-sm text-gray-600">Professional setup included</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Volume2 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-semibold">Quiet Operation</div>
            <div className="text-sm text-gray-600">Under 50dB noise level</div>
          </div>
        </div>
      </div>

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

          {/* BTU Range */}
          <div>
            <h4 className="font-medium mb-2">BTU Capacity</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min BTU"
                  value={btuRange[0]}
                  onChange={(e) => setBtuRange([Number.parseInt(e.target.value) || 8000, btuRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max BTU"
                  value={btuRange[1]}
                  onChange={(e) => setBtuRange([btuRange[0], Number.parseInt(e.target.value) || 24000])}
                />
              </div>
            </div>
          </div>

          {/* AC Type */}
          <div>
            <h4 className="font-medium mb-2">Type</h4>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTypes([...selectedTypes, type])
                      } else {
                        setSelectedTypes(selectedTypes.filter((t) => t !== type))
                      }
                    }}
                  />
                  <label htmlFor={type} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-medium mb-2">Brands</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand])
                      } else {
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                      }
                    }}
                  />
                  <label htmlFor={brand} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Rating */}
          <div>
            <h4 className="font-medium mb-2">Energy Rating</h4>
            <div className="space-y-2">
              {["A+++", "A++", "A+", "A"].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="text-sm">
                    {rating} & Up
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">Showing {airConditioners.length} air conditioners</p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="btu-low">BTU: Low to High</SelectItem>
                <SelectItem value="btu-high">BTU: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airConditioners.map((ac) => (
              <Card key={ac.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={ac.image || "/placeholder.svg"}
                      alt={ac.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600">{ac.energyRating}</Badge>
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {ac.btu.toLocaleString()} BTU
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{ac.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ac.roomSize}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(ac.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({ac.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ac.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">${ac.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${ac.originalPrice}</span>
                      </div>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
