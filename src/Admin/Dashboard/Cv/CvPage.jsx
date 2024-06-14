import React, { useState, useEffect } from "react";
import ModalUploadCv from "./components/ModalUploadCv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Config/Firebase/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import useCv from "../../../Hooks/Cv/useCv";

const CvPage = () => {
  const {
    handleAddDocument,
    handleCloseModal,
    handleDeleteDocument,
    handleEditDocument,
    handleOpenModal,
    document,
    fetchDocument,
    isModalOpen,
    loading,
  } = useCv();

  if (loading)
    return (
      <p className="h-screen flex justify-center mx-auto mt-24">
        Memuat data...
      </p>
    );
  return (
    <>
      <div className="flex lg:justify-between md:justify-between justify-between flex-row lg:flex-row md:flex-row items-center mb-4">
        <p className="lg:text-lg md:text-lg text-sm font-semibold">
          Dokumen CV Saya
        </p>
      </div>
      <hr className="border-b mb-8" />
      <div className="flex md:justify-between md:flex-row lg:flex-row flex-col gap-4 lg:justify-between mb-4">
        <div>
          <button
            disabled={document}
            className="bg-oren text-white px-3 py-1 disabled:bg-gray-500  rounded-md mr-2 w-full text-xs lg:text-base md:text-base"
            onClick={handleOpenModal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Tambah Dokumen
          </button>
          {document && (
            <p className="text-xs text-red-500 mt-1">
              *Hanya dapat upload 1 dokumen
            </p>
          )}
        </div>
      </div>

      {document && (
        <>
          <embed
            src={document.url}
            type="application/pdf"
            width="100%"
            height="1000px"
          />

          <div className="flex justify-start flex-col-reverse gap-2 mt-4">
            <button
              onClick={handleDeleteDocument}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-400 transition"
            >
              Hapus
            </button>
            <button
              onClick={handleEditDocument}
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
            >
              Ganti Dokumen
            </button>
          </div>
        </>
      )}

      {!document && (
        <div className="flex justify-center h-screen mx-auto mt-24">
          <p className="text-center ">Belum ada dokumen</p>
        </div>
      )}

      <ModalUploadCv
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpload={handleAddDocument}
        initialDocument={document}
        refresh={fetchDocument}
      />
      <ToastContainer />
    </>
  );
};

export default CvPage;
