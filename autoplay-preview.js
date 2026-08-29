(function(root, factory){
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoplayPreview = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  function createViewportAutoplayController(options = {}){
    const threshold = typeof options.threshold === 'number' ? options.threshold : 0.35;
    const observerFactory = options.observerFactory || ((callback, observerOptions) => new IntersectionObserver(callback, observerOptions));

    const observer = observerFactory((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const visibleEnough = entry.isIntersecting && (entry.intersectionRatio == null || entry.intersectionRatio >= threshold);

        if (visibleEnough) {
          if (!video.src && video.dataset && video.dataset.src) {
            video.src = video.dataset.src;
            if (typeof video.load === 'function') video.load();
          }

          if (typeof video.play === 'function') {
            const result = video.play();
            if (result && typeof result.catch === 'function') result.catch(() => {});
          }
        } else if (typeof video.pause === 'function') {
          video.pause();
        }
      });
    }, { threshold: [0, threshold, 0.75] });

    function observe(video){
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      if ('preload' in video) video.preload = 'metadata';
      observer.observe(video);
    }

    function disconnect(){
      if (observer && typeof observer.disconnect === 'function') observer.disconnect();
    }

    return { observe, disconnect };
  }

  return { createViewportAutoplayController };
});
