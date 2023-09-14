import { BACKEND_HOST } from "@/constants/env";

export default async function getAllTodos() {
  try {
    const response = await fetch(`${BACKEND_HOST}/todos/all`, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
