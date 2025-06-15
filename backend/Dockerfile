FROM node:20-alpine

WORKDIR /app

# On copie package.json ET package-lock.json
COPY package.json package-lock.json ./

# On installe avec ci pour un build reproductible
RUN npm ci --include=dev

# Puis on copie tout le reste
COPY . .

CMD ["npx", "ts-node-dev", "--respawn", "src/server.ts"]
