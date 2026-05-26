document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  const appSection = document.getElementById('app-section');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const logoutBtn = document.getElementById('logout-btn');
  const userEmailDisplay = document.getElementById('user-email-display');
  const tableBody = document.getElementById('qa-table-body');
  const addRowBtn = document.getElementById('add-row-btn');

  // Initial Mock Data matching new form
  const defaultQAData = [
    {
      id: 1,
      stt: "1",
      banVe: "MẶT BẰNG ĐỊNH VỊ BULONG CHỜ CỘT\n(File đính kèm trang 17)",
      yeuCauNoiDung: "Bản vẽ chi tiết chân cột và chi tiết liên kết chưa có chỉ định chiều dày bản mã đế cột, gân.",
      yeuCauHinhAnh: [],
      traLoiNoiDung: "Chiều dày bản mã dày 25mm, chiều dày gân tăng cứng dày 10mm",
      traLoiHinhAnh: [],
      ghiChu: "",
      
      trangThai: "Pending",
      ngayGhiNhan: "12/05/2026",
      yeuCauNote: "Đề nghị bổ sung thông tin",
      traLoiNote: ""
    }
  ];

  let currentData = [];

  const loadData = () => {
    const savedData = localStorage.getItem('rfi_qa_data_v2');
    if (savedData) {
      currentData = JSON.parse(savedData);
      renderTable();
    } else {
      currentData = [...defaultQAData];
      saveData();
      renderTable();
    }
  };

  const saveData = () => {
    localStorage.setItem('rfi_qa_data_v2', JSON.stringify(currentData));
  };

  // Check login state
  const checkAuth = () => {
    const userEmail = localStorage.getItem('rfi_user_email');
    if (userEmail) {
      authSection.style.display = 'none';
      appSection.style.display = 'flex';
      userEmailDisplay.textContent = userEmail;
      loadData();
    } else {
      authSection.style.display = 'flex';
      appSection.style.display = 'none';
    }
  };

  // Render Table
  const renderTable = () => {
    tableBody.innerHTML = '';
    
    currentData.forEach((item, index) => {
      // Render Images helper
      const renderImages = (imagesArray) => {
        if (!imagesArray || imagesArray.length === 0) return '';
        let html = `<div class="thumbnail-container">`;
        imagesArray.forEach(img => {
          html += `
            <div class="thumbnail-wrapper" onclick="openImage('${img.src}')" title="Click to view full size">
              <img src="${img.src}" alt="Image" loading="lazy" />
            </div>
          `;
        });
        html += `</div>`;
        return html;
      };

      // Create Row 1
      const tr1 = document.createElement('tr');
      tr1.innerHTML = `
        <td class="editable-cell" style="text-align:center; font-weight:bold;" data-field="stt" data-id="${item.id}" contenteditable="true">${item.stt || ''}</td>
        <td class="editable-cell" style="text-align:center; font-weight:bold;" data-field="banVe" data-id="${item.id}" contenteditable="true">${(item.banVe || '').replace(/\n/g, '<br>')}</td>
        <td class="editable-cell" data-field="yeuCauNoiDung" data-id="${item.id}" contenteditable="true">${item.yeuCauNoiDung || ''}</td>
        <td>${renderImages(item.yeuCauHinhAnh)}</td>
        <td class="editable-cell" data-field="traLoiNoiDung" data-id="${item.id}" contenteditable="true">${item.traLoiNoiDung || ''}</td>
        <td>${renderImages(item.traLoiHinhAnh)}</td>
        <td class="editable-cell" data-field="ghiChu" data-id="${item.id}" contenteditable="true">${item.ghiChu || ''}</td>
        <td style="text-align:center;">
          <button class="btn-delete" onclick="deleteRow(${item.id})" title="Delete row">X</button>
        </td>
      `;
      tableBody.appendChild(tr1);

      // Create Row 2
      const tr2 = document.createElement('tr');
      tr2.className = 'border-dotted-top';
      tr2.innerHTML = `
        <td class="editable-cell" style="text-align:center; font-weight:bold;" data-field="trangThai" data-id="${item.id}" contenteditable="true">${item.trangThai || ''}</td>
        <td class="editable-cell" style="text-align:center; font-weight:bold;" data-field="ngayGhiNhan" data-id="${item.id}" contenteditable="true">${item.ngayGhiNhan || ''}</td>
        <td class="editable-cell bg-orange-light" data-field="yeuCauNote" data-id="${item.id}" contenteditable="true">${item.yeuCauNote || ''}</td>
        <td></td>
        <td class="editable-cell bg-orange-light" data-field="traLoiNote" data-id="${item.id}" contenteditable="true">${item.traLoiNote || ''}</td>
        <td></td>
        <td></td>
        <td></td>
      `;
      tableBody.appendChild(tr2);
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
      stt: `${newId}`,
      banVe: "",
      yeuCauNoiDung: "",
      yeuCauHinhAnh: [],
      traLoiNoiDung: "",
      traLoiHinhAnh: [],
      ghiChu: "",
      trangThai: "Pending",
      ngayGhiNhan: new Date().toLocaleDateString('en-GB'),
      yeuCauNote: "",
      traLoiNote: ""
    });
    saveData();
    renderTable();
    // focus the new row's banVe cell
    const cells = document.querySelectorAll(`td[data-id="${newId}"][data-field="banVe"]`);
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
