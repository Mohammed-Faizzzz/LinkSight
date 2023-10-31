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

// Extraction
extractLinks();

// Monitor dynamically added content
// Mutation observer should also consider the state
const observer = new MutationObserver(() => {
    chrome.storage.local.get('isTrackingPaused', ({ isTrackingPaused }) => {
        if (!isTrackingPaused) {
            extractLinks();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
chrome.storage.local.get('isTrackingPaused', ({ isTrackingPaused }) => {
    if (!isTrackingPaused) {
        extractLinks();
    }
});
