import React, { useState } from "react";
import { register, login } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [adminKey, setAdminKey] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showAdminKey,setShowAdminKey]=useState(false);
    const navigate = useNavigate();
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setMessage("Please enter a valid email");
            return;
        }
        try {
            await register(username, email, password, role, adminKey);
            const res = await login(email, password);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            }));
            navigate("/home");
        } catch (err) {
            setMessage(err.response?.data || "Registration failed");
        }
    };
    return (
        <div style={outerContainer}>
            <div style={card}>
                <h1>Digital Locker System</h1>
                <h2>Register</h2>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                <div style={{ position: "relative", width: "100%" }}>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
                         {showPassword ? <FiEyeOff /> : <FiEye />}
                     </span>
                </div>
                <select value={role} onChange={e => setRole(e.target.value)} style={inputStyle}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                {role === "ADMIN" && (
                    <div style={{ position: "relative", width: "100%", marginTop: "10px" }}>
                        <input
                            type={showAdminKey ? "text" : "password"}
                            placeholder="Admin Key"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            style={{ ...inputStyle, paddingRight: "40px" }}
                        />
                        <span onClick={() => setShowAdminKey(!showAdminKey)} style={eyeStyle}>
                            {showAdminKey ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                )}
            
                <button onClick={handleRegister} style={buttonStyle}>Register</button>
                {message && <p style={messageStyle}>{message}</p>}
                <p>Already registered? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}
const outerContainer = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #4b79a1, #283e51)", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: "20px" };
const card = { backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: "400px", width: "100%", textAlign: "center" };
const title = { marginBottom: "10px", color: "#1976d2", fontSize: "28px", fontWeight: "700" };
const subtitle = { marginBottom: "30px", color: "#555", fontSize: "20px", fontWeight: "500" };
const inputStyle = { width: "100%", padding: "12px 15px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box", outline: "none" };
const eyeStyle = { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#555", fontSize: "20px" };
const buttonStyle = { width: "100%", padding: "12px", marginTop: "20px", borderRadius: "8px", border: "none", backgroundColor: "#1976d2", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer" };
const messageStyle = { marginTop: "15px", color: "red", fontWeight: "600" };
const footerText = { marginTop: "20px", color: "#555", fontSize: "14px" };
const linkStyle = { color: "#1976d2", textDecoration: "underline" };





// import React, { useState } from "react";
// import { register, login } from "../api";
// import { useNavigate, Link } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function RegisterPage() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();
//     const handleRegister = async () => {
//         try {
//             await register(username, email, password);
//             const res = await login(email, password);
//             console.log("status",res.data);
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("user", JSON.stringify({ username: res.data.username, email: res.data.email }));
//             navigate("/home");
//         } catch (err) {
//             setMessage(
//                 typeof err?.response?.data === "string"
//                     ? err.response.data
//                     : "Registration failed. Try again."
//             );
//         }
//     };
//     return (
//         <div style={outerContainer}>
//             <div style={card}>
//                 <h1 style={title}>Digital Locker System</h1>
//                 <h2 style={subtitle}>Register</h2>
//                 <input
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     style={inputStyle}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     style={inputStyle}
//                 />
//                 <div style={{ position: "relative", width: "100%" }}>
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ ...inputStyle, paddingRight: "40px" }}
//                     />
//                     <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
//                         {showPassword ? <FiEyeOff /> : <FiEye />}
//                     </span>
//                 </div>
//                 <button onClick={handleRegister} style={buttonStyle}>Register</button>
//                 {message && <p style={messageStyle}>{message}</p>}
//                 <p style={footerText}>
//                     Already registered?{" "}
//                     <Link to="/login" style={linkStyle}>Go to login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }
// const outerContainer = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #4b79a1, #283e51)", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: "20px" };
// const card = { backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: "400px", width: "100%", textAlign: "center" };
// const title = { marginBottom: "10px", color: "#1976d2", fontSize: "28px", fontWeight: "700" };
// const subtitle = { marginBottom: "30px", color: "#555", fontSize: "20px", fontWeight: "500" };
// const inputStyle = { width: "100%", padding: "12px 15px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box", outline: "none" };
// const eyeStyle = { position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#555", fontSize: "20px" };
// const buttonStyle = { width: "100%", padding: "12px", marginTop: "20px", borderRadius: "8px", border: "none", backgroundColor: "#1976d2", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer" };
// const messageStyle = { marginTop: "15px", color: "red", fontWeight: "600" };
// const footerText = { marginTop: "20px", color: "#555", fontSize: "14px" };
// const linkStyle = { color: "#1976d2", textDecoration: "underline" };





//user Based
// import React, { useState } from "react";
// import { register, login } from "../api";
// import { useNavigate, Link } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 Eye icons

// export default function RegisterPage() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false); // 👈 toggle password
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();
//     const handleRegister = async () => {
//         try {
//             // 1. Register the user
//             await register(username, email, password);
//             // 2. Auto-login after registration
//             const res = await login(email, password);
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem(
//                 "user",
//                 JSON.stringify({ name: res.data.name, email: res.data.email })
//             );
//             // 3. Navigate to home
//             navigate("/home");
//         } 
//         //catch (err) {
//         //     setMessage(err.response?.data || "Registration failed. Try again.");
//         // }
//         catch (err) {
//                 setMessage(JSON.stringify(err.response?.data) || "Registration failed. Try again.");
//         }
//     };
//     return (
//         <div style={outerContainer}>
//             <div style={card}>
//                 <h1 style={title}>Digital Locker System</h1>
//                 <h2 style={subtitle}>Register</h2>
//                 <input
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     style={inputStyle}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     style={inputStyle}
//                 />
//                 <div style={{ position: "relative", width: "100%" }}>
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ ...inputStyle, paddingRight: "40px" }}
//                     />
//                     <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         style={eyeStyle}
//                     >
//                         {showPassword ? <FiEyeOff /> : <FiEye />}
//                     </span>
//                 </div>
//                 <button onClick={handleRegister} style={buttonStyle}>
//                     Register
//                 </button>
//                 {message && <p style={messageStyle}>{message}</p>}
//                 <p style={footerText}>
//                     Already registered?{" "}
//                     <Link to="/login" style={linkStyle}>
//                         Go to login
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// }
// const outerContainer = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #4b79a1, #283e51)",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     padding: "20px",
// };

// const card = {
//     backgroundColor: "#fff",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//     maxWidth: "400px",
//     width: "100%",
//     textAlign: "center",
// };

// const title = {
//     marginBottom: "10px",
//     color: "#1976d2",
//     fontSize: "28px",
//     fontWeight: "700",
// };

// const subtitle = {
//     marginBottom: "30px",
//     color: "#555",
//     fontSize: "20px",
//     fontWeight: "500",
// };

// const inputStyle = {
//     width: "100%",
//     padding: "12px 15px",
//     margin: "10px 0",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     boxSizing: "border-box",
//     outline: "none",
//     transition: "0.3s",
// };
// const eyeStyle = {
//     position: "absolute",
//     right: "10px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     cursor: "pointer",
//     color: "#555",
//     fontSize: "20px",
// };

// const buttonStyle = {
//     width: "100%",
//     padding: "12px",
//     marginTop: "20px",
//     borderRadius: "8px",
//     border: "none",
//     backgroundColor: "#1976d2",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.3s",
// };
// const messageStyle = {
//     marginTop: "15px",
//     color: "red",
//     fontWeight: "600",
// };
// const footerText = {
//     marginTop: "20px",
//     color: "#555",
//     fontSize: "14px",
// };
// const linkStyle = {
//     color: "#1976d2",
//     textDecoration: "underline",
// };

