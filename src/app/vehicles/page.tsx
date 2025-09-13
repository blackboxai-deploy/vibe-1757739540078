"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const vehicleTypes = [
    { id: "all", name: "All Vehicles", icon: "🚗" },
    { id: "car", name: "Cars", icon: "🚙" },
    { id: "bike", name: "Bikes", icon: "🏍️" },
    { id: "scooter", name: "Scooters", icon: "🛵" },
    { id: "bicycle", name: "Bicycles", icon: "🚴" }
  ];

  const vehicles = [
    {
      id: 1,
      name: "Maruti Swift",
      type: "car",
      company: "Swift Rentals",
      hourlyRate: 150,
      dailyRate: 2500,
      seating: 5,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.5,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d754a77f-a008-42c5-9128-b23d7c52461a.png",
      available: true,
      features: ["AC", "Music System", "GPS"]
    },
    {
      id: 2,
      name: "Honda City",
      type: "car",
      company: "Premium Cars",
      hourlyRate: 200,
      dailyRate: 3200,
      seating: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.7,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf9fb374-0b87-4ae6-8a3e-4b378bf4d10b.png",
      available: true,
      features: ["AC", "Leather Seats", "GPS", "Bluetooth"]
    },
    {
      id: 3,
      name: "Royal Enfield",
      type: "bike",
      company: "Bike Heroes",
      hourlyRate: 80,
      dailyRate: 1200,
      seating: 2,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.3,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ee3b5809-d9a2-473f-bd25-b5b53c775e86.png",
      available: true,
      features: ["Helmet Included", "Tool Kit", "First Aid"]
    },
    {
      id: 4,
      name: "Honda Activa",
      type: "scooter",
      company: "Quick Rides",
      hourlyRate: 40,
      dailyRate: 600,
      seating: 2,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.4,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6aa051bf-7947-494f-8a47-9d667e51b837.png",
      available: true,
      features: ["Helmet Included", "Storage Box", "Fuel Efficient"]
    },
    {
      id: 5,
      name: "Mountain Bike",
      type: "bicycle",
      company: "Eco Rides",
      hourlyRate: 20,
      dailyRate: 200,
      seating: 1,
      fuel: "Pedal",
      transmission: "Manual",
      rating: 4.2,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59c12c1d-574c-4e5c-90db-b6c83a71ea5a.png",
      available: true,
      features: ["Helmet Included", "Water Bottle", "Repair Kit"]
    },
    {
      id: 6,
      name: "Hyundai Creta",
      type: "car",
      company: "Luxury Wheels",
      hourlyRate: 250,
      dailyRate: 4000,
      seating: 7,
      fuel: "Diesel",
      transmission: "Automatic",
      rating: 4.8,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/da0880bb-f84e-4aa1-ac66-ac7c0f11f617.png",
      available: false,
      features: ["AC", "Sunroof", "GPS", "Leather Seats", "Bluetooth"]
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || vehicle.type === selectedType;
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "low" && vehicle.hourlyRate <= 100) ||
                        (priceRange === "mid" && vehicle.hourlyRate > 100 && vehicle.hourlyRate <= 200) ||
                        (priceRange === "high" && vehicle.hourlyRate > 200);
    return matchesSearch && matchesType && matchesPrice;
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
                <p className="text-sm text-gray-500">Vehicle Rental</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
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
                placeholder="Search vehicles, brands, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under ₹100/hr</SelectItem>
                  <SelectItem value="mid">₹100-200/hr</SelectItem>
                  <SelectItem value="high">Above ₹200/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-4 overflow-x-auto">
            {vehicleTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Vehicles
            </h2>
            <p className="text-gray-600">{filteredVehicles.length} vehicles found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className={`hover:shadow-lg transition-shadow ${!vehicle.available ? 'opacity-60' : ''}`}>
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!vehicle.available && (
                    <Badge className="absolute top-3 left-3 bg-red-500">
                      Not Available
                    </Badge>
                  )}
                  {vehicle.available && vehicle.rating > 4.5 && (
                    <Badge className="absolute top-3 left-3 bg-green-500">
                      Highly Rated
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                      <CardDescription>{vehicle.company}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{vehicle.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Seating:</span>
                      <span>{vehicle.seating} {vehicle.seating === 1 ? 'person' : 'people'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fuel:</span>
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transmission:</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {vehicle.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-lg font-bold text-blue-600">₹{vehicle.hourlyRate}/hr</p>
                          <p className="text-sm text-gray-600">₹{vehicle.dailyRate}/day</p>
                        </div>
                      </div>
                      
                      <Link href={`/vehicles/book/${vehicle.id}`}>
                        <Button 
                          className="w-full" 
                          disabled={!vehicle.available}
                        >
                          {vehicle.available ? "Book Now" : "Currently Unavailable"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Vehicle Rental?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Booking",
                description: "Book by the hour, day, or week according to your needs",
                icon: "🕒"
              },
              {
                title: "All Inclusive",
                description: "Insurance, maintenance, and 24/7 support included",
                icon: "🛡️"
              },
              {
                title: "Easy Pickup",
                description: "Convenient pickup locations across Surat",
                icon: "📍"
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