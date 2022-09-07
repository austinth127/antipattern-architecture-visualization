import { Color } from "three";

// Sets shape based on type of node
export function getShape(type) {
    if (type === "service") {
        return 0;
    } else if (
        type === "kafka" ||
        type === "proxy" ||
        type === "writer" ||
        type === "pipeline"
    ) {
        return 1;
    } else if (type === "customer" || "srcSink") {
        return 2;
    } else if (type === "archive" || type === "database" || type === "bucket") {
        return 3;
    } else if (type === "API") {
        return 4;
    } else if (type === "config") {
        return 5;
    } else {
        return 0;
    }
}

// Sets color of node
export function getColor(
    node,
    graphData,
    threshold,
    highlightNodes,
    hoverNode
) {
    let { nodes, links } = graphData;
    let numNeighbors = getNeighbors(node, links).nodes.length;

    if (highlightNodes && highlightNodes.has(node)) {
        if (node === hoverNode) {
            return "rgb(50,50,200)";
        } else {
            return "rgb(0,200,200)";
        }
    }

    if (numNeighbors > threshold) {
        return "rgb(255,0,0)";
    }
    if (numNeighbors > threshold / 2) {
        return "rgb(255,160,0)";
    }

    return "rgb(0,255,0)";
}

// find neighbors of node
/**
 *
 * @param {*} node
 * @param {Array} links
 * @returns
 */
export function getNeighbors(node, links) {
    const nodeLinks = links.filter((link) => {
        return (
            link.source.nodeID === node.nodeID ||
            link.target.nodeID === node.nodeID
        );
    });
    const sources = nodeLinks.map((link) => link.source);
    const targets = nodeLinks.map((link) => link.target);
    const nodes = sources.concat(targets);
    return { nodeLinks, nodes };
}

// Refresh visible nodes
export function reset(graphRef) {
    graphRef.current.refresh();
}

// Set camera back to default view
export function resetView(graphRef, initCoords) {
    graphRef.current.cameraPosition(
        initCoords, // new position
        { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
        2000 // ms transition duration
    );
    reset(graphRef);
}