import { useEffect, useState } from "react";
import styled from "styled-components";
const vArrIcon = '/assets/images/icon/v_arr.png'
import theme from "../styles/theme";
import $ from 'jquery';
const Container = styled.div`
width:250px;
margin-right:16px;
z-index:3;
position:fixed;
top: 11rem;
background:#fff;
@media screen and (max-width:850px) {
    display:-webkit-box;
    width:90vw;
    border-bottom:1px solid ${props => props.theme.color.font3};
    margin:0;
    overflow-x:auto;
    position:fixed;
    top: 3.5rem;
}
`
const Content = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:12px 8px;
font-size:${props => props.theme.size.font3};
border-bottom:1px solid ${props => props.theme.color.font3};
cursor:pointer;
&:hover{  
    font-weight:bold;
    border-bottom:2px solid ${props => props.theme.color.font1};
}
@media screen and (max-width:700px) {
    border-bottom:none;
}
`
const ArrowImg = styled.img`
height: 7px;
width: 24px;
@media screen and (max-width:700px) {
    display:none;
}
`
const makeGuideHeightByWidth = (schema) => {
    if (schema == 'academy') {
        return {
            1000: 250,
            700: 240,
            550: 240,
            0: 500,
            marginTop: 220,
        }
    } else if (schema == 'master') {
        return {
            1000: 400,
            700: 400,
            550: 300,
            0: 300,
            marginTop: 370,
        }
    }
}
const SideSelectTypeComponent = (props) => {
    const { data, category, guide_height, onClickCategory, schema, setTypeNum } = props;
    const [containerStyle, setContainerStyle] = useState({});
    
    return (
        <>
            <Container style={containerStyle} className="none-scroll">
                {data && data.map((item, idx) => (
                    <>
                        <Content onClick={() => { onClickCategory(item?.table) }} style={{ fontWeight: `${category == item?.table ? 'bold' : ''}`, borderBottom: `${category == item?.table? `2px solid ${theme.color.font1}` : ''}` }}>
                            <div>{item?.name}</div>
                        </Content>
                    </>
                ))}
            </Container>
        </>
    )
}
export default SideSelectTypeComponent;