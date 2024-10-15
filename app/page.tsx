import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const MainPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Freelance Platform
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>For Freelancers</CardTitle>
            <CardDescription>
              Find exciting projects and showcase your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth?type=freelancer" passHref>
              <Button className="w-full">Sign Up as Freelancer</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Clients</CardTitle>
            <CardDescription>
              Post jobs and hire talented freelancers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth?type=client" passHref>
              <Button className="w-full">Sign Up as Client</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p>Already have an account?</p>
        <Link href="/auth?action=login" passHref>
          <Button variant="outline" className="mt-2">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
