const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Summoner extends Model {}

Summoner.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        riot_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tier: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'summoner'
    }
);

module.exports = Summoner;