import React from "react";



const DocumentTable = ({ documents }) => {

    return (

        <div>

            <h2>Documents</h2>

            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "white", borderRadius: "8px" }}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Filename</th>

                        <th>Email</th>

                        <th>Size</th>

                        <th>Uploaded Date</th>

                    </tr>

                </thead>

                <tbody>

                    {documents.length > 0 ? (

                        documents.map(doc => (

                            <tr key={doc.id}>

                                <td>{doc.id}</td>

                                <td>{doc.filename}</td>

                                <td>{doc.email}</td>

                                <td>{(doc.size / 1024).toFixed(2)} KB</td>

                                <td>{new Date(doc.uploadedDate).toLocaleString()}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="5" align="center">No documents found</td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};



export default DocumentTable;

