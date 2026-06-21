import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import DocumentTable from "./DocumentTable";
import ActivityLogTable from "./ActivityLogTable";
import { getAdminUsers, getAdminDocuments, getAdminLogs } from "../api";
import "./AdminDashboard.css";
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [users, setUsers] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({
        users: 0,
        documents: 0,
        logs: 0,
    });
    const navigate = useNavigate();
    useEffect(() => {
        fetchUsers();
        fetchDocuments();
        fetchLogs();
    }, []);
    const fetchUsers = async () => {
        try {
            const res = await getAdminUsers();
            const userList = res.data.filter((u) => u.role === "USER");
            setUsers(userList);
            setStats((prev) => ({ ...prev, users: userList.length }));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDocuments = async () => {
        try {
            const res = await getAdminDocuments();
            setDocuments(res.data);
            setStats((prev) => ({ ...prev, documents: res.data.length }));
        } catch (err) {
            console.error(err);
        }
    };
    const fetchLogs = async () => {
        try {
            const res = await getAdminLogs();
            setLogs(res.data);
            setStats((prev) => ({ ...prev, logs: res.data.length }));
        } catch (err) {
            console.error(err);
        }
    };

    const renderBody = () => {
        switch (activeTab) {
            case "users":
                return <UserTable users={users} />;
            case "documents":
                return <DocumentTable documents={documents} />;
            case "logs":
                return <ActivityLogTable logs={logs} />;
            default:
                return (
                    <div className="admin-home">
                        <div className="stat-box">
                            <h3>Users</h3>
                            <p>{stats.users}</p>
                        </div>
                        <div className="stat-box">
                            <h3>Documents</h3>
                            <p>{stats.documents}</p>
                        </div>
                        <div className="stat-box">
                            <h3>Activity Logs</h3>
                            <p>{stats.logs}</p>
                        </div>
                    </div>
                );
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="admin-container">
            <nav className="admin-navbar">
                <h2 className="logo">Admin Dashboard</h2>
                <ul className="nav-links">
                    <li>
                        <span onClick={() => setActiveTab("users")}>Users</span>
                    </li>
                    <li>
                        <span onClick={() => setActiveTab("documents")}>Documents</span>
                    </li>
                    <li>
                        <span onClick={() => setActiveTab("logs")}>Activity Logs</span>
                    </li>
                    <li className="user-menu">
                        <span className="logout-text" onClick={handleLogout}>
                            Logout
                        </span>
                    </li>
                </ul>
            </nav>
            <main>{renderBody()}</main>
            <footer className="footer">
                <p>&copy; 2025 Digital Locker</p>
            </footer>
        </div>
    );
};
export default AdminDashboard;
