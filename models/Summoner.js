const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Summoner extends Model {
    calculateWins() {
        this.win_value = this.wins / this.losses;
      
        if (this.rank == "I") {
          this.rank_value = 3;
        }
        if (this.rank == "II") {
          this.rank_value = 2;
        }
        if (this.rank == "III") {
          this.rank_value = 1.5;
        }
        if (this.rank == "IV") {
          this.rank_value = 1;
        }
        if (this.rank == "V") {
          this.rank_value = 0.5;
        }
      
        this.league_point_percent = this.points / 100;
      
        if (this.tier == "CHALLENGER") {
          this.tier_value = 20;
        }
        if (this.tier == "DIAMOND") {
          this.tier_value = 10;
        }
        if (this.tier == "PLATINUM") {
          this.tier_value = 6;
        }
        if (this.tier == "GOLD") {
          this.tier_value = 4;
        }
        if (this.tier == "SILVER") {
          this.tier_value = 3;
        }
        if (this.tier == "BRONZE") {
          this.tier_value = 2;
        }
        if (this.tier == "TIN") {
          this.tier_value = 1;
        }
        this.total_points = this.league_point_percent + this.rank_value + this.tier_value + this.win_value;
    return Summoner.update(
      {total_point:this.total_points},
      {where:{id:this.id}
    
    
    }
    )}
}

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
        },
        total_points: {
            type: DataTypes.FLOAT,
            allowNull: true,
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