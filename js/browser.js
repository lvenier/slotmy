(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        c = "undefined" !== typeof module && module.exports,
        b = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        f = function() {
            for (var b, c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], e = 0, d = c.length, r = {}; e < d; e++)
                if ((b = c[e]) && b[1] in a) {
                    for (e = 0; e < b.length; e++) r[c[0][e]] =
                        b[e];
                    return r
                }
            return !1
        }(),
        h = {
            change: f.fullscreenchange,
            error: f.fullscreenerror
        },
        q = {
            request: function(k) {
                var c = f.requestFullscreen;
                k = k || a.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) k[c]();
                else k[c](b && Element.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                a[f.exitFullscreen]()
            },
            toggle: function(a) {
                this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function(a) {
                this.on("change", a)
            },
            onerror: function(a) {
                this.on("error", a)
            },
            on: function(b, c) {
                var e = h[b];
                e && a.addEventListener(e, c, !1)
            },
            off: function(b,
                c) {
                var e = h[b];
                e && a.removeEventListener(e, c, !1)
            },
            raw: f
        };
    f ? (Object.defineProperties(q, {
        isFullscreen: {
            get: function() {
                return !!a[f.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[f.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function() {
                return !!a[f.fullscreenEnabled]
            }
        }
    }), c ? module.exports = q : window.screenfull = q) : c ? module.exports = !1 : window.screenfull = !1
})();

(function() {
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function c(a, d) {
        var b = -1,
            c = a ? a.length : 0;
        if ("number" == typeof c && -1 < c && c <= y)
            for (; ++b < c;) d(a[b], b, a);
        else f(a, d)
    }

    function b(d) {
        d = String(d).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(d) ? d : a(d)
    }

    function f(a, d) {
        for (var b in a) z.call(a, b) && d(a[b], b, a)
    }

    function h(d) {
        return null == d ? a(d) : B.call(d).slice(8, -1)
    }

    function q(a, d) {
        var b = null != a ? typeof a[d] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(b) &&
            ("object" == b ? !!a[d] : !0)
    }

    function k(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }

    function m(a, d) {
        var b = null;
        c(a, function(c, e) {
            b = d(b, c, e, a)
        });
        return b
    }

    function e(a) {
        function d(d) {
            return m(d, function(d, n) {
                var c = n.pattern || k(n);
                !d && (d = RegExp("\\b" + c + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + c + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + c + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((d = String(n.label && !RegExp(c, "i").test(n.label) ? n.label : d).split("/"))[1] && !/[\d.]+/.test(d[0]) && (d[0] +=
                    " " + d[1]), n = n.label || n, d = b(d[0].replace(RegExp(c, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return d
            })
        }

        function c(d) {
            return m(d, function(d, n) {
                return d || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var t = r,
            l = a && "object" == typeof a && "String" != h(a);
        l && (t = a, a = null);
        var x = t.navigator || {},
            n = x.userAgent || "";
        a || (a = n);
        var K = l ? !!x.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(B.toString()),
            L = l ? "Object" : "ScriptBridgingProxyObject",
            R = l ? "Object" : "Environment",
            M = l && t.java ? "JavaPackage" : h(t.java),
            u = l ? "Object" : "RuntimeObject";
        R = (M = /\bJava/.test(M) && t.java) && h(t.environment) == R;
        var E = M ? "a" : "\u03b1",
            A = M ? "b" : "\u03b2",
            y = t.document || {},
            z = t.operamini || t.opera,
            O = p.test(O = l && z ? z["[[Class]]"] : h(z)) ? O : z = null,
            g, P = a;
        l = [];
        var Q = null,
            J = a == n;
        n = J && z && "function" == typeof z.version && z.version();
        var C = function(d) {
                return m(d, function(d, n) {
                    return d || RegExp("\\b" + (n.pattern || k(n)) + "\\b", "i").exec(a) && (n.label ||
                        n)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            v = function(d) {
                return m(d, function(d, n) {
                    return d || RegExp("\\b" + (n.pattern || k(n)) + "\\b", "i").exec(a) && (n.label || n)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                    label: "Microsoft Edge",
                    pattern: "Edge"
                }, "Midori", "Nook Browser",
                "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                }, {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari"
            ]),
            D = d([{
                    label: "BlackBerry",
                    pattern: "BB10"
                }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                }, {
                    label: "Galaxy S5",
                    pattern: "SM-G900"
                }, {
                    label: "Galaxy S6",
                    pattern: "SM-G920"
                }, {
                    label: "Galaxy S6 Edge",
                    pattern: "SM-G925"
                }, {
                    label: "Galaxy S7",
                    pattern: "SM-G930"
                }, {
                    label: "Galaxy S7 Edge",
                    pattern: "SM-G935"
                }, "Google TV", "Lumia", "iPad",
                "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                }, "Xoom"
            ]),
            G = function(d) {
                return m(d, function(d, n, b) {
                    return d || (n[D] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(D)] || RegExp("\\b" + k(b) + "(?:\\b|\\w*\\d)", "i").exec(a)) && b
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            w = function(d) {
                return m(d, function(d, n) {
                    var c = n.pattern || k(n);
                    if (!d && (d = RegExp("\\b" + c + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                        var g = d,
                            e = n.label || n,
                            r = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME"
                            };
                        c && e && /^Win/i.test(g) && !/^Windows Phone /i.test(g) && (r = r[/[\d.]+$/.exec(g)]) && (g = "Windows " + r);
                        g = String(g);
                        c && e && (g = g.replace(RegExp(c, "i"), e));
                        d = g = b(g.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/,
                            " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return d
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac",
                "Windows 98;", "Windows "
            ]);
        C && (C = [C]);
        G && !D && (D = d([G]));
        if (g = /\bGoogle TV\b/.exec(D)) D = g[0];
        /\bSimulator\b/i.test(a) && (D = (D ? D + " " : "") + "Simulator");
        "Opera Mini" == v && /\bOPiOS\b/.test(a) && l.push("running in Turbo/Uncompressed mode");
        "IE" == v && /\blike iPhone OS\b/.test(a) ? (g = e(a.replace(/like iPhone OS/, "")), G = g.manufacturer, D = g.product) : /^iP/.test(D) ? (v || (v = "Safari"), w = "iOS" + ((g = / OS ([\d_]+)/i.exec(a)) ? " " + g[1].replace(/_/g, ".") : "")) : "Konqueror" != v || /buntu/i.test(w) ? G && "Google" != G && (/Chrome/.test(v) &&
            !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(D)) || /\bAndroid\b/.test(w) && /^Chrome/.test(v) && /\bVersion\//i.test(a) ? (v = "Android Browser", w = /\bAndroid\b/.test(w) ? w : "Android") : "Silk" == v ? (/\bMobi/i.test(a) || (w = "Android", l.unshift("desktop mode")), /Accelerated *= *true/i.test(a) && l.unshift("accelerated")) : "PaleMoon" == v && (g = /\bFirefox\/([\d.]+)\b/.exec(a)) ? l.push("identifying as Firefox " + g[1]) : "Firefox" == v && (g = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (w || (w = "Firefox OS"), D || (D = g[1])) : !v || (g = !/\bMinefield\b/i.test(a) &&
            /\b(?:Firefox|Safari)\b/.exec(v)) ? (v && !D && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(g + "/") + 8)) && (v = null), (g = D || G || w) && (D || G || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(w)) && (v = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(w) ? w : g) + " Browser")) : "Electron" == v && (g = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && l.push("Chromium " + g) : w = "Kubuntu";
        n || (n = c(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", k(v), "(?:Firefox|Minefield|NetFront)"]));
        if (g = "iCab" == C && 3 < parseFloat(n) && "WebKit" || /\bOpera\b/.test(v) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(C) && "WebKit" || !C && /\bMSIE\b/i.test(a) && ("Mac OS" == w ? "Tasman" : "Trident") || "WebKit" == C && /\bPlayStation\b(?! Vita\b)/i.test(v) && "NetFront") C = [g];
        "IE" == v && (g = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (v += " Mobile", w = "Windows Phone " + (/\+$/.test(g) ? g : g + ".x"), l.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (v = "IE Mobile", w = "Windows Phone 8.x",
            l.unshift("desktop mode"), n || (n = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != v && "Trident" == C && (g = /\brv:([\d.]+)/.exec(a)) && (v && l.push("identifying as " + v + (n ? " " + n : "")), v = "IE", n = g[1]);
        if (J) {
            if (q(t, "global"))
                if (M && (g = M.lang.System, P = g.getProperty("os.arch"), w = w || g.getProperty("os.name") + " " + g.getProperty("os.version")), R) {
                    try {
                        n = t.require("ringo/engine").version.join("."), v = "RingoJS"
                    } catch (T) {
                        (g = t.system) && g.global.system == t.system && (v = "Narwhal", w || (w = g[0].os || null))
                    }
                    v || (v = "Rhino")
                } else "object" == typeof t.process &&
                    !t.process.browser && (g = t.process) && ("object" == typeof g.versions && ("string" == typeof g.versions.electron ? (l.push("Node " + g.versions.node), v = "Electron", n = g.versions.electron) : "string" == typeof g.versions.nw && (l.push("Chromium " + n, "Node " + g.versions.node), v = "NW.js", n = g.versions.nw)), v || (v = "Node.js", P = g.arch, w = g.platform, n = (n = /[\d.]+/.exec(g.version)) ? n[0] : null));
            else h(g = t.runtime) == L ? (v = "Adobe AIR", w = g.flash.system.Capabilities.os) : h(g = t.phantom) == u ? (v = "PhantomJS", n = (g = g.version || null) && g.major + "." + g.minor +
                "." + g.patch) : "number" == typeof y.documentMode && (g = /\bTrident\/(\d+)/i.exec(a)) ? (n = [n, y.documentMode], (g = +g[1] + 4) != n[1] && (l.push("IE " + n[1] + " mode"), C && (C[1] = ""), n[1] = g), n = "IE" == v ? String(n[1].toFixed(1)) : n[0]) : "number" == typeof y.documentMode && /^(?:Chrome|Firefox)\b/.test(v) && (l.push("masking as " + v + " " + n), v = "IE", n = "11.0", C = ["Trident"], w = "Windows");
            w = w && b(w)
        }
        n && (g = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(n) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (J && x.appMinorVersion)) || /\bMinefield\b/i.test(a) &&
            "a") && (Q = /b/i.test(g) ? "beta" : "alpha", n = n.replace(RegExp(g + "\\+?$"), "") + ("beta" == Q ? A : E) + (/\d+\+?/.exec(g) || ""));
        if ("Fennec" == v || "Firefox" == v && /\b(?:Android|Firefox OS)\b/.test(w)) v = "Firefox Mobile";
        else if ("Maxthon" == v && n) n = n.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(D)) "Xbox 360" == D && (w = null), "Xbox 360" == D && /\bIEMobile\b/.test(a) && l.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(v) && (!v || D || /Browser|Mobi/.test(v)) || "Windows CE" != w && !/Mobi/i.test(a))
            if ("IE" == v && J) try {
                null === t.external &&
                    l.unshift("platform preview")
            } catch (T) {
                l.unshift("embedded")
            } else(/\bBlackBerry\b/.test(D) || /\bBB10\b/.test(a)) && (g = (RegExp(D.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || n) ? (g = [g, /BB10/.test(a)], w = (g[1] ? (D = null, G = "BlackBerry") : "Device Software") + " " + g[0], n = null) : this != f && "Wii" != D && (J && z || /Opera/.test(v) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == v && /\bOS X (?:\d+\.){2,}/.test(w) || "IE" == v && (w && !/^Win/.test(w) && 5.5 < n || /\bWindows XP\b/.test(w) && 8 < n || 8 == n && !/\bTrident\b/.test(a))) && !p.test(g =
                e.call(f, a.replace(p, "") + ";")) && g.name && (g = "ing as " + g.name + ((g = g.version) ? " " + g : ""), p.test(v) ? (/\bIE\b/.test(g) && "Mac OS" == w && (w = null), g = "identify" + g) : (g = "mask" + g, v = O ? b(O.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(g) && (w = null), J || (n = null)), C = ["Presto"], l.push(g));
            else v += " Mobile";
        if (g = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            g = [parseFloat(g.replace(/\.(\d)$/, ".0$1")), g];
            if ("Safari" == v && "+" == g[1].slice(-1)) v = "WebKit Nightly", Q = "alpha", n = g[1].slice(0, -1);
            else if (n == g[1] || n == (g[2] =
                    (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])) n = null;
            g[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == g[0] && 537.36 == g[2] && 28 <= parseFloat(g[1]) && "WebKit" == C && (C = ["Blink"]);
            J && (K || g[1]) ? (C && (C[1] = "like Chrome"), g = g[1] || (g = g[0], 530 > g ? 1 : 532 > g ? 2 : 532.05 > g ? 3 : 533 > g ? 4 : 534.03 > g ? 5 : 534.07 > g ? 6 : 534.1 > g ? 7 : 534.13 > g ? 8 : 534.16 > g ? 9 : 534.24 > g ? 10 : 534.3 > g ? 11 : 535.01 > g ? 12 : 535.02 > g ? "13+" : 535.07 > g ? 15 : 535.11 > g ? 16 : 535.19 > g ? 17 : 536.05 > g ? 18 : 536.1 > g ? 19 : 537.01 > g ? 20 : 537.11 > g ? "21+" : 537.13 > g ? 23 : 537.18 > g ? 24 : 537.24 > g ? 25 : 537.36 > g ? 26 : "Blink" !=
                C ? "27" : "28")) : (C && (C[1] = "like Safari"), g = (g = g[0], 400 > g ? 1 : 500 > g ? 2 : 526 > g ? 3 : 533 > g ? 4 : 534 > g ? "4+" : 535 > g ? 5 : 537 > g ? 6 : 538 > g ? 7 : 601 > g ? 8 : "8"));
            C && (C[1] += " " + (g += "number" == typeof g ? ".x" : /[.+]/.test(g) ? "" : "+"));
            "Safari" == v && (!n || 45 < parseInt(n)) && (n = g)
        }
        "Opera" == v && (g = /\bzbov|zvav$/.exec(w)) ? (v += " ", l.unshift("desktop mode"), "zvav" == g ? (v += "Mini", n = null) : v += "Mobile", w = w.replace(RegExp(" *" + g + "$"), "")) : "Safari" == v && /\bChrome\b/.exec(C && C[1]) && (l.unshift("desktop mode"), v = "Chrome Mobile", n = null, /\bOS X\b/.test(w) ? (G =
            "Apple", w = "iOS 4.3+") : w = null);
        n && 0 == n.indexOf(g = /[\d.]+$/.exec(w)) && -1 < a.indexOf("/" + g + "-") && (w = String(w.replace(g, "")).replace(/^ +| +$/g, ""));
        C && !/\b(?:Avant|Nook)\b/.test(v) && (/Browser|Lunascape|Maxthon/.test(v) || "Safari" != v && /^iOS/.test(w) && /\bSafari\b/.test(C[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(v) && C[1]) && (g = C[C.length - 1]) && l.push(g);
        l.length && (l = ["(" + l.join("; ") + ")"]);
        G && D && 0 > D.indexOf(G) && l.push("on " + G);
        D && l.push((/^on /.test(l[l.length -
            1]) ? "" : "on ") + D);
        if (w) {
            var S = (g = / ([\d.+]+)$/.exec(w)) && "/" == w.charAt(w.length - g[0].length - 1);
            w = {
                architecture: 32,
                family: g && !S ? w.replace(g[0], "") : w,
                version: g ? g[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !S ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(g = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(P)) && !/\bi686\b/i.test(P) ? (w && (w.architecture = 64, w.family = w.family.replace(RegExp(" *" + g), "")), v && (/\bWOW64\b/i.test(a) || J && /\w(?:86|32)$/.test(x.cpuClass || x.platform) && !/\bWin64; x64\b/i.test(a)) &&
            l.unshift("32-bit")) : w && /^OS X/.test(w.family) && "Chrome" == v && 39 <= parseFloat(n) && (w.architecture = 64);
        a || (a = null);
        t = {};
        t.description = a;
        t.layout = C && C[0];
        t.manufacturer = G;
        t.name = v;
        t.prerelease = Q;
        t.product = D;
        t.ua = a;
        t.version = v && n;
        t.os = w || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        t.parse = e;
        t.toString = function() {
            return this.description || ""
        };
        t.version && l.unshift(n);
        t.name && l.unshift(v);
        w && v && (w != String(w).split(" ")[0] || w != v.split(" ")[0] && !D) && l.push(D ? "(" + w + ")" : "on " +
            w);
        l.length && (t.description = l.join(" "));
        return t
    }
    var d = {
            "function": !0,
            object: !0
        },
        r = d[typeof window] && window || this,
        x = d[typeof exports] && exports;
    d = d[typeof module] && module && !module.nodeType && module;
    var l = x && d && "object" == typeof global && global;
    !l || l.global !== l && l.window !== l && l.self !== l || (r = l);
    var y = Math.pow(2, 53) - 1,
        p = /\bOpera/;
    l = Object.prototype;
    var z = l.hasOwnProperty,
        B = l.toString,
        A = e();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (r.platform = A, define(function() {
            return A
        })) : x &&
        d ? f(A, function(a, d) {
            x[d] = a
        }) : r.platform = A
}).call(this);

function buildIOSMeta() {
    for (var a = [{
            name: "viewport",
            content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }, {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black"
        }], c = 0; c < a.length; c++) {
        var b = document.createElement("meta");
        b.name = a[c].name;
        b.content = a[c].content;
        var f = window.document.head.querySelector('meta[name="' + b.name + '"]');
        f && f.parentNode.removeChild(f);
        window.document.head.appendChild(b)
    }
}

function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}

function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}

function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}

function __iosResize() {
    window.scrollTo(0, 0);
    if ("iPhone" === platform.product) switch (window.devicePixelRatio) {
        case 2:
            switch (window.innerWidth) {
                case 568:
                    320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                    break;
                case 667:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        case 3:
            switch (window.innerWidth) {
                case 736:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 724:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        default:
            hideIOSFullscreenPanel()
    }
}

function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize()
    }, 500)
}

function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1,
    s_bIsIphone = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        f = b.documentElement;
    if (void 0 === window["inner" + a]) a = f["client" + a];
    else if (window["inner" + a] != f["client" + a]) {
        var h = b.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var q = b.createElement("div");
        q.id = "vpw-test-d";
        q.style.cssText = "position:absolute;top:-1000px";
        q.innerHTML = "<style>@media(" + c + ":" + f["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        h.appendChild(q);
        f.insertBefore(h, b.head);
        a = 7 == q["offset" + a] ? f["client" + a] : window["inner" + a];
        f.removeChild(h)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            f = CANVAS_WIDTH * b;
        b *= CANVAS_HEIGHT;
        if (b < a) {
            var h = a - b;
            b += h;
            f += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else f < c && (h = c - f, f += h, b += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - b / 2;
        var q = c / 2 - f / 2,
            k = CANVAS_WIDTH / f;
        if (q * k < -EDGEBOARD_X || h * k < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 *
            EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), f = CANVAS_WIDTH * b, b *= CANVAS_HEIGHT, h = (a - b) / 2, q = (c - f) / 2, k = CANVAS_WIDTH / f;
        s_iOffsetX = -1 * q * k;
        s_iOffsetY = -1 * h * k;
        0 <= h && (s_iOffsetY = 0);
        0 <= q && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * f, s_oStage.canvas.height = 2 * b, canvas.style.width = f + "px", canvas.style.height = b + "px", a = Math.min(f /
            CANVAS_WIDTH, b / CANVAS_HEIGHT), s_iScaleFactor = 2 * a, s_oStage.scaleX = s_oStage.scaleY = 2 * a) : s_bMobile && !1 === isIOS() ? ($("#canvas").css("width", f + "px"), $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = f, s_oStage.canvas.height = b, s_iScaleFactor = Math.min(f / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > h ? $("#canvas").css("top", h + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", q + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function createBitmap(a, c, b) {
    var f = new createjs.Bitmap(a),
        h = new createjs.Shape;
    c && b ? h.graphics.beginFill("#fff").drawRect(0, 0, c, b) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    f.hitArea = h;
    return f
}

function createSprite(a, c, b, f, h, q) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -f, h, q);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function shuffle(a) {
    for (var c = a.length, b, f; 0 !== c;) f = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[f], a[f] = b;
    return a
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 === a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(c)
}

(function() {
    function a(a) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.enabled && (s_bFullscreen = screen.height < window.innerHeight + 3 && screen.height > window.innerHeight - 3 ? !0 : !1, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.enabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function CSpriteLibrary() {
    var a, c, b, f, h, q;
    this.init = function(k, m, e) {
        b = c = 0;
        f = k;
        h = m;
        q = e;
        a = {}
    };
    this.addSprite = function(b, f) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: f,
            oSprite: new Image
        }, c++)
    };
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    };
    this._onSpritesLoaded = function() {
        h.call(q)
    };
    this._onSpriteLoaded = function() {
        f.call(q);
        ++b === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var b in a) a[b].oSprite.oSpriteLibrary = this, a[b].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[b].oSprite.src = a[b].szPath
    };
    this.getNumSprites = function() {
        return c
    }
}

