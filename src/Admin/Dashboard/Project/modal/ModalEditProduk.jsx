import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import CustomImageInput from "./CustomeImageChange";
import { db, storage } from "../../../../Config/Firebase/FirebaseConfig";
import { FRAMEWORKS } from "./Data"; // Import FRAMEWORKS data

const ModalEditProduk = ({ data, onClose, refresh }) => {
  const [productName, setProductName] = useState(data.name);
  const [productDescription, setProductDescription] = useState(
    data.description
  );
  const [productCategory, setProductCategory] = useState(data.category);
  const [productThumb, setProductThumb] = useState(data.thumb);
  const [productImages, setProductImages] = useState(data.images);
  const [linkUrl, setLinkUrl] = useState(data.linkUrl || "");
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [repositoryLink, setRepositoryLink] = useState(
    data.repositoryLink || ""
  );
  const [frameworks, setFrameworks] = useState(data.frameworks || []); // State untuk menyimpan frameworks
  const [selectedFramework, setSelectedFramework] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbnailUrl = productThumb;
      let uploadedImages = productImages;

      if (!productName || !productDescription || !productCategory || !linkUrl) {
        setLoading(false);
        return toast.warning("Semua field harus diisi");
      }

      if (newImage) {
        const imageRef = ref(storage, `images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        thumbnailUrl = await getDownloadURL(imageRef);
      }

      // Mengunggah gambar baru dan mendapatkan URL unduhan
      uploadedImages = await Promise.all(
        uploadedImages.map(async (image) => {
          if (image instanceof File) {
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            return getDownloadURL(imageRef);
          }
          return image; // Jika sudah berupa URL, kembalikan langsung
        })
      );

      const productRef = doc(db, "projects", data.id);
      await updateDoc(productRef, {
        name: productName,
        description: productDescription,
        category: productCategory,
        thumb: thumbnailUrl,
        images: uploadedImages,
        linkUrl: linkUrl,
        frameworks: frameworks, // Simpan frameworks yang sudah dipilih
      });

      toast.success("Product updated successfully!");

      refresh();
      onClose();
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = productImages.length + selectedFiles.length;

    if (totalImages > 6) {
      toast.warning("You can upload a maximum of 6 images.");
    } else {
      const filteredFiles = selectedFiles.filter((file) => {
        const fileType = file.type.split("/")[1];
        return (
          fileType === "png" ||
          fileType === "jpg" ||
          fileType === "jpeg" ||
          fileType === "gif"
        );
      });

      setProductImages([...productImages, ...filteredFiles]);
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...productImages];
    newImages.splice(index, 1);
    setProductImages(newImages);
  };

  const addFramework = () => {
    if (selectedFramework && !frameworks.includes(selectedFramework)) {
      setFrameworks([...frameworks, selectedFramework]);
      setSelectedFramework("");
    }
  };

  const removeFramework = (framework) => {
    setFrameworks(frameworks.filter((fw) => fw !== framework));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-[80%] w-[90%] lg:w-[50%] py-4 md:h-[90%] overflow-auto h-[95%]">
        <h2 className="lg:text-xl md:text-xl text-base font-bold lg:mb-12 md:mb-8 mb-6 text-center">
          Edit Produk
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nama Produk</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Deskripsi Produk</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Kategori Project</option>
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">URL</label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Repository Link (Optional)</label>
            <input
              type="text"
              value={repositoryLink}
              onChange={(e) => setRepositoryLink(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Frameworks</label>
            <div className="flex items-center mb-2">
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="border rounded p-2 mr-2"
              >
                <option value="">Pilih Framework</option>
                {FRAMEWORKS.map((framework) => (
                  <option key={framework.id} value={framework.id}>
                    {framework.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addFramework}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Tambah
              </button>
            </div>
            {frameworks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {frameworks.map((framework) => (
                  <div
                    key={framework}
                    className="bg-gray-200 px-2 py-1 rounded-md flex items-center"
                  >
                    {FRAMEWORKS.find((fw) => fw.id === framework)?.name}
                    <button
                      type="button"
                      onClick={() => removeFramework(framework)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <CustomImageInput
              onChange={(file) => setNewImage(file)}
              title={"Ganti Thumbnail"}
            />
          </div>

          <div className="mt-4 flex gap-4 justify-center mb-8">
            {!newImage && (
              <div className="flex flex-col items-center">
                <p className="lg:text-sm md:text-sm text-xs mb-1 text-gray-500">
                  Thumbnail Sekarang:
                </p>
                <img
                  src={productThumb}
                  alt="Gambar Sebelumnya"
                  className="lg:w-40 md:w-52 w-20  h-full object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Project Images (PNG, JPG, JPEG only)
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg .gif"
              multiple
              onChange={handleImageChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-4 justify-center">
            {productImages.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={
                    typeof imageUrl === "string"
                      ? imageUrl
                      : URL.createObjectURL(imageUrl)
                  }
                  alt={`Gambar Produk ${index + 1}`}
                  className="w-20 h-20 object-cover m-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              {loading ? "Tunggu..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default ModalEditProduk;
