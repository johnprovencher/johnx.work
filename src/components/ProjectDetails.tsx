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

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
    const { loading, error, data } = useProject(`${contractAddress}-${id}`)
    const project = data?.project
    const token = project?.tokens[0]
    const contractConfig = getContractConfigByAddress(contractAddress)
    const projectIsLive = false

    const ProjectMetadataHeader = () => (
        <Box sx={{ display: 'flex', width: '100%', gap: '2em', color: "rgba(255,255,255,0.5)" }}>
            <Box sx={{position: 'relative', textAlign: 'center', width: '50px'}}>
                <Typography sx={{position: 'relative', backgroundColor: 'black'}}>img</Typography>
            </Box>
            <Box sx={{ display: 'grid', flex: 1, gap: '2em', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>metadata 1</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>metadata 2</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>metadata 3</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>metadata 4</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>metadata 5</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    const ProjectMetadataRow = () => (
        <Box sx={{ display: 'flex', width: '100%', gap: '2em' }}>
            <Box sx={{width: '50px'}}>
                <TokenImage contractAddress={project.contract.id} tokenId={token.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
            </Box>
            <Box sx={{ display: 'grid', flex: 1, gap: '2em', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>cell</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>cell</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>cell</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>cell</Typography>
                    </Box>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <JohnDotsLine />
                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>cell</Typography>
                    </Box>
                </Box>
            </Box>
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

    console.log('project tokens: ' + project.tokens)
    console.log('project tokens: ' + project.tokens.length)
    console.log('project token 1: ' + (project.tokens[0] as Token).tokenId)


    return project && contractConfig && (
        <Box sx={{px: '24px', maxWidth:'1400px'}}>
            <Box sx={{width:'52%', margin:'auto', paddingBottom: '4em'}}>
                {
                    projectIsLive ?
                        (
                            <TokenLive contractAddress={contractAddress} tokenId={token.tokenId} width={300} height={300} />
                        ) :
                        (
                            <TokenImage contractAddress={project.contract.id} tokenId={token.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
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
                    <ProjectMetadataHeader />
                    {
                        Array.from({ length: Number(project.invocations) }).map((_, i) => (
                            <ProjectMetadataRow key={i} />
                        ))
                    }
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap: '1em'}}>
                    <Box sx={{ position: 'relative', display: 'flex', width: '100%', gap: '2em', color: "rgba(255,255,255,0.5)" }}>
                        <JohnDotsLine />
                        <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                            <Typography sx={{position: 'relative', backgroundColor: 'black' }}>item number</Typography>
                        </Box>
                    </Box>
                    <Box sx={{width: '100%', px: '2em'}}>
                        <TokenImage contractAddress={project.contract.id} tokenId={token.tokenId} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)} />
                    </Box>
                    <Box>
                        {
                            Array.from({ length: 4 }).map((_, i) => (
                                <Box key={i} sx={{ position: 'relative', display: 'flex', width: '100%', gap: '2em', justifyContent: 'space-between' }}>
                                    <JohnDotsLine />
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>item number</Typography>
                                    </Box>
                                    <Box sx={{display: 'inline-flex', position: 'relative', backgroundColor:'black'}}>
                                        <Typography sx={{position: 'relative', backgroundColor: 'black' }}>12</Typography>
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
