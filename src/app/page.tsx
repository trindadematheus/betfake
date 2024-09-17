import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const items = [
  {
    href: '/betano',
    title: 'Betano',
    image_src: "/betano.webp",
    disabled: false,
  },
  {
    href: '/bet365',
    title: 'Bet365',
    image_src: '#',
    disabled: true,
  },
  {
    href: '/bet365',
    title: 'Bet Nacional',
    image_src: '#',
    disabled: true,
  },
  {
    href: '/bet365',
    title: 'Betsat',
    image_src: '#',
    disabled: true,
  },
]

function Home() {
  return (
    <>
      <div className={`max-w-3xl mx-auto p-6 ${inter.className}`}>
        <div className="h-72 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold text-center">Seja o Rei das Apostas Sem <br />👑Gastar 1 Único Real💸</h1>
        </div>

        <h2 className="text-sm">Escolha um modelo:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          {items.map(item => (
            <Link
              className={item.disabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
              aria-disabled={item.disabled}
              href={item.disabled ? '' : item.href}
            >
              <div
                className={`border p-4 rounded-lg transition-all duration-300 ${item.disabled ? 'hover:border' : 'hover:border-purple-500'}`}
              >
                <img
                  className="h-28 md:h-32 object-cover w-full bg-gray-200 rounded-t-lg"
                  src={item.image_src}
                  alt=""
                />
                <h2 className={`font-bold text-lg mt-4`}>{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
