/**
 * Function returns the colour of the corrisponding label
 * @param label: The label name 
 * @returns: String, the name of the colour associated with the label
 */
export function getLabelColour(label) {
    switch(label) {
        case("work"):
            return "rgba(0,0,150,0.7)";
        case("personal"):
            return "rgba(0,150,0,0.7)";
        case("study"):
            return "rgba(150,0,0,0.7)";
        default:
            return "black"
    }
}