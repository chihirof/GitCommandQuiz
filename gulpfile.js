const fs = require('fs')
const data = require('./data.json')

async function init () {
  await Promise.all(data.map(async d => { await createQuestion(d) }))
  await createAnswer(data)
}

async function createQuestion (d) {
  const template = await fs.readFileSync('./templates/question.md', 'utf-8')
  const page = template.replace('{no}', d.no).replace('{question}', d.question)
  await fs.writeFileSync(`./questions/${d.no}.md`, page)
}

async function createAnswer (data) {
  const template = await fs.readFileSync('./templates/answer.md', 'utf-8')
  const answers = data.reduce((accumulator, currentValue) => {
    const row = '| ' + currentValue.no + ' | ' + currentValue.answer + ' | ' + currentValue.link + ' |'
    return accumulator + row + '\n'
  }, '')
  const answer = template.replace('{answers}', answers)
  await fs.writeFileSync('./answers/answers.md', answer)
}

exports.init = init
