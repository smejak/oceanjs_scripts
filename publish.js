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
