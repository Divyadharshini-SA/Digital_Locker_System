import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, CircularProgress, Box, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    Chip, MenuItem, Select, InputLabel, FormControl,Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import {
    getDocuments,
    getDocumentContent,
    deleteDocumentApi,
    downloadDocument,
    renameDocumentApi,
    restoreDocumentApi
} from "../api";
export default function DocumentList() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [content, setContent] = useState("");
    const [fileType, setFileType] = useState("");
    const [selectedDocName, setSelectedDocName] = useState("");

    const [renameOpen, setRenameOpen] = useState(false);
    const [renameId, setRenameId] = useState(null);
    const [newName, setNewName] = useState("");

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "archived"
    const [currentPage, setCurrentPage]=useState(1);
    const itemsPerPage=5;

    useEffect(() => { fetchDocs(); }, []);

    const fetchDocs = async () => {
        try {
            setLoading(true);
            const res = await getDocuments();
            setDocuments(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch documents.");
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleString() : "";
    const fetchContent = async (id, filename) => {
        try {
            const res = await getDocumentContent(id);
            const base64Content = res.data.content || res.data;
            const ctype = res.data.contentType || documents.find(d => d.id === id)?.contentType || "";
            setContent(base64Content);
            setFileType(ctype);
            setSelectedDocName(filename);
            setPreviewOpen(true);
        } catch (err) {
            console.error(err);
            setContent("");
            setFileType("");
            setSelectedDocName(filename);
            setPreviewOpen(true);
        }
    };
    const handleDownload = async (id, filename) => {
        try {
            const res = await downloadDocument(id);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = filename || "file";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to download document", err);
            alert("Failed to download document.");
        }
    };
    const handleArchive = async (id) => {
        if (!window.confirm("Move this document to Trash?")) return;
        try {
            await deleteDocumentApi(id);
            setDocuments(prev =>
                prev.map(d => d.id === id ? { ...d, archived: true, isArchived: true } : d)
            );
            alert("Document moved to Trash.");
        } catch (err) {
            console.error("Failed to archive document", err);
            alert("Failed to archive document.");
        }
    };
    const handleRestore = async (id) => {
        try {
            await restoreDocumentApi(id);
            setDocuments(prev =>
                prev.map(d => d.id === id ? { ...d, archived: false, isArchived: false } : d)
            );
            alert("Document restored.");
        } catch (err) {
            console.error("Failed to restore document", err);
            alert("Failed to restore document.");
        }
    };

    const handleRenameOpen = (id, currentName) => {
        setRenameId(id);
        setNewName(currentName || "");
        setRenameOpen(true);
    };
    const handleRenameSubmit = async () => {
        try {
            await renameDocumentApi(renameId, newName.trim());
            setDocuments(prev =>
                prev.map(d => d.id === renameId ? { ...d, filename: newName } : d));
            setRenameOpen(false);
            setRenameId(null);
            setNewName("");
            alert("File Renamed Successfully!");
        } catch (err) {
            console.error("Failed to rename", err);
            alert("Failed to rename document.");
        }
    };
    const renderPreview = () => {
        if (!content) return <Typography>No preview available</Typography>;
        if (fileType.startsWith("image/")) {
               return (
                <Box sx={{ display: "flex", justifyContent: "center", height: "80vh", overflow: "auto" }}>
                    <img
                        src={`data:${fileType};base64,${content}`}
                        alt={selectedDocName}
                        style={{ maxWidth: "100%", maxHeight: "80vh" }}
                    />
                </Box>
            );
        }
        if (fileType === "application/pdf") {
            return <embed src={`data:${fileType};base64,${content}`} type="application/pdf" width="100%" height="600px" />;
        }
        if (fileType.startsWith("text/") || fileType === "application/json") {
            const decoded = new TextDecoder("utf-8").decode(
                Uint8Array.from(atob(content), c => c.charCodeAt(0))
            )
            return <pre style={{ whiteSpace: "pre-wrap" }}>{decoded}</pre>;
        }
        if (
            fileType === "application/msword" ||
            fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
        const blob = new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], { type: fileType });
        const url = URL.createObjectURL(blob);
        return (
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
                width="100%" height="600px" frameBorder="0" title="Word Preview"
            />);
        }
        if (
            fileType === "application/vnd.ms-excel" ||
            fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            const blob = new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], { type: fileType });
                const url = URL.createObjectURL(blob);
                return (
                    <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
                        width="100%" height="600px" frameBorder="0" title="Excel Preview"
                    />
                );
            }
        };
    // Filtered documents by search text and status
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.filename.toLowerCase().includes(searchText.toLowerCase()) ||
            doc.email.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "active" && !doc.archived) ||
            (statusFilter === "archived" && doc.archived);
        return matchesSearch && matchesStatus;
    });
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const displayedDocuments = filteredDocuments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <>
            <h2 style={{ textAlign: "center" }}>Document List</h2>
            <Box display="flex" justifyContent="center" gap={2} mb={2}>
                <TextField
                    label="Search by filename or email"
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                    variant="outlined"
                    size="small"
                />
                <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        style={{ minWidth: 120 }}
                    >
                     <MenuItem value="all">All</MenuItem>

                        <MenuItem value="active">Active</MenuItem>

                        <MenuItem value="archived">Archived</MenuItem>

                    </Select>

                </FormControl>

            </Box>



            {loading ? (

                <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>

            ) : error ? (

                <Typography color="error" align="center" mt={4}>{error}</Typography>

            ) : (

                <>

                    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto", mt: 3 }}>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell><strong>Id</strong></TableCell>

                                    <TableCell><strong>File Name</strong></TableCell>

                                    <TableCell><strong>Email</strong></TableCell>

                                    <TableCell><strong>Type</strong></TableCell>

                                    <TableCell><strong>Size</strong></TableCell>

                                    <TableCell><strong>Uploaded</strong></TableCell>

                                    <TableCell><strong>Status</strong></TableCell>

                                    <TableCell><strong>Action</strong></TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {filteredDocuments.length > 0 ? (

                                    filteredDocuments

                                        .slice((currentPage - 1) * 5, currentPage * 5) // Pagination: 5 per page

                                        .map((doc, idx) => {

                                            const filename = doc.filename || doc.name || "Untitled";

                                            const archived = doc.archived ?? doc.isArchived ?? false;

                                            return (
                                                <TableRow key={doc.id}>
                                                    <TableCell>{doc.userDocNumber || idx + 1}</TableCell>
                                                    <TableCell
                                                        style={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
                                                        onClick={() => fetchContent(doc.id, filename)}
                                                        title="Preview"
                                                    >
                                                        {filename}
                                                    </TableCell>
                                                    <TableCell>{doc.email}</TableCell>
                                                    <TableCell>{doc.contentType || doc.file_type || "-"}</TableCell>
                                                    <TableCell>{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : "-"}</TableCell>
                                                    <TableCell>{doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleString() : "-"}</TableCell>
                                                    <TableCell>
                                                        {archived ? <Chip label="Archived" size="small" /> : <Chip label="Active" color="success" size="small" />}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton color="primary" onClick={() => handleDownload(doc.id, filename)} title="Download">
                                                            <DownloadIcon />
                                                        </IconButton>
                                                        <IconButton color="secondary" onClick={() => handleRenameOpen(doc.id, filename)} title="Rename">
                                                            <EditIcon />
                                                        </IconButton>
                                                        {!archived ? (
                                                            <IconButton color="error" onClick={() => handleArchive(doc.id)} title="Move to Trash">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton color="info" onClick={() => handleRestore(doc.id)} title="Restore">
                                                                <RestoreIcon />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                ) : (
                                    <TableRow><TableCell colSpan={8} align="center">No documents found</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    {Math.ceil(filteredDocuments.length / 5) > 1 && (
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Pagination
                                count={Math.ceil(filteredDocuments.length / 5)}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            )}

                <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>

                <DialogTitle>{selectedDocName}</DialogTitle>
                <DialogContent dividers>{renderPreview()}</DialogContent>
                <DialogActions>

                    <Button onClick={() => setPreviewOpen(false)}>Close</Button>

                </DialogActions>
                </Dialog>
                
            {/* Preview Dialog
            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedDocName}</DialogTitle>
                <DialogContent dividers></DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog> */}

            {/* Rename Dialog */}
            <Dialog open={renameOpen} onClose={() => setRenameOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Rename Document</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="New File Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRenameOpen(false)}>Cancel</Button>
                    <Button onClick={handleRenameSubmit} variant="contained" disabled={!newName.trim()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        



































// import React, { useEffect, useState } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead,
//     TableRow, Paper, Typography, CircularProgress, Box, IconButton,
//     Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip
// } from "@mui/material";

// import DeleteIcon from "@mui/icons-material/Delete";

// import DownloadIcon from "@mui/icons-material/Download";

// import RestoreIcon from "@mui/icons-material/Restore";

// import EditIcon from "@mui/icons-material/Edit";

// import {

//     getDocuments,

//     getDocumentContent,

//     deleteDocumentApi,

//     downloadDocument,

//     renameDocumentApi,

//     restoreDocumentApi

// } from "../api";



// export default function DocumentList() {

//     const [documents, setDocuments] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState(null);



//     const [previewOpen, setPreviewOpen] = useState(false);

//     const [content, setContent] = useState("");

//     const [fileType, setFileType] = useState("");

//     const [selectedDocName, setSelectedDocName] = useState("");



//     const [renameOpen, setRenameOpen] = useState(false);

//     const [renameId, setRenameId] = useState(null);

//     const [newName, setNewName] = useState("");
//     useEffect(() => { fetchDocs(); }, []);



//     const fetchDocs = async () => {

//         try {

//             setLoading(true);

//             const res = await getDocuments();

//             setDocuments(res.data || []);

//         } catch (err) {

//             console.error(err);

//             setError("Failed to fetch documents.");

//         } finally {

//             setLoading(false);

//         }

//     };



//     const formatDate = (dateString) => {

//         if (!dateString) return "";

//         return new Date(dateString).toLocaleString();

//     };



//     const fetchContent = async (id, filename) => {

//         try {

//             const res = await getDocumentContent(id);

//             const base64Content = res.data.content || res.data;

//             const ctype = res.data.contentType ||

//                 documents.find(d => d.id === id)?.contentType || "";

//             setContent(base64Content);

//             setFileType(ctype || "");

//             setSelectedDocName(filename);

//             setPreviewOpen(true);

//         } catch (err) {

//             console.error(err);

//             setContent("");

//             setFileType("");

//             setSelectedDocName(filename);

//             setPreviewOpen(true);

//         }

//     };



//     const handleDownload = async (id, filename) => {

//         try {

//             const res = await downloadDocument(id);

//             const url = window.URL.createObjectURL(new Blob([res.data]));

//             const a = document.createElement("a");

//             a.href = url;

//             a.download = filename || "file";

//             document.body.appendChild(a);

//             a.click();

//             a.remove();

//             window.URL.revokeObjectURL(url);

//         } catch (err) {

//             console.error("Failed to download document", err);

//             alert("Failed to download document.");

//         }

//     };



//     // Archive (soft delete → FR13.1)

//     const handleArchive = async (id) => {

//         if (!window.confirm("Move this document to Trash?")) return;

//         try {

//             await deleteDocumentApi(id);

//             // Optimistic update (assume API marks archived)

//             setDocuments(prev =>
//                 prev.map(d => d.id === id ? { ...d, archived: true, isArchived: true } : d));

//             alert("Document moved to Trash.");

//         } catch (err) {

//             console.error("Failed to archive document", err);

//             alert("Failed to archive document.");

//         }

//     };



//     // Restore (FR13.3)

//     const handleRestore = async (id) => {

//         try {

//             await restoreDocumentApi(id);

//             setDocuments(prev =>
//                 prev.map(d => d.id === id ? { ...d, archived: false, isArchived: false } : d));
//             alert("Document restored.");
//         } catch (err) {
//             console.error("Failed to restore document", err);
//             alert("Failed to restore document.");
//         }

//     };



//     // Rename (FR2.4)

//     const handleRenameOpen = (id, currentName) => {

//         setRenameId(id);

//         setNewName(currentName || "");

//         setRenameOpen(true);

//     };



//     const handleRenameSubmit = async () => {
//         try {
//             await renameDocumentApi(renameId, newName.trim());
//             setDocuments(prev =>
//                 prev.map(d => d.id === renameId ? { ...d, filename: newName } : d));
//             setRenameOpen(false);
//             setRenameId(null);
//             setNewName("");
//             alert("File Renamed Sucessfully!");
//         } catch (err) {
//             console.error("Failed to rename", err);
//             alert("Failed to rename document.");
//         }

//     };

//     const renderPreview = () => {
//         if (!content) return <Typography>No preview available</Typography>;
//         if (fileType.startsWith("image/")) {
//             return (
//                 <Box sx={{ display: "flex", justifyContent: "center", height: "80vh", overflow: "auto" }}>
//                     <img
//                         src={`data:${fileType};base64,${content}`}
//                         alt={selectedDocName}
//                         style={{ maxWidth: "100%", maxHeight: "80vh" }}
//                     />
//                 </Box>
//             );
//         }
//         if (fileType === "application/pdf") {
//             return <embed src={`data:${fileType};base64,${content}`} type="application/pdf" width="100%" height="600px" />;
//         }
//         if (fileType.startsWith("text/") || fileType === "application/json") {

//             const decoded = new TextDecoder("utf-8").decode(

//                 Uint8Array.from(atob(content), c => c.charCodeAt(0))

//             );

//             return <pre style={{ whiteSpace: "pre-wrap" }}>{decoded}</pre>;

//         }

//         if (

//             fileType === "application/msword" ||

//             fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

//         ) {

//             const blob = new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], { type: fileType });

//             const url = URL.createObjectURL(blob);

//             return (

//                 <iframe

//                     src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}

//                     width="100%" height="600px" frameBorder="0" title="Word Preview"

//                 />

//             );

//         }

//         if (

//             fileType === "application/vnd.ms-excel" ||

//             fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

//         ) {

//             const blob = new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], { type: fileType });

//             const url = URL.createObjectURL(blob);

//             return (

//                 <iframe

//                     src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}

//                     width="100%" height="600px" frameBorder="0" title="Excel Preview"

//                 />

//             );

//         }

        
//         return (
            
//             <a
            
//             href={`data:${fileType || "application/octet-stream"};base64,${content}`}
            
//             download={selectedDocName}
            
//             target="_blank"
            
//             rel="noreferrer"
            
//             >

//                 Download {selectedDocName}

//             </a>

// );


//     };



//     return (

//         <>

//             <h2 style={{ textAlign: "center" }}>Document List</h2>



//             {loading ? (

//                 <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>

//             ) : error ? (

//                 <Typography color="error" align="center" mt={4}>{error}</Typography>
//             ) : (

//                 <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: "auto", mt: 3 }}>

//                     <Table>

//                         <TableHead>

//                             <TableRow>

//                                 <TableCell><strong>Id</strong></TableCell>

//                                 <TableCell><strong>File Name</strong></TableCell>
//                                 <TableCell><strong>Email</strong></TableCell>
//                                 <TableCell><strong>Type</strong></TableCell>

//                                 <TableCell><strong>Size</strong></TableCell>
//                                 <TableCell><strong>Uploaded</strong></TableCell>
//                                 <TableCell><strong>Status</strong></TableCell>

//                                 <TableCell><strong>Action</strong></TableCell>

//                             </TableRow>

//                         </TableHead>



//                         <TableBody>

//                             {documents.length > 0 ? (

//                                 documents.map((doc, idx) => {

//                                     const filename = doc.filename || doc.name || "Untitled";

//                                     const archived = doc.archived ?? doc.isArchived ?? false;

//                                     return (

//                                         <TableRow key={doc.id}>

//                                             <TableCell>{doc.userDocNumber || idx + 1}</TableCell>



//                                             <TableCell

//                                                 style={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}

//                                                 onClick={() => fetchContent(doc.id, filename)}

//                                                 title="Preview"

//                                             >

//                                                 {filename}

//                                             </TableCell>



//                                             <TableCell>{doc.email}</TableCell>

//                                             <TableCell>{doc.contentType || doc.file_type || "-"}</TableCell>

//                                             <TableCell>{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : "-"}</TableCell>

//                                             <TableCell>{doc.uploadedDate ? new Date(doc.uploadedDate).toLocaleString() : "-"}</TableCell>



//                                             <TableCell>

//                                                 {archived ? <Chip label="Archived" size="small" /> : <Chip label="Active" color="success" size="small" />}

//                                             </TableCell>



//                                             <TableCell>

//                                                 <IconButton color="primary" onClick={() => handleDownload(doc.id, filename)} title="Download">

//                                                     <DownloadIcon />

//                                                 </IconButton>



//                                                 <IconButton color="secondary" onClick={() => handleRenameOpen(doc.id, filename)} title="Rename">

//                                                     <EditIcon />

//                                                 </IconButton>


//                                                 {!archived ? (

//                                                     <IconButton color="error" onClick={() => handleArchive(doc.id)} title="Move to Trash">

//                                                         <DeleteIcon />

//                                                     </IconButton>
//                                                 ) : (

//                                                     <IconButton color="info" onClick={() => handleRestore(doc.id)} title="Restore">

//                                                         <RestoreIcon />

//                                                     </IconButton>
//                                                 )}

//                                             </TableCell>

//                                         </TableRow>

//                                     );

//                                 })

//                             ) : (

//                                 <TableRow><TableCell colSpan={8} align="center">No documents found</TableCell></TableRow>

//                             )}

//                         </TableBody>
//                     </Table>

//                 </TableContainer>
//             )}



//             {/* Preview Dialog */}

//             <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>

//                 <DialogTitle>{selectedDocName}</DialogTitle>
//                 <DialogContent dividers>{renderPreview()}</DialogContent>
//                 <DialogActions>

//                     <Button onClick={() => setPreviewOpen(false)}>Close</Button>

//                 </DialogActions>
//             </Dialog>



//             {/* Rename Dialog */}

//             <Dialog open={renameOpen} onClose={() => setRenameOpen(false)} maxWidth="xs" fullWidth>

//                 <DialogTitle>Rename Document</DialogTitle>

//                 <DialogContent>

//                     <TextField

//                         fullWidth

//                         label="New File Name"

//                         value={newName}

//                         onChange={(e) => setNewName(e.target.value)}

//                         autoFocus

//                         margin="dense"

//                     />

//                 </DialogContent>
//                 <DialogActions>

//                     <Button onClick={() => setRenameOpen(false)}>Cancel</Button>

//                     <Button onClick={handleRenameSubmit} variant="contained" disabled={!newName.trim()}>

//                         Save

//                     </Button>

//                 </DialogActions>
//             </Dialog>

//         </>

//     );
// }                                                                            

