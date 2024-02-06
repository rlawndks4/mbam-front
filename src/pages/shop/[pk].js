import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Wrappers, ViewerContainer, SelectType, twoOfThreeButtonStyle, ColorButton } from "src/components/elements/UserContentTemplete";
import { backUrl } from "src/data/Data";
import theme from "src/styles/theme";
import styled from "styled-components";
import { commarNumber, getLocation, makeMaxPage, range } from "src/functions/utils";
import Loading from "src/components/Loading";
import { Button, Card, CardContent, Divider, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import ContentTable from "src/components/ContentTable";
import MBottomContent from "src/components/elements/MBottomContent";
import AddButton from "src/components/elements/button/AddButton";
import PageContainer from "src/components/elements/pagination/PageContainer";
import PageButton from "src/components/elements/pagination/PageButton";
import { getLocalStorage } from "src/functions/LocalStorage";
import { AiTwotonePhone, AiTwotoneMessage } from 'react-icons/ai'
import $ from 'jquery';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
import 'react-quill/dist/quill.snow.css';
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import NaverMap from "src/components/NaverMap";
import CommentComponent from "src/components/CommentComponent";
import { Col } from "src/components/elements/ManagerTemplete";
const CallButton = styled.a`

background:${props => props.theme.color.background1};
padding:7px 8px 5px 8px;
color:#000;
border-radius:50%;
font-size:16px;
cursor:pointer;
animation: fadein 0.5s;
z-index:3;
color:#fff;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

`
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
position:relative;
`
const MenuHeader = styled.div`
border-top: 1px solid #dbdbdb;
border-bottom: 1px solid #dbdbdb;
background:#f8f9fb;
padding:0.5rem;
font-size:${theme.size.font3};
text-align:center;
`
const MenuContent = styled.div`
display:flex;
padding:1rem 0.5rem;
border-bottom: 1px solid #dbdbdb;
font-size:${theme.size.font4};
`
const RowContent = styled.div`
display:flex;
width:100%;
justify-content:space-between;
@media screen and (max-width:750px) { 
    flex-direction:column;
}
`
const Content = styled.div`
display:flex;
flex-direction:column;
width:45%;
@media screen and (max-width:750px) { 
    width:100%;
    margin-bottom:1rem;
}
`
const Row = styled.div`
display:flex;
`

const ManagerImg = styled.img`
 height: 100px;
 width: auto;
`
const ManagerContainer = styled.div`
overflow: auto;
display: -webkit-box;
column-gap: 0.5rem;
`
const ImgIcon = styled.img`
height: 16px;
padding:4px;
background: ${theme.color.background0};
border-radius: 4px;
`
const TopLabelRow = styled.div`
display: flex;
align-items: center;
column-gap: 0.25rem;
`
const SnsBadge = styled.img`
height: 32px;
border-radius: 8px;
`
const TopLabel = (props) => {
    const { src, title } = props;
    return <TopLabelRow>
        <ImgIcon src={src} />
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
    </TopLabelRow>
}
const Shop = () => {
    const router = useRouter();
    const viewerRef = useRef();
    const priceViewerRef = useRef();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [myAddress, setMyAddress] = useState("");
    const [typeNum, setTypeNum] = useState(0);
    const [shop, setShop] = useState({});
    const [reviewPage, setReviewPage] = useState(1);
    const [eventPage, setEventPage] = useState(1);
    const [eventPageList, setEventPageList] = useState([]);
    const [reviewPageList, setReviewPageList] = useState([]);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [auth, setAuth] = useState({})

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('auth')));
        getShop(1, 1);
    }, [])

    const getShop = async (event_page, review_page) => {
        let page_cut = 10;
        let locate = await getLocation();
        setReviewPage(review_page);
        setEventPage(event_page);
        const { data: res_locate } = await axios.post('/api/getaddressbylocation', locate);
        setMyAddress(res_locate?.data);
        setLoading(true);
        let obj = {};
        obj['pk'] = router.query?.pk;
        obj['review_page'] = review_page;
        obj['event_page'] = event_page;
        const { data: response } = await axios.post('/api/shop', obj)
        setData(response?.data);
        setEventPageList(range(1, makeMaxPage(response?.data?.event_size['size'], page_cut)));
        setReviewPageList(range(1, makeMaxPage(response?.data?.review_size['size'], page_cut)));
        setLoading(false);
        let user_data = await getLocalStorage('auth');
        if (typeof user_data == 'string') {
            user_data = JSON.parse(user_data);
            setUser(user_data)
        }
    }
    const changeType = (num) => {

        setTypeNum(num)
    }
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?shop_pk=${router.query?.pk}`);
        setComments(response.data);
    }

    const shareCopy = () => {
        let copyText = document.getElementById("share-link");
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        alert("주소가 복사 되었습니다.");
    }
    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
            return;

        }
        const { data: response } = await axios.post('/api/addcomment', {
            parentPk: parent_pk ?? 0,
            note: $(`.comment-${parent_pk ?? 0}`).val(),
            shop_pk: router.query?.pk
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
        })

        if (response.result > 0) {
            $(`.update-comment-${pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    return (
        <>
            <Wrappers className="post-container" style={{ maxWidth: '900px' }}>

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                            <Icon icon='material-symbols:location-on' style={{ color: theme.color.background0, margin: 'auto 0.5rem auto auto' }} />
                            <div style={{ margin: 'auto auto auto 0.5rem' }}>내위치: {myAddress}</div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: "1rem" }}>
                    <Card style={{ background: theme.color.background0 }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>{data?.shop?.name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <SelectType style={{ width: '100%', maxWidth: '1150px', margin: '1rem auto' }}>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 0 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 0 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(0) }}>업체소개</Type>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>이벤트</Type>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>후기({commarNumber(data?.review_size['size'])})</Type>
                        </SelectType>
                        {typeNum == 0 ?
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Card>
                                            <CardContent>
                                                <RowContent>
                                                    <Content>
                                                        <img src={data?.shop?.img_src} style={{ width: '100%', borderRadius: '16px' }} alt={data?.shop?.img_src_alt} />
                                                    </Content>
                                                    <Content>
                                                        <div style={{ fontSize: theme.size.font2_5 }}>{data?.shop?.name}</div>
                                                        <h1 style={{ fontSize: theme.size.font3, marginTop: '1rem', color: theme.color.font3 }}>{data?.shop?.sub_name}</h1>
                                                        <TopLabel
                                                            src={'/assets/images/badge/earth.jpg'}
                                                            title={'업소정보'}
                                                        />
                                                        <Divider style={{ margin: '0.75rem 0' }} />
                                                        <Row style={{ alignItems: 'center', columnGap: '0.5rem' }}>
                                                            <div>상세주소</div>
                                                            <div>{data?.shop?.address}</div>
                                                            {/* <IconButton onClick={shareCopy}>
                                                                <Icon icon="fluent:copy-16-regular" />
                                                            </IconButton>
                                                            <input type="text" style={{ display: 'none' }} id='share-link' value={data?.shop?.address ?? ""} /> */}
                                                        </Row>
                                                        <Divider style={{ margin: '0.75rem 0' }} />
                                                        <Row style={{ alignItems: 'center', columnGap: '0.5rem' }}>
                                                            <div>영업시간</div>
                                                            <div>{data?.shop?.work_time}</div>
                                                        </Row>
                                                        <Divider style={{ margin: '0.75rem 0' }} />
                                                        <Row style={{ alignItems: 'center', columnGap: '0.5rem' }}>
                                                            <div>연락처</div>
                                                            <div>{data?.shop?.phone}</div>
                                                        </Row>
                                                        <Divider style={{ margin: '0.75rem 0' }} />
                                                        <Row style={{ alignItems: 'center', columnGap: '0.5rem' }}>
                                                            <SnsBadge src={'/assets/images/icon/kakao.png'} />
                                                            <div>카카오톡</div>
                                                            <div style={{ marginLeft: 'auto' }}>{data?.shop?.kakao}</div>
                                                        </Row>
                                                        <Divider style={{ margin: '0.75rem 0' }} />
                                                        <Row style={{ alignItems: 'center', columnGap: '0.5rem' }}>
                                                            <SnsBadge src={'/assets/images/icon/line.png'} />
                                                            <div>라인</div>
                                                            <div style={{ marginLeft: 'auto' }}>{data?.shop?.line}</div>
                                                        </Row>
                                                        {/* <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <div>{data?.shop?.phone}</div>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <a href={`tel:${data?.shop?.phone}`}>
                                                                    <IconButton>
                                                                        <Icon icon="fluent:call-32-regular" />
                                                                    </IconButton>
                                                                </a>
                                                                <a href={`sms:${data?.shop?.phone}${navigator.userAgent.includes('Android') ? '?' : '&'}body=마사지밤에서 보고 연락 드립니다.`}>
                                                                    <IconButton>
                                                                        <Icon icon="ep:message" />
                                                                    </IconButton>
                                                                </a>
                                                            </div>
                                                        </Row>
                                                        <Row style={{ fontSize: theme.size.font4, marginTop: '1rem', color: theme.color.font3 }}>
                                                            {data?.shop?.hash}
                                                        </Row> */}
                                                    </Content>
                                                </RowContent>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Card>
                                            <CardContent>
                                                <TopLabel
                                                    src={'/assets/images/badge/menu.jpg'}
                                                    title={'편의사항 및 옵션'}
                                                />
                                                <Row style={{ flexWrap: 'wrap', marginTop: '0.5rem', marginBottom: '2rem' }}>
                                                    {data?.shop?.option_list && (data?.shop?.option_list ?? []).map((item, idx) => (
                                                        <>
                                                            <Row style={{ width: '50%', marginTop: '0.5rem', alignItems: 'center' }}>
                                                                <img src={item?.img_src} style={{ width: '16px', height: '16px' }} />
                                                                <div style={{ marginLeft: '0.5rem' }}>{item?.name}</div>
                                                            </Row>
                                                        </>
                                                    ))}
                                                </Row>
                                                {data?.shop_manager && data?.shop_manager?.length > 0 &&
                                                    <>
                                                        <TopLabel
                                                            src={'/assets/images/badge/calendar.jpg'}
                                                            title={'출근부'}
                                                        />
                                                        <ManagerContainer className="none-scroll" style={{ marginTop: '0.5rem' }}>
                                                            {data?.shop_manager && data?.shop_manager.map((itm) => (
                                                                <>
                                                                    <Col style={{ rowGap: '0.25rem' }}>
                                                                        <div style={{ fontSize: theme.size.font3 }}>{itm?.name}</div>
                                                                        <ManagerImg src={itm?.img_src} />
                                                                        <div style={{ fontSize: theme.size.font5 }}>{itm?.comment}</div>
                                                                        <div style={{ fontSize: theme.size.font5 }}>{itm?.work_time}</div>
                                                                    </Col>
                                                                </>
                                                            ))}
                                                        </ManagerContainer>
                                                    </>}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={12} >
                                        <Card>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                                                <TopLabel
                                                    src={'/assets/images/badge/info.jpg'}
                                                    title={'회원가 혜택안내 및 안내사항'}
                                                />
                                                <ReactQuill
                                                    value={data?.shop?.price_note ?? `<body></body>`}
                                                    readOnly={true}
                                                    theme={"bubble"}
                                                    bounds={'.app'}
                                                    ref={priceViewerRef}
                                                />
                                                <Typography variant="h6" style={{ fontWeight: 'bold' }} sx={{ margin: '0 auto 1rem auto' }}>코스 및 가격 안내</Typography>

                                                {data?.shop?.price_list && data?.shop?.price_list.map((item, idx) => {
                                                    if (!item?.price && !item?.sale_price) {
                                                        return <MenuHeader>{item?.course}</MenuHeader>
                                                    } else {
                                                        return <MenuContent>
                                                            <div style={{ fontWeight: 'bold' }}>{item?.course}</div>
                                                            <div style={{ display: 'flex', marginLeft: 'auto' }}>
                                                                <Col style={{ alignItems: 'end' }}>
                                                                    <div style={{ marginLeft: '0.5rem', color: theme.color.background0 }}>{item?.sale_price && (item?.sale_price != item?.price) ? commarNumber(item?.sale_price) : commarNumber(item?.price)}원</div>

                                                                    <div style={{
                                                                        textDecoration: `${item?.sale_price && (item?.sale_price != item?.price) ? 'line-through' : ''}`,
                                                                        textDecorationColor: '#ccc',
                                                                        color: '#ccc'
                                                                    }}>{item?.sale_price && (item?.sale_price != item?.price) ? commarNumber(item?.price) + '원' : ''}</div>
                                                                </Col>
                                                            </div>
                                                            {item?.sale_price && (item?.sale_price != item?.price) &&
                                                                <>
                                                                    <ColorButton style={{ background: theme.color.background0, marginLeft: '0.5rem', padding: '0.6rem 0.4rem' }}>{((item?.price - item?.sale_price) / item?.price * 100).toFixed(0)}%</ColorButton>

                                                                </>}
                                                        </MenuContent>
                                                    }
                                                })}
                                            </CardContent>
                                            <CardContent>
                                                <TopLabel
                                                    src={'/assets/images/badge/map.jpg'}
                                                    title={'위치안내'}
                                                />
                                                <div style={{ marginTop: '0.5rem' }} />
                                                <NaverMap
                                                    center={{
                                                        lat: data?.shop?.lat,
                                                        lng: data?.shop?.lng,
                                                    }}
                                                    markers={[
                                                        { lat: data?.shop?.lat, lng: data?.shop?.lng, }
                                                    ]}
                                                />
                                                <div style={{ marginTop: '0.5rem' }} />
                                                <TopLabel
                                                    src={'/assets/images/badge/play.jpg'}
                                                    title={'마사지 건마 1인샵 출장마사지'}
                                                />
                                                <img src={data?.shop?.price_img} alt={data?.shop?.price_img_alt} style={{ width: '100%', height: 'auto', marginTop: '1rem' }} />
                                                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#aaa' }}>
                                                    본 정보는 이 게시물에 등록된 업체에서 제공한 자료이며, 마사지밤은 내용에 대한 오류와 사용자가 이를 신뢰하여 취한 조치에 대해 책임을 지지 않습니다. 또한 누구든 본 정보를 마사지밤 동의 없이 재배포 할 수 없습니다. Copyright 2022. 쿠비스. All Rights Reserved.
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={12} >
                                        <Card>
                                            <ReactQuill
                                                value={data?.shop?.note ?? `<body></body>`}
                                                readOnly={true}
                                                theme={"bubble"}
                                                bounds={'.app'}
                                                ref={viewerRef}
                                            />
                                        </Card>
                                    </Grid>

                                </Grid>
                                <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} updateComment={updateComment} auth={auth} />
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 1 ?
                            <>
                                <ContentTable
                                    data={data?.event ?? []}
                                    schema={'s_event'}
                                    table={'s_event'}
                                />

                                <MBottomContent>
                                    <div />
                                    {eventPageList.length > 0 ?
                                        <>
                                            <PageContainer>
                                                <PageButton onClick={() => getShop(1, reviewPage)} style={{ color: '#000', background: '#fff', border: '1px solid #ccc' }}>
                                                    처음
                                                </PageButton>
                                                {eventPageList.map((item, index) => (
                                                    <>
                                                        <PageButton onClick={() => getShop(item, reviewPage)} style={{ color: `${eventPage == item ? '#000' : ''}`, background: `${eventPage == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - eventPage) > 4 ? 'none' : ''}` }}>
                                                            {item}
                                                        </PageButton>
                                                    </>
                                                ))}
                                                <PageButton onClick={() => getShop(eventPageList.length ?? 1, reviewPage)} style={{ color: '#000', background: '#fff', border: '1px solid #ccc' }}>
                                                    마지막
                                                </PageButton>
                                            </PageContainer>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    <div />

                                </MBottomContent>
                                {user?.pk == data?.shop?.user_pk &&
                                    <>
                                        <Button variant="text" sx={{ ...twoOfThreeButtonStyle, }} onClick={() => {
                                            router.push(`/add-community/shop_event`, {
                                                query: {
                                                    shop_pk: data?.shop?.pk,
                                                    shop_name: data?.shop?.name
                                                }
                                            })
                                        }}>작성하기</Button>
                                    </>}
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 2 ?
                            <>
                                <ContentTable
                                    data={data?.review ?? []}
                                    schema={'s_review'}
                                    table={'s_review'}
                                />

                                <MBottomContent>
                                    <div />
                                    {reviewPageList.length > 0 ?
                                        <>
                                            <PageContainer>
                                                <PageButton onClick={() => getShop(eventPage, 1)} style={{ color: '#000', background: '#fff', border: '1px solid #ccc' }}>
                                                    처음
                                                </PageButton>
                                                {reviewPageList.map((item, index) => (
                                                    <>
                                                        <PageButton onClick={() => getShop(eventPage, item)} style={{ color: `${reviewPage == item ? '#fff' : ''}`, background: `${reviewPage == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - reviewPage) > 4 ? 'none' : ''}` }}>
                                                            {item}
                                                        </PageButton>
                                                    </>
                                                ))}
                                                <PageButton onClick={() => getShop(eventPage, reviewPageList.length ?? 1)} style={{ color: '#000', background: '#fff', border: '1px solid #ccc' }}>
                                                    마지막
                                                </PageButton>
                                            </PageContainer>
                                        </>
                                        :
                                        <>
                                        </>}
                                    <div />
                                </MBottomContent>
                                <Button variant="text" sx={{ ...twoOfThreeButtonStyle, }} onClick={() => {
                                    router.push(`/add-community/shop_review?shop_pk=${data?.shop?.pk}&shop_name=${data?.shop?.name}`)
                                }}>작성하기</Button>
                            </>
                            :
                            <>
                            </>}
                    </>
                }
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
            <BottomContainer>
                <a href={`sms:${data?.shop?.phone}${navigator.userAgent.includes('Android') ? '?' : '&'}body=마사지밤에서 보고 연락 드립니다.`}>
                    <Button
                        style={{ background: 'transparent', color: '#fff', height: '100%' }}
                    >
                        <Icon icon={'solar:letter-bold'} style={{ fontSize: '1.5rem' }} />
                    </Button>
                </a>
                <a href={`tel:${data?.shop?.phone}`}>
                    <Button
                        startIcon={<Icon icon={'bi:telephone-fill'} style={{ fontSize: '1.5rem', }} />}
                        style={{ background: 'transparent', width: '80vw', color: '#fff', padding: '0.5rem 0', fontSize: '1.2rem' }}
                    >
                        전화걸기
                    </Button>
                </a>
            </BottomContainer>
            {/* <div style={{ position: 'fixed', right: '1rem', bottom: '12rem', display: 'flex', alignItems: 'center' }}>
                <CallButton href={`tel:${data?.shop?.phone}`}  >
                    <AiTwotonePhone />
                </CallButton>
            </div>
            <div style={{ position: 'fixed', right: '1rem', bottom: '9rem', display: 'flex', alignItems: 'center' }}>
                <CallButton href={`sms:${data?.shop?.phone}${navigator.userAgent.includes('Android') ? '?' : '&'}body=마사지밤에서 보고 연락 드립니다.`} >
                    <AiTwotoneMessage />
                </CallButton>
            </div> */}

        </>
    )
}

const BottomContainer = styled.div`
position: fixed;
bottom: 65px;
display: none;
background: ${theme.color.background0};
color: #fff;
width: 100vw;
@media screen and (max-width:750px) { 
    display: flex;
}
`
Shop.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Shop;