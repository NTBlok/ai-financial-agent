console.log('Background script loaded');

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    // Initialize extension data
    chrome.storage.local.set({
      settings: {
        apiEndpoint: 'http://localhost:8000',
        autoCapture: true,
        debugMode: false
      },
      actions: []
    });
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background:', { message, sender });
  
  if (message.type === 'PING') {
    sendResponse({ status: 'pong' });
    return true; // Keep the message channel open for the response
  }
  
  if (message.type === 'ANALYZE_PAGE') {
    // Forward to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'CAPTURE_UI' })
          .then(response => {
            console.log('Response from content script:', response);
            sendResponse(response);
          })
          .catch(error => {
            console.error('Error from content script:', error);
            sendResponse({ error: error.message });
          });
      }
    });
    return true; // Keep the message channel open for the response
  }
  
  return true;
});
