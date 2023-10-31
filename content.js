let visited = [];
let hyperlinks = [];

// Extract hyperlinks from a page
function extractLinks() {
    const links = [...document.querySelectorAll('a[href]')];

    const currentUrl = window.location.href;
    if (!visited.includes(currentUrl)) {
        visited.push(currentUrl); // Store the URL of the actively visited website
    }

    for (let link of links) {
        if (!hyperlinks.includes(link.href)) {
            hyperlinks.push(link.href);
        }
    }
    // Send the links to background.js
    chrome.runtime.sendMessage({ type: "NEW_LINKS", links: hyperlinks });
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
const observer = new MutationObserver(processLinks);
observer.observe(document.body, { childList: true, subtree: true });

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
