/* 禁止控制台 */
/* --------------------------------------------------------------------------------------------------- */
//禁止浏览器默认右键菜单
document.oncontextmenu = function (event) {
    event.preventDefault();
};
//禁止文本选中
/*if (document.all) {
  document.onselectstart = function() {
    return false;
  }; //for ie
} else {
  document.onmousedown = function() {
    return false;
  };
  document.onmouseup = function() {
    return true;
  };
}
document.onselectstart = new Function('event.returnValue=false;');*/

//禁止copy
/*document.oncopy = function(event) {
  if (window.event) {
    event = window.event;
  }
  try {
    var the = event.srcElement;
    if (
      !((the.tagName == 'INPUT' && the.type.toLowerCase() == 'text') || the.tagName == 'TEXTAREA')
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};*/

//禁止通过F12来打开
document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e && e.keyCode == 123) {
        e.returnValue = false;
        return false;
    }
};

var ConsoleManager = {
    onOpen: function () {
        alert('Console is opened');
    },
    onClose: function () {
        alert('Console is closed');
    },
    init: function () {
        var self = this;
        var x = document.createElement('div');
        var isOpening = false,
            isOpened = false;
        Object.defineProperty(x, 'id', {
            get: function () {
                if (!isOpening) {
                    self.onOpen();
                    isOpening = true;
                }
                isOpened = true;
            },
        });

        setInterval(function () {
            isOpened = false;
            console.info(x);
            console.clear();
            if (!isOpened && isOpening) {
                self.onClose();
                isOpening = false;
            }
        }, 200);
    },
};

//打开控制台，跳转到其他页面
ConsoleManager.onOpen = function () {
    try {
        window.location.href = '/404';
    } catch (err) {
        window.location.href = '/404';
        var a = document.createElement('button');
        a.onclick = function () {
            window.location.href = '/404';
        };
        a.click();
    }
};
ConsoleManager.onClose = function () {
    alert('Console is closed!!!!!');
};
ConsoleManager.init();