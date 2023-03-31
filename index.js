const Web3 = require('web3');
//const web3 = new Web3();
window.userAddress = null;
  window.onload = async()=>{
      if (window.ethereum){
        window.web3 = new Web3(window.ethereum);
      }else{
        alert("No ETH browser extension detected.");
      }
  window.userAddress = window.localStorage.getItem("userAddress");

    showAddress() 
}

  function showAddress(){
    if(!window.userAddress){
        document.getElementById('userAddress').innerHTML = " "
        document.getElementById('logoutButton').classList.add('hidden');
        return false;
  }
    document.getElementById('userAddress').innerHTML = `ETH Address: ${window.userAddress}`
    document.getElementById('logoutButton').classList.remove('hidden');
  }

    function logout(){
      window.userAddress = null;
      window.localStorage.removeItem("userAddress");
      showAddress()
    }

   async function loginWithEth(){
      if(window.ethereum){
        try{
            const selectedAccount = await window.ethereum.request({method:"eth_requestAccounts"})
            .then((accounts)=>accounts[0]).catch(()=>{ 
            throw Error("No account selected!")
            });
            window.userAddress = selectedAccount;
            window.localStorage.setItem('userAddress',selectedAccount)
            showAddress();
        }catch(error){
             console.error(error)
            }
      }else{
         alert ('No ETH browser extension installed');
         }
       }

  const contractAddress = "0x24Da3BF9eB82f8E116932dBE1e7E4751252683Ac";
  const ABI =
            [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "setter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "number",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contract = new web3.eth.contract(ABI,contractAddress);

 async function getNumber(){
  const get = await window.contract.methods.getter().call;
  console.log(get)
}


  const setNum= async ()=> {
      const set = await contract.methods.setter(input).send({from:accounts})
      document.getElementById('Num').innerHTML = set;  
    }


    