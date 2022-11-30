import React, { useState } from "react";
import NavItem from "./NavItem";

const tabs = [
    { name: "Home", href: "/" },
    {
        section: "Inter-node antipatterns",
        tabs: [
            {
                name: "Cyclical Dependencies",
                href: "/inter/cyclic-dependencies",
            },
            { name: "Knot", href: "/inter/knot" },
            { name: "Bottleneck", href: "/inter/bottleneck" },
            { name: "Nanoservice", href: "/inter/nanoservice" },
            {
                name: "Duplicated Service",
                href: "/inter/duplicated-service",
            },
            {
                name: "Shared Persistency",
                href: "/inter/shared-persistency",
            },
        ],
    },
    // {
    //     section: "Intra-node antipatterns",
    //     tabs: [
    //         { name: "Chatty Service", href: "/intra/chatty" },
    //         { name: "Mega Service", href: "/intra/megaservice" },
    //         {
    //             name: "Low Cohesive Operations",
    //             href: "/intra/low-cohesion",
    //         },
    //     ],
    // },
    // {
    //     section: "Other antipatterns",
    //     tabs: [
    //         { name: "Sand Pile", href: "/inter/sandpile" },
    //         { name: "Service Chain", href: "/inter/service-chain" },
    //         {
    //             name: "Scattered Parasitic Functionality",
    //             href: "/inter/scattered-parasitic",
    //         },
    //         {
    //             name: "Stovepipe Service",
    //             href: "/inter/stovepipe-service",
    //         },
    //         {
    //             name: "Wrong Cuts",
    //             href: "/inter/wrong-cuts",
    //         },
    //     ],
    // },
];

/**
 * A navbar to be displayed on the left side of the screen, pops out
 * when clicking on the bars with a small animation.
 * @param {Object} props The props passed to this object
 * @returns {React.Component} The navbar populated with tabs
 */
const Navbar = ({ ...props }) => {
    const [navOpen, setNavOpen] = useState();

    return (
        <div
            className={`fixed top-0 left-0 w-fit h-screen overflow-x-clip text-gray-50 z-50 ease-in-out duration-200 ${
                navOpen ? `` : `sm:-translate-x-[13rem]`
            } ${props.className}`}
        >
            <nav
                className={`relative isolate sm:w-64 h-full bg-slate-900 ease-in-out duration-200 shadow-lg ${
                    navOpen ? `bg-opacity-100` : `bg-opacity-10`
                }`}
            >
                <div className="absolute top-4 right-4 overflow-x-clip z-50">
                    <button
                        className={`transform duration-200 ease-in-out ${
                            navOpen ? `rotate-90` : ``
                        }`}
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        <i className="fa-solid fa-bars fa-xl"></i>
                    </button>
                </div>
                <ul className={`flex flex-col p-8 ${navOpen ? `` : `hidden`}`}>
                    {tabs.map((tab, index) =>
                        tab.section ? (
                            <div
                                key={tab.section}
                                className="my-3 text-gray-300 text-sm"
                            >
                                <h2 className="uppercase">{tab.section}</h2>
                                {tab.tabs.map((tab, index) => (
                                    <NavItem key={index} href={tab.href}>
                                        {tab.name}
                                    </NavItem>
                                ))}
                            </div>
                        ) : (
                            <NavItem key={index} href={tab.href}>
                                {tab.name}
                            </NavItem>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
