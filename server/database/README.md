# Database SQL Files

## Files

### 1. `schema.sql`
Database schema dengan semua tabel, foreign keys, dan indexes.

### 2. `seed.sql`
Sample data untuk testing (users, posts, comments).

## Cara Menggunakan

### Inject dari Host Machine (jika punya psql):
```bash
# Schema only
psql -h localhost -p 5432 -U postgres -d kinetixpro -f server/database/schema.sql

# Schema + Seed data
psql -h localhost -p 5432 -U postgres -d kinetixpro -f server/database/schema.sql
psql -h localhost -p 5432 -U postgres -d kinetixpro -f server/database/seed.sql
```

### Inject dari Docker Container:
```bash
# Copy file ke container
docker cp server/database/schema.sql kinetixpro-db:/tmp/schema.sql
docker cp server/database/seed.sql kinetixpro-db:/tmp/seed.sql

# Execute SQL
docker exec -i kinetixpro-db psql -U postgres -d kinetixpro -f /tmp/schema.sql
docker exec -i kinetixpro-db psql -U postgres -d kinetixpro -f /tmp/seed.sql
```

### Inject Langsung (piping):
```bash
# Windows PowerShell
Get-Content server/database/schema.sql | docker exec -i kinetixpro-db psql -U postgres -d kinetixpro

# Linux/Mac
cat server/database/schema.sql | docker exec -i kinetixpro-db psql -U postgres -d kinetixpro
```

## Notes

- Password di seed.sql adalah hash dari "password123"
- Seed data hanya untuk testing, jangan digunakan di production
- Schema sudah termasuk CASCADE delete untuk foreign keys
- Indexes sudah dibuat untuk performa query yang optimal
