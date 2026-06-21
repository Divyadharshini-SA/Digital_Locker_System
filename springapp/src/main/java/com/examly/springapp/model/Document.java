package com.examly.springapp.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
// @NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    private String email;
    private String contentType;
    private Long size;
    @Lob
    private byte[] fileData;
    private LocalDateTime uploadedDate = LocalDateTime.now();
    private boolean archived = false;
    @ElementCollection
    private List<String> tags;
    private Integer userDocNumber;
    // @ManyToOne
    // @JoinColumn(name = "folder_id")
    // private Folder parentFolder;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
    public Document(String filename, User owner, String contentType, byte[] fileData, Long size) {
        this.filename = filename;
        this.owner = owner;
        this.contentType = contentType;
        this.fileData = fileData;
        this.size = size;
    }
    public Document(String filename, String email, String contentType, byte[] fileData, LocalDateTime uploadedDate) {
        this.filename = filename;
        this.email = email;
        this.contentType = contentType;
        this.fileData = fileData;
        this.uploadedDate = uploadedDate;
    }
    public Document(String filename, String email, byte[] fileData, LocalDateTime uploadedDate) {
        this.filename = filename;
        this.email = email;
        this.fileData = fileData;
        this.uploadedDate = uploadedDate;
    }
    public Document(String filename, String email,User owner, String contentType,byte[] fileData, Long size) {
        this.filename = filename;
        this.email = email;
        this.owner = owner;
        this.contentType = contentType;
        this.size = size;
        this.fileData = fileData;
    }
    public Long getId() {
    return id;
}

public Document() {
    }
public void setId(Long id) {
    this.id = id;
}

public String getFilename() {
    return filename;
}

public void setFilename(String filename) {
    this.filename = filename;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getContentType() {
    return contentType;
}

public void setContentType(String contentType) {
    this.contentType = contentType;
}

public byte[] getFileData() {
    return fileData;
}

public void setFileData(byte[] fileData) {
    this.fileData = fileData;
}

public LocalDateTime getUploadedDate() {
    return uploadedDate;
}

public void setUploadedDate(LocalDateTime uploadedDate) {
    this.uploadedDate = uploadedDate;
}

public boolean isArchived() {
    return archived;
}

public void setArchived(boolean archived) {
    this.archived = archived;
}

public Integer getUserDocNumber() {
    return userDocNumber;
}

public void setUserDocNumber(Integer userDocNumber) {
    this.userDocNumber = userDocNumber;
}

public User getOwner() {
    return owner;
}

public void setOwner(User owner) {
    this.owner = owner;
}
    // Getters and Setters...
}










// package com.examly.springapp.model;

// import java.time.LocalDateTime;

// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.validation.constraints.Email;
// import javax.persistence.Lob;
// import javax.persistence.ManyToOne;

// @Entity
// public class Document {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String name;
//     @Email
//     private String email;
//     private String contentType;
//     @Lob
//     private byte[] fileData;
//     private LocalDateTime UploadedDate;

//     @ManyToOne
//     @JoinColumn(name = "folder_id")
//     private Folder parentFolder;
    
//     //Auth
//     private Integer userDocNumber;
    
//     public Integer getUserDocNumber() {
//         return userDocNumber;
//     }
//     public void setUserDocNumber(Integer userDocNumber) {
//         this.userDocNumber = userDocNumber;
//     }
//     public Folder getParentFolder() {
//         return parentFolder;
//     }
//     public void setParentFolder(Folder parentFolder) {
//         this.parentFolder = parentFolder;
//     }
//     public LocalDateTime getUploadedDate() {
//         return UploadedDate;
//     }
//     public void setId(Long id) {
//       this.id = id;
//     }
//     public String getContentType() {
//         return contentType;
//     }
//     public void setContentType(String contentType) {
//      this.contentType = contentType;
//     }
//     public void setUploadedDate(LocalDateTime UploadedDate) {
//         this.UploadedDate = UploadedDate;
//     }
//     public Long getId() {
//         return id;
//     }
//     public String getFilename() {
//         return name;
//     }
//     public String getEmail() {
//         return email;
//     }
//     public byte[] getFileData() {
//         return fileData;
//     }
//     public void setFilename(String name) {
//         this.name = name;
//     }
//     public void setEmail(String email) {
//         this.email = email;
//     }
//     public void setFileData(byte[] fileData) {
//         this.fileData = fileData;
//     }
    
//     // public Folder getParentFolder() {
//     //     return parentFolder;
//     // }
//     // public void setParentFolder(Folder parentFolder) {
//     //     this.parentFolder = parentFolder;
//     // }
//     public Document(){}
//     public Document(String name, String email, byte[] fileData,LocalDateTime UploadedDate) {
//         this.name = name;
//         this.email = email;
//         this.fileData = fileData;
//         this.UploadedDate=UploadedDate;
//     }
//     public Document(String name, @Email String email, String contentType, byte[] fileData, LocalDateTime uploadedDate) {
//         this.name = name;
//         this.email = email;
//         this.contentType = contentType;
//         this.fileData = fileData;
//         this.UploadedDate = uploadedDate;
//     }
    
// }

