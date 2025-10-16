console.log('Content script loaded');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('Message received in content script:', message);
  
  if (message.type === 'CAPTURE_UI') {
    // Create a simple snapshot of the current page
    const snapshot = {
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      html: document.documentElement.outerHTML.substring(0, 1000) + '...', // Limit size
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      // Add any other relevant data you want to capture
    };
    
    // Send the response back to the background script
    sendResponse({ 
      type: 'UI_CAPTURE_RESULT',
      data: snapshot 
    });
    
    // Return true to indicate we'll send a response asynchronously
    return true;
  }
  
  // Return true to keep the message channel open for async response
  return true;
});
