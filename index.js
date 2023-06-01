import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validation/auth.js';

mongoose.connect(
    'mongodb+srv://Max:Vae8ahco@cluster0.doh8eih.mongodb.net/?retryWrites=true&w=majority'
)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

// app.get('/',(req, res) => {
//     res.send('Hello World!');
// });

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.json({
        success: true,
    });
    // console.log(req.body);

    // const token = jwt.sign({
    //     email: req.body.email,
    //     fullName: 'Вася Пупкин',
    // },
    // 'secret123',
    // );

    // res.json({
    //     success: true,
    //     token,
    // });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});