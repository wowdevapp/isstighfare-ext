// Function to show welcome message
function showWelcomeMessage(message = 'أستغفر الله العظيم') {

    console.log('Showing message:', message);
    // Remove any existing message first
    const existingMessage = document.querySelector('.welcome-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'welcome-message';
    messageDiv.textContent = message;

    // Add to page
    document.body.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showMessage') {
        showWelcomeMessage(request.message);
        sendResponse({ status: 'Message shown successfully' });
    }
    return true; // Required for async response
});

// Function to send message to background script
function notifyBackground(data) {
    chrome.runtime.sendMessage({
        action: 'fromContent',
        data: data
    });
}