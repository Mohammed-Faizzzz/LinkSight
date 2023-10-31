let hyperlinks = [];

// Extract hyperlinks from a page
function extractLinks() {
    const links = [...document.querySelectorAll('a[href]')];
    for (let link of links) {
        hyperlinks.push(link.href);
    }
    // Send the links to background.js
    chrome.runtime.sendMessage({type: "NEW_LINKS", links: hyperlinks});
}

function processLinks() {
    chrome.storage.local.get('isTrackingPaused', ({ isTrackingPaused }) => {
        if (!isTrackingPaused) {
            extractLinks();
        }
    });
}

// Initial extraction
processLinks();

// Monitor dynamically added content
// Mutation observer should also consider the state
const observer = new MutationObserver(processLinks);
observer.observe(document.body, { childList: true, subtree: true });
