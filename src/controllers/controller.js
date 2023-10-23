const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getRaiz = ("/",(req,res) => { // primeiro parâmetro: caminho, segundo parâmetro: equisição e resposta
    res.send("<h1>Node com SQLServer</h1>")
   })
