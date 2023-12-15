import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import Slider from 'react-slick'
import axios from 'axios';
import { backUrl } from 'src/data/Data';
import { Wrappers, RowContent } from 'src/components/elements/UserContentTemplete';
import Loading from 'src/components/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const playStoreSrc = 'assets/images/test/google-play.jpg'
import { Merchandise } from './shop-list';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
const homeTaiImg = '/assets/images/banner/hometai.jpg'
const koreanImg = '/assets/images/banner/korean.jpg'
const shop1Img = '/assets/images/banner/1shop.jpg'
const locationGoToImg = '/assets/images/test/loacation_go_to.png'
const requestGif = '/assets/images/banner/request.gif'
import { Col, Font3, Font4, Font5, Row } from 'src/components/elements/ManagerTemplete';
import theme from 'src/styles/theme';
import { useRouter } from 'next/router';
import UserLayout from 'src/layouts/UserLayout';
import { dateFormat } from 'src/functions/utils';
import { Typography } from '@mui/material';

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
font-size: ${theme.size.font4};
cursor: pointer;
`
const ThemeCardContainer = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 0.75rem;
@media screen and (max-width:1050px) { 
    column-gap: 1.2vw;
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
width:250px;
display: flex;
flex-direction: column;
row-gap: 1rem;
@media screen and (max-width:1050px) { 
    display: none;
}
`
const CommunityContainer = styled.div`
display: flex;
flex-direction: column;
border: 1px solid 1px;
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
`
const CommunityContent = styled.div`
cursor: pointer;
font-size: ${theme.size.font5};
display: flex;
justify-content: space-between;

`
const ShopOptionWrappers = styled.div`
width:218px;
display: flex;
flex-direction: column;
background: ${theme.color.background4};
padding: 1rem;
row-gap: 0.5rem;
border-radius: 0.5rem;
@media screen and (max-width:1050px) { 
    display: none;
}
`
const ShopOptionContainer = styled.div`
`
const ShopOption = styled.div`

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
    const [cityList, setCityList] = useState([])
    const [themeList, setThemeList] = useState([])
    const [shopList, setShopList] = useState([])
    const [setting, setSetting] = useState({});
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
        nextArrow: <NextArrow onClick />,
        prevArrow: <PrevArrow onClick />,
    };

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get('/api/gethomecontent')
            setSetting(response?.data?.banner ?? {})
            let banner_list = [];
            let banner_link_list = [];
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`home_banner_img_${i}`]) {
                    await banner_list.push(`${response?.data?.banner[`home_banner_img_${i}`]}`);
                    await banner_link_list.push(`${response?.data?.banner[`home_banner_link_${i}`]}`);

                }
            }
            setHomeContent(response?.data);
            setCityList(response?.data?.city ?? []);
            setBanners(banner_list);
            setBannerLinks(banner_link_list);
            setShopList(response?.data?.shop ?? []);
            setThemeList(response?.data?.theme ?? []);
            setLoading(false);
        }
        fetchPost();

    }, [])

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
            <Wrappers className='wrappers' style={{ marginTop: '2rem', maxWidth: '1150px' }}>
                {loading ?
                    <>
                    </>
                    :
                    <>
                        <RowContent style={{ columnGap: '1rem', alignItems: 'flex-start' }}>
                            <ShopOptionWrappers>
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
                            <Col style={{ rowGap: '1rem' }}>
                                <ThemeCardContainer>
                                    {themeList && themeList.map((item, idx) => (
                                        <>
                                            <Col style={{ alignItems: 'center' }}>
                                                <ThemeCard src={item?.img_src || '/assets/images/test/logo.png'} idx={idx} onClick={() => {
                                                    router.push(`/shop-list?theme=${item?.pk}`)
                                                }} />
                                                <Font5 style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
                                                    router.push(`/shop-list?theme=${item?.pk}`)
                                                }}>{item?.name}</Font5>
                                            </Col>
                                        </>
                                    ))}
                                </ThemeCardContainer>
                                <Typography style={{ fontWeight: 'bold' }}>실시간 샵 검색 확인</Typography>
                            </Col>
                            <CommunityWrappers>
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