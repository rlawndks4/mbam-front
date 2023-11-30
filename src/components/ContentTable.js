import { commarNumber,} from "../functions/utils";
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from "axios";
import { backUrl } from "../data/Data";
import AddButton from "./elements/button/AddButton";
import theme from "../styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TextButton } from "./elements/UserContentTemplete";
import { objHistoryListContent } from "../data/Data";
import { Button, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { getLocalStorage } from "../functions/LocalStorage";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
const Table = styled.table`
font-size:${props => props.theme.size.font4};
width:100%;
text-align:center;
border-collapse: collapse;
min-width:350px;
`
const Tr = styled.tr`
width:100%;
height:26px;
border-bottom:1px solid ${props => props.theme.color.font4};
`
const Td = styled.td`
border-bottom:1px solid ${props => props.theme.color.font4};
font-size:${props => props.theme.size.font5};
white-space:pre;
padding: 1rem 0;
`
const ContentTable = (props) => {

    const router = useRouter();
    const { data, click, schema, table, isPointer, addSubscribeMaster, columnsBold, marginBottom, fontSize, pageSetting, onClickList, onClickEditButton, checkOnlyOne, auth } = props;
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);
    const onClickEvent = (str) => {
        if (str) {
            router.push(str)
        }
    }
    useEffect(() => {
        setLoading(true);
        setColumns(objHistoryListContent[schema]?.columns);
    }, [])
    useEffect(() => {
        if (columns && columns.length > 0) {
            setLoading(false);
        }
    }, [columns])

    const deleteItem = async (pk, table, cha) => {

    }

    const getStarBynum = (num) => {
        let str = '';
        for (var i = 0; i < num; i++) {
            str += '★';
        }
        return str;
    }
    const onSubscribe = async (num) => {
        window.open('http://pf.kakao.com/_xgKMUb/chat');
        //router.push(`/payready/${num}`, { state: { item_pk: num } });
    }
    const getExistingPossessionByNumber = (num) => {
        if (num == 0) {
            return "신규";
        } else if (num == 1) {
            return "보유중";
        } else if (num == 2) {
            return "매도";
        } else {
            return "---";
        }
    }
    const getContactComment = (data) => {
        let user_data = getLocalStorage('auth');
        if (user_data?.user_level == 0) {
            if (!data?.landlord_pk) {
                return "임대인 선택 전";
            }
            if (data?.lessee_appr < 1) {
                return "수락 대기중";
            }
            if (data?.landlord_appr < 1) {
                return "임대인 수락 대기중";
            }
            return "완료";
        }
        if (user_data?.user_level == 5) {
            if (!data?.lessee_pk) {
                return "임차인 선택 전";
            }
            if (data?.lessee_appr < 1) {
                return "임차인 수락 대기중";
            }
            if (data?.landlord_appr < 1) {
                return "수락 대기중";
            }
            return "완료";
        }
        if (user_data?.user_level == 10) {
            if (!data?.landlord_pk) {
                return "임대인 선택 전";
            }
            if (!data?.lessee_pk) {
                return "임차인 선택 전";
            }
            if (data?.landlord_appr < 1) {
                return "임대인 수락 대기중";
            }
            if (data?.lessee_appr < 1) {
                return "임차인 수락 대기중";
            }
            return "완료";
        }
        return "";
    }
    const goToContractDetail = (data) => {
        let user_data = getLocalStorage('auth');
        if (user_data?.user_level == 10) {
            router.push(`/addcontract/${data?.pk}`);
        } else {
            router.push(`/contract/${data?.pk}`);
        }
    }
    const goToLink = (data) => {
        if(table.includes('s_')){
            return `/post/${table.replace('s_','shop_')}/${data?.pk}`
        }else{
            return `/post/${table}/${data?.pk}`
        }
      
    }

    const getPayMonth = (data) => {

    }

    return (
        <>
            {loading ?
                <>
                </>
                :
                <>
                    <div className='subtype-container' style={{ overflowX: 'auto', display: 'flex', width: '100%', margin: '8px auto', marginBottom: marginBottom }} >
                        <Table style={{ fontSize: `${fontSize ? fontSize : ''}` }}>
                            <Tr style={{ fontWeight: `${columnsBold ? 'bold' : ''}` }}>
                                {columns && columns.map((item, idx) => (
                                    <>
                                        <Td style={{ width: item.width }}>{item.name}</Td>
                                    </>
                                ))}
                            </Tr>
                            {data && data.map((item, index) => (
                                <Tr onClick={() => {
                                    if (onClickList) {
                                        onClickList(item, index)
                                    }
                                }} style={{ cursor: `${onClickList ? 'pointer' : ''}` }}>
                                    {columns && columns.map((column, idx) => (
                                        <>
                                            <Td style={{ width: column.width, color: `${column.color ? column.color : ''}`, cursor: `${isPointer ? 'pointer' : ''}`, fontWeight: `${column.bold ? 'bold' : ''}` }}>
                                                <a href={`${goToLink(item)}`} style={{color:'#000',textDecoration:'none',padding:'1rem 0'}}>
                                                {column.type == 'img' ?
                                                    <img src={backUrl + item[column.column]} alt="#" style={{ height: '36px' }} /> ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'is_subscribe' ?
                                                    <AddButton style={{ width: '84px', background: `${item[column.column] ? theme.color.background1 : '#fff'}`, color: `${item[column.column] ? '#fff' : theme.color.font1}`, border: `1px solid ${theme.color.background1}` }}
                                                        onClick={() => (item[column.column] ? null : addSubscribeMaster(item.pk))}>
                                                        {item[column.column] ? '구독완료' : '구독'}
                                                    </AddButton> ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'is_request_com' ?
                                                    item['status'] == 1 ?
                                                        <div style={{ color: theme.color.blue }}>답변완료</div>
                                                        :
                                                        <div style={{ color: theme.color.red }}>답변대기</div>
                                                    :
                                                    null}
                                                {column.type == 'text' ?
                                                    item[column.column] ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'link' ?
                                                    <IconButton onClick={() => {
                                                        goToLink(item)
                                                    }}>
                                                        <Icon icon="ph:eye" />
                                                    </IconButton>
                                                    :
                                                    null}
                                                    {column.type == 'detail' ?
                                                    <IconButton onClick={() => {
                                                        if(table.includes('s_')){
                                                            router.push(`/post/${table.replace('s_','shop_')}/${item?.pk}`)
                                                        }else{
                                                            router.push(`/post/${table}/${item?.pk}`)
                                                        }
                                                    }}>
                                                        <Icon icon="ph:eye" />
                                                    </IconButton>
                                                    :
                                                    null}
                                                {column.type == 'check' ?
                                                    <input type={'checkbox'} id={`${schema}-${item?.pk}`} name={`${schema}-check`} onChange={(e) => checkOnlyOne(e.target)} />
                                                    :
                                                    null}
                                                {column.type == 'go_pay' ?
                                                    <>
                                                        {item?.lessee_pk == getLocalStorage('auth')?.pk ?
                                                            <>
                                                                <IconButton onClick={() => {
                                                                    router.push(`/payready/${item?.pk}`)
                                                                }}>
                                                                    <Icon icon={item?.status == 0 ? `ri:money-dollar-circle-line` : `ph:eye`} style={{ color: `${item?.status == 0 ? theme.color.background1 : ''}` }} />
                                                                </IconButton>
                                                            </>
                                                            :
                                                            <>
                                                                ---
                                                            </>}
                                                    </>
                                                    :
                                                    null}

                                                {column.type == 'go_pay_list' ?
                                                    <IconButton onClick={() => {
                                                        router.push(`/history/pay`, {
                                                            state: {
                                                                contract_pk: item?.pk
                                                            }
                                                        })
                                                    }}>
                                                        <Icon icon="ic:baseline-format-list-bulleted" style={{ color: theme.color.background1 }} />
                                                    </IconButton>
                                                    :
                                                    null}

                                                {column.type == 'contract_comment' ?
                                                    getContactComment(item) ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'pay_month' ?
                                                    getPayMonth(item) ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'date' ?
                                                    item[column.column].substring(0, 10)
                                                    :
                                                    null}
                                                {column.type == 'contract_detail' ?
                                                    <IconButton onClick={() => {
                                                        goToContractDetail(item)
                                                    }}>
                                                        <Icon icon="ph:eye" />
                                                    </IconButton>
                                                    :
                                                    null}
                                                {column.type == 'class_status' ?
                                                    <TextButton style={{ height: '22px' }} onClick={() => { onSubscribe(item?.academy_category_pk) }}>수강신청</TextButton>
                                                    :
                                                    null}
                                                {column.type == 'star' ?
                                                    getStarBynum(parseInt(item[column.column])) ?? "---"
                                                    :
                                                    null}

                                                {column.type == 'number' ?
                                                    commarNumber(item[column.column]) ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'edit' ?
                                                    <IconButton onClick={() => {
                                                        if (onClickEditButton) {
                                                            onClickEditButton(item, index)
                                                        }
                                                    }}>
                                                        <Icon icon="material-symbols:edit-outline-rounded" />
                                                    </IconButton>
                                                    :
                                                    null}
                                                {column.type == 'won' ?
                                                    `${commarNumber(item[column.column])}원` ?? "---"
                                                    :
                                                    null}
                                                {column.type == 'month' ?
                                                    commarNumber(item[column.column]) + '月'
                                                    :
                                                    null}
                                                {column.type == 'subscribe_date' ?
                                                    item[column?.column] ? item[column?.column].substring(5, 10).replaceAll("-", ".") : "---"
                                                    :
                                                    null}
                                                {column.type == 'existing_possession' ?
                                                    getExistingPossessionByNumber(item[column.column])
                                                    :
                                                    null}
                                                {column.type == 'day' ?
                                                    commarNumber(item[column.column]) + '일'
                                                    :
                                                    null}
                                                {column.type == 'end_date' ?
                                                    `${item['start_date'] && item['start_date'].substring(0, 10)} ~ ${item[column.column] && item[column.column].substring(0, 10)}`
                                                    :
                                                    null}
                                                {column.type == 'percent' ?
                                                    `${item[column.column] >= 0 ? '+' : '-'}` + commarNumber(item[column.column]) + '%'
                                                    :
                                                    null}
                                                {column.type == 'delete' ?
                                                    <IconButton onClick={() => deleteItem(item.pk, table, column.name)}>
                                                        <Icon icon="material-symbols:delete-outline-sharp" />
                                                    </IconButton>
                                                    :
                                                    null}
                                                </a>
                                            </Td>
                                        </>
                                    ))}
                                </Tr>
                            ))}

                        </Table>
                    </div>
                    {data.length == 0 ?
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '250px', alignItems: 'center' }}
                            >
                                <div style={{ margin: 'auto auto 8px auto' }}>
                                    <Icon icon="material-symbols:cancel-outline" style={{ fontSize: '52px', color: theme.color.background1 }} />
                                </div>
                                <div style={{ margin: '8px auto auto auto' }}>
                                    게시물이 없습니다.
                                </div>
                            </motion.div>
                        </>
                        :
                        <>
                        </>}
                </>}

        </>
    )
}
export default ContentTable;