# Proyecto BackEnd clon Mercado libre - Amazon

### el siguiente proyecto es una propuesta para realizar un BackEnd especificamente que responda la estructura de un e-commerce como lo son Mercado Libre o Amazon

---

### El proyecto posee un docker-compose qué ejecutará un servidor con el cual podrá cumplirse los siguientes requerimientos solicitados :

[Requerimientos](https://github.com/andremov/dllo-backend-front-proy1/blob/main/README.md "Requerimientos")

---

###### Pasos :

1. Haber instalado Docker

2. Ejecutar en Bash "docker-compose up -d"

3. Utilizar un Rest API para hacer peticiones en "localhost:8080"
4. Hacer las peticiones en los respectivos EndPoints

---

###### Endpoints :

### Get

- /posts
  - /recent
  - /?post_id=...
  - /?user_id=...
- /cart
  - /?user_id=...
- #### /history
  - /:user_id
- /reviews
  - /?user_id=...&product_id=...

### Post

- #### /users

  - /register
    - body {display_name , username , password}
  - /login
    - body {username, password}
  - /?user_id=...
  - /prev-login/
    - body {user_id}

- /Posts
  - /
    - body {user_id, img_url, display_name, description, price}
- /cart
  - /
    - body {product_id, user_id}
  - /buy/?user_id=...
- /reviews
  - /
    - body {user_id, product_id, rating, description}

### Delete

- /cart
  - /?item_id=...
