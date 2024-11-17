// Function to generate random color and change background
function setPageBackgroundColor() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Add click event listener to the button
document.getElementById('changeColor').addEventListener('click', async () => {
    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the script in the active tab
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: setPageBackgroundColor
        });
    } catch (err) {
        console.error(`Failed to execute script: ${err}`);
    }
});