---
sidebar_position: 3
---

# Using NGINX reverse proxy (Non-Docker version)
Reverse proxying sounds super complicated, right? Simply put, yes it is. But, thanks to JantsoP#0001, the hard work has been done for you.

:::caution
This guide has been designed with the idea that you know basic terminal commands, and have Ubuntu 18.04 or above installed.

In this guide we will reference your YAGPDB_HOST Variable. Please replace this with the value you set within your [env variables](https://raw.githubusercontent.com/botlabs-gg/yagpdb/master/cmd/yagpdb/sampleenvfile).
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