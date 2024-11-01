// socket.js - Configuración de Socket.IO en el frontend
import { io } from 'socket.io-client';

// URL del servidor 
const socket = io('http://localhost:3333', {
    transports: ['websocket'], // Intenta usar WebSocket en lugar de polling
  });

  
  export default socket;