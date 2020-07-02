import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists)
        return res
          .status(400)
          .json({ message: 'Já existe um usuário com este e-mail.' });

      const newUser = await User.create(req.body);
      const { id, name, email, provider } = newUser;

      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'provider'],
        order: [['id', 'DESC']],
      });
      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res.status(400).json({ message: 'Usuário não encontrado.' });

      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const { email, oldPassword } = req.body;
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists)
          return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword)))
        return res.status(401).json({ message: 'A senha está incorreta.' });

      const { id, name, provider } = await user.update(req.body);
      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await user.destroy();
      return res.json({
        message: 'Registro deletado com sucesso',
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new UserController();
