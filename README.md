```bash
docker run -itd -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v /data:/var/lib/postgresql/data --name postgresql postgres
````

```bash
npx prisma migrate dev --name init
```

```bash
npm install bcryptjs
```

```bash
npm install -D @types/bcryptjs
```

