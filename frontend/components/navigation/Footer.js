import React from "react";
import Link from "next/link";
import Image from "next/image";

const logos = [
    {
        icon: <i className="fa-brands fa-xl fa-github"></i>,
        href: "https://github.com/austinth127/antipattern-architecture-visualization",
    },
    {
        icon: <i className="fa-brands fa-xl fa-google-drive"></i>,
        href: "https://drive.google.com/drive/folders/10_1lZV2Pct52GCChfIc7AfQHPxdow9Pw",
    },
    // { icon: <i className="fa-solid fa-xl fa-book"></i>, href: "" },
];

const Footer = ({ ...props }) => {
    return (
        <footer className="h-36 w-full pt-4 bg-transparent">
            <div className="flex flex-row p-4 justify-center bg-transparent gap-8">
                {logos.map((logo, index) => (
                    <Link href={logo.href} key={index}>
                        <a>{logo.icon}</a>
                    </Link>
                ))}
            </div>
            <div className="flex flex-row justify-center bg-transparent">
                <div className="relative w-48 h-9 m-4">
                    <Image src="/logos/BU_Horz_White.png" layout="fill" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
