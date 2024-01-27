import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { filteredProductsState } from "../store/selectors/productSearch"

export const SearchResults = () => {
    const products = useRecoilValue(filteredProductsState)

    console.log(products)
    return<Box>

    </Box>
}