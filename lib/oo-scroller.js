Template.ooNativeScroller.created = function () {
  var self = this;
  self.scrollStartY = new Blaze.ReactiveVar(0);
  self.callbackInProgress = new Blaze.ReactiveVar(false);
  self.topShadow = new Blaze.ReactiveVar(false)
  self.bottomShadow = new Blaze.ReactiveVar(false)
};

Template.ooNativeScroller.events({
  'scroll': function(e, t) {
    var self = this;
    if (self.loadMore) {
      if (!t.callbackInProgress.get()) {
        var topOffset = e.currentTarget.scrollTop;
        var maxContentHeight = e.currentTarget.scrollHeight
        var itemHeight = e.currentTarget.clientHeight
        if ((topOffset + itemHeight) === maxContentHeight) {
          e.preventDefault();
          // remove shadow class
          if (self.loadMore) {
                var fn = ooForms[self.loadMore];

            if (typeof fn === 'function') {
              fn(function(result) {
                if (result) {
                  t.callbackInProgress.set(false)
                } else {
                  t.callbackInProgress.set(false)
                }
              })
            } else {
              t.callbackInProgress.set(false)

            }

          }
        } else {
          // remove shadow class
        }
      }
    }

  },
  'touchstart .js-noEdgeDrag': function(e, t) {
    // sets start position
    t.scrollStartY.set(e.originalEvent.touches[0].clientY)
  },
  'touchmove .js-noEdgeDrag': function (e, t) {
    var self = this;
    var scrollMoveY = e.originalEvent.changedTouches[0].clientY;
    var topOffset = e.currentTarget.scrollTop;
    var maxContentHeight = e.currentTarget.scrollHeight
    var itemHeight = e.currentTarget.clientHeight
    // Prevent dragging when cotent is scrolled to bottom
    if (t.scrollStartY.get() > scrollMoveY) {
        if ((topOffset + itemHeight) === maxContentHeight) {
          // console.log('preventing when bottom reached')
          e.preventDefault();
          // if (self.loadMore) {
          //   if (!t.callbackInProgress.get()) {
          //       t.callbackInProgress.set(true)
          //       var fn = ooForms[self.loadMore];

          //       if (typeof fn === 'function') {
          //         fn(function(result) {
          //           if (result) {
          //             t.callbackInProgress.set(false)
          //           } else {
          //             t.callbackInProgress.set(false)
          //           }
          //         });
          //       } else {
          //         t.callbackInProgress.set(false)

          //       }

          //   }
          // }
        }
    } else {
      // Prevent dragging when 'top' offset is 0 (content top reached)
      if (!topOffset) {
        // console.log('preveinting content top reached')
        e.preventDefault();
      }
    }
  }
});