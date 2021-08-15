const fs = require('fs')
const data = require('./data.json')

async function init () {
  await Promise.all(data.map(async d => await createQuestion(d)))
}

async function createQuestion (d) {
  const template = await fs.readFileSync('./templates/question.md', 'utf-8')
  const page = template.replace('{no}', d.no).replace('{question}', d.question)
  await fs.writeFileSync(`./questions/${d.no}.md`, page)
}

exports.init = init
