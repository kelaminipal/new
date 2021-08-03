const router = require("express").Router()
const ObjectId = require("mongodb").ObjectId;
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const dotenv = require("dotenv")

dotenv.config()
const jwt = require('jsonwebtoken')

router.post("/signIn", async (req, res) => {

    MongoClient.connect(
        process.env.MONGODB_CRM,
        {
            poolSize: 20,
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
            let emailResult = await db.collection("corporates").find({email: req.body.email}).project({
                name: 1,
                email: 1,
                password: 1
            }).toArray()

            if (emailResult.length === 0) {

                res.json({error: "email or password is incorrect"})

            } else {

                const {password, _id} = emailResult[0]

                if (req.body.password !== password) {
                    res.json({error: "email or password is incorrect"})
                } else {

                    const token = jwt.sign({
                        userId: _id
                    }, process.env.SECRET, {expiresIn: '24h'});
                    const refreshToken = jwt.sign({
                        userId: _id
                    }, process.env.REFRESTSECRET, {expiresIn: '1y'});
                    res.cookie("token", token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 24 * 365,
                    })
                    res.json({isOkay: true, refreshToken})
                }
            }


        })


})

router.get("/verify", async (req, res) => {

    const {token} = req.cookies


    try {
        const {userId} = await jwt.verify(token, process.env.SECRET)
        req.userId = await userId

        MongoClient.connect(
            process.env.MONGODB_CRM,
            {
                poolSize: 20,
                wtimeout: 2500,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                writeConcern: {
                    j: true
                }
            }
        )
            .catch(err => {

                res.clearCookie("token");
                res.status(400).json({error: err})

            })
            .then(async client => {

                const db = await client.db("cskShop")
                let userResult = await db.collection("corporates").find({"_id": ObjectId(userId)}).project({
                    email: 1,
                    name: 1,
                    _id: 0
                }).toArray()

                const {email, name} = userResult[0]

                res.json({email, name})


            })
    } catch (e) {


        res.status(400).json({error: e})
    }


})
router.post("/refreshToken", async (req, res) => {

    const {userId} = await jwt.verify(req.body.refreshToken, process.env.REFRESTSECRET)
    const token = jwt.sign({
        userId: userId
    }, process.env.SECRET, {expiresIn: '24h'});
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 24 * 365,
    })
    res.json({isRefreshTokenOkay: true})
})


module.exports = router