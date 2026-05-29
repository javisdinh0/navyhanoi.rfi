export const userPermissions = {
  // Cấp độ 1: Toàn quyền (sửa toàn bộ bảng, thêm hàng, xóa hàng)
  "dinhvietdung.amc@gmail.com": 1,
  
  // Cấp độ 2: Chỉ được trả lời (chỉ sửa các cột Trả lời, Ghi chú, Trạng thái)
  "anhnguyendinh3308@outlook.com": 2,
  
  // Cấp độ 3: Chỉ xem (không sửa được bất kỳ cột nào). 
  // Tất cả các email không có trong danh sách này sẽ tự động được gán cấp độ 3.
  "guest@gmail.com": 3
};
