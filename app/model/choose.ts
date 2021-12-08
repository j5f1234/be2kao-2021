import {Model, INTEGER,DATE} from 'sequelize'
import { Application } from 'egg'

class Choose extends Model {
	id: number
	courseId: number
  userId: number
  day: number
  time: number
	readonly updatedAt: Date
	readonly createdAt: Date

	static associate: () => any
}

export default ( app: Application) =>{
	Choose.init({
		id: {type: INTEGER, primaryKey: true, autoIncrement: true},
		courseId: INTEGER,
		userId: INTEGER,
		day: INTEGER,
		time: INTEGER,
    updatedAt: DATE,
    createdAt: DATE
	}, {
		sequelize: app.model,
		modelName: 'choose',
		underscored: true
	})
	Choose.associate = ()=>{
		app.model.Choose.belongsTo(app.model.Course, {foreignKey: 'courseId', as: 'course'})
		app.model.Choose.belongsTo(app.model.User, {foreignKey: 'userId', as: 'user'})
	}

	return Choose
}