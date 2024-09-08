import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoDominotes1 from '@/images/logos/dominotes-1.svg'
import logoDominotes2 from '@/images/logos/dominotes-2.svg'
import logoCityCritters1 from '@/images/logos/city-critters-1.svg'
import logoCityCritters2 from '@/images/logos/city-critters-2.svg'
import logoHelloWorld from '@/images/logos/hello-world.svg'
import logoRapture from '@/images/logos/rapture.svg'
import logoDevProfile1 from '@/images/logos/dev-profile-1.svg'
import logoDevProfile2 from '@/images/logos/dev-profile-2.svg'
import logoSpecificAir1 from '@/images/logos/specific-air-1.svg'
import logoSpecificAir2 from '@/images/logos/specific-air-2.svg'

const projects = [
  {
    name: 'Dominotes',
    description:
    'A Rube Goldberg-inspired musical few minutes.',
    link: { href: '#', label: 'projects.dominotes' },
    logo: logoDominotes2,
  },
  {
    name: 'City Critters',
    description:
    'Allegorical dialogue on life and what matters through the lens of some everyday city critters NFTs living on a blockchain.',
    link: { href: '#', label: 'github.com' },
    logo: logoCityCritters1,
  },
  {
    name: 'Hello World',
    description:
      "Conway's Game of Life (a simple, visually two-dimensional simulation that yields fascinating patterns, and is considered a zero-player game) is possible (though challenging) to implement by a number of mechanical, electromechanical or hydraulic means.  Here's what we know:",
    link: { href: 'http://planetaria.tech', label: 'projects.hello-world' },
    logo: logoHelloWorld,
  },
  {
    name: 'Rapture',
    description:
      'Rapture is a simple-to-learn, addicting-to-play dice game where players foil the plans of their opponents while scoring highest by connecting a string of 5 dice.',
    link: { href: '#', label: 'github.com' },
    logo: logoRapture,
  },
  {
    name: 'Melshtastic',
    description:
      'Every web developer has to present a profile if they are to make it across the professional threshold.  This is the one that accomplished that for me.  Playful and simple.',
    link: { href: 'https://melshtastic.com', label: 'melshtastic' },
    logo: logoDevProfile2,
  },
  {
    name: 'Post-digital Planning',
    description:
      'Most of us have a livelihood that is hugely dependent on the digital world.  If the internet is ever to die or be taken away, we may live together as a commune, and I will build us clocks and walls',
    link: { href: '#', label: 'post-digital' },
    logo: logoDominotes1,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Projects',
  description: 'Standing under a flooding bucket of thoughts and ideas,',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Standing under a flooding bucket of thoughts and ideas,"
      intro="some will make it through into word and the world.  Here are some projects in the works, as well as some recently completed projects.  Individual project pages are currently under construction."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
