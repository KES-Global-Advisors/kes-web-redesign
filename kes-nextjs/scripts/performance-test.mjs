// scripts/performance-test.mjs (renamed from .js)
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

async function runLighthouse() {
  let chrome
  
  try {
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
    
    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    }
    
    const runnerResult = await lighthouse('http://localhost:3000', options)
    
    console.log('Report is done for', runnerResult.lhr.finalUrl)
    console.log('Performance score was', Math.round(runnerResult.lhr.categories.performance.score * 100))
    console.log('Accessibility score was', Math.round(runnerResult.lhr.categories.accessibility.score * 100))
    console.log('Best Practices score was', Math.round(runnerResult.lhr.categories['best-practices'].score * 100))
    console.log('SEO score was', Math.round(runnerResult.lhr.categories.seo.score * 100))
    
  } catch (error) {
    console.error('Lighthouse failed:', error)
  } finally {
    if (chrome) {
      await chrome.kill()
    }
  }
}

runLighthouse()