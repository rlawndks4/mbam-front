import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { logoSrc } from '../data/Data';
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { backUrl, zBottomMenu } from '../data/Data';
import { MdNavigateBefore } from 'react-icons/md';
import theme from '../styles/theme';
import $ from 'jquery';
import { dateFormat, dateFormatReverse, getLocation, onClickExternalLink, returnMoment } from '../functions/utils';
import { IoMdClose } from 'react-icons/io'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RowContent, TextButton } from '../components/elements/UserContentTemplete';
const logoTextColorImg = '/assets/images/test/logo_test_color.png'
import { useRouter } from 'next/router';
import { Button, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Drawer, IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { Font3, Font4 } from 'src/components/elements/ManagerTemplete';
import DialogSearch from 'src/components/DialogSearch';
import toast from 'react-hot-toast';
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
const ColumnMenuContainer2 = styled.div`
        width: 400px;
        height:100vh;
        overflow-y:auto;
        display:flex;
        flex-direction:column;
        @media (max-width:800px){
          width: 70vw;
        row-gap: 0.1rem;
}
`
const BorderBottomText = styled.div`
padding: 0.2rem;
border-bottom: 1px solid #ccc;
display: flex;
align-items: center;
column-gap: 0.5rem;
`
const ColorButton = styled.div`
padding: 0.2rem 0.4rem;
border-radius: 0.4rem;
color: #fff;
`
const TextLogo = styled.img`
height: 4rem ;
margin-top: 0.5rem; 
margin-left: 0.2rem;
@media (max-width:1050px){
  height: 3rem ;
  margin:0;
}
`
const AddressContainer = styled.div`
text-align: center;
display: flex;
align-items: center;
position: absolute;
width: auto;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`
const ShopManagerButton = styled.div`
position: fixed;
top:40%;
left: 0;
z-index: 9;
background: #444;
color: #fff;
padding: 1rem 0.4rem;
font-size: 14px;
border-top-right-radius: 0.2rem;
border-bottom-right-radius: 0.2rem;
cursor: pointer;
display: flex;
flex-direction: column;
row-gap: 0.5rem;
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
  const [sideMenuType, setSideMenuType] = useState('');
  const [shopList, setShopList] = useState([]);
  const [jumpHistoryTable, setJumpHistoryTable] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

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
    setShopList(response?.data?.shop ?? [])
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
  const getJumpHistory = async (pk) => {
    setSideMenuOpen(false);
    const { data: response } = await axios.get(`/api/items?table=jump&shop_pk=${pk}&order=pk`);
    setJumpHistoryTable(response?.data ?? [])
    setHistoryOpen(true);
  }
  const handleDialogClose = () => {
    let obj = { ...dialogOpenObj };
    for (let key in obj) {
      obj[key] = false
    }
    setDialogOpenObj(obj);
  }
  const processJump = async (pk) => {
    if (window.confirm('점프를 실행하시겠습니까?')) {
      const { data: response } = await axios.post(`/api/jump`, {
        pk: pk,
      })
      if (response?.result > 0) {
        toast.success('점프를 성공하였습니다.');
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    }

  }
  return (
    <>
      <Dialog
        open={historyOpen}
        onClose={() => {
          setHistoryOpen(false);
        }}
      >
        <DialogTitle style={{ background: theme.color.background0, color: '#fff' }}>{`당일 점프기록`}</DialogTitle>
        <DialogContent style={{ width: '90vw', maxWidth: '500px', marginTop: '1rem' }}>
          <DialogContentText>
          </DialogContentText>
          {jumpHistoryTable && jumpHistoryTable.map((item, idx) => (
            <>
              <div style={{ display: 'flex', columnGap: '0.2rem' }}>
                <div>{idx + 1}.</div>
                <div>{item?.date}</div>
                <div></div>
                <div></div>
              </div>

            </>
          ))}
        </DialogContent>
      </Dialog>
      <DialogSearch
        open={dialogOpenObj.search}
        handleClose={handleDialogClose}
        root_path={'shop-list?keyword='}
      />
      {auth?.pk > 0 ?
        <>
          <ShopManagerButton onClick={() => {
            setSideMenuType('shop_manager');
            setSideMenuOpen(true);
          }}>
            <div>업</div>
            <div>체</div>
            <div>관</div>
            <div>리</div>
          </ShopManagerButton>
        </>
        :
        <>
        </>}
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
          <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => { router.push('/') }} >
            <NoneShowMobile>
            </NoneShowMobile>
            <TextLogo src={logoTextColorImg} alt="홈으로" onClick={() => { router.push('/') }} />
          </div>
          <AddressContainer>
            <Icon icon='ion:navigate' style={{ color: theme.color.background0, margin: 'auto 0 auto auto' }} />
            <Font3 style={{ margin: 'auto auto auto 0.5rem', fontWeight: 'bold' }}>{myAddress}</Font3>
          </AddressContainer>
          <NoneShowMobile>
            {/* <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} /> */}
            <RowContent>
              <IconButton onClick={() => {
                setDialogOpenObj({
                  ...dialogOpenObj,
                  ['search']: true
                })
              }}>
                <Icon icon='ion:search' />
              </IconButton>
              <IconButton onClick={() => {
                setSideMenuType('menu')
                setSideMenuOpen(true);
              }}>
                <Icon icon='ion:menu' style={{ fontSize: '1.8rem' }} />
              </IconButton>
            </RowContent>
          </NoneShowMobile>
          <ShowMobile style={{ columnGap: '0.5rem' }}>
            <IconButton sx={{ padding: '0' }} onClick={() => {
              setDialogOpenObj({
                ...dialogOpenObj,
                ['search']: true
              })
            }}>
              <Icon icon='ion:search' />
            </IconButton>
            <IconButton sx={{ padding: '0' }} onClick={() => {
              setSideMenuType('menu')
              setSideMenuOpen(true);
            }}>
              <Icon icon='ion:menu' style={{ fontSize: '1.8rem' }} />
            </IconButton>
          </ShowMobile>
        </HeaderMenuContainer>
      </Header>
      <Drawer
        anchor={sideMenuType == 'menu' ? 'right' : 'left'}
        open={sideMenuOpen}
        onClose={() => {
          setSideMenuOpen(false);
        }}
        PaperProps={{
          style: {
            top: `${sideMenuType == 'shop_manager' ? '40%' : ''}`
          }
        }}
        style={{
          top: '12px'
        }}
      >
        {sideMenuType == 'menu' &&
          <>
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
          </>}
        {sideMenuType == 'shop_manager' &&
          <>
            <ColumnMenuContainer2>
              <div style={{ background: theme.color.background0, padding: '0.5rem', color: '#fff' }}>업체관리</div>

              {shopList && shopList.map((item, idx) => (
                <>
                  <BorderBottomText>
                    <div>{item?.name}</div>
                  </BorderBottomText>
                  <BorderBottomText>
                    <div>제휴만료일</div>
                    <div>{item?.end_date}</div>
                    <ColorButton style={{ background: '#4D4DFF' }}>
                      {dateFormatReverse(item?.end_date, true)}
                    </ColorButton>
                  </BorderBottomText>
                  <BorderBottomText>
                    <ColorButton style={{ background: '#006cb7' }} onClick={() => {
                      processJump(item?.pk)
                    }}>업체점프({item?.daily_jump_count - item?.use_jump_count})</ColorButton>
                    <ColorButton style={{ background: '#87CEEB' }} onClick={() => {
                      router.push(`/my-shop/jump/${item?.pk}`)
                      setSideMenuOpen(false);
                    }}>자동점프설정</ColorButton>
                  </BorderBottomText>
                  <BorderBottomText>
                    <ColorButton style={{ background: '#6CA0DC' }} onClick={() => {
                      getJumpHistory(item?.pk)
                    }}>점프기록</ColorButton>
                  </BorderBottomText>
                  <BorderBottomText>
                    <ColorButton style={{ background: '#3E8EDE' }}>출근부관리</ColorButton>
                  </BorderBottomText>
                  <BorderBottomText>
                    <ColorButton style={{ background: '#4169E1' }}>1:1문의</ColorButton>
                  </BorderBottomText>
                </>
              ))}
            </ColumnMenuContainer2>
          </>}

      </Drawer>
    </>
  )
}
const ColumnMenuTitle = styled.div`
        margin: 2rem 0 0.5rem 0;
        font-weight: bold;

`
export default Headers;