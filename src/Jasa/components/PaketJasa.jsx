import React from "react";
import iconWeb from "../../asset/iconWeb.png";
import iconAndroid from "../../asset/iconAndroid.jpg";
import reactIcon from "../../asset/svg/reactjs.svg";
import icon2 from "../../asset/jasaincon2.png";
import RendersStar from "./Star";
const PaketJasa = () => {
  const packages = [
    {
      title: "Pembuatan Landingpage Umkm",
      description:
        "Kami menyediakan layanan pembuatan landingpage profesional untuk meningkatkan konversi dan kehadiran online Anda. Dengan desain responsif dan SEO-friendly, landingpage Anda akan menarik lebih banyak pengunjung.",
      price: "Mulai Rp. 350.000",
      features: [
        "Desain Responsif",
        "SEO Optimized",
        "Waktu Pengerjaan: 1 Minggu",
        "Gratis Hosting Via Vercel",
        "Gratis Konsultasi",
      ],
      icon: reactIcon,
      tekono: "React Js",
      link: "https://fastwork.id/user/babfpfzm/web-development-28040514?source=seller-center_my-service_share-link",
      image: iconWeb,
    },
    {
      title: "Pembuatan Aplikasi Mobile Sederhana",
      description:
        "Layanan pembuatan aplikasi mobile sederhana yang cepat dan efektif untuk kebutuhan bisnis Anda. Cocok untuk prototipe, MVP, atau aplikasi dengan fitur dasar.",
      price: "Mulai Rp. 350.000",
      features: [
        "Pengembangan Cepat",
        "Multi-Platform (Android & iOS)",
        "Terdiri dari 4 screen",
        "aplikasi dengan 1 fitur CRUD",
        "sudah dengan backend Rest API",
        "Waktu Pengerjaan: 3 Minggu",
        "Gratis Support 1 Bulan",
      ],
      icon: reactIcon,
      tekono: "React Native",
      image: iconAndroid,
      link: "https://fastwork.id/user/babfpfzm/mobile-application-82102967?source=seller-center_my-service_share-link",
    },
  ];

  return (
    <div className="py-12 lg:py-8 lg:mt-12">
      <div className="flex justify-center -mt-8 mb-4">
        <RendersStar />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 lg:mb-0">Jasa Kami</h2>
      <div className="lg:p-24 lg:-mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2">
        {packages.map((pkg) => (
          <div
            key={pkg.title}
            className=" rounded-lg lg:p-32 border p-6 flex flex-col flex-1  "
          >
            <div className="flex justify-center">
              <img
                src={pkg.image}
                alt={`${pkg.title} icon`}
                className="w-full  lg:w-[90%] md:h-52 rounded-md"
              />
            </div>
            <h3 className="text-lg lg:text-2xl font-semibold mb-2  mt-8">{pkg.title}</h3>
            <p className="text-sm mb-4 lg:text-base ">{pkg.description}</p>

            <div className="flex flex-col mb-8 items-center">
              <img src={pkg.icon} alt="" className="w-16 " />
              <p className="text-xs">{pkg.tekono}</p>
            </div>

            <h4 className="text-xl font-bold mb-2 ">{pkg.price}</h4>
            <ul className="list-disc text-sm list-inside mb-4 flex-1">
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <a
              href={pkg.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
                Pesan Sekarang
              </button>
            </a>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 ">
        <div className="flex justify-center">
          <img src={icon2} className="w-full py-8 md:w-96"></img>
        </div>
        <p className="text-sm text-center lg:text-base">
          Anda bisa konsultasikan ke kami untuk pembuatan aplikasi khsusus atau
          custom <span className="text-red-500 font-bold">Secara Gratis </span>
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="https://wa.me/6289618601348"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-orange-500 text-sm lg:text-base text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Konsultasi Sekarang
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaketJasa;
