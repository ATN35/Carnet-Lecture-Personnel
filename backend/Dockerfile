FROM node:20

WORKDIR /app

# Copie les fichiers de dépendances
COPY package.json package-lock.json ./

# Installe toutes les dépendances (inclut devDependencies, donc ts-node-dev)
RUN npm install

# Copie le reste de l'application
COPY . .

# Lance le serveur en développement
CMD ["npx", "ts-node-dev", "--respawn", "src/server.ts"]
