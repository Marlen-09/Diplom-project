"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/feature/auth/login-form";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";

export default function SignInPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Если пользователь уже авторизован, перенаправляем его
  useEffect(() => {
    if (mounted && !isLoading && user) {
      router.push("/account");
    }
  }, [mounted, isLoading, user, router]);

  if (!mounted || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-200 rounded-full border-t-gray-800"></div>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Будет перенаправление
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Sign In", href: "/auth/signin", active: true },
        ]} 
      />
      
      <div className="max-w-md mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-300">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to continue shopping</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Demo Credentials</h3>
          <p className="text-sm text-gray-700">
            Email: demo@example.com<br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  );
}