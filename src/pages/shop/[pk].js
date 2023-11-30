import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Wrappers, ViewerContainer, SelectType } from "src/components/elements/UserContentTemplete";
import { backUrl } from "src/data/Data";
import theme from "src/styles/theme";
import styled from "styled-components";
import { commarNumber, getLocation, makeMaxPage, range } from "src/functions/utils";
import Loading from "src/components/Loading";
import { Card, CardContent, Grid, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import ContentTable from "src/components/ContentTable";
import MBottomContent from "src/components/elements/MBottomContent";
import AddButton from "src/components/elements/button/AddButton";
import PageContainer from "src/components/elements/pagination/PageContainer";
import PageButton from "src/components/elements/pagination/PageButton";
import { getLocalStorage } from "src/functions/LocalStorage";
import { AiTwotonePhone, AiTwotoneMessage } from 'react-icons/ai'
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
import 'react-quill/dist/quill.snow.css';
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import NaverMap from "src/components/NaverMap";
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
border-bottom: 1px solid #000;
background:${theme.color.font5};
padding:0.5rem;
font-size:${theme.size.font3};
text-align:center;
`
const MenuContent = styled.div`
display:flex;
justify-content:space-between;
padding:0.5rem;
border-bottom: 1px solid #000;
font-size:${theme.size.font4};
`
const Title = styled.div`
margin:0 0 0.5rem 0;

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
    useEffect(() => {
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
    const shareCopy = () => {
        let copyText = document.getElementById("share-link");
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        alert("주소가 복사 되었습니다.");
    }
    return (
        <>
            <Wrappers className="post-container">

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                            <Icon icon='material-symbols:location-on' style={{ color: theme.color.red, margin: 'auto 0.5rem auto auto' }} />
                            <div style={{ margin: 'auto auto auto 0.5rem' }}>내위치: {myAddress}</div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: "1rem" }}>
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <div>{data?.shop?.name}</div>
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
                                                        <img src={backUrl + data?.shop?.img_src} style={{ width: '100%', borderRadius: '16px' }} alt={data?.shop?.img_src_alt} />
                                                    </Content>
                                                    <Content>
                                                        <div style={{ fontSize: theme.size.font2_5 }}>{data?.shop?.name}</div>
                                                        <h1 style={{ fontSize: theme.size.font3, marginTop: '1rem', color: theme.color.font3 }}>{data?.shop?.sub_name}</h1>
                                                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                                            <div>{data?.shop?.address}</div>

                                                            <IconButton onClick={shareCopy}>
                                                                <Icon icon="fluent:copy-16-regular" />
                                                            </IconButton>
                                                            <input type="text" style={{ display: 'none' }} id='share-link' value={data?.shop?.address ?? ""} />
                                                        </Row>
                                                        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <div>{data?.shop?.phone}</div>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <a href={`tel:${data?.shop?.phone}`}>
                                                                    <IconButton>
                                                                        <Icon icon="fluent:call-32-regular" />
                                                                    </IconButton>
                                                                </a>
                                                                <a href={`sms:${data?.shop?.phone}${navigator.userAgent.includes('Android') ? '?' : '&'}body=마고에서 보고 연락 드립니다.`}>
                                                                    <IconButton>
                                                                        <Icon icon="ep:message" />
                                                                    </IconButton>
                                                                </a>
                                                            </div>
                                                        </Row>
                                                        <Row style={{ flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                                            {data?.shop?.option_list && (data?.shop?.option_list ?? []).map((item, idx) => (
                                                                <>
                                                                    <Row style={{ width: '50%', marginTop: '0.5rem', alignItems: 'center' }}>
                                                                        <img src={backUrl + item?.img_src} style={{ width: '16px', height: '16px' }} />
                                                                        <div style={{ marginLeft: '0.5rem' }}>{item?.name}</div>
                                                                    </Row>
                                                                </>
                                                            ))}
                                                        </Row>
                                                        <Row style={{ fontSize: theme.size.font4, marginTop: '1rem', color: theme.color.font3 }}>
                                                            {data?.shop?.hash}
                                                        </Row>
                                                    </Content>
                                                </RowContent>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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
                                    <Grid item xs={12} md={6}>
                                        <Card>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Title>코스 및 가격 안내</Title>
                                                {data?.shop?.price_list && data?.shop?.price_list.map((item, idx) => {
                                                    if (!item?.price && !item?.sale_price) {
                                                        return <MenuHeader>{item?.course}</MenuHeader>
                                                    } else {
                                                        return <MenuContent>
                                                            <div>{item?.course}</div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{
                                                                    textDecoration: `${item?.sale_price && (item?.sale_price != item?.price) ? 'line-through' : ''}`,
                                                                    textDecorationColor: theme.color.red,
                                                                    color: `${item?.sale_price && (item?.sale_price != item?.price) ? theme.color.red : ''}`,
                                                                }}>{commarNumber(item?.price)}</div>
                                                                <div style={{ marginLeft: '0.5rem' }}>{item?.sale_price && (item?.sale_price != item?.price) ? commarNumber(item?.sale_price) : ''}</div>
                                                                <div>원</div>
                                                            </div>
                                                        </MenuContent>
                                                    }
                                                })}

                                            </CardContent>
                                            <ReactQuill
                                                value={data?.shop?.price_note ?? `<body></body>`}
                                                readOnly={true}
                                                theme={"bubble"}
                                                bounds={'.app'}
                                                ref={priceViewerRef}
                                            />
                                            <CardContent>
                                                <NaverMap
                                                    center={{
                                                        lat: data?.shop?.lat,
                                                        lng: data?.shop?.lng,
                                                    }}
                                                    markers={[
                                                        { lat: data?.shop?.lat, lng: data?.shop?.lng, }
                                                    ]}
                                                />
                                                <img src={backUrl + data?.shop?.price_img} alt={data?.shop?.price_img_alt} style={{ width: '100%', height: 'auto', marginTop: '1rem' }} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
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
                                    {user?.pk == data?.shop?.user_pk ?
                                        <>
                                            <div style={{ width: '92px' }} />

                                        </>
                                        :
                                        <>
                                            <div />
                                        </>}
                                    {eventPageList.length > 0 ?
                                        <>
                                            <PageContainer>
                                                <PageButton onClick={() => getShop(1, reviewPage)}>
                                                    처음
                                                </PageButton>
                                                {eventPageList.map((item, index) => (
                                                    <>
                                                        <PageButton onClick={() => getShop(item, reviewPage)} style={{ color: `${eventPage == item ? '#fff' : ''}`, background: `${eventPage == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - eventPage) > 4 ? 'none' : ''}` }}>
                                                            {item}
                                                        </PageButton>
                                                    </>
                                                ))}
                                                <PageButton onClick={() => getShop(eventPageList.length ?? 1, reviewPage)}>
                                                    마지막
                                                </PageButton>
                                            </PageContainer>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    {user?.pk == data?.shop?.user_pk ?
                                        <>
                                            <AddButton style={{ width: '92px' }} onClick={() => {
                                                router.push(`/add-community/shop_event`, {
                                                    query: {
                                                        shop_pk: data?.shop?.pk,
                                                        shop_name: data?.shop?.name
                                                    }
                                                })
                                            }}>+ 작성하기</AddButton>

                                        </>
                                        :
                                        <>
                                            <div />
                                        </>
                                    }
                                </MBottomContent>


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
                                    <div style={{ width: '92px' }} />
                                    {reviewPageList.length > 0 ?
                                        <>
                                            <PageContainer>
                                                <PageButton onClick={() => getShop(eventPage, 1)}>
                                                    처음
                                                </PageButton>
                                                {reviewPageList.map((item, index) => (
                                                    <>
                                                        <PageButton onClick={() => getShop(eventPage, item)} style={{ color: `${reviewPage == item ? '#fff' : ''}`, background: `${reviewPage == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - reviewPage) > 4 ? 'none' : ''}` }}>
                                                            {item}
                                                        </PageButton>
                                                    </>
                                                ))}
                                                <PageButton onClick={() => getShop(eventPage, reviewPageList.length ?? 1)}>
                                                    마지막
                                                </PageButton>
                                            </PageContainer>
                                        </>
                                        :
                                        <>
                                        </>}


                                    <AddButton style={{ width: '92px' }} onClick={() => {
                                        router.push(`/add-community/shop_review`, {
                                            query: {
                                                shop_pk: data?.shop?.pk,
                                                shop_name: data?.shop?.name
                                            }
                                        })
                                    }}>+ 작성하기</AddButton>

                                </MBottomContent>

                            </>
                            :
                            <>
                            </>}
                    </>
                }
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
            <div style={{ position: 'fixed', right: '1rem', bottom: '12rem', display: 'flex', alignItems: 'center' }}>
                <CallButton href={`tel:${data?.shop?.phone}`}  >
                    <AiTwotonePhone />
                </CallButton>
            </div>
            <div style={{ position: 'fixed', right: '1rem', bottom: '9rem', display: 'flex', alignItems: 'center' }}>
                <CallButton href={`sms:${data?.shop?.phone}${navigator.userAgent.includes('Android') ? '?' : '&'}body=마고에서 보고 연락 드립니다.`} >
                    <AiTwotoneMessage />
                </CallButton>
            </div>
        </>
    )
}
Shop.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Shop;