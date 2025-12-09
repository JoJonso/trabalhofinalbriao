//abrir terminal (CTRL + ALT + T)
mkdir minha_pasta
cd minha_pasta
code .
//abrir terminal no code. 
//Executar "npm init" e dar enter em tudo.
npm init
// package.json é criado
// instalar express
npm i express
// instalar prisma
npm i prisma
npm i @prisma/client
// inicializar prisma corretamente no projeto
npx prisma init 
// modificar arquivo .env, schema.prisma com modelos.
//comentar a linha   //output   = "../generated/prisma"
do arquivo schema.prisma
npx prisma migrate dev
npx prisma generate
// alternativamente executar:
npx prisma studio
// criar server.js
// criar pasta controllers e o controller.js
// criar pasta routes e o routes.js





