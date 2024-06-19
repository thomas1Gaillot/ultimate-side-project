"use client";
import {cn} from "@/lib/utils";
import React from "react";
import {IconClipboardCopy, IconSignature,} from "@tabler/icons-react";
import {motion} from "framer-motion";
import {BentoGrid, BentoGridItem} from "@/components/acernityui/bento-grid";
import {useRouter} from "next/navigation";

export function BentoGridThirdDemo() {
    const router = useRouter()
    const items = [
        {
            title: "The future of Forms",
            description: (
                <span className="text-sm">
        Explore the future of Forms with Zod. Allowing to easily create complex forms.
      </span>
            ),
            header: <SkeletonOne/>,
            className: "md:col-span-1",
            icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500"/>,
            onClick: () => router.push("/form-made-with-zod")
        },
        {
            title: "Incoming Project",
            description: (
                <span className="text-sm">
        Incoming project that will revolutionize the way you interact with data.
      </span>
            ),
            header: <SkeletonTwo/>,
            className: "md:col-span-1",
            icon: <IconSignature className="h-4 w-4 text-neutral-500"/>,
            onClick: () => {
            }
        },
        {
            title: "Incoming Project",
            description: (
                <span className="text-sm">
        Incoming project that will revolutionize the way you interact with data.
      </span>
            ),
            header: <SkeletonTwo/>,
            className: "md:col-span-1",
            icon: <IconSignature className="h-4 w-4 text-neutral-500"/>,
            onClick: () => {
            }
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] px-8 md:px-0">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                    onClick={item.onClick}
                />
            ))}
        </BentoGrid>
    );
}

const Skeleton = () => (
    <div
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-200 flex-shrink-0"/>

                <p className={"text-xs text-gray-500 "}>Taking power of Zod JS.</p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className={"text-xs text-gray-500 "}>Creating forms has never been easier.</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-200 to-emerald-700 flex-shrink-0"/>
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-200 flex-shrink-0"/>
                <p className={"text-xs text-gray-500 "}>Easy made equals easy scale.</p>
            </motion.div>
        </motion.div>
    );
};
const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            {arr.map((_, i) => (
                <motion.div
                    key={"skelenton-two" + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + "%",
                    }}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
                ></motion.div>
            ))}
        </motion.div>
    );
};
const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
            style={{
                background:
                    "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                backgroundSize: "400% 400%",
            }}
        >
            <motion.div className="h-full w-full rounded-lg"></motion.div>
        </motion.div>
    );
};


