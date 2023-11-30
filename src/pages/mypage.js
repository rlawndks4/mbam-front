import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { TextButton, Title, Wrappers } from "src/components/elements/UserContentTemplete";
import { backUrl } from "src/data/Data";
const defaultImg = '/assets/images/icon/default-profile.png'
import axios from "axios";
import { MdEdit } from 'react-icons/md';
import theme from "src/styles/theme";
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";

const MyCard = styled.div`
display:flex;
width:100%;
height:250px;
border:1px solid ${props => props.theme.color.background3};
@media screen and (max-width:700px) {
    flex-direction:column;
    height:500px;
}
`
const ProfileContainer = styled.div`
width:50%;
display:flex;
flex-direction:column;
align-items:center;
height:250px;
background:#f4f4f4;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Container = styled.div`
width:50%;
font-size:14px;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Content = styled.div`
width:100%;
display:flex;
`
const Category = styled.div`
width:100px;
padding:16px 0;
height:18px;
padding-left:16px;
border-right:1px solid ${props => props.theme.color.background1};
`
const Result = styled.div`
padding:16px 0;
height:18px;
padding-left:16px;
display:flex;
align-items:center;
`
const LogoutButton = styled.button`
width:160px;
height:40px;
margin:1rem auto;
border:none;
cursor:pointer;
background:${props => props.theme.color.font2};
color:#fff;
font-size:12px;
`
const MyPage = () => {
    const router = useRouter();
    const [auth, setAuth] = useState({})
    const [isWebView, setIsWebView] = useState(false);
    const [bagList, setBagList] = useState();
    const [calssList, setClassList] = useState();
    const [payList, setPayList] = useState();
    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/getmyinfo');
            if (response?.data?.pk > 0) {
                await localStorage.setItem('auth', JSON.stringify(response?.data))
                let obj = response?.data;
                setAuth(obj);
            } else {
                localStorage.removeItem('auth');
                onLogout();
            }
        }
        isAdmin();
        if (window && window.flutter_inappwebview) {
            setIsWebView(true)
        }
    }, [])
    async function getMyContent() {
        const { data: response } = await axios.post('/api/myitems', { table: 'subscribe' });
        let list = [...response?.data?.data];
        let bag_list = [];
        let class_list = [];
        let pay_list = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i]?.status == 1) {
                if (list[i]?.transaction_status >= 0 && list[i]?.use_status == 1) {
                    class_list.push(list[i]);
                }
                pay_list.push(list[i]);
            } else {
                bag_list.push(list[i]);
            }
        }
        setBagList(bag_list);
        setClassList(class_list);
        setPayList(pay_list);
    }
    const pageSetting = async () => {
        await getMyContent();
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
            window.location.href = '/login';
        } else {
            alert('error');
        }
    }

    return (
        <>
            <Wrappers className="wrapper" style={{ maxWidth: '800px' }}>
                <Title>마이페이지</Title>
                <div style={{ margin: '2rem 0 1rem auto', color: `${theme.color.font2}`, fontSize: theme.size.font3, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} onClick={() => { router.push('/editmyinfo') }}>
                    <div style={{ paddingRight: '8px' }}>내정보 수정하기</div>
                    <MdEdit />
                </div>

                <MyCard>
                    <ProfileContainer>
                        <img src={auth?.profile_img ? auth?.profile_img.substring(0, 4) == "http" ? auth?.profile_img : backUrl + auth?.profile_img : defaultImg} alt="#" onError={defaultImg} style={{ height: '125px', width: '125px', borderRadius: '50%', background: '#fff', margin: 'auto' }} />
                    </ProfileContainer>
                    <Container>
                        <Content>
                            <Category>닉네임</Category>
                            <Result>
                                {auth?.nickname ?? "---"}
                            </Result>
                        </Content>
                        <Content>
                            <Category>아이디</Category>
                            <Result>
                                {auth?.id ?? "---"}
                            </Result>

                        </Content>
                        <Content>
                            <Category>비밀번호</Category>
                            <Result>********</Result>
                        </Content>
                        <Content>
                            <Category>전화번호</Category>
                            <Result>{auth?.phone ?? "---"}</Result>
                        </Content>
                        <Content>
                            <Category>개인정보동의</Category>
                            <Result>{'동의'}</Result>
                        </Content>

                    </Container>
                </MyCard>
                <div style={{ marginTop: '36px' }} />
                <Content>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <TextButton onClick={onLogout} style={{ margin: '0 8px 0 auto' }}>로그아웃</TextButton>
                        <TextButton onClick={() => { router.push('/resign') }}>회원탈퇴</TextButton>
                    </div>
                </Content>
                {/* <LogoutButton onClick={onLogout}>
                    로그아웃
                </LogoutButton>

                <LogoutButton onClick={() => router.push('/appsetting')}>
                    설정
                </LogoutButton> */}

                {isWebView ?
                    <>
                        <LogoutButton onClick={() => router.push('/appsetting')}>
                            설정
                        </LogoutButton>
                    </>
                    :
                    <>
                    </>}
            </Wrappers>
        </>
    )
}
MyPage.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default MyPage;