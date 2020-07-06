import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class ProviderController {
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
        return res.status(400).json({ message: 'User already exists.' });

      const newUser = await User.create(req.body);
      const { id, name, email, provider } = newUser;

      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({
        errors: err,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const provider = await User.findAll({
        where: { provider: true },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'Avatar',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
        order: [['id', 'DESC']],
      });

      return res.json(provider);
    } catch (err) {
      return res.status(400).json({
        errors: err,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const provider = await User.findByPk(req.params.id);
      if (!provider)
        return res.status(400).json({ message: 'Provider not exists.' });

      const { id, name, email } = provider;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err,
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
        return res
          .status(400)
          .json({ message: 'Falha na validação dos campos' });

      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists)
          return res.status(400).json({ message: 'User already exists.' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword)))
        return res.status(401).json({ error: 'Password does not match.' });

      const { id, name, provider } = await user.update(req.body);
      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({
        errors: `Erro inesperado`,
        // errors: err.errors.map((erro) => erro.message),
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
        errors: err,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new ProviderController();
