'use client';

import { redirect } from 'next/navigation';

export default function Index() {
    redirect('/home');
    return null;
}
