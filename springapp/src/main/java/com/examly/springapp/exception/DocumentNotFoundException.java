package com.examly.springapp.exception;

public class DocumentNotFoundException extends RuntimeException {
    public DocumentNotFoundException(){
        super("Document not Found");
    }
}
