// package com.examly.springapp.model;

// import javax.persistence.*;

// import lombok.AllArgsConstructor;
// import lombok.Data;

// import java.time.LocalDateTime;
// @Entity
// @Data
// @AllArgsConstructor
// public class Folder {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String name;
//     private LocalDateTime createdAt = LocalDateTime.now();
//     @ManyToOne
//     @JoinColumn(name = "parent_folder_id")
//     private Folder parentFolder;
//     @ManyToOne
//     @JoinColumn(name = "owner_id")
//     private User owner;
//     public Folder() {
//     }
//     public Folder(String name, User owner, Folder parentFolder) {
//         this.name = name;
//         this.owner = owner;
//         this.parentFolder = parentFolder;
//     }

//     // Getters and Setters...

// }
                                               
// // package com.examly.springapp.model;

// // import javax.persistence.*;
// // import java.util.List;

// // @Entity
// // public class Folder {
// //     @Id
// //     @GeneratedValue(strategy = GenerationType.IDENTITY)
// //     private Long id;
// //     private String name;
// //     private String email; // owner
// //     @OneToMany(mappedBy = "parentFolder", cascade = CascadeType.ALL)
// //     private List<Document> documents;
// //     public Folder() {
// //     }
// //     public Folder(String name, String email) {
// //         this.name = name;
// //         this.email = email;
// //     }
// //     // getters and setters

// //     public Long getId() {
// //         return id;
// //     }

// //     public String getName() {
// //         return name;
// //     }

// //     public void setName(String name) {
// //         this.name = name;
// //     }

// //     public String getEmail() {
// //         return email;
// //     }

// //     public void setEmail(String email) {
// //         this.email = email;
// //     }

// //     public List<Document> getDocuments() {
// //         return documents;
// //     }

// //     public void setDocuments(List<Document> documents) {
// //         this.documents = documents;
// //     }

// // }
                             

// // // package com.examly.springapp.model;

// // // public class Folder {
    
// // // }




