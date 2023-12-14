import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";

const StoreItem = () => {

    return (
        <>
            <Wrappers>

            </Wrappers>
        </>
    )
}
StoreItem.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default StoreItem;