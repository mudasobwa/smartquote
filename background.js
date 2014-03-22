/** Returns a handler which will copy the image data to clipboard */
function getClickHandler() {
  return function(info, tab) {
    var html =  "<blockquote cite='" + info.pageUrl + "'>¶";
    var title = tab.title ? tab.title : info.pageUrl
    var favicon = tab.favIconUrl ? "<img style='margin-bottom:-2px;' src='" + tab.favIconUrl + "'> ": ""
    if (info.srcUrl) { // IMAGE
      // TODO: downscale image if it is wider than 500px
      html += "<figure><img src='" + info.srcUrl + "' alt='" + info.srcUrl + "'>¶" +
                "<figcaption>¶" +
                  "<p style='color:#999;'><small>  " + favicon + "<a href='" + info.pageUrl + "'>" + title + "</a></small></p>¶" +
                "</figcaption>¶" +
              "</figure>¶";

    } else { // TEXT
      html += "<p>" + info.selectionText + "</p>¶" +
              "<small>—  " + favicon + "<a href='" + info.pageUrl + "'>" + title + "</a></small>¶";
    }
    html += "</blockquote>¶"
    html = html.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/¶/g,'<br>')

    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = html;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand('Copy', false, null);
    document.body.removeChild(copyDiv);
  };
};

/** Create a context menu which will only show up for images and selections. */
chrome.contextMenus.create({
  "title" : chrome.i18n.getMessage("menuItemCaption"),
  "type" : "normal",
  "contexts" : ["image","selection"],
  "onclick" : getClickHandler()
});
