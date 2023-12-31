import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Hamburger from "./icons/Hamburger";
import Sidebar from "./Sidebar";

const NavMob = () => {
  const side = "left";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <div className="min-w-[16px] md:hidden cursor-pointer">
          <Hamburger width="20" height="20" />
        </div>
      </SheetTrigger>
      <SheetContent side={side} className="max-w-[300px]">
        <Sidebar isMob />
      </SheetContent>
    </Sheet>
  );
};

export default NavMob;
