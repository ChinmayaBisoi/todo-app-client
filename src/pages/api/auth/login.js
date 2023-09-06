import { BACKEND_HOST } from "@/constants/env";

export default async function login({ email, password }) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email, password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    };

    const response = await fetch(`${BACKEND_HOST}/auth/login`, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
