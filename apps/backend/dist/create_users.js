"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./src/generated/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding users...');
    await prisma.user.upsert({
        where: { username: 'userA' },
        update: {},
        create: {
            id: 'userA',
            email: 'userA@example.com',
            username: 'userA',
            passwordHash: 'hash',
        },
    });
    await prisma.user.upsert({
        where: { username: 'userB' },
        update: {},
        create: {
            id: 'userB',
            email: 'userB@example.com',
            username: 'userB',
            passwordHash: 'hash',
        },
    });
    console.log('Users seeded.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=create_users.js.map