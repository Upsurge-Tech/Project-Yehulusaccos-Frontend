"use client";
import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        setIsLoading(true);
        try {
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) {
            const data = await res.json();
            if (data.message) throw new Error(data.message);
            else throw new Error("An error occurred" + res.status);
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An error occurred" + JSON.stringify(e));
          }
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input type="email" placeholder="email" required />
      <input type="password" placeholder="password" required />
      <button>Submit</button>
    </form>
  );
};

export default Login;
