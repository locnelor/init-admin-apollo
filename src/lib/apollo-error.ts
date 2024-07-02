import { message } from "antd";

export const gqlError = (error: any) => message.error(error.message)
export const gqlSuccess = (msg = "操作成功") => message.success(msg)
