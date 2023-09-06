import {
  Dialog,
  DialogCloser,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  closeDialog,
} from "@/components/ui/dialog";
import { useLoginStateDispatch } from "@/context/login-context";
import login from "@/pages/api/auth/login";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const loginStateDispatch = useLoginStateDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    console.log("handle login called");
    if (!email) {
      toast({
        title: "Email is required!",
        description: "",
        variant: "destructive",
      });
      return;
    }
    if (!password) {
      toast({
        title: "Password is required!",
        description: "",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    await login({ email, password }).then((res) => {
      console.log(res);
      // if(res.status === "success"){
      loginStateDispatch({
        type: "update-user-info",
        userData: res,
      });
      // }
    });
    setLoading(false);
    closeDialog();
  }

  function closeDialog() {
    const dialogCloser = document.querySelector("#dialog-closer");
    if (dialogCloser) {
      dialogCloser.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white hover:bg-gray-800 p-2 px-4 rounded-md text-sm font-medium">
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Login</DialogTitle>
          <div className="flex flex-col gap-4 pt-4 text-left">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <Button
              disabled={loading}
              loading={loading}
              onClick={handleLogin}
              className="mt-2">
              Login
            </Button>
            <DialogCloser id="dialog-closer" className="hidden" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
