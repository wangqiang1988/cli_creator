# 第一阶段：使用 Node.js 作为基础镜像，并克隆项目代码
FROM node:16 as builder

# 设置工作目录
WORKDIR /app

# 克隆项目代码
COPY . /app
# 进入项目目录

# 安装依赖
RUN npm install

EXPOSE 9528

# 运行开发服务器
CMD ["npm", "run", "dev"]