let sites = {};

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'NEW_LINKS') {
        let site = sender.tab.url;
        if (!sites[site]) {
            sites[site] = [];
        }
        sites[site] = [...new Set([...sites[site], ...message.links])];
        // Save the data to local storage or IndexedDB
    }
});