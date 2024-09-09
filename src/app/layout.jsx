import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import Image from 'next/image'
import portraitNoBg from '@/images/photos/portrait-no-bg.png'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - David Melsheimer',
    default:
      'David Melsheimer - Conceptual artist, web developer, and perennial scholar',
  },
  description:
    'I’m David, an artist and web developer in Indianapolis.',
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
  //   },
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
