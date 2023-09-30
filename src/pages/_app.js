import "@/styles/globals.css";
import {
  PostStateProvider,
  usePostStateDispatch,
} from "@/context/post-context";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import {
  LoginStateProvider,
  useLoginState,
  useLoginStateDispatch,
} from "@/context/login-context";
import React, { useEffect } from "react";
import checkAuth from "./api/auth/check-auth";
import { useToast } from "@/components/ui/use-toast";
import Head from "next/head";
import getAllTodos from "./api/posts/get-all-todos";
import { LOCAL_STORAGE_POSTS_KEY } from "@/constants/env";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function Wrapper({ Component, pageProps }) {
  const { toast } = useToast();
  const loginState = useLoginState();
  const loginStateDispatch = useLoginStateDispatch();
  const postStateDispatch = usePostStateDispatch();
  const isLoggedIn = loginState.isLoggedIn;

  async function fetchAllTodos() {
    await getAllTodos().then((res) => {
      if (res.ok) {
        postStateDispatch({
          type: "set-posts",
          posts: res.todos,
        });
      }
    });

    postStateDispatch({
      type: "set-loading-posts",
      isLoading: false,
    });
  }

  async function tryToLogin() {
    await checkAuth()
      .then((res) => {
        if (res.ok) {
          loginStateDispatch({
            type: "login",
            email: res.userInfo.email,
            userId: res.userInfo.id,
          });
          toast({
            title: "Login successfull",
            description: "Automatically logged in <3",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  async function fetchTempPosts() {
    const tempPosts = localStorage.getItem(LOCAL_STORAGE_POSTS_KEY);
    if (tempPosts) {
      const parsedObj = JSON.parse(tempPosts);
      if (parsedObj) {
        const sortedPosts = parsedObj.posts
          ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
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

        postStateDispatch({
          type: "set-temp-posts",
          posts: sortedPosts,
        });
      }
    }
    postStateDispatch({
      type: "set-loading-temp-posts",
      isLoading: false,
    });
  }

  useEffect(() => {
    if (!isLoggedIn) {
      tryToLogin();
    }

    if (isLoggedIn) {
      fetchAllTodos();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchTempPosts();
  }, []);
  return (
    <div id="wrapper">
      <Head>
        <title>Todo App</title>
      </Head>
      <Component {...pageProps} className={poppins.className} />
      <Toaster />
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <LoginStateProvider>
      <PostStateProvider>
        <Wrapper Component={Component} pageProps={pageProps} />
      </PostStateProvider>
    </LoginStateProvider>
  );
}
