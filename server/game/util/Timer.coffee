class window.Timer

  constructor:()->
    @start=(new Date()).getTime()

  getTime:()->
    cur=(new Date).getTime();
    return (cur-@start)