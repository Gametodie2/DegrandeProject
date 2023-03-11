import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar';
import Socials from '../Socials'

import './index.scss'

export default function Layout(){
    return (
        <>
            <div className="container-layout">
                <div className="lines">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav className="nav-bar">
                    <Navbar/>
                </nav>
                <div className="content">
                    <Outlet/>
                </div>
                <footer className="socials-bar">
                    <Socials/>
                </footer>
            </div>
        </>
    )
}