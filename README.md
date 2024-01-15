# Linkease

## Project Description

Linkease is an innovative platform inspired by IFTTT (If This Then That), a web-based service that enables users to create chains of simple conditional statements, known as applets. These applets trigger actions in other web services and devices. For more information about IFTTT, visit their website.

Linkease focuses on integrating and automating various services, particularly those compatible with OAuth 2.0 and webhooks. Users can easily add and manage these services on Linkease by filling out a form.

### Features

- **Service Creation:** Add OAuth 2.0 and webhook services to Linkease.
- **Triggers and Actions:** Create triggers and actions within these services, similar to functions that can call each other. This process is supported by a special, no-code program akin to Blueprint or Scratch.
- **Workspaces:** Organize automations into workspaces for group projects, allowing for the creation of no-code programs that utilize triggers and actions.
- **Team Collaboration:** Invite others to collaborate in workspace and service management, fostering teamwork.

### Community Approach

Linkease aims to establish a community-focused IFTTT-like platform. Key community elements include sharing workspaces and automations, and forums for inquiries and assistance, especially for users less familiar with programming.

#### Terminology

- **Automate:** Similar to an IFTTT applet but with increased complexity, including variable systems and advanced features.
- **Workspace:** A shared space among users for team collaboration, containing automates created by the team.

### User Structure

![User Structure](https://cdn.discordapp.com/attachments/906932555868143636/1181956197713182751/image.png)

### Global Project Structure

The project comprises a backend, a frontend, and workers:

- **Backend:** An API that communicates with the frontend and workers, managing various system functionalities.
- **Frontend:** The user interface allowing users to create, share, and manage their automates and workspaces.
- **Workers:** Components that execute automates, dynamically added to the project and communicating with the API through API requests and sockets.

The project also includes a canary (test) version and a stable version.

![Global Project Structure](https://cdn.discordapp.com/attachments/906932555868143636/1181953622339227728/image.png)

### Useful Links
- [Frontend Repository](https://github.com/AREA-LinkEase/FrontEnd)
- [Backend Repository](https://github.com/AREA-LinkEase/BackEnd)
- [Worker Repository](https://github.com/AREA-LinkEase/Worker)

### How to Run the Project

To run the project, use Docker Compose:

```bash
docker-compose up
```

### Project Status

The project is currently under development.

![Roadmap](https://cdn.discordapp.com/attachments/906932555868143636/1181954266806636554/image.png)

### Contributors

- Younes Bahri (younes1.bahri@epitech.eu) - DevOps, Full-Stack Developer
- Simon Vermeulen (simon.vermeulen@epitech.eu) - Backend Developer
- Thomas Papaix (thomas.papaix@epitech.eu) - Frontend Developer
- Adil Nouiri (adil.nouiri@epitech.eu) - Frontend Developer
- Keziah Imer (keziah.imer@epitech.eu) - Backend Developer

### Contact

For any questions or collaboration, please contact any of the contributors listed above.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

### Project Status
Completed

### Code of Conduct

Please refer to the [CODE_OF_CONDUCT.md](link_to_code_of_conduct) file for guidelines on participating in this project.
