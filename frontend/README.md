# **Frontend - Proyecto de Prueba**

Este proyecto es un frontend básico desarrollado en React. Incluye un formulario de inicio de sesión que interactúa con un backend para autenticar a los usuarios. El objetivo del candidato es realizar pruebas automatizadas y personalizaciones según lo indicado en la evaluación.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (versión 16 o superior). Puedes descargarlo desde [Node.js](https://nodejs.org/).
- **npm** (incluido con Node.js).
- Un editor de código, como **Visual Studio Code** (opcional, pero recomendado).

Para verificar si están instalados, ejecuta en tu terminal:

```bash
node -v
npm -v
```

---

## **1. Clonar el repositorio**

Clona este repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd frontend
```

---

## **2. Instalar dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

Esto instalará las bibliotecas necesarias para ejecutar el proyecto React.

---

## **3. Configuración**

El proyecto está preconfigurado para conectarse al backend en `http://localhost:3001`. Asegúrate de que el backend esté en ejecución antes de probar el proyecto.

Si necesitas cambiar la URL del backend:

1. Abre el archivo `src/App.jsx`.
2. Modifica la URL en el bloque `fetch`:

   ```javascript
   const response = await fetch("http://localhost:3001/login", {
   ```

---

## **4. Ejecutar el proyecto**

Inicia el servidor de desarrollo con:

```bash
npm run dev
```

Esto iniciará el proyecto y deberías ver un mensaje similar a este:

```
  VITE v4.0.0  ready in 300ms

  ➔  Local:   http://localhost:5173/
  ➔  Network: use `--host` to expose
```

Abre la URL proporcionada (normalmente `http://localhost:5173`) en tu navegador para ver la aplicación.

---

## **5. Funcionalidad del proyecto**

Este proyecto incluye:

- Un formulario de inicio de sesión con los campos:
  - **Email** (requerido).
  - **Contraseña** (requerida).
- **Flujo del login:**
  - Si las credenciales son correctas, se muestra una página de bienvenida.
  - Si las credenciales son incorrectas, se muestra un mensaje de error debajo del formulario.

---

## **6. Scripts útiles**

- **Iniciar el servidor en modo desarrollo:**
  ```bash
  npm run dev
  ```

- **Construir la aplicación para producción:**
  ```bash
  npm run build
  ```

- **Previsualizar el proyecto de producción:**
  ```bash
  npm run preview
  ```

---

## **7. Notas adicionales**

1. **Errores comunes:**
   - Si el frontend no puede conectarse al backend, verifica que:
     - El backend esté en ejecución.
     - Las URLs del frontend y backend coincidan.

2. **Configuración de puertos:**
   - El servidor de desarrollo de React se ejecuta en `http://localhost:5173` por defecto. Si necesitas cambiarlo, consulta la documentación de [Vite](https://vitejs.dev/).

3. **Pruebas:**
   - Este proyecto está diseñado para que puedas escribir pruebas automatizadas para el formulario de login y sus flujos.

---

## **8. Siguientes pasos**

1. **Verificar el flujo completo:** Asegúrate de que el backend esté en ejecución y prueba los flujos de inicio de sesión exitoso y fallido.
2. **Escribir pruebas automatizadas:** Diseña y ejecuta pruebas utilizando herramientas como Cypress o Selenium.

Si tienes preguntas o necesitas ayuda, contacta a tu responsable técnico.

---

## **. Test** 
1. **Install Testing Libraries** 

Install the required testing dependencies for Jest and React Testing Library.
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest identity-obj-proxy
Purpose: These libraries are the foundation for writing and running unit tests in a React application. Here’s a breakdown of each dependency:
	•	jest: Jest is the main testing framework that allows you to write unit tests, run them, and see the results. It provides test runners, assertions, and mocking functionality.
	•	@testing-library/react: A popular library designed for testing React components. It focuses on testing user interactions (clicks, typing, etc.) and DOM structure rather than implementation details.
	•	@testing-library/jest-dom: Extends Jest’s assertions with additional matchers specifically designed for working with the DOM. For example, it lets you do assertions like:
    ```javascript
        expect(element).toBeInTheDocument();
        expect(button).toHaveTextContent(/submit/i);
    ```
	•	@testing-library/user-event: Simulates user interactions like typing, clicking, or focusing on elements. This is useful for integration testing when verifying that components respond correctly to user input.
	•	babel-jest: Allows Jest to transpile modern JavaScript (ES6+) and JSX using Babel, making sure that React components and JavaScript modules are understood by Jest.
	•	identity-obj-proxy: A tool to mock CSS imports in Jest. Since Jest cannot understand CSS files during tests, this module ensures that CSS imports won’t cause errors and can be safely ignored or mocked.
2. **Configure Jest**
Create jest.config.js

Purpose: Jest needs to know how to handle different file types and how to find your test files. The configuration defines key aspects like:
	•	testEnvironment: "jest-environment-jsdom": Sets up a browser-like environment using jsdom, which is essential for testing React components that interact with the DOM.
	•	setupFilesAfterEnv: Specifies setup files (like setupTests.js) that will be run before each test. This is useful for global configurations like extending Jest with additional matchers.
	•	transform: Specifies that Babel will be used to transpile JavaScript and JSX files during testing.
	•	moduleNameMapper: Maps CSS and static assets (like images) to mock implementations to prevent errors during testing.
	•	testMatch: Defines which files Jest should consider as test files, such as files ending in .test.js or .spec.js.

3. **Create Babel Configuration**
babel.config.mjs

Purpose: Babel is responsible for transpiling modern JavaScript and JSX into a version that Jest can understand. Jest doesn’t natively support JSX or modern syntax (like optional chaining), so Babel is needed to bridge that gap.
	•	@babel/preset-env: Transpiles modern JavaScript (ES6+) into a version that is compatible with Node.js and older environments.
	•	@babel/preset-react: Transpiles JSX into regular JavaScript (usually React.createElement).

4. **Create setupTests.js File**

Purpose: The setupTests.js file is used to run any setup code before each test, such as extending Jest’s matchers or setting up mock environments.
	•	@testing-library/jest-dom: Extends Jest with custom matchers to test the DOM. This allows you to write assertions like toBeInTheDocument(), toHaveTextContent(), and toHaveAttribute().

5. **Update package.json**
Add the test script to package.json:

Purpose: The setupTests.js file is used to run any setup code before each test, such as extending Jest’s matchers or setting up mock environments.
	•	@testing-library/jest-dom: Extends Jest with custom matchers to test the DOM. This allows you to write assertions like toBeInTheDocument(), toHaveTextContent(), and toHaveAttribute().
