FROM node:19-alpine
WORKDIR /app
RUN npm install -g bun
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
#ENV PORT 3000
CMD ["bun", "run", "start"]
