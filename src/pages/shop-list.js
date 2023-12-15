import axios from "axios";
import { useEffect, useState } from "react";
import { RowContent, Wrappers } from "src/components/elements/UserContentTemplete";
import { backUrl } from "src/data/Data";
import theme from "src/styles/theme";
import styled from "styled-components";
import { commarNumber, getLocation } from "src/functions/utils";
import Loading from "src/components/Loading";
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Font2, Font3, Font4, Font5, Font6, Row } from "src/components/elements/ManagerTemplete";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";
const MerchandiseContainer = styled.div`
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 60px;
grid-row-gap: 10px;
row-gap: 30px;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}

`

const MerchandiseImg = styled.img`
width: 100%;
height: 50%;
margin:0 auto;
border-top-right-radius:10px;
border-top-left-radius:10px;

`
const MerchandiseExplain = styled.div`
width: 90%;
height: 45%;
margin: auto auto 0 auto;
display:flex;
flex-direction:column;
@media (max-width: 1350px) {
  font-size:${theme.size.font4};
  height: 45%;
}

`
const OptionContainer = styled.div`
box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);
padding:1rem;
display:flex;
flex-direction:column;
row-gap: 0.5rem;
`
const convertText = (text) => {
    if (!text) {
        return ""
    }
    return text.repla
}
export const Merchandise = (props) => {

    const { item, router } = props;
    const [shop, setShop] = useState({});
    useEffect(() => {
        setShop(item)
    }, [])
    return (
        <>
            <motion.a
                href={`/shop/${item?.pk}`}
                whileHover={{ scale: 1.01, boxShadow: `4px 12px 30px 6px rgba(0, 0, 0, 0.19)`, transform: `translateY(-0.5rem)` }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
                style={{
                    background: '#fff',
                    textDecoration: 'none',
                    color: '#000'
                }}
                className='merchandise-content'
            >
                <MerchandiseImg src={item?.img_src} alt={item?.img_src_alt} />
                <MerchandiseExplain>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: '0 0 auto 0' }}>
                        <div>댓글 {item?.comment_count} | 리뷰 {item?.review_count}</div>
                    </Font5>
                    <Font4 style={{ margin: 'auto 0' }}>{item?.name}</Font4>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <h3 style={{ margin: '0' }}>{item?.theme_name}</h3>
                    </Font5>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <div>{item?.city_name} {item?.sub_city_name}</div>
                    </Font5>

                    {item?.distance ?
                        <>
                            <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                                <Font4>
                                    <Icon icon='material-symbols:distance-outline' />
                                </Font4>
                                <div style={{ marginLeft: '0.5rem' }}>{commarNumber(item?.distance)} KM</div>
                            </Font5>
                        </>
                        :
                        <>
                        </>}
                </MerchandiseExplain>
            </motion.a>
        </>
    )
}

const ShopList = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([])
    const [themeList, setThemeList] = useState([]);
    const [theme, setTheme] = useState(0)
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState(0);
    const [subCityList, setSubCityList] = useState([]);
    const [subCity, setSubCity] = useState(0);
    const [searchObj, setSearchObj] = useState({});
    useEffect(() => {
        setLoading(true);
        getThemeList();
        getCityList();
        getShops(router.query);
    }, []);

    const getThemeList = async () => {
        const { data: response } = await axios.get(`/api/items?table=shop_theme&order=sort`);
        setThemeList(response?.data);
    }
    const getCityList = async () => {
        const { data: response } = await axios.get(`/api/items?table=city&order=sort`);
        setCityList(response?.data);
    }
    const getSubCityList = async (city_pk) => {
        const { data: response } = await axios.get(`/api/items?table=sub_city&order=sort&city_pk=${city_pk}`);
        setSubCityList(response?.data);
    }
    useEffect(() => {
        let obj = router.query
        if (city == 0 || !city) {
            if (!router.query?.city) {
                delete obj['city'];
                delete obj['sub_city'];
                setSubCity(0);
                setSubCityList([])
            }

        } else {
            obj['city'] = city;
            getSubCityList(city)
        }
    }, [city])
    // useEffect(() => {
    //     let obj = router.query
    //     if (theme == 0 || !theme) {
    //         delete obj['theme'];
    //     } else {
    //         obj['theme'] = theme;
    //     }
    //     console.log(obj)
    //     router.push(`/shop-list`,{
    //         query: obj
    //     })

    // }, [theme])
    // useEffect(() => {
    //     let obj = router.query;
    //     if (subCity == 0 || !subCity) {
    //         delete obj['sub_city'];
    //     } else {
    //         obj['sub_city'] = subCity;
    //     }
    //     console.log(obj)
    //     router.push(`/shop-list`, {
    //         query: obj
    //     })
    // }, [subCity])
    const getShops = async (search_obj) => {
        setLoading(true);
        let obj = { ...search_obj };
        setTheme(search_obj?.theme ?? 0);
        setCity(search_obj?.city ?? 0);
        setSubCity(search_obj?.sub_city ?? 0);
        setSearchObj(obj);
        router.push('/shop-list', {
            query: obj
        })
        const { data: response } = await axios.post('/api/shops', obj)
        let shops = response?.data;
        if (obj?.is_around) {
            let locate = await getLocation();
            for (var i = 0; i < shops.length; i++) {
                let x = (Math.cos(locate?.latitude) * 6400 * 2 * 3.14 / 360) * Math.abs(locate?.longitude - shops[i].lng)
                let y = 111 * Math.abs(locate?.latitude - shops[i].lat)
                let d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                shops[i]['distance'] = d
            }
            shops = shops.sort(function (a, b) {
                return a.distance - b.distance;
            });
        }
        setShops(shops)
        setLoading(false);
    }
    return (
        <>
            <Wrappers className="post-container">
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <OptionContainer>
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>지역별 선택</Typography>
                            <RowContent style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Button size="small" variant={!city ? 'contained' : 'outlined'} onClick={() => {
                                    let obj = searchObj;
                                    delete obj['city'];
                                    getShops(obj)
                                }}>전체</Button>
                                {cityList.map((item, idx) => {
                                    return <Button size="small" variant={city == item?.pk ? 'contained' : 'outlined'} onClick={() => {
                                        let obj = searchObj;
                                        delete obj['sub_city'];
                                        getShops({
                                            ...obj,
                                            city: item?.pk
                                        })
                                    }}>{item.name}</Button>
                                })}
                            </RowContent>
                            <RowContent style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Button size="small" variant={!subCity ? 'contained' : 'text'} style={{ boxShadow: 'none' }} onClick={() => {
                                    let obj = searchObj;
                                    delete obj['sub_city'];
                                    getShops(obj)
                                }}>전체</Button>
                                {subCityList.map((item, idx) => {
                                    return <Button size="small" variant={subCity == item?.pk ? 'contained' : 'text'} style={{ boxShadow: 'none' }} onClick={() => {
                                        getShops({
                                            ...searchObj,
                                            sub_city: item?.pk
                                        })
                                    }}>{item.name}</Button>
                                })}
                            </RowContent>
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>테마별 선택</Typography>
                            <RowContent style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Button size="small" variant={!theme ? 'contained' : 'outlined'} onClick={() => {
                                    let obj = searchObj;
                                    delete obj['theme'];
                                    getShops(obj)
                                }}>전체</Button>
                                {themeList.map((item, idx) => {
                                    return <Button size="small" variant={theme == item?.pk ? 'contained' : 'outlined'} onClick={() => {
                                        getShops({
                                            ...searchObj,
                                            theme: item?.pk
                                        })
                                    }}>{item.name}</Button>
                                })}
                            </RowContent>
                        </OptionContainer>
                        <Typography style={{ fontWeight: 'bold', margin: '2rem auto 1rem auto' }}>프리미엄 업체</Typography>
                        <MerchandiseContainer>
                            {shops && shops.map((item, idx) => (
                                <>
                                    {item?.is_premium == 1 &&
                                        <>
                                            <Merchandise
                                                router={router}
                                                item={item}
                                            />
                                        </>}
                                </>
                            ))}
                        </MerchandiseContainer>
                        <Typography style={{ fontWeight: 'bold', margin: '2rem auto 1rem auto' }}>신규 업체</Typography>

                        <MerchandiseContainer>
                            {shops && shops.map((item, idx) => (
                                <>
                                    {item?.is_premium == 0 &&
                                        <>
                                            <Merchandise
                                                router={router}
                                                item={item}
                                            />
                                        </>}
                                </>
                            ))}
                        </MerchandiseContainer>
                    </>
                }
            </Wrappers>
        </>
    )
}
ShopList.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ShopList;