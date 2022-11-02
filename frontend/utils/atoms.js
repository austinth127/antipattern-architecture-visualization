import { atom } from "jotai";
import data from "../public/data/train-ticket.json";

/*
 * Jotai is a global state management library. We do this by defining
 * atoms and accessing them using hooks in our components (typically useAtom).
 *
 * Define your global atoms here for convenient lookup
 *
 * https://jotai.org/docs/basics/primitives
 */

const AtomNotInitialized = new Error("This atom has not been initialized");

// The initial coordinates of the graph camera, to be set on graph render
export const initCoordsAtom = atom({ x: null, y: null, z: null });
export const initRotationAtom = atom(AtomNotInitialized);
export const graphDataAtom = atom(data);
export const graphSearchAtom = atom("");
export const couplingThresholdAtom = atom(8);
