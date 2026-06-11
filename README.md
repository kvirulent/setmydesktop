# Set my desktop
This is a small discord bot that allows your friends to set your desktop background (or whatever else you want to do with it). Users can run a command to set the served image and authorized clients may request the image and do whatever they like with it. To request the image, GET the /background endpoint of the server IP.

## Clients
On linux, you can use crontab to set your desktop background. Here is an example script that allows you to set it if you are using KDE Plasma:
```bash
export DISPLAY=:0
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"

mkdir -p /tmp/desktop-imgs
current_date=$(date)
curl -o "/tmp/desktop-imgs/$current_date" http://10.2.1.217:3000/background
plasma-apply-wallpaperimage "/tmp/desktop-imgs/$current_date" # save it somewhere else if you want to keep it between restarts
```

## Support
This app will likely not work on non-unix systems!
Tested on FreeBSD 15.0. Support is not provided for any other platform.
