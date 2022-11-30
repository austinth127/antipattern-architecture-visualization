import React, { useState } from "react";
import sharedData from "../../utils/antipatterns/shared_persistency.json";
import InterNodeVisLayout from "../../components/antipatterns/InterNodeVisLayout";
import { getNeighbors, getShape } from "../../utils/visualizer/nodeFunctions";
import { useAtom } from "jotai";
import { graphDataAtom } from "../../utils/atoms";

function sharedDatabase(node, links) {
    let count = 0;
    var foundServ;
    let { nodes } = getNeighbors(node, links);
    for(const n in nodes) {
        if(getShape(nodes[n].nodeType) === 0 && nodes[n].id != foundServ) {
            count++;
            foundServ = nodes[n].id;
        }
    }
    if(count > 1) {
        return true;
    }
    return false;
}

function usesSharedDatabase(node, links, sharedDBs){
    if(getShape(node.nodeType) === 0) {
        let {nodes} = getNeighbors(node, links);
        for(const n in nodes) {
            //TODO: Fix seaching
            if(sharedDBs.find(nodes[n].id) != undefined) {
                return true;
            }
        }
    }
    return false;
}

const SharedPersistency = () => {
    const [graphData] = useAtom(graphDataAtom);
    const [sharedDBs, updateSharedDBs] = useState([]);

    function getColor(node) {
        let { links } = graphData;
        if(getShape(node.nodeType) == 3){
            if(sharedDatabase(node, links)){
                updateSharedDBs(arr => [...arr, `${node.id}`]);
                return `rgb(255,0,0)`;
            }
        }

        //if(usesSharedDatabase(node, links, sharedDBs)){
            //return `rgb(255,0,0)`;
        //}

        return `rgb(0,255,0)`;
    }

    return (
        <div>
            <InterNodeVisLayout
                graphColorFn={getColor}
                antipatternJSON={sharedData}
            ></InterNodeVisLayout>
        </div>
    );
};

export default SharedPersistency;