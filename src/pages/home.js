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
import { Row } from 'src/components/elements/ManagerTemplete';
import theme from 'src/styles/theme';
import { useRouter } from 'next/router';
import UserLayout from 'src/layouts/UserLayout';

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
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 60px;
grid-row-gap: 10px;
row-gap: 30px;
margin:2rem auto;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}
@media (max-width: 650px) {
    
}
@media (max-width: 550px) {
  column-gap: 4.2vw;
}
`
const CityCard = styled.img`
width: 23%;
height:66px;
margin:0.5rem 1%;
cursor:pointer;
@media screen and (max-width:1050px) { 
    width: 40vw;
    height: 10vw;
    margin:0.5rem 2.5%;
}
`
const HalfImg = styled.img`
width: 100%;
border-radius:32px;
box-shadow:${props => props.theme.boxShadow};
cursor:pointer;
`
const ThreeHalfImg = styled.img`
width: 30%;
border-radius:16px;
box-shadow:${props => props.theme.boxShadow};
`
const Mobile90PercentContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin: 0 auto;
@media screen and (max-width:1050px) { 
    width: 90%;
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

    const [banners, setBanners] = useState([]);
    const [bannerLinks, setBannerLinks] = useState([]);
    const [cityList, setCityList] = useState([])
    const [shopList, setShopList] = useState([])
    const [setting, setSetting] = useState({});
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
            console.log(response?.data)
            setSetting(response?.data?.banner ?? {})
            let banner_list = [];
            let banner_link_list = [];
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`home_banner_img_${i}`]) {
                    await banner_list.push(`${response?.data?.banner[`home_banner_img_${i}`]}`);
                    await banner_link_list.push(`${response?.data?.banner[`home_banner_link_${i}`]}`);

                }
            }
            setCityList(response?.data?.city ?? []);
            setBanners(banner_list);
            setBannerLinks(banner_link_list);
            setShopList(response?.data?.shop ?? []);
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
                <h1 style={{ margin: '1rem auto', fontSize: theme.size.font2 }}>{setting?.main_home_title}</h1>
                <Mobile90PercentContainer style={{ marginTop: '1rem' }}>
                    <Row style={{ flexDirection: 'column', width: '48.5%' }}>
                        <HalfImg src={koreanImg} onClick={() => router.push('/shop-list?is_around=1&theme=6')} />
                        <a style={{ margin: '0 auto', textDecoration: 'none', color: '#000' }} href={`/shop-list?is_around=1&theme=6`}>
                            <h2>한국인출장</h2>
                        </a>
                    </Row>
                    <Row style={{ flexDirection: 'column', width: '48.5%' }}>
                        <HalfImg src={homeTaiImg} onClick={() => router.push('/shop-list?is_around=1&theme=4')} />
                        <a style={{ margin: '0 auto', textDecoration: 'none', color: '#000' }} href={`/shop-list?is_around=1&theme=4`}>
                            <h2>홈타이</h2>
                        </a>
                    </Row>
                </Mobile90PercentContainer>
                <Mobile90PercentContainer style={{ marginTop: '1rem' }}>
                    <Row style={{ flexDirection: 'column', width: '48.5%' }}>
                        <HalfImg src={shop1Img} onClick={() => router.push('/shop-list?is_around=1&theme=9')} />
                        <a style={{ margin: '0 auto', textDecoration: 'none', color: '#000' }} href={`/shop-list?is_around=1&theme=9`}>
                            <h2>1인샵</h2>
                        </a>
                    </Row>
                    <Row style={{ flexDirection: 'column', width: '48.5%' }}>
                        <HalfImg src={requestGif} onClick={() => router.push('/add-shop')} />
                        <a style={{ margin: '0 auto', textDecoration: 'none', color: '#000' }} href={`/add-shop`}>
                            <h2>제휴문의</h2>
                        </a>
                    </Row>
                </Mobile90PercentContainer>
            </WrappersStyle>
            <Wrappers className='wrappers' style={{ marginTop: '0.5rem' }}>
                {loading ?
                    <>
                    </>
                    :
                    <>


                        <img src={locationGoToImg} style={{ width: '90%', margin: '0 auto', maxWidth: '700px' }} />
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {cityList && cityList.map((item, idx) => (
                                <>
                                    <CityCard src={item?.img_src} idx={idx} onClick={() => {
                                        router.push(`/shop-list?city=${item?.pk}`)
                                    }} />
                                </>
                            ))}
                        </RowContent>
                        {!window?.ReactNativeWebView &&
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
                            </>}

                    </>}
                <MerchandiseContainer>
                    {shopList && shopList.map((item, idx) => (
                        <>
                            <Merchandise
                                router={router}
                                item={item}
                            />
                        </>
                    ))}
                </MerchandiseContainer>
            </Wrappers>
        </>
    )
}
Home.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Home;