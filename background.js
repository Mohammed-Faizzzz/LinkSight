let visited = {};
let hyperlinks = {};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ 'isTrackingPaused': false });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'NEW_LINKS') {
        let site = sender.tab.url;

        if (message.links.length > 0) {
            // Add the site to 'visited' if hyperlinks were extracted
            visited[site] = [site];

            // Store hyperlinks extracted from the site in 'hyperlinks'
            hyperlinks[site] = [...new Set([...(hyperlinks[site] || []), ...message.links])];
        }

        // Save the data to local storage or IndexedDB
        chrome.storage.local.set({ 'visited': visited, 'hyperlinks': hyperlinks });
    }
});

// Retrieve data from 'chrome.storage.local'
chrome.storage.local.get(['visited', 'hyperlinks'], (data) => {
    if (data.visited) {
        visited = data.visited;
    }
    if (data.hyperlinks) {
        hyperlinks = data.hyperlinks;
    }
});
