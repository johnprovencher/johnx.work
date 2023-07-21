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
import { Token } from "utils/types"
import useTokenTraits from "hooks/useTokenTraits"
import { Trait } from "utils/types"
import { idText } from "typescript"
import { useEffect, useState } from "react"

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
    const { loading, error, data } = useProject(`${contractAddress}-${id}`)
    const project = data?.project
    const firstToken = project?.tokens[0]
    const contractConfig = getContractConfigByAddress(contractAddress)
    const projectIsLive = false
    const [selectedToken, setSelectedToken] = useState(firstToken)
    const [selectedTokenTraits, setselectedTokenTraits] = useState(null)

    interface RowProps {
        isHeader?: boolean,
        token?: Token
    }

    const ProjectMetadataRow = ({isHeader=false, token}: RowProps) => (
        <Box sx={{ display: 'flex', width: '100%', gap: '2em', color: `${isHeader ? 'rgba(255,255,255,0.5)' : ''}`}} onMouseOver={() => { if(token) { setSelectedToken(token) } }} >
            <Box sx={{position: 'relative', textAlign: 'center', width: '50px'}}>
                {
                    isHeader ? 
                        (
                            <Typography sx={{position: 'relative', backgroundColor: 'black'}}>img</Typography>
                        )
                        :
                        (
                            <TokenImage contractAddress={project.contract.id} tokenId={token!.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                        )
                }
            </Box>
            <Box sx={{ display: 'grid', flex: 1, gap: '2em', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? 'metadata1' : 'cell' } </Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? 'metadata2' : 'cell' }</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? 'metadata3' : 'cell' }</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? 'metadata4' : 'cell' }</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>{ isHeader ? 'metadata5' : 'cell' }</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    const { loading: traitLoading, error: traitError, data: traitdata } = useTokenTraits(contractAddress, selectedToken.tokenId)
    const traits = traitdata?.traits

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
                    projectIsLive ?
                        (
                            <TokenLive contractAddress={contractAddress} tokenId={firstToken.tokenId} width={300} height={300} />
                        ) :
                        (
                            <TokenImage contractAddress={project.contract.id} tokenId={firstToken.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
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
                    <ProjectMetadataRow isHeader={true} />
                    {
                        project.tokens?.map((token:Token, idx:number) => (
                            <ProjectMetadataRow key={idx} token={token} />
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
                            <Typography sx={{position: 'relative', backgroundColor: 'black' }}> {selectedToken.tokenId} </Typography>
                        </Box>
                    </Box>
                    <Box sx={{width: '100%', px: '2em'}}>
                        <TokenImage contractAddress={project.contract.id} tokenId={selectedToken.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                    </Box>
                    <Box>
                        {
                            traits?.map((trait:Trait, idx:number) => (
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
                        <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
                            live view
                        </JohnBox>
                        <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
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
