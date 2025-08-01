import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConstructorDetails = () => {
  const { id } = useParams(); // constructorId
  const navigate = useNavigate();
  const [constructor, setConstructor] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [constructorRes, projectsRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/constructors/${id}`, { headers }),
          axios.get(`http://localhost:3000/api/projects/constructor/${id}`, { headers }),
        ]);

        setConstructor(constructorRes.data);
        setProjects(projectsRes.data || []);
      } catch (err) {
        console.error("Error fetching constructor/project data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleProjectClick = (projectId) => {
    navigate(`/constructor/${id}/project/${projectId}`);
  };

  if (loading) return <div className="mt-20 text-center text-xl">Loading...</div>;
  if (!constructor) return <div className="mt-20 text-center text-red-500">Constructor not found.</div>;

  return (
    <div className="mt-20 py-8 bg-gradient-to-r from-purple-200 via-blue-100 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto"
          src={constructor.imageUrl || "https://via.placeholder.com/150"}
          alt={constructor.name}
        />
        <h1 className="text-3xl font-bold text-center mb-4">{constructor.name}</h1>
        <p className="text-gray-700 text-center mb-2">{constructor.specialization}</p>
        <p className="text-gray-500 text-center mb-4">{constructor.location}</p>
        <div className="text-yellow-400 flex items-center justify-center mb-2">
          <svg className="inline w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {constructor.rating?.toFixed(1) || "N/A"}
        </div>
        <p className="text-gray-500 text-center">{constructor.reviews?.length || 0} Reviews</p>

        {/* Projects Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-600">No projects found for this constructor.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border border-neutral-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project._id)}
                >
                  <img
                    src={project.images?.[0] || "https://via.placeholder.com/400x200"}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-700 mb-1">{project.description}</p>
                    <p className="text-sm text-gray-500 mb-1">📍 {project.location}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      🏁 Start: {new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      ✅ Completion: {new Date(project.completionDate).toLocaleDateString()}
                    </p>
                    <p className={`text-sm font-medium mt-2 ${project.status === "ongoing" ? "text-blue-600" : "text-green-600"}`}>
                      Status: {project.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructorDetails;
