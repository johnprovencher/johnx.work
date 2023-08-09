import { Box, Link } from "@mui/material"
import Connect from "components/Connect"

interface Props {
    children: React.ReactNode,
    transparent?: boolean
}

const Header = ({children, transparent=false}: Props)=> {

    return (
        <Box sx={{position: `${ transparent ? "absolute" : "inherit"}`, top: 0, left: 0, right: 0, width: "100%", display: "flex", justifyContent: "center", backgroundColor: `${ transparent ? "transparent" : "transparent"}`, zIndex: 1, marginTop: "0px", marginBottom: "20px" }}>
            <Box sx={{px: '0px', width: "100%", minHeight: "100px", display: "flex", margin: "auto", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{px:3}}>
                        <Link className="orb" href="/" sx={{display: "flex"}}>
                        </Link>
                    </Box>
                    { children }
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" sx={{px: 3}}>
                    <Connect/>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
