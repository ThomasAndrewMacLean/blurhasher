import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { decode } from 'blurhash';

const App = () => {
    const [hash, hashSet] = useState('');
    const [imageUrl, imageUrlSet] = useState('');
    const canvas = useRef(null);
    const loadedImage = () => {
        console.log('image loaded');

        setTimeout(() => {
            canvas.current.style.opacity = 0;
        }, 1000);
    };
    const getHash = (e) => {
        e.preventDefault();
        const imageURL = document.getElementById('imageUrl').value;
        fetch('/blur', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageURL }),
        })
            .then((x) => x.json())
            .then((y) => {
                hashSet(y.hash);
                const { width, height } = y;
                const pixels = decode(y.hash, width, height);
                canvas.current.width = width;
                canvas.current.height = height;
                const ctx = canvas.current.getContext('2d');
                const imageData = ctx.createImageData(width, height);
                imageData.data.set(pixels);
                ctx.putImageData(imageData, 0, 0);
                imageUrlSet(imageURL);
            });
    };
    return (
        <div>
            <form onSubmit={getHash}>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="imageUrl">URL</label>
                        <input
                            type="text"
                            required
                            className="u-full-width"
                            placeholder="Fill in the URL of an image"
                            name="imageUrl"
                            id="imageUrl"
                        />
                    </div>
                </div>
                <input
                    className="button-primary"
                    type="submit"
                    value="Hash it up!"
                />
                {hash && (
                    <code style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                        {hash}
                    </code>
                )}
            </form>
            <div className="image-wrap">
                <img onLoad={loadedImage} src={imageUrl}></img>
                <canvas ref={canvas}></canvas>
            </div>
            <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                <iframe
                    src="https://www.loom.com/embed/a2787e0276c84100928408bdaa1709e5"
                    frameborder="0"
                    webkitallowfullscreen
                    mozallowfullscreen
                    allowfullscreen
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                ></iframe>
            </div>
        </div>
    );
};

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('react-target')
);
