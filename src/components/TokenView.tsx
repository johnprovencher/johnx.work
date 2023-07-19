import {
    Box,
    Card,
    Link
} from "@mui/material"
import TokenImage from "components/TokenImage"
import TokenLive from "components/TokenLive"

interface Props {
    contractAddress: string
    tokenId: string
    width: number
    invocation?: BigInt
    aspectRatio?: number
    live?: boolean
}

const TokenView = ({
    contractAddress,
    tokenId,
    invocation,
    aspectRatio=1,
    live=false
}: Props) => {
    return (
        <Box >
            <Card sx={{borderRadius: 0, boxShadow: 0}}>
                {
                    live ?
                        (
                            <TokenLive contractAddress={contractAddress} tokenId={tokenId} width={300} height={300} />
                        ) :
                        (
                            <TokenImage contractAddress={contractAddress} tokenId={tokenId} />
                        )
                }
            </Card>
            { invocation !== undefined &&
                (
                    <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                        <Link href={`/token/${contractAddress}/${tokenId}`} sx={{fontSize: "14px", textDecoration: "none"}}>
                            No. { invocation?.toString() }
                        </Link>
                    </Box>
                )
            }
        </Box>
    )
}

export default TokenView
