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

const AuthForm = ({ type = "login" }) => {
  const loginStateDispatch = useLoginStateDispatch();
  const loginState = useLoginState();
  const isLoggedIn = loginState.isLoggedIn;

  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLogin = type === "login";

  async function handleLogin() {
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

    login({ email, password })
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
            type="email"
            className="outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center border border-gray-200 rounded-md">
            <Input
              id="password"
              className="border-none outline-none"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {showPassword ? (
              <EyeOpen
                onClick={() => {
                  setShowPassword(false);
                }}
                className="mr-2"
              />
            ) : (
              <EyeClose
                onClick={() => {
                  setShowPassword(true);
                }}
                className="mr-2"
              />
            )}
          </div>
        </div>
        {!isLogin && (
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="flex items-center border border-gray-200 rounded-md">
              <Input
                id="confirmPassword"
                className="border-none outline-none"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {showConfirmPassword ? (
                <EyeOpen
                  onClick={() => {
                    setShowConfirmPassword(false);
                  }}
                  className="mr-2"
                />
              ) : (
                <EyeClose
                  onClick={() => {
                    setShowConfirmPassword(true);
                  }}
                  className="mr-2"
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
          <Button className="" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button className="" onClick={handleRegister}>
            Register
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
