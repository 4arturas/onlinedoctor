"use client"

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ComponentProps} from 'react';

export default function NavLink({href, ...rest}: ComponentProps<typeof Link>) {
    const pathname = usePathname();
    const isActive = pathname === href;
console.log( pathname );
console.log( isActive );
    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            href={href}
            {...rest}
        />
    );
}