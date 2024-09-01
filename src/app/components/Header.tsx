"use client";

import NavLink from "@/app/components/NavLink";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";

const Header: React.FC = () => {
    return <div>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/about"}>About</NavLink>
            <LocaleSwitcher/>
        </div>
};

export default Header;