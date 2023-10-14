const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/auth');
const { getMovies, getMovieById, createMovie, deleteMovie, updateMovie,} = require('../controllers/movies');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Manajemen Movie
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: judul dari film
 *           example: The Nun
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: genre dari film
 *           example: ["Adventure"]
 *         year:
 *           type: integer
 *           description: tahun rilis dari film
 *           example: 2023
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get movie
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Jumlah movie yang akan dikembalikan
 *     responses:
 *       200:
 *         description: Movies berhasil diambil!
 *       500:
 *         description: Internal Server Error!
 */
router.get('/', getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie berhasil diambil!
 *       404:
 *         description: Movie tidak ditemukan!
 *       500:
 *         description: Internal Server Error!
 */
router.get('/:id', getMovieById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Membuat sebuah movie film baru
 *     tags: [Movies]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie berhasil dibuat!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error!
 */
router.post('/', authentication, createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Menghapus movie berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari movie
 *         type: integer        
 *     security:
 *       - MyAuth: []
 *     responses:
 *       201:
 *         description: Movie berhasil dihapus!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie tidak ditemukan!
 *       500:
 *         description: Internal Server Error!
 */
router.delete('/:id', authentication, deleteMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update movie berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari movie
 *         type: integer      
  *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie berhasil diupdate!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie tidak ditemukan!
 *       500:
 *         description: Internal Server Error!
 */
router.put('/:id', authentication, updateMovie);

module.exports = router;