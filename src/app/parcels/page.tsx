"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ParcelsPage() {
  const [deliveryType, setDeliveryType] = useState("standard");
  const [parcelDetails, setParcelDetails] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    packageType: "",
    weight: "",
    dimensions: "",
    description: "",
    value: "",
    fragile: false
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const deliveryOptions = [
    {
      id: "express",
      name: "Express Delivery",
      time: "2-4 hours",
      price: 150,
      description: "Fastest delivery for urgent packages",
      icon: "⚡"
    },
    {
      id: "standard",
      name: "Standard Delivery",
      time: "Same day",
      price: 80,
      description: "Reliable delivery within the day",
      icon: "📦"
    },
    {
      id: "scheduled",
      name: "Scheduled Delivery",
      time: "Next day",
      price: 60,
      description: "Plan your delivery for tomorrow",
      icon: "📅"
    }
  ];

  const packageTypes = [
    { value: "documents", label: "Documents", basePrice: 50 },
    { value: "electronics", label: "Electronics", basePrice: 100 },
    { value: "clothing", label: "Clothing", basePrice: 70 },
    { value: "food", label: "Food Items", basePrice: 80 },
    { value: "fragile", label: "Fragile Items", basePrice: 120 },
    { value: "other", label: "Other", basePrice: 90 }
  ];

  const calculatePrice = () => {
    const selectedOption = deliveryOptions.find(option => option.id === deliveryType);
    const selectedPackage = packageTypes.find(pkg => pkg.value === parcelDetails.packageType);
    const basePrice = selectedOption?.price || 0;
    const packagePrice = selectedPackage?.basePrice || 0;
    const weightMultiplier = Math.ceil(parseFloat(parcelDetails.weight) || 1);
    const fragileCharge = parcelDetails.fragile ? 30 : 0;
    
    const total = basePrice + packagePrice + (weightMultiplier * 10) + fragileCharge;
    setEstimatedPrice(total);
  };

  const handleInputChange = (field: string, value: any) => {
    setParcelDetails(prev => ({ ...prev, [field]: value }));
    // Recalculate price when relevant fields change
    setTimeout(calculatePrice, 100);
  };

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
                <p className="text-sm text-gray-500">Parcel Delivery</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/parcels/track">
                <Button variant="outline" size="sm">Track Package</Button>
              </Link>
              <Link href="/auth/login">
                <Button size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send a Package</CardTitle>
                <CardDescription>
                  Fast and reliable delivery across Surat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Options */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Choose Delivery Speed</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {deliveryOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-all ${
                          deliveryType === option.id 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => {
                          setDeliveryType(option.id);
                          setTimeout(calculatePrice, 100);
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <h3 className="font-semibold">{option.name}</h3>
                          <p className="text-sm text-gray-600">{option.time}</p>
                          <p className="text-lg font-bold text-blue-600 mt-2">₹{option.price}</p>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Sender Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="senderName">Full Name</Label>
                      <Input
                        id="senderName"
                        value={parcelDetails.senderName}
                        onChange={(e) => handleInputChange("senderName", e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="senderPhone">Phone Number</Label>
                      <Input
                        id="senderPhone"
                        value={parcelDetails.senderPhone}
                        onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="senderAddress">Pickup Address</Label>
                    <Textarea
                      id="senderAddress"
                      value={parcelDetails.senderAddress}
                      onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                      placeholder="Complete pickup address with landmarks"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Recipient Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipientName">Full Name</Label>
                      <Input
                        id="recipientName"
                        value={parcelDetails.recipientName}
                        onChange={(e) => handleInputChange("recipientName", e.target.value)}
                        placeholder="Recipient's full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recipientPhone">Phone Number</Label>
                      <Input
                        id="recipientPhone"
                        value={parcelDetails.recipientPhone}
                        onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="recipientAddress">Delivery Address</Label>
                    <Textarea
                      id="recipientAddress"
                      value={parcelDetails.recipientAddress}
                      onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                      placeholder="Complete delivery address with landmarks"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Package Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Package Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="packageType">Package Type</Label>
                      <Select
                        value={parcelDetails.packageType}
                        onValueChange={(value) => handleInputChange("packageType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select package type" />
                        </SelectTrigger>
                        <SelectContent>
                          {packageTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={parcelDetails.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        placeholder="Package weight"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                      <Input
                        id="dimensions"
                        value={parcelDetails.dimensions}
                        onChange={(e) => handleInputChange("dimensions", e.target.value)}
                        placeholder="20 x 15 x 10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Package Value (₹)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={parcelDetails.value}
                        onChange={(e) => handleInputChange("value", e.target.value)}
                        placeholder="Item value for insurance"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Package Description</Label>
                    <Textarea
                      id="description"
                      value={parcelDetails.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Brief description of package contents"
                      rows={2}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="fragile"
                      checked={parcelDetails.fragile}
                      onChange={(e) => handleInputChange("fragile", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="fragile">Fragile item (+₹30 for special handling)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Delivery Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service Type:</span>
                    <span className="font-medium">
                      {deliveryOptions.find(opt => opt.id === deliveryType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Time:</span>
                    <span className="font-medium">
                      {deliveryOptions.find(opt => opt.id === deliveryType)?.time}
                    </span>
                  </div>
                  {parcelDetails.packageType && (
                    <div className="flex justify-between text-sm">
                      <span>Package Type:</span>
                      <span className="font-medium">
                        {packageTypes.find(pkg => pkg.value === parcelDetails.packageType)?.label}
                      </span>
                    </div>
                  )}
                  {parcelDetails.weight && (
                    <div className="flex justify-between text-sm">
                      <span>Weight:</span>
                      <span className="font-medium">{parcelDetails.weight} kg</span>
                    </div>
                  )}
                  {parcelDetails.fragile && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Fragile handling:</span>
                      <span className="font-medium">+₹30</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Estimated Total:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{estimatedPrice}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Schedule Pickup
                </Button>

                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    Final price confirmed after pickup
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "🚚", text: "Real-time tracking" },
                  { icon: "📷", text: "Photo confirmation" },
                  { icon: "🛡️", text: "Package insurance" },
                  { icon: "⏰", text: "On-time guarantee" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Service Coverage
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "Adajan", "Athwa", "Katargam", "Vesu",
              "Piplod", "Udhna", "Rander", "Magdalla"
            ].map((area, index) => (
              <Card key={index} className="p-4">
                <div className="text-2xl mb-2">📍</div>
                <p className="font-semibold">{area}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}