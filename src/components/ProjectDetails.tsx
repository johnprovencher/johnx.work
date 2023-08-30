import {
    Box,
    Typography,
    Alert,
} from "@mui/material"
import Loading from "components/Loading"
import useProject from "hooks/useProject"
import { getContractConfigByAddress } from "utils/contractInfoHelper"
import Footer from "./Footer"
import TokenImage from "./TokenImage"
import TokenLive from "./TokenLive"
import JohnDotsPercentage from "./Johnx/JohnDotsPercentage"
import JohnBox from "./Johnx/JohnBox"
import JohnDotsLine from "./Johnx/JohnDotsLine"
import { parseAspectRatio } from "utils/scriptJSON"
import { Trait } from "utils/types"
import { useEffect, useState } from "react"
import useTokenTraitsBatch from "hooks/useTokenTraitsBatch"
import { isUsingTestnet } from "utils/contractInfoHelper"
import MintingInterfaceFilter from "./MintingInterfaceFilter"
import MinterSetPriceV4Interface from "./MinterInterfaces/MinterSetPriceV4Interface"
import { useAccount } from "wagmi"
import Connect from "./Connect"
import { useWindowSize } from "usehooks-ts"

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
    const { isConnected } = useAccount()
    const { loading, error, data, refetch } = useProject(`${contractAddress}-${id}`)
    const project = data?.project
    const contractConfig = getContractConfigByAddress(contractAddress)
    const showLiveToken = true

    const { width } = useWindowSize()

    const { dataArray: traitsdataArray } = useTokenTraitsBatch(contractAddress, project.tokens)
    const [selectedToken, setSelectedToken] = useState<null| any>(null)
    const [lockSelectedToken, setLockSelectedToken] = useState<boolean>(false)

    useEffect(() => {
        if (traitsdataArray) { 
            let firstToken = traitsdataArray[0] as any
            setSelectedToken(firstToken)
            console.log('traitsdataArray: ' + JSON.stringify(traitsdataArray))
        }
    }, [traitsdataArray])

    interface RowProps {
        isHeader?: boolean,
        tokenData?: any
    }

    const ProjectMetadataRow = ({isHeader=false, tokenData}: RowProps) => (
        <Box className={`${!isHeader ? "row" : ''}`}
            sx={{ 
                display: 'flex', width: '100%', gap: '1em',  paddingTop: `${isHeader ? '5px' : ''}`, cursor: `${!isHeader ? 'pointer' : ''}`, color: `${isHeader ? 'rgba(255,255,255,0.5)' : ''}`,
                outline: `${!isHeader && tokenData === selectedToken ? '1px dotted rgba(255, 255, 255, .7) !important' : ''}`
            }} 
            onMouseOver={() => { if(tokenData && !lockSelectedToken) { setSelectedToken(tokenData) }}}
            onMouseUp={() => { if (lockSelectedToken && tokenData === selectedToken) { setLockSelectedToken(false) } else { setSelectedToken(tokenData); setLockSelectedToken(true) } }}

        >
            <Box sx={{position: 'relative', textAlign: 'center', width: '35px'}}>
                {
                    isHeader ? 
                        (
                            <Typography sx={{position: 'relative', backgroundColor: 'black'}}>img</Typography>
                        )
                        :
                        (
                            <TokenImage contractAddress={project.contract.id} tokenId={tokenData.tokenID} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                        )
                }
            </Box>
            {
                tokenData && tokenData.traits && (
                    <Box sx={{ display: 'grid', flex: 1, gap: '6px', alignItems: 'center', gridTemplateColumns: `repeat(${tokenData.traits.length}, 1fr)` }}>
                        {
                            tokenData.traits.map((trait:any, idx:number) => (
                                <Box key={idx} sx={{position: 'relative'}}>
                                    <JohnDotsLine />
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', paddingRight:"6px"}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? trait.trait_type : trait.value } </Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                )
            }
        </Box>
    )

    if (error) {
        return (
            <Box>
                <Alert severity="error">
                    Error loading project
                </Alert>
            </Box>
        )
    }

    if (loading) {
        return <Loading/>
    }


    return project && contractConfig && (
        <Box sx={{px: '24px', maxWidth:'10400px', margin: '0 auto'}}>
            <Box sx={{width: `${project.aspectRatio * 100}vh`, maxWidth: '100%', height: '100vh', margin:'auto', paddingBottom: '4em'}}>
                {
                    project.tokens && (
                        showLiveToken ?
                            (
                                <TokenLive contractAddress={contractAddress} tokenId={project.tokens[0].tokenId} width={300} height={300} />
                            ) :
                            (
                                <TokenImage contractAddress={project.contract.id} tokenId={project.tokens[0].tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                            )
                    )
                }
            </Box>
            <Box sx={{ display: 'grid', position: 'relative', gridGap: '2em', paddingBottom: '4em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                '@media screen and (max-width: 465px)': {
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }
            }}>
                <Box > 
                    <Box sx={{height: '100px'}}>
                        <Typography>title</Typography>
                        <Typography>release date</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: '4px', justifyContent: 'space-between', alignItems: "center"}}> 
                        <Box sx={{display: 'inline-flex', gap: '4px'}}> 
                            <Typography fontSize={14} fontWeight={800} pr={'4px'} sx={{backgroundColor: 'black'}}>
                                <span>({project.invocations.toString()}/{project.maxInvocations.toString()})</span>
                            </Typography> 
                            <JohnDotsPercentage percentage={Number(project.invocations)/Number(project.maxInvocations)} />
                        </Box>
                        {
                            isConnected ? 
                                (
                                    <JohnBox isContainer={true}>
                                        <MinterSetPriceV4Interface 
                                            coreContractAddress={getContractConfigByAddress(contractAddress)?.CORE_CONTRACT_ADDRESS!}
                                            mintContractAddress={getContractConfigByAddress(contractAddress)?.MINT_CONTRACT_ADDRESS!}
                                            projectId={project.projectId}
                                            projectTitle={project.name}
                                            artistAddress={project.artistAddress}
                                            scriptAspectRatio={project.aspectRatio}
                                            didEndPurchaseTransaction={()=>{refetch()}}
                                        />
                                    </JohnBox>                                    
                                ) : 
                                (
                                    <Connect/>
                                )
                        }
                    </Box>
                </Box>
                <Box>
                    <Box sx={{height: '100px'}}>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={14} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                    editions size
                                </Typography>
                                <Typography fontSize={14} fontWeight={800} sx={{backgroundColor: "black", paddingLeft:"6px"}}>
                                    { project.maxInvocations.toString() }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={14} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                mint price
                                </Typography>
                                <Typography fontSize={14} fontWeight={800} sx={{backgroundColor: "black", paddingLeft:"6px"}}>
                                    { `${project.pricePerTokenInWei.toString()}eth` }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={14} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                medium
                                </Typography>
                                <Typography fontSize={14} fontWeight={800} sx={{backgroundColor: "black", paddingLeft:"6px"}}>
                                    { `question mark` }
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Typography fontSize={14} fontWeight={800}>
                        { project.description}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1512 johnx.eth connected
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1507 johnx.eth minted
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1512 johnx.eth minted
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1421 johnx.eth connected
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1432 johnx.eth connected
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1512 johnx.eth connected
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1507 johnx.eth minted
                    </Typography>
                    <Typography fontSize={14} fontWeight={800}>
                    ? 1512 johnx.eth minted
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'grid', position: 'relative', gridGap: '1em', paddingBottom: '4em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                '@media screen and (max-width: 465px)': {
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }
            }}>
                <Box sx={{ position: 'relative', gridColumnStart: '1', gridColumnEnd: '3', display: 'inline-flex', flexDirection: 'column', gap: '1em' }}>
                    {
                        traitsdataArray && (
                            <ProjectMetadataRow isHeader={true} tokenData={traitsdataArray[0]} />
                        )
                    }
                    {
                        traitsdataArray && traitsdataArray?.map((tokenData:any, idx:number) => (
                            <ProjectMetadataRow key={idx} tokenData={tokenData} />
                        ))
                    }
                    {
                        width < 862 && (
                            <Box sx={{ position: 'sticky', width: '100%', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', gap: '1em', backgroundColor: 'black'}}>
                                <Box sx={{ position: 'relative', paddingTop:'2em', display: 'flex', width: '50%', gap: '2em', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ position: 'relative', height: '100%'}}>
                                        <JohnDotsLine />
                                        <Box sx={{display: 'flex', position: 'relative', justifyContent: 'space-between'}}>
                                            <Typography sx={{position: 'relative', backgroundColor: 'black', height: '100%' }}>item number</Typography>
                                            {
                                                selectedToken && (
                                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}> {selectedToken.tokenID} </Typography>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                    <Box sx={{width: `100%`, height: '100%'}}>
                                        {
                                            selectedToken && (
                                                <TokenImage contractAddress={project.contract.id} tokenId={selectedToken.tokenID} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                                            )
                                        }
                                    </Box>
                                    <Box sx={{ display: 'inline-flex', gap:'10px', padding: '10px 0px 8px', '@media screen and (max-width: 465px)': {flexDirection: 'column', alignItems: 'flex-start' } }}>
                                        <JohnBox onClick={() => window.location.href="www.google.com" }>
                                            fullscreen
                                        </JohnBox>
                                        <JohnBox onClick={ () =>
                                            window.open(`https://${isUsingTestnet() ? 'testnets.' : ''}opensea.io/assets/${isUsingTestnet() ? 'goerli' : 'ethereum'}/${selectedToken ? contractAddress?.toLowerCase() + '/' + selectedToken.tokenID : ''}`)
                                        }>
                                            opensea
                                        </JohnBox>
                                    </Box>
                                </Box>
                                <Box sx={{ paddingTop:'2em', position: 'relative', display: 'flex', flexDirection: 'column', width: '50%', height: '100%', gap: '3em', justifyContent: 'flex-start' }}>
                                    {
                                        selectedToken && selectedToken?.traits.map((trait:Trait, idx:number) => (
                                            <Box key={idx} sx={{ position: 'relative', display: 'flex', width: '100%', gap: '1em', justifyContent: 'space-between' }}>
                                                <JohnDotsLine />
                                                <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', paddingRight: "6px"}}>
                                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}> { trait.trait_type } </Typography>
                                                </Box>
                                                <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', paddingLeft: "6px"}}>
                                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ trait.value } </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        )
                    }
                </Box>
                {
                    width >= 862 && (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%'}}>
                            <Box sx={{ position: 'sticky', width: '100%', top: 0, display: 'inline-flex', flexDirection: 'column', gap: '1em', paddingTop: '5px'}}>
                                <Box  sx={{ position: 'relative', display: 'flex', width: '100%', gap: '1em', color: 'rgba(255,255,255,0.5)', justifyContent: 'space-between' }}>
                                    <JohnDotsLine />
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black', paddingRight:"6px" }}> item number </Typography>
                                    </Box>
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', color:'white', paddingLeft:"6px"}}>
                                        {
                                            selectedToken && (
                                                <Typography sx={{position: 'relative', backgroundColor: 'black' }}> {selectedToken.tokenID} </Typography>
                                            )
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{width: '100%', px: '0'}}>
                                    {
                                        selectedToken && (
                                            <TokenImage contractAddress={project.contract.id} tokenId={selectedToken.tokenID} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                                        )
                                    }
                                </Box>
                                <Box sx={{ display: 'inline-flex', gap:'10px', padding: '10px 0px 8px', '@media screen and (max-width: 465px)': {flexDirection: 'column', alignItems: 'flex-start' } }}>
                                    <JohnBox onClick={() => window.location.href="www.google.com" }>
                                        fullscreen
                                    </JohnBox>
                                    <JohnBox onClick={ () =>
                                        window.open(`https://${isUsingTestnet() ? 'testnets.' : ''}opensea.io/assets/${isUsingTestnet() ? 'goerli' : 'ethereum'}/${selectedToken ? contractAddress?.toLowerCase() + '/' + selectedToken.tokenID : ''}`)
                                    }>
                                        opensea
                                    </JohnBox>
                                </Box>
                                <Box sx={{paddingBottom:'14px',}}>
                                    {
                                        selectedToken && selectedToken?.traits.map((trait:Trait, idx:number) => (
                                            <Box key={idx} sx={{ position: 'relative', display: 'flex', width: '100%', gap: '1em', justifyContent: 'space-between' }}>
                                                <JohnDotsLine />
                                                <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', paddingRight: "6px"}}>
                                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}> { trait.trait_type } </Typography>
                                                </Box>
                                                <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', paddingLeft: "6px"}}>
                                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ trait.value } </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Box>
                    )
                }
            </Box>
            <Footer />
        </Box>
    )
}

export default ProjectDetails
