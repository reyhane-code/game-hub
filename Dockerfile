FROM mortezahatamikia/base-node

WORKDIR /gamehub/src/app

COPY package.json ./

# COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 3002

CMD npm run dev 