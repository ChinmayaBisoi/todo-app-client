import { BACKEND_HOST } from "@/constants/env";

export default async function addTodo({
  title,
  description,
  isPinned = false,
  labels = [],
  isChecked = false,
}) {
  try {
    const raw = JSON.stringify({
      title,
      description,
      isChecked,
      isPinned,
      labels,
    });

    const response = await fetch(`${BACKEND_HOST}/todos/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
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
