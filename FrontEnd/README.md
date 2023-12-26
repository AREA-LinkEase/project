# LinkEase

## Description du Projet

LinkEase est une application web offrant une expérience similaire à IFTTT (If This Then That), permettant aux utilisateurs de créer des automatisations simples en connectant différents services en ligne.

## Captures d'écran (Exemples)

![image 1](https://cdn.discordapp.com/attachments/906932555868143636/1186975755792551976/WorkSpaceActivate.png?ex=65953451&is=6582bf51&hm=1be4ea642a56463fa46240577fe54613e5690ddc9b9fed635101b6f0aa4ea7b4&)
![image 2](https://media.discordapp.net/attachments/906932555868143636/1186975756115521576/AutomatPoc.png?ex=65953451&is=6582bf51&hm=a9516258d1c775166178610120c253d26fc4f146a0e4ecdce85209a1a09b39c2&=&format=webp&quality=lossless&width=256&height=554)
![image 3](https://media.discordapp.net/attachments/906932555868143636/1186975756593664110/LogInPage.png?ex=65953451&is=6582bf51&hm=0b189f1b63ddd1cd4e7fcc6c28d668f9255a3d89804b98d18d6360a66b573e94&=&format=webp&quality=lossless&width=256&height=554)

## Technologies Utilisées

- JavaScript
- ReactJS
- Ionic

## Installation

### Via Dockerfile

1. Assurez-vous d'avoir Docker installé sur votre machine.
2. Clonez ce dépôt.
3. Naviguez dans le répertoire du projet.
4. Exécutez la commande suivante pour construire l'image Docker :

```bash
docker build -t linkease-app .
```

5. Une fois la construction terminée, lancez le conteneur avec la commande :

```bash
docker run -p 8081:8081 linkease-app
```

6. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:8081](http://localhost:8081).

### Via npm start

1. Clonez ce dépôt.
2. Naviguez dans le répertoire du projet.
3. Exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

4. Lancez l'application avec la commande :

```bash
npm start
```

5. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:8081](http://localhost:8081).

## Structure du Projet

- **components:** Stocke les composants réutilisables.
- **pages:** Stocke la logique des pages.
- **models:** Sert à effectuer des requêtes API.

## Contribution

Vous pourrez trouver les informations nécessaire sur [ce page](contributing.md)

## Contributeurs

- Younes Bahri - DevOps, Développeur Front-End
- Thomas Papaix - Développeur Front-End
- Adil Nouiri - Développeur Front-End

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

## Statut du Projet

En Développement

## Contact

Pour toute question ou contribution, veuillez contacter les membres de l'équipe dans l'ordre de priorité suivant :

- Younes Bahri - [younes1.bahri@epitech.eu](mailto:younes1.bahri@epitech.eu)
- Adil Nouiri - [adil.nouiri@epitech.eu](mailto:adil.nouiri@epitech.eu)
- Thomas Papaix - [thomas.papaix@epitech.eu](mailto:thomas.papaix@epitech.eu)
