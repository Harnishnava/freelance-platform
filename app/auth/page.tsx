import React from "react";
import Auth from "@/components/auth";

const AuthPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Authentication</h1>
      <Auth />
    </div>
  );
};

export default AuthPage;
