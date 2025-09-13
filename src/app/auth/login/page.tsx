"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "customer"
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Redirect based on user type
      switch (loginData.userType) {
        case "customer":
          router.push("/dashboard/customer");
          break;
        case "driver":
          router.push("/dashboard/driver");
          break;
        case "restaurant":
          router.push("/dashboard/restaurant");
          break;
        case "vehicle":
          router.push("/dashboard/vehicle-company");
          break;
        case "admin":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/dashboard/customer");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Surat Streets
            </h1>
          </Link>
        </div>

        <Card className="w-full shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="driver">Driver</TabsTrigger>
              </TabsList>

              <TabsContent value="customer">
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="hidden" name="userType" value="customer" />
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value, userType: "customer"})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Customer"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="business">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setLoginData({...loginData, userType: "restaurant"})}
                      className="h-auto p-4 flex-col"
                    >
                      <div className="text-2xl mb-2">🍽️</div>
                      <div className="font-semibold">Restaurant</div>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setLoginData({...loginData, userType: "vehicle"})}
                      className="h-auto p-4 flex-col"
                    >
                      <div className="text-2xl mb-2">🚗</div>
                      <div className="font-semibold">Vehicle Co.</div>
                    </Button>
                  </div>
                  
                  {(loginData.userType === "restaurant" || loginData.userType === "vehicle") && (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-email">Business Email</Label>
                        <Input
                          id="business-email"
                          type="email"
                          placeholder="business@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-password">Password</Label>
                        <Input
                          id="business-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : `Sign In as ${loginData.userType === "restaurant" ? "Restaurant" : "Vehicle Company"}`}
                      </Button>
                    </form>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="driver">
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="hidden" name="userType" value="driver" />
                  <div className="space-y-2">
                    <Label htmlFor="driver-email">Driver Email</Label>
                    <Input
                      id="driver-email"
                      type="email"
                      placeholder="driver@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value, userType: "driver"})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-password">Password</Label>
                    <Input
                      id="driver-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Driver"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" disabled>
                  Google
                </Button>
                <Button variant="outline" disabled>
                  Phone
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                <Link href="/auth/admin" className="hover:underline">
                  Admin Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}