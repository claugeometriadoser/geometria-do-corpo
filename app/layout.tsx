import './globals.css'

export const metadata = {
  title: 'Geometria do Corpo',
  description: 'Programa de Treinos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-[#F5EFE9] text-[#5A4637]">
        {children}
      </body>
    </html>
  )
}
