# Giai đoạn 1: Build ứng dụng
FROM node:22 AS builder

# Đặt thư mục làm việc chính
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependencies trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào Docker image
COPY ./ ./

# Build ứng dụng React/Vite
RUN npm run build

# Giai đoạn 2: Tạo image nhẹ chỉ để chạy ứng dụng
FROM node:22-slim

# Cài đặt serve để phục vụ ứng dụng
RUN npm install -g serve

# Tạo user non-root để chạy ứng dụng
USER node

# Đặt thư mục làm việc là /app
WORKDIR /app

# Copy kết quả build từ builder stage
COPY --from=builder /app/dist ./dist

# Mở cổng 3002 cho ứng dụng
EXPOSE 3002

# Chạy ứng dụng bằng serve
CMD ["serve", "-s", "dist", "-l", "3002"]
