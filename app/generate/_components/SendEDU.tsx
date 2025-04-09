"use client"

import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { useEffect, useState } from "react"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import ModalTransactionCustom from "@/components/modal/modal-transaction-custom"
import { useEduBalance } from "@/hooks/query/useEduBalance"
import { Loader } from "lucide-react"

export default function SendEDU({ toAddress }: { toAddress: HexAddress }) {
  const [amount, setAmount] = useState("0.01")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { formatted, symbol } = useEduBalance()

  const {
    data: txHash,
    sendTransaction,
    isPending: isSending,
    status,
    error,
  } = useSendTransaction()

  const {
    isLoading: isWaiting,
    isSuccess: isSuccessReceipt,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  useEffect(() => {
    if (txHash && isSuccessReceipt) {
      setIsModalOpen(true)
    }
  }, [txHash, isSuccessReceipt])

  const handleSend = () => {
    sendTransaction({
      to: toAddress,
      value: parseEther(amount),
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const isDisabled =
    isSending || !toAddress || !amount || parseFloat(amount) < 0.01

  return (
    <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md space-y-4">
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
          Your balance
        </p>
        <p className="text-lg font-semibold">
          {parseFloat((formatted || "0").toString()).toFixed(4)} {symbol}
        </p>
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount to send"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-neutral-500">
          Minimum: 0.01 EDU. Recommended: 0.1 EDU.
        </p>
      </div>

      <Button
        onPress={handleSend}
        disabled={isDisabled}
        type="button"
        variant="solid"
        color="warning"
        className="w-full transition-colors"
      >
        {isSending || isWaiting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="animate-spin"/>
            Sending...
          </div>
        ) : (
          "Send EDU"
        )}
      </Button>

      <p className="text-sm text-neutral-300">Note: If you don&apos;t have any EDU Chain Testnet tokens, you can claim them from faucet <a href="https://educhain-community-faucet.vercel.app/" target="_blank" className="text-blue-500 hover:underline">Educhain Community Faucet</a> or <a href="https://www.hackquest.io/faucets/656476" target="_blank" className="text-blue-500 hover:underline">Hackquest Faucet</a>.</p>

      <ModalTransactionCustom
        isOpen={isModalOpen}
        setIsOpen={handleCloseModal}
        data={txHash || ""}
        name="transfer"
        status={status || ""}
        errorMessage={error?.message || undefined}
      />
    </div>
  )
}
