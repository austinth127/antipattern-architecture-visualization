import React, { useState } from "react";

const StepDescription = ({ step, ...props }) => {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={`isolate text-sm z-40 bg-white bg-opacity-10 w-full h-fit rounded-lg p-4 duration-200 ease-in-out text-left ${props.className}`}
        >
            <div className="text-xl font-bold">{step.title ?? ""}</div>
            <div className="text-base font-light">{step.text ?? ""}</div>
        </div>
    );
};

export default StepDescription;
