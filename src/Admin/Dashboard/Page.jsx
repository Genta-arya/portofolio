import React from "react";


import { Helmet } from "react-helmet";
import SideBar from "./components/SideBar";
import useCheckLogin from "../../Hooks/auth/useCheckLogin";

const PageDashboard = () => {
  const { user, loading } = useCheckLogin();

  return (
    <div className="">
      <Helmet>
        <title>Portofolio - Dashboard</title>

        <meta property="og:title" content="Amplang Epok Ema - Dashboard" />
      </Helmet>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <SideBar />
        </>
      ) : (
        <div className="text-center h-screen mx-auto flex justify-center">
          User not logged in
        </div>
      )}
    </div>
  );
};

export default PageDashboard;
