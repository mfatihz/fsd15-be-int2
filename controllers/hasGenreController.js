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