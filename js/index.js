

    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            const lines = toggle.querySelectorAll('span');
            if (menu.classList.contains('open')) {
                lines[0].style.transform = 'rotate(45deg) translateY(5px)';
                lines[1].style.transform = 'rotate(-45deg) translateY(-5px)';
                lines[1].style.width = '24px';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
                lines[1].style.width = '16px';
            }
        });
    }




// WHATSAPP INTEGRATION
document.addEventListener("DOMContentLoaded", () => {
    const phone = "919292470174"; // Your number
    const btn = document.getElementById("wa-btn");
    const popup = document.getElementById("wa-popup");
    const closeBtn = document.getElementById("wa-close");
    const sendBtn = document.getElementById("wa-send");
    const input = document.getElementById("wa-input");
    const body = document.getElementById("wa-body");

    // 1. Show the button and auto-open the popup exactly after 5 seconds
    setTimeout(() => {
        btn.classList.add("active");
        popup.classList.add("active");
    }, 10000);

    // 2. Close button logic
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    // Clicking the button toggles the popup if closed
    btn.addEventListener("click", () => {
        popup.classList.toggle("active");
    });

    // 3. Send message logic (opens WhatsApp with exact encoded text)
    function sendMessage() {
        let msg = input.value.trim();
        if (msg === "") {
            msg = "Hi Limore, I'm interested in your services.";
        }
        
        // Encoded message
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        
        // Open WhatsApp in new tab
        window.open(url, "_blank");
        
        // Clear input
        input.value = "";
        
        // Optional: Add sent bubble to chat
        addMessage(msg, "user");
    }

    // Handle send button click
    sendBtn.addEventListener("click", sendMessage);
    
    // Handle "Enter" key press
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Helper to add a chat bubble in the popup
    function addMessage(text, type) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `wa-msg ${type === "user" ? "user" : "bot"}`;
        
        if (type === "user") {
            msgDiv.style.background = "#DCF8C6";
            msgDiv.style.alignSelf = "flex-end";
            msgDiv.style.borderTopRightRadius = "2px";
        } else {
            msgDiv.style.borderTopLeftRadius = "2px";
        }

        // Time formatting
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML = `${text} <span class="wa-time">${time}</span>`;
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }
});










// ============================================
// CONTACT FORM SUBMISSION HANDLER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
  
    // ⚠️ PASTE YOUR DEPLOYED WEB APP URL HERE
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhehbBoiaQmfH2ZEHzZ5soZvtpTjBVLaJBHBI28iqNoJYVniz7LWFh5Nk5UM89sRoiBQ/exec';
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonHTML = submitButton.innerHTML;
  
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin text-[10px]"></i>
        Sending...
      `;
  
      // Collect form data
      const formData = new FormData(form);
      
      // Add the source page for tracking
      formData.append('sourcePage', window.location.pathname);
  
      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: formData,
          // Do NOT set Content-Type header – let the browser set it automatically
          // This avoids CORS preflight issues with Apps Script
        });
  
        const result = await response.json();
  
        if (result.status === 'success') {
          // Show success message
          form.innerHTML = `
            <div class="text-center py-12">
              <div class="w-16 h-16 bg-brand-red/10 flex items-center justify-center mx-auto mb-6 rounded-none">
                <i class="fa-solid fa-check text-brand-red text-2xl"></i>
              </div>
              <h3 class="font-serif text-2xl font-bold text-brand-black mb-3">
                Thank You, ${formData.get('fullName')}
              </h3>
              <p class="text-black/60 text-sm leading-relaxed max-w-sm mx-auto">
                Your inquiry has been received. Our executive concierge team will respond within 
                <strong>2 business hours</strong>.
              </p>
              <p class="text-black/40 text-xs mt-6">
                A confirmation has been sent to <strong>${formData.get('email')}</strong>
              </p>
            </div>
          `;
        } else {
          throw new Error(result.message || 'Submission failed.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        
        // Restore button and show error
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
  
        // Show error message below the button
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();
  
        const errorDiv = document.createElement('p');
        errorDiv.className = 'form-error text-center text-brand-red text-xs mt-4';
        errorDiv.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          Something went wrong. Please try again or contact us directly.
        `;
        form.appendChild(errorDiv);
      }
    });
  });

