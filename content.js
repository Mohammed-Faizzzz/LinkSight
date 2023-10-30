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
const observer = new MutationObserver(extractLinks);
observer.observe(document.body, { childList: true, subtree: true });
