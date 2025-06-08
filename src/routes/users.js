const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: 1
 *                     name: Maria Silva
 *                     email: maria@email.com
 *                     createdAt: '2025-06-08T18:00:00.000Z'
 *                     updatedAt: '2025-06-08T18:00:00.000Z'
 *                   - id: 2
 *                     name: João Souza
 *                     email: joao@email.com
 *                     createdAt: '2025-06-08T18:01:00.000Z'
 *                     updatedAt: '2025-06-08T18:01:00.000Z'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/users', UserController.index);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: 1
 *                   name: Maria Silva
 *                   email: maria@email.com
 *                   createdAt: '2025-06-08T18:00:00.000Z'
 *                   updatedAt: '2025-06-08T18:00:00.000Z'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/users/:id', UserController.show);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@email.com
 *           examples:
 *             exemplo:
 *               value:
 *                 name: Maria Silva
 *                 email: maria@email.com
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: 3
 *                   name: Maria Silva
 *                   email: maria@email.com
 *                   createdAt: '2025-06-08T18:10:00.000Z'
 *                   updatedAt: '2025-06-08T18:10:00.000Z'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/users', UserController.store);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@email.com
 *           examples:
 *             exemplo:
 *               value:
 *                 name: Maria Silva
 *                 email: maria@email.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: 1
 *                   name: Maria Silva
 *                   email: maria@email.com
 *                   createdAt: '2025-06-08T18:00:00.000Z'
 *                   updatedAt: '2025-06-08T18:20:00.000Z'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/users/:id', UserController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.delete('/users/:id', UserController.destroy);

module.exports = router; 