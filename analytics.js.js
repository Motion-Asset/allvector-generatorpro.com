// Analytics and Tracking System

class AnalyticsTracker {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.userId = localStorage.getItem('db_user_id') || this.generateUserId();
        this.pageViews = 0;
        
        this.init();
    }
    
    init() {
        // Track initial page view
        this.trackPageView();
        
        // Track session start
        this.trackEvent('session_start', {
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: new Date().toISOString()
        });
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load previous events
        this.loadEvents();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateUserId() {
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('db_user_id', userId);
        return userId;
    }
    
    trackPageView() {
        const pageData = {
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer,
            title: document.title,
            timestamp: new Date().toISOString()
        };
        
        this.trackEvent('page_view', pageData);
        this.pageViews++;
        
        // Update in localStorage for persistence
        this.saveEvents();
    }
    
    trackEvent(eventName, eventData = {}) {
        const event = {
            event: eventName,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: new Date().toISOString(),
            ...eventData,
            metadata: {
                user_agent: navigator.userAgent,
                language: navigator.language,
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`
            }
        };
        
        this.events.push(event);
        console.log('Analytics Event:', event);
        
        // Send to backend in production
        this.sendToBackend(event);
        
        // Save to localStorage
        this.saveEvents();
        
        return event;
    }
    
    trackDesignGeneration(brief, settings, result) {
        return this.trackEvent('design_generated', {
            brief_length: brief.length,
            settings: settings,
            result_type: result.type,
            generation_time: result.generationTime || 0,
            success: result.success || true
        });
    }
    
    trackFileDownload(fileType, fileSize, designId = null) {
        return this.trackEvent('file_downloaded', {
            file_type: fileType,
            file_size: fileSize,
            design_id: designId,
            download_time: new Date().toISOString()
        });
    }
    
    trackUserAction(action, details = {}) {
        return this.trackEvent('user_action', {
            action: action,
            ...details
        });
    }
    
    trackError(error, context = {}) {
        return this.trackEvent('error_occurred', {
            error_message: error.message,
            error_stack: error.stack,
            ...context
        });
    }
    
    trackConversion(conversionType, value = 0, details = {}) {
        return this.trackEvent('conversion', {
            conversion_type: conversionType,
            value: value,
            ...details
        });
    }
    
    setupEventListeners() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                this.trackButtonClick(button);
            }
            
            if (e.target.tagName === 'A') {
                this.trackLinkClick(e.target);
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackFormSubmit(e.target);
        });
        
        // Track file uploads
        document.addEventListener('change', (e) => {
            if (e.target.type === 'file') {
                this.trackFileUpload(e.target);
            }
        });
        
        // Track scroll depth
        let scrollDepthTracked = [];
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
            
            // Track at 25%, 50%, 75%, 100%
            [25, 50, 75, 100].forEach(depth => {
                if (scrollDepth >= depth && !scrollDepthTracked.includes(depth)) {
                    this.trackEvent('scroll_depth', {
                        depth: depth,
                        scroll_position: window.scrollY,
                        viewport_height: window.innerHeight
                    });
                    scrollDepthTracked.push(depth);
                }
            });
        });
        
        // Track time on page
        let pageStartTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - pageStartTime;
            this.trackEvent('page_exit', {
                time_on_page: timeOnPage,
                exit_time: new Date().toISOString()
            });
        });
    }
    
    trackButtonClick(button) {
        const buttonData = {
            button_text: button.textContent.trim(),
            button_id: button.id || '',
            button_classes: button.className,
            button_type: button.type || 'button',
            page_location: window.location.pathname
        };
        
        this.trackEvent('button_click', buttonData);
    }
    
    trackLinkClick(link) {
        const linkData = {
            link_text: link.textContent.trim(),
            link_url: link.href,
            link_target: link.target,
            page_location: window.location.pathname
        };
        
        this.trackEvent('link_click', linkData);
    }
    
    trackFormSubmit(form) {
        const formData = {
            form_id: form.id || '',
            form_classes: form.className,
            form_action: form.action,
            form_method: form.method,
            form_fields: Array.from(form.elements)
                .filter(el => el.name)
                .map(el => ({
                    name: el.name,
                    type: el.type,
                    required: el.required
                }))
        };
        
        this.trackEvent('form_submit', formData);
    }
    
    trackFileUpload(input) {
        const files = Array.from(input.files);
        const fileData = {
            input_id: input.id || '',
            file_count: files.length,
            file_types: files.map(f => f.type),
            file_sizes: files.map(f => f.size),
            total_size: files.reduce((sum, f) => sum + f.size, 0)
        };
        
        this.trackEvent('file_upload', fileData);
    }
    
    sendToBackend(event) {
        // In production, send to your analytics backend
        // For now, we'll just log it
        
        // Example backend integration:
        /*
        fetch('https://your-backend.com/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).catch(error => {
            console.error('Failed to send analytics:', error);
        });
        */
    }
    
    saveEvents() {
        try {
            // Keep only last 500 events to avoid localStorage overflow
            const eventsToSave = this.events.slice(-500);
            localStorage.setItem('db_analytics_events', JSON.stringify(eventsToSave));
            
            // Save session data
            const sessionData = {
                session_id: this.sessionId,
                user_id: this.userId,
                page_views: this.pageViews,
                last_activity: new Date().toISOString()
            };
            localStorage.setItem('db_analytics_session', JSON.stringify(sessionData));
        } catch (error) {
            console.error('Failed to save analytics events:', error);
        }
    }
    
    loadEvents() {
        try {
            const savedEvents = localStorage.getItem('db_analytics_events');
            if (savedEvents) {
                this.events = JSON.parse(savedEvents);
            }
            
            const savedSession = localStorage.getItem('db_analytics_session');
            if (savedSession) {
                const session = JSON.parse(savedSession);
                this.sessionId = session.session_id || this.sessionId;
                this.userId = session.user_id || this.userId;
                this.pageViews = session.page_views || 0;
            }
        } catch (error) {
            console.error('Failed to load analytics events:', error);
        }
    }
    
    getStats() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // Filter today's events
        const todayEvents = this.events.filter(event => 
            event.timestamp.startsWith(today)
        );
        
        const stats = {
            total_events: this.events.length,
            today_events: todayEvents.length,
            page_views: this.pageViews,
            session_id: this.sessionId,
            user_id: this.userId
        };
        
        // Count events by type
        const eventCounts = {};
        this.events.forEach(event => {
            eventCounts[event.event] = (eventCounts[event.event] || 0) + 1;
        });
        stats.event_counts = eventCounts;
        
        return stats;
    }
    
    getPopularPages() {
        const pageViews = {};
        
        this.events.forEach(event => {
            if (event.event === 'page_view' && event.path) {
                pageViews[event.path] = (pageViews[event.path] || 0) + 1;
            }
        });
        
        // Sort by views
        const sorted = Object.entries(pageViews)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
        
        return Object.fromEntries(sorted);
    }
    
    getUserJourney(userId = this.userId) {
        const userEvents = this.events.filter(event => event.user_id === userId);
        
        return userEvents.map(event => ({
            event: event.event,
            timestamp: event.timestamp,
            path: event.path || '',
            details: event
        }));
    }
    
    clearOldEvents(daysToKeep = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        
        this.events = this.events.filter(event => {
            const eventDate = new Date(event.timestamp);
            return eventDate > cutoffDate;
        });
        
        this.saveEvents();
        return this.events.length;
    }
    
    exportData(format = 'json') {
        switch(format.toLowerCase()) {
            case 'json':
                return JSON.stringify(this.events, null, 2);
            case 'csv':
                return this.convertToCSV();
            default:
                return this.events;
        }
    }
    
    convertToCSV() {
        if (this.events.length === 0) return '';
        
        const headers = Object.keys(this.events[0]).join(',');
        const rows = this.events.map(event => 
            Object.values(event).map(value => 
                typeof value === 'object' ? JSON.stringify(value) : value
            ).join(',')
        );
        
        return [headers, ...rows].join('\n');
    }
}

// Initialize Analytics Tracker
const analyticsTracker = new AnalyticsTracker();

// Export to global scope
window.analyticsTracker = analyticsTracker;

// Error tracking
window.addEventListener('error', function(event) {
    analyticsTracker.trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', function(event) {
    analyticsTracker.trackError(new Error(event.reason), {
        type: 'unhandled_promise_rejection'
    });
});