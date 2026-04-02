import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_OFFICIALS } from '@/lib/queries'
import { OfficialsData } from '@/lib/types'
import Header from '../components/Header'
import OfficialCard from '../components/OfficialCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Elected Officials | State of Cascadia',
  description: 'Elected and appointed officials serving the State of Cascadia.',
}

async function getOfficials() {
  try {
    const client = getClient()
    const data = await client.raw(GET_OFFICIALS, { first: 50 })
    return data?.nodeOfficials?.nodes || []
  } catch (error) {
    console.error('Error fetching officials:', error)
    return []
  }
}

export default async function OfficialsPage() {
  const items = await getOfficials()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-primary-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Elected Officials
          </h1>
          <p className="text-primary-200 max-w-3xl">
            Elected and appointed leaders serving the people of Cascadia.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Officials Yet</h2>
              <p className="text-gray-500">
                Officials will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: any) => (
                <OfficialCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
