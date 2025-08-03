export const getMessageInfo = (status: number | string): string => {
    switch (status) {
        case 200:
            return '请求成功';
        case 400:
            return '请求错误，服务器未进行新建或修改数据的操作';
        case 401:
            return '用户没有权限（令牌、用户名、密码错误）';
        case 403:
            return '用户得到授权，但是访问是被禁止的';
        case 404:
            return '网络请求错误，未找到该资源';
        case 500:
            return '服务器发生错误，请检查服务器';
        case 501:
            return '网络未实现';
        case 502:
            return '网络错误';
        case 503:
            return '服务不可用，服务器暂时过载或维护';
        case 504:
            return '网络超时';
        default:
            return `连接错误${status}`;
    }
}