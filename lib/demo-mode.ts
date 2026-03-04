/**
 * Demo Mode Module
 *
 * This file contains ALL demo/mock mode functionality.
 * To remove demo mode from a real project:
 * 1. Delete this file (lib/demo-mode.ts)
 * 2. Delete the data/mock/ directory
 * 3. Delete app/components/DemoModeBanner.tsx
 * 4. Remove DemoModeBanner from app/layout.tsx
 * 5. Remove the demo mode check from app/api/graphql/route.ts
 */

import homepageData from '@/data/mock/homepage.json'
import agenciesData from '@/data/mock/agencies.json'
import officialsData from '@/data/mock/officials.json'
import programsData from '@/data/mock/programs.json'
import pressReleasesData from '@/data/mock/press-releases.json'
import routesData from '@/data/mock/routes.json'

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
}

const mockDataMap: Record<string, any> = {
  'homepage.json': homepageData,
  'agencies.json': agenciesData,
  'officials.json': officialsData,
  'programs.json': programsData,
  'press-releases.json': pressReleasesData,
  'routes.json': routesData,
}

function loadMockData(filename: string): any {
  return mockDataMap[filename] || null
}

export function handleMockQuery(body: string): any {
  try {
    const { query, variables } = JSON.parse(body)

    if (variables?.path) {
      const routePath = variables.path
      const routes = loadMockData('routes.json')
      if (routes && routes[routePath]) {
        return routes[routePath]
      }
    }

    if (query.includes('GetHomepageData') || query.includes('nodeHomepages')) {
      return loadMockData('homepage.json')
    }

    if (query.includes('GetAgencies') || query.includes('nodeAgencies')) {
      return loadMockData('agencies.json')
    }

    if (query.includes('GetOfficials') || query.includes('nodeOfficials')) {
      return loadMockData('officials.json')
    }

    if (query.includes('GetPrograms') || query.includes('nodePrograms')) {
      return loadMockData('programs.json')
    }

    if (query.includes('GetPressReleases') || query.includes('nodePressReleases')) {
      return loadMockData('press-releases.json')
    }

    return { data: {} }
  } catch (error) {
    console.error('Mock query error:', error)
    return { data: {}, errors: [{ message: 'Mock data error' }] }
  }
}
