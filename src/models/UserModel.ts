import { ModelsInterface } from './../interfaces/ModelsInterface';
import { UserAttributes, UserInstance } from './UserModel';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as  Sequelize from 'sequelize';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string; // This two properties are created by sequelize
    updateAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    
    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            photo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: true,
                defaultValue: null
            }
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);                    
                }
            }
        });

        // In case of associates the code will look like this...
        User.associate = (models: ModelsInterface): void => {};

        User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
            return compareSync(password, encodedPassword);
        };

        return User;

};