const SELECTED_COLOR_VAR_NAME = '--primary-color';
const root = document.documentElement;

// Validate a HEX entered in an input field
function validateHexColor(rawValue: string): boolean {
    const hexValue = rawValue.trim().toUpperCase();
    if (!/^[0-9A-F]{6}$/.test(hexValue)) {
      alert("Invalid HEX color code. Please enter a 6-digit hexadecimal value (0-9 and A-F).");
      return false;
    }
    return true;    
}

// Change the selected color in the CSS variable.
function changeSelectedCode(hexValue: string) {
    root.style.setProperty(SELECTED_COLOR_VAR_NAME, '#' + hexValue);
    return true;
}

// Get the input field with HEX color code.
const hexInput = document.getElementById('hex-input') as HTMLInputElement;
// Set a listener for the input event to provide interactive feedback.
hexInput.addEventListener('input', function() {
    const hexValue = (document.getElementById('hex-input')! as HTMLInputElement).value;
    if (!validateHexColor(hexValue)) return;
    changeSelectedCode(hexValue);
});