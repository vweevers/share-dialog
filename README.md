# share-dialog

Creates share dialogs for Facebook, Twitter, Pinterest, Google Plus, Tumblr and LinkedIn.

## Install

    npm i share-dialog --save

To use in a browser, browserify it.

## Usage

See *service methods* below for specific service args.

```javascript
var Dialog = require('share-dialog')

// Example to share a link on Twitter
var twitter = Dialog.twitter("http://example.com", "This is my tweet")

// Get the dialog URL
var url = twitter.get()

// Or open it in a new window
twitter.open()
```

Each of the service methods (e.g. `Dialog.twitter`) returns a `Dialog` instance. These instances are reusable:

```javascript
var dialog = Dialog.tumblr.link('http://example.com/', 'Some link')

dialog.open()
dialog.params({url: 'http://example.com/foo', name: 'Some link with foo'})
dialog.open()
```

## API

### Dialog instances

**dialog.params(`{ object }`)**
Overwrite GET parameters of share URL.

**dialog.params()**
Get current parameters.

**dialog.config(`{ object }`)**
Overwrite window configuration. The default configuration is:

```javascript
{ toolbar: 0
, status: 0
, width: 650  // differs per service
, height: 306
, top: function(config)
  { return screen.availHeight/2 - config.height/2 }
, left: function(config)
  { return screen.availWidth/2  - config.width/2  }  
}
```

**dialog.config()**
Get current configuration.

**dialog.get()**
Return the dialog URL.

**dialog.open()**
Open the share dialog in a new window.

### Service methods

The argument names listed for each service method below, are equal to the GET parameter names. This means..

```javascript
Dialog.facebook('my_app_id')
```

.. is the same as writing:
```javascript
Dialog.facebook().params({app_id: 'my_app_id'})
```

#### Facebook

**Share dialog** (`facebook.com/dialog/share?app_id=..`)

`Dialog.facebook(app_id, href, redirect_uri)`

*[Documentation](https://developers.facebook.com/docs/sharing/reference/share-dialog)*

**Legacy sharer.php** (`facebook.com/sharer/sharer.php?u=..`)

`Dialog.facebook(u)` where `u` is the URL to share. Does not require an app id.

#### Pinterest

`Dialog.pinterest(url, media [, description])`

*[Documentation](https://developers.pinterest.com/pin_it/)*

#### Tumblr

Share a link:
`Dialog.tumblr.link(url [, name, description])`

Share a photo:
`Dialog.tumblr.photo(source [, caption, clickthru])`

*[Documentation](http://www.tumblr.com/buttons)*

#### Google Plus

`Dialog.gplus(url)`

#### Twitter

`Dialog.twitter(url [, text, via, in_reply_to, hashtags, related])`

- `url` (string): the URL you want to share (required)
- `text` (string): tweet text (optional)
- `via` (string): username (optional)
- `in_reply_to` (number or string): status ID of a tweet (optional)
- `hashtags` (array): hashtags to append to tweet, e.g. \['food', 'monsters'\] (optional)
- `related` (array): related Twitter usernames (optional)

*[Documentation](https://dev.twitter.com/docs/intents#tweet-intent)*

#### LinkedIn

`Dialog.linkedIn(url[, title, source, summary])`

*[Documentation](https://developer.linkedin.com/documents/share-linkedin)*

## Todo

- testling browser tests
