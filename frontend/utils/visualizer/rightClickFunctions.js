const linkContextMenu = document.querySelector(".wrapper2");
const contextMenu = document.querySelector(".wrapper");

// set right click menu's location on screen and show it
export const rightClickLink = (e) => {
    e.preventDefault();
    let x = e.offsetX,
        y = e.offsetY,
        winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        cmWidth = linkContextMenu.offsetWidth,
        cmHeight = linkContextMenu.offsetHeight;

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;

    linkContextMenu.style.left = `${x}px`;
    linkContextMenu.style.top = `${y}px`;
    linkContextMenu.style.visibility = "visible";
};

// Hide right click menu when clicking out of it
// document.addEventListener("click", () => {
//     linkContextMenu.style.visibility = "hidden";
// });

// set right click menu's location on screen and show it
export default function rightClick(e) {
    e.preventDefault();
    let x = e.offsetX,
        y = e.offsetY,
        winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        cmWidth = contextMenu.offsetWidth,
        cmHeight = contextMenu.offsetHeight;

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
}

// Hide right click menu when clicking out of it
document.addEventListener("click", () => {
    contextMenu.style.visibility = "hidden";
    resetHoveredNode();
});