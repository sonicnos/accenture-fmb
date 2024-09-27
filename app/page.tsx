"use client";

import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-purple-600 h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
