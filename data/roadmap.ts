type roadmap = {
    title: string
    description: string
    upvotes: number
    badge: string
}


const roadmap: roadmap[] = [
    {
        title: "Spotify Playlist",
        description: "Share my Spotify playlist and load music to the website.",
        upvotes: 0,
        badge: "Widget"
    },
    {
        title: "Bookmarks Page",
        description: "A section to bookmark my favorite articles and websites that I use everyday.",
        upvotes: 0,
        badge: "Page"
    },
    {
        title: "A Prisma Backend",
        description: "A Backend to store upvotes from the roadmap, and trying Prisma.",
        upvotes: 119,
        badge: "Feature"
    },
    {
        title: "An UX Game",
        description: "A game to learn user experience of the website.",
        upvotes: 0,
        badge: "Projects"
    },
    {
        title: "Reproduce Spotify",
        description: "Best way to learn is by reproducing a website. I will reproduce a website from scratch.",
        upvotes: 0,
        badge: "Projects"
    },
]

const roadmapSortedByUpvotes = roadmap.sort((a, b) => b.upvotes - a.upvotes)

export {roadmapSortedByUpvotes}