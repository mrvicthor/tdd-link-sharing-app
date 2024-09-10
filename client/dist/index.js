"use strict";
const app = document.getElementById("app");
if (app) {
    const greeting = "Hello, TypeScript!";
    app.textContent = greeting;
}
else {
    console.error("App element not found");
}
