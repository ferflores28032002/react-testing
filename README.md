# 🏔️ Sistema de Cronograma de Supervisores Mineros

Sistema inteligente para la planificación automática de turnos de supervisores de perforación en operaciones mineras, desarrollado con React + TypeScript + Zustand.

## 🎯 Características

- ✅ **Algoritmo Inteligente**: Generación automática de cronogramas cumpliendo reglas de negocio complejas
- ✅ **Validación en Tiempo Real**: Detección y reporte de conflictos en el cronograma
- ✅ **Interfaz Profesional**: UI moderna y responsiva con Tailwind CSS
- ✅ **Gestión de Estado**: Zustand + Immer para estado predecible e inmutable
- ✅ **Arquitectura Escalable**: Atomic Design + Feature-based structure
- ✅ **Type-Safe**: TypeScript con enums y tipos estrictos
- ✅ **Notificaciones**: Sistema de alertas con Sonner

## 🏗️ Arquitectura

```
src/
├── core/
│   ├── components/
│   │   ├── atoms/          # Componentes básicos reutilizables
│   │   ├── molecules/      # Combinaciones de átomos
│   │   └── organisms/      # Componentes complejos
│   ├── store/              # Estado global con Zustand
│   └── types/              # Tipos y enums compartidos
└── features/
    └── schedule/
        ├── components/     # Componentes específicos del feature
        ├── helpers/        # Funciones auxiliares
        ├── hooks/          # Custom hooks
        └── utils/          # Lógica de negocio
            ├── supervisorFactory.ts      # Factory de supervisores
            ├── activityMapper.ts         # Mapeo de actividades
            ├── phaseTransitions.ts       # Transiciones de fase (Strategy Pattern)
            ├── scheduleAdjuster.ts       # Ajustes de cronograma
            ├── scheduleGenerator.ts      # Orquestador principal
            └── scheduleValidator.ts      # Validación de reglas
```

## 📋 Reglas de Negocio

### Reglas Fundamentales
1. Siempre debe haber **EXACTAMENTE 2 supervisores perforando**
2. **NUNCA** deben estar 3 supervisores perforando al mismo tiempo
3. **NUNCA** debe haber solo 1 supervisor perforando (una vez que S3 entró)
4. El Supervisor 1 (S1) **SIEMPRE** cumple el régimen completo sin modificaciones
5. Los Supervisores 2 y 3 (S2, S3) se ajustan para cumplir las reglas

### Ciclo de un Supervisor
- **S** = Subida (viaje al campo) - siempre 1 día
- **I** = Inducción (capacitación) - configurable (1 a 5 días)
- **P** = Perforación (trabajo efectivo)
- **B** = Bajada (retorno) - siempre 1 día
- **D** = Descanso

### Régimen Variable (NxM)
- **N** = Días de trabajo (subida + inducción si aplica + perforación)
- **M** = Días libres (bajada + descanso)
- Días de descanso REAL = M - 2 (restando subida y bajada)

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm run dev

# Build de producción
pnpm run build

# Preview de producción
pnpm run preview
```

## 🛠️ Stack Tecnológico

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **Zustand** - State Management
- **Immer** - Immutable State
- **Sonner** - Toast Notifications
- **React Router DOM** - Routing

## 💡 Patrones de Diseño Implementados

- **Strategy Pattern**: Para transiciones de fase de supervisores
- **Factory Pattern**: Para creación de estados de supervisores
- **Observer Pattern**: A través de Zustand para gestión de estado
- **Atomic Design**: Para organización de componentes UI
- **Feature-Sliced Design**: Para estructura de features

## 📊 Ejemplo de Uso

1. Configura los parámetros del régimen:
   - Días de trabajo (N)
   - Días libres totales (M)
   - Días de inducción

2. Haz clic en "Generar Cronograma"

3. Revisa el cronograma generado y las validaciones

4. Si hay errores, el sistema los mostrará con detalles específicos

## 🎨 Características de UI

- Diseño moderno con gradientes y sombras
- Animaciones suaves y transiciones
- Responsive design para todos los dispositivos
- Feedback visual inmediato
- Estados de carga y error bien definidos
- Accesibilidad considerada

## 📝 Notas Técnicas

- Sin comentarios en el código (código auto-documentado)
- Enums en lugar de string literals
- Separación clara de responsabilidades
- Funciones puras donde sea posible
- Código profesional de nivel senior
- Zero dependencias innecesarias

## 🔍 Validaciones Implementadas

- ✅ Detección de solo 1 supervisor perforando (cuando S3 está activo)
- ✅ Detección de 3 supervisores perforando simultáneamente
- ✅ Validación de días mínimos de perforación por ciclo (mínimo 3 días)
- ✅ Ajuste automático de S2 para mantener 2 supervisores perforando

## 📄 Licencia

MIT

---

**Desarrollado con ❤️ para operaciones mineras eficientes**
