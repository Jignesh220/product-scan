"use client";
import React, { useEffect, useState } from "react";
import { auth, db, firebaseApp } from "@/Firebase";
import { useRouter } from "next/navigation";
import Admin from "./Admin";
import { Login } from "../auth/Login";

export default function AdminPage() {
  const route = useRouter();
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(true);
        setloading(false);
      } else {
        setuser(false);
        setloading(false);
      }
    });
  }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <svg
          className="ring w-16 transition ease-in-out duration-100"
          viewBox="25 25 50 50"
          strokeWidth="5"
        >
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    );
  }

  return <div>{user ? <Admin /> : <Login />}</div>;
}
