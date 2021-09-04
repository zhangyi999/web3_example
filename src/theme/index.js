/*
 * @Author: sam
 * @Date: 2021-06-23 16:27:03
 * @LastEditTime: 2021-07-19 20:21:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/theme/index.js
 */

export const inPc = (() => {
    var sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
        return false
    } else {
        return true
    }
})();

function linearGradient( deg ,start, stop ) {
    return `linear-gradient(${deg}deg,  ${start}, ${stop}) !important`
}

function shadow(color) {
    return `0px 0px .4rem ${color}`
}

const op = 0.1

const theme = {
    body: linearGradient( 0,  '#33304B', /*'#3A4067'*/ '#33314e' ),
    footerHeight: '5.2rem',
    hui: '#f5f5f5',
    ispc: inPc,
    tableBackground: '#f2f2f2',
    // 越来越亮
    color: [
        '#fdb756',
        '#63110c',
        '#4d4d4d',
        '#fff',
        '#C1053F'
    ],
    borderRadius: '30px',
    active: '#fdb756',
    input: {
        background:"#2b2a42",
        color: '#FAFFFE'
    },
    card: '#3A4067',//'#394266',
    button: [
        {
            backgroundColor: '#fdb756 !important;' ,//linearGradient( 90,  '#75CBF9', '#9B88F4' ),
            // boxShadow: shadow(`rgba(155,136,244, ${op})`),
            color: '#FAFFFE !important'
        },
        {
            backgroundColor: 'rgba(242 ,242 ,242,.5) !important;' ,//linearGradient( 90,  '#75CBF9', '#9B88F4' ),
            // boxShadow: shadow(`rgba(155,136,244, ${op})`),
            color: '#4d4d4d !important'
        },
        {
            backgroundColor: '#fff !important;',
            boxShadow: shadow(`rgba(0, 0, 0, ${op})`),
            color: '#4d4d4d'
        },
        {
            backgroundColor: 'rgba(242 ,242 ,242,.5) !important;' ,//linearGradient( 90,  '#75CBF9', '#9B88F4' ),
            // boxShadow: shadow(`rgba(155,136,244, ${op})`),
            color: '#fdb756 !important'
        },
        {
            background: linearGradient( 90,  '#FAB18D', '#F6659C' ),
            // boxShadow: shadow(`rgba(246,101,156,${op})`),
            color: '#FAFFFE'
        },
        {
            background: linearGradient( 90,  '#a69eea', '#7579f9' ),
            // boxShadow: shadow(`rgba(212,212,212,${op})`),
            color: '#FAFFFE'
        },
        {
            background: linearGradient( 90,  '#9eeaab', '#f9c475' ),
            // boxShadow: shadow(`rgba(212,212,212,${op})`),
            color: '#FAFFFE'
        },
        {
            background: linearGradient( 90,  '#29345a', 'rgb(30 30 56)' ),
            // boxShadow: shadow(`rgba(212,212,212,${op})`),
            color: '#FAFFFE'
        },
        {
            background: linearGradient( 90,  '#f2f2f2', 'rgba(212,212,212)' ),
            // boxShadow: shadow(`rgba(212,212,212,${op})`),
            color: '#3A4067'
        },
        {
            background: linearGradient( 90,  '#f2f2f2', 'rgba(212,212,212)' ),
            // boxShadow: shadow(`rgba(212,212,212,${op})`),
            color: '#3A4067'
        }
    ],
    boxShadow: '0 8px 30px 0 rgba(0,0,0,.2);'
}

export default theme