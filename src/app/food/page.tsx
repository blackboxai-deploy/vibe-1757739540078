"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "indian", name: "Indian", icon: "🍛" },
    { id: "chinese", name: "Chinese", icon: "🥢" },
    { id: "italian", name: "Italian", icon: "🍝" },
    { id: "fast-food", name: "Fast Food", icon: "🍔" },
    { id: "desserts", name: "Desserts", icon: "🍰" }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "30-40 min",
      deliveryFee: 25,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/58bb41db-34dd-468f-a80e-428e61940393.png",
      popular: true,
      offers: ["20% OFF", "Free Delivery"]
    },
    {
      id: 2,
      name: "Dragon Palace",
      cuisine: "Chinese",
      rating: 4.3,
      deliveryTime: "25-35 min",
      deliveryFee: 30,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f528f86-7d7b-4264-8590-75ea091248df.png",
      popular: false,
      offers: ["Buy 1 Get 1"]
    },
    {
      id: 3,
      name: "Pizza Corner",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: 20,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c7449af4-2f0d-47e1-b902-f77f5e81cba7.png",
      popular: true,
      offers: ["30% OFF"]
    },
    {
      id: 4,
      name: "Burger Junction",
      cuisine: "Fast Food",
      rating: 4.2,
      deliveryTime: "15-25 min",
      deliveryFee: 15,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b4709489-6557-440e-8563-9e7924613277.png",
      popular: false,
      offers: ["Free Delivery"]
    },
    {
      id: 5,
      name: "Sweet Dreams",
      cuisine: "Desserts",
      rating: 4.6,
      deliveryTime: "20-30 min",
      deliveryFee: 25,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be991bfe-b082-44f0-a9eb-3a027109c109.png",
      popular: true,
      offers: ["Buy 2 Get 1"]
    },
    {
      id: 6,
      name: "Healthy Bites",
      cuisine: "Indian",
      rating: 4.4,
      deliveryTime: "25-35 min",
      deliveryFee: 20,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c05febd1-6fbf-4c94-8934-e8537fe8ff1f.png",
      popular: false,
      offers: ["15% OFF"]
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           restaurant.cuisine.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Surat Streets</h1>
                <p className="text-sm text-gray-500">Food Delivery</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Cart (0)
              </Button>
              <Link href="/auth/login">
                <Button size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "all" ? "All Restaurants" : `${categories.find(c => c.id === selectedCategory)?.name} Restaurants`}
            </h2>
            <p className="text-gray-600">{filteredRestaurants.length} restaurants found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {restaurant.popular && (
                    <Badge className="absolute top-3 left-3 bg-orange-500">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col space-y-1">
                    {restaurant.offers.map((offer, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {offer}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                      <CardDescription>{restaurant.cuisine}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{restaurant.deliveryTime}</span>
                    <span>₹{restaurant.deliveryFee} delivery fee</span>
                  </div>
                  
                  <Link href={`/food/restaurant/${restaurant.id}`}>
                    <Button className="w-full group-hover:bg-primary/90">
                      View Menu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Cuisines */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Popular Cuisines in Surat
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow cursor-pointer text-center p-6"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <p className="font-semibold text-gray-900">{category.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Order from Surat Streets?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast Delivery",
                description: "Get your food delivered in 30 minutes or less",
                icon: "⚡"
              },
              {
                title: "Live Tracking",
                description: "Track your order in real-time from kitchen to doorstep",
                icon: "📍"
              },
              {
                title: "Best Prices",
                description: "Competitive prices with exclusive offers and discounts",
                icon: "💰"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}