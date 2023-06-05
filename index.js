import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validation.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'

mongoose.connect(
    'mongodb+srv://Max:Vae8ahco@cluster0.doh8eih.mongodb.net/blog?retryWrites=true&w=majority'
)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login)

// app.get('/',(req, res) => {
//     res.send('Hello World!');
// });

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});