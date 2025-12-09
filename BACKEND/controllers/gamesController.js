const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async listGames(req,res) {
        try{
            const getGames = await prisma.games.findMany();

            res.status(200).json(getGames);
        }catch(error){
            res.status(500).json({"Error to list Games:": error})
        }
    },
}