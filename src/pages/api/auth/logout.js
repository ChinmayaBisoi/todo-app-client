import { BACKEND_HOST } from "@/constants/env";

export default async function logout() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({});

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    };

    const response = await fetch(`${BACKEND_HOST}/auth/logout`, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
