import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Register = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white hover:bg-gray-800 p-2 px-4 rounded-md text-sm font-medium">
        Register
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Register</DialogTitle>
          <div className="flex flex-col gap-4 md:gap-3 text-left pt-4">
            <div>
              <Label htmlFor="firstname">Firstname</Label>
              <Input id="firstname" />
            </div>
            <div>
              <Label htmlFor="lastname">Lastname</Label>
              <Input id="lastname" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" />
            </div>
            <Button className="mt-2">Register</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
