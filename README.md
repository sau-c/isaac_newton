# Gestión de estudiantes en Nodejs con Express, EJS y MongoDB AWS

## Necesitas:
- Base de datos (MongoDB) Gratuita

## Crear archivo .env
Crea un archivo .env para almacenar tus credenciales. Ejemplo a continuación:

```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
PORT = <puerto>
SESSION_SECRET = <secrect>
```

## Instalación
Para instalar y ejecutar este proyecto, instala las dependencias usando npm y luego inicia tu servidor:

```
$ npm install
$ npm start
```

# Informe de Proyecto de Desarrollo Web

## Resumen del Proyecto

El objetivo inicial del proyecto era desarrollar una página web completa que integrara todas las vistas necesarias para la gestión de administradores y alumnos. Sin embargo, durante el proceso de desarrollo, surgieron varios problemas al intentar enlazar la base de datos, lo que nos obligó a migrar a nuevas vistas y a un nuevo repositorio. A continuación, se detallan los desafíos enfrentados, las soluciones implementadas y las conclusiones obtenidas.

## Las contraseñas se guardan en HASH con el authController.js

## Actualmente hay un usuario "admin" con contraseña "admin" de prueba

## Se válida cuando los usuarios o contraseñas ya existen o son incorrectos

## Desarrollo del Proyecto

### Fase 1: Desarrollo Inicial

- *Descripción*: Se desarrollaron todas las vistas de la página web, incluyendo las funcionalidades para usuarios administradores.
- *Problemas*: Al intentar enlazar la base de datos, surgieron múltiples problemas que impidieron la correcta integración de los datos.
- *Solución*: Se decidió migrar a nuevas vistas y a un nuevo repositorio para resolver los problemas de enlace con la base de datos.

### Fase 2: Producto Mínimo Viable (MVP)

- *Descripción*: Se entregó un producto mínimo viable que incluía la integración de usuarios administradores y el sistema de login. Además, se implementó un CRUD (Crear, Leer, Actualizar y Borrar) para la gestión de alumnos.
- *Modelo Utilizado*: Se utilizó el modelo de arquitectura Modelo-Vista-Controlador (MVC) para estructurar el proyecto.
- *Problemas*: A pesar de que el MVP funcionaba correctamente en un entorno local, surgieron problemas al intentar desplegarlo en el servidor.

### Fase 3: Iteraciones de Versiones

- *Versión 1*:
  - *Funcionalidad*: Funcionaba correctamente en un entorno local.
  - *Problemas*: En el servidor, no se lograban obtener los datos de la base de datos.
- *Versión 2*:
  - *Funcionalidad*: Se realizaron ajustes para intentar solucionar los problemas de la base de datos.
  - *Problemas*: No se pudo realizar el despliegue correctamente debido a errores en la configuración del servidor.
- *Versión 3*:
  - *Funcionalidad*: Finalmente, se logró una versión estable que resolvía los problemas de integración con la base de datos y permitía un despliegue exitoso en el servidor.
  - *Solución*: Se ajustaron las configuraciones del servidor y se optimizó el código para asegurar la correcta obtención de datos desde la base de datos.

## Limitaciones del Proyecto

1. *Tiempo*: La migración a nuevas vistas y repositorios requirió más tiempo del inicialmente previsto.
2. *Recursos*: Se limitaron los recursos disponibles para realizar pruebas exhaustivas en entornos de producción.
3. *Compatibilidad*: Algunos problemas de compatibilidad con el servidor retrasaron el proceso de despliegue.

## Conclusiones

- *Adaptabilidad*: La capacidad para adaptarse y migrar a nuevas soluciones fue clave para resolver los problemas encontrados.
- *Importancia del MVP*: Entregar un producto mínimo viable permitió identificar y resolver problemas críticos antes de implementar funcionalidades más avanzadas.
- *Aprendizaje Continuo*: Cada iteración del proyecto proporcionó valiosas lecciones que mejoraron la versión final del producto.

## Recomendaciones

1. *Pruebas Exhaustivas*: Realizar pruebas exhaustivas en entornos locales y de producción para identificar problemas antes del despliegue.
2. *Documentación*: Mantener una documentación detallada de cada fase del proyecto para facilitar futuras migraciones y resoluciones de problemas.
3. *Monitoreo*: Implementar herramientas de monitoreo para detectar y solucionar problemas en tiempo real una vez desplegado el proyecto.

---
