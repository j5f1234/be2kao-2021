import { Controller } from 'egg';

export default class UserController extends Controller {
  public async register() {
    const { ctx } = this;
		try {
			ctx.validate({
				name: 'string',
				number: 'string',
				password: 'string'
			})
		} catch(e){
      ctx.body = {
        success: false,
        error: '参数错误'
      }
      return
    }

		const {name,number,password} = ctx.request.body	
		let isRegister = await ctx.model.User.findOne({where: {number: number}})
		if (isRegister) {
			ctx.body = {
				success: false,
				error: '该用户已注册',
			}
		}
		else{
			let user = await ctx.model.User.create({name,number,password,admin: 0})
			ctx.body = {
				success: true,
				data: {
					userId: user.id,
					number: number,
					name: name,
				}
			}
			ctx.session.id = user.id
		}
  }

	public async login() {
		const {ctx} = this
		try {
			ctx.validate({
				number: 'string',
				password: 'string'
			})
		} catch(e){
      ctx.body = {
        success: false,
        error: '参数错误'
      }
      return
    }

		const {number,password} = ctx.request.body	
		let isLogin = await ctx.model.User.findOne({
			where: {number: number},
		})

		if (isLogin) {
			if (isLogin.password == password) {
				if (ctx.session.id && ctx.session.id != isLogin.id){
					ctx.body = {
						success: false,
						error: '另一位用户正在使用，请将其登出后再重新登陆'
					}
				}
				else{
					if ( ctx.session.id == isLogin.id) {
						ctx.body = {
							success: false,
							error: '该用户已登录'
						}
					}
					else {
						ctx.session.id = isLogin.id
						ctx.body = {
							success: true,
							data: {
								userId: isLogin.id,
								number: number,
								name: isLogin.name
							}
						}
					}
				}
			}
			else{
				ctx.body = {
					success: false,
					error: '学号/工号或密码错误'
				}
			}
		}
		else {
			ctx.body = {
				success: false,
				error: '该用户未注册'
			}
		}
	}

	public async logout() {
		const {ctx} = this
		
		if(ctx.session.id){
			ctx.body = {
				success: true,
				data: {
					login: true
				}
			}
		}
		else{
			ctx.body = {
				success: true,
				data: {
					login: false
				}
			}
		}
		ctx.session.id = null
	}

	public async courseInfo() {
		const {ctx} = this
		const {page,limit} = ctx.query
		if (page || limit){
			let page2 = parseInt(page)
			let limit2 = parseInt(limit)
			const data = await ctx.model.Course.findAndCountAll({
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
