import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import { TextButton, TextFillButton } from "./elements/UserContentTemplete";

const Container = styled.div`
display: flex; 
padding: 32px 0;
width: 100%;
height: 120px;
border-bottom: 1px solid ${theme.color.font4};
cursor:pointer;
@media screen and (max-width:550px) { 
    flex-direction:column;
    height:auto;
}
`
const ContentContainer = styled.div`
display:flex;
width:60%;
cursor:pointer;
@media screen and (max-width:550px) { 
    width:100%;
    border-right:none;
}
`
const Img = styled.img`
height: 120px;
width: 160px;
@media screen and (max-width:550px) { 
    margin-bottom:16px;
    height: 90px;
    width: 120px;
}
`
const ReviewCard = (props) => {
    let { item, link } = props;

    const navigate = useNavigate();
    const getPeriodByNumber = (num) => {
        let result = "";
        let period_list = [
            { name: '1일', val: 1 },
            { name: '3일', val: 3 },
            { name: '1주일', val: 7 },
            { name: '2주일', val: 14 },
            { name: '3주일', val: 21 },
            { name: '1개월', val: 30 },
            { name: '2개월', val: 60 },
            { name: '3개월', val: 90 },
            { name: '6개월', val: 180 },
            { name: '1년', val: 365 },
        ]
        for (var i = 0; i < period_list.length; i++) {
            if (num == period_list[i]?.val) {
                result = period_list[i]?.name;
            }
        }
        return result;
    }

    return (
        <>
            <Container>
                <ContentContainer onClick={() => { navigate(`/post/review/${item?.pk}`) }}>
                    <Img src={backUrl + item?.main_img} />
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '12px', width: 'auto' }}>
                        <div style={{ fontSize: theme.size.font3, margin: '0 auto 16px 12px', fontWeight: 'bold' }}>{item?.title}</div>
                        <div style={{ fontSize: theme.size.font4, margin: '0 auto 16px 12px', }}>{item?.note.replace(/(<([^>]+)>)/ig, "").substring(0, 30) + `${item?.note.replace(/(<([^>]+)>)/ig, "").length > 20 ? '...' : ''}`}</div>
                        <div style={{ fontSize: theme.size.font5, margin: 'auto auto 0 12px' }}>{(item?.date ?? "0000-00-00").substring(0, 10)} / {item?.nickname}</div>
                    </div>
                </ContentContainer>
            </Container>
        </>
    )
}
export default ReviewCard;