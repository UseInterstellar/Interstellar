self.__dynamic$config = {
    prefix: "/~/dynamic/",
    encoding: "xor",
    mode: "production",
    bare: {
        version: 3,
        path: "/bare/"
    },
    tab: {
        title: "Service",
        icon: null,
        ua: null
    },
    assets: {
        prefix: "/sw/dynamic/",
        files: {
            handler: "dynamic.handler.js",
            client: "dynamic.client.js",
            worker: "dynamic.worker.js",
            config: "dynamic.config.js",
            inject: null
        }
    },
    block: []
},
"object" != typeof window || window.parent.location.href.includes("/~/dynamic/") && window.top != window || fetch(location.origin + "/js/inject.js?sw=ignore").then(async e=>{
    let t = await e.text()
      , n = document.createElement("script");
    function a() {
        var e = document.createElement("div");
        e.style.display = "none";
        let t = e.attachShadow({
            mode: "open"
        });
        t.append(n),
        self.frameElement && !self.frameElement.classList.contains("tab-frame") && (self.frameElement.style.display = "block"),
        document.body.appendChild(e)
    }
    n.type = "module",
    n.textContent = t,
    "complete" == document.readyState || "interactive" == document.readyState ? a() : document.addEventListener("readystatechange", ()=>{
        ("complete" == document.readyState || "interactive" == document.readyState) && a()
    }
    )
}
);
