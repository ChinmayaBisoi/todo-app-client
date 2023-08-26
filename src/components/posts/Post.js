import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";

const Post = ({ prevTitle, prevDescription }) => {
  const [title, setTitle] = useState(prevTitle);

  const [description, setDescription] = useState(prevDescription);

  useEffect(() => {
    console.log(title);
  });

  return (
    <div className="max-w-[650px] mx-auto flex flex-col gap-4">
      <Textarea
        id="title"
        autoResizable
        value={title}
        placeholder={"Untitled Post"}
        onChange={(e) => {
          console.log("here");
          setTitle(e.target.value);
        }}
        className="text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
      />

      <Textarea
        id="description"
        autoResizable
        value={description}
        placeholder={"Write something here too..."}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="text-lg focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
      />
    </div>
  );
};

export default Post;
