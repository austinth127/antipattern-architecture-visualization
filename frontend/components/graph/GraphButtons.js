import { saveAs } from "file-saver";
import React, { useState } from "react";
import { initCoordsAtom, initRotationAtom } from "../../utils/atoms";
import { reset, resetView } from "../../utils/visualizer/nodeFunctions";
import { useAtom } from "jotai";

/**
 * A styled graph button with a function to interface with the graph.
 * @param {Object} props the props passed to this object
 * @param {Function} props.onClick on click function
 * @param {String} props.children text to display
 * @returns {React.Component} A single, functional button for the graph
 */
const GraphButton = ({ onClick, ...props }) => {
    return (
        <button
            className={`border-2 rounded-lg px-2 py-1 text-center text-sm mx-2 transition
            hover:bg-cyan-400 bg-slate-900 bg-opacity-40 hover:bg-opacity-40 border-opacity-40 ${props.className}`}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
};

/**
 * Buttons to interact with the force graph.
 *
 * @param {Object} props The props passed to this object
 * @param {React.MutableRefObject<import("react-force-graph-3d").ForceGraphMethods>} props.graphRef Reference to the internal force graph to access methods/camera
 * @returns {React.Component} The buttons
 */
const GraphButtonMenu = ({ graphRef }) => {
    const [numScreenshots, setNumScreenshots] = useState(0);
    const [initCoords] = useAtom(initCoordsAtom);
    const [initRotation] = useAtom(initRotationAtom);

    /** @TODO idk what the track is or how to toggle it */
    function toggleTrack() {
        if (trackMenu.checked) {
            trackMenu.checked = false;
        } else {
            trackMenu.checked = true;
        }
    }

    function exportGraph(graphData) {
        exportToJsonFile(graphData);
    }

    /** @TODO not yet implemented */
    function exportToJsonFile(jsonData) {
        let dataStr = JSON.stringify(
            Object.assign({}, jsonData, Graph.cameraPosition()),
            replacer
        );

        //let dataStr2 = JSON.stringify(Graph.cameraPosition());
        let dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);

        let exportFileDefaultName = "data-out.json";

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    }

    /** @TODO not yet implemented */
    function importGraph() {
        let input = document.createElement("input");
        input.type = "file";

        input.onchange = (e) => {
            let file = e.target.files[0];

            // setting up the reader
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            // here we tell the reader what to do when it's done reading...
            reader.onload = (readerEvent) => {
                let content = readerEvent.target.result; // this is the content!
                let parsedData = JSON.parse(content);
                Graph.graphData(parsedData);
                delay(150).then(() => {
                    let { nodes, links } = Graph.graphData();
                    allLinks = links;
                    visibleNodes = nodes;
                    reset();

                    Graph.cameraPosition(
                        { x: parsedData.x, y: parsedData.y, z: parsedData.z }, // new position
                        { x: 0, y: 0, z: 0 }, //parsedData.lookAt, // lookAt ({ x, y, z })
                        0 // ms transition duration
                    );
                });
            };
        };

        input.click();
    }

    /**
     * @TODO this doesn't seem to actually put the graph upright
     */
    function forceReset() {
        graphRef.current.refresh();
        graphRef.current.cameraPosition(
            initCoords, // new position
            { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
            2000 // ms transition duration
        );

        // This doesn't work either
        //graphRef.current.camera().applyQuaternion(initRotation);
        //graphRef.current.refresh();
    }

    function screenshotGraph() {
        const now = new Date();
        window.requestAnimationFrame(() => {
            window.cancelAnimationFrame(0);
            graphRef.current.renderer().domElement.toBlob(function (blob) {
                saveAs(
                    blob,
                    `3d_Visualizer_${now.toLocaleDateString()}-${numScreenshots}}`
                );
            });
            setNumScreenshots(++numScreenshots);
        });
    }

    return (
        <div className="flex flex-col gap-2 w-full h-fit">
            <GraphButton onClick={importGraph}>Import</GraphButton>
            <GraphButton onClick={exportGraph}>Export</GraphButton>
            <GraphButton onClick={screenshotGraph}>Capture Graph</GraphButton>
            <GraphButton onClick={toggleTrack}>Track Menu</GraphButton>
            <GraphButton onClick={forceReset}>Reset</GraphButton>
        </div>
    );
};

export default GraphButtonMenu;
