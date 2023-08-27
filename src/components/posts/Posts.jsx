import { usePostState, usePostStateDispatch } from "@/context/post-context";
import Link from "next/link";
import React, { useEffect } from "react";
import VerticalDots from "../icons/VerticalDots";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Posts = () => {
  const postState = usePostState();
  const postStateDispatch = usePostStateDispatch();

  const tempPosts = postState.tempPosts;

  function deletePost(postId) {
    postStateDispatch({
      type: "delete-temp-post",
      postId: postId,
    });
  }

  useEffect(() => {
    console.log(postState);
  });
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
      <div className="flex flex-col gap-4">
        {tempPosts?.length > 0 ? (
          tempPosts.map(({ title, description, id }) => {
            return (
              <div
                key={id}
                className="p-4 flex md:gap-4 gap-2 border border-gray-300 rounded-lg">
                <div className="grow">
                  <p className="text-lg font-semibold">{title}</p>
                  <p>{description}</p>
                </div>
                <Popover>
                  <PopoverTrigger className="self-start">
                    <div className="p-2 border border-gray-200 hover:bg-gray-100 self-start rounded-md">
                      <VerticalDots height="16" width="16" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-[100px] p-0">
                    <div className="flex flex-col">
                      <Link href={`/posts/edit/${id}`}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          deletePost(id);
                        }}
                        variant="ghost"
                        className="justify-start !text-red-500">
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })
        ) : (
          <p>No Posts present</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
