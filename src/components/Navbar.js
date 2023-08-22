// import { PencilRuler } from "lucide-react";
import Link from "next/link";
// import LoginTab from "./LoginTab";

const Navbar = () => {
  return (
    <nav className="self-stretch sticky top-0 backdrop-saturate-200 backdrop-blur-sm z-30 flex items-center justify-between py-3 px-4 md:px-8 bg-white/80 shadow-lg">
      <Link href={"/"}>
        <div className="flex items-center gap-3">
          {/* <PencilRuler size={20} /> */}
          <h1 className="font-semibold">Todo-App</h1>
        </div>
      </Link>
      {/* <LoginTab /> */}
    </nav>
  );
};

export default Navbar;
