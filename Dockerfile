FROM node:lts-alpine3.14
WORKDIR .
COPY . .
RUN npm install
RUN npm run build 
EXPOSE 8000
CMD [ "npm","start" ]