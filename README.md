
# Event Management Demo

Este proyecto es un sistema de gestión de eventos que consta de cuatro microservicios:

1. **Auth Service**: Maneja la autenticación y autorización de los usuarios.
2. **Profile Service**: Maneja los perfiles de los usuarios.
3. **Events Service**: Maneja la creación, edición y eliminación de eventos.
4. **Frontend Service**: La interfaz de usuario para interactuar con el sistema.

## Requisitos Previos

- Docker
- Docker Compose

### Construcción y Ejecución

Para construir y ejecutar todos los servicios, usa Docker Compose:

```sh
docker-compose up --build
```

Esto levantará todos los microservicios y las bases de datos necesarias.

## Servicios

### Auth Service

- **Ruta Base**: `/auth`
- **Endpoints**:
  - `POST /auth/registrations`: Registro de usuario.
  - `POST /auth/sessions`: Inicio de sesión.

### Profile Service

- **Ruta Base**: `/profiles`
- **Endpoints**:
  - `GET /profiles/:id`: Obtener perfil de usuario.
  - `PUT /profiles/:id`: Actualizar perfil de usuario.

### Events Service

- **Ruta Base**: `/events`
- **Endpoints**:
  - `GET /events`: Listar eventos.
  - `POST /events`: Crear nuevo evento.
  - `GET /events/:id`: Obtener detalles de un evento.
  - `PUT /events/:id`: Actualizar evento.
  - `DELETE /events/:id`: Eliminar evento.

### Frontend Service

- **Ruta Base**: `/frontend`
- **Descripción**: Interfaz de usuario desarrollada en React para interactuar con los otros microservicios.

## Documentación de la API

Para obtener más detalles sobre cómo usar los endpoints de la API, consulta la documentación de Postman disponible en:

[Documentación de Postman](https://documenter.getpostman.com/view/147992/2sA3drHZtT)

## Desarrollo Local

### Frontend

Para ejecutar el frontend localmente:

```sh
docker compose run frontend
```

El frontend estará disponible en `http://localhost:3000`.

### Auth Service

Para ejecutar el servicio de autenticación localmente:

```sh
docker compose run auth
```

El servicio de autenticación estará disponible en `http://localhost:8096`.

### Profile Service

Para ejecutar el servicio de perfiles localmente:

```sh
docker compose run profiles
```

El servicio de perfiles estará disponible en `http://localhost:8098`.

### Events Service

Para ejecutar el servicio de eventos localmente:

```sh
docker compose run events
```

El servicio de eventos estará disponible en `http://localhost:8097`.

## Pruebas

### Backend Services

Para ejecutar las pruebas de los servicios backend:

```sh
docker compose run auth /bin/bash
RAILS_ENV=test bundle exec rspec

docker compose run events /bin/bash
RAILS_ENV=test bundle exec rspec

docker compose run profiles /bin/bash
RAILS_ENV=test bundle exec rspec
```
