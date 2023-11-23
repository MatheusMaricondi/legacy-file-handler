# legacy-file-handler

## description
This api receives legacy files using multer library, uploads them and processes them using a factory class that allows differents databases drives, repository pattern, read and handler legacy file using native node file system stream, the system keeps a non duplicated copy legacy file to get the differences and persist in database via prisma ORM and mongodb.

### STACKS
`` nodejs `` 
`` typescript `` 
`` prismaORM ``
`` mongodb ``
`` jest ``
`` swagger ``
`` rest API ``

## .ENV
### override the <> content to your credentials mongodb
`` APP_PORT=3000 ``
`` DATABASE_URL=mongodb+srv://<username>:<password>@orders.2okm3dv.mongodb.net/<database>?retryWrites=true&w=majority ``


## setup
used node v18.17.1
To init this project follow the comands below:

`` npm i ``
`` npm run dev ``

### test

`` npm run test ``

### production
`` npm run build ``


## Prisma 

change the DATABASE_URL

### push database schema to mongodb:
`` npx prisma db push ``

### start prisma server:
`` npx prisma studio ``

# SWAGGER APIS
`` localhost:3000/api-docs ``





