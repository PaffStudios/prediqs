/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ConnectWalletPopup } from "@/components/web3/connect-wallet-popup";
import { useState } from "react";
import { Button } from "../ui/button";



export default function WalletComponent() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [user, setUser] = useState<any | null>(null)

    const handleConnect = (address: string, userData: any) => {
        setWalletAddress(address)
        setUser(userData)
    }

    const handleDisconnect = () => {
        setWalletAddress(null)
        setUser(null)
        // You may want to add Supabase signOut here
    }

    return (
        <div>

            <Button className="bg-gradient-to-r from-[#34028A] to-[#6624FF] text-white" onClick={() => setIsPopupOpen(true)}>Connect Wallet</Button>
            {walletAddress && (
                <div>
                    <p className="mb-4">Connected Wallet: {walletAddress}</p>
                    <p className="mb-4">User ID: {user?.id}</p>
                    <Button className="bg-gradient-to-r from-[#34028A] to-[#6624FF] text-white" onClick={handleDisconnect}>Disconnect</Button>
                </div>
            )}

            {/* <div>
                <p className="mb-4">Connected Wallet: {walletAddress}</p>
                <p className="mb-4">User ID: {user?.id}</p>
                <Button onClick={handleDisconnect}>Disconnect</Button>
            </div> */}
            <ConnectWalletPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConnect={handleConnect}
            />
        </div>
    )
}