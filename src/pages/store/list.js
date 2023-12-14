import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";

const StoreItemList = () => {

    return (
        <>
            <Wrappers>

            </Wrappers>
        </>
    )
}
StoreItemList.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default StoreItemList;