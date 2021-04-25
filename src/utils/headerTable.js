var elementResizeDetectorMaker = require('element-resize-detector')
export function headerTabel(data, that) {
  var erd = elementResizeDetectorMaker()
  erd.listenTo(data, (element) => {
    if (element !== undefined) {
      var height = (window.getComputedStyle(data).width.substring(0, window.getComputedStyle(data).width.indexOf('p'))) - 80
      if (that.noReduce) {
        height += 80
      }
      resetWidth(height, that)
    }
  })
}

export function windowScroll(success) {
  window.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    success(top)
  })
}

function resetWidth(data, that) {
  that.myHeaderWidth = data
  if (that.$refs.myOneTable !== undefined) {
    var mydom = that.$refs.myOneTable.bodyWrapper
    var firstRight = mydom.children[0].getBoundingClientRect().x
    mydom.addEventListener('scroll', (e) => {
      var sencond = firstRight - mydom.children[0].getBoundingClientRect().x
      that.$refs.headerTable.bodyWrapper.previousSibling.children[0].style.cssText = 'transform:translateX(' + '-' + sencond + 'px' + ');width:100%'
    })
  }
}
