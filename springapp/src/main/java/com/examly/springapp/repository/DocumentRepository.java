package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    List<Document> findByEmail(String email);
    @Query("SELECT MAX(d.userDocNumber) FROM Document d WHERE d.email = :email")
    Integer findMaxUserDocNumberByEmail(String email);
    List<Document> findByOwnerEmailAndArchivedFalse(String email);
}
