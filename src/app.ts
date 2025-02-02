import express from "express";
import authRoutes from "./routes/auth.route"
import subcategoryRoutes from "./routes/subcategory.route"
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_, res) => {
    res.send('Health Check')
})

app.use("/api/auth", authRoutes);

export default app;