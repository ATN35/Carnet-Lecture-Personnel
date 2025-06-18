# 📚 Carnet de Lecture Personnel

Bienvenue sur **Carnet de Lecture Personnel**, une application web fullstack qui vous permet de gérer vos lectures : ajoutez, modifiez, commentez et organisez vos livres préférés.

🌐 **Accès au site** : [https://carnetdelecture.duckdns.org](https://carnetdelecture.duckdns.org)

---

## ✨ Fonctionnalités principales

- Ajout de livres avec titre, auteur, note, date, avis personnalisé
- Suppression et modification des livres
- Ajout de **commentaires liés à chaque livre**
- Authentification sécurisée (inscription, connexion, mot de passe)
- Tableau de bord personnel pour les réglages du compte
- Interface admin pour gérer tous les comptes
- Cookies sécurisés (HttpOnly, Secure, SameSite)
- Interface responsive en Tailwind CSS

---

## 🧱 Stack technique

### Frontend
- **Next.js 15** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**

### Backend
- **Node.js** + **Express**
- **PostgreSQL** (via Docker)
- **JWT**, **Bcrypt**, **cookie-parser**, **Helmet**, **CORS**

### DevOps
- Déploiement sur **VPS personnel**
- Nom de domaine géré via **DuckDNS**
- **Nginx** utilisé comme reverse proxy
- Backend et base de données **conteneurisés avec Docker**

---

## 🚀 Lancer le projet en local

### Prérequis
- Node.js
- Docker et Docker Compose
- PostgreSQL (ou via Docker)

### Backend

```bash
git clone https://github.com/ton-utilisateur/carnet-lecture-backend.git
cd carnet-lecture-backend
cp .env.example .env
# Remplir les variables d’environnement PostgreSQL et JWT
docker compose up --build
