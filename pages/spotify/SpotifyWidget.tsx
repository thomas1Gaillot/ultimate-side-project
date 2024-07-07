import React, { useEffect, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import {Skeleton} from "@/components/ui/skeleton";

declare namespace Spotify {
    interface Window extends Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: typeof Spotify;
    }

    interface Player {
        new (options: PlayerOptions): Player;
        connect(): Promise<boolean>;
        disconnect(): void;
        getCurrentState(): Promise<PlaybackState | null>;
        nextTrack(): void;
        pause(): void;
        previousTrack(): void;
        resume(): void;
        seek(position_ms: number): void;
        togglePlay(): void;
        addListener(event: PlayerEvent, callback: PlayerEventCallback): boolean;
        removeListener(event: PlayerEvent, callback?: PlayerEventCallback): boolean;
    }

    interface PlayerOptions {
        name: string;
        getOAuthToken: (callback: (token: string) => void) => void;
        volume?: number;
    }

    type PlayerEvent =
        | 'ready'
        | 'not_ready'
        | 'player_state_changed'
        | 'initialization_error'
        | 'authentication_error'
        | 'account_error'
        | 'playback_error';

    type PlayerEventCallback =
        | ((error: Error) => void)
        | ((state: PlaybackState) => void)
        | ((event: { device_id: string }) => void);

    interface PlaybackState {
        context: {
            metadata: Record<string, any>;
            uri: string;
        };
        disallows: {
            pausing: boolean;
            skipping_prev: boolean;
            skipping_next: boolean;
        };
        duration: number;
        paused: boolean;
        position: number;
        repeat_mode: number;
        shuffle: boolean;
        track_window: {
            current_track: Track;
            next_tracks: Track[];
            previous_tracks: Track[];
        };
    }

    interface Track {
        album: Album;
        artists: Artist[];
        duration_ms: number;
        id: string;
        is_playable: boolean;
        linked_from: Record<string, any>;
        linked_from_uri: string;
        media_type: string;
        name: string;
        type: string;
        uri: string;
    }

    interface Album {
        album_type: string;
        artists: Artist[];
        available_markets: string[];
        external_urls: Record<string, string>;
        href: string;
        id: string;
        images: Image[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    }

    interface Artist {
        external_urls: Record<string, string>;
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }

    interface Image {
        height: number;
        url: string;
        width: number;
    }
}
const SpotifyWidget: React.FC = () => {
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [spotifyTrack, setSpotifyTrack] = useState<Spotify.Track | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
                    getOAuthToken: cb => {
                        cb(token);
                    },
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    setDeviceId(device_id);
                    setIsLoading(false);
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', state => {
                    if (!state) {
                        return;
                    }

                    setSpotifyTrack(state.track_window.current_track);
                    setIsPlaying(!state.paused);

                    player.getCurrentState().then(state => {
                        if (!state) {
                            setIsPlaying(false);
                        } else {
                            setIsPlaying(!state.paused);
                            setProgress((state.position / state.duration) * 100);
                        }
                    });
                });

                player.connect();
            };
        }
    }, []);

    const handlePlay = () => {
        setIsLoading(true);
        if (deviceId) {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    uris: ['spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'], // Remplacez par l'URI de la piste Spotify de votre choix
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }).then(() => setIsLoading(false));
        }
    };

    const playPauseTrack = () => {
        if (isPlaying) {
            if (player) {
                player.pause();
            }
        } else {
            handlePlay();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative max-w-lg flex flex-col gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
            {/* Head section */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-full items-center gap-1">
                    <p className="uppercase text-[11px] font-light leading-none tracking-wide">Lecture à partir de </p>
                    <h4 className="text-xs leading-none font-semibold tracking-tight">Ma playlist Chill</h4>
                </div>
            </div>
                <>
                    {!isLoading && spotifyTrack ? (
                            <div className="flex flex-col">
                                <h2 className="font-semibold">{spotifyTrack.name}</h2>
                                <p className="text-opacity-60 text-sm">{spotifyTrack.artists[0].name}</p>
                                <img src={spotifyTrack.album.images[0].url} alt="album cover" style={{width: 50}}/>
                            </div>
                        ) :
                        <div className="flex flex-col gap-2">
                            <Skeleton className=" h-4 w-[250px] bg-white/10"/>
                            <Skeleton className=" h-4 w-[250px] bg-white/10"/>
                            <Skeleton className=" h-[50px] w-[50px] bg-white/10"/>
                        </div>
                    }
                    <Progress className="w-full" value={progress}/>

                    {/* Main section */}
                    <div className="flex justify-center space-x-4 w-full">
                        <Button onClick={() => player?.previousTrack()} variant="ghost">
                            <SkipBack className="w-6 h-6"/>
                        </Button>
                        <Button onClick={playPauseTrack} variant="ghost">
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                        <Button onClick={() => player?.nextTrack()} variant="ghost">
                            <SkipForward className="w-6 h-6" />
                        </Button>
                    </div>
                </>

        </div>
    );
};

export default SpotifyWidget;
