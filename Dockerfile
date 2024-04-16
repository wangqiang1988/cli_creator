# 第一阶段：使用 Node.js 作为基础镜像，并克隆项目代码
FROM node:16 as builder

# 设置工作目录
WORKDIR /app

# 克隆项目代码
COPY . /app

# 进入项目目录

# 安装依赖
RUN npm install

RUN npm run build:prod

# 第二阶段：使用 Nginx 作为基础镜像，并配置运行环境
FROM nginx:1.15.12 as runtime

# 将构建好的静态文件复制到 Nginx 的默认 HTML 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 配置 Nginx
RUN echo "\
server {\n\
    listen *:8090;\n\
\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf
