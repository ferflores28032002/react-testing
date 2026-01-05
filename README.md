# Sistema de Cronograma de Supervisores Mineros

Este proyecto es una aplicacion web desarrollada con React, TypeScript y Vite para generar y visualizar cronogramas de turnos para supervisores de perforacion minera. El sistema asegura que se cumplan las reglas de cobertura operativa mediante un algoritmo de planificacion.

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
