import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EyeClose from "./icons/EyeClose";
import EyeOpen from "./icons/EyeOpen";
import { useToast } from "./ui/use-toast";
import login from "@/pages/api/auth/login";
import { useRouter } from "next/navigation";
import { useLoginState, useLoginStateDispatch } from "@/context/login-context";
import register from "@/pages/api/auth/register";

const initialFormState = {
  email: "",
  password: "",
  showPassword: false,
  password2: "",
  showPassword2: false,
};

const AuthForm = ({ type = "login" }) => {
  const loginStateDispatch = useLoginStateDispatch();
  const { isLoggedIn } = useLoginState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const [
    { email, password, showPassword, password2, showPassword2 },
    setFormState,
  ] = useState(initialFormState);

  const isLogin = type === "login";

  function handleChange(e) {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handlePasswordVisibility(query) {
    setFormState((prev) => {
      return { ...prev, [query]: !prev[query] };
    });
  }

  async function handleLogin() {
    if (isLoggedIn) {
      toast({
        title: "User already logged in",
        description: "Please logout first!",
        variant: "destructive",
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: `${!email ? "Email" : "Password"} is required`,
        description: "",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    await login({ email, password })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Logged in successfully",
            description: "",
          });
          loginStateDispatch({
            type: "login",
            email: res.email,
          });
          router.push("/");
        } else {
          toast({
            title: "Unexpected error",
            description: res.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to log in",
          description: err,
          variant: "destructive",
        });
      });
    setLoading(false);
  }

  function handleRegister() {
    if (isLoggedIn) {
      toast({
        title: "User already logged in",
        description: "Please logout first!",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email is required",
        description: "",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password is required",
        description: "",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords are not matching",
        description: "",
        variant: "destructive",
      });
      return;
    }

    register({ email, password })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Registration success!",
            description: "Please login now!",
          });
          router.push("/login");
        } else {
          toast({
            title: "Unexpected error",
            description: res.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to register",
          description: err,
          variant: "destructive",
        });
      });
  }

  return (
    <div className="flex items-center justify-center grow">
      <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="outline-none"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center border border-gray-200 rounded-md">
            <Input
              id="password"
              name="password"
              className="border-none outline-none"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
            />
            {showPassword ? (
              <EyeOpen
                onClick={() => {
                  handlePasswordVisibility("showPassword");
                }}
                wrapperCss="p-2 hover:bg-gray-200"
              />
            ) : (
              <EyeClose
                onClick={() => {
                  handlePasswordVisibility("showPassword");
                }}
                wrapperCss="p-2 hover:bg-gray-200"
              />
            )}
          </div>
        </div>
        {!isLogin && (
          <div>
            <Label htmlFor="password2">Confirm password</Label>
            <div className="flex items-center border border-gray-200 rounded-md">
              <Input
                id="password2"
                name="password2"
                className="border-none outline-none"
                type={showPassword2 ? "text" : "password"}
                value={password2}
                onChange={handleChange}
              />
              {showPassword2 ? (
                <EyeOpen
                  onClick={() => {
                    handlePasswordVisibility("showPassword2");
                  }}
                  wrapperCss="p-2 hover:bg-gray-200"
                />
              ) : (
                <EyeClose
                  onClick={() => {
                    handlePasswordVisibility("showPassword2");
                  }}
                  wrapperCss="p-2 hover:bg-gray-200"
                />
              )}
            </div>
          </div>
        )}
        <div className="flex items-center text-sm">
          {isLogin ? (
            <p>Don&apos;t have an account?</p>
          ) : (
            <p>Already have an account?</p>
          )}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-semibold px-2 py-1 ml-1 hover:bg-gray-200 rounded-md underline">
            {isLogin ? "Register" : "Login"}
          </Link>
        </div>
        {isLogin ? (
          <Button
            disabled={isLoggedIn || loading}
            loading={loading}
            onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button
            disabled={isLoggedIn || loading}
            loading={loading}
            onClick={handleRegister}>
            Register
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
