import {usePathname, useRouter} from "../navigation";
import {ChangeEvent, useTransition} from "react";
import {useParams} from "next/navigation";

type Props = {
    children: React.ReactNode;
    defaultValue: string;
    label: string;
}

export default function LocaleSwitcherSelect({ children, defaultValue, label} : Props)
{
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(
                // @ts-ignore
            {pathname: pathname, params: params},
            {locale:nextLocale}
            )
        })
    }

    return (
        <label>
            <p>{label}</p>
            <select
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {children}
            </select>
        </label>
    );
}