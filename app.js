import express from 'express'
import * as uc from './controllers/userController.js'
import * as sfc from './controllers/seriesFilmController.js'
import * as gc from './controllers/genreController.js'
import * as emc from './controllers/episodeMovieController.js'
import * as pc from './controllers/packageController.js'
import * as pmc from './controllers/paymentMethodController.js'
import * as oc from './controllers/orderController.js'
import * as mlc from './controllers/myListController.js'
import * as hgc from './controllers/hasGenreController.js'
import { getFilmHasGenre, getGenreHasSeriesFilm, addGenreToFilm, deleteGenreFromFilm, updateGenresToFilm } from './services/memiliki-genre.js'

import dotenv from 'dotenv'
dotenv.config();

const app = express()

app.use(express.json())

// User
app.post("/users", uc.addUser)
app.get("/users", uc.getUsers)
app.get("/users/:id", uc.getUser)
app.patch("/users/:id", uc.updateUser)
app.delete("/users/:id", uc.deleteUser)

// SeriesFilm
app.post("/films", sfc.addSeriesFilm)
app.get("/films", sfc.getSeriesFilms)
app.get("/films/:id", sfc.getSeriesFilm)
app.put("/films/:id", sfc.updateSeriesFilm)
app.delete("/films/:id", sfc.deleteSeriesFilm)

// EpisodeMovie
app.post("/episodes", emc.addEpisodeMovie)
app.get("/episodes", emc.getEpisodeMovies)
app.get("/episodes/:id", emc.getEpisodeMovie)
app.put("/episodes/:id", emc.updateEpisodeMovie)
app.delete("/episodes/:id", emc.deleteEpisodeMovie)

// Genres
app.post("/genres", gc.addGenre)
app.get("/genres", gc.getGenres)
app.get("/genres/:id", gc.getGenre)
app.put("/genres/:id", gc.updateGenre)
app.delete("/genres/:id", gc.deleteGenre)

// Paket
app.post("/packages", pc.addPackage)
app.get("/packages", pc.getPackages)
app.get("/packages/:id", pc.getPackage)
app.put("/packages/:id", pc.updatePackage)
app.delete("/packages/:id", pc.deletePackage)

// Pembayaran
app.post("/payments", pmc.addPayment)
app.get("/payments", pmc.getPayments)
app.get("/payments/:id", pmc.getPayment)
app.put("/payments/:id", pmc.updatePayment)
app.delete("/payments/:id", pmc.deletePayment)

// Orders
app.post("/orders", oc.addOrder)
app.get("/orders", oc.getOrders)
app.get("/orders/:id", oc.getOrder)
app.put("/orders/:id", oc.updateOrder)
app.delete("/orders/:id", oc.deleteOrder)

// daftar-saya
app.post("/my-list/users/:id", mlc.addToMyList)
app.get("/my-list", mlc.getMyLists)
app.get("/my-list/users/:id", mlc.getMyListFilms)
app.get("/my-list/films/:id", mlc.getMyListUsers)
app.put("/my-list/users/:id", mlc.updateMyList)
app.delete("/my-list/users/:id/films/:filmId", mlc.deleteFromMyList)

// memiliki_genre
app.post("/films/:id/genres", hgc.addGenreToFilm)
app.post("/films/:id/genres", async (req, res) => {
    const { id } = req.params;
    const { genreId } = req.body;
    const genre = await addGenreToFilm(id, genreId)
    res.send(genre)
})

app.get("/films/:id/genres", async (req, res) => {
    const { id } = req.params;
    const genre = await getFilmHasGenre(id)
    res.send(genre)
})

app.get("/genres/:id/films", async (req, res) => {
    const { id } = req.params;
    const genre = await getGenreHasSeriesFilm(id)
    res.send(genre)
})

app.put("/films/:id/genres/", async (req, res) => {
    const { id } = req.params;
    const { genreIds } = req.body;
    const genre = await updateGenresToFilm(id, genreIds)
    res.send(genre)
})

app.delete("/films/:id/genres/:genreId", async (req, res) => {
    const { id, genreId } = req.params;
    const genre = await deleteGenreFromFilm(id, genreId)
    res.send(genre)
})






// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('========== Something broke! ==========')
})


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})