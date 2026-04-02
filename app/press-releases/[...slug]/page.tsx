import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GET_PRESS_RELEASE_BY_PATH } from '@/lib/queries'
import { DrupalPressRelease } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface PressReleaseByPathData {
  route: {
    entity: DrupalPressRelease
  } | null
}

async function getPressRelease(path: string): Promise<DrupalPressRelease | null> {
  try {
    const client = getClient()
    const { data } = await client.raw(GET_PRESS_RELEASE_BY_PATH, { path })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching press release:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/press-releases/${slug.join('/')}`
  const item = await getPressRelease(path)

  if (!item) {
    return { title: 'Press Release Not Found | State Gov' }
  }

  return {
    title: `${item.title} | State Gov`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function PressReleaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/press-releases/${slug.join('/')}`
  const item = await getPressRelease(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/press-releases"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Press Releases
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {(item as any).image?.url && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                  <ResponsiveImage
                    src={(item as any).image.url}
                    alt={(item as any).image.alt || item.title}
                    fill
                    className="object-cover"
                    variations={(item as any).image.variations}
                    targetWidth={800}
                  />
                </div>
              )}

              {(item as any).body?.processed && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                <dl className="space-y-4">
                  {(item as any).contactName && (
                    <div>
                      <dt className="text-sm text-gray-500">Contact Name</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).contactName}</dd>
                    </div>
                  )}
                  {(item as any).contactEmail && (
                    <div>
                      <dt className="text-sm text-gray-500">Contact Email</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).contactEmail}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
