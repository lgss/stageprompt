/**
 * Record download events
 * Description: a single click event handler for all download links that pushes the download event to GA
 * @return {null}
 */
$('body').delegate('a[href$=".pdf"],a[href$=".doc"],a[href$=".docx"],a[href$=".xls"],a[href$=".xlsx"]','click',function(e){
  if(this.pathname) {
    var ctgry = 'download',
        evt = this.pathname.split('.').pop(), // get file extension
        lbl = this.pathname; // relative url of the file

    // send event to GA
    if (window.ga && typeof(window.ga) === 'function') {
      ga('send', 'event', ctgry, evt, lbl);
    } else {
      _gaq.push(['_trackEvent', ctgry, evt, lbl, undefined, true]);
    }
  }
});