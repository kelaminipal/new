const router = require("express").Router()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv")

dotenv.config()

router.get("/promotionsGet", async (req, res) => {
    MongoClient.connect(
        process.env.MONGODB_CRM,
        {
            wtimeout: 2500,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                j: true
            }
        }
    )
        .catch(err => {
            res.status(400).json({error: err})

        })
        .then(async client => {
            const db = await client.db("cskShop")
            let promotionsResult = await db.collection("promotions").find({}).project({path: 1,linkToBuy: 1}).toArray()

            res.json({promotionsResult})




        })


})












module.exports = router