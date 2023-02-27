import express from "express";
import { PrismaClient } from "@prisma/client"
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000
app.get("/menu", async (req, res) => {
    try {
        const result = await prisma.restoran_daftar_menu.findMany()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).send("Server Error")
    }
})

app.get("/menu/:id", async (req, res) => {
    try {
        const data = await prisma.restoran_daftar_menu.findFirst({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).send("Server Error")
    }
})

app.get("/pesanan", async (req, res) => {
    try {
        const data = await prisma.restoran.findMany()
        return res.status(200).json(data)
    } catch (Err) {
        console.log(Err)
        return res.status(500).send("Server Error")
    }
})

app.post("/pesanan", async (req, res) => {
    try {
        const data = await prisma.restoran.create({
            data: req.body
        })
        return res.status(200).json(data)
    } catch (Err) {
        console.log(Err)
        return res.status(500).send("Server Error")
    }
})

app.post("/menu", async (req, res) => {
    try {
        const data = await prisma.restoran_daftar_menu.create({
            data: req.body
        })
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).send("Server Error")
    }
})

app.delete("/menu/:id", async (req, res) => {
    try {
        const data = await prisma.restoran_daftar_menu.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json(data)
    }catch(err) {
        return res.status(500).send("Server Error")
    }
})

app.put("/menu/:id", async (req, res) => {
 try {
    const menu = await prisma.restoran_daftar_menu.update({
        where : {
            id: parseInt(req.params.id)
        },
        data : req.body
    })
    return res.status(200).json(menu)
 }  catch(err) {
    return res.status(500).send("Server Error")
 } 
})

app.delete("/pesanan/:id", async (req,res) => {
    try {
        const data = await prisma.restoran.delete({
            where : {
                id : parseInt(req.params.id)
            }
        })
        return res.status(200).json(data)
    }catch(err) {
        return res.status(500).send("Server Error")
    }
})

app.put("/pesanan", async (req,res) => {
    try {
        const data = await prisma.restoran.update({
            where : {
                id : parseInt(req.body.id)
            },
            data : req.body
        })
        return res.status(200).json(data)
    }catch(err) {
        return res.status(500).send("Server Error")
    }
})

app.listen(port, () => {
    console.log("Server berjalan di http://localhost:" + port)
})