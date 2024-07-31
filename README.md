# Tusks

## Description
A simple Tasks web application built with a Django backend and a React frontend using Vite. The application is containerized using Docker and uses Nginx as a reverse proxy. The database used is PostgreSQL.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Project](#project)
- [Acknowledgements](#acknowledgements)

## Installation

### Prerequisites
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/the5rb/tasks_app_root.git
2. cd into tasks_app_root:
   ```sh
   cd tasks_app_root
3. Run docker-compose build:
   ```sh
   docker-compose build
   docker-compose up

### Usage
Once the Docker containers are up and running, you can access the application at http://localhost. The Nginx server will route requests to the appropriate service.

### Contributing
Happy to get any contributions, let's make something cool.

   1. Fork the Project
   2. Create your Feature Branch (git checkout -b feature/your_cool_feature)
   3. Commit your Changes (git commit -m 'Add some AwesomeFeature')
   4. Push to the Branch (git push origin feature/AwesomeFeature)
   5. Open a Pull Request

### Project
Project Link: https://github.com/the5rb/tasks_app_root

### Acknowledgements
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Nginx](https://www.nginx.com/)
