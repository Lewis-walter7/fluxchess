
const io = require('socket.io-client');

const WS_URL = 'http://localhost:4000/core';

function createClient(userId) {
    const socket = io(WS_URL, {
        transports: ['websocket'],
        auth: { token: undefined }, // Assuming no auth for now or mock auth
    });
    return socket;
}

async function run() {
    const socketA = createClient('userA');
    const socketB = createClient('userB');

    const joinPayload = {
        userId: 'userA',
        timeControl: 'blitz',
        rating: { rating: 1200, deviation: 0, volatility: 0 },
        latencyMs: 50,
    };

    const joinPayloadB = {
        userId: 'userB',
        timeControl: 'blitz',
        rating: { rating: 1200, deviation: 0, volatility: 0 },
        latencyMs: 50,
    };

    if (socketA.connected) {
        console.log('Socket A already connected');
    } else {
        await new Promise(resolve => socketA.on('connect', resolve));
        console.log('Socket A connected');
    }

    if (socketB.connected) {
        console.log('Socket B already connected');
    } else {
        await new Promise(resolve => socketB.on('connect', resolve));
        console.log('Socket B connected');
    }

    // User A joins queue
    console.log('User A joining queue (1st time)...');
    const ack1 = await socketA.emitWithAck('queue.join', joinPayload);
    console.log('User A joined with Queue ID:', ack1.queueId);

    // User A joins queue AGAIN immediately
    console.log('User A joining queue (2nd time)...');
    const ack2 = await socketA.emitWithAck('queue.join', joinPayload);
    console.log('User A joined with Queue ID:', ack2.queueId);

    // User B joins queue
    console.log('User B joining queue...');
    const ackB = await socketB.emitWithAck('queue.join', joinPayloadB);
    console.log('User B joined with Queue ID:', ackB.queueId);

    // Listen for match
    socketA.on('queue.matchFound', (payload) => {
        console.log('User A received matchFound:', payload);
        if (payload.queueId === ack1.queueId) {
            console.log('MATCHED WITH FIRST QUEUE ID (Q1)');
        } else if (payload.queueId === ack2.queueId) {
            console.log('MATCHED WITH SECOND QUEUE ID (Q2)');
        } else {
            console.log('MATCHED WITH UNKNOWN QUEUE ID');
        }

        if (payload.queueId !== ack2.queueId) {
            console.error('FAILURE: Mismatch detected! Client expects Q2 but got', payload.queueId);
            process.exit(1);
        } else {
            console.log('SUCCESS: Match ID matches latest queue ID.');
            process.exit(0);
        }
    });

    socketB.on('queue.matchFound', (payload) => {
        console.log('User B received matchFound');
    });
}

run().catch(console.error);
