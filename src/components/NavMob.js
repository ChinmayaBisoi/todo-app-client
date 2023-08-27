import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import Hamburger from "./icons/Hamburger";

const NavMob = () => {
  const side = "left";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Hamburger width="20" height="20" className="min-w-[16px] md:hidden" />
      </SheetTrigger>
      <SheetContent side={side}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default NavMob;
