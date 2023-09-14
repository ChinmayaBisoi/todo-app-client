import { BACKEND_HOST } from "@/constants/env";

export default async function addTodo({
  title,
  description,
  isChecked = false,
}) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ title, description, isChecked });

    const response = await fetch(`${BACKEND_HOST}/todos`, {
      method: "POST",
      headers: myHeaders,
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
