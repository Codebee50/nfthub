import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import CircleSpinner from "./loaders/CircleSpinner";


const AuthProtected = ({ children, onUserLoaded = () => {} }) => {
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/auth/login?next=${pathname}`);
    }

  }, [isAuthenticated, hydrated]);

  if (!hydrated) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <CircleSpinner size={50} />
      </section>
    );
  }

  return <>{children}</>;
};

export default AuthProtected;
