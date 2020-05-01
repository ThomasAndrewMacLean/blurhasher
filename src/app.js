import express from 'express';
import { encodeImageToBlurhash } from './utils';
import volleyball from 'volleyball';
import cors from 'cors';
// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(volleyball);
app.use(cors());

// ROUTES
app.get('/ping', (req, res) => res.send('pong'));

app.post('/blur', async (req, res) => {
    const { imageURL } = req.body;

    if (!imageURL) res.status(404).send('no imageURL found in body');

    const { hash, pixels } = await encodeImageToBlurhash(imageURL);
    res.json({ imageURL, hash, pixels });
});

app.use('*', (req, res) => {
    res.status(405).end();
});
// START LISTENING
const port = process.env.PORT || 8080;
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
