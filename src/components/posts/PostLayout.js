import Link from "next/link";
import React, { useEffect, useId, useState } from "react";
import ChevronLeft from "../icons/ChevronLeft";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePostState, usePostStateDispatch } from "@/context/post-context";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const PostLayout = ({ editing = false, postId }) => {
  const router = useRouter();
  const { toast } = useToast();
  const postState = usePostState();
  const postStateDispatch = usePostStateDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let uuid = crypto.randomUUID();

  function initPost() {
    console.log("init Post ran");
    const foundPost = postState.tempPosts?.find((k) => k.id === postId);
    console.log(foundPost);
    if (editing) {
      if (!foundPost) {
        console.log("post not found");
      } else {
        console.log(foundPost);
        setTitle(foundPost.title);
        setDescription(foundPost.description);
        uuid = foundPost.id;
      }
    }
    // else {
    //   setTitle(foundPost.title);
    //   setDescription(foundPost.description);
    //   uuid = foundPost.id;
    // }
  }

  function savePost() {
    if (!title) {
      toast({
        title: "Title is required!",
        description: "",
        variant: "destructive",
      });
      return;
    }
    if (!description) {
      toast({
        title: "Description is required!",
        description: "",
        variant: "destructive",
      });
      return;
    }

    if (editing) {
      postStateDispatch({
        type: "update-temp-post",
        post: {
          id: postId,
          title,
          description,
        },
      });
      toast({
        title: "Post saved successfully!",
        description: "",
      });
      router.push("/");
      return;
    }

    postStateDispatch({
      type: "save-temp-post",
      post: {
        id: uuid,
        title,
        description,
      },
    });
    toast({
      title: "Post created successfully!",
      description: "",
    });
    router.push("/");
  }

  useEffect(() => {
    console.log("useEffect ran");
  });

  useEffect(() => {
    initPost();
  }, [postId]);

  return (
    <div className="md:p-8 p-4 min-h-screen">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft width="16" height="16" />
            <p>Back</p>
          </Button>
        </Link>
        <Button onClick={savePost}>Save</Button>
      </div>
      <div className="mt-10">
        <div className="max-w-[650px] mx-auto flex flex-col gap-4">
          <Textarea
            id="title"
            autoResizable
            value={title}
            placeholder={"Untitled Post"}
            onChange={(e) => {
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
      </div>
    </div>
  );
};

export default PostLayout;
