class window.Timer

  constructor:()->
    @getStart=(new Date()).getTime()

  getTime:()->
    cur=(new Date).getTime();
    return (cur-@getStart)