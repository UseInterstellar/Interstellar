function blank(){
let inFrame
try {
    inFrame = window !== top
} catch (e) {
    inFrame = true
}
if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank")
    if (!popup || popup.closed) {
        alert("Popups are disabled!")
    } else {
        const doc = popup.document
        const iframe = doc.createElement("iframe")
        const style = iframe.style
        const link = doc.createElement("link")
        doc.title = "Google Classroom"
        link.rel = "icon";
        link.href = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
        iframe.src = location.href
        style.position = "fixed"
        style.top = style.bottom = style.left = style.right = 0
        style.border = style.outline = "none"
        style.width = style.height = "100%"
        doc.body.appendChild(iframe)
        location.replace("https://google.com")
    }
}
//made by Bigfoot9999
function clockTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClock").innerText = time;
    document.getElementById("MyClock").textContent = time;
    
    setTimeout(clockTime, 1000);
    
};
clockTime();
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const exploit = document.getElementById('exploit').value;
      const siteload = window.open('about:blank', '_blank');
      const doc1 = siteload.document;
      const iframe1 = doc1.createElement('iframe');
      const style1 = iframe1.style;
      const link1 = doc1.createElement('link');
      
      doc1.title = 'Google Drive';
      iframe1.src = exploit;
      style1.position = 'fixed';
      style1.border = style1.outline = 'none';
      style1.top = style1.bottom = style1.left = style1.right = 0;
      style1.width = style1.height = '100%';
      link1.rel = 'icon';
      link1.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
      
      doc1.body.appendChild(iframe1);
    }
});
}
//detect iframe first
var txt;
if (window.frameElement) {
    //yes i frame SO DONT DO ANYTHING because we already asked
   
}
else {
    //no iframe we should ask them
    promptalert();
}

function openGame() {
    var win = window.open() 
    var url = "https://4.interstellardev.repl.co/apps/discord.html"
    var iframe = win.document.createElement('iframe')
    iframe.style.width = "100%  ";
    iframe.style.height = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.bottom = "0";
    iframe.style.left = "0";
    iframe.style.left = "0";
    iframe.style.border = "none";
    iframe.style.backgroundcolor = "black"
    iframe.src = url
    win.document.body.appendChild(iframe)
    }

    function discServer1() {
        var win = window.open() 
        var url = "https://3.interstellardev.repl.co/apps/discord.html"
        var iframe = win.document.createElement('iframe')
        iframe.style.width = "100%  ";
        iframe.style.height = "100%";
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.bottom = "0";
        iframe.style.left = "0";
        iframe.style.left = "0";
        iframe.style.border = "none";
        iframe.style.backgroundcolor = "black"
        iframe.src = url
        win.document.body.appendChild(iframe)
        }

        function discServer2() {
            var win = window.open() 
            var url = "https://5.interstellardev.repl.co/apps/discord.html"
            var iframe = win.document.createElement('iframe')
            iframe.style.width = "100%  ";
            iframe.style.height = "100%";
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.bottom = "0";
            iframe.style.left = "0";
            iframe.style.left = "0";
            iframe.style.border = "none";
            iframe.style.backgroundcolor = "black"
            iframe.src = url
            win.document.body.appendChild(iframe)
            }

            function discServer3() {
                var win = window.open() 
                var url = "https://43f97abf-fcf9-4dc7-911a-cb31f2dcba51.id.repl.co/apps/discord.html"
                var iframe = win.document.createElement('iframe')
                iframe.style.width = "100%  ";
                iframe.style.height = "100%";
                iframe.style.position = "fixed";
                iframe.style.top = "0";
                iframe.style.bottom = "0";
                iframe.style.left = "0";
                iframe.style.left = "0";
                iframe.style.border = "none";
                iframe.style.backgroundcolor = "black"
                iframe.src = url
                win.document.body.appendChild(iframe)
                }


                function discServer4() {
                    var win = window.open() 
                    var url = "https://84e60825-0a74-4156-88f6-1be1e2680f72.id.repl.co/apps/discord.html"
                    var iframe = win.document.createElement('iframe')
                    iframe.style.width = "100%  ";
                    iframe.style.height = "100%";
                    iframe.style.position = "fixed";
                    iframe.style.top = "0";
                    iframe.style.bottom = "0";
                    iframe.style.left = "0";
                    iframe.style.left = "0";
                    iframe.style.border = "none";
                    iframe.style.backgroundcolor = "black"
                    iframe.src = url
                    win.document.body.appendChild(iframe)
                    }
            

                    https://044e0027-06c6-4568-8412-8b5e8c72270d.id.repl.co/apps/discord.html



function discServer5() {
                    var win = window.open() 
                    var url = "https://044e0027-06c6-4568-8412-8b5e8c72270d.id.repl.co/apps/discord.html                    "
                    var iframe = win.document.createElement('iframe')
                    iframe.style.width = "100%  ";
                    iframe.style.height = "100%";
                    iframe.style.position = "fixed";
                    iframe.style.top = "0";
                    iframe.style.bottom = "0";
                    iframe.style.left = "0";
                    iframe.style.left = "0";
                    iframe.style.border = "none";
                    iframe.style.backgroundcolor = "black"
                    iframe.src = url
                    win.document.body.appendChild(iframe)
                    }

                    
            
                    function bitersIO() {
                        var win = window.open() 
                        var url = "https://zayaruzostreetorgan.com/uploads/5/5/6/7/5567194/custom_themes/666344820848380631/biters-io.html"
                        var iframe = win.document.createElement('iframe')
                        iframe.style.width = "100%  ";
                        iframe.style.height = "100%";
                        iframe.style.position = "fixed";
                        iframe.style.top = "0";
                        iframe.style.bottom = "0";
                        iframe.style.left = "0";
                        iframe.style.left = "0";
                        iframe.style.border = "none";
                        iframe.style.backgroundcolor = "black"
                        iframe.src = url
                        win.document.body.appendChild(iframe)
                        }

                        function discServer6() {
                            var win = window.open() 
                            var url = "https://x.interstellardev.repl.co/apps/discord.html"
                            var iframe = win.document.createElement('iframe')
                            iframe.style.width = "100%  ";
                            iframe.style.height = "100%";
                            iframe.style.position = "fixed";
                            iframe.style.top = "0";
                            iframe.style.bottom = "0";
                            iframe.style.left = "0";
                            iframe.style.left = "0";
                            iframe.style.border = "none";
                            iframe.style.backgroundcolor = "black"
                            iframe.src = url
                            win.document.body.appendChild(iframe)
                            }

                            function browserServer1() {
                                var win = window.open() 
                                var url = "https://z.interstellardev.repl.co/apps/browser.html"
                                var iframe = win.document.createElement('iframe')
                                iframe.style.width = "100%  ";
                                iframe.style.height = "100%";
                                iframe.style.position = "fixed";
                                iframe.style.top = "0";
                                iframe.style.bottom = "0";
                                iframe.style.left = "0";
                                iframe.style.left = "0";
                                iframe.style.border = "none";
                                iframe.style.backgroundcolor = "black"
                                iframe.src = url
                                win.document.body.appendChild(iframe)
                                }


                                function browserServer2() {
                                    var win = window.open() 
                                    var url = "https://588b8764-d3aa-4884-b491-64309c6828c5.id.repl.co/apps/browser.html"
                                    var iframe = win.document.createElement('iframe')
                                    iframe.style.width = "100%  ";
                                    iframe.style.height = "100%";
                                    iframe.style.position = "fixed";
                                    iframe.style.top = "0";
                                    iframe.style.bottom = "0";
                                    iframe.style.left = "0";
                                    iframe.style.left = "0";
                                    iframe.style.border = "none";
                                    iframe.style.backgroundcolor = "black"
                                    iframe.src = url
                                    win.document.body.appendChild(iframe)
                                    }

                                    function browserServer3() {
                                        var win = window.open() 
                                        var url = "https://y.interstellardev.repl.co/apps/browser.html"
                                        var iframe = win.document.createElement('iframe')
                                        iframe.style.width = "100%  ";
                                        iframe.style.height = "100%";
                                        iframe.style.position = "fixed";
                                        iframe.style.top = "0";
                                        iframe.style.bottom = "0";
                                        iframe.style.left = "0";
                                        iframe.style.left = "0";
                                        iframe.style.border = "none";
                                        iframe.style.backgroundcolor = "black"
                                        iframe.src = url
                                        win.document.body.appendChild(iframe)
                                        }

                                        function yohohoServer1() {
                                            var win = window.open() 
                                            var url = "https://y.interstellardev.repl.co/apps/browser.html"
                                            var iframe = win.document.createElement('iframe')
                                            iframe.style.width = "100%  ";
                                            iframe.style.height = "100%";
                                            iframe.style.position = "fixed";
                                            iframe.style.top = "0";
                                            iframe.style.bottom = "0";
                                            iframe.style.left = "0";
                                            iframe.style.left = "0";
                                            iframe.style.border = "none";
                                            iframe.style.backgroundcolor = "black"
                                            iframe.src = url
                                            win.document.body.appendChild(iframe)
                                            }

                                            function yohohoServer2() {
                                                var win = window.open() 
                                                var url = "https://yohoho.interstellardev.repl.co/apps/browser.html"
                                                var iframe = win.document.createElement('iframe')
                                                iframe.style.width = "100%  ";
                                                iframe.style.height = "100%";
                                                iframe.style.position = "fixed";
                                                iframe.style.top = "0";
                                                iframe.style.bottom = "0";
                                                iframe.style.left = "0";
                                                iframe.style.left = "0";
                                                iframe.style.border = "none";
                                                iframe.style.backgroundcolor = "black"
                                                iframe.src = url
                                                win.document.body.appendChild(iframe)
                                                }

                                                function yohohoServer3() {
                                                    var win = window.open() 
                                                    var url = "https://06550011-d173-4c6a-8421-f4d9e285f9c5.id.repl.co/play/web/yohoho.html"
                                                    var iframe = win.document.createElement('iframe')
                                                    iframe.style.width = "100%  ";
                                                    iframe.style.height = "100%";
                                                    iframe.style.position = "fixed";
                                                    iframe.style.top = "0";
                                                    iframe.style.bottom = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.border = "none";
                                                    iframe.style.backgroundcolor = "black"
                                                    iframe.src = url
                                                    win.document.body.appendChild(iframe)
                                                    }

                                                    function widgetBot() {
                                                        var win = window.open() 
                                                        var url = "https://e.widgetbot.io/channels/938658733788131399/939603411366731807"
                                                        var iframe = win.document.createElement('iframe')
                                                        iframe.style.width = "100%  ";
                                                        iframe.style.height = "100%";
                                                        iframe.style.position = "fixed";
                                                        iframe.style.top = "0";
                                                        iframe.style.bottom = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.border = "none";
                                                        iframe.style.backgroundcolor = "black"
                                                        iframe.src = url
                                                        win.document.body.appendChild(iframe)
                                                        }

                                                        function newTab() {
                                                            window.open(
                                                            "https://forms.gle/2UPQRKSdNaz7okaPA", "_blank");
                                                        }

                                                        

                                                        
                                                    function cheatNetwork1() {
                                                        var win = window.open() 
                                                        var url = "https://cheatnetwork.eu/"
                                                        var iframe = win.document.createElement('iframe')
                                                        iframe.style.width = "100%  ";
                                                        iframe.style.height = "100%";
                                                        iframe.style.position = "fixed";
                                                        iframe.style.top = "0";
                                                        iframe.style.bottom = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.border = "none";
                                                        iframe.style.backgroundcolor = "black"
                                                        iframe.src = url
                                                        win.document.body.appendChild(iframe)
                                                        }

                                                        function cheatNetwork2() {
                                                            var win = window.open() 
                                                            var url = "https://cn.interstellardev.repl.co/exploits/cn.html"
                                                            var iframe = win.document.createElement('iframe')
                                                            iframe.style.width = "100%  ";
                                                            iframe.style.height = "100%";
                                                            iframe.style.position = "fixed";
                                                            iframe.style.top = "0";
                                                            iframe.style.bottom = "0";
                                                            iframe.style.left = "0";
                                                            iframe.style.left = "0";
                                                            iframe.style.border = "none";
                                                            iframe.style.backgroundcolor = "black"
                                                            iframe.src = url
                                                            win.document.body.appendChild(iframe)
                                                            }

                                                            function cheatNetwork3() {
                                                                var win = window.open() 
                                                                var url = "https://mathplayground.cf/exploits/cn2.html"
                                                                var iframe = win.document.createElement('iframe')
                                                                iframe.style.width = "100%  ";
                                                                iframe.style.height = "100%";
                                                                iframe.style.position = "fixed";
                                                                iframe.style.top = "0";
                                                                iframe.style.bottom = "0";
                                                                iframe.style.left = "0";
                                                                iframe.style.left = "0";
                                                                iframe.style.border = "none";
                                                                iframe.style.backgroundcolor = "black"
                                                                iframe.src = url
                                                                win.document.body.appendChild(iframe)
                                                                }
                                    
                                    function Shockers1() {
                                        var win = window.open() 
                                        var url = "https://algebra.best/"
                                        var iframe = win.document.createElement('iframe')
                                        iframe.style.width = "100%  ";
                                        iframe.style.height = "100%";
                                        iframe.style.position = "fixed";
                                        iframe.style.top = "0";
                                        iframe.style.bottom = "0";
                                        iframe.style.left = "0";
                                        iframe.style.left = "0";
                                        iframe.style.border = "none";
                                        iframe.style.backgroundcolor = "black"
                                        iframe.src = url
                                        win.document.body.appendChild(iframe)
                                        }

                                        function Shockers2() {
                                            var win = window.open() 
                                            var url = "https://algebra.vip/"
                                            var iframe = win.document.createElement('iframe')
                                            iframe.style.width = "100%  ";
                                            iframe.style.height = "100%";
                                            iframe.style.position = "fixed";
                                            iframe.style.top = "0";
                                            iframe.style.bottom = "0";
                                            iframe.style.left = "0";
                                            iframe.style.left = "0";
                                            iframe.style.border = "none";
                                            iframe.style.backgroundcolor = "black"
                                            iframe.src = url
                                            win.document.body.appendChild(iframe)
                                            }

                                            function Shockers3() {
                                                var win = window.open() 
                                                var url = "https://biologyclass.club/"
                                                var iframe = win.document.createElement('iframe')
                                                iframe.style.width = "100%  ";
                                                iframe.style.height = "100%";
                                                iframe.style.position = "fixed";
                                                iframe.style.top = "0";
                                                iframe.style.bottom = "0";
                                                iframe.style.left = "0";
                                                iframe.style.left = "0";
                                                iframe.style.border = "none";
                                                iframe.style.backgroundcolor = "black"
                                                iframe.src = url
                                                win.document.body.appendChild(iframe)
                                                }

                                                function Shockers4() {
                                                    var win = window.open() 
                                                    var url = "https://deadlyegg.com"
                                                    var iframe = win.document.createElement('iframe')
                                                    iframe.style.width = "100%  ";
                                                    iframe.style.height = "100%";
                                                    iframe.style.position = "fixed";
                                                    iframe.style.top = "0";
                                                    iframe.style.bottom = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.border = "none";
                                                    iframe.style.backgroundcolor = "black"
                                                    iframe.src = url
                                                    win.document.body.appendChild(iframe)
                                                    }
    

                                                        function Shockers5() {
                                                    var win = window.open() 
                                                    var url = "https://deathegg.world"
                                                    var iframe = win.document.createElement('iframe')
                                                    iframe.style.width = "100%  ";
                                                    iframe.style.height = "100%";
                                                    iframe.style.position = "fixed";
                                                    iframe.style.top = "0";
                                                    iframe.style.bottom = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.left = "0";
                                                    iframe.style.border = "none";
                                                    iframe.style.backgroundcolor = "black"
                                                    iframe.src = url
                                                    win.document.body.appendChild(iframe)
                                                    }

                                                    function Shockers6() {
                                                        var win = window.open() 
                                                        var url = "https://egg.dance"
                                                        var iframe = win.document.createElement('iframe')
                                                        iframe.style.width = "100%  ";
                                                        iframe.style.height = "100%";
                                                        iframe.style.position = "fixed";
                                                        iframe.style.top = "0";
                                                        iframe.style.bottom = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.left = "0";
                                                        iframe.style.border = "none";
                                                        iframe.style.backgroundcolor = "black"
                                                        iframe.src = url
                                                        win.document.body.appendChild(iframe)
                                                        }

                                                        function Shockers7() {
                                                            var win = window.open() 
                                                            var url = "https://eggcombat.com"
                                                            var iframe = win.document.createElement('iframe')
                                                            iframe.style.width = "100%  ";
                                                            iframe.style.height = "100%";
                                                            iframe.style.position = "fixed";
                                                            iframe.style.top = "0";
                                                            iframe.style.bottom = "0";
                                                            iframe.style.left = "0";
                                                            iframe.style.left = "0";
                                                            iframe.style.border = "none";
                                                            iframe.style.backgroundcolor = "black"
                                                            iframe.src = url
                                                            win.document.body.appendChild(iframe)
                                                            }

                                                            function Shockers8() {
                                                                var win = window.open() 
                                                                var url = "https://eggfacts.fun"
                                                                var iframe = win.document.createElement('iframe')
                                                                iframe.style.width = "100%  ";
                                                                iframe.style.height = "100%";
                                                                iframe.style.position = "fixed";
                                                                iframe.style.top = "0";
                                                                iframe.style.bottom = "0";
                                                                iframe.style.left = "0";
                                                                iframe.style.left = "0";
                                                                iframe.style.border = "none";
                                                                iframe.style.backgroundcolor = "black"
                                                                iframe.src = url
                                                                win.document.body.appendChild(iframe)
                                                                }

                                                                function Shockers9() {
                                                                    var win = window.open() 
                                                                    var url = "https://egghead.institute"
                                                                    var iframe = win.document.createElement('iframe')
                                                                    iframe.style.width = "100%  ";
                                                                    iframe.style.height = "100%";
                                                                    iframe.style.position = "fixed";
                                                                    iframe.style.top = "0";
                                                                    iframe.style.bottom = "0";
                                                                    iframe.style.left = "0";
                                                                    iframe.style.left = "0";
                                                                    iframe.style.border = "none";
                                                                    iframe.style.backgroundcolor = "black"
                                                                    iframe.src = url
                                                                    win.document.body.appendChild(iframe)
                                                                    }

                                                                    function Shockers10() {
                                                                        var win = window.open() 
                                                                        var url = "https://eggisthenewblack.com"
                                                                        var iframe = win.document.createElement('iframe')
                                                                        iframe.style.width = "100%  ";
                                                                        iframe.style.height = "100%";
                                                                        iframe.style.position = "fixed";
                                                                        iframe.style.top = "0";
                                                                        iframe.style.bottom = "0";
                                                                        iframe.style.left = "0";
                                                                        iframe.style.left = "0";
                                                                        iframe.style.border = "none";
                                                                        iframe.style.backgroundcolor = "black"
                                                                        iframe.src = url
                                                                        win.document.body.appendChild(iframe)
                                                                        }
                                                                        function gfn1() {
                                                                            var win = window.open() 
                                                                            var url = "https://de4b1d12-8131-4647-a7ee-f2178ba46623.id.repl.co/-/id.html"
                                                                            var iframe = win.document.createElement('iframe')
                                                                            iframe.style.width = "100%  ";
                                                                            iframe.style.height = "100%";
                                                                            iframe.style.position = "fixed";
                                                                            iframe.style.top = "0";
                                                                            iframe.style.bottom = "0";
                                                                            iframe.style.left = "0";
                                                                            iframe.style.left = "0";
                                                                            iframe.style.border = "none";
                                                                            iframe.style.backgroundcolor = "black"
                                                                            iframe.src = url
                                                                            win.document.body.appendChild(iframe)
                                                                            }

                                                                            function gfn2() {
                                                                                var win = window.open() 
                                                                                var url = "https://gfn.interstellardev.repl.co/-/co.html"
                                                                                var iframe = win.document.createElement('iframe')
                                                                                iframe.style.width = "100%  ";
                                                                                iframe.style.height = "100%";
                                                                                iframe.style.position = "fixed";
                                                                                iframe.style.top = "0";
                                                                                iframe.style.bottom = "0";
                                                                                iframe.style.left = "0";
                                                                                iframe.style.left = "0";
                                                                                iframe.style.border = "none";
                                                                                iframe.style.backgroundcolor = "black"
                                                                                iframe.src = url
                                                                                win.document.body.appendChild(iframe)
                                                                                }

                                       
                                                                        