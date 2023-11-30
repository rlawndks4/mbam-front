import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import AddButton from "./elements/button/AddButton";
import { TextButton, TextFillButton } from "./elements/UserContentTemplete";

const Container = styled.div`
display: flex; 
padding: 32px 0;
width: 100%;
height: 120px;
border-bottom: 1px solid ${theme.color.font4};
@media screen and (max-width:550px) { 
    flex-direction:column;
    height:auto;
}
`
const ContentContainer = styled.div`
display:flex;
width:60%;
cursor:pointer;
border-right: 1px solid ${theme.color.font4};
@media screen and (max-width:550px) { 
    width:100%;
    border-right:none;
    padding-bottom:16px;
}
`
const PriceContainer = styled.div`
display: flex;
flex-direction: column;
width:40%;
height:120px;
@media screen and (max-width:550px) {  
    width:100%;
    margin-left:auto;
}
`
const AcademySubCard = (props) => {
    let { item, is_detail, not_price, column } = props;

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
    const onSubscribe = async (num) => {
        if (num == 1) {
            window.open('http://pf.kakao.com/_xgKMUb/chat');
            //navigate(`/payready/${item?.pk}`, { state: { item_pk: item?.pk } })
        }
        if (num == 0) {
            if (window.confirm("장바구니 등록 하시겠습니까?")) {
                const { data: response } = await axios.post('/api/onsubscribe', {
                    item_pk: item?.pk,
                    type_num: num
                })
                if (response?.result > 0) {
                    alert("성공적으로 등록 되었습니다.");
                } else {
                    alert(response?.message);
                    if (response?.result == -150) {
                        navigate('/login');
                    }
                }

            }
        }

    }
    return (
        <>
            <Container style={{ paddingBottom: `${not_price ? '16px' : ''}` }}>
                <ContentContainer onClick={() => { navigate(`/academy/${item?.pk}`) }} style={{ flexDirection: `${(column && window.innerWidth <= 550) ? 'column' : ''}`, borderBottom: `${not_price ? 'none' : ''}`, borderRight: `${not_price ? 'none' : ''}` }}>
                    {is_detail ?
                        <>
                            <img src={backUrl + item?.main_img} style={{ height: '120px', width: '160px', margin: `${(column && window.innerWidth <= 550) ? '0px auto 24px 12px' : ''}` }} />
                        </>
                        :
                        <>
                            <img src={backUrl + item?.sub_img} style={{ height: '120px', width: '90px', margin: `${(column && window.innerWidth <= 550) ? '0px auto 24px 12px' : ''}` }} />
                        </>}
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '12px', width: 'auto' }}>
                        {is_detail ?
                            <>
                                <div style={{ fontSize: theme.size.font2, margin: '0px auto 16px 12px', fontWeight: 'bold' }}>{item?.title}</div>
                                <div style={{ fontSize: theme.size.font4, margin: '0 auto 12px 12px' }}>수강대상: {item?.target}</div>
                                <div style={{ fontSize: theme.size.font4, margin: '0 auto 12px 12px' }}>수강기간: {item?.start_date ?? "---"} ~ {item?.end_date ?? "---"}</div>
                                <div style={{ fontSize: theme.size.font4, margin: '0 auto auto 12px' }}>강의구성: {item?.composition}</div>
                            </>
                            :
                            <>
                                <div style={{ fontSize: theme.size.font3, margin: '0 auto 16px 12px' }}>{item?.title}</div>
                                <div style={{ fontSize: theme.size.font5, margin: '0 auto 16px 12px' }}>수강기간: {item?.start_date ?? "---"} ~ {item?.end_date ?? "---"}</div>
                                <div style={{ fontSize: theme.size.font5, margin: '0 auto auto 12px' }}>강의구성: {item?.composition}</div>
                                <div style={{ fontSize: theme.size.font5, margin: 'auto auto 0 12px' }}>{item?.sub_title}</div>
                            </>}


                    </div>
                </ContentContainer>
                {not_price ?
                    <>
                    </>
                    :
                    <>
                        <PriceContainer>
                            {is_detail ?
                                <>
                                    <div style={{ height: '12px', margin: `0 auto 16px 12px` }} />
                                    <div style={{ fontSize: theme.size.font4, display: 'flex', margin: '0 auto 16px 12px' }}><div style={{ width: '48px' }}>정가:</div> <div style={{ textDecoration: 'line-through', textDecorationColor: theme.color.font2 }}>{commarNumber(item?.price ?? 0)}원</div></div>
                                    <div style={{ fontSize: theme.size.font4, display: 'flex', margin: `0 auto auto 12px` }}><div style={{ width: '48px' }}>판매가:</div><div style={{ color: theme.color.red, margin: '0 2px 0 0' }}>[{item?.discount_percent}% 할인]</div> <div style={{ fontWeight: 'bold' }}>{commarNumber((item?.price ?? 0) * ((100 - item?.discount_percent) / 100))}원</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div style={{ height: '17px', margin: `0 auto 16px 12px` }} />
                                    <div style={{ fontSize: theme.size.font5, display: 'flex', margin: '0 auto 16px 12px' }}><div style={{ width: '48px' }}>정가:</div> <div style={{ textDecoration: 'line-through', textDecorationColor: theme.color.font2 }}>{commarNumber(item?.price ?? 0)}원</div></div>
                                    <div style={{ fontSize: theme.size.font5, display: 'flex', margin: `0 auto auto 12px` }}><div style={{ width: '48px' }}>판매가:</div><div style={{ color: theme.color.red, margin: '0 2px 0 0' }}>[{item?.discount_percent}% 할인]</div> <div style={{ fontWeight: 'bold' }}>{commarNumber((item?.price ?? 0) * ((100 - item?.discount_percent) / 100))}원</div>
                                    </div>
                                </>}

                            {item?.is_deadline == 1 ?
                                <>
                                    <AddButton style={{ background: theme.color.red, margin: '0 4px 0 12px', cursor: 'default', color: '#fff', padding: '8px', fontSize: theme.size.font4, width: '200px' }}>
                                        현재 강의는 마감되었습니다
                                    </AddButton>
                                </>
                                :
                                <>

                                    <div style={{ display: "flex" }}>
                                        <TextButton style={{ margin: '0 4px 0 12px' }} onClick={() => onSubscribe(0)}>장바구니</TextButton>
                                        <TextFillButton style={{ margin: '0 auto 0 4px' }} onClick={() => onSubscribe(1)}>수강신청</TextFillButton>
                                    </div>

                                </>}
                        </PriceContainer>
                    </>}

            </Container>
        </>
    )
}
export default AcademySubCard;