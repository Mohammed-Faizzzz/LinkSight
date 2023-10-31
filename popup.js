// Fetch the data from chrome.storage.local
chrome.storage.local.get(['visited', 'hyperlinks'], (data) => {
    let siteCount = Object.keys(data.visited || {}).length; // Number of unique sites visited
    let linkCount = 0;

    for (let site in data.hyperlinks || {}) {
        linkCount += data.hyperlinks[site].length;
    }

    document.getElementById('siteCount').textContent = siteCount;
    document.getElementById('linkCount').textContent = linkCount;
});

document.getElementById('detailsBtn').addEventListener('click', () => {
    // Open a new tab to display details
    chrome.tabs.create({ url: 'details.html' });
});

document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all data?")) {
        // Reset the data
        chrome.storage.local.set({ 'visited': {}, 'hyperlinks': {} }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error during reset:", chrome.runtime.lastError);
            } else {
                console.log("Data reset successfully");
                document.getElementById('siteCount').textContent = 0;
                document.getElementById('linkCount').textContent = 0;
            }
        });
    }
});


document.getElementById('pauseBtn').addEventListener('click', () => {
    chrome.storage.local.get('isTrackingPaused', ({ isTrackingPaused }) => {
        // Toggle the tracking state
        const newState = !isTrackingPaused;

        chrome.storage.local.set({ 'isTrackingPaused': newState }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error toggling tracking state:", chrome.runtime.lastError);
            } else {
                console.log("Tracking state toggled successfully");

                // Update button label according to the new state
                document.getElementById('pauseBtn').textContent = newState ? "Resume Tracking" : "Pause Tracking";
            }
        });
    });
});

chrome.storage.local.get('isTrackingPaused', ({ isTrackingPaused }) => {
    document.getElementById('pauseBtn').textContent = isTrackingPaused ? "Resume Tracking" : "Pause Tracking";
});
