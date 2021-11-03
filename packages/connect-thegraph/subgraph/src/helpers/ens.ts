import { Address, Bytes, log } from '@graphprotocol/graph-ts'

import { ENS } from '../../generated/templates/Kernel/ENS'
import { PublicResolver } from '../../generated/templates/Kernel/PublicResolver'
import { ZERO_ADDR } from './constants'

const ENS_ADDRESS = '0x843ddfab8406e752d03fa75dbb275070f368658d'

const OLD_ENS_ADDRESS = '0x843ddfab8406e752d03fa75dbb275070f368658d'

export function resolveRepo(appId: Bytes): Address {
  let ens = ENS.bind(Address.fromString(ENS_ADDRESS))

  let callEnsResult = ens.try_resolver(appId)
  if (callEnsResult.reverted) {
    ens = ENS.bind(Address.fromString(OLD_ENS_ADDRESS))
    callEnsResult = ens.try_resolver(appId)
  }

  if (callEnsResult.reverted) {
    log.info('ens resolver reverted', [])
  } else {
    const resolver = PublicResolver.bind(callEnsResult.value)
    const callResolverResult = resolver.try_addr(appId)
    if (callResolverResult.reverted) {
      log.info('resolver addr reverted', [])
    } else {
      return callResolverResult.value
    }
  }

  return Address.fromString(ZERO_ADDR)
}
