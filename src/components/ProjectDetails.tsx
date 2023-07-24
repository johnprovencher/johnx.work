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

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
    const { loading, error, data } = useProject(`${contractAddress}-${id}`)
    const project = data?.project
    const contractConfig = getContractConfigByAddress(contractAddress)
    const projectIsLive = false

    const { dataArray: traitsdataArray } = useTokenTraitsBatch(contractAddress, project.tokens)
    const [selectedToken, setSelectedToken] = useState<null| any>(null)

    useEffect(() => {
        if (traitsdataArray !== null && traitsdataArray !== undefined) { 
            console.log('traitsdataArrayy: ' + traitsdataArray)
            let firstToken = traitsdataArray[0].data as any

            if (firstToken !== null && firstToken !== undefined) {
                setSelectedToken(firstToken)
            }
        }
    }, [traitsdataArray])

    interface RowProps {
        isHeader?: boolean,
        tokenData?: any
    }

    const ProjectMetadataRow = ({isHeader=false, tokenData}: RowProps) => (
        <Box sx={{ display: 'flex', width: '100%', gap: '2em', color: `${isHeader ? 'rgba(255,255,255,0.5)' : ''}`}} onMouseOver={() => { if(tokenData) { setSelectedToken(tokenData) } }} >
            <Box sx={{position: 'relative', textAlign: 'center', width: '50px'}}>
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
                    <Box sx={{ display: 'grid', flex: 1, gap: '2em', gridTemplateColumns: `repeat(${tokenData.traits.length}, 1fr)` }}>
                        {
                            tokenData.traits.map((trait:any, idx:number) => (
                                <Box key={idx} sx={{position: 'relative'}}>
                                    <JohnDotsLine />
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
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
        <Box sx={{px: '24px', maxWidth:'1400px'}}>
            <Box sx={{width:'52%', margin:'auto', paddingBottom: '4em'}}>
                {
                    project.tokens && (
                        projectIsLive ?
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
                    <Box sx={{display: 'flex', gap: '4px', justifyContent: 'space-between'}}> 
                        <Box sx={{display: 'inline-flex', gap: '4px'}}> 
                            <Typography fontSize={16} fontWeight={800} pr={'1ch'} sx={{backgroundColor: 'black'}}>
                                <span>{project.invocations.toString()}/{project.maxInvocations.toString()}</span>
                            </Typography> 
                            <JohnDotsPercentage percentage={Number(project.invocations)/Number(project.maxInvocations)} />
                        </Box>
                        <JohnBox>
                            { `mint ${project.pricePerTokenInWei} eth`}  
                        </JohnBox>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{height: '100px'}}>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                editions size
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{backgroundColor: "black"}}>
                                    { project.maxInvocations.toString() }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                mint price
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{backgroundColor: "black"}}>
                                    { `${project.pricePerTokenInWei.toString()}eth` }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', backgroundColor: "black"}}>
                                medium
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{backgroundColor: "black"}}>
                                    { `question mark` }
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Typography fontSize={16} fontWeight={800}>
                        { project.description}
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1512 johnx.eth connected
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1507 johnx.eth minted
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1512 johnx.eth minted
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1421 johnx.eth connected
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1432 johnx.eth connected
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1512 johnx.eth connected
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1507 johnx.eth minted
                    </Typography>
                    <Typography fontSize={16} fontWeight={800}>
                    ? 1512 johnx.eth minted
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'grid', position: 'relative', gridGap: '2em', paddingBottom: '4em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                '@media screen and (max-width: 465px)': {
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }
            }}>
                <Box sx={{ gridColumnStart: '1', gridColumnEnd: '3', display: 'inline-flex', flexDirection: 'column', gap: '1em' }}>
                    {
                        traitsdataArray && (
                            <ProjectMetadataRow isHeader={true} tokenData={traitsdataArray[0].data} />
                        )
                    }
                    {
                        traitsdataArray?.map((tokenData:any, idx:number) => (
                            <ProjectMetadataRow key={idx} tokenData={tokenData.data} />
                        ))
                    }
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap: '1em'}}>
                    <Box  sx={{ position: 'relative', display: 'flex', width: '100%', gap: '2em', color: 'rgba(255,255,255,0.5)', justifyContent: 'space-between' }}>
                        <JohnDotsLine />
                        <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                            <Typography sx={{position: 'relative', backgroundColor: 'black' }}> item number </Typography>
                        </Box>
                        <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black', color:'white'}}>
                            {
                                selectedToken && selectedToken !== undefined && (
                                    <Typography sx={{position: 'relative', backgroundColor: 'black' }}> {selectedToken.tokenID} </Typography>
                                )
                            }
                        </Box>
                    </Box>
                    <Box sx={{width: '100%', px: '2em'}}>
                        {
                            selectedToken && selectedToken !== undefined && (
                                <TokenImage contractAddress={project.contract.id} tokenId={selectedToken.tokenID} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                            )
                        }
                    </Box>
                    <Box>
                        {
                            selectedToken && selectedToken.traits && selectedToken.traits.map((trait:Trait, idx:number) => (
                                <Box key={idx} sx={{ position: 'relative', display: 'flex', width: '100%', gap: '2em', justifyContent: 'space-between' }}>
                                    <JohnDotsLine />
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}> { trait.trait_type } </Typography>
                                    </Box>
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ trait.value } </Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ display: 'inline-flex', gap:'8px', '@media screen and (max-width: 465px)': {flexDirection: 'column', alignItems: 'flex-start' } }}>
                        <JohnBox onClick={() => window.location.href="www.google.com" }>
                            live view
                        </JohnBox>
                        <JohnBox onClick={ () =>
                            window.open(`https://${isUsingTestnet() ? 'testnets.' : ''}opensea.io/assets/${isUsingTestnet() ? 'goerli' : 'ethereum'}/${ (selectedToken && selectedToken !== undefined) ? contractAddress?.toLowerCase() + '/' + selectedToken.tokenID : ''}`)
                        }>
                            opensea
                        </JohnBox>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default ProjectDetails
