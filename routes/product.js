import express from "express";
import { dbAll, dbGet, dbRun } from "../data/database.js";

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const rows = await dbAll("SELECT * FROM product");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.post("/", async(req, res) => {
    const { name, brand, description, price } = req.body;
    if (!name && !brand && !description && !price) {
        res.status(404).json({message: "Missing Data"});
    }
    try {
        const product = await dbRun('INSERT INTO product (name, brand, description, price) VALUES (?, ?, ?, ?)', [name, brand, description, price]);
        //rossz a query ez a creatre POST vonatkozik, van UPDATE
        res.status(201).json({message: "Created successful"});
    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.get("/:id", async(req, res) => {
    try {
        const product = await dbRun("SELECT * FROM product WHERE id = ?", [req.params.id]);
        if (!product) {
            res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.put("/:id", async(req, res) => {
    const { name, brand, description, price } = req.body;
    if (!name && !brand && !description && !price) {
        res.status(400).json({message: "Missing Data"});
    }
    try {
        const product = await dbRun("SELECT * FROM product WHERE id = ?", [req.params.id]);
        if (!product) {
            res.status(400).json({message: "Product not found"});
            return;
        }
        await dbRun("UPDATE product SET name = ?, brand = ?, description = ?, price = ?", [name, brand, description, price, product.id]);
        res.status(200).json({message: "Update successful"});
    } catch (err) {
        res.status(500).json(err.message);
    }
})
//Hiányzik valami a feltételeknél
router.delete("/:id", async(req, res) => {
    try {
        const product = await dbRun("SELECT * FROM product WHERE id = ?", [req.params.id]);
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        await dbRun("DELETE FROM product WHERE id = ?", [req.params.id]);
        res.status(200).json({message: "Delete successful"});
    } catch (err) {
        res.status(500).json(err.message);
    }
})

export default router;