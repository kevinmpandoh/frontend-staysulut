export const dynamic = "force-dynamic";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTop";
// import { SetAuthUser } from "@/components/SetAuthUser";
import { AuthProvider } from "@/contexts/AuthContext";
import { getUserFromServer } from "@/services/authServer.service";

export default async function KostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromServer();

  console.log("user layout", user);
  return (
    <>
      {/* <SetAuthUser user={user?.data ?? null} /> */}
      <AuthProvider user={user?.data ?? null}>
        <main>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTopButton />
        </main>
      </AuthProvider>
    </>
  );
}
