import React, { useState } from "react";
import Link from "next/link";

/**
 * A single element to be listed on the navbar. Must include an href in this component.
 * @param {Object} props The props passed to this object
 * @returns {React.Component} A single navbar tab
 */
const NavItem = ({ ...props }) => {
    return (
        <li className={`my-1 font-semibold text-sm w-full`}>
            <Link href={props.href ? props.href : "/"}>
                <a className="flex flex-col items-left w-full">
                    <span className="text-white hover:blue-green-gradient-text text-left font-hubballi w-fit">
                        {props.children}
                    </span>
                </a>
            </Link>
        </li>
    );
};

export default NavItem;
