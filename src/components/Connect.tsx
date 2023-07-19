import { ConnectButton } from "@rainbow-me/rainbowkit"
import JohnBox from "./Johnx/JohnBox"

const Connect = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
                authenticationStatus === 'authenticated');

                return (
                    <>
                        {(() => {
                            if (!connected) {
                                return (
                                    <JohnBox onClick={openConnectModal}>
                        connect
                                    </JohnBox>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <JohnBox onClick={openChainModal}>
                        Wrong network
                                    </JohnBox>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <JohnBox isContainer={true} onClick={openChainModal} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    background: chain.iconBackground,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        width="22px"
                                                        height="22px"
                                                        src={chain.iconUrl}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </JohnBox>

                                    <JohnBox onClick={openAccountModal} >
                                        {account.displayName}
                                        {/* {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''} */}
                                    </JohnBox>
                                </div>
                            );
                        })()}
                    </>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default Connect
