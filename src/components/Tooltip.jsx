import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function Tooltip({ content, children, contentCss = "" }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className={`text-sm w-fit px-2 py-1 ${contentCss}`}>
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
