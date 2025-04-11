/**
 * ThreadX Code Protection Script
 * This script helps protect website code from inspection in browser
 * Advanced protection against browser inspection and developer tools
 */

// Self-executing function for scope isolation
(function() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts commonly used for inspection
    document.addEventListener('keydown', function(e) {
        // Disable F12 key
        if(e.keyCode == 123) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Chrome, Firefox, Safari)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+J (Chrome)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View source)
        if(e.ctrlKey && e.keyCode == 85) {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+Shift+C (Chrome inspector)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 67) {
            e.preventDefault();
            return false;
        }
    });

    // Console protection
    const consoleProtection = function() {
        // Clear console
        console.clear();
        
        // Override console methods
        const originalConsole = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error,
            debug: console.debug
        };
        
        // Replace console methods with custom functions
        console.log = console.info = console.warn = console.error = console.debug = function() {
            originalConsole.warn("Console actions are monitored for security purposes.");
        };
        
        // Warning message
        originalConsole.warn("%cStop!", "color: red; font-size: 30px; font-weight: bold;");
        originalConsole.warn("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it may be a scam.", "font-size: 16px;");
    };
    
    // Run console protection immediately
    consoleProtection();
    
    // Run periodically to maintain protection
    setInterval(consoleProtection, 2000);

    // Advanced DevTools detection - Removed as requested
    // Developer tools detection functionality has been disabled
    // while keeping other protection features intact

    // Obfuscate HTML source
    document.addEventListener('DOMContentLoaded', function() {
        // Add random comments throughout the HTML to make it harder to read
        const commentNodes = [];
        for (let i = 0; i < 200; i++) {
            const randomComment = document.createComment('ThreadX Protection ' + Math.random().toString(36).substring(2));
            commentNodes.push(randomComment);
        }
        
        // Insert random comments throughout the DOM
        commentNodes.forEach(comment => {
            const randomElement = document.body.children[Math.floor(Math.random() * document.body.children.length)];
            if (randomElement) {
                randomElement.appendChild(comment);
            }
        });
        
        // Add invisible elements with random data
        for (let i = 0; i < 50; i++) {
            const decoyElement = document.createElement('div');
            decoyElement.style.display = 'none';
            decoyElement.setAttribute('data-decoy', Math.random().toString(36).substring(2));
            decoyElement.innerHTML = '<span>' + Math.random().toString(36).substring(2) + '</span>';
            document.body.appendChild(decoyElement);
        }
    });
})();