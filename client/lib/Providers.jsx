"use client"

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

export default function Providers({ children }) {
    return (
        <ThirdwebProvider activeChain="mumbai" clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
          {children}
        </ThirdwebProvider>
    )
}