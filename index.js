const WebSocket = require('ws');

const messages = [];

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');

    ws.on('message', (message) => {
        console.log('Received message:', message);
        if (message === 'getMessages') {
            const allMessages = [...messages];
            messages.length = 0; 
            ws.send(JSON.stringify(allMessages)); 
        } else {
            try {
                const data = JSON.parse(message);
                if (data.message && data.value !== undefined) {
                    const newMessage = { message: data.message, value: data.value };
                    messages.push(newMessage); 

                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(newMessage));
                        }
                    });
                }
            } catch (error) {
                console.error('Invalid message format:', error);
            }
        }
    });
});

console.log(`WebSocket server is running on ws://localhost:8080`);
