import {TypographyBlockquote, TypographyH1, TypographyLead} from "@/components/ui/typography";
import SpotifyWidget from "@/pages/spotify/SpotifyWidget";

export default function SpotifyPage() {

    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                My Spotify Playlist
            </TypographyH1>
            <TypographyLead>
                I listen to music while working, and I have a playlist for that.
            </TypographyLead>
            <TypographyBlockquote>
                {`"Music is the cherry on top of the cake."`}
            </TypographyBlockquote>
            <SpotifyWidget/>

        </div>
    );
}