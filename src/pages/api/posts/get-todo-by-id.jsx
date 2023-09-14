import { BACKEND_HOST } from "@/constants/env";

export default async function getTodoById({ postId }) {
  try {
    const response = await fetch(`${BACKEND_HOST}/todos/${postId}`, {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      mode: "no-cors",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
