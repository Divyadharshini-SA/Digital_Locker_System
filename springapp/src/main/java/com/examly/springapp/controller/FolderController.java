// package com.examly.springapp.controller;

// import com.examly.springapp.model.Folder;
// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import com.examly.springapp.service.FolderService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// @RestController
// @RequestMapping("/api/folders")
// @CrossOrigin("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
// public class FolderController {
//     private final FolderService folderService;
//     private final UserRepository userRepository;
//     public FolderController(FolderService folderService, UserRepository userRepository) {
//         this.folderService = folderService;
//         this.userRepository = userRepository;
//     }
//     @PostMapping("/create")
//     @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//     public ResponseEntity<Folder> createFolder(@RequestParam String name,
//             @RequestParam(required = false) Long parentFolderId,
//             Authentication authentication) {
//         User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
//         Folder folder = folderService.createFolder(name, user, parentFolderId);
//         return ResponseEntity.ok(folder);
//     }
//     @GetMapping("/list")
//     @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//     public ResponseEntity<List<Folder>> listFolders(Authentication authentication) {
//         User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
//         List<Folder> folders = folderService.getFoldersByUser(user);
//         return ResponseEntity.ok(folders);
//     }
//     @PutMapping("/rename/{id}")
//     @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//     public ResponseEntity<Folder> renameFolder(@PathVariable Long id,
//             @RequestParam String newName,
//             Authentication authentication) {
//         Folder folder = folderService.renameFolder(id, newName, authentication.getName());
//         return ResponseEntity.ok(folder);
//     }
//     @DeleteMapping("/delete/{id}")

//     @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")

//     public ResponseEntity<String> deleteFolder(@PathVariable Long id, Authentication authentication) {

//         folderService.deleteFolder(id, authentication.getName());

//         return ResponseEntity.ok("Folder deleted successfully");

//     }

// }                                                                                                                                                                                                                                                    





// // package com.examly.springapp.controller;

// // import java.io.File;
// // import java.io.FileInputStream;
// // import java.io.IOException;
// // import java.util.List;
// // import java.util.Map;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.core.io.InputStreamResource;
// // import org.springframework.http.*;
// // import org.springframework.web.bind.annotation.*;
// // import com.examly.springapp.service.FolderService;
// // @RestController
// // @RequestMapping("/api/folders")
// // @CrossOrigin("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
// // public class FolderController {
// //     @Autowired
// //     private FolderService folderService;
// //     // GET list of folders
// //     @GetMapping("/list")
// //     public List<Map<String, Object>> listFolders() {
// //         return folderService.getAllFolders();
// //     }
// //     // GET folder by ID
// //     @GetMapping("/{id}")
// //     public ResponseEntity<String> getFolderById(@PathVariable Long id) {
// //         String folder = folderService.getFolderById(id);
// //         if (folder == null)
// //             return ResponseEntity.notFound().build();
// //         return ResponseEntity.ok(folder);
// //     }
// //     // POST create folder
// //     @PostMapping("/create")
// //     public String createFolder(@RequestParam String folderName) {
// //         Long id = folderService.addFolder(folderName);
// //         return "Folder created with ID: " + id;
// //     }
// //     // DELETE folder by ID
// //     @DeleteMapping("/{id}")
// //     public ResponseEntity<String> deleteFolder(@PathVariable Long id) {
// //         boolean deleted = folderService.deleteFolder(id);
// //         if (!deleted)
// //             return ResponseEntity.notFound().build();
// //         return ResponseEntity.ok("Folder deleted with ID: " + id);
// //     }
// //     // DOWNLOAD folder as ZIP
// //     @GetMapping("/download/{id}")
// //     public ResponseEntity<InputStreamResource> downloadFolder(@PathVariable Long id) throws IOException {
// //         File zipFile = folderService.createFolderZip(id);
// //         if (zipFile == null)
// //             return ResponseEntity.notFound().build();
// //         InputStreamResource resource = new InputStreamResource(new FileInputStream(zipFile));
// //         HttpHeaders headers = new HttpHeaders();
// //         headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + zipFile.getName());
// //         return ResponseEntity.ok()
// //                 .headers(headers)
// //                 .contentLength(zipFile.length())
// //                 .contentType(MediaType.APPLICATION_OCTET_STREAM)
// //                 .body(resource);
// //     }

// //     // GET folder contents (subfolders + files)

// //     @GetMapping("/{id}/contents")
// //     public ResponseEntity<Map<String, Object>> getFolderContents(@PathVariable Long id) {
// //         Map<String, Object> contents = folderService.getFolderContents(id);
// //         if (contents == null) {
// //             return ResponseEntity.notFound().build();
// //         }
// //         return ResponseEntity.ok(contents);
// //     }
// // }

