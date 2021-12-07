import { Controller } from 'egg';

export default class CourseController extends Controller {
  public async courseChoose() {
    const { ctx } = this
		try{
			ctx.validate({
				courseId: 'number',
				day: 'number',
				time: 'number'
			})
		} catch(e) {
			ctx.body = {
				success: false,
				error: '参数错误'
			}
			return
		}

		const{courseId,day,time} = ctx.request.body
		let isChoose = await ctx.model.Choose.findOne({
			where: {userId: ctx.session.id,day:day,time:time}
		})
		let isCourse = await ctx.model.Course.findOne({
			where: {id: courseId}
		})
		if (isCourse){
			if (isCourse.day != null && isCourse.time != null && isCourse.number != null && isCourse.capacity != null){
				if (isCourse.capacity >= isCourse.number+1) {
					if (isChoose){
						ctx.body = {
							success: false,
							error: '你在该时间段已经有课'
						}
					}
					else {
						if (isCourse.day == day && isCourse.time == time){
							ctx.model.Choose.create({
								userId: ctx.session.id,
								courseId: courseId,
								day:day,
								time:time
							})
							ctx.model.Course.increment('number', {by:1, where: {id: courseId}})
							ctx.body = {
								success:true
							}
						}
						else{
							ctx.body = {
								success: false,
								error: '课程信息错误'
							}
						}
					}
				}
				else {
					ctx.body = {
						success: false,
						error: '该课程已满'
					}
				}
			}
			else {
				ctx.body = {
					success: false,
					error: '该课程信息不完整，暂不能选'
				}
			}
		}
		else {
			ctx.body = {
				success: false,
				error: '该课程不存在'
			}
		}
  }

	public async courseDropOut() {
		const {ctx} = this
		const {id} = ctx.params
		if (id != null){			
			let id2 = parseInt(id)
			let isChoose = await ctx.model.Choose.findOne({where: {id: id2, userId: ctx.session.id}})
			if (isChoose) {
				ctx.model.Course.decrement('number',{by:1,where: {id: isChoose.courseId}})
				ctx.model.Choose.destroy({where: {id: id2}})
				ctx.body = {
					success: true
				}
			}
			else {
				ctx.body = {
					success: false,
					error: '未找到该用户的此次选课记录'
				}
			}
		}
		else {
			ctx.body = {
				success: false,
				error: '参数不能为空'
			}
		}
	}

	public async scheduldInfo() {
		const{ctx} = this
		const {page,limit} = ctx.query
		if (page && limit) {
			let page2 = parseInt(page)
			let limit2 = parseInt(limit)
			const data = await ctx.model.Choose.findAndCountAll({
				where: {userId: ctx.session.id},
				limit: limit2,
				offset: (page2-1) * limit2,
				include: [{
					model: ctx.model.Course,
					as: 'course',
					attributes: ['id','name','day','time','capacity','number'],
					required: false
				}] 
			})
			if(data){
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
		else{
			ctx.body = {
				success: false,
				error: '未查到选课记录'
			}
		}
	}
}
