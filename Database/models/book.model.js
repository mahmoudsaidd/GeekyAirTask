import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";

export const bookModel = sequelize.define('book', {
   
    ISBN: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    
    title: { type: DataTypes.STRING, allowNull: false },

    author: { type: DataTypes.STRING, allowNull: false },

    availableQuantity: { type: DataTypes.INTEGER, allowNull: true },

    shelfLocation: { type: DataTypes.STRING, allowNull: false },

});

