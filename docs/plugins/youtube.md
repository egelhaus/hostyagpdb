---
sidebar_position: 2
---

# How to setup YouTube Plugin for selfhosting

In order for you to enable YouTube feeds you'll need to get the YouTube API credentials and then add them to your bot setup. There are two versions to add the credential files to your container.

## Part 1 - Youtube Dashbord  
1.1 - Go to https://console.cloud.google.com/apis/ and create a new project.  
1.2 - Go to https://console.cloud.google.com/apis/library and enable the "YouTube Data API v3" API  
1.3 - Go to https://console.cloud.google.com/iam-admin/serviceaccounts, select your project and press "+ CREATE SERVICE ACCOUNT"   
1.4 - Create the service account (point 2 and 3 in the setup menu are optional)  
1.5 - Go back to https://console.cloud.google.com/iam-admin/serviceaccounts and open the newly created service account (by clicking on it)  
1.6 - Press "ADD KEY" -> "Create new key"   
1.7 - Create the credential JSON file, choose "JSON", press "CREATE" and save the file.  

## Part 2a - Your bot setup
This version requires you rebuild your YAGPDB image but doesn't use bind mounts.

2.1 - Copy the JSON file into your local YAGPDB repo: 
```cp filepath/to/credentials.json yagpdb/yagpdb_docker/credentials.json```

:::note
You can put it pretty much wherever you want, but if you put it outside the repo you'll need to add another line into your Dockerfile to include said path to your build workdir - not part of this guide.
:::

2.2 - Edit your Dockerfile:
```nano yagpdb/yagpdb_docker/Dockerfile```

:::note
Change the file-path accordingly.  
Instead of nano you can use whatever editor of your choice.
:::

2.3 - Add the following line to the Dockerfile above extra_flags :
```COPY --from=builder /appbuild/yagpdb/yagpdb_docker/credentials.json credentials/credentials.json```

:::note
Change the credentials.json filename if you didn't rename it in 2.1 and/or change the file-path accordingly
:::

2.4 - Build your docker image:
```docker-compose -f yagpdb/yagpdb_docker/docker-compose.dev.yml build --force-rm --no-cache --pull```

:::note
Change the file-path accordingly.
:::

2.5 - Edit your app.env file:
```nano yagpdb/yagpdb_docker/app.env```

:::note
Change the file-path accordingly.
:::

2.6 - Add the credentials.json file-path to the app.env file:
```GOOGLE_APPLICATION_CREDENTIALS=/app/credentials/credentials.json```

:::note
Change the file-path accordingly if you changed it in 2.3.
:::

2.7 - Run your bot with docker-compose.yml or docker-compose.proxy.yml
```
docker-compose -f yagpdb/yagpdb_docker/docker-compose.yml up -d
docker-compose -f yagpdb/yagpdb_docker/docker-compose.proxied.yml up -d
```
:::note
Change the file-path accordingly.
:::


This Version bind mounts the credentials.json file on the host machine to the YAGPDB docker container in read only mode and thus allows you to run the YouTube feeds without building your own image. However keep in consideration that this means the container has limited access to your local file system.

2.1  - Create a new folder which will be bind mounted to the container later and copy the JSON file to said folder:  
```mkdir filepath/credentials```

```cp filepath/download/credentials.json filepath/credentials/credentials.json```

:::note
Change the file-path accordingly.
:::


2.2 - Edit your docker-compose file:
```nano yagpdb/yagpdb_docker/docker-compose.yml```

```nano yagpdb/yagpdb_docker/docker-compose.proxied.yml```

:::note
Choose the right file depending on if you use a reverse proxy.  
Change the file-path accordingly.
:::

2.3 - Add the bind mount to the docker-compose file
```    
volumes:
      - cert_cache:/app/cert
      - soundboard:/app/soundboard
      - ~/credentials:/app/credentials:ro
```

The -```~/credentials:/app/credentials:ro``` line is the one you need to add. 
You can change the file-path accordingly to you needs. You should use the following format
 
```local-source-file-path:container-destination-file-path:ro```
 
It's very important that you use absolute file-paths for the container side and to add the :ro flag in order to set it to read-only.

2.4 - Edit your app.env file:
```nano yagpdb/yagpdb_docker/app.env```

:::note
Change the file-path accordingly.
:::


2.5 - Add the credentials.json file-path to the app.env file:
```GOOGLE_APPLICATION_CREDENTIALS=/app/credentials/credentials.json```

:::note
Change the file-path accordingly if you mapped it differently in 2..
:::

2.6 - - Run your bot with docker-compose.yml or docker-compose.proxy.yml  
```
docker-compose -f yagpdb/yagpdb_docker/docker-compose.yml up -d
docker-compose -f yagpdb/yagpdb_docker/docker-compose.proxied.yml up -d
```

:::note
Change the file-path accordingly.
:::


Guide was written by fluffyfirefly#8032. Content was copied with permission.