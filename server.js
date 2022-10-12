const crypto = require('node:crypto');
const {
    createSign,
} = require('node:crypto');

const fs = require('fs');

// We need to use ECDSA private keys since that is what Caddy
// generates
const config = require('./config.js');

const express = require('express')
const app = express();

function loadPrivateKey() {
    const pem = fs.readFileSync(config.privateKey, 'utf8');
    const pK = crypto.createPrivateKey(pem);
    return pK;
}

function loadPublicKeyPEM() {
    const pem = fs.readFileSync(config.publicKey, 'utf8');
    return pem;
}

function loadCert() {
    const cert = fs.readFileSync(config.cert, 'utf8');
    return cert;
}

function generateSession(type) {
    // create a random session ID
    const myuuid = crypto.randomUUID();
    // create a session structure
    const session = {
        domain: 'localhost:3000',
        sessionID: myuuid,
        type: type
    }
    // convert session to JSON string
    const sessionString = JSON.stringify(session);
    // load private key
    const privateKey = loadPrivateKey();
    // sign a digest of the string
    const sign = createSign('SHA256');
    sign.write(sessionString);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');

    return [session, signature.toString()];
}

app.get('/la3/session/:type', (req, res) => {
    if (req.params.type !== 'register' && req.params.type !== 'login') {
        res.sendStatus(400);
        return;
    }

    const [session, signature] = generateSession(req.params.type);
    res.send({ session: session, signature: signature });
});

app.get('/la3/public-key', (req, res) => {

    const key = loadPublicKeyPEM();
    res.send({ key: key });
});


app.get('/la3/cert', (req, res) => {

    const cert = loadCert();
    res.send({ cert: cert });
});

app.listen(5001, () => console.log('Server listening on port 5001!'));
