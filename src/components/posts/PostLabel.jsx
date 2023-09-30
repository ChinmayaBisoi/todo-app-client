import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const PostLabel = ({ handleAddLabel = () => {} }) => {
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  function triggerPopover() {
    triggerRef?.current?.click();
  }

  function handleClick() {
    const label = inputRef?.current?.value;
    handleAddLabel(label);
    triggerPopover();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          size="sm"
          className="text-xs rounded-full py-2 h-fit px-3 whitespace-nowrap">
          Add Label
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col gap-1">
          <Input className="w-28 outline-none" ref={inputRef} />

          <Button
            variant="secondary"
            onClick={handleClick}
            className="flex gap-1 items-center text-xs h-fit">
            <span>+</span>
            <span>Add Label</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostLabel;
