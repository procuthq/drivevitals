/* On iPhone, iPad and Android, a Mac download is useless: turn every
   "Download" button into "Send to my Mac", which opens the share sheet
   (Mail, Messages, AirDrop, Telegram...) with this page's link. */
(function () {
  var ua = navigator.userAgent;
  var mobile = /iPhone|iPad|iPod|Android/i.test(ua) ||
               (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1); // iPadOS
  if (!mobile) return;
  var url = location.origin + location.pathname;
  var ru = document.documentElement.lang === 'ru';
  var T = ru ? { small: 'На Mac', big: 'Отправить на Mac', subj: 'DriveVitals для моего Mac', body: 'Скачать DriveVitals на Mac: ', title: 'DriveVitals для Mac', text: 'Скачать DriveVitals на Mac', note: 'DriveVitals — приложение для Mac. Отправьте себе ссылку и скачайте его на Mac.' }
             : { small: 'Send to Mac', big: 'Send to my Mac', subj: 'DriveVitals for my Mac', body: 'Download DriveVitals on your Mac: ', title: 'DriveVitals for Mac', text: 'Download DriveVitals on your Mac', note: 'DriveVitals is a Mac app. Send yourself the link, then download it on your Mac.' };
  var links = document.querySelectorAll('a[href*="DriveVitals.dmg"]');
  if (!links.length) return;
  for (var i = 0; i < links.length; i++) {
    (function (a) {
      a.textContent = a.classList.contains('btn-small') ? T.small : T.big;
      var ev = a.getAttribute('data-goatcounter-click');
      if (ev) a.setAttribute('data-goatcounter-click', ev.replace('download', 'send-to-mac'));
      a.href = 'mailto:?subject=' + encodeURIComponent(T.subj) +
               '&body=' + encodeURIComponent(T.body + url);
      a.addEventListener('click', function (e) {
        if (navigator.share) {
          e.preventDefault();
          navigator.share({ title: T.title, text: T.text, url: url })
            .catch(function () {});
        }
      });
    })(links[i]);
  }
  var first = links[0].classList.contains('btn-small') && links[1] ? links[1] : links[0];
  var box = first.closest('.actions') || first.parentNode;
  var note = document.createElement('p');
  note.className = 'fine send-note';
  note.textContent = T.note;
  box.parentNode.insertBefore(note, box.nextSibling);
})();
