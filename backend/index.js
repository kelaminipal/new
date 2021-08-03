const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
app.use(cors());
app.use(express.json())
app.use(cookieParser())


app.listen(process.env.PORT || 8000, () => {
    console.log(`listening on port ${process.env.PORT}`)

})
const authRoute = require("./routes/user")
const regionsRoute = require("./routes/regions")
const promotionsRoute = require("./routes/promotions")
const categoriesRoute = require("./routes/categories")

app.use("/api/user", authRoute)
app.use("/api/regions", regionsRoute)
app.use("/api/promotions", promotionsRoute)
app.use("/api/categories", categoriesRoute)



app.use('*', (req, res) => {

    res.status(400).json({error: "no routes were found"})


})









