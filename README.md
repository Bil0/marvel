# Marvel

Projet exercice utilisant l'api Marvel

## Prérequis

Des versions récentes de **NodeJs** et de **Google Chrome** sont nécessaire à la mise en marche du projet.

## Configuration

Afin de configurer l'application deux fichiers sont mis à disposition (server/api-keys.json et server/config.json):

### Clés API

`server/api-keys.json` ce fichier doit contenir les clés publiques et privées [marvel](https://developer.marvel.com/account) fournies lors de l'inscription.

```json
{
  "publicKey": "MY_PUBLIC_KEY",
  "privateKey": "MY_PRIVATE_KEY"
}
```

### Configuration Backend

`server/config.json` contient la configuration nécessaire à la mise en marche du serveur

```json
{
  "host": "localhost",
  "port": 3456,
  "dataSource": {
    "host": {
      "protocol": "https",
      "name": "gateway.marvel.com",
      "port": 443
    },
    "url": "/v1/public/characters",
    "maxFavorites": 5
  }
}
```
## Code metrics

### Lint

Lancer `npm run lint` pour avoir un compte rendu des bonnes pratiques utilisés dans le code.

### Testes

Lancer `npm run test` pour executer les testes unitaires. Le répertoire `coverage/` sera alors créé et contiendra un compte rendu de la couverture de code du projet (`coverage/index.html`).

**Note**: Une version récente de **Google Chrome** est nécessaire afin de lancer les testes unitaires.

## Mise en marche

### Transpilation (build)

Lancer `npm run build` pour transpiler les fichiers `*.ts` en `*.js` et de créer les bundles de la partie client. un répertoire `dist/` sera alors crée.

```bash
$ npm run build

> marvel@1.0.0 build /home/red-0ne/job/marvel
> ng build --prod && tsc -p server/

Date: 2018-02-26T10:00:51.762Z
Hash: e9d51cb8a5b8730989b3
Time: 45136ms
chunk {0} polyfills.5ab809c684ea99425809.bundle.js (polyfills) 64.1 kB [initial] [rendered]
chunk {1} main.f5083f45c7f657ac9b0e.bundle.js (main) 654 kB [initial] [rendered]
chunk {2} styles.2a8db402301688e5e543.bundle.css (styles) 47.9 kB [initial] [rendered]
chunk {3} inline.318b50c57b4eba3d437b.bundle.js (inline) 796 bytes [entry] [rendered]

$ ls -l dist/
-rw-r--r-- 1 red-0ne red-0ne   3294 Feb 26 10:01 3rdpartylicenses.txt
drwxr-xr-x 2 red-0ne red-0ne   4096 Feb 26 10:01 assets
-rw-r--r-- 1 red-0ne red-0ne   1150 Feb 26 10:01 favicon.ico
-rw-r--r-- 1 red-0ne red-0ne    616 Feb 26 10:01 index.html
-rw-r--r-- 1 red-0ne red-0ne    796 Feb 26 10:01 inline.318b50c57b4eba3d437b.bundle.js
-rw-r--r-- 1 red-0ne red-0ne 653731 Feb 26 10:01 main.f5083f45c7f657ac9b0e.bundle.js
-rw-r--r-- 1 red-0ne red-0ne  64085 Feb 26 10:01 polyfills.5ab809c684ea99425809.bundle.js
-rw-r--r-- 1 red-0ne red-0ne  47854 Feb 26 10:01 styles.2a8db402301688e5e543.bundle.css
```

### Lancement (run)

Executer la commande suivante pour lancer le serveur `npm run serve`

```bash
$ npm run server

> marvel@1.0.0 serve /home/red-0ne/job/marvel
> node server/dist

Server started
```

L'application devrait être disponible à l'adresse `http://localhost:3456` ou quoi que vous ayez mis dans `server/config.json`

### Documentation

Lancer la commande `npm run gendoc` afin de générer la documentation. Elle sera alors disponible à l'adresse `http://localhost:8080`

### Amélioration possible

Une amélioration possible serait de mettre les données des héros en favoris en cache afin d'éviter de lancer autant de requêtes qu'il y a de personage favori vers les serveurs de marvel. Car actuellement leurs API ne permet pas de récupérer une liste de personnage par leurs ID.