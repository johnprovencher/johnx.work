import { CONTRACT_INFO, EXPECTED_CHAIN_ID } from "config"

export const getContractConfigByAddress = (contractAddress: string) => {
    return CONTRACT_INFO.find(
        x => x.CORE_CONTRACT_ADDRESS.toLowerCase() === contractAddress.toLowerCase()
    )
}

export const getConfiguredContractAddresses = () => {
    return CONTRACT_INFO.map(x => x.CORE_CONTRACT_ADDRESS)
}

export const isUsingTestnet = () => {
    return EXPECTED_CHAIN_ID !== 1
}
