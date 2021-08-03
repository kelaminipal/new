const router = require("express").Router()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv")

dotenv.config()

router.get("/regionsGet", async (req, res) => {
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
            let regionsResult = await db.collection("regions").find({}).project({title: 1,order: 1}).toArray()

            res.json({regionsResult})




        })


})












module.exports = router