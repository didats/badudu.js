// badudu.js v1.0.0 | (cl) 2014 @lantip - ArdWort
prefix = "badudujs-";

function removeThis() {
    document.getElementById(prefix+"bdModal").remove()
}

function removeThat() {
    document.getElementById(prefix+"ldModal").remove()
}

function DocDblClickHandler(e) {
    pos_x = e.offsetX ? e.offsetX : e.pageX;
    pos_y = e.offsetY ? e.offsetY : e.pageY;
    var t = "";

    if (window.getSelection) {
        t = window.getSelection();
    } else if (document.getSelection) {
        t = document.getSelection()
    } else if (document.selection) {
        t = document.selection.createRange().text
    }

    if (document.getElementById(prefix+"bdModal")) {
        removeThis()
    }

    var n = e.srcElement.nodeName;
    if (n.toString() != "INPUT" && n.toString() != "BUTTON" && n.toString() != "TEXTAREA" && n.toString() != "BODY") {
        if (t.toString().length > 1) {
            loadData(t.toString().replace(/\s/g, ""), pos_x, pos_y);
            var r = '<div id="'+prefix+'circularG">';
            r += '<div id="'+prefix+'circularG_1" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_2" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_3" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_4" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_5" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_6" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_7" class="'+prefix+'circularG"></div>';
            r += '<div id="'+prefix+'circularG_8" class="'+prefix+'circularG"></div>';
            r += '</div>';
            
            document.body.innerHTML += '<div id="'+prefix+'ldModal" style="position:fixed;z-index:999999998; top: 100px; left: 80px; background:rgba(0,0,0,0.1); color: #fff; margin: 0px; pading: 50px;">' + r + "</div>";
        }
    }
}

function loadData(txt, pos_x, pos_y) {
    Lib.ajax.getJSON({
        url: "http://geni.lantip.net:8183/api/" + txt,
        type: "jsonp"
    }, function (jsondata) {
        var obj = eval("(" + jsondata + ")");
        var def = "<ol>\n";
        for (var key in obj.kateglo.definition) {
            var newObj = obj.kateglo.definition[key];
            def += "<li>" + newObj.def_text + "</li>\n";
        }
        def += "</ol>\n\n";
        
        var res = "<div>" + "<h3>" + txt + '<small style="margin-left: 10px; border-left: 1px solid #ccc; padding-left: 10px; font-weight: 100; color: #666">' + obj.kateglo.lex_class + "</small></h3>" + def + "<p><small>sumber: " + obj.kateglo.ref_source + "</small></p>" + "</div>";
        document.getElementById(prefix+"ldModal").remove();
        document.body.innerHTML += '<div id="'+prefix+'bdModal" style="position:fixed;width:400px;height:300px;z-index:999999999; font-family: sans-serif; top: 100px; left: 80px; background:rgba(0,0,0,0.6); color: #fff; margin: 0px;"><a href="javascript:document.getElementById(\''+prefix+'bdModal\').remove()" style="color:#fff; padding: 10px; background-color: tomato; text-decoration: none; font-family: sans-serif">close</a><div style="padding: 20px; background-color: #fff; height: 250px; overflow-y: auto; color: #000">' + res + "</div></div>";
        return true
    })
}

document.ondblclick = DocDblClickHandler;

Element.prototype.remove = function () {
    this.parentElement.removeChild(this)
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var e = 0, t = this.length; e < t; e++) {
        if (this[e] && this[e].parentElement) {
            this[e].parentElement.removeChild(this[e])
        }
    }
};
(function () {
    var e = {
        ajax: {
            xhr: function () {
                var e = new XMLHttpRequest;
                return e
            },
            getJSON: function (e, t) {
                var n = this.xhr();
                e.url = e.url || location.href;
                e.data = e.data || null;
                t = t || function () {};
                e.type = e.type || "json";
                var r = e.url;
                if (e.type == "jsonp") {
                    window.jsonCallback = t;
                    var i = r.replace("callback=?", "callback=jsonCallback");
                    var s = document.createElement("script");
                    s.src = i;
                    document.body.appendChild(s)
                }
                n.open("GET", e.url, true);
                n.send(e.data);
                n.onreadystatechange = function () {
                    if (n.status == 200 && n.readyState == 4) {
                        t(n.responseText)
                    }
                }
            }
        }
    };
    window.Lib = e
})()