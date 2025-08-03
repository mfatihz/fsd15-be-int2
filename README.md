# REST API
Mission Back End Intermediate 2

Stack: `express`, `mysql2`, `dotenv`, `bcrypt`

## .env

variabel pada `.env`:
```
PORT=5000

MYSQL_HOST='127.0.0.1'
MYSQL_USER='root'
MYSQL_PASSWORD=''
MYSQL_DATABASE='chill_app'
```

## Database
Untuk membuat database, jalankan script `migration/create-database.sql` dalam MySQL.

(Optional) Untuk mengisikan data dummy ke dalam database, jalankan script berikut dalam MySQL:
- `migration/insert-into-series_film.sql`
- `migration/insert-into-episode_movie.sql`
- `migration/insert-into-genres.sql`

Contoh dummy data lainnya untuk `POST` atau `UPDATE` dapat dilihat pada folder `migration/data/`
