import React, { useState } from "react";
import { formatRupiah } from "../../../../utils/utils";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, deleteDoc } from "firebase/firestore";
import ConfirmationModal from "../modal/ModalDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../../Config/Firebase/FirebaseConfig";
import ModalEditProduk from "../modal/ModalEditProduk";

const CardListProduk = (props) => {
  const { dataList, refresh } = props;
  const [openEdit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEditProduk = (data) => {
    setEdit(true);
    setData(data);
  };

  const handleDeleteClick = (product) => {
    setShowConfirm(true);
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    try {
      const productRef = doc(db, "projects", productToDelete.id);
      await deleteDoc(productRef);
      toast.success("Produk berhasil dihapus!", {
        onClose: () => window.location.reload(),
        autoClose: 1000,
      });
      refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
      console.error("Error deleting product: ", error);
    } finally {
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  const onClose = () => {
    setEdit(false);
  };

  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  return (
    <div>
      {dataList.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 pb-10 ${
            sidebarOpen ? "md:grid-cols-2" : "md:grid-cols-2"
          } lg:grid-cols-3 gap-4 lg:py-8`}
        >
          {dataList.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border shadow-md p-4 rounded-md transition-transform duration-300 transform relative"
            >
              <p className="text-xs bg-gray-200 text-gray-600 py-1 px-2 rounded-full uppercase mb-2 text-center">
                {product.category}
              </p>
              <div className="w-full flex flex-1 justify-center">
                <img
                  src={product.thumb}
                  alt=""
                  className="lg:w-40 max-h-96 object-cover rounded-lg"
                />
              </div>

              <div className="mt-4 flex ">
                <h3 className="lg:text-base text-sm md:text-base font-semibold mb-2 ">
                  {product.name}
                </h3>
              </div>
              <div className="flex flex-col w-full gap-2 mt-2">
                <button
                  className="bg-sky-400 text-white px-3 py-1 rounded-md w-full"
                  onClick={() => handleEditProduk(product)}
                >
                  <div className="flex items-center justify-center gap-2 text-xs lg:text-base md:text-base">
                    <FontAwesomeIcon icon={faPenClip} className="text-white" />
                    Edit
                  </div>
                </button>
                <button
                  className="bg-white border-red-500 border text-black px-3 py-1 rounded-md w-full"
                  onClick={() => handleDeleteClick(product)}
                >
                  <div className="flex items-center justify-center gap-2 text-xs lg:text-base md:text-base">
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                    Hapus
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center mt-32 text-gray-500 lg:text-base md:text-base h-full mx-auto items-center">
          Produk Tidak ditemukan
        </p>
      )}
  {openEdit && (
        <ModalEditProduk data={data} onClose={onClose} refresh={refresh} />
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Apakah Anda yakin ingin menghapus produk ini?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default CardListProduk;
