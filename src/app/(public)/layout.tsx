export const dynamic = "force-dynamic";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTop";
// import { SetAuthUser } from "@/components/SetAuthUser";
// import { getUserFromServer } from "@/services/authServer.service";

export default async function KostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromServer();

  return (
    <>
      <main>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton />
      </main>
    </>
  );
}
