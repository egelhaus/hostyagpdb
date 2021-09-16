---
sidebar_position: 1
---

# Setting up your Own Discord Application

Every Discord user requires an identity. The same goes with any Discord Bot. Follow this guide to setup your Discord Application, ready for your new YAGPDB instance.

---
## Log in

First of all, you need to login to the [Discord Developer portal](https://discord.com/developers/applications).

:::note
Your username and password are the same credentials you use to login to Discord itself.
:::

---

## Creating the application

To create your new bot's identity, click the ```New Application``` button, top right of the webpage as seen below:
![](/img/devportal.png)

You should now see a pop up, asking you to provide a name. This will only be used for the application name. It will not be used as your bot's username. Once you have thought of an awesome name, click the create button.

That's it! Your application has been created.

You should now see 'General Configuration'. Here you will be able to change your application's name, description and icon. The icon and description are both optional. The rest of the settings on this page you can ignore.

---

## Creating the bot

Now comes bringing your application to life. On the left hand side, click on ```Bot```, then click the ```Add Bot``` button.

A pop up titled "Add a Bot to this app?" should... pop up... Click ```Yes, do it!```
![](/img/Success.png)

If you see this, congratulations, you just birthed a non-binary robot! Ahem moving on.

Here you can now configure how your bot looks, and what it's called. Once you have optionally changed the bot's profile picture, and username, scroll down to "Privileged Gateway Intents".

![](/img/Intents.png)

Be sure to click save!

Next, go to ```OAuth2```, above the Bot option on the left hand side.

We need to add two redirects which will allow you to login to the control panel of your YAGPDB instance. Simply click ```Add Redirect``` twice. This should give you two boxes.

In the first, type: ```YAGPDB_HOST/confirm_login```

In the second, type: ```YAGPDB_HOST/manage```

:::info

YAGPDB_HOST is the domain you wish to use to access YAGPDB's control panel. Example: bot.example.com.

We will configure this [in the next guide](/selfhost/selfhostyag).

:::