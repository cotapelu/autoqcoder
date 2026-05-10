#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')

const files = [
  'AGENTS.md',
  'AUTO-CONTINUE.md'
]

function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/cotapelu/autoqcoder/main/${filename}`
    const filePath = path.join(process.cwd(), filename)
    
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filePath)
      res.pipe(fileStream)
      fileStream.on('finish', () => {
        fileStream.close()
        console.log(`✅ ${filename}`)
        resolve()
      })
    }).on('error', reject)
  })
}

async function setup() {
  console.log('📥 Installing autoqcoder agent files...\n')
  
  for (const file of files) {
    try {
      await downloadFile(file)
    } catch (err) {
      console.error(`❌ Failed to download ${file}`)
    }
  }
  
  console.log('\n✨ Setup complete! Files ready in project root.')
}

setup()