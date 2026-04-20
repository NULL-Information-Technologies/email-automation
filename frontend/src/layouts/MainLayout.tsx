import UserHeader from "../components/headers/UserHeader";
import Footer from "../components/footers/Footer";
import React from "react";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserHeader visible={true} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
