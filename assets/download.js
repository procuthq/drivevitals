/* On a Mac: the download starts as usual, the button says "Downloading…"
   for a moment, then "Downloaded" and shows how to install. No fake progress:
   the browser doesn't tell a page how far a download has got. */
(function () {
  var ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return;
  var ru = document.documentElement.lang === 'ru';
  var T = ru ? { busy: 'Загрузка…', done: 'Загрузка началась', head: 'Осталось три шага',
      s1: 'Откройте <b>DriveVitals.dmg</b> в папке «Загрузки».', s2: 'Перетащите DriveVitals в папку <b>«Программы»</b>.', s3: 'Откройте DriveVitals и нажмите на его значок в <b>строке меню</b>.' }
    : { busy: 'Downloading…', done: 'Download started', head: 'Three steps to go',
      s1: 'Open <b>DriveVitals.dmg</b> from your Downloads.', s2: 'Drag DriveVitals into <b>Applications</b>.', s3: 'Open DriveVitals and click its icon in the <b>menu bar</b>.' };
  var showSteps = !document.querySelector('.beta-steps'); // beta pages already list the steps
  var links = document.querySelectorAll('a[href*="DriveVitals.dmg"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      var a = this;
      if (a.classList.contains('is-busy') || a.classList.contains('is-done')) return;
      var label = a.textContent, w = a.offsetWidth;
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
        setTimeout(function () { a.classList.remove('is-done'); a.innerHTML = label; a.style.minWidth = ''; }, 6000);
      }, 1500);
    });
  }
})();
