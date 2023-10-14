const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/users');
const { authentication } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email dari pengguna
 *           example: example@xxx.com
 *         password:
 *           type: string
 *           description: password dari pengguna
 *         gender:
 *           type: string
 *           description: Jenis Kelamin dari pengguna
 *           example: Female/Male
 *         role:
 *           type: string
 *           description: status dari pengguna
 *           example: Admin
 *         id:
 *           type: integer
 *           description: id dari pengguna
 *           example: 100
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Registrasi User berhasil!
 *       400:
 *         description: Email telah terdaftar atau ID sudah digunakan
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login user berhasil!
 *       401:
 *         description: email atau password salah!
 *       500:
 *         description: Internal Server Error!
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - MyAuth: []
 *     responses:
 *       200:
 *         description: Profil pengguna berhasil diambil!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error!
 */
router.get('/profile', authentication, (req, res) => {
  res.status(200).json({ user: req.user });
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     MyAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Jumlah pengguna yang akan dikembalikan
 *         required: false
 *         schema:
 *           type: integer
 *     security:
 *       - MyAuth: []
 *     responses:
 *       200:
 *         description: Pengguna berhasil diambil!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error!
 */
router.get('/', authentication, getUsers);

module.exports = router;