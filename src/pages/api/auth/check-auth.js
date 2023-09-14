import { BACKEND_HOST } from "@/constants/env";

export default async function checkAuth() {
  try {
    const response = await fetch(`${BACKEND_HOST}/auth/check-auth`, {
      method: "GET",
      headers: {
        Origin: "https://cbi-todo-app.vercel.app",
      },
      credentials: "include",
      mode: "cors",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
