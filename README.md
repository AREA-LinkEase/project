# Linkease

## Description du Projet

Linkease est un projet visant à créer une plateforme de type IFTTT, mais avec une approche plus technique et axée sur la communauté. L'objectif est d'intégrer des éléments communautaires tels que le partage de workspaces (espaces de travail) et d'automates, ainsi que des forums pour poser des questions et offrir de l'aide aux utilisateurs, en particulier ceux moins à l'aise avec la programmation.

### Vocabulaire

- **Automate :** Un automate est similaire à une applet sur IFTTT, mais avec une complexité accrue. Il intègre des systèmes de variables et d'autres fonctionnalités avancées.

- **Workspace :** Un workspace est un espace partagé entre plusieurs utilisateurs, permettant le travail d'équipe. Il contient des automates créés par l'équipe.

## Structure Utilisateur

![Structure Utilisateur](https://cdn.discordapp.com/attachments/906932555868143636/1181956197713182751/image.png?ex=658c2bfd&is=6579b6fd&hm=56dc4e4658c27e1ff247afc53c08b1e37eaf704b869988ad17eec3bc44d00a43&)

## Structure Globale du Projet

Le projet est composé d'un backend, d'un frontend et de workers.

- **Backend :** Il s'agit d'une API qui communique avec le frontend et les workers. Elle gère les différentes fonctionnalités du système.

- **Frontend :** L'interface utilisateur qui permet aux utilisateurs de créer, partager et gérer leurs automates et workspaces.

- **Workers :** Ces composants exécutent les automates. Ils peuvent être ajoutés dynamiquement au projet et communiquent avec l'API via des requêtes API et des sockets.

Le projet comprend également une version canary (version de test) et une version stable.

![Structure Globale du Projet](https://cdn.discordapp.com/attachments/906932555868143636/1181953622339227728/image.png?ex=658c2997&is=6579b497&hm=074d3f9843e2092357b71257875ec02100313f6141cd5e7ff2d65dddbc349806&)

### Liens Utiles
- [Frontend](https://github.com/AREA-LinkEase/FrontEnd)
- [Backend](https://github.com/AREA-LinkEase/BackEnd)

## Status du Projet

Le projet est actuellement en cours de développement.

![Roadmap](https://cdn.discordapp.com/attachments/906932555868143636/1181954266806636554/image.png?ex=658c2a30&is=6579b530&hm=75c9487601fff967d22cd6fd11d41e0b0d2273ba0490fe051ca293b83c54c5c6&)

## Contributeurs

- Younes Bahri (younes1.bahri@epitech.eu) - DevOps, Développeur Full-Stack
- Simon Vermeulen (simon.vermeulen@epitech.eu) - Développeur Backend
- Thomas Papaix (thomas.papaix@epitech.eu) - Développeur Frontend
- Adil Nouiri (adil.nouiri@epitech.eu) - Développeur Frontend
- Keziah Imer (keziah.imer@epitech.eu) - Développeur Backend

## Contact

Pour toute question ou collaboration, veuillez contacter l'un des contributeurs mentionnés ci-dessus.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Code de Conduite

Veuillez consulter le fichier [CODE_OF_CONDUCT.md](lien_vers_code_of_conduct) pour connaître les directives de conduite à suivre lors de la participation à ce projet.
