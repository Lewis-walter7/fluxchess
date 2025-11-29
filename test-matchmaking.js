#!/usr/bin/env node

const { io } = require('socket.io-client');

const WS_URL = 'http://localhost:4000/core';

const DEFAULT_RATING = {
    rating: 1500,
    deviation: 60,
    volatility: 0.06,
};

function createPlayer(playerId, timeControl = 'blitz') {
    return new Promise((resolve, reject) => {
        console.log(`[Player ${playerId}] Connecting...`);

        const socket = io(WS_URL, {
            transports: ['websocket', 'polling'],
            reconnection: false,
        });

        socket.on('connect', async () => {
            console.log(`[Player ${playerId}] Connected with socket ID: ${socket.id}`);

            try {
                const payload = {
                    userId: `test-user-${playerId}`,
                    timeControl,
                    rating: DEFAULT_RATING,
                    latencyMs: 45,
                    preferredRange: 75,
                    deviceFingerprint: `test-device-${playerId}`,
                };

                console.log(`[Player ${playerId}] Joining queue...`);
                const ack = await socket.emitWithAck('queue.join', payload);
                console.log(`[Player ${playerId}] Joined queue: ${ack.queueId}`);
                console.log(`[Player ${playerId}] Rating range: ${ack.ratingRange?.min} - ${ack.ratingRange?.max}`);
            } catch (error) {
                console.error(`[Player ${playerId}] Error joining queue:`, error.message);
                socket.close();
                reject(error);
                return;
            }
        });

        socket.on('queue.update', (update) => {
            console.log(`[Player ${playerId}] Queue update - elapsed: ${update.elapsedMs}ms, range: ${update.ratingRange?.min}-${update.ratingRange?.max}`);
        });

        socket.on('queue.matchFound', (match) => {
            console.log(`\n🎉 [Player ${playerId}] MATCH FOUND!`);
            console.log(`   Game ID: ${match.gameId}`);
            console.log(`   Opponent: ${match.opponent.userId}`);
            console.log(`   Opponent Rating: ${match.opponent.rating.rating}`);
            socket.close();
            resolve(match);
        });

        socket.on('connect_error', (error) => {
            console.error(`[Player ${playerId}] Connection error:`, error.message);
            reject(error);
        });

        socket.on('disconnect', (reason) => {
            console.log(`[Player ${playerId}] Disconnected: ${reason}`);
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            console.log(`[Player ${playerId}] Timeout - closing connection`);
            socket.close();
            resolve(null);
        }, 30000);
    });
}

async function testMatchmaking() {
    console.log('===================================');
    console.log('🎮 Testing Matchmaking System');
    console.log('===================================\n');

    try {
        // Create two players joining the same time control
        const timeControl = 'blitz';
        console.log(`Testing with time control: ${timeControl}\n`);

        // Join both players with a small delay
        const player1Promise = createPlayer(1, timeControl);

        // Small delay to ensure player 1 joins first
        await new Promise(resolve => setTimeout(resolve, 500));

        const player2Promise = createPlayer(2, timeControl);

        // Wait for both to complete
        const results = await Promise.all([player1Promise, player2Promise]);

        console.log('\n===================================');
        if (results[0] && results[1]) {
            console.log('✅ SUCCESS: Both players matched!');
            console.log(`   Game ID: ${results[0].gameId}`);
        } else {
            console.log('❌ FAILED: Players did not match within timeout');
        }
        console.log('===================================');

    } catch (error) {
        console.error('\n❌ Test failed:', error);
        process.exit(1);
    }

    process.exit(0);
}

// Run the test
testMatchmaking();
