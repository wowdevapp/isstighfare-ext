// Store the extension state in chrome.storage
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleExtension');
    const statusText = document.getElementById('statusText');
    const changeColorBtn = document.getElementById('changeColor');

    // Load saved state
    chrome.storage.sync.get(['extensionEnabled'], function (result) {
        toggleSwitch.checked = result.extensionEnabled ?? false;
        updateStatus(result.extensionEnabled ?? false);
    });

    // Toggle switch handler
    toggleSwitch.addEventListener('change', function () {
        const isEnabled = toggleSwitch.checked;

        // Save state to chrome.storage
        chrome.storage.sync.set({ extensionEnabled: isEnabled }, function () {
            updateStatus(isEnabled);

            // Notify the background script about the state change
            chrome.runtime.sendMessage({
                action: 'toggleExtension',
                enabled: isEnabled
            });
        });
    });

    // Change color button handler
    changeColorBtn.addEventListener('click', function () {
        if (!toggleSwitch.checked) {
            alert('Please enable the extension first!');
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'changeColor',
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            });
        });
    });

    function updateStatus(enabled) {
        statusText.textContent = enabled ? 'Enabled' : 'Disabled';
        statusText.style.color = enabled ? '#2196F3' : '#666';
        changeColorBtn.style.opacity = enabled ? '1' : '0.5';
    }
});