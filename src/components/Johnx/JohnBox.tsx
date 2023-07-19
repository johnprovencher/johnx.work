import { Box, Typography } from "@mui/material"

interface Props {
    disabled: boolean,
    children: React.ReactNode
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
            right
        }}
    />
  )

const JohnBox = ({disabled, children}: Props) => {
  return (
    <Box sx={{position: 'relative', height: '33.5px', alignItems: 'center', display: 'inline-flex', backgroundColor: '#333333', borderRadius:'4px'}}>
        <Box style={{height: '100%', width: '12px'}}>
            <Screw top='4px' left='4px' />
            <Screw bottom='4px' left='4px' />
        </Box>
        <Typography fontSize={16} fontWeight={800} sx={{ px: 1 }}>
          {children}
        </Typography>
        <Box style={{height: '100%', width: '12px'}}>
            <Screw top='4px' right='4px' />
            <Screw bottom='4px' right='4px' />
        </Box>
    </Box>
  )
}

export default JohnBox
