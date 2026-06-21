package com.examly.springapp.controller;

import com.examly.springapp.model.Document;
import com.examly.springapp.model.User;
import com.examly.springapp.service.ActivityLogService;
import com.examly.springapp.service.DocumentService;
import com.examly.springapp.repository.UserRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;
    public DocumentController(DocumentService documentService, UserRepository userRepository,ActivityLogService activityLogService) {
        this.documentService = documentService;
        this.userRepository = userRepository;
        this.activityLogService = activityLogService;
    }

    
    @PostMapping("/upload")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        try {
            if (file.isEmpty())
                return ResponseEntity.badRequest().body("File is empty");
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            // Storage quota check
            if ((user.getStorageUsed() + file.getSize()) > user.getStorageQuota()) {
                return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                       .body("Storage quota exceeded");
            }
            Document doc = documentService.saveDocument(file.getOriginalFilename(),user.getEmail(), user, file.getContentType(),
                    file.getBytes(), file.getSize());
            // Update storage used
            user.setStorageUsed(user.getStorageUsed() + file.getSize());
            userRepository.save(user);
            // Log activity
            activityLogService.log(user.getId(), doc.getId(), "UPLOAD");
            return ResponseEntity.ok(doc);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

   
    @GetMapping("/list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Document>> getAllDocuments(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(documentService.listDocumentsByEmail(email));
    }
   

    @GetMapping("/download/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            byte[] data = documentService.downloadDocument(id, email);
            Document doc = documentService.getDocumentById(id);
            // Log download
            activityLogService.log(doc.getOwner().getId(), doc.getId(), "DOWNLOAD");
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(doc.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
                    .body(new ByteArrayResource(data));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/rename/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> renameDocument(@PathVariable Long id,
            @RequestParam String newName,
            Authentication authentication) {
        String email = authentication.getName();
        documentService.renameDocument(id, newName, email);
        Document doc = documentService.getDocumentById(id);
        activityLogService.log(doc.getOwner().getId(), doc.getId(), "RENAME");
        return ResponseEntity.ok("Document renamed successfully");
    }
    
    

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> archiveDocument(@PathVariable Long id, Authentication authentication) {
        Document doc = documentService.getDocumentById(id);
        String email = authentication.getName();
        if (!doc.getOwner().getEmail().equals(email) &&
                authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        doc.setArchived(true);
        documentService.saveDocument(doc);
        activityLogService.log(doc.getOwner().getId(), doc.getId(), "ARCHIVE");
        return ResponseEntity.ok("Document archived successfully");
    }
    

    @PutMapping("/restore/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> restoreDocument(@PathVariable Long id, Authentication authentication) {
        Document doc = documentService.getDocumentById(id);
        String email = authentication.getName();
        if (!doc.getOwner().getEmail().equals(email) &&
                authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        doc.setArchived(false);
        documentService.saveDocument(doc);
        activityLogService.log(doc.getOwner().getId(), doc.getId(), "RESTORE");
        return ResponseEntity.ok("Document restored successfully");
    }
    
    
    @GetMapping("/content/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> getDocumentContent(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Document doc = documentService.getDocumentById(id);
            if (!doc.getOwner().getEmail().equals(email) &&
                    authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            // Convert binary -> Base64
            String base64 = java.util.Base64.getEncoder().encodeToString(doc.getFileData());
            Map<String, String> response = new HashMap<>();
            response.put("content", base64);
            response.put("contentType", doc.getContentType());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}












// package com.examly.springapp.controller;

// import java.io.IOException;
// import java.util.*;

// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// //import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import com.examly.springapp.model.Document;
// import com.examly.springapp.service.DocumentService;

// @RestController
// @RequestMapping("/api/documents")
// // @CrossOrigin("*")
// @CrossOrigin("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
// public class DocumentController {
// private final DocumentService documentService;

// public DocumentController(DocumentService documentService) {
// this.documentService = documentService;
// }
// // @PostMapping("/upload")
// // public ResponseEntity<Document> uploadDocument(
// // @RequestParam("file") MultipartFile file,
// // @RequestParam(value = "email", required = false, defaultValue =
// "user@example.com") String email)
// // throws IOException {
// // return ResponseEntity.ok(documentService.uploadDocument(file, email));
// // }
// // @PostMapping("/upload")
// // public ResponseEntity<Document> uploadDocument(
// // @RequestParam("file") MultipartFile file,
// // @RequestParam(value = "email", required = false, defaultValue =
// "user@example.com") String email) throws IOException {
// // if (file.isEmpty()) {
// // return ResponseEntity.badRequest().body(null);
// // }
// // // Save document with provided or default email
// // Document savedDoc = documentService.saveDocument(
// // file.getOriginalFilename(),
// // email,
// // file.getContentType(),
// // file.getBytes());
// // return ResponseEntity.ok(savedDoc);
// // }
// // @GetMapping("/list")
// // public ResponseEntity<List<Document>> getAllDocuments() {
// // return ResponseEntity.ok(documentService.listDocuments());
// // }

// //Authentication
// @PostMapping("/upload")
// public ResponseEntity<?> uploadDocument(
// @RequestParam("file") MultipartFile file,
// Authentication authentication) {
// try {
// // 1. Check if file is empty
// if (file.isEmpty()) {
// return ResponseEntity.badRequest().body("File is empty");
// }
// // 2. Check if authentication exists
// if (authentication == null || !authentication.isAuthenticated()) {
// return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
// }
// String email = authentication.getName();
// // 3. Save document
// Document savedDoc = documentService.saveDocument(
// file.getOriginalFilename(),
// email,
// file.getContentType(),
// file.getBytes()
// );
// return ResponseEntity.ok(savedDoc);
// } catch (Exception e) {
// // 4. Log the error so you can see what happened
// e.printStackTrace(); // 👈 check console when second upload fails
// return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
// .body("Error: " + e.getMessage());
// }
// }
// @GetMapping("/list")
// public ResponseEntity<List<Document>> getAllDocuments(Authentication
// authentication) {
// String email = authentication.getName(); // ✅ logged-in user
// return ResponseEntity.ok(documentService.listDocumentsByEmail(email));
// }

// @GetMapping("/{id}")
// public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
// Optional<Document> document = documentService.getDocument(id);
// if (document.isPresent()) {
// return ResponseEntity.ok(document.get());
// } else {
// return ResponseEntity.notFound().build();
// }
// }
// @GetMapping("/metadata")
// public ResponseEntity<List<Map<String, Object>>> getAllMetaData() {
// return ResponseEntity.ok(documentService.getAllMetadata());
// }
// @GetMapping("/content/{id}")
// public ResponseEntity<Map<String, String>> getFileContent(@PathVariable Long
// id) {
// try {
// Document doc = documentService.getDocumentById(id);
// String base64Encoded = Base64.getEncoder().encodeToString(doc.getFileData());
// Map<String, String> result = new HashMap<>();
// result.put("content", base64Encoded);
// result.put("contentType", doc.getContentType()); // must be stored in DB
// return ResponseEntity.ok(result);
// } catch (Exception e) {
// return ResponseEntity.status(500)
// .body(Map.of("error", "Error reading file: " + e.getMessage()));
// }
// }
// @DeleteMapping("/{id}")
// public ResponseEntity<String> deleteDocument(@PathVariable Long id){
// try{
// documentService.deleteDocument(id);
// return ResponseEntity.ok("Document Deleted Succesfully");
// }catch(RuntimeException e){
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
// }
// }

// @GetMapping("/download/{id}")
// public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
// Document doc = documentService.getDocumentById(id);
// String filename = doc.getFilename();
// byte[] fileData = doc.getFileData();
// // Determine content type based on file extension
// String contentType = "application/octet-stream"; // default fallback
// if (filename != null) {
// String lowerName = filename.toLowerCase(Locale.ROOT);
// if (lowerName.endsWith(".pdf")) {
// contentType = "application/pdf";
// } else if (lowerName.endsWith(".png")) {
// contentType = "image/png";
// } else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
// contentType = "image/jpeg";
// } else if (lowerName.endsWith(".txt")) {
// contentType = "text/plain";
// } else if (lowerName.endsWith(".doc")) {
// contentType = "application/msword";
// } else if (lowerName.endsWith(".docx")) {
// contentType =
// "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
// }
// // Add other MIME types as needed
// }
// return ResponseEntity.ok()
// .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename
// + "\"")
// .header(HttpHeaders.CONTENT_TYPE, contentType)
// .body(fileData);
// }
// }
