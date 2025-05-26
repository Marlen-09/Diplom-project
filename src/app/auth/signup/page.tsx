"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/feature/auth/register-form";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";

export default function SignUpPage() {
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
          { label: "Create Account", href: "/auth/signup", active: true },
        ]} 
      />
      
      <div className="max-w-md mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-300 mt-2">Join us and start shopping today</p>
        </div>

        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}