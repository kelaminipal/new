const router = require("express").Router()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv")
const ObjectId = require("mongodb").ObjectId;
dotenv.config()

router.post("/categoriesGet", async (req, res) => {

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
            let categoriesResult = await db.collection("categories").aggregate([
                {$unwind: "$regions"}, {
                    $match: {
                        'regions.category.deleted': false,
                        "regions.region": ObjectId(req.body.region),
                        "regions.category.nesting": 0
                    }

                },  {
                    $sort: {
                        'regions.category.order': 1
                    }
                },

                {
                    $group: {
                        _id: 0,

                        categories: {
                            $push: "$regions.category"
                        }
                    }
                },
                { $project: {"categories._id": 1, "categories.categoryName": 1,"categories.link": 1} }


            ]).toArray()
            res.json({result: categoriesResult[0].categories})


        })


})


module.exports = router