import {initWeb3, nweContract} from './initWeb3'

import ERC20_ABI from './ABI/ERC20'
import {ZERO_ADDRESS} from './config'

export function ERC20(address) {
    const erc20 = nweContract( address, ERC20_ABI )
    erc20.getBalance = user => {
        if ( address === ZERO_ADDRESS ) {
            const web3 = initWeb3()
            return web3.eth.getBalance(user)
          } else {
            return erc20.methods.balanceOf(user).call()
          }
    }
    return erc20
}