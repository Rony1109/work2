define(function(require, exports, module) {

  $('#contentBd').delegate('.page a[data-start]', 'click', function(event) {
    event.preventDefault();
    var start = $(this).data('start');
    if (/start\=/.test(location.hash)) {
      location.hash = location.hash.replace(/start=(\d+)/, 'start=' + start);
    } else {
      location.hash = location.hash + '&start=' + start;
    }
  });

  var showPages = 5;

  module.exports = function(start, total, data) {
    var pageNum = data['pageSize'] || 10; //每页显示条数
    var html = '';
    if (pageNum >= total) {
      return html;
    }

    html += '<div class="page">';

    if (data['has_prePage']) {
      html += '<a href="javascript:" class="prev" data-start="' + (data['pageIndex'] - 2) * pageNum + '">上一页</a>';
    } else {
      html += '<span class="prev">上一页</span>';
    }

    if (data['totalPages'] < (showPages + 1)) {
      for (var i = 1; i <= data['totalPages']; i++) {
        if (i != data['pageIndex']) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        } else {
          html += '<span class="active">' + i + '</span>';
        }
      }
    } else {
      if (data['pageIndex'] < (showPages - 1)) {
        for (var i = 1; i < data['pageIndex']; i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
        html += '<span class="active">' + data['pageIndex'] + '</span>';
        for (var i = (data['pageIndex'] + 1); i < showPages; i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
        html += '<span class="break">...</span><a href="javascript:" data-start="' + (data['totalPages'] - 1) * pageNum + '">' + data['totalPages'] + '</a>';
      } else if (data['pageIndex'] > (data['totalPages'] - (showPages - 2))) {
        html += '<a href="javascript:" data-start="0">1</a><span class="break">...</span>';
        for (var i = (data['totalPages'] - (showPages - 2)); i < data['pageIndex']; i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
        html += '<span class="active">' + data['pageIndex'] + '</span>';
        for (var i = (data['pageIndex'] + 1); i <= data['totalPages']; i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
      } else {
        html += '<a href="javascript:" data-start="0">1</a><span class="break">...</span>';
        for (var i = (data['pageIndex'] - parseInt(showPages / 2) + 1); i < data['pageIndex']; i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
        html += '<span class="active">' + data['pageIndex'] + '</span>';
        for (var i = (data['pageIndex'] + 1); i < (data['pageIndex'] + parseInt(showPages / 2)); i++) {
          html += '<a href="javascript:" data-start="' + (i - 1) * pageNum + '">' + i + '</a>';
        }
        html += '<span class="break">...</span><a href=javascript:" data-start="' + (data['totalPages'] - 1) * pageNum + '">' + data['totalPages'] + '</a>';
      }
    }

    if (data['has_nextPage']) {
      html += '<a href="javascript:" class="next" data-start="' + data['pageIndex'] * pageNum + '">下一页</a>';
    } else {
      html += '<span class="next">下一页</span>';
    }

    html += '</div>';
    return html;
  };
});