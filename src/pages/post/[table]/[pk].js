import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Title, ViewerContainer, Wrappers } from "../../../components/elements/UserContentTemplete";
import { axiosInstance, backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import $ from 'jquery'
import styled from "styled-components";
import { BsFillShareFill } from 'react-icons/bs';
import { commarNumber, categoryToNumber, getViewerAlignByNumber, getViewerMarginByNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
import Loading from '../../../components/Loading'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";
const Progress = styled.progress`

appearance: none;
position: fixed;
bottom: 0;
width: 100%;
left: 0;
right: 0;
height:16px;

::-webkit-progress-bar {
background: #f0f0f0;
border-radius: 0;
}

::-webkit-progress-value {
background:transparent;
border-bottom: 16px solid #4CDAD8;
border-right: 10px solid transparent;
}
`
const Post = (props) => {
    let { post_pk, post_table } = props;
    const router = useRouter();
    const params = router.query;
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)
    const [postPk, setPostPk] = useState(0);
    const [postTable, setPostTable] = useState('');
    const [loadingText, setLoadingText] = useState("");
    const viewerRef = useRef();
    const returnTitle = (ttl) => {
    
        return "마고";
        
    }
    useEffect(() => {
        async function isLogined() {
            await window.flutter_inappwebview.callHandler('native_app_logined', {}).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
                let obj = JSON.parse(result);
                // if (obj['is_ios']) {
                //     await localStorage.setItem('is_ios', '1');
                // }
                if (obj?.data?.id) {
                    await onLoginBySns(obj.data);
                } else {
                    alert("로그인 해주세요.");
                    router.push('/login');
                }
            });
        }

        async function fetchPost() {
            setLoading(true)
            if (window && window.flutter_inappwebview && !localStorage.getItem('auth')) {
                setLoadingText("로그인 정보 확인중 입니다...");
                await isLogined();
            }
            setPostPk(params.pk || post_pk)
            setPostTable(params.table || post_table)
            try {
                setLoadingText("콘텐츠를 불러오는 중입니다...");
                const { data: response } = await axiosInstance.get(`/api/item?table=${params.table}&pk=${params.pk}&views=1`);
                if (response.result < 0) {
                    alert(response.message);
                    if (response.result == -150) {
                        router.push('/login');
                    } else {
                        router.back();
                    }
                }
                
                let obj = response.data ?? {};
                
                if (obj?.note && (typeof obj?.note == 'string')) {
                    obj.note = obj?.note.replaceAll('youtube.com/embed', 'youtube-nocookie.com/embed');
                    obj.note = obj?.note.replaceAll('<p><br></p>', '<br>');
                    obj.note = obj?.note.replaceAll('<img ', '<img style="width:100%;" ');
                    obj.note = obj?.note.replaceAll('http://localhost:8001', backUrl);
                    obj.note = obj?.note.replaceAll('https://1st-academy.kr:8443', backUrl);
                }
                await new Promise((r) => setTimeout(r, 300));
                setPost(obj);
                setTimeout(() => setLoading(false), 1000);

                if (localStorage.getItem('dark_mode')) {
                    // $('body').addClass("dark-mode");
                    // $('p').addClass("dark-mode");
                    // $('.toastui-editor-contents p').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents span').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents h1').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents h2').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents h3').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents h4').attr("style", "color:#ffffff !important");
                    // $('.toastui-editor-contents h5').attr("style", "color:#ffffff !important");
                    // $('.menu-container').addClass("dark-mode");
                    // $('.header').addClass("dark-mode");
                    // $('.select-type').addClass("dark-mode");
                    // $('.wrappers > .viewer > p').addClass("dark-mode");
                    // $('.footer').addClass("dark-mode");
                    // $('.viewer > div > div > div > p').addClass("dark-mode");
                    await new Promise((r) => setTimeout(r, 500));
                }
            } catch (err) {
                if (err?.message?.includes('timeout of')) {
                    if (window.confirm('요청시간이 초과되었습니다. (인터넷 환경을 확인해주시기 바랍니다.)')) {

                    }
                } else {
                    if (window.confirm(err?.message)) {
                    }
                }
            }

        }
        if ((params.table || post_table) != 'notice') {
        }
        fetchPost();
        fetchComments();
        $('.lazy-load-image-background').addClass('comment-img');
        // window.addEventListener('scroll', function (el) {
        //     let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
        //     setPercent(per);
        // })

    }, [])
    const onLoginBySns = async (obj) => {
        let nick = "";
        if (obj.login_type == 1) {
            nick = "카카오" + new Date().getTime();
        } else if (obj.login_type == 2) {
            nick = "네이버" + new Date().getTime();
        }
        let objs = {
            id: obj.id,
            name: obj.legal_name,
            nickname: nick,
            phone: obj.phone_number,
            user_level: 0,
            typeNum: obj.login_type,
            profile_img: obj.profile_image_url
        }
        const { data: response } = await axios.post('/api/loginbysns', objs);
        if (response.result > 0) {
            await localStorage.setItem('auth', JSON.stringify(response.data));
            setAuth(response.data);
        } else {
            //alert(response.message);
        }
    }
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk || post_pk}&category=${categoryToNumber(params.table || post_table)}`);
        setComments(response.data);
    }

    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
            return;

        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: postPk,
            parentPk: parent_pk ?? 0,
            title: post.title,
            note: $(`.comment-${parent_pk ?? 0}`).val(),
            category: categoryToNumber(postTable)
        })

        if (response.result > 0) {
            $(`.comment-${parent_pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    const updateComment = async (pk) => {
        if (!$(`.update-comment-${pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/updatecomment', {
            pk: pk,
            note: $(`.update-comment-${pk ?? 0}`).val(),
            category: categoryToNumber(postTable)
        })

        if (response.result > 0) {
            $(`.update-comment-${pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
   
    useEffect(() => {
    }, [viewerRef.current])
    return (
        <>
            <Wrappers className="post-container">
                {loading ?
                    <>
                        <Loading text={loadingText} />
                    </>
                    :
                    <>

                        {/* {post?.main_img?
                        <>
                        <img src={backUrl + post?.main_img} style={{ width: '100%', margin: '16px 0' }} alt="#" />
                        </>
                        :
                        <>
                        </>} */}
                        <Title not_arrow={true}>{post.title}</Title>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/* <div style={{ margin: '0 4px' }}>{post.nickname}</div> / */}
                                <div style={{ margin: '0 4px' }}>{post?.date?.substring(0, 10)}</div> /
                                <div style={{ margin: '0 8px 0 4px' }}>조회수 {commarNumber(post?.views ?? 0)}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: `${theme.size.font4}`, color: `${theme.color.font2}` }}>{post.hash}</div>
                        {post?.pdf_img ?
                            <>
                            <a href={backUrl+post?.pdf} download={backUrl+post?.pdf} >
                            <img src={backUrl + post?.pdf_img} style={{ width: '100%', margin: '16px auto', cursor: 'pointer' }} />
                            </a>
                            </>
                            :
                            <>
                            </>}
                        <ViewerContainer className="viewer" style={{ margin: `${getViewerMarginByNumber(post?.note_align)}` }}>
                            {/* <Viewer initialValue={post?.note ?? `<body></body>`} /> */}
                            <ReactQuill
                                value={post?.note ?? `<body></body>`}
                                readOnly={true}
                                theme={"bubble"}
                                bounds={'.app'}
                                ref={viewerRef}
                            />
                        </ViewerContainer>
                        {/* <ZoomButton/> */}
                        <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} updateComment={updateComment} auth={auth} />

                    </>}

                {/* <Progress value={`${percent}`} max="100"></Progress> */}
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
Post.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Post;