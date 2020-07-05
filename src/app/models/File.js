import Sequelize, { Model } from 'sequelize';
import AppConfig from '../../config/appConfig';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${AppConfig.url}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default File;
