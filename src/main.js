// Bootstraps the restaurant single-page interface and tab interactions
import './style.css'
import breakfastPhoto from './assets/breakfast.jpeg'

const app = document.querySelector('#app')

if (!app) {
  throw new Error('App root not found')
}

// Tab configuration drives both navigation and panel content rendering
const tabs = [
  {
    id: 'home',
    label: 'Home',
    render: renderHome
  },
  {
    id: 'about',
    label: 'About',
    render: renderAbout
  },
  {
    id: 'contact',
    label: 'Visit',
    render: renderContact
  }
]

const layout = document.createElement('div')
layout.className = 'layout'

const header = document.createElement('header')
header.className = 'site-header'

const brand = document.createElement('div')
brand.className = 'brand'

const title = document.createElement('h1')
title.textContent = 'Beary’s Breakfast Bar'

const subtitle = document.createElement('p')
subtitle.className = 'brand-tagline'
subtitle.textContent = 'Woodland-inspired breakfasts, plated with modern finesse'

brand.append(title, subtitle)

const nav = document.createElement('nav')
nav.className = 'tab-nav'

const tabList = document.createElement('div')
tabList.className = 'tab-list'
tabList.setAttribute('role', 'tablist')

// Build the tab navigation bar with accessible roles and state
tabs.forEach((tab, index) => {
  const button = document.createElement('button')
  button.className = 'tab-button'
  button.id = `${tab.id}-tab`
  button.type = 'button'
  button.dataset.tab = tab.id
  button.textContent = tab.label
  button.setAttribute('role', 'tab')
  button.setAttribute('aria-controls', tab.id)
  button.setAttribute('aria-selected', index === 0 ? 'true' : 'false')
  button.setAttribute('tabindex', index === 0 ? '0' : '-1')
  if (index === 0) {
    button.classList.add('active')
  }
  tabList.append(button)
})

nav.append(tabList)
header.append(brand, nav)

const panelContainer = document.createElement('main')
panelContainer.className = 'tab-panels'

// Pre-build each tab panel so content is ready when toggled into view
tabs.forEach((tab, index) => {
  const panel = document.createElement('section')
  panel.id = tab.id
  panel.className = 'tab-content'
  panel.setAttribute('role', 'tabpanel')
  panel.setAttribute('tabindex', '0')
  panel.setAttribute('aria-labelledby', `${tab.id}-tab`)
  panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true')
  if (index === 0) {
    panel.classList.add('active')
  }
  panel.append(tab.render())
  panelContainer.append(panel)
})

layout.append(header, panelContainer)
app.innerHTML = ''
app.append(layout)

const tabButtons = Array.from(tabList.querySelectorAll('.tab-button'))
const tabPanels = Array.from(panelContainer.querySelectorAll('.tab-content'))

// Wire up click and keyboard interactions to keep the tabs accessible
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tab)
    button.focus()
  })

  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return
    }

    event.preventDefault()

    const currentIndex = tabButtons.indexOf(button)
    const increment = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (currentIndex + increment + tabButtons.length) % tabButtons.length
    tabButtons[nextIndex].click()
  })
})

// Sync button and panel state when the active tab changes
function setActiveTab(id) {
  tabButtons.forEach(button => {
    const isActive = button.dataset.tab === id
    button.classList.toggle('active', isActive)
    button.setAttribute('aria-selected', isActive ? 'true' : 'false')
    button.setAttribute('tabindex', isActive ? '0' : '-1')
  })

  tabPanels.forEach(panel => {
    const isActive = panel.id === id
    panel.classList.toggle('active', isActive)
    panel.setAttribute('aria-hidden', isActive ? 'false' : 'true')
  })
}

// Home tab: hero section, menu highlights, and supporting imagery
function renderHome() {
  const fragment = document.createDocumentFragment()

  const hero = document.createElement('section')
  hero.className = 'hero'

  const heroCopy = document.createElement('div')
  heroCopy.className = 'hero-copy'

  const kicker = document.createElement('span')
  kicker.className = 'eyebrow'
  kicker.textContent = 'Breakfast, perfected'

  const headline = document.createElement('h2')
  headline.textContent = 'Slow mornings, warm plates, thoughtful hospitality'

  const body = document.createElement('p')
  body.textContent = 'Our menu is anchored in seasonal berries, house-churned butter, and porridge simmered to silk. Find your rhythm, linger longer, and savor the calm.'

  const ctaGroup = document.createElement('div')
  ctaGroup.className = 'cta-group'

  const primaryCta = document.createElement('button')
  primaryCta.className = 'button primary'
  primaryCta.type = 'button'
  primaryCta.textContent = 'Reserve a table'

  const secondaryCta = document.createElement('button')
  secondaryCta.className = 'button ghost'
  secondaryCta.type = 'button'
  secondaryCta.textContent = 'View seasonal menu'

  ctaGroup.append(primaryCta, secondaryCta)

  heroCopy.append(kicker, headline, body, ctaGroup)

  const heroVisual = document.createElement('figure')
  heroVisual.className = 'hero-visual'

  const image = document.createElement('img')
  image.src = breakfastPhoto
  image.alt = 'Plated breakfast featuring porridge, berries, and warm bread'

  const caption = document.createElement('figcaption')
  caption.textContent = 'Signature birchwood board with honeycomb, caramelized oats, and wild berry compote.'

  heroVisual.append(image, caption)

  hero.append(heroCopy, heroVisual)

  const highlights = document.createElement('section')
  highlights.className = 'feature-grid'

  // Copy for feature highlight cards
  const featureData = [
    {
      title: 'Wildcrafted ingredients',
      description: 'We gather local honey, orchard fruit, and stone-milled grains each morning before the doors open.'
    },
    {
      title: 'Mindful dining pace',
      description: 'Low-lit booths, curated playlists, and service choreographed to match the rhythm of your morning.'
    },
    {
      title: 'Seasonal chef tastings',
      description: 'Rotating five-course breakfast flights showcasing the brilliance of our farm partners.'
    }
  ]

  featureData.forEach(feature => {
    const card = document.createElement('article')
    card.className = 'feature-card'

    const featureTitle = document.createElement('h3')
    featureTitle.textContent = feature.title

    const featureBody = document.createElement('p')
    featureBody.textContent = feature.description

    card.append(featureTitle, featureBody)
    highlights.append(card)
  })

  fragment.append(hero, highlights)

  return fragment
}

// About tab: brand story and core values
function renderAbout() {
  const section = document.createElement('section')
  section.className = 'about'

  const heading = document.createElement('h2')
  heading.textContent = 'Rooted in forest tradition'

  const intro = document.createElement('p')
  intro.textContent = 'Beary’s Breakfast Bar began as a woodland pop-up by pastry chef Mara Ellison. Today, it remains a tribute to slow mornings, rustic craft, and the flavors that flourish under a canopy of pines.'

  const valuesList = document.createElement('ul')
  valuesList.className = 'values-list'

  const values = [
    {
      title: 'Sustainable sourcing',
      detail: 'We partner with heritage grain mills, regenerative farms, and foragers who steward the land.'
    },
    {
      title: 'Community table',
      detail: 'Monthly workshops invite guests to learn preserve making, oat roasting, and woodland pairing rituals.'
    },
    {
      title: 'Thoughtful rituals',
      detail: 'Every service begins with a tasting pour of spruce tip tea to ground your senses.'
    }
  ]

  values.forEach(value => {
    const item = document.createElement('li')
    item.className = 'values-item'

    const itemTitle = document.createElement('h3')
    itemTitle.textContent = value.title

    const itemDetail = document.createElement('p')
    itemDetail.textContent = value.detail

    item.append(itemTitle, itemDetail)
    valuesList.append(item)
  })

  section.append(heading, intro, valuesList)

  return section
}

// Contact tab: practical visit details and booking notes
function renderContact() {
  const section = document.createElement('section')
  section.className = 'contact'

  const heading = document.createElement('h2')
  heading.textContent = 'Visit the den'

  const copy = document.createElement('p')
  copy.textContent = 'Nestled along Alder Lane, our breakfast den opens its doors daily from 7:30 to 2:00. Reservations are recommended for weekend tastings.'

  const details = document.createElement('div')
  details.className = 'contact-grid'

  details.append(
    buildDetail('Address', '112 Alder Lane, Riverford, OR 97201'),
    buildDetail('Phone', '(503) 555-0126'),
    buildDetail('Email', 'hello@bearybreakfast.com'),
    buildDetail('Hours', 'Daily 7:30 AM – 2:00 PM')
  )

  const note = document.createElement('p')
  note.className = 'contact-note'
  note.textContent = 'Private gatherings, pastry classes, and chef’s table bookings are available with advance notice.'

  section.append(heading, copy, details, note)

  return section
}

// Shared detail card builder for the contact grid
function buildDetail(label, value) {
  const wrapper = document.createElement('article')
  wrapper.className = 'contact-card'

  const labelEl = document.createElement('span')
  labelEl.className = 'label'
  labelEl.textContent = label

  const valueEl = document.createElement('p')
  valueEl.textContent = value

  wrapper.append(labelEl, valueEl)

  return wrapper
}
