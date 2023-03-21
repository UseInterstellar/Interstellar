'use strict';

/** Define UI specific stuff.
 */
var UI = (function () {
  /** Resize the scrollable containers and make sure they are resized whenever
   * the window is resized.
   * Also introduce FastClick for faster clicking on mobile.
   */
  $(function() {
    FastClick.attach(document.body);    
    
    var resize = function() {
      var h = $(window).height();
      var offset = 111;
      if ($(window).width() < 992) {
        offset = 112;
      }
      $('.scrollable').height(h - offset + 'px');

      var types = ['research', 'hr', 'upgrades'];

      if ($(window).width() < 992) {
        for (var i = 0; i < types.length; i++) {
          if ($('#' + types[i] + 'Content').parent().attr('id') == types[i] + 'Large') {
            $('#' + types[i] + 'Content').detach().appendTo('#' + types[i]);
          }
        }
      } else {
        for (var i = 0; i < types.length; i++) {
          if ($('#' + types[i] + 'Content').parent().attr('id') != types[i] + 'Large') {
            $('#' + types[i] + 'Content').detach().appendTo('#' + types[i] + 'Large');
          }
        }
      }

      if ($(window).width() < 600) {
        var newWidth = Math.max($(window).width() - ($(window).height() - 90 + 10), 300);
        $('#column-lab').width($(window).width() - newWidth);
        $('#column-tabs').width(newWidth);
      } else {
        $('#column-lab').removeAttr('style');
        $('#column-tabs').removeAttr('style');
      }

      if ($(window).width() >= 1200) {
        if (detector.width != 500) {
          $('#detector').width(500).height(500);
          detector.init(500);
        }
      } else if ($(window).width() < 768 && $(window).height() - 90 < 300) {
        var newWidth = $(window).width() - Math.max($(window).width() - ($(window).height() - 90 + 10), 300) - 10;
        if (detector.width != newWidth) {
          $('#detector').width(newWidth).height(newWidth);
          detector.init(newWidth);
        }
      } else if ($(window).width() < 992) {
        if (detector.width != 300) {
          $('#detector').width(300).height(300);
          detector.init(300);
        }
      } else {
        if (detector.width != 400) {
          $('#detector').width(400).height(400);
          detector.init(400);
        }
      }
    }
    
    $(window).resize(resize);
    resize();
  });

  /** Show a bootstrap modal with dynamic content. */
  var showModal = function(title, text, level) {
    var $modal = $('#infoBox');
    $modal.find('#infoBoxLabel').html(title);
    $modal.find('.modal-body').html(text);
    $modal.modal({show: true});
  };

  /** Display only the elements with data-min-level above a certain
   * threshold.
   */
  var showLevels = function(level) {
    $('#infoBox').find('[data-min-level]').each(function() {
      if (level >= $(this).data('min-level')) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  };

  var showUpdateValue = function(ident, num) {
    if (num != 0) {
      var formatted = Helpers.formatNumberPostfix(num);
      var insert;
      if (num > 0) {
        insert = $("<div></div>")
                  .attr("class", "update-plus")
                  .html("+" + formatted);
      } else {
        insert = $("<div></div>")
                  .attr("class", "update-minus")
                  .html(formatted);
      }
      showUpdate(ident, insert);
    }
  }

  var showUpdate = function(ident, insert) {
    var elem = $(ident);
    elem.append(insert);
    insert.animate({
      "bottom":"+=30px",
      "opacity": 0
    }, { duration: 500, complete: function() {
      $(this).remove();
    }});
  }

  var showAchievement = function(obj) {
    var alert = '<div class="alert alert-success alert-dismissible" role="alert">';
    alert += '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
    alert += '<span class="fa ' + obj.icon + ' alert-glyph"></span> <span class="alert-text">' + obj.description + '</span>';
    alert += '</div>';

    alert = $(alert);

    $('#achievements-container').prepend(alert);
    var remove = function(a)
    {
      return function()
      {
        a.slideUp(300, function() { a.remove(); });
      };
    };

    window.setTimeout(remove(alert), 2000);
  }

  if (typeof $.cookie('cookielaw') === 'undefined') {
    var alert = '<div id="cookielaw" class="alert alert-info" role="alert">';
    alert += '<button type="button" class="btn btn-primary">OK</button>';
    alert += '<i class="fa fa-info-circle alert-glyph"></i> <span class="alert-text">Particle Clicker uses local storage to store your current progress.</span>';
    alert += '</div>';
    alert = $(alert);
    alert.find('button').click(function ()
    {
      $.cookie('cookielaw', 'informed', { expires: 365 });
      $('#cookielaw').slideUp(300, function() { $('#cookielaw').remove(); });
    })

    $('#messages-container').append(alert);
  }

  if (typeof $.cookie('cern60') === 'undefined') {
    var alert = '<div id="cern60" class="alert alert-info" role="alert">';
    alert += '<button type="button" class="btn btn-primary">Close</button>';
    alert += '<i class="fa fa-area-chart alert-glyph"></i> <span class="alert-text"><a class="alert-link" href="http://home.web.cern.ch/about/updates/2014/12/take-part-cern-60-public-computing-challenge" target="_blank">Join the CERN 60 computing challenge!</a></span>';
    alert += '</div>';
    alert = $(alert);
    alert.find('button').click(function ()
    {
      $.cookie('cern60', 'closed', { expires: 365 });
      $('#cern60').slideUp(300, function() { $('#cern60').remove(); });
    })

    $('#messages-container').append(alert);
  }

  return {
    showAchievement: showAchievement,
    showModal: showModal,
    showLevels: showLevels,
    showUpdateValue: showUpdateValue
  }
})();


// I don't know what this is for, so I leave it here for the moment...
(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        evt = evt || window.event;
        if (evt.type in evtMap)
            detector.visible = evtMap[evt.type] == 'visible';
        else        
            detector.visible = !this[hidden];
    }
})();
