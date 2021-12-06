import { Controller } from 'egg';

export default class AdminController extends Controller {
  public async addcourse() {
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

	public async deletecourse() {
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
				error: '课程id不能为空'
			}
		}
	}
}
