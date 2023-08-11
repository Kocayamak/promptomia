import '@styles/globals.css'

export const metadata = {
  title: 'Promtopia',
  description: 'Discover & Share AI Prompts',
}

const RootLayout = ({children}) => {
  return (
    <html lang='tr'>
      <body>
        <div className='main'>
          <div className='gradient'></div>
        </div>

        <main className='app'>
          {children}
        </main>
      </body>

    </html>
  )
}

export default RootLayout