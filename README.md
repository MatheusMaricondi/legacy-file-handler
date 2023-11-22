# legacy-file-handler

## description
This api receives legacy files, uploads them, processes them and returns them in json.

## .ENV
`` APP_PORT=3000 ``
`` DATABASE_URL=mongodb+srv://<username>:<password>@orders.2okm3dv.mongodb.net/?retryWrites=true&w=majority ``


## setup
used node v18.17.1
To init this project follow the comands below:

`` npm i ``
`` npm run dev ``

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



