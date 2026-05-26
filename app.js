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
      id: 1, stt: "1", banVe: "MẶT BẰNG ĐỊNH VỊ BULONG CHỜ CỘT\n(File đính kèm trang 17)",
      yeuCauNoiDung: "Bản vẽ chi tiết chân cột và chi tiết liên kết chưa có chỉ định chiều dày bản mã đế cột, gân.",
      yeuCauHinhAnh: [], traLoiNoiDung: "Chiều dày bản mã dày 25mm, chiều dày gân tăng cứng dày 10mm", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung thông tin", traLoiNote: ""
    },
    {
      id: 2, stt: "2", banVe: "MẶT BẰNG ĐỊNH VỊ BULONG CHỜ CỘT/\nMẶT BẰNG ĐỊNH VỊ CỘT TẦNG 1/\n(File đính kèm trang 17, 18)",
      yeuCauNoiDung: "Định vị bulong neo cột SC1 trục 4/A khác mặt bằng chân cột.",
      yeuCauHinhAnh: [], traLoiNoiDung: "Định vị cột điều chỉnh theo bản vẽ phần thân", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung thông tin", traLoiNote: ""
    },
    {
      id: 3, stt: "3", banVe: "MẶT BẰNG ĐỊNH VỊ BULONG CHỜ CỘT\n(File đính kèm trang 17)",
      yeuCauNoiDung: "Dim định vị cột không khớp với vị trí cột",
      yeuCauHinhAnh: [], traLoiNoiDung: "Dim lỗi, Nt xác định vị trí theo bản vẽ, nt điều chỉnh lại dim ở bản vẽ shop", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung thông tin", traLoiNote: ""
    },
    {
      id: 4, stt: "4", banVe: "MẶT BẰNG ĐỊNH VỊ BULONG CHỜ CỘT\n(File đính kèm trang 17)",
      yeuCauNoiDung: "Chi tiết chân cột không khớp tiết diện cột",
      yeuCauHinhAnh: [], traLoiNoiDung: "Vị trí cột đó là sc4\nH450x200 đã khớp bản vẽ, nt điều chỉnh lại dim", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung thông tin", traLoiNote: ""
    },
    {
      id: 5, stt: "5", banVe: "MẶT BẰNG KẾT CẤU MÁI 1\n(File đính kèm trang 19)",
      yeuCauNoiDung: "Các dầm dài không có chi tiết nối. Không phù hợp cho gia công/ vận chuyển/ lắp dựng",
      yeuCauHinhAnh: [], traLoiNoiDung: "Các dầm dài bị ngắt tại nút cột, NT xem chi tiết", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung chi tiết liên kết nối dầm", traLoiNote: ""
    },
    {
      id: 6, stt: "6", banVe: "",
      yeuCauNoiDung: "Chưa có mặt cắt khung (qua 3 loại mái)",
      yeuCauHinhAnh: [], traLoiNoiDung: "NT Xem kết hợp bản vẽ kiến trúc", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị cung cấp", traLoiNote: ""
    },
    {
      id: 7, stt: "7", banVe: "",
      yeuCauNoiDung: "Chi tiết dầm SB1A (trục 4-1400) bị chênh cao độ (do mặt bằng kiến trúc mái không đúng độ dốc)",
      yeuCauHinhAnh: [], traLoiNoiDung: "Vị trí này là dầm chéo.", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung mặt cắt vị trí này", traLoiNote: ""
    },
    {
      id: 8, stt: "8", banVe: "CHI TIẾT MẶT CẮT CANOPY\n(File đính kèm trang 24)",
      yeuCauNoiDung: "Vị trí cột và dầm mặt cắt 1-1 Không khớp với mặt bằng cột tầng 1; mặt bằng cột tầng 2 và dầm mái 1",
      yeuCauHinhAnh: [], traLoiNoiDung: "THEO BẢN VẼ MB, NT ĐIỀU CHỈNH LẠI MC Ở BẢN VẼ SHOP", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "12/05/2026", yeuCauNote: "Đề nghị bổ sung thông tin", traLoiNote: ""
    },
    {
      id: 9, stt: "9", banVe: "MẶT BẰNG MÁI A-1002",
      yeuCauNoiDung: "Mái 1 trục 3-4 không đúng độ dốc mái.",
      yeuCauHinhAnh: [], traLoiNoiDung: "ĐỀ NGHỊ NT CHỈ RÕ HƠN", traLoiHinhAnh: [], ghiChu: "Bản vẽ kiến trúc sai mặt bằng độ dốc mái; đã điều chỉnh theo kết cấu",
      trangThai: "Pending", ngayGhiNhan: "13/05/2026", yeuCauNote: "Đề nghị kiểm tra và bổ sung mặt cắt vị trí này", traLoiNote: ""
    },
    {
      id: 10, stt: "10", banVe: "MẶT BẰNG KẾT CẤU MÁI 1\n(File đính kèm trang 19)",
      yeuCauNoiDung: "Dầm SB4 và SD1 va chạm",
      yeuCauHinhAnh: [], traLoiNoiDung: "Dầm SB4 có thể hạ xuống 1 chút đảm bảo sd1 đặt lên", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "13/05/2026", yeuCauNote: "Đề nghị kiểm tra/ điều chỉnh", traLoiNote: ""
    },
    {
      id: 11, stt: "11", banVe: "MẶT BẰNG KẾT CẤU MÁI 2\n((File đính kèm trang 24)",
      yeuCauNoiDung: "Cao độ dầm và độ dốc dầm không khớp với kiến trúc (Mái hồi không đồng phẳng)",
      yeuCauHinhAnh: [], traLoiNoiDung: "NT XEM PHẢN HỒI TẠI BẢN VẼ ĐI KÈM, TRANG 24", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "13/05/2026", yeuCauNote: "Đề nghị kiểm tra/ điều chỉnh", traLoiNote: ""
    },
    {
      id: 12, stt: "12", banVe: "CHI TIẾT LIÊN KẾT 10\n(File đính kèm trang 19)",
      yeuCauNoiDung: "Liên kết không phù hợp kích thước tổng (3 phương) cấu kiện lớn không phù hợp gia công/ chế tạo/ lắp dựng",
      yeuCauHinhAnh: [], traLoiNoiDung: "NÚT LIÊN KẾT NÀY HÀN NHÀ MÁY, ĐẨY PHẦN NỐI RA CÁC DẦM XUNG QUANH", traLoiHinhAnh: [], ghiChu: "",
      trangThai: "Pending", ngayGhiNhan: "13/05/2026", yeuCauNote: "Đề nghị kiểm tra/ điều chỉnh", traLoiNote: ""
    }
  ];

  let currentData = [];

  const loadData = () => {
    const savedData = localStorage.getItem('rfi_qa_data_v3');
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
    localStorage.setItem('rfi_qa_data_v3', JSON.stringify(currentData));
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
