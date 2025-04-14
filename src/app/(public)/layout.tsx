import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTop";
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
    <AuthProvider user={user?.data}>
      <main>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton />
      </main>
    </AuthProvider>
  );
}
