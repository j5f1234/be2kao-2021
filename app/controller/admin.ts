import { Controller } from 'egg';

export default class AdminController extends Controller {
  public async addCourse() {
    const { ctx } = this;
		try {
			ctx.validate({
				name: 'string',
				capacity: 'number'
			})
		} catch(e){
      ctx.body = {
        success: false,
        error: '参数错误'
      }
      return
    }

		const {name,capacity} = ctx.request.body
		let course = await ctx.model.Course.create({name,capacity: capacity})
		ctx.body = {
			success: true,
			data: {
				id: course.id
			}
		}
  }

	public async deleteCourse() {
		const {ctx} = this
		const {id} = ctx.params
		if (id){
			let id2 = parseInt(id)
			let isCourse = await ctx.model.Course.findByPk(id2)
			if (isCourse){
				ctx.model.Course.destroy({where: {id: id2}})
				ctx.body = {
					success: true
				}
			} 
			else {
				ctx.body = {
					success: false,
					error: '该课程不存在'
				}
			}
		}
		else {
			ctx.body = {
				success: false,
				error: '参数错误'
			}
		}
	}

	public async changeCourseInfo(){
		const {ctx} = this
		try {
			ctx.validate({
				id: 'number',
			})
		} catch(e){
				ctx.body = {
					success: false,
					error: '参数错误'
				}
			return
		}

		const {id,name,capacity,number,day,time} = ctx.request.body

		let course = await ctx.model.Course.findByPk(id)
		if(course){
			if (name || capacity || number || day || time){
				if (name != null){
					if (typeof name == 'string'){
						course.name = name
						ctx.body = {
							success: true,
						}
					}
					else {
						ctx.body = {
							success: false,
							error: 'name参数类型错误'
						}
						return
					}
				}		

				if (capacity != null){
					if (typeof capacity == 'number'){
						course.capacity = capacity
						ctx.body = {
							success: true
						}
					}
					else {
						ctx.body = {
							success: false,
							error: 'capacity参数类型错误'
						}
						return
					}
				}

				if (number != null){
					if (typeof number == 'number'){
						course.number = number
						ctx.body = {
							success: true
						}
					}
					else {
						ctx.body = {
							success: false,
							error: 'number参数类型错误'
						}
						return
					}
				}

				if (day != null){
					if (typeof day == 'number' && day <= 7 && day >= 1){
						course.day = day
						ctx.body = {
							success: true
						}
					}
					else{
						ctx.body = {
							success: false,
							error: 'day参数类型错误或超出范围(1-7)'
						}
						return
					}
				}
				if (time != null){
					if (typeof time == 'number' && time <= 5 && time >= 1){
						course.time = time
						ctx.body = {
							success: true
						}
					}
					else{ 
						ctx.body = {
							success: false,
							error: 'time参数类型错误或超出范围（1-5）'
						}
						return
					}
				}
				course.save()
			}
			else {
				ctx.body = {
					success: false,
					error: '要修改的参数不能为空'
				}
			}
		}
		else {
			ctx.body = {
				success: false,
				error: '课程不存在'
			}
		}
	}

	public async userList() {
		const {ctx} = this
		const {page,limit} = ctx.query
		if (page || limit){
			let page2 = parseInt(page)
			let limit2 = parseInt(limit)
			const data = await ctx.model.User.findAndCountAll({
				limit: limit2,
				offset: (page2-1) * limit2
			})
			ctx.body = {
				success: true,
				data: {
					total: data.count,
					list: data.rows
				}
			}
		} 
		else {
			ctx.body = {
				success: false,
				error: '参数错误'
			}
		}

	}
}
