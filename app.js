import express, { json } from "express";
import cors from "cors";
import productRoutes from "./routes/product.js"
import { initialize } from "./data/database.js"

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express());

app.use("/product", productRoutes);

try {
    await initialize();
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
        
    })
} catch (err) {
    console.log(err.message);
}