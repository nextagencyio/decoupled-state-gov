import { getClient } from '@/lib/drupal-client'
import { GET_HOMEPAGE_DATA, GET_FEATURED_AGENCIES } from '@/lib/queries'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  const title = 'State of Cascadia - Serving the People'
  const description = 'Official website of the State of Cascadia. Find state agencies, government programs, elected officials, and press releases.'

  return {
    title,
    description,
    keywords: ['State Government', 'Cascadia', 'Government Services', 'State Agencies', 'Public Programs', 'Officials'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  try {
    const client = getClient()
    const [homepageData, agenciesData] = await Promise.all([
      client.raw(GET_HOMEPAGE_DATA),
      client.raw(GET_FEATURED_AGENCIES).catch(() => null),
    ])
    const homepageContent = homepageData?.nodeHomepages?.nodes?.[0] || null
    const featuredAgencies = agenciesData?.nodeAgencies?.nodes || []

    // Check if connected but no content exists - show content import guide
    if (!homepageContent) {
      const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
      return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
    }

    return <HomepageRenderer homepageContent={homepageContent} featuredAgencies={featuredAgencies} />
  } catch (error) {
    console.error('Error fetching homepage:', error)
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }
}
