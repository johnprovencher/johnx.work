import { Box } from "@mui/material"
import { getContractConfigByAddress } from "utils/contractInfoHelper";

interface Props {
  contractAddress: string
  tokenId: string,
  aspectRatio?: number
}

const TokenImage = ({contractAddress, tokenId, aspectRatio}: Props) => {
    const contractConfig = getContractConfigByAddress(contractAddress)
    const paddingtTop = aspectRatio ? ((1.0/aspectRatio) * 100) : 100

    return (
        <Box sx={{ width: '100%', paddingTop: `${paddingtTop}%`, position: 'relative' }}>
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
