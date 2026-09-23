(function(){
  /* ---- lightweight python highlighting ---- */
  var KW = /\b(from|import|def|class|return|if|elif|else|for|in|not|and|or|None|True|False|lambda|with|as|try|except|raise|yield|await|async)\b/g;
  document.querySelectorAll('pre code').forEach(function(block){
    var html = block.innerHTML;
    var store = [];
    /* placeholders use private-use characters so later passes
       (numbers, function names) can never match inside them */
    function keep(s){ store.push(s); return String.fromCharCode(0xE000 + store.length - 1); }
    html = html.replace(/#[^\n]*/g, function(m){ return keep('<span class="tk-com">' + m + '</span>'); });
    html = html.replace(/('''[\s\S]*?'''|'[^'\n]*'|"[^"\n]*")/g, function(m){ return keep('<span class="tk-str">' + m + '</span>'); });
    html = html.replace(KW, '<span class="tk-kw">$1</span>');
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="tk-num">$1</span>');
    html = html.replace(/([A-Za-z_][\w]*)(\()/g, '<span class="tk-fn">$1</span>$2');
    html = html.replace(/[-]/g, function(ch){ return store[ch.charCodeAt(0) - 0xE000]; });
    block.innerHTML = html;
  });

  /* ---- copy buttons ---- */
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var code = btn.closest('.code-card').querySelector('code').innerText;
      var done = function(){
        btn.classList.add('done');
        btn.querySelector('span').textContent = 'Copied';
        setTimeout(function(){
          btn.classList.remove('done');
          btn.querySelector('span').textContent = 'Copy';
        }, 1600);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(code).then(done, function(){});
      } else {
        var ta = document.createElement('textarea');
        ta.value = code; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch(e){}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---- reading progress + back to top ---- */
  var bar = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
    toTop.classList.toggle('show', h.scrollTop > 700);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  toTop.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* ---- contents toggle (mobile) ---- */
  var toc = document.getElementById('toc');
  var tocToggle = document.getElementById('tocToggle');
  tocToggle.addEventListener('click', function(){ toc.classList.toggle('open'); });
  toc.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ toc.classList.remove('open'); });
  });

  /* ---- highlight the section being read ---- */
  if('IntersectionObserver' in window){
    var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          links.forEach(function(l){
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin:'-20% 0px -70% 0px', threshold:0 });
    document.querySelectorAll('article section').forEach(function(s){ spy.observe(s); });
  }
})();
