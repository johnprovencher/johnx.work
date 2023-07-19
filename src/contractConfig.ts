export const mainnetContractConfig = [
    {
        "CONTRACT_VERSION": "V2",
        "CORE_CONTRACT_ADDRESS": "0xa319c382a702682129fcbf55d514e61a16f97f9c",
        "MINT_CONTRACT_ADDRESS": "0x463b8ced7d22a55aa4a5d69ef6a54a08aa0feb93",
        "MEDIA_URL": "https://plottables-mainnet.s3.amazonaws.com",
        "TOKEN_URL": "https://token.artblocks.io",
        "GENERATOR_URL": "https://generator.artblocks.io",
        "EDIT_PROJECT_URL": "https://artblocks.io/engine/fullyonchain/projects"
    }
]

const CORE_CONTRACT = '0x82b3D1738Bd0f2963456Dc658c68E84D29faa23C'
const MINT_CONTRACT = '0xB8024e7E3fEA4625d85A9161D4d61DE9D575aeD6'
export const testnetContractConfig = [
    {
        "CONTRACT_VERSION": "V3",
        "CORE_CONTRACT_ADDRESS": CORE_CONTRACT,
        "MINT_CONTRACT_ADDRESS": MINT_CONTRACT,
        "MEDIA_URL": `https://media-proxy-staging.artblocks.io/${CORE_CONTRACT}`,
        "TOKEN_URL": `https:token.staging.artblocks.io/${CORE_CONTRACT}`,
        "GENERATOR_URL": `https://generator-staging-goerli.artblocks.io/${CORE_CONTRACT}`,
        "EDIT_PROJECT_URL": `https://artist-staging.artblocks.io/engine/flex/projects/${CORE_CONTRACT}`
    }
]
