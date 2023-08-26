import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Posts = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">Posts</h1>
          <h3 className="text-gray-500">Create and manage posts.</h3>
        </div>
        <Link href="/posts/new">
          <Button className="flex items-center gap-2">
            <span>+</span>
            <span>New post</span>
          </Button>
        </Link>
      </div>
      <div>
        <h3>Unsaved Posts</h3>
      </div>
    </div>
  );
};

export default Posts;
