import { useState } from "react"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"
import { BigNumber } from "ethers"
import { Box, Typography, Modal } from "@mui/material"
import { MULTIPLY_GAS_LIMIT } from "config"
import { multiplyBigNumberByFloat, formatEtherFixed } from "utils/numbers"
import MinterMerkleV5ABI from "abi/V3/MinterMerkleV5.json"
import TokenView from "components/TokenView"
import useWindowSize from "hooks/useWindowSize"
import MintingButton from "components/MintingButton"
import TokenImage from "components/TokenImage"
import { parseAspectRatio } from "utils/scriptJSON"

interface Props {
  coreContractAddress: string,
  mintContractAddress: string,
  projectId: string,
  priceWei: BigNumber
  currencySymbol: string,
  isConnected: boolean,
  artistCanMint: boolean,
  anyoneCanMint: boolean,
  scriptAspectRatio: number,
  verifyBalance: boolean,
  isPaused: boolean,
  isSoldOut: boolean,
  didEndPurchaseTransaction?: () => void
}

const MinterSetPriceV4Button = (
    {
        coreContractAddress,
        mintContractAddress,
        projectId,
        priceWei,
        currencySymbol,
        isConnected,
        artistCanMint,
        anyoneCanMint,
        scriptAspectRatio,
        verifyBalance,
        isPaused,
        isSoldOut,
        didEndPurchaseTransaction
    }: Props
) => {
    const windowSize = useWindowSize()
    const [dialog, setDialog] = useState("")
    const [mintingTokenId, setMintingTokenId] = useState<any | null>(null)
    const [mintingPreview, setMintingPreview] = useState(false)
    const handleMintingPreviewOpen = () => setMintingPreview(true)
    const handleMintingPreviewClose = () => setMintingPreview(false)

    const { config } = usePrepareContractWrite({
        address: mintContractAddress as `0x${string}`,
        abi: MinterMerkleV5ABI,
        functionName: "purchase",
        overrides: {
            value: priceWei
        },
        enabled: (!isPaused || artistCanMint) && !isSoldOut && verifyBalance,
        args: [
            BigNumber.from(projectId)
        ]
    })

    let customRequest = config.request ? {
        data: config.request?.data,
        from: config.request?.from,
        gasLimit: multiplyBigNumberByFloat(config.request?.gasLimit, MULTIPLY_GAS_LIMIT),
        to: config.request?.to,
        value: config.request?.value
    } : undefined

    const { data, write } = useContractWrite({
        ...config,
        request: customRequest,
        onSuccess() {
            setDialog("Tx pending...")
        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        confirmations: 1,
        onSuccess(data) {
            let tokenId = data?.logs[0]?.topics[3]
            if (tokenId) {
                console.log('before timer')
                setTimeout(() => {
                    setMintingTokenId(parseInt(tokenId, 16).toString())
                    handleMintingPreviewOpen()
                    didEndPurchaseTransaction?.()
                    console.log('after timer')
                    setDialog("")
                }, 3000);
            }
        }
    })

    const mintingDisabled = isPaused || isSoldOut || !isConnected || !verifyBalance
    let mintingMessage = `${artistCanMint ? "Artist Mint " : "Purchase "} for ${formatEtherFixed(priceWei.toString(), 3)} ${currencySymbol}`
    if (isPaused && !artistCanMint) mintingMessage = "minting paused"
    else if (isSoldOut) mintingMessage = "sold out"
    else if (!isConnected) mintingMessage = "connect to purchase"
    else if (!verifyBalance) mintingMessage = "insufficient funds"

    return (
        <Box>
            <MintingButton
                disabled={mintingDisabled && !artistCanMint}
                message={ dialog !== "" ? dialog : mintingMessage }
                contractPurchase={write}
            />
            <Modal
                open={mintingPreview}
                onClose={handleMintingPreviewClose}
                sx={{outline: 0}}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "75%",
                    bgcolor: "black",
                    border: "white solid 1px",
                    boxShadow: 10,
                    padding: 5,
                    outline: 0
                }}>
                    <Box sx={{display: "grid", justifyContent: "center", alignItems: "center" }}>
                        <Typography>
                            Minted token{mintingTokenId}
                        </Typography>
                        <Box marginTop={1} sx={{position: 'relative'}}>
                            <Box sx={{border: "white solid 1px", position: "absolute", top: 0, left: 0, width: '100%', height: '100%', display: "grid", justifyContent: "center", alignItems: "center" }}>
                                <Typography>
                                    Image loading...
                                </Typography>
                            </Box>
                            <TokenImage contractAddress={coreContractAddress} tokenId={mintingTokenId} aspectRatio={scriptAspectRatio} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default MinterSetPriceV4Button
