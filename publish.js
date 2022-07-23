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