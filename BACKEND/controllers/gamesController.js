import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async listGames(req,res) {
    try{
      const games = await prisma.games.findMany();
      res.json(games);
    } catch(err) {
      res.status(500).json({error:"Erro ao listar games"});
    }
  }
};
