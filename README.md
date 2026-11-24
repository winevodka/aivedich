# Ai sẽ tới đích? 🐰🐱🐶🐻

Trò chơi giải đố dò đường (cable tracing puzzle) tương tác trên nền web, được xây dựng bằng **React 19, TypeScript, Vite, SVG Engine, Framer Motion, Tailwind CSS** và **Zustand**.

## ✨ Tính năng nổi bật
- **Sinh màn chơi vô hạn (Procedural Generation):** Đường đi được tạo ngẫu nhiên bằng đường cong Cubic Bézier mượt mà, không hardcode layout.
- **Hiệu ứng cầu vượt (Over-Under Bridge Crossings):** Tự động phát hiện giao điểm giữa các dây, cắt khoảng hở ở đường nằm dưới và vẽ cầu vồng ở đường nằm trên bằng SVG thuần.
- **4 mức độ khó:**
  - **Dễ:** ~8 giao cắt
  - **Trung bình:** ~15 giao cắt
  - **Khó:** ~25 giao cắt
  - **Chuyên gia:** ~35 giao cắt
- **Lưu tiến trình tự động:** Lưu Level, Điểm số và Kỷ lục cá nhân vào `localStorage` thông qua Zustand.
- **Hiệu ứng mượt mà:** Tích hợp Framer Motion (hover, rung lắc khi chọn sai, pháo hoa ăn mừng khi thắng).
- **Responsive:** Hiển thị tối ưu từ màn hình điện thoại (320px), máy tính bảng (768px) đến máy tính bàn (1440px).

## 🛠️ Công nghệ sử dụng
- **Framework:** React 19 + Vite
- **Ngôn ngữ:** TypeScript (Strict mode)
- **Đồ họa:** SVG Rendering Engine
- **Animation:** Framer Motion + `canvas-confetti`
- **Styling:** Tailwind CSS
- **State Management:** Zustand (kèm middleware `persist`)

## 🚀 Cài đặt & Chạy trên máy (Local)

1. **Clone repository:**
   ```bash
   git clone [https://github.com/winevodka/aivedich.git](https://github.com/winevodka/aivedich.git)
   cd aivedich
   