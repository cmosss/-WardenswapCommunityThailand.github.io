window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
    }
})
if (typeof window.ethereum == 'undefined') {
    alert('MetaMask is not installed!');
  }  
const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    const account = await ethereum.request({ method: 'eth_requestAccounts' });
    address =account;
    contractAddress="0x0feadcc3824e7f3c12f40e324a60c23ca51627fc";
    contractABI = human_standard_token_abi
    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))
    try {
        adjustedBalance = await balance / Math.pow(10, await decimals)
        document.getElementById("output2").innerHTML ="Your Hold Token :"
        document.getElementById("output2").innerHTML += adjustedBalance;
        document.getElementById("output2").innerHTML += " WAD";
        if(adjustedBalance>=100.0)
        {
           window.location.replace("https://discord.com/invite/nEQDc3jPUF");
        }
        else
        {
            alert("Should You HODL100 wad token for join discord");
        }
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}
