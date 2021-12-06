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
		if (isChoose){
			ctx.body = {
				success: false,
				error: '你在该时间段已经有课'
			}
		}
		else {
			ctx.model.Choose.create({
				userId: ctx.session.id,
				courseId: courseId,
				day:day,
				time:time
			})
		}
    
  }
}
