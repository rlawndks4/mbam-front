import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { logoSrc } from '../data/Data';
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { backUrl, zBottomMenu } from '../data/Data';
import { MdNavigateBefore } from 'react-icons/md';
import theme from '../styles/theme';
import { IoMdArrowBack } from 'react-icons/io';
import $ from 'jquery';
import { getLocation, onClickExternalLink, returnMoment } from '../functions/utils';
import { IoMdClose } from 'react-icons/io'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RowContent, TextButton } from '../components/elements/UserContentTemplete';
const logoTextColorImg = '/assets/images/test/logo_test_color.png'
import { useRouter } from 'next/router';
import { Button, CardContent, Drawer, IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { Font4 } from 'src/components/elements/ManagerTemplete';
import DialogSearch from 'src/components/DialogSearch';
const Header = styled.header`
position:fixed;
height:6rem;
width:100%;
top:0rem;
z-index:10;
background:#fff;
@media screen and (max-width:1050px) { 
  top:0;
  height:3.5rem;
}
`
const HeaderContainer = styled.div`
width:90%;
position:relative;
max-width:1150px;
margin:0 auto;
display:none;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1050px) { 
  display:flex;
}
`
const HeaderMenuContainer = styled.div`
width:90%;
max-width:1150px;
position:relative;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;

@media screen and (max-width:1050px) { 
}
`
const HeaderMenu = styled.div`
text-align:center;
font-size:${props => props.theme.size.font3};
padding:2.6rem 0.3rem;
margin-right:1rem;
font-weight:bold;
cursor:pointer;
position:relative;
&:hover{  
  color:${(props) => props.theme.color.background1};
}
@media screen and (max-width:1200px) { 
  font-size:${props => props.theme.size.font4};
}
`
const SearchInput = styled.input`
outline:none;
border:none;
border-bottom:1px solid #cccccc;
border-radius:0;
width:80%;
padding:10px 0;
margin:0 6px;
font-size:12px;
::placeholder {
  color:#dddddd;
  font-size:12px;
}
`

const PopupContainer = styled.div`
position:absolute;
top:16px;
left:0px;
display:flex;
flex-wrap:wrap;
`
const PopupContent = styled.div`
background:#fff;
margin:16px 16px auto 0;
padding:24px 24px 48px 24px;
box-shadow:${props => props.theme.boxShadow};
border-radius:8px;
min-height:200px;
position:relative;
opacity:0.95;
z-index:10;
cursor:pointer;
@media screen and (max-width:400px) { 
width:78vw;
}
`
const TopBannerContainer = styled.div`
position:absolute;
top:-4rem;
width:100%;
height:4rem;
background:#EBFDFF;
display:flex;
font-size:${props => props.theme.size.font2};
align-items:center;
font-weight:bold;
cursor:pointer;
@media screen and (max-width:1050px) { 
  top:3.5rem;
  height:2rem;
  font-size:${props => props.theme.size.font4};
}
`
const NoneShowMobile = styled.div`
display: flex;
font-size: ${theme.size.font5};
justify-content: space-between ;
position: relative;
@media screen and (max-width:1050px) { 
  display: none;
}
`
const ShowMobile = styled.div`
display: none;
@media screen and (max-width:1050px) { 
  display: flex;
}
`
const ColumnMenuContainer = styled.div`
        width: 400px;
        padding:0 2rem 4rem 2rem;
        height:100vh;
        overflow-y:auto;
        display:flex;
        flex-direction:column;
        @media (max-width:800px){
          width: 70vw;
        padding:0 5vw 4rem 5vw;
        row-gap: 0.1rem;
}
        `
const Headers = () => {
  const authList = [
    {
      name: '마이페이지',
      link_key: '/mypage',
      icon: 'material-symbols:person',
    },
    {
      name: '제휴문의',
      link_key: '/add-shop',
      icon: 'eos-icons:pull-request',
    },
    {
      name: '제휴업체관리',
      link_key: '/my-shop/list',
      icon: 'fluent-mdl2:manager-self-service',
    },
    {
      name: '상점',
      link_key: '/store/list',
      icon: 'ic:sharp-store',
    },
  ]
  const noneAuthList = [
    {
      name: '로그인',
      link_key: '/login',
      icon: 'material-symbols:lock',
    },
    {
      name: '회원가입',
      link_key: '/signup',
      icon: 'ic:sharp-person-add',
    },
  ]
  const router = useRouter();
  const [display, setDisplay] = useState('flex');
  const [isPost, setIsPost] = useState(false);
  const [isSearch, setIsSearch] = useState(false);


  const [popupList, setPopupList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [myAddress, setMyAddress] = useState("");
  const [auth, setAuth] = useState({});
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [dialogOpenObj, setDialogOpenObj] = useState({
    search: false
  })
  useEffect(() => {

    if (router.pathname.substring(0, 6) == '/post/' || router.pathname.substring(0, 7) == '/video/' || router.pathname == '/appsetting') {
      setIsPost(true);
    } else {
      setIsPost(false)
    }
    if (router.pathname.includes('/manager')) {
      setDisplay('none');
      $('html').addClass('show-scrollbar');
    } else {
      setDisplay('flex');
    }

    if (localStorage.getItem('dark_mode')) {
      $('body').addClass("dark-mode");
      $('p').addClass("dark-mode");
      $('.toastui-editor-contents p').addClass("dark-mode");
      $('.menu-container').addClass("dark-mode");
      $('.menu-container').css("border-top", "none");
      $('.header').addClass("dark-mode");
      $('.select-type').addClass("dark-mode");
      $('.footer').addClass("dark-mode");
    } else {

    }

  }, [router])
  useEffect(() => {
    // $('.master-dropdown-btn').hover(function () {
    //   $('.master-dropdown-content').attr('style', 'display: flex !important');
    // }, function () {
    //   $('.master-dropdown-content').attr('style', 'display: none !important');
    // })
    // $('.master-dropdown-content').hover(function () {
    //   $('.master-dropdown-content').attr('style', 'display: flex !important');
    // }, function () {
    //   $('.master-dropdown-content').attr('style', 'display: none !important');
    // })
    $('.service-dropdown-btn').hover(function () {
      $('.service-dropdown-content').attr('style', 'display: flex !important');
    }, function () {
      $('.service-dropdown-content').attr('style', 'display: none !important');
    })
    $('.service-dropdown-content').hover(function () {
      $('.service-dropdown-content').attr('style', 'display: flex !important');
    }, function () {
      $('.service-dropdown-content').attr('style', 'display: none !important');
    })
  }, [])//hover 관련
  async function getHeaderContent() {
    let locate = await getLocation();
    const { data: res_locate } = await axios.post('/api/getaddressbylocation', locate);
    setMyAddress(res_locate?.data);
    const { data: response } = await axios.get('/api/getheadercontent')
    setPopupList(response?.data?.popup ?? []);
    setThemeList(response?.data?.theme);
    setCityList(response?.data?.city ?? [])
  }

  useEffect(() => {
    getHeaderContent();
    async function myAuth() {
      const { data: response } = await axios.get(`/api/auth`);
      setAuth(response);
    }
    myAuth();
    // getNoticeAndAlarmCount();

  }, [])
  const onClosePopup = async (pk, is_not_see) => {
    if (is_not_see) {
      await localStorage.setItem(`not_see_popup_${pk}_${returnMoment().substring(0, 10).replaceAll('-', '_')}`, '1');
    }
    let popup_list = [];
    for (var i = 0; i < popupList.length; i++) {
      if (pk == popupList[i]?.pk) {
      } else {
        popup_list.push(popupList[i]);
      }
    }
    setPopupList(popup_list);
  }




  const onLogout = async () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      if (window && window.flutter_inappwebview) {
        var params = { 'login_type': JSON.parse(localStorage.getItem('auth'))?.type };
        window.flutter_inappwebview.callHandler('native_app_logout', JSON.stringify(params)).then(async function (result) {
          //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
        });
      }
      const { data: response } = await axios.post('/api/logout');
      if (response.result > 0) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
      } else {
        alert('error');
      }
    }
  }
  const onClickServiceCenter = (num) => {
    router.push(`/servicecenter/${num}`);
  }
  const handleDialogClose = () => {
    let obj = { ...dialogOpenObj };
    for (let key in obj) {
      obj[key] = false
    }
    setDialogOpenObj(obj);
  }
  return (
    <>
      <DialogSearch
        open={dialogOpenObj.search}
        handleClose={handleDialogClose}
        root_path={'shop-list?keyword='}
      />
      {console.log(router.asPath)}
      <Header style={{ display: `${display}` }} className='header'>
        {popupList.length > 0 && (router.asPath == '/' || router.asPath == '/home/') ?
          <>
            <PopupContainer>
              {popupList && popupList.map((item, idx) => (
                <>
                  {localStorage.getItem(`not_see_popup_${item?.pk}_${returnMoment().substring(0, 10).replaceAll('-', '_')}`) ?
                    <>

                    </>
                    :
                    <>
                      <PopupContent>
                        <IoMdClose style={{ color: theme.color.background1, position: 'absolute', right: '8px', top: '8px', fontSize: theme.size.font3, cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk) }} />
                        <img src={item?.img_src} style={{ width: '100%', height: 'auto' }} onClick={() => { onClickExternalLink(item?.link) }} />
                        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '8px', bottom: '8px' }}>
                          <IoCloseCircleOutline style={{ color: theme.color.background1, fontSize: theme.size.font3, marginRight: '4px', cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk, true) }} />
                          <div style={{ fontSize: theme.size.font5, cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk, true) }}>오늘 하루 보지않기</div>
                        </div>
                      </PopupContent>
                    </>
                  }
                </>
              ))}
            </PopupContainer>

          </>
          :
          <>
          </>}

        <HeaderMenuContainer>{/* pc */}
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            <img src={logoSrc} alt="홈으로" style={{ height: '3rem', cursor: 'pointer' }} onClick={() => { router.push('/') }} />
            <img src={logoTextColorImg} alt="홈으로" style={{ height: '2rem', marginTop: '0.5rem', marginLeft: '0.2rem' }} onClick={() => { router.push('/') }} />
          </div>
          <CardContent style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
            <Icon icon='ion:navigate' style={{ color: theme.color.red, margin: 'auto 0.5rem auto auto' }} />
            <Font4 style={{ margin: 'auto auto auto 0.5rem' }}>{myAddress}</Font4>
          </CardContent>
          <NoneShowMobile>
            {/* <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} /> */}
            {auth?.pk > 0 ?
              <>
                <Button variant='outlined' size='small' onClick={onLogout} style={{ marginRight: '8px', width: '90px' }}>로그아웃</Button>
                <Button variant='outlined' size='small' onClick={() => router.push('/mypage')} style={{ width: '90px' }}>마이페이지</Button>
              </>
              :
              <>
                <Button variant='outlined' size='small' onClick={() => router.push('/login')} style={{ marginRight: '8px', width: '90px' }}>로그인</Button>
                <Button variant='outlined' size='small' onClick={() => router.push('/signup')} style={{ width: '90px' }}>회원가입</Button>
              </>}
          </NoneShowMobile>
          <ShowMobile>
            <IconButton onClick={() => {
              setDialogOpenObj({
                ...dialogOpenObj,
                ['search']: true
              })
            }}>
              <Icon icon='ion:search' />
            </IconButton>
            <IconButton onClick={() => {
              setSideMenuOpen(true);
            }}>
              <Icon icon='ion:menu' style={{ fontSize: '1.8rem' }} />
            </IconButton>
          </ShowMobile>
        </HeaderMenuContainer>
      </Header>
      <Drawer
        anchor={'right'}
        open={sideMenuOpen}
        onClose={() => {
          setSideMenuOpen(false);
        }}
        style={{
        }}
      >
        <ColumnMenuContainer>
          {auth?.pk > 0 ?
            <>
              <ColumnMenuTitle style={{ borderBottom: '1px solid #ccc', paddingBlock: '1rem' }}>{auth?.nickname}님, 환영합니다.</ColumnMenuTitle>
            </>
            :
            <>
              <ColumnMenuTitle style={{ borderBottom: '1px solid #ccc', paddingBlock: '1rem' }}>로그인을 해주세요.</ColumnMenuTitle>
            </>}
          {auth?.pk > 0 ?
            <>
              {authList.map((item, idx) => (
                <>
                  <RowContent style={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => {
                    router.push(`${item.link_key}`);
                    setSideMenuOpen(false);
                  }}>
                    <Icon icon={item.icon} style={{ color: theme.color.background1 }} />
                    <Typography style={{ padding: '0.3rem', }} variant="subtitle2">{item.name}</Typography>
                  </RowContent>

                </>
              ))}
              <RowContent style={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => {
                onLogout();
                setSideMenuOpen(false);
              }}>
                <Icon icon={'ri:logout-circle-r-line'} style={{ color: theme.color.background1 }} />
                <Typography style={{ padding: '0.3rem', }} variant="subtitle2">로그아웃</Typography>
              </RowContent>
            </>
            :
            <>
              {noneAuthList.map((item, idx) => (
                <>
                  <RowContent style={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => {
                    router.push(`${item.link_key}`);
                    setSideMenuOpen(false);
                  }}>
                    <Icon icon={item.icon} style={{ color: theme.color.background1 }} />
                    <Typography style={{ padding: '0.3rem', }} variant="subtitle2">{item.name}</Typography>
                  </RowContent>
                </>
              ))}
            </>}
          <ColumnMenuTitle>지역별샵</ColumnMenuTitle>
          {cityList && cityList.map(item => (
            <>
              <Typography onClick={() => {
                router.push(`/shop-list?city=${item?.pk}`)
                setSideMenuOpen(false);
              }} style={{ padding: '0.3rem', cursor: 'pointer' }} variant="subtitle2">{item.name}</Typography>
            </>
          ))}
          <ColumnMenuTitle>테마별삽</ColumnMenuTitle>
          {themeList && themeList.map(item => (
            <>
              <Typography onClick={() => {
                router.push(`/shop-list?theme=${item?.pk}`)
                setSideMenuOpen(false);
              }} style={{ padding: '0.3rem', cursor: 'pointer' }} variant="subtitle2">{item.name}</Typography>
            </>
          ))}
        </ColumnMenuContainer>
      </Drawer>
    </>
  )
}
const ColumnMenuTitle = styled.div`
        margin: 2rem 0 0.5rem 0;
        font-weight: bold;

`
export default Headers;