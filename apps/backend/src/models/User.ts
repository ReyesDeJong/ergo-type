import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes {
  email: string;
  password: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
        len: {
          args: [8, 255],
          msg: 'Password must be between 8 and 255 characters',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
