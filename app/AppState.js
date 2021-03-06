import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import Item from "./Models/Item.js"
import Cart from "./Models/Cart.js"

class AppState extends EventEmitter {

  /** @type {Item[]} */
  items = []
  /** @type {Cart[]} */
  cart = []

}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
