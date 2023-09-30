import { LOCAL_STORAGE_POSTS_KEY } from "@/constants/env";
import { usePostStateDispatch } from "@/context/post-context";
import addTodo from "@/pages/api/posts/add-todo";
import updateTodo from "@/pages/api/posts/update-todo";
import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { Modal } from "../Modal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import PostDialogContent from "./PostDialogContent";
import PostDialogHeader from "./PostDialogHeader";

const PostTrigger = React.memo(({ editing = false, disabled = false }) => {
  return (
    <div className="flex">
      <Button
        disabled={disabled}
        variant={editing ? "ghost" : "default"}
        className="flex items-center gap-1 grow">
        {editing ? (
          "Edit"
        ) : (
          <>
            <span>+</span>
            <span>Create Post</span>
          </>
        )}
      </Button>
    </div>
  );
});

PostTrigger.displayName = "PostTrigger";

const initialPostState = {
  title: "",
  description: "",
  labels: ["helo"],
  isPinned: false,
};

function isValidSavePostReq({ title, description, editing = false }) {
  if (!title) {
    return "Title is a required field";
  } else if (!description) {
    return "Description is a required field";
  }
}

const PostForm = ({
  disabled = false,
  isTemp = false,
  editing = false,
  postToEdit = {},
}) => {
  const postStateDispatch = usePostStateDispatch();

  const [closeModal, setCloseModal] = useState(null);
  const [post, setPost] = useState(initialPostState);
  const { toast } = useToast();

  function resetPost() {
    setPost(initialPostState);
  }

  function handleSave() {
    const errMsg = isValidSavePostReq(post);
    if (errMsg) {
      toast({
        title: errMsg,
        description: "",
        variant: "destructive",
      });
      return;
    }

    if (isTemp) {
      handleTempSave();
    } else {
      handlePermanentSave();
    }

    resetPost();
    closeModal();
  }

  function handleTempSave() {
    if (!editing) {
      const _id = uuid();
      const createdAt = new Date();
      const newPost = {
        ...post,
        _id,
        createdAt,
        updatedAt: createdAt,
      };
      postStateDispatch({
        type: "add-temp-post",
        post: newPost,
      });
      toast({
        title: "Post saved.",
        description: "Post saved in localstorage",
      });
    } else {
      // editing
      postStateDispatch({
        type: "edit-temp-post",
        post: { ...post, updatedAt: new Date() },
      });
      toast({
        title: "Post saved.",
        description: "Post saved in localstorage",
      });
    }
  }

  async function handlePermanentSave() {
    if (editing) {
      await updateTodo({ ...post, id: post._id })
        .then((res) => {
          if (res.ok) {
            postStateDispatch({
              type: "edit-post",
              post: res.todo,
            });
            toast({
              title: "Yay!! Edited Post successfully",
            });
          } else {
            toast({
              title: "Unexpected Error",
              description: res.message || "",
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error saving post",
            description: err,
            variant: "desctructive",
          });
        });
    } else {
      // adding new post
      await addTodo(post)
        .then((res) => {
          if (res.ok) {
            postStateDispatch({
              type: "add-post",
              post: res.todo,
            });
            toast({
              title: "Yay!! Saved Post successfully",
            });
          } else {
            toast({
              title: "Unexpected Error",
              description: res.message || "",
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error saving post",
            description: err,
            variant: "desctructive",
          });
        });
    }
  }

  useEffect(() => {
    function initPostContent() {
      setPost(postToEdit);
    }

    if (editing) {
      initPostContent();
    }
  }, [editing]);

  return (
    <Modal
      setCloseModal={setCloseModal}
      trigger={<PostTrigger disabled={disabled} editing={editing} />}
      dialogTitle={<PostDialogHeader post={post} setPost={setPost} />}>
      <PostDialogContent
        post={post}
        setPost={setPost}
        closeModal={closeModal}
        handleSave={handleSave}
      />
    </Modal>
  );
};

export default PostForm;
