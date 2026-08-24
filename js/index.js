

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
    }, 5000);

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


