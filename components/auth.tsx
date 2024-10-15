"use client";
import React, { useState, useEffect } from "react";
import { account } from "../lib/appwrite";
import { Models } from "appwrite";
import { useSearchParams } from "next/navigation";
import { ID } from "appwrite";

export default function Auth() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"freelancer" | "client" | null>(
    null
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams.get("action");
    const type = searchParams.get("type") as "freelancer" | "client" | null;
    setIsLogin(action === "login");
    setUserType(type);
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
      await account.createSession(email, password);
      setUser(newUser);
      // Here you might want to create a user profile in your database
      // based on the userType (freelancer or client)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSignOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <p>Signed in as {user.email}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{isLogin ? "Login" : `Sign Up as ${userType}`}</h2>
      <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
