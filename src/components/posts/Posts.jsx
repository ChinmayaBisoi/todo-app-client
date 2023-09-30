import { useLoginState } from "@/context/login-context";
import { usePostState, usePostStateDispatch } from "@/context/post-context";
import deleteTodo from "@/pages/api/posts/delete-todo";
import { useState } from "react";
import Cross from "../icons/Cross";
import InformationCircle from "../icons/InformationCircle";
import { Tooltip } from "../Tooltip";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import PostForm from "./PostForm";
import PostLists from "./PostLists";

function getSortedPosts(arr) {
  return arr
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .sort((a, b) => {
      const pinnedA = a.isPinned;
      const pinnedB = b.isPinned;
      if ((pinnedA && pinnedB) || (!pinnedA && !pinnedB)) {
        return 0;
      } else if (pinnedB && !pinnedA) {
        return 1;
      } else {
        return -1;
      }
    });
}

function getFilteredPosts(arr, searchQuery) {
  return arr.filter(({ title, description, labels }) => {
    return (
      title.includes(searchQuery) ||
      description.includes(searchQuery) ||
      labels.filter((k) => k.includes(searchQuery)).length > 0
    );
  });
}

const Posts = () => {
  const { tempPosts, savedPosts, loadingTempPosts, loadingPosts } =
    usePostState();
  const postStateDispatch = usePostStateDispatch();

  const { toast } = useToast();

  const { isLoggedIn } = useLoginState();
  const [searchQuery, setSearchQuery] = useState("");

  async function deletePost(postId) {
    const isSavedPost = savedPosts.find((post) => post._id === postId);
    const isTempPost = tempPosts.find((post) => post._id === postId);

    if (isTempPost) {
      postStateDispatch({
        type: "delete-temp-post",
        postId: postId,
      });
      toast({
        title: "Post deleted",
        description: "",
      });
      return;
    }

    if (isSavedPost) {
      await deleteTodo({ todoId: postId }).then((res) => {
        console.log(res);
        if (res.ok) {
          postStateDispatch({
            type: "delete-post",
            postId: postId,
          });
          toast({
            title: "Post deleted",
            description: "",
          });
        }
      });
    }
  }

  const sortedTempPosts = getSortedPosts(tempPosts);

  const filteredTempPosts = !searchQuery
    ? sortedTempPosts
    : getFilteredPosts(sortedTempPosts, searchQuery);

  const sortedPosts = getSortedPosts(savedPosts);

  const filteredPosts = !searchQuery
    ? sortedPosts
    : getFilteredPosts(sortedPosts, searchQuery);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">Posts</h1>
          <h3 className="text-gray-500">Create and manage posts.</h3>
        </div>
      </div>
      <div>
        <div className="xs:mb-8 mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Input
              name="search"
              id="search"
              value={searchQuery}
              placeholder="Search your post.."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              autoComplete="off"
              className="border-none outline-none"
            />
            <Cross
              onClick={() => {
                setSearchQuery("");
              }}
              wrapperCss="p-3 rounded-r-lg h-max hover:bg-gray-200"
              className="text-gray-600"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div id="postContent">
          <div className="flex xs:flex-row flex-col xs:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Temporary posts</h2>
              <Tooltip
                content={
                  "Temporary post is implemented for guest users to experience the app"
                }>
                <InformationCircle
                  className="cursor-pointer mt-0.5"
                  width={16}
                  height={16}
                />
              </Tooltip>
            </div>
            <PostForm isTemp />
          </div>
          <PostLists
            isTemp
            loading={loadingTempPosts}
            posts={filteredTempPosts}
            deletePost={deletePost}
          />

          <div className="xs:mt-10 mt-4 flex xs:flex-row flex-col xs:items-center justify-between gap-2 mb-6">
            <h2 className="text-2xl font-semibold">Saved Posts</h2>
            <PostForm disabled={!isLoggedIn} />
          </div>
          <div className="flex flex-col gap-4">
            {isLoggedIn ? (
              <PostLists
                loading={loadingPosts}
                posts={filteredPosts}
                deletePost={deletePost}
              />
            ) : (
              <p>
                <span className="font-semibold">Login</span> to create and view
                saved posts.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
