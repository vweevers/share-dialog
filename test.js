var test = require('tap').test
var Dialog = require('./')

function stub(open) {
  global.screen || (global.screen = {
    availHeight: 1024, availWidth: 800
  })

  global.window || (global.window = {})
  global.window.open = open
}

// TODO: the order of GET params cant be guaranteed in these tests

test("facebook", function(t) {
  var intent = Dialog.facebook('secretappid', 'http://google.com', 'http://facebook.com')

  t.equal(intent.get(), 'https://facebook.com/dialog/share?display=popup&href=http%3A%2F%2Fgoogle.com&app_id=secretappid&redirect_uri=http%3A%2F%2Ffacebook.com')
  t.equal(intent.config().width, 650)
  t.end()
})

test("twitter", function(t) {
  var dialogUrl = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fgoogle.com&via=someuser&text=Some%20tweet&hashtags=hash%2Ctags'
  var intent = Dialog.twitter('http://google.com', 'Some tweet', 'someuser')

  intent.params({
    hashtags: ['hash','tags']
  })

  t.equal(intent.get(), dialogUrl)
  t.equal(intent.config().width, 550)

  stub(function(url, titlebar, config){
    t.equal(url, dialogUrl)
    t.equal(titlebar, 'sharer')
    t.equal(config, 'toolbar=0,status=0,width=550,height=420,top=302,left=125')
  })

  intent.open()
  t.end()
})

test("pinterest", function(t) {
  var intent = Dialog.pinterest('http://example.com/foo', 'http://example.com/foo.jpg')

  t.equal(intent.get(), 'https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fexample.com%2Ffoo&media=http%3A%2F%2Fexample.com%2Ffoo.jpg')
  t.end()
})

test("tumblr link", function(t){
  var intent = Dialog.tumblr.link('http://example.com/foo', 'Some link')
  t.equal(intent.get(), 'https://www.tumblr.com/share/link?url=http%3A%2F%2Fexample.com%2Ffoo&name=Some%20link')
  t.end()
})

test("tumblr photo", function(t){
  var intent = Dialog.tumblr.photo('http://example.com/foo.jpg', 'Some image')
  t.equal(intent.get(), 'https://www.tumblr.com/share/photo?source=http%3A%2F%2Fexample.com%2Ffoo.jpg&caption=Some%20image')
  t.end()
})

test("linkedin", function(t) {
  var dialog = Dialog.linkedIn('http://example.com/foo', 'title', 'source', 'summary');
  t.equal(dialog.get(), 'https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Fexample.com%2Ffoo&title=title&source=source&summary=summary')

  var dialog2 = Dialog.linkedIn('http://example.com/foo');
  t.equal(dialog2.get(), 'https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Fexample.com%2Ffoo')

  t.throws(function(){
    Dialog.linkedIn().get()
  })

  t.end()
})
