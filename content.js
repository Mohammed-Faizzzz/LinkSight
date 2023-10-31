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

// contentscript.js

// This function stores links to `chrome.storage.local`
function addLinkToStorage(site, url) {
    let hostname = new URL(url).hostname;

    chrome.storage.local.get(hostname, (result) => {
        let linksForSite = result[hostname] || [];
        
        let existingLink = linksForSite.find(link => link.url === url);
        
        if (existingLink) {
            existingLink.count += 1;
        } else {
            linksForSite.push({
                url: url,
                count: 1
            });
        }

        chrome.storage.local.set({ [hostname]: linksForSite });
    });
}

let hostname = new URL(window.location.href).hostname;

chrome.storage.local.get(hostname, (result) => {
    let linksForSite = result[hostname] || [];
    
    document.querySelectorAll('a[href]').forEach((a) => {
        addLinkToStorage(hostname, a.href);
    });
});

