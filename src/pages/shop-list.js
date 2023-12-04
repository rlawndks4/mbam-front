import axios from "axios";
import { useEffect, useState } from "react";
import { Wrappers } from "src/components/elements/UserContentTemplete";
import { backUrl } from "src/data/Data";
import theme from "src/styles/theme";
import styled from "styled-components";
import { commarNumber, getLocation } from "src/functions/utils";
import Loading from "src/components/Loading";
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Font2, Font3, Font4, Font5, Font6, Row } from "src/components/elements/ManagerTemplete";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";
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

const MerchandiseImg = styled.img`
width: 100%;
height: 50%;
margin:0 auto;
border-bottom-right-radius:10px;
border-bottom-left-radius:10px;
@media (max-width: 650px) {
    width:30vw;
    height:18vw;
    border-radius:10px;
    margin:auto auto auto 1rem;
}
`
const MerchandiseExplain = styled.div`
width: 90%;
height: 45%;
margin: auto auto 0 auto;
display:flex;
flex-direction:column;
@media (max-width: 1350px) {
  font-size:${theme.size.font4};
}
@media (max-width: 650px) {
    width:60vw;
    height: 80%;
    margin:auto auto auto 0.5rem;
    padding:2vw;
}
`
const OptionContainer = styled.div`
box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);
padding:1rem;
display:flex;
flex-direction:column;
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
                <MerchandiseExplain>
                    <Font3 style={{ margin: '0 auto auto 0' }}>{item?.name}</Font3>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='mdi:theme-outline' />
                        <h3 style={{ margin: '0 0 0 0.5rem' }}>{item?.theme_name}</h3>
                    </Font5>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='mdi:home-city-outline' />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.city_name}</div>
                    </Font5>
                    <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='material-symbols:location-on-outline' />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.address}</div>
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
                    <Font4 style={{ height: '10%', display: 'flex', alignItems: 'center', margin: 'auto 0 0.5rem auto', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', marginTop: 'auto' }}>
                            {item?.option_list && item?.option_list.map((itm, idx) => (
                                <>
                                    <Font6 style={{ background: theme.color.background1, color: '#fff', borderRadius: '4px', padding: '2px', marginRight: '2px' }}>{itm?.name}</Font6>
                                </>
                            ))}
                        </div>
                        {item?.country_list && item?.country_list.map((item, idx) => (
                            <>
                                <img src={item?.img_src} style={{ height: '1rem', marginLeft: '0.5rem' }} alt="#" />
                            </>
                        ))}
                    </Font4>
                </MerchandiseExplain>
                <MerchandiseImg src={item?.img_src} alt={item?.img_src_alt} />
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
            delete obj['city'];
            delete obj['sub_city'];
            setSubCity(0);
            setSubCityList([])
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
                            <FormControl>
                                <InputLabel>테마선택</InputLabel>
                                <Select
                                    label='테마선택'
                                    value={theme}
                                    onChange={e => {
                                        getShops({
                                            ...searchObj,
                                            theme: e.target.value
                                        })
                                    }}
                                >
                                    <MenuItem value={0}>전체</MenuItem>
                                    {themeList.map((item, idx) => {
                                        return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <div style={{ display: 'flex', width: '100%', marginTop: '1rem', justifyContent: 'space-between' }}>
                                <FormControl sx={{ width: '48%', maxWidth: '600px' }}>
                                    <InputLabel>도시선택</InputLabel>
                                    <Select
                                        label='도시선택'
                                        value={city}
                                        onChange={e => {
                                            getShops({
                                                ...searchObj,
                                                city: e.target.value
                                            })
                                        }}
                                    >
                                        <MenuItem value={0}>전체</MenuItem>
                                        {cityList.map((item, idx) => {
                                            return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: '48%', maxWidth: '600px' }}>
                                    <InputLabel>구선택</InputLabel>
                                    <Select
                                        label='구선택'
                                        value={subCity}
                                        onChange={e => {
                                            getShops({
                                                ...searchObj,
                                                sub_city: e.target.value
                                            })
                                        }}
                                    >
                                        <MenuItem value={0}>전체</MenuItem>
                                        {subCityList.map((item, idx) => {
                                            return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </OptionContainer>
                        <MerchandiseContainer>
                            {shops && shops.map((item, idx) => (
                                <>
                                    <Merchandise
                                        router={router}
                                        item={item}
                                    />
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