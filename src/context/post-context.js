import { LOCAL_STORAGE_POSTS_KEY } from "@/constants/env";
import * as React from "react";

const PostStateContext = React.createContext(undefined);
const PostStateDispatchContext = React.createContext(undefined);

const initialState = {
  tempPosts: [
    {
      id: "60a7af35-847b-41bd-89a1-480fc5fe5c0c",
      title: "Title 123",
      description: "Test description 123455",
      isPinned: true,
      labels: ["Hi text"],
      updatedAt: "2023-09-30T14:39:57.193Z",
      createdAt: "2023-09-30T14:39:57.193Z",
    },
  ],
  loadingTempPosts: true,
  savedPosts: [],
  loadingPosts: true,
};

function postStateReducer(state, action) {
  console.log("context state --- >", state, action);

  const tempPosts = state.tempPosts;
  const savedPosts = state.savedPosts;
  switch (action.type) {
    case "edit-temp-post": {
      // edit-temp-post
      const editedPost = action.post;
      const newTempPosts = tempPosts.map((post) => {
        if (post._id === editedPost._id) {
          return editedPost;
        }
        return post;
      });
      localStorage.setItem(
        LOCAL_STORAGE_POSTS_KEY,
        JSON.stringify({
          posts: newTempPosts,
        })
      );
      return { ...state, tempPosts: newTempPosts };
    }

    case "add-temp-post": {
      //  add-new
      localStorage.setItem(
        LOCAL_STORAGE_POSTS_KEY,
        JSON.stringify({
          posts: [action.post, ...state.tempPosts],
        })
      );
      return { ...state, tempPosts: [action.post, ...state.tempPosts] };
    }

    case "set-loading-temp-posts": {
      return { ...state, loadingTempPosts: action.isLoading };
    }

    case "set-temp-posts": {
      // on mount get and set all posts
      const posts = action.posts;
      return { ...state, tempPosts: [...posts] };
    }

    case "delete-temp-post": {
      const filteredPosts = state.tempPosts.filter(
        (k) => k._id !== action.postId
      );
      localStorage.setItem(
        LOCAL_STORAGE_POSTS_KEY,
        JSON.stringify({ posts: filteredPosts })
      );
      return { ...state, tempPosts: filteredPosts };
    }

    // for permanent posts -----------
    case "set-posts": {
      const posts = action.posts;
      return { ...state, savedPosts: posts };
    }

    case "add-post": {
      return { ...state, savedPosts: [...savedPosts, action.post] };
    }

    case "edit-post": {
      const editedPost = action.post;
      const newPosts = savedPosts.map((post) => {
        if (post._id === editedPost._id) {
          return editedPost;
        }
        return post;
      });
      return { ...state, savedPosts: newPosts };
    }

    case "set-loading-posts": {
      return { ...state, loadingPosts: action.isLoading };
    }

    case "delete-post": {
      const filteredPosts = savedPosts.filter((k) => k._id !== action.postId);
      return { ...state, tempPosts: filteredPosts };
    }

    default: {
      console.log("here at least");
      return state;
    }
  }
}

function PostStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(postStateReducer, {
    ...initialState,
  });

  return (
    <PostStateContext.Provider value={state}>
      <PostStateDispatchContext.Provider value={dispatch}>
        {children}
      </PostStateDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

function usePostState() {
  const context = React.useContext(PostStateContext);
  if (context === undefined) {
    throw new Error("usePostState must be used within a CountProvider");
  }
  return context;
}

function usePostStateDispatch() {
  const context = React.useContext(PostStateDispatchContext);
  if (context === undefined) {
    throw new Error("usePostStateDispatch must be used within a CountProvider");
  }
  return context;
}

export { PostStateProvider, usePostState, usePostStateDispatch };
