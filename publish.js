const { assert } = require('chai')
const { SHA256 } = require('crypto-js')
const {
      AmountsOutMaxFee,
      approve,
      Aquarius,
      balance,
      Config,
      Datatoken,
      Dispenser,
      DispenserCreationParams,
      downloadFile,
      Erc20CreateParams,
      Files,
      FixedRateExchange,
      FreCreationParams,
      getHash,
      Nft,
      NftCreateData,
      NftFactory,
      Pool,
      PoolCreationParams,
      ProviderFees,
      ProviderInstance,
      TokenInOutMarket,
      transfer,
      ZERO_ADDRESS
} = require('@oceanprotocol/lib')

const Web3 = require('web3')
const fs = require('fs')
const homedir = require('os')

async function publish() {
    // 0. SETUP
    let config
    let aquarius
    let providerUrl
    let publisherAccount
    let consumerAccount
    let stakerAccount
    let addresses
    let poolNftAddress
    let poolDatatokenAddress
    let poolAddress
    let freNftAddress
    let freDatatokenAddress
    let freAddress
    let freId
    let dispenserNftAddress
    let dispenserDatatokenAddress
    let dispenserAddress

    const POOL_NFT_NAME = 'Datatoken 1'
    const POOL_NFT_SYMBOL = 'DT1'
    const FRE_NFT_NAME = 'Datatoken 2'
    const FRE_NFT_SYMBOL = 'DT2'
    const DISP_NFT_NAME = 'Datatoken 3'
    const DISP_NFT_SYMBOL = 'DT3'

    const ASSET_URL = {
        datatokenAddress: '0x0',
        nftAddress: '0x0',
        files: [
        {
            type: 'url',
            url: 'https://raw.githubusercontent.com/oceanprotocol/testdatasets/main/shs_dataset_test.txt',
            method: 'GET'
        }
        ]
    }

    const DDO = {
        '@context': ['https://w3id.org/did/v1'],
        id: '',
        version: '4.1.0',
        chainId: 4,
        nftAddress: '0x0',
        metadata: {
        created: '2021-12-20T14:35:20Z',
        updated: '2021-12-20T14:35:20Z',
        type: 'dataset',
        name: 'dataset-name',
        description: 'Ocean protocol test dataset description',
        author: 'oceanprotocol-team',
        license: 'MIT'
        },
        services: [
        {
            id: 'testFakeId',
            type: 'access',
            files: '',
            datatokenAddress: '0x0',
            serviceEndpoint: 'https://v4.provider.rinkeby.oceanprotocol.com',
            timeout: 0
        }
        ]
    }

    config = {
    'network': 'rinkeby',
    'nodeUri': 'https://rinkeby.infura.io/v3',
    'BLOCK_CONFIRMATIONS': 0,
    'metadataCacheUri' : 'https://v4.aquarius.oceanprotocol.com',
    'providerUri' : 'https://v4.provider.rinkeby.oceanprotocol.com',
    'downloads.path': 'consume-downloads',
    }
    aquarius = new Aquarius(config.metadataCacheUri)
    providerUrl = config.providerUri

    console.log(`Aquarius URL: ${config.metadataCacheUri}`)
    console.log(`Provider URL: ${providerUrl}`)

    // 1. ACCOUNTS & CONTRACTS
    const web3 = new Web3(process.env.NODE_URI || 'http://127.0.0.1:8545') // to configure for rinkeby, see https://github.com/oceanprotocol/ocean.js/blob/efa3839d10befdbc35e16e61c8e9bf310039970b/src/utils/ConfigHelper.ts
    // console.log(web3)
    // const accounts = await web3.eth.getAccounts()
    // publisherAccount = accounts[0]
    // publisherAccount = web3.eth.accounts.create()
    publisherAccount = web3.eth.accounts.privateKeyToAccount('0xef4b441145c1d0f3b4bc6d61d29f5c6e502359481152f869247c7a4244d45209')
    // consumerAccount = accounts[1]
    // stakerAccount = accounts[2]

    console.log(`Publisher account address: ${publisherAccount.address}`)
    // console.log(`Consumer account address: ${consumerAccount}`)
    // console.log(`Staker account address: ${stakerAccount}`)
    
    const getAddresses = () => {
        const data = JSON.parse(
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          fs.readFileSync(
            process.env.ADDRESS_FILE ||
              `${homedir}/.ocean/ocean-contracts/artifacts/address.json`,
            'utf8'
          )
        )
        return data.development
    }
    addresses = getAddresses()

    // 2. PUBLISH DATA NFT & DATATOKEN WITH FIXED RATE EXCHANGE
    const factory = new NftFactory(addresses.ERC721Factory, web3)

    const nftParams = {
        name: FRE_NFT_NAME,
        symbol: FRE_NFT_SYMBOL,
        templateIndex: 1,
        tokenURI: '',
        transferable: true,
        owner: publisherAccount.address
    }
  
    const erc20Params = {
        templateIndex: 1,
        cap: '100000',
        feeAmount: '0',
        paymentCollector: ZERO_ADDRESS,
        feeToken: ZERO_ADDRESS,
        minter: publisherAccount.address,
        mpFeeAddress: ZERO_ADDRESS
    }

    const freParams = {
        fixedRateAddress: addresses.FixedPrice,
        baseTokenAddress: addresses.Ocean,
        owner: publisherAccount.address,
        marketFeeCollector: publisherAccount.address,
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1',
        marketFee: '0.001',
        allowedConsumer: ZERO_ADDRESS,
        withMint: false
    }

    console.log("GOT HERE")
    const tx = await factory.createNftErc20WithFixedRate(
        publisherAccount.address,
        nftParams,
        erc20Params,
        freParams
    )
    
  
    // freNftAddress = tx.events.NFTCreated.returnValues[0]
    // freDatatokenAddress = tx.events.TokenCreated.returnValues[0]
    // freAddress = tx.events.NewFixedRate.returnValues.exchangeContract
    // freId = tx.events.NewFixedRate.returnValues.exchangeId
    // console.log('got here')
      
}

publish()