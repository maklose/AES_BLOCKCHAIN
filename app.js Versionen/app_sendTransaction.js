// using the callback

var s = 1

var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    //console.log(receipt);
    //res.json(receipt);
  }
}

web3.eth.sendTransaction({
 from:  '0x20af583E820cC68235D03e00d42b548721bF2Db8',
 to:    '0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A',
 value: web3.utils.toWei(s.toString(), "ether")
}, handleReceipt);