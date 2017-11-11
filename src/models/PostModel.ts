import { ModelsInterface } from './../interfaces/ModelsInterface';
import { type } from 'os';
import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { PostAttributes } from './PostModel';
import * as Sequelize from 'sequelize';
export interface PostAttributes {    
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updateAt?: string;
}

export interface PostsIntance extends Sequelize.Instance<PostAttributes> {}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostsIntance, PostAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    });

    Post.associate = (models: ModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    };

    return Post;

};