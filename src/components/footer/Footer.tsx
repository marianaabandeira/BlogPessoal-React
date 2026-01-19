
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-[#f2b7cd] text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog da Mariana Bandeira 💗 | Copyright: {data}
                    </p>
                    <p className='text-lg'>Acesse minhas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/marianaabandeira/" target="_blank">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.instagram.com/marianaabandeira/" target="_blank">
                            <InstagramLogoIcon size={48} weight='bold' />
                        </a>
                            <FacebookLogoIcon size={48} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
