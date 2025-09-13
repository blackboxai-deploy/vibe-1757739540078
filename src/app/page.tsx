"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activeService, setActiveService] = useState("food");

  const services = [
    {
      id: "food",
      title: "Food Delivery",
      description: "Order from 500+ restaurants in Surat",
      features: ["30 min delivery", "Live tracking", "Best prices"],
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a4bd22fc-8da7-4d3e-a66c-4bc48b2eb107.png",
      color: "bg-orange-500",
      route: "/food"
    },
    {
      id: "vehicle",
      title: "Vehicle Rental",
      description: "Rent cars, bikes & bicycles by the hour",
      features: ["Hourly rental", "GPS tracking", "Insurance included"],
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/154f65d0-4d02-4cdd-a912-947fa8bbdbf5.png",
      color: "bg-blue-500",
      route: "/vehicles"
    },
    {
      id: "parcel",
      title: "Parcel Delivery",
      description: "Same-day delivery across Surat",
      features: ["Same day", "Real-time tracking", "Safe delivery"],
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/befe6897-9993-44f1-9c4e-434abbee4255.png",
      color: "bg-green-500",
      route: "/parcels"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Surat Streets
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your One-Stop Platform for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Food, Vehicles & Parcels
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience the convenience of ordering food, renting vehicles, and sending parcels 
            all from one platform. Fast, reliable, and affordable services across Surat.
          </p>
          
          {/* Service Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            {services.map((service) => (
              <Button
                key={service.id}
                variant={activeService === service.id ? "default" : "outline"}
                onClick={() => setActiveService(service.id)}
                className="px-6 py-3"
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service) => (
            activeService === service.id && (
              <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className={`${service.color} text-white mb-4`}>
                    Popular Service
                  </Badge>
                  <h3 className="text-4xl font-bold text-gray-900 mb-6">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 ${service.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={service.route}>
                    <Button size="lg" className={`${service.color} hover:opacity-90`}>
                      Order Now
                    </Button>
                  </Link>
                </div>
                
                <div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Surat Streets?
            </h3>
            <p className="text-lg text-gray-600">
              We provide the best service experience with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description: "Quick service across all categories with real-time tracking",
                icon: "⚡"
              },
              {
                title: "Secure Payments",
                description: "Multiple payment options with automatic money distribution",
                icon: "🔐"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your needs",
                icon: "📞"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "500+", label: "Restaurants" },
              { number: "1000+", label: "Vehicles" },
              { number: "50k+", label: "Deliveries" },
              { number: "10k+", label: "Happy Customers" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SS</span>
                </div>
                <h4 className="text-lg font-bold">Surat Streets</h4>
              </div>
              <p className="text-gray-400">
                Your trusted partner for food, vehicles, and parcel services in Surat.
              </p>
            </div>
            
            {[
              {
                title: "Services",
                links: ["Food Delivery", "Vehicle Rental", "Parcel Delivery", "Business Solutions"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Blog"]
              },
              {
                title: "Support",
                links: ["Help Center", "Safety", "Terms", "Privacy"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Surat Streets. All rights reserved. Made with ❤️ in Surat.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}