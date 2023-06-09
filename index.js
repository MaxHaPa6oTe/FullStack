import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import cors from 'cors'
import { loginValidation, postCreateValidation, registerValidation } from './validation.js';

import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js'

mongoose.connect(
    'mongodb+srv://Max:Vae8ahco@cluster0.doh8eih.mongodb.net/blog?retryWrites=true&w=majority'
)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cd) => {
        cd(null, 'uploads')
    },
    filename: (_, file, cd) => {
        cd(null, file.originalname)
    },  
})

const upload = multer({ storage })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads')) //?????


app.post('/auth/login', loginValidation, UserController.login)

// app.get('/',(req, res) => {
//     res.send('Hello World!');
// });

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe)




app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`,
    })
})


app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne) //не работал
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)  //не работал
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});