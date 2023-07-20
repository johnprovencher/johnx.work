import { Box, Link } from "@mui/material"
import Connect from "components/Connect"

interface Props {
    children: React.ReactNode,
    transparent?: boolean
}

const Header = ({children, transparent=false}: Props)=> {

    return (
        <Box sx={{position: `${ transparent ? "fixed" : "sticky"}`, top: 0, left: 0, right: 0, width: "100%", display: "flex", justifyContent: "center", backgroundColor: `${ transparent ? "transparent" : "black"}`, zIndex: 1}}>
            <Box sx={{px: '24px', width: "100%", minHeight: "100px", display: "flex", margin: "auto", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{px: 2 }}>
                        <Link href="/" sx={{display: "flex"}}>
                            <img src="/media/johnx.jpg" alt="johnx" height={54} style={{borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.4)", boxShadow: `${ transparent ? '0px 0px 13px 1px #ffffff' : ''}` }}></img>
                        </Link>
                    </Box>
                    { children }
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" sx={{px: 2}}>
                    <Connect/>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
