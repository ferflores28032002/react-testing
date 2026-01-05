# Sistema de Cronograma de Supervisores Mineros

Este proyecto es una aplicacion web desarrollada con React, TypeScript y Vite para generar y visualizar cronogramas de turnos para supervisores de perforacion minera. El sistema asegura que se cumplan las reglas de cobertura operativa mediante un algoritmo de planificacion.

Demo en vivo: https://mining-project-testing.netlify.app/

## Proposito del Proyecto

El objetivo principal es resolver el problema de programacion de turnos donde se requiere mantener una cobertura continua de supervision en campo. El sistema calcula automaticamente los dias de trabajo, descanso, induccion y viajes para tres supervisores, asegurando que siempre haya la cantidad requerida de personal activo.

## Logica del Generador de Cronogramas

El nucleo de la aplicacion es el algoritmo de generacion de cronogramas, ubicado en el directorio features/schedule/utils. El proceso sigue estos pasos logicos:

### 1. Inicializacion del Estado

Se crean tres estados de supervisor independientes.
- El Supervisor 1 inicia inmediatamente en la fase de Subida (viaje al campo).
- Los Supervisores 2 y 3 inician en una fase de Espera, inactivos hasta que las reglas del negocio requieran su presencia.

### 2. Simulacion Dia a Dia

El sistema itera dia por dia hasta alcanzar el numero de dias de simulacion configurado (por defecto 360 dias).

En cada ciclo diario ocurren los siguientes eventos:

A. Activacion del Supervisor 2
En el dia 2 de la simulacion, el Supervisor 2 entra automaticamente en fase de Subida. Esto se hace para escalonar los turnos y evitar que todos los supervisores entren y salgan al mismo tiempo.

B. Calculo de Actividades Actuales
Para cada supervisor, se determina su actividad del dia basandose en su fase actual:
- Subida (S): Viaje hacia la mina.
- Induccion (I): Capacitacion en sitio (dias configurables).
- Perforacion (P): Trabajo operativo efectivo.
- Bajada (B): Viaje de retorno.
- Descanso (D): Dias libres fuera de mina.
- Inactivo (-): Aun no ha entrado al ciclo.

C. Activacion Dinamica del Supervisor 3
El algoritmo monitorea cuantos supervisores estan en fase de perforacion (trabajo efectivo). Si detecta que solo hay 1 supervisor perforando y el Supervisor 3 aun esta en espera, activa inmediatamente al Supervisor 3 (fase de Subida) para cubrir la brecha operativa.

D. Transicion de Fases
Al finalizar el dia, cada supervisor activo avanza su estado interno. Si ha completado la duracion de su fase actual (por ejemplo, cumplio sus dias de trabajo o descanso), transiciona a la siguiente fase del ciclo:
Subida -> Induccion (si aplica) -> Perforacion -> Bajada -> Descanso -> Subida...

### 3. Ajustes Posteriores

Una vez generada la simulacion base, se ejecuta una pasada de ajustes (applyScheduleAdjustments) para refinar el cronograma y resolver conflictos menores que no pudieron ser manejados durante la simulacion lineal.

## Justificacion del Algoritmo

Se eligio un enfoque de simulacion dia a dia (Day-by-Day Simulation) en lugar de una formula matematica estatica por varias razones clave:

1. Manejo de Estado y Contexto
Las reglas del negocio no son puramente ciclicas; dependen del estado de los otros supervisores. Por ejemplo, la entrada del Supervisor 3 depende explicitamente de que exista una brecha en la cobertura de perforacion. Una simulacion permite que los "agentes" (supervisores) reaccionen al estado del sistema en tiempo real.

2. Flexibilidad ante Cambios
Las operaciones mineras a menudo cambian sus requisitos (dias de induccion variables, cambios en los dias de viaje). Un algoritmo basado en maquinas de estados finitos es mas facil de adaptar a estas nuevas reglas que recalcular una ecuacion compleja de desplazamiento de turnos.

3. Deteccion de Conflictos
Al simular dia por dia, podemos identificar exactamente en que momento se rompen las reglas (ej. tres personas perforando) y registrar esos errores con precision para el usuario final.

## Seleccion de Tecnologias

Las decisiones tecnologicas se tomaron para priorizar la seguridad de tipos, la mantenibilidad y la experiencia de usuario:

React y Atomic Design
Se utilizo una arquitectura de componentes atomica para asegurar que la interfaz sea consistente y modular. Componentes pequenos como las celdas de la tabla (Atoms) se componen para formar las filas (Molecules) y la tabla completa (Organisms), facilitando la reutilizacion y las pruebas.

TypeScript
Dado que el cronograma depende de multiples estados (Subida, Bajada, Perforacion, etc.), el uso de TypeScript es fundamental para evitar errores logicos. Los Enums y Tipos estrictos aseguran que nunca se asigne un estado invalido a un supervisor durante la simulacion.

Zustand e Immer
Para el manejo del estado global, seleccionamos Zustand por su simplicidad y bajo peso en comparacion con Redux. Lo combinamos con Immer para permitir mutaciones inmutables del estado, lo cual simplifica drasticamente la logica de actualizacion de configuraciones complejas y arrays de cronogramas.

Tailwind CSS
Para la estilizacion, Tailwind permite iterar rapidamente sobre el diseño visual sin salir del archivo del componente. Esto es crucial para ajustar la grilla del cronograma y asegurar que sea responsiva en diferentes tamaños de pantalla.

jsPDF y autoTable
La generacion de reportes se realiza completamente en el cliente (Browser-side) para evitar costos de servidor y latencia. Elegimos jsPDF en combinacion con el plugin autoTable porque ofrecen el mayor control programatico para dibujar tablas complejas con celdas coloreadas que coincidan visualmente con la interfaz de usuario.

## Requisitos Previos

- Node.js (version LTS recomendada)
- pnpm (gestor de paquetes)

## Instalacion y Ejecucion

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. Instalar dependencias
Ejecuta el siguiente comando en la raiz del proyecto para descargar todas las librerias necesarias:
pnpm install

2. Servidor de Desarrollo
Para iniciar la aplicacion en modo de desarrollo con recarga en caliente (HMR):
pnpm run dev

3. Construccion para Produccion
Para generar los archivos estaticos optimizados para despliegue:
pnpm run build

4. Previsualizar Produccion
Para probar localmente la version construida:
pnpm run preview

## Despliegue en Netlify

Este proyecto esta optimizado para ser desplegado en la plataforma Netlify.

Pasos para desplegar:

1. Conecta tu repositorio de GitHub a Netlify.
2. Selecciona este repositorio.
3. En la configuracion de construccion, usa los siguientes parametros:
   - Build command: pnpm run build
   - Publish directory: dist
4. Despliega el sitio.

La aplicacion es una Single Page Application (SPA), por lo que Netlify manejara el enrutamiento y el servido de los archivos estaticos generados en la carpeta dist.
