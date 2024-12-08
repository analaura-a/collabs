import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

const socket = io(`${SERVER_URL}`, {
  transports: ['websocket'],
});


export default socket;