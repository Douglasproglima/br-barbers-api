import * as Yup from 'yup';
import RolePermissions from '../models/RolePermissions';

class RolePermissionsController {
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

      const rolesPermissionsExists = await RolesPermissions.findOne({
        where: { description: req.body.description },
      });

      if (rolesPermissionsExists)
        return res
          .status(400)
          .json({ message: 'Já existe uma regra com essa descrição.' });

      const newRolesPermissions = await RolesPermissions.create(req.body);
      const { id, description } = newRolesPermissions;

      return res.json({ id, description });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao criar regra.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const rolesPermissions = await RolePermissions.findAll({
        attributes: ['role_id', 'permission_id'],
        order: [['role_id', 'DESC']],
      });
      return res.json(rolesPermissions);
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar as regras.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const rolesPermissions = await RolePermissions.findByPk(req.params.id);
      if (!rolesPermissions)
        return res.status(400).json({ message: 'Permissão não encontrada.' });

      const { role_id, permission_id } = rolesPermissions;

      return res.json({ role_id, permission_id });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar regra.',
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

      const rolesPermissions = await RolePermissions.findByPk(req.params.id);
      if (!rolesPermissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const { role_id, permission_id } = await RolePermissions.update(req.body);
      return res.json({ role_id, permission_id });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao atualizar os dados.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const rolesPermissions = await RolePermissions.findByPk(req.params.id);
      if (!rolesPermissions) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await rolesPermissions.destroy();
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

export default new RolePermissionsController();
