# THPT Vocab – Flashcard từ vựng Tiếng Anh THPTQG
Web tĩnh cho GitHub Pages. Giao diện vở học sinh + dashboard.

## Thêm bộ thẻ mỗi ngày
1. Tạo file `.js` (tên không dấu, không khoảng trắng, vd `2025-01-03-technology.js`) theo mẫu trong `data/decks/`.
2. Upload vào thư mục `data/decks/` trên GitHub. Xong!
   GitHub Action tự cập nhật `data/manifest.js` sau ~30 giây (vào Settings → Actions → General → Workflow permissions: chọn *Read and write*).
   Không dùng Action thì chạy `node tools/build-manifest.js` rồi upload `data/manifest.js`.

Cùng `topic` thì các bộ tự gom vào một chủ đề. Mẫu từ: `{word, pos, ipa, vi, example}` (pos/ipa/example có thể bỏ).

## Phím tắt
Học: Space lật · ←/→ chưa thuộc/đã thuộc · Ctrl hoặc S nghe · L đổi chiều · Space×2 ở màn kết quả: ôn từ sai.
Quiz: 1–4 chọn đáp án · Enter/Space câu tiếp.

## Lặp lại ngắt quãng
Hộp Leitner 0–5, ôn lại sau 0/1/3/7/14/30 ngày. Thuộc = hộp ≥ 3. Tiến độ lưu trong localStorage của trình duyệt. Ngày thi: sửa `js/config.js` hoặc bấm vào ô đếm ngược.
