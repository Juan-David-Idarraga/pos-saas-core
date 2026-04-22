import './globals.css' // Esto carga los estilos de Tailwind CSS

export const metadata = {
  title: 'POS SaaS Core',
  description: 'Sistema de Punto de Venta Multi-tenant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Aquí adentro Next.js inyectará tu (pos)/layout.tsx y tus páginas */}
        {children}
      </body>
    </html>
  )
}