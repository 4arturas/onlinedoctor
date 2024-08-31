"use client"

import {Locale} from "@/app/[lang]/dictionaries";

interface Props {
    dict: Locale
}


export const Navigation: React.FC<Props> = ({ dict, }) => {

    return <div>${JSON.stringify(dict)}</div>
}