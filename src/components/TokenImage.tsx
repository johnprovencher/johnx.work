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
        <Box sx={{ height: '100%', position: 'relative' }}>
            <img
                src={`${contractConfig?.MEDIA_URL}/${tokenId}.png`}
                alt={tokenId}
                width={'100%'}
                height={'100%'}
            />
        </Box>
    )
}

export default TokenImage
