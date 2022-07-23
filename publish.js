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

console.log(ZERO_ADDRESS)

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
