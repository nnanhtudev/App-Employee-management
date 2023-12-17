#https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker

FROM node:20-alpine
#Setup environment node.js, version node20/alpine

WORKDIR /tudev/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

#. copy full src code, .paste /tudev/backend
COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]

#docker build --tag node-docker .
#docker run -p 8080:8080 -d node-docker