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
