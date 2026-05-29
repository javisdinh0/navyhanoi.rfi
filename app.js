import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { userPermissions } from "./permissions.js";

const firebaseConfig = {
  apiKey: "AIzaSyB885dxTZZUiu9lnQ9PsKnCTljfgMRFqoo",
  authDomain: "navyhanoi.firebaseapp.com",
  projectId: "navyhanoi",
  storageBucket: "navyhanoi.firebasestorage.app",
  messagingSenderId: "53561018696",
  appId: "1:53561018696:web:0a19f13a102e3b706d0b7d",
  measurementId: "G-YHFR3CCKPV",
  // Providing fallback databaseURL in case it isn't inferred automatically
  databaseURL: "https://navyhanoi-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'rfi_data_v4');

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
  let currentUserLevel = 3;

  const loadData = () => {
    // Listen to Firebase Realtime Database
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        currentData = data;
        renderTable();
      } else {
        // If DB is completely empty, migrate from localStorage if it exists
        const savedData = localStorage.getItem('rfi_qa_data_v3');
        if (savedData) {
          currentData = JSON.parse(savedData);
        } else {
          currentData = [...defaultQAData];
        }
        saveData();
      }
    }, (error) => {
      console.error("Lỗi đọc dữ liệu Firebase:", error);
      alert("Lỗi đọc dữ liệu: " + error.message + " - Bạn vui lòng kiểm tra lại 'databaseURL' và 'Security Rules' trong Firebase nhé.");
    });
  };

  const saveData = () => {
    // Write to Firebase Realtime Database
    set(dbRef, currentData).catch(error => {
      console.error("Lỗi lưu dữ liệu Firebase:", error);
      alert("Không thể lưu dữ liệu đồng bộ. Có thể bạn chưa chỉnh 'Security Rules' của Firebase thành true.");
    });
  };

  // Check login state
  const checkAuth = () => {
    const userEmail = localStorage.getItem('rfi_user_email');
    if (userEmail) {
      currentUserLevel = userPermissions[userEmail] || 3;
      authSection.style.display = 'none';
      appSection.style.display = 'flex';
      userEmailDisplay.textContent = userEmail + ` (Level ${currentUserLevel})`;
      loadData();
    } else {
      authSection.style.display = 'flex';
      appSection.style.display = 'none';
    }
  };

  // Render Table
  const renderTable = () => {
    tableBody.innerHTML = '';
    
    if (currentUserLevel > 1) {
      addRowBtn.style.display = 'none';
    } else {
      addRowBtn.style.display = 'inline-block';
    }
    
    currentData.forEach((item, index) => {
      const isEditable = (field) => {
        if (currentUserLevel === 1) return true;
        if (currentUserLevel === 2) {
          const level2Fields = ['traLoiNoiDung', 'traLoiHinhAnh', 'ghiChu', 'trangThai', 'traLoiNote'];
          if (level2Fields.includes(field)) {
            // Check 24h lock rule
            if (item.firstEditTime) {
              const hoursPassed = (Date.now() - item.firstEditTime) / (1000 * 60 * 60);
              if (hoursPassed >= 24) return false;
            }
            return true;
          }
        }
        return false;
      };

      const getEditableAttr = (field) => isEditable(field) ? 'contenteditable="true"' : '';
      const getEditableClass = (field, baseClass = '') => isEditable(field) ? `editable-cell ${baseClass}` : `locked-cell ${baseClass}`;
      const getImageClass = (field) => isEditable(field) ? 'image-cell' : 'locked-image-cell';
      const getTabIndex = (field) => isEditable(field) ? 'tabindex="0"' : '';

      // Render Images helper
      const renderImages = (imagesArray, field) => {
        if (!imagesArray || imagesArray.length === 0) return '';
        let html = `<div class="thumbnail-container">`;
        imagesArray.forEach((img, idx) => {
          html += `
            <div class="thumbnail-wrapper" onclick="openImage('${img.src}')" title="Click to view full size">
              <img src="${img.src}" alt="Image" loading="lazy" />
              ${isEditable(field) ? `<button class="delete-img-btn" onclick="event.stopPropagation(); deleteImage(${item.id}, '${field}', ${idx})" title="Xóa ảnh này">X</button>` : ''}
            </div>
          `;
        });
        html += `</div>`;
        return html;
      };

      const getTitle = (field) => {
        if (item.editors && item.editors[field]) {
          const ed = item.editors[field];
          if (typeof ed === 'string') {
            return `title="(Sửa bởi: ${ed})"`;
          } else if (ed.email && ed.timestamp) {
            const timeStr = new Date(ed.timestamp).toLocaleString('vi-VN', { 
              hour: '2-digit', minute: '2-digit', 
              day: '2-digit', month: '2-digit', year: 'numeric' 
            });
            return `title="(Sửa bởi: ${ed.email} lúc ${timeStr})"`;
          }
        }
        return '';
      };

      // Clean old editor notes from html if any exist (migration from previous version)
      const cleanNote = (htmlStr) => {
        if (!htmlStr) return '';
        return htmlStr.replace(/<span class="editor-note">.*?<\/span>/g, '');
      };

      // Create Row 1
      const tr1 = document.createElement('tr');
      tr1.innerHTML = `
        <td class="${getEditableClass('stt')}" ${getTitle('stt')} style="text-align:center; font-weight:bold;" data-field="stt" data-id="${item.id}" ${getEditableAttr('stt')}>${cleanNote(item.stt)}</td>
        <td class="${getEditableClass('banVe')}" ${getTitle('banVe')} style="text-align:center; font-weight:bold;" data-field="banVe" data-id="${item.id}" ${getEditableAttr('banVe')}>${cleanNote(item.banVe).replace(/\n/g, '<br>')}</td>
        <td class="${getEditableClass('yeuCauNoiDung')}" ${getTitle('yeuCauNoiDung')} data-field="yeuCauNoiDung" data-id="${item.id}" ${getEditableAttr('yeuCauNoiDung')}>${cleanNote(item.yeuCauNoiDung)}</td>
        <td class="${getImageClass('yeuCauHinhAnh')}" data-field="yeuCauHinhAnh" data-id="${item.id}" ${getTabIndex('yeuCauHinhAnh')}>${renderImages(item.yeuCauHinhAnh, 'yeuCauHinhAnh')}</td>
        <td class="${getEditableClass('traLoiNoiDung')}" ${getTitle('traLoiNoiDung')} data-field="traLoiNoiDung" data-id="${item.id}" ${getEditableAttr('traLoiNoiDung')}>${cleanNote(item.traLoiNoiDung)}</td>
        <td class="${getImageClass('traLoiHinhAnh')}" data-field="traLoiHinhAnh" data-id="${item.id}" ${getTabIndex('traLoiHinhAnh')}>${renderImages(item.traLoiHinhAnh, 'traLoiHinhAnh')}</td>
        <td class="${getEditableClass('ghiChu')}" ${getTitle('ghiChu')} data-field="ghiChu" data-id="${item.id}" ${getEditableAttr('ghiChu')}>${cleanNote(item.ghiChu)}</td>
      `;
      tableBody.appendChild(tr1);

      // Create Row 2
      const tr2 = document.createElement('tr');
      tr2.className = 'border-dotted-top';
      const statusClass = item.trangThai === 'Pending' ? 'status-pending' : 'status-done';
      tr2.innerHTML = `
        <td style="text-align:center; padding: 4px;">
          <select class="status-select ${statusClass}" data-id="${item.id}" ${isEditable('trangThai') ? '' : 'disabled'}>
            <option value="Pending" ${item.trangThai === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Done" ${item.trangThai === 'Done' ? 'selected' : ''}>Done</option>
          </select>
        </td>
        <td class="${getEditableClass('ngayGhiNhan')}" ${getTitle('ngayGhiNhan')} style="text-align:center; font-weight:bold;" data-field="ngayGhiNhan" data-id="${item.id}" ${getEditableAttr('ngayGhiNhan')}>${cleanNote(item.ngayGhiNhan)}</td>
        <td class="${getEditableClass('yeuCauNote', 'bg-orange-light')}" ${getTitle('yeuCauNote')} data-field="yeuCauNote" data-id="${item.id}" ${getEditableAttr('yeuCauNote')}>${cleanNote(item.yeuCauNote)}</td>
        <td></td>
        <td class="${getEditableClass('traLoiNote', 'bg-orange-light')}" ${getTitle('traLoiNote')} data-field="traLoiNote" data-id="${item.id}" ${getEditableAttr('traLoiNote')}>${cleanNote(item.traLoiNote)}</td>
        <td></td>
        <td></td>
      `;
      tableBody.appendChild(tr2);
    });

    // Attach blur event listeners to save changes
    document.querySelectorAll('.editable-cell').forEach(cell => {
      cell.addEventListener('blur', handleCellEdit);
      // store old value to check if it really changed
      cell.addEventListener('focus', (e) => {
        e.target.setAttribute('data-old', e.target.innerHTML);
      });
    });

    // Attach change event for status select
    document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const itemIndex = currentData.findIndex(item => item.id === id);
        if (itemIndex > -1) {
          currentData[itemIndex].trangThai = e.target.value;
          
          // Track 24h lock and detailed editor info
          const userEmail = localStorage.getItem('rfi_user_email');
          if (userEmail) {
            if (!currentData[itemIndex].editors) currentData[itemIndex].editors = {};
            currentData[itemIndex].editors['trangThai'] = { email: userEmail, timestamp: Date.now() };
            
            if (currentUserLevel === 2 && !currentData[itemIndex].firstEditTime) {
              currentData[itemIndex].firstEditTime = Date.now();
            }
          }
          
          // Update classes dynamically without re-rendering the whole table
          if (e.target.value === 'Pending') {
            e.target.classList.add('status-pending');
            e.target.classList.remove('status-done');
          } else {
            e.target.classList.add('status-done');
            e.target.classList.remove('status-pending');
          }
          
          saveData();
        }
      });
    });

    // Attach paste event for image cells
    document.querySelectorAll('.image-cell').forEach(cell => {
      cell.addEventListener('paste', handleImagePaste);
    });
  };

  const handleCellEdit = (e) => {
    const cell = e.target;
    const oldHtml = cell.getAttribute('data-old');
    let newHtml = cell.innerHTML;
    
    // Check if content actually changed
    if (oldHtml !== newHtml) {
      const id = parseInt(cell.getAttribute('data-id'));
      const field = cell.getAttribute('data-field');
      const userEmail = localStorage.getItem('rfi_user_email');
      
      // Clean up any old editor notes from previous version
      newHtml = newHtml.replace(/<span class="editor-note">.*?<\/span>/g, '');
      
      const itemIndex = currentData.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        currentData[itemIndex][field] = newHtml;
        if (userEmail) {
          if (!currentData[itemIndex].editors) {
            currentData[itemIndex].editors = {};
          }
          currentData[itemIndex].editors[field] = { email: userEmail, timestamp: Date.now() };
          
          if (currentUserLevel === 2 && ['traLoiNoiDung', 'traLoiHinhAnh', 'ghiChu', 'trangThai', 'traLoiNote'].includes(field)) {
            if (!currentData[itemIndex].firstEditTime) {
              currentData[itemIndex].firstEditTime = Date.now();
            }
          }
        }
        saveData();
        renderTable(); // Re-render to update tooltips
      }
    }
  };

  const handleImagePaste = (e) => {
    e.preventDefault();
    const cell = e.currentTarget;
    const id = parseInt(cell.getAttribute('data-id'));
    const field = cell.getAttribute('data-field');
    
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const itemIndex = currentData.findIndex(i => i.id === id);
          if (itemIndex > -1) {
            if (!currentData[itemIndex][field]) {
              currentData[itemIndex][field] = [];
            }
            currentData[itemIndex][field].push({
              src: event.target.result,
              alt: "Pasted Image"
            });
            
            // Track 24h lock and detailed editor info
            const userEmail = localStorage.getItem('rfi_user_email');
            if (userEmail) {
              if (!currentData[itemIndex].editors) currentData[itemIndex].editors = {};
              currentData[itemIndex].editors[field] = { email: userEmail, timestamp: Date.now() };
              
              if (currentUserLevel === 2 && ['traLoiNoiDung', 'traLoiHinhAnh', 'ghiChu', 'trangThai', 'traLoiNote'].includes(field)) {
                if (!currentData[itemIndex].firstEditTime) {
                  currentData[itemIndex].firstEditTime = Date.now();
                }
              }
            }

            saveData();
            renderTable();
          }
        };
        reader.readAsDataURL(blob);
        break; // handle one image at a time
      }
    }
  };

  window.deleteImage = (id, field, idx) => {
    if(confirm('Are you sure you want to delete this image?')) {
      const itemIndex = currentData.findIndex(item => item.id === id);
      if (itemIndex > -1 && currentData[itemIndex][field]) {
        currentData[itemIndex][field].splice(idx, 1);
        
        // Track 24h lock and detailed editor info
        const userEmail = localStorage.getItem('rfi_user_email');
        if (userEmail) {
          if (!currentData[itemIndex].editors) currentData[itemIndex].editors = {};
          currentData[itemIndex].editors[field] = { email: userEmail, timestamp: Date.now() };
          
          if (currentUserLevel === 2 && ['traLoiNoiDung', 'traLoiHinhAnh', 'ghiChu', 'trangThai', 'traLoiNote'].includes(field)) {
            if (!currentData[itemIndex].firstEditTime) {
              currentData[itemIndex].firstEditTime = Date.now();
            }
          }
        }
        
        saveData();
        renderTable();
      }
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

  // PDF Export using native print (more reliable, vector text, proper page breaks)
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ZIP Export for Images
  const downloadZipBtn = document.getElementById('download-zip-btn');
  if (downloadZipBtn) {
    downloadZipBtn.addEventListener('click', () => {
      if (typeof JSZip === 'undefined') {
        alert("Thư viện nén file chưa được tải. Vui lòng thử lại sau.");
        return;
      }
      
      const zip = new JSZip();
      let imageCount = 0;

      currentData.forEach((item) => {
        const stt = item.stt ? item.stt.trim() : item.id;
        
        if (item.yeuCauHinhAnh && item.yeuCauHinhAnh.length > 0) {
          item.yeuCauHinhAnh.forEach((img, index) => {
            if (img.src && img.src.startsWith('data:image')) {
              const base64Data = img.src.split(',')[1];
              zip.file(`${stt}_YC_${index + 1}.jpg`, base64Data, {base64: true});
              imageCount++;
            }
          });
        }

        if (item.traLoiHinhAnh && item.traLoiHinhAnh.length > 0) {
          item.traLoiHinhAnh.forEach((img, index) => {
            if (img.src && img.src.startsWith('data:image')) {
              const base64Data = img.src.split(',')[1];
              zip.file(`${stt}_TL_${index + 1}.jpg`, base64Data, {base64: true});
              imageCount++;
            }
          });
        }
      });

      if (imageCount === 0) {
        alert("Không tìm thấy hình ảnh nào trong bảng để tải về.");
        return;
      }

      downloadZipBtn.textContent = "Đang nén...";
      downloadZipBtn.disabled = true;

      zip.generateAsync({type:"blob"}).then((content) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "RFI_Images.zip";
        link.click();
        
        downloadZipBtn.textContent = "Tải Ảnh (ZIP)";
        downloadZipBtn.disabled = false;
      }).catch(err => {
        console.error("Lỗi khi nén file:", err);
        alert("Có lỗi xảy ra khi nén file ảnh.");
        downloadZipBtn.textContent = "Tải Ảnh (ZIP)";
        downloadZipBtn.disabled = false;
      });
    });
  }

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rfi_user_email');
    emailInput.value = '';
    checkAuth();
  });

  // Initial check
  checkAuth();
});

// Global function to open image in modal instead of new tab (fixes data: URI block issue)
window.openImage = function(src) {
  let modal = document.getElementById('image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.9);display:flex;justify-content:center;align-items:center;z-index:9999;cursor:zoom-out;backdrop-filter:blur(5px);';
    
    const img = document.createElement('img');
    img.id = 'image-modal-img';
    img.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border:2px solid rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.5);';
    modal.appendChild(img);
    
    modal.onclick = () => {
      modal.style.display = 'none';
    };
    
    document.body.appendChild(modal);
  }
  
  const img = document.getElementById('image-modal-img');
  img.src = src;
  modal.style.display = 'flex';
};
