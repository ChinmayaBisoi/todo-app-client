import Link from "next/link";
import Hamburger from "./icons/Hamburger";
import PencilRuler from "./icons/PencilRuler";
import LoginTab from "./LoginTab";
import NavMob from "./NavMob";

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
      <LoginTab />
    </nav>
  );
};

export default Navbar;
