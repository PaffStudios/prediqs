'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { createClient } from '@/utils/supabase/client'

interface ConnectWalletPopupProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnect: (address: string, user: any) => void
}

const supabase = createClient()

export function ConnectWalletPopup({ isOpen, onClose, onConnect }: ConnectWalletPopupProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      if (window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new ethers.BrowserProvider((window as any).ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()

        // Sign a message to prove ownership of the address
        const message = `Authenticate with Prediqs: ${new Date().toISOString()}`
        const signature = await signer.signMessage(message)

        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithOtp({
          email: `${address}@prediqs.eth`, // Use a placeholder email
          options: {
            data: {
              wallet_address: address,
              signature: signature,
              signed_message: message,
            }
          }
        })

        if (error) throw error

        // If successful, call onConnect with the address and user data
        onConnect(address, data.user)
        onClose()
      } else {
        throw new Error('Please install MetaMask or another Web3 wallet')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogClose />
        </DialogHeader>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <Button onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <p className="text-sm text-muted-foreground">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

