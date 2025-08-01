import { Hono } from 'hono'

const app = new Hono()

// Define all stations and their categories
const stations = [
  // Radio stations
  { category: 'radio', slug: 'rve-oradea' },
  { category: 'radio', slug: 'rve-brasov' },
  { category: 'radio', slug: 'radio-vocea-crestinilor' },
  { category: 'radio', slug: 'rve-timisoara' },
  { category: 'radio', slug: 'radio-filadelfia-christmas' },
  { category: 'radio', slug: 'radio-emanuel' },
  { category: 'radio', slug: 'radio-unison' },
  { category: 'radio', slug: 'radio-maranata-vulcan' },
  { category: 'radio', slug: 'aripi-spre-cer' },
  { category: 'radio', slug: 'radio-betel-alcala' },
  { category: 'radio', slug: 'rve-predici' },
  { category: 'radio', slug: 'radio-filadelfia-special' },
  { category: 'radio', slug: 'rve-constanta' },
  { category: 'radio', slug: 'radio-vocea-sperantei' },
  { category: 'radio', slug: 'radio-antiohia' },
  { category: 'radio', slug: 'radio-vestea-buna' },
  { category: 'radio', slug: 'rve-oradea-muzica' },
  { category: 'radio', slug: 'rve-hunedoara' },
  { category: 'radio', slug: 'radio-iubire-fara-margini' },
  { category: 'radio', slug: 'radio-o-noua-sansa' },
  { category: 'radio', slug: 'radio-calea-spre-cer-copii' },
  { category: 'radio', slug: 'radio-moody-chicago' },
  { category: 'radio', slug: 'radio-old-christian-radio' },
  { category: 'radio', slug: 'rve-satu-mare' },
  { category: 'radio', slug: 'radio-levi' },
  { category: 'radio', slug: 'radio-joy' },
  { category: 'radio', slug: 'rve-oradea-international' },
  { category: 'radio', slug: 'rve-zalau' },
  { category: 'radio', slug: 'radio-calea-spre-cer-biblia' },
  { category: 'radio', slug: 'radio-biserica-penticostala-nadlac' },
  { category: 'radio', slug: 'radio-9-fm' },
  { category: 'radio', slug: 'aripi-spre-cer-instrumental' },
  { category: 'radio', slug: 'aripi-spre-cer-predici' },
  { category: 'radio', slug: 'aripi-spre-cer-popular' },
  { category: 'radio', slug: 'radio-calea-spre-cer-popular' },
  { category: 'radio', slug: 'radio-predic' },
  { category: 'radio', slug: 'radio-allelon' },
  { category: 'radio', slug: 'alt-fm' },
  { category: 'radio', slug: 'radio-philadelphia-copii' },
  { category: 'radio', slug: 'radio-armonia' },
  { category: 'radio', slug: 'rve-viena-muzica' },
  { category: 'radio', slug: 'cross-one' },
  { category: 'radio', slug: 'radio-elim-kids' },
  { category: 'radio', slug: 'radio-de-cuvant' },
  { category: 'radio', slug: 'radio-elim-plus' },
  { category: 'radio', slug: 'radio-philadelphia-clasic' },
  { category: 'radio', slug: 'rve-bucuresti' },
  { category: 'radio', slug: 'radio-ekklesia' },
  { category: 'radio', slug: 'sos-ploiesti' },
  { category: 'radio', slug: 'radio-filadelfia' },
  { category: 'radio', slug: 'radio-gosen' },
  { category: 'radio', slug: 'radio-elim' },
  { category: 'radio', slug: 'radio-philadelphia-contemporan' },
  { category: 'radio', slug: 'aripi-spre-cer-special' },
  { category: 'radio', slug: 'radio-philadelphia' },
  { category: 'radio', slug: 'rve-sibiu' },
  { category: 'radio', slug: 'radio-philadelphia-melbourne' },
  { category: 'radio', slug: 'radio-calea-spre-cer' },
  { category: 'radio', slug: 'radio-vocea-credintei' },
  { category: 'radio', slug: 'rve-cluj' },
  { category: 'radio', slug: 'rve-suceava' },
  { category: 'radio', slug: 'radio-micul-samaritean' },
  { category: 'radio', slug: 'radio-crestin-autentic' },
  { category: 'radio', slug: 'rve-viena-tineri' },
  { category: 'radio', slug: 'rve-viena' },
]


// Generate sitemap XML
function generateSitemap(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add homepage
  xml += '    <url>\n'
  xml += '        <loc>https://www.radio-crestin.com/</loc>\n'
  xml += '    </url>\n'
  
  // Add all radio stations
  stations.forEach(station => {
    xml += '    <url>\n'
    xml += `        <loc>https://www.radio-crestin.com/${station.category}/${station.slug}</loc>\n`
    xml += '    </url>\n'
  })
  
  // Add category-specific station pages
  const categoryStations = {
    'general': ['rve-oradea', 'rve-brasov', 'rve-timisoara', 'radio-unison', 'aripi-spre-cer', 'rve-predici', 'rve-constanta', 'rve-hunedoara', 'rve-satu-mare', 'rve-zalau', 'alt-fm', 'radio-armonia', 'radio-de-cuvant', 'rve-bucuresti', 'sos-ploiesti', 'radio-philadelphia', 'rve-sibiu', 'radio-philadelphia-melbourne', 'radio-calea-spre-cer', 'rve-cluj', 'rve-suceava', 'radio-micul-samaritean'],
    'muzica': ['rve-brasov', 'radio-vocea-crestinilor', 'rve-timisoara', 'radio-filadelfia-christmas', 'radio-emanuel', 'radio-maranata-vulcan', 'aripi-spre-cer', 'radio-filadelfia-special', 'rve-constanta', 'radio-vestea-buna', 'rve-oradea-muzica', 'rve-hunedoara', 'radio-iubire-fara-margini', 'radio-o-noua-sansa', 'radio-levi', 'rve-zalau', 'radio-calea-spre-cer-popular', 'alt-fm', 'radio-armonia', 'rve-viena-muzica', 'radio-de-cuvant', 'radio-philadelphia-clasic', 'rve-bucuresti', 'radio-ekklesia', 'radio-filadelfia', 'radio-gosen', 'radio-elim', 'radio-philadelphia-contemporan', 'aripi-spre-cer-special', 'radio-philadelphia', 'rve-sibiu', 'radio-philadelphia-melbourne', 'radio-calea-spre-cer', 'radio-vocea-credintei', 'rve-cluj', 'rve-suceava', 'radio-micul-samaritean', 'rve-viena-tineri'],
    'emisiuni': ['radio-unison', 'alt-fm', 'radio-armonia', 'cross-one', 'radio-de-cuvant', 'rve-bucuresti', 'radio-micul-samaritean'],
    'popular': ['radio-unison', 'radio-iubire-fara-margini', 'radio-o-noua-sansa', 'aripi-spre-cer-popular', 'radio-calea-spre-cer-popular', 'radio-philadelphia-clasic', 'radio-gosen', 'radio-micul-samaritean'],
    'predici': ['radio-vocea-crestinilor', 'radio-antiohia', 'aripi-spre-cer-predici', 'radio-predic', 'radio-philadelphia'],
    'worship': ['radio-levi', 'cross-one', 'radio-elim-plus', 'radio-filadelfia', 'radio-philadelphia-contemporan'],
    'international': ['radio-moody-chicago', 'radio-old-christian-radio', 'rve-oradea-international'],
    'gospel': ['radio-old-christian-radio'],
    'instrumental': ['aripi-spre-cer-instrumental', 'radio-elim'],
    'copii': ['radio-vestea-buna', 'radio-calea-spre-cer-copii', 'radio-philadelphia-copii', 'radio-elim-kids'],
    'biblia': ['radio-calea-spre-cer-biblia'],
    'colinde': ['radio-filadelfia-christmas', 'aripi-spre-cer-special']
  }
  
  // Add category-specific URLs
  Object.entries(categoryStations).forEach(([category, stationSlugs]) => {
    stationSlugs.forEach(slug => {
      xml += '    <url>\n'
      xml += `        <loc>https://www.radio-crestin.com/${category}/${slug}</loc>\n`
      xml += '    </url>\n'
    })
  })
  
  xml += '</urlset>\n'
  return xml
}

// Redirect root to https://www.radiocrestin.ro/
app.get('/', (c) => {
  return c.redirect('https://www.radiocrestin.ro/', 301)
})

// Serve sitemap.xml from /sitemap.xml
app.get('/sitemap.xml', (c) => {
  const sitemap = generateSitemap()
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml'
  })
})

// Redirect /XXXX to https://www.radiocrestin.ro/
app.get('/:category', (c) => {
  return c.redirect('https://www.radiocrestin.ro/', 301)
})

// Redirect /XXXX/YYYYY to https://www.radiocrestin.ro/YYY
app.get('/:category/:station', (c) => {
  const station = c.req.param('station')
  return c.redirect(`https://www.radiocrestin.ro/${station}`, 301)
})

// Catch-all route for any not found pages - redirect to radiocrestin.ro keeping the path
app.get('*', (c) => {
  const path = c.req.path
  return c.redirect(`https://www.radiocrestin.ro${path}`, 301)
})

export default app
