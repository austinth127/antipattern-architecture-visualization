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
    } else if (type === "customer" || type === "srcSink") {
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

// Find neighbors of a given node
export function getNeighbors(node, links) {
    return {
        nodeLinks: links.filter((link) => {
            return link.source.id === node.id || link.target.id === node.id;
        }),
        nodes: links.reduce(
            (neighbors, link) => {
                if (link.target.id === node.id) {
                    neighbors.push(link.source);
                } else if (link.source.id === node.id) {
                    neighbors.push(link.target);
                }
                return neighbors;
            },
            [node]
        ),
    };
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

const levenshteinDistance = (str1 = "", str2 = "") => {
    const track = Array(str2.length + 1)
        .fill(null)
        .map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator // substitution
            );
        }
    }
    return track[str2.length][str1.length];
};

export function getDuplicates(node, graph) {
    let count = 0;
    for (const vertex in graph) {
        if (levenshteinDistance(graph[vertex].id, node.id) < 3) {
            count++;
        }
    }
    return count;
}

export function getNeighborsLinks(node, links) {
    let count = 0;
    let { nodes } = getNeighbors(node, links);
    let knotLinks = [];
    nodes.forEach((curNode) => {
        if (curNode.id != node.id) {
            const { nodeLinks } = getNeighbors(curNode, links);
            nodeLinks.forEach((link) => {
                if (
                    !knotLinks.find(
                        (val) =>
                            val == [link.source.id, link.target.id] ||
                            val == [link.target.id, link.source.id]
                    )
                ) {
                    knotLinks.push([link.source.id, link.target.id]);
                }
            });
        }
    });

    return knotLinks.length;
}

export function getDegreeIn(node, links) {
    return {
        nodeLinks: links.filter((link) => {
            return link.target.id === node.id;
        }),
        nodes: links.reduce(
            (neighbors, link) => {
                if (link.target.id === node.id) {
                    neighbors.push(link.source);
                }
                return neighbors;
            },
            [node]
        ),
    };
}

export function getDegreeOut(node, links) {
    return {
        nodeLinks: links.filter((link) => {
            return link.source.id === node.id;
        }),
        nodes: links.reduce(
            (neighbors, link) => {
                if (link.source.id === node.id) {
                    neighbors.push(link.target);
                }
                return neighbors;
            },
            [node]
        ),
    };
}
