import lightmodelogo from '@/../public/logo/logo.png'
import darkmodelogo from '@/../public/logo/logo.png'
import Image from 'next/image'
import { useTheme } from "next-themes"


export function Logo() {
    const { theme } = useTheme()

    const themedLogo = theme === 'dark' ? darkmodelogo : lightmodelogo
    
    return (
        <Image
            src={themedLogo}
            alt="Prediqs Logo"
            width={128}
            height={128}
            quality={80}
        />
    )
}