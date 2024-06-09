import Cookies from 'js-cookie';

const cookieName = "token";

function getUserToken(): string | undefined {
    const token: string | undefined = Cookies.get(cookieName);
    return token;
}

function removeUserToken(): void {
    Cookies.remove(cookieName);
}

export {
    removeUserToken,
    getUserToken
}