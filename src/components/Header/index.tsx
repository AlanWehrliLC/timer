import { HeaderContainer } from "./styles";
import {NavLink} from "react-router-dom"

import logoTimer from "../../assets/timer-logo.svg"
import { Timer, Scroll } from "phosphor-react";


export function Header(){
    return (
        <HeaderContainer>
            <img src={logoTimer} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}