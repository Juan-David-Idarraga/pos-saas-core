# SaaS POS Core - Multi-tenant

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-blue?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-bear.github.io/)

## Visión General (Overview)

**SaaS POS Core** es un esqueleto multi-tenant diseñado para sistemas de Punto de Venta (POS) que permite a locales gastronómicos gestionar comandas en tiempo real, cuadrar cajas y controlar accesos mediante un modelo de suscripción. Este proyecto aborda la necesidad de una plataforma escalable y personalizable para múltiples clientes, proporcionando una base sólida para el desarrollo de soluciones POS adaptadas. Su impacto radica en ofrecer una infraestructura robusta que acelera el tiempo de comercialización para nuevos clientes, estandariza las operaciones y facilita la gestión centralizada de múltiples establecimientos.

## Características Clave (Key Features)

*   **Arquitectura Multi-tenant**: Diseño fundamental para soportar múltiples clientes de forma aislada y segura, permitiendo personalizaciones a nivel de marca (colores, logos) utilizando Row Level Security (RLS) en PostgreSQL.
*   **Control de Suscripciones (SaaS)**: Middleware y validaciones de servidor que bloquean automáticamente el acceso al sistema si el negocio tiene pagos pendientes o suscripciones inactivas/vencidas.
*   **Terminal de Ventas Táctil (UI)**: Interfaz del Punto de Venta (POS) diseñada con Tailwind CSS, completamente responsiva (Mobile-First) y optimizada para dispositivos táctiles.
*   **Gestión de Comandas en Tiempo Real**: Funcionalidades para la toma de pedidos, personalización de productos con extras y seguimiento del estado de las comandas, optimizando el flujo de trabajo en cocina.
*   **Cuadratura de Caja Avanzada**: Herramientas para el control financiero diario, incluyendo el desglose por métodos de pago y la conciliación con plataformas de delivery.
*   **PWA (Progressive Web App)**: Soporte integrado para instalación en dispositivos móviles, mejorando la experiencia offline y la accesibilidad.

## Arquitectura y Tecnologías

**SaaS POS Core** está construido sobre un stack tecnológico moderno que prioriza la escalabilidad, el rendimiento y la experiencia del desarrollador. La elección de **Next.js con App Router** y **TypeScript** proporciona una base robusta para una aplicación web de alto rendimiento, mientras que **Supabase** ofrece una solución integral de backend como servicio (BaaS) con PostgreSQL y autenticación.

*   **Framework Frontend**: Next.js (v16.x) con App Router, para renderizado del lado del servidor (SSR), generación estática (SSG) y optimización de rutas, garantizando una experiencia de usuario rápida y eficiente.
*   **Lenguaje de Programación**: TypeScript (v5.x), un superset de JavaScript que añade tipado estático, mejorando la calidad del código, la detección de errores en tiempo de desarrollo y la mantenibilidad.
*   **Estilos CSS**: Tailwind CSS (v4.x), un framework CSS utility-first que permite un desarrollo rápido de interfaces de usuario altamente personalizables y responsivas.
*   **Base de Datos & Auth**: Supabase, que proporciona una base de datos PostgreSQL escalable y servicios de autenticación seguros, simplificando la gestión del backend.
*   **Gestión de Estado**: Zustand (v5.x), una librería de gestión de estado ligera y flexible para React, optimizada para el rendimiento y la simplicidad.

Esta arquitectura permite un desarrollo ágil, una alta capacidad de personalización por cliente y una base sólida para la expansión de funcionalidades y la gestión de una base de usuarios creciente.

## Requisitos Previos (Prerequisites)

Para configurar y ejecutar el proyecto en un entorno de desarrollo local, asegúrese de tener instalados los siguientes componentes:

*   **Git**: Sistema de control de versiones.
    ```bash
    # Verificar instalación
    git --version
    ```
*   **Node.js**: Versión 18.x o superior. Incluye `npm` o `pnpm` para la gestión de paquetes.
    ```bash
    # Verificar instalación
    node -v
    npm -v
    ```
*   **pnpm**: Gestor de paquetes eficiente para Node.js (recomendado).
    ```bash
    # Instalar pnpm si no está disponible
    npm install -g pnpm
    # Verificar instalación
    pnpm -v
    ```
*   **Supabase CLI (Opcional)**: Para desarrollo local de Supabase y gestión de migraciones.

## Guía de Instalación Rápida (Getting Started)

Siga estos pasos para levantar el entorno de desarrollo local:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/Juan-David-Idarraga/pos-saas-core.git
    cd pos-saas-core
    ```

2.  **Instalar Dependencias**:
    ```bash
    pnpm install
    ```

3.  **Configurar Supabase**:
    *   Cree un nuevo proyecto en [Supabase](https://supabase.com/).
    *   Obtenga su `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   Cree un archivo `.env.local` en la raíz del proyecto y configure las variables de entorno como se muestra en la sección siguiente.
    *   Ejecute el script `schema.sql` (si existe) en su base de datos Supabase para inicializar el esquema.

4.  **Ejecutar la Aplicación**:
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Variables de Entorno (Environment Variables)

Cree un archivo `.env.local` en la raíz de su proyecto con las siguientes variables:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth.js (si se implementa)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Despliegue (Deployment)

Este proyecto está optimizado para ser desplegado en **Vercel**, la plataforma recomendada para aplicaciones Next.js. Vercel ofrece integración continua, despliegues automáticos y escalabilidad sin esfuerzo. Simplemente conecte su repositorio de GitHub a Vercel y configure las variables de entorno necesarias.

---

**Juan Idarraga**
*   **Empresa**: Technology of Jota
*   **Portafolio**: [LinkedIn Profile](https://www.linkedin.com/in/juan-david-idarraga-11088b387/)
