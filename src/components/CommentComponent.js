import { IoImageOutline } from 'react-icons/io5'
import AddButton from "./elements/button/AddButton";
import theme from '../styles/theme';
import { Content } from './elements/UserContentTemplete';
import { backUrl } from '../data/Data';
import axios from 'axios';
const  defaultImg = '/assets/images/icon/default-profile.png';
import { useEffect, useState } from 'react';
import { TbArrowForward } from 'react-icons/tb'
import { ImBubble2 } from 'react-icons/im'
import { commarNumber } from '../functions/utils';
import $ from 'jquery'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CommentInputContent = (props) => {
    const { addComment, parentPk, pk, userPk, is_update, updateComment } = props;
    return (
        <>
            <div style={{ border: `1px solid ${theme.color.font3}`, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                <textarea style={{ outline: 'none', resize: 'none', border: 'none', height: '54px', fontSize: theme.size.font4 }} className={is_update ? `update-comment-${pk}` : `comment-${parentPk}`} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                    <IoImageOutline style={{ color: theme.color.font3 }} />
                    <AddButton style={{ background: theme.color.font2, boxShadow: 'none' }} onClick={() => is_update ? updateComment(pk) : addComment(parentPk)}>{is_update ? '수정' : '작성'}</AddButton>
                </div>
            </div>
        </>
    )
}
const CommentContent = (props) => {
    const { item, deleteComment, isReply, displayReplyInput, displayUpdateInput, updateCommentObj, updateComment, auth } = props;

    return (
        <>
            <div style={{ borderBottom: `1px solid ${theme.color.font3}`, display: 'flex', padding: '1.5%', fontSize: theme.size.font4, width: `${isReply ? '90%' : '97%'}`, margin: `${isReply ? '0 0 0 auto' : '0'}` }}>
                {isReply ?
                    <>
                        <TbArrowForward style={{ fontSize: theme.size.font2 }} />
                    </>
                    :
                    <>
                    </>}
                <LazyLoadImage
                    alt={item.nickname}
                    effect="blur"
                    height={64}
                    width={64}
                    src={item?.profile_img ? (item?.profile_img?.substring(0, 4) == 'http' ? item.profile_img.replaceAll("http://", "https://") : backUrl + item.profile_img) : defaultImg} // use normal <img> attributes as props
                    style={{ borderRadius: '50%' }}
                    onError={defaultImg} />
                <div style={{ marginLeft: '16px' }}>
                    <div style={{ marginBottom: '6px', display: 'flex' }}><div style={{ marginRight: '6px' }}>{item.nickname}</div> <div style={{ color: theme.color.font3 }}>{item.date.substring(0, 16)}</div></div>
                    <div style={{ wordBreak: 'break-all', marginBottom: '6px', fontSize: theme.size.font3, whiteSpace: 'pre-line' }}>{item.note}</div>
                    <div style={{ display: 'flex' }}>
                        {!isReply && ((localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth'))?.user_level >= 0) || (auth && auth?.user_level >= 0)) ?
                            <>
                                <div style={{ marginRight: '6px', cursor: 'pointer' }} onClick={displayReplyInput}>답글</div>
                            </>
                            :
                            <>
                            </>}
                        {(JSON.parse(localStorage.getItem('auth'))?.pk == item.user_pk || JSON.parse(localStorage.getItem('auth'))?.user_level >= 40) || (auth?.pk == item.user_pk || auth?.user_level >= 40) ?
                            <>

                                <div style={{ marginRight: '6px', cursor: 'pointer' }} onClick={() => displayUpdateInput(item.pk)}>수정</div>
                                <div style={{ cursor: 'pointer' }} onClick={() => deleteComment(item.pk)}>지우기</div>
                            </>
                            :
                            <>
                            </>
                        }

                    </div>
                </div>
            </div>
            {updateCommentObj[item.pk].display ?
                <>
                    <CommentInputContent is_update={true} pk={item.pk} updateComment={updateComment} />
                </>
                :
                <>
                </>
            }
        </>
    )
}
const CommentComponent = (props) => {
    const { data, addComment, updateComment, fetchComments, auth } = props;
    const [zComment, setZComment] = useState([]);
    const [updateCommentObj, setUpdateCommentObj] = useState([]);
    const [replyObj, setreplyObj] = useState({});
    const deleteComment = async (pk) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            let obj = {
                pk: pk,
                table: 'comment'
            }
            const { data: response } = await axios.post(`/api/deleteitem`, obj)
            if (response.result > 0) {
                fetchComments();
            } else {
                alert('error')
            }
        }
    }
    useEffect(() => {
        let comment_list = [...data];
        let update_comment_obj = {};
        for (var i = 0; i < comment_list.length; i++) {
            update_comment_obj[comment_list[i].pk] = {
                display: false,
                note: comment_list[i].note
            }
        }
        setUpdateCommentObj(update_comment_obj);

        let comment_list_desc = [...comment_list].reverse();

        let list = [];
        let reply_obj = {};

        for (var i = 0; i < comment_list.length; i++) {
            if (comment_list[i]?.parent_pk == 0) {
                comment_list[i].reply_display = false;
                list.push(comment_list[i])
            }
        }
        for (var i = 0; i < comment_list_desc.length; i++) {
            if (comment_list_desc[i]?.parent_pk != 0) {
                if (!reply_obj[comment_list_desc[i]?.parent_pk]) {
                    reply_obj[comment_list_desc[i]?.parent_pk] = [];
                }
                reply_obj[comment_list_desc[i]?.parent_pk].push(comment_list_desc[i])
            }
        }
        setZComment(list);
        setreplyObj(reply_obj)

    }, [data])
    const displayReplyInput = (num, type) => {
        let list = [...zComment];
        for (var i = 0; i < list.length; i++) {
            if (list[i].pk == num) {
                list[i].reply_display = !list[i].reply_display;
            }
        }
        setZComment(list)
    }
    const displayUpdateInput = async (pk) => {
        let update_comment_obj = { ...updateCommentObj };
        updateCommentObj[pk].display = !updateCommentObj[pk].display;
        setUpdateCommentObj(update_comment_obj);
        await new Promise((r) => setTimeout(r, 200));
        $(`.update-comment-${pk}`).val(updateCommentObj[pk].note)

    }
    return (
        <>

            <Content style={{ marginTop: '32px' }}>
                <div style={{ color: `${theme.color.font3}`, display: 'flex', alignItems: 'center', fontSize: theme.size.font4, marginBottom: '8px' }}><ImBubble2 style={{ marginRight: '4px' }} /><div><div>{commarNumber(data.length ?? 0)}</div></div></div>
                {JSON.parse(localStorage.getItem('auth'))?.pk || auth?.pk > 0 ?
                    <>
                        <CommentInputContent addComment={addComment} parentPk={0} />
                    </>
                    :
                    <>
                    </>
                }
            </Content>


            <Content>
                {zComment.length > 0 ?
                    <>
                        {zComment.map((item, index) => (
                            <>
                                <CommentContent auth={auth} item={item} deleteComment={deleteComment} isReply={false} displayReplyInput={() => displayReplyInput(item.pk)} displayUpdateInput={displayUpdateInput} updateCommentObj={updateCommentObj} updateComment={updateComment} />

                                {item?.reply_display ?
                                    <>
                                        <CommentInputContent addComment={addComment} parentPk={item.pk} />

                                    </>
                                    :
                                    <>
                                    </>}
                                {replyObj[item?.pk] ?
                                    <>
                                        {replyObj[item?.pk].map((itm, idx) => (
                                            <>
                                                <CommentContent auth={auth} item={itm} deleteComment={deleteComment} isReply={true} displayUpdateInput={displayUpdateInput} updateCommentObj={updateCommentObj} updateComment={updateComment} />
                                            </>
                                        ))}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </>
                        ))}
                    </>
                    :
                    <>
                    </>}
            </Content>
        </>
    )
}
export default CommentComponent;