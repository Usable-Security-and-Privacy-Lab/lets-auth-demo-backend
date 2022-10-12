## Setup

Generate a private key and self-signed certificate for development

```
openssl ecparam -name prime256v1 -genkey -noout -out dev-key.pem
openssl req -new -x509 -key private-key.pem -out dev-cert.pem -days 360
```

Example of answers for a self-signed certificate:

```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:Utah
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Let's Authenticate
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:
```

## Run the server in development mode

```
npm run dev
```
