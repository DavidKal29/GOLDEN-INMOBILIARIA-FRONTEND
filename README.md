# GOLDEN KEY INMOBILIARIA FRONTEND

Esta es la **aplicación frontend de Golden Key Inmobiliaria**, desarrollada en **Vue**, diseñada para interactuar con la API de Golden Key Inmobiliaria y ofrecer una experiencia de usuario fluida, moderna y segura para la gestión de usuarios, inmuebles, etc.

⚠️ **Dependencia:** Esta aplicación consume la API de Golden Key Inmobiliaria, por lo que requiere que el backend esté funcionando.

## Funcionalidades principales

### Autenticación y gestión de sesión
- Registro y login de usuarios mediante el uso de **JWT**.
- Recuperación de contraseña con integración de token enviado por email.
- Persistencia de sesión usando cookies seguras.

### Gestión de usuarios
- Visualización y edición de perfil de usuario.
- Visualización de inmuebles comprados por el usuario.

### Gestión de inmuebles
- CRUD completo sobre inmuebles mediante **fetch** a la API.
- Se puede visualizar y comprar los inmuebles, pudiendo filtrar y escoger el preferido, y obtenerlo en el perfil.

### Consumo de API
- Uso de **fetch** con credenciales (`credentials: 'include'`) para interactuar con el backend.
- Manejo de respuestas y errores, mostrando notificaciones al usuario.
- Integración de **CSRF token** para formularios sensibles.

### Routing y protección de rutas
- Rutas implementadas con **vue-router**.
- Redirección automática según el estado de autenticación del usuario.

### Notificaciones y feedback
- Uso de **toast** con vue-sonner para alertar sobre acciones exitosas o errores.
- Mensajes claros cuando fallan operaciones críticas.

### Seguridad y buenas prácticas
- Protección de formularios sensibles con **CSRF tokens**.
- Protcción de rutas. Si un usuario no está logueado no puede ver rutas como el perfil.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
