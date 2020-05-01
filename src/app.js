import express from "express";
import { encodeImageToBlurhash } from "./utils";
import volleyball from "volleyball";
// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(volleyball);

// ROUTES
app.get("/ping", (req, res) => res.send("pong"));

app.post("/blur", async (req, res) => {
  const { imageURL } = req.body;

  if (!imageURL) res.status(404).send("no imageURL found in body");

  const blur = await encodeImageToBlurhash(imageURL);
  res.json({ imageURL, blur });
});

app.use("*", (req, res) => {
  res.status(405).end();
});
// START LISTENING
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
