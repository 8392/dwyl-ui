function mitt (all) {
  all = all || new Map()
  return {
    on: function (type, handler) {
      let handlers = all.get(type)
      if (handlers) {
        handlers.push(handler)
      } else {
        all.set(type, [handler])
      }
    },
    off: function (type, handler) {
      let handlers = all.get(type)
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        } else {
          all.set(type, [])
        }
      }
    },
    emit: function (type, evt) {
      let handlers = all.get(type)
      if (handlers) {
        handlers.slice().forEach(function (handler) {
          handler(evt)
        })
      }
      handlers = all.get('*')
      if (handlers) {
        handlers.slice().forEach(function (handler) {
          handler(type, evt)
        })
      }
    },
    all
  }
}

export default mitt
