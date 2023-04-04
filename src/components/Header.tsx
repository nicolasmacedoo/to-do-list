import Image from 'next/image'
import rocket from '../../public/rocket.svg'

export function Header() {
  return (
    <header className="bg-gray-700 h-[200px] flex justify-center items-center gap-3">
      <Image src={rocket} alt="Imagem de um foguete decolando" />
      <p className="text-[40px] text-purple-400 font-bold">
        to<span className="text-blue-200">do</span>
      </p>
    </header>
  )
}
