import UserLayout from "src/layouts/UserLayout";
import { Wrappers } from "src/components/elements/UserContentTemplete";
import LoginCard from "src/components/LoginCard";

const Login = () =>{
    return (
        <>
        <Wrappers className="wrapper">
            <LoginCard/>
        </Wrappers>
        </>
    )
}
Login.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Login;