import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async listReviews(req,res) {
    try{
      const reviews = await prisma.review.findMany();
      res.json(reviews);
    } catch(err){
      res.status(500).json({error:"Erro ao listar reviews"});
    }
  },

  async postReviews(req,res){
    try{
      const review = await prisma.review.create({ data:req.body });
      res.status(201).json(review);
    } catch(err){
      res.status(500).json({error:"Erro ao criar review"});
    }
  },

  async updateReviews(req,res){
    try{
      const { id } = req.params;
      const { review, rating } = req.body;
      const updated = await prisma.review.update({
        where:{ id: Number(id) },
        data:{ review, rating: Number(rating) }
      });
      res.json(updated);
    } catch(err){
      res.status(500).json({error:"Erro ao atualizar review"});
    }
  },

  async deleteReviews(req,res){
    try{
      const { id } = req.params;
      const deleted = await prisma.review.delete({ where:{ id: Number(id) } });
      res.json(deleted);
    } catch(err){
      res.status(500).json({error:"Erro ao deletar review"});
    }
  }
};
