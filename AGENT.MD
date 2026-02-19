# PagoClaro Web – Frontend Agent Guide

## 📌 Propósito

Este proyecto es el frontend oficial de PagoClaro.
Construido con Next.js (App Router), TypeScript y Tailwind.

El objetivo es:

- UI limpia y profesional
- Seguridad por rol
- Arquitectura escalable
- API-first (toda lógica vive en el backend)

---

# Package manager

use pnpm as package manager

- pnpm add
- pnpm install

---

## 🏗 Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod
- Axios o Fetch wrapper
- Supabase (solo para Auth)

---

## 🧠 Principios Arquitectónicos

### 1️⃣ API First

- Nunca implementar lógica de negocio en el frontend.
- El frontend solo consume endpoints.
- Cálculos financieros SIEMPRE vienen del backend.

---

### 2️⃣ Separación por Route Groups

app/
(auth)/
(dashboard)/

- `(auth)` → login, register, reset
- `(dashboard)` → aplicación autenticada

### 3️⃣ Control de Roles

Los roles vienen en el JWT:

- OWNER
- COLLECTOR
- ADMIN

El frontend solo controla visibilidad.
La seguridad real vive en backend + RLS.

---

## 📁 Estructura Oficial

src/
├── app/
├── components/
├── lib/
├── hooks/
├── types/
└── middleware.ts

---

## 🔐 Autenticación

- Supabase Auth maneja sesión.
- JWT contiene:
  - tenantId
  - role
- Middleware protege rutas privadas.
- Nunca confiar únicamente en el frontend.

---

## 🌐 API Layer

Toda comunicación con backend pasa por:

src/lib/api.ts

- Axios interceptors
- Manejo de errores
- Refresh token
- Cache

---

## 🎨 UI / Design System

- TailwindCSS
- shadcn/ui
- Variables CSS para colores
- Responsive first
- Dark mode opcional
- Diseño limpio, minimalista
- Enfoque en claridad financiera
- Evitar sobrecarga visual
- Mobile-first

---

## 📝 Componentes

- Botones
- Inputs
- Modales
- Tables
- Charts
- Layouts

---

## 📦 Estado Global

Evitar Redux inicialmente.
Usar:

- React Query (cuando sea necesario)
- Context solo para auth o UI state global

---

## 🔐 Seguridad

- Middleware protege rutas
- Roles en JWT
- Nunca exponer secretos
- Validaciones en frontend + backend
- No guardar datos sensibles en localStorage.
- No exponer lógica financiera.
- No duplicar validaciones críticas.
- Mantener componentes pequeños y reutilizables.

---

## 🚀 Deployment

- Vercel
- Netlify
- Docker

---

## 🎯 Reglas de Oro

1. El frontend NO decide nada financiero.
2. El backend es la única fuente de verdad.
3. Roles solo controlan visibilidad.
4. Nunca exponer secretos en código.
5. Toda validación crítica va en backend.

---

## 🏁 Resumen

Somos la cara del sistema.
El backend hace el trabajo pesado.
Arquitectura limpia, segura y escalable.
