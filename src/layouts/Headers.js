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
import { onClickExternalLink, returnMoment } from '../functions/utils';
import { IoMdClose } from 'react-icons/io'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { TextButton } from '../components/elements/UserContentTemplete';
const logoTextColorImg = '/assets/images/test/logo_test_color.png'
import { useRouter } from 'next/router';
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
max-width:1000px;
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
max-width:1000px;
position:relative;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;

@media screen and (max-width:1050px) { 
  display:none;
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
const Headers = () => {
  const router = useRouter();
  const [display, setDisplay] = useState('flex');
  const [isPost, setIsPost] = useState(false);
  const [isSearch, setIsSearch] = useState(false);


  const [popupList, setPopupList] = useState([]);
  const [themeList, setThemeList] = useState([]);

  const [auth, setAuth] = useState({});
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
    const { data: response } = await axios.get('/api/getheadercontent')
    setPopupList(response?.data?.popup ?? []);
    setThemeList(response?.data?.theme);
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
  // setInterval(() => {
  //   if (window.flutter_inappwebview) {
  //     window.flutter_inappwebview.callHandler('native_get_alarm_count', {}).then(async function (result) {
  //       //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
  //       let ans = JSON.parse(result)
  //       if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
  //         localStorage.setItem('is_alarm', 'false');
  //         setIsAlarm(false);
  //       } else {
  //         localStorage.setItem('is_alarm', 'true');
  //         setIsAlarm(true);
  //       }
  //     });
  //   }
  // }, 2000);


  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      if ($('.search').val().length < 2) {
        alert('두 글자 이상 입력해주세요.');
      } else {
        setIsSearch(false);
        router.push('/search', { query: $('.search').val() });
      }
    }
  }
  const onKeyPressPc = (e) => {
    if (e.key == 'Enter') {
      if ($('.search-pc').val().length < 2) {
        alert('두 글자 이상 입력해주세요.');
      } else {
        setIsSearch(false);
        router.push('/search', { query: $('.search-pc').val() });
      }
    }
  }
  const onClickNavigateBefore = () => {
    router.back();
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
  return (
    <>

      <Header style={{ display: `${display}` }} className='header'>
        {popupList.length > 0 && (router.pathname == '/' || router.pathname == '/home') ?
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
                        <img src={backUrl + item?.img_src} style={{ width: '100%', height: 'auto' }} onClick={() => { onClickExternalLink(item?.link) }} />
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
        <HeaderContainer>{/*모바일 */}
          {isSearch ?
            <>
              <IoMdArrowBack style={{ fontSize: '24px' }} onClick={() => setIsSearch(false)} />
              <SearchInput type={'text'} placeholder='두 글자 이상 입력해주세요.' className='search' onKeyPress={onKeyPress} />
              <AiOutlineSearch style={{ fontSize: '24px' }} onClick={() => {
                if ($('.search').val().length < 2) {
                  alert('두 글자 이상 입력해주세요.');
                } else {
                  setIsSearch(false);
                  router.push('/search', { query: $('.search').val() });
                }
              }} />
            </>
            :
            <>
              <div>
                {isPost ?
                  <>
                    <MdNavigateBefore style={{ fontSize: '30px', marginLeft: '-7px' }} onClick={onClickNavigateBefore} />
                  </>
                  :
                  <>
                    <div style={{ display: 'flex' }}>
                      <img src={logoSrc} alt="홈으로" style={{ height: '2rem', marginTop: '0.25rem' }} onClick={() => { router.push('/') }} />
                      <img src={logoTextColorImg} alt="홈으로" style={{ height: '1.5rem', marginTop: '0.5rem', marginLeft: '0.2rem' }} onClick={() => { router.push('/') }} />
                    </div>
                  </>}
              </div>
              <div style={{ display: 'flex', width: '180px', fontSize: theme.size.font5, justifyContent: 'space-between', position: 'relative' }}>
                {/* <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} /> */}
                {auth?.pk > 0 ?
                  <>
                    <TextButton onClick={onLogout} style={{ marginRight: '8px' }}>로그아웃</TextButton>
                    <TextButton onClick={() => router.push('/mypage')}>마이페이지</TextButton>
                  </>
                  :
                  <>
                    <TextButton onClick={() => router.push('/login')} style={{ marginRight: '8px' }}>로그인</TextButton>
                    <TextButton onClick={() => router.push('/signup')}>회원가입</TextButton>
                  </>}
                {/* <AiOutlineSetting onClick={myAuth} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} /> */}
                {/* {isAlarm ?
                  <>
                    <div style={{ width: '10px', height: '10px', background: 'red', position: 'absolute', top: '2px', left: '17px', borderRadius: '50%' }} />
                  </>
                  :
                  <>
                  </>} */}
              </div>
            </>
          }

        </HeaderContainer>
        <HeaderMenuContainer>{/* pc */}
          <div style={{ display: 'flex' }}>
            <img src={logoSrc} alt="홈으로" style={{ height: '3rem', cursor: 'pointer' }} onClick={() => { router.push('/') }} />
            <img src={logoTextColorImg} alt="홈으로" style={{ height: '2rem', marginTop: '0.5rem', marginLeft: '0.2rem' }} onClick={() => { router.push('/') }} />
          </div>
          <div style={{ display: 'flex', position: 'relative' }}>
            {zBottomMenu.map((item, idx) => (
              <>
                <HeaderMenu key={idx} className={item?.className} style={{ color: `${item.allowList.includes(router.pathname) ? theme.color.background1 : ''}` }}>
                  <div onClick={() => {
                    if (item?.is_location_href) {
                      window.location.href = item.link;
                    } else {
                      router.push(item.link)
                    }
                  }}>{item.name}</div>
                  {item?.className == 'service-dropdown-btn' ?
                    <>
                      <div className="service-dropdown-content">
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', alignItems: 'flex-start', textAlign: 'left' }}>
                          <div onClick={() => router.push('/community-list/notice')}>공지사항</div>
                          <div onClick={() => router.push('/community-list/faq')}>자주묻는질문</div>
                          <div onClick={() => router.push('/community-list/request')}>문의하기</div>
                        </div>
                      </div>
                    </>
                    :
                    <>
                    </>}
                </HeaderMenu>

              </>
            ))}
          </div>
          <div style={{ display: 'flex', width: '180px', fontSize: theme.size.font5, justifyContent: 'space-between', position: 'relative' }}>
            {/* <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} /> */}
            {auth?.pk > 0 ?
              <>
                <TextButton onClick={onLogout} style={{ marginRight: '8px' }}>로그아웃</TextButton>
                <TextButton onClick={() => router.push('/mypage')}>마이페이지</TextButton>
              </>
              :
              <>
                <TextButton onClick={() => router.push('/login')} style={{ marginRight: '8px' }}>로그인</TextButton>
                <TextButton onClick={() => router.push('/signup')}>회원가입</TextButton>
              </>}


          </div>
        </HeaderMenuContainer>
      </Header>

    </>
  )
}
export default Headers;