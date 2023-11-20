import { useRoutes } from "react-router-dom"
import { routes } from "../../routes"

const AllRoutes = () => {
    const elements = useRoutes(routes);

    return (
        <>
            {elements}
        </>
    )
}

export default AllRoutes;