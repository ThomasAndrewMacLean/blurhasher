import express from 'express';
import { encodeImageToBlurhash, getPixels } from './utils';
import volleyball from 'volleyball';
import cors from 'cors';
import path from 'path';

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(volleyball);
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
    'UPEy3%9u~B%g4.-pNGRj0LNGI;IU%MRPMxxt';
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/ping', (req, res) => res.send('pong'));

app.post('/blur', async (req, res) => {
    const { imageURL } = req.body;

    if (!imageURL) res.status(404).send('no imageURL found in body');

    const { hash, pixels } = await encodeImageToBlurhash(imageURL);
    res.json({ imageURL, hash, pixels });
});

app.post('/unblur', async (req, res) => {
    const { hash } = req.body;

    if (!hash) res.status(404).send('no hash found in body');

    const x = getPixels(hash);
    res.json({ x });
});

app.use('*', (req, res) => {
    res.status(404).end();
});
// START LISTENING
const port = process.env.PORT || 8080;
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
