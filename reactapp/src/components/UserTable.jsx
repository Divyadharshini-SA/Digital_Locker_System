import React from "react";



const UserTable = ({ users }) => {

    return (

        <div>

            <h2>Users</h2>

            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "white", borderRadius: "8px" }}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Username</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Storage Used</th>

                    </tr>

                </thead>

                <tbody>

                    {users.length > 0 ? (

                        users.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.username}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>{(user.storageUsed / 1024 / 1024).toFixed(2)} MB</td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="5" align="center">No users found</td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};



export default UserTable;

