const io = require("socket.io-client");

const SOCKET_URL = "http://localhost:4000/core";

const player1 = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: { token: "user1" }, // Mock auth if needed, or just rely on socket ID
});

const player2 = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: { token: "user2" },
});

let gameId = null;

function cleanup() {
    player1.disconnect();
    player2.disconnect();
    process.exit(0);
}

player1.on("connect", () => {
    console.log("Player 1 connected:", player1.id);
    joinQueue(player1, "10+0");
});

player2.on("connect", () => {
    console.log("Player 2 connected:", player2.id);
    joinQueue(player2, "10+0");
});

function joinQueue(socket, timeControl) {
    socket.emit("queue.join", {
        userId: socket.id, // Mock user ID
        timeControl: timeControl,
        rating: 1200,
    }, (response) => {
        console.log(`[${socket.id}] Joined queue:`, response);
    });
}

// Listen for match found
player1.on("queue.matchFound", (payload) => {
    console.log("Player 1 match found:", payload.gameId);
    gameId = payload.gameId;
});

player2.on("queue.matchFound", (payload) => {
    console.log("Player 2 match found:", payload.gameId);
    if (payload.gameId !== gameId) {
        console.error("Game IDs do not match!");
    }
});

// Listen for game aborted
player1.on("game:aborted", (payload) => {
    console.log("Player 1 received game:aborted:", payload);
    console.log("✅ TEST PASSED: Game aborted successfully");
    cleanup();
});

player2.on("game:aborted", (payload) => {
    console.log("Player 2 received game:aborted:", payload);
});

// Timeout if test takes too long
setTimeout(() => {
    console.error("❌ TEST FAILED: Timeout waiting for abort");
    cleanup();
}, 40000); // Wait 40s (abort should happen at 30s)
