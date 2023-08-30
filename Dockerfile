FROM node:16-alpine
WORKDIR '/src/app'

COPY package.json .
RUN npm install
RUN mkdir node_modules/.vite && chmod -R 777 node_modules/.vite
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]