# Gastos Diarios

Este proyecto es una aplicación web desarrollada con Angular para la gestión personal de gastos diarios. Permite a los usuarios registrar y categorizar sus ingresos y egresos, gestionar cuentas, establecer recordatorios y visualizar un resumen de sus finanzas a través de un panel de control personalizable.

## Características Principales

- Gestión de cuentas (bancarias, efectivo, etc.)
- Categorización de transacciones (ingresos, egresos, transferencias)
- Recordatorios de pagos o ingresos recurrentes
- Panel de control (dashboard) personalizable con tarjetas de resumen y gráficos
- Almacenamiento de datos localmente utilizando IndexedDB

## Tecnologías

- Angular (Framework de desarrollo frontend)
- TypeScript (Lenguaje de programación)
- IndexedDB (Base de datos del lado del cliente)
- Angular Material (Componentes de UI)
- RxJS (Programación reactiva)

## Requisitos Previos

- Node.js (versión LTS)
- npm (viene incluido con Node.js)
- Angular CLI

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/hahawork/gastos-diarios-angular.git
```

2. Instalar las dependencias:
```bash
cd gastos-diarios-angular
npm install
```

## Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Construcción

Para construir la aplicación para producción:

```bash
ng build
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/     # Componentes de la aplicación
│   │   ├── transacciones/  # Componentes de transacciones
│   │   └── categorias/     # Componentes de categorías
│   ├── models/        # Modelos de datos
│   └── services/      # Servicios de la aplicación
├── assets/           # Archivos estáticos
└── styles/          # Estilos globales
```

## Contribución

1. Crea un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT - consulta el archivo LICENSE para más detalles.
