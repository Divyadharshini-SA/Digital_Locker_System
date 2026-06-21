import React from "react";



const FolderTable = ({ folders }) => {

    return (

        <div>

            <h2>Folders</h2>

            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "white", borderRadius: "8px" }}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Folder Name</th>

                        <th>Owner</th>

                        <th>Documents Count</th>

                    </tr>

                </thead>

                <tbody>

                    {folders.length > 0 ? (

                        folders.map(folder => (

                            <tr key={folder.id}>

                                <td>{folder.id}</td>

                                <td>{folder.name}</td>

                                <td>{folder.ownerEmail}</td>

                                <td>{folder.documentCount}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4" align="center">No folders found</td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};



export default FolderTable;
