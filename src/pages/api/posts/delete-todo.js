import { BACKEND_HOST } from "@/constants/env";

export default async function deleteTodo({ todoId }) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BACKEND_HOST}/todos/${todoId}`, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
