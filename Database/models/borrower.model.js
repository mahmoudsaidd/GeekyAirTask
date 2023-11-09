import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";

 export const borrowerModel = sequelize.define('borrower', {

    SSN: { type: DataTypes.STRING, allowNull: false, primaryKey: true },

    name: { type: DataTypes.STRING, allowNull: false },

    email: { type: DataTypes.STRING, allowNull: false },

    registeredDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }

});