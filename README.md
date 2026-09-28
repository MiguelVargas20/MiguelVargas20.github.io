# Portafolio — Miguel Andrés Vargas León

Portafolio profesional como **Desarrollador de Software Junior** (Java · Spring Boot · React · Flutter).

🔗 **Sitio:** https://miguelvargas20.github.io/

## Contenido

- **Sobre mí** — perfil y objetivo profesional.
- **Formación académica** — Tecnólogo en Análisis y Desarrollo de Software (SENA) y Técnico en Programación de Software (SENA).
- **Proyectos** — Golden Booking (full stack), Golden Booking Móvil, BiblioRed y Calculadora Móvil, con enlaces a su código.
- **Habilidades técnicas** — agrupadas por área.
- **Contacto** — formulario funcional, correo, LinkedIn y GitHub.

## Tecnologías

HTML5, CSS3 y JavaScript sin frameworks ni dependencias. Diseño responsive (PC y celular) con modo oscuro automático según el sistema.

## Formulario de contacto

El formulario usa [FormSubmit](https://formsubmit.co) para enviar los mensajes a `andresvarg150@gmail.com`, sin backend propio.

> **Activación (solo la primera vez):** al enviar el primer mensaje desde el sitio publicado, FormSubmit manda un correo de confirmación a `andresvarg150@gmail.com`. Hay que abrirlo y pulsar **Activate Form**; desde ese momento los mensajes llegan directo al correo.

Si el envío falla, el sitio muestra un enlace `mailto:` con el mensaje ya escrito como alternativa.

## Ejecutar en local

No requiere instalación: abre `index.html` en el navegador o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Flujo de ramas

| Rama | Uso |
|---|---|
| `pruebas` | Desarrollo y pruebas de cambios |
| `desarrollo` | Revisión: recibe PR desde `pruebas` |
| `main` | Producción (GitHub Pages): recibe PR aprobado desde `desarrollo` |
