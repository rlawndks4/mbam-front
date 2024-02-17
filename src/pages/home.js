import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import Slider from 'react-slick'
import axios from 'axios';
import { backUrl } from 'src/data/Data';
import { Wrappers, RowContent } from 'src/components/elements/UserContentTemplete';
import Loading from 'src/components/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Merchandise } from './shop-list';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Col, Font3, Font4, Font5, Row } from 'src/components/elements/ManagerTemplete';
import theme from 'src/styles/theme';
import { useRouter } from 'next/router';
import UserLayout from 'src/layouts/UserLayout';
import { dateFormat } from 'src/functions/utils';
import { Avatar, Button, Chip, IconButton, Input, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin-top:96px;
margin-left:auto;
margin-right:auto;
font-family:${props => props.theme.font.normal};
@media screen and (max-width:1050px) { 
    margin-top:4rem;
}
`
const MerchandiseContainer = styled.div`
display: flex;
flex-wrap:wrap;
column-gap: 20px;
grid-row-gap: 10px;
row-gap: 30px;
width: 700px;
@media (max-width: 1050px) {
  column-gap: 4.2vw;
  width: 100%;
}

`
const ShopBannerContainer = styled.div`
width: 700px;
@media (max-width: 1050px) {
  width: 90vw;
}

`
const TopContainer = styled.div`
display: flex;
width: 100%;
background: ${theme.color.background1};
`
const TopContent = styled.div`
width: 25%;
padding:1rem 0;
text-align: center;
color: #fff;
font-weight: bold;
font-size: 16px;
cursor: pointer;
`
const ThemeCardContainer = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 1.1rem;
row-gap: 1rem;
@media screen and (max-width:1050px) { 
    column-gap: 1.2vw;
}
`
const SearchContainer = styled.div`
display: flex;
flex-wrap: wrap;
@media screen and (max-width:1050px) { 
    display: none;
}
`
const ThemeCard = styled.img`
width: 125px;
height:125px;
border-radius: 50%;
cursor:pointer;
@media screen and (max-width:1050px) { 
    width: 17vw;
    height: 17vw;
}
`
const CommunityWrappers = styled.div`
width:330px;
display: ${props => props.display == 'none' ? 'flex' : 'none'};
flex-direction: column;
row-gap: 1rem;
@media screen and (max-width:1050px) { 
    width:100%;
    display: ${props => props.display == 'none' ? 'none' : 'flex'};
}
`
const CommunityContainer = styled.div`
display: flex;
flex-direction: column;
border-radius: 0.5rem;
min-height: 150px;
border: 1px solid #ccc;

`
const CommunityHeader = styled.div`
background: ${theme.color.background4};
font-size: ${theme.size.font4};
padding: 0.75rem 0.5rem;
border-top-right-radius: 0.5rem;
border-top-left-radius: 0.5rem;
font-weight: 500;
cursor: pointer;
`
const CommunityContent = styled.div`
cursor: pointer;
font-size: ${theme.size.font5};
display: flex;
justify-content: space-between;

`
const ShopOptionWrappers = styled.div`
width:200px;
display: ${props => props.display == 'none' ? 'flex' : 'none'};
flex-direction: column;
background: ${theme.color.background4};
padding: 1rem;
row-gap: 0.5rem;
border-radius: 0.5rem;
@media screen and (max-width:1050px) { 
    display: ${props => props.display == 'none' ? 'none' : 'flex'};
}
`
const RealTimeContainer = styled.div`
width: 668px;
border-radius: 0.5rem;
border: 1px solid #ccc;
padding: 1rem;
@media (max-width: 1050px) {
  width: calc(90vw - 16px);
  padding: 0.5rem;
}
`
const HotPlaceContainer = styled.div`
width: 700px;
border-radius: 0.5rem;
border: 1px solid #ccc;
@media (max-width: 1050px) {
  width: 90vw;
}
`
const LeftImg = styled.img`
width: 232px;
margin-bottom: 1rem;
cursor: pointer;
@media (max-width: 1050px) {
 display: none;
}
`
const NoneShowCol = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 1050px) {
 display: none;
}
`
const ThemeText = styled.div`
font-size:${theme.size.font4};
@media screen and (max-width:650px) {
font-size:${theme.size.font5};
    
}
@media screen and (max-width:400px) {
font-size:11px;
}
`
const ThemeContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`
const TextSlideContent = styled.div`
display: flex;
 width: auto ;
 column-gap: 0.2rem;
 align-items: center ;
 cursor: pointer;
 margin-left: 0.2rem ;
 word-break: unset;
 font-size: 1.1rem;
 @media screen and (max-width:600px) {
font-size:14px;
}
 @media screen and (max-width:350px) {
font-size:11px;
}
`
const NextArrow = ({ onClick }) => {
    return (
        <div className="nextArrow" onClick={onClick}>
            <MdNavigateNext style={{ color: '#fff' }} />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="prevArrow" onClick={onClick}>
            <MdNavigateBefore style={{ color: '#fff' }} />
        </div>
    );
};
const Home = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [homeContent, setHomeContent] = useState({});
    const [banners, setBanners] = useState([]);
    const [bannerLinks, setBannerLinks] = useState([]);
    const [shopBanners, setShopBanners] = useState([]);
    const [shopBannerLinks, setShopBannerLinks] = useState([]);
    const [cityList, setCityList] = useState([])
    const [themeList, setThemeList] = useState([])
    const [hotPlaceTab, setHotPlaceTab] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [auth, setAuth] = useState({});
    const [loginData, setLoginData] = useState({
        id: '',
        pw: ''
    })
    const communityList = [
        { label: '공지사항', table: 'notice' },
        { label: '공식블로그', table: 'blog' },
        { label: '방문후기', table: 'shop_review' },
        { label: '자유게시판', table: 'freeboard' },
        { label: '가입인사', table: 'greeting' },
    ]
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: <div />,
        prevArrow: <div />,
    };
    const shop_banner_settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
    };
    const text_banner_settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
    };
    useEffect(() => {
        async function myAuth() {
            const { data: response } = await axios.get(`/api/auth`);
            setAuth(response);
        }
        myAuth();
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get('/api/gethomecontent')
            let banner_list = [];
            let banner_link_list = [];
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`home_banner_img_${i}`]) {
                    await banner_list.push(`${response?.data?.banner[`home_banner_img_${i}`]}`);
                    await banner_link_list.push(`${response?.data?.banner[`home_banner_link_${i}`]}`);

                }
            }
            let shop_banner_list = [];
            let shop_banner_link_list = [];
            for (var i = 1; i <= 10; i++) {
                if (response?.data?.banner[`shop_banner_img_${i}`]) {
                    await shop_banner_list.push(`${response?.data?.banner[`shop_banner_img_${i}`]}`);
                    await shop_banner_link_list.push(`${response?.data?.banner[`shop_banner_link_${i}`]}`);

                }
            }
            console.log(shop_banner_list)
            setHomeContent(response?.data);
            setCityList(response?.data?.city ?? []);
            setBanners(banner_list);
            setBannerLinks(banner_link_list);
            setShopBanners(shop_banner_list);
            setShopBannerLinks(shop_banner_link_list);
            setThemeList(response?.data?.theme ?? []);
            setLoading(false);
        }
        fetchPost();

    }, [])
    const onLogin = async () => {
        const { data: response } = await axios.post('/api/loginbyid', {
            id: loginData.id,
            pw: loginData.pw,
        })
        alert(response.message);
        if (response.result > 0) {
            let params = {
                'login_type': 0,
                'id': loginData.id,
            }
            if (window && window.flutter_inappwebview) {
                await window.flutter_inappwebview.callHandler('native_app_login', JSON.stringify(params)).then(async function (result) {
                    //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                    // JSON.parse(result)
                    let obj = JSON.parse(result);
                });
            }
            await localStorage.setItem('auth', JSON.stringify(response.data));
            window.location.reload();

        }
    }
    const onLogout = async () => {
        if (window && window.flutter_inappwebview) {
            var params = { 'login_type': JSON.parse(localStorage.getItem('auth'))?.type };
            window.flutter_inappwebview.callHandler('native_app_logout', JSON.stringify(params)).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
            });
        }
        const { data: response } = await axios.post('/api/logout');
        if (response.result > 0) {
            localStorage.removeItem('auth');
            window.location.reload();
        } else {
            alert('error');
        }
    }
    return (
        <>
            <WrappersStyle style={{ maxWidth: '1150px' }}>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <TopContainer>
                            <TopContent onClick={() => { router.push(`/shop-list`) }}>지역별업소</TopContent>
                            <TopContent onClick={() => { router.push(`/shop-list`) }}>테마별업소</TopContent>
                            <TopContent onClick={() => { router.push(`/community-list/freeboard`) }}>커뮤니티</TopContent>
                            <TopContent onClick={() => { router.push(`/add-community/request`) }}>1:1문의</TopContent>
                        </TopContainer>
                        <Slider {...settings} className='board-container pointer slider1'>
                            {banners.length > 0 && banners.map((item, idx) => (
                                <>
                                    <LazyLoadImage
                                        alt={"#"}
                                        effect="blur"
                                        src={item}
                                        className="banner-img"
                                        onClick={() => {
                                            window.location.href = bannerLinks[idx]
                                        }}
                                    />
                                </>
                            ))}
                        </Slider>

                    </>}
            </WrappersStyle>
            <Wrappers className='wrappers' style={{ marginTop: '2rem', maxWidth: '1180px' }}>
                {loading ?
                    <>
                    </>
                    :
                    <>
                        <RowContent style={{ rowGap: '1rem', alignItems: 'flex-start', columnGap: '1rem' }}>
                            <NoneShowCol>
                                <LeftImg src={homeContent?.banner?.home_left_img} style={{ width: '232px' }} onClick={() => {
                                    window.location.href = homeContent?.banner?.home_left_link
                                }} />
                                <ShopOptionWrappers display={'none'}>
                                    <Font3 style={{ fontWeight: 'bold' }}>지역별샵</Font3>
                                    {cityList && cityList.map((item, idx) => (
                                        <>
                                            <Font4 style={{ cursor: 'pointer' }} onClick={() => {
                                                router.push(`/shop-list?city=${item?.pk}`)
                                            }}>{item?.name}</Font4>

                                        </>
                                    ))}
                                    <Font3 style={{ fontWeight: 'bold', marginTop: '1rem' }}>테마별샵</Font3>
                                    {themeList && themeList.map((item, idx) => (
                                        <>
                                            <Font4 style={{ cursor: 'pointer' }} onClick={() => {
                                                router.push(`/shop-list?theme=${item?.pk}`)
                                            }}>{item?.name}</Font4>
                                        </>
                                    ))}
                                </ShopOptionWrappers>
                            </NoneShowCol>
                            <Col style={{ rowGap: '1rem', maxWidth: '700px' }}>
                                <SearchContainer>
                                    <TextField
                                        id='size-small'
                                        onChange={(e) => {
                                            setKeyword(e.target.value)
                                        }}
                                        placeholder='지역명, 전철역, 업소명'
                                        value={keyword}
                                        sx={{ width: '100%', margin: '0 auto', maxWidth: '680px' }}
                                        onKeyPress={(e) => {
                                            if (e.key == 'Enter') {
                                                router.push(`/shop-list?keyword=${keyword}`)
                                            }
                                        }}

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={() => {
                                                            router.push(`/shop-list?keyword=${keyword}`)
                                                            setKeyword('')
                                                        }}
                                                        aria-label='toggle password visibility'
                                                    >
                                                        <Icon icon={'tabler:search'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </SearchContainer>
                                <ThemeCardContainer>
                                    {themeList && themeList.map((item, idx) => (
                                        <>
                                            <ThemeContent>
                                                <ThemeCard src={item?.img_src || '/assets/images/test/logo.png'} idx={idx} onClick={() => {
                                                    router.push(`/shop-list?theme=${item?.pk}`)
                                                }} />
                                                <ThemeText style={{ fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }} onClick={() => {
                                                    router.push(`/shop-list?theme=${item?.pk}`)
                                                }}>{item?.name}</ThemeText>
                                            </ThemeContent>
                                        </>
                                    ))}
                                </ThemeCardContainer>
                                <ShopBannerContainer>
                                    <Slider {...shop_banner_settings} className='pointer'>
                                        {shopBanners.length > 0 && shopBanners.map((item, idx) => (
                                            <>
                                                <LazyLoadImage
                                                    alt={"#"}
                                                    effect="blur"
                                                    src={item}
                                                    className="banner-img-2"
                                                    onClick={() => {
                                                        window.location.href = shopBannerLinks[idx]
                                                    }}
                                                />
                                            </>
                                        ))}
                                    </Slider>
                                </ShopBannerContainer>
                                <Typography variant='h1' style={{ fontWeight: 'bold', margin: 'auto', textAlign: 'center', fontSize: '20px' }}>마사지 스웨디시 타이마사지 건마 1인샵 홈타이 출장마사지 1위 마사지 사이트 【마사지밤】</Typography>
                                <RealTimeContainer>
                                    <Slider {...text_banner_settings} className='pointer'>
                                        {homeContent?.real_time_shop && homeContent?.real_time_shop.map((item, idx) => (
                                            <>
                                                <TextSlideContent
                                                    onClick={() => {
                                                        router.push(`/shop/${item?.pk}`)
                                                    }}
                                                >
                                                    <Chip label={idx + 1} style={{ background: '#1976d2', color: '#fff' }} />
                                                    <div variant='subtitle2'>{item?.city_name}</div>
                                                    <div variant='subtitle2'>{item?.sub_city_name}</div>
                                                    <div variant='subtitle2'>{item?.name}</div>
                                                </TextSlideContent>
                                            </>
                                        ))}
                                    </Slider>
                                </RealTimeContainer>
                                <HotPlaceContainer style={{}}>
                                    <CommunityHeader>
                                        <Typography variant='h6' style={{ fontWeight: 'bold', margin: 'auto', textAlign: 'center' }}>실시간 핫플레이스 샵</Typography>
                                    </CommunityHeader>
                                    <Tabs value={hotPlaceTab} aria-label="basic tabs example" style={{ width: '100%' }}>
                                        <Tab label="1~10위" onClick={() => { setHotPlaceTab(0) }} value={0} style={{ width: '50%' }} />
                                        <Tab label="11~20위" onClick={() => { setHotPlaceTab(1) }} value={1} style={{ width: '50%' }} />
                                    </Tabs>
                                    <Col style={{ padding: '0.5rem', rowGap: '1rem' }}>
                                        {homeContent?.hop_place_shop && homeContent?.hop_place_shop.map((item, idx) => (
                                            <>
                                                {(idx >= hotPlaceTab * 10 && idx < (hotPlaceTab + 1) * 10) &&
                                                    <>
                                                        <CommunityContent style={{ justifyContent: 'flex-start', columnGap: '0.2rem', fontSize: '16px', alignItems: 'center' }} onClick={() => {
                                                            router.push(`/shop/${item?.pk}`)
                                                        }}>
                                                            <div style={{ fontSize: '20px', marginRight: '0.5rem' }}>{idx + 1}</div>
                                                            <div>{item?.city_name}</div>
                                                            <div>{item?.sub_city_name}</div>
                                                            <div>{item?.name}</div>
                                                        </CommunityContent>
                                                    </>}
                                            </>
                                        ))}
                                    </Col>
                                </HotPlaceContainer>
                                <Typography variant="h6" style={{ fontWeight: 'bold', margin: '2rem auto 0 auto !important' }} sx={{ margin: '2rem auto 0 auto' }}>프리미엄 제휴업체</Typography>
                                <Typography variant="body1" style={{ margin: '-1rem auto 1rem auto', color: '#ccc' }}>마사지밤에서 인정한 프리미엄 업체</Typography>
                                <MerchandiseContainer>
                                    {homeContent?.shop && homeContent?.shop.filter(el => el?.is_premium == 1).map((item, idx) => (
                                        <>
                                            <Merchandise
                                                router={router}
                                                item={item}
                                                is_home={true}
                                            />
                                        </>
                                    ))}
                                </MerchandiseContainer>
                                <Typography variant="h6" style={{ fontWeight: 'bold', margin: '2rem auto 0 auto !important' }} sx={{ margin: '2rem auto 0 auto' }}>신규 제휴업체</Typography>
                                <Typography variant="body1" style={{ margin: '-1rem auto 1rem auto', color: '#ccc' }}>마사지밤과 새롭게 제휴한 신규업체</Typography>

                                <MerchandiseContainer>
                                    {homeContent?.shop && homeContent?.shop.filter(el => el?.is_premium == 0).map((item, idx) => (
                                        <>
                                            <Merchandise
                                                router={router}
                                                item={item}
                                                is_home={true}
                                            />
                                        </>
                                    ))}
                                </MerchandiseContainer>
                                <CommunityWrappers display={'flex'}>
                                    {communityList.map((community) => (
                                        <>
                                            <CommunityContainer>
                                                <CommunityHeader onClick={() => {
                                                    router.push(`/community-list/${community.table}/`)
                                                }}>{community.label}</CommunityHeader>
                                                <Col style={{ padding: '0.5rem', rowGap: '0.25rem' }}>
                                                    {homeContent[community.table] && homeContent[community.table].map((itm) => (
                                                        <>
                                                            <CommunityContent onClick={() => {
                                                                router.push(`/post/${community.table}/${itm?.pk}`)
                                                            }}>
                                                                <div>{itm?.title?.length > 12 ? `${itm?.title.slice(0, 12)}...` : itm?.title}</div>
                                                                <div style={{ color: '#aaa' }}>{dateFormat(itm?.date)}</div>
                                                            </CommunityContent>
                                                        </>
                                                    ))}
                                                </Col>

                                            </CommunityContainer>
                                        </>
                                    ))}
                                </CommunityWrappers>
                            </Col>
                            <CommunityWrappers display={'none'}>
                                <CommunityContainer>
                                    {auth?.pk > 0 ?
                                        <>
                                            <Col style={{ justifyContent: 'space-around', height: '100%', padding: '0.5rem', rowGap: '1rem', alignItems: 'center' }}>
                                                <Avatar />
                                                <div>
                                                    {auth?.nickname}
                                                </div>
                                                <div style={{ display: 'flex', columnGap: '0.5rem' }}>
                                                    <Button onClick={() => {
                                                        router.push('/mypage')
                                                    }} variant='contained'>마이페이지</Button>
                                                    <Button onClick={onLogout} variant='outlined'>로그아웃</Button>
                                                </div>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col style={{ justifyContent: 'space-around', height: '100%', padding: '1rem', rowGap: '0' }}>
                                                <TextField size='small' label='아이디' style={{ marginBottom: '0.7rem' }} onChange={(e) => {
                                                    setLoginData({
                                                        ...loginData,
                                                        id: e.target.value
                                                    })
                                                }} />
                                                <TextField size='small' label='비밀번호' style={{ marginBottom: '0.7rem' }} type='password' onChange={(e) => {
                                                    setLoginData({
                                                        ...loginData,
                                                        pw: e.target.value
                                                    })
                                                }} />
                                                <Button onClick={onLogin} variant='contained'>로그인</Button>
                                                <div style={{ marginLeft: 'auto', fontSize: '12px', textDecoration: 'underline', marginTop: '0.5rem', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        router.push('/signup')
                                                    }}
                                                >회원가입</div>
                                            </Col>
                                        </>}
                                </CommunityContainer>
                                <Button onClick={() => {
                                    router.push('/add-shop')
                                }} variant='contained'>제휴문의</Button>
                                {communityList.map((community) => (
                                    <>
                                        <CommunityContainer>
                                            <CommunityHeader>{community.label}</CommunityHeader>
                                            <Col style={{ padding: '0.5rem', rowGap: '0.25rem' }}>
                                                {homeContent[community.table] && homeContent[community.table].map((itm) => (
                                                    <>
                                                        <CommunityContent onClick={() => {
                                                            router.push(`/post/${community.table}/${itm?.pk}`)
                                                        }}>
                                                            <div>{itm?.title?.length > 12 ? `${itm?.title.slice(0, 12)}...` : itm?.title}</div>
                                                            <div style={{ color: '#aaa' }}>{dateFormat(itm?.date)}</div>
                                                        </CommunityContent>
                                                    </>
                                                ))}
                                            </Col>

                                        </CommunityContainer>
                                    </>
                                ))}
                            </CommunityWrappers>
                        </RowContent>
                        {/* {!window?.ReactNativeWebView &&
                            <>
                                <RowContent style={{ margin: '4rem 0 0 0', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => {
                                    window.location.href = 'https://play.google.com/store/apps/details?id=com.dooseob25.mago';
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                        <div style={{ margin: 'auto auto 0.5rem auto' }}>
                                            마사지밤 어플 출시!!
                                        </div>
                                        <div style={{ margin: '0.5rem auto auto auto' }}>
                                            지금 바로 다운 받으세요!!
                                        </div>
                                    </div>
                                    <img src={playStoreSrc} style={{ width: '50%', }} alt="#" />
                                </RowContent>
                            </>} */}

                    </>}

            </Wrappers>
        </>
    )
}
Home.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Home;