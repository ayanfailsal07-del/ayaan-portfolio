# Portfolio Contact Backend (Node.js + Express + MongoDB)

Contact form ke messages MongoDB me store karta hai.

## Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. `.env.example` ko copy karke `.env` banao:

```bash
cp .env.example .env
```

3. MongoDB Atlas (free) se connection string lo:
   - https://www.mongodb.com/atlas par free account banao
   - Database create karo (e.g. `portfolio`)
   - Database Access → user/password banao
   - Network Access → 0.0.0.0/0 allow karo
   - Connect → connection string ko `.env` me `MONGODB_URI` me paste karo

4. Server chalao:

```bash
npm start
```

Server `http://localhost:5000` par chalega.

## API

- `POST /api/contact` — naya message save karo
- `GET /api/messages` — last 50 messages dekho

## Frontend

`index.html` me form submit hote hi `POST http://localhost:5000/api/contact` par jaata hai. Server online hone par message MongoDB me save hota hai.
