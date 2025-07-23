#!/usr/bin/env node

// scripts/test-ssg.js
// Quick script to verify SSG implementation

import fs from 'fs'
import path from 'path'

console.log('🔍 Testing SSG Implementation...')
console.log('================================')

// Check if build directory exists
const buildDir = path.join(process.cwd(), '.next')
if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory not found. Run "npm run build" first.')
  process.exit(1)
}

// Check for static pages
const serverDir = path.join(buildDir, 'server', 'app')
const staticFiles = []

function checkDirectory(dir, basePath = '') {
  if (!fs.existsSync(dir)) return
  
  const items = fs.readdirSync(dir)
  
  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      checkDirectory(fullPath, path.join(basePath, item))
    } else if (item.endsWith('.html')) {
      staticFiles.push(path.join(basePath, item))
    }
  })
}

checkDirectory(serverDir)

console.log('\n📄 Static HTML Files Generated:')
if (staticFiles.length === 0) {
  console.log('❌ No static HTML files found')
} else {
  staticFiles.forEach(file => {
    console.log(`✅ ${file}`)
  })
}

// Check build manifest
const manifestPath = path.join(buildDir, 'server', 'pages-manifest.json')
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  console.log('\n📋 Pages Manifest:')
  Object.keys(manifest).forEach(page => {
    console.log(`   ${page} -> ${manifest[page]}`)
  })
}

// Check for prerender manifest
const prerenderPath = path.join(buildDir, 'prerender-manifest.json')
if (fs.existsSync(prerenderPath)) {
  const prerender = JSON.parse(fs.readFileSync(prerenderPath, 'utf8'))
  console.log('\n🏗️ Prerendered Routes:')
  Object.keys(prerender.routes).forEach(route => {
    const info = prerender.routes[route]
    console.log(`   ${route} (revalidate: ${info.initialRevalidateSeconds || 'false'})`)
  })
}

console.log('\n🎯 Verification Steps:')
console.log('1. ✅ Check build output above')
console.log('2. 🌐 Run "npm start" and test pages')
console.log('3. 🔧 Check debug info in development')
console.log('4. 📊 Use Lighthouse to test performance')

console.log('\n✨ SSG verification complete!')