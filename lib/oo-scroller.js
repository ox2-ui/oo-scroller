Template.ooNativeScroller.created = function () {
  var self = this;
  self.scrollStartY = new Blaze.ReactiveVar(0);
  self.callbackInProgress = new Blaze.ReactiveVar(false);
  self.topShadow = new Blaze.ReactiveVar(false)
  self.bottomShadow = new Blaze.ReactiveVar(false)
};

Template.ooNativeScroller.rendered = function () {
    var self = this;
  if(self.data.inverted) {
    Meteor.setTimeout(function(){
      var height = self.firstNode.scrollHeight;
      $(self.firstNode).scrollTop(height);
    }, 200);
  }
};

Template.ooNativeScroller.helpers({
  isLoading : function () {
    console.log('%c -- loading   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;', Template.instance().callbackInProgress.get());
   return !Template.instance().callbackInProgress.get();
  }
});

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
          t.callbackInProgress.set(true)
          // remove shadow class
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
