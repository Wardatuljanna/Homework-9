const pool = require('../config/db');

const getMovies = (req, res) => {
    pool.query(
        `SELECT * FROM movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error!' });
            return;
          }
          res.json(results.rows);
        }
      );
};

const getMovieById = (req, res) => {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
        return;
      }
      res.json(results.rows);
    }
  );
};

const createMovie = (req, res) => {
  const { title, genres, year, id } = req.body;
  pool.query(
      `SELECT * FROM movies WHERE id = $1`,
      [id],
      (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error!' });
              return;
          }
          if (results.rows.length > 0) {
              res.status(409).json({ message: 'ID sudah ada!' });
              return;
          }
          pool.query(
              `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4)`,
              [id, title, genres, year],
              (error, results) => {
                  if (error) {
                      console.error(error);
                      res.status(500).json({ message: 'Internal Server Error!' });
                      return;
                  }
                  res.status(201).json({
                      status: 'berhasil',
                  });
              }
          );
      }
  );
};

const deleteMovie = (req, res) => {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
        return;
      }
      res.status(201).json({
        status: 'berhasil',
      });
    }
  );
};

const updateMovie = (req, res) => {
  pool.query(
    `UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4`,
    [req.body.title, req.body.genres, req.body.year, req.body.id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
        return;
      }
      res.status(201).json({
        status: 'berhasil',
      });
    }
  );
};


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};