import * as Yup from 'yup';
import Permissions from '../models/Permissions';

class PermissionController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        display_name: Yup.string().required(),
        description: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res
          .status(400)
          .json({ message: 'Falha na validação dos campos' });

      const permissionExists = await Permissions.findOne({
        where: { description: req.body.description },
      });

      if (permissionExists)
        return res
          .status(400)
          .json({ message: 'Já existe uma permissão com essa descrição.' });

      const newPermissions = await Permissions.create(req.body);
      const { id, description } = newPermissions;

      return res.json({ id, description });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao criar permissão.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const permissions = await Permissions.findAll({
        attributes: ['id', 'description'],
        order: [['id', 'DESC']],
      });
      return res.json(permissions);
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar permissão.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const permissions = await Permissions.findByPk(req.params.id);
      if (!permissions)
        return res.status(400).json({ message: 'Permissão não encontrada.' });

      const { id, description } = permissions;

      return res.json({ id, description });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar permissões.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        display_name: Yup.string().required(),
        description: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ message: 'Falha na validação' });

      const permissions = await Permissions.findByPk(req.params.id);
      if (!permissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const { id, description } = await permissions.update(req.body);
      return res.json({ id, description });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao atualizar os dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const permissions = await Permissions.findByPk(req.params.id);
      if (!permissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await permissions.destroy();
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

export default new PermissionController();
