# Proyecto BackEnd clon Mercado libre - Amazon

### el siguiente proyecto es una propuesta para realizar un BackEnd especificamente que responda la estructura de un e-commerce como lo son Mercado Libre o Amazon

---

### El proyecto posee un docker-compose qué ejecutará un servidor con el cual podrá cumplirse los siguientes requerimientos solicitados :

[Requerimientos](https://github.com/andremov/dllo-backend-front-proy1/blob/main/README.md "Requerimientos")

---

###### Pasos :

    1. Haber instalado Docker
    2. Ejecutar en Bash "docker-compose up -d"
    3.Utilizar un Rest API para hacer peticiones en "localhost:8080"
    4.Hacer las peticiones en los respectivos EndPoints

---

###### Endpoints :

    Get

- /users
  - /prev-login
    - body: {"User_id":User_id}
- /posts
  - /recent
  - /?post_id=...
  - /?user_id=...
- /cart
  - /?user_id=...

# Building...
