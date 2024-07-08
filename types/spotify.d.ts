declare namespace Spotify {
    interface Player {
        addListener(event: string, callback: (args: any) => void): boolean;
        connect(): Promise<void>;
        disconnect(): void;
        getCurrentState(): Promise<PlayerState | null>;
        nextTrack(): Promise<void>;
        pause(): Promise<void>;
        previousTrack(): Promise<void>;
        resume(): Promise<void>;
    }

    interface Track {
        id: string;
        uri: string;
        name: string;
        artists: { name: string }[];
        album: { images: { url: string }[] };
    }

    interface PlayerState {
        track_window: {
            current_track: Track;
        };
        paused: boolean;
        position: number;
        duration: number;
    }

    interface WebPlaybackInstance {
        device_id: string;
    }
}
