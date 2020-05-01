const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import { encode, decode } from 'blurhash';
import btoa from 'btoa';

const { document } = new JSDOM(`...`, {
    resources: 'usable',
}).window;

const loadImage = async (src) =>
    new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => resolve(img);
        img.onerror = (...args) => reject(args);
        img.src = src;
    });

const getImageData = (image) => {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    } catch (error) {
        console.error(error);
    }
};

export const encodeImageToBlurhash = async (imageUrl) => {
    try {
        const image = await loadImage(imageUrl);
        const imageData = getImageData(image);
        const hash = encode(
            imageData.data,
            imageData.width,
            imageData.height,
            4,
            3
        );
        return {
            hash,
        };
    } catch (error) {
        console.error(error);
    }
};

export const getPixels = (hash) => {
    const pixels = decode(hash, 32, 32);
    console.log(pixels);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();

    //  return Buffer.from(pixels).toString('base64');
};
