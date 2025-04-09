import { educhainTestnet } from '@/lib/wagmi'
import { useBalance } from 'wagmi'

export function useEduBalanceAI({
  address = undefined
}: {
  address?: HexAddress
} = {}) {
  const {
    data: balance,
    isLoading,
    isError,
    refetch,
  } = useBalance({
    address,
    chainId: educhainTestnet.id,
    query: {
      enabled: !!address,
    }
  })

  return {
    balance,
    formatted: balance?.formatted,
    symbol: balance?.symbol,
    isLoading,
    isError,
    refetch,
  }
}
