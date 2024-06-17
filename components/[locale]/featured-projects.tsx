import Link from "next/link";

export  default function FeaturedProjects() {
    return <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                        Featured Projects
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Our Innovative
                        Solutions</h2>
                    <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        {"From cutting-edge web applications to groundbreaking mobile experiences, our projects are\n" +
                            "                        designed to\n" +
                            "                        push the boundaries of what's possible."}
                    </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div
                    className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700">
                    <div className="flex-1">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-gray-50">Featured
                        </div>
                        <h3 className="mt-4 text-xl font-bold">Zod-Powered Form</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            A cutting-edge web application that revolutionizes form validation with the power of Zod.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-primary dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            prefetch={false}
                        >
                            Explore
                        </Link>
                    </div>
                </div>
                <div
                    className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700">
                    <div className="flex-1">
                        <div
                            className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Upcoming
                        </div>
                        <h3 className="mt-4 text-xl font-bold">Project A</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            A cutting-edge web application that revolutionizes the way you interact with data.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            prefetch={false}
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
                <div
                    className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700">
                    <div className="flex-1">
                        <div
                            className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Upcoming
                        </div>
                        <h3 className="mt-4 text-xl font-bold">Project B</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            A groundbreaking mobile application that redefines the way you access information.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            prefetch={false}
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
                <div
                    className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700">
                    <div className="flex-1">
                        <div
                            className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Upcoming
                        </div>
                        <h3 className="mt-4 text-xl font-bold">Project C</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            An innovative web application that streamlines your workflow and boosts productivity.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            prefetch={false}
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    </section>
}