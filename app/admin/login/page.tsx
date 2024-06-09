"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { stringify } from "querystring";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formState, setFormState] = useState({
    email: "abebe@gmail.com",
    password: "abcd",
  });
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("here");
        setIsLoading(true);
        try {
          const res = (await signIn("credentials", {
            ...formState,
            redirect: false,
          })) as { status: number };
          console.log(res);
          if (res.status === 401) {
            throw new Error("Wrong email or password");
          }
          router.push("/admin/posts");
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
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <button>Submit</button>
    </form>
  );
};

export default Login;
