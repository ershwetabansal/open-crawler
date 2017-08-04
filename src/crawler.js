const Crawler = require('crawler')
const fs = require('fs')

let crawler
let promise = new Promise((resolve, reject) => {
  crawler = new Crawler({
    maxConnections : 10,
    callback : (error, res, done) => {
      let content = ''
      if(error){
        console.log(error)
      }else{
        const $ = res.$
        res.options.tags.forEach(tag => {
          content += '<br/>' + $(tag).html() + '<br/>'
        })
        res.options.ids.forEach(id => {
          content += '<br/>' + $('#'+id).html() + '<br/>'
        })
      }
      done()
      resolve(content)
    }
  })
})

module.exports = {
  getWebsiteContent: (website) => {
    crawler.queue(website)
    return promise
  }
}

