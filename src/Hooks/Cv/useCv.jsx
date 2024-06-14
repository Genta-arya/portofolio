import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Config/Firebase/FirebaseConfig";

const useCv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const documentsSnapshot = await getDocs(collection(db, "dokuments"));
      if (documentsSnapshot.empty) {
        console.log("No document found in Firestore.");
        return;
      }
      const firstDocument = documentsSnapshot.docs[0];
      setDocument({
        id: firstDocument.id,
        ...firstDocument.data(),
      });
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocument();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDocument = (newDocument) => {
    setDocument(newDocument);
  };

  const handleDeleteDocument = async () => {
    if (!document) {
      console.warn("No document to delete.");
      return;
    }

    try {
      await deleteDoc(doc(db, "dokuments", document.id));
      setDocument(null);
      toast.success("Dokumen Dihapus");
      fetchDocument();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleEditDocument = () => {
    setIsModalOpen(true);
  };
  return {
    handleAddDocument,
    handleCloseModal,
    handleDeleteDocument,
    handleOpenModal,
    handleEditDocument,
    fetchDocument,
    setDocument,
    setIsModalOpen,
    document,
    isModalOpen,
    loading,
  };
};

export default useCv;
