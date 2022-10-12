// config.js
const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
    port: 3000,
    privateKey: './dev-private-key.pem',
    publicKey: './dev-public-key.pem',
    cert: './dev-cert.pem'
};

const production = {
    port: 3000,
    privateKey: '/root/.local/share/caddy/certificates/acme-v02.test.letsencrypt.org-directory/test.letsauth.org/test.letsauth.org.key',
    cert: '/root/.local/share/caddy/certificates/acme-v02.test.letsencrypt.org-directory/test.letsauth.org/test.letsauth.org.crt',
};

const config = {
    development,
    production
};

module.exports = config[env];
