import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../../../../Config/Firebase/FirebaseConfig";
import CustomImageInput from "./CustomeImageChange";
import { FRAMEWORKS } from "./Data";

const ModalAddProject = ({ onClose, refresh }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImages, setProjectImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [category, setCategory] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("");

  useEffect(() => {
    return () => {
      setUploadProgress(0);
    };
  }, []);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = projectImages.length + selectedFiles.length;

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

      setProjectImages([...projectImages, ...filteredFiles]);
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...projectImages];
    newImages.splice(index, 1);
    setProjectImages(newImages);
  };

  const addFramework = () => {
    if (selectedFramework) {
      const selectedFrameworkObj = FRAMEWORKS.find(
        (f) => f.id === selectedFramework
      );

      // Check if the selectedFrameworkObj is not null and does not already exist in frameworks
      if (
        selectedFrameworkObj &&
        !frameworks.some((f) => f.id === selectedFrameworkObj.id)
      ) {
        setFrameworks([...frameworks, selectedFrameworkObj]);
        setSelectedFramework("");
      }
    }
  };

  const removeFramework = (framework) => {
    setFrameworks(frameworks.filter((fw) => fw.id !== framework.id));
  };

  const addProjectToFirestore = async (name, description, images) => {
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `projects/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => {
              toast.error("Error uploading image:", error.message || error);
            }
          );

          await uploadTask;

          return await getDownloadURL(storageRef);
        })
      );

      const thumbnailRef = ref(storage, `thumbnails/${thumbnailImage.name}`);
      await uploadBytes(thumbnailRef, thumbnailImage);
      const thumbnailUrl = await getDownloadURL(thumbnailRef);
      const frameworkIds = frameworks.map((framework) => framework.id);
      await addDoc(collection(db, "projects"), {
        name,
        description,
        category,
        linkUrl,
        repositoryLink,
        frameworks: frameworkIds,
        thumb: thumbnailUrl,
        images: imageUrls,
        createdAt: new Date(),
      });

      setUploadProgress(0);
    } catch (error) {
      console.error("Error adding project to Firestore:", error);
      toast.error("Error uploading project:", error.message || error);
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !projectName ||
      !projectDescription ||
      projectImages.length === 0 ||
      !category 
   
    ) {
      setLoading(false);
      return toast.warning("Semua form harus lengkap");
    }
    try {
      await addProjectToFirestore(
        projectName,
        projectDescription,
        projectImages,
        category,
        linkUrl,
        repositoryLink
      );

      toast.success("Project added successfully!", {
        onClose: () => {
          onClose();
          refresh();
          setLoading(false);
        },
        autoClose: 500,
      });
    } catch (error) {
      toast.error("Error uploading project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-[80%] w-[90%] lg:w-[50%] md:h-[90%] overflow-auto h-[95%]">
        <h2 className="lg:text-xl md:text-xl text-base font-bold lg:mb-12 md:mb-8 mb-8 text-center">
          Add Project
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Project Description</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">URL (Optional)</label>
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
            <label className="block mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Kategori Project</option>
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>
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
                {frameworks.map((framework, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md flex items-center"
                  >
                    <span className="mr-1">{framework.name}</span>{" "}
                    <button
                      type="button"
                      onClick={() => removeFramework(framework)}
                      className="ml-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <CustomImageInput
              title={"Thumbnail Project"}
              onChange={(file) => setThumbnailImage(file)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Project Images (PNG, JPG, JPEG only)
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              multiple
              onChange={handleImageChange}
              className="border rounded p-2 w-full"
            />
            {projectImages.length > 0 && (
              <div className="mt-2 flex flex-row flex-wrap items-center justify-center">
                {projectImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`project-${index}`}
                      className="w-20 h-20 object-cover m-2 rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleImageRemove(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 relative"
            >
              {loading ? (
                <>
                  <span className="mr-2">Uploading...</span>
                  <span>{uploadProgress}%</span>
                </>
              ) : (
                "Upload"
              )}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default ModalAddProject;
