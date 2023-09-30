import Link from "next/link";
import { Button } from "./ui/button";

const Login = () => {
  return (
    <Link href="/login">
      <Button className="w-20 xs:w-[120px]">Login</Button>
    </Link>
  );
};

export default Login;
