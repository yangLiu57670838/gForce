function brand_primary(a) {
    return get_color(get_color_name("brand-primary"), a)
}

function brand_success(a) {
    return get_color(get_color_name("brand-success"), a)
}

function brand_info(a) {
    return get_color(get_color_name("brand-info"), a)
}

function brand_warning(a) {
    return get_color(get_color_name("brand-warning"), a)
}

function brand_danger(a) {
    return get_color(get_color_name("brand-danger"), a)
}

function theme(a) {
    return a = a ? a : "base", get_color(get_color_name("theme"), a)
}

function theme_secondary(a) {
    return a = a ? a : "base", get_color(get_color_name("theme-secondary"))
}

function get_color_name(a) {
    return void 0 !== theme_colors[a] ? theme_colors[a] : global_colors[a]
}

function get_color(a, b) {
    return b = b ? b : "base", global_colors[a][b]
}

function changeTemplateTheme(a) {
    themeTemplate = a, $("body").attr("class", a + " " + themeColor), $(".theme-picker .icon").addClass("hide"), $(".theme-picker ." + a + " .icon").removeClass("hide")
}

function changeColorTheme(a) {
    themeColor = a, $("body").attr("class", a + " " + themeTemplate), $(".theme-picker .icon").addClass("hide"), $(".theme-picker ." + a + " .icon").removeClass("hide")
}! function(a) {
    var b = {
        init: function(b) {
            var c = {
                menuWidth: 250,
                edge: "left",
                closeOnClick: !1
            };
            b = a.extend(c, b), a(this).each(function() {
                function c(c) {
                    f = !1, g = !1, a("body").removeClass("overflow-no"), a("#sidenav-overlay").velocity({
                        opacity: 0
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function() {
                            a(this).remove()
                        }
                    }), "left" === b.edge ? (a(".drag-target").css({
                        width: "",
                        right: "",
                        left: "0"
                    }), e.velocity({
                        left: -1 * (b.menuWidth + 10)
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            c === !0 && (e.removeAttr("style"), e.css("width", b.menuWidth))
                        }
                    })) : (a(".drag-target").css({
                        width: "",
                        right: "0",
                        left: ""
                    }), e.velocity({
                        right: -1 * (b.menuWidth + 10)
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            c === !0 && (e.removeAttr("style"), e.css("width", b.menuWidth))
                        }
                    }))
                }
                var d = a(this),
                    e = a(d.attr("data-activates"));
                250 != b.menuWidth && e.css("width", b.menuWidth), a("body").append(a('<div class="drag-target"></div>')), "left" == b.edge ? (e.css("left", -1 * (b.menuWidth + 10)), a(".drag-target").css({
                    left: 0
                })) : (e.addClass("right-aligned").css("right", -1 * (b.menuWidth + 10)).css("left", ""), a(".drag-target").css({
                    right: 0
                })), e.hasClass("fixed") && a(window).width() > 992 && e.css("left", 0), window.innerWidth > 992 && (g = !0), e.hasClass("fixed") && a(window).resize(function() {
                    window.innerWidth > 992 ? 0 !== a("#sidenav-overlay").css("opacity") && g ? c(!0) : (e.removeAttr("style"), e.css("width", b.menuWidth)) : g === !1 && ("left" === b.edge ? e.css("left", -1 * (b.menuWidth + 10)) : e.css("right", -1 * (b.menuWidth + 10)))
                }), b.closeOnClick === !0 && e.on("click.itemclick", "a:not(.collapsible-header)", function() {
                    g === !0 && c()
                });
                var f = !1,
                    g = !1;
                a(".drag-target").on("click", function() {
                    c()
                }), a(".drag-target").hammer({
                    prevent_default: !1
                }).bind("pan", function(d) {
                    if ("touch" == d.gesture.pointerType) {
                        var f = (d.gesture.direction, d.gesture.center.x);
                        d.gesture.center.y, d.gesture.velocityX;
                        if (0 === a("#sidenav-overlay").length) {
                            var h = a('<div id="sidenav-overlay"></div>');
                            h.css("opacity", 0).click(function() {
                                c()
                            }), a("body").append(h)
                        }
                        if ("left" === b.edge && (f > b.menuWidth ? f = b.menuWidth : 0 > f && (f = 0)), "left" === b.edge) f < b.menuWidth / 2 ? g = !1 : f >= b.menuWidth / 2 && (g = !0), e.css("left", f - b.menuWidth);
                        else {
                            f < a(window).width() - b.menuWidth / 2 ? g = !0 : f >= a(window).width() - b.menuWidth / 2 && (g = !1);
                            var i = -1 * (f - b.menuWidth / 2);
                            i > 0 && (i = 0), e.css("right", i)
                        }
                        "left" === b.edge ? (overlayPerc = f / b.menuWidth, a("#sidenav-overlay").velocity({
                            opacity: overlayPerc
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (overlayPerc = Math.abs((f - a(window).width()) / b.menuWidth), a("#sidenav-overlay").velocity({
                            opacity: overlayPerc
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }))
                    }
                }).bind("panend", function(c) {
                    if ("touch" == c.gesture.pointerType) {
                        var d = c.gesture.velocityX;
                        f = !1, "left" === b.edge ? g && .3 >= d || -.5 > d ? (e.velocity({
                            left: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a(".drag-target").css({
                            width: "50%",
                            right: 0,
                            left: ""
                        })) : (!g || d > .3) && (e.velocity({
                            left: -1 * (b.menuWidth + 10)
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                a(this).remove()
                            }
                        }), a(".drag-target").css({
                            width: "10px",
                            right: "",
                            left: 0
                        })) : g && d >= -.3 || d > .5 ? (e.velocity({
                            right: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a(".drag-target").css({
                            width: "50%",
                            right: "",
                            left: 0
                        })) : (!g || -.3 > d) && (e.velocity({
                            right: -1 * (b.menuWidth + 10)
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                a(this).remove()
                            }
                        }), a(".drag-target").css({
                            width: "10px",
                            right: 0,
                            left: ""
                        })), a("body").addClass("overflow-no")
                    }
                }), d.click(function() {
                    if (g === !0) g = !1, f = !1, c();
                    else {
                        a("body").addClass("overflow-no"), "left" === b.edge ? (a(".drag-target").css({
                            width: "50%",
                            right: 0,
                            left: ""
                        }), e.velocity({
                            left: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (a(".drag-target").css({
                            width: "50%",
                            right: "",
                            left: 0
                        }), e.velocity({
                            right: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), e.css("left", ""));
                        var d = a('<div id="sidenav-overlay"></div>');
                        d.css("opacity", 0).click(function() {
                            g = !1, f = !1, c(), d.velocity({
                                opacity: 0
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    a(this).remove()
                                }
                            })
                        }), a("body").append(d), d.velocity({
                            opacity: 1
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                g = !0, f = !1
                            }
                        })
                    }
                    return !1
                })
            })
        },
        show: function() {
            this.trigger("click")
        },
        hide: function() {
            a("#sidenav-overlay").trigger("click")
        }
    };
    a.fn.sideNav = function(c) {
        return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.tooltip") : b.init.apply(this, arguments)
    }
}(jQuery),
function(a, b, c, d) {
    "use strict";

    function e(b, c) {
        g = this, this.element = a(b), this.options = a.extend({}, h, c), this._defaults = h, this._name = f, this.init()
    }
    var f = "ripples",
        g = null,
        h = {};
    e.prototype.init = function() {
        var c = this.element;
        c.on("mousedown touchstart", function(d) {
            if (!g.isTouch() || "mousedown" !== d.type) {
                c.find(".ripple-wrapper").length || c.append('<div class="ripple-wrapper"></div>');
                var e = c.children(".ripple-wrapper"),
                    f = g.getRelY(e, d),
                    h = g.getRelX(e, d);
                if (f || h) {
                    var i = g.getRipplesColor(c),
                        j = a("<div></div>");
                    j.addClass("ripple").css({
                        left: h,
                        top: f,
                        "background-color": i
                    }), e.append(j),
                    function() {
                        return b.getComputedStyle(j[0]).opacity
                    }(), g.rippleOn(c, j), setTimeout(function() {
                        g.rippleEnd(j)
                    }, 500), c.on("mouseup mouseleave touchend", function() {
                        j.data("mousedown", "off"), "off" === j.data("animating") && g.rippleOut(j)
                    })
                }
            }
        })
    }, e.prototype.getNewSize = function(a, b) {
        return Math.max(a.outerWidth(), a.outerHeight()) / b.outerWidth() * 2.5
    }, e.prototype.getRelX = function(a, b) {
        var c = a.offset();
        return g.isTouch() ? (b = b.originalEvent, 1 !== b.touches.length ? b.touches[0].pageX - c.left : !1) : b.pageX - c.left
    }, e.prototype.getRelY = function(a, b) {
        var c = a.offset();
        return g.isTouch() ? (b = b.originalEvent, 1 !== b.touches.length ? b.touches[0].pageY - c.top : !1) : b.pageY - c.top
    }, e.prototype.getRipplesColor = function(a) {
        var c = a.data("ripple-color") ? a.data("ripple-color") : b.getComputedStyle(a[0]).color;
        return c
    }, e.prototype.hasTransitionSupport = function() {
        var a = c.body || c.documentElement,
            b = a.style,
            e = b.transition !== d || b.WebkitTransition !== d || b.MozTransition !== d || b.MsTransition !== d || b.OTransition !== d;
        return e
    }, e.prototype.isTouch = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, e.prototype.rippleEnd = function(a) {
        a.data("animating", "off"), "off" === a.data("mousedown") && g.rippleOut(a)
    }, e.prototype.rippleOut = function(a) {
        a.off(), g.hasTransitionSupport() ? a.addClass("ripple-out") : a.animate({
            opacity: 0
        }, 100, function() {
            a.trigger("transitionend")
        }), a.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
            a.remove()
        })
    }, e.prototype.rippleOn = function(a, b) {
        var c = g.getNewSize(a, b);
        g.hasTransitionSupport() ? b.css({
            "-ms-transform": "scale(" + c + ")",
            "-moz-transform": "scale(" + c + ")",
            "-webkit-transform": "scale(" + c + ")",
            transform: "scale(" + c + ")"
        }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : b.animate({
            width: 2 * Math.max(a.outerWidth(), a.outerHeight()),
            height: 2 * Math.max(a.outerWidth(), a.outerHeight()),
            "margin-left": -1 * Math.max(a.outerWidth(), a.outerHeight()),
            "margin-top": -1 * Math.max(a.outerWidth(), a.outerHeight()),
            opacity: .2
        }, 500, function() {
            b.trigger("transitionend")
        })
    }, a.fn.ripples = function(b) {
        return this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
        })
    }
}(jQuery, window, document);
var theme_colors = {
    "brand-primary": "blue",
    "brand-success": "green",
    "brand-info": "purple",
    "brand-warning": "orange",
    "brand-danger": "red",
    theme: "pink",
    "theme-secondary": "blue"
}, global_colors = {
        red: {
            "lighten-5": "#FFEBEE",
            "lighten-4": "#FFCDD2",
            "lighten-3": "#EF9A9A",
            "lighten-2": "#E57373",
            "lighten-1": "#EF5350",
            base: "#F44336",
            "darken-1": "#E53935",
            "darken-2": "#D32F2F",
            "darken-3": "#C62828",
            "darken-4": "#B71C1C",
            "accent-1": "#FF8A80",
            "accent-2": "#FF5252",
            "accent-3": "#FF1744",
            "accent-4": "#D50000"
        },
        pink: {
            "lighten-5": "#fce4ec",
            "lighten-4": "#f8bbd0",
            "lighten-3": "#f48fb1",
            "lighten-2": "#f06292",
            "lighten-1": "#ec407a",
            base: "#e91e63",
            "darken-1": "#d81b60",
            "darken-2": "#c2185b",
            "darken-3": "#ad1457",
            "darken-4": "#880e4f",
            "accent-1": "#ff80ab",
            "accent-2": "#ff4081",
            "accent-3": "#f50057",
            "accent-4": "#c51162"
        },
        purple: {
            "lighten-5": "#f3e5f5",
            "lighten-4": "#e1bee7",
            "lighten-3": "#ce93d8",
            "lighten-2": "#ba68c8",
            "lighten-1": "#ab47bc",
            base: "#9c27b0",
            "darken-1": "#8e24aa",
            "darken-2": "#7b1fa2",
            "darken-3": "#6a1b9a",
            "darken-4": "#4a148c",
            "accent-1": "#ea80fc",
            "accent-2": "#e040fb",
            "accent-3": "#d500f9",
            "accent-4": "#aa00ff"
        },
        "deep-purple": {
            "lighten-5": "#ede7f6",
            "lighten-4": "#d1c4e9",
            "lighten-3": "#b39ddb",
            "lighten-2": "#9575cd",
            "lighten-1": "#7e57c2",
            base: "#673ab7",
            "darken-1": "#5e35b1",
            "darken-2": "#512da8",
            "darken-3": "#4527a0",
            "darken-4": "#311b92",
            "accent-1": "#b388ff",
            "accent-2": "#7c4dff",
            "accent-3": "#651fff",
            "accent-4": "#6200ea"
        },
        indigo: {
            "lighten-5": "#e8eaf6",
            "lighten-4": "#c5cae9",
            "lighten-3": "#9fa8da",
            "lighten-2": "#7986cb",
            "lighten-1": "#5c6bc0",
            base: "#3f51b5",
            "darken-1": "#3949ab",
            "darken-2": "#303f9f",
            "darken-3": "#283593",
            "darken-4": "#1a237e",
            "accent-1": "#8c9eff",
            "accent-2": "#536dfe",
            "accent-3": "#3d5afe",
            "accent-4": "#304ffe"
        },
        blue: {
            "lighten-5": "#E3F2FD",
            "lighten-4": "#BBDEFB",
            "lighten-3": "#90CAF9",
            "lighten-2": "#64B5F6",
            "lighten-1": "#42A5F5",
            base: "#2196F3",
            "darken-1": "#1E88E5",
            "darken-2": "#1976D2",
            "darken-3": "#1565C0",
            "darken-4": "#0D47A1",
            "accent-1": "#82B1FF",
            "accent-2": "#448AFF",
            "accent-3": "#2979FF",
            "accent-4": "#2962FF"
        },
        "light-blue": {
            "lighten-5": "#e1f5fe",
            "lighten-4": "#b3e5fc",
            "lighten-3": "#81d4fa",
            "lighten-2": "#4fc3f7",
            "lighten-1": "#29b6f6",
            base: "#03a9f4",
            "darken-1": "#039be5",
            "darken-2": "#0288d1",
            "darken-3": "#0277bd",
            "darken-4": "#01579b",
            "accent-1": "#80d8ff",
            "accent-2": "#40c4ff",
            "accent-3": "#00b0ff",
            "accent-4": "#0091ea"
        },
        cyan: {
            "lighten-5": "#e0f7fa",
            "lighten-4": "#b2ebf2",
            "lighten-3": "#80deea",
            "lighten-2": "#4dd0e1",
            "lighten-1": "#26c6da",
            base: "#00bcd4",
            "darken-1": "#00acc1",
            "darken-2": "#0097a7",
            "darken-3": "#00838f",
            "darken-4": "#006064",
            "accent-1": "#84ffff",
            "accent-2": "#18ffff",
            "accent-3": "#00e5ff",
            "accent-4": "#00b8d4"
        },
        teal: {
            "lighten-5": "#e0f2f1",
            "lighten-4": "#b2dfdb",
            "lighten-3": "#80cbc4",
            "lighten-2": "#4db6ac",
            "lighten-1": "#26a69a",
            base: "#009688",
            "darken-1": "#00897b",
            "darken-2": "#00796b",
            "darken-3": "#00695c",
            "darken-4": "#004d40",
            "accent-1": "#a7ffeb",
            "accent-2": "#64ffda",
            "accent-3": "#1de9b6",
            "accent-4": "#00bfa5"
        },
        green: {
            "lighten-5": "#E8F5E9",
            "lighten-4": "#C8E6C9",
            "lighten-3": "#A5D6A7",
            "lighten-2": "#81C784",
            "lighten-1": "#66BB6A",
            base: "#4CAF50",
            "darken-1": "#43A047",
            "darken-2": "#388E3C",
            "darken-3": "#2E7D32",
            "darken-4": "#1B5E20",
            "accent-1": "#B9F6CA",
            "accent-2": "#69F0AE",
            "accent-3": "#00E676",
            "accent-4": "#00C853"
        },
        "light-green": {
            "lighten-5": "#f1f8e9",
            "lighten-4": "#dcedc8",
            "lighten-3": "#c5e1a5",
            "lighten-2": "#aed581",
            "lighten-1": "#9ccc65",
            base: "#8bc34a",
            "darken-1": "#7cb342",
            "darken-2": "#689f38",
            "darken-3": "#558b2f",
            "darken-4": "#33691e",
            "accent-1": "#ccff90",
            "accent-2": "#b2ff59",
            "accent-3": "#76ff03",
            "accent-4": "#64dd17"
        },
        lime: {
            "lighten-5": "#f9fbe7",
            "lighten-4": "#f0f4c3",
            "lighten-3": "#e6ee9c",
            "lighten-2": "#dce775",
            "lighten-1": "#d4e157",
            base: "#cddc39",
            "darken-1": "#c0ca33",
            "darken-2": "#afb42b",
            "darken-3": "#9e9d24",
            "darken-4": "#827717",
            "accent-1": "#f4ff81",
            "accent-2": "#eeff41",
            "accent-3": "#c6ff00",
            "accent-4": "#aeea00"
        },
        yellow: {
            "lighten-5": "#fffde7",
            "lighten-4": "#fff9c4",
            "lighten-3": "#fff59d",
            "lighten-2": "#fff176",
            "lighten-1": "#ffee58",
            base: "#ffeb3b",
            "darken-1": "#fdd835",
            "darken-2": "#fbc02d",
            "darken-3": "#f9a825",
            "darken-4": "#f57f17",
            "accent-1": "#ffff8d",
            "accent-2": "#ffff00",
            "accent-3": "#ffea00",
            "accent-4": "#ffd600"
        },
        amber: {
            "lighten-5": "#fff8e1",
            "lighten-4": "#ffecb3",
            "lighten-3": "#ffe082",
            "lighten-2": "#ffd54f",
            "lighten-1": "#ffca28",
            base: "#ffc107",
            "darken-1": "#ffb300",
            "darken-2": "#ffa000",
            "darken-3": "#ff8f00",
            "darken-4": "#ff6f00",
            "accent-1": "#ffe57f",
            "accent-2": "#ffd740",
            "accent-3": "#ffc400",
            "accent-4": "#ffab00"
        },
        orange: {
            "lighten-5": "#fff3e0",
            "lighten-4": "#ffe0b2",
            "lighten-3": "#ffcc80",
            "lighten-2": "#ffb74d",
            "lighten-1": "#ffa726",
            base: "#ff9800",
            "darken-1": "#fb8c00",
            "darken-2": "#f57c00",
            "darken-3": "#ef6c00",
            "darken-4": "#e65100",
            "accent-1": "#ffd180",
            "accent-2": "#ffab40",
            "accent-3": "#ff9100",
            "accent-4": "#ff6d00"
        },
        "deep-orange": {
            "lighten-5": "#fbe9e7",
            "lighten-4": "#ffccbc",
            "lighten-3": "#ffab91",
            "lighten-2": "#ff8a65",
            "lighten-1": "#ff7043",
            base: "#ff5722",
            "darken-1": "#f4511e",
            "darken-2": "#e64a19",
            "darken-3": "#d84315",
            "darken-4": "#bf360c",
            "accent-1": "#ff9e80",
            "accent-2": "#ff6e40",
            "accent-3": "#ff3d00",
            "accent-4": "#dd2c00"
        },
        brown: {
            "lighten-5": "#efebe9",
            "lighten-4": "#d7ccc8",
            "lighten-3": "#bcaaa4",
            "lighten-2": "#a1887f",
            "lighten-1": "#8d6e63",
            base: "#795548",
            "darken-1": "#6d4c41",
            "darken-2": "#5d4037",
            "darken-3": "#4e342e",
            "darken-4": "#3e2723"
        },
        "blue-grey": {
            "lighten-5": "#eceff1",
            "lighten-4": "#cfd8dc",
            "lighten-3": "#b0bec5",
            "lighten-2": "#90a4ae",
            "lighten-1": "#78909c",
            base: "#607d8b",
            "darken-1": "#546e7a",
            "darken-2": "#455a64",
            "darken-3": "#37474f",
            "darken-4": "#263238"
        },
        grey: {
            "lighten-5": "#fafafa",
            "lighten-4": "#f5f5f5",
            "lighten-3": "#eeeeee",
            "lighten-2": "#e0e0e0",
            "lighten-1": "#bdbdbd",
            base: "#9e9e9e",
            "darken-1": "#757575",
            "darken-2": "#616161",
            "darken-3": "#424242",
            "darken-4": "#212121"
        },
        shades: {
            black: "#000000",
            white: "#FFFFFF"
        }
    };
$(function() {
    $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), $(".navbar-toggle").sideNav({
        menuWidth: 260,
        closeOnClick: !0
    });
    var a = [".btn:not(.withoutripple)", ".card-image", ".navbar a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple"].join(",");
    $("body").find(a).ripples(), $(".form-control").each(function() {
        $(this).val() && $(this).parent().addClass("filled"), $(this).bind("blur", function(a) {
            input = $(a.currentTarget), input.val() ? input.parent().addClass("filled") : input.parent().removeClass("filled"), input.parent().removeClass("active")
        }).bind("focus", function(a) {
            input = $(a.currentTarget), input.parent().addClass("active")
        })
    })
});
var themeColor = "theme-pink",
    themeTemplate = "theme-template-dark";
$(function() {
    if ($(".charts").length > 0) {
        colors = ["#4CAF50", "#2196F3", "#9c27b0", "#ff9800", "#F44336"], guage_options = {
            data: {
                columns: [
                    ["data", 50]
                ],
                type: "gauge"
            },
            transition: {
                duration: 500
            },
            color: {
                pattern: colors,
                threshold: {
                    values: [20, 50, 70, 100, 110]
                }
            }
        };
        var a = jQuery.extend({}, guage_options),
            b = jQuery.extend({}, guage_options),
            c = jQuery.extend({}, guage_options);
        a.bindto = "#load-chart", b.bindto = "#cpu-chart", c.bindto = "#mem-chart";
        var d = c3.generate(a),
            e = c3.generate(b),
            f = c3.generate(c);
        interval = setInterval(function() {
            d.load({
                columns: [
                    ["data", Math.floor(100 * Math.random() + 1)]
                ]
            }), e.load({
                columns: [
                    ["data", Math.floor(100 * Math.random() + 1)]
                ]
            }), f.load({
                columns: [
                    ["data", Math.floor(100 * Math.random() + 1)]
                ]
            })
        }, 2e3);
        c3.generate({
            bindto: "#line-chart",
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25]
                ]
            },
            color: {
                pattern: colors
            }
        });
        c3.generate({
            bindto: "#area-chart",
            data: {
                columns: [
                    ["data1", 300, 350, 300, 0, 0, 0],
                    ["data2", 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: "area",
                    data2: "area-spline"
                }
            },
            color: {
                pattern: colors
            }
        }), c3.generate({
            bindto: "#bar-chart",
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 130, 100, 140, 200, 150, 50],
                    ["data3", 30, 200, 100, 400, 150, 250]
                ],
                type: "bar"
            },
            bar: {
                width: {
                    ratio: .5
                }
            },
            color: {
                pattern: colors
            }
        }), c3.generate({
            bindto: "#step-chart",
            data: {
                columns: [
                    ["data1", 300, 350, 300, 0, 0, 100],
                    ["data2", 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: "step",
                    data2: "area-step"
                }
            },
            color: {
                pattern: colors
            }
        }), c3.generate({
            bindto: "#scatter-plot-chart",
            data: {
                xs: {
                    setosa: "setosa_x",
                    versicolor: "versicolor_x"
                },
                columns: [
                    ["setosa_x", 3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3],
                    ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8],
                    ["setosa", .2, .2, .2, .2, .2, .4, .3, .2, .2, .1, .2, .2, .1, .1, .2, .4, .4, .3, .3, .3, .2, .4, .2, .5, .2, .2, .4, .2, .2, .2, .2, .4, .1, .2, .2, .2, .2, .1, .2, .2, .3, .3, .2, .6, .4, .3, .2, .2, .2, .2],
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1, 1.3, 1.4, 1, 1.5, 1, 1.4, 1.3, 1.4, 1.5, 1, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1, 1.1, 1, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]
                ],
                type: "scatter"
            },
            axis: {
                x: {
                    label: "Sepal.Width",
                    tick: {
                        fit: !1
                    }
                },
                y: {
                    label: "Petal.Width"
                }
            },
            color: {
                pattern: colors
            }
        }), c3.generate({
            bindto: "#pie-chart",
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                    ["data3", 220]
                ],
                type: "pie"
            },
            color: {
                pattern: colors
            }
        }), c3.generate({
            bindto: "#donut-chart",
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                    ["data3", 220]
                ],
                type: "donut"
            },
            donut: {
                title: "Iris Petal Width"
            },
            color: {
                pattern: colors
            }
        })
    }
}), $(function() {
    $("#form-validation").validator()
}), $(function() {
    people = [{
        id: 0,
        name: "Adam",
        email: "adam@email.com",
        age: 12,
        country: "United States"
    }, {
        id: 1,
        name: "Amalie",
        email: "amalie@email.com",
        age: 12,
        country: "Argentina"
    }, {
        id: 2,
        name: "Estefanía",
        email: "estefania@email.com",
        age: 21,
        country: "Argentina"
    }, {
        id: 3,
        name: "Adrian",
        email: "adrian@email.com",
        age: 21,
        country: "Ecuador"
    }, {
        id: 4,
        name: "Wladimir",
        email: "wladimir@email.com",
        age: 30,
        country: "Ecuador"
    }, {
        id: 5,
        name: "Samantha",
        email: "samantha@email.com",
        age: 30,
        country: "United States"
    }, {
        id: 6,
        name: "Nicole",
        email: "nicole@email.com",
        age: 43,
        country: "Colombia"
    }, {
        id: 7,
        name: "Natasha",
        email: "natasha@email.com",
        age: 54,
        country: "Ecuador"
    }, {
        id: 8,
        name: "Michael",
        email: "michael@email.com",
        age: 15,
        country: "Colombia"
    }, {
        id: 9,
        name: "Nicolás",
        email: "nicolas@email.com",
        age: 43,
        country: "Colombia"
    }], colors = ["Red", "Green", "Blue", "Yellow", "Magenta", "Maroon", "Umbra", "Turquoise"], states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"], templateSelection = function(a) {
        return a.name
    }, templateResult = function(a) {
        return template = $("<div><div>" + a.name + "</div><small>" + a.email + "</small></div>"), template
    }, $(".select2").select2({
        data: people,
        minimumResultsForSearch: 1 / 0,
        placeholder: "Select based on select2",
        templateSelection: templateSelection,
        templateResult: templateResult
    }), $(".select2-tags").select2({
        data: colors,
        tags: !0,
        placeholder: "Choose a color"
    }), $(".datepicker").datetimepicker({
        format: "YY-MM-DD"
    }), $(".timepicker").datetimepicker({
        format: "HH:mm"
    }), $(".datepicker-from").datetimepicker({
        format: "MM/DD/YYYY"
    }), $(".datepicker-until").datetimepicker({
        format: "MM/DD/YYYY"
    }), $(".datepicker-from").on("dp.change", function(a) {
        $(".datepicker-until").data("DateTimePicker").minDate(a.date)
    }), $(".datepicker-until").on("dp.change", function(a) {
        $(".datepicker-from").data("DateTimePicker").maxDate(a.date)
    }), $(".typeahead").typeahead({
        source: states,
        autoSelect: !0
    }), $(".fileupload").fileupload({
        dataType: "json",
        done: function(a, b) {
            $.each(b.result.files, function(a, b) {
                $("<li/>").text(b.name).appendTo("#fileupload .response")
            })
        }
    }), $(".wysiwyg").summernote(), $(".slider-1").noUiSlider({
        start: 6,
        step: 0,
        range: {
            min: [0],
            max: [21]
        }
    }), $(".slider-2").noUiSlider({
        start: [6, 25],
        step: 1,
        range: {
            min: [0],
            max: [100]
        }
    }), $(".slider-2").on("slide", function(a, b) {
        var c = $(".sliderval"),
            d = $(".sliderval2");
        d.length ? (v = parseInt(b[0]), v2 = parseInt(b[1])) : v = parseInt(b), c.length && (void 0 !== c[0].value ? c.val(v) : c.html(v)), d.length && (void 0 !== d[0].value ? d.val(v2) : d.html(v2))
    }), $(".slider-3").noUiSlider({
        start: [16],
        step: 2,
        range: {
            min: [0],
            max: [20]
        }
    }), $(".slider-3").on("slide set change", function(a, b) {
        $(this).find(".noUi-handle div").length || $(this).find(".noUi-handle").append("<div>" + b + "</div>"), $(this).find(".noUi-handle div").html(b)
    })
}), random_load_value = function(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
};
var values = [];
for (i = 0; i < 30; ++i) values.push(random_load_value(40, 80));
randomData = function(a, b, c) {
    for (data = [], i = 0; i < a; ++i) data.length ? (factor = 3, minOrganic = data[data.length - 1] - factor, maxOrganic = data[data.length - 1] + factor, data.push(random_load_value(minOrganic < b ? b : minOrganic, maxOrganic > c ? c : maxOrganic))) : data.push(random_load_value(b, c));
    return data
}, chartData1 = randomData(20, 40, 60), chartData2 = randomData(20, 40, 60), chartData3 = randomData(20, 40, 60), chartData4 = randomData(100, 10, 30), chartData1.unshift("Sales"), chartData2.unshift("Customers"), chartData3.unshift("Signups"), chartData4.unshift("Customers"), serverLoadOptions = {
    bindto: "#server-load-chart",
    legend: {
        show: !1
    },
    padding: {
        top: 6,
        right: -1,
        bottom: -8,
        left: 0
    },
    data: {
        columns: [
            ["Server load"].concat(values)
        ],
        type: "area"
    },
    size: {
        height: 160
    },
    axis: {
        x: {
            show: !1,
            padding: {
                left: 0,
                right: 0
            }
        },
        y: {
            show: !1,
            max: 100,
            min: 0,
            padding: {
                top: 0,
                bottom: 0
            }
        }
    },
    grid: {
        focus: {
            show: !1
        }
    },
    point: {
        show: !1
    },
    tooltip: {
        format: {
            title: function(a) {
                return void 0
            },
            value: function(a, b, c) {
                return a + "%"
            }
        }
    },
    transition: {
        duration: 50
    }
};
var chartLine1 = {
    bindto: "#chart-line-1",
    data: {
        columns: [chartData1]
    },
    axis: {
        x: {
            show: !1
        },
        y: {
            show: !1
        }
    },
    color: {
        pattern: ["#fff"]
    },
    legend: {
        hide: !0
    },
    size: {
        height: 100
    }
}, chartLine2 = {
        bindto: "#chart-line-2",
        data: {
            columns: [chartData2]
        },
        axis: {
            x: {
                show: !1
            },
            y: {
                show: !1
            }
        },
        color: {
            pattern: ["#fff"]
        },
        legend: {
            hide: !0
        },
        size: {
            height: 100
        }
    }, chartLine3 = {
        bindto: "#chart-line-3",
        data: {
            columns: [chartData3]
        },
        axis: {
            x: {
                show: !1
            },
            y: {
                show: !1
            }
        },
        color: {
            pattern: ["#fff"]
        },
        legend: {
            hide: !0
        },
        size: {
            height: 100
        }
    }, chartArea1 = {
        bindto: "#chart-area-1",
        data: {
            columns: [chartData4],
            types: {
                Customers: "area"
            }
        },
        axis: {
            x: {
                show: !1
            },
            y: {
                show: !1
            }
        },
        color: {
            pattern: ["#EC407A"]
        },
        legend: {
            hide: !0
        },
        size: {
            height: 100
        },
        padding: {
            right: -18,
            bottom: -28,
            left: -18
        }
    }, chartGauge1 = {
        bindto: "#chart-gauge-1",
        data: {
            columns: [
                ["data", 80]
            ],
            types: {
                data: "gauge"
            }
        },
        gauge: {
            width: 3
        },
        color: {
            pattern: ["#E91E63"]
        },
        legend: {
            hide: !0
        },
        tooltip: {
            show: !1
        },
        size: {
            height: 80
        }
    }, chartGauge2 = {
        bindto: "#chart-gauge-2",
        data: {
            columns: [
                ["data", 30]
            ],
            types: {
                data: "gauge"
            }
        },
        gauge: {
            width: 3
        },
        color: {
            pattern: ["#E91E63"]
        },
        legend: {
            hide: !0
        },
        tooltip: {
            show: !1
        },
        size: {
            height: 80
        }
    }, chartGauge3 = {
        bindto: "#chart-gauge-3",
        data: {
            columns: [
                ["data", 40]
            ],
            types: {
                data: "gauge"
            }
        },
        gauge: {
            width: 3
        },
        color: {
            pattern: ["#E91E63"]
        },
        legend: {
            hide: !0
        },
        tooltip: {
            show: !1
        },
        size: {
            height: 80
        }
    }, chartPageviews = {
        bindto: "#chart-pagesviews",
        data: {
            columns: [
                ["Pageviews", 3, 4, 5, 10, 20, 14, 18, 12, 10, 20, 10, 14, 15, 10, 20, 14, 18, 12, 10, 20]
            ],
            types: {
                Pageviews: "area"
            }
        },
        axis: {
            x: {
                show: !1
            },
            y: {
                show: !1
            }
        },
        color: {
            pattern: ["#fff"]
        },
        legend: {
            hide: !0
        },
        size: {
            height: 100
        }
    };
$(".dashboard").length > 0 && (c3.generate(serverLoadOptions), c3.generate(chartLine1), c3.generate(chartLine2), c3.generate(chartLine3), c3.generate(chartArea1), c3.generate(chartGauge1), c3.generate(chartGauge2), c3.generate(chartGauge3), c3.generate(chartPageviews)), $(function() {
    if ($("#full-map-canvas").length > 0 && new GMaps({
        div: "#full-map",
        lat: 45,
        lng: -73,
        zoom: 8,
        width: "100%",
        height: "100%"
    }), $(".maps-widgets").length > 0) {
        new GMaps({
            div: "#map-basic",
            lat: 45,
            lng: -73,
            zoom: 8,
            height: "350px"
        });
        var a = new GMaps({
            div: "#map-zoomable",
            lat: 52.369371,
            lng: 4.894494,
            zoom: 8,
            height: "350px"
        });
        $("#slider").on({
            slide: function(b, c) {
                a.setZoom(parseInt(c))
            }
        }), start = $("#slider").data("start"), min = $("#slider").data("min"), max = $("#slider").data("max"), $("#slider").noUiSlider({
            start: start,
            step: 0,
            range: {
                min: [min],
                max: [max]
            }
        });
        var b = new GMaps({
            div: "#map-searchable",
            lat: 40.399516,
            lng: -22.703348,
            zoom: 2,
            height: "350px"
        });
        $("#card-map-searchable button").click(function(a) {
            a.preventDefault(), GMaps.geocode({
                address: $("#card-map-searchable input").val().trim(),
                callback: function(a, c) {
                    if ("OK" == c) {
                        var d = a[0].geometry.location;
                        b.setCenter(d.lat(), d.lng()), b.addMarker({
                            lat: d.lat(),
                            lng: d.lng()
                        })
                    }
                }
            })
        });
        var c = new GMaps({
            div: "#map-clickable",
            lat: 45,
            lng: -73,
            zoom: 2,
            height: "350px"
        }),
            d = [];
        d.push({
            id: 0,
            lat: 52.369371,
            lng: 4.894494,
            title: "Amsterdam"
        }), d.push({
            id: 1,
            lat: 40.712942,
            lng: -74.005774,
            title: "New York"
        }), d.push({
            id: 2,
            lat: 41.385196,
            lng: 2.173315,
            title: "Barcelona"
        }), d.push({
            id: 3,
            lat: 37.764355,
            lng: -122.451954,
            title: "San Francisco"
        }), c.addMarkers(d), $("#card-map-clickable .btn-group .btn").click(function() {
            index = $(this).find("input").val();
            var a = c.markers[index].getPosition();
            lat = a.lat(), lng = a.lng(), c.setCenter(lat, lng)
        })
    }
    $(".map-canvas").vectorMap({
        map: "world_mill_en",
        normalizeFunction: "polynomial",
        hoverOpacity: .7,
        hoverColor: !1,
        series: {
            regions: [{
                scale: [theme("darken-2"), theme("lighten-2")],
                attribute: "fill"
            }]
        },
        regionStyle: {
            initial: {
                fill: theme()
            }
        },
        markerStyle: {
            initial: {
                stroke: theme_secondary("lighten-1"),
                fill: theme_secondary("darken-1")
            },
            hover: {
                stroke: theme_secondary("lighten-3")
            }
        },
        backgroundColor: "transparent",
        markers: [{
            latLng: [41.9, 12.45],
            name: "Vatican City"
        }, {
            latLng: [43.73, 7.41],
            name: "Monaco"
        }, {
            latLng: [-.52, 166.93],
            name: "Nauru"
        }, {
            latLng: [-8.51, 179.21],
            name: "Tuvalu"
        }, {
            latLng: [43.93, 12.46],
            name: "San Marino"
        }, {
            latLng: [47.14, 9.52],
            name: "Liechtenstein"
        }, {
            latLng: [7.11, 171.06],
            name: "Marshall Islands"
        }, {
            latLng: [17.3, -62.73],
            name: "Saint Kitts and Nevis"
        }, {
            latLng: [3.2, 73.22],
            name: "Maldives"
        }, {
            latLng: [35.88, 14.5],
            name: "Malta"
        }, {
            latLng: [12.05, -61.75],
            name: "Grenada"
        }, {
            latLng: [13.16, -61.23],
            name: "Saint Vincent and the Grenadines"
        }, {
            latLng: [13.16, -59.55],
            name: "Barbados"
        }, {
            latLng: [17.11, -61.85],
            name: "Antigua and Barbuda"
        }, {
            latLng: [-4.61, 55.45],
            name: "Seychelles"
        }, {
            latLng: [7.35, 134.46],
            name: "Palau"
        }, {
            latLng: [42.5, 1.51],
            name: "Andorra"
        }, {
            latLng: [14.01, -60.98],
            name: "Saint Lucia"
        }, {
            latLng: [6.91, 158.18],
            name: "Federated States of Micronesia"
        }, {
            latLng: [1.3, 103.8],
            name: "Singapore"
        }, {
            latLng: [1.46, 173.03],
            name: "Kiribati"
        }, {
            latLng: [-21.13, -175.2],
            name: "Tonga"
        }, {
            latLng: [15.3, -61.38],
            name: "Dominica"
        }, {
            latLng: [-20.2, 57.5],
            name: "Mauritius"
        }, {
            latLng: [26.02, 50.55],
            name: "Bahrain"
        }, {
            latLng: [.33, 6.73],
            name: "São Tomé and Príncipe"
        }]
    })
}),
function(a, b, c) {
    var d = function(a, c) {
        "use strict";
        a.extend(!0, c.defaults, {
            dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
            renderer: "bootstrap"
        }), a.extend(c.ext.classes, {
            sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
            sFilterInput: "form-control input-sm",
            sLengthSelect: "form-control input-sm"
        }), c.ext.renderer.pageButton.bootstrap = function(d, e, f, g, h, i) {
            var j, k, l, m = new c.Api(d),
                n = d.oClasses,
                o = d.oLanguage.oPaginate,
                p = 0,
                q = function(b, c) {
                    var e, g, l, r, s = function(b) {
                            b.preventDefault(), a(b.currentTarget).hasClass("disabled") || m.page(b.data.action).draw(!1)
                        };
                    for (e = 0, g = c.length; g > e; e++)
                        if (r = c[e], a.isArray(r)) q(b, r);
                        else {
                            switch (j = "", k = "", r) {
                                case "ellipsis":
                                    j = "&hellip;", k = "disabled";
                                    break;
                                case "first":
                                    j = o.sFirst, k = r + (h > 0 ? "" : " disabled");
                                    break;
                                case "previous":
                                    j = o.sPrevious, k = r + (h > 0 ? "" : " disabled");
                                    break;
                                case "next":
                                    j = o.sNext, k = r + (i - 1 > h ? "" : " disabled");
                                    break;
                                case "last":
                                    j = o.sLast, k = r + (i - 1 > h ? "" : " disabled");
                                    break;
                                default:
                                    j = r + 1, k = h === r ? "active" : ""
                            }
                            j && (l = a("<li>", {
                                "class": n.sPageButton + " " + k,
                                id: 0 === f && "string" == typeof r ? d.sTableId + "_" + r : null
                            }).append(a("<a>", {
                                href: "#",
                                "aria-controls": d.sTableId,
                                "data-dt-idx": p,
                                tabindex: d.iTabIndex
                            }).html(j)).appendTo(b), d.oApi._fnBindAction(l, {
                                action: r
                            }, s), p++)
                        }
                };
            try {
                l = a(b.activeElement).data("dt-idx")
            } catch (r) {}
            q(a(e).empty().html('<ul class="pagination"/>').children("ul"), g), l && a(e).find("[data-dt-idx=" + l + "]").focus()
        }, c.TableTools && (a.extend(!0, c.TableTools.classes, {
            container: "DTTT btn-group",
            buttons: {
                normal: "btn btn-default",
                disabled: "disabled"
            },
            collection: {
                container: "DTTT_dropdown dropdown-menu",
                buttons: {
                    normal: "",
                    disabled: "disabled"
                }
            },
            print: {
                info: "DTTT_print_info"
            },
            select: {
                row: "active"
            }
        }), a.extend(!0, c.TableTools.DEFAULTS.oTags, {
            collection: {
                container: "ul",
                button: "li",
                liner: "a"
            }
        }))
    };
    "function" == typeof define && define.amd ? define(["jquery", "datatables"], d) : "object" == typeof exports ? d(require("jquery"), require("datatables")) : jQuery && d(jQuery, jQuery.fn.dataTable)
}(window, document), $(function() {
    $("#example").addClass("nowrap").dataTable({
        responsive: !0,
        columnDefs: [{
            targets: [-1, -3],
            className: "dt-body-right"
        }]
    })
}), $(function() {
    $("body").find(".btn-flip, .card-image").on("click", function(a) {
        $(a.currentTarget).parents(".card").find(".card-reveal").toggleClass("active")
    })
});
var modal_content = '<div class="modal" id="exampleModal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Test modal</h4></div><div class="modal-body"><h4>Text in a modal</h4><p ng-bind-html="content"></p><pre>2 + 3 = {{ 2 + 3 }}</pre><h4>Popover in a modal</h4><p>This <button role="button" class="btn btn-default popover-test" data-title="A Title" data-content="And here\'s some amazing content. It\'s very engaging. right?" data-toggle="popover">button</button> should trigger a popover on click.</p><h4>Tooltips in a modal</h4><p><a href="#" class="tooltip-test" data-title="Tooltip" data-toggle="tooltip">This link</a> and <a href="#" class="tooltip-test" data-title="Tooltip" data-toggle="tooltip">that link</a> should have tooltips on hover.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button></div></div></div></div>';
$('.messages button[bs-modal="modal"]').on("click", function(a) {
    $("#exampleModal").remove();
    var b = $(modal_content);
    $("body").append(b), $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), b.modal({
        backdrop: "static",
        keyboard: !1
    })
});
