import axios from "axios"
import { useState, useEffect } from "react"
import { getContractConfigByAddress } from "utils/contractInfoHelper";
import { Token } from "utils/types";

const useTokenTraitsBatch = (contractAddress: string, tokens: Token[]): 
{
    loading: boolean;
    error: boolean;
    dataArray: any[] | null;
} => {
    const [dataArray, setDataArray] = useState<any[] | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const contractConfig = getContractConfigByAddress(contractAddress)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const tokenUrl = contractConfig?.TOKEN_URL
                const results = await Promise.all(
                    tokens.map( async (token) => {
                        const result = await axios.get(`${tokenUrl}/${contractAddress}/${token.tokenId}`)
                        return {
                            tokenID: result.data.tokenID,
                            traits: result.data.traits
                        }
                    })
                )
                setDataArray(results)
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [tokens, contractAddress, contractConfig])

    return {
        loading,
        error,
        dataArray
    }
}

export default useTokenTraitsBatch
