import Link from "next/link";
import React from "react";
import ChevronLeft from "../icons/ChevronLeft";
import { Button } from "../ui/button";

const PostLayout = ({ children }) => {
  return (
    <div className="md:p-8 p-4 min-h-screen">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft width="16" height="16" />
            <p>Back</p>
          </Button>
        </Link>
        <Button>Save</Button>
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default PostLayout;
