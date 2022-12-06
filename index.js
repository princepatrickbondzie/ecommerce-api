import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import './config/dbConnect.js'; // initialize database
import * as dotenv from 'dotenv';
import { NotFoundError, ApiError, InternalError } from './core/ApiError.js';

import authRoutes from "./routes/access/auth-routes.js";
// import apikey from "./middleware/apiKey.js";
import tokenRoutes from './routes/access/token-routes.js';
import addressRoutes from './routes/address/address-routes.js';
import roleRoutes from './routes/role/role-routes.js';
import brandRoutes from './routes/brand/brand-routes.js';
import categoryRoutes from './routes/category/category-routes.js';
import productRoutes from './routes/product/product-routes.js';
import uploadRoutes from './routes/uploads/upload-routes.js';

dotenv.config()

process.on('uncaughtException', (e) => {
    console.log(e);
});

const app = express();

app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000, extended: true }));
app.use(cors({ origin: process.env.CORS_URL, optionsSuccessStatus: 200 }));

// Routes
app.use("/v1/auth", authRoutes);
app.use('/v1/token', tokenRoutes);
app.use('/v1/address', addressRoutes);
app.use('/v1/role', roleRoutes);
app.use('/v1/brand', brandRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/upload', uploadRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new Error('Not Found')));

// Middleware Error Handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.log(err);
            return res.status(500).send(err.message);
        }
        ApiError.handle(new Error('Internal error'), res);
    }
});

app.listen(process.env.PORT, () => { console.log(`server running on port : ${process.env.PORT}`) }).on('error', (e) => console.log(e));