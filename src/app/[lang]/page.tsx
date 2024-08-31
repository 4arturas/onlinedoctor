
import {getDictionary, Locale} from './dictionaries'
import {Navigation} from "../components/Navigation";
import SwitchLang from "@/app/components/SwitchLang/SwitchLang";

type Props = {
    params: {
        lang: Locale
    }
}

export default async function Page({ params: { lang } }: Props) {
    const dict = await getDictionary(lang) // en
    return (
        <div>
            <SwitchLang/>
            <Navigation dict={dict}/>
            <button>{dict.products.cart}</button>
        </div>

    )
}