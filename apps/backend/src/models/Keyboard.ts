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
    },
  },
  {
    sequelize,
    tableName: 'keyboards',
    timestamps: true,
  }
);

export default Keyboard;
