# backend/Dockerfile

FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Copy file cấu hình trước để tối ưu layer cache
COPY package*.json ./

# Cài đặt thư viện
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn
COPY . .

# Build dự án
RUN npm run build

# Chạy app (nếu dùng hot-reload: npm run start:dev)
CMD ["npm", "run", "start:dev"]
