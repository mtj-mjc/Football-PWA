# 2019-sa14-progressive-web-apps

## Getting Started


### Problems

``` Error: Cannot find module 'accepts/node_modules/negotiator' ```

Dieser Error ist ein Bug von npm. Das Problem ist, dass er ab und zu die Module der Dependencies nicht installiert.
Um diesen Fehler zu beheben muss man den node_modules Ordner löschen und nochmals installieren:
    1. ``` rm -r node_modules ``` (sicherstellen das der Ordner node_modules gelöscht ist)
    2. ``` npm install ```


https://stackoverflow.com/questions/57673913/vsc-powershell-after-npm-updating-packages-ps1-cannot-be-loaded-because-runnin

https://debuggerdotbreak.judahgabriel.com/2018/04/13/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned/

https://medium.com/the-web-tub/build-a-pwa-using-workbox-2eda1ef51d88

https://developers.google.com/web/fundamentals/architecture/app-shell

https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

https://developers.google.com/web/fundamentals/app-install-banners/#criteria

https://codelabs.developers.google.com/codelabs/push-notifications/index.html#3

https://www.goodbarber.com/blog/progressive-web-apps-browser-support-compatibility-a883/