package com.examly.springapp.service;

import com.examly.springapp.model.Document;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }
    public Document saveDocument(String name,String email, User owner, String contentType, byte[] data, Long size) {
        Integer maxDocNumber = documentRepository.findMaxUserDocNumberByEmail(owner.getEmail());
        int docNumber = (maxDocNumber != null ? maxDocNumber + 1 : 1);
        Document doc = new Document(name,email, owner, contentType, data, size);
        doc.setUserDocNumber(docNumber);
        return documentRepository.save(doc);
    }
    public List<Document> listAllDocuments() {
        return documentRepository.findAll();
    }
    public Document saveDocument(Document doc) {
        return documentRepository.save(doc);
    }
    public List<Document> listDocumentsByEmail(String email) {
        return documentRepository.findByOwnerEmailAndArchivedFalse(email);
    }
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id).orElseThrow(() -> new RuntimeException("Document not found"));
    }
    public void renameDocument(Long id, String newName, String userEmail) {
        Document doc = getDocumentById(id);
        if (!doc.getOwner().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }
        doc.setFilename(newName);
        documentRepository.save(doc);
    }
    public byte[] downloadDocument(Long id, String userEmail) {
        Document doc = getDocumentById(id);
        if (!doc.getOwner().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }
        return doc.getFileData();
    }


    //testcase purpose
    public List<Map<String, Object>> getAllMetadata() {
                return documentRepository.findAll().stream()
                    .map(doc -> {
                        Map<String, Object> map = new HashMap<>();
                            map.put("id", doc.getId());
                            map.put("filename", doc.getFilename());
                            map.put("email", doc.getEmail());
                            map.put("uploadedDate", doc.getUploadedDate());
                            map.put("contentType", doc.getContentType()); // <-- added semicolon
                            return map;
                    })
                .collect(Collectors.toList());
    }
    public Optional<Document> getDocument(Long id){
        return documentRepository.findById(id);
    }
    public Document saveDocument(String filename, String email,byte[] fileData){
        Document doc=new Document(filename, email, fileData,LocalDateTime.now());
        return documentRepository.save(doc);
    }
}
                                                                        
// package com.examly.springapp.service;
// import java.io.IOException;
// import java.time.LocalDateTime;
// import java.util.*;
// import java.util.stream.Collectors;

// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.multipart.MultipartFile;
// import com.examly.springapp.model.Document;
// import com.examly.springapp.model.Folder;
// import com.examly.springapp.repository.DocumentRepository;
// import com.examly.springapp.repository.FolderRepository;

// @Service
// public class DocumentService {
//     private final DocumentRepository documentRepository;
//     public DocumentService(DocumentRepository documentRepository) {
//         this.documentRepository = documentRepository;
//     }
    // public Document saveDocument(String filename, String email,byte[] fileData){
    //     Document doc=new Document(filename, email, fileData,LocalDateTime.now());
    //     return documentRepository.save(doc);
    // }
//     // public Document saveDocument(String filename, String email,String contentType,byte[] fileData){
//     //     Document doc=new Document(filename, email,contentType, fileData,LocalDateTime.now());
//     //     return documentRepository.save(doc);
//     // }
//     // //AUTHENTICATION CODE
//     public Document saveDocument(String filename, String email, String contentType, byte[] fileData) {
//         // get last userDocNumber
//         Integer maxDocNum = documentRepository.findMaxUserDocNumberByEmail(email);
//         int userDocNumber = (maxDocNum == null) ? 1 : maxDocNum + 1;
//         Document doc = new Document(filename, email, contentType, fileData, LocalDateTime.now());
//         doc.setUserDocNumber(userDocNumber);
//         return documentRepository.save(doc);
//     }
//     public Document uploadDocument(MultipartFile file, String email)throws IOException{
//         Document doc=new Document(file.getOriginalFilename(), email,file.getBytes(),LocalDateTime.now());
//         return documentRepository.save(doc);
//     }
//     public Optional<Document> getDocument(Long id){
//         return documentRepository.findById(id);
//     }
//     public Document getDocumentById(Long id) {
//         return documentRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
//     }
//     public List<Map<String, Object>> getAllMetadata() {
//         return documentRepository.findAll().stream()
//             .map(doc -> {
//                 Map<String, Object> map = new HashMap<>();
//                     map.put("id", doc.getId());
//                     map.put("filename", doc.getFilename());
//                     map.put("email", doc.getEmail());
//                     map.put("uploadedDate", doc.getUploadedDate());
//                     map.put("contentType", doc.getContentType()); // <-- added semicolon
//                     return map;
//             })
//         .collect(Collectors.toList());
//     }
//     public List<Document> listDocuments(){
//         return documentRepository.findAll();
//     }
//     public void deleteDocument(Long id) {
//        if(!documentRepository.existsById(id)){
//             throw new RuntimeException("Document not found with id:"+id);
//        }
//        documentRepository.deleteById(id);
//     }
//     public List<Document> listDocumentsByEmail(String email) {
//         return documentRepository.findByEmail(email);
//     }
// }
