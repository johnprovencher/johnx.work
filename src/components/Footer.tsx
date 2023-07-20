import {
    Box,
    Typography,
    Link
} from "@mui/material"
import JohnBox from "./Johnx/JohnBox"

const Footer = () => {
    
    return (
        <Box py={4} sx={{ display: 'grid', position: 'relative', gridGap: '2em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', '@media screen and (max-width: 465px)': {gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' } }}>
            <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                <Typography fontSize={16} fontWeight={800} sx={{color:"rgba(255,255,255,0.5)"}}>
                        SUBSCRIBE FOR UPDATES   
                </Typography>
                <Box sx={{ display: 'inline-flex', gap:'8px', '@media screen and (max-width: 465px)': {flexDirection: 'column', alignItems: 'flex-start' } }}>
                    <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
                            johnprovencher@gmail.com
                    </JohnBox>
                    <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
                            subscribe
                    </JohnBox>
                </Box>
            </Box>
            <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                <Typography fontSize={16} fontWeight={800} sx={{color:"rgba(255,255,255,0.5)"}}>
                            FOLLOW
                </Typography>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'2px' }}>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                INSTAGRAM
                        </Typography>
                    </Link>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                TWITTER
                        </Typography>
                    </Link>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                THREADS
                        </Typography>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                <Box sx={{ display: 'inline-flex', gap:'8px' }}>
                    <Typography fontSize={16} fontWeight={800} sx={{ color:"rgba(255,255,255,0.5)", display: 'inline-block'}}>
                            POWERED BY
                    </Typography>
                    <Typography fontSize={16} fontWeight={800} sx={{ display: 'inline-block'}}>
                            ART BLOCKS ENGINE
                    </Typography>
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'2px' }}>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                VIEW ETHERSCAN CONTRACT
                        </Typography>
                    </Link>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                TERMS OF USE
                        </Typography>
                    </Link>
                    <Link href={`/`} underline="hover">
                        <Typography fontSize={16} fontWeight={800}>
                                PRIVACY POLICY
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
