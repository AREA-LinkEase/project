# Linkease

## Overview
Linkease is an innovative automation platform inspired by IFTTT ("If This Then That"), a web-based service for creating conditional statements called applets. These applets enable actions across various web services and devices. Linkease specializes in integrating and automating services compatible with OAuth 2.0 and webhooks. 

For more information on IFTTT, visit their [website](https://ifttt.com).

## Captures d'écran (Exemples)

![image 1](https://cdn.discordapp.com/attachments/902556849776234557/1196523116411756555/image.png?ex=65b7effd&is=65a57afd&hm=b3e4548b32ce15cfb2ef1956ace492f2dcd8cf5f46f739c3e7b87418ff520563&)
![image 2](https://cdn.discordapp.com/attachments/902556849776234557/1196523211198824539/image.png?ex=65b7f013&is=65a57b13&hm=fa24cff7b73900d13179ca41e63a7cc5dbf641c75870604c44c8405fc94eb830&)
![image 3](https://cdn.discordapp.com/attachments/902556849776234557/1196523327926317136/image.png?ex=65b7f02f&is=65a57b2f&hm=0a91b175e20aaeb267fa55e9ef64cf7963377f5001793332757e5c9d11135801&)

## Features
- **Service Creation**: Add OAuth 2.0 and webhook services.
- **Triggers and Actions**: Create and manage these within services, using a no-code program similar to Blueprint or Scratch.
- **Workspaces**: Group automations and create no-code programs that utilize triggers and actions.
- **Team Collaboration**: Collaborate by inviting team members to manage workspaces and services.

## Technologies
Linkease is built using the following technologies:
- JavaScript
- ReactJS
- Ionic
- CI/CD practices
- NextJS

## Installation
### Via Dockerfile
1. Ensure Docker is installed.
2. Clone the repository.
3. Navigate to the project directory.
4. Build the Docker image with `docker build -t linkease-app .`
5. Run the container using `docker run -p 8081:8081 linkease-app`
6. Access the application at `http://localhost:8081`

### Via npm start
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`
4. Start the application using `npm start`
5. Access the application at `http://localhost:8081`

## Project Structure
- `components`: Reusable components.
- `pages`: Page logic.
- `models`: API request handling.

## Contribution
Contribution guidelines can be found on the [contribution page](contributing.md).

## Contributors
- Younes Bahri - DevOps, Front-End Developer
- Thomas Papaix - Front-End Developer
- Adil Nouiri - Front-End Developer

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Status
Completed

## Contact
For questions or contributions, please contact the team members in the following order:
- Younes Bahri - younes1.bahri@epitech.eu
- Adil Nouiri - adil.nouiri@epitech.eu
- Thomas Papaix - thomas.papaix@epitech.eu
