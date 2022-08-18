---
sidebar_position: 4
---

# Common Issues

Here are a few common issues that users have had in the past. These issues are either commonly asked in [Yet Another General Purpose Discord Bot](https://yagpdb.xyz/)'s Self Hosting Support channel within their Discord or a well known issue in general. Here you will find how to fix it should you have one of these issues. Note: You can see a list of issues mentioned on this page by using the links to the right of the page.

## Did Not Set Required Config Option: YAGPDB_CLIENTID

If you get this error:

```error="Did not set required config option: \"yagpdb.clientid\" (YAGPDB_CLIENTID as env var)"```

**Using ```~/.profile:```**
If you are storing your [env variables](https://raw.githubusercontent.com/botlabs-gg/yagpdb/master/cmd/yagpdb/sampleenvfile) inside of ```~/.profile```, ensure that you're starting YAGPDB with the same user. Example if you start yag with sudo - you must store your env variables as the root user. As a work around you can use the following command:
```sudo -E ./yagpdb -all```

---

## YAGPDB Control Panel: ERR_SSL_PROTOCOL_ERROR

When you try to access your dashboard using the variable you set [here](/selfhost/selfhostyag), you may get the following error:
![](/img/sslerror.png)

This is because YAGPDB can not issue its own https certificate by itself.

There are two ways we can work around this.

**Just use http.**
If you're insane, you could just not use a https certificate. However, of course we do not reccomend this work around. To use this, simply run the following command to start the bot:
```./yagpdb -all -pa -https=false```

Your dashboard should now be accessible by using ```http://example.com```.

## Know of any other common issues?

Do you know any common issues that occur often or are enquired about all the time?
Send them my way via [GitHub Pull request](https://github.com/JantsoP/hostyagpdb/pulls).
