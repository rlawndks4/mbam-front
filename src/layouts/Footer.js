import styled from "styled-components";
import theme from "../styles/theme";
const logoTextFooterImg = '/assets/images/test/logo_text_footer.png'
import { useRouter } from "next/router";
const Button = styled.div`

background:${props => props.theme.color.background1};
padding:7px 8px 5px 8px;
color:#000;
border-radius:50%;
font-size:16px;
cursor:pointer;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

`
const KakaoImg = styled.img`
width: 100px;
cursor: pointer;
margin-right:8px;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@media screen and (max-width:650px) {
    margin: 0 0 0 auto;
}
`
const Wrappers = styled.footer`
    display:flex;
    flex-direction:column;
    background:${props => props.theme.color.background3};
    color:#fff;
    font-weight:500;
    padding:32px 120px;
    font-size:${props => props.theme.size.font3};
   
    @media screen and (max-width:650px) {
        padding:32px 5vw;
        font-size:${props => props.theme.size.font4};
        margin-bottom: 4rem;
    }
`
const Post = styled.div`
cursor:pointer;
border-right:1px solid ${props => props.theme.color.font1};
padding:4px;
transition: 0.3s;
&:hover{  
    color : ${props => props.theme.color.background1};
  }
  @media screen and (max-width:400px) {
    font-size:${props => props.theme.size.font5};
    padding:2px;
}
`
const Img = styled.img`
width: 120px;
@media screen and (max-width:400px) {
width:24vw;
}
`
const Flex = styled.div`
display:flex;
margin-top:8px;
flex-direction:column;
@media screen and (max-width:650px) {
}
`
const TextImg = styled.img`
width: 50px; 
height:auto;
margin: 0.5rem 0; 
transform: translateX(-6px);
@media screen and (max-width:650px) {
    margin: 0.5rem auto; 
    transform: translateX(0px);
}
`
const Footer = () => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <>
            {pathname.includes('/manager') || pathname.substring(0, 6) == '/post/' || pathname.substring(0, 7) == '/video/' ?
                <>
                </>
                :
                <>
                    <Wrappers className="footer" style={{ background: `#23242f`, fontSize: theme.size.font5 }}>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Flex style={{ margin: '0 auto 0 0' }}>
                                <TextImg src={logoTextFooterImg} />
                                <div>웹사이트명&nbsp;&nbsp;마사지밤ㅣ마사지 스웨디시 타이마사지 건마 1인샵 홈타이 출장마사지 1위 마사지 사이트 【마사지밤】</div>
                                <div>대표자명 &nbsp;&nbsp;마사지밤</div>
                                <div>고객센터 &nbsp;&nbsp;050-8202-3294</div>
                                <div style={{ marginTop: '1rem', maxWidth: '700px' }}>
                                    당사는 정보제공자로서 회원이 등록한 컨텐츠 및 이와 관련한 어떤 거래에 대해서 일체 책임을 지지 않습니다.
                                    본 웹사이트에 게시된 모든 컨텐츠는 허락없이 무단으로 복제하거나 사용할 수 없으며 이를 어길 경우 저작권법에 의거하여 법적 책임을 물을 수 있습니다.
                                </div>
                                <div style={{ marginTop: '1rem', maxWidth: '700px' }}>
                                    Copyright msgbam.com All rights reserved.
                                </div>
                            </Flex>
                        </Flex>
                    </Wrappers>
                </>
            }

        </>
    )
}
export default Footer;