import * as Yup from 'yup';
import Roles from '../models/Roles';

class RoleController {
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

      const rolesExists = await Roles.findOne({
        where: { description: req.body.description },
      });

      if (rolesExists)
        return res
          .status(400)
          .json({ message: 'Já existe uma regra com essa descrição.' });

      const newRoles = await Roles.create(req.body);
      const { id, description } = newRoles;

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
      const roles = await Roles.findAll({
        attributes: ['id', 'description'],
        order: [['id', 'DESC']],
      });
      return res.json(roles);
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar as regras.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const roles = await Roles.findByPk(req.params.id);
      if (!roles)
        return res.status(400).json({ message: 'Permissão não encontrada.' });

      const { id, description } = roles;

      return res.json({ id, description });
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

      const roles = await Roles.findByPk(req.params.id);
      if (!roles) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      const { id, description } = await roles.update(req.body);
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
      const roles = await Roles.findByPk(req.params.id);
      if (!roles) {
        return res.status(400).json({
          erros: ['Nenhum registro encontrado'],
        });
      }

      await roles.destroy();
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

export default new RoleController();
