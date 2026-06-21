import { useState } from "react";
import { uploadDocument } from "../api";


export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("file", file);
            await uploadDocument(formData);
            setMessage("File uploaded Successfully!");
            setFile(null);
        } catch (err) {
            console.error(err?.response?.data || err.message);
            setMessage(
                typeof err?.response?.data === "string"
                    ? err.response.data
                    : "File upload Failed!"
            );
        }
    };
    const containerStyle = {
        maxWidth: "420px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
    };
    const outerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        padding: "20px",
    };
    const inputStyle = { width: "100%", padding: "10px", margin: "10px 0", fontSize: "1rem" };
    const buttonStyle = { width: "100%", padding: "12px", fontSize: "1rem", background: "#1976d2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
    const messageStyle = { marginTop: "12px", textAlign: "center", fontWeight: 600, color: message.includes("Success") ? "green" : "red" };
    return (
        <div style={outerStyle}>
            <div style={containerStyle}>
                <h2 style={{ textAlign: "center", margin: 0 }}>Upload Document</h2>
                <input type="file" accept="*/*" onChange={(e) => setFile(e.target.files[0] || null)} style={inputStyle} />
                <button onClick={handleUpload} style={buttonStyle}>Upload</button>
                {message && <p style={messageStyle}>{message}</p>}
            </div>
        </div>
    );
}


// import { useState } from "react";
// import { uploadDocument } from "../api";
// export default function UploadPage() {
//     const [file, setFile] = useState(null);
//     const [email, setEmail] = useState("user@example.com");
//     const [message, setMessage] = useState("");
//     const handleUpload = async () => {
//         if (!file) {
//             setMessage("Please select a file first");
//             return;
//         }
//         try {
//             await uploadDocument(file, email);
//             setMessage("File uploaded Successfully!");
//         } catch (err) {
//             setMessage("File upload Failed!");
//         }
//     };
//     const containerStyle = {
//         maxWidth: "400px",
//         margin: "40px auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     };
//     const outerContainerStyle = {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "75vh",  // or "100vh" if you want full screen vertical center
//         padding: "20px",
//     };
//     const inputStyle = {
//         width: "100%",
//         padding: "8px 12px",
//         margin: "10px 0",
//         boxSizing: "border-box",
//         fontSize: "1rem",
//     };
//     const buttonStyle = {
//         padding: "10px 20px",
//         fontSize: "1rem",
//         backgroundColor: "#1976d2",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         marginTop: "10px",
//     };
//     const messageStyle = {
//         marginTop: "15px",
//         fontWeight: "600",
//         color: message.includes("Successfully") ? "green" : "red",
//         textAlign: "center",
//     };
//     return (
//         <div style={outerContainerStyle}>
//             <div style={containerStyle}>
//                 <h2 style={{ textAlign: "center" }}>Upload Document</h2>
//                 <input
//                     type="file"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     style={inputStyle}
//                 />
//                 {/* <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     style={inputStyle}
//                 /> */}
//                 <div style={{ textAlign: "center" }}>
//                     <button onClick={handleUpload} style={buttonStyle}>
//                         Upload
//                     </button>
//                 </div>
//                 {/* {message && <p style={messageStyle}>{message}</p>} */}
//                 {message && (
//                     <p style={{ ...messageStyle, color: message.includes("Successfully") ? "green" : "red", textAlign:"center" }}>
//                         {message}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// }


// // Using auth
// import { useState } from "react";
// import { uploadDocument } from "../api";
// export default function UploadPage() {
//     //const user = JSON.parse(localStorage.getItem("user"));
//     const [file, setFile] = useState(null);
//     //const [email, setEmail] = useState("user@example.com");
//     const user = JSON.parse(localStorage.getItem("user"));
//     const [email, setEmail] = useState(user?.email || "");
//     const [message, setMessage] = useState("");
//     // const handleUpload = async () => {
//     //     if (!file) {
//     //         setMessage("Please select a file first");
//     //         return;
//     //     }
//     //     try {
//     //         await uploadDocument(file);
//     //         setMessage("File uploaded Successfully!");
//     //         // setEmail(email);
//     //     } catch (err) {
//     //         console.error(err.response?.data||err.message);
//     //         setMessage("File upload Failed!");
//     //     }
//     // };
//     const handleUpload = async () => {
//         if (!file) {
//             setMessage("Please select a file first");
//             return;
//         }
//         try {
//             const formData = new FormData();
//             formData.append("file", file); // 🔑 must match @RequestParam("file")
//             await uploadDocument(formData); // ✅ pass FormData, not raw file
//             setMessage("File uploaded Successfully!");
//         } catch (err) {
//             console.error(err.response?.data || err.message);
//             setMessage("File upload Failed!");
//         }
//     };
//     const containerStyle = {
//         maxWidth: "400px",
//         margin: "40px auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     };
//     const outerContainerStyle = {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "80vh",  // or "100vh" if you want full screen vertical center
//         padding: "20px",
//     };
//     const inputStyle = {
//         width: "100%",
//         padding: "8px 12px",
//         margin: "10px 0",
//         boxSizing: "border-box",
//         fontSize: "1rem",
//     };

//     const buttonStyle = {
//         padding: "10px 20px",
//         fontSize: "1rem",
//         backgroundColor: "#1976d2",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         marginTop: "10px",
//     };
//     const messageStyle = {
//         marginTop: "15px",
//         fontWeight: "600",
//         color: message.includes("Successfully") ? "green" : "red",
//         textAlign: "center",
//     };
//     return (
//         <div style={outerContainerStyle}>
//             <div style={containerStyle}>
//                 <h2 style={{ textAlign: "center" }}>Upload Document</h2>
//                 <input
//                     type="file"
//                     accept="*/*"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     style={inputStyle}
//                 />
//                 <div style={{ textAlign: "center" }}>
//                     <button onClick={handleUpload} style={buttonStyle}>
//                         Upload
//                     </button>
//                 </div>
//                 {message && <p style={messageStyle}>{message}</p>}
//             </div>
//         </div>
//     );
// }

