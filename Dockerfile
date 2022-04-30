FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --omit=optional && npm cache clean --force
ENV PATH=/opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY --chown=node:node . .

CMD [ "node", "index.js" ]
