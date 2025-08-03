import { getGenre } from './genreService.js'
import { pool } from './pool.js'

export async function getFilmHasGenre(idFilm) {
    const [rows] = await pool.query(`
        SELECT g.id, g.label, g.format_path
        FROM memiliki_genres mg
        JOIN genres g
        ON mg.id_genre = g.id
        WHERE mg.id_series_film = ?
        `, [idFilm]
    )
    return rows
}

export async function getGenreHasSeriesFilm(idGenre) {
    const [rows] = await pool.query(`
        SELECT *
        FROM memiliki_genres mg
        JOIN series_film sf
        ON mg.id_series_film = sf.id
        WHERE mg.id_genre = ?
        `, [idGenre]
    )
    return rows
}

export async function addGenreToFilm(idFilm, idGenre) {
    const [rows] = await pool.query(`
        INSERT INTO memiliki_genres (
            id_series_film,
            id_genre
        ) VALUE (?,?)
        `, [idFilm, idGenre]
    )
    return await getGenre(idGenre)
}

export async function deleteGenreFromFilm(idFilm, idGenre) {
    const [rows] = await pool.query(`
        DELETE FROM memiliki_genres
        WHERE id_series_film = ? AND id_genre = ?
        `, [idFilm, idGenre]
    )
    
    const result = await rows.affectedRows
    if (result === 0) {
        const error = new Error("Genre not found");
        error.statusCode = 500;
        throw error;
    }
    return result;
}

export async function updateGenresToFilm(idFilm, idGenres) {
    let conn;
    try {
        conn = await pool.getConnection()

        // proses daapt melibatkan beberapa rows
        await conn.beginTransaction()

        await conn.query(`DELETE FROM memiliki_genres WHERE id_series_film = ?`, [idFilm])

        for (const idGenre of idGenres) {
            await conn.query(`INSERT INTO memiliki_genres (id_series_film, id_genre) VALUE (?,?)`, [idFilm, idGenre])
        }

        await conn.commit()

        console.log('Transaction berhasil.');
        return "Genres berhasil diperbarui."
    } catch (err) {
        conn.rollback()
        if (conn) {
            console.error('Rollback transaction karena error:', err);
        } else {
            console.error('Connection error:', err);
        }
        return "Gagal memperbarui genre."
    } finally {
        conn.release()
    }
}