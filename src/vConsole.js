/*
 * @Author: sam
 * @Date: 2021-06-21 12:27:51
 * @LastEditTime: 2021-07-29 08:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/vconsole.js
 */

function main() {
    const scriptElem = document.createElement('script');
    scriptElem.src = "https://cdn.bootcss.com/vConsole/3.2.2/vconsole.min.js";
    document.body.appendChild(scriptElem);
    var onLoadSuccess = () => {
        const vConsole = new window.VConsole();
    }
    if (document.all) { //IE
        scriptElem.onreadystatechange = function () {
            if (scriptElem.readyState == 'loaded' || scriptElem.readyState == 'complete') {
                onLoadSuccess();
            }
        }
    } else {
        scriptElem.onload = function () {
            onLoadSuccess();
      }
    }
}

main()
