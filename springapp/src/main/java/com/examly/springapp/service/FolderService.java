// package com.examly.springapp.service;

// import com.examly.springapp.model.Folder;
// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.FolderRepository;
// import org.springframework.stereotype.Service;
// import java.util.List;
// @Service
// public class FolderService {
//     private final FolderRepository folderRepository;
//     public FolderService(FolderRepository folderRepository) {
//         this.folderRepository = folderRepository;
//     }
//     public Folder createFolder(String name, User owner, Long parentFolderId) {
//         Folder parentFolder = null;
//         if (parentFolderId != null) {
//             parentFolder = folderRepository.findById(parentFolderId)
//                     .orElseThrow(() -> new RuntimeException("Parent folder not found"));
//         }
//         Folder folder = new Folder(name, owner, parentFolder);
//         return folderRepository.save(folder);
//     }
//     public List<Folder> getFoldersByUser(User user) {
//         return folderRepository.findByOwner(user);
//     }
//     public Folder renameFolder(Long id, String newName, String userEmail) {
//         Folder folder = folderRepository.findById(id).orElseThrow(() -> new RuntimeException("Folder not found"));
//         if (!folder.getOwner().getEmail().equals(userEmail)) {
//             throw new RuntimeException("Unauthorized");
//         }
//         folder.setName(newName);
//         return folderRepository.save(folder);
//     }
//     public void deleteFolder(Long id, String userEmail) {
//         Folder folder = folderRepository.findById(id).orElseThrow(() -> new RuntimeException("Folder not found"));
//         if (!folder.getOwner().getEmail().equals(userEmail)) {
//             throw new RuntimeException("Unauthorized");
//         }
//         folderRepository.delete(folder); // deletes all nested content if cascade configured
//     }
// }









// // package com.examly.springapp.service;

// // import org.springframework.stereotype.Service;
// // import java.io.*;
// // import java.util.*;
// // import java.util.zip.ZipEntry;
// // import java.util.zip.ZipOutputStream;
// // @Service
// // public class FolderService {
// //     private final Map<Long, String> folders = new HashMap<>();
// //     private final Map<Long, List<String>> folderFiles = new HashMap<>();
// //     private final Map<Long, List<Long>> subFolders = new HashMap<>();
// //     private Long currentId = 1L;

// //     // public FolderService() {
// //     //     // Sample data
// //     //     Long invoicesId = currentId++;
// //     //     folders.put(invoicesId, "Invoices");
// //     //     folderFiles.put(invoicesId, new ArrayList<>(Arrays.asList("invoice1.pdf", "invoice2.pdf")));
// //     //     Long projectsId = currentId++;
// //     //     folders.put(projectsId, "Projects");
// //     //     Long subProjectId = currentId++;
// //     //     folders.put(subProjectId, "SubProject-A");
// //     //     folderFiles.put(subProjectId, new ArrayList<>(Collections.singletonList("design.docx")));
// //     //     subFolders.put(projectsId, new ArrayList<>(Collections.singletonList(subProjectId)));
// //     //     Long reportsId = currentId++;
// //     //     folders.put(reportsId, "Reports");
// //     //     folderFiles.put(reportsId, new ArrayList<>(Collections.singletonList("report1.txt")));
// //     // }
// //     public List<Map<String, Object>> getAllFolders() {
// //         List<Map<String, Object>> result = new ArrayList<>();
// //         for (Map.Entry<Long, String> entry : folders.entrySet()) {
// //             Map<String, Object> folder = new HashMap<>();
// //             folder.put("id", entry.getKey());
// //             folder.put("name", entry.getValue());
// //             result.add(folder);
// //         }
// //         return result;
// //     }
// //     // public Map<Long, String> getAllFolders() {
// //     //     return folders;
// //     // }
// //     public String getFolderById(Long id) {
// //         return folders.get(id);
// //     }
// //     public Long addFolder(String folderName) {
// //         folders.put(currentId, folderName);
// //         folderFiles.put(currentId, new ArrayList<>());
// //         return currentId++;
// //     }
// //     public boolean deleteFolder(Long id) {
// //         if (!folders.containsKey(id))
// //             return false;
// //         folders.remove(id);
// //         folderFiles.remove(id);
// //         subFolders.remove(id);
// //         return true;
// //     }
// //     public Map<String, Object> getFolderContents(Long id) {
// //         if (!folders.containsKey(id)) {
// //             return null;
// //         }
// //         Map<String, Object> result = new HashMap<>();
// //         result.put("id", id);
// //         result.put("name", folders.get(id));
// //         result.put("files", folderFiles.getOrDefault(id, Collections.emptyList()));
// //         List<Long> subIds = subFolders.getOrDefault(id, new ArrayList<>());
// //         List<Map<String, Object>> subfolderList = new ArrayList<>();
// //         for (Long subId : subIds) {
// //             Map<String, Object> subMap = new HashMap<>();
// //             subMap.put("id", subId);
// //             subMap.put("name", folders.get(subId));
// //             subfolderList.add(subMap);
// //         }
// //         result.put("subfolders", subfolderList);
// //         return result;
// //     }
// //     // Create a zip file for folder (demo)
// //     public File createFolderZip(Long id) throws IOException {
// //         String folderName = folders.get(id);
// //         if (folderName == null)
// //             return null;
// //         File zipFile = File.createTempFile(folderName, ".zip");
// //         try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile))) {
// //             // Add a placeholder entry
// //             ZipEntry entry = new ZipEntry(folderName + "/README.txt");
// //             zos.putNextEntry(entry);
// //             zos.write(("This is folder: " + folderName).getBytes());
// //             zos.closeEntry();
// //         }

// //         return zipFile;

// //     }

// // }

