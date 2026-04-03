import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with content from Drupal', async ({ page }) => {
    await page.goto('/')
    // Should show the homepage content (title from Drupal is "State of Columbia")
    await expect(page.locator('body')).toContainText('State of')
    // Quick Links section
    await expect(page.locator('text=Quick Links')).toBeVisible()
  })

  test('renders featured agencies section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Key State Agencies')).toBeVisible()
  })

  test('renders stats section', async ({ page }) => {
    await page.goto('/')
    // Stats from the homepage content
    await expect(page.locator('body')).toContainText('Agencies')
  })
})

test.describe('Agencies', () => {
  test('listing page shows agencies', async ({ page }) => {
    await page.goto('/agencies')
    await expect(page).toHaveTitle(/State Agencies/)
    await expect(page.locator('body')).toContainText('Department of')
  })

  test('detail page renders agency content', async ({ page }) => {
    await page.goto('/agencies/health-human-services')
    await expect(page.locator('h1')).toContainText('Health')
    await expect(page.locator('body')).toContainText('Back to Agencies')
  })
})

test.describe('Officials', () => {
  test('listing page shows officials', async ({ page }) => {
    await page.goto('/officials')
    await expect(page).toHaveTitle(/Elected Officials/)
    await expect(page.locator('body')).toContainText('Governor')
  })

  test('detail page renders official content', async ({ page }) => {
    await page.goto('/officials/governor-patricia-wells')
    await expect(page.locator('h1')).toContainText('Governor Patricia Wells')
  })
})

test.describe('Programs', () => {
  test('listing page shows programs', async ({ page }) => {
    await page.goto('/programs')
    await expect(page).toHaveTitle(/State Programs/)
    await expect(page.locator('body')).toContainText('Medicaid')
  })

  test('detail page renders program content', async ({ page }) => {
    await page.goto('/programs/medicaid-expansion')
    await expect(page.locator('h1')).toContainText('Medicaid Expansion')
  })
})

test.describe('Press Releases', () => {
  test('listing page shows press releases', async ({ page }) => {
    await page.goto('/press-releases')
    await expect(page).toHaveTitle(/Press Releases/)
    await expect(page.locator('body')).toContainText('Budget')
  })

  test('detail page renders press release content', async ({ page }) => {
    await page.goto('/press-releases/fy2026-budget-proposal')
    await expect(page.locator('h1')).toContainText('Budget')
  })
})

test.describe('Static Pages', () => {
  test('about page renders', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('body')).toContainText('About')
  })

  test('contact page renders', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('body')).toContainText('Contact')
  })
})
