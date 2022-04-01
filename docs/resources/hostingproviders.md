---
sidebar_position: 2
---

# Hosting providers

Here you can find a bunch of hosting providers that are useful for the installation and use of Yet another general purpose Discord bot.

- Hetzner [Dedicated](https://www.hetzner.com/dedicated-rootserver) or [Cloud](https://www.hetzner.com/cloud) servers
- [Digital Ocean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/)
- [Linode](https://www.linode.com/)
- [Vultr](https://www.vultr.com/)

## Replit / Heroku

Though technically possible, we don't recommend hosting YAGPDB on the free tiers of repl.it and Heroku.

This is due to the nature of how repl.it sets up their environment, as they will not give you root access, which is in general
necessary to install the dependencies.
Furthermore, your data won't be persistent, which means you'll have to use external (possibly paid) services, and that
kind of defeats the purpose of using a free hosting provider.

Heroku is similar, as they wipe your data on a daily basis with the free plan. Additionally, their command line interface
is rather lackluster for (advanced) self-hosters and maintenance purposes.


Have recommendation for host? Create [Pull request](https://github.com/JantsoP/hostyagpdb/pulls)
