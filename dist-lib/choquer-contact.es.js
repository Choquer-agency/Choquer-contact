import oe, { useState as B, useEffect as We, useRef as vr } from "react";
var ie = { exports: {} }, D = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function yr() {
  if (Pe) return D;
  Pe = 1;
  var i = oe, o = Symbol.for("react.element"), f = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, a = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(m, l, _) {
    var b, E = {}, k = null, I = null;
    _ !== void 0 && (k = "" + _), l.key !== void 0 && (k = "" + l.key), l.ref !== void 0 && (I = l.ref);
    for (b in l) u.call(l, b) && !g.hasOwnProperty(b) && (E[b] = l[b]);
    if (m && m.defaultProps) for (b in l = m.defaultProps, l) E[b] === void 0 && (E[b] = l[b]);
    return { $$typeof: o, type: m, key: k, ref: I, props: E, _owner: a.current };
  }
  return D.Fragment = f, D.jsx = v, D.jsxs = v, D;
}
var M = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function mr() {
  return Ie || (Ie = 1, process.env.NODE_ENV !== "production" && function() {
    var i = oe, o = Symbol.for("react.element"), f = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), m = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), R = Symbol.iterator, T = "@@iterator";
    function J(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = R && e[R] || e[T];
      return typeof t == "function" ? t : null;
    }
    var W = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
          n[s - 1] = arguments[s];
        Ae("error", e, n);
      }
    }
    function Ae(e, t, n) {
      {
        var s = W.ReactDebugCurrentFrame, p = s.getStackAddendum();
        p !== "" && (t += "%s", n = n.concat([p]));
        var h = n.map(function(d) {
          return String(d);
        });
        h.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var Be = !1, Ne = !1, ze = !1, De = !1, Me = !1, se;
    se = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === u || e === g || Me || e === a || e === _ || e === b || De || e === I || Be || Ne || ze || typeof e == "object" && e !== null && (e.$$typeof === k || e.$$typeof === E || e.$$typeof === v || e.$$typeof === m || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === se || e.getModuleId !== void 0));
    }
    function Ye(e, t, n) {
      var s = e.displayName;
      if (s)
        return s;
      var p = t.displayName || t.name || "";
      return p !== "" ? n + "(" + p + ")" : n;
    }
    function le(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case u:
          return "Fragment";
        case f:
          return "Portal";
        case g:
          return "Profiler";
        case a:
          return "StrictMode";
        case _:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            var t = e;
            return le(t) + ".Consumer";
          case v:
            var n = e;
            return le(n._context) + ".Provider";
          case l:
            return Ye(e, e.render, "ForwardRef");
          case E:
            var s = e.displayName || null;
            return s !== null ? s : O(e.type) || "Memo";
          case k: {
            var p = e, h = p._payload, d = p._init;
            try {
              return O(d(h));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, N = 0, ce, ue, de, fe, pe, he, xe;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function Ue() {
      {
        if (N === 0) {
          ce = console.log, ue = console.info, de = console.warn, fe = console.error, pe = console.group, he = console.groupCollapsed, xe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ge,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        N++;
      }
    }
    function Ve() {
      {
        if (N--, N === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: ce
            }),
            info: F({}, e, {
              value: ue
            }),
            warn: F({}, e, {
              value: de
            }),
            error: F({}, e, {
              value: fe
            }),
            group: F({}, e, {
              value: pe
            }),
            groupCollapsed: F({}, e, {
              value: he
            }),
            groupEnd: F({}, e, {
              value: xe
            })
          });
        }
        N < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = W.ReactCurrentDispatcher, K;
    function U(e, t, n) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (p) {
            var s = p.stack.trim().match(/\n( *(at )?)/);
            K = s && s[1] || "";
          }
        return `
` + K + e;
      }
    }
    var X = !1, V;
    {
      var qe = typeof WeakMap == "function" ? WeakMap : Map;
      V = new qe();
    }
    function ve(e, t) {
      if (!e || X)
        return "";
      {
        var n = V.get(e);
        if (n !== void 0)
          return n;
      }
      var s;
      X = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var h;
      h = G.current, G.current = null, Ue();
      try {
        if (t) {
          var d = function() {
            throw Error();
          };
          if (Object.defineProperty(d.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(d, []);
            } catch (C) {
              s = C;
            }
            Reflect.construct(e, [], d);
          } else {
            try {
              d.call();
            } catch (C) {
              s = C;
            }
            e.call(d.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (C) {
            s = C;
          }
          e();
        }
      } catch (C) {
        if (C && s && typeof C.stack == "string") {
          for (var c = C.stack.split(`
`), j = s.stack.split(`
`), x = c.length - 1, y = j.length - 1; x >= 1 && y >= 0 && c[x] !== j[y]; )
            y--;
          for (; x >= 1 && y >= 0; x--, y--)
            if (c[x] !== j[y]) {
              if (x !== 1 || y !== 1)
                do
                  if (x--, y--, y < 0 || c[x] !== j[y]) {
                    var S = `
` + c[x].replace(" at new ", " at ");
                    return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, S), S;
                  }
                while (x >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        X = !1, G.current = h, Ve(), Error.prepareStackTrace = p;
      }
      var A = e ? e.displayName || e.name : "", P = A ? U(A) : "";
      return typeof e == "function" && V.set(e, P), P;
    }
    function He(e, t, n) {
      return ve(e, !1);
    }
    function Je(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function q(e, t, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Je(e));
      if (typeof e == "string")
        return U(e);
      switch (e) {
        case _:
          return U("Suspense");
        case b:
          return U("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return He(e.render);
          case E:
            return q(e.type, t, n);
          case k: {
            var s = e, p = s._payload, h = s._init;
            try {
              return q(h(p), t, n);
            } catch {
            }
          }
        }
      return "";
    }
    var z = Object.prototype.hasOwnProperty, ye = {}, me = W.ReactDebugCurrentFrame;
    function H(e) {
      if (e) {
        var t = e._owner, n = q(e.type, e._source, t ? t.type : null);
        me.setExtraStackFrame(n);
      } else
        me.setExtraStackFrame(null);
    }
    function Ge(e, t, n, s, p) {
      {
        var h = Function.call.bind(z);
        for (var d in e)
          if (h(e, d)) {
            var c = void 0;
            try {
              if (typeof e[d] != "function") {
                var j = Error((s || "React class") + ": " + n + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j.name = "Invariant Violation", j;
              }
              c = e[d](t, d, s, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              c = x;
            }
            c && !(c instanceof Error) && (H(p), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", n, d, typeof c), H(null)), c instanceof Error && !(c.message in ye) && (ye[c.message] = !0, H(p), w("Failed %s type: %s", n, c.message), H(null));
          }
      }
    }
    var Ke = Array.isArray;
    function Z(e) {
      return Ke(e);
    }
    function Xe(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Ze(e) {
      try {
        return be(e), !1;
      } catch {
        return !0;
      }
    }
    function be(e) {
      return "" + e;
    }
    function we(e) {
      if (Ze(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Xe(e)), be(e);
    }
    var je = W.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, Re;
    function er(e) {
      if (z.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function rr(e) {
      if (z.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tr(e, t) {
      typeof e.ref == "string" && je.current;
    }
    function nr(e, t) {
      {
        var n = function() {
          Ce || (Ce = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function ir(e, t) {
      {
        var n = function() {
          Re || (Re = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var or = function(e, t, n, s, p, h, d) {
      var c = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: n,
        props: d,
        // Record the component responsible for creating this element.
        _owner: h
      };
      return c._store = {}, Object.defineProperty(c._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(c, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(c, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
    };
    function ar(e, t, n, s, p) {
      {
        var h, d = {}, c = null, j = null;
        n !== void 0 && (we(n), c = "" + n), rr(t) && (we(t.key), c = "" + t.key), er(t) && (j = t.ref, tr(t, p));
        for (h in t)
          z.call(t, h) && !Qe.hasOwnProperty(h) && (d[h] = t[h]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (h in x)
            d[h] === void 0 && (d[h] = x[h]);
        }
        if (c || j) {
          var y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && nr(d, y), j && ir(d, y);
        }
        return or(e, c, j, p, s, je.current, d);
      }
    }
    var Q = W.ReactCurrentOwner, Ee = W.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var t = e._owner, n = q(e.type, e._source, t ? t.type : null);
        Ee.setExtraStackFrame(n);
      } else
        Ee.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Se() {
      {
        if (Q.current) {
          var e = O(Q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function sr(e) {
      return "";
    }
    var _e = {};
    function lr(e) {
      {
        var t = Se();
        if (!t) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (t = `

Check the top-level render call using <` + n + ">.");
        }
        return t;
      }
    }
    function ke(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = lr(t);
        if (_e[n])
          return;
        _e[n] = !0;
        var s = "";
        e && e._owner && e._owner !== Q.current && (s = " It was passed a child from " + O(e._owner.type) + "."), L(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, s), L(null);
      }
    }
    function Te(e, t) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            re(s) && ke(s, t);
          }
        else if (re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = J(e);
          if (typeof p == "function" && p !== e.entries)
            for (var h = p.call(e), d; !(d = h.next()).done; )
              re(d.value) && ke(d.value, t);
        }
      }
    }
    function cr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var n;
        if (typeof t == "function")
          n = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === E))
          n = t.propTypes;
        else
          return;
        if (n) {
          var s = O(t);
          Ge(n, e.props, "prop", s, e);
        } else if (t.PropTypes !== void 0 && !ee) {
          ee = !0;
          var p = O(t);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var t = Object.keys(e.props), n = 0; n < t.length; n++) {
          var s = t[n];
          if (s !== "children" && s !== "key") {
            L(e), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), L(null);
            break;
          }
        }
        e.ref !== null && (L(e), w("Invalid attribute `ref` supplied to `React.Fragment`."), L(null));
      }
    }
    var Oe = {};
    function Fe(e, t, n, s, p, h) {
      {
        var d = $e(e);
        if (!d) {
          var c = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var j = sr();
          j ? c += j : c += Se();
          var x;
          e === null ? x = "null" : Z(e) ? x = "array" : e !== void 0 && e.$$typeof === o ? (x = "<" + (O(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, c);
        }
        var y = ar(e, t, n, p, h);
        if (y == null)
          return y;
        if (d) {
          var S = t.children;
          if (S !== void 0)
            if (s)
              if (Z(S)) {
                for (var A = 0; A < S.length; A++)
                  Te(S[A], e);
                Object.freeze && Object.freeze(S);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(S, e);
        }
        if (z.call(t, "key")) {
          var P = O(e), C = Object.keys(t).filter(function(gr) {
            return gr !== "key";
          }), te = C.length > 0 ? "{key: someKey, " + C.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Oe[P + te]) {
            var xr = C.length > 0 ? "{" + C.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, te, P, xr, P), Oe[P + te] = !0;
          }
        }
        return e === u ? ur(y) : cr(y), y;
      }
    }
    function dr(e, t, n) {
      return Fe(e, t, n, !0);
    }
    function fr(e, t, n) {
      return Fe(e, t, n, !1);
    }
    var pr = fr, hr = dr;
    M.Fragment = u, M.jsx = pr, M.jsxs = hr;
  }()), M;
}
process.env.NODE_ENV === "production" ? ie.exports = yr() : ie.exports = mr();
var r = ie.exports;
const br = (i = 768) => {
  const [o, f] = B(
    typeof window < "u" ? window.innerWidth < i : !1
  );
  return We(() => {
    if (typeof window > "u") return;
    const u = window.matchMedia(`(max-width: ${i - 1}px)`), a = (g) => f(g.matches);
    return f(u.matches), u.addEventListener("change", a), () => u.removeEventListener("change", a);
  }, [i]), o;
}, ae = [
  { id: 0, number: "01", title: "Who are you?", label: "The Basics" },
  { id: 1, number: "02", title: "What are you looking for?", label: "Your Goals" },
  { id: 2, number: "03", title: "Quick context", label: "Context" },
  { id: 3, number: "04", title: "What you're hoping for", label: "Expectations" },
  { id: 4, number: "05", title: "Anything else?", label: "Final Thoughts" },
  { id: 5, number: "06", title: "Our perspective", label: "Our Perspective" }
], wr = [
  "A new website from scratch",
  "A website redesign / refresh",
  "Better conversion rates",
  "Improved SEO / traffic",
  "Better brand positioning",
  "Ongoing support / maintenance",
  "I'm not sure — I want guidance"
], jr = [
  "We don't have one yet",
  "We have one, but it's outdated",
  "We have one, it's okay",
  "We have one, it's great — just needs updates"
], Cr = [
  "Just me / founder",
  "Small team (2-10)",
  "Growing team (11-50)",
  "Larger org (50+)"
], Rr = [
  "We get very little traffic",
  "Some traffic, but low conversions",
  "Decent traffic + conversions, want more",
  "High traffic, optimization focus"
], Er = [
  "Launch quickly — we have a deadline",
  "A strategic partner, not just a vendor",
  "World-class design and UX",
  "Clear ROI and business impact",
  "Ongoing iteration post-launch",
  "Full ownership of code and assets"
], Sr = "https://choquer-contact-production.up.railway.app", $ = ({ label: i, value: o, onChange: f, required: u = !1, type: a = "text" }) => /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "8px" }, children: /* @__PURE__ */ r.jsx(
  "input",
  {
    type: a,
    value: o,
    onChange: (g) => f(g.target.value),
    placeholder: `${i}${u ? "*" : ""}`,
    style: {
      width: "100%",
      backgroundColor: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      border: "1px solid #E5E7EB",
      outline: "none",
      color: "#1F2937",
      fontSize: "16px",
      boxSizing: "border-box"
    }
  }
) }), ne = ({ label: i, value: o, onChange: f, options: u }) => /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }, children: [
  /* @__PURE__ */ r.jsx("label", { style: { color: "#1F2937", fontWeight: 500, fontSize: "16px" }, children: i }),
  /* @__PURE__ */ r.jsxs(
    "select",
    {
      value: o,
      onChange: (a) => f(a.target.value),
      style: {
        width: "100%",
        backgroundColor: "white",
        padding: "12px 20px",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        outline: "none",
        color: "#1F2937",
        fontSize: "16px",
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ r.jsx("option", { value: "", disabled: !0, children: "Select One" }),
        u.map((a) => /* @__PURE__ */ r.jsx("option", { value: a, children: a }, a))
      ]
    }
  )
] }), Le = ({ label: i, isSelected: o, onToggle: f }) => /* @__PURE__ */ r.jsxs(
  "button",
  {
    onClick: f,
    style: {
      width: "100%",
      textAlign: "left",
      padding: "12px 20px",
      borderRadius: "12px",
      border: o ? "1px solid #F97316" : "1px solid #E5E7EB",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      cursor: "pointer"
    },
    children: [
      /* @__PURE__ */ r.jsx("span", { style: { fontSize: "16px", color: o ? "#1F2937" : "#6B7280", fontWeight: o ? 500 : 400 }, children: i }),
      /* @__PURE__ */ r.jsx("div", { style: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: o ? "#F97316" : "#F3F4F6"
      }, children: o && /* @__PURE__ */ r.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 20 20", fill: "white", children: /* @__PURE__ */ r.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) })
    ]
  }
), Y = ({ onClick: i, disabled: o = !1 }) => /* @__PURE__ */ r.jsxs(
  "button",
  {
    onClick: i,
    disabled: o,
    style: {
      marginTop: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: o ? "#FCD5B5" : "#F97316",
      color: "white",
      padding: "12px 28px",
      borderRadius: "8px",
      border: "none",
      cursor: o ? "not-allowed" : "pointer",
      opacity: o ? 0.5 : 1
    },
    children: [
      /* @__PURE__ */ r.jsx("span", { style: { fontWeight: 500, fontSize: "16px" }, children: "Next" }),
      /* @__PURE__ */ r.jsx("div", { style: { backgroundColor: "black", padding: "6px", borderRadius: "4px" }, children: /* @__PURE__ */ r.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 24 24", stroke: "white", strokeWidth: 2, children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) }) })
    ]
  }
), _r = ({ formData: i, updateData: o, onNext: f }) => {
  const u = i.fullName && i.email && i.companyName && i.companyUrl;
  return /* @__PURE__ */ r.jsxs("div", { className: "animate-fade-in-up", children: [
    /* @__PURE__ */ r.jsx($, { label: "Your Full Name", value: i.fullName, onChange: (a) => o({ fullName: a }), required: !0 }),
    /* @__PURE__ */ r.jsx($, { label: "Email Address", value: i.email, onChange: (a) => o({ email: a }), type: "email", required: !0 }),
    /* @__PURE__ */ r.jsx($, { label: "Company Name", value: i.companyName, onChange: (a) => o({ companyName: a }), required: !0 }),
    /* @__PURE__ */ r.jsx($, { label: "Company URL", value: i.companyUrl, onChange: (a) => o({ companyUrl: a }), required: !0 }),
    /* @__PURE__ */ r.jsx($, { label: "Phone Number", value: i.phone, onChange: (a) => o({ phone: a }) }),
    /* @__PURE__ */ r.jsx("input", { name: "company_fax", value: i._honeypot || "", onChange: (a) => o({ _honeypot: a.target.value }), tabIndex: -1, autoComplete: "off", "aria-hidden": "true", style: { position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 } }),
    /* @__PURE__ */ r.jsx(Y, { onClick: f, disabled: !u })
  ] });
}, kr = ({ formData: i, updateData: o, onNext: f }) => {
  const u = vr(Date.now());
  We(() => {
    u.current = Date.now(), o({ _step2StartTime: u.current });
  }, []);
  const a = (v) => {
    const m = i.lookingFor, l = m.includes(v) ? m.filter((_) => _ !== v) : [...m, v];
    o({ lookingFor: l });
  }, g = () => {
    o({ _step2Duration: Date.now() - u.current }), f();
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "animate-fade-in-up", children: [
    wr.map((v) => /* @__PURE__ */ r.jsx(Le, { label: v, isSelected: i.lookingFor.includes(v), onToggle: () => a(v) }, v)),
    /* @__PURE__ */ r.jsx(Y, { onClick: g, disabled: i.lookingFor.length === 0 })
  ] });
}, Tr = ({ formData: i, updateData: o, onNext: f }) => {
  const u = i.currentWebsite && i.teamSituation && i.trafficReality;
  return /* @__PURE__ */ r.jsxs("div", { className: "animate-fade-in-up", children: [
    /* @__PURE__ */ r.jsx(ne, { label: "Current website:", options: jr, value: i.currentWebsite, onChange: (a) => o({ currentWebsite: a }) }),
    /* @__PURE__ */ r.jsx(ne, { label: "Team situation:", options: Cr, value: i.teamSituation, onChange: (a) => o({ teamSituation: a }) }),
    /* @__PURE__ */ r.jsx(ne, { label: "Traffic reality:", options: Rr, value: i.trafficReality, onChange: (a) => o({ trafficReality: a }) }),
    /* @__PURE__ */ r.jsx(Y, { onClick: f, disabled: !u })
  ] });
}, Or = ({ formData: i, updateData: o, onNext: f }) => {
  const u = (a) => {
    const g = i.hopingFor, v = g.includes(a) ? g.filter((m) => m !== a) : [...g, a];
    o({ hopingFor: v });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "animate-fade-in-up", children: [
    Er.map((a) => /* @__PURE__ */ r.jsx(Le, { label: a, isSelected: i.hopingFor.includes(a), onToggle: () => u(a) }, a)),
    /* @__PURE__ */ r.jsx(Y, { onClick: f, disabled: i.hopingFor.length === 0 })
  ] });
}, Fr = ({ formData: i, updateData: o, onNext: f }) => /* @__PURE__ */ r.jsxs("div", { className: "animate-fade-in-up", style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
  /* @__PURE__ */ r.jsx(
    "textarea",
    {
      style: { width: "100%", backgroundColor: "white", padding: "12px 20px", borderRadius: "12px", border: "1px solid #E5E7EB", outline: "none", color: "#1F2937", fontSize: "16px", minHeight: "140px", resize: "none", boxSizing: "border-box" },
      placeholder: "Anything about your business, goals, or concerns you think would be helpful context?",
      value: i.anythingElse,
      onChange: (u) => o({ anythingElse: u.target.value })
    }
  ),
  /* @__PURE__ */ r.jsx(Y, { onClick: f })
] }), Pr = ({ currentStep: i }) => {
  const [o, f] = B(!1), u = ae[i], v = i > 0 || i === 5;
  return /* @__PURE__ */ r.jsxs("div", { style: {
    backgroundColor: "#1C1C1C",
    color: "white",
    width: "100%",
    padding: "20px",
    borderRadius: "16px",
    boxSizing: "border-box"
  }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ r.jsx("div", { style: { fontSize: "18px", fontWeight: 700, color: "white" }, children: "Choquer." }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }, children: [
      /* @__PURE__ */ r.jsxs("span", { style: { fontSize: "18px", fontWeight: 700, flexShrink: 0, marginRight: "12px" }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { color: "#F97316" }, children: u.number }),
        /* @__PURE__ */ r.jsx("span", { style: { color: "#6B7280", margin: "0 4px" }, children: "/" }),
        /* @__PURE__ */ r.jsx("span", { style: { color: "#6B7280" }, children: "06" })
      ] }),
      /* @__PURE__ */ r.jsx("span", { style: { color: "white", fontSize: "14px", fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.label }),
      v ? /* @__PURE__ */ r.jsx("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#F97316",
        flexShrink: 0,
        marginLeft: "12px"
      }, children: /* @__PURE__ */ r.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 20 20", fill: "white", children: /* @__PURE__ */ r.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }) : /* @__PURE__ */ r.jsx("div", { style: { width: "20px", height: "20px", borderRadius: "50%", border: "1px solid #4B5563", flexShrink: 0, marginLeft: "12px" } })
    ] }),
    /* @__PURE__ */ r.jsxs(
      "button",
      {
        onClick: () => f(!o),
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#9CA3AF",
          fontSize: "14px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0
        },
        children: [
          /* @__PURE__ */ r.jsx("svg", { width: "20", height: "14", viewBox: "0 0 128 90", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ r.jsx("path", { d: "M69.7317 0C69.7317 0 69.8417 0.08 69.8617 0.1L76.8617 0.15L81.1317 0.22L96.4017 0.78C100.902 0.95 108.442 1.56 112.762 2.4C119.092 3.63 124.022 8.48 125.412 14.77C127.022 22.04 127.372 29.52 127.692 36.94L127.742 38.17L127.772 41.57L127.872 41.76V47.85L127.732 51.54L127.692 52.76C127.432 59.84 126.942 67.84 125.412 74.73C123.972 81.23 118.812 86.11 112.252 87.21C110.012 87.59 107.842 87.94 105.552 88.08L92.6017 88.9L69.8417 89.47H58.0217C49.6617 89.47 41.3917 89.37 33.0617 88.79L21.4817 87.99C19.4317 87.85 17.5217 87.52 15.5317 87.18C8.97172 86.06 3.84172 81.14 2.43172 74.64C1.86172 72.02 1.44172 69.44 1.14172 66.74C0.581719 61.63 0.221719 56.59 0.121719 51.45L0.0417187 47.79C0.00171875 45.76 0.00171875 43.74 0.0417187 41.7L0.121719 38.04C0.231719 32.9 0.581719 27.86 1.15172 22.75C1.45172 20.04 1.87172 17.47 2.44172 14.85C3.84172 8.4 8.92172 3.48 15.4417 2.34C17.4317 1.99 19.3517 1.66 21.3917 1.52L32.6817 0.73L46.7317 0.22L50.9917 0.15C53.4017 0.11 55.7917 0.25 58.1417 0L69.7317 0ZM84.3717 44.75L51.1317 25.58V63.94L84.3717 44.76V44.75Z" }) }),
          /* @__PURE__ */ r.jsx("span", { children: "Watch intro video" })
        ]
      }
    ),
    o && /* @__PURE__ */ r.jsx("div", { style: { marginTop: "16px", width: "100%", aspectRatio: "16/9", backgroundColor: "#111", borderRadius: "12px", overflow: "hidden" }, children: /* @__PURE__ */ r.jsxs(
      "video",
      {
        style: { width: "100%", height: "100%", objectFit: "cover" },
        controls: !0,
        autoPlay: !0,
        playsInline: !0,
        children: [
          /* @__PURE__ */ r.jsx("source", { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ) })
  ] });
}, Ir = ({ currentStep: i }) => /* @__PURE__ */ r.jsxs("div", { style: { backgroundColor: "#1C1C1C", color: "white", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "40px", borderRadius: "24px", overflow: "hidden", justifyContent: "space-between", boxSizing: "border-box" }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "32px" }, children: /* @__PURE__ */ r.jsx("div", { style: { fontSize: "24px", fontWeight: 700, color: "white" }, children: "Choquer." }) }),
  /* @__PURE__ */ r.jsx("div", { style: { flexGrow: 1, display: "flex", flexDirection: "column", gap: "16px" }, children: ae.map((o) => {
    const f = i === o.id, u = i > o.id, a = o.id === 5, g = u || a && f;
    return /* @__PURE__ */ r.jsxs(oe.Fragment, { children: [
      o.id === 5 && /* @__PURE__ */ r.jsx("div", { style: { borderTop: "1px solid #374151", margin: "16px 0" } }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { fontSize: "16px", fontWeight: 500, color: a && f ? "#F97316" : f ? "white" : u ? "#D1D5DB" : "#4B5563" }, children: o.label }),
        g ? /* @__PURE__ */ r.jsx("div", { style: { width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#F97316", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ r.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 20 20", fill: "white", children: /* @__PURE__ */ r.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }) : /* @__PURE__ */ r.jsx("div", { style: { width: "20px", height: "20px", borderRadius: "50%", border: `1px solid ${f ? "rgba(249,115,22,0.5)" : "#374151"}` } })
      ] })
    ] }, o.id);
  }) })
] }), Wr = {
  fullName: "",
  email: "",
  companyName: "",
  companyUrl: "",
  phone: "",
  lookingFor: [],
  currentWebsite: "",
  teamSituation: "",
  trafficReality: "",
  hopingFor: [],
  anythingElse: ""
}, Ar = () => {
  const [i, o] = B(0), [f, u] = B(Wr), [a, g] = B(null), [v, m] = B(!1), l = br(768), _ = (R) => u((T) => ({ ...T, ...R })), b = async () => {
    if (i < 4)
      o(i + 1);
    else if (i === 4) {
      m(!0), o(5);
      const R = new Promise((T) => setTimeout(T, 2e3));
      try {
        const [T] = await Promise.all([
          fetch(`${Sr}/api/generate-summary`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }).then((J) => J.json()),
          R
        ]);
        g(T);
      } catch (T) {
        console.error("Error generating summary:", T), await R, g({ situationAnalysis: "Most companies in your position are dealing with fragmented digital presence.", mistake: "Teams often get stuck between wanting quick results and needing foundational work.", nextStep: "The next step is clarity around an integrated strategy." });
      } finally {
        m(!1);
      }
    }
  }, E = ae[i], k = i === 5, I = () => {
    const R = { formData: f, updateData: _, onNext: b };
    switch (i) {
      case 0:
        return /* @__PURE__ */ r.jsx(_r, { ...R });
      case 1:
        return /* @__PURE__ */ r.jsx(kr, { ...R });
      case 2:
        return /* @__PURE__ */ r.jsx(Tr, { ...R });
      case 3:
        return /* @__PURE__ */ r.jsx(Or, { ...R });
      case 4:
        return /* @__PURE__ */ r.jsx(Fr, { ...R });
      case 5:
        return /* @__PURE__ */ r.jsx("div", { className: "animate-fade-in-up", style: { height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }, children: v ? /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: "64px", height: "64px", border: "4px solid #F97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "24px" } }),
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: l ? "20px" : "24px", fontWeight: 500, color: "#1F2937", marginBottom: "8px" }, children: "Analyzing your plan..." }),
          /* @__PURE__ */ r.jsx("p", { style: { color: "#6B7280" }, children: "This will only take a moment" }),
          /* @__PURE__ */ r.jsx("style", { children: "@keyframes spin { to { transform: rotate(360deg); } }" })
        ] }) : a ? /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: l ? "16px" : "24px" }, children: [
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: l ? "20px" : "32px", fontWeight: 500, color: "#1F2937", lineHeight: 1.3 }, children: "Based on what you shared..." }),
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: l ? "20px" : "32px", fontWeight: 500, color: "#1F2937", lineHeight: 1.3 }, children: a.situationAnalysis }),
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: l ? "20px" : "32px", fontWeight: 500, color: "#1F2937", lineHeight: 1.3 }, children: a.mistake }),
          /* @__PURE__ */ r.jsx("p", { style: { fontSize: l ? "20px" : "32px", fontWeight: 500, color: "#1F2937", lineHeight: 1.3 }, children: a.nextStep }),
          /* @__PURE__ */ r.jsx("div", { style: { paddingTop: "16px" }, children: /* @__PURE__ */ r.jsxs("a", { href: "https://cal.com/brycechoquer/discovery", target: "_blank", rel: "noopener noreferrer", style: { display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "#F97316", color: "white", padding: "12px 24px", borderRadius: "4px", textDecoration: "none" }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { fontWeight: 500 }, children: "Schedule A Call w/ Bryce" }),
            /* @__PURE__ */ r.jsx("div", { style: { backgroundColor: "black", padding: "4px", borderRadius: "4px" }, children: /* @__PURE__ */ r.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", fill: "none", viewBox: "0 0 24 24", stroke: "white", strokeWidth: 2, children: /* @__PURE__ */ r.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) }) })
          ] }) })
        ] }) : null });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { style: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "white",
    display: "flex",
    flexDirection: l ? "column" : "row",
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflow: l ? "auto" : "hidden"
  }, children: [
    l && /* @__PURE__ */ r.jsx("div", { style: { padding: "12px", flexShrink: 0 }, children: /* @__PURE__ */ r.jsx(Pr, { currentStep: i }) }),
    !l && /* @__PURE__ */ r.jsx("div", { style: { width: "30%", padding: "16px", flexShrink: 0, height: "100vh", boxSizing: "border-box" }, children: /* @__PURE__ */ r.jsx(Ir, { currentStep: i }) }),
    /* @__PURE__ */ r.jsx("div", { style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      padding: l ? "0 12px 12px 12px" : "16px 16px 16px 0",
      boxSizing: "border-box",
      minHeight: l ? "auto" : void 0
    }, children: /* @__PURE__ */ r.jsx(
      "div",
      {
        className: "custom-scrollbar",
        style: {
          flex: 1,
          backgroundColor: "#F8F8F8",
          borderRadius: l ? "16px" : "24px",
          padding: l ? "20px" : "48px",
          overflow: "auto"
        },
        children: /* @__PURE__ */ r.jsxs("div", { style: { maxWidth: k ? "896px" : "672px" }, children: [
          !k && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: l ? "20px" : "24px" }, children: [
              /* @__PURE__ */ r.jsx("h1", { style: {
                fontSize: l ? "24px" : "48px",
                fontWeight: 500,
                color: "#1F2937",
                marginBottom: l ? "8px" : "12px",
                lineHeight: 1.1
              }, children: "Let's understand where you are and where you want to go." }),
              /* @__PURE__ */ r.jsx("p", { style: {
                color: "#6B7280",
                fontSize: l ? "14px" : "18px",
                lineHeight: 1.6
              }, children: "This short walkthrough helps us understand your business, your challenges, and what success looks like for you." })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { style: {
              marginBottom: "16px",
              display: "flex",
              alignItems: "baseline",
              gap: l ? "12px" : "16px"
            }, children: [
              /* @__PURE__ */ r.jsx("span", { style: {
                color: "#F97316",
                fontSize: l ? "32px" : "58px",
                fontWeight: 700
              }, children: E.number }),
              /* @__PURE__ */ r.jsx("h2", { style: {
                fontSize: l ? "20px" : "36px",
                fontWeight: 500,
                color: "#1F2937"
              }, children: E.title })
            ] })
          ] }),
          I()
        ] })
      }
    ) })
  ] });
};
export {
  Ar as ChoquerContact
};
