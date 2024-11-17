Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

export let interval = {
  intervals: new Set(),

  make(...args) {
    var newInterval = setInterval(...args);
    this.intervals.add(newInterval);
    return newInterval;
  },

  clear(id) {
    this.intervals.delete(id);
    return clearInterval(id);
  },

  // clear all intervals
  clearAll() {
    for (var id of this.intervals) {
      this.clear(id);
    }
  },
};
