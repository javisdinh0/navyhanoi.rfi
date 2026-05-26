document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  const appSection = document.getElementById('app-section');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const logoutBtn = document.getElementById('logout-btn');
  const userEmailDisplay = document.getElementById('user-email-display');
  const tableBody = document.getElementById('qa-table-body');
  const addRowBtn = document.getElementById('add-row-btn');

  // Initial Mock Data
  const defaultQAData = [
    {
      id: 1,
      question: "What is the purpose of the AMC - NAVY Hanoi RFI?",
      answer: "The Request for Information (RFI) is intended to gather preliminary information regarding potential vendors capable of fulfilling the Navy's technological requirements in the Hanoi region.",
      images: []
    },
    {
      id: 2,
      question: "What are the specific operational requirements for the naval systems?",
      answer: "The systems must be highly resilient, capable of operating in diverse marine environments, and support advanced communication protocols.",
      images: [
        { src: "assets/mock_image_navy.png", alt: "Naval System Concept" }
      ]
    },
    {
      id: 3,
      question: "Are there any infrastructure requirements in Hanoi?",
      answer: "Yes, the vendor must have or establish a local presence in Hanoi to support maintenance and operational logistics.",
      images: [
        { src: "assets/mock_image_hanoi.png", alt: "Hanoi Infrastructure" }
      ]
    }
  ];

  let currentData = [];

  const loadData = () => {
    const savedData = localStorage.getItem('rfi_qa_data');
    if (savedData) {
      currentData = JSON.parse(savedData);
    } else {
      currentData = [...defaultQAData];
      saveData();
    }
  };

  const saveData = () => {
    localStorage.setItem('rfi_qa_data', JSON.stringify(currentData));
  };

  // Check login state
  const checkAuth = () => {
    const userEmail = localStorage.getItem('rfi_user_email');
    if (userEmail) {
      authSection.style.display = 'none';
      appSection.style.display = 'flex';
      userEmailDisplay.textContent = userEmail;
      loadData();
      renderTable();
    } else {
      authSection.style.display = 'flex';
      appSection.style.display = 'none';
    }
  };

  // Render Table
  const renderTable = () => {
    tableBody.innerHTML = '';
    
    currentData.forEach((item, index) => {
      const tr = document.createElement('tr');
      
      let imageHtml = '';
      if (item.images && item.images.length > 0) {
        imageHtml = `<div class="thumbnail-container">`;
        item.images.forEach(img => {
          imageHtml += `
            <div class="thumbnail-wrapper" onclick="openImage('${img.src}')" title="Click to view full size">
              <img src="${img.src}" alt="${img.alt}" loading="lazy" />
            </div>
          `;
        });
        imageHtml += `</div>`;
      }
      
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td class="editable-cell" data-field="question" data-id="${item.id}" contenteditable="true">${item.question || ''}</td>
        <td class="editable-cell" data-field="answer" data-id="${item.id}" contenteditable="true">${item.answer || ''}</td>
        <td>${imageHtml}</td>
        <td>
          <button class="btn-delete" onclick="deleteRow(${item.id})" title="Delete row">X</button>
        </td>
      `;
      
      tableBody.appendChild(tr);
    });

    // Attach blur event listeners to save changes
    document.querySelectorAll('.editable-cell').forEach(cell => {
      cell.addEventListener('blur', handleCellEdit);
    });
  };

  const handleCellEdit = (e) => {
    const cell = e.target;
    const id = parseInt(cell.getAttribute('data-id'));
    const field = cell.getAttribute('data-field');
    const newValue = cell.innerText.trim();

    const itemIndex = currentData.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      currentData[itemIndex][field] = newValue;
      saveData();
    }
  };

  window.deleteRow = (id) => {
    if(confirm('Are you sure you want to delete this row?')) {
      currentData = currentData.filter(item => item.id !== id);
      saveData();
      renderTable();
    }
  };

  addRowBtn.addEventListener('click', () => {
    const newId = currentData.length > 0 ? Math.max(...currentData.map(i => i.id)) + 1 : 1;
    currentData.push({
      id: newId,
      question: "",
      answer: "",
      images: []
    });
    saveData();
    renderTable();
    // focus the new row's question cell
    const cells = document.querySelectorAll(`td[data-id="${newId}"][data-field="question"]`);
    if (cells.length > 0) cells[0].focus();
  });

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
