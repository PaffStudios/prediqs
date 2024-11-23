import lightmodelogo from '@/../public/logo/light.png'
import darkmodelogo from '@/../public/logo/dark.png'
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