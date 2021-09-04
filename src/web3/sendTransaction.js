
import {initWeb3} from './initWeb3'

export function SendOn(methods, options = {}) {
    const web3 = initWeb3()
    const from = web3.currentProvider.selectedAddress || web3.currentProvider.accounts[0]
    const owner = {
        from,
        ...options
    }
    const pro = methods.send(owner)
    const getHash = () => new Promise( (r,j) => {
    pro.on('transactionHash', function(hash){
        r({
            status: 1,
            data: hash
        })
    })
    pro.on('error',function(err) {
        r({
            status: 0,
            data: err
        })
    })
    })

    const confirmation = () => new Promise( (r,j) => {
    pro.on('confirmation', function(confirmationNumber, receipt){
        if ( confirmationNumber > 1 ) {
        r({
            status: 1,
            data: receipt
        })
        }
    })
    pro.on('error', function(error, receipt){
        // console.log({error})
        if ( error ) {
        r({
            status: 0,
            data: error
        })
        return
        }
        if ( receipt ) {
        r({
            status: 1,
            data: receipt
        })
        return
        }
    })
    })

    return {
    getHash,
    confirmation,
    send: pro
    }
}
