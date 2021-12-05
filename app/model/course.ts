import {Model, INTEGER,STRING,DATE} from 'sequelize'
import { Application } from 'egg'

class Course extends Model {
	id: number
	name: string
  day: number
  time: number
  capacity: number
	number: number
	readonly updatedAt: Date
	readonly createdAt: Date
}

export default ( app: Application) =>{
	Course.init({
		id: {type: INTEGER, primaryKey: true, autoIncrement: true},
		name: STRING,
		day: INTEGER,
		time: INTEGER,
		capacity: INTEGER,
		number: INTEGER,
    updatedAt: DATE,
    createdAt: DATE
	}, {
		sequelize: app.model,
		modelName: 'course',
		underscored: true
	})
	return Course
}