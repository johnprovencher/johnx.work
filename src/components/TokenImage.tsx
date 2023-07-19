import { Box } from "@mui/material"
import { getContractConfigByAddress } from "utils/contractInfoHelper";

interface Props {
  contractAddress: string
  tokenId: string
}

const TokenImage = ({contractAddress, tokenId}: Props) => {
    const contractConfig = getContractConfigByAddress(contractAddress)

    return (
        <Box sx={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
            <Box sx={{
                backgroundImage: `url(${contractConfig?.MEDIA_URL}/${tokenId}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }} />
        </Box>
    )
}

export default TokenImage
