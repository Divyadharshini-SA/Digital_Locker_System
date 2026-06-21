import React from "react";
import "./ActivityLogTable.css"; 

const ActivityLogTable = ({ logs }) => {
    if (!logs || logs.length === 0) {
        return <p className="no-logs">No activity logs found.</p>;
    }
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleString();
    };
    const getActionClass = (action) => {
        switch (action) {
            case "DELETE":
                return "action-delete";
            case "RENAME":
                return "action-rename";
            case "UPLOAD":
                return "action-upload";
            default:
                return "action-other";
        }
    };
    return (
        <div className="table-container">
            <table className="activity-log-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Document ID</th>
                        <th>Action</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.userId}</td>
                            <td>{log.documentId}</td>
                            <td className={getActionClass(log.action)}>{log.action}</td>
                            <td>{formatDate(log.date||log.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    );
};
export default ActivityLogTable;

