import UserRoles from '../models/UserRoles';

class UserRolesController {
  async index(req, res) {
    try {
      const userRoles = await UserRoles.findAll({
        attributes: ['user_id', 'role_id'],
        order: [['user_id, role_id', 'DESC']],
      });
      return res.json(userRoles);
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar as regras.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async show(req, res) {
    try {
      const userRoles = await UserRoles.findByPk(req.params.id);
      if (!userRoles)
        return res.status(400).json({ message: 'Permissão não encontrada.' });

      const { user_id, role_id } = userRoles;

      return res.json({ user_id, role_id });
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao pesquisar regra.',
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new UserRolesController();
