// Common types shared between extension and backend

export interface UISnapshot {
  /** The URL of the page */
  url: string;
  
  /** The HTML content of the page */
  html: string;
  
  /** Base64 encoded screenshot of the page */
  screenshot: string;
  
  /** Viewport dimensions */
  viewport_size: {
    width: number;
    height: number;
  };
  
  /** Timestamp when the snapshot was taken */
  timestamp: number;
  
  /** Additional metadata */
  metadata: Record<string, any>;
}

export interface ActionSuggestion {
  /** Type of action (e.g., 'click', 'input', 'navigate') */
  action_type: string;
  
  /** CSS selector for the target element */
  target_element: string;
  
  /** Parameters for the action */
  parameters: Record<string, any>;
  
  /** Confidence score (0-1) */
  confidence: number;
  
  /** Optional unique ID for the action */
  id?: string;
  
  /** Optional human-readable description */
  description?: string;
}

export interface PolicyCheckResult {
  /** Whether the action is allowed */
  allowed: boolean;
  
  /** Reason for the decision */
  reason: string;
  
  /** Whether the user can override this decision */
  override_available: boolean;
  
  /** Optional reference to the policy rule that was applied */
  policy_reference?: string;
}

export interface AuditLogEntry {
  /** Unique ID for the log entry */
  id: string;
  
  /** Timestamp of the event */
  timestamp: number;
  
  /** Type of event */
  event_type: 'ui_snapshot' | 'action_suggested' | 'action_executed' | 'policy_check';
  
  /** Event data */
  data: any;
  
  /** User ID (if authenticated) */
  user_id?: string;
  
  /** Session ID */
  session_id?: string;
  
  /** Additional metadata */
  metadata?: Record<string, any>;
}

// WebSocket message types
export type WsMessage = 
  | { type: 'ui_update'; data: UISnapshot }
  | { type: 'action_suggested'; data: ActionSuggestion }
  | { type: 'action_executed'; data: { action_id: string; success: boolean; result?: any } }
  | { type: 'error'; error: string };

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    request_id?: string;
    timestamp: number;
  };
}
