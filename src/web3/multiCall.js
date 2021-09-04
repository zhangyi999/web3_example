import {initWeb3, nweContract} from './initWeb3'

import MULTI_CALL from './ABI/MULTI_CALL'
import {multiCallAddress} from './config'

function MultiCallContract() {
    const web3 = initWeb3()
    const chainId = web3.currentProvider.chainId
    const address = multiCallAddress[chainId*1]
    if ( !address ) throw `chainId ${chainId} multi_call address not configured`
    return nweContract( address, MULTI_CALL )
}

export async function multiCallArr(methodsArr) {
    const multiCallContract = MultiCallContract( )
    const calls = []
    const decodeParametersType = []
    methodsArr.map(v => {
        calls.push([
            v._parent._address,
            v.encodeABI()
        ])
        decodeParametersType.push(
            v._method.outputs.map(v => v.type)
        )
    })
    // console.log({decodeParametersType})
    const res = await multiCallContract.methods.aggregate(calls).call()
    const web3 = initWeb3()
    return res[1].map((hex,i) => {
        const types = decodeParametersType[i]
        const oneType = types.length === 1
        return web3.eth.abi[oneType? 'decodeParameter':'decodeParameters'](oneType?types[0]:types, hex)
    })
}

// 解析组合
const isMethods = methods => methods instanceof Object && methods.encodeABI && methods._parent._address 
export async function multiCalls(methodsObj) {
    // 存放 encodeABI
    let calls = []
    // 存放 callsIndex
    const callsIndex = methodsObj instanceof Array?[]:{}
    // 
    function proxy(obj, key, call) {
        Object.defineProperty(obj, key, {
            get: () => call(),
            enumerable : true,
            configurable : false
        })
    }

    
    function analyze(methods, parentObj, key) {
        if ( isMethods(methods) ) {
            const index = calls.length
            calls.push(methods)
            proxy(parentObj, key, () => calls[index])
        }
        else if ( methods instanceof Object ) {
            parentObj[key] = methods instanceof Array?[]:{}
            for(let index in methods) {
                analyze(methods[index], parentObj[key], index)
            }
        }
        else {
            parentObj[key] = methods
        }
    }

    for(let key in methodsObj) {
        analyze(methodsObj[key], callsIndex, key)
    }
    calls = await multiCallArr(calls)

    return callsIndex
}