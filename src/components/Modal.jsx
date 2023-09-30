import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogCloser,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";

export function Modal({
  trigger,
  setCloseModal = () => {},
  dialogTitle = "",
  description = "",
  children,
}) {
  const closeRef = useRef(null);

  useEffect(() => {
    setCloseModal((prev) => close);
  }, [setCloseModal]);

  function close() {
    closeRef?.current?.click();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[95%]">
        <DialogHeader className={"self-start"}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <DialogCloser ref={closeRef} className="hidden" />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
