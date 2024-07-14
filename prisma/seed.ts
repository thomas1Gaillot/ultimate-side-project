const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const roadMapList = [
    {
        title: "Spotify Playlist",
        description: "Share my Spotify playlist and load music to the website.",
        upvotes: 0,
        badge: "Widget",
        selected: false
    },
    {
        title: "Bookmarks Page",
        description: "A section to bookmark my favorite articles and websites that I use everyday.",
        upvotes: 0,
        badge: "Page",
        selected: false
    },
    {
        title: "An UX Game",
        description: "A game to learn user experience of the website.",
        upvotes: 0,
        badge: "Projects",
        selected: false
    },
    {
        title: "Reproduce Spotify",
        description: "Best way to learn is by reproducing a website. I will reproduce a website from scratch.",
        upvotes: 0,
        badge: "Projects",
        selected: false
    },
    {
        title: "A Prisma Backend",
        description: "A Backend to store upvotes from the roadmap, and trying Prisma.",
        upvotes: 119,
        badge: "Feature",
        selected: true
    },
    {
        title: "A Stripe Integration",
        description: "A way to monetize the website with a subscription.",
        upvotes: 14,
        badge: "Feature",
        selected: true
    },
];

async function main() {
    for (const roadmap of roadMapList) {
        await prisma.roadmap.create({
            data: roadmap,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
