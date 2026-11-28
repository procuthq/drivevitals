/* On a Mac: the download starts as usual, the button says "Downloading…"
   for a moment, then "Downloaded" and shows how to install. No fake progress:
   the browser doesn't tell a page how far a download has got. */
(function () {
  var ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return;
  var ru = document.documentElement.lang === 'ru';
  var T = ru ? { busy: 'Загрузка…', done: 'Загрузка началась', again: 'Скачать ещё раз', head: 'Осталось три шага',
      s1: 'Откройте <b>DriveVitals.dmg</b> в папке «Загрузки».', s2: 'Перетащите DriveVitals в папку <b>«Программы»</b> (Applications).', s3: 'Откройте приложение DriveVitals и нажмите на его значок в <b>строке меню</b>.' }
    : { busy: 'Downloading…', done: 'Download started', again: 'Download again', head: 'Three steps to go',
      s1: 'Open <b>DriveVitals.dmg</b> from your Downloads.', s2: 'Drag DriveVitals onto the <b>Applications</b> folder next to it.', s3: 'Open DriveVitals and click its icon in the <b>menu bar</b>.' };
  var showSteps = !document.querySelector('.beta-steps'); // beta pages already list the steps
  var links = document.querySelectorAll('a[href*="DriveVitals.dmg"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      var a = this;
      if (a.classList.contains('is-busy') || a.classList.contains('is-done')) return;
      var w = a.offsetWidth;
      a.style.minWidth = w + 'px';
      a.classList.add('is-busy');
      a.innerHTML = '<span class="dl-ring" aria-hidden="true"></span>' + T.busy;
      setTimeout(function () {
        a.classList.remove('is-busy'); a.classList.add('is-done');
        a.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' + T.done;
        if (showSteps && !a.classList.contains('btn-small')) {
          var box = a.closest('.actions') || a.parentNode;
          if (!box.parentNode.querySelector('.install-steps')) {
            var d = document.createElement('div');
            d.className = 'install-steps'; d.setAttribute('role', 'status');
            d.innerHTML = '<strong>' + T.head + '</strong><ol><li>' + T.s1 + '</li><li>' + T.s2 + '</li><li>' + T.s3 + '</li></ol>';
            box.parentNode.insertBefore(d, box.nextSibling);
          }
        }
        // The steps are now the next move, so the button steps back: it becomes a quiet "Download again"
        // instead of returning to "Download free", which would read as if nothing happened.
        setTimeout(function () {
          a.classList.remove('is-done', 'btn-primary', 'btn-light');
          a.classList.add('btn-quiet');
          a.innerHTML = T.again; a.style.minWidth = '';
        }, 4000);
      }, 1500);
    });
  }
})();
