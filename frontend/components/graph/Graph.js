import * as THREE from "three";
import * as NodeFns from "../../utils/visualizer/nodeFunctions";
import { CustomSinCurve } from "../../utils/visualizer/ThreeExtensions";
import React, { useEffect, useState, useCallback } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { useAtom, useAtomValue } from "jotai";
import {
    initCoordsAtom,
    initRotationAtom,
    graphDataAtom,
    couplingThresholdAtom,
    graphSearchAtom,
    themeAtom,
} from "../../utils/atoms";
import SpriteText from "three-spritetext";
import { useRouter } from "next/router";

/**
 * @TODO right click needs to be moved to be embedded with graph like left click
 * @TODO make arrows more visible
 * @param {Object} props The props passed to this object
 * @param {React.MutableRefObject<ForceGraphMethods>} props.graphRef Reference to the internal force graph to access methods/camera
 * @param {{width: int, height: int}} props.graphDimensions The dimensions of the graph
 * @returns {JSX.Element} The graph
 */
const GraphComponent = ({
    graphRef,
    graphColorFn,
    isIntraNode,
    graphDimensions,
}) => {
    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());

    const [hoverNode, setHoverNode] = useState();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [threshold, setThreshold] = useAtom(couplingThresholdAtom);

    const [graphData, setGraphData] = useAtom(graphDataAtom);

    const [initCoords, setInitCoords] = useAtom(initCoordsAtom);
    const [initRotation, setInitRotation] = useAtom(initRotationAtom);
    const [search] = useAtom(graphSearchAtom);
    const [hasLoaded, setHasLoaded] = useState(false);
    const theme = useAtomValue(themeAtom);

    const router = useRouter();

    useEffect(() => {
        if (graphDimensions) {
            setDimensions({
                width: graphDimensions.width,
                height: graphDimensions.height,
            });
        } else {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        let { x, y, z } = graphRef.current.cameraPosition();

        setInitCoords({ x, y, z });
        setInitRotation(graphRef.current.camera().quaternion);
        updateHighlight();
    }, [window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if (hasLoaded) {
            updateHighlight();
        }
    }, [graphData, threshold, hasLoaded]);

    useEffect(() => {
        if (isIntraNode == true) {
            var grid = new THREE.GridHelper(500, 20);
            grid.position.set(0, -250, 0);
            graphRef.current.scene().add(grid);

            var vertGrid = new THREE.GridHelper(500, 20);
            vertGrid.rotateOnAxis(
                new THREE.Vector3(0, 0, 1),
                (Math.PI * 1) / 2
            );
            vertGrid.position.set(-250, 0, 0);
            graphRef.current.scene().add(vertGrid);

            var vertGrid2 = new THREE.GridHelper(500, 20);
            vertGrid2.rotateOnAxis(
                new THREE.Vector3(1, 0, 0),
                (Math.PI * 1) / 2
            );
            vertGrid2.position.set(0, 0, -250);
            graphRef.current.scene().add(vertGrid2);
        }
    }, []);

    // Glow on search
    useEffect(() => {
        if (typeof graphData.links[0].source == "string") return;
    }, [search]);

    useEffect(() => {}, [graphData]);

    // Highlight neighbors
    const getHighlightNeighbors = (node) => {
        let { links } = graphData;
        const { nodeLinks, nodes } = NodeFns.getNeighbors(node, links);
        nodeLinks.forEach((link) => highlightLinks.add(link));
        nodes.forEach((node) => highlightNodes.add(node));
    };

    // Refresh the graph and update states
    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);

        graphRef.current.refresh();
    };

    // Handle behavior on hovering over a node
    const handleNodeHover = (node, prevNode) => {
        // No state change
        if ((!node && !highlightNodes.size) || (node && hoverNode === node))
            return;

        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
            highlightNodes.add(node);
            getHighlightNeighbors(node);
        }

        setHoverNode(node || null);
        updateHighlight();
    };

    // Handle behavior on hovering over a link
    const handleLinkHover = (link) => {
        if (highlightLinks.has(link)) return;
        highlightNodes.clear();
        highlightLinks.clear();

        if (link != null) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }
        updateHighlight();
    };

    // Set node opacity based on search
    const getNodeOpacity = (node) => {
        if (search === "") {
            return 0.75;
        }
        if (node.id.toLowerCase().includes(search.toLowerCase())) {
            return 0.8;
        } else {
            return 0.1;
        }
    };

    // Event when node is clicked on
    const handleNodeClick = useCallback(
        (node) => {
            if (node != null) {
                const distance = 300;
                const distRatio =
                    1 + distance / Math.hypot(node.x, node.y, node.z);
                if (graphRef.current) {
                    graphRef.current.cameraPosition(
                        {
                            x: node.x * distRatio,
                            y: node.y * distRatio,
                            z: node.z * distRatio,
                        },
                        node,
                        1500
                    );
                }

                const event = new CustomEvent("nodeClick", {
                    detail: { node: node },
                });
                document.dispatchEvent(event);
            }
        },
        [graphRef]
    );

    const getGraphColor = (node) => {
        if (highlightNodes && highlightNodes.has(node)) {
            if (node === hoverNode) {
                return `rgb(252, 186, 3)`;
            } else {
                return `rgb(0,200,200)`;
            }
        }
        return graphColorFn(node, threshold);
    };

    const textNode = (node) => {
        const sprite = new SpriteText(node.id);
        sprite.color = getGraphColor(node);
        sprite.textHeight = 3;
        sprite.fontWeight = "bold";
        sprite.backgroundColor = theme.spriteBGColor;
        // "rgba(10,10,10, 0.6)"
        sprite.padding = 2;
        return sprite;
    };

    const customNode = (node) => {
        return new THREE.Mesh(
            [
                new THREE.SphereGeometry(5),
                new THREE.BoxGeometry(10, 10, 10),
                new THREE.ConeGeometry(5, 10),
                new THREE.CylinderGeometry(5, 5, 10),
                new THREE.TubeGeometry(new CustomSinCurve(10), 5, 2, 8, false),
                new THREE.OctahedronGeometry(5),
            ][NodeFns.getShape(node.nodeType)],
            new THREE.MeshLambertMaterial({
                // Setup colors
                color: graphColorFn(node, threshold, getNodeOpacity),
                transparent: true,
                opacity: getNodeOpacity(node),
            })
        );
    };

    const labeledNode = (node) => {
        const group = new THREE.Group();
        const shape = customNode(node);
        const text = textNode(node);
        shape.position.set(0, 0, 0);
        text.position.set(0, 10, 0);
        group.add(text);
        group.add(shape);

        if (
            node.id.toLowerCase().includes(search.toLowerCase()) &&
            search != ""
        ) {
            var outlineMaterial1 = new THREE.MeshStandardMaterial({
                color: "rgba(255,255,255,0.3)",
                side: THREE.BackSide,
                emissive: 0xffffff,
            });
            var outlineMesh1 = new THREE.Mesh(shape.geometry, outlineMaterial1);
            outlineMesh1.position.set(0, 0, 0);
            outlineMesh1.scale.multiplyScalar(1.25);
            group.add(outlineMesh1);
        }

        return group;
    };

    if (!graphData) {
        return <></>;
    }

    const Graph = (
        <ForceGraph3D
            //  Setup shapes
            nodeThreeObject={labeledNode}
            nodeThreeObjectExtend={false}
            // Get data
            graphData={graphData}
            // JSON column for node names
            nodeLabel="id"
            // Setup link width
            linkWidth={(link) => (highlightLinks.has(link) ? 3 : 1)}
            // Setup data transfer visualization across links
            linkDirectionalParticles={(link) =>
                highlightLinks.has(link) ? 4 : 0
            }
            // Width of data transfer points
            linkDirectionalParticleWidth={3}
            linkDirectionalArrowLength={8}
            linkDirectionalArrowRelPos={1}
            // Select node on left click
            onNodeClick={handleNodeClick}
            //  node right click menu
            // Setup hovering on nodes
            // This is causing some error
            onNodeHover={handleNodeHover}
            // Setup hovering on links
            onLinkHover={handleLinkHover}
            // Setup clicking on links
            width={dimensions.width}
            height={dimensions.height}
            ref={graphRef}
            backgroundColor={"rgba(255,255,255, 0)"}
            enableNodeDrag={false}
            warmupTicks={100}
            onEngineTick={() => setHasLoaded(true)}
            d3VelocityDecay={0.25}
            linkColor={() => theme.arrowColor}
        ></ForceGraph3D>
    );

    return Graph;
};

export default GraphComponent;
