import {BentoGridThirdDemo} from "@/components/[locale]/bento-grid-third-demo";
import HeroSection from "@/components/[locale]/hero-section";

export default function Home() {
    return (
        <>
            {/* Hero */}
            <div>
                <div className="container py-24 lg:py-32">
                    {/* Announcement Banner */}

                    {/* End Announcement Banner */}
                    <HeroSection/>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-center py-24 gap-8">
                    <div className="space-y-2 space-x-2">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            acernity-ui
                        </div>
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            shadcn-ui
                        </div>
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            magic-ui
                        </div>
                        <h2 className="text-4xl text-gray-800 font-semibold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
                            Copy. Paste.</h2>
                        <p className="max-w-[900px] text-gray-500  dark:text-gray-400">
                            {"Amazing copy-and-paste libraries that will make your life easier."}
                        </p>
                    </div>
                    <BentoGridThirdDemo/>
                </div>


            </div>
            {/* End Hero */}
        </>
    );
}