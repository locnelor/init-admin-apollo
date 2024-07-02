import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react"


const viewer = gql`
    query Viewer{
        viewer{
            hash_key
            name
            sys_roleId
        }
    }
`
interface ViewerQuery {
    viewer: {
        hash_key: string
        name: string
        sys_roleId: number
    }
}
const useViewer = () => {
    const { data, loading } = useQuery<ViewerQuery>(viewer)
    const user = useMemo(() => data?.viewer, [data]);
    return {
        user,
        loading
    }
}
export default useViewer