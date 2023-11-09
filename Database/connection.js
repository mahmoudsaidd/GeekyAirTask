
import { Sequelize } from "sequelize";

export const sequelize= new Sequelize('geekyair','root','', {
    host: "localhost",
    dialect: "mysql"
});


export const createTable= () => {
    return sequelize.sync().then(result => {
        console.log("connected to database");

    }).catch(err => {
        console.log(err);
    })
}

