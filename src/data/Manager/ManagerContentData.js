import { logoSrc, backUrl } from "../Data";
import { EditorState } from "draft-js"
import { columnObjFormat, editColumnObjFormat, editContentFormat, sidebarContentFormat, sidebarObjFormat, sidebarObjListFormat } from "./ManagerContentFormat";
import { BsPerson, BsCameraVideo, BsAlarm } from 'react-icons/bs'
import { AiTwotoneSetting, AiOutlineUnorderedList } from 'react-icons/ai'
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];

export const zSidebar = [
    sidebarContentFormat('회원관리', [
        sidebarObjListFormat('회원관리', '/manager/list/user', 40, ['/manager/list/user']),//edit
        sidebarObjListFormat('댓글관리', '/manager/list/comment', 40, ['/manager/list/comment']),//edit
    ], <AiTwotoneSetting />),
    sidebarContentFormat('기본설정', [
        //sidebarObjListFormat('상단띠배너', '/manager/edit/common_setting/1', 40, ['/manager/edit/common_setting/1']),//list
        sidebarObjListFormat('메인배너', '/manager/edit/home_setting/1', 40, ['/manager/edit/home_setting/1']),//list
        sidebarObjListFormat('메인페이지세팅', '/manager/edit/main_setting/1', 40, ['/manager/edit/main_setting/1']),//list
        sidebarObjListFormat('메타세팅', '/manager/edit/meta_setting/1', 40, ['/manager/edit/meta_setting/1']),//
        sidebarObjListFormat('팝업관리', '/manager/list/popup', 40, ['/manager/list/popup']),//list
    ], <AiTwotoneSetting />),
    sidebarContentFormat('지역관리', [
        sidebarObjListFormat('도시관리', '/manager/list/city', 40, ['/manager/list/city']),//list
        //sidebarObjListFormat('메인배너', '/manager/edit/home_setting/1', 40, ['/manager/edit/home_setting/1']),//list
        //sidebarObjListFormat('팝업관리', '/manager/list/popup', 40, ['/manager/list/popup']),//list
    ], <AiTwotoneSetting />),
    sidebarContentFormat('업체관리', [
        sidebarObjListFormat('국가관리', '/manager/list/shop_country', 40, ['/manager/list/shop_country']),//list
        sidebarObjListFormat('테마관리', '/manager/list/shop_theme', 40, ['/manager/list/shop_theme']),//list
        sidebarObjListFormat('업체옵션관리', '/manager/list/shop_option', 40, ['/manager/list/shop_option']),//list
        sidebarObjListFormat('업체관리', '/manager/list/shop', 40, ['/manager/list/shop']),//list
    ], <AiTwotoneSetting />),
    sidebarContentFormat('관리자게시판관리', [
        sidebarObjListFormat('문의관리', '/manager/list/request', 40, ['/manager/list/request']),//list
        sidebarObjListFormat('FAQ관리', '/manager/list/faq', 40, ['/manager/list/faq']),//list
        sidebarObjListFormat('공지사항', '/manager/list/notice', 40, ['/manager/list/notice']),//list
    ], <AiTwotoneSetting />),
    sidebarContentFormat('유저게시판관리', [
        sidebarObjListFormat('자유게시판', '/manager/list/freeboard', 40, ['/manager/list/freeboard']),//list
        sidebarObjListFormat('질문게시판', '/manager/list/question', 40, ['/manager/list/question']),//list
        sidebarObjListFormat('유머게시판', '/manager/list/humor', 40, ['/manager/list/humor']),//list
        sidebarObjListFormat('마사지소식', '/manager/list/news', 40, ['/manager/list/news']),//list
        sidebarObjListFormat('파티모집', '/manager/list/party', 40, ['/manager/list/party']),//list
    ], <AiTwotoneSetting />),
    sidebarContentFormat('업체게시판관리', [
        sidebarObjListFormat('업체후기', '/manager/list/shop_review', 40, ['/manager/list/shop_review']),//list
        sidebarObjListFormat('업체이벤트', '/manager/list/shop_event', 40, ['/manager/list/shop_event']),//list
    ], <AiTwotoneSetting />),
];

export const objManagerListContent = {
    user: sidebarObjFormat(
        '회원 리스트',
        'user',
        [
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('닉네임', '', 'text', 'nickname'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        ['level='],
        true,
        false,
        '150%'),
    city: sidebarObjFormat(
        '도시 관리',
        'city',
        [
            columnObjFormat('배너이미지', '', 'img', 'img_src'),
            columnObjFormat('도시명', '', 'text', 'name'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('구 리스트', '', 'sub_city_list', 'sub_city_list'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    sub_city: sidebarObjFormat(
        '구 관리',
        'sub_city',
        [
            columnObjFormat('배너이미지', '', 'img', 'img_src'),
            columnObjFormat('구명', '', 'text', 'name'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    shop_theme: sidebarObjFormat(
        '테마 관리',
        'shop_theme',
        [
            columnObjFormat('테마이미지', '', 'img', 'img_src'),
            columnObjFormat('테마명', '', 'text', 'name'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    shop_option: sidebarObjFormat(
        '업체옵션 관리',
        'shop_option',
        [
            columnObjFormat('옵션이미지', '', 'img', 'img_src'),
            columnObjFormat('옵션명', '', 'text', 'name'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    shop_country: sidebarObjFormat(
        '국가 관리',
        'shop_country',
        [
            columnObjFormat('국기이미지', '', 'img', 'img_src'),
            columnObjFormat('국가명', '', 'text', 'name'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    shop: sidebarObjFormat(
        '업체 관리',
        'shop',
        [
            columnObjFormat('배너이미지', '', 'img', 'img_src'),
            columnObjFormat('업체명', '', 'text', 'name'),
            columnObjFormat('문의자닉네임', '', 'text', 'nickname'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    comment: sidebarObjFormat(
        '댓글 관리',
        'comment',
        [
            columnObjFormat('카테고리', '', 'category_type', 'category_pk'),
            columnObjFormat('제목', '', 'text', 'item_title'),
            columnObjFormat('닉네임', '', 'text', 'nickname'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('댓글', '', 'text', 'note'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    request: sidebarObjFormat(
        '문의 관리',
        'request',
        [
            columnObjFormat('문의자아이디', '', 'text', 'id'),
            columnObjFormat('문의자닉네임', '', 'text', 'nickname'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('확인여부', '', 'request_status', 'request_status'),
            columnObjFormat('문의날짜', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    faq: sidebarObjFormat(
        'FAQ 관리',
        'faq',
        [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    notice: sidebarObjFormat(
        '공지 관리',
        'notice',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    freeboard: sidebarObjFormat(
        '자유게시판 관리',
        'freeboard',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    question: sidebarObjFormat(
        '질문게시판 관리',
        'question',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    humor: sidebarObjFormat(
        '유머게시판 관리',
        'humor',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    news: sidebarObjFormat(
        '마사지소식 관리',
        'news',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    party: sidebarObjFormat(
        '파티모집 관리',
        'party',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    shop_review: sidebarObjFormat(
        '업체리뷰 관리',
        'shop_review',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('업체이름', '', 'text', 'shop_name'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    shop_event: sidebarObjFormat(
        '업체이벤트 관리',
        'shop_event',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('업체이름', '', 'text', 'shop_name'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('작성자', '', 'text', 'nickname'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    popup: sidebarObjFormat(
        '팝업 관리',
        'popup',
        [
            columnObjFormat('이미지', '', 'img', 'img_src'),
            columnObjFormat('링크', '', 'text', 'link'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
}
export const objManagerOptionCardContent = {

}
export const objManagerEditContent = {
    academy_category: {
        schema: 'academy_category',
        breadcrumb: '강의',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (240x150)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('서브이미지 (90x120)', 'img', { field_name: 'content2' }, 'sub_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
                editColumnObjFormat('부제목', 'input', { placeholder: '부제목을 입력해 주세요.' }, 'sub_title'),
                editColumnObjFormat('해시태그', 'input', { placeholder: '#주식' }, 'hash'),
            ],
            [
                // editColumnObjFormat('난이도', 'select', {
                //     api_url: false, option_list: [
                //         { name: '왕초보', val: 1 },
                //         { name: '검색기', val: 2 },
                //         { name: '단타', val: 3 },
                //         { name: '종목발굴', val: 4 },
                //         { name: '기억분석', val: 5 },
                //     ]
                // }, 'difficulty'),
                editColumnObjFormat('강사', 'select', {
                    api_url: '/api/items?table=user&level=30', option_list: [], use_name_column: 'nickname', use_val_column: 'pk'
                }, 'master_pk'),
            ],
            [
                editColumnObjFormat('수강대상', 'input', { placeholder: '수강대상을 입력해 주세요.' }, 'target'),
                editColumnObjFormat('강의구성', 'input', { placeholder: '강의구성을 입력해 주세요.' }, 'composition'),
            ],
            [
                editColumnObjFormat('시작일', 'input', { type: 'date' }, 'start_date'),
                editColumnObjFormat('종료일', 'input', { type: 'date' }, 'end_date'),
            ],
            [
                editColumnObjFormat('정가', 'input', { type: 'number', placeholder: '숫자를 입력해 주세요.' }, 'price'),
                editColumnObjFormat('할인율', 'input', { type: 'number', placeholder: '0 ~ 100' }, 'discount_percent'),
            ],
            [
                editColumnObjFormat('마감여부', 'select', {
                    api_url: false, option_list: [
                        { name: '마감안함', val: 0 },
                        { name: '마감', val: 1 },
                    ]
                }, 'is_deadline'),
            ],
            [
                editColumnObjFormat('소개', 'editor', {}, 'introduce_note'),
            ],
            [
                editColumnObjFormat('혜택', 'editor', {}, 'benefit_note'),
            ],
            [
                editColumnObjFormat('리더', 'editor', {}, 'leader_note'),
            ],
            [
                editColumnObjFormat('커리큘럼', 'editor', {}, 'curriculum_note'),
            ],
        ],
    },
    city: {
        schema: 'city',
        breadcrumb: '도시',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('배너이미지 (240x150)', 'img', { field_name: 'city' }, 'img_src'),
            ],
            [
                editColumnObjFormat('도시명', 'input', { placeholder: '도시명을 입력해 주세요.' }, 'name'),
            ],
        ],
    },
    sub_city: {
        schema: 'sub_city',
        breadcrumb: '구',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('배너이미지 (240x150)', 'img', { field_name: 'city' }, 'img_src'),
            ],
            [
                editColumnObjFormat('도시', 'select', {
                    api_url: '/api/items?table=city', option_list: [], use_name_column: 'name', use_val_column: 'pk'
                }, 'city_pk'),
            ],
            [
                editColumnObjFormat('구명', 'input', { placeholder: '구명을 입력해 주세요.' }, 'name'),
            ],

        ],
    },
    shop_theme: {
        schema: 'shop_theme',
        breadcrumb: '테마',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('배너이미지 (240x150)', 'img', { field_name: 'city' }, 'img_src'),
            ],
            [
                editColumnObjFormat('테마명', 'input', { placeholder: '테마명을 입력해 주세요.' }, 'name'),
            ],
        ],
    },
    shop_option: {
        schema: 'shop_option',
        breadcrumb: '업체옵션',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('옵션아이콘 (150x150)', 'img', { field_name: 'city' }, 'img_src'),
            ],
            [
                editColumnObjFormat('옵션명', 'input', { placeholder: '옵션명을 입력해 주세요.' }, 'name'),
            ],
        ],
    },
    shop_country: {
        schema: 'shop_country',
        breadcrumb: '국가',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('국기이미지 (180x120)', 'img', { field_name: 'country' }, 'img_src'),
            ],
            [
                editColumnObjFormat('국가명', 'input', { placeholder: '국가명을 입력해 주세요. ex)한국' }, 'name'),
            ],
        ],
    },
    request: {
        schema: 'request',
        breadcrumb: '문의',
        add_list: [],
        update_list: [{ key: 'status', value: '1' }],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('제목', 'input', { disabled: true }, 'title'),
            ],
            [
                editColumnObjFormat('문의사항', 'editor', {}, 'note'),
            ],
            [
                editColumnObjFormat('답변', 'editor', {}, 'reply_note'),
            ],
        ],
    },
    home_setting: {
        schema: 'setting',
        breadcrumb: '메인배너',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('슬라이드 이미지 1 (500x150)', 'img', { field_name: 'content1' }, 'home_banner_img_1'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'home_banner_link_1'),
            ],
            [
                editColumnObjFormat('슬라이드 이미지 2 (500x150)', 'img', { field_name: 'content2' }, 'home_banner_img_2'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'home_banner_link_2'),
            ],
            [
                editColumnObjFormat('슬라이드 이미지 3 (500x150)', 'img', { field_name: 'content3' }, 'home_banner_img_3'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'home_banner_link_3'),
            ],
            [
                editColumnObjFormat('슬라이드 이미지 4 (500x150)', 'img', { field_name: 'content4' }, 'home_banner_img_4'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'home_banner_link_4'),
            ],
            [
                editColumnObjFormat('슬라이드 이미지 5 (500x150)', 'img', { field_name: 'content5' }, 'home_banner_img_5'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'home_banner_link_5'),
            ],
        ],
    },
    main_setting: {
        schema: 'setting',
        breadcrumb: '메인페이지세팅',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인 title', 'input', { placeholder: '' }, 'main_home_title'),
            ],
        ],
    },
    meta_setting: {
        schema: 'setting',
        breadcrumb: '메타태그',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메타 title', 'input', { placeholder: '' }, 'meta_title'),
            ],
            [
                editColumnObjFormat('메타 description', 'input', { placeholder: '' }, 'meta_description'),
            ],
            [
                editColumnObjFormat('메타 keyword', 'input', { placeholder: '' }, 'meta_keywords'),
            ],
        ],
    },
    faq: {
        schema: 'faq',
        breadcrumb: 'FAQ',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    notice: {
        schema: 'notice',
        breadcrumb: '공지사항',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    freeboard: {
        schema: 'freeboard',
        breadcrumb: '자유게시판',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    question: {
        schema: 'question',
        breadcrumb: '질문게시판',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    humor: {
        schema: 'humor',
        breadcrumb: '유머게시판',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    news: {
        schema: 'news',
        breadcrumb: '마사지소식',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    shop_review: {
        schema: 'shop_review',
        breadcrumb: '업체후기',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    shop_event: {
        schema: 'shop_event',
        breadcrumb: '업체이벤트',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    party: {
        schema: 'party',
        breadcrumb: '파티모집',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지 (150x100)', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    popup: {
        schema: 'popup',
        breadcrumb: '팝업',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('이미지 (자율)', 'img', { field_name: 'content' }, 'img_src'),
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'link'),
            ],
        ],
    },
}
export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const slideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    breakpoint: 480,
    beforeChange: (current, next) => { console.log(current) },
    afterChange: current => { console.log(current) },
}

export { backUrl };