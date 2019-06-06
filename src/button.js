// get existing button element and associated styles
var existingButton = document.querySelector('button.submit-form-button');

// create styles element to wrap required styles
const STYLE_ELEM = document.createElement('style');
document.getElementsByTagName("head")[0].appendChild(STYLE_ELEM);

// set values for new element
var newButtonId = 'dummyCta';
var newButtonText = 'Click me!';
var newButtonLink = '#';

// set desktop breakpoint
const DESKTOP_BREAKPOINT = '1024px';

// add styles tag
function addStyles(existingElement, newId) {

    try {
        STYLE_ELEM.innerHTML = "";
        let existingButtonStyles = window.getComputedStyle ? getComputedStyle(existingElement) : existingElement.currentStyle;
        let existingButtonPseudoStyles = window.getComputedStyle(existingElement, '::after');

        // clone existing styles to new strings for addition to style tags
        const BUTTON_STYLES = {
            'background-color': '#eeeeee',
            'color': '#343434',
            'display': 'inline-block',
            'width': existingButtonStyles.width,
            'padding-top': existingButtonStyles.paddingTop,
            'padding-right': existingButtonStyles.paddingRight,
            'padding-bottom': existingButtonStyles.paddingBottom,
            'padding-left': existingButtonStyles.paddingLeft,
            'font-family': existingButtonStyles.fontFamily,
            'text-transform': existingButtonStyles.textTransform,
            'text-decoration': existingButtonStyles.textDecoration,
            'text-align': existingButtonStyles.textAlign,
            'font-size': existingButtonStyles.fontSize,
            'line-height': existingButtonStyles.lineHeight,
            'position': existingButtonStyles.position
        }

        const CARET_STYLES = {
            'font-size': existingButtonPseudoStyles.fontSize,
            'content': existingButtonPseudoStyles.content,
            'right': existingButtonPseudoStyles.right,
            'top': existingButtonPseudoStyles.top,
            'overflow': existingButtonPseudoStyles.overflow,
            'margin-top': existingButtonPseudoStyles.marginTop,
            'position': existingButtonPseudoStyles.position,
            'font-family': existingButtonPseudoStyles.fontFamily,
            'font-style': existingButtonPseudoStyles.fontStyle,
            'font-weight': existingButtonPseudoStyles.fontWeight,
            'font-variant': existingButtonPseudoStyles.fontVariant,
            'text-transform': existingButtonPseudoStyles.textTransform,
            'line-height': existingButtonPseudoStyles.lineHeight,
            'color': '#c3002f',
            '-webkit-text-fill-color': '#c3002f'
        }

        // create style strings
        let newStyles = `a#${newId} {`;
        for (let style in BUTTON_STYLES) {
            newStyles += `${style}:${BUTTON_STYLES[style]};`;
        }

        newStyles += `}a#${newId}::after{`;
        for (let style in CARET_STYLES) {
            newStyles += `${style}:${CARET_STYLES[style]};`;
        }

        newStyles += `}@media only screen and (max-width: ${DESKTOP_BREAKPOINT}){a#${newId}{display:none;}`;

        // update styles tag contents
        STYLE_ELEM.appendChild(document.createTextNode(newStyles));

        return BUTTON_STYLES;
    } catch (err) {
        console.log("Error: ", err.message);
    }

}

// add button
function addButton(existing, id, text, link) {
    // if button exists don't add another
    if (document.body.contains(document.querySelector(`a#${id}`))) return false;

    // implement styles for new element if not already present
    let buttonStyles = addStyles(existingButton, id);

    try {
        // adjust styles for existing element
        existing.style.display = buttonStyles['display'];
        existing.style.marginRight = "20px";

        // get parent wrapper element for existing button
        let wrapper = existing.parentNode;
        // create new element
        let newElem = document.createElement("a");

        // set content copy and attributes
        newElem.innerText = text;
        newElem.href = link;
        newElem.id = id;

        // add to DOM
        wrapper.appendChild(newElem);
    } catch (err) {
        console.log("Error: ", err.message);
    }

}

addButton(existingButton, newButtonId, newButtonText, newButtonLink);