const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: { 
            type:DataTypes.STRING,
            allownull: false, 
        }
    }, 
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            // //We use the beforeCreate() hook to execute the bcrypt hash function on the plaintext password.
            // The async keyword is used as a prefix to the function that contains the asynchronous function
            async beforeCreate(newUserData) {
                // await can be used to prefix the async function, which will then gracefully assign the value from the response to the newUserData's password property
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                // The newUserData is then returned to the application with the hashed password.
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;