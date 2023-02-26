import express from "express";
import cors from "cors"

const port = process.env.PORT || 4000

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())