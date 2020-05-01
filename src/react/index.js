import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { decode } from 'blurhash';

const App = () => {
    const [hash, hashSet] = useState('');
    const [imageUrl, imageUrlSet] = useState('');
    const canvas = useRef(null);

    const getHash = (e) => {
        e.preventDefault();
        const imageURL = document.getElementById('imageUrl').value;
        imageUrlSet(imageURL);
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
                const pixels = decode(y.hash, 250, 250);
                canvas.current.width = 250;
                canvas.current.height = 250;
                const ctx = canvas.current.getContext('2d');
                const imageData = ctx.createImageData(250, 250);
                imageData.data.set(pixels);
                ctx.putImageData(imageData, 0, 0);
            });
    };
    return (
        <div>
            <p>lorem???</p>
            <form onSubmit={getHash}>
                <div class="row">
                    <div class="six columns">
                        <label for="imageUrl">URL</label>
                        <input
                            type="text"
                            required
                            class="u-full-width"
                            placeholder="Fill in the URL of an image"
                            name="imageUrl"
                            id="imageUrl"
                        />
                    </div>
                </div>
                <input
                    class="button-primary"
                    type="submit"
                    value="Hash it up!"
                />
            </form>
            {hash && (
                <code style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                    {hash}
                </code>
            )}
            {hash && imageUrl && <img src={imageUrl}></img>}
            <canvas ref={canvas}></canvas>
        </div>
    );
};

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('react-target')
);
