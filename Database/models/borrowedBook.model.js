import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import { bookModel } from "./book.model.js";
import { borrowerModel } from "./borrower.model.js";

export const borrowedBookModel = sequelize.define('borrowedBook', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Book: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'book',
            key: 'ISBN'
        }
    },
    Borrower: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'borrower',
            key: 'SSN'
        }
    },

  borrowedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
  },
  dueDate: {
      type: DataTypes.DATE,
      allowNull: false
  },
  returnedDate: {
      type: DataTypes.DATE,
      allowNull: true
  }
}, {
  timestamps: false // Disable timestamps
});

// borrowedBookModel.js
borrowedBookModel.belongsTo(bookModel, { foreignKey: 'Book', as: 'book' });
borrowedBookModel.belongsTo(borrowerModel, { foreignKey: 'Borrower', as: 'borrower' });
