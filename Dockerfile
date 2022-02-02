FROM node:lts-alpine3.14
WORKDIR .
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node","index.js"]

