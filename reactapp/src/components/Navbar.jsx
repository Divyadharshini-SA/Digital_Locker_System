import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <nav className="navbar">
            <h2 className="logo">Digital Locker System</h2>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/upload" onClick={() => setMenuOpen(false)}>Upload</Link></li>
                <li><Link to="/documents" onClick={() => setMenuOpen(false)}>Documents</Link></li>
                {user && (
                    <li className="user-menu">
                        <span onClick={() => setOpen(!open)}><AccountCircleIcon className="white-icon" fontSize="large"/></span>
                        {open && (
                            <div className="dropdown">
                                <h3 className="user-name"> {user.name}</h3>      
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>

                )}

            </ul>
        </nav>
    );

};
export default Navbar;



//user Auth
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css"; // Import styles
// const Navbar = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };
//     return (
//         <nav className="navbar">
//             <h2 className="logo">Digital Locker</h2>
//             {/* Hamburger Menu */}
//             <div
//                 className="hamburger"
//                 onClick={() => setMenuOpen(!menuOpen)}
//             >
//                 ☰
//             </div>
//             {/* Links */}
//             <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
//                 <li>
//                     <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
//                 </li>
//                 <li>
//                     <Link to="/upload" onClick={() => setMenuOpen(false)}>Upload</Link>
//                 </li>
//                 <li>
//                     <Link to="/documents" onClick={() => setMenuOpen(false)}>Documents</Link>
//                 </li>
//                 {user && (
//                     <li className="user-menu">
//                         <span onClick={() => setOpen(!open)}>👤 {user.name}</span>
//                         {open && (
//                             <div className="dropdown">
//                                 <button className="logout-btn" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// };
// export default Navbar;


//without Auth
 //import React from "react";
// import {Link} from "react-router-dom";
// const Navbar=()=>{
//     return(
//         <nav className="navbar">
//             <h2 style={{color: "white"}}>Digital Locker</h2>
//             <ul>
//                 <Link to="/">Home</Link>
//                 <Link to="/upload">Upload</Link>
//                 <Link to="/documents">Documents</Link>
//             </ul>
//         </nav>
//     );
// };
// export default Navbar;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };
//     return (
//         <nav className="navbar" style={styles.navbar}>
//             <h2 style={styles.logo}>Digital Locker</h2>
//             <ul style={styles.navLinks}>
//                 <li><Link to="/home" style={styles.link}>Home</Link></li>
//                 <li><Link to="/upload" style={styles.link}>Upload</Link></li>
//                 <li><Link to="/documents" style={styles.link}>Documents</Link></li>
//                 {user && (
//                     <li style={styles.userMenu}>
//                         <span style={styles.user} onClick={() => setOpen(!open)}>
//                             👤 {user.name}
//                         </span>
//                         {open && (
//                             <div style={styles.dropdown}>
//                                 <button style={styles.logoutBtn} onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// };
// const styles = {
//     navbar: {
//         backgroundColor: "#2c3e50",
//         padding: "10px 20px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center"
//     },
//     logo: {
//         color: "white",
//         margin: 0
//     },
//     navLinks: {
//         listStyle: "none",
//         display: "flex",
//         gap: "20px",
//         margin: 0,
//         alignItems: "center"
//     },
//     link: {
//         color: "white",
//         textDecoration: "none"
//     },
//     userMenu: {
//         position: "relative",
//         cursor: "pointer"
//     },
//     user: {
//         color: "white",
//         fontWeight: "bold"
//     },
//     dropdown: {
//         position: "absolute",
//         top: "30px",
//         right: 0,
//         backgroundColor: "white",
//         borderRadius: "5px",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
//         padding: "10px"
//     },
//     logoutBtn: {
//         background: "transparent",
//         border: "none",
//         cursor: "pointer",
//         color: "red",
//         fontWeight: "bold"
//     }
// };


// export default Navbar;

                                                                                                                                                            