import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { backUrl } from "../data/Data";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import instArrIcon from '../assets/images/icon/inst_arr.png'
const AcademyContainer = styled.div`
box-shadow: ${props => props.theme.boxShadow};
border-radius: ${props => props.theme.borderRadius};
width: 24%;
height:300px;
cursor:pointer;
@media screen and (max-width:1000px) { 
    width: 48%;
    height:57.6vw;
}
`
const AcademyImg = styled.img`
width: 100%;
height:150px;
border-top-right-radius:${props => props.theme.borderRadius};
border-top-left-radius:${props => props.theme.borderRadius};
border-bottom-right-radius:0;
border-bottom-left-radius:0;
@media screen and (max-width:1000px) { 
    height:28.8vw;
}

`
const AcademyTextContainer = styled.div`
padding:0px 16px;
display:flex;
flex-direction:column;
align-items:flex-start;
height:45%;
@media screen and (max-width:800px) { 
    height:42%;
}

`
const MainText = styled.div`
font-size:${props => props.theme.size.font4};
@media screen and (max-width:500px) { 
    font-size:${props => props.theme.size.font5};
}
@media screen and (max-width:300px) {
    font-size:${props => props.theme.size.font6};

}
`
const Text = styled.div`
font-size:${props => props.theme.size.font5};
@media screen and (max-width:500px) { 
    font-size:${props => props.theme.size.font6};
}
@media screen and (max-width:300px) {
    font-size:${props => props.theme.size.font7};
}
`
const AcademyCard = (props) => {
    let { item, idx, link, inst_arr } = props;
    const navigate = useNavigate();
    const getMarginByIndex = (idx) => {
        let margin = "";
        if (window.innerWidth >= 1000) {
            if (idx % 4 == 0) {
                margin = "0 0.66% 16px 0";
            } else if (idx % 4 == 3) {
                margin = "0 0 16px 0.66%";
            } else {
                margin = "0 0.66% 16px 0.66%";
            }
        } else {
            if (idx % 2 == 0) {
                margin = "0 2% 16px 0";
            } else {
                margin = "0 0 16px 2%";
            }
        }
        return margin;
    }
    return (
        <>
            <AcademyContainer style={{ margin: getMarginByIndex(idx) }} onClick={() => { navigate(link ? link : `/academy/${item?.pk}`) }}>
                <AcademyImg src={backUrl + item?.main_img} />
                <AcademyTextContainer>
                    <MainText style={{ margin: '0 0 auto 0', color: theme.color.blue, fontWeight: 'bold' }}>{item.user_nickname}</MainText>
                    <MainText style={{ margin: '4px 0 auto 0', color: theme.color.font1, }}>{item.title}</MainText>
                    <Text style={{ margin: 'auto 0 auto 0', color: theme.color.font1, fontWeight: 'bold' }}>{item.sub_title}</Text>
                    <Text style={{ margin: 'auto 0 auto 0', color: theme.color.font4 }}>{item.hash}</Text>
                    {/* <div style={{ margin: 'auto 0 0 0', color: theme.color.blue, fontSize: theme.size.font5, fontWeight: 'bold' }}>{commarNumber(item.price * ((100 - item?.discount_percent ?? 0) / 100))}원 (VAT 별도)</div> */}
                    {inst_arr ?
                        <>
                            <img src={instArrIcon} style={{ margin: 'auto 4px 0 auto', width: '28px', height: 'auto' }} />
                        </>
                        :
                        <>
                        </>}
                </AcademyTextContainer>
            </AcademyContainer>
        </>
    )
}
export default AcademyCard;