import React from "react";
import icon1 from "../../asset/jasaicon1.png";

const HeaderJasa = () => {
  return (
    <header className="relative md:py-16 lg:py-0  py-12 ">
      <div className=" flex flex-col items-center  px-5 lg:py-0 md:py-24">
        <img
          src={icon1}
          alt="Icon Jasa"
          className="w-full md:w-96 h-auto mb-4 "
        />
        <h1 className="text-4xl font-bold mb-4">Jasa Pembuatan Aplikasi</h1>
        <p className="text-base   max-w-2xl">
          Apakah Anda mencari solusi digital yang handal dan inovatif? Saya
          adalah seorang freelancer software developer dengan pengalaman{" "}
          <span className="text-red-500 font-bold italic">
            {" "}
            1 tahun sebagai Fullstack Developer
          </span>
          , berpengalaman dalam pembuatan aplikasi mobile dan website.{" "}
          <span className="text-sky-500">
            Dengan pengalaman dan dedikasi saya, saya siap membantu mewujudkan
            ide Anda menjadi aplikasi yang sukses dan fungsional.
          </span>
        </p>
      </div>
      <svg
        className="absolute  w-full border-b border-gray-500 md:hidden "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ff5500"
          fillOpacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,218.7C384,235,480,245,576,224C672,203,768,149,864,133.3C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -top-5 w-full lg:hidden border-t border-gray-500"
      >
        <path
          fill="#ff5500"
          fill-opacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,218.7C384,235,480,245,576,224C672,203,768,149,864,133.3C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
};

export default HeaderJasa;
