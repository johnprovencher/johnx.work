import useTheme from "@mui/material/styles/useTheme"
import { useState } from "react"
import {
    Box,
    Grid,
    Breadcrumbs,
    Divider,
    Typography,
    Button,
    Stack,
    FormControl,
    InputLabel,
    NativeSelect,
    Pagination,
    Alert,
    Link
} from "@mui/material"
import { TOKENS_PER_PAGE } from "config"
import { OrderDirection } from "utils/types"
import { parseScriptType, parseAspectRatio } from "utils/scriptJSON"
import ProjectDate from "components/ProjectDate"
import ProjectExplore from "components/ProjectExplore"
import TokenView from "components/TokenView"
import Tokens from "components/Tokens"
import Loading from "components/Loading"
import Collapsible from "components/Collapsible"
import useProject from "hooks/useProject"
import useWindowSize from "hooks/useWindowSize"
import { getContractConfigByAddress } from "utils/contractInfoHelper"
import EditProjectButton from "components/EditProjectButton"
import { useAccount } from "wagmi"
import MintingInterfaceFilter from "components/MintingInterfaceFilter"
import Footer from "./Footer"
import TokenImage from "./TokenImage"
import TokenLive from "./TokenLive"
import JohnDotsPercentage from "./Johnx/JohnDotsPercentage"
import JohnBox from "./Johnx/JohnBox"
import JohnDotsLine from "./Johnx/JohnDotsLine"

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
    const theme = useTheme()
    const windowSize = useWindowSize()
    const { address } = useAccount()
    const { loading, error, data } = useProject(`${contractAddress}-${id}`)
    const [currentPage, setCurrentPage] = useState(0)
    const [orderDirection, setOrderDirection] = useState(OrderDirection.ASC)
    const project = data?.project
    const token = project?.tokens[0]
    const width = windowSize.width > theme.breakpoints.values.md
        ? (Math.min(windowSize.width, 1200)-48)*0.666666
        : windowSize.width > theme.breakpoints.values.sm
            ? windowSize.width - 48
            : windowSize.width - 32
    const contractConfig = getContractConfigByAddress(contractAddress)
    const projectIsLive = false

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
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
                                editions size
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
                                    { project.maxInvocations.toString() }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
                                mint price
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
                                    { `${project.pricePerTokenInWei.toString()}eth` }
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{position: 'relative', color: "rgba(255,255,255,0.5)" }}> 
                            <JohnDotsLine />
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                                <Typography fontSize={16} fontWeight={800} sx={{pr:'6px', color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
                                medium
                                </Typography>
                                <Typography fontSize={16} fontWeight={800} sx={{color: "rgba(255,255,255,0.5)", backgroundColor: "black"}}>
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
            {/* <Grid spacing={2} container>
                {
                    token && (
                        <Grid item md={8}>
                            <TokenView
                                contractAddress={contractConfig?.CORE_CONTRACT_ADDRESS}
                                tokenId={token.tokenId}
                                width={width}
                                invocation={token.invocation}
                                aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
                                live
                            />
                        </Grid>
                    )
                }
                <Grid item md={4} xs={12} sm={12}>
                    <Box sx={{width: "100%", paddingLeft: [0, 0, 2]}}>
                        <ProjectDate startTime={project?.minterConfiguration?.startTime!}/>
                        <Typography variant="h1" mt={3}>
                            {project.name}
                        </Typography>
                        <Typography variant="h6" mb={2}>
                            {project.artistName}
                        </Typography>
                        <Divider sx={{display: ["none", "block", "none"], marginBottom: 2}}/>
                        {
                            contractConfig.EDIT_PROJECT_URL && address?.toLowerCase() === project.artistAddress &&
              (
                  <EditProjectButton
                      contractAddress={contractAddress}
                      projectId={project.projectId}
                      editProjectUrl={contractConfig?.EDIT_PROJECT_URL}
                  />
              )
                        }
                        <MintingInterfaceFilter
                            contractVersion={contractConfig?.CONTRACT_VERSION}
                            coreContractAddress={contractAddress}
                            mintContractAddress={contractConfig?.MINT_CONTRACT_ADDRESS}
                            projectId={project.projectId}
                            artistAddress={project.artistAddress}
                            scriptAspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid spacing={2} container mt={4} pb={4}>
                <Grid item md={7} sm={12} xs={12}>
                    <Typography variant="h6" mb={2}>
            About {project.name}
                    </Typography>
                    <ProjectExplore project={project}/>
                    <Box paddingRight={[0, 0, 4]}>
                        <Collapsible content={project.description}/>
                    </Box>
                    <Box sx={{display: "flex", marginTop: 4 }}>
                        <Box mr={6}>
                            <Typography>
                License
                            </Typography>
                            <Typography>
                                {project.license}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>
                Library
                            </Typography>
                            <Typography>
                                {parseScriptType(project.scriptJSON) || project.scriptTypeAndVersion}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <Box display="flex" mb={4}>
                        {
                            project.website && (
                                <Button
                                    sx={{textTransform: "none", marginRight: 4}}
                                    onClick={() => window.open(project.website)}
                                >
                  Artist link
                                </Button>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
            <Divider/>
            <Box px={1}>
                <Box mt={4} mb={4} sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4">{project.invocations} Item{Number(project.invocations) === 1 ? "" : "s"}</Typography>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    <Typography fontWeight={600}>Sort</Typography>
                                </InputLabel>
                                <NativeSelect
                                    value={orderDirection}
                                    sx={{fontSize: 14}}
                                    onChange={(e) => {
                                        setOrderDirection(e.target.value as OrderDirection)
                                    }}
                                >
                                    <option value={OrderDirection.DESC}>Latest</option>
                                    <option value={OrderDirection.ASC}>Earliest</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Tokens
                    contractAddress={contractAddress}
                    projectId={`${contractAddress.toLowerCase()}-${id}`}
                    first={TOKENS_PER_PAGE}
                    skip={currentPage*TOKENS_PER_PAGE}
                    orderDirection={orderDirection}
                    aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
                />
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Stack mt={6} mb={8} spacing={2}>
                        <Pagination
                            count={Math.ceil(project.invocations/TOKENS_PER_PAGE)}
                            color="primary"
                            page={currentPage + 1}
                            onChange={(event, page) => {
                                setCurrentPage(page - 1)
                            }}
                        />
                    </Stack>
                </Box>
            </Box> */}
            <Footer />
        </Box>
    )
}

export default ProjectDetails
