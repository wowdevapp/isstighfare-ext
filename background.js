// Create alarm when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed');
    chrome.alarms.create('Isstighfar', {
        periodInMinutes: 1
    });
});

// Function to inject and show message
async function showMessage(tabId) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: () => {
                // Create message element
                const message = document.createElement('div');
                message.textContent = 'أستغفر الله العظيم';
                message.style.position = 'fixed';
                message.style.bottom = '20px';
                message.style.right = '20px';
                message.style.backgroundColor = '#4CAF50';
                message.style.color = 'white';
                message.style.padding = '15px 25px';
                message.style.borderRadius = '5px';
                message.style.zIndex = '10000';
                message.style.animation = 'slideIn 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards';

                // Add styles for animations if they don't exist
                if (!document.getElementById('welcomeStyles')) {
                    const style = document.createElement('style');
                    style.id = 'welcomeStyles';
                    style.textContent = `
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
              }
            `;
                    document.head.appendChild(style);
                }

                // Add to page and remove after animation
                document.body.appendChild(message);
                setTimeout(() => message.remove(), 5000);
            }
        });
    } catch (error) {
        console.error('Error showing message:', error);
    }
}

// Listen for alarm and show message in active tab
chrome.alarms.onAlarm.addListener(async (alarm) => {

    if (alarm.name === 'Isstighfar') {
        try {
            // Get active tab
            const [tab] = await chrome.tabs.query({ active: true })

            if (tab && tab.id) {
                await showMessage(tab.id);
            }
        } catch (error) {
            console.error('Error handling alarm:', error);
        }
    }
});