import { Wrappers } from "src/components/elements/UserContentTemplete";
import EditMyInfoCard from "src/components/EditMyInfoCard";
import UserLayout from "src/layouts/UserLayout";

const EditMyInfo = () => {

    return (
        <>
            <Wrappers>
                <EditMyInfoCard />
            </Wrappers>
        </>
    )
}
EditMyInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default EditMyInfo;