import React from "react";
import PostLayout from "@/components/posts/PostLayout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const NewPostPage = () => {
  const router = useRouter();
  const postId = router?.query?.postId;

  return <PostLayout editing postId={postId} />;
};

export default NewPostPage;
