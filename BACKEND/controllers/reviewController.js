const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async listReviews(req,res) {
        try{
            const getReviews = await prisma.review.findMany();

            res.status(200).json(getReviews);
        }catch(error){
            res.status(500).json({"Error to list Reviews:": error})
        }
    },

    async postReviews(req,res) {
        try{
            const {gameThumb,gameName,review,rating} = req.body;

            const postReview = await prisma.review.create({
                data: {
                    gameThumb: gameThumb,
                    gameName: gameName,
                    review: review,
                    rating: Number(Math.max(rating,5))
                }
            });

            res.status(201).json(postReview);
        }catch(error){
            res.status(500).json({"Error to upload the review": error})
        }
    },

    async updateReviews(req,res) {
        try{

            const {id} = req.params;
            const {review,rating} = req.body;

            const updateReview = await prisma.review.update({
                where: {
                    id:parseInt(id)
                },
                data: {
                    review: review,
                    rating: Number(Math.min(rating,5))
                }

            });

            res.status(200).json(updateReview);
        }catch(error){
            res.status(500).json({"Error to upload the review": error})
        }
    },

    async deleteReviews(req,res) {
        try{

            const {id} = req.params;

            const deleteReview = await prisma.review.delete({
                where: {
                    id:parseInt(id)
                }
            })

            res.status(200).json(deleteReview);
        }catch(error){
            res.status(500).json({"Error to upload the review": error})
        }
    },
}