import React from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { themeAtom } from "../utils/atoms";

const gradientBackground = {
    backgroundColor: `rgb(2,0,36)`,
    backgroundImage: `radial-gradient(at 69% 76%, rgb(2,0,36) 0, transparent 57%), 
                      radial-gradient(at 35% 78%, rgb(32,32,37) 0, transparent 82%), 
                      radial-gradient(at 2% 94%, rgb(9,9,121) 0, transparent 69%), 
                      radial-gradient(at 92% 46%, rgba(0,212,255, .5) 0, transparent 88%), 
                      radial-gradient(at 13% 86%, rgb(245, 245, 244) 0, transparent 78%), 
                      radial-gradient(at 85% 4%, rgb(0,0,0) 0, transparent 100%), 
                      radial-gradient(at 10% 30%, rgb(0,212,255) 0, transparent 39%)`,
    backgroundSize: "cover",
};

/**
 * This is a layout for all pages, included in _app.js. Nextjs will auto-route
 * pages from appjs and this layout will wrap them so that they include anything in this
 * file (navbar, footer, bg, etc.).
 * @param {Object} props The props passed to this object
 * @param {React.Component[]} props.children The active page
 * @returns {React.Component} The page surrounded by the layout
 */
const Layout = ({ children, ...props }) => {
    const { asPath } = useRouter();
    const theme = useAtomValue(themeAtom);
    return (
        <div
            className={`h-fit text-gray-50 overflow-x-clip bg-white`}
            style={theme.background}
        >
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
