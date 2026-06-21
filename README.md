# 84914d1f-a4da-4ea6-852b-9cff9eadcde6-e89bc805-e56c-44c7-b229-81819f628427
Repository for Teams Project code and project management
# Digital Locker System

## Overview
Digital Locker System is a web-based application that allows users to securely store, manage, and access important documents online. The system provides a safe and organized platform for document storage and retrieval.

## Features

- User Registration and Login
- Secure Authentication
- Upload Documents
- View Uploaded Documents
- Download Documents
- Delete Documents
- User Dashboard
- Responsive User Interface
- Document Management

## Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Material UI

### Backend
- Spring Boot
- Java
- REST API

### Database
- MySQL

## Project Structure

```
DigitalLockerSystem
│
├── reactapp
│   ├── src
│   ├── public
│   └── package.json
│
├── springapp
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Divyadharshini-SA/Digital_Locker_System.git
```

### Frontend Setup

```bash
cd reactapp
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

### Backend Setup

```bash
cd springapp
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8081
```

## Database Configuration

Update the database details in:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/digital_locker
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Screenshots

Add screenshots of:
- Login Page
- Registration Page
- Dashboard
- Document Upload Page
- Document List Page

## Future Enhancements

- OTP Verification
- Email Notifications
- Cloud Storage Integration
- File Sharing
- Document Encryption
- Admin Dashboard

## Author

**Divyadharshini S**

GitHub: https://github.com/Divyadharshini-SA

## License

This project is developed for educational and learning purposes.