// Password Gate Script
(function() {
  'use strict';
  
  const CORRECT_PASSWORD = 'abrarezakaria06082023';
  const STORAGE_KEY = 'abrareAuth';
  
  function initPasswordGate() {
    const passwordGate = document.getElementById('passwordGate');
    const protectedContent = document.getElementById('protectedContent');
    const passwordInput = document.getElementById('passwordInput');
    const enterButton = document.getElementById('enterButton');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!passwordGate || !protectedContent || !passwordInput || !enterButton || !errorMessage) {
      console.error('Password gate elements not found');
      return;
    }
    
    // Check if user is already authenticated
    function checkAuth() {
      const savedAuth = localStorage.getItem(STORAGE_KEY);
      if (savedAuth === CORRECT_PASSWORD) {
        // User is authenticated, show content
        showContent();
        return true;
      }
      return false;
    }
    
    // Show protected content and hide password gate
    function showContent() {
      passwordGate.classList.add('hidden');
      protectedContent.style.display = 'block';
    }
    
    // Validate password
    function validatePassword(password) {
      return password === CORRECT_PASSWORD;
    }
    
    // Handle login
    function handleLogin() {
      const password = passwordInput.value.trim();
      
      // Clear previous error
      errorMessage.classList.remove('show');
      errorMessage.textContent = '';
      
      if (!password) {
        showError('Please enter a password');
        return;
      }
      
      if (validatePassword(password)) {
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, password);
        // Show content
        showContent();
      } else {
        showError('Incorrect password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
      }
    }
    
    // Show error message
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.add('show');
    }
    
    // Event listeners
    enterButton.addEventListener('click', handleLogin);
    
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleLogin();
      }
    });
    
    // Check authentication on page load
    if (!checkAuth()) {
      // Focus on password input if not authenticated
      setTimeout(() => {
        passwordInput.focus();
      }, 100);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordGate);
  } else {
    initPasswordGate();
  }
})();

