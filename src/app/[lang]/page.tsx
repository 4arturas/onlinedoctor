
import { getDictionary } from './dictionaries'
import {Navigation} from "../components/Navigation";
import SwitchLang from "@/app/components/SwitchLang/SwitchLang";

export default async function Page({ params: { lang } }) {
    const dict = await getDictionary(lang) // en
    return (
        <div>
            <SwitchLang/>
            <Navigation dict={dict}/>
            <button>{dict.products.cart}</button>
        </div>

    )
}