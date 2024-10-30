type merge<T> = {
    [K in keyof T]: T[K]
} & {}

type GetBlogInfoResult = {
	email: 'exist' | 'notExist',
	username: 'exist' | 'notExist',
  }
  
  type CheckBlogNewParams = {
	email?: string,
	username?: string,
  };
  
  type arg = Required<CheckBlogNewParams>
  type ResponseForParams<T extends CheckBlogNewParams> =
	T extends Pick<arg, 'email' | 'username'>
	? merge<Pick<GetBlogInfoResult, 'email' | 'username'>>
  
	: T extends Pick<arg, 'email'>
	? merge<Pick<GetBlogInfoResult, 'email'>>
  
	: T extends Pick<arg, 'username'>
	? merge<Pick<GetBlogInfoResult, 'username'>>
  
	: never


export class QueryRepository {
	constructor(
		private prisma: PrismaServiceAuth
	) {}
	async checkExistUser<T extends CheckBlogNewParams>(data: T): Promise<ResponseForParams<T>> {
		const { email, username } = data
	
		const result: Partial<GetBlogInfoResult> = {};
	
		if (email) {
		  await this.prisma.user.findUnique({ where: { email } })
		  result.email = data ? 'exist' : 'notExist';
		}
	
		if (username) {
		  const data = await this.prisma.user.findUnique({ where: { username } })
		  result.username = data ? 'exist' : 'notExist';
		}
	
		return result as ResponseForParams<T>;
	  }
}