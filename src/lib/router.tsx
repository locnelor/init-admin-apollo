import HomePage from "@/pages/page";
import {
    createHashRouter
} from "react-router-dom";

const router: any = createHashRouter([{
    path: "/",
    element: <HomePage />
}])
export default router