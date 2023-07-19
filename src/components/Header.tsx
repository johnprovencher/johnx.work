import { useState } from "react"
import {
    Box,
    Link,
    AppBar,
    Toolbar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Connect from "components/Connect"
import { useAccount } from "wagmi"
import JohnBox from "./Johnx/JohnBox"

let items = [
    {
        label: "Projects",
        url: "/projects",
        enabled: true
    },
    {
        label: "Owned",
        url: "/user",
        enabled: false
    },
    {
        label: "Mint",
        url: "/mint",
        enabled: false
    }
]

const Header = () => {
    const { address, isConnected } = useAccount()
    const [mobileOpen, setMobileOpen] = useState(false)

    let userItem = items.find((item) => {
        return item.label === "Owned"
    })
    if (isConnected) {
        if (userItem) {
            userItem.enabled = true
            userItem.url = `/user/${address}`
        }
    } else {
        if (userItem) {
            userItem.enabled = false
            userItem.url = `/user`
        }
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
            <List dense>
                {items.map((item) => (
                    <ListItem sx={{"&:hover": {backgroundColor: "#f5f5f5"}}} key={item.label} disablePadding>
                        <ListItemButton component={Link} href={item.url} sx={{textAlign: "left", pointerEvents: item.enabled ? "auto" : "none"}}>
                            <ListItemText primary={item.label} primaryTypographyProps={{fontSize: 18, fontWeight: 600, color: item.enabled ? "black" : "lightgrey"}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
    return (
        <Box sx={{position: "sticky", top: 0, width: "100%", display: "flex", justifyContent: "center", backgroundColor: "black"}}>
            <Box sx={{width: "100%", minHeight: "100px", display: "flex", margin: "auto", justifyContent: "space-between", backgroundColor: "black"}}>
                <Box sx={{display: "flex", backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{px: 2 }}>
                        <Link href="/" sx={{display: "flex"}}>
                            <img src="/media/johnx.jpg" alt="johnx" height={54} style={{borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.4)" }}></img>
                        </Link>
                    </Box>
                    <JohnBox> 
                    welcome to johnx.work, a home for on-chain generative art by john provencher...
                    </JohnBox>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" sx={{px: 2}}>
                    <Connect/>
                </Box>
            </Box>
            <Box component="nav">
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{keepMounted: true}}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 240
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}

export default Header
