import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc as firestoreDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../Config/Firebase/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";

const ModalUploadCv = ({ isOpen, onClose, initialDocument, refresh }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (initialDocument) {
      setFile(null); // Clear any existing file selection
    }
  }, [initialDocument]);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2) + " MB");
      setErrorMessage("");
    } else {
      setFile(null);
      setFileSize("");
      setErrorMessage("Please select a PDF file.");
    }
  };

  useEffect(() => {
    return () => {
      setUploadProgress(0);
    };
  }, []);

  const handleUpload = async () => {
    if (file) {
      try {
        setLoading(true);
        const storageRef = ref(storage, `dokuments/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(Math.round(progress));
          },
          (error) => {
            console.error("Error uploading:", error);
            setErrorMessage("Error uploading file.");
            setLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                if (initialDocument) {
                  // Update existing document
                  await updateDoc(
                    firestoreDoc(db, "dokuments", initialDocument.id),
                    {
                      name: file.name,
                      url: downloadURL,
                      createdAt: new Date(),
                    }
                  );
                } else {
                  // Add new document
                  await addDoc(collection(db, "dokuments"), {
                    name: file.name,
                    url: downloadURL,
                    createdAt: new Date(),
                  });
                }
                refresh();
                setUploadProgress(0);
                setLoading(false);
                setFile(null);
                setFileSize("");
                onClose();
                toast.success("Dokumen berhasil diupload");
              }
            );
          }
        );
      } catch (error) {
        console.error("Error uploading:", error);
        setErrorMessage("Error uploading file.");
        setLoading(false);
      }
    } else {
      console.log("No file selected or incorrect file type");
    }
  };

  const handleOpenFileDialog = () => {
    // Simulate click on hidden file input
    document.getElementById("fileInput").click();
  };

  const handleClearFile = () => {
    setFile(null);
    setFileSize("");
    setErrorMessage("");
    setUploadProgress(0);
    document.getElementById("fileInput").value = null; // Clear the file input field
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg md:w-[50%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          {initialDocument ? "Edit Dokumen" : "Upload Dokumen"}
        </h2>
        <div className="mb-4 flex justify-center">
          {file ? (
            <div className="flex items-center gap-4 border p-4">
              <p>{file.name}</p>
              <button
                onClick={handleClearFile}
                className="text-red-500 font-semibold hover:underline focus:outline-none"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenFileDialog}
              className="border text-black px-4 py-2 rounded-md transition"
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPlus} />
                <p>
                  {initialDocument
                    ? `Ganti Dokumen (${initialDocument.name})`
                    : "Tambah Dokumen"}
                </p>
              </div>
            </button>
          )}
          <input
            type="file"
            id="fileInput"
            accept="application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        {file && <p className="mb-2">File size: {fileSize}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex flex-col-reverse justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={handleUpload}
            className="relative inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-blue-600 disabled:bg-gray-500"
          >
            {loading ? (
              <>
                <span className="mr-2 text-white">Uploading...</span>
                <span className="text-white">{uploadProgress}%</span>
              </>
            ) : initialDocument ? (
              "Simpan Perubahan"
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ModalUploadCv;
