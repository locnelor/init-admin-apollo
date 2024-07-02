import { gqlError } from "@/lib/apollo-error";
import { setCookie } from "@/lib/cookie";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd"
import { useCallback } from "react";


const AuthMutation = gql`
    mutation Auth(
        $account:String!,
        $password:String!
    ){
        auth(
            account:$account,
            password:$password
        ){
            token
        }
    }
`
const LoginPage = () => {
    const [form] = Form.useForm();
    const client = useApolloClient()
    const [auth] = useMutation(AuthMutation, {
        onCompleted({ auth: { token } }) {
            setCookie("token", token)
            client.resetStore()
        },
        onError(error) {
            gqlError(error)
        },
    })
    const onFinish = useCallback((variables: any) => {
        auth({
            variables
        })
    }, [])
    return (
        <div className="mb-32 pl-5 pr-5">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto rounded"
                        src="/logo.png"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                        欢迎来到Bug窝子
                    </h2>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="账号"
                        name="account"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button block htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage