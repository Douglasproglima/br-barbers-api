import * as Yup from 'yup';
import User from '../models/User';
import UserPermissions from '../models/UserPermissions';
import Permissions from '../models/Permissions';
import File from '../models/File';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body)))
        return res
          .status(400)
          .json({ message: 'Falha na validação dos campos' });

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
        message: 'Erro ao criar o usuário.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'provider', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'Avatar',
            attributes: ['id', 'name', 'path', 'url'],
            order: [['id', 'DESC']],
          },
          /*           {
            model: UserPermissions,
            as: 'user_permissions',
            attributes: ['user_id', 'permission_id', 'user_type'],
            order: [['permission_id', 'DESC']],
          }, */
          /* {
            model: UserPermissions,
            as: 'user_permissions',
            attributes: ['user_id', 'permission_id', 'user_type'],
            order: [['permission_id', 'DESC']],
            include: [
              {
                model: Permissions,
                as: 'permissions',
                attributes: ['id', 'description'],
                order: [['id', 'DESC']],
              },
            ],
          }, */
        ],
        order: [['id', 'DESC']],
      });
      console.log(users);
      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        message: `Erro aor realizar consulta: ${err}`,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'Avatar',
            attributes: ['id', 'name', 'path', 'url'],
            order: [['id', 'DESC']],
          },
        ],
        order: [['id', 'DESC']],
      });
      if (!user)
        return res.status(400).json({ message: 'Usuário não encontrado.' });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        message: `Erro aor realizar consulta: ${err}`,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        old_password: Yup.string().required().min(6),
        password: Yup.string()
          .min(6)
          .when('old_password', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ message: 'Falha na validação' });

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

      await user.update(req.body);
      const { id, name, provider, avatar } = await User.findByPk(req.userId, {
        include: [
          {
            model: File,
            as: 'Avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.json({ id, name, email, provider, avatar });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao atualizar os dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
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
