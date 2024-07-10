import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash
                .substring(1)
                .split('&')
                .reduce((initial: Record<string, string>, item) => {
                    if (item) {
                        const parts = item.split('=');
                        initial[parts[0]] = decodeURIComponent(parts[1]);
                    }
                    return initial;
                }, {});

            window.location.hash = '';

            if (hash.access_token) {
                localStorage.setItem('access_token', hash.access_token);
                router.push('/');
            }
        }
    }, [router]);

    return <div>Redirection en cours...</div>;
};

export default Callback;
