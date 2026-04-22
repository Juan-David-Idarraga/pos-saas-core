# POS SaaS Core - Multi-tenant 🚀

**Proyecto Base para Sistemas de Punto de Venta y Gestión de Negocios**

Este proyecto representa un "Core" arquitectónico robusto y escalable, diseñado para operar bajo un modelo de Software como Servicio (SaaS) Multi-tenant. Desarrollada por **Technology of Jota** y liderada por **Juan Idarraga**, esta plataforma permite que múltiples clientes (almacenes, restaurantes) operen en una misma base de código con datos completamente aislados y configuraciones personalizadas.

---

### 🔍 Auditoría Actual (V 0.1.0 - Setup Inicial)
*Qué se ha implementado hasta el momento:*
- [x] **Framework Base:** Inicialización de Next.js 16 con App Router y Turbopack.
- [x] **Configuración PWA:** Soporte integrado para instalación en dispositivos móviles (`next-pwa`).
- [x] **Base de Datos (Supabase):** Tablas core creadas (`businesses`, `profiles`, `products`) con políticas de seguridad RLS (Row Level Security) activas para aislamiento de tenants.
- [x] **Seguridad y Middleware:** Cliente SSR configurado. Middleware de protección de rutas y Layout de bloqueo SaaS para clientes con suscripciones inactivas/vencidas.
- [x] **UI Táctil:** Interfaz del Punto de Venta (POS) diseñada con Tailwind CSS, completamente responsiva (Mobile-First) simulando productos para la grilla de ventas.

### 🗺️ Roadmap Actual (Próximos Pasos)
- [ ] **Estado Global:** Implementar Zustand para la gestión del "Carrito de Compras / Ticket de Venta" en tiempo real.
- [ ] **Autenticación:** Crear interfaz de `/login` y enlazar perfiles de Supabase Auth.
- [ ] **Datos Dinámicos:** Reemplazar el "mock" de productos por consultas a la base de datos de Supabase filtrando por el `business_id` del tenant.
- [ ] **Webhooks de Pago:** Integración de pasarela (ej. MercadoPago/Stripe) para automatizar el estado de `subscription_status` de los negocios.

---

### 🌟 Características Clave
* **Arquitectura Multi-tenant:** Aislamiento de datos por cliente utilizando RLS en PostgreSQL, garantizando privacidad y seguridad total.
* **Control de Suscripciones (SaaS):** Middleware y validaciones de servidor que bloquean automáticamente el acceso al sistema si el negocio tiene pagos pendientes.
* **Híbrido y Responsivo (Mobile-First):** Interfaz táctil optimizada para celulares, tablets (iPads de garzones) y PCs, instalable como aplicación progresiva (PWA).

### 💻 Stack Tecnológico

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Framework Frontend** | Next.js (App Router) | React framework para alto rendimiento y SSR. |
| **Base de Datos & Auth** | Supabase | PostgreSQL y servicios de autenticación con RLS. |
| **Estilos CSS** | Tailwind CSS | Framework utility-first para diseño rápido y responsivo. |
| **Estado Global** | Zustand | Gestor de estado ligero y escalable para el carrito. |
| **Lenguaje** | TypeScript | Tipado estático para código robusto y mantenible. |

---

### ⚙️ Instalación y Configuración (Desarrollo Local)

Para ejecutar este proyecto localmente:

1. **Clonar el Repositorio:**
   ```bash
   git clone [URL_DE_TU_REPOSITORIO_AQUI]
   cd pos-saas-core