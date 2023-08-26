import PostLayout from "@/components/posts/PostLayout";
import Post from "@/components/posts/Post";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const NewPostPage = () => {
  return (
    <PostLayout>
      <Post />
    </PostLayout>
  );
};

export default NewPostPage;
