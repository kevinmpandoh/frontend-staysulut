// "use client";

// import { useAuthStore } from "@/stores/auth.store";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // const user = useAuthStore((state) => state.user);
  // const setUser = useAuthStore((state) => state.setUser);
  // const router = useRouter();

  // console.log(user, "USER");

  // const handleLogout = () => {
  //   setUser(null);
  //   router.push("/auth");
  // };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* <h1 className="text-2xl font-bold">Halo, {user?.name}!</h1>
      <p>Anda login sebagai {user?.role}.</p>
      <Button className="mt-4" onClick={handleLogout}>
        Logout
      </Button> */}
      <h1>DASHBOARD</h1>
    </div>
  );
}
