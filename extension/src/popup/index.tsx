import React from 'react';
import { createRoot } from 'react-dom/client';
import { ActionSuggestion } from '@shared/types';
import '../styles/global.css';

// Define the props for the ActionItem component
interface ActionItemProps {
  action: ActionSuggestion;
  onExecute: (action: ActionSuggestion) => void;
}

// Action item component
const ActionItem: React.FC<ActionItemProps> = ({ action, onExecute }) => {
  return (
    <div className="action-item">
      <div className="action-content">
        <h3 className="action-title">
          {action.action_type.charAt(0).toUpperCase() + action.action_type.slice(1)} Action
          <span className="confidence">{Math.round(action.confidence * 100)}%</span>
        </h3>
        <p className="action-description">
          {action.description || `Perform ${action.action_type} on ${action.target_element}`}
        </p>
        {action.parameters && Object.keys(action.parameters).length > 0 && (
          <div className="action-params">
            <strong>Parameters:</strong>
            <pre>{JSON.stringify(action.parameters, null, 2)}</pre>
          </div>
        )}
      </div>
      <button 
        className="action-button"
        onClick={() => onExecute(action)}
        title="Execute this action"
      >
        Execute
      </button>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  const [actions, setActions] = React.useState<ActionSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [status, setStatus] = React.useState('Ready to analyze your brokerage account.');
  const [isConnected, setIsConnected] = React.useState(false);

  // Check connection to background script
  React.useEffect(() => {
    const checkConnection = () => {
      try {
        chrome.runtime.sendMessage({ type: 'PING' }, (response) => {
          const connected = chrome.runtime.lastError ? false : response?.status === 'pong';
          setIsConnected(connected);
          if (!connected) {
            setStatus('Error: Could not connect to background service. Please refresh the extension.');
          }
        });
      } catch (error) {
        console.error('Connection check failed:', error);
        setIsConnected(false);
        setStatus('Error: Failed to connect to background service.');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle messages from background script
  React.useEffect(() => {
    const messageListener = (message: any) => {
      if (message.type === 'UI_ANALYSIS_RESULT') {
        setIsAnalyzing(false);
        if (message.data?.length > 0) {
          setActions(message.data);
          setStatus(`Found ${message.data.length} suggested actions.`);
        } else {
          setStatus('No actions suggested for this page.');
        }
      } else if (message.type === 'ANALYSIS_ERROR') {
        setIsAnalyzing(false);
        setStatus(`Error: ${message.error || 'Failed to analyze page'}`);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  // Handle analyze button click
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setStatus('Analyzing current page...');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: 'CAPTURE_UI_REQUEST' });
      } else {
        setStatus('Error: Could not access the current tab.');
        setIsAnalyzing(false);
      }
    });
  };

  // Handle action execution
  const handleExecuteAction = (action: ActionSuggestion) => {
    setStatus(`Executing ${action.action_type} action...`);
    
    chrome.runtime.sendMessage({
      type: 'EXECUTE_ACTION',
      action: action
    }, (response) => {
      if (chrome.runtime.lastError) {
        setStatus(`Error: ${chrome.runtime.lastError.message}`);
      } else if (response?.success) {
        setStatus(`Successfully executed ${action.action_type} action.`);
      } else {
        setStatus(`Failed to execute action: ${response?.error || 'Unknown error'}`);
      }
    });
  };

  // Handle settings button click
  const handleSettings = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Financial Assistant</h1>
        <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </header>
      
      <main className="app-content">
        <div className="actions-panel">
          <h2>Suggested Actions</h2>
          <div className="actions-list">
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <ActionItem 
                  key={action.id || index} 
                  action={action} 
                  onExecute={handleExecuteAction} 
                />
              ))
            ) : (
              <div className="empty-state">No actions available. Click "Analyze Current Page" to begin.</div>
            )}
          </div>
        </div>
        
        <div className="status-panel">
          <h2>Status</h2>
          <div className="status-message">
            {isAnalyzing ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>{status}</span>
              </div>
            ) : (
              status
            )}
          </div>
          <button 
            id="analyzeBtn" 
            className="primary-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !isConnected}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Current Page'}
          </button>
        </div>
      </main>
      
      <footer className="app-footer">
        <button 
          id="settingsBtn" 
          className="icon-btn" 
          title="Settings"
          onClick={handleSettings}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.4.72.4 1.58 0 2.3v.2a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33h-.2a1.65 1.65 0 0 0-1.51 1v.09a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82V9a1.65 1.65 0 0 0-1-1.51V7.5"></path>
          </svg>
        </button>
        <div className="version">v0.1.0</div>
      </footer>
    </div>
  );
};

// Render the app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});
