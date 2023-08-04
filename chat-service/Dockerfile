# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:18 AS development

# Specify Workin directory inside container
WORKDIR /app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./

# Install deps inside container
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

################
## PRODUCTION ##
################
# Build another image named production
FROM node:18 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /chat-service

COPY --from=development /app .

EXPOSE 5000

# run app
CMD [ "npm", "run", "start:dev"]