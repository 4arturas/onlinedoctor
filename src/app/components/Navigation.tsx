"use client"

import {Locale} from "@/app/[lang]/dictionaries";

interface Props {
    dict: any
}


export const Navigation: React.FC<Props> = ({ dict, }) => {

    return <div>${JSON.stringify(dict)}</div>
}