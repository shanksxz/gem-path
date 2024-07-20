FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY prisma ./prisma

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]