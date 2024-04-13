FROM node:19.5.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install -f
COPY . .
RUN npm run build
COPY .next ./.next
CMD ["npm", "run", "dev"]