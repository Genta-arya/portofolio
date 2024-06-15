import React from "react";
import NotFoundImage from "../asset/svg/404.svg";

const NotFound = () => {
  return (
    <div className="not-found-container h-screen items-center justify-center flex">
      <div>
        <h2 className="not-found-title">Halaman Tidak Ditemukan</h2>

        <div className="flex justify-center">
          <img
            src={NotFoundImage}
            alt="404 Illustration"
            className="not-found-image"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
