"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { stringify } from "querystring";
import { handleClientScriptLoad } from "next/script";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import Logo2 from "@/public/assets/Logo2.png";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formState, setFormState] = useState({
    email: "abebe@gmail.com",
    password: "abcd",
  });
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("here");
    setIsLoading(true);
    try {
      const res = (await signIn("credentials", {
        ...formState,
        redirect: false,
      })) as { status: number; error?: string };
      console.log(res);
      if (error) {
        const errorString =
          res.error === "CredentialsSignin" ? "Invalid Credentials" : res.error;
        throw new Error(errorString);
      }
      router.push("/admin/posts");
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An error occurred" + JSON.stringify(e));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col gap-6">
      <nav className="container py-2 border flex justify-center">
        <Link href="/home" className="">
          <Image
            src={Logo2}
            alt="imageLogo"
            width={70}
            height={70}
            className="relative w-[50px] h-[50px] md:w-[70px]  md:h-[70px]"
          />
        </Link>
      </nav>
      <div className="container">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold ">Admin Login Page</h1>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
          {isLoading && <p className="text-primary">Loading...</p>}
          {error}
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button className="flex gap-3" type="submit">
            <Spinner spin={isLoading} />
            <span>Login</span>
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
