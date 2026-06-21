import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <div className="home">
            <div className="home-top">
                <h1>Digital Locker System</h1>
                {user && (
                    <div className="hello">
                        Hello, <strong>{user.name}</strong>
                    </div>
                )}
            </div>
            <p className="tagline">Manage your documents securely.</p>
            <div className="cta">
                <Link to="/upload" className="btn">
                    <button>Upload Document</button>
                </Link>
                <Link to="/documents" className="btn secondary">
                    <button>View Documents</button>
                </Link>
            </div>
        </div>
    );
};
export default Home;








// import React from "react";
// import {Link} from "react-router-dom";
// import "./home.css";
// const Home=()=>{
//     return(
//         <div className="home">
//             <h1>Digital Locker</h1>
//             {/* <p>Securely upload and manage your documents.</p> */}
//             <p>Manage your documents securely.</p>
//             <Link to="/upload" className="btn">
//                 <button>Upload Document</button>
//             </Link>
//         </div>
//     );
// };
// export default Home;


//USER aUTH
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./home.css";
// const Home = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };
//     return (
//         <div className="home">
//             <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
//                 <h1>Digital Locker System</h1>
//             </div>
//             <p>Manage your documents securely.</p>
//             <Link to="/upload" className="btn">
//                 <button>Upload Document</button>
//             </Link>
//         </div>
//     );
// };
// export default Home;
