import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function getUserFromServer() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await api.get(`/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });

    // const res = await api.post("/auth/logout");

    return res.data;
  } catch {
    return null;
  }
}
