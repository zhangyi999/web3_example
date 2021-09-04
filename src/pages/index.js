import {memo} from 'react'

import {BN, useWeb3} from '../web3'

function Index({children}) {
    const {getBlockNumber ,account, connected, unlock,connect, connectWalletConnect, chainId} = useWeb3()
    console.log(connected)
    return (
        <div>
            {
                unlock?
                <div>
                    index {account} {chainId}
                    <p>{getBlockNumber()}</p>
                </div>:
                <div>
                    <div onClick={connect}>
                        connect metamask
                    </div>
                    <div onClick={connectWalletConnect}>
                        connect wallet connect
                    </div>
                </div>
            }
            

            
        </div>
    )
}

export default memo(Index)