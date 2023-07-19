import { Box, Typography } from "@mui/material"
import { MouseEventHandler } from "react"

interface Props {
    isContainer?: boolean,
    onClick?: MouseEventHandler,
    style?: Object
    children: React.ReactNode,
}

interface ScrewProps {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

const Screw = ({ top, left, bottom, right }:ScrewProps) => (
    <Box
        sx={{
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "2px",
            width: "4px",
            height: "4px",
            top,
            left,
            bottom,
            right,
        }}
    />
)

const JohnBox = ({isContainer=false, onClick, style, children}: Props) => {
    return (
        <Box onClick={onClick} sx={{ cursor: `${onClick ? 'pointer' : ''}`, position: 'relative', height: '33.5px', alignItems: 'center', display: 'inline-flex', backgroundColor: '#333333', borderRadius:'4px'}} style={style}>
            <Box style={{height: '100%', width: '12px'}}>
                <Screw top='4px' left='4px' />
                <Screw bottom='4px' left='4px' />
            </Box>
            {
                isContainer && (
                    <>
                        {children}
                    </>
                )
            }
            {
                !isContainer && (
                    <Typography fontSize={16} fontWeight={800} sx={{ px: 1 }}>
                        {children}
                    </Typography>
                )
            }
            <Box style={{height: '100%', width: '12px'}}>
                <Screw top='4px' right='4px' />
                <Screw bottom='4px' right='4px' />
            </Box>
        </Box>
    )
}

export default JohnBox
