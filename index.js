const crawler = require('./src/crawler')
const mailer = require('./src/mailer')
const config = require('./local.config.js')

let emailHtml = `<h1>${config.email.title}</h1><br/>`

const promises = []
config.websites.forEach(website => {
  promises.push(crawler.getWebsiteContent(website).then(content => {
    emailHtml += '<br>'
    emailHtml += `<h3><a href="${website.uri}">${website.uri}</a></h3>`
    emailHtml += '<br>'
    emailHtml += content
    emailHtml += '<br>'
  }))
})
Promise.all(promises).then(() => {
  console.log(emailHtml)
  mailer.send(config.email.settings, emailHtml)
})

