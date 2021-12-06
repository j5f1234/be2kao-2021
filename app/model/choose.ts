import {Model, INTEGER,DATE} from 'sequelize'
import { Application } from 'egg'

class Choose extends Model {
	id: number
	courseId: number
  userName: number
  day: number
  time: number
	readonly updatedAt: Date
	readonly createdAt: Date
}

export default ( app: Application) =>{
	Choose.init({
		id: {type: INTEGER, primaryKey: true, autoIncrement: true},
		courseId: INTEGER,
		userName: INTEGER,
		day: INTEGER,
		time: INTEGER,
    updatedAt: DATE,
    createdAt: DATE
	}, {
		sequelize: app.model,
		modelName: 'choose',
		underscored: true
	})
	return Choose
}