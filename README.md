# Cron Key Exchange
This package uses an RSA public/private key exchange mechanism to sign and verify JWT tokens, tokens are generated using the private key, only the public pair can verify the token.

run `npm run release` to deploy a new version


#Installation

create a .npmrc file wuth the following content

```
; Set a new registry for a scoped package
//npm.pkg.github.com/:_authToken=github-personal-access-token
@citisquareltd:registry=https://npm.pkg.github.com
always-auth=true
```

then you can install

```
$ npm install @citisquareltd/cron-key-exchange
```

add environment variables `CRON_PRIVATE_KEY` `CRON_PUBLIC_KEY`

the private key is only needed when generating auth token, the public key is used to decode the token


To validate token, use the `JwtValidator` class and call the `verify` method, this method is specific for express based application, for other frameworks, just use the `JwtService` class and call `verifyToken`

```typescript
new JwtValidator().verifyToken(token)
```

To generate token, call `generateToken` on the `JwtService`

```typescript
new JwtService().generateToken()
```
