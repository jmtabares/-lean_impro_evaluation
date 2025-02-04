# QAEngineer-test-backend
# **Backend - Proyecto de Prueba**

Este proyecto es un backend básico desarrollado con **Node.js** y **Express**. Proporciona los endpoints necesarios para validar el flujo de autenticación, como inicio de sesión, obtención de perfil de usuario y cierre de sesión. El candidato deberá realizar pruebas e integraciones con el frontend.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (versión 16 o superior). Descárgalo desde [Node.js](https://nodejs.org/).
- **npm** (incluido con Node.js).

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
cd backend
```

---

## **2. Instalar dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

Esto instalará **Express**, **Cors** y otras dependencias necesarias para el proyecto.

---

## **3. Ejecutar el servidor**

Inicia el servidor en modo desarrollo usando **nodemon** (incluido en el proyecto):

```bash
npm run dev
```

Esto iniciará el servidor en `http://localhost:3001`. Deberías ver un mensaje como este en la consola:

```
Backend running on http://localhost:3001
```

Si prefieres iniciar el servidor sin nodemon, puedes usar:

```bash
npm start
```

---

## **4. Endpoints disponibles**

### **POST /login**
- **Descripción:** Autentica al usuario con credenciales válidas.
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "1234"
  }
  ```
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "token": "fake-jwt-token",
      "message": "Login successful!"
    }
    ```
  - **401 Unauthorized:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### **GET /profile**
- **Descripción:** Retorna el perfil del usuario autenticado.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer fake-jwt-token"
  }
  ```
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "name": "John Doe",
      "email": "test@example.com"
    }
    ```
  - **403 Forbidden:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

### **POST /logout**
- **Descripción:** Finaliza la sesión del usuario.
- **Respuestas:**
  - **200 OK:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

---

## **5. Scripts útiles**

- **Iniciar el servidor en modo desarrollo:**
  ```bash
  npm run dev
  ```

- **Iniciar el servidor en modo producción:**
  ```bash
  npm start
  ```

---

## **6. Notas adicionales**

1. **Configuración adicional:**
   - Este backend está diseñado para ejecutarse en `http://localhost:3001`. Si necesitas cambiar el puerto, modifica el archivo `app.js` en la línea:
     ```javascript
     const PORT = 3001;
     ```

2. **Simulación de autenticación:**
   - Las credenciales válidas están predefinidas como:
     - **Email:** `test@example.com`
     - **Password:** `1234`

3. **Errores comunes:**
   - Si no puedes conectar el frontend con el backend, verifica que ambos estén ejecutándose y que las URLs coincidan.

---

## **7. Siguientes pasos**

- **Probar los endpoints:** Puedes usar herramientas como Postman o cURL para probar manualmente los endpoints.
- **Escribir pruebas automatizadas:** Usa herramientas como Postman y Newman para diseñar y ejecutar pruebas automatizadas.

Si tienes preguntas o necesitas ayuda, contacta a tu responsable técnico.

---

