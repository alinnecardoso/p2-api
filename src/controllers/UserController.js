const User = require('../models/User');
const Logger = require('../services/logger');

class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  async index(req, res) {
    try {
      const users = await User.findAll();
      Logger.info('Lista de usuários recuperada com sucesso');
      return res.json(users);
    } catch (error) {
      Logger.error('Erro ao listar usuários', { error: error.message });
      return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  }

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
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   */
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        Logger.warn('Usuário não encontrado', { id: req.params.id });
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      Logger.info('Usuário encontrado com sucesso', { id: req.params.id });
      return res.json(user);
    } catch (error) {
      Logger.error('Erro ao buscar usuário', { error: error.message });
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }

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
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Dados inválidos
   */
  async store(req, res) {
    try {
      const { name, email } = req.body;
      const user = await User.create({ name, email });
      Logger.info('Usuário criado com sucesso', { id: user.id });
      return res.status(201).json(user);
    } catch (error) {
      Logger.error('Erro ao criar usuário', { error: error.message });
      return res.status(400).json({ message: 'Erro ao criar usuário' });
    }
  }

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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   */
  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        Logger.warn('Usuário não encontrado para atualização', { id: req.params.id });
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      await user.update(req.body);
      Logger.info('Usuário atualizado com sucesso', { id: req.params.id });
      return res.json(user);
    } catch (error) {
      Logger.error('Erro ao atualizar usuário', { error: error.message });
      return res.status(400).json({ message: 'Erro ao atualizar usuário' });
    }
  }

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
   *     responses:
   *       204:
   *         description: Usuário removido com sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        Logger.warn('Usuário não encontrado para remoção', { id: req.params.id });
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      await user.destroy();
      Logger.info('Usuário removido com sucesso', { id: req.params.id });
      return res.status(204).send();
    } catch (error) {
      Logger.error('Erro ao remover usuário', { error: error.message });
      return res.status(500).json({ message: 'Erro ao remover usuário' });
    }
  }
}

module.exports = new UserController(); 