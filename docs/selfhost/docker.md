---
sidebar_position: 2
---

# How to Self Host YAGPDB with Docker

:::caution
This document requires that you have intermediate knowledge of Linux operating system!
:::

:::info
If you dont want to use Docker, click [here](selfhost/selfhostyag).
:::

Docker is the quickest way to get your own instance up and running.

## Prerequisites

- Server with root/sudo access Need one? Click [here](/resources/hostingproviders)
- Debian 10 or Ubuntu 20.04 (or newer)
- Git
- Docker / docker-compose

Installing Git
```
sudo apt update
sudo apt install git
```

Installing Docker and docker-compose
```
sudo apt update
sudo apt install docker-compose docker
```

After that, clone the repository:
```
git clone https://github.com/botlabs-gg/yagpdb
cp yagpdb/yagpdb_docker/{app.example.env,app.env}
cp yagpdb/yagpdb_docker/{db.example.env,db.env}
```

## Configuring YAGPDB

Before being able to start Yet Another General Purpose Discord Bot, we need to first configure it. To do this, you need to edit the .env files:

```
cd yagpdb/yagpdb_docker
nano app.env
```

Then, edit the pre-written variables so they match your config. If you don't wish to set a variable, it is recommended comment it out with `#` at the start of the line, for better overview.

:::caution
Change `YAGPDB_PQPASSWORD` to a safe and secure password.
:::

:::note
For basic functionality all you need to edit in app.env is:

- YAGPDB_CLIENTID - Your Discord Application ID. Found on the [Developer Portal](https://discord.com/developers)
- YAGPDB_CLIENTSECRET - Your Discord Application Client Secret. Found on the [Developer Portal](https://discord.com/developers)
- YAGPDB_BOTTOKEN - Your Discord Application BOT Token. Found on the [Developer Portal](https://discord.com/developers)
- YAGPDB_HOST - The domain of which YAGPDB's panel will be accessible from. Example: `bot.example.com`
- YAGPDB_EMAIL - The email of which your SSL certificate will be assigned to.
- YAGPDB_REDIS - The address for your redis installation. If following this guide, this is most likely set to 'localhost:6379'
:::

Save and exit. Now onto editing db.env:
```
nano db.env
```

Here you can keep pretty much everything as-is, however if you've changed `YAGPDB_PQPASSWORD` in app.env, you need to reflect this change onto `POSTGRESQL_PASSWORD`.

Save and exit as well.

## Running YAGPDB

Now that you've setup everything, you can start yagpdb:

```
docker-compose -f docker-compose.yml up
```

Alternatively, you can run the bot behind a proxy:

```
docker network create proxy-tier
docker-compose -p docker-compose.proxy.yml up
docker-compose -f docker-compose.proxied.yml up
```

During development, use the `docker-compose.dev.yml` file:

```
docker-compose -f docker-compose.dev.yml up
```

:::note
This will run everything that YAGPDB has to offer.  
If you don't have any plugins setup, they will spit out errors.  
This will run bot in ports 80 and 443; If you prefer 5000 and 5001, or don't have permission for 80 and 443,
remove the `-pa` argument from the command property in your docker-compose file, or remove it from the Dockerfile.
:::

---

## Did this guide help?
If you need more support, you may contact us on #self-hosting-discussion channel at [Discord](https://discord.gg/4udtcA5).
