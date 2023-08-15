import axios from "axios"
import { useState } from "react"
import {
    Box,
    Typography
} from "@mui/material"
import Loading from "components/Loading"
import TokenImage from "components/TokenImage"
import useInterval from "hooks/useInterval"
import { getContractConfigByAddress } from "utils/contractInfoHelper";

interface Props {
  contractAddress: string
  tokenId: string
  width: number,
  height: number,
  aspectRatio?: number
}

const TokenLive = ({contractAddress, tokenId, aspectRatio}: Props) => {
    const [status, setStatus] = useState(404)
    const [pollingTime, setPollingTime] = useState(0)
    const [pollingDelay, setPollingDelay] = useState(0)
    const [pollingAttempts, setPollingAttempts] = useState(0)
    const contractConfig = getContractConfigByAddress(contractAddress)
    const generatorUrl = contractConfig?.GENERATOR_URL
    const endpoint = `${generatorUrl}/${contractAddress.toLowerCase()}/${tokenId}`

    useInterval(() => {
        setPollingTime(pollingTime+1)
    }, 1000)

    useInterval(() => {
        setPollingDelay(pollingDelay+3)
        if (status === 404) {
            axios
                .get(endpoint)
                .then(function(response) {
                    setStatus(response.status)
                })
                .catch((error) => {
                    setStatus(404)
                })
                .finally(() => {
                    setPollingAttempts(pollingAttempts+1)
                })
        }
    }, 1000*pollingDelay)

    if (pollingAttempts === 0) {
        console.log('polling attemps 0, returning empty box')
        return (
            <Box width={String(0)+"px"} height={String(0)+"px"}></Box>
        )
    }

    if (pollingTime > 500) {
        console.log('returning image instead of iframe!')
        return (
            <TokenImage contractAddress={contractAddress} tokenId={tokenId} />
        )
    }

    return (
        <Box sx={{ height: '100%', position: 'relative' }}>
            {
                status === 200 ?
                    (
                        <iframe
                            title={tokenId}
                            src={endpoint}
                            width={String(100)+"%"}
                            height={String(100)+"%"}
                            frameBorder={"0"}
                        />
                    ) :
                    (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={String(100)+"%"}
                            height={String(100)+"%"}
                        >
                            <Box>
                                <Loading/>
                                <Typography>Waiting for indexing ({pollingTime})</Typography>
                            </Box>
                        </Box>
                    )
            }
        </Box>
    )
}

export default TokenLive
