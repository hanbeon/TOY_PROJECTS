! function(t, e, i) {
    var n = t.L,
        o = {};
    o.version = "0.7.3", "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && define.amd && define(o), o.noConflict = function() {
            return t.L = n, this
        }, t.L = o, o.Util = {
            extend: function(t) {
                var e, i, n, o, s = Array.prototype.slice.call(arguments, 1);
                for (i = 0, n = s.length; n > i; i++) {
                    o = s[i] || {};
                    for (e in o) o.hasOwnProperty(e) && (t[e] = o[e])
                }
                return t
            },
            bind: function(t, e) {
                var i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
                return function() {
                    return t.apply(e, i || arguments)
                }
            },
            stamp: function() {
                var t = 0,
                    e = "_leaflet_id";
                return function(i) {
                    return i[e] = i[e] || ++t, i[e]
                }
            }(),
            invokeEach: function(t, e, i) {
                var n, o;
                if ("object" == typeof t) {
                    o = Array.prototype.slice.call(arguments, 3);
                    for (n in t) e.apply(i, [n, t[n]].concat(o));
                    return !0
                }
                return !1
            },
            limitExecByInterval: function(t, e, i) {
                var n, o;
                return function s() {
                    var a = arguments;
                    return n ? void(o = !0) : (n = !0, setTimeout(function() {
                        n = !1, o && (s.apply(i, a), o = !1)
                    }, e), void t.apply(i, a))
                }
            },
            falseFn: function() {
                return !1
            },
            formatNum: function(t, e) {
                var i = Math.pow(10, e || 5);
                return Math.round(t * i) / i
            },
            trim: function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            },
            splitWords: function(t) {
                return o.Util.trim(t).split(/\s+/)
            },
            setOptions: function(t, e) {
                return t.options = o.extend({}, t.options, e), t.options
            },
            getParamString: function(t, e, i) {
                var n = [];
                for (var o in t) n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
                return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&")
            },
            template: function(t, e) {
                return t.replace(/\{ *([\w_]+) *\}/g, function(t, n) {
                    var o = e[n];
                    if (o === i) throw new Error("No value provided for variable " + t);
                    return "function" == typeof o && (o = o(e)), o
                })
            },
            isArray: Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        },
        function() {
            function e(e) {
                var i, n, o = ["webkit", "moz", "o", "ms"];
                for (i = 0; i < o.length && !n; i++) n = t[o[i] + e];
                return n
            }

            function i(e) {
                var i = +new Date,
                    o = Math.max(0, 16 - (i - n));
                return n = i + o, t.setTimeout(e, o)
            }
            var n = 0,
                s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
                a = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
                    t.clearTimeout(e)
                };
            o.Util.requestAnimFrame = function(e, n, a, r) {
                return e = o.bind(e, n), a && s === i ? void e() : s.call(t, e, r)
            }, o.Util.cancelAnimFrame = function(e) {
                e && a.call(t, e)
            }
        }(), o.extend = o.Util.extend, o.bind = o.Util.bind, o.stamp = o.Util.stamp, o.setOptions = o.Util.setOptions, o.Class = function() {}, o.Class.extend = function(t) {
            var e = function() {
                    this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
                },
                i = function() {};
            i.prototype = this.prototype;
            var n = new i;
            n.constructor = e, e.prototype = n;
            for (var s in this) this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
            t.statics && (o.extend(e, t.statics), delete t.statics), t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), t.options && n.options && (t.options = o.extend({}, n.options, t.options)), o.extend(n, t), n._initHooks = [];
            var a = this;
            return e.__super__ = a.prototype, n.callInitHooks = function() {
                if (!this._initHooksCalled) {
                    a.prototype.callInitHooks && a.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
                    for (var t = 0, e = n._initHooks.length; e > t; t++) n._initHooks[t].call(this)
                }
            }, e
        }, o.Class.include = function(t) {
            o.extend(this.prototype, t)
        }, o.Class.mergeOptions = function(t) {
            o.extend(this.prototype.options, t)
        }, o.Class.addInitHook = function(t) {
            var e = Array.prototype.slice.call(arguments, 1),
                i = "function" == typeof t ? t : function() {
                    this[t].apply(this, e)
                };
            this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i)
        };
    var s = "_leaflet_events";
    o.Mixin = {}, o.Mixin.Events = {
            addEventListener: function(t, e, i) {
                if (o.Util.invokeEach(t, this.addEventListener, this, e, i)) return this;
                var n, a, r, h, l, u, c, d = this[s] = this[s] || {},
                    p = i && i !== this && o.stamp(i);
                for (t = o.Util.splitWords(t), n = 0, a = t.length; a > n; n++) r = {
                    action: e,
                    context: i || this
                }, h = t[n], p ? (l = h + "_idx", u = l + "_len", c = d[l] = d[l] || {}, c[p] || (c[p] = [], d[u] = (d[u] || 0) + 1), c[p].push(r)) : (d[h] = d[h] || [], d[h].push(r));
                return this
            },
            hasEventListeners: function(t) {
                var e = this[s];
                return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
            },
            removeEventListener: function(t, e, i) {
                if (!this[s]) return this;
                if (!t) return this.clearAllEventListeners();
                if (o.Util.invokeEach(t, this.removeEventListener, this, e, i)) return this;
                var n, a, r, h, l, u, c, d, p, _ = this[s],
                    m = i && i !== this && o.stamp(i);
                for (t = o.Util.splitWords(t), n = 0, a = t.length; a > n; n++)
                    if (r = t[n], u = r + "_idx", c = u + "_len", d = _[u], e) {
                        if (h = m && d ? d[m] : _[r]) {
                            for (l = h.length - 1; l >= 0; l--) h[l].action !== e || i && h[l].context !== i || (p = h.splice(l, 1), p[0].action = o.Util.falseFn);
                            i && d && 0 === h.length && (delete d[m], _[c]--)
                        }
                    } else delete _[r], delete _[u], delete _[c];
                return this
            },
            clearAllEventListeners: function() {
                return delete this[s], this
            },
            fireEvent: function(t, e) {
                if (!this.hasEventListeners(t)) return this;
                var i, n, a, r, h, l = o.Util.extend({}, e, {
                        type: t,
                        target: this
                    }),
                    u = this[s];
                if (u[t])
                    for (i = u[t].slice(), n = 0, a = i.length; a > n; n++) i[n].action.call(i[n].context, l);
                r = u[t + "_idx"];
                for (h in r)
                    if (i = r[h].slice())
                        for (n = 0, a = i.length; a > n; n++) i[n].action.call(i[n].context, l);
                return this
            },
            addOneTimeEventListener: function(t, e, i) {
                if (o.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i)) return this;
                var n = o.bind(function() {
                    this.removeEventListener(t, e, i).removeEventListener(t, n, i)
                }, this);
                return this.addEventListener(t, e, i).addEventListener(t, n, i)
            }
        }, o.Mixin.Events.on = o.Mixin.Events.addEventListener, o.Mixin.Events.off = o.Mixin.Events.removeEventListener, o.Mixin.Events.once = o.Mixin.Events.addOneTimeEventListener, o.Mixin.Events.fire = o.Mixin.Events.fireEvent,
        function() {
            var n = "ActiveXObject" in t,
                s = n && !e.addEventListener,
                a = navigator.userAgent.toLowerCase(),
                r = -1 !== a.indexOf("webkit"),
                h = -1 !== a.indexOf("chrome"),
                l = -1 !== a.indexOf("phantom"),
                u = -1 !== a.indexOf("android"),
                c = -1 !== a.search("android [23]"),
                d = -1 !== a.indexOf("gecko"),
                p = typeof orientation != i + "",
                _ = t.navigator && t.navigator.msPointerEnabled && t.navigator.msMaxTouchPoints && !t.PointerEvent,
                m = t.PointerEvent && t.navigator.pointerEnabled && t.navigator.maxTouchPoints || _,
                f = "devicePixelRatio" in t && t.devicePixelRatio > 1 || "matchMedia" in t && t.matchMedia("(min-resolution:144dpi)") && t.matchMedia("(min-resolution:144dpi)").matches,
                g = e.documentElement,
                v = n && "transition" in g.style,
                y = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !c,
                P = "MozPerspective" in g.style,
                L = "OTransition" in g.style,
                x = !t.L_DISABLE_3D && (v || y || P || L) && !l,
                w = !t.L_NO_TOUCH && !l && function() {
                    var t = "ontouchstart";
                    if (m || t in g) return !0;
                    var i = e.createElement("div"),
                        n = !1;
                    return i.setAttribute ? (i.setAttribute(t, "return;"), "function" == typeof i[t] && (n = !0), i.removeAttribute(t), i = null, n) : !1
                }();
            o.Browser = {
                ie: n,
                ielt9: s,
                webkit: r,
                gecko: d && !r && !t.opera && !n,
                android: u,
                android23: c,
                chrome: h,
                ie3d: v,
                webkit3d: y,
                gecko3d: P,
                opera3d: L,
                any3d: x,
                mobile: p,
                mobileWebkit: p && r,
                mobileWebkit3d: p && y,
                mobileOpera: p && t.opera,
                touch: w,
                msPointer: _,
                pointer: m,
                retina: f
            }
        }(), o.Point = function(t, e, i) {
            this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
        }, o.Point.prototype = {
            clone: function() {
                return new o.Point(this.x, this.y)
            },
            add: function(t) {
                return this.clone()._add(o.point(t))
            },
            _add: function(t) {
                return this.x += t.x, this.y += t.y, this
            },
            subtract: function(t) {
                return this.clone()._subtract(o.point(t))
            },
            _subtract: function(t) {
                return this.x -= t.x, this.y -= t.y, this
            },
            divideBy: function(t) {
                return this.clone()._divideBy(t)
            },
            _divideBy: function(t) {
                return this.x /= t, this.y /= t, this
            },
            multiplyBy: function(t) {
                return this.clone()._multiplyBy(t)
            },
            _multiplyBy: function(t) {
                return this.x *= t, this.y *= t, this
            },
            round: function() {
                return this.clone()._round()
            },
            _round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            },
            floor: function() {
                return this.clone()._floor()
            },
            _floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            },
            distanceTo: function(t) {
                t = o.point(t);
                var e = t.x - this.x,
                    i = t.y - this.y;
                return Math.sqrt(e * e + i * i)
            },
            equals: function(t) {
                return t = o.point(t), t.x === this.x && t.y === this.y
            },
            contains: function(t) {
                return t = o.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
            },
            toString: function() {
                return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
            }
        }, o.point = function(t, e, n) {
            return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0], t[1]) : t === i || null === t ? t : new o.Point(t, e, n)
        }, o.Bounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; o > n; n++) this.extend(i[n])
        }, o.Bounds.prototype = {
            extend: function(t) {
                return t = o.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
            },
            getCenter: function(t) {
                return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
            },
            getBottomLeft: function() {
                return new o.Point(this.min.x, this.max.y)
            },
            getTopRight: function() {
                return new o.Point(this.max.x, this.min.y)
            },
            getSize: function() {
                return this.max.subtract(this.min)
            },
            contains: function(t) {
                var e, i;
                return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t), t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
            },
            intersects: function(t) {
                t = o.bounds(t);
                var e = this.min,
                    i = this.max,
                    n = t.min,
                    s = t.max,
                    a = s.x >= e.x && n.x <= i.x,
                    r = s.y >= e.y && n.y <= i.y;
                return a && r
            },
            isValid: function() {
                return !(!this.min || !this.max)
            }
        }, o.bounds = function(t, e) {
            return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e)
        }, o.Transformation = function(t, e, i, n) {
            this._a = t, this._b = e, this._c = i, this._d = n
        }, o.Transformation.prototype = {
            transform: function(t, e) {
                return this._transform(t.clone(), e)
            },
            _transform: function(t, e) {
                return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
            },
            untransform: function(t, e) {
                return e = e || 1, new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
            }
        }, o.DomUtil = {
            get: function(t) {
                return "string" == typeof t ? e.getElementById(t) : t
            },
            getStyle: function(t, i) {
                var n = t.style[i];
                if (!n && t.currentStyle && (n = t.currentStyle[i]), (!n || "auto" === n) && e.defaultView) {
                    var o = e.defaultView.getComputedStyle(t, null);
                    n = o ? o[i] : null
                }
                return "auto" === n ? null : n
            },
            getViewportOffset: function(t) {
                var i, n = 0,
                    s = 0,
                    a = t,
                    r = e.body,
                    h = e.documentElement;
                do {
                    if (n += a.offsetTop || 0, s += a.offsetLeft || 0, n += parseInt(o.DomUtil.getStyle(a, "borderTopWidth"), 10) || 0, s += parseInt(o.DomUtil.getStyle(a, "borderLeftWidth"), 10) || 0, i = o.DomUtil.getStyle(a, "position"), a.offsetParent === r && "absolute" === i) break;
                    if ("fixed" === i) {
                        n += r.scrollTop || h.scrollTop || 0, s += r.scrollLeft || h.scrollLeft || 0;
                        break
                    }
                    if ("relative" === i && !a.offsetLeft) {
                        var l = o.DomUtil.getStyle(a, "width"),
                            u = o.DomUtil.getStyle(a, "max-width"),
                            c = a.getBoundingClientRect();
                        ("none" !== l || "none" !== u) && (s += c.left + a.clientLeft), n += c.top + (r.scrollTop || h.scrollTop || 0);
                        break
                    }
                    a = a.offsetParent
                } while (a);
                a = t;
                do {
                    if (a === r) break;
                    n -= a.scrollTop || 0, s -= a.scrollLeft || 0, a = a.parentNode
                } while (a);
                return new o.Point(s, n)
            },
            documentIsLtr: function() {
                return o.DomUtil._docIsLtrCached || (o.DomUtil._docIsLtrCached = !0, o.DomUtil._docIsLtr = "ltr" === o.DomUtil.getStyle(e.body, "direction")), o.DomUtil._docIsLtr
            },
            create: function(t, i, n) {
                var o = e.createElement(t);
                return o.className = i, n && n.appendChild(o), o
            },
            hasClass: function(t, e) {
                if (t.classList !== i) return t.classList.contains(e);
                var n = o.DomUtil._getClass(t);
                return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
            },
            addClass: function(t, e) {
                if (t.classList !== i)
                    for (var n = o.Util.splitWords(e), s = 0, a = n.length; a > s; s++) t.classList.add(n[s]);
                else if (!o.DomUtil.hasClass(t, e)) {
                    var r = o.DomUtil._getClass(t);
                    o.DomUtil._setClass(t, (r ? r + " " : "") + e)
                }
            },
            removeClass: function(t, e) {
                t.classList !== i ? t.classList.remove(e) : o.DomUtil._setClass(t, o.Util.trim((" " + o.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
            },
            _setClass: function(t, e) {
                t.className.baseVal === i ? t.className = e : t.className.baseVal = e
            },
            _getClass: function(t) {
                return t.className.baseVal === i ? t.className : t.className.baseVal
            },
            setOpacity: function(t, e) {
                if ("opacity" in t.style) t.style.opacity = e;
                else if ("filter" in t.style) {
                    var i = !1,
                        n = "DXImageTransform.Microsoft.Alpha";
                    try {
                        i = t.filters.item(n)
                    } catch (o) {
                        if (1 === e) return
                    }
                    e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
                }
            },
            testProp: function(t) {
                for (var i = e.documentElement.style, n = 0; n < t.length; n++)
                    if (t[n] in i) return t[n];
                return !1
            },
            getTranslateString: function(t) {
                var e = o.Browser.webkit3d,
                    i = "translate" + (e ? "3d" : "") + "(",
                    n = (e ? ",0" : "") + ")";
                return i + t.x + "px," + t.y + "px" + n
            },
            getScaleString: function(t, e) {
                var i = o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))),
                    n = " scale(" + t + ") ";
                return i + n
            },
            setPosition: function(t, e, i) {
                t._leaflet_pos = e, !i && o.Browser.any3d ? t.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
            },
            getPosition: function(t) {
                return t._leaflet_pos
            }
        }, o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), o.DomUtil.TRANSITION_END = "webkitTransition" === o.DomUtil.TRANSITION || "OTransition" === o.DomUtil.TRANSITION ? o.DomUtil.TRANSITION + "End" : "transitionend",
        function() {
            if ("onselectstart" in e) o.extend(o.DomUtil, {
                disableTextSelection: function() {
                    o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
                },
                enableTextSelection: function() {
                    o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
                }
            });
            else {
                var i = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                o.extend(o.DomUtil, {
                    disableTextSelection: function() {
                        if (i) {
                            var t = e.documentElement.style;
                            this._userSelect = t[i], t[i] = "none"
                        }
                    },
                    enableTextSelection: function() {
                        i && (e.documentElement.style[i] = this._userSelect, delete this._userSelect)
                    }
                })
            }
            o.extend(o.DomUtil, {
                disableImageDrag: function() {
                    o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
                },
                enableImageDrag: function() {
                    o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
                }
            })
        }(), o.LatLng = function(t, e, n) {
            if (t = parseFloat(t), e = parseFloat(e), isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
            this.lat = t, this.lng = e, n !== i && (this.alt = parseFloat(n))
        }, o.extend(o.LatLng, {
            DEG_TO_RAD: Math.PI / 180,
            RAD_TO_DEG: 180 / Math.PI,
            MAX_MARGIN: 1e-9
        }), o.LatLng.prototype = {
            equals: function(t) {
                if (!t) return !1;
                t = o.latLng(t);
                var e = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
                return e <= o.LatLng.MAX_MARGIN
            },
            toString: function(t) {
                return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
            },
            distanceTo: function(t) {
                t = o.latLng(t);
                var e = 6378137,
                    i = o.LatLng.DEG_TO_RAD,
                    n = (t.lat - this.lat) * i,
                    s = (t.lng - this.lng) * i,
                    a = this.lat * i,
                    r = t.lat * i,
                    h = Math.sin(n / 2),
                    l = Math.sin(s / 2),
                    u = h * h + l * l * Math.cos(a) * Math.cos(r);
                return 2 * e * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u))
            },
            wrap: function(t, e) {
                var i = this.lng;
                return t = t || -180, e = e || 180, i = (i + e) % (e - t) + (t > i || i === e ? e : t), new o.LatLng(this.lat, i)
            }
        }, o.latLng = function(t, e) {
            return t instanceof o.LatLng ? t : o.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new o.LatLng(t[0], t[1], t[2]) : null : t === i || null === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === i ? null : new o.LatLng(t, e)
        }, o.LatLngBounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; o > n; n++) this.extend(i[n])
        }, o.LatLngBounds.prototype = {
            extend: function(t) {
                if (!t) return this;
                var e = o.latLng(t);
                return t = null !== e ? e : o.latLngBounds(t), t instanceof o.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat), this._southWest.lng = Math.min(t.lng, this._southWest.lng), this._northEast.lat = Math.max(t.lat, this._northEast.lat), this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new o.LatLng(t.lat, t.lng), this._northEast = new o.LatLng(t.lat, t.lng)) : t instanceof o.LatLngBounds && (this.extend(t._southWest), this.extend(t._northEast)), this
            },
            pad: function(t) {
                var e = this._southWest,
                    i = this._northEast,
                    n = Math.abs(e.lat - i.lat) * t,
                    s = Math.abs(e.lng - i.lng) * t;
                return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - s), new o.LatLng(i.lat + n, i.lng + s))
            },
            getCenter: function() {
                return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
            },
            getSouthWest: function() {
                return this._southWest
            },
            getNorthEast: function() {
                return this._northEast
            },
            getNorthWest: function() {
                return new o.LatLng(this.getNorth(), this.getWest())
            },
            getSouthEast: function() {
                return new o.LatLng(this.getSouth(), this.getEast())
            },
            getWest: function() {
                return this._southWest.lng
            },
            getSouth: function() {
                return this._southWest.lat
            },
            getEast: function() {
                return this._northEast.lng
            },
            getNorth: function() {
                return this._northEast.lat
            },
            contains: function(t) {
                t = "number" == typeof t[0] || t instanceof o.LatLng ? o.latLng(t) : o.latLngBounds(t);
                var e, i, n = this._southWest,
                    s = this._northEast;
                return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
            },
            intersects: function(t) {
                t = o.latLngBounds(t);
                var e = this._southWest,
                    i = this._northEast,
                    n = t.getSouthWest(),
                    s = t.getNorthEast(),
                    a = s.lat >= e.lat && n.lat <= i.lat,
                    r = s.lng >= e.lng && n.lng <= i.lng;
                return a && r
            },
            toBBoxString: function() {
                return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
            },
            equals: function(t) {
                return t ? (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast())) : !1
            },
            isValid: function() {
                return !(!this._southWest || !this._northEast)
            }
        }, o.latLngBounds = function(t, e) {
            return !t || t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t, e)
        }, o.Projection = {}, o.Projection.SphericalMercator = {
            MAX_LATITUDE: 85.0511287798,
            project: function(t) {
                var e = o.LatLng.DEG_TO_RAD,
                    i = this.MAX_LATITUDE,
                    n = Math.max(Math.min(i, t.lat), -i),
                    s = t.lng * e,
                    a = n * e;
                return a = Math.log(Math.tan(Math.PI / 4 + a / 2)), new o.Point(s, a)
            },
            unproject: function(t) {
                var e = o.LatLng.RAD_TO_DEG,
                    i = t.x * e,
                    n = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
                return new o.LatLng(n, i)
            }
        }, o.Projection.LonLat = {
            project: function(t) {
                return new o.Point(t.lng, t.lat)
            },
            unproject: function(t) {
                return new o.LatLng(t.y, t.x)
            }
        }, o.CRS = {
            latLngToPoint: function(t, e) {
                var i = this.projection.project(t),
                    n = this.scale(e);
                return this.transformation._transform(i, n)
            },
            pointToLatLng: function(t, e) {
                var i = this.scale(e),
                    n = this.transformation.untransform(t, i);
                return this.projection.unproject(n)
            },
            project: function(t) {
                return this.projection.project(t)
            },
            scale: function(t) {
                return 256 * Math.pow(2, t)
            },
            getSize: function(t) {
                var e = this.scale(t);
                return o.point(e, e)
            }
        }, o.CRS.Simple = o.extend({}, o.CRS, {
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1, 0, -1, 0),
            scale: function(t) {
                return Math.pow(2, t)
            }
        }), o.CRS.EPSG3857 = o.extend({}, o.CRS, {
            code: "EPSG:3857",
            projection: o.Projection.SphericalMercator,
            transformation: new o.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
            project: function(t) {
                var e = this.projection.project(t),
                    i = 6378137;
                return e.multiplyBy(i)
            }
        }), o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
            code: "EPSG:900913"
        }), o.CRS.EPSG4326 = o.extend({}, o.CRS, {
            code: "EPSG:4326",
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1 / 360, .5, -1 / 360, .5)
        }), o.Map = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
                crs: o.CRS.EPSG3857,
                fadeAnimation: o.DomUtil.TRANSITION && !o.Browser.android23,
                trackResize: !0,
                markerZoomAnimation: o.DomUtil.TRANSITION && o.Browser.any3d
            },
            initialize: function(t, e) {
                e = o.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = o.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.center && e.zoom !== i && this.setView(o.latLng(e.center), e.zoom, {
                    reset: !0
                }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(e.layers)
            },
            setView: function(t, e) {
                return e = e === i ? this.getZoom() : e, this._resetView(o.latLng(t), this._limitZoom(e)), this
            },
            setZoom: function(t, e) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                    zoom: e
                }) : (this._zoom = this._limitZoom(t), this)
            },
            zoomIn: function(t, e) {
                return this.setZoom(this._zoom + (t || 1), e)
            },
            zoomOut: function(t, e) {
                return this.setZoom(this._zoom - (t || 1), e)
            },
            setZoomAround: function(t, e, i) {
                var n = this.getZoomScale(e),
                    s = this.getSize().divideBy(2),
                    a = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
                    r = a.subtract(s).multiplyBy(1 - 1 / n),
                    h = this.containerPointToLatLng(s.add(r));
                return this.setView(h, e, {
                    zoom: i
                })
            },
            fitBounds: function(t, e) {
                e = e || {}, t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
                var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
                    n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
                    s = this.getBoundsZoom(t, !1, i.add(n)),
                    a = n.subtract(i).divideBy(2),
                    r = this.project(t.getSouthWest(), s),
                    h = this.project(t.getNorthEast(), s),
                    l = this.unproject(r.add(h).divideBy(2).add(a), s);
                return s = e && e.maxZoom ? Math.min(e.maxZoom, s) : s, this.setView(l, s, e)
            },
            fitWorld: function(t) {
                return this.fitBounds([
                    [-90, -180],
                    [90, 180]
                ], t)
            },
            panTo: function(t, e) {
                return this.setView(t, this._zoom, {
                    pan: e
                })
            },
            panBy: function(t) {
                return this.fire("movestart"), this._rawPanBy(o.point(t)), this.fire("move"), this.fire("moveend")
            },
            setMaxBounds: function(t) {
                return t = o.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
            },
            panInsideBounds: function(t, e) {
                var i = this.getCenter(),
                    n = this._limitCenter(i, this._zoom, t);
                return i.equals(n) ? this : this.panTo(n, e)
            },
            addLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? this : (this._layers[e] = t, !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t, this._updateZoomLevels()), this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, t.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(t), this)
            },
            removeLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && this.fire("layerremove", {
                    layer: t
                }), this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels()), this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, t.off("load", this._onTileLayerLoad, this)), this) : this
            },
            hasLayer: function(t) {
                return t ? o.stamp(t) in this._layers : !1
            },
            eachLayer: function(t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            invalidateSize: function(t) {
                if (!this._loaded) return this;
                t = o.extend({
                    animate: !1,
                    pan: !0
                }, t === !0 ? {
                    animate: !0
                } : t);
                var e = this.getSize();
                this._sizeChanged = !0, this._initialCenter = null;
                var i = this.getSize(),
                    n = e.divideBy(2).round(),
                    s = i.divideBy(2).round(),
                    a = n.subtract(s);
                return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: e,
                    newSize: i
                })) : this
            },
            addHandler: function(t, e) {
                if (!e) return this;
                var i = this[t] = new e(this);
                return this._handlers.push(i), this.options[t] && i.enable(), this
            },
            remove: function() {
                this._loaded && this.fire("unload"), this._initEvents("off");
                try {
                    delete this._container._leaflet
                } catch (t) {
                    this._container._leaflet = i
                }
                return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
            },
            getCenter: function() {
                return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
            },
            getZoom: function() {
                return this._zoom
            },
            getBounds: function() {
                var t = this.getPixelBounds(),
                    e = this.unproject(t.getBottomLeft()),
                    i = this.unproject(t.getTopRight());
                return new o.LatLngBounds(e, i)
            },
            getMinZoom: function() {
                return this.options.minZoom === i ? this._layersMinZoom === i ? 0 : this._layersMinZoom : this.options.minZoom
            },
            getMaxZoom: function() {
                return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
            },
            getBoundsZoom: function(t, e, i) {
                t = o.latLngBounds(t);
                var n, s = this.getMinZoom() - (e ? 1 : 0),
                    a = this.getMaxZoom(),
                    r = this.getSize(),
                    h = t.getNorthWest(),
                    l = t.getSouthEast(),
                    u = !0;
                i = o.point(i || [0, 0]);
                do s++, n = this.project(l, s).subtract(this.project(h, s)).add(i), u = e ? n.x < r.x || n.y < r.y : r.contains(n); while (u && a >= s);
                return u && e ? null : e ? s : s - 1
            },
            getSize: function() {
                return (!this._size || this._sizeChanged) && (this._size = new o.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
            },
            getPixelBounds: function() {
                var t = this._getTopLeftPoint();
                return new o.Bounds(t, t.add(this.getSize()))
            },
            getPixelOrigin: function() {
                return this._checkIfLoaded(), this._initialTopLeftPoint
            },
            getPanes: function() {
                return this._panes
            },
            getContainer: function() {
                return this._container
            },
            getZoomScale: function(t) {
                var e = this.options.crs;
                return e.scale(t) / e.scale(this._zoom)
            },
            getScaleZoom: function(t) {
                return this._zoom + Math.log(t) / Math.LN2
            },
            project: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.latLngToPoint(o.latLng(t), e)
            },
            unproject: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.pointToLatLng(o.point(t), e)
            },
            layerPointToLatLng: function(t) {
                var e = o.point(t).add(this.getPixelOrigin());
                return this.unproject(e)
            },
            latLngToLayerPoint: function(t) {
                var e = this.project(o.latLng(t))._round();
                return e._subtract(this.getPixelOrigin())
            },
            containerPointToLayerPoint: function(t) {
                return o.point(t).subtract(this._getMapPanePos())
            },
            layerPointToContainerPoint: function(t) {
                return o.point(t).add(this._getMapPanePos())
            },
            containerPointToLatLng: function(t) {
                var e = this.containerPointToLayerPoint(o.point(t));
                return this.layerPointToLatLng(e)
            },
            latLngToContainerPoint: function(t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
            },
            mouseEventToContainerPoint: function(t) {
                return o.DomEvent.getMousePosition(t, this._container)
            },
            mouseEventToLayerPoint: function(t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
            },
            mouseEventToLatLng: function(t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
            },
            _initContainer: function(t) {
                var e = this._container = o.DomUtil.get(t);
                if (!e) throw new Error("Map container not found.");
                if (e._leaflet) throw new Error("Map container is already initialized.");
                e._leaflet = !0
            },
            _initLayout: function() {
                var t = this._container;
                o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
                var e = o.DomUtil.getStyle(t, "position");
                "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
            },
            _initPanes: function() {
                var t = this._panes = {};
                this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), t.shadowPane = this._createPane("leaflet-shadow-pane"), t.overlayPane = this._createPane("leaflet-overlay-pane"), t.markerPane = this._createPane("leaflet-marker-pane"), t.popupPane = this._createPane("leaflet-popup-pane");
                var e = " leaflet-zoom-hide";
                this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, e), o.DomUtil.addClass(t.shadowPane, e), o.DomUtil.addClass(t.popupPane, e))
            },
            _createPane: function(t, e) {
                return o.DomUtil.create("div", t, e || this._panes.objectsPane)
            },
            _clearPanes: function() {
                this._container.removeChild(this._mapPane)
            },
            _addLayers: function(t) {
                t = t ? o.Util.isArray(t) ? t : [t] : [];
                for (var e = 0, i = t.length; i > e; e++) this.addLayer(t[e])
            },
            _resetView: function(t, e, i, n) {
                var s = this._zoom !== e;
                n || (this.fire("movestart"), s && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(t), i ? this._initialTopLeftPoint._add(this._getMapPanePos()) : o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
                var a = !this._loaded;
                this._loaded = !0, this.fire("viewreset", {
                    hard: !i
                }), a && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("move"), (s || n) && this.fire("zoomend"), this.fire("moveend", {
                    hard: !i
                })
            },
            _rawPanBy: function(t) {
                o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
            },
            _getZoomSpan: function() {
                return this.getMaxZoom() - this.getMinZoom()
            },
            _updateZoomLevels: function() {
                var t, e = 1 / 0,
                    n = -1 / 0,
                    o = this._getZoomSpan();
                for (t in this._zoomBoundLayers) {
                    var s = this._zoomBoundLayers[t];
                    isNaN(s.options.minZoom) || (e = Math.min(e, s.options.minZoom)), isNaN(s.options.maxZoom) || (n = Math.max(n, s.options.maxZoom))
                }
                t === i ? this._layersMaxZoom = this._layersMinZoom = i : (this._layersMaxZoom = n, this._layersMinZoom = e), o !== this._getZoomSpan() && this.fire("zoomlevelschange")
            },
            _panInsideMaxBounds: function() {
                this.panInsideBounds(this.options.maxBounds)
            },
            _checkIfLoaded: function() {
                if (!this._loaded) throw new Error("Set map center and zoom first.")
            },
            _initEvents: function(e) {
                if (o.DomEvent) {
                    e = e || "on", o.DomEvent[e](this._container, "click", this._onMouseClick, this);
                    var i, n, s = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
                    for (i = 0, n = s.length; n > i; i++) o.DomEvent[e](this._container, s[i], this._fireMouseEvent, this);
                    this.options.trackResize && o.DomEvent[e](t, "resize", this._onResize, this)
                }
            },
            _onResize: function() {
                o.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = o.Util.requestAnimFrame(function() {
                    this.invalidateSize({
                        debounceMoveend: !0
                    })
                }, this, !1, this._container)
            },
            _onMouseClick: function(t) {
                !this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || o.DomEvent._skipped(t) || (this.fire("preclick"), this._fireMouseEvent(t))
            },
            _fireMouseEvent: function(t) {
                if (this._loaded && !o.DomEvent._skipped(t)) {
                    var e = t.type;
                    if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e)) {
                        "contextmenu" === e && o.DomEvent.preventDefault(t);
                        var i = this.mouseEventToContainerPoint(t),
                            n = this.containerPointToLayerPoint(i),
                            s = this.layerPointToLatLng(n);
                        this.fire(e, {
                            latlng: s,
                            layerPoint: n,
                            containerPoint: i,
                            originalEvent: t
                        })
                    }
                }
            },
            _onTileLayerLoad: function() {
                this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
            },
            _clearHandlers: function() {
                for (var t = 0, e = this._handlers.length; e > t; t++) this._handlers[t].disable()
            },
            whenReady: function(t, e) {
                return this._loaded ? t.call(e || this, this) : this.on("load", t, e), this
            },
            _layerAdd: function(t) {
                t.onAdd(this), this.fire("layeradd", {
                    layer: t
                })
            },
            _getMapPanePos: function() {
                return o.DomUtil.getPosition(this._mapPane)
            },
            _moved: function() {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0])
            },
            _getTopLeftPoint: function() {
                return this.getPixelOrigin().subtract(this._getMapPanePos())
            },
            _getNewTopLeftPoint: function(t, e) {
                var i = this.getSize()._divideBy(2);
                return this.project(t, e)._subtract(i)._round()
            },
            _latLngToNewLayerPoint: function(t, e, i) {
                var n = this._getNewTopLeftPoint(i, e).add(this._getMapPanePos());
                return this.project(t, e)._subtract(n)
            },
            _getCenterLayerPoint: function() {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
            },
            _getCenterOffset: function(t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
            },
            _limitCenter: function(t, e, i) {
                if (!i) return t;
                var n = this.project(t, e),
                    s = this.getSize().divideBy(2),
                    a = new o.Bounds(n.subtract(s), n.add(s)),
                    r = this._getBoundsOffset(a, i, e);
                return this.unproject(n.add(r), e)
            },
            _limitOffset: function(t, e) {
                if (!e) return t;
                var i = this.getPixelBounds(),
                    n = new o.Bounds(i.min.add(t), i.max.add(t));
                return t.add(this._getBoundsOffset(n, e))
            },
            _getBoundsOffset: function(t, e, i) {
                var n = this.project(e.getNorthWest(), i).subtract(t.min),
                    s = this.project(e.getSouthEast(), i).subtract(t.max),
                    a = this._rebound(n.x, -s.x),
                    r = this._rebound(n.y, -s.y);
                return new o.Point(a, r)
            },
            _rebound: function(t, e) {
                return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
            },
            _limitZoom: function(t) {
                var e = this.getMinZoom(),
                    i = this.getMaxZoom();
                return Math.max(e, Math.min(i, t))
            }
        }), o.map = function(t, e) {
            return new o.Map(t, e)
        }, o.Projection.Mercator = {
            MAX_LATITUDE: 85.0840591556,
            R_MINOR: 6356752.314245179,
            R_MAJOR: 6378137,
            project: function(t) {
                var e = o.LatLng.DEG_TO_RAD,
                    i = this.MAX_LATITUDE,
                    n = Math.max(Math.min(i, t.lat), -i),
                    s = this.R_MAJOR,
                    a = this.R_MINOR,
                    r = t.lng * e * s,
                    h = n * e,
                    l = a / s,
                    u = Math.sqrt(1 - l * l),
                    c = u * Math.sin(h);
                c = Math.pow((1 - c) / (1 + c), .5 * u);
                var d = Math.tan(.5 * (.5 * Math.PI - h)) / c;
                return h = -s * Math.log(d), new o.Point(r, h)
            },
            unproject: function(t) {
                for (var e, i = o.LatLng.RAD_TO_DEG, n = this.R_MAJOR, s = this.R_MINOR, a = t.x * i / n, r = s / n, h = Math.sqrt(1 - r * r), l = Math.exp(-t.y / n), u = Math.PI / 2 - 2 * Math.atan(l), c = 15, d = 1e-7, p = c, _ = .1; Math.abs(_) > d && --p > 0;) e = h * Math.sin(u), _ = Math.PI / 2 - 2 * Math.atan(l * Math.pow((1 - e) / (1 + e), .5 * h)) - u, u += _;
                return new o.LatLng(u * i, a)
            }
        }, o.CRS.EPSG3395 = o.extend({}, o.CRS, {
            code: "EPSG:3395",
            projection: o.Projection.Mercator,
            transformation: function() {
                var t = o.Projection.Mercator,
                    e = t.R_MAJOR,
                    i = .5 / (Math.PI * e);
                return new o.Transformation(i, .5, -i, .5)
            }()
        }), o.TileLayer = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
                minZoom: 0,
                maxZoom: 18,
                tileSize: 256,
                subdomains: "abc",
                errorTileUrl: "",
                attribution: "",
                zoomOffset: 0,
                opacity: 1,
                unloadInvisibleTiles: o.Browser.mobile,
                updateWhenIdle: o.Browser.mobile
            },
            initialize: function(t, e) {
                e = o.setOptions(this, e), e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom > 0 && e.minZoom--, this.options.maxZoom--), e.bounds && (e.bounds = o.latLngBounds(e.bounds)), this._url = t;
                var i = this.options.subdomains;
                "string" == typeof i && (this.options.subdomains = i.split(""))
            },
            onAdd: function(t) {
                this._map = t, this._animated = t._zoomAnimated, this._initContainer(), t.on({
                    viewreset: this._reset,
                    moveend: this._update
                }, this), this._animated && t.on({
                    zoomanim: this._animateZoom,
                    zoomend: this._endZoomAnim
                }, this), this.options.updateWhenIdle || (this._limitedUpdate = o.Util.limitExecByInterval(this._update, 150, this), t.on("move", this._limitedUpdate, this)), this._reset(), this._update()
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            onRemove: function(t) {
                this._container.parentNode.removeChild(this._container), t.off({
                    viewreset: this._reset,
                    moveend: this._update
                }, this), this._animated && t.off({
                    zoomanim: this._animateZoom,
                    zoomend: this._endZoomAnim
                }, this), this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this), this._container = null, this._map = null
            },
            bringToFront: function() {
                var t = this._map._panes.tilePane;
                return this._container && (t.appendChild(this._container), this._setAutoZIndex(t, Math.max)), this
            },
            bringToBack: function() {
                var t = this._map._panes.tilePane;
                return this._container && (t.insertBefore(this._container, t.firstChild), this._setAutoZIndex(t, Math.min)), this
            },
            getAttribution: function() {
                return this.options.attribution
            },
            getContainer: function() {
                return this._container
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._map && this._updateOpacity(), this
            },
            setZIndex: function(t) {
                return this.options.zIndex = t, this._updateZIndex(), this
            },
            setUrl: function(t, e) {
                return this._url = t, e || this.redraw(), this
            },
            redraw: function() {
                return this._map && (this._reset({
                    hard: !0
                }), this._update()), this
            },
            _updateZIndex: function() {
                this._container && this.options.zIndex !== i && (this._container.style.zIndex = this.options.zIndex)
            },
            _setAutoZIndex: function(t, e) {
                var i, n, o, s = t.children,
                    a = -e(1 / 0, -1 / 0);
                for (n = 0, o = s.length; o > n; n++) s[n] !== this._container && (i = parseInt(s[n].style.zIndex, 10), isNaN(i) || (a = e(a, i)));
                this.options.zIndex = this._container.style.zIndex = (isFinite(a) ? a : 0) + e(1, -1)
            },
            _updateOpacity: function() {
                var t, e = this._tiles;
                if (o.Browser.ielt9)
                    for (t in e) o.DomUtil.setOpacity(e[t], this.options.opacity);
                else o.DomUtil.setOpacity(this._container, this.options.opacity)
            },
            _initContainer: function() {
                var t = this._map._panes.tilePane;
                if (!this._container) {
                    if (this._container = o.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
                        var e = "leaflet-tile-container";
                        this._bgBuffer = o.DomUtil.create("div", e, this._container), this._tileContainer = o.DomUtil.create("div", e, this._container)
                    } else this._tileContainer = this._container;
                    t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
                }
            },
            _reset: function(t) {
                for (var e in this._tiles) this.fire("tileunload", {
                    tile: this._tiles[e]
                });
                this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && t && t.hard && this._clearBgBuffer(), this._initContainer()
            },
            _getTileSize: function() {
                var t = this._map,
                    e = t.getZoom() + this.options.zoomOffset,
                    i = this.options.maxNativeZoom,
                    n = this.options.tileSize;
                return i && e > i && (n = Math.round(t.getZoomScale(e) / t.getZoomScale(i) * n)), n
            },
            _update: function() {
                if (this._map) {
                    var t = this._map,
                        e = t.getPixelBounds(),
                        i = t.getZoom(),
                        n = this._getTileSize();
                    if (!(i > this.options.maxZoom || i < this.options.minZoom)) {
                        var s = o.bounds(e.min.divideBy(n)._floor(), e.max.divideBy(n)._floor());
                        this._addTilesFromCenterOut(s), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(s)
                    }
                }
            },
            _addTilesFromCenterOut: function(t) {
                var i, n, s, a = [],
                    r = t.getCenter();
                for (i = t.min.y; i <= t.max.y; i++)
                    for (n = t.min.x; n <= t.max.x; n++) s = new o.Point(n, i), this._tileShouldBeLoaded(s) && a.push(s);
                var h = a.length;
                if (0 !== h) {
                    a.sort(function(t, e) {
                        return t.distanceTo(r) - e.distanceTo(r)
                    });
                    var l = e.createDocumentFragment();
                    for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += h, n = 0; h > n; n++) this._addTile(a[n], l);
                    this._tileContainer.appendChild(l)
                }
            },
            _tileShouldBeLoaded: function(t) {
                if (t.x + ":" + t.y in this._tiles) return !1;
                var e = this.options;
                if (!e.continuousWorld) {
                    var i = this._getWrapTileNum();
                    if (e.noWrap && (t.x < 0 || t.x >= i.x) || t.y < 0 || t.y >= i.y) return !1
                }
                if (e.bounds) {
                    var n = e.tileSize,
                        o = t.multiplyBy(n),
                        s = o.add([n, n]),
                        a = this._map.unproject(o),
                        r = this._map.unproject(s);
                    if (e.continuousWorld || e.noWrap || (a = a.wrap(), r = r.wrap()), !e.bounds.intersects([a, r])) return !1
                }
                return !0
            },
            _removeOtherTiles: function(t) {
                var e, i, n, o;
                for (o in this._tiles) e = o.split(":"), i = parseInt(e[0], 10), n = parseInt(e[1], 10), (i < t.min.x || i > t.max.x || n < t.min.y || n > t.max.y) && this._removeTile(o)
            },
            _removeTile: function(t) {
                var e = this._tiles[t];
                this.fire("tileunload", {
                    tile: e,
                    url: e.src
                }), this.options.reuseTiles ? (o.DomUtil.removeClass(e, "leaflet-tile-loaded"), this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e), o.Browser.android || (e.onload = null, e.src = o.Util.emptyImageUrl), delete this._tiles[t]
            },
            _addTile: function(t, e) {
                var i = this._getTilePos(t),
                    n = this._getTile();
                o.DomUtil.setPosition(n, i, o.Browser.chrome), this._tiles[t.x + ":" + t.y] = n, this._loadTile(n, t), n.parentNode !== this._tileContainer && e.appendChild(n)
            },
            _getZoomForUrl: function() {
                var t = this.options,
                    e = this._map.getZoom();
                return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
            },
            _getTilePos: function(t) {
                var e = this._map.getPixelOrigin(),
                    i = this._getTileSize();
                return t.multiplyBy(i).subtract(e)
            },
            getTileUrl: function(t) {
                return o.Util.template(this._url, o.extend({
                    s: this._getSubdomain(t),
                    z: t.z,
                    x: t.x,
                    y: t.y
                }, this.options))
            },
            _getWrapTileNum: function() {
                var t = this._map.options.crs,
                    e = t.getSize(this._map.getZoom());
                return e.divideBy(this._getTileSize())._floor()
            },
            _adjustTilePoint: function(t) {
                var e = this._getWrapTileNum();
                this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x), this.options.tms && (t.y = e.y - t.y - 1), t.z = this._getZoomForUrl()
            },
            _getSubdomain: function(t) {
                var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
                return this.options.subdomains[e]
            },
            _getTile: function() {
                if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                    var t = this._unusedTiles.pop();
                    return this._resetTile(t), t
                }
                return this._createTile()
            },
            _resetTile: function() {},
            _createTile: function() {
                var t = o.DomUtil.create("img", "leaflet-tile");
                return t.style.width = t.style.height = this._getTileSize() + "px", t.galleryimg = "no", t.onselectstart = t.onmousemove = o.Util.falseFn, o.Browser.ielt9 && this.options.opacity !== i && o.DomUtil.setOpacity(t, this.options.opacity), o.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"), t
            },
            _loadTile: function(t, e) {
                t._layer = this, t.onload = this._tileOnLoad, t.onerror = this._tileOnError, this._adjustTilePoint(e), t.src = this.getTileUrl(e), this.fire("tileloadstart", {
                    tile: t,
                    url: t.src
                })
            },
            _tileLoaded: function() {
                this._tilesToLoad--, this._animated && o.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(o.bind(this._clearBgBuffer, this), 500)))
            },
            _tileOnLoad: function() {
                var t = this._layer;
                this.src !== o.Util.emptyImageUrl && (o.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
                    tile: this,
                    url: this.src
                })), t._tileLoaded()
            },
            _tileOnError: function() {
                var t = this._layer;
                t.fire("tileerror", {
                    tile: this,
                    url: this.src
                });
                var e = t.options.errorTileUrl;
                e && (this.src = e), t._tileLoaded()
            }
        }), o.tileLayer = function(t, e) {
            return new o.TileLayer(t, e)
        }, o.TileLayer.WMS = o.TileLayer.extend({
            defaultWmsParams: {
                service: "WMS",
                request: "GetMap",
                version: "1.1.1",
                layers: "",
                styles: "",
                format: "image/jpeg",
                transparent: !1
            },
            initialize: function(t, e) {
                this._url = t;
                var i = o.extend({}, this.defaultWmsParams),
                    n = e.tileSize || this.options.tileSize;
                i.width = i.height = e.detectRetina && o.Browser.retina ? 2 * n : n;
                for (var s in e) this.options.hasOwnProperty(s) || "crs" === s || (i[s] = e[s]);
                this.wmsParams = i, o.setOptions(this, e)
            },
            onAdd: function(t) {
                this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
                var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
                this.wmsParams[e] = this._crs.code, o.TileLayer.prototype.onAdd.call(this, t)
            },
            getTileUrl: function(t) {
                var e = this._map,
                    i = this.options.tileSize,
                    n = t.multiplyBy(i),
                    s = n.add([i, i]),
                    a = this._crs.project(e.unproject(n, t.z)),
                    r = this._crs.project(e.unproject(s, t.z)),
                    h = this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [r.y, a.x, a.y, r.x].join(",") : [a.x, r.y, r.x, a.y].join(","),
                    l = o.Util.template(this._url, {
                        s: this._getSubdomain(t)
                    });
                return l + o.Util.getParamString(this.wmsParams, l, !0) + "&BBOX=" + h
            },
            setParams: function(t, e) {
                return o.extend(this.wmsParams, t), e || this.redraw(), this
            }
        }), o.tileLayer.wms = function(t, e) {
            return new o.TileLayer.WMS(t, e)
        }, o.TileLayer.Canvas = o.TileLayer.extend({
            options: {
                async: !1
            },
            initialize: function(t) {
                o.setOptions(this, t)
            },
            redraw: function() {
                this._map && (this._reset({
                    hard: !0
                }), this._update());
                for (var t in this._tiles) this._redrawTile(this._tiles[t]);
                return this
            },
            _redrawTile: function(t) {
                this.drawTile(t, t._tilePoint, this._map._zoom)
            },
            _createTile: function() {
                var t = o.DomUtil.create("canvas", "leaflet-tile");
                return t.width = t.height = this.options.tileSize, t.onselectstart = t.onmousemove = o.Util.falseFn, t
            },
            _loadTile: function(t, e) {
                t._layer = this, t._tilePoint = e, this._redrawTile(t), this.options.async || this.tileDrawn(t)
            },
            drawTile: function() {},
            tileDrawn: function(t) {
                this._tileOnLoad.call(t)
            }
        }), o.tileLayer.canvas = function(t) {
            return new o.TileLayer.Canvas(t)
        }, o.ImageOverlay = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
                opacity: 1
            },
            initialize: function(t, e, i) {
                this._url = t, this._bounds = o.latLngBounds(e), o.setOptions(this, i)
            },
            onAdd: function(t) {
                this._map = t, this._image || this._initImage(), t._panes.overlayPane.appendChild(this._image), t.on("viewreset", this._reset, this), t.options.zoomAnimation && o.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
            },
            onRemove: function(t) {
                t.getPanes().overlayPane.removeChild(this._image), t.off("viewreset", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._updateOpacity(), this
            },
            bringToFront: function() {
                return this._image && this._map._panes.overlayPane.appendChild(this._image), this
            },
            bringToBack: function() {
                var t = this._map._panes.overlayPane;
                return this._image && t.insertBefore(this._image, t.firstChild), this
            },
            setUrl: function(t) {
                this._url = t, this._image.src = this._url
            },
            getAttribution: function() {
                return this.options.attribution
            },
            _initImage: function() {
                this._image = o.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && o.Browser.any3d ? o.DomUtil.addClass(this._image, "leaflet-zoom-animated") : o.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), o.extend(this._image, {
                    galleryimg: "no",
                    onselectstart: o.Util.falseFn,
                    onmousemove: o.Util.falseFn,
                    onload: o.bind(this._onImageLoad, this),
                    src: this._url
                })
            },
            _animateZoom: function(t) {
                var e = this._map,
                    i = this._image,
                    n = e.getZoomScale(t.zoom),
                    s = this._bounds.getNorthWest(),
                    a = this._bounds.getSouthEast(),
                    r = e._latLngToNewLayerPoint(s, t.zoom, t.center),
                    h = e._latLngToNewLayerPoint(a, t.zoom, t.center)._subtract(r),
                    l = r._add(h._multiplyBy(.5 * (1 - 1 / n)));
                i.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(l) + " scale(" + n + ") "
            },
            _reset: function() {
                var t = this._image,
                    e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                    i = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
                o.DomUtil.setPosition(t, e), t.style.width = i.x + "px", t.style.height = i.y + "px"
            },
            _onImageLoad: function() {
                this.fire("load")
            },
            _updateOpacity: function() {
                o.DomUtil.setOpacity(this._image, this.options.opacity)
            }
        }), o.imageOverlay = function(t, e, i) {
            return new o.ImageOverlay(t, e, i)
        }, o.Icon = o.Class.extend({
            options: {
                className: ""
            },
            initialize: function(t) {
                o.setOptions(this, t)
            },
            createIcon: function(t) {
                return this._createIcon("icon", t)
            },
            createShadow: function(t) {
                return this._createIcon("shadow", t)
            },
            _createIcon: function(t, e) {
                var i = this._getIconUrl(t);
                if (!i) {
                    if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                    return null
                }
                var n;
                return n = e && "IMG" === e.tagName ? this._createImg(i, e) : this._createImg(i), this._setIconStyles(n, t), n
            },
            _setIconStyles: function(t, e) {
                var i, n = this.options,
                    s = o.point(n[e + "Size"]);
                i = o.point("shadow" === e ? n.shadowAnchor || n.iconAnchor : n.iconAnchor), !i && s && (i = s.divideBy(2, !0)), t.className = "leaflet-marker-" + e + " " + n.className, i && (t.style.marginLeft = -i.x + "px", t.style.marginTop = -i.y + "px"), s && (t.style.width = s.x + "px", t.style.height = s.y + "px")
            },
            _createImg: function(t, i) {
                return i = i || e.createElement("img"), i.src = t, i
            },
            _getIconUrl: function(t) {
                return o.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
            }
        }), o.icon = function(t) {
            return new o.Icon(t)
        }, o.Icon.Default = o.Icon.extend({
            options: {
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            _getIconUrl: function(t) {
                var e = t + "Url";
                if (this.options[e]) return this.options[e];
                o.Browser.retina && "icon" === t && (t += "-2x");
                var i = o.Icon.Default.imagePath;
                if (!i) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
                return i + "/marker-" + t + ".png"
            }
        }), o.Icon.Default.imagePath = function() {
            var t, i, n, o, s, a = e.getElementsByTagName("script"),
                r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
            for (t = 0, i = a.length; i > t; t++)
                if (n = a[t].src, o = n.match(r)) return s = n.split(r)[0], (s ? s + "/" : "") + "images"
        }(), o.Marker = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
                icon: new o.Icon.Default,
                title: "",
                alt: "",
                clickable: !0,
                draggable: !1,
                keyboard: !0,
                zIndexOffset: 0,
                opacity: 1,
                riseOnHover: !1,
                riseOffset: 250
            },
            initialize: function(t, e) {
                o.setOptions(this, e), this._latlng = o.latLng(t)
            },
            onAdd: function(t) {
                this._map = t, t.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            onRemove: function(t) {
                this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), t.off({
                    viewreset: this.update,
                    zoomanim: this._animateZoom
                }, this), this._map = null
            },
            getLatLng: function() {
                return this._latlng
            },
            setLatLng: function(t) {
                return this._latlng = o.latLng(t), this.update(), this.fire("move", {
                    latlng: this._latlng
                })
            },
            setZIndexOffset: function(t) {
                return this.options.zIndexOffset = t, this.update(), this
            },
            setIcon: function(t) {
                return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
            },
            update: function() {
                if (this._icon) {
                    var t = this._map.latLngToLayerPoint(this._latlng).round();
                    this._setPos(t)
                }
                return this
            },
            _initIcon: function() {
                var t = this.options,
                    e = this._map,
                    i = e.options.zoomAnimation && e.options.markerZoomAnimation,
                    n = i ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                    s = t.icon.createIcon(this._icon),
                    a = !1;
                s !== this._icon && (this._icon && this._removeIcon(), a = !0, t.title && (s.title = t.title), t.alt && (s.alt = t.alt)), o.DomUtil.addClass(s, n), t.keyboard && (s.tabIndex = "0"), this._icon = s, this._initInteraction(), t.riseOnHover && o.DomEvent.on(s, "mouseover", this._bringToFront, this).on(s, "mouseout", this._resetZIndex, this);
                var r = t.icon.createShadow(this._shadow),
                    h = !1;
                r !== this._shadow && (this._removeShadow(), h = !0), r && o.DomUtil.addClass(r, n), this._shadow = r, t.opacity < 1 && this._updateOpacity();
                var l = this._map._panes;
                a && l.markerPane.appendChild(this._icon), r && h && l.shadowPane.appendChild(this._shadow)
            },
            _removeIcon: function() {
                this.options.riseOnHover && o.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
            },
            _removeShadow: function() {
                this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
            },
            _setPos: function(t) {
                o.DomUtil.setPosition(this._icon, t), this._shadow && o.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
            },
            _updateZIndex: function(t) {
                this._icon.style.zIndex = this._zIndex + t
            },
            _animateZoom: function(t) {
                var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                this._setPos(e)
            },
            _initInteraction: function() {
                if (this.options.clickable) {
                    var t = this._icon,
                        e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                    o.DomUtil.addClass(t, "leaflet-clickable"), o.DomEvent.on(t, "click", this._onMouseClick, this), o.DomEvent.on(t, "keypress", this._onKeyPress, this);
                    for (var i = 0; i < e.length; i++) o.DomEvent.on(t, e[i], this._fireMouseEvent, this);
                    o.Handler.MarkerDrag && (this.dragging = new o.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
                }
            },
            _onMouseClick: function(t) {
                var e = this.dragging && this.dragging.moved();
                (this.hasEventListeners(t.type) || e) && o.DomEvent.stopPropagation(t), e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {
                    originalEvent: t,
                    latlng: this._latlng
                })
            },
            _onKeyPress: function(t) {
                13 === t.keyCode && this.fire("click", {
                    originalEvent: t,
                    latlng: this._latlng
                })
            },
            _fireMouseEvent: function(t) {
                this.fire(t.type, {
                    originalEvent: t,
                    latlng: this._latlng
                }), "contextmenu" === t.type && this.hasEventListeners(t.type) && o.DomEvent.preventDefault(t), "mousedown" !== t.type ? o.DomEvent.stopPropagation(t) : o.DomEvent.preventDefault(t)
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._map && this._updateOpacity(), this
            },
            _updateOpacity: function() {
                o.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && o.DomUtil.setOpacity(this._shadow, this.options.opacity)
            },
            _bringToFront: function() {
                this._updateZIndex(this.options.riseOffset)
            },
            _resetZIndex: function() {
                this._updateZIndex(0)
            }
        }), o.marker = function(t, e) {
            return new o.Marker(t, e)
        }, o.DivIcon = o.Icon.extend({
            options: {
                iconSize: [12, 12],
                className: "leaflet-div-icon",
                html: !1
            },
            createIcon: function(t) {
                var i = t && "DIV" === t.tagName ? t : e.createElement("div"),
                    n = this.options;
                return i.innerHTML = n.html !== !1 ? n.html : "", n.bgPos && (i.style.backgroundPosition = -n.bgPos.x + "px " + -n.bgPos.y + "px"), this._setIconStyles(i, "icon"), i
            },
            createShadow: function() {
                return null
            }
        }), o.divIcon = function(t) {
            return new o.DivIcon(t)
        }, o.Map.mergeOptions({
            closePopupOnClick: !0
        }), o.Popup = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
                minWidth: 50,
                maxWidth: 300,
                autoPan: !0,
                closeButton: !0,
                offset: [0, 7],
                autoPanPadding: [5, 5],
                keepInView: !1,
                className: "",
                zoomAnimation: !0
            },
            initialize: function(t, e) {
                o.setOptions(this, t), this._source = e, this._animated = o.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
            },
            onAdd: function(t) {
                this._map = t, this._container || this._initLayout();
                var e = t.options.fadeAnimation;
                e && o.DomUtil.setOpacity(this._container, 0), t._panes.popupPane.appendChild(this._container), t.on(this._getEvents(), this), this.update(), e && o.DomUtil.setOpacity(this._container, 1), this.fire("open"), t.fire("popupopen", {
                    popup: this
                }), this._source && this._source.fire("popupopen", {
                    popup: this
                })
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            openOn: function(t) {
                return t.openPopup(this), this
            },
            onRemove: function(t) {
                t._panes.popupPane.removeChild(this._container), o.Util.falseFn(this._container.offsetWidth), t.off(this._getEvents(), this), t.options.fadeAnimation && o.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), t.fire("popupclose", {
                    popup: this
                }), this._source && this._source.fire("popupclose", {
                    popup: this
                })
            },
            getLatLng: function() {
                return this._latlng
            },
            setLatLng: function(t) {
                return this._latlng = o.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
            },
            getContent: function() {
                return this._content
            },
            setContent: function(t) {
                return this._content = t, this.update(), this
            },
            update: function() {
                this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
            },
            _getEvents: function() {
                var t = {
                    viewreset: this._updatePosition
                };
                return this._animated && (t.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
            },
            _close: function() {
                this._map && this._map.closePopup(this)
            },
            _initLayout: function() {
                var t, e = "leaflet-popup",
                    i = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
                    n = this._container = o.DomUtil.create("div", i);
                this.options.closeButton && (t = this._closeButton = o.DomUtil.create("a", e + "-close-button", n), t.href = "#close", t.innerHTML = "&#215;", o.DomEvent.disableClickPropagation(t), o.DomEvent.on(t, "click", this._onCloseButtonClick, this));
                var s = this._wrapper = o.DomUtil.create("div", e + "-content-wrapper", n);
                o.DomEvent.disableClickPropagation(s), this._contentNode = o.DomUtil.create("div", e + "-content", s), o.DomEvent.disableScrollPropagation(this._contentNode), o.DomEvent.on(s, "contextmenu", o.DomEvent.stopPropagation), this._tipContainer = o.DomUtil.create("div", e + "-tip-container", n), this._tip = o.DomUtil.create("div", e + "-tip", this._tipContainer)
            },
            _updateContent: function() {
                if (this._content) {
                    if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
                    else {
                        for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
                        this._contentNode.appendChild(this._content)
                    }
                    this.fire("contentupdate")
                }
            },
            _updateLayout: function() {
                var t = this._contentNode,
                    e = t.style;
                e.width = "", e.whiteSpace = "nowrap";
                var i = t.offsetWidth;
                i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
                var n = t.offsetHeight,
                    s = this.options.maxHeight,
                    a = "leaflet-popup-scrolled";
                s && n > s ? (e.height = s + "px", o.DomUtil.addClass(t, a)) : o.DomUtil.removeClass(t, a), this._containerWidth = this._container.offsetWidth
            },
            _updatePosition: function() {
                if (this._map) {
                    var t = this._map.latLngToLayerPoint(this._latlng),
                        e = this._animated,
                        i = o.point(this.options.offset);
                    e && o.DomUtil.setPosition(this._container, t), this._containerBottom = -i.y - (e ? 0 : t.y), this._containerLeft = -Math.round(this._containerWidth / 2) + i.x + (e ? 0 : t.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
                }
            },
            _zoomAnimation: function(t) {
                var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
                o.DomUtil.setPosition(this._container, e)
            },
            _adjustPan: function() {
                if (this.options.autoPan) {
                    var t = this._map,
                        e = this._container.offsetHeight,
                        i = this._containerWidth,
                        n = new o.Point(this._containerLeft, -e - this._containerBottom);
                    this._animated && n._add(o.DomUtil.getPosition(this._container));
                    var s = t.layerPointToContainerPoint(n),
                        a = o.point(this.options.autoPanPadding),
                        r = o.point(this.options.autoPanPaddingTopLeft || a),
                        h = o.point(this.options.autoPanPaddingBottomRight || a),
                        l = t.getSize(),
                        u = 0,
                        c = 0;
                    s.x + i + h.x > l.x && (u = s.x + i - l.x + h.x), s.x - u - r.x < 0 && (u = s.x - r.x), s.y + e + h.y > l.y && (c = s.y + e - l.y + h.y), s.y - c - r.y < 0 && (c = s.y - r.y), (u || c) && t.fire("autopanstart").panBy([u, c])
                }
            },
            _onCloseButtonClick: function(t) {
                this._close(), o.DomEvent.stop(t)
            }
        }), o.popup = function(t, e) {
            return new o.Popup(t, e)
        }, o.Map.include({
            openPopup: function(t, e, i) {
                if (this.closePopup(), !(t instanceof o.Popup)) {
                    var n = t;
                    t = new o.Popup(i).setLatLng(e).setContent(n)
                }
                return t._isOpen = !0, this._popup = t, this.addLayer(t)
            },
            closePopup: function(t) {
                return t && t !== this._popup || (t = this._popup, this._popup = null), t && (this.removeLayer(t), t._isOpen = !1), this
            }
        }), o.Marker.include({
            openPopup: function() {
                return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
            },
            closePopup: function() {
                return this._popup && this._popup._close(), this
            },
            togglePopup: function() {
                return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
            },
            bindPopup: function(t, e) {
                var i = o.point(this.options.icon.options.popupAnchor || [0, 0]);
                return i = i.add(o.Popup.prototype.options.offset), e && e.offset && (i = i.add(e.offset)), e = o.extend({
                    offset: i
                }, e), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), t instanceof o.Popup ? (o.setOptions(t, e), this._popup = t) : this._popup = new o.Popup(e, this).setContent(t), this
            },
            setPopupContent: function(t) {
                return this._popup && this._popup.setContent(t), this
            },
            unbindPopup: function() {
                return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
            },
            getPopup: function() {
                return this._popup
            },
            _movePopup: function(t) {
                this._popup.setLatLng(t.latlng)
            }
        }), o.LayerGroup = o.Class.extend({
            initialize: function(t) {
                this._layers = {};
                var e, i;
                if (t)
                    for (e = 0, i = t.length; i > e; e++) this.addLayer(t[e])
            },
            addLayer: function(t) {
                var e = this.getLayerId(t);
                return this._layers[e] = t, this._map && this._map.addLayer(t), this
            },
            removeLayer: function(t) {
                var e = t in this._layers ? t : this.getLayerId(t);
                return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
            },
            hasLayer: function(t) {
                return t ? t in this._layers || this.getLayerId(t) in this._layers : !1
            },
            clearLayers: function() {
                return this.eachLayer(this.removeLayer, this), this
            },
            invoke: function(t) {
                var e, i, n = Array.prototype.slice.call(arguments, 1);
                for (e in this._layers) i = this._layers[e], i[t] && i[t].apply(i, n);
                return this
            },
            onAdd: function(t) {
                this._map = t, this.eachLayer(t.addLayer, t)
            },
            onRemove: function(t) {
                this.eachLayer(t.removeLayer, t), this._map = null
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            eachLayer: function(t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            getLayer: function(t) {
                return this._layers[t]
            },
            getLayers: function() {
                var t = [];
                for (var e in this._layers) t.push(this._layers[e]);
                return t
            },
            setZIndex: function(t) {
                return this.invoke("setZIndex", t)
            },
            getLayerId: function(t) {
                return o.stamp(t)
            }
        }), o.layerGroup = function(t) {
            return new o.LayerGroup(t)
        }, o.FeatureGroup = o.LayerGroup.extend({
            includes: o.Mixin.Events,
            statics: {
                EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
            },
            addLayer: function(t) {
                return this.hasLayer(t) ? this : ("on" in t && t.on(o.FeatureGroup.EVENTS, this._propagateEvent, this), o.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
                    layer: t
                }))
            },
            removeLayer: function(t) {
                return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.off(o.FeatureGroup.EVENTS, this._propagateEvent, this), o.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
                    layer: t
                })) : this
            },
            bindPopup: function(t, e) {
                return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
            },
            openPopup: function(t) {
                for (var e in this._layers) {
                    this._layers[e].openPopup(t);
                    break
                }
                return this
            },
            setStyle: function(t) {
                return this.invoke("setStyle", t)
            },
            bringToFront: function() {
                return this.invoke("bringToFront")
            },
            bringToBack: function() {
                return this.invoke("bringToBack")
            },
            getBounds: function() {
                var t = new o.LatLngBounds;
                return this.eachLayer(function(e) {
                    t.extend(e instanceof o.Marker ? e.getLatLng() : e.getBounds())
                }), t
            },
            _propagateEvent: function(t) {
                t = o.extend({
                    layer: t.target,
                    target: this
                }, t), this.fire(t.type, t)
            }
        }), o.featureGroup = function(t) {
            return new o.FeatureGroup(t)
        }, o.Path = o.Class.extend({
            includes: [o.Mixin.Events],
            statics: {
                CLIP_PADDING: function() {
                    var e = o.Browser.mobile ? 1280 : 2e3,
                        i = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
                    return Math.max(0, Math.min(.5, i))
                }()
            },
            options: {
                stroke: !0,
                color: "#0033ff",
                dashArray: null,
                lineCap: null,
                lineJoin: null,
                weight: 5,
                opacity: .5,
                fill: !1,
                fillColor: null,
                fillOpacity: .2,
                clickable: !0
            },
            initialize: function(t) {
                o.setOptions(this, t)
            },
            onAdd: function(t) {
                this._map = t, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), t.on({
                    viewreset: this.projectLatlngs,
                    moveend: this._updatePath
                }, this)
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            onRemove: function(t) {
                t._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, o.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), t.off({
                    viewreset: this.projectLatlngs,
                    moveend: this._updatePath
                }, this)
            },
            projectLatlngs: function() {},
            setStyle: function(t) {
                return o.setOptions(this, t), this._container && this._updateStyle(), this
            },
            redraw: function() {
                return this._map && (this.projectLatlngs(), this._updatePath()), this
            }
        }), o.Map.include({
            _updatePathViewport: function() {
                var t = o.Path.CLIP_PADDING,
                    e = this.getSize(),
                    i = o.DomUtil.getPosition(this._mapPane),
                    n = i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
                    s = n.add(e.multiplyBy(1 + 2 * t)._round());
                this._pathViewport = new o.Bounds(n, s)
            }
        }), o.Path.SVG_NS = "http://www.w3.org/2000/svg", o.Browser.svg = !(!e.createElementNS || !e.createElementNS(o.Path.SVG_NS, "svg").createSVGRect), o.Path = o.Path.extend({
            statics: {
                SVG: o.Browser.svg
            },
            bringToFront: function() {
                var t = this._map._pathRoot,
                    e = this._container;
                return e && t.lastChild !== e && t.appendChild(e), this
            },
            bringToBack: function() {
                var t = this._map._pathRoot,
                    e = this._container,
                    i = t.firstChild;
                return e && i !== e && t.insertBefore(e, i), this
            },
            getPathString: function() {},
            _createElement: function(t) {
                return e.createElementNS(o.Path.SVG_NS, t)
            },
            _initElements: function() {
                this._map._initPathRoot(), this._initPath(), this._initStyle()
            },
            _initPath: function() {
                this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && o.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
            },
            _initStyle: function() {
                this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
            },
            _updateStyle: function() {
                this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
            },
            _updatePath: function() {
                var t = this.getPathString();
                t || (t = "M0 0"), this._path.setAttribute("d", t)
            },
            _initEvents: function() {
                if (this.options.clickable) {
                    (o.Browser.svg || !o.Browser.vml) && o.DomUtil.addClass(this._path, "leaflet-clickable"), o.DomEvent.on(this._container, "click", this._onMouseClick, this);
                    for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++) o.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
                }
            },
            _onMouseClick: function(t) {
                this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
            },
            _fireMouseEvent: function(t) {
                if (this.hasEventListeners(t.type)) {
                    var e = this._map,
                        i = e.mouseEventToContainerPoint(t),
                        n = e.containerPointToLayerPoint(i),
                        s = e.layerPointToLatLng(n);
                    this.fire(t.type, {
                        latlng: s,
                        layerPoint: n,
                        containerPoint: i,
                        originalEvent: t
                    }), "contextmenu" === t.type && o.DomEvent.preventDefault(t), "mousemove" !== t.type && o.DomEvent.stopPropagation(t)
                }
            }
        }), o.Map.include({
            _initPathRoot: function() {
                this._pathRoot || (this._pathRoot = o.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && o.Browser.any3d ? (o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
                    zoomanim: this._animatePathZoom,
                    zoomend: this._endPathZoom
                })) : o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
            },
            _animatePathZoom: function(t) {
                var e = this.getZoomScale(t.zoom),
                    i = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
                this._pathRoot.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(i) + " scale(" + e + ") ", this._pathZooming = !0
            },
            _endPathZoom: function() {
                this._pathZooming = !1
            },
            _updateSvgViewport: function() {
                if (!this._pathZooming) {
                    this._updatePathViewport();
                    var t = this._pathViewport,
                        e = t.min,
                        i = t.max,
                        n = i.x - e.x,
                        s = i.y - e.y,
                        a = this._pathRoot,
                        r = this._panes.overlayPane;
                    o.Browser.mobileWebkit && r.removeChild(a), o.DomUtil.setPosition(a, e), a.setAttribute("width", n), a.setAttribute("height", s), a.setAttribute("viewBox", [e.x, e.y, n, s].join(" ")), o.Browser.mobileWebkit && r.appendChild(a)
                }
            }
        }), o.Path.include({
            bindPopup: function(t, e) {
                return t instanceof o.Popup ? this._popup = t : ((!this._popup || e) && (this._popup = new o.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
            },
            unbindPopup: function() {
                return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
            },
            openPopup: function(t) {
                return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
                    latlng: t
                })), this
            },
            closePopup: function() {
                return this._popup && this._popup._close(), this
            },
            _openPopup: function(t) {
                this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup)
            }
        }), o.Browser.vml = !o.Browser.svg && function() {
            try {
                var t = e.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var i = t.firstChild;
                return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
            } catch (n) {
                return !1
            }
        }(), o.Path = o.Browser.svg || !o.Browser.vml ? o.Path : o.Path.extend({
            statics: {
                VML: !0,
                CLIP_PADDING: .02
            },
            _createElement: function() {
                try {
                    return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                        function(t) {
                            return e.createElement("<lvml:" + t + ' class="lvml">')
                        }
                } catch (t) {
                    return function(t) {
                        return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                    }
                }
            }(),
            _initPath: function() {
                var t = this._container = this._createElement("shape");
                o.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && o.DomUtil.addClass(t, "leaflet-clickable"), t.coordsize = "1 1", this._path = this._createElement("path"), t.appendChild(this._path), this._map._pathRoot.appendChild(t)
            },
            _initStyle: function() {
                this._updateStyle()
            },
            _updateStyle: function() {
                var t = this._stroke,
                    e = this._fill,
                    i = this.options,
                    n = this._container;
                n.stroked = i.stroke, n.filled = i.fill, i.stroke ? (t || (t = this._stroke = this._createElement("stroke"), t.endcap = "round", n.appendChild(t)), t.weight = i.weight + "px", t.color = i.color, t.opacity = i.opacity, t.dashStyle = i.dashArray ? o.Util.isArray(i.dashArray) ? i.dashArray.join(" ") : i.dashArray.replace(/( *, *)/g, " ") : "", i.lineCap && (t.endcap = i.lineCap.replace("butt", "flat")), i.lineJoin && (t.joinstyle = i.lineJoin)) : t && (n.removeChild(t), this._stroke = null), i.fill ? (e || (e = this._fill = this._createElement("fill"), n.appendChild(e)), e.color = i.fillColor || i.color, e.opacity = i.fillOpacity) : e && (n.removeChild(e), this._fill = null)
            },
            _updatePath: function() {
                var t = this._container.style;
                t.display = "none", this._path.v = this.getPathString() + " ", t.display = ""
            }
        }), o.Map.include(o.Browser.svg || !o.Browser.vml ? {} : {
            _initPathRoot: function() {
                if (!this._pathRoot) {
                    var t = this._pathRoot = e.createElement("div");
                    t.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(t), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
                }
            }
        }), o.Browser.canvas = function() {
            return !!e.createElement("canvas").getContext
        }(), o.Path = o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? o.Path : o.Path.extend({
            statics: {
                CANVAS: !0,
                SVG: !1
            },
            redraw: function() {
                return this._map && (this.projectLatlngs(), this._requestUpdate()), this
            },
            setStyle: function(t) {
                return o.setOptions(this, t), this._map && (this._updateStyle(), this._requestUpdate()), this
            },
            onRemove: function(t) {
                t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this.fire("remove"), this._map = null
            },
            _requestUpdate: function() {
                this._map && !o.Path._updateRequest && (o.Path._updateRequest = o.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
            },
            _fireMapMoveEnd: function() {
                o.Path._updateRequest = null, this.fire("moveend")
            },
            _initElements: function() {
                this._map._initPathRoot(), this._ctx = this._map._canvasCtx
            },
            _updateStyle: function() {
                var t = this.options;
                t.stroke && (this._ctx.lineWidth = t.weight, this._ctx.strokeStyle = t.color), t.fill && (this._ctx.fillStyle = t.fillColor || t.color)
            },
            _drawPath: function() {
                var t, e, i, n, s, a;
                for (this._ctx.beginPath(), t = 0, i = this._parts.length; i > t; t++) {
                    for (e = 0, n = this._parts[t].length; n > e; e++) s = this._parts[t][e], a = (0 === e ? "move" : "line") + "To", this._ctx[a](s.x, s.y);
                    this instanceof o.Polygon && this._ctx.closePath()
                }
            },
            _checkIfEmpty: function() {
                return !this._parts.length
            },
            _updatePath: function() {
                if (!this._checkIfEmpty()) {
                    var t = this._ctx,
                        e = this.options;
                    this._drawPath(), t.save(), this._updateStyle(), e.fill && (t.globalAlpha = e.fillOpacity, t.fill()), e.stroke && (t.globalAlpha = e.opacity, t.stroke()), t.restore()
                }
            },
            _initEvents: function() {
                this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click", this._onClick, this))
            },
            _onClick: function(t) {
                this._containsPoint(t.layerPoint) && this.fire("click", t)
            },
            _onMouseMove: function(t) {
                this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", t)))
            }
        }), o.Map.include(o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? {} : {
            _initPathRoot: function() {
                var t, i = this._pathRoot;
                i || (i = this._pathRoot = e.createElement("canvas"), i.style.position = "absolute", t = this._canvasCtx = i.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(i), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
            },
            _updateCanvasViewport: function() {
                if (!this._pathZooming) {
                    this._updatePathViewport();
                    var t = this._pathViewport,
                        e = t.min,
                        i = t.max.subtract(e),
                        n = this._pathRoot;
                    o.DomUtil.setPosition(n, e), n.width = i.x, n.height = i.y, n.getContext("2d").translate(-e.x, -e.y)
                }
            }
        }), o.LineUtil = {
            simplify: function(t, e) {
                if (!e || !t.length) return t.slice();
                var i = e * e;
                return t = this._reducePoints(t, i), t = this._simplifyDP(t, i)
            },
            pointToSegmentDistance: function(t, e, i) {
                return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
            },
            closestPointOnSegment: function(t, e, i) {
                return this._sqClosestPointOnSegment(t, e, i)
            },
            _simplifyDP: function(t, e) {
                var n = t.length,
                    o = typeof Uint8Array != i + "" ? Uint8Array : Array,
                    s = new o(n);
                s[0] = s[n - 1] = 1, this._simplifyDPStep(t, s, e, 0, n - 1);
                var a, r = [];
                for (a = 0; n > a; a++) s[a] && r.push(t[a]);
                return r
            },
            _simplifyDPStep: function(t, e, i, n, o) {
                var s, a, r, h = 0;
                for (a = n + 1; o - 1 >= a; a++) r = this._sqClosestPointOnSegment(t[a], t[n], t[o], !0), r > h && (s = a, h = r);
                h > i && (e[s] = 1, this._simplifyDPStep(t, e, i, n, s), this._simplifyDPStep(t, e, i, s, o))
            },
            _reducePoints: function(t, e) {
                for (var i = [t[0]], n = 1, o = 0, s = t.length; s > n; n++) this._sqDist(t[n], t[o]) > e && (i.push(t[n]), o = n);
                return s - 1 > o && i.push(t[s - 1]), i
            },
            clipSegment: function(t, e, i, n) {
                var o, s, a, r = n ? this._lastCode : this._getBitCode(t, i),
                    h = this._getBitCode(e, i);
                for (this._lastCode = h;;) {
                    if (!(r | h)) return [t, e];
                    if (r & h) return !1;
                    o = r || h, s = this._getEdgeIntersection(t, e, o, i), a = this._getBitCode(s, i), o === r ? (t = s, r = a) : (e = s, h = a)
                }
            },
            _getEdgeIntersection: function(t, e, i, n) {
                var s = e.x - t.x,
                    a = e.y - t.y,
                    r = n.min,
                    h = n.max;
                return 8 & i ? new o.Point(t.x + s * (h.y - t.y) / a, h.y) : 4 & i ? new o.Point(t.x + s * (r.y - t.y) / a, r.y) : 2 & i ? new o.Point(h.x, t.y + a * (h.x - t.x) / s) : 1 & i ? new o.Point(r.x, t.y + a * (r.x - t.x) / s) : void 0
            },
            _getBitCode: function(t, e) {
                var i = 0;
                return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
            },
            _sqDist: function(t, e) {
                var i = e.x - t.x,
                    n = e.y - t.y;
                return i * i + n * n
            },
            _sqClosestPointOnSegment: function(t, e, i, n) {
                var s, a = e.x,
                    r = e.y,
                    h = i.x - a,
                    l = i.y - r,
                    u = h * h + l * l;
                return u > 0 && (s = ((t.x - a) * h + (t.y - r) * l) / u, s > 1 ? (a = i.x, r = i.y) : s > 0 && (a += h * s, r += l * s)), h = t.x - a, l = t.y - r, n ? h * h + l * l : new o.Point(a, r)
            }
        }, o.Polyline = o.Path.extend({
            initialize: function(t, e) {
                o.Path.prototype.initialize.call(this, e), this._latlngs = this._convertLatLngs(t)
            },
            options: {
                smoothFactor: 1,
                noClip: !1
            },
            projectLatlngs: function() {
                this._originalPoints = [];
                for (var t = 0, e = this._latlngs.length; e > t; t++) this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
            },
            getPathString: function() {
                for (var t = 0, e = this._parts.length, i = ""; e > t; t++) i += this._getPathPartStr(this._parts[t]);
                return i
            },
            getLatLngs: function() {
                return this._latlngs
            },
            setLatLngs: function(t) {
                return this._latlngs = this._convertLatLngs(t), this.redraw()
            },
            addLatLng: function(t) {
                return this._latlngs.push(o.latLng(t)), this.redraw()
            },
            spliceLatLngs: function() {
                var t = [].splice.apply(this._latlngs, arguments);
                return this._convertLatLngs(this._latlngs, !0), this.redraw(), t
            },
            closestLayerPoint: function(t) {
                for (var e, i, n = 1 / 0, s = this._parts, a = null, r = 0, h = s.length; h > r; r++)
                    for (var l = s[r], u = 1, c = l.length; c > u; u++) {
                        e = l[u - 1], i = l[u];
                        var d = o.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
                        n > d && (n = d, a = o.LineUtil._sqClosestPointOnSegment(t, e, i))
                    }
                return a && (a.distance = Math.sqrt(n)), a
            },
            getBounds: function() {
                return new o.LatLngBounds(this.getLatLngs())
            },
            _convertLatLngs: function(t, e) {
                var i, n, s = e ? t : [];
                for (i = 0, n = t.length; n > i; i++) {
                    if (o.Util.isArray(t[i]) && "number" != typeof t[i][0]) return;
                    s[i] = o.latLng(t[i])
                }
                return s
            },
            _initEvents: function() {
                o.Path.prototype._initEvents.call(this)
            },
            _getPathPartStr: function(t) {
                for (var e, i = o.Path.VML, n = 0, s = t.length, a = ""; s > n; n++) e = t[n], i && e._round(), a += (n ? "L" : "M") + e.x + " " + e.y;
                return a
            },
            _clipPoints: function() {
                var t, e, i, n = this._originalPoints,
                    s = n.length;
                if (this.options.noClip) return void(this._parts = [n]);
                this._parts = [];
                var a = this._parts,
                    r = this._map._pathViewport,
                    h = o.LineUtil;
                for (t = 0, e = 0; s - 1 > t; t++) i = h.clipSegment(n[t], n[t + 1], r, t), i && (a[e] = a[e] || [], a[e].push(i[0]), (i[1] !== n[t + 1] || t === s - 2) && (a[e].push(i[1]), e++))
            },
            _simplifyPoints: function() {
                for (var t = this._parts, e = o.LineUtil, i = 0, n = t.length; n > i; i++) t[i] = e.simplify(t[i], this.options.smoothFactor)
            },
            _updatePath: function() {
                this._map && (this._clipPoints(), this._simplifyPoints(), o.Path.prototype._updatePath.call(this))
            }
        }), o.polyline = function(t, e) {
            return new o.Polyline(t, e)
        }, o.PolyUtil = {}, o.PolyUtil.clipPolygon = function(t, e) {
            var i, n, s, a, r, h, l, u, c, d = [1, 4, 2, 8],
                p = o.LineUtil;
            for (n = 0, l = t.length; l > n; n++) t[n]._code = p._getBitCode(t[n], e);
            for (a = 0; 4 > a; a++) {
                for (u = d[a], i = [], n = 0, l = t.length, s = l - 1; l > n; s = n++) r = t[n], h = t[s], r._code & u ? h._code & u || (c = p._getEdgeIntersection(h, r, u, e), c._code = p._getBitCode(c, e), i.push(c)) : (h._code & u && (c = p._getEdgeIntersection(h, r, u, e), c._code = p._getBitCode(c, e), i.push(c)), i.push(r));
                t = i
            }
            return t
        }, o.Polygon = o.Polyline.extend({
            options: {
                fill: !0
            },
            initialize: function(t, e) {
                o.Polyline.prototype.initialize.call(this, t, e), this._initWithHoles(t)
            },
            _initWithHoles: function(t) {
                var e, i, n;
                if (t && o.Util.isArray(t[0]) && "number" != typeof t[0][0])
                    for (this._latlngs = this._convertLatLngs(t[0]), this._holes = t.slice(1), e = 0, i = this._holes.length; i > e; e++) n = this._holes[e] = this._convertLatLngs(this._holes[e]), n[0].equals(n[n.length - 1]) && n.pop();
                t = this._latlngs, t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
            },
            projectLatlngs: function() {
                if (o.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
                    var t, e, i, n;
                    for (t = 0, i = this._holes.length; i > t; t++)
                        for (this._holePoints[t] = [], e = 0, n = this._holes[t].length; n > e; e++) this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
                }
            },
            setLatLngs: function(t) {
                return t && o.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t), this.redraw()) : o.Polyline.prototype.setLatLngs.call(this, t)
            },
            _clipPoints: function() {
                var t = this._originalPoints,
                    e = [];
                if (this._parts = [t].concat(this._holePoints), !this.options.noClip) {
                    for (var i = 0, n = this._parts.length; n > i; i++) {
                        var s = o.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
                        s.length && e.push(s)
                    }
                    this._parts = e
                }
            },
            _getPathPartStr: function(t) {
                var e = o.Polyline.prototype._getPathPartStr.call(this, t);
                return e + (o.Browser.svg ? "z" : "x")
            }
        }), o.polygon = function(t, e) {
            return new o.Polygon(t, e)
        },
        function() {
            function t(t) {
                return o.FeatureGroup.extend({
                    initialize: function(t, e) {
                        this._layers = {}, this._options = e, this.setLatLngs(t)
                    },
                    setLatLngs: function(e) {
                        var i = 0,
                            n = e.length;
                        for (this.eachLayer(function(t) {
                                n > i ? t.setLatLngs(e[i++]) : this.removeLayer(t)
                            }, this); n > i;) this.addLayer(new t(e[i++], this._options));
                        return this
                    },
                    getLatLngs: function() {
                        var t = [];
                        return this.eachLayer(function(e) {
                            t.push(e.getLatLngs())
                        }), t
                    }
                })
            }
            o.MultiPolyline = t(o.Polyline), o.MultiPolygon = t(o.Polygon), o.multiPolyline = function(t, e) {
                return new o.MultiPolyline(t, e)
            }, o.multiPolygon = function(t, e) {
                return new o.MultiPolygon(t, e)
            }
        }(), o.Rectangle = o.Polygon.extend({
            initialize: function(t, e) {
                o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
            },
            setBounds: function(t) {
                this.setLatLngs(this._boundsToLatLngs(t))
            },
            _boundsToLatLngs: function(t) {
                return t = o.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
            }
        }), o.rectangle = function(t, e) {
            return new o.Rectangle(t, e)
        }, o.Circle = o.Path.extend({
            initialize: function(t, e, i) {
                o.Path.prototype.initialize.call(this, i), this._latlng = o.latLng(t), this._mRadius = e
            },
            options: {
                fill: !0
            },
            setLatLng: function(t) {
                return this._latlng = o.latLng(t), this.redraw()
            },
            setRadius: function(t) {
                return this._mRadius = t, this.redraw()
            },
            projectLatlngs: function() {
                var t = this._getLngRadius(),
                    e = this._latlng,
                    i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
                this._point = this._map.latLngToLayerPoint(e), this._radius = Math.max(this._point.x - i.x, 1)
            },
            getBounds: function() {
                var t = this._getLngRadius(),
                    e = this._mRadius / 40075017 * 360,
                    i = this._latlng;
                return new o.LatLngBounds([i.lat - e, i.lng - t], [i.lat + e, i.lng + t])
            },
            getLatLng: function() {
                return this._latlng
            },
            getPathString: function() {
                var t = this._point,
                    e = this._radius;
                return this._checkIfEmpty() ? "" : o.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(), e = Math.round(e), "AL " + t.x + "," + t.y + " " + e + "," + e + " 0,23592600")
            },
            getRadius: function() {
                return this._mRadius
            },
            _getLatRadius: function() {
                return this._mRadius / 40075017 * 360
            },
            _getLngRadius: function() {
                return this._getLatRadius() / Math.cos(o.LatLng.DEG_TO_RAD * this._latlng.lat)
            },
            _checkIfEmpty: function() {
                if (!this._map) return !1;
                var t = this._map._pathViewport,
                    e = this._radius,
                    i = this._point;
                return i.x - e > t.max.x || i.y - e > t.max.y || i.x + e < t.min.x || i.y + e < t.min.y
            }
        }), o.circle = function(t, e, i) {
            return new o.Circle(t, e, i)
        }, o.CircleMarker = o.Circle.extend({
            options: {
                radius: 10,
                weight: 2
            },
            initialize: function(t, e) {
                o.Circle.prototype.initialize.call(this, t, null, e), this._radius = this.options.radius
            },
            projectLatlngs: function() {
                this._point = this._map.latLngToLayerPoint(this._latlng)
            },
            _updateStyle: function() {
                o.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
            },
            setLatLng: function(t) {
                return o.Circle.prototype.setLatLng.call(this, t), this._popup && this._popup._isOpen && this._popup.setLatLng(t), this
            },
            setRadius: function(t) {
                return this.options.radius = this._radius = t, this.redraw()
            },
            getRadius: function() {
                return this._radius
            }
        }), o.circleMarker = function(t, e) {
            return new o.CircleMarker(t, e)
        }, o.Polyline.include(o.Path.CANVAS ? {
            _containsPoint: function(t, e) {
                var i, n, s, a, r, h, l, u = this.options.weight / 2;
                for (o.Browser.touch && (u += 10), i = 0, a = this._parts.length; a > i; i++)
                    for (l = this._parts[i], n = 0, r = l.length, s = r - 1; r > n; s = n++)
                        if ((e || 0 !== n) && (h = o.LineUtil.pointToSegmentDistance(t, l[s], l[n]), u >= h)) return !0;
                return !1
            }
        } : {}), o.Polygon.include(o.Path.CANVAS ? {
            _containsPoint: function(t) {
                var e, i, n, s, a, r, h, l, u = !1;
                if (o.Polyline.prototype._containsPoint.call(this, t, !0)) return !0;
                for (s = 0, h = this._parts.length; h > s; s++)
                    for (e = this._parts[s], a = 0, l = e.length, r = l - 1; l > a; r = a++) i = e[a], n = e[r], i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (u = !u);
                return u
            }
        } : {}), o.Circle.include(o.Path.CANVAS ? {
            _drawPath: function() {
                var t = this._point;
                this._ctx.beginPath(), this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
            },
            _containsPoint: function(t) {
                var e = this._point,
                    i = this.options.stroke ? this.options.weight / 2 : 0;
                return t.distanceTo(e) <= this._radius + i
            }
        } : {}), o.CircleMarker.include(o.Path.CANVAS ? {
            _updateStyle: function() {
                o.Path.prototype._updateStyle.call(this)
            }
        } : {}), o.GeoJSON = o.FeatureGroup.extend({
            initialize: function(t, e) {
                o.setOptions(this, e), this._layers = {}, t && this.addData(t)
            },
            addData: function(t) {
                var e, i, n, s = o.Util.isArray(t) ? t : t.features;
                if (s) {
                    for (e = 0, i = s.length; i > e; e++) n = s[e], (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(s[e]);
                    return this
                }
                var a = this.options;
                if (!a.filter || a.filter(t)) {
                    var r = o.GeoJSON.geometryToLayer(t, a.pointToLayer, a.coordsToLatLng, a);
                    return r.feature = o.GeoJSON.asFeature(t), r.defaultOptions = r.options, this.resetStyle(r), a.onEachFeature && a.onEachFeature(t, r), this.addLayer(r)
                }
            },
            resetStyle: function(t) {
                var e = this.options.style;
                e && (o.Util.extend(t.options, t.defaultOptions), this._setLayerStyle(t, e))
            },
            setStyle: function(t) {
                this.eachLayer(function(e) {
                    this._setLayerStyle(e, t)
                }, this)
            },
            _setLayerStyle: function(t, e) {
                "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
            }
        }), o.extend(o.GeoJSON, {
            geometryToLayer: function(t, e, i, n) {
                var s, a, r, h, l = "Feature" === t.type ? t.geometry : t,
                    u = l.coordinates,
                    c = [];
                switch (i = i || this.coordsToLatLng, l.type) {
                    case "Point":
                        return s = i(u), e ? e(t, s) : new o.Marker(s);
                    case "MultiPoint":
                        for (r = 0, h = u.length; h > r; r++) s = i(u[r]), c.push(e ? e(t, s) : new o.Marker(s));
                        return new o.FeatureGroup(c);
                    case "LineString":
                        return a = this.coordsToLatLngs(u, 0, i), new o.Polyline(a, n);
                    case "Polygon":
                        if (2 === u.length && !u[1].length) throw new Error("Invalid GeoJSON object.");
                        return a = this.coordsToLatLngs(u, 1, i), new o.Polygon(a, n);
                    case "MultiLineString":
                        return a = this.coordsToLatLngs(u, 1, i), new o.MultiPolyline(a, n);
                    case "MultiPolygon":
                        return a = this.coordsToLatLngs(u, 2, i), new o.MultiPolygon(a, n);
                    case "GeometryCollection":
                        for (r = 0, h = l.geometries.length; h > r; r++) c.push(this.geometryToLayer({
                            geometry: l.geometries[r],
                            type: "Feature",
                            properties: t.properties
                        }, e, i, n));
                        return new o.FeatureGroup(c);
                    default:
                        throw new Error("Invalid GeoJSON object.")
                }
            },
            coordsToLatLng: function(t) {
                return new o.LatLng(t[1], t[0], t[2])
            },
            coordsToLatLngs: function(t, e, i) {
                var n, o, s, a = [];
                for (o = 0, s = t.length; s > o; o++) n = e ? this.coordsToLatLngs(t[o], e - 1, i) : (i || this.coordsToLatLng)(t[o]), a.push(n);
                return a
            },
            latLngToCoords: function(t) {
                var e = [t.lng, t.lat];
                return t.alt !== i && e.push(t.alt), e
            },
            latLngsToCoords: function(t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) e.push(o.GeoJSON.latLngToCoords(t[i]));
                return e
            },
            getFeature: function(t, e) {
                return t.feature ? o.extend({}, t.feature, {
                    geometry: e
                }) : o.GeoJSON.asFeature(e)
            },
            asFeature: function(t) {
                return "Feature" === t.type ? t : {
                    type: "Feature",
                    properties: {},
                    geometry: t
                }
            }
        });
    var a = {
        toGeoJSON: function() {
            return o.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    o.Marker.include(a), o.Circle.include(a), o.CircleMarker.include(a), o.Polyline.include({
            toGeoJSON: function() {
                return o.GeoJSON.getFeature(this, {
                    type: "LineString",
                    coordinates: o.GeoJSON.latLngsToCoords(this.getLatLngs())
                })
            }
        }), o.Polygon.include({
            toGeoJSON: function() {
                var t, e, i, n = [o.GeoJSON.latLngsToCoords(this.getLatLngs())];
                if (n[0].push(n[0][0]), this._holes)
                    for (t = 0, e = this._holes.length; e > t; t++) i = o.GeoJSON.latLngsToCoords(this._holes[t]), i.push(i[0]), n.push(i);
                return o.GeoJSON.getFeature(this, {
                    type: "Polygon",
                    coordinates: n
                })
            }
        }),
        function() {
            function t(t) {
                return function() {
                    var e = [];
                    return this.eachLayer(function(t) {
                        e.push(t.toGeoJSON().geometry.coordinates)
                    }), o.GeoJSON.getFeature(this, {
                        type: t,
                        coordinates: e
                    })
                }
            }
            o.MultiPolyline.include({
                toGeoJSON: t("MultiLineString")
            }), o.MultiPolygon.include({
                toGeoJSON: t("MultiPolygon")
            }), o.LayerGroup.include({
                toGeoJSON: function() {
                    var e, i = this.feature && this.feature.geometry,
                        n = [];
                    if (i && "MultiPoint" === i.type) return t("MultiPoint").call(this);
                    var s = i && "GeometryCollection" === i.type;
                    return this.eachLayer(function(t) {
                        t.toGeoJSON && (e = t.toGeoJSON(), n.push(s ? e.geometry : o.GeoJSON.asFeature(e)))
                    }), s ? o.GeoJSON.getFeature(this, {
                        geometries: n,
                        type: "GeometryCollection"
                    }) : {
                        type: "FeatureCollection",
                        features: n
                    }
                }
            })
        }(), o.geoJson = function(t, e) {
            return new o.GeoJSON(t, e)
        }, o.DomEvent = {
            addListener: function(t, e, i, n) {
                var s, a, r, h = o.stamp(i),
                    l = "_leaflet_" + e + h;
                return t[l] ? this : (s = function(e) {
                    return i.call(n || t, e || o.DomEvent._getEvent())
                }, o.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, s, h) : (o.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, s, h), "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", s, !1), t.addEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? (a = s, r = "mouseenter" === e ? "mouseover" : "mouseout", s = function(e) {
                    return o.DomEvent._checkMouse(t, e) ? a(e) : void 0
                }, t.addEventListener(r, s, !1)) : "click" === e && o.Browser.android ? (a = s, s = function(t) {
                    return o.DomEvent._filterClick(t, a)
                }, t.addEventListener(e, s, !1)) : t.addEventListener(e, s, !1) : "attachEvent" in t && t.attachEvent("on" + e, s), t[l] = s, this))
            },
            removeListener: function(t, e, i) {
                var n = o.stamp(i),
                    s = "_leaflet_" + e + n,
                    a = t[s];
                return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, n) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, n) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", a, !1), t.removeEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1) : t.removeEventListener(e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[s] = null, this) : this
            },
            stopPropagation: function(t) {
                return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, o.DomEvent._skipped(t), this
            },
            disableScrollPropagation: function(t) {
                var e = o.DomEvent.stopPropagation;
                return o.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
            },
            disableClickPropagation: function(t) {
                for (var e = o.DomEvent.stopPropagation, i = o.Draggable.START.length - 1; i >= 0; i--) o.DomEvent.on(t, o.Draggable.START[i], e);
                return o.DomEvent.on(t, "click", o.DomEvent._fakeStop).on(t, "dblclick", e)
            },
            preventDefault: function(t) {
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
            },
            stop: function(t) {
                return o.DomEvent.preventDefault(t).stopPropagation(t)
            },
            getMousePosition: function(t, e) {
                if (!e) return new o.Point(t.clientX, t.clientY);
                var i = e.getBoundingClientRect();
                return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
            },
            getWheelDelta: function(t) {
                var e = 0;
                return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
            },
            _skipEvents: {},
            _fakeStop: function(t) {
                o.DomEvent._skipEvents[t.type] = !0
            },
            _skipped: function(t) {
                var e = this._skipEvents[t.type];
                return this._skipEvents[t.type] = !1, e
            },
            _checkMouse: function(t, e) {
                var i = e.relatedTarget;
                if (!i) return !0;
                try {
                    for (; i && i !== t;) i = i.parentNode
                } catch (n) {
                    return !1
                }
                return i !== t
            },
            _getEvent: function() {
                var e = t.event;
                if (!e)
                    for (var i = arguments.callee.caller; i && (e = i.arguments[0], !e || t.Event !== e.constructor);) i = i.caller;
                return e
            },
            _filterClick: function(t, e) {
                var i = t.timeStamp || t.originalEvent.timeStamp,
                    n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
                return n && n > 100 && 500 > n || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i, e(t))
            }
        }, o.DomEvent.on = o.DomEvent.addListener, o.DomEvent.off = o.DomEvent.removeListener, o.Draggable = o.Class.extend({
            includes: o.Mixin.Events,
            statics: {
                START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
                END: {
                    mousedown: "mouseup",
                    touchstart: "touchend",
                    pointerdown: "touchend",
                    MSPointerDown: "touchend"
                },
                MOVE: {
                    mousedown: "mousemove",
                    touchstart: "touchmove",
                    pointerdown: "touchmove",
                    MSPointerDown: "touchmove"
                }
            },
            initialize: function(t, e) {
                this._element = t, this._dragStartTarget = e || t
            },
            enable: function() {
                if (!this._enabled) {
                    for (var t = o.Draggable.START.length - 1; t >= 0; t--) o.DomEvent.on(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
                    this._enabled = !0
                }
            },
            disable: function() {
                if (this._enabled) {
                    for (var t = o.Draggable.START.length - 1; t >= 0; t--) o.DomEvent.off(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
                    this._enabled = !1, this._moved = !1
                }
            },
            _onDown: function(t) {
                if (this._moved = !1, !(t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (o.DomEvent.stopPropagation(t), o.Draggable._disabled || (o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection(), this._moving)))) {
                    var i = t.touches ? t.touches[0] : t;
                    this._startPoint = new o.Point(i.clientX, i.clientY), this._startPos = this._newPos = o.DomUtil.getPosition(this._element), o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
                }
            },
            _onMove: function(t) {
                if (t.touches && t.touches.length > 1) return void(this._moved = !0);
                var i = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                    n = new o.Point(i.clientX, i.clientY),
                    s = n.subtract(this._startPoint);
                (s.x || s.y) && (o.Browser.touch && Math.abs(s.x) + Math.abs(s.y) < 3 || (o.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = o.DomUtil.getPosition(this._element).subtract(s), o.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
            },
            _updatePosition: function() {
                this.fire("predrag"), o.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
            },
            _onUp: function() {
                o.DomUtil.removeClass(e.body, "leaflet-dragging"), this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
                for (var t in o.Draggable.MOVE) o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove).off(e, o.Draggable.END[t], this._onUp);
                o.DomUtil.enableImageDrag(), o.DomUtil.enableTextSelection(), this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                    distance: this._newPos.distanceTo(this._startPos)
                })), this._moving = !1
            }
        }), o.Handler = o.Class.extend({
            initialize: function(t) {
                this._map = t
            },
            enable: function() {
                this._enabled || (this._enabled = !0, this.addHooks())
            },
            disable: function() {
                this._enabled && (this._enabled = !1, this.removeHooks())
            },
            enabled: function() {
                return !!this._enabled
            }
        }), o.Map.mergeOptions({
            dragging: !0,
            inertia: !o.Browser.android23,
            inertiaDeceleration: 3400,
            inertiaMaxSpeed: 1 / 0,
            inertiaThreshold: o.Browser.touch ? 32 : 18,
            easeLinearity: .25,
            worldCopyJump: !1
        }), o.Map.Drag = o.Handler.extend({
            addHooks: function() {
                if (!this._draggable) {
                    var t = this._map;
                    this._draggable = new o.Draggable(t._mapPane, t._container), this._draggable.on({
                        dragstart: this._onDragStart,
                        drag: this._onDrag,
                        dragend: this._onDragEnd
                    }, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
                }
                this._draggable.enable()
            },
            removeHooks: function() {
                this._draggable.disable()
            },
            moved: function() {
                return this._draggable && this._draggable._moved
            },
            _onDragStart: function() {
                var t = this._map;
                t._panAnim && t._panAnim.stop(), t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
            },
            _onDrag: function() {
                if (this._map.options.inertia) {
                    var t = this._lastTime = +new Date,
                        e = this._lastPos = this._draggable._newPos;
                    this._positions.push(e), this._times.push(t), t - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
                }
                this._map.fire("move").fire("drag")
            },
            _onViewReset: function() {
                var t = this._map.getSize()._divideBy(2),
                    e = this._map.latLngToLayerPoint([0, 0]);
                this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.project([0, 180]).x
            },
            _onPreDrag: function() {
                var t = this._worldWidth,
                    e = Math.round(t / 2),
                    i = this._initialWorldOffset,
                    n = this._draggable._newPos.x,
                    o = (n - e + i) % t + e - i,
                    s = (n + e + i) % t - e - i,
                    a = Math.abs(o + i) < Math.abs(s + i) ? o : s;
                this._draggable._newPos.x = a
            },
            _onDragEnd: function(t) {
                var e = this._map,
                    i = e.options,
                    n = +new Date - this._lastTime,
                    s = !i.inertia || n > i.inertiaThreshold || !this._positions[0];
                if (e.fire("dragend", t), s) e.fire("moveend");
                else {
                    var a = this._lastPos.subtract(this._positions[0]),
                        r = (this._lastTime + n - this._times[0]) / 1e3,
                        h = i.easeLinearity,
                        l = a.multiplyBy(h / r),
                        u = l.distanceTo([0, 0]),
                        c = Math.min(i.inertiaMaxSpeed, u),
                        d = l.multiplyBy(c / u),
                        p = c / (i.inertiaDeceleration * h),
                        _ = d.multiplyBy(-p / 2).round();
                    _.x && _.y ? (_ = e._limitOffset(_, e.options.maxBounds), o.Util.requestAnimFrame(function() {
                        e.panBy(_, {
                            duration: p,
                            easeLinearity: h,
                            noMoveStart: !0
                        })
                    })) : e.fire("moveend")
                }
            }
        }), o.Map.addInitHook("addHandler", "dragging", o.Map.Drag), o.Map.mergeOptions({
            doubleClickZoom: !0
        }), o.Map.DoubleClickZoom = o.Handler.extend({
            addHooks: function() {
                this._map.on("dblclick", this._onDoubleClick, this)
            },
            removeHooks: function() {
                this._map.off("dblclick", this._onDoubleClick, this)
            },
            _onDoubleClick: function(t) {
                var e = this._map,
                    i = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
                "center" === e.options.doubleClickZoom ? e.setZoom(i) : e.setZoomAround(t.containerPoint, i)
            }
        }), o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom), o.Map.mergeOptions({
            scrollWheelZoom: !0
        }), o.Map.ScrollWheelZoom = o.Handler.extend({
            addHooks: function() {
                o.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), o.DomEvent.on(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault), this._delta = 0
            },
            removeHooks: function() {
                o.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), o.DomEvent.off(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault)
            },
            _onWheelScroll: function(t) {
                var e = o.DomEvent.getWheelDelta(t);
                this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
                var i = Math.max(40 - (+new Date - this._startTime), 0);
                clearTimeout(this._timer), this._timer = setTimeout(o.bind(this._performZoom, this), i), o.DomEvent.preventDefault(t), o.DomEvent.stopPropagation(t)
            },
            _performZoom: function() {
                var t = this._map,
                    e = this._delta,
                    i = t.getZoom();
                e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(i + e) - i, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + e) : t.setZoomAround(this._lastMousePos, i + e))
            }
        }), o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom), o.extend(o.DomEvent, {
            _touchstart: o.Browser.msPointer ? "MSPointerDown" : o.Browser.pointer ? "pointerdown" : "touchstart",
            _touchend: o.Browser.msPointer ? "MSPointerUp" : o.Browser.pointer ? "pointerup" : "touchend",
            addDoubleTapListener: function(t, i, n) {
                function s(t) {
                    var e;
                    if (o.Browser.pointer ? (_.push(t.pointerId), e = _.length) : e = t.touches.length, !(e > 1)) {
                        var i = Date.now(),
                            n = i - (r || i);
                        h = t.touches ? t.touches[0] : t, l = n > 0 && u >= n, r = i
                    }
                }

                function a(t) {
                    if (o.Browser.pointer) {
                        var e = _.indexOf(t.pointerId);
                        if (-1 === e) return;
                        _.splice(e, 1)
                    }
                    if (l) {
                        if (o.Browser.pointer) {
                            var n, s = {};
                            for (var a in h) n = h[a], s[a] = "function" == typeof n ? n.bind(h) : n;
                            h = s
                        }
                        h.type = "dblclick", i(h), r = null
                    }
                }
                var r, h, l = !1,
                    u = 250,
                    c = "_leaflet_",
                    d = this._touchstart,
                    p = this._touchend,
                    _ = [];
                t[c + d + n] = s, t[c + p + n] = a;
                var m = o.Browser.pointer ? e.documentElement : t;
                return t.addEventListener(d, s, !1), m.addEventListener(p, a, !1), o.Browser.pointer && m.addEventListener(o.DomEvent.POINTER_CANCEL, a, !1), this
            },
            removeDoubleTapListener: function(t, i) {
                var n = "_leaflet_";
                return t.removeEventListener(this._touchstart, t[n + this._touchstart + i], !1), (o.Browser.pointer ? e.documentElement : t).removeEventListener(this._touchend, t[n + this._touchend + i], !1), o.Browser.pointer && e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL, t[n + this._touchend + i], !1), this
            }
        }), o.extend(o.DomEvent, {
            POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown" : "pointerdown",
            POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove" : "pointermove",
            POINTER_UP: o.Browser.msPointer ? "MSPointerUp" : "pointerup",
            POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
            _pointers: [],
            _pointerDocumentListener: !1,
            addPointerListener: function(t, e, i, n) {
                switch (e) {
                    case "touchstart":
                        return this.addPointerListenerStart(t, e, i, n);
                    case "touchend":
                        return this.addPointerListenerEnd(t, e, i, n);
                    case "touchmove":
                        return this.addPointerListenerMove(t, e, i, n);
                    default:
                        throw "Unknown touch event type"
                }
            },
            addPointerListenerStart: function(t, i, n, s) {
                var a = "_leaflet_",
                    r = this._pointers,
                    h = function(t) {
                        o.DomEvent.preventDefault(t);
                        for (var e = !1, i = 0; i < r.length; i++)
                            if (r[i].pointerId === t.pointerId) {
                                e = !0;
                                break
                            } e || r.push(t), t.touches = r.slice(), t.changedTouches = [t], n(t)
                    };
                if (t[a + "touchstart" + s] = h, t.addEventListener(this.POINTER_DOWN, h, !1), !this._pointerDocumentListener) {
                    var l = function(t) {
                        for (var e = 0; e < r.length; e++)
                            if (r[e].pointerId === t.pointerId) {
                                r.splice(e, 1);
                                break
                            }
                    };
                    e.documentElement.addEventListener(this.POINTER_UP, l, !1), e.documentElement.addEventListener(this.POINTER_CANCEL, l, !1), this._pointerDocumentListener = !0
                }
                return this
            },
            addPointerListenerMove: function(t, e, i, n) {
                function o(t) {
                    if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
                        for (var e = 0; e < a.length; e++)
                            if (a[e].pointerId === t.pointerId) {
                                a[e] = t;
                                break
                            } t.touches = a.slice(), t.changedTouches = [t], i(t)
                    }
                }
                var s = "_leaflet_",
                    a = this._pointers;
                return t[s + "touchmove" + n] = o, t.addEventListener(this.POINTER_MOVE, o, !1), this
            },
            addPointerListenerEnd: function(t, e, i, n) {
                var o = "_leaflet_",
                    s = this._pointers,
                    a = function(t) {
                        for (var e = 0; e < s.length; e++)
                            if (s[e].pointerId === t.pointerId) {
                                s.splice(e, 1);
                                break
                            } t.touches = s.slice(), t.changedTouches = [t], i(t)
                    };
                return t[o + "touchend" + n] = a, t.addEventListener(this.POINTER_UP, a, !1), t.addEventListener(this.POINTER_CANCEL, a, !1), this
            },
            removePointerListener: function(t, e, i) {
                var n = "_leaflet_",
                    o = t[n + e + i];
                switch (e) {
                    case "touchstart":
                        t.removeEventListener(this.POINTER_DOWN, o, !1);
                        break;
                    case "touchmove":
                        t.removeEventListener(this.POINTER_MOVE, o, !1);
                        break;
                    case "touchend":
                        t.removeEventListener(this.POINTER_UP, o, !1), t.removeEventListener(this.POINTER_CANCEL, o, !1)
                }
                return this
            }
        }), o.Map.mergeOptions({
            touchZoom: o.Browser.touch && !o.Browser.android23,
            bounceAtZoomLimits: !0
        }), o.Map.TouchZoom = o.Handler.extend({
            addHooks: function() {
                o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
            },
            removeHooks: function() {
                o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
            },
            _onTouchStart: function(t) {
                var i = this._map;
                if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                    var n = i.mouseEventToLayerPoint(t.touches[0]),
                        s = i.mouseEventToLayerPoint(t.touches[1]),
                        a = i._getCenterLayerPoint();
                    this._startCenter = n.add(s)._divideBy(2), this._startDist = n.distanceTo(s), this._moved = !1, this._zooming = !0, this._centerOffset = a.subtract(this._startCenter), i._panAnim && i._panAnim.stop(), o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), o.DomEvent.preventDefault(t)
                }
            },
            _onTouchMove: function(t) {
                var e = this._map;
                if (t.touches && 2 === t.touches.length && this._zooming) {
                    var i = e.mouseEventToLayerPoint(t.touches[0]),
                        n = e.mouseEventToLayerPoint(t.touches[1]);
                    this._scale = i.distanceTo(n) / this._startDist, this._delta = i._add(n)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (e.options.bounceAtZoomLimits || !(e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1)) && (this._moved || (o.DomUtil.addClass(e._mapPane, "leaflet-touching"), e.fire("movestart").fire("zoomstart"), this._moved = !0), o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), o.DomEvent.preventDefault(t))
                }
            },
            _updateOnMove: function() {
                var t = this._map,
                    e = this._getScaleOrigin(),
                    i = t.layerPointToLatLng(e),
                    n = t.getScaleZoom(this._scale);
                t._animateZoom(i, n, this._startCenter, this._scale, this._delta, !1, !0)
            },
            _onTouchEnd: function() {
                if (!this._moved || !this._zooming) return void(this._zooming = !1);
                var t = this._map;
                this._zooming = !1, o.DomUtil.removeClass(t._mapPane, "leaflet-touching"), o.Util.cancelAnimFrame(this._animRequest), o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
                var i = this._getScaleOrigin(),
                    n = t.layerPointToLatLng(i),
                    s = t.getZoom(),
                    a = t.getScaleZoom(this._scale) - s,
                    r = a > 0 ? Math.ceil(a) : Math.floor(a),
                    h = t._limitZoom(s + r),
                    l = t.getZoomScale(h) / this._scale;
                t._animateZoom(n, h, i, l)
            },
            _getScaleOrigin: function() {
                var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
                return this._startCenter.add(t)
            }
        }), o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom), o.Map.mergeOptions({
            tap: !0,
            tapTolerance: 15
        }), o.Map.Tap = o.Handler.extend({
            addHooks: function() {
                o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
            },
            removeHooks: function() {
                o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
            },
            _onDown: function(t) {
                if (t.touches) {
                    if (o.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                    var i = t.touches[0],
                        n = i.target;
                    this._startPos = this._newPos = new o.Point(i.clientX, i.clientY), n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"), this._holdTimeout = setTimeout(o.bind(function() {
                        this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                    }, this), 1e3), o.DomEvent.on(e, "touchmove", this._onMove, this).on(e, "touchend", this._onUp, this)
                }
            },
            _onUp: function(t) {
                if (clearTimeout(this._holdTimeout), o.DomEvent.off(e, "touchmove", this._onMove, this).off(e, "touchend", this._onUp, this), this._fireClick && t && t.changedTouches) {
                    var i = t.changedTouches[0],
                        n = i.target;
                    n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", i)
                }
            },
            _isTapValid: function() {
                return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
            },
            _onMove: function(t) {
                var e = t.touches[0];
                this._newPos = new o.Point(e.clientX, e.clientY)
            },
            _simulateEvent: function(i, n) {
                var o = e.createEvent("MouseEvents");
                o._simulated = !0, n.target._simulatedClick = !0, o.initMouseEvent(i, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(o)
            }
        }), o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap), o.Map.mergeOptions({
            boxZoom: !0
        }), o.Map.BoxZoom = o.Handler.extend({
            initialize: function(t) {
                this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._moved = !1
            },
            addHooks: function() {
                o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
            },
            removeHooks: function() {
                o.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
            },
            moved: function() {
                return this._moved
            },
            _onMouseDown: function(t) {
                return this._moved = !1, !t.shiftKey || 1 !== t.which && 1 !== t.button ? !1 : (o.DomUtil.disableTextSelection(), o.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(t), void o.DomEvent.on(e, "mousemove", this._onMouseMove, this).on(e, "mouseup", this._onMouseUp, this).on(e, "keydown", this._onKeyDown, this))
            },
            _onMouseMove: function(t) {
                this._moved || (this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._pane), o.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
                var e = this._startLayerPoint,
                    i = this._box,
                    n = this._map.mouseEventToLayerPoint(t),
                    s = n.subtract(e),
                    a = new o.Point(Math.min(n.x, e.x), Math.min(n.y, e.y));
                o.DomUtil.setPosition(i, a), this._moved = !0, i.style.width = Math.max(0, Math.abs(s.x) - 4) + "px", i.style.height = Math.max(0, Math.abs(s.y) - 4) + "px"
            },
            _finish: function() {
                this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), o.DomUtil.enableTextSelection(), o.DomUtil.enableImageDrag(), o.DomEvent.off(e, "mousemove", this._onMouseMove).off(e, "mouseup", this._onMouseUp).off(e, "keydown", this._onKeyDown)
            },
            _onMouseUp: function(t) {
                this._finish();
                var e = this._map,
                    i = e.mouseEventToLayerPoint(t);
                if (!this._startLayerPoint.equals(i)) {
                    var n = new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(i));
                    e.fitBounds(n), e.fire("boxzoomend", {
                        boxZoomBounds: n
                    })
                }
            },
            _onKeyDown: function(t) {
                27 === t.keyCode && this._finish()
            }
        }), o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom), o.Map.mergeOptions({
            keyboard: !0,
            keyboardPanOffset: 80,
            keyboardZoomOffset: 1
        }), o.Map.Keyboard = o.Handler.extend({
            keyCodes: {
                left: [37],
                right: [39],
                down: [40],
                up: [38],
                zoomIn: [187, 107, 61, 171],
                zoomOut: [189, 109, 173]
            },
            initialize: function(t) {
                this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
            },
            addHooks: function() {
                var t = this._map._container; - 1 === t.tabIndex && (t.tabIndex = "0"), o.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
            },
            removeHooks: function() {
                this._removeHooks();
                var t = this._map._container;
                o.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
            },
            _onMouseDown: function() {
                if (!this._focused) {
                    var i = e.body,
                        n = e.documentElement,
                        o = i.scrollTop || n.scrollTop,
                        s = i.scrollLeft || n.scrollLeft;
                    this._map._container.focus(), t.scrollTo(s, o)
                }
            },
            _onFocus: function() {
                this._focused = !0, this._map.fire("focus")
            },
            _onBlur: function() {
                this._focused = !1, this._map.fire("blur")
            },
            _setPanOffset: function(t) {
                var e, i, n = this._panKeys = {},
                    o = this.keyCodes;
                for (e = 0, i = o.left.length; i > e; e++) n[o.left[e]] = [-1 * t, 0];
                for (e = 0, i = o.right.length; i > e; e++) n[o.right[e]] = [t, 0];
                for (e = 0, i = o.down.length; i > e; e++) n[o.down[e]] = [0, t];
                for (e = 0, i = o.up.length; i > e; e++) n[o.up[e]] = [0, -1 * t]
            },
            _setZoomOffset: function(t) {
                var e, i, n = this._zoomKeys = {},
                    o = this.keyCodes;
                for (e = 0, i = o.zoomIn.length; i > e; e++) n[o.zoomIn[e]] = t;
                for (e = 0, i = o.zoomOut.length; i > e; e++) n[o.zoomOut[e]] = -t
            },
            _addHooks: function() {
                o.DomEvent.on(e, "keydown", this._onKeyDown, this)
            },
            _removeHooks: function() {
                o.DomEvent.off(e, "keydown", this._onKeyDown, this)
            },
            _onKeyDown: function(t) {
                var e = t.keyCode,
                    i = this._map;
                if (e in this._panKeys) {
                    if (i._panAnim && i._panAnim._inProgress) return;
                    i.panBy(this._panKeys[e]), i.options.maxBounds && i.panInsideBounds(i.options.maxBounds)
                } else {
                    if (!(e in this._zoomKeys)) return;
                    i.setZoom(i.getZoom() + this._zoomKeys[e])
                }
                o.DomEvent.stop(t)
            }
        }), o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard), o.Handler.MarkerDrag = o.Handler.extend({
            initialize: function(t) {
                this._marker = t
            },
            addHooks: function() {
                var t = this._marker._icon;
                this._draggable || (this._draggable = new o.Draggable(t, t)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), o.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
            },
            removeHooks: function() {
                this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
            },
            moved: function() {
                return this._draggable && this._draggable._moved
            },
            _onDragStart: function() {
                this._marker.closePopup().fire("movestart").fire("dragstart")
            },
            _onDrag: function() {
                var t = this._marker,
                    e = t._shadow,
                    i = o.DomUtil.getPosition(t._icon),
                    n = t._map.layerPointToLatLng(i);
                e && o.DomUtil.setPosition(e, i), t._latlng = n, t.fire("move", {
                    latlng: n
                }).fire("drag")
            },
            _onDragEnd: function(t) {
                this._marker.fire("moveend").fire("dragend", t)
            }
        }), o.Control = o.Class.extend({
            options: {
                position: "topright"
            },
            initialize: function(t) {
                o.setOptions(this, t)
            },
            getPosition: function() {
                return this.options.position
            },
            setPosition: function(t) {
                var e = this._map;
                return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
            },
            getContainer: function() {
                return this._container
            },
            addTo: function(t) {
                this._map = t;
                var e = this._container = this.onAdd(t),
                    i = this.getPosition(),
                    n = t._controlCorners[i];
                return o.DomUtil.addClass(e, "leaflet-control"), -1 !== i.indexOf("bottom") ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this
            },
            removeFrom: function(t) {
                var e = this.getPosition(),
                    i = t._controlCorners[e];
                return i.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(t), this
            },
            _refocusOnMap: function() {
                this._map && this._map.getContainer().focus()
            }
        }), o.control = function(t) {
            return new o.Control(t)
        }, o.Map.include({
            addControl: function(t) {
                return t.addTo(this), this
            },
            removeControl: function(t) {
                return t.removeFrom(this), this
            },
            _initControlPos: function() {
                function t(t, s) {
                    var a = i + t + " " + i + s;
                    e[t + s] = o.DomUtil.create("div", a, n)
                }
                var e = this._controlCorners = {},
                    i = "leaflet-",
                    n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
                t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
            },
            _clearControlPos: function() {
                this._container.removeChild(this._controlContainer)
            }
        }), o.Control.Zoom = o.Control.extend({
            options: {
                position: "topleft",
                zoomInText: "+",
                zoomInTitle: "Zoom in",
                zoomOutText: "-",
                zoomOutTitle: "Zoom out"
            },
            onAdd: function(t) {
                var e = "leaflet-control-zoom",
                    i = o.DomUtil.create("div", e + " leaflet-bar");
                return this._map = t, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", i, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", i, this._zoomOut, this), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i
            },
            onRemove: function(t) {
                t.off("zoomend zoomlevelschange", this._updateDisabled, this)
            },
            _zoomIn: function(t) {
                this._map.zoomIn(t.shiftKey ? 3 : 1)
            },
            _zoomOut: function(t) {
                this._map.zoomOut(t.shiftKey ? 3 : 1)
            },
            _createButton: function(t, e, i, n, s, a) {
                var r = o.DomUtil.create("a", i, n);
                r.innerHTML = t, r.href = "#", r.title = e;
                var h = o.DomEvent.stopPropagation;
                return o.DomEvent.on(r, "click", h).on(r, "mousedown", h).on(r, "dblclick", h).on(r, "click", o.DomEvent.preventDefault).on(r, "click", s, a).on(r, "click", this._refocusOnMap, a), r
            },
            _updateDisabled: function() {
                var t = this._map,
                    e = "leaflet-disabled";
                o.DomUtil.removeClass(this._zoomInButton, e), o.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && o.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && o.DomUtil.addClass(this._zoomInButton, e)
            }
        }), o.Map.mergeOptions({
            zoomControl: !0
        }), o.Map.addInitHook(function() {
            this.options.zoomControl && (this.zoomControl = new o.Control.Zoom, this.addControl(this.zoomControl))
        }), o.control.zoom = function(t) {
            return new o.Control.Zoom(t)
        }, o.Control.Attribution = o.Control.extend({
            options: {
                position: "bottomright",
                prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
            },
            initialize: function(t) {
                o.setOptions(this, t), this._attributions = {}
            },
            onAdd: function(t) {
                this._container = o.DomUtil.create("div", "leaflet-control-attribution"), o.DomEvent.disableClickPropagation(this._container);
                for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
                return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
            },
            onRemove: function(t) {
                t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
            },
            setPrefix: function(t) {
                return this.options.prefix = t, this._update(), this
            },
            addAttribution: function(t) {
                return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : void 0
            },
            removeAttribution: function(t) {
                return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : void 0
            },
            _update: function() {
                if (this._map) {
                    var t = [];
                    for (var e in this._attributions) this._attributions[e] && t.push(e);
                    var i = [];
                    this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(" | ")
                }
            },
            _onLayerAdd: function(t) {
                t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
            },
            _onLayerRemove: function(t) {
                t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
            }
        }), o.Map.mergeOptions({
            attributionControl: !0
        }), o.Map.addInitHook(function() {
            this.options.attributionControl && (this.attributionControl = (new o.Control.Attribution).addTo(this))
        }), o.control.attribution = function(t) {
            return new o.Control.Attribution(t)
        }, o.Control.Scale = o.Control.extend({
            options: {
                position: "bottomleft",
                maxWidth: 100,
                metric: !0,
                imperial: !0,
                updateWhenIdle: !1
            },
            onAdd: function(t) {
                this._map = t;
                var e = "leaflet-control-scale",
                    i = o.DomUtil.create("div", e),
                    n = this.options;
                return this._addScales(n, e, i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
            },
            onRemove: function(t) {
                t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
            },
            _addScales: function(t, e, i) {
                t.metric && (this._mScale = o.DomUtil.create("div", e + "-line", i)), t.imperial && (this._iScale = o.DomUtil.create("div", e + "-line", i))
            },
            _update: function() {
                var t = this._map.getBounds(),
                    e = t.getCenter().lat,
                    i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
                    n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
                    o = this._map.getSize(),
                    s = this.options,
                    a = 0;
                o.x > 0 && (a = n * (s.maxWidth / o.x)), this._updateScales(s, a)
            },
            _updateScales: function(t, e) {
                t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
            },
            _updateMetric: function(t) {
                var e = this._getRoundNum(t);
                this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
            },
            _updateImperial: function(t) {
                var e, i, n, o = 3.2808399 * t,
                    s = this._iScale;
                o > 5280 ? (e = o / 5280, i = this._getRoundNum(e), s.style.width = this._getScaleWidth(i / e) + "px", s.innerHTML = i + " mi") : (n = this._getRoundNum(o), s.style.width = this._getScaleWidth(n / o) + "px", s.innerHTML = n + " ft")
            },
            _getScaleWidth: function(t) {
                return Math.round(this.options.maxWidth * t) - 10
            },
            _getRoundNum: function(t) {
                var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                    i = t / e;
                return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
            }
        }), o.control.scale = function(t) {
            return new o.Control.Scale(t)
        }, o.Control.Layers = o.Control.extend({
            options: {
                collapsed: !0,
                position: "topright",
                autoZIndex: !0
            },
            initialize: function(t, e, i) {
                o.setOptions(this, i), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
                for (var n in t) this._addLayer(t[n], n);
                for (n in e) this._addLayer(e[n], n, !0)
            },
            onAdd: function(t) {
                return this._initLayout(), this._update(), t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
            },
            onRemove: function(t) {
                t.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
            },
            addBaseLayer: function(t, e) {
                return this._addLayer(t, e), this._update(), this
            },
            addOverlay: function(t, e) {
                return this._addLayer(t, e, !0), this._update(), this
            },
            removeLayer: function(t) {
                var e = o.stamp(t);
                return delete this._layers[e], this._update(), this
            },
            _initLayout: function() {
                var t = "leaflet-control-layers",
                    e = this._container = o.DomUtil.create("div", t);
                e.setAttribute("aria-haspopup", !0), o.Browser.touch ? o.DomEvent.on(e, "click", o.DomEvent.stopPropagation) : o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
                var i = this._form = o.DomUtil.create("form", t + "-list");
                if (this.options.collapsed) {
                    o.Browser.android || o.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
                    var n = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
                    n.href = "#", n.title = "Layers", o.Browser.touch ? o.DomEvent.on(n, "click", o.DomEvent.stop).on(n, "click", this._expand, this) : o.DomEvent.on(n, "focus", this._expand, this), o.DomEvent.on(i, "click", function() {
                        setTimeout(o.bind(this._onInputClick, this), 0)
                    }, this), this._map.on("click", this._collapse, this)
                } else this._expand();
                this._baseLayersList = o.DomUtil.create("div", t + "-base", i), this._separator = o.DomUtil.create("div", t + "-separator", i), this._overlaysList = o.DomUtil.create("div", t + "-overlays", i), e.appendChild(i)
            },
            _addLayer: function(t, e, i) {
                var n = o.stamp(t);
                this._layers[n] = {
                    layer: t,
                    name: e,
                    overlay: i
                }, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
            },
            _update: function() {
                if (this._container) {
                    this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
                    var t, e, i = !1,
                        n = !1;
                    for (t in this._layers) e = this._layers[t], this._addItem(e), n = n || e.overlay, i = i || !e.overlay;
                    this._separator.style.display = n && i ? "" : "none"
                }
            },
            _onLayerChange: function(t) {
                var e = this._layers[o.stamp(t.layer)];
                if (e) {
                    this._handlingClick || this._update();
                    var i = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null;
                    i && this._map.fire(i, e)
                }
            },
            _createRadioElement: function(t, i) {
                var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
                i && (n += ' checked="checked"'), n += "/>";
                var o = e.createElement("div");
                return o.innerHTML = n, o.firstChild
            },
            _addItem: function(t) {
                var i, n = e.createElement("label"),
                    s = this._map.hasLayer(t.layer);
                t.overlay ? (i = e.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = s) : i = this._createRadioElement("leaflet-base-layers", s), i.layerId = o.stamp(t.layer), o.DomEvent.on(i, "click", this._onInputClick, this);
                var a = e.createElement("span");
                a.innerHTML = " " + t.name, n.appendChild(i), n.appendChild(a);
                var r = t.overlay ? this._overlaysList : this._baseLayersList;
                return r.appendChild(n), n
            },
            _onInputClick: function() {
                var t, e, i, n = this._form.getElementsByTagName("input"),
                    o = n.length;
                for (this._handlingClick = !0, t = 0; o > t; t++) e = n[t], i = this._layers[e.layerId], e.checked && !this._map.hasLayer(i.layer) ? this._map.addLayer(i.layer) : !e.checked && this._map.hasLayer(i.layer) && this._map.removeLayer(i.layer);
                this._handlingClick = !1, this._refocusOnMap()
            },
            _expand: function() {
                o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
            },
            _collapse: function() {
                this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
            }
        }), o.control.layers = function(t, e, i) {
            return new o.Control.Layers(t, e, i)
        }, o.PosAnimation = o.Class.extend({
            includes: o.Mixin.Events,
            run: function(t, e, i, n) {
                this.stop(), this._el = t, this._inProgress = !0, this._newPos = e, this.fire("start"), t.style[o.DomUtil.TRANSITION] = "all " + (i || .25) + "s cubic-bezier(0,0," + (n || .5) + ",1)", o.DomEvent.on(t, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this), o.DomUtil.setPosition(t, e), o.Util.falseFn(t.offsetWidth), this._stepTimer = setInterval(o.bind(this._onStep, this), 50)
            },
            stop: function() {
                this._inProgress && (o.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), o.Util.falseFn(this._el.offsetWidth))
            },
            _onStep: function() {
                var t = this._getPos();
                return t ? (this._el._leaflet_pos = t, void this.fire("step")) : void this._onTransitionEnd()
            },
            _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
            _getPos: function() {
                var e, i, n, s = this._el,
                    a = t.getComputedStyle(s);
                if (o.Browser.any3d) {
                    if (n = a[o.DomUtil.TRANSFORM].match(this._transformRe), !n) return;
                    e = parseFloat(n[1]), i = parseFloat(n[2])
                } else e = parseFloat(a.left), i = parseFloat(a.top);
                return new o.Point(e, i, !0)
            },
            _onTransitionEnd: function() {
                o.DomEvent.off(this._el, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[o.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
            }
        }), o.Map.include({
            setView: function(t, e, n) {
                if (e = e === i ? this._zoom : this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), n = n || {}, this._panAnim && this._panAnim.stop(), this._loaded && !n.reset && n !== !0) {
                    n.animate !== i && (n.zoom = o.extend({
                        animate: n.animate
                    }, n.zoom), n.pan = o.extend({
                        animate: n.animate
                    }, n.pan));
                    var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
                    if (s) return clearTimeout(this._sizeTimer), this
                }
                return this._resetView(t, e), this
            },
            panBy: function(t, e) {
                if (t = o.point(t).round(), e = e || {}, !t.x && !t.y) return this;
                if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd
                    }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
                    o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                    var i = this._getMapPanePos().subtract(t);
                    this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this
            },
            _onPanTransitionStep: function() {
                this.fire("move")
            },
            _onPanTransitionEnd: function() {
                o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
            },
            _tryAnimatedPan: function(t, e) {
                var i = this._getCenterOffset(t)._floor();
                return (e && e.animate) === !0 || this.getSize().contains(i) ? (this.panBy(i, e), !0) : !1
            }
        }), o.PosAnimation = o.DomUtil.TRANSITION ? o.PosAnimation : o.PosAnimation.extend({
            run: function(t, e, i, n) {
                this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = o.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
            },
            stop: function() {
                this._inProgress && (this._step(), this._complete())
            },
            _animate: function() {
                this._animId = o.Util.requestAnimFrame(this._animate, this), this._step()
            },
            _step: function() {
                var t = +new Date - this._startTime,
                    e = 1e3 * this._duration;
                e > t ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1), this._complete())
            },
            _runFrame: function(t) {
                var e = this._startPos.add(this._offset.multiplyBy(t));
                o.DomUtil.setPosition(this._el, e), this.fire("step")
            },
            _complete: function() {
                o.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
            },
            _easeOut: function(t) {
                return 1 - Math.pow(1 - t, this._easeOutPower)
            }
        }), o.Map.mergeOptions({
            zoomAnimation: !0,
            zoomAnimationThreshold: 4
        }), o.DomUtil.TRANSITION && o.Map.addInitHook(function() {
            this._zoomAnimated = this.options.zoomAnimation && o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.android23 && !o.Browser.mobileOpera, this._zoomAnimated && o.DomEvent.on(this._mapPane, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
        }), o.Map.include(o.DomUtil.TRANSITION ? {
            _catchTransitionEnd: function(t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
            },
            _nothingToAnimate: function() {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
            },
            _tryAnimatedZoom: function(t, e, i) {
                if (this._animatingZoom) return !0;
                if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                var n = this.getZoomScale(e),
                    o = this._getCenterOffset(t)._divideBy(1 - 1 / n),
                    s = this._getCenterLayerPoint()._add(o);
                return i.animate === !0 || this.getSize().contains(o) ? (this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, s, n, null, !0), !0) : !1
            },
            _animateZoom: function(t, e, i, n, s, a, r) {
                r || (this._animatingZoom = !0), o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = t, this._animateToZoom = e, o.Draggable && (o.Draggable._disabled = !0), o.Util.requestAnimFrame(function() {
                    this.fire("zoomanim", {
                        center: t,
                        zoom: e,
                        origin: i,
                        scale: n,
                        delta: s,
                        backwards: a
                    })
                }, this)
            },
            _onZoomTransitionEnd: function() {
                this._animatingZoom = !1, o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), o.Draggable && (o.Draggable._disabled = !1)
            }
        } : {}), o.TileLayer.include({
            _animateZoom: function(t) {
                this._animating || (this._animating = !0, this._prepareBgBuffer());
                var e = this._bgBuffer,
                    i = o.DomUtil.TRANSFORM,
                    n = t.delta ? o.DomUtil.getTranslateString(t.delta) : e.style[i],
                    s = o.DomUtil.getScaleString(t.scale, t.origin);
                e.style[i] = t.backwards ? s + " " + n : n + " " + s
            },
            _endZoomAnim: function() {
                var t = this._tileContainer,
                    e = this._bgBuffer;
                t.style.visibility = "", t.parentNode.appendChild(t), o.Util.falseFn(e.offsetWidth), this._animating = !1
            },
            _clearBgBuffer: function() {
                var t = this._map;
                !t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[o.DomUtil.TRANSFORM] = "")
            },
            _prepareBgBuffer: function() {
                var t = this._tileContainer,
                    e = this._bgBuffer,
                    i = this._getLoadedTilesPercentage(e),
                    n = this._getLoadedTilesPercentage(t);
                return e && i > .5 && .5 > n ? (t.style.visibility = "hidden", void this._stopLoadingImages(t)) : (e.style.visibility = "hidden", e.style[o.DomUtil.TRANSFORM] = "", this._tileContainer = e, e = this._bgBuffer = t, this._stopLoadingImages(e), void clearTimeout(this._clearBgBufferTimer))
            },
            _getLoadedTilesPercentage: function(t) {
                var e, i, n = t.getElementsByTagName("img"),
                    o = 0;
                for (e = 0, i = n.length; i > e; e++) n[e].complete && o++;
                return o / i
            },
            _stopLoadingImages: function(t) {
                var e, i, n, s = Array.prototype.slice.call(t.getElementsByTagName("img"));
                for (e = 0, i = s.length; i > e; e++) n = s[e], n.complete || (n.onload = o.Util.falseFn, n.onerror = o.Util.falseFn, n.src = o.Util.emptyImageUrl, n.parentNode.removeChild(n))
            }
        }), o.Map.include({
            _defaultLocateOptions: {
                watch: !1,
                setView: !1,
                maxZoom: 1 / 0,
                timeout: 1e4,
                maximumAge: 0,
                enableHighAccuracy: !1
            },
            locate: function(t) {
                if (t = this._locateOptions = o.extend(this._defaultLocateOptions, t), !navigator.geolocation) return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }), this;
                var e = o.bind(this._handleGeolocationResponse, this),
                    i = o.bind(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
            },
            stopLocate: function() {
                return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
            },
            _handleGeolocationError: function(t) {
                var e = t.code,
                    i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: e,
                    message: "Geolocation error: " + i + "."
                })
            },
            _handleGeolocationResponse: function(t) {
                var e = t.coords.latitude,
                    i = t.coords.longitude,
                    n = new o.LatLng(e, i),
                    s = 180 * t.coords.accuracy / 40075017,
                    a = s / Math.cos(o.LatLng.DEG_TO_RAD * e),
                    r = o.latLngBounds([e - s, i - a], [e + s, i + a]),
                    h = this._locateOptions;
                if (h.setView) {
                    var l = Math.min(this.getBoundsZoom(r), h.maxZoom);
                    this.setView(n, l)
                }
                var u = {
                    latlng: n,
                    bounds: r,
                    timestamp: t.timestamp
                };
                for (var c in t.coords) "number" == typeof t.coords[c] && (u[c] = t.coords[c]);
                this.fire("locationfound", u)
            }
        })
}(window, document);
var polyline = {};
polyline.decode = function(l, e) {
    for (var o, n, h = 0, r = 0, d = 0, t = [], a = 0, i = 0, u = null, c = Math.pow(10, e || 5), p = 0; h < l.length;) {
        u = null, a = 0, i = 0;
        do u = l.charCodeAt(h++) - 63, i |= (31 & u) << a, a += 5; while (u >= 32);
        o = 1 & i ? ~(i >> 1) : i >> 1, a = i = 0;
        do u = l.charCodeAt(h++) - 63, i |= (31 & u) << a, a += 5; while (u >= 32);
        n = 1 & i ? ~(i >> 1) : i >> 1, r += o, d += n, p++ % 2 || t.push([d / c, r / c])
    }
    return t
};
(function() {
    var n = this,
        t = n._,
        r = Array.prototype,
        e = Object.prototype,
        u = Function.prototype,
        i = r.push,
        a = r.slice,
        o = r.concat,
        l = e.toString,
        c = e.hasOwnProperty,
        f = Array.isArray,
        s = Object.keys,
        p = u.bind,
        h = function(n) {
            return n instanceof h ? n : this instanceof h ? void(this._wrapped = n) : new h(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports._ = h) : n._ = h, h.VERSION = "1.7.0";
    var g = function(n, t, r) {
        if (void 0 === t) return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function(r) {
                    return n.call(t, r)
                };
            case 2:
                return function(r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function(r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function(r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function() {
            return n.apply(t, arguments)
        }
    };
    h.iteratee = function(n, t, r) {
        return null == n ? h.identity : h.isFunction(n) ? g(n, t, r) : h.isObject(n) ? h.matches(n) : h.property(n)
    }, h.each = h.forEach = function(n, t, r) {
        if (null == n) return n;
        t = g(t, r);
        var e, u = n.length;
        if (u === +u)
            for (e = 0; u > e; e++) t(n[e], e, n);
        else {
            var i = h.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, h.map = h.collect = function(n, t, r) {
        if (null == n) return [];
        t = h.iteratee(t, r);
        for (var e, u = n.length !== +n.length && h.keys(n), i = (u || n).length, a = Array(i), o = 0; i > o; o++) e = u ? u[o] : o, a[o] = t(n[e], e, n);
        return a
    };
    var v = "Reduce of empty array with no initial value";
    h.reduce = h.foldl = h.inject = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length,
            o = 0;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[o++] : o++]
        }
        for (; a > o; o++) u = i ? i[o] : o, r = t(r, n[u], u, n);
        return r
    }, h.reduceRight = h.foldr = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[--a] : --a]
        }
        for (; a--;) u = i ? i[a] : a, r = t(r, n[u], u, n);
        return r
    }, h.find = h.detect = function(n, t, r) {
        var e;
        return t = h.iteratee(t, r), h.some(n, function(n, r, u) {
            return t(n, r, u) ? (e = n, !0) : void 0
        }), e
    }, h.filter = h.select = function(n, t, r) {
        var e = [];
        return null == n ? e : (t = h.iteratee(t, r), h.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e)
    }, h.reject = function(n, t, r) {
        return h.filter(n, h.negate(h.iteratee(t)), r)
    }, h.every = h.all = function(n, t, r) {
        if (null == n) return !0;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        for (e = 0; a > e; e++)
            if (u = i ? i[e] : e, !t(n[u], u, n)) return !1;
        return !0
    }, h.some = h.any = function(n, t, r) {
        if (null == n) return !1;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n),
            a = (i || n).length;
        for (e = 0; a > e; e++)
            if (u = i ? i[e] : e, t(n[u], u, n)) return !0;
        return !1
    }, h.contains = h.include = function(n, t) {
        return null == n ? !1 : (n.length !== +n.length && (n = h.values(n)), h.indexOf(n, t) >= 0)
    }, h.invoke = function(n, t) {
        var r = a.call(arguments, 2),
            e = h.isFunction(t);
        return h.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, h.pluck = function(n, t) {
        return h.map(n, h.property(t))
    }, h.where = function(n, t) {
        return h.filter(n, h.matches(t))
    }, h.findWhere = function(n, t) {
        return h.find(n, h.matches(t))
    }, h.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            a = -1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], e > i && (i = e)
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (u > a || u === -1 / 0 && i === -1 / 0) && (i = n, a = u)
        });
        return i
    }, h.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            a = 1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], i > e && (i = e)
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (a > u || 1 / 0 === u && 1 / 0 === i) && (i = n, a = u)
        });
        return i
    }, h.shuffle = function(n) {
        for (var t, r = n && n.length === +n.length ? n : h.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = h.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, h.sample = function(n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = h.values(n)), n[h.random(n.length - 1)]) : h.shuffle(n).slice(0, Math.max(0, t))
    }, h.sortBy = function(n, t, r) {
        return t = h.iteratee(t, r), h.pluck(h.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r) return 1;
                if (e > r || void 0 === e) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var m = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = h.iteratee(r, e), h.each(t, function(e, i) {
                var a = r(e, i, t);
                n(u, e, a)
            }), u
        }
    };
    h.groupBy = m(function(n, t, r) {
        h.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), h.indexBy = m(function(n, t, r) {
        n[r] = t
    }), h.countBy = m(function(n, t, r) {
        h.has(n, r) ? n[r]++ : n[r] = 1
    }), h.sortedIndex = function(n, t, r, e) {
        r = h.iteratee(r, e, 1);
        for (var u = r(t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r(n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, h.toArray = function(n) {
        return n ? h.isArray(n) ? a.call(n) : n.length === +n.length ? h.map(n, h.identity) : h.values(n) : []
    }, h.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : h.keys(n).length
    }, h.partition = function(n, t, r) {
        t = h.iteratee(t, r);
        var e = [],
            u = [];
        return h.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, h.first = h.head = h.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : a.call(n, 0, t)
    }, h.initial = function(n, t, r) {
        return a.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, h.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0))
    }, h.rest = h.tail = h.drop = function(n, t, r) {
        return a.call(n, null == t || r ? 1 : t)
    }, h.compact = function(n) {
        return h.filter(n, h.identity)
    };
    var y = function(n, t, r, e) {
        if (t && h.every(n, h.isArray)) return o.apply(e, n);
        for (var u = 0, a = n.length; a > u; u++) {
            var l = n[u];
            h.isArray(l) || h.isArguments(l) ? t ? i.apply(e, l) : y(l, t, r, e) : r || e.push(l)
        }
        return e
    };
    h.flatten = function(n, t) {
        return y(n, t, !1, [])
    }, h.without = function(n) {
        return h.difference(n, a.call(arguments, 1))
    }, h.uniq = h.unique = function(n, t, r, e) {
        if (null == n) return [];
        h.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = h.iteratee(r, e));
        for (var u = [], i = [], a = 0, o = n.length; o > a; a++) {
            var l = n[a];
            if (t) a && i === l || u.push(l), i = l;
            else if (r) {
                var c = r(l, a, n);
                h.indexOf(i, c) < 0 && (i.push(c), u.push(l))
            } else h.indexOf(u, l) < 0 && u.push(l)
        }
        return u
    }, h.union = function() {
        return h.uniq(y(arguments, !0, !0, []))
    }, h.intersection = function(n) {
        if (null == n) return [];
        for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
            var i = n[e];
            if (!h.contains(t, i)) {
                for (var a = 1; r > a && h.contains(arguments[a], i); a++);
                a === r && t.push(i)
            }
        }
        return t
    }, h.difference = function(n) {
        var t = y(a.call(arguments, 1), !0, !0, []);
        return h.filter(n, function(n) {
            return !h.contains(t, n)
        })
    }, h.zip = function(n) {
        if (null == n) return [];
        for (var t = h.max(arguments, "length").length, r = Array(t), e = 0; t > e; e++) r[e] = h.pluck(arguments, e);
        return r
    }, h.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, h.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = h.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1
    }, h.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = n.length;
        for ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)); --e >= 0;)
            if (n[e] === t) return e;
        return -1
    }, h.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var d = function() {};
    h.bind = function(n, t) {
        var r, e;
        if (p && n.bind === p) return p.apply(n, a.call(arguments, 1));
        if (!h.isFunction(n)) throw new TypeError("Bind must be called on a function");
        return r = a.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(a.call(arguments)));
            d.prototype = n.prototype;
            var u = new d;
            d.prototype = null;
            var i = n.apply(u, r.concat(a.call(arguments)));
            return h.isObject(i) ? i : u
        }
    }, h.partial = function(n) {
        var t = a.call(arguments, 1);
        return function() {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === h && (e[u] = arguments[r++]);
            for (; r < arguments.length;) e.push(arguments[r++]);
            return n.apply(this, e)
        }
    }, h.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = h.bind(n[r], n);
        return n
    }, h.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache,
                i = t ? t.apply(this, arguments) : e;
            return h.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, h.delay = function(n, t) {
        var r = a.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, h.defer = function(n) {
        return h.delay.apply(h, [n, 1].concat(a.call(arguments, 1)))
    }, h.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var l = function() {
            o = r.leading === !1 ? 0 : h.now(), a = null, i = n.apply(e, u), a || (e = u = null)
        };
        return function() {
            var c = h.now();
            o || r.leading !== !1 || (o = c);
            var f = t - (c - o);
            return e = this, u = arguments, 0 >= f || f > t ? (clearTimeout(a), a = null, o = c, i = n.apply(e, u), a || (e = u = null)) : a || r.trailing === !1 || (a = setTimeout(l, f)), i
        }
    }, h.debounce = function(n, t, r) {
        var e, u, i, a, o, l = function() {
            var c = h.now() - a;
            t > c && c > 0 ? e = setTimeout(l, t - c) : (e = null, r || (o = n.apply(i, u), e || (i = u = null)))
        };
        return function() {
            i = this, u = arguments, a = h.now();
            var c = r && !e;
            return e || (e = setTimeout(l, t)), c && (o = n.apply(i, u), i = u = null), o
        }
    }, h.wrap = function(n, t) {
        return h.partial(t, n)
    }, h.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }, h.compose = function() {
        var n = arguments,
            t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, h.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, h.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 ? r = t.apply(this, arguments) : t = null, r
        }
    }, h.once = h.partial(h.before, 2), h.keys = function(n) {
        if (!h.isObject(n)) return [];
        if (s) return s(n);
        var t = [];
        for (var r in n) h.has(n, r) && t.push(r);
        return t
    }, h.values = function(n) {
        for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, h.pairs = function(n) {
        for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, h.invert = function(n) {
        for (var t = {}, r = h.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, h.functions = h.methods = function(n) {
        var t = [];
        for (var r in n) h.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, h.extend = function(n) {
        if (!h.isObject(n)) return n;
        for (var t, r, e = 1, u = arguments.length; u > e; e++) {
            t = arguments[e];
            for (r in t) c.call(t, r) && (n[r] = t[r])
        }
        return n
    }, h.pick = function(n, t, r) {
        var e, u = {};
        if (null == n) return u;
        if (h.isFunction(t)) {
            t = g(t, r);
            for (e in n) {
                var i = n[e];
                t(i, e, n) && (u[e] = i)
            }
        } else {
            var l = o.apply([], a.call(arguments, 1));
            n = new Object(n);
            for (var c = 0, f = l.length; f > c; c++) e = l[c], e in n && (u[e] = n[e])
        }
        return u
    }, h.omit = function(n, t, r) {
        if (h.isFunction(t)) t = h.negate(t);
        else {
            var e = h.map(o.apply([], a.call(arguments, 1)), String);
            t = function(n, t) {
                return !h.contains(e, t)
            }
        }
        return h.pick(n, t, r)
    }, h.defaults = function(n) {
        if (!h.isObject(n)) return n;
        for (var t = 1, r = arguments.length; r > t; t++) {
            var e = arguments[t];
            for (var u in e) void 0 === n[u] && (n[u] = e[u])
        }
        return n
    }, h.clone = function(n) {
        return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n
    }, h.tap = function(n, t) {
        return t(n), n
    };
    var b = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof h && (n = n._wrapped), t instanceof h && (t = t._wrapped);
        var u = l.call(n);
        if (u !== l.call(t)) return !1;
        switch (u) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + t;
            case "[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n === +t
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--;)
            if (r[i] === n) return e[i] === t;
        var a = n.constructor,
            o = t.constructor;
        if (a !== o && "constructor" in n && "constructor" in t && !(h.isFunction(a) && a instanceof a && h.isFunction(o) && o instanceof o)) return !1;
        r.push(n), e.push(t);
        var c, f;
        if ("[object Array]" === u) {
            if (c = n.length, f = c === t.length)
                for (; c-- && (f = b(n[c], t[c], r, e)););
        } else {
            var s, p = h.keys(n);
            if (c = p.length, f = h.keys(t).length === c)
                for (; c-- && (s = p[c], f = h.has(t, s) && b(n[s], t[s], r, e)););
        }
        return r.pop(), e.pop(), f
    };
    h.isEqual = function(n, t) {
        return b(n, t, [], [])
    }, h.isEmpty = function(n) {
        if (null == n) return !0;
        if (h.isArray(n) || h.isString(n) || h.isArguments(n)) return 0 === n.length;
        for (var t in n)
            if (h.has(n, t)) return !1;
        return !0
    }, h.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, h.isArray = f || function(n) {
        return "[object Array]" === l.call(n)
    }, h.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        h["is" + n] = function(t) {
            return l.call(t) === "[object " + n + "]"
        }
    }), h.isArguments(arguments) || (h.isArguments = function(n) {
        return h.has(n, "callee")
    }), "function" != typeof /./ && (h.isFunction = function(n) {
        return "function" == typeof n || !1
    }), h.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, h.isNaN = function(n) {
        return h.isNumber(n) && n !== +n
    }, h.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === l.call(n)
    }, h.isNull = function(n) {
        return null === n
    }, h.isUndefined = function(n) {
        return void 0 === n
    }, h.has = function(n, t) {
        return null != n && c.call(n, t)
    }, h.noConflict = function() {
        return n._ = t, this
    }, h.identity = function(n) {
        return n
    }, h.constant = function(n) {
        return function() {
            return n
        }
    }, h.noop = function() {}, h.property = function(n) {
        return function(t) {
            return t[n]
        }
    }, h.matches = function(n) {
        var t = h.pairs(n),
            r = t.length;
        return function(n) {
            if (null == n) return !r;
            n = new Object(n);
            for (var e = 0; r > e; e++) {
                var u = t[e],
                    i = u[0];
                if (u[1] !== n[i] || !(i in n)) return !1
            }
            return !0
        }
    }, h.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = g(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e
    }, h.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, h.now = Date.now || function() {
        return (new Date).getTime()
    };
    var _ = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        w = h.invert(_),
        j = function(n) {
            var t = function(t) {
                    return n[t]
                },
                r = "(?:" + h.keys(n).join("|") + ")",
                e = RegExp(r),
                u = RegExp(r, "g");
            return function(n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    h.escape = j(_), h.unescape = j(w), h.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return h.isFunction(r) ? n[t]() : r
    };
    var x = 0;
    h.uniqueId = function(n) {
        var t = ++x + "";
        return n ? n + t : t
    }, h.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var A = /(.)^/,
        k = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        O = /\\|'|\r|\n|\u2028|\u2029/g,
        F = function(n) {
            return "\\" + k[n]
        };
    h.template = function(n, t, r) {
        !t && r && (t = r), t = h.defaults({}, t, h.templateSettings);
        var e = RegExp([(t.escape || A).source, (t.interpolate || A).source, (t.evaluate || A).source].join("|") + "|$", "g"),
            u = 0,
            i = "__p+='";
        n.replace(e, function(t, r, e, a, o) {
            return i += n.slice(u, o).replace(O, F), u = o + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var a = new Function(t.variable || "obj", "_", i)
        } catch (o) {
            throw o.source = i, o
        }
        var l = function(n) {
                return a.call(this, n, h)
            },
            c = t.variable || "obj";
        return l.source = "function(" + c + "){\n" + i + "}", l
    }, h.chain = function(n) {
        var t = h(n);
        return t._chain = !0, t
    };
    var E = function(n) {
        return this._chain ? h(n).chain() : n
    };
    h.mixin = function(n) {
        h.each(h.functions(n), function(t) {
            var r = h[t] = n[t];
            h.prototype[t] = function() {
                var n = [this._wrapped];
                return i.apply(n, arguments), E.call(this, r.apply(h, n))
            }
        })
    }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], E.call(this, r)
        }
    }), h.each(["concat", "join", "slice"], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            return E.call(this, t.apply(this._wrapped, arguments))
        }
    }), h.prototype.value = function() {
        return this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return h
    })
}).call(this);
(function(e) {
    function t(e, t, n) {
        switch (arguments.length) {
            case 2:
                return null != e ? e : t;
            case 3:
                return null != e ? e : null != t ? t : n;
            default:
                throw new Error("Implement me")
        }
    }

    function n(e, t) {
        return bt.call(e, t)
    }

    function s() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function a(e) {
        gt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function i(e, t) {
        var n = !0;
        return h(function() {
            return n && (a(e), n = !1), t.apply(this, arguments)
        }, t)
    }

    function r(e, t) {
        pn[e] || (a(t), pn[e] = !0)
    }

    function o(e, t) {
        return function(n) {
            return m(e.call(this, n), t)
        }
    }

    function u(e, t) {
        return function(n) {
            return this.localeData().ordinal(e.call(this, n), t)
        }
    }

    function c() {}

    function l(e, t) {
        t !== !1 && F(e), f(this, e), this._d = new Date(+e._d)
    }

    function d(e) {
        var t = k(e),
            n = t.year || 0,
            s = t.quarter || 0,
            a = t.month || 0,
            i = t.week || 0,
            r = t.day || 0,
            o = t.hour || 0,
            u = t.minute || 0,
            c = t.second || 0,
            l = t.millisecond || 0;
        this._milliseconds = +l + 1e3 * c + 6e4 * u + 36e5 * o, this._days = +r + 7 * i, this._months = +a + 3 * s + 12 * n, this._data = {}, this._locale = gt.localeData(), this._bubble()
    }

    function h(e, t) {
        for (var s in t) n(t, s) && (e[s] = t[s]);
        return n(t, "toString") && (e.toString = t.toString), n(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function f(e, t) {
        var n, s, a;
        if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject), "undefined" != typeof t._i && (e._i = t._i), "undefined" != typeof t._f && (e._f = t._f), "undefined" != typeof t._l && (e._l = t._l), "undefined" != typeof t._strict && (e._strict = t._strict), "undefined" != typeof t._tzm && (e._tzm = t._tzm), "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC), "undefined" != typeof t._offset && (e._offset = t._offset), "undefined" != typeof t._pf && (e._pf = t._pf), "undefined" != typeof t._locale && (e._locale = t._locale), zt.length > 0)
            for (n in zt) s = zt[n], a = t[s], "undefined" != typeof a && (e[s] = a);
        return e
    }

    function _(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function m(e, t, n) {
        for (var s = "" + Math.abs(e), a = e >= 0; s.length < t;) s = "0" + s;
        return (a ? n ? "+" : "" : "-") + s
    }

    function y(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
    }

    function p(e, t) {
        var n;
        return t = L(t, e), e.isBefore(t) ? n = y(e, t) : (n = y(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n
    }

    function D(e, t) {
        return function(n, s) {
            var a, i;
            return null === s || isNaN(+s) || (r(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), i = n, n = s, s = i), n = "string" == typeof n ? +n : n, a = gt.duration(n, s), g(this, a, e), this
        }
    }

    function g(e, t, n, s) {
        var a = t._milliseconds,
            i = t._days,
            r = t._months;
        s = null == s ? !0 : s, a && e._d.setTime(+e._d + a * n), i && ft(e, "Date", ht(e, "Date") + i * n), r && dt(e, ht(e, "Month") + r * n), s && gt.updateOffset(e, i || r)
    }

    function M(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function Y(e) {
        return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date
    }

    function w(e, t, n) {
        var s, a = Math.min(e.length, t.length),
            i = Math.abs(e.length - t.length),
            r = 0;
        for (s = 0; a > s; s++)(n && e[s] !== t[s] || !n && S(e[s]) !== S(t[s])) && r++;
        return r + i
    }

    function v(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = ln[e] || dn[t] || t
        }
        return e
    }

    function k(e) {
        var t, s, a = {};
        for (s in e) n(e, s) && (t = v(s), t && (a[t] = e[s]));
        return a
    }

    function b(t) {
        var n, s;
        if (0 === t.indexOf("week")) n = 7, s = "day";
        else {
            if (0 !== t.indexOf("month")) return;
            n = 12, s = "month"
        }
        gt[t] = function(a, i) {
            var r, o, u = gt._locale[t],
                c = [];
            if ("number" == typeof a && (i = a, a = e), o = function(e) {
                    var t = gt().utc().set(s, e);
                    return u.call(gt._locale, t, a || "")
                }, null != i) return o(i);
            for (r = 0; n > r; r++) c.push(o(r));
            return c
        }
    }

    function S(e) {
        var t = +e,
            n = 0;
        return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) : Math.ceil(t)), n
    }

    function T(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }

    function O(e, t, n) {
        return ot(gt([e, 11, 31 + t - n]), t, n).week
    }

    function W(e) {
        return G(e) ? 366 : 365
    }

    function G(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }

    function F(e) {
        var t;
        e._a && -2 === e._pf.overflow && (t = e._a[Tt] < 0 || e._a[Tt] > 11 ? Tt : e._a[Ot] < 1 || e._a[Ot] > T(e._a[St], e._a[Tt]) ? Ot : e._a[Wt] < 0 || e._a[Wt] > 23 ? Wt : e._a[Gt] < 0 || e._a[Gt] > 59 ? Gt : e._a[Ft] < 0 || e._a[Ft] > 59 ? Ft : e._a[Ut] < 0 || e._a[Ut] > 999 ? Ut : -1, e._pf._overflowDayOfYear && (St > t || t > Ot) && (t = Ot), e._pf.overflow = t)
    }

    function U(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), e._isValid
    }

    function C(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function z(e) {
        for (var t, n, s, a, i = 0; i < e.length;) {
            for (a = C(e[i]).split("-"), t = a.length, n = C(e[i + 1]), n = n ? n.split("-") : null; t > 0;) {
                if (s = I(a.slice(0, t).join("-"))) return s;
                if (n && n.length >= t && w(a, n, !0) >= t - 1) break;
                t--
            }
            i++
        }
        return null
    }

    function I(e) {
        var t = null;
        if (!Ct[e] && It) try {
            t = gt.locale(), require("./locale/" + e), gt.locale(t)
        } catch (n) {}
        return Ct[e]
    }

    function L(e, t) {
        return t._isUTC ? gt(e).zone(t._offset || 0) : gt(e).local()
    }

    function P(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function H(e) {
        var t, n, s = e.match(At);
        for (t = 0, n = s.length; n > t; t++) s[t] = yn[s[t]] ? yn[s[t]] : P(s[t]);
        return function(a) {
            var i = "";
            for (t = 0; n > t; t++) i += s[t] instanceof Function ? s[t].call(a, e) : s[t];
            return i
        }
    }

    function A(e, t) {
        return e.isValid() ? (t = x(t, e.localeData()), hn[t] || (hn[t] = H(t)), hn[t](e)) : e.localeData().invalidDate()
    }

    function x(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e
        }
        var s = 5;
        for (xt.lastIndex = 0; s >= 0 && xt.test(e);) e = e.replace(xt, n), xt.lastIndex = 0, s -= 1;
        return e
    }

    function Z(e, t) {
        var n, s = t._strict;
        switch (e) {
            case "Q":
                return Bt;
            case "DDDD":
                return Kt;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return s ? en : jt;
            case "Y":
            case "G":
            case "g":
                return nn;
            case "YYYYYY":
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return s ? tn : Nt;
            case "S":
                if (s) return Bt;
            case "SS":
                if (s) return Rt;
            case "SSS":
                if (s) return Kt;
            case "DDD":
                return Et;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return qt;
            case "a":
            case "A":
                return t._locale._meridiemParse;
            case "X":
                return Qt;
            case "Z":
            case "ZZ":
                return $t;
            case "T":
                return Jt;
            case "SSSS":
                return Vt;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "ww":
            case "WW":
                return s ? Rt : Zt;
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "W":
            case "e":
            case "E":
                return Zt;
            case "Do":
                return Xt;
            default:
                return n = new RegExp(X(Q(e.replace("\\", "")), "i"))
        }
    }

    function E(e) {
        e = e || "";
        var t = e.match($t) || [],
            n = t[t.length - 1] || [],
            s = (n + "").match(un) || ["-", 0, 0],
            a = +(60 * s[1]) + S(s[2]);
        return "+" === s[0] ? -a : a
    }

    function j(e, t, n) {
        var s, a = n._a;
        switch (e) {
            case "Q":
                null != t && (a[Tt] = 3 * (S(t) - 1));
                break;
            case "M":
            case "MM":
                null != t && (a[Tt] = S(t) - 1);
                break;
            case "MMM":
            case "MMMM":
                s = n._locale.monthsParse(t), null != s ? a[Tt] = s : n._pf.invalidMonth = t;
                break;
            case "D":
            case "DD":
                null != t && (a[Ot] = S(t));
                break;
            case "Do":
                null != t && (a[Ot] = S(parseInt(t, 10)));
                break;
            case "DDD":
            case "DDDD":
                null != t && (n._dayOfYear = S(t));
                break;
            case "YY":
                a[St] = gt.parseTwoDigitYear(t);
                break;
            case "YYYY":
            case "YYYYY":
            case "YYYYYY":
                a[St] = S(t);
                break;
            case "a":
            case "A":
                n._isPm = n._locale.isPM(t);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                a[Wt] = S(t);
                break;
            case "m":
            case "mm":
                a[Gt] = S(t);
                break;
            case "s":
            case "ss":
                a[Ft] = S(t);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                a[Ut] = S(1e3 * ("0." + t));
                break;
            case "X":
                n._d = new Date(1e3 * parseFloat(t));
                break;
            case "Z":
            case "ZZ":
                n._useUTC = !0, n._tzm = E(t);
                break;
            case "dd":
            case "ddd":
            case "dddd":
                s = n._locale.weekdaysParse(t), null != s ? (n._w = n._w || {}, n._w.d = s) : n._pf.invalidWeekday = t;
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "e":
            case "E":
                e = e.substr(0, 1);
            case "gggg":
            case "GGGG":
            case "GGGGG":
                e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = S(t));
                break;
            case "gg":
            case "GG":
                n._w = n._w || {}, n._w[e] = gt.parseTwoDigitYear(t)
        }
    }

    function N(e) {
        var n, s, a, i, r, o, u;
        n = e._w, null != n.GG || null != n.W || null != n.E ? (r = 1, o = 4, s = t(n.GG, e._a[St], ot(gt(), 1, 4).year), a = t(n.W, 1), i = t(n.E, 1)) : (r = e._locale._week.dow, o = e._locale._week.doy, s = t(n.gg, e._a[St], ot(gt(), r, o).year), a = t(n.w, 1), null != n.d ? (i = n.d, r > i && ++a) : i = null != n.e ? n.e + r : r), u = ut(s, a, i, o, r), e._a[St] = u.year, e._dayOfYear = u.dayOfYear
    }

    function V(e) {
        var n, s, a, i, r = [];
        if (!e._d) {
            for (a = $(e), e._w && null == e._a[Ot] && null == e._a[Tt] && N(e), e._dayOfYear && (i = t(e._a[St], a[St]), e._dayOfYear > W(i) && (e._pf._overflowDayOfYear = !0), s = st(i, 0, e._dayOfYear), e._a[Tt] = s.getUTCMonth(), e._a[Ot] = s.getUTCDate()), n = 0; 3 > n && null == e._a[n]; ++n) e._a[n] = r[n] = a[n];
            for (; 7 > n; n++) e._a[n] = r[n] = null == e._a[n] ? 2 === n ? 1 : 0 : e._a[n];
            e._d = (e._useUTC ? st : nt).apply(null, r), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() + e._tzm)
        }
    }

    function q(e) {
        var t;
        e._d || (t = k(e._i), e._a = [t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond], V(e))
    }

    function $(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }

    function J(e) {
        if (e._f === gt.ISO_8601) return void R(e);
        e._a = [], e._pf.empty = !0;
        var t, n, s, a, i, r = "" + e._i,
            o = r.length,
            u = 0;
        for (s = x(e._f, e._locale).match(At) || [], t = 0; t < s.length; t++) a = s[t], n = (r.match(Z(a, e)) || [])[0], n && (i = r.substr(0, r.indexOf(n)), i.length > 0 && e._pf.unusedInput.push(i), r = r.slice(r.indexOf(n) + n.length), u += n.length), yn[a] ? (n ? e._pf.empty = !1 : e._pf.unusedTokens.push(a), j(a, n, e)) : e._strict && !n && e._pf.unusedTokens.push(a);
        e._pf.charsLeftOver = o - u, r.length > 0 && e._pf.unusedInput.push(r), e._isPm && e._a[Wt] < 12 && (e._a[Wt] += 12), e._isPm === !1 && 12 === e._a[Wt] && (e._a[Wt] = 0), V(e), F(e)
    }

    function Q(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, a) {
            return t || n || s || a
        })
    }

    function X(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function B(e) {
        var t, n, a, i, r;
        if (0 === e._f.length) return e._pf.invalidFormat = !0, void(e._d = new Date(0 / 0));
        for (i = 0; i < e._f.length; i++) r = 0, t = f({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._pf = s(), t._f = e._f[i], J(t), U(t) && (r += t._pf.charsLeftOver, r += 10 * t._pf.unusedTokens.length, t._pf.score = r, (null == a || a > r) && (a = r, n = t));
        h(e, n || t)
    }

    function R(e) {
        var t, n, s = e._i,
            a = sn.exec(s);
        if (a) {
            for (e._pf.iso = !0, t = 0, n = rn.length; n > t; t++)
                if (rn[t][1].exec(s)) {
                    e._f = rn[t][0] + (a[6] || " ");
                    break
                } for (t = 0, n = on.length; n > t; t++)
                if (on[t][1].exec(s)) {
                    e._f += on[t][0];
                    break
                } s.match($t) && (e._f += "Z"), J(e)
        } else e._isValid = !1
    }

    function K(e) {
        R(e), e._isValid === !1 && (delete e._isValid, gt.createFromInputFallback(e))
    }

    function et(e, t) {
        var n, s = [];
        for (n = 0; n < e.length; ++n) s.push(t(e[n], n));
        return s
    }

    function tt(t) {
        var n, s = t._i;
        s === e ? t._d = new Date : Y(s) ? t._d = new Date(+s) : null !== (n = Lt.exec(s)) ? t._d = new Date(+n[1]) : "string" == typeof s ? K(t) : M(s) ? (t._a = et(s.slice(0), function(e) {
            return parseInt(e, 10)
        }), V(t)) : "object" == typeof s ? q(t) : "number" == typeof s ? t._d = new Date(s) : gt.createFromInputFallback(t)
    }

    function nt(e, t, n, s, a, i, r) {
        var o = new Date(e, t, n, s, a, i, r);
        return 1970 > e && o.setFullYear(e), o
    }

    function st(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return 1970 > e && t.setUTCFullYear(e), t
    }

    function at(e, t) {
        if ("string" == typeof e)
            if (isNaN(e)) {
                if (e = t.weekdaysParse(e), "number" != typeof e) return null
            } else e = parseInt(e, 10);
        return e
    }

    function it(e, t, n, s, a) {
        return a.relativeTime(t || 1, !!n, e, s)
    }

    function rt(e, t, n) {
        var s = gt.duration(e).abs(),
            a = kt(s.as("s")),
            i = kt(s.as("m")),
            r = kt(s.as("h")),
            o = kt(s.as("d")),
            u = kt(s.as("M")),
            c = kt(s.as("y")),
            l = a < fn.s && ["s", a] || 1 === i && ["m"] || i < fn.m && ["mm", i] || 1 === r && ["h"] || r < fn.h && ["hh", r] || 1 === o && ["d"] || o < fn.d && ["dd", o] || 1 === u && ["M"] || u < fn.M && ["MM", u] || 1 === c && ["y"] || ["yy", c];
        return l[2] = t, l[3] = +e > 0, l[4] = n, it.apply({}, l)
    }

    function ot(e, t, n) {
        var s, a = n - t,
            i = n - e.day();
        return i > a && (i -= 7), a - 7 > i && (i += 7), s = gt(e).add(i, "d"), {
            week: Math.ceil(s.dayOfYear() / 7),
            year: s.year()
        }
    }

    function ut(e, t, n, s, a) {
        var i, r, o = st(e, 0, 1).getUTCDay();
        return o = 0 === o ? 7 : o, n = null != n ? n : a, i = a - o + (o > s ? 7 : 0) - (a > o ? 7 : 0), r = 7 * (t - 1) + (n - a) + i + 1, {
            year: r > 0 ? e : e - 1,
            dayOfYear: r > 0 ? r : W(e - 1) + r
        }
    }

    function ct(t) {
        var n = t._i,
            s = t._f;
        return t._locale = t._locale || gt.localeData(t._l), null === n || s === e && "" === n ? gt.invalid({
            nullInput: !0
        }) : ("string" == typeof n && (t._i = n = t._locale.preparse(n)), gt.isMoment(n) ? new l(n, !0) : (s ? M(s) ? B(t) : J(t) : tt(t), new l(t)))
    }

    function lt(e, t) {
        var n, s;
        if (1 === t.length && M(t[0]) && (t = t[0]), !t.length) return gt();
        for (n = t[0], s = 1; s < t.length; ++s) t[s][e](n) && (n = t[s]);
        return n
    }

    function dt(e, t) {
        var n;
        return "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), T(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e)
    }

    function ht(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
    }

    function ft(e, t, n) {
        return "Month" === t ? dt(e, n) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
    }

    function _t(e, t) {
        return function(n) {
            return null != n ? (ft(this, e, n), gt.updateOffset(this, t), this) : ht(this, e)
        }
    }

    function mt(e) {
        return 400 * e / 146097
    }

    function yt(e) {
        return 146097 * e / 400
    }

    function pt(e) {
        gt.duration.fn[e] = function() {
            return this._data[e]
        }
    }

    function Dt(e) {
        "undefined" == typeof ender && (Mt = vt.moment, vt.moment = e ? i("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", gt) : gt)
    }
    for (var gt, Mt, Yt, wt = "2.8.3", vt = "undefined" != typeof global ? global : this, kt = Math.round, bt = Object.prototype.hasOwnProperty, St = 0, Tt = 1, Ot = 2, Wt = 3, Gt = 4, Ft = 5, Ut = 6, Ct = {}, zt = [], It = "undefined" != typeof module && module.exports, Lt = /^\/?Date\((\-?\d+)/i, Pt = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ht = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, At = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, xt = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Zt = /\d\d?/, Et = /\d{1,3}/, jt = /\d{1,4}/, Nt = /[+\-]?\d{1,6}/, Vt = /\d+/, qt = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, $t = /Z|[\+\-]\d\d:?\d\d/gi, Jt = /T/i, Qt = /[\+\-]?\d+(\.\d{1,3})?/, Xt = /\d{1,2}/, Bt = /\d/, Rt = /\d\d/, Kt = /\d{3}/, en = /\d{4}/, tn = /[+-]?\d{6}/, nn = /[+-]?\d+/, sn = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, an = "YYYY-MM-DDTHH:mm:ssZ", rn = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
            ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
            ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d{2}/],
            ["YYYY-DDD", /\d{4}-\d{3}/]
        ], on = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ], un = /([\+\-]|\d\d)/gi, cn = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        }), ln = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            Q: "quarter",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        }, dn = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        }, hn = {}, fn = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }, _n = "DDD w W M D d".split(" "), mn = "M D H h m s w W".split(" "), yn = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(e) {
                return this.localeData().monthsShort(this, e)
            },
            MMMM: function(e) {
                return this.localeData().months(this, e)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(e) {
                return this.localeData().weekdaysMin(this, e)
            },
            ddd: function(e) {
                return this.localeData().weekdaysShort(this, e)
            },
            dddd: function(e) {
                return this.localeData().weekdays(this, e)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return m(this.year() % 100, 2)
            },
            YYYY: function() {
                return m(this.year(), 4)
            },
            YYYYY: function() {
                return m(this.year(), 5)
            },
            YYYYYY: function() {
                var e = this.year(),
                    t = e >= 0 ? "+" : "-";
                return t + m(Math.abs(e), 6)
            },
            gg: function() {
                return m(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return m(this.weekYear(), 4)
            },
            ggggg: function() {
                return m(this.weekYear(), 5)
            },
            GG: function() {
                return m(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return m(this.isoWeekYear(), 4)
            },
            GGGGG: function() {
                return m(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return S(this.milliseconds() / 100)
            },
            SS: function() {
                return m(S(this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return m(this.milliseconds(), 3)
            },
            SSSS: function() {
                return m(this.milliseconds(), 3)
            },
            Z: function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + m(S(e / 60), 2) + ":" + m(S(e) % 60, 2)
            },
            ZZ: function() {
                var e = -this.zone(),
                    t = "+";
                return 0 > e && (e = -e, t = "-"), t + m(S(e / 60), 2) + m(S(e) % 60, 2)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            X: function() {
                return this.unix()
            },
            Q: function() {
                return this.quarter()
            }
        }, pn = {}, Dn = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; _n.length;) Yt = _n.pop(), yn[Yt + "o"] = u(yn[Yt], Yt);
    for (; mn.length;) Yt = mn.pop(), yn[Yt + Yt] = o(yn[Yt], 2);
    yn.DDDD = o(yn.DDD, 3), h(c.prototype, {
        set: function(e) {
            var t, n;
            for (n in e) t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(e) {
            return this._months[e.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(e) {
            return this._monthsShort[e.month()]
        },
        monthsParse: function(e) {
            var t, n, s;
            for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)
                if (this._monthsParse[t] || (n = gt.utc([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e)) return t
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(e) {
            return this._weekdays[e.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(e) {
            return this._weekdaysShort[e.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(e) {
            return this._weekdaysMin[e.day()]
        },
        weekdaysParse: function(e) {
            var t, n, s;
            for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)
                if (this._weekdaysParse[t] || (n = gt([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(e) {
            var t = this._longDateFormat[e];
            return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1)
            }), this._longDateFormat[e] = t), t
        },
        isPM: function(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(e, t) {
            var n = this._calendar[e];
            return "function" == typeof n ? n.apply(t) : n
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(e, t, n, s) {
            var a = this._relativeTime[n];
            return "function" == typeof a ? a(e, t, n, s) : a.replace(/%d/i, e)
        },
        pastFuture: function(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
        },
        ordinal: function(e) {
            return this._ordinal.replace("%d", e)
        },
        _ordinal: "%d",
        preparse: function(e) {
            return e
        },
        postformat: function(e) {
            return e
        },
        week: function(e) {
            return ot(e, this._week.dow, this._week.doy).week
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate
        }
    }), gt = function(t, n, a, i) {
        var r;
        return "boolean" == typeof a && (i = a, a = e), r = {}, r._isAMomentObject = !0, r._i = t, r._f = n, r._l = a, r._strict = i, r._isUTC = !1, r._pf = s(), ct(r)
    }, gt.suppressDeprecationWarnings = !1, gt.createFromInputFallback = i("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i)
    }), gt.min = function() {
        var e = [].slice.call(arguments, 0);
        return lt("isBefore", e)
    }, gt.max = function() {
        var e = [].slice.call(arguments, 0);
        return lt("isAfter", e)
    }, gt.utc = function(t, n, a, i) {
        var r;
        return "boolean" == typeof a && (i = a, a = e), r = {}, r._isAMomentObject = !0, r._useUTC = !0, r._isUTC = !0, r._l = a, r._i = t, r._f = n, r._strict = i, r._pf = s(), ct(r).utc()
    }, gt.unix = function(e) {
        return gt(1e3 * e)
    }, gt.duration = function(e, t) {
        var s, a, i, r, o = e,
            u = null;
        return gt.isDuration(e) ? o = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (o = {}, t ? o[t] = e : o.milliseconds = e) : (u = Pt.exec(e)) ? (s = "-" === u[1] ? -1 : 1, o = {
            y: 0,
            d: S(u[Ot]) * s,
            h: S(u[Wt]) * s,
            m: S(u[Gt]) * s,
            s: S(u[Ft]) * s,
            ms: S(u[Ut]) * s
        }) : (u = Ht.exec(e)) ? (s = "-" === u[1] ? -1 : 1, i = function(e) {
            var t = e && parseFloat(e.replace(",", "."));
            return (isNaN(t) ? 0 : t) * s
        }, o = {
            y: i(u[2]),
            M: i(u[3]),
            d: i(u[4]),
            h: i(u[5]),
            m: i(u[6]),
            s: i(u[7]),
            w: i(u[8])
        }) : "object" == typeof o && ("from" in o || "to" in o) && (r = p(gt(o.from), gt(o.to)), o = {}, o.ms = r.milliseconds, o.M = r.months), a = new d(o), gt.isDuration(e) && n(e, "_locale") && (a._locale = e._locale), a
    }, gt.version = wt, gt.defaultFormat = an, gt.ISO_8601 = function() {}, gt.momentProperties = zt, gt.updateOffset = function() {}, gt.relativeTimeThreshold = function(t, n) {
        return fn[t] === e ? !1 : n === e ? fn[t] : (fn[t] = n, !0)
    }, gt.lang = i("moment.lang is deprecated. Use moment.locale instead.", function(e, t) {
        return gt.locale(e, t)
    }), gt.locale = function(e, t) {
        var n;
        return e && (n = "undefined" != typeof t ? gt.defineLocale(e, t) : gt.localeData(e), n && (gt.duration._locale = gt._locale = n)), gt._locale._abbr
    }, gt.defineLocale = function(e, t) {
        return null !== t ? (t.abbr = e, Ct[e] || (Ct[e] = new c), Ct[e].set(t), gt.locale(e), Ct[e]) : (delete Ct[e], null)
    }, gt.langData = i("moment.langData is deprecated. Use moment.localeData instead.", function(e) {
        return gt.localeData(e)
    }), gt.localeData = function(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return gt._locale;
        if (!M(e)) {
            if (t = I(e)) return t;
            e = [e]
        }
        return z(e)
    }, gt.isMoment = function(e) {
        return e instanceof l || null != e && n(e, "_isAMomentObject")
    }, gt.isDuration = function(e) {
        return e instanceof d
    };
    for (Yt = Dn.length - 1; Yt >= 0; --Yt) b(Dn[Yt]);
    gt.normalizeUnits = function(e) {
        return v(e)
    }, gt.invalid = function(e) {
        var t = gt.utc(0 / 0);
        return null != e ? h(t._pf, e) : t._pf.userInvalidated = !0, t
    }, gt.parseZone = function() {
        return gt.apply(null, arguments).parseZone()
    }, gt.parseTwoDigitYear = function(e) {
        return S(e) + (S(e) > 68 ? 1900 : 2e3)
    }, h(gt.fn = l.prototype, {
        clone: function() {
            return gt(this)
        },
        valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0)
        },
        unix: function() {
            return Math.floor(+this / 1e3)
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function() {
            var e = gt(this).utc();
            return 0 < e.year() && e.year() <= 9999 ? A(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : A(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
        },
        isValid: function() {
            return U(this)
        },
        isDSTShifted: function() {
            return this._a ? this.isValid() && w(this._a, (this._isUTC ? gt.utc(this._a) : gt(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function() {
            return h({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function(e) {
            return this.zone(0, e)
        },
        local: function(e) {
            return this._isUTC && (this.zone(0, e), this._isUTC = !1, e && this.add(this._dateTzOffset(), "m")), this
        },
        format: function(e) {
            var t = A(this, e || gt.defaultFormat);
            return this.localeData().postformat(t)
        },
        add: D(1, "add"),
        subtract: D(-1, "subtract"),
        diff: function(e, t, n) {
            var s, a, i, r = L(e, this),
                o = 6e4 * (this.zone() - r.zone());
            return t = v(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + r.daysInMonth()), a = 12 * (this.year() - r.year()) + (this.month() - r.month()), i = this - gt(this).startOf("month") - (r - gt(r).startOf("month")), i -= 6e4 * (this.zone() - gt(this).startOf("month").zone() - (r.zone() - gt(r).startOf("month").zone())), a += i / s, "year" === t && (a /= 12)) : (s = this - r, a = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? (s - o) / 864e5 : "week" === t ? (s - o) / 6048e5 : s), n ? a : _(a)
        },
        from: function(e, t) {
            return gt.duration({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t)
        },
        fromNow: function(e) {
            return this.from(gt(), e)
        },
        calendar: function(e) {
            var t = e || gt(),
                n = L(t, this).startOf("day"),
                s = this.diff(n, "days", !0),
                a = -6 > s ? "sameElse" : -1 > s ? "lastWeek" : 0 > s ? "lastDay" : 1 > s ? "sameDay" : 2 > s ? "nextDay" : 7 > s ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(a, this))
        },
        isLeapYear: function() {
            return G(this.year())
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = at(e, this.localeData()), this.add(e - t, "d")) : t
        },
        month: _t("Month", !0),
        startOf: function(e) {
            switch (e = v(e)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === e ? this.weekday(0) : "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
        },
        endOf: function(e) {
            return e = v(e), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
        },
        isAfter: function(e, t) {
            return t = v("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = gt.isMoment(e) ? e : gt(e), +this > +e) : +this.clone().startOf(t) > +gt(e).startOf(t)
        },
        isBefore: function(e, t) {
            return t = v("undefined" != typeof t ? t : "millisecond"), "millisecond" === t ? (e = gt.isMoment(e) ? e : gt(e), +e > +this) : +this.clone().startOf(t) < +gt(e).startOf(t)
        },
        isSame: function(e, t) {
            return t = v(t || "millisecond"), "millisecond" === t ? (e = gt.isMoment(e) ? e : gt(e), +this === +e) : +this.clone().startOf(t) === +L(e, this).startOf(t)
        },
        min: i("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(e) {
            return e = gt.apply(null, arguments), this > e ? this : e
        }),
        max: i("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(e) {
            return e = gt.apply(null, arguments), e > this ? this : e
        }),
        zone: function(e, t) {
            var n, s = this._offset || 0;
            return null == e ? this._isUTC ? s : this._dateTzOffset() : ("string" == typeof e && (e = E(e)), Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && t && (n = this._dateTzOffset()), this._offset = e, this._isUTC = !0, null != n && this.subtract(n, "m"), s !== e && (!t || this._changeInProgress ? g(this, gt.duration(s - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, gt.updateOffset(this, !0), this._changeInProgress = null)), this)
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
        },
        hasAlignedHourOffset: function(e) {
            return e = e ? gt(e).zone() : 0, (this.zone() - e) % 60 === 0
        },
        daysInMonth: function() {
            return T(this.year(), this.month())
        },
        dayOfYear: function(e) {
            var t = kt((gt(this).startOf("day") - gt(this).startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add(e - t, "d")
        },
        quarter: function(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        },
        weekYear: function(e) {
            var t = ot(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == e ? t : this.add(e - t, "y")
        },
        isoWeekYear: function(e) {
            var t = ot(this, 1, 4).year;
            return null == e ? t : this.add(e - t, "y")
        },
        week: function(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d")
        },
        isoWeek: function(e) {
            var t = ot(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d")
        },
        weekday: function(e) {
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d")
        },
        isoWeekday: function(e) {
            return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
        },
        isoWeeksInYear: function() {
            return O(this.year(), 1, 4)
        },
        weeksInYear: function() {
            var e = this.localeData()._week;
            return O(this.year(), e.dow, e.doy)
        },
        get: function(e) {
            return e = v(e), this[e]()
        },
        set: function(e, t) {
            return e = v(e), "function" == typeof this[e] && this[e](t), this
        },
        locale: function(t) {
            var n;
            return t === e ? this._locale._abbr : (n = gt.localeData(t), null != n && (this._locale = n), this)
        },
        lang: i("moment().lang() is deprecated. Use moment().localeData() instead.", function(t) {
            return t === e ? this.localeData() : this.locale(t)
        }),
        localeData: function() {
            return this._locale
        },
        _dateTzOffset: function() {
            return 15 * Math.round(this._d.getTimezoneOffset() / 15)
        }
    }), gt.fn.millisecond = gt.fn.milliseconds = _t("Milliseconds", !1), gt.fn.second = gt.fn.seconds = _t("Seconds", !1), gt.fn.minute = gt.fn.minutes = _t("Minutes", !1), gt.fn.hour = gt.fn.hours = _t("Hours", !0), gt.fn.date = _t("Date", !0), gt.fn.dates = i("dates accessor is deprecated. Use date instead.", _t("Date", !0)), gt.fn.year = _t("FullYear", !0), gt.fn.years = i("years accessor is deprecated. Use year instead.", _t("FullYear", !0)), gt.fn.days = gt.fn.day, gt.fn.months = gt.fn.month, gt.fn.weeks = gt.fn.week, gt.fn.isoWeeks = gt.fn.isoWeek, gt.fn.quarters = gt.fn.quarter, gt.fn.toJSON = gt.fn.toISOString, h(gt.duration.fn = d.prototype, {
        _bubble: function() {
            var e, t, n, s = this._milliseconds,
                a = this._days,
                i = this._months,
                r = this._data,
                o = 0;
            r.milliseconds = s % 1e3, e = _(s / 1e3), r.seconds = e % 60, t = _(e / 60), r.minutes = t % 60, n = _(t / 60), r.hours = n % 24, a += _(n / 24), o = _(mt(a)), a -= _(yt(o)), i += _(a / 30), a %= 30, o += _(i / 12), i %= 12, r.days = a, r.months = i, r.years = o
        },
        abs: function() {
            return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
        },
        weeks: function() {
            return _(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * S(this._months / 12)
        },
        humanize: function(e) {
            var t = rt(this, !e, this.localeData());
            return e && (t = this.localeData().pastFuture(+this, t)), this.localeData().postformat(t)
        },
        add: function(e, t) {
            var n = gt.duration(e, t);
            return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
        },
        subtract: function(e, t) {
            var n = gt.duration(e, t);
            return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
        },
        get: function(e) {
            return e = v(e), this[e.toLowerCase() + "s"]()
        },
        as: function(e) {
            var t, n;
            if (e = v(e), "month" === e || "year" === e) return t = this._days + this._milliseconds / 864e5, n = this._months + 12 * mt(t), "month" === e ? n : n / 12;
            switch (t = this._days + yt(this._months / 12), e) {
                case "week":
                    return t / 7 + this._milliseconds / 6048e5;
                case "day":
                    return t + this._milliseconds / 864e5;
                case "hour":
                    return 24 * t + this._milliseconds / 36e5;
                case "minute":
                    return 24 * t * 60 + this._milliseconds / 6e4;
                case "second":
                    return 24 * t * 60 * 60 + this._milliseconds / 1e3;
                case "millisecond":
                    return Math.floor(24 * t * 60 * 60 * 1e3) + this._milliseconds;
                default:
                    throw new Error("Unknown unit " + e)
            }
        },
        lang: gt.fn.lang,
        locale: gt.fn.locale,
        toIsoString: i("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
            return this.toISOString()
        }),
        toISOString: function() {
            var e = Math.abs(this.years()),
                t = Math.abs(this.months()),
                n = Math.abs(this.days()),
                s = Math.abs(this.hours()),
                a = Math.abs(this.minutes()),
                i = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (s || a || i ? "T" : "") + (s ? s + "H" : "") + (a ? a + "M" : "") + (i ? i + "S" : "") : "P0D"
        },
        localeData: function() {
            return this._locale
        }
    }), gt.duration.fn.toString = gt.duration.fn.toISOString;
    for (Yt in cn) n(cn, Yt) && pt(Yt.toLowerCase());
    gt.duration.fn.asMilliseconds = function() {
        return this.as("ms")
    }, gt.duration.fn.asSeconds = function() {
        return this.as("s")
    }, gt.duration.fn.asMinutes = function() {
        return this.as("m")
    }, gt.duration.fn.asHours = function() {
        return this.as("h")
    }, gt.duration.fn.asDays = function() {
        return this.as("d")
    }, gt.duration.fn.asWeeks = function() {
        return this.as("weeks")
    }, gt.duration.fn.asMonths = function() {
        return this.as("M")
    }, gt.duration.fn.asYears = function() {
        return this.as("y")
    }, gt.locale("en", {
        ordinal: function(e) {
            var t = e % 10,
                n = 1 === S(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + n
        }
    }), It ? module.exports = gt : "function" == typeof define && define.amd ? (define("moment", function(e, t, n) {
        return n.config && n.config() && n.config().noGlobal === !0 && (vt.moment = Mt), gt
    }), Dt(!0)) : Dt()
}).call(this);
var tripsPerDate = [
    ["11-15", 6142],
    ["11-16", 4355],
    ["11-17", 5880],
    ["11-18", 7266],
    ["11-19", 5430],
    ["11-20", 5665],
    ["11-21", 6224],
    ["11-22", 6230],
    ["11-23", 4800],
    ["11-24", 5147],
    ["11-25", 5526],
    ["11-26", 5120],
    ["11-27", 5090],
    ["11-28", 3725],
    ["11-29", 4142],
    ["11-30", 6051],
    ["12-01", 8826],
    ["12-02", 9821],
    ["12-03", 7374],
    ["12-04", 6757],
    ["12-05", 6440],
    ["12-06", 6640],
    ["12-07", 4816],
    ["12-08", 6194],
    ["12-09", 7668],
    ["12-10", 5625],
    ["12-11", 6163],
    ["12-12", 6514],
    ["12-13", 6326],
    ["12-14", 4205],
    ["12-15", 5967],
    ["12-16", 6685],
    ["12-17", 5547],
    ["12-18", 5946],
    ["12-19", 5846],
    ["12-20", 5807],
    ["12-21", 4342],
    ["12-22", 4385],
    ["12-23", 4069],
    ["12-24", 2985],
    ["12-25", 3397],
    ["12-26", 5296],
    ["12-27", 5856],
    ["12-28", 5624],
    ["12-29", 6653],
    ["12-30", 6880],
    ["12-31", 5174]
];

function pointToLatLon(t) {
    return map.layerPointToLatLng(new L.Point(t.x, t.y))
}

function projectPoint(t, e) {
    var a = map.latLngToLayerPoint(new L.LatLng(e, t));
    this.stream.point(a.x, a.y)
}

function getNYCTime(t) {
    var e = t.replace(" ", "T") + "-05:00";
    return new Date(e)
}

function initMap() {
    map = L.map("map", {
        zoomControl: !1
    }), map.fitBounds([
        [40.869693, -74.170267],
        [40.54646, -73.772013]
    ]);
    var t = "http://{s}.tiles.mapbox.com/v4/zwadia.k5hj7olb",
        e = "pk.eyJ1IjoiendhZGlhIiwiYSI6InlYbnFfUFEifQ.G5od28q6cCQhxrQGKSg1kg";
    L.tileLayer(t + "/{z}/{x}/{y}.png?access_token=" + e, {
        attribution: 'Maps from <a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> | <span>Directions Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> | © OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map), L.control.zoom({
        position: "topright"
    }).addTo(map)
}

function initSVG() {
    transform = d3.geo.transform({
        point: projectPoint
    }), d3path = d3.geo.path().projection(transform)
}

function appendGroup(t) {
    var e = map.getPanes().overlayPane,
        a = d3.select(e).append("svg").attr({
            width: $w.width() + 5e3,
            height: $w.height() + 5e3,
            style: "top:-2500px;left:-2500px"
        });
    a.append("g").attr({
        id: t,
        "class": "leaflet-zoom-hide",
        transform: "translate(2500, 2500)"
    })
}

function initGraph() {
    function t() {
        h.html("")
    }

    function e(t) {
        var e = t[0],
            a = t[1],
            r = moment("2013-" + t[0]).format("MMM Do");
        h.html(r + " - Trips: " + a).style("left", c(e) + "px")
    }
    var a = $(".chart-box"),
        r = a.width() - 60,
        n = a.height() - 40,
        i = tripsPerDate,
        o = {
            "11-16": "Nov 16th",
            "11-28": "Thanks Giving",
            "12-10": "Dec 10th",
            "12-25": "Christmas"
        },
        c = d3.scale.ordinal().domain(i.map(function(t) {
            return t[0]
        })).rangeBands([0, r]),
        s = d3.scale.linear().domain([0, d3.max(i, function(t) {
            return t[1]
        })]).range([n, 0]),
        l = d3.svg.axis().scale(c).orient("bottom").tickValues(_.keys(o)).tickFormat(function(t) {
            return o[t]
        }),
        m = d3.svg.axis().scale(s).orient("left").ticks(6),
        d = d3.select(".chart").attr({
            width: r + 60,
            height: n + 40
        }).append("g");
    d.append("g").attr("class", "x axis").attr("transform", "translate(40," + (n + 20) + ")").call(l), d.append("g").attr("class", "y axis").attr("transform", "translate(40, 20)").call(m);
    var p = c.rangeBand() / 2,
        u = 40 + p;
    d.selectAll(".bar").data(i).enter().append("rect").each(function(t) {
        var e = t[0],
            a = t[1];
        d3.select(this).attr({
            "class": "bar " + e,
            x: u + c(e),
            y: s(a) + 20,
            width: p,
            height: n - s(a)
        })
    }).on("mouseover", e).on("mouseout", t);
    var h = d3.select(".graph-tip")
}

function updateTimer() {
    time.add(1, "minutes"), timeTicks++ % 4 && (timeTicks = 0, $date.text(time.format("dddd, MMM DD")), $time.text(time.format("hh:mm a")));
    var t = time.format(QF);
    t in allFeatures && animatePaths(t)
}

function adjustTimer() {
    timer && clearInterval(timer);
    var t = Math.floor(1e3 / timeFactor) + 1;
    timer = setInterval(updateTimer, t)
}

function updateCounts(t) {
    var e = "#count-" + t.replace(" ", "-");
    counts[t]++, $(e).text(counts[t])
}

function processResponse(t) {
    appendGroup(t.batchStart), _.extend(allFeatures, t.features), timerStarted || (adjustTimer(), timerStarted = !0)
}

function animatePaths(t) {
    function e(t) {
        if (!_.contains(activeTerminals, t.terminal)) return void d3.select(this).remove();
        var e = this.getTotalLength(),
            a = this.getPointAtLength(e),
            r = n.append("circle").attr({
                r: 2,
                cx: a.x,
                cy: a.y
            }).datum(pointToLatLon(a)),
            i = 1e3 * t.duration / (60 * timeFactor);
        d3.select(this).attr("class", t.terminal).transition().duration(i).each("start", function() {
            this.style.opacity = 1
        }).each("end", function(t) {
            updateCounts(t.terminal), r.attr("class", t.terminal).transition().duration(3e3).style("opacity", 0).remove(), d3.select(this).transition().duration(500).style("opacity", 0).remove()
        }).attrTween("stroke-dasharray", function() {
            return d3.interpolateString("0," + e, e + "," + e)
        })
    }

    function a() {
        n.selectAll("path").remove(), n.selectAll("circle").remove()
    }
    var r = allFeatures[t];
    if (0 === r.length) return void getNextChunk();
    $(".bar." + time.format("MM-DD")).css("fill", "#fff");
    var n = d3.select(document.getElementById(r[0].properties.batchStart));
    _.each(r, function(t) {
        t.geometry.coordinates = polyline.decode(t.geometry.coordinates), n.append("path").attr("d", d3path(t)).datum(t.properties).each(e), t.properties.halfKey && getNextChunk()
        console.log("coordinates"+t.geometry.coordinates);
    }), delete allFeatures[t], map.on("viewreset", a)
}

function highlightAirports() {
    var t = map.latLngToLayerPoint(new L.LatLng(40.649, -73.784)),
        e = map.latLngToLayerPoint(new L.LatLng(40.776, -73.876));
    appendGroup("airports");
    var a = d3.select("#airports"),
        r = a.append("g");
    r.append("circle").attr("class", "JFK").attr({
        r: 20,
        cx: t.x,
        cy: t.y
    }), r.append("text").attr({
        dx: t.x + 25,
        dy: t.y - 5
    }).text("JFK");
    var n = a.append("g");
    n.append("circle").attr("class", "LGA").attr({
        r: 10,
        cx: e.x,
        cy: e.y
    }), n.append("text").attr({
        dx: e.x + 15,
        dy: e.y + 5
    }).text("La Guardia"), a.transition().duration(4e3).attr("r", 5).style("opacity", 0).remove()
}

function getTerminals(t) {
    return $(t).map(function() {
        return this.value
    }).get()
}

function getNextChunk() {
    if (TQ.currentStart >= TQ.endDate) return void(timer && clearInterval(timer));
    var t = moment(TQ.currentStart),
        e = t.format(QF),
        a = t.add(6, "hours").format(QF);
    TQ.currentStart = a, prefetchData(), $.when(dataCache[e]).then(processResponse)
}

function getData(t) {
    var e = t.startDate;

    e in dataCache || (dataCache[e] = $.getJSON("https://taxi.imagework.com/trip?", t))
}

function createQuery() {
    TQ.startDate = $("#startDate").val() + " 00:00:00", TQ.endDate = $("#endDate").val() + " 00:00:00", TQ.currentStart = TQ.startDate
}

function prefetchData() {
    for (var t = moment(TQ.currentStart), e = 0; 4 > e; e++) getData({
        startDate: t.format(QF),
        endDate: t.add(6, "hours").format(QF)
    })
}

function backgroundStart() {
    createQuery(), time = moment(getNYCTime(TQ.startDate)).zone("-05:00"), _.each(allTerminals, function(t) {
        counts[t] = 0
    }), $(".tcount").html("0"), checkboxToggled(), prefetchData()
}

function checkboxToggled() {
    activeTerminals = getTerminals(".terminals input:checked"), $(".terminals .checkbox").each(function() {
        var t = $("input", this),
            e = !t.is(":checked");
        $(this).toggleClass("striked", e), $("#map").toggleClass(t.val() + "-hide", e)
    })
}

function initEvents() {
    var t = $(".time-factor span");
    $(".faster").click(function() {
        60 > timeFactor && (timeFactor += 5, timerStarted && adjustTimer(), t.text(timeFactor))
    }), $(".slower").click(function() {
        timeFactor > 10 && (timeFactor -= 5, timerStarted && adjustTimer(), t.text(timeFactor))
    }), $(".terminals .checkbox").hover(function() {
        var t = $("input", this).val();
        $(".airlines > div").hide(), $(".airlines > div.t-" + t).show(), $(".airlines").show()
    }, function() {
        $(".airlines").hide()
    }), $(".terminals .checkbox input").change(checkboxToggled)
}
var map, transform, d3path, $w = $(window),
    time, timer, timerStarted = !1,
    timeFactor = 30,
    timeTicks = 0,
    counts = {},
    allFeatures = {},
    $date = $(".date"),
    $time = $(".time"),
    QF = "YYYY-MM-DD HH:mm:ss",
    activeTerminals = [],
    allTerminals = getTerminals(".terminals input"),
    TQ = {
        startDate: null,
        endDate: null,
        currentStart: null
    },
    dataCache = {};
$(function() {
    initMap(), initSVG(), initEvents(), initGraph(), $(".checkbox input").attr("checked", "checked"), backgroundStart(), $("#begin").click(function() {
        $(".overlay").hide(), highlightAirports(), updateTimer(), getNextChunk()
    })
});