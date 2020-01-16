
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';

var ethUrlParser = require('eth-url-parser')

var QRCode = require('qrcode')




const ContractInterface = require('./contract-interface')

var invoiceData;
var payInvoiceInput;

var ethereumHelper;
var invoiceUUID;

var approveTokensInput;


export default class GetCryptoRenderer {



    init( ethHelper, params )
    {
      ethereumHelper = ethHelper;

      console.log('get crypto renderer')

    }

    update()
    {

    }

    async onWeb3Connected() //from eth helper callback
    {
      console.log(' on web3 !!')

      var self = this;



        /*this.initInvoiceDataTable()

        Vue.set(payInvoiceInput, 'web3connected', true)

        await this.loadInvoiceData( self )

        setInterval(function(){  self.loadInvoiceData(self)  }, 10000);
        */

    }


        async approveTokens( tokenAddress, contractAddress , amount  )
        {



          var web3 = ethereumHelper.getWeb3Instance();

          var env = ethereumHelper.getEnvironmentName()

          console.log('env ',env)

          var connectedAddress = ethereumHelper.getConnectedAccountAddress()

          // paySpecContract = ContractInterface.getPaySpecContract(web3,env)
          var tokenContract = ContractInterface.getTokenContract(web3,env, tokenAddress);

          //web3.eth.defaultAccount = web3.eth.accounts[0]
           //personal.unlockAccount(web3.eth.defaultAccount)


          // await web3.eth.enable();

          var response =  await new Promise(function (result,error) {
             tokenContract.approve.sendTransaction(contractAddress,amount, function(err,res){
                if(err){ return error(err)}

                result(res);
             })
           });


        }


}
