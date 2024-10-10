FROM mortezahatamikia/base-node

WORKDIR /gamehub/src/app

COPY package.json ./

# COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 6500

CMD npm run dev 