"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function CustomerDashboard() {
  const [activeOrders] = useState([
    {
      id: "#FS001",
      type: "food",
      service: "Food Delivery",
      restaurant: "Spice Garden",
      status: "preparing",
      estimatedTime: "25 min",
      total: 450,
      items: ["Butter Chicken", "Naan", "Rice"],
      orderTime: "2 hours ago",
      icon: "🍽️"
    },
    {
      id: "#VR002",
      type: "vehicle",
      service: "Vehicle Rental",
      vehicle: "Honda City",
      status: "active",
      estimatedTime: "6 hours left",
      total: 1200,
      items: ["Honda City - Automatic"],
      orderTime: "3 hours ago",
      icon: "🚗"
    }
  ]);

  const [orderHistory] = useState([
    {
      id: "#PD003",
      type: "parcel",
      service: "Parcel Delivery",
      description: "Documents to Athwa",
      status: "delivered",
      deliveredAt: "Yesterday",
      total: 80,
      rating: 5,
      icon: "📦"
    },
    {
      id: "#FS004",
      type: "food",
      service: "Food Delivery",
      restaurant: "Pizza Corner",
      status: "delivered",
      deliveredAt: "2 days ago",
      total: 650,
      rating: 4,
      icon: "🍽️"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-yellow-500";
      case "active": return "bg-blue-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing": return "Preparing";
      case "active": return "Active";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SS</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Surat Streets</h1>
              </Link>
              <Badge variant="secondary">Customer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-bold">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/food">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold mb-2">Order Food</h3>
                <p className="text-gray-600 text-sm">500+ restaurants available</p>
                <Button className="mt-4 w-full group-hover:bg-primary/90">
                  Browse Restaurants
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vehicles">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-lg font-semibold mb-2">Rent Vehicle</h3>
                <p className="text-gray-600 text-sm">Cars, bikes & more</p>
                <Button className="mt-4 w-full group-hover:bg-primary/90">
                  View Vehicles
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/parcels">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold mb-2">Send Parcel</h3>
                <p className="text-gray-600 text-sm">Same-day delivery</p>
                <Button className="mt-4 w-full group-hover:bg-primary/90">
                  Send Package
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Orders</h2>
              
              {activeOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No active orders</h3>
                    <p className="text-gray-600 mb-6">Start by ordering food, renting a vehicle, or sending a parcel</p>
                    <div className="flex justify-center space-x-4">
                      <Link href="/food">
                        <Button>Order Food</Button>
                      </Link>
                      <Link href="/vehicles">
                        <Button variant="outline">Rent Vehicle</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{order.icon}</div>
                            <div>
                              <CardTitle className="text-lg">{order.id}</CardTitle>
                              <CardDescription>{order.service}</CardDescription>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Service Provider</p>
                            <p className="font-semibold">{order.restaurant || order.vehicle}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Estimated Time</p>
                            <p className="font-semibold text-green-600">{order.estimatedTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                            <p className="font-semibold text-lg">₹{order.total}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">Ordered {order.orderTime}</p>
                              <p className="text-sm font-medium">{order.items.join(", ")}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Track</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Cancel</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
              
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{order.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <CardDescription>{order.service}</CardDescription>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Service</p>
                          <p className="font-semibold">{order.restaurant || order.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Delivered</p>
                          <p className="font-semibold">{order.deliveredAt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Amount</p>
                          <p className="font-semibold">₹{order.total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Rating</p>
                          <div className="flex items-center space-x-1">
                            {"★".repeat(order.rating)}
                            <span className="text-sm text-gray-500">({order.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm">Reorder</Button>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Receipt</Button>
                            <Button variant="outline" size="sm">Support</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">John Doe</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">john@example.com</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">+91 9876543210</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Member Since</label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">January 2024</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <div className="mt-1 p-2 border rounded-md bg-gray-50">
                        A-123, Titanium City Center, Anand Mahal Road, Adajan, Surat - 395009
                      </div>
                    </div>
                    <Button>Edit Profile</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders:</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Spent:</span>
                      <span className="font-semibold">₹12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loyalty Points:</span>
                      <span className="font-semibold">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Level:</span>
                      <Badge variant="secondary">Gold</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      🔔 Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      💳 Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      📍 Saved Addresses
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      ❓ Help & Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}