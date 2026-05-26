document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  const appSection = document.getElementById('app-section');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const logoutBtn = document.getElementById('logout-btn');
  const userEmailDisplay = document.getElementById('user-email-display');
  const qaContainer = document.getElementById('qa-container');

  // Mock Data representing the contents of the Excel file
  const mockQAData = [
    {
      id: 1,
      question: "What is the purpose of the AMC - NAVY Hanoi RFI?",
      answer: "The Request for Information (RFI) is intended to gather preliminary information regarding potential vendors capable of fulfilling the Navy's technological requirements in the Hanoi region.",
      images: []
    },
    {
      id: 2,
      question: "What are the specific operational requirements for the naval systems?",
      answer: "The systems must be highly resilient, capable of operating in diverse marine environments, and support advanced communication protocols as depicted in the conceptual models.",
      images: [
        { src: "assets/mock_image_navy.png", alt: "Naval System Concept" }
      ]
    },
    {
      id: 3,
      question: "Are there any infrastructure requirements in Hanoi?",
      answer: "Yes, the vendor must have or establish a local presence in Hanoi to support maintenance and operational logistics. The infrastructure should align with modern office standards.",
      images: [
        { src: "assets/mock_image_hanoi.png", alt: "Hanoi Infrastructure" }
      ]
    }
  ];

  // Check login state
  const checkAuth = () => {
    const userEmail = localStorage.getItem('rfi_user_email');
    if (userEmail) {
      authSection.style.display = 'none';
      appSection.style.display = 'flex';
      userEmailDisplay.textContent = userEmail;
      renderQAData();
    } else {
      authSection.style.display = 'flex';
      appSection.style.display = 'none';
    }
  };

  // Render Q&A Data
  const renderQAData = () => {
    qaContainer.innerHTML = '';
    
    mockQAData.forEach(item => {
      const qaItem = document.createElement('div');
      qaItem.className = 'qa-item';
      
      let html = `
        <div class="question">${item.question}</div>
        <div class="answer">${item.answer}</div>
      `;
      
      if (item.images && item.images.length > 0) {
        html += `<div class="thumbnail-container">`;
        item.images.forEach(img => {
          html += `
            <div class="thumbnail-wrapper" onclick="openImage('${img.src}')" title="Click to view full size">
              <img src="${img.src}" alt="${img.alt}" loading="lazy" />
              <div class="thumbnail-overlay">
                <span>View Full</span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }
      
      qaItem.innerHTML = html;
      qaContainer.appendChild(qaItem);
    });
  };

  // Login handler
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email && email.includes('@')) {
      localStorage.setItem('rfi_user_email', email);
      checkAuth();
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rfi_user_email');
    emailInput.value = '';
    checkAuth();
  });

  // Initial check
  checkAuth();
});

// Global function to open image in new tab
window.openImage = function(src) {
  window.open(src, '_blank');
};
