/**
 * Function returns the colour of the corrisponding label
 * @param label: The label name 
 * @returns: String, the name of the colour associated with the label
 */
export function getLabelColour(label) {
    switch(label) {
        case("work"):
            return "blue";
        case("personal"):
            return "green";
        case("study"):
            return "orange";
        default:
            return "black"
    }
}