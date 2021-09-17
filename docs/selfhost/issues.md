---
sidebar_position: 3
---

# Common Issues

Here are a few common issues that users have had in the past. These issues are either commonly asked in [Yet Another General Purpose Discord Bot](https://yagpdb.xyz/)'s Self Hosting Support channel within their Discord or a well known issue in general. Here you will find how to fix it should you have one of these issues. Note: You can see a list of issues mentioned on this page by using the links to the right of the page.

## Did Not Set Required Config Option: YAGPDB_CLIENTID

If you get this error:

```error="Did not set required config option: \"yagpdb.clientid\" (YAGPDB_CLIENTID as env var)"```

**Using ```/etc/environment```:**  
If you have put your [env variables](https://raw.githubusercontent.com/jonas747/yagpdb/master/cmd/yagpdb/sampleenvfile) inside of ```/etc/environment```, simply log out of your shell and log back in. Then try to start YAGPDB as you would normally. However, we reccommend that you move your env variables to ```~/.profile```. Learn how to do so [here](/selfhost/selfhostyag).

**Using ```~/.profile:```**  
If you are storing your [env variables](https://raw.githubusercontent.com/jonas747/yagpdb/master/cmd/yagpdb/sampleenvfile) inside of ```~/.profile```, ensure that you're starting YAGPDB with the same user. Example if you start yag with sudo - you must store your env variables as the root user. As a work around you can use the following command:  
```sudo -E ./yagpdb -all```

---

## YAGPDB Dashboard: ERR_SSL_PROTOCOL_ERROR

When you try to access your dashboard using the variable you set [here](/selfhost/selfhostyag), you may get the following error:
![](/img/sslerror.png)

This is because YAGPDB can not issue its own https certificate by itself.

There are two ways we can work around this.

**Just use http.**
If you're insane, you could just not use a https certificate. However, of course we do not reccomend this work around. To use this, simply run the following command to start the bot:
```./yagpdb -all -pa -https=false```

Your dashboard should now be accessible by using ```http://example.com```.

**Use a reverse proxy.**  
Reverse proxying sounds super complicated, right? Simply put, yes it is. But, thanks to JantsoP#0001, the hard work has been done for you.

:::caution
This guide has been designed with the idea that you know basic terminal commands, and have Ubuntu 18.04 or above installed.

In this guide we will refrence your YAGPDB_HOST Variable. Please replace this with the value you set within your [env variables](https://raw.githubusercontent.com/jonas747/yagpdb/master/cmd/yagpdb/sampleenvfile).
:::

First of all, we need to install nginx: 
```sudo apt install nginx -y ```

Then, start it & enable it in our systemctl:  
```sudo systemctl enable nginx --now ```

Now it's time to configure the proxy. To do this run the following commands:

```
cd /etc/nginx/sites-available/
sudo nano YAGPDB_HOST
```

You should now be presented with an empty file. Copy and paste the following text. Remember to replace YAGPDB_HOST with the value you set in your env variables.

```
server {
    server_name    YAGPDB_HOST;
    location / {
        # Basic settings
        proxy_read_timeout 360s;
        proxy_http_version 1.1;
        # Change PORT to the port you've set in the previous step
        proxy_pass http://localhost:5000;
        proxy_redirect http://localhost:5000 https://$server_name;
        error_log /var/log/nginx/yagpdb_error.log;
        access_log /var/log/nginx/yagpdb_access.log;
        # Headers
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Content-Type-Options nosniff;
        proxy_set_header X-Frame-Options "DENY";
        proxy_set_header Referrer-Policy "strict-origin";
        }

    listen 443 ssl; #
    ssl_certificate /etc/letsencrypt/live/YAGPDB_HOST/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/YAGPDB_HOST/privkey.pem;
    }
server {
        if ($host = YAGPDB_HOST) {
        return 301 https://$host$request_uri;
        }
    listen         80;
    server_name    YAGPDB_HOST
    return 404;
}
```

You can then save and close this file. It's time to sign your certificates. Install certbot:
```
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

and now to issue your certificate:
```
sudo certbot certonly --nginx
```

Follow the on screen instructions and ensure that certbot has installed the certificates in the same directories as mentioned here.
![](/img/sslcerts.png)

Once that is complete, you now need to enable and activate the proxy:
```
ln -s /etc/nginx/sites-available/YAGPDB_HOST /etc/nginx/sites-enabled
sudo service nginx restart
```

Then, start yagpdb with the following flags:

```
./yagpdb -all -exthttps=true -https=false
```

Voila! You should be able to access your dashboard securely using ```https://example.com```.

## Know of any other common issues?

Do you know any common issues that occur often or are enquired about all the time?  
Send them my way via [GitHub Pull request](https://github.com/JantsoP/hostyagpdb/pulls)