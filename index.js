/**
 * Executes the scripts inside each component, marked with the 'inComponent' attribute
 */
function loadExtraScripts()
{
    let allScripts = Array.from(document.querySelectorAll('script[inComponent]'));
    allScripts.forEach(script => {
        eval(script.textContent);
        script.remove();
    });
}

/**
 * Load data to show in the includes
 * @param {HTMLElement} c the current 'app-include' tag
 */
function loadIncludeData(c)
{
    let data = c.getAttributeNames(); // Attributes of 'app-include' tag
    data.forEach(attr => {
        if (attr.includes('i-')) // Takes only attributes with 'i-'
        Array.from(document.querySelectorAll(attr)) // Selectors that match that attribute
        .forEach(el => {
            el.textContent = c.getAttribute(attr); // Include data as text content
        });
    });
}

/**
 * Imports HTML components
 * @returns void
 */
function importFiles()
{
    let req = new XMLHttpRequest;
    let components = Array.from(document.querySelectorAll('app-include'));

    if (!components.length) return;

    // Importing and showing components
    components.forEach(c => {
        let src = c.getAttribute('src');
        let file = src.split('.html').length === 2 ? src : src + ".html";

        req.open("GET", file);
        req.responseType = 'text/html';

        // Shows the components
        req.onload = () => {
            // Successful request
            if (req.readyState === req.DONE && req.status == 200) {
                let div = document.createElement('div');
                c.parentElement.insertBefore(div, c);
                div.innerHTML = req.response;
                c.remove();
                
                // Import sub includes and scripts
                importFiles();
                loadExtraScripts();
                
                // Loading all the data
                loadIncludeData(c);
            } else {
                console.error("source not found");
            }
        }

        req.send();
    });
}

importFiles();