import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface KeyboardAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface KeyboardCreationAttributes {
  name: string;
}

class Keyboard extends Model<KeyboardAttributes, KeyboardCreationAttributes> {}

Keyboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty',
        },
        len: {
          args: [1, 255],
          msg: 'Name must be between 1 and 255 characters',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'keyboards',
    timestamps: true,
  }
);

export default Keyboard;
