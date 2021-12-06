import { Context } from "egg"

export default async function(ctx: Context, next: ()=> Promise<any>){
	let isAdmin = await ctx.model.User.findByPk(ctx.session.id)
	if (isAdmin != null){
		if (isAdmin.admin){
			await next()
		}
		else {
			ctx.body = {
				success: false,
				error: '你不是管理员，无法进行操作',
			}
		}
	}
	else {
		ctx.body = {
			success: false,
			error: '该用户不存在或未登录'
		}
	}
}
