<div align="center">
  <img src="docs/logo.png" alt="DashboardApp Logo" width="200" />
  <h1># Dashboard App</h1>
  <p>**Dashboard App** es una aplicación web moderna para la gestión administrativa, compras y recursos humanos en una empresa. Cuenta con autenticación por roles, paneles interactivos, generación de reportes PDF, y una arquitectura basada en React.js, Node.js, PostgreSQL y JWT..</p>
</div>

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso Rápido](#uso-rápido)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Descripción

Dashboard App es una plataforma fullstack para administrar diferentes áreas empresariales con funcionalidades específicas para cada rol:

- **Administración:** Visualización y registro de finanzas, ingresos y egresos con reportes en PDF.
- **Compras:** Gestión de órdenes de compra, proveedores y cantidades.
- **Recursos Humanos:** Control de empleados, asistencia y reportes estadísticos.

Su diseño modular y uso de JWT garantiza seguridad y personalización por usuario.

---

## Características

- Autenticación y autorización por roles (Admin, Compras, RRHH).
- Dashboards interactivos con gráficos y tablas.
- Formularios para registro de datos con validación.
- Generación dinámica de reportes PDF para cada área.
- API RESTful con Express y base de datos PostgreSQL.
- Manejo de estado global con React Context API.
- Soporte para modo claro/oscuro con Tailwind CSS.

---

## Tecnologías

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Reportes:** PDFKit para generación de PDF
- **Control de Versiones:** Git, GitHub

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/DannyAceves/DashboardApp.git
cd DashboardApp
```
Backend

1 Instala dependencias:
```bash
        cd dashboard-app-back
        npm install
```

2 Configura variables de entorno .env con tus credenciales de base de datos y JWT.

3 Inicia el servidor:

```bash
        npm run dev
```

Frontend

1 Instala dependencias:
```bash
        cd ../dashboard-app-front
        npm install
```
2 Crea un archivo .env en backend/ con la configuración de tu base de datos:
```bash
PORT=5000
DB_USER=tu_user_db
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tu_db
JWT_SECRET=una_clave_secreta
```

3 Inicia la app:
```bash
        npm run dev
```
La aplicación estará disponible en http://localhost:5173 por defecto.

🗄️ Restaurar base de datos PostgreSQL

Este proyecto incluye un archivo de respaldo backup.sql en la raíz.

    Requisitos

      PostgreSQL instalado

      Acceso a usuario con privilegios (por ejemplo postgres)

```bash
        # 1. Crea la base de datos
        createdb -U PoliMaster DashboardApp

        # 2. Restaura el backup
        psql -U PoliMaster -d DashboardApp -f backup.sql
```

👥 Roles y módulos

    Administración

        Registra ingresos y egresos

        Visualiza reportes financieros

        Exporta PDF con gráficos y tablas

    Compras

        Registra órdenes de compra

        Visualiza historial de proveedores

        Exporta PDF con montos por categoría

    Recursos Humanos

        Agrega empleados

        Consulta asistencias y nuevos ingresos por semana

        Exporta PDF con gráficas de empleados

Instrucciones

Uso Rápido

    Regístrate o inicia sesión con usuario y contraseña.
    Según tu rol verás el dashboard correspondiente con datos y opciones.
    Usa los formularios para crear órdenes, empleados o registros financieros.
    Descarga reportes PDF filtrados por fechas para análisis y control.

Estructura del Proyecto
```bash
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── utils/
  ├── server.js
  ├── package.json
/frontend
  ├── src/
      ├── components/
      ├── context/
      ├── pages/
      ├── App.jsx
      ├── main.jsx
  ├── tailwind.config.js
  ├── package.json
README.md
```

Contribuciones

¡Las contribuciones son bienvenidas! Para colaborar:

    Haz un fork de este repositorio.
    Crea una rama con tu feature: git checkout -b feature/nueva-funcionalidad
    Haz commit de tus cambios: git commit -m "Descripción del cambio"
    Push a tu rama: git push origin feature/nueva-funcionalidad
    Abre un Pull Request.

Contacto

    Autor: Danny Aceves
    GitHub: DannyAceves
    Email: danielaceves.mx@gmail.com

Gracias por usar Dashboard App — ¡Tu solución empresarial simplificada!
