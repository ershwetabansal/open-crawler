const Crawler = require('crawler')
const fs = require('fs')
const config = require('./config.js')

const c = new Crawler({
  maxConnections : 10,
  callback : (error, res, done) => {
    if(error){
      console.log(error)
    }else{
      const $ = res.$
      res.options.tags.forEach(tag => {
        console.log($(tag).html())
      })
      res.options.ids.forEach(id => {
        console.log($('#'+id).html())
      })
    }
    done()
  }
})
c.queue(config.websites)