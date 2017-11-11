import { UserAttributes, UserInstance } from './UserModel';
import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import * as  Sequelize from 'sequelize';
export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}