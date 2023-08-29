import Link from "next/link";
import PencilRuler from "./icons/PencilRuler";
import Login from "./Login";
import NavMob from "./NavMob";
import Register from "./Register";

const Navbar = () => {
  return (
    <nav className="self-stretch sticky top-0 backdrop-saturate-200 backdrop-blur-sm z-30 flex items-center justify-between py-3 px-4 md:px-8 bg-white/80 shadow-lg">
      <div className="flex items-center gap-3">
        <PencilRuler className="hidden md:flex" />
        <NavMob />
        <Link href={"/"}>
          <h1 className="font-semibold">Todo-App</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Register />
        <Login />
      </div>
    </nav>
  );
};

export default Navbar;
