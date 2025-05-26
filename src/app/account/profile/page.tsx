"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";
import AccountMenu from "@/components/feature/account/account-menu";
import ProfileForm from "@/components/feature/account/profile-form";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Если пользователь не авторизован, перенаправляем на страницу входа
  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/auth/signin");
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

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Profile Settings", href: "/account/profile", active: true },
        ]} 
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AccountMenu />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Update your personal information and preferences</p>
          </div>

          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}