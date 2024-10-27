const BAD_REQUEST = 400
const NOT_FOUND = 404
const CONFLICT = 409
const INTERNAL_SERVER_ERROR = 500
const CREATED = 201
const SUCCESS = 200
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const OK = 'OK'
const ISO_8601_REGEX = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
const ALL_ACCESS = '*'

const BASE64_IMG_REGEX = /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/]+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
const BASE64_TXT_REGEX = /^data:image\/plain;base64,[A-Za-z0-9+/]+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
const BASE64_VIDEO_REGEX = /^data:video\/(mp4|avi|mov|wmv|flv|webm);base64,[A-Za-z0-9+/]+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;


const contentTable = {
    'text': (str) => {
        return new RegExp(BASE64_TXT_REGEX).test(str)
    },
    'images': (str) => {
        return new RegExp(BASE64_IMG_REGEX).test(str)
    },
    'videos': (str) => {
        return new RegExp(BASE64_VIDEO_REGEX).test(str)
    }
}

module.exports = {
    BASE64_IMG_REGEX,
    BASE64_TXT_REGEX,
    BASE64_VIDEO_REGEX,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    SUCCESS,
    NOT_FOUND,
    CREATED,
    UNAUTHORIZED,
    OK,
    CONFLICT,
    ISO_8601_REGEX, 
    ALL_ACCESS,
    FORBIDDEN,
    contentTable
}