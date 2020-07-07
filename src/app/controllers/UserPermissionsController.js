import * as Yup from 'yup';
import UserPermissions from '../models/UserPermissions';

class UserPermissionsController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.number().required(),
        permission_id: Yup.number().required(),
        user_type: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res
          .status(400)
          .json({ message: 'Falha na validação dos campos' });

      const userPermissionsExists = await UserPermissions.findOne({
        where: {
          user_id: req.body.user_id,
          permission_id: req.body.permission_id,
        },
      });

      if (userPermissionsExists)
        return res
          .status(400)
          .json({ message: 'Já existe registro com as mesmas informações.' });

      const newUserPermissions = await UserPermissions.create(req.body);
      const { user_id, permission_id } = newUserPermissions;

      return res.json({ user_id, permission_id });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao criar regra.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const userPermissions = await UserPermissions.findAll({
        attributes: ['user_id', 'permission_id', 'user_type'],
        order: [['user_id', 'DESC']],
      });
      return res.json(userPermissions);
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar as dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const userPermissions = await UserPermissions.findByPk(req.params.id);
      if (!userPermissions)
        return res.status(400).json({ message: 'Permissão não encontrada.' });

      const { role_id, permission_id, user_type } = userPermissions;

      return res.json({ role_id, permission_id, user_type });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.number().required(),
        permission_id: Yup.number().required(),
        user_type: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ message: 'Falha na validação' });

      const userPermissions = await UserPermissions.findByPk({
        where: {
          user_id: req.params.user_id,
          permission_id: req.params.permission_id,
        },
      });
      if (!userPermissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const {
        user_id,
        permission_id,
        user_type,
      } = await UserPermissions.update(req.body);
      return res.json({ user_id, permission_id, user_type });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao atualizar os dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const userPermissions = await UserPermissions.findByPk({
        where: {
          user_id: req.params.user_id,
          permission_id: req.params.permission_id,
        },
      });
      if (!userPermissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await userPermissions.destroy();
      return res.json({
        message: 'Registro deletado com sucesso',
      });
    } catch (err) {
      return res.status(400).json({
        erros: ['Erro ao deletar registro.'],
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new UserPermissionsController();
