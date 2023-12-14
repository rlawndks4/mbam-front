import $ from 'jquery';
import { EditorState } from "draft-js"
import theme from '../styles/theme';
import axios from 'axios';
import { Icon } from '@iconify/react';

const test = true;

//export const backUrl = "http://localhost:8001";
export const backUrl = "https://mago1004.com:8443";

export const frontUrl = "https://mago1004.com";
//export const frontUrl = "http://localhost:3000";

export const logoSrc = '/assets/images/test/logo.png';
export const defaultImageSrc = '/assets/images/test/default-image.png';
//http://weare-first.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}
export const KAKAO_CLIENT_ID = "5c686a9c9a72a12ef2ef700e07d03b31";
export const KAKAO_REDIRECT_URI = `${frontUrl}/oauth/callback/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: `마사지밤 ▼`, link: '/', icon: <img src={logoSrc} className='menu-icon' alt="#" style={{ width: 'auto' }} />, activeIcon: <img src={logoSrc} className='menu-icon' alt="#" style={{ width: 'auto' }} />, className: 'master-dropdown-btn', allowList: ['/'] },
    { name: '내주변', link: '/shop-list?is_around=1', icon: <Icon icon='mdi:map-marker-check-outline' className='menu-icon' />, activeIcon: <Icon icon='mdi:map-marker-check-outline' color={theme.color.background1} className='menu-icon' />, className: '', allowList: ['/shop-list?is_around=1'], is_location_href: true },
    { name: '커뮤니티', link: '/community-list/freeboard', icon: <Icon icon='clarity:chat-bubble-line' className='menu-icon' />, activeIcon: <Icon icon='clarity:chat-bubble-line' color={theme.color.background1} className='menu-icon' />, className: '', allowList: ['/community-list'] },
    { name: '제휴문의', link: '/add-shop', icon: <Icon icon='mdi:comment-question-outline' className='menu-icon' />, activeIcon: <Icon icon='mdi:comment-question-outline' color={theme.color.background1} className='menu-icon' />, className: '', allowList: ['/add-shop'] },
    { name: '고객센터', link: '/add-community/request', icon: <Icon icon='ph:siren' className='menu-icon' />, activeIcon: <Icon icon='ph:siren' color={theme.color.background1} className='menu-icon' />, className: 'service-dropdown-btn', allowList: ['/add-community/request'] },
];

export const axiosInstance = axios.create({
    baseURL: `/`,
    timeout: 30000,
});

export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];


export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const getCommunityCategoryFormat = (en, ko) => {
    return {
        en: en,
        ko: ko
    }
}
export const communityCategoryList = [
    { table: 'freeboard', name: '자유게시판', is_write: true },
    { table: 'anonymous', name: '익명게시판', is_write: true },
    { table: 'greeting', name: '가입인사', is_write: true },
    { table: 'education', name: '창업교육', is_write: true },

    { table: 'shop_review', name: '방문후기', },
    { table: 'shop_event', name: '업체이벤트', },
    { table: 'shop_offer', name: '구인구직', },
    { table: 'shop_trade', name: '샵매매', },

    { table: 'notice', name: '공지사항', },
    { table: 'faq', name: '자주묻는질문', },
    { table: 'event', name: '이벤트', },
    { table: 'blog', name: '공식블로그', },
    { table: 'request', name: '문의하기', },
]
export const columnObjFormat = (name, width, type, column) => {
    return {
        name: name,
        width: width,
        type: type,
        column: column,
    }
}
export const objHistoryListContent = {
    freeboard: {
        title: "자유게시판",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    anonymous: {
        title: "익명게시판",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    greeting: {
        title: "가입인사",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    education: {
        title: "창업교육",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    shop_review: {
        title: "방문후기",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('업체명', '', 'text', 'shop_name'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    s_review: {
        title: "방문후기",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    shop_offer: {
        title: "구인구직",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('업체명', '', 'text', 'shop_name'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    s_event: {
        title: "이벤트",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    shop_event: {
        title: "이벤트",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('업체명', '', 'text', 'shop_name'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),
        ]
    },
    s_offer: {
        title: "구인구직",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    shop_trade: {
        title: "샵매매",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('업체명', '', 'text', 'shop_name'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    s_trade: {
        title: "샵매매",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    notice: {
        title: "공지사항",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    faq: {
        title: "자주묻는질문",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    event: {
        title: "이벤트",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    blog: {
        title: "공식블로그",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),

        ]
    },
    request: {
        title: "문의하기",
        columns: [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성인', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'date', 'date'),
            columnObjFormat('자세히보기', '', 'link', ''),
            columnObjFormat('비고', '', 'is_request_com', ''),
        ]
    },
};
export const slideSetting = (num) => {
    return {
        infinite: false,
        dots: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1.15,
        slidesToScroll: 1,
        breakpoint: 480,
        beforeChange(oldIndex, newIndex) {
            $(`.slider${num} > ul.slick-dots > li:nth-child(${(oldIndex % 1 == 0 ? oldIndex : parseInt(oldIndex) + 1) + 1})`).removeClass('slick-active');
            $(`.slider${num} > ul.slick-dots > li:nth-child(${(newIndex % 1 == 0 ? newIndex : parseInt(newIndex) + 1) + 1})`).addClass('slick-active');
        }
    }

}