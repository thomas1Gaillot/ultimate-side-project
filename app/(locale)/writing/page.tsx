import {TypographyLead, TypographySmall} from "@/components/ui/typography";
import Link from "next/link";

export default function WritingPage() {
    return (<>
            <div className={'hidden lg:ml-80 2xl:ml-96 lg:flex flex-col justify-center items-center min-h-[80vh] gap-2'}>
                <TypographyLead>
                    This is where you can read and write your articles.
                </TypographyLead>
                <TypographySmall>
                    <>
                        {'Checkout the '}
                        <Link className={'hover:underline text-primary'}
                              href={'/article-editor'}>{'article editor'}</Link>
                        {' to start writing.'}
                    </>
                </TypographySmall>
            </div>
        </>
    )
}