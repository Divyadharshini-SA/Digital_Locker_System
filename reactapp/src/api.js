import axios from "axios";
// const API_BASE = "https://8080-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io/api";
const API_BASE = "http://localhost:8081/api";
// Auth
export const register = (username, email, password, role, adminKey) =>
    axios.post(`${API_BASE}/auth/register`, { username, email, password, role, adminKey });
export const login = (email, password,adminKey) =>
    axios.post(`${API_BASE}/auth/login`, { email, password,adminKey });

// Auth header helper
export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Documents
export const uploadDocument = (formData) =>
    axios.post(`${API_BASE}/documents/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() }
});
export const getDocuments = () =>
    axios.get(`${API_BASE}/documents/list`, { headers: getAuthHeader() });
export const getDocumentContent = (id) =>
    axios.get(`${API_BASE}/documents/content/${id}`, { headers: getAuthHeader() });
export const deleteDocumentApi = (id) =>
    axios.delete(`${API_BASE}/documents/${id}`, { headers: getAuthHeader() });
export const downloadDocument = (id) =>
    axios.get(`${API_BASE}/documents/download/${id}`, { headers: getAuthHeader(), responseType: "blob" });
// export const renameDocumentApi = (id, filename) =>
//     axios.put(`${API_BASE}/documents/rename/${id}`, {filename }, { headers: getAuthHeader() });
export const renameDocumentApi = (id, newName) =>
    axios.put(`${API_BASE}/documents/rename/${id}?newName=${encodeURIComponent(newName)}`, {}, { 
        headers: getAuthHeader() 
});
export const restoreDocumentApi = (id) =>
    axios.put(`${API_BASE}/documents/restore/${id}`, {}, { headers: getAuthHeader() });

// Admin APIs
export const getAdminStats = () => axios.get(`${API_BASE}/admin/stats`, { headers: getAuthHeader() });
export const getAdminUsers = () => axios.get(`${API_BASE}/admin/users`, { headers: getAuthHeader() });
export const getAdminDocuments = () => axios.get(`${API_BASE}/admin/documents`, { headers: getAuthHeader() });
export const getAdminLogs = () => axios.get(`${API_BASE}/admin/logs`, { headers: getAuthHeader() });

// import axios from "axios";
// const API_BASE = "https://8080-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io/api";

// // Auth
// export const register = (username, email, password) =>
//     axios.post(`${API_BASE}/auth/register`, { username, email, password });

// export const login = (email, password) =>
//     axios.post(`${API_BASE}/auth/login`, { email, password });


// // Auth header helper
// const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // Documents
// export const uploadDocument = (formData) =>
//     axios.post(`${API_BASE}/documents/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() }
// });
// export const getDocuments = () =>
//     axios.get(`${API_BASE}/documents/list`, { headers: getAuthHeader() });

// export const getDocumentContent = (id) =>
//     axios.get(`${API_BASE}/documents/content/${id}`, { headers: getAuthHeader() });

// export const deleteDocumentApi = (id) =>
//     axios.delete(`${API_BASE}/documents/${id}`, { headers: getAuthHeader() });

// export const downloadDocument = (id) =>
//     axios.get(`${API_BASE}/documents/download/${id}`, { headers: getAuthHeader(), responseType: "blob" });

// export const renameDocumentApi = (id, newName) =>
//     axios.put(`${API_BASE}/documents/rename/${id}`, { newName }, { headers: getAuthHeader() });

// export const restoreDocumentApi = (id) =>
//     axios.put(`${API_BASE}/documents/restore/${id}`, {}, { headers: getAuthHeader() });


  




// import axios from 'axios';
// const API_BASE = "https://8080-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io/api/documents";
// //const API_BASE="http://localhost:8080/api/documents";
// export const uploadDocument=(file, email ="user@example.com")=>{
//     const formData=new FormData();
//     formData.append("file",file);
//     formData.append("email",email);
//     return axios.post(`${API_BASE}/upload`,formData,{
//         headers:{"Content-Type":"multipart/form-data"},
//     });
// };
// export const getDocuments = () => axios.get(`${API_BASE}/list`);
// export const getDocumentContent = (id) => axios.get(`${API_BASE}/content/${id}`);
// export const deleteDocumentApi = (id) => axios.delete(`${API_BASE}/${id}`);
// export const downloadDocument = (id) => {
//     return axios.get(`${API_BASE}/download/${id}`, {
//         responseType: 'blob',  // Important for downloading files
//     });
// }
// export const getActivityLog = () => api.get("/activity-logs");






//user auth
// import axios from "axios";
// const API_BASE = "https://8080-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io/api";
// // Get JWT token from localStorage
// const getAuthHeader = () => {
//     const token = localStorage.getItem("token"); // Save token after login
//     return token ? { Authorization: `Bearer ${token}` } : {};
// };
// // Auth
// export const register = (username, email, password) =>
//     axios.post(`${API_BASE}/auth/register`, { username, email, password });
// export const login = (email, password) =>
//     axios.post(`${API_BASE}/auth/login`, { email, password });
// // Documents
// export const uploadDocument = async (formData) => {
//     const token = localStorage.getItem("token"); // get JWT token after login
//     return await axios.post(`${API_BASE}/documents/upload`, formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${token}`  // 🔑 add this
//         }
//     });
// };
// export const getDocuments = () =>
//     axios.get(`${API_BASE}/documents/list`, { headers: getAuthHeader() });
// export const getDocumentContent = (id) =>
//     axios.get(`${API_BASE}/documents/content/${id}`, { headers: getAuthHeader() });
// export const deleteDocumentApi = (id) =>
//     axios.delete(`${API_BASE}/documents/${id}`, { headers: getAuthHeader() });
// export const downloadDocument = (id) =>
//     axios.get(`${API_BASE}/documents/download/${id}`, {
//         headers: getAuthHeader(),
//         responseType: "blob",
// });