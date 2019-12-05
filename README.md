# 2019-sa14-progressive-web-apps

## Getting Started
Damit das Projekt gestartet werden kann wird npm benötigt.
Man kann es hier herunterladen https://nodejs.org/de/download/.

### Football Webseite

``` bash
    cd football-website
    npm install 
    npm start 
```

### Football PWA

``` bash
    cd football-pwa
    npm install
    npm start 
```

### Football PWA with Workbox

``` bash
    cd football-pwa-workbox
    npm install
    npm start 
```
## Possible Problems

``` Error: Cannot find module 'accepts/node_modules/negotiator' ```

Dieser Error ist ein Bug von npm. Das Problem ist, dass er ab und zu die Module der Dependencies nicht installiert.
Um diesen Fehler zu beheben muss man den node_modules Ordner löschen und nochmals installieren:
    1. ``` rm -r node_modules ``` (sicherstellen das der Ordner node_modules gelöscht ist)
    2. ``` npm install ```

``` 
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
Diesr Fehler kommt von PowerShell und meldet eine Security Exception. Um das Problem zu beheben muss man folgenden Code ausführen im Terminal
``` Set-ExecutionPolicy RemoteSigned ```