import {Model, INTEGER,STRING,DATE} from 'sequelize'
import { Application } from 'egg'

class User extends Model {
	id: number
	name: string
	number: number
	password: string
	readonly updatedAt: Date
	readonly createdAt: Date
}

export default ( app: Application) =>{
	User.init({
		id: {type: INTEGER, primaryKey: true, autoIncrement: true},
		name: STRING,
		number: INTEGER,
		password: STRING,
    updatedAt: DATE,
    createdAt: DATE
	}, {
		sequelize: app.model,
		modelName: 'user',
		underscored: true
	})
}