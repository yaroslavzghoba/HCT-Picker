import { HexUtils } from "./utils/hex-utils";

const SELECTED_COLOR_VAR_NAME = '--primary-color';
const root = document.documentElement;

// Change the selected color in the CSS variable.
function changeSelectedCode(hexValue) {
    root.style.setProperty(SELECTED_COLOR_VAR_NAME, '#' + hexValue);
    return true;
}

// Get the input field with HEX color code.
const hexInput = document.getElementById('hex-input');
// Set a listener for the input event to provide interactive feedback.
hexInput.addEventListener('input', function() {
    console.log("Input event triggered");
    const hexValue = document.getElementById('hex-input').value;
    if (!HexUtils.isStrHexValid(hexValue)) return;
    alert(hexValue);
    changeSelectedCode(hexValue);
});