# 🔥 ECOMMERCE - NODEJS - EXPRESS - MONGODB 🔥

![APIREST](https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1181581/retina_500x200_cover-secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png)

El proyecto final del curso de Backend en Coderhouse consistió en el desarrollo de un backend para una aplicación de e-commerce, con el objetivo de ofrecer a los usuarios la posibilidad de comprar y vender productos en línea de manera sencilla y segura.

Tecnologías utilizadas:

- Node js
- Express js
- Mongo DB
- Socket.io

[<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original.svg" width="48">](https://nodejs.org/es)
[<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/express/express-original.svg" width="48">](https://expressjs.com/es/)
[<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mongodb/mongodb-original-wordmark.svg" width="48">](https://www.mongodb.com/)
[<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/socketio/socketio-original.svg" width="48">](https://socket.io/)

## Deploy 🚀

Utilicé [render.com](https://render.com/) para el despliegue, ya que no me solicitaba una tarjeta de crédito y era fácil de asociar con GitHub. La desventaja es que no hay servidores en Sudamérica, lo que puede ralentizar la interacción con la aplicación.

Aquí está la [documentación](https://render.com/docs/deploy-node-express-app) para poder desplegar una aplicación de Node en [render.com](https://render.com/).

Enlace a la [WebApp](https://proyecto-nodejs-ecommerce.onrender.com/)

## Descarga el repo en tu local ⏬

Para poder ejecutarlo en tu ordenador, debes de tener [Nodejs](https://nodejs.org/es) instalado. En el caso que no lo tengas puedes descargarlo desde la web de [Nodejs](https://nodejs.org/es) o recomendado utilizar [nvm](https://github.com/nvm-sh/nvm).

Sigue los siguientes pasos:

```bash
git clone https://github.com/martinfyic/proyecto-nodejs-ecommerce.git

cd proyecto-nodejs-ecommerce

npm install

touch .env
```

## Variables de entorno para correr el backend 🔐

Las variables de entorno deben ir en el archivo `.env` que acabas de crear. En el repositorio descargado, encontrarás un archivo `.env.example` para que puedas guiarte.

- Nro de puerto `PORT=`
- Url de mongo atlas `MONGODB_URL=`
- secret para JWT `SECRET_PRIVATE_KEY=`
- Google login `GOOGLE_CLIENT_ID=` & `GOOGLE_SECRET_ID=`
- Nodemailer `NODEMAILER_EMAIL=` , `NODEMAILER_EMAIL_ADMIN=` & `NODEMAILER_PASS=` _( NODEMAILER_EMAIL & NODEMAILER_EMAIL_ADMIN pueden optar por usar el mismo mail en ambos, en mi caso opte por tener un mail que se encargue de gestionar todos los envios y un email admin al cual se le envia lo necesario, como por ejemplo cuando un usuario se registra )_
- Claudinary API Environment variable `CLOUDINARY_URL=`

una vez descargado el repositorio y configurado las variables de entorno:

```bash
npm start

# ó con nodemon

npm run dev
```

## Dependencias utilizadas en el proyecto 📦

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): 2.4.3
- [cloudinary](https://www.npmjs.com/package/cloudinary): 1.35.0
- [cors](https://www.npmjs.com/package/cors): 2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv): 16.0.3
- [ejs](https://www.npmjs.com/package/ejs): 3.1.9
- [express](https://www.npmjs.com/package/express): 4.18.2
- [express-fileupload](https://www.npmjs.com/package/express-fileupload): 1.4.0
- [express-validator](https://www.npmjs.com/package/express-validator): 6.15.0
- [google-auth-library](https://www.npmjs.com/package/google-auth-library): 8.7.0
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): 9.0.0
- [mongoose](https://www.npmjs.com/package/mongoose): 7.0.3
- [nodemailer](https://www.npmjs.com/package/nodemailer): 6.9.1
- [socket.io](https://www.npmjs.com/package/socket.io): 4.6.1
- [uuid](https://www.npmjs.com/package/uuid): 9.0.0
- [winston](https://www.npmjs.com/package/winston): 3.8.2
- [nodemon](https://www.npmjs.com/package/nodemo): 2.0.22 --> _( para ejecutar el script `npm run dev` es necesaria tener instalado nodemon de forma global o en el proyecto como DevDependencie)_

## Funcionalidades implementadas 🔧

Para los enpoints puedes ver la documentación de [POSTMAN](https://documenter.getpostman.com/view/22676653/2s93XyTNih) donde deje ejemplos de peticiones

### Autenticación `/api/auth`

- Autenticación de usuarios con email y contraseña. **POST** `/login`
- Autenticación de usuarios con cuenta de Google. **POST** `/google`

### Carrito de compras `/api/carts`

- Listar todos los carritos de compras. **GET** `/`
- Listar carrito de compras. **GET** `/:id`
- Crear carrito de compras. **POST** `/`
- Desactivar carrito de compras. **DELETE** `/:id`
- Agregar productos al carrito dde compras. **POST** `/:id/products`
- Eliminar productos al carrito dde compras. **DELETE** `/:id/products/:prodId`

### Categorias de productos `/api/categories`

- Listar todas las categorias. **GET** `/`
- Listar categoria. **GET** `/:id`
- Crear categoria. **POST** `/`
- Actualizar categoria. **PUT** `/:id`
- Desactivar categoria. **DELETE** `/:id`

### Órdenes de compra `/api/orders`

- Listar todas las órdenes de compras. **GET** `/`
- Crear orden de compra. **POST** `/:idCart`

### Productos `/api/products`

- Listar todos los productos. **GET** `/` _( Vista creada con ejs para el front)_
- Listar producto. **GET** `/:id`
- Crear producto. **POST** `/`
- Actualizar producto. **PUT** `/:id`
- Desactivar producto. **DELETE** `/:id`

### Busqueda `/api/search`

En este endpoint la idea fue poder generar una entrada para poder realizar busquedas flexibles, es decir, puedo realizar busquedas dependiendo la colleccion de la base de datos y el termino de busqueda.

- Busqueda flexible. **GET** `/:collection/:term`

### Carga de imagenes `/api/uploads`

Es requerido tener configurado [cloudinary](https://www.npmjs.com/package/cloudinary)

- Listar imagen de Usuario o Producto. **GET** `/:collection/:id`
- Actualizar imagen ed Usuario o Producto. **PUT** `/:collection/:id`

### Usuarios `/api/users`

- Registro de usuarios con email y contraseña. **POST** `/`
- Listar usuarios registrados. **GET** `/`
- Listar usuario registrado. **GET** `/:id`
- Actualizar usuario registrado. **PUT** `/:id`
- Actualizar role de usuario registrado. **PUT** `/:id/roleupdate` _( Solo ADMIN_USER )_
- Desactivar usuario registrado. **DELETE** `/:id` _( Solo ADMIN_USER )_

### Chat con socket.io `/chat.html`

El chat ofrece la posibilidad de enviar mensajes de forma global a todos los usuarios conectados, así como de establecer comunicación directa entre dos usuarios específicos. Para ello, solo es necesario introducir el identificador del usuario destinatario en el campo de entrada `uid` para enviar el mensaje exclusivamente a esa persona.

## Conclusiones finales 🏁

Este proyecto me permitió adquirir conocimientos y habilidades en el desarrollo de aplicaciones backend con Node.js y MongoDB, así como en el uso del framework Express.js y la librería Socket.io para crear una API REST y un sistema de chat en tiempo real.

Aprendí sobre la implementación de autenticación y autorización de usuarios utilizando JWT, el uso de Cloudinary para almacenar imágenes de productos, la integración de la API de Google para autenticación, la implementación de envío de emails con Nodemailer, y la gestión de carritos de compras y órdenes de compra.

En definitiva, este proyecto me permitió aplicar muchos de los conceptos y herramientas aprendidos en el curso de Backend de Coderhouse, y me dejó una base sólida para seguir aprendiendo y mejorando en el futuro.
