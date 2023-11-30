import axios from "axios";
import { useEffect, useState } from "react";
import { Wrappers, Title } from "src/components/elements/UserContentTemplete";
import { communityCategoryList } from "src/data/Data";
import theme from "src/styles/theme";
import styled from "styled-components";
import { range } from "src/functions/utils";
import Loading from "src/components/Loading";
import SideSelectTypeComponent from "src/components/SideSelectTypeComponent";
import ContentTable from "src/components/ContentTable";
import PageContainer from "src/components/elements/pagination/PageContainer";
import PageButton from "src/components/elements/pagination/PageButton";
import MBottomContent from "src/components/elements/MBottomContent";
import AddButton from "src/components/elements/button/AddButton";
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";

const RowContent = styled.div`
display:flex;
width:100%;
margin-top:24px;
@media screen and (max-width:700px) { 
    flex-direction:column;
}
`
const Content = styled.div`
margin:0 auto 1rem 300px;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
max-width:800px;

@media screen and (max-width:850px) { 
    margin:0 auto;
}
`
const CommunityList = () => {

    const router = useRouter();
    const params = router.query;
    const [category, setCategory] = useState(params?.table);
    const [categoryIdx, setCategoryIdx] = useState(0);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {
        let category_idx = 0;
        for (var i = 0; i < communityCategoryList.length; i++) {
            if (params?.table == communityCategoryList[i].table) {
                category_idx = i;
                break;
            }
        }
        setCategoryIdx(category_idx);
        getCommunityList(1);
    }, [params?.table])

    const getCommunityList = async (num) => {
        setLoading(true);
        setPage(num);
        const { data: response } = await axios.get(`/api/items?table=${params?.table}&page=${num}&page_size=15`);
        setData(response?.data?.data);
        setPageList(range(1, response?.data?.maxPage));
        setLoading(false);
    }
    const onClickCategory = (category) => {
        setCategory(category)
        router.push(`/community-list/${category}`);
    }
    return (
        <>
            <Wrappers className="post-container">

                <RowContent>
                    <SideSelectTypeComponent
                        data={communityCategoryList}
                        schema={params?.table}
                        category={category}
                        onClickCategory={onClickCategory}
                        setTypeNum={() => { }}
                    />
                    <Content style={{ maxWidth: '750px' }}>
                        <Title>{communityCategoryList[categoryIdx].name}</Title>
                        {loading ?
                            <>
                                <Loading />
                            </>
                            :
                            <>
                                <ContentTable
                                    data={data}
                                    schema={category}
                                    table={category}
                                />
                            </>}
                        <MBottomContent>
                            {communityCategoryList[categoryIdx]?.is_write ?
                                <>
                                    <div style={{ width: '92px' }} />
                                </>
                                :
                                <>
                                    <div />
                                </>}
                            {pageList.length > 0 ?
                                <>
                                    <PageContainer>
                                        <PageButton onClick={() => getCommunityList(1)}>
                                            처음
                                        </PageButton>
                                        {pageList.map((item, index) => (
                                            <>
                                                <PageButton onClick={() => getCommunityList(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                                    {item}
                                                </PageButton>
                                            </>
                                        ))}
                                        <PageButton onClick={() => getCommunityList(pageList.length ?? 1)}>
                                            마지막
                                        </PageButton>
                                    </PageContainer>
                                </>
                                :
                                <>
                                    <div />
                                </>}

                            {communityCategoryList[categoryIdx]?.is_write ?
                                <>
                                    <AddButton style={{ width: '92px' }} onClick={() => {
                                        router.push(`/add-community/${category}`)
                                    }}>+ 작성하기</AddButton>
                                </>
                                :
                                <>
                                    <div />
                                </>}
                        </MBottomContent>
                    </Content>
                </RowContent>
            </Wrappers>
        </>
    )
}
CommunityList.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default CommunityList;