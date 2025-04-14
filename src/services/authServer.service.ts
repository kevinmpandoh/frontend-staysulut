import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function getUserFromServer() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log(token, "TOKENNYA");

    if (!token) return null;

    const res = await api.get(`/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    console.log(res.data, "RESPONSE DATA");

    // const res = await api.post("/auth/logout");

    return res.data;
  } catch (error) {
    console.log(error, "ERROR DATA");
    return null;
  }
}
