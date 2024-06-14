import { useState, useEffect } from "react";
import { db } from "../../Config/Firebase/FirebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

const useProjects = (id) => {
  const [projects, setProjects] = useState([]);
  const [webProjects, setWebProjects] = useState([]);
  const [mobileProjects, setMobileProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectsList);
      setTotalProjects(projectsList.length);

      const webProjectsList = projectsList.filter(
        (project) => project.category === "web"
      );
      setWebProjects(webProjectsList);

      const mobileProjectsList = projectsList.filter(
        (project) => project.category === "mobile"
      );
      setMobileProjects(mobileProjectsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectById = async (id) => {
    setLoading(true);
    try {
      const projectDoc = await getDoc(doc(db, "projects", id));
      if (projectDoc.exists()) {
        const projectData = {
          id: projectDoc.id,
          ...projectDoc.data(),
        };
        setProjects([projectData]); 
        setTotalProjects(1); 
        setWebProjects(projectData.category === "web" ? [projectData] : []);
        setMobileProjects(projectData.category === "mobile" ? [projectData] : []);
      } else {
        setError("Project not found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {

      fetchProjectById(id);
    } else {
  
      fetchProjects();
    }
  }, [id]);

  return {
    projects,
    webProjects,
    mobileProjects,
    loading,
    error,
    totalProjects,
    fetchProjects,
    setProjects,
  };
};

export default useProjects;
