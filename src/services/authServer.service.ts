import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function getUserFromServer() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !token === undefined) return null;

    const res = await api.get(`/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    // const res = await api.post("/auth/logout");

    return res.data;
  } catch (error) {
    console.log(error, "ERROR DATA");
    return null;
  }
}
