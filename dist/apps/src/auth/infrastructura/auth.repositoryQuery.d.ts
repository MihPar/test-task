type merge<T> = {
    [K in keyof T]: T[K];
} & {};
type GetBlogInfoResult = {
    email: 'exist' | 'notExist';
    username: 'exist' | 'notExist';
};
type CheckBlogNewParams = {
    email?: string;
    username?: string;
};
type arg = Required<CheckBlogNewParams>;
type ResponseForParams<T extends CheckBlogNewParams> = T extends Pick<arg, 'email' | 'username'> ? merge<Pick<GetBlogInfoResult, 'email' | 'username'>> : T extends Pick<arg, 'email'> ? merge<Pick<GetBlogInfoResult, 'email'>> : T extends Pick<arg, 'username'> ? merge<Pick<GetBlogInfoResult, 'username'>> : never;
export declare class QueryRepository {
    private prisma;
    constructor(prisma: PrismaServiceAuth);
    checkExistUser<T extends CheckBlogNewParams>(data: T): Promise<ResponseForParams<T>>;
}
export {};
