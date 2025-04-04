// "use clint";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";

// interface Props {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<Props> = ({ children }) => {
//   const { isLoggedIn } = useAuth();
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       const tes = await isLoggedIn();
//       console.log(tes, "TESS");
//     };

//     checkUser();
//   }, [isLoggedIn, router]);

//   if (isLoading) {
//     return <h1>SABAR YA</h1>;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
