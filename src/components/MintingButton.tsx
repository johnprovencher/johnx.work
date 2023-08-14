import { Button, Box, Typography } from "@mui/material"

interface Props {
  disabled: boolean,
  message: string,
  contractPurchase: any
}

const MintingButton = ({disabled, message, contractPurchase}: Props) => {
    return (
        <Box
            color="primary"
            onClick={() => contractPurchase?.()}
            sx={{
                cursor: 'pointer',
                textAlign: 'center',
                paddingTop: 1.5,
                paddingRight: 1,
                paddingLeft: 1,
                paddingBottom: 1.5,
                boxShadow: "none",
                textTransform: "none"
            }}>
            <Typography fontSize={14} fontWeight={800}>
                {message}
            </Typography>
        </Box>
    )
}

export default MintingButton
