import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_PRESS_RELEASES } from '@/lib/queries'
import { PressReleasesData } from '@/lib/types'
import Header from '../components/Header'
import PressReleaseCard from '../components/PressReleaseCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Press Releases | State of Cascadia',
  description: 'Official press releases and announcements from the State of Cascadia government.',
}

async function getPressReleases() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<PressReleasesData>({
      query: GET_PRESS_RELEASES,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodePressReleases?.nodes || []
  } catch (error) {
    console.error('Error fetching press releases:', error)
    return []
  }
}

export default async function PressReleasesPage() {
  const items = await getPressReleases()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-primary-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Press Releases
          </h1>
          <p className="text-primary-200 max-w-3xl">
            Official announcements, policy updates, and news from state agencies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Press Releases Yet</h2>
              <p className="text-gray-500">
                Press Releases will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <PressReleaseCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
