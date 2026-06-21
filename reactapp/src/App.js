import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import RegisterPage from "./components/RegisterPage";

import Home from "./components/Home";

import UploadPage from "./components/UploadPage";

import DocumentList from "./components/DocumentList";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";


// Protected layout for users
function ProtectedLayout({ children }) {

    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    return (

        <>

            <Navbar />

            {children}

            <Footer />

        </>

    );

}



// Protected layout for admins

function AdminLayout({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "ADMIN") {

        return <Navigate to="/login" />;

    }

    return children;

}



function App() {

    return (

        <Router>

            <Routes>

                {/* Public routes */}

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />



                {/* Protected user routes */}

                <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />

                <Route path="/upload" element={<ProtectedLayout><UploadPage /></ProtectedLayout>} />

                <Route path="/documents" element={<ProtectedLayout><DocumentList /></ProtectedLayout>} />

                {/* Admin routes */}

                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />



                {/* Fallback */}

                <Route path="*" element={<Navigate to="/login" />} />

            </Routes>

        </Router>

    );

}



export default App;




