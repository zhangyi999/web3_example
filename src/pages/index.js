import { useState } from 'react'
import {memo, useEffect} from 'react'

import {
    BN,
    useWeb3,
    ERC20,
    multiCalls,
    SendOn
} from '../web3'

function Index({children}) {
    const {getBlockNumber ,account, connected, unlock,connect, connectWalletConnect, chainId} = useWeb3()
    const [balance, setBalance] = useState(0)

    const send = async () => {
        const erc20 = ERC20('0x003ec15e278d92cb7b95e457a078c9eea0b72319')
        const {confirmation} = SendOn(
            erc20.methods.transfer('0xA4BE0c823E1026AF948F9E278377381158e54Dc9', 0)
        )
        const {status} = await confirmation()
        console.log({
            status
        })
    }

    useEffect(() => {
        console.log({account, connected})
        const initData = async () => {
            const erc20 = ERC20('0x003ec15e278d92cb7b95e457a078c9eea0b72319')
            // const balanceOf = erc20.methods.balanceOf(account)
            // cpmst 
            const res = await multiCalls({
                k: '1',
                n: erc20.methods.balanceOf(account),
                l: [
                    erc20.methods.balanceOf(account),
                    1,
                    {
                        a: erc20.methods.balanceOf(account)
                    }
                ]
            })
            // console.log({
            //     res
            // })
            setBalance(res.n)
        }
        if ( connected ) initData()
    }, [account, connected])
    return (
        <div>
            {
                unlock?
                <div>
                    index {account} {chainId} {balance}
                    <p>{getBlockNumber()}</p>
                    <div onClick={send}>send</div>
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