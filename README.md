# <p align = "center">DrivenPass API</p>

<p align = "center">
   <img src="https://i.ibb.co/r4nJbjV/icons8-lock.png" alt="" width="200" />
</p>

## 📋 Description

This application is an api for a password manager, whose objective is to facilitate the management of sensitive information that requires more care, protection and organization. The user can register and log in to be able to add their information. In addition, the user can add, retrieve and delete credentials, cards, secure notes, wireless networks and documents.

**Observation:**
Allowed wireless network is Wi-Fi type only. The documents allowed are the National Driver's License (CNH) and Identity Card (RG).

---

## 💻 Technologies and concepts covered

- Node.js
- TypeScript
- Prisma
- Postgres
- JWTs
- REST APIs
- Relational Database
- Layered Architecture

---

## 🚀 Routes

### User register

```yml
POST /register
    - headers: {}
    - body: {
        "email": string,
        "senha": string
      }
```

### User login

```yml
POST /sign-in
    - headers: {}
    - body: {
        "email": string,
        "senha": string
      }
```

### Add credential

```yml
POST /credentials
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "title": string,
        "url": string,
        "username": string,
        "password": string
      }
```

### Get credential

```yml
GET /credentials/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get credentials

```yml
GET /credentials
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Remove credential

```yml
DELETE /credentials/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Add note

```yml
POST /notes
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "title": string,
        "content": string,
      }
```

### Get note

```yml
GET /notes/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get notes

```yml
GET /notes
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Remove note

```yml
DELETE /notes/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Add card

```yml
POST /cards
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "title": string,
        "number": string,
        "holderName": string,
        "CVC": string (format: 3 or 4 digits),
        "expirationDate": string (format: MM/YY),
        "password": string (format: 4 digits),
        "isVirtual": boolean,
        "type": string (format: "credit", "debit" or "both")
      }
```

### Get card

```yml
GET /cards/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get cards

```yml
GET /cards
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Remove card

```yml
DELETE /cards/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Add network

```yml
POST /networks
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "title": string,
        "name": string,
        "password": string
      }
```

### Get network

```yml
GET /networks/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get networks

```yml
GET /networks
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Remove network

```yml
DELETE /networks/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Add document

```yml
POST /documents
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "fullName": string,
        "number": string,
        "emissionDate": string (format: "DD/MM/YYYY"),
        "expirationDate": string (format: "DD/MM/YYYY"),
        "emissorName": string,
        "type": string (format: "cnh" or "rg")
      }
```

### Get document

```yml
GET /documents/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get documents

```yml
GET /documents
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Remove document

```yml
DELETE /documents/:id
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

---

# 🏁 Getting Started

This project needs the Node.js platform to run, so you need to install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) first, in order to test the project. Remember to launch you database locally and create a `.env` file with the environment variables listed on `.env.example`.

Then, clone the repository with:

```
git clone https://github.com/weslenmendes/drivenpass-api.git
```

So, in the project directory, you can run:

```
npm install
```

to install the dependencies.

Then, run

```
npm run dev
```

to run the server.

## Reference

This documentation was based on the following project:
[ts-backend-template](https://github.com/luanalessa/ts-backend-template) by [Luana Lessa](https://github.com/luanalessa/)
