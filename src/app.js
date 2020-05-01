import express from 'express';
import { encodeImageToBlurhash } from './utils';
import volleyball from 'volleyball';
import cors from 'cors';
import path from 'path';

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(volleyball);
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/ping', (req, res) => res.send('pong'));

app.post('/blur', async (req, res) => {
    const { imageURL } = req.body;

    if (!imageURL) res.status(404).send('no imageURL found in body');

    const { hash } = await encodeImageToBlurhash(imageURL);
    res.json({ imageURL, hash });
});

app.use('*', (req, res) => {
    res.status(404).end();
});
// START LISTENING
const port = process.env.PORT || 8080;
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
