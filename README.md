## Description

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Run the server locally on https

To run the nestjs server locally with SSL use the following steps.

#### For MacOS/Linux

1. Install mkcert.
```
brew install mkcert
```
2. Create a new local CA.
```
mkcert -install
```
3. Create self-signed certificates (`tg-mini-app.local` will be a hostname, fill free to change it on your own) and put them in `.cert` directory.
```
mkdir -p .cert && mkcert -key-file ./.cert/localhost-key.pem -cert-file ./.cert/localhost.pem 'tg-mini-app.local'
```
4. Add `127.0.0.1 tg-mini-app.local` into `/etc/hosts`. You need sudo rights to make changes in hosts file.
```
sudo sh -c "echo '127.0.0.1 tg-mini-app.local' >> /etc/hosts"
```

## Execute one time scripts to make update in the database (not a migration)
```bash
yarn ts-node prisma/scripts/file_name.ts
```

## Notes

Do not use `getters` in DTO as they are calling multiple times. See the [issue](https://github.com/typestack/class-transformer/issues/1707)
