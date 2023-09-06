import { BACKEND_HOST } from "@/constants/env";

export default async function register({
  firstname,
  lastname,
  email,
  password,
}) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ firstname, lastname, email, password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    };

    const response = await fetch(
      `${BACKEND_HOST}/auth/register`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
