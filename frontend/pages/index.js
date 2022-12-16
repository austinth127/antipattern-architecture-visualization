import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import IndexVisLayout from "../components/general/IndexGraphLayout";

/**
 * This page renders the 3d force graph.
 *
 * @TODO Implement buttons, search, etc.
 * @TODO Fix dragging by adding either the dragging script or exporting functionality
 * @returns {React.Component} The 3D viualizer page ("/visualizer/3d")
 */
const Home = () => {
    return (
        <div className="w-full h-full text-white text-lg pl-48 pr-32 text-center">
            <div className="px-64">
                <div className="pt-32 pb-16 font-bold text-4xl">
                    <h1>Welcome to our Antipattern Visualization Tool</h1>
                </div>
                <div className="font-light text-justify text-xl flex flex-col gap-8">
                    <h2 className="font-bold text-2xl blue-green-gradient-text  drop-shadow-md">
                        Microservice architecture is the mainstream direction
                        for cloud-native systems. <br />
                    </h2>
                    <p>
                        Microservice architecture is an approach to software
                        development in which software is composed of small,
                        independent services that communicate in a defined
                        manner. Each of these services are then owned and
                        managed by small, self-contained teams.
                    </p>
                    <p>
                        Implementing a microservice architecture can offer a
                        number of benifits over monolithic architecture{" "}
                        <em>
                            (when processes are run as a single service and
                            developed in a single repository)
                        </em>
                        . However, these benefits only extend to microservice
                        architectures that are properly developed to avoid bad
                        practices.
                    </p>
                    <p className="font-bold text-2xl blue-green-gradient-text  drop-shadow-md pt-24 pb-16 text-center">
                        The goal of this tool is to better equip you to be able
                        to recognize these bad practices and avoid them while
                        developing microservices.
                    </p>
                    <div className="font-normal">

                        <div className="pb-8 text-2xl  font-semibold">
                            Some vocabulary we will be using:
                        </div>
                        <div className="flex flex-col gap-6 text-left">
                            <ul className="flex flex-col gap-6">
                                {/* https://ieeexplore.ieee.org/document/8354414#:~:text=Abstract%3A%20Code%20smells%20and%20architectural,code%20understandability%20and%20decrease%20maintainability. */}
                                <li>
                                    Microservice Smell:
                                    <div className="font-light text-gray-200">
                                        Symptoms of possibly poor design that
                                        may hinder code understandability and
                                        decrease mantainability
                                    </div>
                                </li>
                                <li>
                                    Anti-pattern:
                                    <div className="font-light text-gray-200">
                                        A common coding response to a problem
                                        that can sometimes contribute a
                                        detriment to the overall system.
                                        Specifically, this tool focuses on{" "}
                                        <em>Service-based Antipatterns</em> in
                                        microservice architectures.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
