import React from "react";
import Pin from "../icons/Pin";
import Unpin from "../icons/Unpin";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AddPostLabel = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs rounded-full py-2 h-fit px-3">
          Add Label
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col gap-1">
          <Input className="w-28 outline-none" />

          <Button
            variant="secondary"
            className="flex gap-1 items-center text-xs h-fit">
            <span>+</span>
            <span>Add Label</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const PostDialogHeader = ({ post = {}, setPost = () => {} }) => {
  const { isPinned } = post;
  function handlePin() {
    setPost((prev) => {
      return { ...prev, isPinned: !isPinned };
    });
  }
  return (
    <div className="text-left flex items-center justify-end gap-2 mb-4">
      <Button
        onClick={handlePin}
        variant="outline"
        className={`p-2 px-3 rounded-full flex items-center justify-center rotate-45 cursor-pointer 
        ${isPinned ? "bg-slate-100" : ""} `}>
        <Pin width={16} height={16} fillColor={isPinned ? "#333" : "none"} />
      </Button>
    </div>
  );
};

export default PostDialogHeader;
