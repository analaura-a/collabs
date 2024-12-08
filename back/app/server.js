import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import http from "http";
import cors from 'cors';
import { Server as SocketIOServer } from "socket.io";

import ApiProjectsRoute from '../api/routes/projects.api.routes.js'
import ApiUsersRoute from '../api/routes/users.api.routes.js'
import ApiProjectsTeamsRoute from '../api/routes/projects_teams.api.routes.js'
import ApiProjectsRequestsRoute from '../api/routes/projects_requests.api.routes.js'
import ApiAuthRoute from '../api/routes/accounts.api.routes.js'
import ApiSkillsRoute from '../api/routes/skills.api.route.js'
import ApiProjectsShortcutsRoute from '../api/routes/projects_shortcuts.api.routes.js'
import ApiProjectsReviewsRoute from '../api/routes/projects_reviews.api.routes.js'
import ApiNotificationsRoute from '../api/routes/notifications.routes.js'
import ApiChatsRoute from '../api/routes/chats.api.routes.js'
import ApiMessagesRoute from '../api/routes/messages.api.route.js'

const app = express();

const server = http.createServer(app);
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ["GET", "POST", "PATCH", "DELETE"],
};

// Configuración CORS
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Socket.IO
const io = new SocketIOServer(server, {
    cors: corsOptions,
});

app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public"));

app.use('/api', ApiProjectsRoute);
app.use('/api', ApiProjectsTeamsRoute);
app.use('/api', ApiProjectsRequestsRoute);
app.use('/api', ApiAuthRoute);
app.use('/api', ApiUsersRoute);
app.use('/api', ApiSkillsRoute);
app.use('/api', ApiProjectsShortcutsRoute);
app.use('/api', ApiProjectsReviewsRoute);
app.use('/api', ApiNotificationsRoute);
app.use('/api', ApiChatsRoute);
app.use('/api', ApiMessagesRoute);

// Configuración de Socket.IO
io.on("connection", (socket) => {

    console.log("Usuario conectado a  Socket:", socket.id);

    // Evento para unirse a una sala de chat específica
    socket.on("join_chat", (chatId) => {
        socket.join(chatId);
    });

    // Salir de un chat específico
    socket.on('leaveChat', (chatId) => {
        socket.leave(chatId);
    });

    // Evento para manejar la recepción de mensajes en tiempo real
    socket.on("send_message", async (messageData) => {
        io.to(messageData.chatId).emit("new_message_received", messageData); // Emite el mensaje recibido a todos los usuarios conectados al chat específico
    });

    // Manejar la desconexión
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Iniciamos el servidor
const PORT = process.env.PORT || 3333;
server.listen(3333, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { io };