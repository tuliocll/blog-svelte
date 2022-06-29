
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (svelteMetaTags) {
    'use strict';

    function noop$1() { }
    function assign$2(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$2($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }
    class HtmlTag {
        constructor() {
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const isUndefined = value => typeof value === "undefined";

    const isFunction = value => typeof value === "function";

    const isNumber$1 = value => typeof value === "number";

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
    	return (
    		!event.defaultPrevented &&
    		event.button === 0 &&
    		!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    	);
    }

    function createCounter() {
    	let i = 0;
    	/**
    	 * Returns an id and increments the internal state
    	 * @returns {number}
    	 */
    	return () => i++;
    }

    /**
     * Create a globally unique id
     *
     * @returns {string} An id
     */
    function createGlobalId() {
    	return Math.random().toString(36).substring(2);
    }

    const isSSR = typeof window === "undefined";

    function addListener(target, type, handler) {
    	target.addEventListener(type, handler);
    	return () => target.removeEventListener(type, handler);
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    /*
     * Adapted from https://github.com/EmilTholin/svelte-routing
     *
     * https://github.com/EmilTholin/svelte-routing/blob/master/LICENSE
     */

    const createKey = ctxName => `@@svnav-ctx__${ctxName}`;

    // Use strings instead of objects, so different versions of
    // svelte-navigator can potentially still work together
    const LOCATION = createKey("LOCATION");
    const ROUTER = createKey("ROUTER");
    const ROUTE = createKey("ROUTE");
    const ROUTE_PARAMS = createKey("ROUTE_PARAMS");
    const FOCUS_ELEM = createKey("FOCUS_ELEM");

    const paramRegex = /^:(.+)/;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    const startsWith = (string, search) =>
    	string.substr(0, search.length) === search;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    const isRootSegment = segment => segment === "";

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    const isDynamic = segment => paramRegex.test(segment);

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    const isSplat = segment => segment[0] === "*";

    /**
     * Strip potention splat and splatname of the end of a path
     * @param {string} str
     * @return {string}
     */
    const stripSplat = str => str.replace(/\*.*$/, "");

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    const stripSlashes = str => str.replace(/(^\/+|\/+$)/g, "");

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri, filterFalsy = false) {
    	const segments = stripSlashes(uri).split("/");
    	return filterFalsy ? segments.filter(Boolean) : segments;
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    const addQuery = (pathname, query) =>
    	pathname + (query ? `?${query}` : "");

    /**
     * Normalizes a basepath
     *
     * @param {string} path
     * @returns {string}
     *
     * @example
     * normalizePath("base/path/") // -> "/base/path"
     */
    const normalizePath = path => `/${stripSlashes(path)}`;

    /**
     * Joins and normalizes multiple path fragments
     *
     * @param {...string} pathFragments
     * @returns {string}
     */
    function join(...pathFragments) {
    	const joinFragment = fragment => segmentize(fragment, true).join("/");
    	const joinedSegments = pathFragments.map(joinFragment).join("/");
    	return normalizePath(joinedSegments);
    }

    // We start from 1 here, so we can check if an origin id has been passed
    // by using `originId || <fallback>`
    const LINK_ID = 1;
    const ROUTE_ID = 2;
    const ROUTER_ID = 3;
    const USE_FOCUS_ID = 4;
    const USE_LOCATION_ID = 5;
    const USE_MATCH_ID = 6;
    const USE_NAVIGATE_ID = 7;
    const USE_PARAMS_ID = 8;
    const USE_RESOLVABLE_ID = 9;
    const USE_RESOLVE_ID = 10;
    const NAVIGATE_ID = 11;

    const labels = {
    	[LINK_ID]: "Link",
    	[ROUTE_ID]: "Route",
    	[ROUTER_ID]: "Router",
    	[USE_FOCUS_ID]: "useFocus",
    	[USE_LOCATION_ID]: "useLocation",
    	[USE_MATCH_ID]: "useMatch",
    	[USE_NAVIGATE_ID]: "useNavigate",
    	[USE_PARAMS_ID]: "useParams",
    	[USE_RESOLVABLE_ID]: "useResolvable",
    	[USE_RESOLVE_ID]: "useResolve",
    	[NAVIGATE_ID]: "navigate",
    };

    const createLabel = labelId => labels[labelId];

    function createIdentifier(labelId, props) {
    	let attr;
    	if (labelId === ROUTE_ID) {
    		attr = props.path ? `path="${props.path}"` : "default";
    	} else if (labelId === LINK_ID) {
    		attr = `to="${props.to}"`;
    	} else if (labelId === ROUTER_ID) {
    		attr = `basepath="${props.basepath || ""}"`;
    	}
    	return `<${createLabel(labelId)} ${attr || ""} />`;
    }

    function createMessage(labelId, message, props, originId) {
    	const origin = props && createIdentifier(originId || labelId, props);
    	const originMsg = origin ? `\n\nOccurred in: ${origin}` : "";
    	const label = createLabel(labelId);
    	const msg = isFunction(message) ? message(label) : message;
    	return `<${label}> ${msg}${originMsg}`;
    }

    const createMessageHandler = handler => (...args) =>
    	handler(createMessage(...args));

    const fail = createMessageHandler(message => {
    	throw new Error(message);
    });

    // eslint-disable-next-line no-console
    const warn = createMessageHandler(console.warn);

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
    	const score = route.default
    		? 0
    		: segmentize(route.fullPath).reduce((acc, segment) => {
    				let nextScore = acc;
    				nextScore += SEGMENT_POINTS;

    				if (isRootSegment(segment)) {
    					nextScore += ROOT_POINTS;
    				} else if (isDynamic(segment)) {
    					nextScore += DYNAMIC_POINTS;
    				} else if (isSplat(segment)) {
    					nextScore -= SEGMENT_POINTS + SPLAT_PENALTY;
    				} else {
    					nextScore += STATIC_POINTS;
    				}

    				return nextScore;
    		  }, 0);

    	return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
    	return (
    		routes
    			.map(rankRoute)
    			// If two routes have the exact same score, we go by index instead
    			.sort((a, b) => {
    				if (a.score < b.score) {
    					return 1;
    				}
    				if (a.score > b.score) {
    					return -1;
    				}
    				return a.index - b.index;
    			})
    	);
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { fullPath, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
    	let bestMatch;
    	let defaultMatch;

    	const [uriPathname] = uri.split("?");
    	const uriSegments = segmentize(uriPathname);
    	const isRootUri = uriSegments[0] === "";
    	const ranked = rankRoutes(routes);

    	for (let i = 0, l = ranked.length; i < l; i++) {
    		const { route } = ranked[i];
    		let missed = false;
    		const params = {};

    		// eslint-disable-next-line no-shadow
    		const createMatch = uri => ({ ...route, params, uri });

    		if (route.default) {
    			defaultMatch = createMatch(uri);
    			continue;
    		}

    		const routeSegments = segmentize(route.fullPath);
    		const max = Math.max(uriSegments.length, routeSegments.length);
    		let index = 0;

    		for (; index < max; index++) {
    			const routeSegment = routeSegments[index];
    			const uriSegment = uriSegments[index];

    			if (!isUndefined(routeSegment) && isSplat(routeSegment)) {
    				// Hit a splat, just grab the rest, and return a match
    				// uri:   /files/documents/work
    				// route: /files/* or /files/*splatname
    				const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

    				params[splatName] = uriSegments
    					.slice(index)
    					.map(decodeURIComponent)
    					.join("/");
    				break;
    			}

    			if (isUndefined(uriSegment)) {
    				// URI is shorter than the route, no match
    				// uri:   /users
    				// route: /users/:userId
    				missed = true;
    				break;
    			}

    			const dynamicMatch = paramRegex.exec(routeSegment);

    			if (dynamicMatch && !isRootUri) {
    				const value = decodeURIComponent(uriSegment);
    				params[dynamicMatch[1]] = value;
    			} else if (routeSegment !== uriSegment) {
    				// Current segments don't match, not dynamic, not splat, so no match
    				// uri:   /users/123/settings
    				// route: /users/:id/profile
    				missed = true;
    				break;
    			}
    		}

    		if (!missed) {
    			bestMatch = createMatch(join(...uriSegments.slice(0, index)));
    			break;
    		}
    	}

    	return bestMatch || defaultMatch || null;
    }

    /**
     * Check if the `route.fullPath` matches the `uri`.
     * @param {Object} route
     * @param {string} uri
     * @return {?object}
     */
    function match$4(route, uri) {
    	return pick([route], uri);
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
    	// /foo/bar, /baz/qux => /foo/bar
    	if (startsWith(to, "/")) {
    		return to;
    	}

    	const [toPathname, toQuery] = to.split("?");
    	const [basePathname] = base.split("?");
    	const toSegments = segmentize(toPathname);
    	const baseSegments = segmentize(basePathname);

    	// ?a=b, /users?b=c => /users?a=b
    	if (toSegments[0] === "") {
    		return addQuery(basePathname, toQuery);
    	}

    	// profile, /users/789 => /users/789/profile
    	if (!startsWith(toSegments[0], ".")) {
    		const pathname = baseSegments.concat(toSegments).join("/");
    		return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
    	}

    	// ./       , /users/123 => /users/123
    	// ../      , /users/123 => /users
    	// ../..    , /users/123 => /
    	// ../../one, /a/b/c/d   => /a/b/one
    	// .././one , /a/b/c/d   => /a/b/c/one
    	const allSegments = baseSegments.concat(toSegments);
    	const segments = [];

    	allSegments.forEach(segment => {
    		if (segment === "..") {
    			segments.pop();
    		} else if (segment !== ".") {
    			segments.push(segment);
    		}
    	});

    	return addQuery(`/${segments.join("/")}`, toQuery);
    }

    /**
     * Normalizes a location for consumption by `Route` children and the `Router`.
     * It removes the apps basepath from the pathname
     * and sets default values for `search` and `hash` properties.
     *
     * @param {Object} location The current global location supplied by the history component
     * @param {string} basepath The applications basepath (i.e. when serving from a subdirectory)
     *
     * @returns The normalized location
     */
    function normalizeLocation(location, basepath) {
    	const { pathname, hash = "", search = "", state } = location;
    	const baseSegments = segmentize(basepath, true);
    	const pathSegments = segmentize(pathname, true);
    	while (baseSegments.length) {
    		if (baseSegments[0] !== pathSegments[0]) {
    			fail(
    				ROUTER_ID,
    				`Invalid state: All locations must begin with the basepath "${basepath}", found "${pathname}"`,
    			);
    		}
    		baseSegments.shift();
    		pathSegments.shift();
    	}
    	return {
    		pathname: join(...pathSegments),
    		hash,
    		search,
    		state,
    	};
    }

    const normalizeUrlFragment = frag => (frag.length === 1 ? "" : frag);

    /**
     * Creates a location object from an url.
     * It is used to create a location from the url prop used in SSR
     *
     * @param {string} url The url string (e.g. "/path/to/somewhere")
     *
     * @returns {{ pathname: string; search: string; hash: string }} The location
     */
    function createLocation(url) {
    	const searchIndex = url.indexOf("?");
    	const hashIndex = url.indexOf("#");
    	const hasSearchIndex = searchIndex !== -1;
    	const hasHashIndex = hashIndex !== -1;
    	const hash = hasHashIndex ? normalizeUrlFragment(url.substr(hashIndex)) : "";
    	const pathnameAndSearch = hasHashIndex ? url.substr(0, hashIndex) : url;
    	const search = hasSearchIndex
    		? normalizeUrlFragment(pathnameAndSearch.substr(searchIndex))
    		: "";
    	const pathname = hasSearchIndex
    		? pathnameAndSearch.substr(0, searchIndex)
    		: pathnameAndSearch;
    	return { pathname, search, hash };
    }

    /**
     * Resolves a link relative to the parent Route and the Routers basepath.
     *
     * @param {string} path The given path, that will be resolved
     * @param {string} routeBase The current Routes base path
     * @param {string} appBase The basepath of the app. Used, when serving from a subdirectory
     * @returns {string} The resolved path
     *
     * @example
     * resolveLink("relative", "/routeBase", "/") // -> "/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/") // -> "/absolute"
     * resolveLink("relative", "/routeBase", "/base") // -> "/base/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/base") // -> "/base/absolute"
     */
    function resolveLink(path, routeBase, appBase) {
    	return join(appBase, resolve(path, routeBase));
    }

    /**
     * Get the uri for a Route, by matching it against the current location.
     *
     * @param {string} routePath The Routes resolved path
     * @param {string} pathname The current locations pathname
     */
    function extractBaseUri(routePath, pathname) {
    	const fullPath = normalizePath(stripSplat(routePath));
    	const baseSegments = segmentize(fullPath, true);
    	const pathSegments = segmentize(pathname, true).slice(0, baseSegments.length);
    	const routeMatch = match$4({ fullPath }, join(...pathSegments));
    	return routeMatch && routeMatch.uri;
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const POP = "POP";
    const PUSH = "PUSH";
    const REPLACE = "REPLACE";

    function getLocation(source) {
    	return {
    		...source.location,
    		pathname: encodeURI(decodeURI(source.location.pathname)),
    		state: source.history.state,
    		_key: (source.history.state && source.history.state._key) || "initial",
    	};
    }

    function createHistory(source) {
    	let listeners = [];
    	let location = getLocation(source);
    	let action = POP;

    	const notifyListeners = (listenerFns = listeners) =>
    		listenerFns.forEach(listener => listener({ location, action }));

    	return {
    		get location() {
    			return location;
    		},
    		listen(listener) {
    			listeners.push(listener);

    			const popstateListener = () => {
    				location = getLocation(source);
    				action = POP;
    				notifyListeners([listener]);
    			};

    			// Call listener when it is registered
    			notifyListeners([listener]);

    			const unlisten = addListener(source, "popstate", popstateListener);
    			return () => {
    				unlisten();
    				listeners = listeners.filter(fn => fn !== listener);
    			};
    		},
    		/**
    		 * Navigate to a new absolute route.
    		 *
    		 * @param {string|number} to The path to navigate to.
    		 *
    		 * If `to` is a number we will navigate to the stack entry index + `to`
    		 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    		 * @param {Object} options
    		 * @param {*} [options.state] The state will be accessible through `location.state`
    		 * @param {boolean} [options.replace=false] Replace the current entry in the history
    		 * stack, instead of pushing on a new one
    		 */
    		navigate(to, options) {
    			const { state = {}, replace = false } = options || {};
    			action = replace ? REPLACE : PUSH;
    			if (isNumber$1(to)) {
    				if (options) {
    					warn(
    						NAVIGATE_ID,
    						"Navigation options (state or replace) are not supported, " +
    							"when passing a number as the first argument to navigate. " +
    							"They are ignored.",
    					);
    				}
    				action = POP;
    				source.history.go(to);
    			} else {
    				const keyedState = { ...state, _key: createGlobalId() };
    				// try...catch iOS Safari limits to 100 pushState calls
    				try {
    					source.history[replace ? "replaceState" : "pushState"](
    						keyedState,
    						"",
    						to,
    					);
    				} catch (e) {
    					source.location[replace ? "replace" : "assign"](to);
    				}
    			}

    			location = getLocation(source);
    			notifyListeners();
    		},
    	};
    }

    function createStackFrame(state, uri) {
    	return { ...createLocation(uri), state };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
    	let index = 0;
    	let stack = [createStackFrame(null, initialPathname)];

    	return {
    		// This is just for testing...
    		get entries() {
    			return stack;
    		},
    		get location() {
    			return stack[index];
    		},
    		addEventListener() {},
    		removeEventListener() {},
    		history: {
    			get state() {
    				return stack[index].state;
    			},
    			pushState(state, title, uri) {
    				index++;
    				// Throw away anything in the stack with an index greater than the current index.
    				// This happens, when we go back using `go(-n)`. The index is now less than `stack.length`.
    				// If we call `go(+n)` the stack entries with an index greater than the current index can
    				// be reused.
    				// However, if we navigate to a path, instead of a number, we want to create a new branch
    				// of navigation.
    				stack = stack.slice(0, index);
    				stack.push(createStackFrame(state, uri));
    			},
    			replaceState(state, title, uri) {
    				stack[index] = createStackFrame(state, uri);
    			},
    			go(to) {
    				const newIndex = index + to;
    				if (newIndex < 0 || newIndex > stack.length - 1) {
    					return;
    				}
    				index = newIndex;
    			},
    		},
    	};
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = !!(
    	!isSSR &&
    	window.document &&
    	window.document.createElement
    );
    // Use memory history in iframes (for example in Svelte REPL)
    const isEmbeddedPage = !isSSR && window.location.origin === "null";
    const globalHistory = createHistory(
    	canUseDOM && !isEmbeddedPage ? window : createMemorySource(),
    );

    // We need to keep the focus candidate in a separate file, so svelte does
    // not update, when we mutate it.
    // Also, we need a single global reference, because taking focus needs to
    // work globally, even if we have multiple top level routers
    // eslint-disable-next-line import/no-mutable-exports
    let focusCandidate = null;

    // eslint-disable-next-line import/no-mutable-exports
    let initialNavigation = true;

    /**
     * Check if RouterA is above RouterB in the document
     * @param {number} routerIdA The first Routers id
     * @param {number} routerIdB The second Routers id
     */
    function isAbove(routerIdA, routerIdB) {
    	const routerMarkers = document.querySelectorAll("[data-svnav-router]");
    	for (let i = 0; i < routerMarkers.length; i++) {
    		const node = routerMarkers[i];
    		const currentId = Number(node.dataset.svnavRouter);
    		if (currentId === routerIdA) return true;
    		if (currentId === routerIdB) return false;
    	}
    	return false;
    }

    /**
     * Check if a Route candidate is the best choice to move focus to,
     * and store the best match.
     * @param {{
         level: number;
         routerId: number;
         route: {
           id: number;
           focusElement: import("svelte/store").Readable<Promise<Element>|null>;
         }
       }} item A Route candidate, that updated and is visible after a navigation
     */
    function pushFocusCandidate(item) {
    	if (
    		// Best candidate if it's the only candidate...
    		!focusCandidate ||
    		// Route is nested deeper, than previous candidate
    		// -> Route change was triggered in the deepest affected
    		// Route, so that's were focus should move to
    		item.level > focusCandidate.level ||
    		// If the level is identical, we want to focus the first Route in the document,
    		// so we pick the first Router lookin from page top to page bottom.
    		(item.level === focusCandidate.level &&
    			isAbove(item.routerId, focusCandidate.routerId))
    	) {
    		focusCandidate = item;
    	}
    }

    /**
     * Reset the focus candidate.
     */
    function clearFocusCandidate() {
    	focusCandidate = null;
    }

    function initialNavigationOccurred() {
    	initialNavigation = false;
    }

    /*
     * `focus` Adapted from https://github.com/oaf-project/oaf-side-effects/blob/master/src/index.ts
     *
     * https://github.com/oaf-project/oaf-side-effects/blob/master/LICENSE
     */
    function focus(elem) {
    	if (!elem) return false;
    	const TABINDEX = "tabindex";
    	try {
    		if (!elem.hasAttribute(TABINDEX)) {
    			elem.setAttribute(TABINDEX, "-1");
    			let unlisten;
    			// We remove tabindex after blur to avoid weird browser behavior
    			// where a mouse click can activate elements with tabindex="-1".
    			const blurListener = () => {
    				elem.removeAttribute(TABINDEX);
    				unlisten();
    			};
    			unlisten = addListener(elem, "blur", blurListener);
    		}
    		elem.focus();
    		return document.activeElement === elem;
    	} catch (e) {
    		// Apparently trying to focus a disabled element in IE can throw.
    		// See https://stackoverflow.com/a/1600194/2476884
    		return false;
    	}
    }

    function isEndMarker(elem, id) {
    	return Number(elem.dataset.svnavRouteEnd) === id;
    }

    function isHeading(elem) {
    	return /^H[1-6]$/i.test(elem.tagName);
    }

    function query(selector, parent = document) {
    	return parent.querySelector(selector);
    }

    function queryHeading(id) {
    	const marker = query(`[data-svnav-route-start="${id}"]`);
    	let current = marker.nextElementSibling;
    	while (!isEndMarker(current, id)) {
    		if (isHeading(current)) {
    			return current;
    		}
    		const heading = query("h1,h2,h3,h4,h5,h6", current);
    		if (heading) {
    			return heading;
    		}
    		current = current.nextElementSibling;
    	}
    	return null;
    }

    function handleFocus(route) {
    	Promise.resolve(get_store_value(route.focusElement)).then(elem => {
    		const focusElement = elem || queryHeading(route.id);
    		if (!focusElement) {
    			warn(
    				ROUTER_ID,
    				"Could not find an element to focus. " +
    					"You should always render a header for accessibility reasons, " +
    					'or set a custom focus element via the "useFocus" hook. ' +
    					"If you don't want this Route or Router to manage focus, " +
    					'pass "primary={false}" to it.',
    				route,
    				ROUTE_ID,
    			);
    		}
    		const headingFocused = focus(focusElement);
    		if (headingFocused) return;
    		focus(document.documentElement);
    	});
    }

    const createTriggerFocus = (a11yConfig, announcementText, location) => (
    	manageFocus,
    	announceNavigation,
    ) =>
    	// Wait until the dom is updated, so we can look for headings
    	tick().then(() => {
    		if (!focusCandidate || initialNavigation) {
    			initialNavigationOccurred();
    			return;
    		}
    		if (manageFocus) {
    			handleFocus(focusCandidate.route);
    		}
    		if (a11yConfig.announcements && announceNavigation) {
    			const { path, fullPath, meta, params, uri } = focusCandidate.route;
    			const announcementMessage = a11yConfig.createAnnouncement(
    				{ path, fullPath, meta, params, uri },
    				get_store_value(location),
    			);
    			Promise.resolve(announcementMessage).then(message => {
    				announcementText.set(message);
    			});
    		}
    		clearFocusCandidate();
    	});

    const visuallyHiddenStyle =
    	"position:fixed;" +
    	"top:-1px;" +
    	"left:0;" +
    	"width:1px;" +
    	"height:1px;" +
    	"padding:0;" +
    	"overflow:hidden;" +
    	"clip:rect(0,0,0,0);" +
    	"white-space:nowrap;" +
    	"border:0;";

    /* node_modules/svelte-navigator/src/Router.svelte generated by Svelte v3.47.0 */

    const file$x = "node_modules/svelte-navigator/src/Router.svelte";

    // (195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}
    function create_if_block$7(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*$announcementText*/ ctx[0]);
    			attr_dev(div, "role", "status");
    			attr_dev(div, "aria-atomic", "true");
    			attr_dev(div, "aria-live", "polite");
    			attr_dev(div, "style", visuallyHiddenStyle);
    			add_location(div, file$x, 195, 1, 5906);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$announcementText*/ 1) set_data_dev(t, /*$announcementText*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	let if_block = /*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			set_style(div, "display", "none");
    			attr_dev(div, "aria-hidden", "true");
    			attr_dev(div, "data-svnav-router", /*routerId*/ ctx[3]);
    			add_location(div, file$x, 190, 0, 5750);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId$1 = createCounter();
    const defaultBasepath = "/";

    function instance$G($$self, $$props, $$invalidate) {
    	let $location;
    	let $activeRoute;
    	let $prevLocation;
    	let $routes;
    	let $announcementText;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = defaultBasepath } = $$props;
    	let { url = null } = $$props;
    	let { history = globalHistory } = $$props;
    	let { primary = true } = $$props;
    	let { a11y = {} } = $$props;

    	const a11yConfig = {
    		createAnnouncement: route => `Navigated to ${route.uri}`,
    		announcements: true,
    		...a11y
    	};

    	// Remember the initial `basepath`, so we can fire a warning
    	// when the user changes it later
    	const initialBasepath = basepath;

    	const normalizedBasepath = normalizePath(basepath);
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const isTopLevelRouter = !locationContext;
    	const routerId = createId$1();
    	const manageFocus = primary && !(routerContext && !routerContext.manageFocus);
    	const announcementText = writable("");
    	validate_store(announcementText, 'announcementText');
    	component_subscribe($$self, announcementText, value => $$invalidate(0, $announcementText = value));
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(18, $routes = value));
    	const activeRoute = writable(null);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(16, $activeRoute = value));

    	// Used in SSR to synchronously set that a Route is active.
    	let hasActiveRoute = false;

    	// Nesting level of router.
    	// We will need this to identify sibling routers, when moving
    	// focus on navigation, so we can focus the first possible router
    	const level = isTopLevelRouter ? 0 : routerContext.level + 1;

    	// If we're running an SSR we force the location to the `url` prop
    	const getInitialLocation = () => normalizeLocation(isSSR ? createLocation(url) : history.location, normalizedBasepath);

    	const location = isTopLevelRouter
    	? writable(getInitialLocation())
    	: locationContext;

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(15, $location = value));
    	const prevLocation = writable($location);
    	validate_store(prevLocation, 'prevLocation');
    	component_subscribe($$self, prevLocation, value => $$invalidate(17, $prevLocation = value));
    	const triggerFocus = createTriggerFocus(a11yConfig, announcementText, location);
    	const createRouteFilter = routeId => routeList => routeList.filter(routeItem => routeItem.id !== routeId);

    	function registerRoute(route) {
    		if (isSSR) {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match$4(route, $location.pathname);

    			if (matchingRoute) {
    				hasActiveRoute = true;

    				// Return the match in SSR mode, so the matched Route can use it immediatly.
    				// Waiting for activeRoute to update does not work, because it updates
    				// after the Route is initialized
    				return matchingRoute; // eslint-disable-line consistent-return
    			}
    		} else {
    			routes.update(prevRoutes => {
    				// Remove an old version of the updated route,
    				// before pushing the new version
    				const nextRoutes = createRouteFilter(route.id)(prevRoutes);

    				nextRoutes.push(route);
    				return nextRoutes;
    			});
    		}
    	}

    	function unregisterRoute(routeId) {
    		routes.update(createRouteFilter(routeId));
    	}

    	if (!isTopLevelRouter && basepath !== defaultBasepath) {
    		warn(ROUTER_ID, 'Only top-level Routers can have a "basepath" prop. It is ignored.', { basepath });
    	}

    	if (isTopLevelRouter) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = history.listen(changedHistory => {
    				const normalizedLocation = normalizeLocation(changedHistory.location, normalizedBasepath);
    				prevLocation.set($location);
    				location.set(normalizedLocation);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		registerRoute,
    		unregisterRoute,
    		manageFocus,
    		level,
    		id: routerId,
    		history: isTopLevelRouter ? history : routerContext.history,
    		basepath: isTopLevelRouter
    		? normalizedBasepath
    		: routerContext.basepath
    	});

    	const writable_props = ['basepath', 'url', 'history', 'primary', 'a11y'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(10, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(11, url = $$props.url);
    		if ('history' in $$props) $$invalidate(12, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(13, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(14, a11y = $$props.a11y);
    		if ('$$scope' in $$props) $$invalidate(19, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createId: createId$1,
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		normalizePath,
    		pick,
    		match: match$4,
    		normalizeLocation,
    		createLocation,
    		isSSR,
    		warn,
    		ROUTER_ID,
    		pushFocusCandidate,
    		visuallyHiddenStyle,
    		createTriggerFocus,
    		defaultBasepath,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		a11yConfig,
    		initialBasepath,
    		normalizedBasepath,
    		locationContext,
    		routerContext,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		level,
    		getInitialLocation,
    		location,
    		prevLocation,
    		triggerFocus,
    		createRouteFilter,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$announcementText
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(10, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(11, url = $$props.url);
    		if ('history' in $$props) $$invalidate(12, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(13, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(14, a11y = $$props.a11y);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*basepath*/ 1024) {
    			if (basepath !== initialBasepath) {
    				warn(ROUTER_ID, 'You cannot change the "basepath" prop. It is ignored.');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$routes, $location*/ 294912) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$location, $prevLocation*/ 163840) {
    			// Manage focus and announce navigation to screen reader users
    			{
    				if (isTopLevelRouter) {
    					const hasHash = !!$location.hash;

    					// When a hash is present in the url, we skip focus management, because
    					// focusing a different element will prevent in-page jumps (See #3)
    					const shouldManageFocus = !hasHash && manageFocus;

    					// We don't want to make an announcement, when the hash changes,
    					// but the active route stays the same
    					const announceNavigation = !hasHash || $location.pathname !== $prevLocation.pathname;

    					triggerFocus(shouldManageFocus, announceNavigation);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$activeRoute*/ 65536) {
    			// Queue matched Route, so top level Router can decide which Route to focus.
    			// Non primary Routers should just be ignored
    			if (manageFocus && $activeRoute && $activeRoute.primary) {
    				pushFocusCandidate({ level, routerId, route: $activeRoute });
    			}
    		}
    	};

    	return [
    		$announcementText,
    		a11yConfig,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		routes,
    		activeRoute,
    		location,
    		prevLocation,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$G,
    			create_fragment$G,
    			safe_not_equal,
    			{
    				basepath: 10,
    				url: 11,
    				history: 12,
    				primary: 13,
    				a11y: 14
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$G.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get history() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set history(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11y() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11y(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Router$1 = Router;

    /**
     * Check if a component or hook have been created outside of a
     * context providing component
     * @param {number} componentId
     * @param {*} props
     * @param {string?} ctxKey
     * @param {number?} ctxProviderId
     */
    function usePreflightCheck(
    	componentId,
    	props,
    	ctxKey = ROUTER,
    	ctxProviderId = ROUTER_ID,
    ) {
    	const ctx = getContext(ctxKey);
    	if (!ctx) {
    		fail(
    			componentId,
    			label =>
    				`You cannot use ${label} outside of a ${createLabel(ctxProviderId)}.`,
    			props,
    		);
    	}
    }

    const toReadonly = ctx => {
    	const { subscribe } = getContext(ctx);
    	return { subscribe };
    };

    /**
     * Access the current location via a readable store.
     * @returns {import("svelte/store").Readable<{
        pathname: string;
        search: string;
        hash: string;
        state: {};
      }>}
     *
     * @example
      ```html
      <script>
        import { useLocation } from "svelte-navigator";

        const location = useLocation();

        $: console.log($location);
        // {
        //   pathname: "/blog",
        //   search: "?id=123",
        //   hash: "#comments",
        //   state: {}
        // }
      </script>
      ```
     */
    function useLocation() {
    	usePreflightCheck(USE_LOCATION_ID);
    	return toReadonly(LOCATION);
    }

    /**
     * @typedef {{
        path: string;
        fullPath: string;
        uri: string;
        params: {};
      }} RouteMatch
     */

    /**
     * @typedef {import("svelte/store").Readable<RouteMatch|null>} RouteMatchStore
     */

    /**
     * Access the history of top level Router.
     */
    function useHistory() {
    	const { history } = getContext(ROUTER);
    	return history;
    }

    /**
     * Access the base of the parent Route.
     */
    function useRouteBase() {
    	const route = getContext(ROUTE);
    	return route ? derived(route, _route => _route.base) : writable("/");
    }

    /**
     * Resolve a given link relative to the current `Route` and the `Router`s `basepath`.
     * It is used under the hood in `Link` and `useNavigate`.
     * You can use it to manually resolve links, when using the `link` or `links` actions.
     *
     * @returns {(path: string) => string}
     *
     * @example
      ```html
      <script>
        import { link, useResolve } from "svelte-navigator";

        const resolve = useResolve();
        // `resolvedLink` will be resolved relative to its parent Route
        // and the Routers `basepath`
        const resolvedLink = resolve("relativePath");
      </script>

      <a href={resolvedLink} use:link>Relative link</a>
      ```
     */
    function useResolve() {
    	usePreflightCheck(USE_RESOLVE_ID);
    	const routeBase = useRouteBase();
    	const { basepath: appBase } = getContext(ROUTER);
    	/**
    	 * Resolves the path relative to the current route and basepath.
    	 *
    	 * @param {string} path The path to resolve
    	 * @returns {string} The resolved path
    	 */
    	const resolve = path => resolveLink(path, get_store_value(routeBase), appBase);
    	return resolve;
    }

    /**
     * A hook, that returns a context-aware version of `navigate`.
     * It will automatically resolve the given link relative to the current Route.
     * It will also resolve a link against the `basepath` of the Router.
     *
     * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router>
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /absolutePath
      </button>
      ```
      *
      * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router basepath="/base">
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /base/route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /base/absolutePath
      </button>
      ```
     */
    function useNavigate() {
    	usePreflightCheck(USE_NAVIGATE_ID);
    	const resolve = useResolve();
    	const { navigate } = useHistory();
    	/**
    	 * Navigate to a new route.
    	 * Resolves the link relative to the current route and basepath.
    	 *
    	 * @param {string|number} to The path to navigate to.
    	 *
    	 * If `to` is a number we will navigate to the stack entry index + `to`
    	 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    	 * @param {Object} options
    	 * @param {*} [options.state]
    	 * @param {boolean} [options.replace=false]
    	 */
    	const navigateRelative = (to, options) => {
    		// If to is a number, we navigate to the target stack entry via `history.go`.
    		// Otherwise resolve the link
    		const target = isNumber$1(to) ? to : resolve(to);
    		return navigate(target, options);
    	};
    	return navigateRelative;
    }

    /* node_modules/svelte-navigator/src/Route.svelte generated by Svelte v3.47.0 */
    const file$w = "node_modules/svelte-navigator/src/Route.svelte";

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*$params*/ 16,
    	location: dirty & /*$location*/ 8
    });

    const get_default_slot_context = ctx => ({
    	params: isSSR ? get_store_value(/*params*/ ctx[9]) : /*$params*/ ctx[4],
    	location: /*$location*/ ctx[3],
    	navigate: /*navigate*/ ctx[10]
    });

    // (97:0) {#if isActive}
    function create_if_block$6(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				primary: /*primary*/ ctx[1],
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};
    			if (dirty & /*primary*/ 2) router_changes.primary = /*primary*/ ctx[1];

    			if (dirty & /*$$scope, component, $location, $params, $$restProps*/ 264217) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(97:0) {#if isActive}",
    		ctx
    	});

    	return block;
    }

    // (113:2) {:else}
    function create_else_block$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, $params, $location*/ 262168)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(113:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (105:2) {#if component !== null}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[3] },
    		{ navigate: /*navigate*/ ctx[10] },
    		isSSR ? get_store_value(/*params*/ ctx[9]) : /*$params*/ ctx[4],
    		/*$$restProps*/ ctx[11]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, navigate, isSSR, get, params, $params, $$restProps*/ 3608)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 8 && { location: /*$location*/ ctx[3] },
    					dirty & /*navigate*/ 1024 && { navigate: /*navigate*/ ctx[10] },
    					dirty & /*isSSR, get, params, $params*/ 528 && get_spread_object(isSSR ? get_store_value(/*params*/ ctx[9]) : /*$params*/ ctx[4]),
    					dirty & /*$$restProps*/ 2048 && get_spread_object(/*$$restProps*/ ctx[11])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(105:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    // (98:1) <Router {primary}>
    function create_default_slot$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(98:1) <Router {primary}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let current;
    	let if_block = /*isActive*/ ctx[2] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div1 = element("div");
    			set_style(div0, "display", "none");
    			attr_dev(div0, "aria-hidden", "true");
    			attr_dev(div0, "data-svnav-route-start", /*id*/ ctx[5]);
    			add_location(div0, file$w, 95, 0, 2622);
    			set_style(div1, "display", "none");
    			attr_dev(div1, "aria-hidden", "true");
    			attr_dev(div1, "data-svnav-route-end", /*id*/ ctx[5]);
    			add_location(div1, file$w, 121, 0, 3295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isActive*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isActive*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId = createCounter();

    function instance$F($$self, $$props, $$invalidate) {
    	let isActive;
    	const omit_props_names = ["path","component","meta","primary"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $activeRoute;
    	let $location;
    	let $parentBase;
    	let $params;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	let { meta = {} } = $$props;
    	let { primary = true } = $$props;
    	usePreflightCheck(ROUTE_ID, $$props);
    	const id = createId();
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(15, $activeRoute = value));
    	const parentBase = useRouteBase();
    	validate_store(parentBase, 'parentBase');
    	component_subscribe($$self, parentBase, value => $$invalidate(16, $parentBase = value));
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(3, $location = value));
    	const focusElement = writable(null);

    	// In SSR we cannot wait for $activeRoute to update,
    	// so we use the match returned from `registerRoute` instead
    	let ssrMatch;

    	const route = writable();
    	const params = writable({});
    	validate_store(params, 'params');
    	component_subscribe($$self, params, value => $$invalidate(4, $params = value));
    	setContext(ROUTE, route);
    	setContext(ROUTE_PARAMS, params);
    	setContext(FOCUS_ELEM, focusElement);

    	// We need to call useNavigate after the route is set,
    	// so we can use the routes path for link resolution
    	const navigate = useNavigate();

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway
    	if (!isSSR) {
    		onDestroy(() => unregisterRoute(id));
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(23, $$props = assign$2(assign$2({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('path' in $$new_props) $$invalidate(12, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$new_props) $$invalidate(13, meta = $$new_props.meta);
    		if ('primary' in $$new_props) $$invalidate(1, primary = $$new_props.primary);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createId,
    		getContext,
    		onDestroy,
    		setContext,
    		writable,
    		get: get_store_value,
    		Router: Router$1,
    		ROUTER,
    		ROUTE,
    		ROUTE_PARAMS,
    		FOCUS_ELEM,
    		useLocation,
    		useNavigate,
    		useRouteBase,
    		usePreflightCheck,
    		isSSR,
    		extractBaseUri,
    		join,
    		ROUTE_ID,
    		path,
    		component,
    		meta,
    		primary,
    		id,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		parentBase,
    		location,
    		focusElement,
    		ssrMatch,
    		route,
    		params,
    		navigate,
    		isActive,
    		$activeRoute,
    		$location,
    		$parentBase,
    		$params
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(23, $$props = assign$2(assign$2({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(12, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$props) $$invalidate(13, meta = $$new_props.meta);
    		if ('primary' in $$props) $$invalidate(1, primary = $$new_props.primary);
    		if ('ssrMatch' in $$props) $$invalidate(14, ssrMatch = $$new_props.ssrMatch);
    		if ('isActive' in $$props) $$invalidate(2, isActive = $$new_props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, $parentBase, meta, $location, primary*/ 77834) {
    			{
    				// The route store will be re-computed whenever props, location or parentBase change
    				const isDefault = path === "";

    				const rawBase = join($parentBase, path);

    				const updatedRoute = {
    					id,
    					path,
    					meta,
    					// If no path prop is given, this Route will act as the default Route
    					// that is rendered if no other Route in the Router is a match
    					default: isDefault,
    					fullPath: isDefault ? "" : rawBase,
    					base: isDefault
    					? $parentBase
    					: extractBaseUri(rawBase, $location.pathname),
    					primary,
    					focusElement
    				};

    				route.set(updatedRoute);

    				// If we're in SSR mode and the Route matches,
    				// `registerRoute` will return the match
    				$$invalidate(14, ssrMatch = registerRoute(updatedRoute));
    			}
    		}

    		if ($$self.$$.dirty & /*ssrMatch, $activeRoute*/ 49152) {
    			$$invalidate(2, isActive = !!(ssrMatch || $activeRoute && $activeRoute.id === id));
    		}

    		if ($$self.$$.dirty & /*isActive, ssrMatch, $activeRoute*/ 49156) {
    			if (isActive) {
    				const { params: activeParams } = ssrMatch || $activeRoute;
    				params.set(activeParams);
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		primary,
    		isActive,
    		$location,
    		$params,
    		id,
    		activeRoute,
    		parentBase,
    		location,
    		params,
    		navigate,
    		$$restProps,
    		path,
    		meta,
    		ssrMatch,
    		$activeRoute,
    		$parentBase,
    		slots,
    		$$scope
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {
    			path: 12,
    			component: 0,
    			meta: 13,
    			primary: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$F.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Route$1 = Route;

    /* node_modules/svelte-navigator/src/Link.svelte generated by Svelte v3.47.0 */
    const file$v = "node_modules/svelte-navigator/src/Link.svelte";

    function create_fragment$E(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let a_levels = [{ href: /*href*/ ctx[0] }, /*ariaCurrent*/ ctx[2], /*props*/ ctx[1]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign$2(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$v, 63, 0, 1735);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				dirty & /*ariaCurrent*/ 4 && /*ariaCurrent*/ ctx[2],
    				dirty & /*props*/ 2 && /*props*/ ctx[1]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let href;
    	let isPartiallyCurrent;
    	let isCurrent;
    	let ariaCurrent;
    	let props;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = null } = $$props;
    	usePreflightCheck(LINK_ID, $$props);
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(11, $location = value));
    	const dispatch = createEventDispatcher();
    	const resolve = useResolve();
    	const { navigate } = useHistory();

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = isCurrent || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign$2(assign$2({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(5, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(6, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(7, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(8, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		useLocation,
    		useResolve,
    		useHistory,
    		usePreflightCheck,
    		shouldNavigate,
    		isFunction,
    		startsWith,
    		LINK_ID,
    		to,
    		replace,
    		state,
    		getProps,
    		location,
    		dispatch,
    		resolve,
    		navigate,
    		onClick,
    		href,
    		isCurrent,
    		isPartiallyCurrent,
    		props,
    		ariaCurrent,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign$2(assign$2({}, $$props), $$new_props));
    		if ('to' in $$props) $$invalidate(5, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(6, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(7, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(8, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isCurrent' in $$props) $$invalidate(9, isCurrent = $$new_props.isCurrent);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(10, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $location*/ 2080) {
    			// We need to pass location here to force re-resolution of the link,
    			// when the pathname changes. Otherwise we could end up with stale path params,
    			// when for example an :id changes in the parent Routes path
    			$$invalidate(0, href = resolve(to, $location));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 2049) {
    			$$invalidate(10, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 2049) {
    			$$invalidate(9, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 512) {
    			$$invalidate(2, ariaCurrent = isCurrent ? { "aria-current": "page" } : {});
    		}

    		$$invalidate(1, props = (() => {
    			if (isFunction(getProps)) {
    				const dynamicProps = getProps({
    					location: $location,
    					href,
    					isPartiallyCurrent,
    					isCurrent
    				});

    				return { ...$$restProps, ...dynamicProps };
    			}

    			return $$restProps;
    		})());
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		href,
    		props,
    		ariaCurrent,
    		location,
    		onClick,
    		to,
    		replace,
    		state,
    		getProps,
    		isCurrent,
    		isPartiallyCurrent,
    		$location,
    		$$scope,
    		slots
    	];
    }

    class Link$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { to: 5, replace: 6, state: 7, getProps: 8 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$E.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*to*/ ctx[5] === undefined && !('to' in props)) {
    			console.warn("<Link> was created without expected prop 'to'");
    		}
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Link$2 = Link$1;

    function load (urls, test, callback) {
      let remaining = urls.length;

      function maybeCallback () {
        remaining = --remaining;
        if (remaining < 1) {
          callback();
        }
      }

      if (test()) {
        return callback()
      }

      for (const { type, url, options = { async: true, defer: true }} of urls) {
        const isScript = type === 'script';
        const tag = document.createElement(isScript ? 'script': 'link');
        if (isScript) {
          tag.src = url;
          tag.async = options.async;
          tag.defer = options.defer;
        } else {
          tag.rel = 'stylesheet';
          tag.href = url;
        }
        tag.onload = maybeCallback;
        document.body.appendChild(tag);
      }
    }

    const gaStore = writable([]);

    /* node_modules/@beyonk/svelte-google-analytics/src/GoogleAnalytics.svelte generated by Svelte v3.47.0 */

    function create_fragment$D(ctx) {
    	const block = {
    		c: noop$1,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function test() {
    	return Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer);
    }

    function gtag() {
    	window.dataLayer.push(arguments);
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GoogleAnalytics', slots, []);
    	let { properties } = $$props;
    	let { configurations = {} } = $$props;
    	let { enabled = true } = $$props;

    	onMount(() => {
    		if (!enabled) {
    			return;
    		}

    		init();
    	});

    	function init() {
    		const mainProperty = properties[0];

    		load(
    			[
    				{
    					type: 'script',
    					url: `//www.googletagmanager.com/gtag/js?id=${mainProperty}`
    				}
    			],
    			test,
    			callback
    		);
    	}

    	function callback() {
    		window.dataLayer = window.dataLayer || [];
    		gtag('js', new Date());

    		properties.forEach(p => {
    			gtag('config', p, configurations[p] || {});
    		});

    		return gaStore.subscribe(queue => {
    			let next = queue.length && queue.shift();

    			while (next) {
    				const { type, event, data } = next;
    				gtag(type, event, data);
    				next = queue.shift();
    			}
    		});
    	}

    	const writable_props = ['properties', 'configurations', 'enabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GoogleAnalytics> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('properties' in $$props) $$invalidate(0, properties = $$props.properties);
    		if ('configurations' in $$props) $$invalidate(1, configurations = $$props.configurations);
    		if ('enabled' in $$props) $$invalidate(2, enabled = $$props.enabled);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		loader: load,
    		gaStore,
    		properties,
    		configurations,
    		enabled,
    		init,
    		test,
    		gtag,
    		callback
    	});

    	$$self.$inject_state = $$props => {
    		if ('properties' in $$props) $$invalidate(0, properties = $$props.properties);
    		if ('configurations' in $$props) $$invalidate(1, configurations = $$props.configurations);
    		if ('enabled' in $$props) $$invalidate(2, enabled = $$props.enabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [properties, configurations, enabled, init];
    }

    class GoogleAnalytics extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {
    			properties: 0,
    			configurations: 1,
    			enabled: 2,
    			init: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GoogleAnalytics",
    			options,
    			id: create_fragment$D.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*properties*/ ctx[0] === undefined && !('properties' in props)) {
    			console.warn("<GoogleAnalytics> was created without expected prop 'properties'");
    		}
    	}

    	get properties() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set properties(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get configurations() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set configurations(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enabled() {
    		throw new Error("<GoogleAnalytics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set enabled(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get init() {
    		return this.$$.ctx[3];
    	}

    	set init(value) {
    		throw new Error("<GoogleAnalytics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    class Subscribable {
        constructor() {
            this.listeners = [];
        }
        subscribe(listener) {
            const callback = listener || (() => undefined);
            this.listeners.push(callback);
            this.onSubscribe();
            return () => {
                this.listeners = this.listeners.filter(x => x !== callback);
                this.onUnsubscribe();
            };
        }
        hasListeners() {
            return this.listeners.length > 0;
        }
        onSubscribe() {
            // Do nothing
        }
        onUnsubscribe() {
            // Do nothing
        }
    }

    // UTILS
    const isServer = typeof window === 'undefined';
    function noop() {
        return undefined;
    }
    function functionalUpdate(updater, input) {
        return typeof updater === 'function'
            ? updater(input)
            : updater;
    }
    function isValidTimeout(value) {
        return typeof value === 'number' && value >= 0 && value !== Infinity;
    }
    function ensureQueryKeyArray(value) {
        return (Array.isArray(value)
            ? value
            : [value]);
    }
    function timeUntilStale(updatedAt, staleTime) {
        return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
    }
    function parseQueryArgs(arg1, arg2, arg3) {
        if (!isQueryKey(arg1)) {
            return arg1;
        }
        if (typeof arg2 === 'function') {
            return Object.assign(Object.assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
        }
        return Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
    }
    function parseFilterArgs(arg1, arg2, arg3) {
        return (isQueryKey(arg1)
            ? [Object.assign(Object.assign({}, arg2), { queryKey: arg1 }), arg3]
            : [arg1 || {}, arg2]);
    }
    function mapQueryStatusFilter(active, inactive) {
        if ((active === true && inactive === true) ||
            (active == null && inactive == null)) {
            return 'all';
        }
        else if (active === false && inactive === false) {
            return 'none';
        }
        else {
            // At this point, active|inactive can only be true|false or false|true
            // so, when only one value is provided, the missing one has to be the negated value
            const isActive = active !== null && active !== void 0 ? active : !inactive;
            return isActive ? 'active' : 'inactive';
        }
    }
    function matchQuery(filters, query) {
        const { active, exact, fetching, inactive, predicate, queryKey, stale, } = filters;
        if (isQueryKey(queryKey)) {
            if (exact) {
                if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
                    return false;
                }
            }
            else if (!partialMatchKey(query.queryKey, queryKey)) {
                return false;
            }
        }
        const queryStatusFilter = mapQueryStatusFilter(active, inactive);
        if (queryStatusFilter === 'none') {
            return false;
        }
        else if (queryStatusFilter !== 'all') {
            const isActive = query.isActive();
            if (queryStatusFilter === 'active' && !isActive) {
                return false;
            }
            if (queryStatusFilter === 'inactive' && isActive) {
                return false;
            }
        }
        if (typeof stale === 'boolean' && query.isStale() !== stale) {
            return false;
        }
        if (typeof fetching === 'boolean' && query.isFetching() !== fetching) {
            return false;
        }
        if (predicate && !predicate(query)) {
            return false;
        }
        return true;
    }
    function matchMutation(filters, mutation) {
        const { exact, fetching, predicate, mutationKey } = filters;
        if (isQueryKey(mutationKey)) {
            if (!mutation.options.mutationKey) {
                return false;
            }
            if (exact) {
                if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
                    return false;
                }
            }
            else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
                return false;
            }
        }
        if (typeof fetching === 'boolean' &&
            (mutation.state.status === 'loading') !== fetching) {
            return false;
        }
        if (predicate && !predicate(mutation)) {
            return false;
        }
        return true;
    }
    function hashQueryKeyByOptions(queryKey, options) {
        const hashFn = (options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || hashQueryKey;
        return hashFn(queryKey);
    }
    /**
     * Default query keys hash function.
     */
    function hashQueryKey(queryKey) {
        const asArray = ensureQueryKeyArray(queryKey);
        return stableValueHash(asArray);
    }
    /**
     * Hashes the value into a stable hash.
     */
    function stableValueHash(value) {
        return JSON.stringify(value, (_, val) => isPlainObject(val)
            ? Object.keys(val)
                .sort()
                .reduce((result, key) => {
                result[key] = val[key];
                return result;
            }, {})
            : val);
    }
    /**
     * Checks if key `b` partially matches with key `a`.
     */
    function partialMatchKey(a, b) {
        return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
    }
    /**
     * Checks if `b` partially matches with `a`.
     */
    function partialDeepEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (typeof a !== typeof b) {
            return false;
        }
        if (a && b && typeof a === 'object' && typeof b === 'object') {
            return !Object.keys(b).some(key => !partialDeepEqual(a[key], b[key]));
        }
        return false;
    }
    function replaceEqualDeep(a, b) {
        if (a === b) {
            return a;
        }
        const array = Array.isArray(a) && Array.isArray(b);
        if (array || (isPlainObject(a) && isPlainObject(b))) {
            const aSize = array ? a.length : Object.keys(a).length;
            const bItems = array ? b : Object.keys(b);
            const bSize = bItems.length;
            const copy = array ? [] : {};
            let equalItems = 0;
            for (let i = 0; i < bSize; i++) {
                const key = array ? i : bItems[i];
                copy[key] = replaceEqualDeep(a[key], b[key]);
                if (copy[key] === a[key]) {
                    equalItems++;
                }
            }
            return aSize === bSize && equalItems === aSize ? a : copy;
        }
        return b;
    }
    /**
     * Shallow compare objects. Only works with objects that always have the same properties.
     */
    function shallowEqualObjects(a, b) {
        if ((a && !b) || (b && !a)) {
            return false;
        }
        for (const key in a) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    // Copied from: https://github.com/jonschlinkert/is-plain-object
    function isPlainObject(o) {
        if (!hasObjectPrototype(o)) {
            return false;
        }
        // If has modified constructor
        const ctor = o.constructor;
        if (typeof ctor === 'undefined') {
            return true;
        }
        // If has modified prototype
        const prot = ctor.prototype;
        if (!hasObjectPrototype(prot)) {
            return false;
        }
        // If constructor does not have an Object-specific method
        if (!prot.hasOwnProperty('isPrototypeOf')) {
            return false;
        }
        // Most likely a plain Object
        return true;
    }
    function hasObjectPrototype(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }
    function isQueryKey(value) {
        return typeof value === 'string' || Array.isArray(value);
    }
    function sleep(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    /**
     * Schedules a microtask.
     * This can be useful to schedule state updates after rendering.
     */
    function scheduleMicrotask(callback) {
        Promise.resolve()
            .then(callback)
            .catch(error => setTimeout(() => {
            throw error;
        }));
    }
    function getAbortController() {
        if (typeof AbortController === 'function') {
            return new AbortController();
        }
    }

    class FocusManager extends Subscribable {
        constructor() {
            super();
            this.setup = onFocus => {
                if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
                    const listener = () => onFocus();
                    // Listen to visibillitychange and focus
                    window.addEventListener('visibilitychange', listener, false);
                    window.addEventListener('focus', listener, false);
                    return () => {
                        // Be sure to unsubscribe if a new handler is set
                        window.removeEventListener('visibilitychange', listener);
                        window.removeEventListener('focus', listener);
                    };
                }
            };
        }
        onSubscribe() {
            if (!this.cleanup) {
                this.setEventListener(this.setup);
            }
        }
        onUnsubscribe() {
            var _a;
            if (!this.hasListeners()) {
                (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
                this.cleanup = undefined;
            }
        }
        setEventListener(setup) {
            var _a;
            this.setup = setup;
            (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
            this.cleanup = setup(focused => {
                if (typeof focused === 'boolean') {
                    this.setFocused(focused);
                }
                else {
                    this.onFocus();
                }
            });
        }
        setFocused(focused) {
            this.focused = focused;
            if (focused) {
                this.onFocus();
            }
        }
        onFocus() {
            this.listeners.forEach(listener => {
                listener();
            });
        }
        isFocused() {
            if (typeof this.focused === 'boolean') {
                return this.focused;
            }
            // document global can be unavailable in react native
            if (typeof document === 'undefined') {
                return true;
            }
            return [undefined, 'visible', 'prerender'].includes(document.visibilityState);
        }
    }
    const focusManager = new FocusManager();

    class OnlineManager extends Subscribable {
        constructor() {
            super();
            this.setup = onOnline => {
                if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
                    const listener = () => onOnline();
                    // Listen to online
                    window.addEventListener('online', listener, false);
                    window.addEventListener('offline', listener, false);
                    return () => {
                        // Be sure to unsubscribe if a new handler is set
                        window.removeEventListener('online', listener);
                        window.removeEventListener('offline', listener);
                    };
                }
            };
        }
        onSubscribe() {
            if (!this.cleanup) {
                this.setEventListener(this.setup);
            }
        }
        onUnsubscribe() {
            var _a;
            if (!this.hasListeners()) {
                (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
                this.cleanup = undefined;
            }
        }
        setEventListener(setup) {
            var _a;
            this.setup = setup;
            (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
            this.cleanup = setup((online) => {
                if (typeof online === 'boolean') {
                    this.setOnline(online);
                }
                else {
                    this.onOnline();
                }
            });
        }
        setOnline(online) {
            this.online = online;
            if (online) {
                this.onOnline();
            }
        }
        onOnline() {
            this.listeners.forEach(listener => {
                listener();
            });
        }
        isOnline() {
            if (typeof this.online === 'boolean') {
                return this.online;
            }
            if (typeof navigator === 'undefined' ||
                typeof navigator.onLine === 'undefined') {
                return true;
            }
            return navigator.onLine;
        }
    }
    const onlineManager = new OnlineManager();

    function defaultRetryDelay(failureCount) {
        return Math.min(1000 * 2 ** failureCount, 30000);
    }
    function isCancelable(value) {
        return typeof (value === null || value === void 0 ? void 0 : value.cancel) === 'function';
    }
    class CancelledError {
        constructor(options) {
            this.revert = options === null || options === void 0 ? void 0 : options.revert;
            this.silent = options === null || options === void 0 ? void 0 : options.silent;
        }
    }
    function isCancelledError(value) {
        return value instanceof CancelledError;
    }
    // CLASS
    class Retryer {
        constructor(config) {
            let cancelRetry = false;
            let cancelFn;
            let continueFn;
            let promiseResolve;
            let promiseReject;
            this.abort = config.abort;
            this.cancel = cancelOptions => cancelFn === null || cancelFn === void 0 ? void 0 : cancelFn(cancelOptions);
            this.cancelRetry = () => {
                cancelRetry = true;
            };
            this.continueRetry = () => {
                cancelRetry = false;
            };
            this.continue = () => continueFn === null || continueFn === void 0 ? void 0 : continueFn();
            this.failureCount = 0;
            this.isPaused = false;
            this.isResolved = false;
            this.isTransportCancelable = false;
            this.promise = new Promise((outerResolve, outerReject) => {
                promiseResolve = outerResolve;
                promiseReject = outerReject;
            });
            const resolve = (value) => {
                var _a;
                if (!this.isResolved) {
                    this.isResolved = true;
                    (_a = config.onSuccess) === null || _a === void 0 ? void 0 : _a.call(config, value);
                    continueFn === null || continueFn === void 0 ? void 0 : continueFn();
                    promiseResolve(value);
                }
            };
            const reject = (value) => {
                var _a;
                if (!this.isResolved) {
                    this.isResolved = true;
                    (_a = config.onError) === null || _a === void 0 ? void 0 : _a.call(config, value);
                    continueFn === null || continueFn === void 0 ? void 0 : continueFn();
                    promiseReject(value);
                }
            };
            const pause = () => {
                return new Promise(continueResolve => {
                    var _a;
                    continueFn = continueResolve;
                    this.isPaused = true;
                    (_a = config.onPause) === null || _a === void 0 ? void 0 : _a.call(config);
                }).then(() => {
                    var _a;
                    continueFn = undefined;
                    this.isPaused = false;
                    (_a = config.onContinue) === null || _a === void 0 ? void 0 : _a.call(config);
                });
            };
            // Create loop function
            const run = () => {
                // Do nothing if already resolved
                if (this.isResolved) {
                    return;
                }
                let promiseOrValue;
                // Execute query
                try {
                    promiseOrValue = config.fn();
                }
                catch (error) {
                    promiseOrValue = Promise.reject(error);
                }
                // Create callback to cancel this fetch
                cancelFn = cancelOptions => {
                    var _a;
                    if (!this.isResolved) {
                        reject(new CancelledError(cancelOptions));
                        (_a = this.abort) === null || _a === void 0 ? void 0 : _a.call(this);
                        // Cancel transport if supported
                        if (isCancelable(promiseOrValue)) {
                            try {
                                promiseOrValue.cancel();
                            }
                            catch (_b) { }
                        }
                    }
                };
                // Check if the transport layer support cancellation
                this.isTransportCancelable = isCancelable(promiseOrValue);
                Promise.resolve(promiseOrValue)
                    .then(resolve)
                    .catch(error => {
                    var _a, _b, _c;
                    // Stop if the fetch is already resolved
                    if (this.isResolved) {
                        return;
                    }
                    // Do we need to retry the request?
                    const retry = (_a = config.retry) !== null && _a !== void 0 ? _a : 3;
                    const retryDelay = (_b = config.retryDelay) !== null && _b !== void 0 ? _b : defaultRetryDelay;
                    const delay = typeof retryDelay === 'function'
                        ? retryDelay(this.failureCount, error)
                        : retryDelay;
                    const shouldRetry = retry === true ||
                        (typeof retry === 'number' && this.failureCount < retry) ||
                        (typeof retry === 'function' && retry(this.failureCount, error));
                    if (cancelRetry || !shouldRetry) {
                        // We are done if the query does not need to be retried
                        reject(error);
                        return;
                    }
                    this.failureCount++;
                    // Notify on fail
                    (_c = config.onFail) === null || _c === void 0 ? void 0 : _c.call(config, this.failureCount, error);
                    // Delay
                    sleep(delay)
                        // Pause if the document is not visible or when the device is offline
                        .then(() => {
                        if (!focusManager.isFocused() || !onlineManager.isOnline()) {
                            return pause();
                        }
                    })
                        .then(() => {
                        if (cancelRetry) {
                            reject(error);
                        }
                        else {
                            run();
                        }
                    });
                });
            };
            // Start loop
            run();
        }
    }

    // CLASS
    class NotifyManager {
        constructor() {
            this.queue = [];
            this.transactions = 0;
            this.notifyFn = (callback) => {
                callback();
            };
            this.batchNotifyFn = (callback) => {
                callback();
            };
        }
        batch(callback) {
            let result;
            this.transactions++;
            try {
                result = callback();
            }
            finally {
                this.transactions--;
                if (!this.transactions) {
                    this.flush();
                }
            }
            return result;
        }
        schedule(callback) {
            if (this.transactions) {
                this.queue.push(callback);
            }
            else {
                scheduleMicrotask(() => {
                    this.notifyFn(callback);
                });
            }
        }
        /**
         * All calls to the wrapped function will be batched.
         */
        batchCalls(callback) {
            return ((...args) => {
                this.schedule(() => {
                    callback(...args);
                });
            });
        }
        flush() {
            const queue = this.queue;
            this.queue = [];
            if (queue.length) {
                scheduleMicrotask(() => {
                    this.batchNotifyFn(() => {
                        queue.forEach(callback => {
                            this.notifyFn(callback);
                        });
                    });
                });
            }
        }
        /**
         * Use this method to set a custom notify function.
         * This can be used to for example wrap notifications with `React.act` while running tests.
         */
        setNotifyFunction(fn) {
            this.notifyFn = fn;
        }
        /**
         * Use this method to set a custom function to batch notifications together into a single tick.
         * By default React Query will use the batch function provided by ReactDOM or React Native.
         */
        setBatchNotifyFunction(fn) {
            this.batchNotifyFn = fn;
        }
    }
    // SINGLETON
    const notifyManager = new NotifyManager();

    // TYPES
    // FUNCTIONS
    let logger = console;
    function getLogger() {
        return logger;
    }

    // CLASS
    class Query {
        constructor(config) {
            this.abortSignalConsumed = false;
            this.hadObservers = false;
            this.defaultOptions = config.defaultOptions;
            this.setOptions(config.options);
            this.observers = [];
            this.cache = config.cache;
            this.queryKey = config.queryKey;
            this.queryHash = config.queryHash;
            this.initialState = config.state || this.getDefaultState(this.options);
            this.state = this.initialState;
            this.meta = config.meta;
            this.scheduleGc();
        }
        setOptions(options) {
            var _a;
            this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
            this.meta = options === null || options === void 0 ? void 0 : options.meta;
            // Default to 5 minutes if not cache time is set
            this.cacheTime = Math.max(this.cacheTime || 0, (_a = this.options.cacheTime) !== null && _a !== void 0 ? _a : 5 * 60 * 1000);
        }
        setDefaultOptions(options) {
            this.defaultOptions = options;
        }
        scheduleGc() {
            this.clearGcTimeout();
            if (isValidTimeout(this.cacheTime)) {
                // @ts-ignore
                this.gcTimeout = setTimeout(() => {
                    this.optionalRemove();
                }, this.cacheTime);
            }
        }
        clearGcTimeout() {
            clearTimeout(this.gcTimeout);
            this.gcTimeout = undefined;
        }
        optionalRemove() {
            if (!this.observers.length) {
                if (this.state.isFetching) {
                    if (this.hadObservers) {
                        this.scheduleGc();
                    }
                }
                else {
                    this.cache.remove(this);
                }
            }
        }
        setData(updater, options) {
            var _a, _b;
            const prevData = this.state.data;
            // Get the new data
            let data = functionalUpdate(updater, prevData);
            // Use prev data if an isDataEqual function is defined and returns `true`
            if ((_b = (_a = this.options).isDataEqual) === null || _b === void 0 ? void 0 : _b.call(_a, prevData, data)) {
                data = prevData;
            }
            else if (this.options.structuralSharing !== false) {
                // Structurally share data between prev and new data if needed
                data = replaceEqualDeep(prevData, data);
            }
            // Set data and mark it as cached
            this.dispatch({
                data,
                type: 'success',
                dataUpdatedAt: options === null || options === void 0 ? void 0 : options.updatedAt,
            });
            return data;
        }
        setState(state, setStateOptions) {
            this.dispatch({ type: 'setState', state, setStateOptions });
        }
        cancel(options) {
            var _a;
            const promise = this.promise;
            (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.cancel(options);
            return promise ? promise.then(noop).catch(noop) : Promise.resolve();
        }
        destroy() {
            this.clearGcTimeout();
            this.cancel({ silent: true });
        }
        reset() {
            this.destroy();
            this.setState(this.initialState);
        }
        isActive() {
            return this.observers.some(observer => observer.options.enabled !== false);
        }
        isFetching() {
            return this.state.isFetching;
        }
        isStale() {
            return (this.state.isInvalidated ||
                !this.state.dataUpdatedAt ||
                this.observers.some(observer => observer.getCurrentResult().isStale));
        }
        isStaleByTime(staleTime = 0) {
            return (this.state.isInvalidated ||
                !this.state.dataUpdatedAt ||
                !timeUntilStale(this.state.dataUpdatedAt, staleTime));
        }
        onFocus() {
            var _a;
            const observer = this.observers.find(x => x.shouldFetchOnWindowFocus());
            if (observer) {
                observer.refetch();
            }
            // Continue fetch if currently paused
            (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continue();
        }
        onOnline() {
            var _a;
            const observer = this.observers.find(x => x.shouldFetchOnReconnect());
            if (observer) {
                observer.refetch();
            }
            // Continue fetch if currently paused
            (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continue();
        }
        addObserver(observer) {
            if (this.observers.indexOf(observer) === -1) {
                this.observers.push(observer);
                this.hadObservers = true;
                // Stop the query from being garbage collected
                this.clearGcTimeout();
                this.cache.notify({ type: 'observerAdded', query: this, observer });
            }
        }
        removeObserver(observer) {
            if (this.observers.indexOf(observer) !== -1) {
                this.observers = this.observers.filter(x => x !== observer);
                if (!this.observers.length) {
                    // If the transport layer does not support cancellation
                    // we'll let the query continue so the result can be cached
                    if (this.retryer) {
                        if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
                            this.retryer.cancel({ revert: true });
                        }
                        else {
                            this.retryer.cancelRetry();
                        }
                    }
                    if (this.cacheTime) {
                        this.scheduleGc();
                    }
                    else {
                        this.cache.remove(this);
                    }
                }
                this.cache.notify({ type: 'observerRemoved', query: this, observer });
            }
        }
        getObserversCount() {
            return this.observers.length;
        }
        invalidate() {
            if (!this.state.isInvalidated) {
                this.dispatch({ type: 'invalidate' });
            }
        }
        fetch(options, fetchOptions) {
            var _a, _b, _c, _d, _e, _f;
            if (this.state.isFetching) {
                if (this.state.dataUpdatedAt && (fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.cancelRefetch)) {
                    // Silently cancel current fetch if the user wants to cancel refetches
                    this.cancel({ silent: true });
                }
                else if (this.promise) {
                    // make sure that retries that were potentially cancelled due to unmounts can continue
                    (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continueRetry();
                    // Return current promise if we are already fetching
                    return this.promise;
                }
            }
            // Update config if passed, otherwise the config from the last execution is used
            if (options) {
                this.setOptions(options);
            }
            // Use the options from the first observer with a query function if no function is found.
            // This can happen when the query is hydrated or created with setQueryData.
            if (!this.options.queryFn) {
                const observer = this.observers.find(x => x.options.queryFn);
                if (observer) {
                    this.setOptions(observer.options);
                }
            }
            const queryKey = ensureQueryKeyArray(this.queryKey);
            const abortController = getAbortController();
            // Create query function context
            const queryFnContext = {
                queryKey,
                pageParam: undefined,
                meta: this.meta,
            };
            Object.defineProperty(queryFnContext, 'signal', {
                enumerable: true,
                get: () => {
                    if (abortController) {
                        this.abortSignalConsumed = true;
                        return abortController.signal;
                    }
                    return undefined;
                },
            });
            // Create fetch function
            const fetchFn = () => {
                if (!this.options.queryFn) {
                    return Promise.reject('Missing queryFn');
                }
                this.abortSignalConsumed = false;
                return this.options.queryFn(queryFnContext);
            };
            // Trigger behavior hook
            const context = {
                fetchOptions,
                options: this.options,
                queryKey: queryKey,
                state: this.state,
                fetchFn,
                meta: this.meta,
            };
            if ((_b = this.options.behavior) === null || _b === void 0 ? void 0 : _b.onFetch) {
                (_c = this.options.behavior) === null || _c === void 0 ? void 0 : _c.onFetch(context);
            }
            // Store state in case the current fetch needs to be reverted
            this.revertState = this.state;
            // Set to fetching state if not already in it
            if (!this.state.isFetching ||
                this.state.fetchMeta !== ((_d = context.fetchOptions) === null || _d === void 0 ? void 0 : _d.meta)) {
                this.dispatch({ type: 'fetch', meta: (_e = context.fetchOptions) === null || _e === void 0 ? void 0 : _e.meta });
            }
            // Try to fetch the data
            this.retryer = new Retryer({
                fn: context.fetchFn,
                abort: (_f = abortController === null || abortController === void 0 ? void 0 : abortController.abort) === null || _f === void 0 ? void 0 : _f.bind(abortController),
                onSuccess: data => {
                    var _a, _b;
                    this.setData(data);
                    // Notify cache callback
                    (_b = (_a = this.cache.config).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this);
                    // Remove query after fetching if cache time is 0
                    if (this.cacheTime === 0) {
                        this.optionalRemove();
                    }
                },
                onError: (error) => {
                    var _a, _b;
                    // Optimistically update state if needed
                    if (!(isCancelledError(error) && error.silent)) {
                        this.dispatch({
                            type: 'error',
                            error: error,
                        });
                    }
                    if (!isCancelledError(error)) {
                        // Notify cache callback
                        (_b = (_a = this.cache.config).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, this);
                        // Log error
                        getLogger().error(error);
                    }
                    // Remove query after fetching if cache time is 0
                    if (this.cacheTime === 0) {
                        this.optionalRemove();
                    }
                },
                onFail: () => {
                    this.dispatch({ type: 'failed' });
                },
                onPause: () => {
                    this.dispatch({ type: 'pause' });
                },
                onContinue: () => {
                    this.dispatch({ type: 'continue' });
                },
                retry: context.options.retry,
                retryDelay: context.options.retryDelay,
            });
            this.promise = this.retryer.promise;
            return this.promise;
        }
        dispatch(action) {
            this.state = this.reducer(this.state, action);
            notifyManager.batch(() => {
                this.observers.forEach(observer => {
                    observer.onQueryUpdate(action);
                });
                this.cache.notify({ query: this, type: 'queryUpdated', action });
            });
        }
        getDefaultState(options) {
            const data = typeof options.initialData === 'function'
                ? options.initialData()
                : options.initialData;
            const hasInitialData = typeof options.initialData !== 'undefined';
            const initialDataUpdatedAt = hasInitialData
                ? typeof options.initialDataUpdatedAt === 'function'
                    ? options.initialDataUpdatedAt()
                    : options.initialDataUpdatedAt
                : 0;
            const hasData = typeof data !== 'undefined';
            return {
                data,
                dataUpdateCount: 0,
                dataUpdatedAt: hasData ? initialDataUpdatedAt !== null && initialDataUpdatedAt !== void 0 ? initialDataUpdatedAt : Date.now() : 0,
                error: null,
                errorUpdateCount: 0,
                errorUpdatedAt: 0,
                fetchFailureCount: 0,
                fetchMeta: null,
                isFetching: false,
                isInvalidated: false,
                isPaused: false,
                status: hasData ? 'success' : 'idle',
            };
        }
        reducer(state, action) {
            var _a, _b;
            switch (action.type) {
                case 'failed':
                    return Object.assign(Object.assign({}, state), { fetchFailureCount: state.fetchFailureCount + 1 });
                case 'pause':
                    return Object.assign(Object.assign({}, state), { isPaused: true });
                case 'continue':
                    return Object.assign(Object.assign({}, state), { isPaused: false });
                case 'fetch':
                    return Object.assign(Object.assign(Object.assign({}, state), { fetchFailureCount: 0, fetchMeta: (_a = action.meta) !== null && _a !== void 0 ? _a : null, isFetching: true, isPaused: false }), (!state.dataUpdatedAt && {
                        error: null,
                        status: 'loading',
                    }));
                case 'success':
                    return Object.assign(Object.assign({}, state), { data: action.data, dataUpdateCount: state.dataUpdateCount + 1, dataUpdatedAt: (_b = action.dataUpdatedAt) !== null && _b !== void 0 ? _b : Date.now(), error: null, fetchFailureCount: 0, isFetching: false, isInvalidated: false, isPaused: false, status: 'success' });
                case 'error':
                    const error = action.error;
                    if (isCancelledError(error) && error.revert && this.revertState) {
                        return Object.assign({}, this.revertState);
                    }
                    return Object.assign(Object.assign({}, state), { error: error, errorUpdateCount: state.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: state.fetchFailureCount + 1, isFetching: false, isPaused: false, status: 'error' });
                case 'invalidate':
                    return Object.assign(Object.assign({}, state), { isInvalidated: true });
                case 'setState':
                    return Object.assign(Object.assign({}, state), action.state);
                default:
                    return state;
            }
        }
    }

    class QueryObserver extends Subscribable {
        constructor(client, options) {
            super();
            this.client = client;
            this.options = options;
            this.trackedProps = [];
            this.previousSelectError = null;
            this.bindMethods();
            this.setOptions(options);
        }
        bindMethods() {
            this.remove = this.remove.bind(this);
            this.refetch = this.refetch.bind(this);
        }
        onSubscribe() {
            if (this.listeners.length === 1) {
                this.currentQuery.addObserver(this);
                if (shouldFetchOnMount(this.currentQuery, this.options)) {
                    this.executeFetch();
                }
                this.updateTimers();
            }
        }
        onUnsubscribe() {
            if (!this.listeners.length) {
                this.destroy();
            }
        }
        shouldFetchOnReconnect() {
            return shouldFetchOnReconnect(this.currentQuery, this.options);
        }
        shouldFetchOnWindowFocus() {
            return shouldFetchOnWindowFocus(this.currentQuery, this.options);
        }
        destroy() {
            this.listeners = [];
            this.clearTimers();
            this.currentQuery.removeObserver(this);
        }
        setOptions(options, notifyOptions) {
            const prevOptions = this.options;
            const prevQuery = this.currentQuery;
            this.options = this.client.defaultQueryObserverOptions(options);
            if (typeof this.options.enabled !== 'undefined' &&
                typeof this.options.enabled !== 'boolean') {
                throw new Error('Expected enabled to be a boolean');
            }
            // Keep previous query key if the user does not supply one
            if (!this.options.queryKey) {
                this.options.queryKey = prevOptions.queryKey;
            }
            this.updateQuery();
            const mounted = this.hasListeners();
            // Fetch if there are subscribers
            if (mounted &&
                shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
                this.executeFetch();
            }
            // Update result
            this.updateResult(notifyOptions);
            // Update stale interval if needed
            if (mounted &&
                (this.currentQuery !== prevQuery ||
                    this.options.enabled !== prevOptions.enabled ||
                    this.options.staleTime !== prevOptions.staleTime)) {
                this.updateStaleTimeout();
            }
            const nextRefetchInterval = this.computeRefetchInterval();
            // Update refetch interval if needed
            if (mounted &&
                (this.currentQuery !== prevQuery ||
                    this.options.enabled !== prevOptions.enabled ||
                    nextRefetchInterval !== this.currentRefetchInterval)) {
                this.updateRefetchInterval(nextRefetchInterval);
            }
        }
        updateOptions(options, notifyOptions) {
            const mergedOptions = Object.assign(Object.assign({}, this.options), options);
            if (options.queryKey && !options.queryHash && options.queryKey !== this.options.queryKey) {
                mergedOptions.queryHash = hashQueryKeyByOptions(options.queryKey, mergedOptions);
            }
            this.setOptions(mergedOptions, notifyOptions);
        }
        getOptimisticResult(options) {
            const defaultedOptions = this.client.defaultQueryObserverOptions(options);
            const query = this.client
                .getQueryCache()
                .build(this.client, defaultedOptions);
            return this.createResult(query, defaultedOptions);
        }
        getCurrentResult() {
            return this.currentResult;
        }
        trackResult(result, defaultedOptions) {
            const trackedResult = {};
            const trackProp = (key) => {
                if (!this.trackedProps.includes(key)) {
                    this.trackedProps.push(key);
                }
            };
            Object.keys(result).forEach(key => {
                Object.defineProperty(trackedResult, key, {
                    configurable: false,
                    enumerable: true,
                    get: () => {
                        trackProp(key);
                        return result[key];
                    },
                });
            });
            if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
                trackProp('error');
            }
            return trackedResult;
        }
        getNextResult(options) {
            return new Promise((resolve, reject) => {
                const unsubscribe = this.subscribe(result => {
                    if (!result.isFetching) {
                        unsubscribe();
                        if (result.isError && (options === null || options === void 0 ? void 0 : options.throwOnError)) {
                            reject(result.error);
                        }
                        else {
                            resolve(result);
                        }
                    }
                });
            });
        }
        getCurrentQuery() {
            return this.currentQuery;
        }
        remove() {
            this.client.getQueryCache().remove(this.currentQuery);
        }
        refetch(options) {
            return this.fetch(Object.assign(Object.assign({}, options), { meta: { refetchPage: options === null || options === void 0 ? void 0 : options.refetchPage } }));
        }
        fetchOptimistic(options) {
            const defaultedOptions = this.client.defaultQueryObserverOptions(options);
            const query = this.client
                .getQueryCache()
                .build(this.client, defaultedOptions);
            return query.fetch().then(() => this.createResult(query, defaultedOptions));
        }
        fetch(fetchOptions) {
            return this.executeFetch(fetchOptions).then(() => {
                this.updateResult();
                return this.currentResult;
            });
        }
        executeFetch(fetchOptions) {
            // Make sure we reference the latest query as the current one might have been removed
            this.updateQuery();
            // Fetch
            let promise = this.currentQuery.fetch(this.options, fetchOptions);
            if (!(fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.throwOnError)) {
                promise = promise.catch(noop);
            }
            return promise;
        }
        updateStaleTimeout() {
            this.clearStaleTimeout();
            if (isServer ||
                this.currentResult.isStale ||
                !isValidTimeout(this.options.staleTime)) {
                return;
            }
            const time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
            // The timeout is sometimes triggered 1 ms before the stale time expiration.
            // To mitigate this issue we always add 1 ms to the timeout.
            const timeout = time + 1;
            // @ts-ignore
            this.staleTimeoutId = setTimeout(() => {
                if (!this.currentResult.isStale) {
                    this.updateResult();
                }
            }, timeout);
        }
        computeRefetchInterval() {
            var _a;
            return typeof this.options.refetchInterval === 'function'
                ? this.options.refetchInterval(this.currentResult.data, this.currentQuery)
                : (_a = this.options.refetchInterval) !== null && _a !== void 0 ? _a : false;
        }
        updateRefetchInterval(nextInterval) {
            this.clearRefetchInterval();
            this.currentRefetchInterval = nextInterval;
            if (isServer ||
                this.options.enabled === false ||
                !isValidTimeout(this.currentRefetchInterval) ||
                this.currentRefetchInterval === 0) {
                return;
            }
            // @ts-ignore
            this.refetchIntervalId = setInterval(() => {
                if (this.options.refetchIntervalInBackground ||
                    focusManager.isFocused()) {
                    this.executeFetch();
                }
            }, this.currentRefetchInterval);
        }
        updateTimers() {
            this.updateStaleTimeout();
            this.updateRefetchInterval(this.computeRefetchInterval());
        }
        clearTimers() {
            this.clearStaleTimeout();
            this.clearRefetchInterval();
        }
        clearStaleTimeout() {
            clearTimeout(this.staleTimeoutId);
            this.staleTimeoutId = undefined;
        }
        clearRefetchInterval() {
            clearInterval(this.refetchIntervalId);
            this.refetchIntervalId = undefined;
        }
        createResult(query, options) {
            var _a;
            const prevQuery = this.currentQuery;
            const prevOptions = this.options;
            const prevResult = this.currentResult;
            const prevResultState = this.currentResultState;
            const prevResultOptions = this.currentResultOptions;
            const queryChange = query !== prevQuery;
            const queryInitialState = queryChange
                ? query.state
                : this.currentQueryInitialState;
            const prevQueryResult = queryChange
                ? this.currentResult
                : this.previousQueryResult;
            const { state } = query;
            let { dataUpdatedAt, error, errorUpdatedAt, isFetching, status } = state;
            let isPreviousData = false;
            let isPlaceholderData = false;
            let data;
            // Optimistically set result in fetching state if needed
            // @ts-ignore
            if (options.optimisticResults) {
                const mounted = this.hasListeners();
                const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
                const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
                if (fetchOnMount || fetchOptionally) {
                    isFetching = true;
                    if (!dataUpdatedAt) {
                        status = 'loading';
                    }
                }
            }
            // Keep previous data if needed
            if (options.keepPreviousData &&
                !state.dataUpdateCount && (prevQueryResult === null || prevQueryResult === void 0 ? void 0 : prevQueryResult.isSuccess) &&
                status !== 'error') {
                data = prevQueryResult.data;
                dataUpdatedAt = prevQueryResult.dataUpdatedAt;
                status = prevQueryResult.status;
                isPreviousData = true;
            }
            // Select data if needed
            else if (options.select && typeof state.data !== 'undefined') {
                // Memoize select result
                if (prevResult &&
                    state.data === (prevResultState === null || prevResultState === void 0 ? void 0 : prevResultState.data) &&
                    options.select === ((_a = this.previousSelect) === null || _a === void 0 ? void 0 : _a.fn) &&
                    !this.previousSelectError) {
                    data = this.previousSelect.result;
                }
                else {
                    try {
                        data = options.select(state.data);
                        if (options.structuralSharing !== false) {
                            data = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, data);
                        }
                        this.previousSelect = {
                            fn: options.select,
                            result: data,
                        };
                        this.previousSelectError = null;
                    }
                    catch (selectError) {
                        getLogger().error(selectError);
                        error = selectError;
                        this.previousSelectError = selectError;
                        errorUpdatedAt = Date.now();
                        status = 'error';
                    }
                }
            }
            // Use query data
            else {
                data = state.data;
            }
            // Show placeholder data if needed
            if (typeof options.placeholderData !== 'undefined' &&
                typeof data === 'undefined' &&
                (status === 'loading' || status === 'idle')) {
                let placeholderData;
                // Memoize placeholder data
                if ((prevResult === null || prevResult === void 0 ? void 0 : prevResult.isPlaceholderData) &&
                    options.placeholderData === (prevResultOptions === null || prevResultOptions === void 0 ? void 0 : prevResultOptions.placeholderData)) {
                    placeholderData = prevResult.data;
                }
                else {
                    placeholderData =
                        typeof options.placeholderData === 'function'
                            ? options.placeholderData()
                            : options.placeholderData;
                    if (options.select && typeof placeholderData !== 'undefined') {
                        try {
                            placeholderData = options.select(placeholderData);
                            if (options.structuralSharing !== false) {
                                placeholderData = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, placeholderData);
                            }
                            this.previousSelectError = null;
                        }
                        catch (selectError) {
                            getLogger().error(selectError);
                            error = selectError;
                            this.previousSelectError = selectError;
                            errorUpdatedAt = Date.now();
                            status = 'error';
                        }
                    }
                }
                if (typeof placeholderData !== 'undefined') {
                    status = 'success';
                    data = placeholderData;
                    isPlaceholderData = true;
                }
            }
            const result = {
                status,
                isLoading: status === 'loading',
                isSuccess: status === 'success',
                isError: status === 'error',
                isIdle: status === 'idle',
                data,
                dataUpdatedAt,
                error,
                errorUpdatedAt,
                failureCount: state.fetchFailureCount,
                isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
                isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount ||
                    state.errorUpdateCount > queryInitialState.errorUpdateCount,
                isFetching,
                isRefetching: isFetching && status !== 'loading',
                isLoadingError: status === 'error' && state.dataUpdatedAt === 0,
                isPlaceholderData,
                isPreviousData,
                isRefetchError: status === 'error' && state.dataUpdatedAt !== 0,
                isStale: isStale(query, options),
                refetch: this.refetch,
                remove: this.remove,
            };
            return result;
        }
        shouldNotifyListeners(result, prevResult) {
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps, notifyOnChangePropsExclusions } = this.options;
            if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
                return true;
            }
            if (notifyOnChangeProps === 'tracked' && !this.trackedProps.length) {
                return true;
            }
            const includedProps = notifyOnChangeProps === 'tracked'
                ? this.trackedProps
                : notifyOnChangeProps;
            return Object.keys(result).some(key => {
                const typedKey = key;
                const changed = result[typedKey] !== prevResult[typedKey];
                const isIncluded = includedProps === null || includedProps === void 0 ? void 0 : includedProps.some(x => x === key);
                const isExcluded = notifyOnChangePropsExclusions === null || notifyOnChangePropsExclusions === void 0 ? void 0 : notifyOnChangePropsExclusions.some(x => x === key);
                return changed && !isExcluded && (!includedProps || isIncluded);
            });
        }
        updateResult(notifyOptions) {
            const prevResult = this.currentResult;
            this.currentResult = this.createResult(this.currentQuery, this.options);
            this.currentResultState = this.currentQuery.state;
            this.currentResultOptions = this.options;
            // Only notify if something has changed
            if (shallowEqualObjects(this.currentResult, prevResult)) {
                return;
            }
            // Determine which callbacks to trigger
            const defaultNotifyOptions = { cache: true };
            if ((notifyOptions === null || notifyOptions === void 0 ? void 0 : notifyOptions.listeners) !== false &&
                this.shouldNotifyListeners(this.currentResult, prevResult)) {
                defaultNotifyOptions.listeners = true;
            }
            this.notify(Object.assign(Object.assign({}, defaultNotifyOptions), notifyOptions));
        }
        updateQuery() {
            const query = this.client
                .getQueryCache()
                .build(this.client, this.options);
            if (query === this.currentQuery) {
                return;
            }
            const prevQuery = this.currentQuery;
            this.currentQuery = query;
            this.currentQueryInitialState = query.state;
            this.previousQueryResult = this.currentResult;
            if (this.hasListeners()) {
                prevQuery === null || prevQuery === void 0 ? void 0 : prevQuery.removeObserver(this);
                query.addObserver(this);
            }
        }
        onQueryUpdate(action) {
            const notifyOptions = {};
            if (action.type === 'success') {
                notifyOptions.onSuccess = true;
            }
            else if (action.type === 'error' && !isCancelledError(action.error)) {
                notifyOptions.onError = true;
            }
            this.updateResult(notifyOptions);
            if (this.hasListeners()) {
                this.updateTimers();
            }
        }
        notify(notifyOptions) {
            notifyManager.batch(() => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                // First trigger the configuration callbacks
                if (notifyOptions.onSuccess) {
                    (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentResult.data);
                    (_d = (_c = this.options).onSettled) === null || _d === void 0 ? void 0 : _d.call(_c, this.currentResult.data, null);
                }
                else if (notifyOptions.onError) {
                    (_f = (_e = this.options).onError) === null || _f === void 0 ? void 0 : _f.call(_e, this.currentResult.error);
                    (_h = (_g = this.options).onSettled) === null || _h === void 0 ? void 0 : _h.call(_g, undefined, this.currentResult.error);
                }
                // Then trigger the listeners
                if (notifyOptions.listeners) {
                    this.listeners.forEach(listener => {
                        listener(this.currentResult);
                    });
                }
                // Then the cache listeners
                if (notifyOptions.cache) {
                    this.client
                        .getQueryCache()
                        .notify({ query: this.currentQuery, type: 'observerResultsUpdated' });
                }
            });
        }
    }
    function shouldLoadOnMount(query, options) {
        return (options.enabled !== false &&
            !query.state.dataUpdatedAt &&
            !(query.state.status === 'error' && options.retryOnMount === false));
    }
    function shouldRefetchOnMount(query, options) {
        return (options.enabled !== false &&
            query.state.dataUpdatedAt > 0 &&
            (options.refetchOnMount === 'always' ||
                (options.refetchOnMount !== false && isStale(query, options))));
    }
    function shouldFetchOnMount(query, options) {
        return (shouldLoadOnMount(query, options) || shouldRefetchOnMount(query, options));
    }
    function shouldFetchOnReconnect(query, options) {
        return (options.enabled !== false &&
            (options.refetchOnReconnect === 'always' ||
                (options.refetchOnReconnect !== false && isStale(query, options))));
    }
    function shouldFetchOnWindowFocus(query, options) {
        return (options.enabled !== false &&
            (options.refetchOnWindowFocus === 'always' ||
                (options.refetchOnWindowFocus !== false && isStale(query, options))));
    }
    function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
        return (options.enabled !== false &&
            (query !== prevQuery || prevOptions.enabled === false) &&
            (!options.suspense || query.state.status !== 'error') &&
            isStale(query, options));
    }
    function isStale(query, options) {
        return query.isStaleByTime(options.staleTime);
    }

    // CLASS
    class QueryCache extends Subscribable {
        constructor(config) {
            super();
            this.config = config || {};
            this.queries = [];
            this.queriesMap = {};
        }
        build(client, options, state) {
            var _a;
            const queryKey = options.queryKey;
            const queryHash = (_a = options.queryHash) !== null && _a !== void 0 ? _a : hashQueryKeyByOptions(queryKey, options);
            let query = this.get(queryHash);
            if (!query) {
                query = new Query({
                    cache: this,
                    queryKey,
                    queryHash,
                    options: client.defaultQueryOptions(options),
                    state,
                    defaultOptions: client.getQueryDefaults(queryKey),
                    meta: options.meta,
                });
                this.add(query);
            }
            return query;
        }
        add(query) {
            if (!this.queriesMap[query.queryHash]) {
                this.queriesMap[query.queryHash] = query;
                this.queries.push(query);
                this.notify({
                    type: 'queryAdded',
                    query,
                });
            }
        }
        remove(query) {
            const queryInMap = this.queriesMap[query.queryHash];
            if (queryInMap) {
                query.destroy();
                this.queries = this.queries.filter(x => x !== query);
                if (queryInMap === query) {
                    delete this.queriesMap[query.queryHash];
                }
                this.notify({ type: 'queryRemoved', query });
            }
        }
        clear() {
            notifyManager.batch(() => {
                this.queries.forEach(query => {
                    this.remove(query);
                });
            });
        }
        get(queryHash) {
            return this.queriesMap[queryHash];
        }
        getAll() {
            return this.queries;
        }
        find(arg1, arg2) {
            const [filters] = parseFilterArgs(arg1, arg2);
            if (typeof filters.exact === 'undefined') {
                filters.exact = true;
            }
            return this.queries.find(query => matchQuery(filters, query));
        }
        findAll(arg1, arg2) {
            const [filters] = parseFilterArgs(arg1, arg2);
            return Object.keys(filters).length > 0
                ? this.queries.filter(query => matchQuery(filters, query))
                : this.queries;
        }
        notify(event) {
            notifyManager.batch(() => {
                this.listeners.forEach(listener => {
                    listener(event);
                });
            });
        }
        onFocus() {
            notifyManager.batch(() => {
                this.queries.forEach(query => {
                    query.onFocus();
                });
            });
        }
        onOnline() {
            notifyManager.batch(() => {
                this.queries.forEach(query => {
                    query.onOnline();
                });
            });
        }
    }

    // CLASS
    class Mutation {
        constructor(config) {
            this.options = Object.assign(Object.assign({}, config.defaultOptions), config.options);
            this.mutationId = config.mutationId;
            this.mutationCache = config.mutationCache;
            this.observers = [];
            this.state = config.state || getDefaultState();
            this.meta = config.meta;
        }
        setState(state) {
            this.dispatch({ type: 'setState', state });
        }
        addObserver(observer) {
            if (this.observers.indexOf(observer) === -1) {
                this.observers.push(observer);
            }
        }
        removeObserver(observer) {
            this.observers = this.observers.filter(x => x !== observer);
        }
        cancel() {
            if (this.retryer) {
                this.retryer.cancel();
                return this.retryer.promise.then(noop).catch(noop);
            }
            return Promise.resolve();
        }
        continue() {
            if (this.retryer) {
                this.retryer.continue();
                return this.retryer.promise;
            }
            return this.execute();
        }
        execute() {
            let data;
            const restored = this.state.status === 'loading';
            let promise = Promise.resolve();
            if (!restored) {
                this.dispatch({ type: 'loading', variables: this.options.variables });
                promise = promise
                    .then(() => {
                    var _a, _b;
                    // Notify cache callback
                    (_b = (_a = this.mutationCache.config).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables, this);
                })
                    .then(() => { var _a, _b; return (_b = (_a = this.options).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables); })
                    .then(context => {
                    if (context !== this.state.context) {
                        this.dispatch({
                            type: 'loading',
                            context,
                            variables: this.state.variables,
                        });
                    }
                });
            }
            return promise
                .then(() => this.executeMutation())
                .then(result => {
                var _a, _b;
                data = result;
                // Notify cache callback
                (_b = (_a = this.mutationCache.config).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context, this);
            })
                .then(() => { var _a, _b; return (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context); })
                .then(() => { var _a, _b; return (_b = (_a = this.options).onSettled) === null || _b === void 0 ? void 0 : _b.call(_a, data, null, this.state.variables, this.state.context); })
                .then(() => {
                this.dispatch({ type: 'success', data });
                return data;
            })
                .catch(error => {
                var _a, _b;
                // Notify cache callback
                (_b = (_a = this.mutationCache.config).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, this.state.variables, this.state.context, this);
                // Log error
                getLogger().error(error);
                return Promise.resolve()
                    .then(() => { var _a, _b; return (_b = (_a = this.options).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, this.state.variables, this.state.context); })
                    .then(() => { var _a, _b; return (_b = (_a = this.options).onSettled) === null || _b === void 0 ? void 0 : _b.call(_a, undefined, error, this.state.variables, this.state.context); })
                    .then(() => {
                    this.dispatch({ type: 'error', error });
                    throw error;
                });
            });
        }
        executeMutation() {
            var _a;
            this.retryer = new Retryer({
                fn: () => {
                    if (!this.options.mutationFn) {
                        return Promise.reject('No mutationFn found');
                    }
                    return this.options.mutationFn(this.state.variables);
                },
                onFail: () => {
                    this.dispatch({ type: 'failed' });
                },
                onPause: () => {
                    this.dispatch({ type: 'pause' });
                },
                onContinue: () => {
                    this.dispatch({ type: 'continue' });
                },
                retry: (_a = this.options.retry) !== null && _a !== void 0 ? _a : 0,
                retryDelay: this.options.retryDelay,
            });
            return this.retryer.promise;
        }
        dispatch(action) {
            this.state = reducer(this.state, action);
            notifyManager.batch(() => {
                this.observers.forEach(observer => {
                    observer.onMutationUpdate(action);
                });
                this.mutationCache.notify(this);
            });
        }
    }
    function getDefaultState() {
        return {
            context: undefined,
            data: undefined,
            error: null,
            failureCount: 0,
            isPaused: false,
            status: 'idle',
            variables: undefined,
        };
    }
    function reducer(state, action) {
        switch (action.type) {
            case 'failed':
                return Object.assign(Object.assign({}, state), { failureCount: state.failureCount + 1 });
            case 'pause':
                return Object.assign(Object.assign({}, state), { isPaused: true });
            case 'continue':
                return Object.assign(Object.assign({}, state), { isPaused: false });
            case 'loading':
                return Object.assign(Object.assign({}, state), { context: action.context, data: undefined, error: null, isPaused: false, status: 'loading', variables: action.variables });
            case 'success':
                return Object.assign(Object.assign({}, state), { data: action.data, error: null, status: 'success', isPaused: false });
            case 'error':
                return Object.assign(Object.assign({}, state), { data: undefined, error: action.error, failureCount: state.failureCount + 1, isPaused: false, status: 'error' });
            case 'setState':
                return Object.assign(Object.assign({}, state), action.state);
            default:
                return state;
        }
    }

    // CLASS
    class MutationCache extends Subscribable {
        constructor(config) {
            super();
            this.config = config || {};
            this.mutations = [];
            this.mutationId = 0;
        }
        build(client, options, state) {
            const mutation = new Mutation({
                mutationCache: this,
                mutationId: ++this.mutationId,
                options: client.defaultMutationOptions(options),
                state,
                defaultOptions: options.mutationKey
                    ? client.getMutationDefaults(options.mutationKey)
                    : undefined,
                meta: options.meta,
            });
            this.add(mutation);
            return mutation;
        }
        add(mutation) {
            this.mutations.push(mutation);
            this.notify(mutation);
        }
        remove(mutation) {
            this.mutations = this.mutations.filter(x => x !== mutation);
            mutation.cancel();
            this.notify(mutation);
        }
        clear() {
            notifyManager.batch(() => {
                this.mutations.forEach(mutation => {
                    this.remove(mutation);
                });
            });
        }
        getAll() {
            return this.mutations;
        }
        find(filters) {
            if (typeof filters.exact === 'undefined') {
                filters.exact = true;
            }
            return this.mutations.find(mutation => matchMutation(filters, mutation));
        }
        findAll(filters) {
            return this.mutations.filter(mutation => matchMutation(filters, mutation));
        }
        notify(mutation) {
            notifyManager.batch(() => {
                this.listeners.forEach(listener => {
                    listener(mutation);
                });
            });
        }
        onFocus() {
            this.resumePausedMutations();
        }
        onOnline() {
            this.resumePausedMutations();
        }
        resumePausedMutations() {
            const pausedMutations = this.mutations.filter(x => x.state.isPaused);
            return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop)), Promise.resolve()));
        }
    }

    function infiniteQueryBehavior() {
        return {
            onFetch: context => {
                context.fetchFn = () => {
                    var _a, _b, _c, _d, _e, _f;
                    const refetchPage = (_b = (_a = context.fetchOptions) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.refetchPage;
                    const fetchMore = (_d = (_c = context.fetchOptions) === null || _c === void 0 ? void 0 : _c.meta) === null || _d === void 0 ? void 0 : _d.fetchMore;
                    const pageParam = fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.pageParam;
                    const isFetchingNextPage = (fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.direction) === 'forward';
                    const isFetchingPreviousPage = (fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.direction) === 'backward';
                    const oldPages = ((_e = context.state.data) === null || _e === void 0 ? void 0 : _e.pages) || [];
                    const oldPageParams = ((_f = context.state.data) === null || _f === void 0 ? void 0 : _f.pageParams) || [];
                    const abortController = getAbortController();
                    const abortSignal = abortController === null || abortController === void 0 ? void 0 : abortController.signal;
                    let newPageParams = oldPageParams;
                    let cancelled = false;
                    // Get query function
                    const queryFn = context.options.queryFn || (() => Promise.reject('Missing queryFn'));
                    const buildNewPages = (pages, param, page, previous) => {
                        newPageParams = previous
                            ? [param, ...newPageParams]
                            : [...newPageParams, param];
                        return previous ? [page, ...pages] : [...pages, page];
                    };
                    // Create function to fetch a page
                    const fetchPage = (pages, manual, param, previous) => {
                        if (cancelled) {
                            return Promise.reject('Cancelled');
                        }
                        if (typeof param === 'undefined' && !manual && pages.length) {
                            return Promise.resolve(pages);
                        }
                        const queryFnContext = {
                            queryKey: context.queryKey,
                            signal: abortSignal,
                            pageParam: param,
                            meta: context.meta,
                        };
                        const queryFnResult = queryFn(queryFnContext);
                        const promise = Promise.resolve(queryFnResult).then(page => buildNewPages(pages, param, page, previous));
                        if (isCancelable(queryFnResult)) {
                            const promiseAsAny = promise;
                            promiseAsAny.cancel = queryFnResult.cancel;
                        }
                        return promise;
                    };
                    let promise;
                    // Fetch first page?
                    if (!oldPages.length) {
                        promise = fetchPage([]);
                    }
                    // Fetch next page?
                    else if (isFetchingNextPage) {
                        const manual = typeof pageParam !== 'undefined';
                        const param = manual
                            ? pageParam
                            : getNextPageParam(context.options, oldPages);
                        promise = fetchPage(oldPages, manual, param);
                    }
                    // Fetch previous page?
                    else if (isFetchingPreviousPage) {
                        const manual = typeof pageParam !== 'undefined';
                        const param = manual
                            ? pageParam
                            : getPreviousPageParam(context.options, oldPages);
                        promise = fetchPage(oldPages, manual, param, true);
                    }
                    // Refetch pages
                    else {
                        newPageParams = [];
                        const manual = typeof context.options.getNextPageParam === 'undefined';
                        const shouldFetchFirstPage = refetchPage && oldPages[0]
                            ? refetchPage(oldPages[0], 0, oldPages)
                            : true;
                        // Fetch first page
                        promise = shouldFetchFirstPage
                            ? fetchPage([], manual, oldPageParams[0])
                            : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
                        // Fetch remaining pages
                        for (let i = 1; i < oldPages.length; i++) {
                            promise = promise.then(pages => {
                                const shouldFetchNextPage = refetchPage && oldPages[i]
                                    ? refetchPage(oldPages[i], i, oldPages)
                                    : true;
                                if (shouldFetchNextPage) {
                                    const param = manual
                                        ? oldPageParams[i]
                                        : getNextPageParam(context.options, pages);
                                    return fetchPage(pages, manual, param);
                                }
                                return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
                            });
                        }
                    }
                    const finalPromise = promise.then(pages => ({
                        pages,
                        pageParams: newPageParams,
                    }));
                    const finalPromiseAsAny = finalPromise;
                    finalPromiseAsAny.cancel = () => {
                        cancelled = true;
                        abortController === null || abortController === void 0 ? void 0 : abortController.abort();
                        if (isCancelable(promise)) {
                            promise.cancel();
                        }
                    };
                    return finalPromise;
                };
            },
        };
    }
    function getNextPageParam(options, pages) {
        var _a;
        return (_a = options.getNextPageParam) === null || _a === void 0 ? void 0 : _a.call(options, pages[pages.length - 1], pages);
    }
    function getPreviousPageParam(options, pages) {
        var _a;
        return (_a = options.getPreviousPageParam) === null || _a === void 0 ? void 0 : _a.call(options, pages[0], pages);
    }

    // CLASS
    class QueryClient {
        constructor(config = {}) {
            this.queryCache = config.queryCache || new QueryCache();
            this.mutationCache = config.mutationCache || new MutationCache();
            this.defaultOptions = config.defaultOptions || {};
            this.queryDefaults = [];
            this.mutationDefaults = [];
        }
        mount() {
            this.unsubscribeFocus = focusManager.subscribe(() => {
                if (focusManager.isFocused() && onlineManager.isOnline()) {
                    this.mutationCache.onFocus();
                    this.queryCache.onFocus();
                }
            });
            this.unsubscribeOnline = onlineManager.subscribe(() => {
                if (focusManager.isFocused() && onlineManager.isOnline()) {
                    this.mutationCache.onOnline();
                    this.queryCache.onOnline();
                }
            });
        }
        unmount() {
            var _a, _b;
            (_a = this.unsubscribeFocus) === null || _a === void 0 ? void 0 : _a.call(this);
            (_b = this.unsubscribeOnline) === null || _b === void 0 ? void 0 : _b.call(this);
        }
        isFetching(arg1, arg2) {
            const [filters] = parseFilterArgs(arg1, arg2);
            filters.fetching = true;
            return this.queryCache.findAll(filters).length;
        }
        isMutating(filters) {
            return this.mutationCache.findAll(Object.assign(Object.assign({}, filters), { fetching: true })).length;
        }
        getQueryData(queryKey, filters) {
            var _a;
            return (_a = this.queryCache.find(queryKey, filters)) === null || _a === void 0 ? void 0 : _a.state.data;
        }
        getQueriesData(queryKeyOrFilters) {
            return this.getQueryCache()
                .findAll(queryKeyOrFilters)
                .map(({ queryKey, state }) => {
                const data = state.data;
                return [queryKey, data];
            });
        }
        setQueryData(queryKey, updater, options) {
            const parsedOptions = parseQueryArgs(queryKey);
            const defaultedOptions = this.defaultQueryOptions(parsedOptions);
            return this.queryCache
                .build(this, defaultedOptions)
                .setData(updater, options);
        }
        setQueriesData(queryKeyOrFilters, updater, options) {
            return notifyManager.batch(() => this.getQueryCache()
                .findAll(queryKeyOrFilters)
                .map(({ queryKey }) => [
                queryKey,
                this.setQueryData(queryKey, updater, options),
            ]));
        }
        getQueryState(queryKey, filters) {
            var _a;
            return (_a = this.queryCache.find(queryKey, filters)) === null || _a === void 0 ? void 0 : _a.state;
        }
        removeQueries(arg1, arg2) {
            const [filters] = parseFilterArgs(arg1, arg2);
            const queryCache = this.queryCache;
            notifyManager.batch(() => {
                queryCache.findAll(filters).forEach(query => {
                    queryCache.remove(query);
                });
            });
        }
        resetQueries(arg1, arg2, arg3) {
            const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
            const queryCache = this.queryCache;
            const refetchFilters = Object.assign(Object.assign({}, filters), { active: true });
            return notifyManager.batch(() => {
                queryCache.findAll(filters).forEach(query => {
                    query.reset();
                });
                return this.refetchQueries(refetchFilters, options);
            });
        }
        cancelQueries(arg1, arg2, arg3) {
            const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
            if (typeof cancelOptions.revert === 'undefined') {
                cancelOptions.revert = true;
            }
            const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map(query => query.cancel(cancelOptions)));
            return Promise.all(promises).then(noop).catch(noop);
        }
        invalidateQueries(arg1, arg2, arg3) {
            var _a, _b, _c;
            const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
            const refetchFilters = Object.assign(Object.assign({}, filters), { 
                // if filters.refetchActive is not provided and filters.active is explicitly false,
                // e.g. invalidateQueries({ active: false }), we don't want to refetch active queries
                active: (_b = (_a = filters.refetchActive) !== null && _a !== void 0 ? _a : filters.active) !== null && _b !== void 0 ? _b : true, inactive: (_c = filters.refetchInactive) !== null && _c !== void 0 ? _c : false });
            return notifyManager.batch(() => {
                this.queryCache.findAll(filters).forEach(query => {
                    query.invalidate();
                });
                return this.refetchQueries(refetchFilters, options);
            });
        }
        refetchQueries(arg1, arg2, arg3) {
            const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
            const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map(query => query.fetch(undefined, Object.assign(Object.assign({}, options), { meta: { refetchPage: filters === null || filters === void 0 ? void 0 : filters.refetchPage } }))));
            let promise = Promise.all(promises).then(noop);
            if (!(options === null || options === void 0 ? void 0 : options.throwOnError)) {
                promise = promise.catch(noop);
            }
            return promise;
        }
        fetchQuery(arg1, arg2, arg3) {
            const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
            const defaultedOptions = this.defaultQueryOptions(parsedOptions);
            // https://github.com/tannerlinsley/react-query/issues/652
            if (typeof defaultedOptions.retry === 'undefined') {
                defaultedOptions.retry = false;
            }
            const query = this.queryCache.build(this, defaultedOptions);
            return query.isStaleByTime(defaultedOptions.staleTime)
                ? query.fetch(defaultedOptions)
                : Promise.resolve(query.state.data);
        }
        prefetchQuery(arg1, arg2, arg3) {
            return this.fetchQuery(arg1, arg2, arg3)
                .then(noop)
                .catch(noop);
        }
        fetchInfiniteQuery(arg1, arg2, arg3) {
            const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
            parsedOptions.behavior = infiniteQueryBehavior();
            return this.fetchQuery(parsedOptions);
        }
        prefetchInfiniteQuery(arg1, arg2, arg3) {
            return this.fetchInfiniteQuery(arg1, arg2, arg3)
                .then(noop)
                .catch(noop);
        }
        cancelMutations() {
            const promises = notifyManager.batch(() => this.mutationCache.getAll().map(mutation => mutation.cancel()));
            return Promise.all(promises).then(noop).catch(noop);
        }
        resumePausedMutations() {
            return this.getMutationCache().resumePausedMutations();
        }
        executeMutation(options) {
            return this.mutationCache.build(this, options).execute();
        }
        getQueryCache() {
            return this.queryCache;
        }
        getMutationCache() {
            return this.mutationCache;
        }
        getDefaultOptions() {
            return this.defaultOptions;
        }
        setDefaultOptions(options) {
            this.defaultOptions = options;
        }
        setQueryDefaults(queryKey, options) {
            const result = this.queryDefaults.find(x => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
            if (result) {
                result.defaultOptions = options;
            }
            else {
                this.queryDefaults.push({ queryKey, defaultOptions: options });
            }
        }
        getQueryDefaults(queryKey) {
            var _a;
            return queryKey
                ? (_a = this.queryDefaults.find(x => partialMatchKey(queryKey, x.queryKey))) === null || _a === void 0 ? void 0 : _a.defaultOptions : undefined;
        }
        setMutationDefaults(mutationKey, options) {
            const result = this.mutationDefaults.find(x => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
            if (result) {
                result.defaultOptions = options;
            }
            else {
                this.mutationDefaults.push({ mutationKey, defaultOptions: options });
            }
        }
        getMutationDefaults(mutationKey) {
            var _a;
            return mutationKey
                ? (_a = this.mutationDefaults.find(x => partialMatchKey(mutationKey, x.mutationKey))) === null || _a === void 0 ? void 0 : _a.defaultOptions : undefined;
        }
        defaultQueryOptions(options) {
            if (options === null || options === void 0 ? void 0 : options._defaulted) {
                return options;
            }
            const defaultedOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultOptions.queries), this.getQueryDefaults(options === null || options === void 0 ? void 0 : options.queryKey)), options), { _defaulted: true });
            if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
                defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
            }
            return defaultedOptions;
        }
        defaultQueryObserverOptions(options) {
            return this.defaultQueryOptions(options);
        }
        defaultMutationOptions(options) {
            if (options === null || options === void 0 ? void 0 : options._defaulted) {
                return options;
            }
            return Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultOptions.mutations), this.getMutationDefaults(options === null || options === void 0 ? void 0 : options.mutationKey)), options), { _defaulted: true });
        }
        clear() {
            this.queryCache.clear();
            this.mutationCache.clear();
        }
    }

    /* node_modules/@sveltestack/svelte-query/svelte/queryClientProvider/QueryClientProvider.svelte generated by Svelte v3.47.0 */

    function create_fragment$C(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('QueryClientProvider', slots, ['default']);
    	let { queryCache = new QueryCache() } = $$props;
    	let { mutationCache = new MutationCache() } = $$props;
    	let { defaultOptions = {} } = $$props;

    	let { client = new QueryClient({
    			queryCache,
    			mutationCache,
    			defaultOptions
    		}) } = $$props;

    	onMount(() => {
    		client.mount();
    	});

    	setContext('queryClient', client);

    	onDestroy(() => {
    		client.unmount();
    	});

    	const writable_props = ['queryCache', 'mutationCache', 'defaultOptions', 'client'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<QueryClientProvider> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('queryCache' in $$props) $$invalidate(0, queryCache = $$props.queryCache);
    		if ('mutationCache' in $$props) $$invalidate(1, mutationCache = $$props.mutationCache);
    		if ('defaultOptions' in $$props) $$invalidate(2, defaultOptions = $$props.defaultOptions);
    		if ('client' in $$props) $$invalidate(3, client = $$props.client);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		onMount,
    		onDestroy,
    		MutationCache,
    		QueryCache,
    		QueryClient,
    		queryCache,
    		mutationCache,
    		defaultOptions,
    		client
    	});

    	$$self.$inject_state = $$props => {
    		if ('queryCache' in $$props) $$invalidate(0, queryCache = $$props.queryCache);
    		if ('mutationCache' in $$props) $$invalidate(1, mutationCache = $$props.mutationCache);
    		if ('defaultOptions' in $$props) $$invalidate(2, defaultOptions = $$props.defaultOptions);
    		if ('client' in $$props) $$invalidate(3, client = $$props.client);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [queryCache, mutationCache, defaultOptions, client, $$scope, slots];
    }

    class QueryClientProvider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {
    			queryCache: 0,
    			mutationCache: 1,
    			defaultOptions: 2,
    			client: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "QueryClientProvider",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get queryCache() {
    		throw new Error("<QueryClientProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set queryCache(value) {
    		throw new Error("<QueryClientProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mutationCache() {
    		throw new Error("<QueryClientProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mutationCache(value) {
    		throw new Error("<QueryClientProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get defaultOptions() {
    		throw new Error("<QueryClientProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set defaultOptions(value) {
    		throw new Error("<QueryClientProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get client() {
    		throw new Error("<QueryClientProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set client(value) {
    		throw new Error("<QueryClientProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var QueryClientProvider$1 = QueryClientProvider;

    function useQueryClient() {
        const queryClient = getContext('queryClient');
        if (!queryClient) {
            throw new Error('No QueryClient set, use QueryClientProvider to set one');
        }
        return queryClient;
    }

    function setBatchCalls(options) {
        // Make sure results are optimistically set in fetching state before subscribing or updating options
        options.optimisticResults = true;
        if (options.onError) {
            options.onError = notifyManager.batchCalls(options.onError);
        }
        if (options.onSuccess) {
            options.onSuccess = notifyManager.batchCalls(options.onSuccess);
        }
        if (options.onSettled) {
            options.onSettled = notifyManager.batchCalls(options.onSettled);
        }
        return options;
    }

    /* eslint-disable no-shadow */
    function useQuery(arg1, arg2, arg3) {
        const options = parseQueryArgs(arg1, arg2, arg3);
        const client = useQueryClient();
        let defaultedOptions = client.defaultQueryObserverOptions(options);
        // Include callbacks in batch renders
        defaultedOptions = setBatchCalls(defaultedOptions);
        const observer = new QueryObserver(client, defaultedOptions);
        const { subscribe } = readable(observer.getCurrentResult(), set => {
            return observer.subscribe(notifyManager.batchCalls(set));
        });
        // Update result to make sure we did not miss any query updates
        // between creating the observer and subscribing to it.
        observer.updateResult();
        function setOptions(arg1, arg2, arg3) {
            const options = parseQueryArgs(arg1, arg2, arg3);
            let defaultedOptions = client.defaultQueryObserverOptions(options);
            // Include callbacks in batch renders
            defaultedOptions = setBatchCalls(defaultedOptions);
            if (observer.hasListeners()) {
                observer.setOptions(defaultedOptions, { listeners: false });
            }
        }
        function updateOptions(options) {
            observer.updateOptions(options);
        }
        function setEnabled(enabled) {
            updateOptions({ enabled });
        }
        return { subscribe, setOptions, updateOptions, setEnabled };
    }

    async function getAllAbout() {
      const api_url = "http://localhost:1337";

      const response = await fetch(`${api_url}/api/about?populate=*`);

      const data = await response.json();

      return data.data;
    }

    const blogInfoStore = writable({
      blogName: "",
      aboutMe: "",
      profilePicture: "",
      pages: [],
      socialLinks: [],
      blogSubtitle: "",
      newsletterText: "",
    });

    /* src/components/sidebar/Sidebar.svelte generated by Svelte v3.47.0 */
    const file$u = "src/components/sidebar/Sidebar.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (22:4) <Link to="/">
    function create_default_slot_2$1(ctx) {
    	let t_value = /*blogInfo*/ ctx[0].blogName + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*blogInfo*/ 1 && t_value !== (t_value = /*blogInfo*/ ctx[0].blogName + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(22:4) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (56:34) <Link to="/about">
    function create_default_slot_1$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Veja mais sobre mim.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(56:34) <Link to=\\\"/about\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:10) {#each blogInfo.socialLinks as social}
    function create_each_block_1$1(ctx) {
    	let li;
    	let a;
    	let i;
    	let i_class_value;
    	let a_href_value;
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			i = element("i");
    			t = space();
    			attr_dev(i, "class", i_class_value = "fab " + /*social*/ ctx[7].icon + " fa-fw");
    			add_location(i, file$u, 62, 17, 2685);
    			attr_dev(a, "href", a_href_value = /*social*/ ctx[7].link);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noreferrer");
    			add_location(a, file$u, 61, 14, 2613);
    			attr_dev(li, "class", "list-inline-item");
    			add_location(li, file$u, 60, 12, 2569);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, i);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*blogInfo*/ 1 && i_class_value !== (i_class_value = "fab " + /*social*/ ctx[7].icon + " fa-fw")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*blogInfo*/ 1 && a_href_value !== (a_href_value = /*social*/ ctx[7].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(60:10) {#each blogInfo.socialLinks as social}",
    		ctx
    	});

    	return block;
    }

    // (74:12) <Link class="nav-link" to={page.link}               >
    function create_default_slot$4(ctx) {
    	let i;
    	let i_class_value;
    	let t0_value = /*page*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let span;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			span.textContent = "(current)";
    			attr_dev(i, "class", i_class_value = "fas " + /*page*/ ctx[4].icon + " fa-fw mr-2");
    			add_location(i, file$u, 74, 15, 3016);
    			attr_dev(span, "class", "sr-only");
    			add_location(span, file$u, 75, 14, 3082);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*blogInfo*/ 1 && i_class_value !== (i_class_value = "fas " + /*page*/ ctx[4].icon + " fa-fw mr-2")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*blogInfo*/ 1 && t0_value !== (t0_value = /*page*/ ctx[4].name + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(74:12) <Link class=\\\"nav-link\\\" to={page.link}               >",
    		ctx
    	});

    	return block;
    }

    // (72:8) {#each blogInfo.pages as page}
    function create_each_block$2(ctx) {
    	let li;
    	let link;
    	let t;
    	let current;

    	link = new Link$2({
    			props: {
    				class: "nav-link",
    				to: /*page*/ ctx[4].link,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			t = space();
    			attr_dev(li, "class", "nav-item active");
    			add_location(li, file$u, 72, 10, 2922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};
    			if (dirty & /*blogInfo*/ 1) link_changes.to = /*page*/ ctx[4].link;

    			if (dirty & /*$$scope, blogInfo*/ 1025) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(72:8) {#each blogInfo.pages as page}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let header;
    	let h1;
    	let link0;
    	let t0;
    	let nav;
    	let button;
    	let span;
    	let t1;
    	let div2;
    	let div1;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t2;
    	let div0;
    	let t3_value = /*blogInfo*/ ctx[0].aboutMe + "";
    	let t3;
    	let br;
    	let link1;
    	let t4;
    	let ul0;
    	let t5;
    	let hr;
    	let t6;
    	let ul1;
    	let current;

    	link0 = new Link$2({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$2({
    			props: {
    				to: "/about",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value_1 = /*blogInfo*/ ctx[0].socialLinks;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = /*blogInfo*/ ctx[0].pages;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			header = element("header");
    			h1 = element("h1");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			nav = element("nav");
    			button = element("button");
    			span = element("span");
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			img = element("img");
    			t2 = space();
    			div0 = element("div");
    			t3 = text(t3_value);
    			br = element("br");
    			create_component(link1.$$.fragment);
    			t4 = space();
    			ul0 = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();
    			hr = element("hr");
    			t6 = space();
    			ul1 = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "blog-name pt-lg-4 mb-0");
    			add_location(h1, file$u, 20, 2, 557);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$u, 34, 6, 930);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navigation");
    			attr_dev(button, "aria-controls", "navigation");
    			attr_dev(button, "aria-expanded", "false");
    			attr_dev(button, "aria-label", "Toggle navigation");
    			add_location(button, file$u, 25, 4, 702);
    			attr_dev(img, "class", "profile-image mb-3 rounded-circle mx-auto");
    			if (!src_url_equal(img.src, img_src_value = /*profileImage*/ ctx[1] || "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = "image " + /*blogInfo*/ ctx[0].blogName);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "decoding", "async");
    			set_style(img, "background-size", "cover");
    			set_style(img, "background-image", "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\\'http%3A//www.w3.org/2000/svg\\' xmlns%3Axlink=\\'http%3A//www.w3.org/1999/xlink\\' viewBox=\\'0 0 1280 853\\'%3E%3Cfilter id=\\'b\\' color-interpolation-filters=\\'sRGB\\'%3E%3CfeGaussianBlur stdDeviation=\\'.5\\'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type=\\'discrete\\' tableValues=\\'1 1\\'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter=\\'url(%23b)\\' x=\\'0\\' y=\\'0\\' height=\\'100%25\\' width=\\'100%25\\' xlink%3Ahref=\\'data%3Aimage/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAs0lEQVQI1wGoAFf/AImSoJSer5yjs52ktp2luJuluKOpuJefsoCNowB+kKaOm66grL+krsCnsMGrt8m1u8mzt8OVoLIAhJqzjZ2tnLLLnLHJp7fNmpyjqbPCqLrRjqO7AIeUn5ultaWtt56msaSnroZyY4mBgLq7wY6TmwCRfk2Pf1uzm2WulV+xmV6rmGyQfFm3nWSBcEIAfm46jX1FkH5Djn5AmodGo49MopBLlIRBfG8yj/dfjF5frTUAAAAASUVORK5CYII=\\'%3E%3C/image%3E%3C/svg%3E')");
    			add_location(img, file$u, 39, 8, 1110);
    			add_location(br, file$u, 55, 28, 2382);
    			attr_dev(div0, "class", "bio mb-3");
    			add_location(div0, file$u, 54, 8, 2331);
    			attr_dev(ul0, "class", "social-list list-inline py-3 mx-auto");
    			add_location(ul0, file$u, 58, 8, 2458);
    			add_location(hr, file$u, 67, 8, 2800);
    			attr_dev(div1, "class", "profile-section pt-3 pt-lg-0");
    			add_location(div1, file$u, 38, 6, 1059);
    			attr_dev(ul1, "class", "navbar-nav flex-column text-left");
    			add_location(ul1, file$u, 70, 6, 2827);
    			attr_dev(div2, "id", "navigation");
    			attr_dev(div2, "class", "collapse navbar-collapse flex-column");
    			add_location(div2, file$u, 37, 4, 986);
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-dark");
    			add_location(nav, file$u, 24, 2, 648);
    			attr_dev(header, "class", "header text-center");
    			add_location(header, file$u, 19, 0, 519);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, h1);
    			mount_component(link0, h1, null);
    			append_dev(header, t0);
    			append_dev(header, nav);
    			append_dev(nav, button);
    			append_dev(button, span);
    			append_dev(nav, t1);
    			append_dev(nav, div2);
    			append_dev(div2, div1);
    			append_dev(div1, img);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, t3);
    			append_dev(div0, br);
    			mount_component(link1, div0, null);
    			append_dev(div1, t4);
    			append_dev(div1, ul0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul0, null);
    			}

    			append_dev(div1, t5);
    			append_dev(div1, hr);
    			append_dev(div2, t6);
    			append_dev(div2, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope, blogInfo*/ 1025) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);

    			if (!current || dirty & /*profileImage*/ 2 && !src_url_equal(img.src, img_src_value = /*profileImage*/ ctx[1] || "")) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*blogInfo*/ 1 && img_alt_value !== (img_alt_value = "image " + /*blogInfo*/ ctx[0].blogName)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if ((!current || dirty & /*blogInfo*/ 1) && t3_value !== (t3_value = /*blogInfo*/ ctx[0].aboutMe + "")) set_data_dev(t3, t3_value);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);

    			if (dirty & /*blogInfo*/ 1) {
    				each_value_1 = /*blogInfo*/ ctx[0].socialLinks;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*blogInfo*/ 1) {
    				each_value = /*blogInfo*/ ctx[0].pages;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let profileImage;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sidebar', slots, []);
    	const api_url = "http://localhost:1337";
    	let blogInfo;

    	const unsubscribe = blogInfoStore.subscribe(value => {
    		$$invalidate(0, blogInfo = value);
    		$$invalidate(0, blogInfo.pages = value.pages.map(page => page), blogInfo);
    		$$invalidate(0, blogInfo.socialLinks = value.socialLinks.map(social => social), blogInfo);
    	});

    	onDestroy(unsubscribe);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Link: Link$2,
    		onDestroy,
    		blogInfoStore,
    		api_url,
    		blogInfo,
    		unsubscribe,
    		profileImage
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogInfo' in $$props) $$invalidate(0, blogInfo = $$props.blogInfo);
    		if ('profileImage' in $$props) $$invalidate(1, profileImage = $$props.profileImage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*blogInfo*/ 1) {
    			$$invalidate(1, profileImage = `${api_url}${blogInfo?.photo?.data?.attributes.url}`);
    		}
    	};

    	return [blogInfo, profileImage];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$B.name
    		});
    	}
    }

    /* src/components/footer/Footer.svelte generated by Svelte v3.47.0 */

    const file$t = "src/components/footer/Footer.svelte";

    function create_fragment$A(ctx) {
    	let footer;
    	let small;
    	let t0;
    	let i;
    	let t1;
    	let a0;
    	let t3;
    	let a1;
    	let t5;
    	let script0;
    	let script0_src_value;
    	let t6;
    	let script1;
    	let script1_src_value;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			small = element("small");
    			t0 = text("Designed with ");
    			i = element("i");
    			t1 = text(" by\n    ");
    			a0 = element("a");
    			a0.textContent = "Xiaoying Riley";
    			t3 = text(",\n    modfied (Svelte port) by\n    ");
    			a1 = element("a");
    			a1.textContent = "Tulio Calil";
    			t5 = space();
    			script0 = element("script");
    			t6 = space();
    			script1 = element("script");
    			attr_dev(i, "class", "fas fa-heart");
    			set_style(i, "color", "#fb866a");
    			add_location(i, file$t, 3, 19, 432);
    			attr_dev(a0, "href", "http://themes.3rdwavemedia.com");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$t, 4, 4, 490);
    			attr_dev(a1, "href", "https://github.com/tuliocll/blog-svelte");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$t, 6, 4, 600);
    			attr_dev(small, "class", "copyright");
    			add_location(small, file$t, 2, 2, 388);
    			script0.defer = true;
    			attr_dev(script0, "data-host", "https://cusdis.com");
    			attr_dev(script0, "data-app-id", "123123");
    			if (!src_url_equal(script0.src, script0_src_value = "https://cusdis.com/js/cusdis-count.umd.js")) attr_dev(script0, "src", script0_src_value);
    			add_location(script0, file$t, 10, 2, 707);
    			script1.async = true;
    			if (!src_url_equal(script1.src, script1_src_value = "https://cusdis.com/js/cusdis.es.js")) attr_dev(script1, "src", script1_src_value);
    			add_location(script1, file$t, 16, 2, 854);
    			attr_dev(footer, "class", "footer text-center py-2 theme-bg-dark");
    			add_location(footer, file$t, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, small);
    			append_dev(small, t0);
    			append_dev(small, i);
    			append_dev(small, t1);
    			append_dev(small, a0);
    			append_dev(small, t3);
    			append_dev(small, a1);
    			append_dev(footer, t5);
    			append_dev(footer, script0);
    			append_dev(footer, t6);
    			append_dev(footer, script1);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    /* src/components/SEO/SEO.svelte generated by Svelte v3.47.0 */

    function create_fragment$z(ctx) {
    	let metatags;
    	let current;

    	metatags = new svelteMetaTags.MetaTags({
    			props: {
    				title: "Using More of Config",
    				titleTemplate: "%s | Svelte Meta Tags",
    				description: "This example uses more of the available config options.",
    				canonical: "https://www.canonical.ie/",
    				openGraph: {
    					url: "https://www.url.ie/a",
    					title: "Open Graph Title",
    					description: "Open Graph Description",
    					images: [
    						{
    							url: "https://www.example.ie/og-image-01.jpg",
    							width: 800,
    							height: 600,
    							alt: "Og Image Alt"
    						},
    						{
    							url: "https://www.example.ie/og-image-02.jpg",
    							width: 900,
    							height: 800,
    							alt: "Og Image Alt Second"
    						},
    						{
    							url: "https://www.example.ie/og-image-03.jpg"
    						},
    						{
    							url: "https://www.example.ie/og-image-04.jpg"
    						}
    					],
    					site_name: "SiteName"
    				},
    				twitter: {
    					handle: "@handle",
    					site: "@site",
    					cardType: "summary_large_image",
    					title: "Using More of Config",
    					description: /*teste*/ ctx[0],
    					image: "https://www.example.ie/twitter-image.jpg",
    					imageAlt: "Twitter image alt"
    				},
    				facebook: { appId: "1234567890" }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(metatags.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(metatags, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const metatags_changes = {};

    			if (dirty & /*teste*/ 1) metatags_changes.twitter = {
    				handle: "@handle",
    				site: "@site",
    				cardType: "summary_large_image",
    				title: "Using More of Config",
    				description: /*teste*/ ctx[0],
    				image: "https://www.example.ie/twitter-image.jpg",
    				imageAlt: "Twitter image alt"
    			};

    			metatags.$set(metatags_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(metatags.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(metatags.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(metatags, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SEO', slots, []);
    	let { teste = "testando SEO" } = $$props;
    	const writable_props = ['teste'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SEO> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('teste' in $$props) $$invalidate(0, teste = $$props.teste);
    	};

    	$$self.$capture_state = () => ({ MetaTags: svelteMetaTags.MetaTags, teste });

    	$$self.$inject_state = $$props => {
    		if ('teste' in $$props) $$invalidate(0, teste = $$props.teste);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [teste];
    }

    class SEO extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { teste: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SEO",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get teste() {
    		throw new Error("<SEO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set teste(value) {
    		throw new Error("<SEO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/newsletter/Newsletter.svelte generated by Svelte v3.47.0 */

    const file$s = "src/components/newsletter/Newsletter.svelte";

    function create_fragment$y(ctx) {
    	let section;
    	let div2;
    	let h2;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let div0;
    	let t4;
    	let t5;
    	let form;
    	let div1;
    	let label;
    	let t7;
    	let input;
    	let t8;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			h2 = element("h2");
    			t0 = text(/*blogName*/ ctx[0]);
    			t1 = text(" - ");
    			t2 = text(/*blogSubtitle*/ ctx[1]);
    			t3 = space();
    			div0 = element("div");
    			t4 = text(/*newsletterText*/ ctx[2]);
    			t5 = space();
    			form = element("form");
    			div1 = element("div");
    			label = element("label");
    			label.textContent = "Seu email";
    			t7 = space();
    			input = element("input");
    			t8 = space();
    			button = element("button");
    			button.textContent = "Assinar Grátis";
    			attr_dev(h2, "class", "heading");
    			add_location(h2, file$s, 13, 4, 301);
    			attr_dev(div0, "class", "intro");
    			add_location(div0, file$s, 14, 4, 358);
    			attr_dev(label, "class", "sr-only");
    			attr_dev(label, "for", "semail");
    			add_location(label, file$s, 22, 8, 567);
    			attr_dev(input, "type", "email");
    			attr_dev(input, "id", "semail");
    			attr_dev(input, "name", "semail1");
    			attr_dev(input, "class", "form-control mr-md-1 semail");
    			attr_dev(input, "placeholder", "Digite seu email");
    			input.required = true;
    			add_location(input, file$s, 23, 8, 629);
    			attr_dev(div1, "class", "form-group");
    			add_location(div1, file$s, 21, 6, 534);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "btn btn-primary");
    			add_location(button, file$s, 32, 6, 842);
    			attr_dev(form, "class", "signup-form form-inline justify-content-center pt-3");
    			add_location(form, file$s, 17, 4, 416);
    			attr_dev(div2, "class", "container text-center");
    			add_location(div2, file$s, 12, 2, 261);
    			attr_dev(section, "class", "cta-section theme-bg-light py-5");
    			add_location(section, file$s, 11, 0, 209);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(h2, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div0);
    			append_dev(div0, t4);
    			append_dev(div2, t5);
    			append_dev(div2, form);
    			append_dev(form, div1);
    			append_dev(div1, label);
    			append_dev(div1, t7);
    			append_dev(div1, input);
    			append_dev(form, t8);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", handleSubscribe, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*blogName*/ 1) set_data_dev(t0, /*blogName*/ ctx[0]);
    			if (dirty & /*blogSubtitle*/ 2) set_data_dev(t2, /*blogSubtitle*/ ctx[1]);
    			if (dirty & /*newsletterText*/ 4) set_data_dev(t4, /*newsletterText*/ ctx[2]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleSubscribe(event) {
    	event.preventDefault();
    	event.target[0].value;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Newsletter', slots, []);
    	let { blogName } = $$props;
    	let { blogSubtitle } = $$props;
    	let { newsletterText } = $$props;
    	const writable_props = ['blogName', 'blogSubtitle', 'newsletterText'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Newsletter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('blogSubtitle' in $$props) $$invalidate(1, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(2, newsletterText = $$props.newsletterText);
    	};

    	$$self.$capture_state = () => ({
    		blogName,
    		blogSubtitle,
    		newsletterText,
    		handleSubscribe
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('blogSubtitle' in $$props) $$invalidate(1, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(2, newsletterText = $$props.newsletterText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [blogName, blogSubtitle, newsletterText];
    }

    class Newsletter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {
    			blogName: 0,
    			blogSubtitle: 1,
    			newsletterText: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Newsletter",
    			options,
    			id: create_fragment$y.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*blogName*/ ctx[0] === undefined && !('blogName' in props)) {
    			console.warn("<Newsletter> was created without expected prop 'blogName'");
    		}

    		if (/*blogSubtitle*/ ctx[1] === undefined && !('blogSubtitle' in props)) {
    			console.warn("<Newsletter> was created without expected prop 'blogSubtitle'");
    		}

    		if (/*newsletterText*/ ctx[2] === undefined && !('newsletterText' in props)) {
    			console.warn("<Newsletter> was created without expected prop 'newsletterText'");
    		}
    	}

    	get blogName() {
    		throw new Error("<Newsletter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogName(value) {
    		throw new Error("<Newsletter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blogSubtitle() {
    		throw new Error("<Newsletter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogSubtitle(value) {
    		throw new Error("<Newsletter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get newsletterText() {
    		throw new Error("<Newsletter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set newsletterText(value) {
    		throw new Error("<Newsletter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
      }
    }

    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @param {Date|Number} argument - the value to convert
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */

    function toDate(argument) {
      requiredArgs(1, arguments);
      var argStr = Object.prototype.toString.call(argument); // Clone the date

      if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
      } else if (typeof argument === 'number' || argStr === '[object Number]') {
        return new Date(argument);
      } else {
        if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

          console.warn(new Error().stack);
        }

        return new Date(NaN);
      }
    }

    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    /**
     * @name compareAsc
     * @category Common Helpers
     * @summary Compare the two dates and return -1, 0 or 1.
     *
     * @description
     * Compare the two dates and return 1 if the first date is after the second,
     * -1 if the first date is before the second or 0 if dates are equal.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the first date to compare
     * @param {Date|Number} dateRight - the second date to compare
     * @returns {Number} the result of the comparison
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Compare 11 February 1987 and 10 July 1989:
     * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
     * //=> -1
     *
     * @example
     * // Sort the array of dates:
     * const result = [
     *   new Date(1995, 6, 2),
     *   new Date(1987, 1, 11),
     *   new Date(1989, 6, 10)
     * ].sort(compareAsc)
     * //=> [
     * //   Wed Feb 11 1987 00:00:00,
     * //   Mon Jul 10 1989 00:00:00,
     * //   Sun Jul 02 1995 00:00:00
     * // ]
     */

    function compareAsc(dirtyDateLeft, dirtyDateRight) {
      requiredArgs(2, arguments);
      var dateLeft = toDate(dirtyDateLeft);
      var dateRight = toDate(dirtyDateRight);
      var diff = dateLeft.getTime() - dateRight.getTime();

      if (diff < 0) {
        return -1;
      } else if (diff > 0) {
        return 1; // Return 0 if diff is 0; return NaN if diff is NaN
      } else {
        return diff;
      }
    }

    /**
     * @name differenceInCalendarMonths
     * @category Month Helpers
     * @summary Get the number of calendar months between the given dates.
     *
     * @description
     * Get the number of calendar months between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of calendar months
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many calendar months are between 31 January 2014 and 1 September 2014?
     * var result = differenceInCalendarMonths(
     *   new Date(2014, 8, 1),
     *   new Date(2014, 0, 31)
     * )
     * //=> 8
     */

    function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
      requiredArgs(2, arguments);
      var dateLeft = toDate(dirtyDateLeft);
      var dateRight = toDate(dirtyDateRight);
      var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
      var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
      return yearDiff * 12 + monthDiff;
    }

    /**
     * @name differenceInMilliseconds
     * @category Millisecond Helpers
     * @summary Get the number of milliseconds between the given dates.
     *
     * @description
     * Get the number of milliseconds between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of milliseconds
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many milliseconds are between
     * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
     * const result = differenceInMilliseconds(
     *   new Date(2014, 6, 2, 12, 30, 21, 700),
     *   new Date(2014, 6, 2, 12, 30, 20, 600)
     * )
     * //=> 1100
     */

    function differenceInMilliseconds(dateLeft, dateRight) {
      requiredArgs(2, arguments);
      return toDate(dateLeft).getTime() - toDate(dateRight).getTime();
    }

    var roundingMap = {
      ceil: Math.ceil,
      round: Math.round,
      floor: Math.floor,
      trunc: function (value) {
        return value < 0 ? Math.ceil(value) : Math.floor(value);
      } // Math.trunc is not supported by IE

    };
    var defaultRoundingMethod = 'trunc';
    function getRoundingMethod(method) {
      return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
    }

    /**
     * @name endOfDay
     * @category Day Helpers
     * @summary Return the end of a day for the given date.
     *
     * @description
     * Return the end of a day for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the end of a day
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The end of a day for 2 September 2014 11:55:00:
     * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 02 2014 23:59:59.999
     */

    function endOfDay(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      date.setHours(23, 59, 59, 999);
      return date;
    }

    /**
     * @name endOfMonth
     * @category Month Helpers
     * @summary Return the end of a month for the given date.
     *
     * @description
     * Return the end of a month for the given date.
     * The result will be in the local timezone.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the original date
     * @returns {Date} the end of a month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // The end of a month for 2 September 2014 11:55:00:
     * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 30 2014 23:59:59.999
     */

    function endOfMonth(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var month = date.getMonth();
      date.setFullYear(date.getFullYear(), month + 1, 0);
      date.setHours(23, 59, 59, 999);
      return date;
    }

    /**
     * @name isLastDayOfMonth
     * @category Month Helpers
     * @summary Is the given date the last day of a month?
     *
     * @description
     * Is the given date the last day of a month?
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} date - the date to check
     * @returns {Boolean} the date is the last day of a month
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Is 28 February 2014 the last day of a month?
     * var result = isLastDayOfMonth(new Date(2014, 1, 28))
     * //=> true
     */

    function isLastDayOfMonth(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      return endOfDay(date).getTime() === endOfMonth(date).getTime();
    }

    /**
     * @name differenceInMonths
     * @category Month Helpers
     * @summary Get the number of full months between the given dates.
     *
     * @description
     * Get the number of full months between the given dates using trunc as a default rounding method.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @returns {Number} the number of full months
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many full months are between 31 January 2014 and 1 September 2014?
     * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
     * //=> 7
     */

    function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
      requiredArgs(2, arguments);
      var dateLeft = toDate(dirtyDateLeft);
      var dateRight = toDate(dirtyDateRight);
      var sign = compareAsc(dateLeft, dateRight);
      var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
      var result; // Check for the difference of less than month

      if (difference < 1) {
        result = 0;
      } else {
        if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
          // This will check if the date is end of Feb and assign a higher end of month date
          // to compare it with Jan
          dateLeft.setDate(30);
        }

        dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
        // If so, result must be decreased by 1 in absolute value

        var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

        if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
          isLastMonthNotFull = false;
        }

        result = sign * (difference - Number(isLastMonthNotFull));
      } // Prevent negative zero


      return result === 0 ? 0 : result;
    }

    /**
     * @name differenceInSeconds
     * @category Second Helpers
     * @summary Get the number of seconds between the given dates.
     *
     * @description
     * Get the number of seconds between the given dates.
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * @param {Date|Number} dateLeft - the later date
     * @param {Date|Number} dateRight - the earlier date
     * @param {Object} [options] - an object with options.
     * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
     * @returns {Number} the number of seconds
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // How many seconds are between
     * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
     * const result = differenceInSeconds(
     *   new Date(2014, 6, 2, 12, 30, 20, 0),
     *   new Date(2014, 6, 2, 12, 30, 7, 999)
     * )
     * //=> 12
     */

    function differenceInSeconds(dateLeft, dateRight, options) {
      requiredArgs(2, arguments);
      var diff = differenceInMilliseconds(dateLeft, dateRight) / 1000;
      return getRoundingMethod(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
    }

    var formatDistanceLocale$1 = {
      lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
      },
      xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
      },
      halfAMinute: 'half a minute',
      lessThanXMinutes: {
        one: 'less than a minute',
        other: 'less than {{count}} minutes'
      },
      xMinutes: {
        one: '1 minute',
        other: '{{count}} minutes'
      },
      aboutXHours: {
        one: 'about 1 hour',
        other: 'about {{count}} hours'
      },
      xHours: {
        one: '1 hour',
        other: '{{count}} hours'
      },
      xDays: {
        one: '1 day',
        other: '{{count}} days'
      },
      aboutXWeeks: {
        one: 'about 1 week',
        other: 'about {{count}} weeks'
      },
      xWeeks: {
        one: '1 week',
        other: '{{count}} weeks'
      },
      aboutXMonths: {
        one: 'about 1 month',
        other: 'about {{count}} months'
      },
      xMonths: {
        one: '1 month',
        other: '{{count}} months'
      },
      aboutXYears: {
        one: 'about 1 year',
        other: 'about {{count}} years'
      },
      xYears: {
        one: '1 year',
        other: '{{count}} years'
      },
      overXYears: {
        one: 'over 1 year',
        other: 'over {{count}} years'
      },
      almostXYears: {
        one: 'almost 1 year',
        other: 'almost {{count}} years'
      }
    };

    var formatDistance$2 = function (token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale$1[token];

      if (typeof tokenValue === 'string') {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace('{{count}}', count.toString());
      }

      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return 'in ' + result;
        } else {
          return result + ' ago';
        }
      }

      return result;
    };

    var formatDistance$3 = formatDistance$2;

    function buildFormatLongFn(args) {
      return function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    var dateFormats$1 = {
      full: 'EEEE, MMMM do, y',
      long: 'MMMM do, y',
      medium: 'MMM d, y',
      short: 'MM/dd/yyyy'
    };
    var timeFormats$1 = {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a'
    };
    var dateTimeFormats$1 = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    };
    var formatLong$2 = {
      date: buildFormatLongFn({
        formats: dateFormats$1,
        defaultWidth: 'full'
      }),
      time: buildFormatLongFn({
        formats: timeFormats$1,
        defaultWidth: 'full'
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats$1,
        defaultWidth: 'full'
      })
    };
    var formatLong$3 = formatLong$2;

    var formatRelativeLocale$1 = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: 'P'
    };

    var formatRelative$1 = function (token, _date, _baseDate, _options) {
      return formatRelativeLocale$1[token];
    };

    var formatRelative$2 = formatRelative$1;

    function buildLocalizeFn(args) {
      return function (dirtyIndex, dirtyOptions) {
        var options = dirtyOptions || {};
        var context = options.context ? String(options.context) : 'standalone';
        var valuesArray;

        if (context === 'formatting' && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;

          var _width = options.width ? String(options.width) : args.defaultWidth;

          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }

        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

        return valuesArray[index];
      };
    }

    var eraValues$1 = {
      narrow: ['B', 'A'],
      abbreviated: ['BC', 'AD'],
      wide: ['Before Christ', 'Anno Domini']
    };
    var quarterValues$1 = {
      narrow: ['1', '2', '3', '4'],
      abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
      wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
    }; // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.

    var monthValues$1 = {
      narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    var dayValues$1 = {
      narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    var dayPeriodValues$1 = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      }
    };
    var formattingDayPeriodValues$1 = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      }
    };

    var ordinalNumber$1 = function (dirtyNumber, _options) {
      var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      var rem100 = number % 100;

      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + 'st';

          case 2:
            return number + 'nd';

          case 3:
            return number + 'rd';
        }
      }

      return number + 'th';
    };

    var localize$2 = {
      ordinalNumber: ordinalNumber$1,
      era: buildLocalizeFn({
        values: eraValues$1,
        defaultWidth: 'wide'
      }),
      quarter: buildLocalizeFn({
        values: quarterValues$1,
        defaultWidth: 'wide',
        argumentCallback: function (quarter) {
          return quarter - 1;
        }
      }),
      month: buildLocalizeFn({
        values: monthValues$1,
        defaultWidth: 'wide'
      }),
      day: buildLocalizeFn({
        values: dayValues$1,
        defaultWidth: 'wide'
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues$1,
        defaultWidth: 'wide',
        formattingValues: formattingDayPeriodValues$1,
        defaultFormattingWidth: 'wide'
      })
    };
    var localize$3 = localize$2;

    function buildMatchFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);

        if (!matchResult) {
          return null;
        }

        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        }) : findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }

      return undefined;
    }

    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }

      return undefined;
    }

    function buildMatchPatternFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    var matchOrdinalNumberPattern$1 = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern$1 = /\d+/i;
    var matchEraPatterns$1 = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    var parseEraPatterns$1 = {
      any: [/^b/i, /^(a|c)/i]
    };
    var matchQuarterPatterns$1 = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    var parseQuarterPatterns$1 = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns$1 = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    var parseMonthPatterns$1 = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    var matchDayPatterns$1 = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    var parseDayPatterns$1 = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    var matchDayPeriodPatterns$1 = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    var parseDayPeriodPatterns$1 = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    };
    var match$2 = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern$1,
        parsePattern: parseOrdinalNumberPattern$1,
        valueCallback: function (value) {
          return parseInt(value, 10);
        }
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns$1,
        defaultMatchWidth: 'wide',
        parsePatterns: parseEraPatterns$1,
        defaultParseWidth: 'any'
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns$1,
        defaultMatchWidth: 'wide',
        parsePatterns: parseQuarterPatterns$1,
        defaultParseWidth: 'any',
        valueCallback: function (index) {
          return index + 1;
        }
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns$1,
        defaultMatchWidth: 'wide',
        parsePatterns: parseMonthPatterns$1,
        defaultParseWidth: 'any'
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns$1,
        defaultMatchWidth: 'wide',
        parsePatterns: parseDayPatterns$1,
        defaultParseWidth: 'any'
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns$1,
        defaultMatchWidth: 'any',
        parsePatterns: parseDayPeriodPatterns$1,
        defaultParseWidth: 'any'
      })
    };
    var match$3 = match$2;

    /**
     * @type {Locale}
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
     * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
     */
    var locale$1 = {
      code: 'en-US',
      formatDistance: formatDistance$3,
      formatLong: formatLong$3,
      formatRelative: formatRelative$2,
      localize: localize$3,
      match: match$3,
      options: {
        weekStartsOn: 0
        /* Sunday */
        ,
        firstWeekContainsDate: 1
      }
    };
    var defaultLocale = locale$1;

    function assign$1(target, dirtyObject) {
      if (target == null) {
        throw new TypeError('assign requires that input parameter not be null or undefined');
      }

      dirtyObject = dirtyObject || {};

      for (var property in dirtyObject) {
        if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
          target[property] = dirtyObject[property];
        }
      }

      return target;
    }

    function cloneObject(dirtyObject) {
      return assign$1({}, dirtyObject);
    }

    var MINUTES_IN_DAY = 1440;
    var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
    var MINUTES_IN_MONTH = 43200;
    var MINUTES_IN_TWO_MONTHS = 86400;
    /**
     * @name formatDistance
     * @category Common Helpers
     * @summary Return the distance between the given dates in words.
     *
     * @description
     * Return the distance between the given dates in words.
     *
     * | Distance between dates                                            | Result              |
     * |-------------------------------------------------------------------|---------------------|
     * | 0 ... 30 secs                                                     | less than a minute  |
     * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
     * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
     * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
     * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
     * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
     * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
     * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
     * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
     * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
     * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
     * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
     * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
     * | N yrs ... N yrs 3 months                                          | about N years       |
     * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
     * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
     *
     * With `options.includeSeconds == true`:
     * | Distance between dates | Result               |
     * |------------------------|----------------------|
     * | 0 secs ... 5 secs      | less than 5 seconds  |
     * | 5 secs ... 10 secs     | less than 10 seconds |
     * | 10 secs ... 20 secs    | less than 20 seconds |
     * | 20 secs ... 40 secs    | half a minute        |
     * | 40 secs ... 60 secs    | less than a minute   |
     * | 60 secs ... 90 secs    | 1 minute             |
     *
     * ### v2.0.0 breaking changes:
     *
     * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
     *
     * - The function was renamed from `distanceInWords ` to `formatDistance`
     *   to make its name consistent with `format` and `formatRelative`.
     *
     * - The order of arguments is swapped to make the function
     *   consistent with `differenceIn...` functions.
     *
     *   ```javascript
     *   // Before v2.0.0
     *
     *   distanceInWords(
     *     new Date(1986, 3, 4, 10, 32, 0),
     *     new Date(1986, 3, 4, 11, 32, 0),
     *     { addSuffix: true }
     *   ) //=> 'in about 1 hour'
     *
     *   // v2.0.0 onward
     *
     *   formatDistance(
     *     new Date(1986, 3, 4, 11, 32, 0),
     *     new Date(1986, 3, 4, 10, 32, 0),
     *     { addSuffix: true }
     *   ) //=> 'in about 1 hour'
     *   ```
     *
     * @param {Date|Number} date - the date
     * @param {Date|Number} baseDate - the date to compare with
     * @param {Object} [options] - an object with options.
     * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
     * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @returns {String} the distance in words
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `date` must not be Invalid Date
     * @throws {RangeError} `baseDate` must not be Invalid Date
     * @throws {RangeError} `options.locale` must contain `formatDistance` property
     *
     * @example
     * // What is the distance between 2 July 2014 and 1 January 2015?
     * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
     * //=> '6 months'
     *
     * @example
     * // What is the distance between 1 January 2015 00:00:15
     * // and 1 January 2015 00:00:00, including seconds?
     * const result = formatDistance(
     *   new Date(2015, 0, 1, 0, 0, 15),
     *   new Date(2015, 0, 1, 0, 0, 0),
     *   { includeSeconds: true }
     * )
     * //=> 'less than 20 seconds'
     *
     * @example
     * // What is the distance from 1 January 2016
     * // to 1 January 2015, with a suffix?
     * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
     *   addSuffix: true
     * })
     * //=> 'about 1 year ago'
     *
     * @example
     * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
     *   locale: eoLocale
     * })
     * //=> 'pli ol 1 jaro'
     */

    function formatDistance$1(dirtyDate, dirtyBaseDate) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      requiredArgs(2, arguments);
      var locale = options.locale || defaultLocale;

      if (!locale.formatDistance) {
        throw new RangeError('locale must contain formatDistance property');
      }

      var comparison = compareAsc(dirtyDate, dirtyBaseDate);

      if (isNaN(comparison)) {
        throw new RangeError('Invalid time value');
      }

      var localizeOptions = cloneObject(options);
      localizeOptions.addSuffix = Boolean(options.addSuffix);
      localizeOptions.comparison = comparison;
      var dateLeft;
      var dateRight;

      if (comparison > 0) {
        dateLeft = toDate(dirtyBaseDate);
        dateRight = toDate(dirtyDate);
      } else {
        dateLeft = toDate(dirtyDate);
        dateRight = toDate(dirtyBaseDate);
      }

      var seconds = differenceInSeconds(dateRight, dateLeft);
      var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1000;
      var minutes = Math.round((seconds - offsetInSeconds) / 60);
      var months; // 0 up to 2 mins

      if (minutes < 2) {
        if (options.includeSeconds) {
          if (seconds < 5) {
            return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
          } else if (seconds < 10) {
            return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
          } else if (seconds < 20) {
            return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
          } else if (seconds < 40) {
            return locale.formatDistance('halfAMinute', null, localizeOptions);
          } else if (seconds < 60) {
            return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
          } else {
            return locale.formatDistance('xMinutes', 1, localizeOptions);
          }
        } else {
          if (minutes === 0) {
            return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
          } else {
            return locale.formatDistance('xMinutes', minutes, localizeOptions);
          }
        } // 2 mins up to 0.75 hrs

      } else if (minutes < 45) {
        return locale.formatDistance('xMinutes', minutes, localizeOptions); // 0.75 hrs up to 1.5 hrs
      } else if (minutes < 90) {
        return locale.formatDistance('aboutXHours', 1, localizeOptions); // 1.5 hrs up to 24 hrs
      } else if (minutes < MINUTES_IN_DAY) {
        var hours = Math.round(minutes / 60);
        return locale.formatDistance('aboutXHours', hours, localizeOptions); // 1 day up to 1.75 days
      } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
        return locale.formatDistance('xDays', 1, localizeOptions); // 1.75 days up to 30 days
      } else if (minutes < MINUTES_IN_MONTH) {
        var days = Math.round(minutes / MINUTES_IN_DAY);
        return locale.formatDistance('xDays', days, localizeOptions); // 1 month up to 2 months
      } else if (minutes < MINUTES_IN_TWO_MONTHS) {
        months = Math.round(minutes / MINUTES_IN_MONTH);
        return locale.formatDistance('aboutXMonths', months, localizeOptions);
      }

      months = differenceInMonths(dateRight, dateLeft); // 2 months up to 12 months

      if (months < 12) {
        var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
        return locale.formatDistance('xMonths', nearestMonth, localizeOptions); // 1 year up to max Date
      } else {
        var monthsSinceStartOfYear = months % 12;
        var years = Math.floor(months / 12); // N years up to 1 years 3 months

        if (monthsSinceStartOfYear < 3) {
          return locale.formatDistance('aboutXYears', years, localizeOptions); // N years 3 months up to N years 9 months
        } else if (monthsSinceStartOfYear < 9) {
          return locale.formatDistance('overXYears', years, localizeOptions); // N years 9 months up to N year 12 months
        } else {
          return locale.formatDistance('almostXYears', years + 1, localizeOptions);
        }
      }
    }

    const en = {
      less: "less than a minute read",
      default: "min read"
    };
    const fr = {
      less: `moins d'une minute de lecture`,
      default: "min de lecture"
    };
    const es = {
      less: `menos de un minuto leyendo`,
      default: "min de lectura"
    };
    const cn = {
      less: "\u5C0F\u4E8E\u4E00\u5206\u949F",
      default: "\u5206\u949F"
    };
    const ja = {
      less: "1\u5206\u672A\u6E80\u306E\u8AAD\u307F\u53D6\u308A",
      default: "\u6700\u5C0F\u8AAD\u307F\u53D6\u308A"
    };
    const translations = {
      en,
      fr,
      es,
      cn,
      ja
    };
    const parseWords = (data) => {
      var _a;
      return (_a = data.match(/[\w\d\s,.\u00C0-\u024F]+/giu)) !== null && _a !== void 0 ? _a : [];
    };
    const parseChineseWords = (data) => {
      var _a;
      return (_a = data.match(/[\u4E00-\u9FA5]/gu)) !== null && _a !== void 0 ? _a : [];
    };
    const parseJapaneseWords = (data) => {
      var _a;
      return (_a = data.match(/[\u3041-\u3096]/gu)) !== null && _a !== void 0 ? _a : [];
    };
    const getNumberOfWords = (data) => parseWords(data).reduce((accumulator, word) => accumulator + (!word.trim().length ? 0 : word.trim().split(/\s+/u).length), 0) + parseChineseWords(data).length + parseJapaneseWords(data).length;
    const isLessThanAMinute = (minutes) => minutes < 1 + Number.EPSILON;
    const getLocale = (minutes, locale = "en") => translations[locale][isLessThanAMinute(minutes) ? "less" : "default"];
    const readingTime = (data, wordsPerMinute = 300, language = "en") => {
      const words = getNumberOfWords(data !== null && data !== void 0 ? data : "");
      const minutes = +Math.round(words / wordsPerMinute).toFixed(2);
      return {
        minutes,
        words,
        text: `${isLessThanAMinute(minutes) ? "" : minutes} ${getLocale(minutes, language)}`.trimStart()
      };
    };

    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: 'menos de um segundo',
        other: 'menos de {{count}} segundos'
      },
      xSeconds: {
        one: '1 segundo',
        other: '{{count}} segundos'
      },
      halfAMinute: 'meio minuto',
      lessThanXMinutes: {
        one: 'menos de um minuto',
        other: 'menos de {{count}} minutos'
      },
      xMinutes: {
        one: '1 minuto',
        other: '{{count}} minutos'
      },
      aboutXHours: {
        one: 'cerca de 1 hora',
        other: 'cerca de {{count}} horas'
      },
      xHours: {
        one: '1 hora',
        other: '{{count}} horas'
      },
      xDays: {
        one: '1 dia',
        other: '{{count}} dias'
      },
      aboutXWeeks: {
        one: 'cerca de 1 semana',
        other: 'cerca de {{count}} semanas'
      },
      xWeeks: {
        one: '1 semana',
        other: '{{count}} semanas'
      },
      aboutXMonths: {
        one: 'cerca de 1 mês',
        other: 'cerca de {{count}} meses'
      },
      xMonths: {
        one: '1 mês',
        other: '{{count}} meses'
      },
      aboutXYears: {
        one: 'cerca de 1 ano',
        other: 'cerca de {{count}} anos'
      },
      xYears: {
        one: '1 ano',
        other: '{{count}} anos'
      },
      overXYears: {
        one: 'mais de 1 ano',
        other: 'mais de {{count}} anos'
      },
      almostXYears: {
        one: 'quase 1 ano',
        other: 'quase {{count}} anos'
      }
    };
    function formatDistance(token, count, options) {
      options = options || {};
      var result;

      if (typeof formatDistanceLocale[token] === 'string') {
        result = formatDistanceLocale[token];
      } else if (count === 1) {
        result = formatDistanceLocale[token].one;
      } else {
        result = formatDistanceLocale[token].other.replace('{{count}}', count);
      }

      if (options.addSuffix) {
        if (options.comparison > 0) {
          return 'em ' + result;
        } else {
          return 'há ' + result;
        }
      }

      return result;
    }

    var dateFormats = {
      full: "EEEE, d 'de' MMMM 'de' y",
      long: "d 'de' MMMM 'de' y",
      medium: 'd MMM y',
      short: 'dd/MM/yyyy'
    };
    var timeFormats = {
      full: 'HH:mm:ss zzzz',
      long: 'HH:mm:ss z',
      medium: 'HH:mm:ss',
      short: 'HH:mm'
    };
    var dateTimeFormats = {
      full: "{{date}} 'às' {{time}}",
      long: "{{date}} 'às' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    };
    var formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: 'full'
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: 'full'
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: 'full'
      })
    };
    var formatLong$1 = formatLong;

    var formatRelativeLocale = {
      lastWeek: function (date, _baseDate, _options) {
        var weekday = date.getUTCDay();
        var last = weekday === 0 || weekday === 6 ? 'último' : 'última';
        return "'" + last + "' eeee 'às' p";
      },
      yesterday: "'ontem às' p",
      today: "'hoje às' p",
      tomorrow: "'amanhã às' p",
      nextWeek: "eeee 'às' p",
      other: 'P'
    };
    function formatRelative(token, date, baseDate, options) {
      var format = formatRelativeLocale[token];

      if (typeof format === 'function') {
        return format(date, baseDate, options);
      }

      return format;
    }

    var eraValues = {
      narrow: ['AC', 'DC'],
      abbreviated: ['AC', 'DC'],
      wide: ['antes de cristo', 'depois de cristo']
    };
    var quarterValues = {
      narrow: ['1', '2', '3', '4'],
      abbreviated: ['T1', 'T2', 'T3', 'T4'],
      wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
    };
    var monthValues = {
      narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
      abbreviated: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    };
    var dayValues = {
      narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      short: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      abbreviated: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      wide: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
    };
    var dayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mn',
        noon: 'md',
        morning: 'manhã',
        afternoon: 'tarde',
        evening: 'tarde',
        night: 'noite'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'meia-noite',
        noon: 'meio-dia',
        morning: 'manhã',
        afternoon: 'tarde',
        evening: 'tarde',
        night: 'noite'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'meia-noite',
        noon: 'meio-dia',
        morning: 'manhã',
        afternoon: 'tarde',
        evening: 'tarde',
        night: 'noite'
      }
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mn',
        noon: 'md',
        morning: 'da manhã',
        afternoon: 'da tarde',
        evening: 'da tarde',
        night: 'da noite'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'meia-noite',
        noon: 'meio-dia',
        morning: 'da manhã',
        afternoon: 'da tarde',
        evening: 'da tarde',
        night: 'da noite'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'meia-noite',
        noon: 'meio-dia',
        morning: 'da manhã',
        afternoon: 'da tarde',
        evening: 'da tarde',
        night: 'da noite'
      }
    };

    function ordinalNumber(dirtyNumber, dirtyOptions) {
      var number = Number(dirtyNumber);
      var options = dirtyOptions || {};
      var unit = String(options.unit);

      if (unit === 'week' || unit === 'isoWeek') {
        return number + 'ª';
      }

      return number + 'º';
    }

    var localize = {
      ordinalNumber: ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: 'wide'
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: 'wide',
        argumentCallback: function (quarter) {
          return Number(quarter) - 1;
        }
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: 'wide'
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: 'wide'
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: 'wide',
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: 'wide'
      })
    };
    var localize$1 = localize;

    var matchOrdinalNumberPattern = /^(\d+)[ºªo]?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(ac|dc|a|d)/i,
      abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
      wide: /^(antes de cristo|depois de cristo)/i
    };
    var parseEraPatterns = {
      any: [/^ac/i, /^dc/i],
      wide: [/^antes de cristo/i, /^depois de cristo/i]
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^T[1234]/i,
      wide: /^[1234](º)? trimestre/i
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns = {
      narrow: /^[jfmajsond]/i,
      abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
      wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
    };
    var parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^fev/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dez/i]
    };
    var matchDayPatterns = {
      narrow: /^(dom|[23456]ª?|s[aá]b)/i,
      short: /^(dom|[23456]ª?|s[aá]b)/i,
      abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
      wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
    };
    var parseDayPatterns = {
      short: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
      narrow: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
      any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[aá]b/i]
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
      any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mn|^meia[-\s]noite/i,
        noon: /^md|^meio[-\s]dia/i,
        morning: /manhã/i,
        afternoon: /tarde/i,
        evening: /tarde/i,
        night: /noite/i
      }
    };
    var match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function (value) {
          return parseInt(value, 10);
        }
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseEraPatterns,
        defaultParseWidth: 'any'
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: 'any',
        valueCallback: function (index) {
          return index + 1;
        }
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: 'any'
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseDayPatterns,
        defaultParseWidth: 'any'
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: 'any',
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: 'any'
      })
    };
    var match$1 = match;

    /**
     * @type {Locale}
     * @category Locales
     * @summary Portuguese locale (Brazil).
     * @language Portuguese
     * @iso-639-2 por
     * @author Lucas Duailibe [@duailibe]{@link https://github.com/duailibe}
     * @author Yago Carballo [@yagocarballo]{@link https://github.com/YagoCarballo}
     */

    var locale = {
      code: 'pt-BR',
      formatDistance: formatDistance,
      formatLong: formatLong$1,
      formatRelative: formatRelative,
      localize: localize$1,
      match: match$1,
      options: {
        weekStartsOn: 0
        /* Sunday */
        ,
        firstWeekContainsDate: 1
      }
    };
    var pt_br = locale;

    /**
     * marked - a markdown parser
     * Copyright (c) 2011-2022, Christopher Jeffrey. (MIT Licensed)
     * https://github.com/markedjs/marked
     */

    /**
     * DO NOT EDIT THIS FILE
     * The code in this file is generated from files in ./src/
     */

    function getDefaults() {
      return {
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
      };
    }

    let defaults$2 = getDefaults();

    function changeDefaults(newDefaults) {
      defaults$2 = newDefaults;
    }

    /**
     * Helpers
     */
    const escapeTest = /[&<>"']/;
    const escapeReplace = /[&<>"']/g;
    const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    const escapeReplacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    const getEscapeReplacement = (ch) => escapeReplacements[ch];
    function escape$1(html, encode) {
      if (encode) {
        if (escapeTest.test(html)) {
          return html.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html)) {
          return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }

      return html;
    }

    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

    /**
     * @param {string} html
     */
    function unescape$1(html) {
      // explicitly match decimal, hex, and named HTML entities
      return html.replace(unescapeTest, (_, n) => {
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x'
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1));
        }
        return '';
      });
    }

    const caret = /(^|[^\[])\^/g;

    /**
     * @param {string | RegExp} regex
     * @param {string} opt
     */
    function edit(regex, opt) {
      regex = typeof regex === 'string' ? regex : regex.source;
      opt = opt || '';
      const obj = {
        replace: (name, val) => {
          val = val.source || val;
          val = val.replace(caret, '$1');
          regex = regex.replace(name, val);
          return obj;
        },
        getRegex: () => {
          return new RegExp(regex, opt);
        }
      };
      return obj;
    }

    const nonWordAndColonTest = /[^\w:]/g;
    const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

    /**
     * @param {boolean} sanitize
     * @param {string} base
     * @param {string} href
     */
    function cleanUrl(sanitize, base, href) {
      if (sanitize) {
        let prot;
        try {
          prot = decodeURIComponent(unescape$1(href))
            .replace(nonWordAndColonTest, '')
            .toLowerCase();
        } catch (e) {
          return null;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
          return null;
        }
      }
      if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
      }
      try {
        href = encodeURI(href).replace(/%25/g, '%');
      } catch (e) {
        return null;
      }
      return href;
    }

    const baseUrls = {};
    const justDomain = /^[^:]+:\/*[^/]*$/;
    const protocol = /^([^:]+:)[\s\S]*$/;
    const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

    /**
     * @param {string} base
     * @param {string} href
     */
    function resolveUrl(base, href) {
      if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (justDomain.test(base)) {
          baseUrls[' ' + base] = base + '/';
        } else {
          baseUrls[' ' + base] = rtrim(base, '/', true);
        }
      }
      base = baseUrls[' ' + base];
      const relativeBase = base.indexOf(':') === -1;

      if (href.substring(0, 2) === '//') {
        if (relativeBase) {
          return href;
        }
        return base.replace(protocol, '$1') + href;
      } else if (href.charAt(0) === '/') {
        if (relativeBase) {
          return href;
        }
        return base.replace(domain, '$1') + href;
      } else {
        return base + href;
      }
    }

    const noopTest = { exec: function noopTest() {} };

    function merge$1(obj) {
      let i = 1,
        target,
        key;

      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }

      return obj;
    }

    function splitCells(tableRow, count) {
      // ensure that every cell-delimiting pipe has a space
      // before it to distinguish it from an escaped pipe
      const row = tableRow.replace(/\|/g, (match, offset, str) => {
          let escaped = false,
            curr = offset;
          while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
          if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
          } else {
            // add space before unescaped |
            return ' |';
          }
        }),
        cells = row.split(/ \|/);
      let i = 0;

      // First/last cell in a row cannot be empty if it has no leading/trailing pipe
      if (!cells[0].trim()) { cells.shift(); }
      if (cells.length > 0 && !cells[cells.length - 1].trim()) { cells.pop(); }

      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push('');
      }

      for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
      }
      return cells;
    }

    /**
     * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
     * /c*$/ is vulnerable to REDOS.
     *
     * @param {string} str
     * @param {string} c
     * @param {boolean} invert Remove suffix of non-c chars instead. Default falsey.
     */
    function rtrim(str, c, invert) {
      const l = str.length;
      if (l === 0) {
        return '';
      }

      // Length of suffix matching the invert condition.
      let suffLen = 0;

      // Step left until we fail to match the invert condition.
      while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }

      return str.slice(0, l - suffLen);
    }

    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      const l = str.length;
      let level = 0,
        i = 0;
      for (; i < l; i++) {
        if (str[i] === '\\') {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
          }
        }
      }
      return -1;
    }

    function checkSanitizeDeprecation(opt) {
      if (opt && opt.sanitize && !opt.silent) {
        console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
      }
    }

    // copied from https://stackoverflow.com/a/5450113/806777
    /**
     * @param {string} pattern
     * @param {number} count
     */
    function repeatString(pattern, count) {
      if (count < 1) {
        return '';
      }
      let result = '';
      while (count > 1) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result + pattern;
    }

    function outputLink(cap, link, raw, lexer) {
      const href = link.href;
      const title = link.title ? escape$1(link.title) : null;
      const text = cap[1].replace(/\\([\[\]])/g, '$1');

      if (cap[0].charAt(0) !== '!') {
        lexer.state.inLink = true;
        const token = {
          type: 'link',
          raw,
          href,
          title,
          text,
          tokens: lexer.inlineTokens(text, [])
        };
        lexer.state.inLink = false;
        return token;
      }
      return {
        type: 'image',
        raw,
        href,
        title,
        text: escape$1(text)
      };
    }

    function indentCodeCompensation(raw, text) {
      const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

      if (matchIndentToCode === null) {
        return text;
      }

      const indentToCode = matchIndentToCode[1];

      return text
        .split('\n')
        .map(node => {
          const matchIndentInNode = node.match(/^\s+/);
          if (matchIndentInNode === null) {
            return node;
          }

          const [indentInNode] = matchIndentInNode;

          if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
          }

          return node;
        })
        .join('\n');
    }

    /**
     * Tokenizer
     */
    class Tokenizer {
      constructor(options) {
        this.options = options || defaults$2;
      }

      space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }
      }

      code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ {1,4}/gm, '');
          return {
            type: 'code',
            raw: cap[0],
            codeBlockStyle: 'indented',
            text: !this.options.pedantic
              ? rtrim(text, '\n')
              : text
          };
        }
      }

      fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
          const raw = cap[0];
          const text = indentCodeCompensation(raw, cap[3] || '');

          return {
            type: 'code',
            raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text
          };
        }
      }

      heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
          let text = cap[2].trim();

          // remove trailing #s
          if (/#$/.test(text)) {
            const trimmed = rtrim(text, '#');
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              // CommonMark requires space before trailing #s
              text = trimmed.trim();
            }
          }

          const token = {
            type: 'heading',
            raw: cap[0],
            depth: cap[1].length,
            text,
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }

      hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: 'hr',
            raw: cap[0]
          };
        }
      }

      blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ *>[ \t]?/gm, '');

          return {
            type: 'blockquote',
            raw: cap[0],
            tokens: this.lexer.blockTokens(text, []),
            text
          };
        }
      }

      list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
          let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine,
            line, nextLine, rawLine, itemContents, endEarly;

          let bull = cap[1].trim();
          const isordered = bull.length > 1;

          const list = {
            type: 'list',
            raw: '',
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : '',
            loose: false,
            items: []
          };

          bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;

          if (this.options.pedantic) {
            bull = isordered ? bull : '[*+-]';
          }

          // Get next list item
          const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);

          // Check if current bullet point can start a new List Item
          while (src) {
            endEarly = false;
            if (!(cap = itemRegex.exec(src))) {
              break;
            }

            if (this.rules.block.hr.test(src)) { // End list if bullet was actually HR (possibly move into itemRegex?)
              break;
            }

            raw = cap[0];
            src = src.substring(raw.length);

            line = cap[2].split('\n', 1)[0];
            nextLine = src.split('\n', 1)[0];

            if (this.options.pedantic) {
              indent = 2;
              itemContents = line.trimLeft();
            } else {
              indent = cap[2].search(/[^ ]/); // Find first non-space char
              indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
              itemContents = line.slice(indent);
              indent += cap[1].length;
            }

            blankLine = false;

            if (!line && /^ *$/.test(nextLine)) { // Items begin with at most one blank line
              raw += nextLine + '\n';
              src = src.substring(nextLine.length + 1);
              endEarly = true;
            }

            if (!endEarly) {
              const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`);
              const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);

              // Check if following lines should be included in List Item
              while (src) {
                rawLine = src.split('\n', 1)[0];
                line = rawLine;

                // Re-align to follow commonmark nesting rules
                if (this.options.pedantic) {
                  line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
                }

                // End list item if found start of new bullet
                if (nextBulletRegex.test(line)) {
                  break;
                }

                // Horizontal rule found
                if (hrRegex.test(src)) {
                  break;
                }

                if (line.search(/[^ ]/) >= indent || !line.trim()) { // Dedent if possible
                  itemContents += '\n' + line.slice(indent);
                } else if (!blankLine) { // Until blank line, item doesn't need indentation
                  itemContents += '\n' + line;
                } else { // Otherwise, improper indentation ends this item
                  break;
                }

                if (!blankLine && !line.trim()) { // Check if current line is blank
                  blankLine = true;
                }

                raw += rawLine + '\n';
                src = src.substring(rawLine.length + 1);
              }
            }

            if (!list.loose) {
              // If the previous item ended with a blank line, the list is loose
              if (endsWithBlankLine) {
                list.loose = true;
              } else if (/\n *\n *$/.test(raw)) {
                endsWithBlankLine = true;
              }
            }

            // Check for task list items
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.exec(itemContents);
              if (istask) {
                ischecked = istask[0] !== '[ ] ';
                itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
              }
            }

            list.items.push({
              type: 'list_item',
              raw,
              task: !!istask,
              checked: ischecked,
              loose: false,
              text: itemContents
            });

            list.raw += raw;
          }

          // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
          list.items[list.items.length - 1].raw = raw.trimRight();
          list.items[list.items.length - 1].text = itemContents.trimRight();
          list.raw = list.raw.trimRight();

          const l = list.items.length;

          // Item child tokens handled here at end because we needed to have the final item to trim it first
          for (i = 0; i < l; i++) {
            this.lexer.state.top = false;
            list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
            const spacers = list.items[i].tokens.filter(t => t.type === 'space');
            const hasMultipleLineBreaks = spacers.every(t => {
              const chars = t.raw.split('');
              let lineBreaks = 0;
              for (const char of chars) {
                if (char === '\n') {
                  lineBreaks += 1;
                }
                if (lineBreaks > 1) {
                  return true;
                }
              }

              return false;
            });

            if (!list.loose && spacers.length && hasMultipleLineBreaks) {
              // Having a single line break doesn't mean a list is loose. A single line break is terminating the last list item
              list.loose = true;
              list.items[i].loose = true;
            }
          }

          return list;
        }
      }

      html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
          const token = {
            type: 'html',
            raw: cap[0],
            pre: !this.options.sanitizer
              && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: cap[0]
          };
          if (this.options.sanitize) {
            token.type = 'paragraph';
            token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0]);
            token.tokens = [];
            this.lexer.inline(token.text, token.tokens);
          }
          return token;
        }
      }

      def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
          if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
          const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
          return {
            type: 'def',
            tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      }

      table(src) {
        const cap = this.rules.block.table.exec(src);
        if (cap) {
          const item = {
            type: 'table',
            header: splitCells(cap[1]).map(c => { return { text: c }; }),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : []
          };

          if (item.header.length === item.align.length) {
            item.raw = cap[0];

            let l = item.align.length;
            let i, j, k, row;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            l = item.rows.length;
            for (i = 0; i < l; i++) {
              item.rows[i] = splitCells(item.rows[i], item.header.length).map(c => { return { text: c }; });
            }

            // parse child tokens inside headers and cells

            // header child tokens
            l = item.header.length;
            for (j = 0; j < l; j++) {
              item.header[j].tokens = [];
              this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
            }

            // cell child tokens
            l = item.rows.length;
            for (j = 0; j < l; j++) {
              row = item.rows[j];
              for (k = 0; k < row.length; k++) {
                row[k].tokens = [];
                this.lexer.inlineTokens(row[k].text, row[k].tokens);
              }
            }

            return item;
          }
        }
      }

      lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
          const token = {
            type: 'heading',
            raw: cap[0],
            depth: cap[2].charAt(0) === '=' ? 1 : 2,
            text: cap[1],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }

      paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          const token = {
            type: 'paragraph',
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === '\n'
              ? cap[1].slice(0, -1)
              : cap[1],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }

      text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
          const token = {
            type: 'text',
            raw: cap[0],
            text: cap[0],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }

      escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: 'escape',
            raw: cap[0],
            text: escape$1(cap[1])
          };
        }
      }

      tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
            this.lexer.state.inLink = true;
          } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
            this.lexer.state.inLink = false;
          }
          if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = true;
          } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = false;
          }

          return {
            type: this.options.sanitize
              ? 'text'
              : 'html',
            raw: cap[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize
              ? (this.options.sanitizer
                ? this.options.sanitizer(cap[0])
                : escape$1(cap[0]))
              : cap[0]
          };
        }
      }

      link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
          const trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            // commonmark requires matching angle brackets
            if (!(/>$/.test(trimmedUrl))) {
              return;
            }

            // ending angle bracket cannot be escaped
            const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            // find closing parenthesis
            const lastParenIndex = findClosingBracket(cap[2], '()');
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf('!') === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = '';
            }
          }
          let href = cap[2];
          let title = '';
          if (this.options.pedantic) {
            // split pedantic href and title
            const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

            if (link) {
              href = link[1];
              title = link[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : '';
          }

          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
              // pedantic allows starting angle bracket without ending angle bracket
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
            title: title ? title.replace(this.rules.inline._escapes, '$1') : title
          }, cap[0], this.lexer);
        }
      }

      reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src))
            || (cap = this.rules.inline.nolink.exec(src))) {
          let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = links[link.toLowerCase()];
          if (!link || !link.href) {
            const text = cap[0].charAt(0);
            return {
              type: 'text',
              raw: text,
              text
            };
          }
          return outputLink(cap, link, cap[0], this.lexer);
        }
      }

      emStrong(src, maskedSrc, prevChar = '') {
        let match = this.rules.inline.emStrong.lDelim.exec(src);
        if (!match) return;

        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;

        const nextChar = match[1] || match[2] || '';

        if (!nextChar || (nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          const lLength = match[0].length - 1;
          let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;

          const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
          endReg.lastIndex = 0;

          // Clip maskedSrc to same section of string as src (move to lexer?)
          maskedSrc = maskedSrc.slice(-1 * src.length + lLength);

          while ((match = endReg.exec(maskedSrc)) != null) {
            rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];

            if (!rDelim) continue; // skip single * in __abc*abc__

            rLength = rDelim.length;

            if (match[3] || match[4]) { // found another Left Delim
              delimTotal += rLength;
              continue;
            } else if (match[5] || match[6]) { // either Left or Right Delim
              if (lLength % 3 && !((lLength + rLength) % 3)) {
                midDelimTotal += rLength;
                continue; // CommonMark Emphasis Rules 9-10
              }
            }

            delimTotal -= rLength;

            if (delimTotal > 0) continue; // Haven't found enough closing delimiters

            // Remove extra characters. *a*** -> *a*
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);

            // Create `em` if smallest delimiter has odd char count. *a***
            if (Math.min(lLength, rLength) % 2) {
              const text = src.slice(1, lLength + match.index + rLength);
              return {
                type: 'em',
                raw: src.slice(0, lLength + match.index + rLength + 1),
                text,
                tokens: this.lexer.inlineTokens(text, [])
              };
            }

            // Create 'strong' if smallest delimiter has even char count. **a***
            const text = src.slice(2, lLength + match.index + rLength - 1);
            return {
              type: 'strong',
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text,
              tokens: this.lexer.inlineTokens(text, [])
            };
          }
        }
      }

      codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
          let text = cap[2].replace(/\n/g, ' ');
          const hasNonSpaceChars = /[^ ]/.test(text);
          const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = escape$1(text, true);
          return {
            type: 'codespan',
            raw: cap[0],
            text
          };
        }
      }

      br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: 'br',
            raw: cap[0]
          };
        }
      }

      del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: 'del',
            raw: cap[0],
            text: cap[2],
            tokens: this.lexer.inlineTokens(cap[2], [])
          };
        }
      }

      autolink(src, mangle) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          let text, href;
          if (cap[2] === '@') {
            text = escape$1(this.options.mangle ? mangle(cap[1]) : cap[1]);
            href = 'mailto:' + text;
          } else {
            text = escape$1(cap[1]);
            href = text;
          }

          return {
            type: 'link',
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: 'text',
                raw: text,
                text
              }
            ]
          };
        }
      }

      url(src, mangle) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
          let text, href;
          if (cap[2] === '@') {
            text = escape$1(this.options.mangle ? mangle(cap[0]) : cap[0]);
            href = 'mailto:' + text;
          } else {
            // do extended autolink path validation
            let prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text = escape$1(cap[0]);
            if (cap[1] === 'www.') {
              href = 'http://' + text;
            } else {
              href = text;
            }
          }
          return {
            type: 'link',
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: 'text',
                raw: text,
                text
              }
            ]
          };
        }
      }

      inlineText(src, smartypants) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
          let text;
          if (this.lexer.state.inRawBlock) {
            text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0];
          } else {
            text = escape$1(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
          }
          return {
            type: 'text',
            raw: cap[0],
            text
          };
        }
      }
    }

    /**
     * Block-Level Grammar
     */
    const block = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
      html: '^ {0,3}(?:' // optional indentation
        + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
        + '|comment[^\\n]*(\\n+|$)' // (2)
        + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
        + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
        + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
        + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
        + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
        + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
        + ')',
      def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
      table: noopTest,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
      text: /^[^\n]+/
    };

    block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit(block.def)
      .replace('label', block._label)
      .replace('title', block._title)
      .getRegex();

    block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block.listItemStart = edit(/^( *)(bull) */)
      .replace('bull', block.bullet)
      .getRegex();

    block.list = edit(block.list)
      .replace(/bull/g, block.bullet)
      .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
      .replace('def', '\\n+(?=' + block.def.source + ')')
      .getRegex();

    block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
      + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
      + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
      + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
      + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
      + '|track|ul';
    block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block.html = edit(block.html, 'i')
      .replace('comment', block._comment)
      .replace('tag', block._tag)
      .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
      .getRegex();

    block.paragraph = edit(block._paragraph)
      .replace('hr', block.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
      .replace('|table', '')
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
      .getRegex();

    block.blockquote = edit(block.blockquote)
      .replace('paragraph', block.paragraph)
      .getRegex();

    /**
     * Normal Block Grammar
     */

    block.normal = merge$1({}, block);

    /**
     * GFM Block Grammar
     */

    block.gfm = merge$1({}, block.normal, {
      table: '^ *([^\\n ].*\\|.*)\\n' // Header
        + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
        + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
    });

    block.gfm.table = edit(block.gfm.table)
      .replace('hr', block.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('blockquote', ' {0,3}>')
      .replace('code', ' {4}[^\\n]')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
      .getRegex();

    block.gfm.paragraph = edit(block._paragraph)
      .replace('hr', block.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
      .replace('table', block.gfm.table) // interrupt paragraphs with table
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
      .getRegex();
    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */

    block.pedantic = merge$1({}, block.normal, {
      html: edit(
        '^ *(?:comment *(?:\\n|\\s*$)'
        + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
        + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
        .replace('comment', block._comment)
        .replace(/tag/g, '(?!(?:'
          + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
          + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
          + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
        .getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest, // fences not supported
      paragraph: edit(block.normal._paragraph)
        .replace('hr', block.hr)
        .replace('heading', ' *#{1,6} *[^\n]')
        .replace('lheading', block.lheading)
        .replace('blockquote', ' {0,3}>')
        .replace('|fences', '')
        .replace('|list', '')
        .replace('|html', '')
        .getRegex()
    });

    /**
     * Inline-Level Grammar
     */
    const inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest,
      tag: '^comment'
        + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
        + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
        + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
        + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
        + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(ref)\]/,
      nolink: /^!?\[(ref)\](?:\[\])?/,
      reflinkSearch: 'reflink|nolink(?!\\()',
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
        //          () Skip orphan inside strong  () Consume to delim (1) #***                (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
        rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\spunctuation])/
    };

    // list of punctuation marks from CommonMark spec
    // without * and _ to handle the different emphasis markers * and _
    inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
    inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

    // sequences em should skip over [title](link), `code`, <html>
    inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
    inline.escapedEmSt = /\\\*|\\_/g;

    inline._comment = edit(block._comment).replace('(?:-->|$)', '-->').getRegex();

    inline.emStrong.lDelim = edit(inline.emStrong.lDelim)
      .replace(/punct/g, inline._punctuation)
      .getRegex();

    inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, 'g')
      .replace(/punct/g, inline._punctuation)
      .getRegex();

    inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, 'g')
      .replace(/punct/g, inline._punctuation)
      .getRegex();

    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit(inline.autolink)
      .replace('scheme', inline._scheme)
      .replace('email', inline._email)
      .getRegex();

    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

    inline.tag = edit(inline.tag)
      .replace('comment', inline._comment)
      .replace('attribute', inline._attribute)
      .getRegex();

    inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

    inline.link = edit(inline.link)
      .replace('label', inline._label)
      .replace('href', inline._href)
      .replace('title', inline._title)
      .getRegex();

    inline.reflink = edit(inline.reflink)
      .replace('label', inline._label)
      .replace('ref', block._label)
      .getRegex();

    inline.nolink = edit(inline.nolink)
      .replace('ref', block._label)
      .getRegex();

    inline.reflinkSearch = edit(inline.reflinkSearch, 'g')
      .replace('reflink', inline.reflink)
      .replace('nolink', inline.nolink)
      .getRegex();

    /**
     * Normal Inline Grammar
     */

    inline.normal = merge$1({}, inline);

    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge$1({}, inline.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', inline._label)
        .getRegex(),
      reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', inline._label)
        .getRegex()
    });

    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge$1({}, inline.normal, {
      escape: edit(inline.escape).replace('])', '~|])').getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    });

    inline.gfm.url = edit(inline.gfm.url, 'i')
      .replace('email', inline.gfm._extended_email)
      .getRegex();
    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge$1({}, inline.gfm, {
      br: edit(inline.br).replace('{2,}', '*').getRegex(),
      text: edit(inline.gfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex()
    });

    /**
     * smartypants text replacement
     * @param {string} text
     */
    function smartypants(text) {
      return text
        // em-dashes
        .replace(/---/g, '\u2014')
        // en-dashes
        .replace(/--/g, '\u2013')
        // opening singles
        .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
        // closing singles & apostrophes
        .replace(/'/g, '\u2019')
        // opening doubles
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
        // closing doubles
        .replace(/"/g, '\u201d')
        // ellipses
        .replace(/\.{3}/g, '\u2026');
    }

    /**
     * mangle email addresses
     * @param {string} text
     */
    function mangle(text) {
      let out = '',
        i,
        ch;

      const l = text.length;
      for (i = 0; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = 'x' + ch.toString(16);
        }
        out += '&#' + ch + ';';
      }

      return out;
    }

    /**
     * Block Lexer
     */
    class Lexer {
      constructor(options) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || defaults$2;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
          inLink: false,
          inRawBlock: false,
          top: true
        };

        const rules = {
          block: block.normal,
          inline: inline.normal
        };

        if (this.options.pedantic) {
          rules.block = block.pedantic;
          rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
          rules.block = block.gfm;
          if (this.options.breaks) {
            rules.inline = inline.breaks;
          } else {
            rules.inline = inline.gfm;
          }
        }
        this.tokenizer.rules = rules;
      }

      /**
       * Expose Rules
       */
      static get rules() {
        return {
          block,
          inline
        };
      }

      /**
       * Static Lex Method
       */
      static lex(src, options) {
        const lexer = new Lexer(options);
        return lexer.lex(src);
      }

      /**
       * Static Lex Inline Method
       */
      static lexInline(src, options) {
        const lexer = new Lexer(options);
        return lexer.inlineTokens(src);
      }

      /**
       * Preprocessing
       */
      lex(src) {
        src = src
          .replace(/\r\n|\r/g, '\n');

        this.blockTokens(src, this.tokens);

        let next;
        while (next = this.inlineQueue.shift()) {
          this.inlineTokens(next.src, next.tokens);
        }

        return this.tokens;
      }

      /**
       * Lexing
       */
      blockTokens(src, tokens = []) {
        if (this.options.pedantic) {
          src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
        } else {
          src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
            return leading + '    '.repeat(tabs.length);
          });
        }

        let token, lastToken, cutSrc, lastParagraphClipped;

        while (src) {
          if (this.options.extensions
            && this.options.extensions.block
            && this.options.extensions.block.some((extTokenizer) => {
              if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
            continue;
          }

          // newline
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.raw.length === 1 && tokens.length > 0) {
              // if there's a single \n as a spacer, it's terminating the last line,
              // so move it there so that we don't get unecessary paragraph tags
              tokens[tokens.length - 1].raw += '\n';
            } else {
              tokens.push(token);
            }
            continue;
          }

          // code
          if (token = this.tokenizer.code(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            // An indented code block cannot interrupt a paragraph.
            if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // fences
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // heading
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // hr
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // blockquote
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // list
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // html
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // def
          if (token = this.tokenizer.def(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.raw;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }

          // table (gfm)
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // lheading
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // top-level paragraph
          // prevent paragraph consuming extensions by clipping 'src' to extension start
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startBlock) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startBlock.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
            lastToken = tokens[tokens.length - 1];
            if (lastParagraphClipped && lastToken.type === 'paragraph') {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            lastParagraphClipped = (cutSrc.length !== src.length);
            src = src.substring(token.raw.length);
            continue;
          }

          // text
          if (token = this.tokenizer.text(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === 'text') {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          if (src) {
            const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        this.state.top = true;
        return tokens;
      }

      inline(src, tokens) {
        this.inlineQueue.push({ src, tokens });
      }

      /**
       * Lexing/Compiling
       */
      inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;

        // String with links masked to avoid interference with em and strong
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;

        // Mask out reflinks
        if (this.tokens.links) {
          const links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        // Mask out other blocks
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }

        // Mask out escaped em & strong delimiters
        while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        }

        while (src) {
          if (!keepPrevChar) {
            prevChar = '';
          }
          keepPrevChar = false;

          // extensions
          if (this.options.extensions
            && this.options.extensions.inline
            && this.options.extensions.inline.some((extTokenizer) => {
              if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
            continue;
          }

          // escape
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // tag
          if (token = this.tokenizer.tag(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === 'text' && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // link
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // reflink, nolink
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === 'text' && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // em & strong
          if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // code
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // br
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // del (gfm)
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // autolink
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // url (gfm)
          if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // text
          // prevent inlineText consuming extensions by clipping 'src' to extension start
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startInline) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startInline.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
            src = src.substring(token.raw.length);
            if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
              prevChar = token.raw.slice(-1);
            }
            keepPrevChar = true;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          if (src) {
            const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        return tokens;
      }
    }

    /**
     * Renderer
     */
    class Renderer {
      constructor(options) {
        this.options = options || defaults$2;
      }

      code(code, infostring, escaped) {
        const lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
          const out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }

        code = code.replace(/\n$/, '') + '\n';

        if (!lang) {
          return '<pre><code>'
            + (escaped ? code : escape$1(code, true))
            + '</code></pre>\n';
        }

        return '<pre><code class="'
          + this.options.langPrefix
          + escape$1(lang, true)
          + '">'
          + (escaped ? code : escape$1(code, true))
          + '</code></pre>\n';
      }

      /**
       * @param {string} quote
       */
      blockquote(quote) {
        return `<blockquote>\n${quote}</blockquote>\n`;
      }

      html(html) {
        return html;
      }

      /**
       * @param {string} text
       * @param {string} level
       * @param {string} raw
       * @param {any} slugger
       */
      heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          const id = this.options.headerPrefix + slugger.slug(raw);
          return `<h${level} id="${id}">${text}</h${level}>\n`;
        }

        // ignore IDs
        return `<h${level}>${text}</h${level}>\n`;
      }

      hr() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
      }

      list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      }

      /**
       * @param {string} text
       */
      listitem(text) {
        return `<li>${text}</li>\n`;
      }

      checkbox(checked) {
        return '<input '
          + (checked ? 'checked="" ' : '')
          + 'disabled="" type="checkbox"'
          + (this.options.xhtml ? ' /' : '')
          + '> ';
      }

      /**
       * @param {string} text
       */
      paragraph(text) {
        return `<p>${text}</p>\n`;
      }

      /**
       * @param {string} header
       * @param {string} body
       */
      table(header, body) {
        if (body) body = `<tbody>${body}</tbody>`;

        return '<table>\n'
          + '<thead>\n'
          + header
          + '</thead>\n'
          + body
          + '</table>\n';
      }

      /**
       * @param {string} content
       */
      tablerow(content) {
        return `<tr>\n${content}</tr>\n`;
      }

      tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
          ? `<${type} align="${flags.align}">`
          : `<${type}>`;
        return tag + content + `</${type}>\n`;
      }

      /**
       * span level renderer
       * @param {string} text
       */
      strong(text) {
        return `<strong>${text}</strong>`;
      }

      /**
       * @param {string} text
       */
      em(text) {
        return `<em>${text}</em>`;
      }

      /**
       * @param {string} text
       */
      codespan(text) {
        return `<code>${text}</code>`;
      }

      br() {
        return this.options.xhtml ? '<br/>' : '<br>';
      }

      /**
       * @param {string} text
       */
      del(text) {
        return `<del>${text}</del>`;
      }

      /**
       * @param {string} href
       * @param {string} title
       * @param {string} text
       */
      link(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        let out = '<a href="' + escape$1(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      }

      /**
       * @param {string} href
       * @param {string} title
       * @param {string} text
       */
      image(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }

        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
          out += ` title="${title}"`;
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
      }

      text(text) {
        return text;
      }
    }

    /**
     * TextRenderer
     * returns only the textual part of the token
     */
    class TextRenderer {
      // no need for block level renderers
      strong(text) {
        return text;
      }

      em(text) {
        return text;
      }

      codespan(text) {
        return text;
      }

      del(text) {
        return text;
      }

      html(text) {
        return text;
      }

      text(text) {
        return text;
      }

      link(href, title, text) {
        return '' + text;
      }

      image(href, title, text) {
        return '' + text;
      }

      br() {
        return '';
      }
    }

    /**
     * Slugger generates header id
     */
    class Slugger {
      constructor() {
        this.seen = {};
      }

      /**
       * @param {string} value
       */
      serialize(value) {
        return value
          .toLowerCase()
          .trim()
          // remove html tags
          .replace(/<[!\/a-z].*?>/ig, '')
          // remove unwanted chars
          .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
          .replace(/\s/g, '-');
      }

      /**
       * Finds the next safe (unique) slug to use
       * @param {string} originalSlug
       * @param {boolean} isDryRun
       */
      getNextSafeSlug(originalSlug, isDryRun) {
        let slug = originalSlug;
        let occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + '-' + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      }

      /**
       * Convert string to unique id
       * @param {object} [options]
       * @param {boolean} [options.dryrun] Generates the next unique slug without
       * updating the internal accumulator.
       */
      slug(value, options = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options.dryrun);
      }
    }

    /**
     * Parsing & Compiling
     */
    class Parser$1 {
      constructor(options) {
        this.options = options || defaults$2;
        this.options.renderer = this.options.renderer || new Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer();
        this.slugger = new Slugger();
      }

      /**
       * Static Parse Method
       */
      static parse(tokens, options) {
        const parser = new Parser$1(options);
        return parser.parse(tokens);
      }

      /**
       * Static Parse Inline Method
       */
      static parseInline(tokens, options) {
        const parser = new Parser$1(options);
        return parser.parseInline(tokens);
      }

      /**
       * Parse Loop
       */
      parse(tokens, top = true) {
        let out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox,
          ret;

        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];

          // Run any renderer extensions
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
              out += ret || '';
              continue;
            }
          }

          switch (token.type) {
            case 'space': {
              continue;
            }
            case 'hr': {
              out += this.renderer.hr();
              continue;
            }
            case 'heading': {
              out += this.renderer.heading(
                this.parseInline(token.tokens),
                token.depth,
                unescape$1(this.parseInline(token.tokens, this.textRenderer)),
                this.slugger);
              continue;
            }
            case 'code': {
              out += this.renderer.code(token.text,
                token.lang,
                token.escaped);
              continue;
            }
            case 'table': {
              header = '';

              // header
              cell = '';
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(
                  this.parseInline(token.header[j].tokens),
                  { header: true, align: token.align[j] }
                );
              }
              header += this.renderer.tablerow(cell);

              body = '';
              l2 = token.rows.length;
              for (j = 0; j < l2; j++) {
                row = token.rows[j];

                cell = '';
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(
                    this.parseInline(row[k].tokens),
                    { header: false, align: token.align[k] }
                  );
                }

                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
            case 'blockquote': {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
            case 'list': {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;

              body = '';
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;

                itemBody = '';
                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);
                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }
            case 'html': {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }
            case 'paragraph': {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
            case 'text': {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }

        return out;
      }

      /**
       * Parse Inline Tokens
       */
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = '',
          i,
          token,
          ret;

        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];

          // Run any renderer extensions
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
              out += ret || '';
              continue;
            }
          }

          switch (token.type) {
            case 'escape': {
              out += renderer.text(token.text);
              break;
            }
            case 'html': {
              out += renderer.html(token.text);
              break;
            }
            case 'link': {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
            case 'image': {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
            case 'strong': {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'em': {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'codespan': {
              out += renderer.codespan(token.text);
              break;
            }
            case 'br': {
              out += renderer.br();
              break;
            }
            case 'del': {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'text': {
              out += renderer.text(token.text);
              break;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
    }

    /**
     * Marked
     */
    function marked(src, opt, callback) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked(): input parameter is undefined or null');
      }
      if (typeof src !== 'string') {
        throw new Error('marked(): input parameter is of type '
          + Object.prototype.toString.call(src) + ', string expected');
      }

      if (typeof opt === 'function') {
        callback = opt;
        opt = null;
      }

      opt = merge$1({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);

      if (callback) {
        const highlight = opt.highlight;
        let tokens;

        try {
          tokens = Lexer.lex(src, opt);
        } catch (e) {
          return callback(e);
        }

        const done = function(err) {
          let out;

          if (!err) {
            try {
              if (opt.walkTokens) {
                marked.walkTokens(tokens, opt.walkTokens);
              }
              out = Parser$1.parse(tokens, opt);
            } catch (e) {
              err = e;
            }
          }

          opt.highlight = highlight;

          return err
            ? callback(err)
            : callback(null, out);
        };

        if (!highlight || highlight.length < 3) {
          return done();
        }

        delete opt.highlight;

        if (!tokens.length) return done();

        let pending = 0;
        marked.walkTokens(tokens, function(token) {
          if (token.type === 'code') {
            pending++;
            setTimeout(() => {
              highlight(token.text, token.lang, function(err, code) {
                if (err) {
                  return done(err);
                }
                if (code != null && code !== token.text) {
                  token.text = code;
                  token.escaped = true;
                }

                pending--;
                if (pending === 0) {
                  done();
                }
              });
            }, 0);
          }
        });

        if (pending === 0) {
          done();
        }

        return;
      }

      try {
        const tokens = Lexer.lex(src, opt);
        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }
        return Parser$1.parse(tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';
        if (opt.silent) {
          return '<p>An error occurred:</p><pre>'
            + escape$1(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    }

    /**
     * Options
     */

    marked.options =
    marked.setOptions = function(opt) {
      merge$1(marked.defaults, opt);
      changeDefaults(marked.defaults);
      return marked;
    };

    marked.getDefaults = getDefaults;

    marked.defaults = defaults$2;

    /**
     * Use Extension
     */

    marked.use = function(...args) {
      const opts = merge$1({}, ...args);
      const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
      let hasExtensions;

      args.forEach((pack) => {
        // ==-- Parse "addon" extensions --== //
        if (pack.extensions) {
          hasExtensions = true;
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error('extension name required');
            }
            if (ext.renderer) { // Renderer extensions
              const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
              if (prevRenderer) {
                // Replace extension with func to run new extension but fall back if false
                extensions.renderers[ext.name] = function(...args) {
                  let ret = ext.renderer.apply(this, args);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if (ext.tokenizer) { // Tokenizer Extensions
              if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              if (extensions[ext.level]) {
                extensions[ext.level].unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) { // Function to check for start of token
                if (ext.level === 'block') {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === 'inline') {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if (ext.childTokens) { // Child tokens to be visited by walkTokens
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
        }

        // ==-- Parse "overwrite" extensions --== //
        if (pack.renderer) {
          const renderer = marked.defaults.renderer || new Renderer();
          for (const prop in pack.renderer) {
            const prevRenderer = renderer[prop];
            // Replace renderer with func to run extension, but fall back if false
            renderer[prop] = (...args) => {
              let ret = pack.renderer[prop].apply(renderer, args);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args);
              }
              return ret;
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = marked.defaults.tokenizer || new Tokenizer();
          for (const prop in pack.tokenizer) {
            const prevTokenizer = tokenizer[prop];
            // Replace tokenizer with func to run extension, but fall back if false
            tokenizer[prop] = (...args) => {
              let ret = pack.tokenizer[prop].apply(tokenizer, args);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }

        // ==-- Parse WalkTokens extensions --== //
        if (pack.walkTokens) {
          const walkTokens = marked.defaults.walkTokens;
          opts.walkTokens = function(token) {
            pack.walkTokens.call(this, token);
            if (walkTokens) {
              walkTokens.call(this, token);
            }
          };
        }

        if (hasExtensions) {
          opts.extensions = extensions;
        }

        marked.setOptions(opts);
      });
    };

    /**
     * Run callback for every token
     */

    marked.walkTokens = function(tokens, callback) {
      for (const token of tokens) {
        callback.call(marked, token);
        switch (token.type) {
          case 'table': {
            for (const cell of token.header) {
              marked.walkTokens(cell.tokens, callback);
            }
            for (const row of token.rows) {
              for (const cell of row) {
                marked.walkTokens(cell.tokens, callback);
              }
            }
            break;
          }
          case 'list': {
            marked.walkTokens(token.items, callback);
            break;
          }
          default: {
            if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) { // Walk any extensions
              marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                marked.walkTokens(token[childTokens], callback);
              });
            } else if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
        }
      }
    };

    /**
     * Parse Inline
     * @param {string} src
     */
    marked.parseInline = function(src, opt) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked.parseInline(): input parameter is undefined or null');
      }
      if (typeof src !== 'string') {
        throw new Error('marked.parseInline(): input parameter is of type '
          + Object.prototype.toString.call(src) + ', string expected');
      }

      opt = merge$1({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);

      try {
        const tokens = Lexer.lexInline(src, opt);
        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }
        return Parser$1.parseInline(tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';
        if (opt.silent) {
          return '<p>An error occurred:</p><pre>'
            + escape$1(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    };

    /**
     * Expose
     */
    marked.Parser = Parser$1;
    marked.parser = Parser$1.parse;
    marked.Renderer = Renderer;
    marked.TextRenderer = TextRenderer;
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    marked.Tokenizer = Tokenizer;
    marked.Slugger = Slugger;
    marked.parse = marked;
    Parser$1.parse;
    Lexer.lex;

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */

    var purify = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, (function () {
      function _typeof(obj) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;

        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }

      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          };
        }

        return _construct.apply(null, arguments);
      }

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }

      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }

      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
      }

      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var hasOwnProperty = Object.hasOwnProperty,
          setPrototypeOf = Object.setPrototypeOf,
          isFrozen = Object.isFrozen,
          getPrototypeOf = Object.getPrototypeOf,
          getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var freeze = Object.freeze,
          seal = Object.seal,
          create = Object.create; // eslint-disable-line import/no-mutable-exports

      var _ref = typeof Reflect !== 'undefined' && Reflect,
          apply = _ref.apply,
          construct = _ref.construct;

      if (!apply) {
        apply = function apply(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }

      if (!freeze) {
        freeze = function freeze(x) {
          return x;
        };
      }

      if (!seal) {
        seal = function seal(x) {
          return x;
        };
      }

      if (!construct) {
        construct = function construct(Func, args) {
          return _construct(Func, _toConsumableArray(args));
        };
      }

      var arrayForEach = unapply(Array.prototype.forEach);
      var arrayPop = unapply(Array.prototype.pop);
      var arrayPush = unapply(Array.prototype.push);
      var stringToLowerCase = unapply(String.prototype.toLowerCase);
      var stringMatch = unapply(String.prototype.match);
      var stringReplace = unapply(String.prototype.replace);
      var stringIndexOf = unapply(String.prototype.indexOf);
      var stringTrim = unapply(String.prototype.trim);
      var regExpTest = unapply(RegExp.prototype.test);
      var typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function (thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return construct(func, args);
        };
      }
      /* Add properties to a lookup table */

      function addToSet(set, array) {
        if (setPrototypeOf) {
          // Make 'in' and truthy checks like Boolean(set.constructor)
          // independent of any properties defined on Object.prototype.
          // Prevent prototype setters from intercepting set as a this value.
          setPrototypeOf(set, null);
        }

        var l = array.length;

        while (l--) {
          var element = array[l];

          if (typeof element === 'string') {
            var lcElement = stringToLowerCase(element);

            if (lcElement !== element) {
              // Config presets (e.g. tags.js, attrs.js) are immutable.
              if (!isFrozen(array)) {
                array[l] = lcElement;
              }

              element = lcElement;
            }
          }

          set[element] = true;
        }

        return set;
      }
      /* Shallow clone an object */

      function clone(object) {
        var newObject = create(null);
        var property;

        for (property in object) {
          if (apply(hasOwnProperty, object, [property])) {
            newObject[property] = object[property];
          }
        }

        return newObject;
      }
      /* IE10 doesn't support __lookupGetter__ so lets'
       * simulate it. It also automatically checks
       * if the prop is function or getter and behaves
       * accordingly. */

      function lookupGetter(object, prop) {
        while (object !== null) {
          var desc = getOwnPropertyDescriptor(object, prop);

          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }

            if (typeof desc.value === 'function') {
              return unapply(desc.value);
            }
          }

          object = getPrototypeOf(object);
        }

        function fallbackValue(element) {
          console.warn('fallback value for', element);
          return null;
        }

        return fallbackValue;
      }

      var html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

      var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
      var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
      // We still need to know them so that we can do namespace
      // checks properly in case one wants to add them to
      // allow-list.

      var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
      var mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']); // Similarly to SVG, we want to know all MathML elements,
      // even those that we disallow by default.

      var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
      var text = freeze(['#text']);

      var html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
      var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
      var mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
      var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

      var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

      var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
      );
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
      );
      var DOCTYPE_NAME = seal(/^html$/i);

      var getGlobal = function getGlobal() {
        return typeof window === 'undefined' ? null : window;
      };
      /**
       * Creates a no-op policy for internal use only.
       * Don't export this function outside this module!
       * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
       * @param {Document} document The document object (to determine policy name suffix)
       * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
       * are not supported).
       */


      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
        if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
          return null;
        } // Allow the callers to control the unique policy name
        // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
        // Policy creation with duplicate names throws in Trusted Types.


        var suffix = null;
        var ATTR_NAME = 'data-tt-policy-suffix';

        if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
          suffix = document.currentScript.getAttribute(ATTR_NAME);
        }

        var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML: function createHTML(html) {
              return html;
            }
          });
        } catch (_) {
          // Policy creation failed (most likely another DOMPurify script has
          // already run). Skip creating the policy, as this will only cause errors
          // if TT are enforced.
          console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
          return null;
        }
      };

      function createDOMPurify() {
        var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

        var DOMPurify = function DOMPurify(root) {
          return createDOMPurify(root);
        };
        /**
         * Version label, exposed for easier checks
         * if DOMPurify is up to date or not
         */


        DOMPurify.version = '2.3.8';
        /**
         * Array of elements that DOMPurify removed during sanitation.
         * Empty if nothing was removed.
         */

        DOMPurify.removed = [];

        if (!window || !window.document || window.document.nodeType !== 9) {
          // Not running in a browser, provide a factory function
          // so that you can pass your own Window
          DOMPurify.isSupported = false;
          return DOMPurify;
        }

        var originalDocument = window.document;
        var document = window.document;
        var DocumentFragment = window.DocumentFragment,
            HTMLTemplateElement = window.HTMLTemplateElement,
            Node = window.Node,
            Element = window.Element,
            NodeFilter = window.NodeFilter,
            _window$NamedNodeMap = window.NamedNodeMap,
            NamedNodeMap = _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
            HTMLFormElement = window.HTMLFormElement,
            DOMParser = window.DOMParser,
            trustedTypes = window.trustedTypes;
        var ElementPrototype = Element.prototype;
        var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
        var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
        var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
        var getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
        // new document created via createHTMLDocument. As per the spec
        // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
        // a new empty registry is used when creating a template contents owner
        // document, so we use that as our parent document to ensure nothing
        // is inherited.

        if (typeof HTMLTemplateElement === 'function') {
          var template = document.createElement('template');

          if (template.content && template.content.ownerDocument) {
            document = template.content.ownerDocument;
          }
        }

        var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

        var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
        var _document = document,
            implementation = _document.implementation,
            createNodeIterator = _document.createNodeIterator,
            createDocumentFragment = _document.createDocumentFragment,
            getElementsByTagName = _document.getElementsByTagName;
        var importNode = originalDocument.importNode;
        var documentMode = {};

        try {
          documentMode = clone(document).documentMode ? document.documentMode : {};
        } catch (_) {}

        var hooks = {};
        /**
         * Expose whether this browser supports running the full DOMPurify.
         */

        DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
        var MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
            ERB_EXPR$1 = ERB_EXPR,
            DATA_ATTR$1 = DATA_ATTR,
            ARIA_ATTR$1 = ARIA_ATTR,
            IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
            ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
        var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        /**
         * We consider the elements and attributes below to be safe. Ideally
         * don't add any new ones but feel free to remove unwanted ones.
         */

        /* allowed element names */

        var ALLOWED_TAGS = null;
        var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
        /* Allowed attribute names */

        var ALLOWED_ATTR = null;
        var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
        /*
         * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
         * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
         * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
         * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
         */

        var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

        var FORBID_TAGS = null;
        /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

        var FORBID_ATTR = null;
        /* Decide if ARIA attributes are okay */

        var ALLOW_ARIA_ATTR = true;
        /* Decide if custom data attributes are okay */

        var ALLOW_DATA_ATTR = true;
        /* Decide if unknown protocols are okay */

        var ALLOW_UNKNOWN_PROTOCOLS = false;
        /* Output should be safe for common template engines.
         * This means, DOMPurify removes data attributes, mustaches and ERB
         */

        var SAFE_FOR_TEMPLATES = false;
        /* Decide if document with <html>... should be returned */

        var WHOLE_DOCUMENT = false;
        /* Track whether config is already set on this instance of DOMPurify. */

        var SET_CONFIG = false;
        /* Decide if all elements (e.g. style, script) must be children of
         * document.body. By default, browsers might move them to document.head */

        var FORCE_BODY = false;
        /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
         * string (or a TrustedHTML object if Trusted Types are supported).
         * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
         */

        var RETURN_DOM = false;
        /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
         * string  (or a TrustedHTML object if Trusted Types are supported) */

        var RETURN_DOM_FRAGMENT = false;
        /* Try to return a Trusted Type object instead of a string, return a string in
         * case Trusted Types are not supported  */

        var RETURN_TRUSTED_TYPE = false;
        /* Output should be free from DOM clobbering attacks? */

        var SANITIZE_DOM = true;
        /* Keep element content when removing element? */

        var KEEP_CONTENT = true;
        /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
         * of importing it into a new Document and returning a sanitized copy */

        var IN_PLACE = false;
        /* Allow usage of profiles like html, svg and mathMl */

        var USE_PROFILES = {};
        /* Tags to ignore content of when KEEP_CONTENT is true */

        var FORBID_CONTENTS = null;
        var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
        /* Tags that are safe for data: URIs */

        var DATA_URI_TAGS = null;
        var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
        /* Attributes safe for values like "javascript:" */

        var URI_SAFE_ATTRIBUTES = null;
        var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
        var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
        /* Document namespace */

        var NAMESPACE = HTML_NAMESPACE;
        var IS_EMPTY_INPUT = false;
        /* Parsing of strict XHTML documents */

        var PARSER_MEDIA_TYPE;
        var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
        var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
        var transformCaseFunc;
        /* Keep a reference to config to pass to hooks */

        var CONFIG = null;
        /* Ideally, do not touch anything below this line */

        /* ______________________________________________ */

        var formElement = document.createElement('form');

        var isRegexOrFunction = function isRegexOrFunction(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        /**
         * _parseConfig
         *
         * @param  {Object} cfg optional config literal
         */
        // eslint-disable-next-line complexity


        var _parseConfig = function _parseConfig(cfg) {
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          /* Shield configuration object from tampering */


          if (!cfg || _typeof(cfg) !== 'object') {
            cfg = {};
          }
          /* Shield configuration object from prototype pollution */


          cfg = clone(cfg);
          /* Set configuration parameters */

          ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
          URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
          FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
          USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

          RETURN_DOM = cfg.RETURN_DOM || false; // Default false

          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

          FORCE_BODY = cfg.FORCE_BODY || false; // Default false

          SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

          KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

          IN_PLACE = cfg.IN_PLACE || false; // Default false

          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;

          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }

          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }

          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }

          PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
          SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

          transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? function (x) {
            return x;
          } : stringToLowerCase;

          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }

          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
          /* Parse profile info */


          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
            ALLOWED_ATTR = [];

            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }

            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }

            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }

            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          /* Merge configuration parameters */


          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }

            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
          }

          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }

            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
          }

          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
          }

          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone(FORBID_CONTENTS);
            }

            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
          }
          /* Add #text in case KEEP_CONTENT is set to true */


          if (KEEP_CONTENT) {
            ALLOWED_TAGS['#text'] = true;
          }
          /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
          }
          /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ['tbody']);
            delete FORBID_TAGS.tbody;
          } // Prevent further manipulation of configuration.
          // Not available in IE8, Safari 5, etc.


          if (freeze) {
            freeze(cfg);
          }

          CONFIG = cfg;
        };

        var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
        var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
        // namespace. We need to specify them explicitly
        // so that they don't get erroneously deleted from
        // HTML namespace.

        var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
        /* Keep track of all possible SVG and MathML tags
         * so that we can perform the namespace checks
         * correctly. */

        var ALL_SVG_TAGS = addToSet({}, svg$1);
        addToSet(ALL_SVG_TAGS, svgFilters);
        addToSet(ALL_SVG_TAGS, svgDisallowed);
        var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
        addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
        /**
         *
         *
         * @param  {Element} element a DOM element whose namespace is being checked
         * @returns {boolean} Return false if the element has a
         *  namespace that a spec-compliant parser would never
         *  return. Return true otherwise.
         */

        var _checkValidNamespace = function _checkValidNamespace(element) {
          var parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
          // can be null. We just simulate parent in this case.

          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: HTML_NAMESPACE,
              tagName: 'template'
            };
          }

          var tagName = stringToLowerCase(element.tagName);
          var parentTagName = stringToLowerCase(parent.tagName);

          if (element.namespaceURI === SVG_NAMESPACE) {
            // The only way to switch from HTML namespace to SVG
            // is via <svg>. If it happens via any other tag, then
            // it should be killed.
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === 'svg';
            } // The only way to switch from MathML to SVG is via
            // svg if parent is either <annotation-xml> or MathML
            // text integration points.


            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            } // We only allow elements that are defined in SVG
            // spec. All others are disallowed in SVG namespace.


            return Boolean(ALL_SVG_TAGS[tagName]);
          }

          if (element.namespaceURI === MATHML_NAMESPACE) {
            // The only way to switch from HTML namespace to MathML
            // is via <math>. If it happens via any other tag, then
            // it should be killed.
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === 'math';
            } // The only way to switch from SVG to MathML is via
            // <math> and HTML integration points


            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
            } // We only allow elements that are defined in MathML
            // spec. All others are disallowed in MathML namespace.


            return Boolean(ALL_MATHML_TAGS[tagName]);
          }

          if (element.namespaceURI === HTML_NAMESPACE) {
            // The only way to switch from SVG to HTML is via
            // HTML integration points, and from MathML to HTML
            // is via MathML text integration points
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }

            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            } // We disallow tags that are specific for MathML
            // or SVG and should never appear in HTML namespace


            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          } // The code should never reach this place (this means
          // that the element somehow got namespace that is not
          // HTML, SVG or MathML). Return false just in case.


          return false;
        };
        /**
         * _forceRemove
         *
         * @param  {Node} node a DOM node
         */


        var _forceRemove = function _forceRemove(node) {
          arrayPush(DOMPurify.removed, {
            element: node
          });

          try {
            // eslint-disable-next-line unicorn/prefer-dom-node-remove
            node.parentNode.removeChild(node);
          } catch (_) {
            try {
              node.outerHTML = emptyHTML;
            } catch (_) {
              node.remove();
            }
          }
        };
        /**
         * _removeAttribute
         *
         * @param  {String} name an Attribute name
         * @param  {Node} node a DOM node
         */


        var _removeAttribute = function _removeAttribute(name, node) {
          try {
            arrayPush(DOMPurify.removed, {
              attribute: node.getAttributeNode(name),
              from: node
            });
          } catch (_) {
            arrayPush(DOMPurify.removed, {
              attribute: null,
              from: node
            });
          }

          node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

          if (name === 'is' && !ALLOWED_ATTR[name]) {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(node);
              } catch (_) {}
            } else {
              try {
                node.setAttribute(name, '');
              } catch (_) {}
            }
          }
        };
        /**
         * _initDocument
         *
         * @param  {String} dirty a string of dirty markup
         * @return {Document} a DOM, filled with the dirty markup
         */


        var _initDocument = function _initDocument(dirty) {
          /* Create a HTML document */
          var doc;
          var leadingWhitespace;

          if (FORCE_BODY) {
            dirty = '<remove></remove>' + dirty;
          } else {
            /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
            var matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }

          if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') {
            // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
          }

          var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          /*
           * Use the DOMParser API by default, fallback later if needs be
           * DOMParser not work for svg when has multiple root element.
           */

          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {}
          }
          /* Use createHTMLDocument in case DOMParser is not available */


          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, 'template', null);

            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload;
            } catch (_) {// Syntax error if dirtyPayload is invalid xml
            }
          }

          var body = doc.body || doc.documentElement;

          if (dirty && leadingWhitespace) {
            body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          /* Work on whole document or just its body */


          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
          }

          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        /**
         * _createIterator
         *
         * @param  {Document} root document/fragment to create iterator for
         * @return {Iterator} iterator instance
         */


        var _createIterator = function _createIterator(root) {
          return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
        };
        /**
         * _isClobbered
         *
         * @param  {Node} elm element to check for clobbering attacks
         * @return {Boolean} true if clobbered, false if safe
         */


        var _isClobbered = function _isClobbered(elm) {
          return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function');
        };
        /**
         * _isNode
         *
         * @param  {Node} obj object to check whether it's a DOM node
         * @return {Boolean} true is object is a DOM node
         */


        var _isNode = function _isNode(object) {
          return _typeof(Node) === 'object' ? object instanceof Node : object && _typeof(object) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
        };
        /**
         * _executeHook
         * Execute user configurable hooks
         *
         * @param  {String} entryPoint  Name of the hook's entry point
         * @param  {Node} currentNode node to work on with the hook
         * @param  {Object} data additional hook parameters
         */


        var _executeHook = function _executeHook(entryPoint, currentNode, data) {
          if (!hooks[entryPoint]) {
            return;
          }

          arrayForEach(hooks[entryPoint], function (hook) {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        };
        /**
         * _sanitizeElements
         *
         * @protect nodeName
         * @protect textContent
         * @protect removeChild
         *
         * @param   {Node} currentNode to check for permission to exist
         * @return  {Boolean} true if node was killed, false if left alive
         */


        var _sanitizeElements = function _sanitizeElements(currentNode) {
          var content;
          /* Execute a hook if present */

          _executeHook('beforeSanitizeElements', currentNode, null);
          /* Check if element is clobbered or can clobber */


          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);

            return true;
          }
          /* Check if tagname contains Unicode */


          if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
            _forceRemove(currentNode);

            return true;
          }
          /* Now let's check the element's type and name */


          var tagName = transformCaseFunc(currentNode.nodeName);
          /* Execute a hook if present */

          _executeHook('uponSanitizeElement', currentNode, {
            tagName: tagName,
            allowedTags: ALLOWED_TAGS
          });
          /* Detect mXSS attempts abusing namespace confusion */


          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);

            return true;
          }
          /* Mitigate a problem with templates inside select */


          if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);

            return true;
          }
          /* Remove element if anything forbids its presence */


          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            /* Check if we have a custom element to handle */
            if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
            }
            /* Keep content except for bad-listed elements */


            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              var parentNode = getParentNode(currentNode) || currentNode.parentNode;
              var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

              if (childNodes && parentNode) {
                var childCount = childNodes.length;

                for (var i = childCount - 1; i >= 0; --i) {
                  parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
                }
              }
            }

            _forceRemove(currentNode);

            return true;
          }
          /* Check whether element has a valid namespace */


          if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);

            return true;
          }

          if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);

            return true;
          }
          /* Sanitize element content to be template-safe */


          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
            /* Get the element's text content */
            content = currentNode.textContent;
            content = stringReplace(content, MUSTACHE_EXPR$1, ' ');
            content = stringReplace(content, ERB_EXPR$1, ' ');

            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          /* Execute a hook if present */


          _executeHook('afterSanitizeElements', currentNode, null);

          return false;
        };
        /**
         * _isValidAttribute
         *
         * @param  {string} lcTag Lowercase tag name of containing element.
         * @param  {string} lcName Lowercase attribute name.
         * @param  {string} value Attribute value.
         * @return {Boolean} Returns true if `value` is valid, otherwise false.
         */
        // eslint-disable-next-line complexity


        var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
          /* Make sure attribute cannot clobber */
          if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
            return false;
          }
          /* Allow valid data-* attributes: At least one character after "-"
              (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
              XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
              We don't need to check the value; it's always URI safe. */


          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
              return false;
            }
            /* Check value is safe. First, is attr inert? If so, is safe */

          } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (!value) ; else {
            return false;
          }

          return true;
        };
        /**
         * _basicCustomElementCheck
         * checks if at least one dash is included in tagName, and it's not the first char
         * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
         * @param {string} tagName name of the tag of the node to sanitize
         */


        var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
          return tagName.indexOf('-') > 0;
        };
        /**
         * _sanitizeAttributes
         *
         * @protect attributes
         * @protect nodeName
         * @protect removeAttribute
         * @protect setAttribute
         *
         * @param  {Node} currentNode to sanitize
         */


        var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
          var attr;
          var value;
          var lcName;
          var l;
          /* Execute a hook if present */

          _executeHook('beforeSanitizeAttributes', currentNode, null);

          var attributes = currentNode.attributes;
          /* Check if we have attributes; if not we might have a text node */

          if (!attributes) {
            return;
          }

          var hookEvent = {
            attrName: '',
            attrValue: '',
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR
          };
          l = attributes.length;
          /* Go backwards over all attributes; safely remove bad ones */

          while (l--) {
            attr = attributes[l];
            var _attr = attr,
                name = _attr.name,
                namespaceURI = _attr.namespaceURI;
            value = name === 'value' ? attr.value : stringTrim(attr.value);
            lcName = transformCaseFunc(name);
            /* Execute a hook if present */

            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

            _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

            value = hookEvent.attrValue;
            /* Did the hooks approve of the attribute? */

            if (hookEvent.forceKeepAttr) {
              continue;
            }
            /* Remove attribute */


            _removeAttribute(name, currentNode);
            /* Did the hooks approve of the attribute? */


            if (!hookEvent.keepAttr) {
              continue;
            }
            /* Work around a security issue in jQuery 3.0 */


            if (regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);

              continue;
            }
            /* Sanitize attribute content to be template-safe */


            if (SAFE_FOR_TEMPLATES) {
              value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
              value = stringReplace(value, ERB_EXPR$1, ' ');
            }
            /* Is `value` valid for this attribute? */


            var lcTag = transformCaseFunc(currentNode.nodeName);

            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            /* Handle invalid data-* attribute set by try-catching it */


            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
                currentNode.setAttribute(name, value);
              }

              arrayPop(DOMPurify.removed);
            } catch (_) {}
          }
          /* Execute a hook if present */


          _executeHook('afterSanitizeAttributes', currentNode, null);
        };
        /**
         * _sanitizeShadowDOM
         *
         * @param  {DocumentFragment} fragment to iterate over recursively
         */


        var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
          var shadowNode;

          var shadowIterator = _createIterator(fragment);
          /* Execute a hook if present */


          _executeHook('beforeSanitizeShadowDOM', fragment, null);

          while (shadowNode = shadowIterator.nextNode()) {
            /* Execute a hook if present */
            _executeHook('uponSanitizeShadowNode', shadowNode, null);
            /* Sanitize tags and elements */


            if (_sanitizeElements(shadowNode)) {
              continue;
            }
            /* Deep shadow DOM detected */


            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(shadowNode.content);
            }
            /* Check attributes, sanitize if necessary */


            _sanitizeAttributes(shadowNode);
          }
          /* Execute a hook if present */


          _executeHook('afterSanitizeShadowDOM', fragment, null);
        };
        /**
         * Sanitize
         * Public method providing core sanitation functionality
         *
         * @param {String|Node} dirty string or DOM node
         * @param {Object} configuration object
         */
        // eslint-disable-next-line complexity


        DOMPurify.sanitize = function (dirty, cfg) {
          var body;
          var importedNode;
          var currentNode;
          var oldNode;
          var returnNode;
          /* Make sure we have a string to sanitize.
            DO NOT return early, as this will return the wrong type if
            the user has requested a DOM object rather than a string */

          IS_EMPTY_INPUT = !dirty;

          if (IS_EMPTY_INPUT) {
            dirty = '<!-->';
          }
          /* Stringify, in case dirty is an object */


          if (typeof dirty !== 'string' && !_isNode(dirty)) {
            // eslint-disable-next-line no-negated-condition
            if (typeof dirty.toString !== 'function') {
              throw typeErrorCreate('toString is not a function');
            } else {
              dirty = dirty.toString();

              if (typeof dirty !== 'string') {
                throw typeErrorCreate('dirty is not a string, aborting');
              }
            }
          }
          /* Check we can run. Otherwise fall back or ignore */


          if (!DOMPurify.isSupported) {
            if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
              if (typeof dirty === 'string') {
                return window.toStaticHTML(dirty);
              }

              if (_isNode(dirty)) {
                return window.toStaticHTML(dirty.outerHTML);
              }
            }

            return dirty;
          }
          /* Assign config vars */


          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          /* Clean up removed elements */


          DOMPurify.removed = [];
          /* Check if dirty is correctly typed for IN_PLACE */

          if (typeof dirty === 'string') {
            IN_PLACE = false;
          }

          if (IN_PLACE) {
            /* Do some early pre-sanitization to avoid unsafe root nodes */
            if (dirty.nodeName) {
              var tagName = transformCaseFunc(dirty.nodeName);

              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
              }
            }
          } else if (dirty instanceof Node) {
            /* If dirty is a DOM element, append to an empty document to avoid
               elements being stripped by the parser */
            body = _initDocument('<!---->');
            importedNode = body.ownerDocument.importNode(dirty, true);

            if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
              /* Node is already a body, use as is */
              body = importedNode;
            } else if (importedNode.nodeName === 'HTML') {
              body = importedNode;
            } else {
              // eslint-disable-next-line unicorn/prefer-dom-node-append
              body.appendChild(importedNode);
            }
          } else {
            /* Exit directly if we have nothing to do */
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
            dirty.indexOf('<') === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            /* Initialize the document to work on */


            body = _initDocument(dirty);
            /* Check we have a DOM node from the data */

            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
            }
          }
          /* Remove first element node (ours) if FORCE_BODY is set */


          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          /* Get node iterator */


          var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
          /* Now start iterating over the created document */


          while (currentNode = nodeIterator.nextNode()) {
            /* Fix IE's strange behavior with manipulated textNodes #89 */
            if (currentNode.nodeType === 3 && currentNode === oldNode) {
              continue;
            }
            /* Sanitize tags and elements */


            if (_sanitizeElements(currentNode)) {
              continue;
            }
            /* Shadow DOM detected, sanitize it */


            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
            /* Check attributes, sanitize if necessary */


            _sanitizeAttributes(currentNode);

            oldNode = currentNode;
          }

          oldNode = null;
          /* If we sanitized `dirty` in-place, return it. */

          if (IN_PLACE) {
            return dirty;
          }
          /* Return sanitized string or DOM */


          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);

              while (body.firstChild) {
                // eslint-disable-next-line unicorn/prefer-dom-node-append
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }

            if (ALLOWED_ATTR.shadowroot) {
              /*
                AdoptNode() is not used because internal state is not reset
                (e.g. the past names map of a HTMLFormElement), this is safe
                in theory but we would rather not risk another attack vector.
                The state that is cloned by importNode() is explicitly defined
                by the specs.
              */
              returnNode = importNode.call(originalDocument, returnNode, true);
            }

            return returnNode;
          }

          var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          /* Serialize doctype if allowed */

          if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
          }
          /* Sanitize final string template-safe */


          if (SAFE_FOR_TEMPLATES) {
            serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ');
            serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ');
          }

          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        /**
         * Public method to set the configuration once
         * setConfig
         *
         * @param {Object} cfg configuration object
         */


        DOMPurify.setConfig = function (cfg) {
          _parseConfig(cfg);

          SET_CONFIG = true;
        };
        /**
         * Public method to remove the configuration
         * clearConfig
         *
         */


        DOMPurify.clearConfig = function () {
          CONFIG = null;
          SET_CONFIG = false;
        };
        /**
         * Public method to check if an attribute value is valid.
         * Uses last set config, if any. Otherwise, uses config defaults.
         * isValidAttribute
         *
         * @param  {string} tag Tag name of containing element.
         * @param  {string} attr Attribute name.
         * @param  {string} value Attribute value.
         * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
         */


        DOMPurify.isValidAttribute = function (tag, attr, value) {
          /* Initialize shared config vars if necessary. */
          if (!CONFIG) {
            _parseConfig({});
          }

          var lcTag = transformCaseFunc(tag);
          var lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        /**
         * AddHook
         * Public method to add DOMPurify hooks
         *
         * @param {String} entryPoint entry point for the hook to add
         * @param {Function} hookFunction function to execute
         */


        DOMPurify.addHook = function (entryPoint, hookFunction) {
          if (typeof hookFunction !== 'function') {
            return;
          }

          hooks[entryPoint] = hooks[entryPoint] || [];
          arrayPush(hooks[entryPoint], hookFunction);
        };
        /**
         * RemoveHook
         * Public method to remove a DOMPurify hook at a given entryPoint
         * (pops it from the stack of hooks if more are present)
         *
         * @param {String} entryPoint entry point for the hook to remove
         * @return {Function} removed(popped) hook
         */


        DOMPurify.removeHook = function (entryPoint) {
          if (hooks[entryPoint]) {
            return arrayPop(hooks[entryPoint]);
          }
        };
        /**
         * RemoveHooks
         * Public method to remove all DOMPurify hooks at a given entryPoint
         *
         * @param  {String} entryPoint entry point for the hooks to remove
         */


        DOMPurify.removeHooks = function (entryPoint) {
          if (hooks[entryPoint]) {
            hooks[entryPoint] = [];
          }
        };
        /**
         * RemoveAllHooks
         * Public method to remove all DOMPurify hooks
         *
         */


        DOMPurify.removeAllHooks = function () {
          hooks = {};
        };

        return DOMPurify;
      }

      var purify = createDOMPurify();

      return purify;

    }));

    });

    /* node_modules/svelte-lazy-image/LazyImage.svelte generated by Svelte v3.47.0 */
    const file$r = "node_modules/svelte-lazy-image/LazyImage.svelte";

    function create_fragment$x(ctx) {
    	let img;
    	let img_src_value;
    	let img_class_value;
    	let mounted;
    	let dispose;

    	let img_levels = [
    		{ src: img_src_value = /*path*/ ctx[2] },
    		{ alt: /*alt*/ ctx[0] },
    		/*$$restProps*/ ctx[6],
    		{
    			class: img_class_value = "svelte-lazy-image " + /*cssClass*/ ctx[4]
    		}
    	];

    	let img_data = {};

    	for (let i = 0; i < img_levels.length; i += 1) {
    		img_data = assign$2(img_data, img_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			img = element("img");
    			set_attributes(img, img_data);
    			toggle_class(img, "svelte-lazy-image--loaded", /*loaded*/ ctx[3]);
    			add_location(img, file$r, 63, 0, 1212);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			/*img_binding*/ ctx[11](img);

    			if (!mounted) {
    				dispose = listen_dev(img, "load", /*handleLoad*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(img, img_data = get_spread_update(img_levels, [
    				dirty & /*path*/ 4 && !src_url_equal(img.src, img_src_value = /*path*/ ctx[2]) && { src: img_src_value },
    				dirty & /*alt*/ 1 && { alt: /*alt*/ ctx[0] },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
    				dirty & /*cssClass*/ 16 && img_class_value !== (img_class_value = "svelte-lazy-image " + /*cssClass*/ ctx[4]) && { class: img_class_value }
    			]));

    			toggle_class(img, "svelte-lazy-image--loaded", /*loaded*/ ctx[3]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			/*img_binding*/ ctx[11](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let cssClass;
    	const omit_props_names = ["placeholder","src","alt","options"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LazyImage', slots, []);
    	let { placeholder } = $$props;
    	let { src } = $$props;
    	let { alt } = $$props;

    	let { options = {
    		root: null,
    		rootMargin: '0px 0px 0px 0px',
    		threshold: 0.0
    	} } = $$props;

    	let imgElement;
    	let path;
    	let observer;
    	let intersected = false;
    	let loaded = false;

    	onMount(() => {
    		observer = new IntersectionObserver((entries, self) => {
    				entries.forEach(entry => {
    					if (entry.isIntersecting) {
    						$$invalidate(10, intersected = true);
    						self.unobserve(imgElement);
    					}
    				});
    			},
    		options);

    		observer.observe(imgElement);

    		return () => {
    			if (observer) {
    				observer.unobserve(imgElement);
    			}
    		};
    	});

    	function handleLoad() {
    		if (!loaded && path === src) {
    			$$invalidate(3, loaded = true);
    		}
    	}

    	function img_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			imgElement = $$value;
    			$$invalidate(1, imgElement);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign$2(assign$2({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('placeholder' in $$new_props) $$invalidate(7, placeholder = $$new_props.placeholder);
    		if ('src' in $$new_props) $$invalidate(8, src = $$new_props.src);
    		if ('alt' in $$new_props) $$invalidate(0, alt = $$new_props.alt);
    		if ('options' in $$new_props) $$invalidate(9, options = $$new_props.options);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		placeholder,
    		src,
    		alt,
    		options,
    		imgElement,
    		path,
    		observer,
    		intersected,
    		loaded,
    		handleLoad,
    		cssClass
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign$2(assign$2({}, $$props), $$new_props));
    		if ('placeholder' in $$props) $$invalidate(7, placeholder = $$new_props.placeholder);
    		if ('src' in $$props) $$invalidate(8, src = $$new_props.src);
    		if ('alt' in $$props) $$invalidate(0, alt = $$new_props.alt);
    		if ('options' in $$props) $$invalidate(9, options = $$new_props.options);
    		if ('imgElement' in $$props) $$invalidate(1, imgElement = $$new_props.imgElement);
    		if ('path' in $$props) $$invalidate(2, path = $$new_props.path);
    		if ('observer' in $$props) observer = $$new_props.observer;
    		if ('intersected' in $$props) $$invalidate(10, intersected = $$new_props.intersected);
    		if ('loaded' in $$props) $$invalidate(3, loaded = $$new_props.loaded);
    		if ('cssClass' in $$props) $$invalidate(4, cssClass = $$new_props.cssClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*intersected, src, placeholder*/ 1408) {
    			$$invalidate(2, path = intersected ? src : placeholder);
    		}

    		$$invalidate(4, cssClass = $$props.class || '');
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		alt,
    		imgElement,
    		path,
    		loaded,
    		cssClass,
    		handleLoad,
    		$$restProps,
    		placeholder,
    		src,
    		options,
    		intersected,
    		img_binding
    	];
    }

    class LazyImage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {
    			placeholder: 7,
    			src: 8,
    			alt: 0,
    			options: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LazyImage",
    			options,
    			id: create_fragment$x.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*placeholder*/ ctx[7] === undefined && !('placeholder' in props)) {
    			console.warn("<LazyImage> was created without expected prop 'placeholder'");
    		}

    		if (/*src*/ ctx[8] === undefined && !('src' in props)) {
    			console.warn("<LazyImage> was created without expected prop 'src'");
    		}

    		if (/*alt*/ ctx[0] === undefined && !('alt' in props)) {
    			console.warn("<LazyImage> was created without expected prop 'alt'");
    		}
    	}

    	get placeholder() {
    		throw new Error("<LazyImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<LazyImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<LazyImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<LazyImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<LazyImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<LazyImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<LazyImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<LazyImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/post/Post.svelte generated by Svelte v3.47.0 */
    const file$q = "src/components/post/Post.svelte";

    // (45:8) <Link to="/post/{slug}">
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*title*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(45:8) <Link to=\\\"/post/{slug}\\\">",
    		ctx
    	});

    	return block;
    }

    // (51:11) <Link to="/post/{slug}#comments">
    function create_default_slot$3(ctx) {
    	let span;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("0");
    			t1 = text(" comentarios");
    			attr_dev(span, "data-cusdis-count-page-id", /*slug*/ ctx[1]);
    			add_location(span, file$q, 51, 12, 1482);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*slug*/ 2) {
    				attr_dev(span, "data-cusdis-count-page-id", /*slug*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(51:11) <Link to=\\\"/post/{slug}#comments\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let div4;
    	let div3;
    	let lazyimage;
    	let t0;
    	let div2;
    	let h3;
    	let link0;
    	let t1;
    	let div0;
    	let span0;
    	let t2;
    	let t3;
    	let span1;
    	let t4_value = /*readTime*/ ctx[5].minutes + "";
    	let t4;
    	let t5;
    	let span2;
    	let link1;
    	let t6;
    	let div1;
    	let t7_value = /*contentParsed*/ ctx[2].slice(0, 200) + "";
    	let t7;
    	let t8;
    	let t9;
    	let a;
    	let t10;
    	let a_href_value;
    	let current;

    	lazyimage = new LazyImage({
    			props: {
    				class: "mr-3 post-thumb d-none d-md-flex",
    				src: /*thumbnailUrl*/ ctx[4],
    				placeholder: "https://via.placeholder.com/250?text=TulioCalil",
    				alt: "image " + /*title*/ ctx[0]
    			},
    			$$inline: true
    		});

    	link0 = new Link$2({
    			props: {
    				to: "/post/" + /*slug*/ ctx[1],
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$2({
    			props: {
    				to: "/post/" + /*slug*/ ctx[1] + "#comments",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			create_component(lazyimage.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			h3 = element("h3");
    			create_component(link0.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			span0 = element("span");
    			t2 = text("Publicado ");
    			t3 = text(/*formatedDate*/ ctx[3]);
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = text(" min de leitura");
    			span2 = element("span");
    			create_component(link1.$$.fragment);
    			t6 = space();
    			div1 = element("div");
    			t7 = text(t7_value);
    			t8 = text("...");
    			t9 = space();
    			a = element("a");
    			t10 = text("Continue lendo →");
    			attr_dev(h3, "class", "title mb-1");
    			add_location(h3, file$q, 43, 6, 1153);
    			attr_dev(span0, "class", "date");
    			add_location(span0, file$q, 47, 8, 1274);
    			attr_dev(span1, "class", "time");
    			add_location(span1, file$q, 47, 58, 1324);
    			attr_dev(span2, "class", "comment");
    			add_location(span2, file$q, 49, 9, 1403);
    			attr_dev(div0, "class", "meta mb-1");
    			add_location(div0, file$q, 46, 6, 1242);
    			attr_dev(div1, "class", "intro");
    			add_location(div1, file$q, 55, 6, 1595);
    			attr_dev(a, "class", "more-link");
    			attr_dev(a, "href", a_href_value = "/post/" + /*slug*/ ctx[1]);
    			add_location(a, file$q, 58, 6, 1675);
    			attr_dev(div2, "class", "media-body");
    			add_location(div2, file$q, 42, 4, 1122);
    			attr_dev(div3, "class", "media");
    			add_location(div3, file$q, 34, 2, 909);
    			attr_dev(div4, "class", "item mb-5");
    			add_location(div4, file$q, 33, 0, 883);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			mount_component(lazyimage, div3, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, h3);
    			mount_component(link0, h3, null);
    			append_dev(div2, t1);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(div0, span1);
    			append_dev(span1, t4);
    			append_dev(span1, t5);
    			append_dev(div0, span2);
    			mount_component(link1, span2, null);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, t7);
    			append_dev(div1, t8);
    			append_dev(div2, t9);
    			append_dev(div2, a);
    			append_dev(a, t10);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const lazyimage_changes = {};
    			if (dirty & /*thumbnailUrl*/ 16) lazyimage_changes.src = /*thumbnailUrl*/ ctx[4];
    			if (dirty & /*title*/ 1) lazyimage_changes.alt = "image " + /*title*/ ctx[0];
    			lazyimage.$set(lazyimage_changes);
    			const link0_changes = {};
    			if (dirty & /*slug*/ 2) link0_changes.to = "/post/" + /*slug*/ ctx[1];

    			if (dirty & /*$$scope, title*/ 4097) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			if (!current || dirty & /*formatedDate*/ 8) set_data_dev(t3, /*formatedDate*/ ctx[3]);
    			if ((!current || dirty & /*readTime*/ 32) && t4_value !== (t4_value = /*readTime*/ ctx[5].minutes + "")) set_data_dev(t4, t4_value);
    			const link1_changes = {};
    			if (dirty & /*slug*/ 2) link1_changes.to = "/post/" + /*slug*/ ctx[1] + "#comments";

    			if (dirty & /*$$scope, slug*/ 4098) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			if ((!current || dirty & /*contentParsed*/ 4) && t7_value !== (t7_value = /*contentParsed*/ ctx[2].slice(0, 200) + "")) set_data_dev(t7, t7_value);

    			if (!current || dirty & /*slug*/ 2 && a_href_value !== (a_href_value = "/post/" + /*slug*/ ctx[1])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lazyimage.$$.fragment, local);
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lazyimage.$$.fragment, local);
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(lazyimage);
    			destroy_component(link0);
    			destroy_component(link1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let readTime;
    	let thumb;
    	let thumbnailUrl;
    	let formatedDate;
    	let html;
    	let contentParsed;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Post', slots, []);
    	let { title } = $$props;
    	let { slug } = $$props;
    	let { publishedAt } = $$props;
    	let { content = "" } = $$props;
    	let { cover } = $$props;
    	const api_url = "http://localhost:1337";
    	const writable_props = ['title', 'slug', 'publishedAt', 'content', 'cover'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Post> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
    		if ('publishedAt' in $$props) $$invalidate(6, publishedAt = $$props.publishedAt);
    		if ('content' in $$props) $$invalidate(7, content = $$props.content);
    		if ('cover' in $$props) $$invalidate(8, cover = $$props.cover);
    	};

    	$$self.$capture_state = () => ({
    		formatDistance: formatDistance$1,
    		readingTime,
    		Link: Link$2,
    		pt_br,
    		marked,
    		DOMPurify: purify,
    		LazyImage,
    		title,
    		slug,
    		publishedAt,
    		content,
    		cover,
    		api_url,
    		html,
    		contentParsed,
    		formatedDate,
    		thumb,
    		thumbnailUrl,
    		readTime
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
    		if ('publishedAt' in $$props) $$invalidate(6, publishedAt = $$props.publishedAt);
    		if ('content' in $$props) $$invalidate(7, content = $$props.content);
    		if ('cover' in $$props) $$invalidate(8, cover = $$props.cover);
    		if ('html' in $$props) $$invalidate(9, html = $$props.html);
    		if ('contentParsed' in $$props) $$invalidate(2, contentParsed = $$props.contentParsed);
    		if ('formatedDate' in $$props) $$invalidate(3, formatedDate = $$props.formatedDate);
    		if ('thumb' in $$props) $$invalidate(10, thumb = $$props.thumb);
    		if ('thumbnailUrl' in $$props) $$invalidate(4, thumbnailUrl = $$props.thumbnailUrl);
    		if ('readTime' in $$props) $$invalidate(5, readTime = $$props.readTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*content*/ 128) {
    			$$invalidate(5, readTime = readingTime(content, 100));
    		}

    		if ($$self.$$.dirty & /*cover*/ 256) {
    			$$invalidate(10, thumb = cover.data.attributes.formats.thumbnail.url);
    		}

    		if ($$self.$$.dirty & /*thumb*/ 1024) {
    			$$invalidate(4, thumbnailUrl = `${api_url}${thumb}`);
    		}

    		if ($$self.$$.dirty & /*publishedAt*/ 64) {
    			$$invalidate(3, formatedDate = formatDistance$1(new Date(publishedAt), new Date(), { addSuffix: true, locale: pt_br }));
    		}

    		if ($$self.$$.dirty & /*content*/ 128) {
    			$$invalidate(9, html = marked.parse(content));
    		}

    		if ($$self.$$.dirty & /*html*/ 512) {
    			$$invalidate(2, contentParsed = purify.sanitize(html, { USE_PROFILES: { html: false } }).replace("&nbsp;", " "));
    		}
    	};

    	return [
    		title,
    		slug,
    		contentParsed,
    		formatedDate,
    		thumbnailUrl,
    		readTime,
    		publishedAt,
    		content,
    		cover,
    		html,
    		thumb
    	];
    }

    class Post$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {
    			title: 0,
    			slug: 1,
    			publishedAt: 6,
    			content: 7,
    			cover: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Post",
    			options,
    			id: create_fragment$w.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Post> was created without expected prop 'title'");
    		}

    		if (/*slug*/ ctx[1] === undefined && !('slug' in props)) {
    			console.warn("<Post> was created without expected prop 'slug'");
    		}

    		if (/*publishedAt*/ ctx[6] === undefined && !('publishedAt' in props)) {
    			console.warn("<Post> was created without expected prop 'publishedAt'");
    		}

    		if (/*cover*/ ctx[8] === undefined && !('cover' in props)) {
    			console.warn("<Post> was created without expected prop 'cover'");
    		}
    	}

    	get title() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get slug() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get publishedAt() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set publishedAt(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cover() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cover(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/pagination/Pagination.svelte generated by Svelte v3.47.0 */
    const file$p = "src/components/pagination/Pagination.svelte";

    function create_fragment$v(ctx) {
    	let nav;
    	let button0;
    	let t0;
    	let i0;
    	let button0_class_value;
    	let t1;
    	let button1;
    	let t2;
    	let i1;
    	let button1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			button0 = element("button");
    			t0 = text("Anteriores");
    			i0 = element("i");
    			t1 = space();
    			button1 = element("button");
    			t2 = text("Proximos");
    			i1 = element("i");
    			attr_dev(i0, "class", "arrow-prev fas fa-long-arrow-alt-left");
    			add_location(i0, file$p, 18, 15, 560);
    			attr_dev(button0, "class", button0_class_value = "nav-link-prev nav-item nav-link rounded-left border-0 " + /*hasPreviusPosts*/ ctx[0]);
    			add_location(button0, file$p, 15, 2, 426);
    			attr_dev(i1, "class", "arrow-next fas fa-long-arrow-alt-right");
    			add_location(i1, file$p, 23, 13, 753);
    			attr_dev(button1, "class", button1_class_value = "nav-link-next nav-item nav-link rounded-right border-0 " + /*hasMorePosts*/ ctx[1]);
    			add_location(button1, file$p, 20, 2, 626);
    			attr_dev(nav, "class", "blog-nav nav nav-justified my-5");
    			add_location(nav, file$p, 14, 0, 378);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, button0);
    			append_dev(button0, t0);
    			append_dev(button0, i0);
    			append_dev(nav, t1);
    			append_dev(nav, button1);
    			append_dev(button1, t2);
    			append_dev(button1, i1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*previusPage*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", /*nextPage*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hasPreviusPosts*/ 1 && button0_class_value !== (button0_class_value = "nav-link-prev nav-item nav-link rounded-left border-0 " + /*hasPreviusPosts*/ ctx[0])) {
    				attr_dev(button0, "class", button0_class_value);
    			}

    			if (dirty & /*hasMorePosts*/ 2 && button1_class_value !== (button1_class_value = "nav-link-next nav-item nav-link rounded-right border-0 " + /*hasMorePosts*/ ctx[1])) {
    				attr_dev(button1, "class", button1_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let hasMorePosts;
    	let hasPreviusPosts;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Pagination', slots, []);
    	const dispatch = createEventDispatcher();
    	const nextPage = () => dispatch("next-page");
    	const previusPage = () => dispatch("previus-page");
    	let { page = 1 } = $$props;
    	let { totalPages = 1 } = $$props;
    	const writable_props = ['page', 'totalPages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pagination> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(4, page = $$props.page);
    		if ('totalPages' in $$props) $$invalidate(5, totalPages = $$props.totalPages);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		nextPage,
    		previusPage,
    		page,
    		totalPages,
    		hasPreviusPosts,
    		hasMorePosts
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(4, page = $$props.page);
    		if ('totalPages' in $$props) $$invalidate(5, totalPages = $$props.totalPages);
    		if ('hasPreviusPosts' in $$props) $$invalidate(0, hasPreviusPosts = $$props.hasPreviusPosts);
    		if ('hasMorePosts' in $$props) $$invalidate(1, hasMorePosts = $$props.hasMorePosts);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*page, totalPages*/ 48) {
    			$$invalidate(1, hasMorePosts = page === totalPages ? "d-none" : "");
    		}

    		if ($$self.$$.dirty & /*page*/ 16) {
    			$$invalidate(0, hasPreviusPosts = page <= 1 ? "d-none" : "");
    		}
    	};

    	return [hasPreviusPosts, hasMorePosts, nextPage, previusPage, page, totalPages];
    }

    class Pagination extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { page: 4, totalPages: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pagination",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get page() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get totalPages() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set totalPages(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/post-shimmer/PostShimmer.svelte generated by Svelte v3.47.0 */

    const file$o = "src/components/post-shimmer/PostShimmer.svelte";

    function create_fragment$u(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let box;
    	let t0;
    	let div1;
    	let lines0;
    	let t1;
    	let lines1;
    	let t2;
    	let lines2;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			box = element("box");
    			t0 = space();
    			div1 = element("div");
    			lines0 = element("lines");
    			t1 = space();
    			lines1 = element("lines");
    			t2 = space();
    			lines2 = element("lines");
    			attr_dev(box, "class", "shine");
    			add_location(box, file$o, 3, 6, 69);
    			attr_dev(div0, "class", "col-2");
    			add_location(div0, file$o, 2, 4, 43);
    			attr_dev(lines0, "class", "shine");
    			add_location(lines0, file$o, 6, 6, 130);
    			attr_dev(lines1, "class", "shine line-small");
    			add_location(lines1, file$o, 7, 6, 160);
    			attr_dev(lines2, "class", "shine line-big");
    			add_location(lines2, file$o, 8, 6, 201);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$o, 5, 4, 106);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$o, 1, 2, 21);
    			attr_dev(div3, "class", "mb-5");
    			add_location(div3, file$o, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, box);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, lines0);
    			append_dev(div1, t1);
    			append_dev(div1, lines1);
    			append_dev(div1, t2);
    			append_dev(div1, lines2);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PostShimmer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PostShimmer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class PostShimmer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PostShimmer",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    /* eslint complexity: [2, 18], max-statements: [2, 33] */
    var shams = function hasSymbols() {
    	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
    	if (typeof Symbol.iterator === 'symbol') { return true; }

    	var obj = {};
    	var sym = Symbol('test');
    	var symObj = Object(sym);
    	if (typeof sym === 'string') { return false; }

    	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
    	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

    	// temp disabled per https://github.com/ljharb/object.assign/issues/17
    	// if (sym instanceof Symbol) { return false; }
    	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    	// if (!(symObj instanceof Symbol)) { return false; }

    	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
    	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

    	var symVal = 42;
    	obj[sym] = symVal;
    	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

    	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

    	var syms = Object.getOwnPropertySymbols(obj);
    	if (syms.length !== 1 || syms[0] !== sym) { return false; }

    	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

    	if (typeof Object.getOwnPropertyDescriptor === 'function') {
    		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
    	}

    	return true;
    };

    var origSymbol = typeof Symbol !== 'undefined' && Symbol;


    var hasSymbols$1 = function hasNativeSymbols() {
    	if (typeof origSymbol !== 'function') { return false; }
    	if (typeof Symbol !== 'function') { return false; }
    	if (typeof origSymbol('foo') !== 'symbol') { return false; }
    	if (typeof Symbol('bar') !== 'symbol') { return false; }

    	return shams();
    };

    /* eslint no-invalid-this: 1 */

    var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
    var slice = Array.prototype.slice;
    var toStr$1 = Object.prototype.toString;
    var funcType = '[object Function]';

    var implementation = function bind(that) {
        var target = this;
        if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
            throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slice.call(arguments, 1);

        var bound;
        var binder = function () {
            if (this instanceof bound) {
                var result = target.apply(
                    this,
                    args.concat(slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;
            } else {
                return target.apply(
                    that,
                    args.concat(slice.call(arguments))
                );
            }
        };

        var boundLength = Math.max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

        if (target.prototype) {
            var Empty = function Empty() {};
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
        }

        return bound;
    };

    var functionBind = Function.prototype.bind || implementation;

    var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

    var undefined$1;

    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError$1 = TypeError;

    // eslint-disable-next-line consistent-return
    var getEvalledConstructor = function (expressionSyntax) {
    	try {
    		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
    	} catch (e) {}
    };

    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
    	try {
    		$gOPD({}, '');
    	} catch (e) {
    		$gOPD = null; // this is IE 8, which has a broken gOPD
    	}
    }

    var throwTypeError = function () {
    	throw new $TypeError$1();
    };
    var ThrowTypeError = $gOPD
    	? (function () {
    		try {
    			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    			arguments.callee; // IE 8 does not throw here
    			return throwTypeError;
    		} catch (calleeThrows) {
    			try {
    				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
    				return $gOPD(arguments, 'callee').get;
    			} catch (gOPDthrows) {
    				return throwTypeError;
    			}
    		}
    	}())
    	: throwTypeError;

    var hasSymbols = hasSymbols$1();

    var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

    var needsEval = {};

    var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

    var INTRINSICS = {
    	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
    	'%Array%': Array,
    	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
    	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
    	'%AsyncFromSyncIteratorPrototype%': undefined$1,
    	'%AsyncFunction%': needsEval,
    	'%AsyncGenerator%': needsEval,
    	'%AsyncGeneratorFunction%': needsEval,
    	'%AsyncIteratorPrototype%': needsEval,
    	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
    	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
    	'%Boolean%': Boolean,
    	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
    	'%Date%': Date,
    	'%decodeURI%': decodeURI,
    	'%decodeURIComponent%': decodeURIComponent,
    	'%encodeURI%': encodeURI,
    	'%encodeURIComponent%': encodeURIComponent,
    	'%Error%': Error,
    	'%eval%': eval, // eslint-disable-line no-eval
    	'%EvalError%': EvalError,
    	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
    	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
    	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
    	'%Function%': $Function,
    	'%GeneratorFunction%': needsEval,
    	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
    	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
    	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
    	'%isFinite%': isFinite,
    	'%isNaN%': isNaN,
    	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
    	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
    	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
    	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
    	'%Math%': Math,
    	'%Number%': Number,
    	'%Object%': Object,
    	'%parseFloat%': parseFloat,
    	'%parseInt%': parseInt,
    	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
    	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
    	'%RangeError%': RangeError,
    	'%ReferenceError%': ReferenceError,
    	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
    	'%RegExp%': RegExp,
    	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
    	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
    	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
    	'%String%': String,
    	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
    	'%Symbol%': hasSymbols ? Symbol : undefined$1,
    	'%SyntaxError%': $SyntaxError,
    	'%ThrowTypeError%': ThrowTypeError,
    	'%TypedArray%': TypedArray,
    	'%TypeError%': $TypeError$1,
    	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
    	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
    	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
    	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
    	'%URIError%': URIError,
    	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
    	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
    	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
    };

    var doEval = function doEval(name) {
    	var value;
    	if (name === '%AsyncFunction%') {
    		value = getEvalledConstructor('async function () {}');
    	} else if (name === '%GeneratorFunction%') {
    		value = getEvalledConstructor('function* () {}');
    	} else if (name === '%AsyncGeneratorFunction%') {
    		value = getEvalledConstructor('async function* () {}');
    	} else if (name === '%AsyncGenerator%') {
    		var fn = doEval('%AsyncGeneratorFunction%');
    		if (fn) {
    			value = fn.prototype;
    		}
    	} else if (name === '%AsyncIteratorPrototype%') {
    		var gen = doEval('%AsyncGenerator%');
    		if (gen) {
    			value = getProto(gen.prototype);
    		}
    	}

    	INTRINSICS[name] = value;

    	return value;
    };

    var LEGACY_ALIASES = {
    	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
    	'%ArrayPrototype%': ['Array', 'prototype'],
    	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
    	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
    	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
    	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
    	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
    	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
    	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
    	'%BooleanPrototype%': ['Boolean', 'prototype'],
    	'%DataViewPrototype%': ['DataView', 'prototype'],
    	'%DatePrototype%': ['Date', 'prototype'],
    	'%ErrorPrototype%': ['Error', 'prototype'],
    	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
    	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
    	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
    	'%FunctionPrototype%': ['Function', 'prototype'],
    	'%Generator%': ['GeneratorFunction', 'prototype'],
    	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
    	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
    	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
    	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
    	'%JSONParse%': ['JSON', 'parse'],
    	'%JSONStringify%': ['JSON', 'stringify'],
    	'%MapPrototype%': ['Map', 'prototype'],
    	'%NumberPrototype%': ['Number', 'prototype'],
    	'%ObjectPrototype%': ['Object', 'prototype'],
    	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
    	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
    	'%PromisePrototype%': ['Promise', 'prototype'],
    	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
    	'%Promise_all%': ['Promise', 'all'],
    	'%Promise_reject%': ['Promise', 'reject'],
    	'%Promise_resolve%': ['Promise', 'resolve'],
    	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
    	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
    	'%RegExpPrototype%': ['RegExp', 'prototype'],
    	'%SetPrototype%': ['Set', 'prototype'],
    	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
    	'%StringPrototype%': ['String', 'prototype'],
    	'%SymbolPrototype%': ['Symbol', 'prototype'],
    	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
    	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
    	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
    	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
    	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
    	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
    	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
    	'%URIErrorPrototype%': ['URIError', 'prototype'],
    	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
    	'%WeakSetPrototype%': ['WeakSet', 'prototype']
    };



    var $concat$1 = functionBind.call(Function.call, Array.prototype.concat);
    var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
    var $replace$1 = functionBind.call(Function.call, String.prototype.replace);
    var $strSlice = functionBind.call(Function.call, String.prototype.slice);

    /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
    var stringToPath = function stringToPath(string) {
    	var first = $strSlice(string, 0, 1);
    	var last = $strSlice(string, -1);
    	if (first === '%' && last !== '%') {
    		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
    	} else if (last === '%' && first !== '%') {
    		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
    	}
    	var result = [];
    	$replace$1(string, rePropName, function (match, number, quote, subString) {
    		result[result.length] = quote ? $replace$1(subString, reEscapeChar, '$1') : number || match;
    	});
    	return result;
    };
    /* end adaptation */

    var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    	var intrinsicName = name;
    	var alias;
    	if (src(LEGACY_ALIASES, intrinsicName)) {
    		alias = LEGACY_ALIASES[intrinsicName];
    		intrinsicName = '%' + alias[0] + '%';
    	}

    	if (src(INTRINSICS, intrinsicName)) {
    		var value = INTRINSICS[intrinsicName];
    		if (value === needsEval) {
    			value = doEval(intrinsicName);
    		}
    		if (typeof value === 'undefined' && !allowMissing) {
    			throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    		}

    		return {
    			alias: alias,
    			name: intrinsicName,
    			value: value
    		};
    	}

    	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
    };

    var getIntrinsic = function GetIntrinsic(name, allowMissing) {
    	if (typeof name !== 'string' || name.length === 0) {
    		throw new $TypeError$1('intrinsic name must be a non-empty string');
    	}
    	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    		throw new $TypeError$1('"allowMissing" argument must be a boolean');
    	}

    	var parts = stringToPath(name);
    	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

    	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
    	var intrinsicRealName = intrinsic.name;
    	var value = intrinsic.value;
    	var skipFurtherCaching = false;

    	var alias = intrinsic.alias;
    	if (alias) {
    		intrinsicBaseName = alias[0];
    		$spliceApply(parts, $concat$1([0, 1], alias));
    	}

    	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    		var part = parts[i];
    		var first = $strSlice(part, 0, 1);
    		var last = $strSlice(part, -1);
    		if (
    			(
    				(first === '"' || first === "'" || first === '`')
    				|| (last === '"' || last === "'" || last === '`')
    			)
    			&& first !== last
    		) {
    			throw new $SyntaxError('property names with quotes must have matching quotes');
    		}
    		if (part === 'constructor' || !isOwn) {
    			skipFurtherCaching = true;
    		}

    		intrinsicBaseName += '.' + part;
    		intrinsicRealName = '%' + intrinsicBaseName + '%';

    		if (src(INTRINSICS, intrinsicRealName)) {
    			value = INTRINSICS[intrinsicRealName];
    		} else if (value != null) {
    			if (!(part in value)) {
    				if (!allowMissing) {
    					throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
    				}
    				return void undefined$1;
    			}
    			if ($gOPD && (i + 1) >= parts.length) {
    				var desc = $gOPD(value, part);
    				isOwn = !!desc;

    				// By convention, when a data property is converted to an accessor
    				// property to emulate a data property that does not suffer from
    				// the override mistake, that accessor's getter is marked with
    				// an `originalValue` property. Here, when we detect this, we
    				// uphold the illusion by pretending to see that original data
    				// property, i.e., returning the value rather than the getter
    				// itself.
    				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
    					value = desc.get;
    				} else {
    					value = value[part];
    				}
    			} else {
    				isOwn = src(value, part);
    				value = value[part];
    			}

    			if (isOwn && !skipFurtherCaching) {
    				INTRINSICS[intrinsicRealName] = value;
    			}
    		}
    	}
    	return value;
    };

    var callBind = createCommonjsModule(function (module) {




    var $apply = getIntrinsic('%Function.prototype.apply%');
    var $call = getIntrinsic('%Function.prototype.call%');
    var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

    var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
    var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
    var $max = getIntrinsic('%Math.max%');

    if ($defineProperty) {
    	try {
    		$defineProperty({}, 'a', { value: 1 });
    	} catch (e) {
    		// IE 8 has a broken defineProperty
    		$defineProperty = null;
    	}
    }

    module.exports = function callBind(originalFunction) {
    	var func = $reflectApply(functionBind, $call, arguments);
    	if ($gOPD && $defineProperty) {
    		var desc = $gOPD(func, 'length');
    		if (desc.configurable) {
    			// original length, plus the receiver, minus any additional arguments (after the receiver)
    			$defineProperty(
    				func,
    				'length',
    				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
    			);
    		}
    	}
    	return func;
    };

    var applyBind = function applyBind() {
    	return $reflectApply(functionBind, $apply, arguments);
    };

    if ($defineProperty) {
    	$defineProperty(module.exports, 'apply', { value: applyBind });
    } else {
    	module.exports.apply = applyBind;
    }
    });

    var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

    var callBound = function callBoundIntrinsic(name, allowMissing) {
    	var intrinsic = getIntrinsic(name, !!allowMissing);
    	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
    		return callBind(intrinsic);
    	}
    	return intrinsic;
    };

    var _nodeResolve_empty = {};

    var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': _nodeResolve_empty
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

    var hasMap = typeof Map === 'function' && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === 'function' && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
    // ie, `has-tostringtag/shams
    var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
        ? Symbol.toStringTag
        : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;

    var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
        [].__proto__ === Array.prototype // eslint-disable-line no-proto
            ? function (O) {
                return O.__proto__; // eslint-disable-line no-proto
            }
            : null
    );

    function addNumericSeparator(num, str) {
        if (
            num === Infinity
            || num === -Infinity
            || num !== num
            || (num && num > -1000 && num < 1000)
            || $test.call(/e/, str)
        ) {
            return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === 'number') {
            var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
            if (int !== num) {
                var intStr = String(int);
                var dec = $slice.call(str, intStr.length + 1);
                return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
            }
        }
        return $replace.call(str, sepRegex, '$&_');
    }

    var inspectCustom = require$$0.custom;
    var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

    var objectInspect = function inspect_(obj, options, depth, seen) {
        var opts = options || {};

        if (has$3(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
            throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (
            has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
                ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
                : opts.maxStringLength !== null
            )
        ) {
            throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;
        if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
            throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
        }

        if (
            has$3(opts, 'indent')
            && opts.indent !== null
            && opts.indent !== '\t'
            && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
        ) {
            throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has$3(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
            throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;

        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (obj === null) {
            return 'null';
        }
        if (typeof obj === 'boolean') {
            return obj ? 'true' : 'false';
        }

        if (typeof obj === 'string') {
            return inspectString(obj, opts);
        }
        if (typeof obj === 'number') {
            if (obj === 0) {
                return Infinity / obj > 0 ? '0' : '-0';
            }
            var str = String(obj);
            return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === 'bigint') {
            var bigIntStr = String(obj) + 'n';
            return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }

        var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
        if (typeof depth === 'undefined') { depth = 0; }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
            return isArray$3(obj) ? '[Array]' : '[Object]';
        }

        var indent = getIndent(opts, depth);

        if (typeof seen === 'undefined') {
            seen = [];
        } else if (indexOf(seen, obj) >= 0) {
            return '[Circular]';
        }

        function inspect(value, from, noIndent) {
            if (from) {
                seen = $arrSlice.call(seen);
                seen.push(from);
            }
            if (noIndent) {
                var newOpts = {
                    depth: opts.depth
                };
                if (has$3(opts, 'quoteStyle')) {
                    newOpts.quoteStyle = opts.quoteStyle;
                }
                return inspect_(value, newOpts, depth + 1, seen);
            }
            return inspect_(value, opts, depth + 1, seen);
        }

        if (typeof obj === 'function') {
            var name = nameOf(obj);
            var keys = arrObjKeys(obj, inspect);
            return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
        }
        if (isSymbol(obj)) {
            var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
            return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
            var s = '<' + $toLowerCase.call(String(obj.nodeName));
            var attrs = obj.attributes || [];
            for (var i = 0; i < attrs.length; i++) {
                s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
            }
            s += '>';
            if (obj.childNodes && obj.childNodes.length) { s += '...'; }
            s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
            return s;
        }
        if (isArray$3(obj)) {
            if (obj.length === 0) { return '[]'; }
            var xs = arrObjKeys(obj, inspect);
            if (indent && !singleLineValues(xs)) {
                return '[' + indentedJoin(xs, indent) + ']';
            }
            return '[ ' + $join.call(xs, ', ') + ' ]';
        }
        if (isError(obj)) {
            var parts = arrObjKeys(obj, inspect);
            if ('cause' in obj && !isEnumerable.call(obj, 'cause')) {
                return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
            }
            if (parts.length === 0) { return '[' + String(obj) + ']'; }
            return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
        }
        if (typeof obj === 'object' && customInspect) {
            if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
                return obj[inspectSymbol]();
            } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
                return obj.inspect();
            }
        }
        if (isMap(obj)) {
            var mapParts = [];
            mapForEach.call(obj, function (value, key) {
                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
            });
            return collectionOf('Map', mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
            var setParts = [];
            setForEach.call(obj, function (value) {
                setParts.push(inspect(value, obj));
            });
            return collectionOf('Set', setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
            return weakCollectionOf('WeakMap');
        }
        if (isWeakSet(obj)) {
            return weakCollectionOf('WeakSet');
        }
        if (isWeakRef(obj)) {
            return weakCollectionOf('WeakRef');
        }
        if (isNumber(obj)) {
            return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
            return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
            return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
            return markBoxed(inspect(String(obj)));
        }
        if (!isDate(obj) && !isRegExp$1(obj)) {
            var ys = arrObjKeys(obj, inspect);
            var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
            var protoTag = obj instanceof Object ? '' : 'null prototype';
            var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
            var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
            var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
            if (ys.length === 0) { return tag + '{}'; }
            if (indent) {
                return tag + '{' + indentedJoin(ys, indent) + '}';
            }
            return tag + '{ ' + $join.call(ys, ', ') + ' }';
        }
        return String(obj);
    };

    function wrapQuotes(s, defaultStyle, opts) {
        var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
        return quoteChar + s + quoteChar;
    }

    function quote(s) {
        return $replace.call(String(s), /"/g, '&quot;');
    }

    function isArray$3(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isRegExp$1(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
    function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

    // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
    function isSymbol(obj) {
        if (hasShammedSymbols) {
            return obj && typeof obj === 'object' && obj instanceof Symbol;
        }
        if (typeof obj === 'symbol') {
            return true;
        }
        if (!obj || typeof obj !== 'object' || !symToString) {
            return false;
        }
        try {
            symToString.call(obj);
            return true;
        } catch (e) {}
        return false;
    }

    function isBigInt(obj) {
        if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
            return false;
        }
        try {
            bigIntValueOf.call(obj);
            return true;
        } catch (e) {}
        return false;
    }

    var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
    function has$3(obj, key) {
        return hasOwn.call(obj, key);
    }

    function toStr(obj) {
        return objectToString.call(obj);
    }

    function nameOf(f) {
        if (f.name) { return f.name; }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) { return m[1]; }
        return null;
    }

    function indexOf(xs, x) {
        if (xs.indexOf) { return xs.indexOf(x); }
        for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x) { return i; }
        }
        return -1;
    }

    function isMap(x) {
        if (!mapSize || !x || typeof x !== 'object') {
            return false;
        }
        try {
            mapSize.call(x);
            try {
                setSize.call(x);
            } catch (s) {
                return true;
            }
            return x instanceof Map; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }

    function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakMapHas.call(x, weakMapHas);
            try {
                weakSetHas.call(x, weakSetHas);
            } catch (s) {
                return true;
            }
            return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }

    function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakRefDeref.call(x);
            return true;
        } catch (e) {}
        return false;
    }

    function isSet(x) {
        if (!setSize || !x || typeof x !== 'object') {
            return false;
        }
        try {
            setSize.call(x);
            try {
                mapSize.call(x);
            } catch (m) {
                return true;
            }
            return x instanceof Set; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }

    function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakSetHas.call(x, weakSetHas);
            try {
                weakMapHas.call(x, weakMapHas);
            } catch (s) {
                return true;
            }
            return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }

    function isElement(x) {
        if (!x || typeof x !== 'object') { return false; }
        if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
            return true;
        }
        return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
    }

    function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
            var remaining = str.length - opts.maxStringLength;
            var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
            return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        // eslint-disable-next-line no-control-regex
        var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, 'single', opts);
    }

    function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
            8: 'b',
            9: 't',
            10: 'n',
            12: 'f',
            13: 'r'
        }[n];
        if (x) { return '\\' + x; }
        return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
    }

    function markBoxed(str) {
        return 'Object(' + str + ')';
    }

    function weakCollectionOf(type) {
        return type + ' { ? }';
    }

    function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
        return type + ' (' + size + ') {' + joinedEntries + '}';
    }

    function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
            if (indexOf(xs[i], '\n') >= 0) {
                return false;
            }
        }
        return true;
    }

    function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === '\t') {
            baseIndent = '\t';
        } else if (typeof opts.indent === 'number' && opts.indent > 0) {
            baseIndent = $join.call(Array(opts.indent + 1), ' ');
        } else {
            return null;
        }
        return {
            base: baseIndent,
            prev: $join.call(Array(depth + 1), baseIndent)
        };
    }

    function indentedJoin(xs, indent) {
        if (xs.length === 0) { return ''; }
        var lineJoiner = '\n' + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
    }

    function arrObjKeys(obj, inspect) {
        var isArr = isArray$3(obj);
        var xs = [];
        if (isArr) {
            xs.length = obj.length;
            for (var i = 0; i < obj.length; i++) {
                xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
            }
        }
        var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
            symMap = {};
            for (var k = 0; k < syms.length; k++) {
                symMap['$' + syms[k]] = syms[k];
            }
        }

        for (var key in obj) { // eslint-disable-line no-restricted-syntax
            if (!has$3(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
            if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
            if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
                // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
                continue; // eslint-disable-line no-restricted-syntax, no-continue
            } else if ($test.call(/[^\w$]/, key)) {
                xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
            } else {
                xs.push(key + ': ' + inspect(obj[key], obj));
            }
        }
        if (typeof gOPS === 'function') {
            for (var j = 0; j < syms.length; j++) {
                if (isEnumerable.call(obj, syms[j])) {
                    xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
                }
            }
        }
        return xs;
    }

    var inspect = objectInspect;

    var $TypeError = getIntrinsic('%TypeError%');
    var $WeakMap = getIntrinsic('%WeakMap%', true);
    var $Map = getIntrinsic('%Map%', true);

    var $weakMapGet = callBound('WeakMap.prototype.get', true);
    var $weakMapSet = callBound('WeakMap.prototype.set', true);
    var $weakMapHas = callBound('WeakMap.prototype.has', true);
    var $mapGet = callBound('Map.prototype.get', true);
    var $mapSet = callBound('Map.prototype.set', true);
    var $mapHas = callBound('Map.prototype.has', true);

    /*
     * This function traverses the list returning the node corresponding to the
     * given key.
     *
     * That node is also moved to the head of the list, so that if it's accessed
     * again we don't need to traverse the whole list. By doing so, all the recently
     * used nodes can be accessed relatively quickly.
     */
    var listGetNode = function (list, key) { // eslint-disable-line consistent-return
    	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    		if (curr.key === key) {
    			prev.next = curr.next;
    			curr.next = list.next;
    			list.next = curr; // eslint-disable-line no-param-reassign
    			return curr;
    		}
    	}
    };

    var listGet = function (objects, key) {
    	var node = listGetNode(objects, key);
    	return node && node.value;
    };
    var listSet = function (objects, key, value) {
    	var node = listGetNode(objects, key);
    	if (node) {
    		node.value = value;
    	} else {
    		// Prepend the new node to the beginning of the list
    		objects.next = { // eslint-disable-line no-param-reassign
    			key: key,
    			next: objects.next,
    			value: value
    		};
    	}
    };
    var listHas = function (objects, key) {
    	return !!listGetNode(objects, key);
    };

    var sideChannel = function getSideChannel() {
    	var $wm;
    	var $m;
    	var $o;
    	var channel = {
    		assert: function (key) {
    			if (!channel.has(key)) {
    				throw new $TypeError('Side channel does not contain ' + inspect(key));
    			}
    		},
    		get: function (key) { // eslint-disable-line consistent-return
    			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
    				if ($wm) {
    					return $weakMapGet($wm, key);
    				}
    			} else if ($Map) {
    				if ($m) {
    					return $mapGet($m, key);
    				}
    			} else {
    				if ($o) { // eslint-disable-line no-lonely-if
    					return listGet($o, key);
    				}
    			}
    		},
    		has: function (key) {
    			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
    				if ($wm) {
    					return $weakMapHas($wm, key);
    				}
    			} else if ($Map) {
    				if ($m) {
    					return $mapHas($m, key);
    				}
    			} else {
    				if ($o) { // eslint-disable-line no-lonely-if
    					return listHas($o, key);
    				}
    			}
    			return false;
    		},
    		set: function (key, value) {
    			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
    				if (!$wm) {
    					$wm = new $WeakMap();
    				}
    				$weakMapSet($wm, key, value);
    			} else if ($Map) {
    				if (!$m) {
    					$m = new $Map();
    				}
    				$mapSet($m, key, value);
    			} else {
    				if (!$o) {
    					/*
    					 * Initialize the linked list as an empty node, so that we don't have
    					 * to special-case handling of the first node: we can always refer to
    					 * it as (previous node).next, instead of something like (list).head
    					 */
    					$o = { key: {}, next: null };
    				}
    				listSet($o, key, value);
    			}
    		}
    	};
    	return channel;
    };

    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;

    var Format = {
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986'
    };

    var formats = {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
    };

    var has$2 = Object.prototype.hasOwnProperty;
    var isArray$2 = Array.isArray;

    var hexTable = (function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
            array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
    }());

    var compactQueue = function compactQueue(queue) {
        while (queue.length > 1) {
            var item = queue.pop();
            var obj = item.obj[item.prop];

            if (isArray$2(obj)) {
                var compacted = [];

                for (var j = 0; j < obj.length; ++j) {
                    if (typeof obj[j] !== 'undefined') {
                        compacted.push(obj[j]);
                    }
                }

                item.obj[item.prop] = compacted;
            }
        }
    };

    var arrayToObject = function arrayToObject(source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== 'undefined') {
                obj[i] = source[i];
            }
        }

        return obj;
    };

    var merge = function merge(target, source, options) {
        /* eslint no-param-reassign: 0 */
        if (!source) {
            return target;
        }

        if (typeof source !== 'object') {
            if (isArray$2(target)) {
                target.push(source);
            } else if (target && typeof target === 'object') {
                if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                    target[source] = true;
                }
            } else {
                return [target, source];
            }

            return target;
        }

        if (!target || typeof target !== 'object') {
            return [target].concat(source);
        }

        var mergeTarget = target;
        if (isArray$2(target) && !isArray$2(source)) {
            mergeTarget = arrayToObject(target, options);
        }

        if (isArray$2(target) && isArray$2(source)) {
            source.forEach(function (item, i) {
                if (has$2.call(target, i)) {
                    var targetItem = target[i];
                    if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                        target[i] = merge(targetItem, item, options);
                    } else {
                        target.push(item);
                    }
                } else {
                    target[i] = item;
                }
            });
            return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
            var value = source[key];

            if (has$2.call(acc, key)) {
                acc[key] = merge(acc[key], value, options);
            } else {
                acc[key] = value;
            }
            return acc;
        }, mergeTarget);
    };

    var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function (acc, key) {
            acc[key] = source[key];
            return acc;
        }, target);
    };

    var decode = function (str, decoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
            // unescape never throws, no try...catch needed:
            return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        // utf-8
        try {
            return decodeURIComponent(strWithoutPlus);
        } catch (e) {
            return strWithoutPlus;
        }
    };

    var encode = function encode(str, defaultEncoder, charset, kind, format) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
            return str;
        }

        var string = str;
        if (typeof str === 'symbol') {
            string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== 'string') {
            string = String(str);
        }

        if (charset === 'iso-8859-1') {
            return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
                return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
            });
        }

        var out = '';
        for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i);

            if (
                c === 0x2D // -
                || c === 0x2E // .
                || c === 0x5F // _
                || c === 0x7E // ~
                || (c >= 0x30 && c <= 0x39) // 0-9
                || (c >= 0x41 && c <= 0x5A) // a-z
                || (c >= 0x61 && c <= 0x7A) // A-Z
                || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
            ) {
                out += string.charAt(i);
                continue;
            }

            if (c < 0x80) {
                out = out + hexTable[c];
                continue;
            }

            if (c < 0x800) {
                out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            i += 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
            /* eslint operator-linebreak: [2, "before"] */
            out += hexTable[0xF0 | (c >> 18)]
                + hexTable[0x80 | ((c >> 12) & 0x3F)]
                + hexTable[0x80 | ((c >> 6) & 0x3F)]
                + hexTable[0x80 | (c & 0x3F)];
        }

        return out;
    };

    var compact = function compact(value) {
        var queue = [{ obj: { o: value }, prop: 'o' }];
        var refs = [];

        for (var i = 0; i < queue.length; ++i) {
            var item = queue[i];
            var obj = item.obj[item.prop];

            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; ++j) {
                var key = keys[j];
                var val = obj[key];
                if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                    queue.push({ obj: obj, prop: key });
                    refs.push(val);
                }
            }
        }

        compactQueue(queue);

        return value;
    };

    var isRegExp = function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    };

    var isBuffer = function isBuffer(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };

    var combine = function combine(a, b) {
        return [].concat(a, b);
    };

    var maybeMap = function maybeMap(val, fn) {
        if (isArray$2(val)) {
            var mapped = [];
            for (var i = 0; i < val.length; i += 1) {
                mapped.push(fn(val[i]));
            }
            return mapped;
        }
        return fn(val);
    };

    var utils = {
        arrayToObject: arrayToObject,
        assign: assign,
        combine: combine,
        compact: compact,
        decode: decode,
        encode: encode,
        isBuffer: isBuffer,
        isRegExp: isRegExp,
        maybeMap: maybeMap,
        merge: merge
    };

    var has$1 = Object.prototype.hasOwnProperty;

    var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
            return prefix + '[]';
        },
        comma: 'comma',
        indices: function indices(prefix, key) {
            return prefix + '[' + key + ']';
        },
        repeat: function repeat(prefix) {
            return prefix;
        }
    };

    var isArray$1 = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function (arr, valueOrArray) {
        push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
    };

    var toISO = Date.prototype.toISOString;

    var defaultFormat = formats['default'];
    var defaults$1 = {
        addQueryPrefix: false,
        allowDots: false,
        charset: 'utf-8',
        charsetSentinel: false,
        delimiter: '&',
        encode: true,
        encoder: utils.encode,
        encodeValuesOnly: false,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
            return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
    };

    var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
        return typeof v === 'string'
            || typeof v === 'number'
            || typeof v === 'boolean'
            || typeof v === 'symbol'
            || typeof v === 'bigint';
    };

    var sentinel = {};

    var stringify = function stringify(
        object,
        prefix,
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        format,
        formatter,
        encodeValuesOnly,
        charset,
        sideChannel$1
    ) {
        var obj = object;

        var tmpSc = sideChannel$1;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
            // Where object last appeared in the ref tree
            var pos = tmpSc.get(object);
            step += 1;
            if (typeof pos !== 'undefined') {
                if (pos === step) {
                    throw new RangeError('Cyclic object value');
                } else {
                    findFlag = true; // Break while
                }
            }
            if (typeof tmpSc.get(sentinel) === 'undefined') {
                step = 0;
            }
        }

        if (typeof filter === 'function') {
            obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
            obj = serializeDate(obj);
        } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
            obj = utils.maybeMap(obj, function (value) {
                if (value instanceof Date) {
                    return serializeDate(value);
                }
                return value;
            });
        }

        if (obj === null) {
            if (strictNullHandling) {
                return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
            }

            obj = '';
        }

        if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
            if (encoder) {
                var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
                if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                    var valuesArray = split.call(String(obj), ',');
                    var valuesJoined = '';
                    for (var i = 0; i < valuesArray.length; ++i) {
                        valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults$1.encoder, charset, 'value', format));
                    }
                    return [formatter(keyValue) + '=' + valuesJoined];
                }
                return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
            }
            return [formatter(prefix) + '=' + formatter(String(obj))];
        }

        var values = [];

        if (typeof obj === 'undefined') {
            return values;
        }

        var objKeys;
        if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
            // we need to join elements in
            objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
        } else if (isArray$1(filter)) {
            objKeys = filter;
        } else {
            var keys = Object.keys(obj);
            objKeys = sort ? keys.sort(sort) : keys;
        }

        for (var j = 0; j < objKeys.length; ++j) {
            var key = objKeys[j];
            var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

            if (skipNulls && value === null) {
                continue;
            }

            var keyPrefix = isArray$1(obj)
                ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
                : prefix + (allowDots ? '.' + key : '[' + key + ']');

            sideChannel$1.set(object, step);
            var valueSideChannel = sideChannel();
            valueSideChannel.set(sentinel, sideChannel$1);
            pushToArray(values, stringify(
                value,
                keyPrefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                format,
                formatter,
                encodeValuesOnly,
                charset,
                valueSideChannel
            ));
        }

        return values;
    };

    var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
        if (!opts) {
            return defaults$1;
        }

        if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
            throw new TypeError('Encoder has to be a function.');
        }

        var charset = opts.charset || defaults$1.charset;
        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }

        var format = formats['default'];
        if (typeof opts.format !== 'undefined') {
            if (!has$1.call(formats.formatters, opts.format)) {
                throw new TypeError('Unknown format option provided.');
            }
            format = opts.format;
        }
        var formatter = formats.formatters[format];

        var filter = defaults$1.filter;
        if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
            filter = opts.filter;
        }

        return {
            addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
            allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
            delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
            encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
            encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
            encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
            filter: filter,
            format: format,
            formatter: formatter,
            serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
            skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
            sort: typeof opts.sort === 'function' ? opts.sort : null,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
        };
    };

    var stringify_1 = function (object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);

        var objKeys;
        var filter;

        if (typeof options.filter === 'function') {
            filter = options.filter;
            obj = filter('', obj);
        } else if (isArray$1(options.filter)) {
            filter = options.filter;
            objKeys = filter;
        }

        var keys = [];

        if (typeof obj !== 'object' || obj === null) {
            return '';
        }

        var arrayFormat;
        if (opts && opts.arrayFormat in arrayPrefixGenerators) {
            arrayFormat = opts.arrayFormat;
        } else if (opts && 'indices' in opts) {
            arrayFormat = opts.indices ? 'indices' : 'repeat';
        } else {
            arrayFormat = 'indices';
        }

        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

        if (!objKeys) {
            objKeys = Object.keys(obj);
        }

        if (options.sort) {
            objKeys.sort(options.sort);
        }

        var sideChannel$1 = sideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i];

            if (options.skipNulls && obj[key] === null) {
                continue;
            }
            pushToArray(keys, stringify(
                obj[key],
                key,
                generateArrayPrefix,
                options.strictNullHandling,
                options.skipNulls,
                options.encode ? options.encoder : null,
                options.filter,
                options.sort,
                options.allowDots,
                options.serializeDate,
                options.format,
                options.formatter,
                options.encodeValuesOnly,
                options.charset,
                sideChannel$1
            ));
        }

        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? '?' : '';

        if (options.charsetSentinel) {
            if (options.charset === 'iso-8859-1') {
                // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
                prefix += 'utf8=%26%2310003%3B&';
            } else {
                // encodeURIComponent('✓')
                prefix += 'utf8=%E2%9C%93&';
            }
        }

        return joined.length > 0 ? prefix + joined : '';
    };

    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;

    var defaults = {
        allowDots: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: 'utf-8',
        charsetSentinel: false,
        comma: false,
        decoder: utils.decode,
        delimiter: '&',
        depth: 5,
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1000,
        parseArrays: true,
        plainObjects: false,
        strictNullHandling: false
    };

    var interpretNumericEntities = function (str) {
        return str.replace(/&#(\d+);/g, function ($0, numberStr) {
            return String.fromCharCode(parseInt(numberStr, 10));
        });
    };

    var parseArrayValue = function (val, options) {
        if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
            return val.split(',');
        }

        return val;
    };

    // This is what browsers will submit when the ✓ character occurs in an
    // application/x-www-form-urlencoded body and the encoding of the page containing
    // the form is iso-8859-1, or when the submitted form has an accept-charset
    // attribute of iso-8859-1. Presumably also with other charsets that do not contain
    // the ✓ character, such as us-ascii.
    var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

    // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
    var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

    var parseValues = function parseQueryStringValues(str, options) {
        var obj = {};
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
        var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1; // Keep track of where the utf8 sentinel was found
        var i;

        var charset = options.charset;
        if (options.charsetSentinel) {
            for (i = 0; i < parts.length; ++i) {
                if (parts[i].indexOf('utf8=') === 0) {
                    if (parts[i] === charsetSentinel) {
                        charset = 'utf-8';
                    } else if (parts[i] === isoSentinel) {
                        charset = 'iso-8859-1';
                    }
                    skipIndex = i;
                    i = parts.length; // The eslint settings do not allow break;
                }
            }
        }

        for (i = 0; i < parts.length; ++i) {
            if (i === skipIndex) {
                continue;
            }
            var part = parts[i];

            var bracketEqualsPos = part.indexOf(']=');
            var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

            var key, val;
            if (pos === -1) {
                key = options.decoder(part, defaults.decoder, charset, 'key');
                val = options.strictNullHandling ? null : '';
            } else {
                key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
                val = utils.maybeMap(
                    parseArrayValue(part.slice(pos + 1), options),
                    function (encodedVal) {
                        return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                    }
                );
            }

            if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
                val = interpretNumericEntities(val);
            }

            if (part.indexOf('[]=') > -1) {
                val = isArray(val) ? [val] : val;
            }

            if (has.call(obj, key)) {
                obj[key] = utils.combine(obj[key], val);
            } else {
                obj[key] = val;
            }
        }

        return obj;
    };

    var parseObject = function (chain, val, options, valuesParsed) {
        var leaf = valuesParsed ? val : parseArrayValue(val, options);

        for (var i = chain.length - 1; i >= 0; --i) {
            var obj;
            var root = chain[i];

            if (root === '[]' && options.parseArrays) {
                obj = [].concat(leaf);
            } else {
                obj = options.plainObjects ? Object.create(null) : {};
                var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
                var index = parseInt(cleanRoot, 10);
                if (!options.parseArrays && cleanRoot === '') {
                    obj = { 0: leaf };
                } else if (
                    !isNaN(index)
                    && root !== cleanRoot
                    && String(index) === cleanRoot
                    && index >= 0
                    && (options.parseArrays && index <= options.arrayLimit)
                ) {
                    obj = [];
                    obj[index] = leaf;
                } else if (cleanRoot !== '__proto__') {
                    obj[cleanRoot] = leaf;
                }
            }

            leaf = obj;
        }

        return leaf;
    };

    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
            return;
        }

        // Transform dot notation to bracket notation
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

        // The regex chunks

        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;

        // Get the parent

        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;

        // Stash the parent if it exists

        var keys = [];
        if (parent) {
            // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
            if (!options.plainObjects && has.call(Object.prototype, parent)) {
                if (!options.allowPrototypes) {
                    return;
                }
            }

            keys.push(parent);
        }

        // Loop through children appending to the array until we hit depth

        var i = 0;
        while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
            i += 1;
            if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
                if (!options.allowPrototypes) {
                    return;
                }
            }
            keys.push(segment[1]);
        }

        // If there's a remainder, just add whatever is left

        if (segment) {
            keys.push('[' + key.slice(segment.index) + ']');
        }

        return parseObject(keys, val, options, valuesParsed);
    };

    var normalizeParseOptions = function normalizeParseOptions(opts) {
        if (!opts) {
            return defaults;
        }

        if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
            throw new TypeError('Decoder has to be a function.');
        }

        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }
        var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

        return {
            allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
            allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
            allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
            arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
            comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
            decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
            delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
            // eslint-disable-next-line no-implicit-coercion, no-extra-parens
            depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
            ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
            interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
            parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
            parseArrays: opts.parseArrays !== false,
            plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
        };
    };

    var parse = function (str, opts) {
        var options = normalizeParseOptions(opts);

        if (str === '' || str === null || typeof str === 'undefined') {
            return options.plainObjects ? Object.create(null) : {};
        }

        var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
        var obj = options.plainObjects ? Object.create(null) : {};

        // Iterate over the keys and setup the new object

        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
            obj = utils.merge(obj, newObj, options);
        }

        if (options.allowSparse === true) {
            return obj;
        }

        return utils.compact(obj);
    };

    var lib = {
        formats: formats,
        parse: parse,
        stringify: stringify_1
    };

    async function getAllPosts(page = 1) {
      const api_url = "http://localhost:1337";

      const query = lib.stringify({
        pagination: {
          page,
          pageSize: 6,
        },
        sort: ["publishedAt:desc"],
      });

      return fetch(`${api_url}/api/posts?populate=*&${query}`).then((res) =>
        res.json()
      );
    }

    /* src/routes/Home.svelte generated by Svelte v3.47.0 */
    const file$n = "src/routes/Home.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (74:26) 
    function create_if_block_2$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*$posts*/ ctx[1].data.data;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$posts*/ 2) {
    				each_value = /*$posts*/ ctx[1].data.data;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(74:26) ",
    		ctx
    	});

    	return block;
    }

    // (72:27) 
    function create_if_block_1$2(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Algo deu errado ao buscar os dados";
    			add_location(h2, file$n, 72, 6, 1776);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(72:27) ",
    		ctx
    	});

    	return block;
    }

    // (67:4) {#if $posts.isLoading}
    function create_if_block$5(ctx) {
    	let postshimmer0;
    	let t0;
    	let postshimmer1;
    	let t1;
    	let postshimmer2;
    	let t2;
    	let postshimmer3;
    	let current;
    	postshimmer0 = new PostShimmer({ $$inline: true });
    	postshimmer1 = new PostShimmer({ $$inline: true });
    	postshimmer2 = new PostShimmer({ $$inline: true });
    	postshimmer3 = new PostShimmer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(postshimmer0.$$.fragment);
    			t0 = space();
    			create_component(postshimmer1.$$.fragment);
    			t1 = space();
    			create_component(postshimmer2.$$.fragment);
    			t2 = space();
    			create_component(postshimmer3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(postshimmer0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(postshimmer1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(postshimmer2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(postshimmer3, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(postshimmer0.$$.fragment, local);
    			transition_in(postshimmer1.$$.fragment, local);
    			transition_in(postshimmer2.$$.fragment, local);
    			transition_in(postshimmer3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(postshimmer0.$$.fragment, local);
    			transition_out(postshimmer1.$$.fragment, local);
    			transition_out(postshimmer2.$$.fragment, local);
    			transition_out(postshimmer3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(postshimmer0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(postshimmer1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(postshimmer2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(postshimmer3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(67:4) {#if $posts.isLoading}",
    		ctx
    	});

    	return block;
    }

    // (75:6) {#each $posts.data.data as post}
    function create_each_block$1(ctx) {
    	let post;
    	let current;
    	const post_spread_levels = [/*post*/ ctx[8].attributes, { id: /*post*/ ctx[8].id }];
    	let post_props = {};

    	for (let i = 0; i < post_spread_levels.length; i += 1) {
    		post_props = assign$2(post_props, post_spread_levels[i]);
    	}

    	post = new Post$1({ props: post_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(post.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(post, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const post_changes = (dirty & /*$posts*/ 2)
    			? get_spread_update(post_spread_levels, [
    					get_spread_object(/*post*/ ctx[8].attributes),
    					{ id: /*post*/ ctx[8].id }
    				])
    			: {};

    			post.$set(post_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(post.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(post.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(post, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(75:6) {#each $posts.data.data as post}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let title_value;
    	let t0;
    	let section;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let pagination;
    	let current;
    	document.title = title_value = /*blogInfo*/ ctx[2].blogName;
    	const if_block_creators = [create_if_block$5, create_if_block_1$2, create_if_block_2$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$posts*/ ctx[1].isLoading) return 0;
    		if (/*$posts*/ ctx[1].error) return 1;
    		if (/*$posts*/ ctx[1].data) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	pagination = new Pagination({
    			props: {
    				page: /*currentPage*/ ctx[0],
    				totalPages: /*totalPages*/ ctx[3]
    			},
    			$$inline: true
    		});

    	pagination.$on("next-page", /*handleNextPage*/ ctx[5]);
    	pagination.$on("previus-page", /*handlePreviusPage*/ ctx[6]);

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div = element("div");
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(pagination.$$.fragment);
    			attr_dev(div, "class", "container");
    			add_location(div, file$n, 65, 2, 1603);
    			attr_dev(section, "class", "blog-list px-3 py-5 p-md-5");
    			add_location(section, file$n, 64, 0, 1556);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			append_dev(section, t1);
    			mount_component(pagination, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*blogInfo*/ 4) && title_value !== (title_value = /*blogInfo*/ ctx[2].blogName)) {
    				document.title = title_value;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}

    			const pagination_changes = {};
    			if (dirty & /*currentPage*/ 1) pagination_changes.page = /*currentPage*/ ctx[0];
    			if (dirty & /*totalPages*/ 8) pagination_changes.totalPages = /*totalPages*/ ctx[3];
    			pagination.$set(pagination_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(pagination.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(pagination.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			destroy_component(pagination);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getPageFromURL() {
    	try {
    		const queryPage = new URL(window.location.href).searchParams;
    		return queryPage.get("page") || false;
    	} catch(e) {
    		return false;
    	}
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let posts;

    	let $posts,
    		$$unsubscribe_posts = noop$1,
    		$$subscribe_posts = () => ($$unsubscribe_posts(), $$unsubscribe_posts = subscribe(posts, $$value => $$invalidate(1, $posts = $$value)), posts);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_posts());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let blogInfo;
    	let currentPage = 1;
    	let totalPages = 1;

    	if (getPageFromURL()) {
    		currentPage = Number(getPageFromURL());
    	}

    	function handleNextPage() {
    		$$invalidate(0, currentPage += 1);
    		window.history.pushState("", "", `?page=${currentPage}`);
    	}

    	function handlePreviusPage() {
    		$$invalidate(0, currentPage -= 1);
    		window.history.pushState("", "", `?page=${currentPage}`);
    	}

    	const unsubscribe = blogInfoStore.subscribe(value => {
    		$$invalidate(2, blogInfo = value);
    	});

    	onDestroy(unsubscribe);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onDestroy,
    		useQuery,
    		Newsletter,
    		Post: Post$1,
    		Pagination,
    		PostShimmer,
    		blogInfoStore,
    		getAllPosts,
    		blogInfo,
    		currentPage,
    		totalPages,
    		getPageFromURL,
    		handleNextPage,
    		handlePreviusPage,
    		unsubscribe,
    		posts,
    		$posts
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogInfo' in $$props) $$invalidate(2, blogInfo = $$props.blogInfo);
    		if ('currentPage' in $$props) $$invalidate(0, currentPage = $$props.currentPage);
    		if ('totalPages' in $$props) $$invalidate(3, totalPages = $$props.totalPages);
    		if ('posts' in $$props) $$subscribe_posts($$invalidate(4, posts = $$props.posts));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*currentPage*/ 1) {
    			$$subscribe_posts($$invalidate(4, posts = useQuery(["all.posts", currentPage], () => getAllPosts(currentPage))));
    		}

    		if ($$self.$$.dirty & /*$posts*/ 2) {
    			$$invalidate(3, totalPages = $posts?.data?.meta?.pagination.pageCount);
    		}
    	};

    	return [
    		currentPage,
    		$posts,
    		blogInfo,
    		totalPages,
    		posts,
    		handleNextPage,
    		handlePreviusPage
    	];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$t.name
    		});
    	}
    }

    /* src/components/comment-box/CommentBox.svelte generated by Svelte v3.47.0 */

    const file$m = "src/components/comment-box/CommentBox.svelte";

    function create_fragment$s(ctx) {
    	let section;
    	let div;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			attr_dev(div, "id", "cusdis_thread");
    			attr_dev(div, "data-host", "https://cusdis.com");
    			attr_dev(div, "data-app-id", "123123");
    			attr_dev(div, "data-page-id", /*slug*/ ctx[0]);
    			attr_dev(div, "data-page-url", location.href);
    			attr_dev(div, "data-page-title", /*title*/ ctx[1]);
    			add_location(div, file$m, 11, 2, 192);
    			attr_dev(section, "id", "comments");
    			attr_dev(section, "class", "blog-comments-section");
    			add_location(section, file$m, 10, 0, 136);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*slug*/ 1) {
    				attr_dev(div, "data-page-id", /*slug*/ ctx[0]);
    			}

    			if (dirty & /*title*/ 2) {
    				attr_dev(div, "data-page-title", /*title*/ ctx[1]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CommentBox', slots, []);
    	let { slug } = $$props;
    	let { title } = $$props;

    	// Just to fix CUDIS sync error
    	setTimeout(
    		() => {
    			d();
    		},
    		1000
    	);

    	const writable_props = ['slug', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CommentBox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('slug' in $$props) $$invalidate(0, slug = $$props.slug);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ slug, title });

    	$$self.$inject_state = $$props => {
    		if ('slug' in $$props) $$invalidate(0, slug = $$props.slug);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [slug, title];
    }

    class CommentBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { slug: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CommentBox",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slug*/ ctx[0] === undefined && !('slug' in props)) {
    			console.warn("<CommentBox> was created without expected prop 'slug'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<CommentBox> was created without expected prop 'title'");
    		}
    	}

    	get slug() {
    		throw new Error("<CommentBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<CommentBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CommentBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CommentBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    async function getOnePost(slug = "") {
      if (slug === "" || !slug) {
        return;
      }

      const api_url = "http://localhost:1337";

      const query = lib.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      });

      return fetch(`${api_url}/api/posts?populate=*&${query}`).then((res) =>
        res.json()
      );
    }

    /* src/components/modal-image/ModalImage.svelte generated by Svelte v3.47.0 */
    const file$l = "src/components/modal-image/ModalImage.svelte";

    function create_fragment$r(ctx) {
    	let div1;
    	let span;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div0;
    	let t3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			span = element("span");
    			span.textContent = "×";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			div0 = element("div");
    			t3 = text(/*caption*/ ctx[1]);
    			attr_dev(span, "class", "close-modal");
    			add_location(span, file$l, 11, 2, 254);
    			attr_dev(img, "class", "image-modal-content");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*caption*/ ctx[1]);
    			add_location(img, file$l, 13, 2, 317);
    			attr_dev(div0, "class", "caption");
    			add_location(div0, file$l, 15, 2, 382);
    			attr_dev(div1, "class", "image-modal");
    			add_location(div1, file$l, 10, 0, 207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(div1, t1);
    			append_dev(div1, img);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, t3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*onClose*/ ctx[2], false, false, false),
    					listen_dev(div1, "click", /*onClose*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*image*/ 1 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*caption*/ 2) {
    				attr_dev(img, "alt", /*caption*/ ctx[1]);
    			}

    			if (dirty & /*caption*/ 2) set_data_dev(t3, /*caption*/ ctx[1]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ModalImage', slots, []);
    	const dispatch = createEventDispatcher();
    	const onClose = () => dispatch("close-modal");
    	let { image } = $$props;
    	let { caption } = $$props;
    	const writable_props = ['image', 'caption'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ModalImage> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('caption' in $$props) $$invalidate(1, caption = $$props.caption);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		onClose,
    		image,
    		caption
    	});

    	$$self.$inject_state = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('caption' in $$props) $$invalidate(1, caption = $$props.caption);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [image, caption, onClose];
    }

    class ModalImage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { image: 0, caption: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ModalImage",
    			options,
    			id: create_fragment$r.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*image*/ ctx[0] === undefined && !('image' in props)) {
    			console.warn("<ModalImage> was created without expected prop 'image'");
    		}

    		if (/*caption*/ ctx[1] === undefined && !('caption' in props)) {
    			console.warn("<ModalImage> was created without expected prop 'caption'");
    		}
    	}

    	get image() {
    		throw new Error("<ModalImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<ModalImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get caption() {
    		throw new Error("<ModalImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set caption(value) {
    		throw new Error("<ModalImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function supressWarnings() {
      const origWarn = console.warn;

      console.warn = (message) => {
        if (message.includes('unknown prop')) return
        if (message.includes('unexpected slot')) return
        origWarn(message);
      };

      onMount(() => {
        console.warn = origWarn;
      });
    }

    /* node_modules/svelte-markdown/src/Parser.svelte generated by Svelte v3.47.0 */

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	child_ctx[15] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	child_ctx[15] = i;
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (19:2) {#if renderers[type]}
    function create_if_block_1$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$1, create_if_block_3$1, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*type*/ ctx[0] === 'table') return 0;
    		if (/*type*/ ctx[0] === 'list') return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(19:2) {#if renderers[type]}",
    		ctx
    	});

    	return block;
    }

    // (14:0) {#if !type}
    function create_if_block$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*tokens*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tokens, renderers*/ 34) {
    				each_value = /*tokens*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(14:0) {#if !type}",
    		ctx
    	});

    	return block;
    }

    // (69:4) {:else}
    function create_else_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*$$restProps*/ ctx[6]];
    	var switch_value = /*renderers*/ ctx[5][/*type*/ ctx[0]];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_11] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*$$restProps*/ ctx[6])])
    			: {};

    			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 8388706) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5][/*type*/ ctx[0]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(69:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (51:30) 
    function create_if_block_3$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_4$1, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*ordered*/ ctx[4]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(51:30) ",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#if type === 'table'}
    function create_if_block_2$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].table;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, renderers, rows, $$restProps, header*/ 8388716) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].table)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(20:4) {#if type === 'table'}",
    		ctx
    	});

    	return block;
    }

    // (73:8) {:else}
    function create_else_block_2(ctx) {
    	let t_value = /*$$restProps*/ ctx[6].raw + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$$restProps*/ 64 && t_value !== (t_value = /*$$restProps*/ ctx[6].raw + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(73:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (71:8) {#if tokens}
    function create_if_block_5$1(ctx) {
    	let parser;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*tokens*/ ctx[1],
    				renderers: /*renderers*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 2) parser_changes.tokens = /*tokens*/ ctx[1];
    			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(71:8) {#if tokens}",
    		ctx
    	});

    	return block;
    }

    // (70:6) <svelte:component this={renderers[type]} {...$$restProps}>
    function create_default_slot_11(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_5$1, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_3(ctx, dirty) {
    		if (/*tokens*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_3(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_3(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(70:6) <svelte:component this={renderers[type]} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (60:6) {:else}
    function create_else_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[4] }, /*$$restProps*/ ctx[6]];
    	var switch_value = /*renderers*/ ctx[5].list;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_9] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 80)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*ordered*/ 16 && { ordered: /*ordered*/ ctx[4] },
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
    				])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].list)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(60:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (52:6) {#if ordered}
    function create_if_block_4$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[4] }, /*$$restProps*/ ctx[6]];
    	var switch_value = /*renderers*/ ctx[5].list;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_7] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 80)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*ordered*/ 16 && { ordered: /*ordered*/ ctx[4] },
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
    				])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].list)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(52:6) {#if ordered}",
    		ctx
    	});

    	return block;
    }

    // (63:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>
    function create_default_slot_10(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*item*/ ctx[18].tokens,
    				renderers: /*renderers*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*$$restProps*/ 64) parser_changes.tokens = /*item*/ ctx[18].tokens;
    			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(63:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>",
    		ctx
    	});

    	return block;
    }

    // (62:10) {#each $$restProps.items as item}
    function create_each_block_5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*item*/ ctx[18]];
    	var switch_value = /*renderers*/ ctx[5].unorderedlistitem || /*renderers*/ ctx[5].listitem;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_10] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[18])])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].unorderedlistitem || /*renderers*/ ctx[5].listitem)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(62:10) {#each $$restProps.items as item}",
    		ctx
    	});

    	return block;
    }

    // (61:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
    function create_default_slot_9(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_5 = /*$$restProps*/ ctx[6].items;
    	validate_each_argument(each_value_5);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps*/ 96) {
    				each_value_5 = /*$$restProps*/ ctx[6].items;
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_5.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_5.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(61:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (55:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>
    function create_default_slot_8(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*item*/ ctx[18].tokens,
    				renderers: /*renderers*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*$$restProps*/ 64) parser_changes.tokens = /*item*/ ctx[18].tokens;
    			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(55:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>",
    		ctx
    	});

    	return block;
    }

    // (54:10) {#each $$restProps.items as item}
    function create_each_block_4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*item*/ ctx[18]];
    	var switch_value = /*renderers*/ ctx[5].orderedlistitem || /*renderers*/ ctx[5].listitem;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_8] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$2(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[18])])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].orderedlistitem || /*renderers*/ ctx[5].listitem)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(54:10) {#each $$restProps.items as item}",
    		ctx
    	});

    	return block;
    }

    // (53:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
    function create_default_slot_7(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_4 = /*$$restProps*/ ctx[6].items;
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps*/ 96) {
    				each_value_4 = /*$$restProps*/ ctx[6].items;
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_4.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_4.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(53:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (25:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >
    function create_default_slot_6(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*headerItem*/ ctx[16].tokens,
    				renderers: /*renderers*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*header*/ 4) parser_changes.tokens = /*headerItem*/ ctx[16].tokens;
    			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(25:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >",
    		ctx
    	});

    	return block;
    }

    // (24:12) {#each header as headerItem, i}
    function create_each_block_3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].tablecell;

    	function switch_props(ctx) {
    		return {
    			props: {
    				header: true,
    				align: /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center',
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*$$restProps*/ 64) switch_instance_changes.align = /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center';

    			if (dirty & /*$$scope, header, renderers*/ 8388644) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].tablecell)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(24:12) {#each header as headerItem, i}",
    		ctx
    	});

    	return block;
    }

    // (23:10) <svelte:component this={renderers.tablerow}>
    function create_default_slot_5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_3 = /*header*/ ctx[2];
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps, header*/ 100) {
    				each_value_3 = /*header*/ ctx[2];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_3.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_3.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(23:10) <svelte:component this={renderers.tablerow}>",
    		ctx
    	});

    	return block;
    }

    // (22:8) <svelte:component this={renderers.tablehead}>
    function create_default_slot_4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].tablerow;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, header, renderers, $$restProps*/ 8388708) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].tablerow)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(22:8) <svelte:component this={renderers.tablehead}>",
    		ctx
    	});

    	return block;
    }

    // (39:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >
    function create_default_slot_3(ctx) {
    	let parser;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*cells*/ ctx[13].tokens,
    				renderers: /*renderers*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*rows*/ 8) parser_changes.tokens = /*cells*/ ctx[13].tokens;
    			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(39:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >",
    		ctx
    	});

    	return block;
    }

    // (38:14) {#each row as cells, i}
    function create_each_block_2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].tablecell;

    	function switch_props(ctx) {
    		return {
    			props: {
    				header: false,
    				align: /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center',
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*$$restProps*/ 64) switch_instance_changes.align = /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center';

    			if (dirty & /*$$scope, rows, renderers*/ 8388648) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].tablecell)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(38:14) {#each row as cells, i}",
    		ctx
    	});

    	return block;
    }

    // (37:12) <svelte:component this={renderers.tablerow}>
    function create_default_slot_2(ctx) {
    	let t;
    	let current;
    	let each_value_2 = /*row*/ ctx[10];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps, rows*/ 104) {
    				each_value_2 = /*row*/ ctx[10];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(t.parentNode, t);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(37:12) <svelte:component this={renderers.tablerow}>",
    		ctx
    	});

    	return block;
    }

    // (36:10) {#each rows as row}
    function create_each_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].tablerow;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, rows, renderers, $$restProps*/ 8388712) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].tablerow)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(36:10) {#each rows as row}",
    		ctx
    	});

    	return block;
    }

    // (35:8) <svelte:component this={renderers.tablebody}>
    function create_default_slot_1$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*rows*/ ctx[3];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, rows, $$restProps*/ 104) {
    				each_value_1 = /*rows*/ ctx[3];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(35:8) <svelte:component this={renderers.tablebody}>",
    		ctx
    	});

    	return block;
    }

    // (21:6) <svelte:component this={renderers.table}>
    function create_default_slot$2(ctx) {
    	let switch_instance0;
    	let t;
    	let switch_instance1;
    	let switch_instance1_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[5].tablehead;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance0 = new switch_value(switch_props(ctx));
    	}

    	var switch_value_1 = /*renderers*/ ctx[5].tablebody;

    	function switch_props_1(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value_1) {
    		switch_instance1 = new switch_value_1(switch_props_1(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance0) create_component(switch_instance0.$$.fragment);
    			t = space();
    			if (switch_instance1) create_component(switch_instance1.$$.fragment);
    			switch_instance1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance0) {
    				mount_component(switch_instance0, target, anchor);
    			}

    			insert_dev(target, t, anchor);

    			if (switch_instance1) {
    				mount_component(switch_instance1, target, anchor);
    			}

    			insert_dev(target, switch_instance1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance0_changes = {};

    			if (dirty & /*$$scope, renderers, header, $$restProps*/ 8388708) {
    				switch_instance0_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[5].tablehead)) {
    				if (switch_instance0) {
    					group_outros();
    					const old_component = switch_instance0;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance0 = new switch_value(switch_props(ctx));
    					create_component(switch_instance0.$$.fragment);
    					transition_in(switch_instance0.$$.fragment, 1);
    					mount_component(switch_instance0, t.parentNode, t);
    				} else {
    					switch_instance0 = null;
    				}
    			} else if (switch_value) {
    				switch_instance0.$set(switch_instance0_changes);
    			}

    			const switch_instance1_changes = {};

    			if (dirty & /*$$scope, rows, renderers, $$restProps*/ 8388712) {
    				switch_instance1_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value_1 !== (switch_value_1 = /*renderers*/ ctx[5].tablebody)) {
    				if (switch_instance1) {
    					group_outros();
    					const old_component = switch_instance1;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value_1) {
    					switch_instance1 = new switch_value_1(switch_props_1(ctx));
    					create_component(switch_instance1.$$.fragment);
    					transition_in(switch_instance1.$$.fragment, 1);
    					mount_component(switch_instance1, switch_instance1_anchor.parentNode, switch_instance1_anchor);
    				} else {
    					switch_instance1 = null;
    				}
    			} else if (switch_value_1) {
    				switch_instance1.$set(switch_instance1_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance0) transition_in(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_in(switch_instance1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance0) transition_out(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_out(switch_instance1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (switch_instance0) destroy_component(switch_instance0, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(switch_instance1_anchor);
    			if (switch_instance1) destroy_component(switch_instance1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(21:6) <svelte:component this={renderers.table}>",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#each tokens as token}
    function create_each_block(ctx) {
    	let parser;
    	let current;
    	const parser_spread_levels = [/*token*/ ctx[7], { renderers: /*renderers*/ ctx[5] }];
    	let parser_props = {};

    	for (let i = 0; i < parser_spread_levels.length; i += 1) {
    		parser_props = assign$2(parser_props, parser_spread_levels[i]);
    	}

    	parser = new Parser({ props: parser_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = (dirty & /*tokens, renderers*/ 34)
    			? get_spread_update(parser_spread_levels, [
    					dirty & /*tokens*/ 2 && get_spread_object(/*token*/ ctx[7]),
    					dirty & /*renderers*/ 32 && { renderers: /*renderers*/ ctx[5] }
    				])
    			: {};

    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(15:2) {#each tokens as token}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_if_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*type*/ ctx[0]) return 0;
    		if (/*renderers*/ ctx[5][/*type*/ ctx[0]]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	const omit_props_names = ["type","tokens","header","rows","ordered","renderers"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Parser', slots, []);
    	let { type = undefined } = $$props;
    	let { tokens = undefined } = $$props;
    	let { header = undefined } = $$props;
    	let { rows = undefined } = $$props;
    	let { ordered = false } = $$props;
    	let { renderers } = $$props;
    	supressWarnings();

    	$$self.$$set = $$new_props => {
    		$$props = assign$2(assign$2({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('type' in $$new_props) $$invalidate(0, type = $$new_props.type);
    		if ('tokens' in $$new_props) $$invalidate(1, tokens = $$new_props.tokens);
    		if ('header' in $$new_props) $$invalidate(2, header = $$new_props.header);
    		if ('rows' in $$new_props) $$invalidate(3, rows = $$new_props.rows);
    		if ('ordered' in $$new_props) $$invalidate(4, ordered = $$new_props.ordered);
    		if ('renderers' in $$new_props) $$invalidate(5, renderers = $$new_props.renderers);
    	};

    	$$self.$capture_state = () => ({
    		supressWarnings,
    		type,
    		tokens,
    		header,
    		rows,
    		ordered,
    		renderers
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
    		if ('tokens' in $$props) $$invalidate(1, tokens = $$new_props.tokens);
    		if ('header' in $$props) $$invalidate(2, header = $$new_props.header);
    		if ('rows' in $$props) $$invalidate(3, rows = $$new_props.rows);
    		if ('ordered' in $$props) $$invalidate(4, ordered = $$new_props.ordered);
    		if ('renderers' in $$props) $$invalidate(5, renderers = $$new_props.renderers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, tokens, header, rows, ordered, renderers, $$restProps];
    }

    class Parser extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {
    			type: 0,
    			tokens: 1,
    			header: 2,
    			rows: 3,
    			ordered: 4,
    			renderers: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Parser",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*renderers*/ ctx[5] === undefined && !('renderers' in props)) {
    			console.warn("<Parser> was created without expected prop 'renderers'");
    		}
    	}

    	get type() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tokens() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tokens(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get header() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rows() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rows(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ordered() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ordered(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get renderers() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set renderers(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const key = {};

    /* node_modules/svelte-markdown/src/renderers/Heading.svelte generated by Svelte v3.47.0 */
    const file$k = "node_modules/svelte-markdown/src/renderers/Heading.svelte";

    // (28:0) {:else}
    function create_else_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*raw*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*raw*/ 2) set_data_dev(t, /*raw*/ ctx[1]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(28:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:22) 
    function create_if_block_5(ctx) {
    	let h6;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h6 = element("h6");
    			if (default_slot) default_slot.c();
    			attr_dev(h6, "id", /*id*/ ctx[2]);
    			add_location(h6, file$k, 26, 2, 596);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h6, anchor);

    			if (default_slot) {
    				default_slot.m(h6, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h6, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h6);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(26:22) ",
    		ctx
    	});

    	return block;
    }

    // (24:22) 
    function create_if_block_4(ctx) {
    	let h5;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			if (default_slot) default_slot.c();
    			attr_dev(h5, "id", /*id*/ ctx[2]);
    			add_location(h5, file$k, 24, 2, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);

    			if (default_slot) {
    				default_slot.m(h5, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h5, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(24:22) ",
    		ctx
    	});

    	return block;
    }

    // (22:22) 
    function create_if_block_3(ctx) {
    	let h4;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			if (default_slot) default_slot.c();
    			attr_dev(h4, "id", /*id*/ ctx[2]);
    			add_location(h4, file$k, 22, 2, 490);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);

    			if (default_slot) {
    				default_slot.m(h4, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h4, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(22:22) ",
    		ctx
    	});

    	return block;
    }

    // (20:22) 
    function create_if_block_2(ctx) {
    	let h3;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "id", /*id*/ ctx[2]);
    			add_location(h3, file$k, 20, 2, 437);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);

    			if (default_slot) {
    				default_slot.m(h3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h3, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(20:22) ",
    		ctx
    	});

    	return block;
    }

    // (18:22) 
    function create_if_block_1(ctx) {
    	let h2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			if (default_slot) default_slot.c();
    			attr_dev(h2, "id", /*id*/ ctx[2]);
    			add_location(h2, file$k, 18, 2, 384);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);

    			if (default_slot) {
    				default_slot.m(h2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h2, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(18:22) ",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#if depth === 1}
    function create_if_block$3(ctx) {
    	let h1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (default_slot) default_slot.c();
    			attr_dev(h1, "id", /*id*/ ctx[2]);
    			add_location(h1, file$k, 16, 2, 331);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (default_slot) {
    				default_slot.m(h1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h1, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(16:0) {#if depth === 1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block$3,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_else_block$2
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*depth*/ ctx[0] === 1) return 0;
    		if (/*depth*/ ctx[0] === 2) return 1;
    		if (/*depth*/ ctx[0] === 3) return 2;
    		if (/*depth*/ ctx[0] === 4) return 3;
    		if (/*depth*/ ctx[0] === 5) return 4;
    		if (/*depth*/ ctx[0] === 6) return 5;
    		return 6;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let id;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Heading', slots, ['default']);
    	let { depth } = $$props;
    	let { raw } = $$props;
    	let { text } = $$props;
    	const { slug, getOptions } = getContext(key);
    	const options = getOptions();
    	const writable_props = ['depth', 'raw', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Heading> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		key,
    		depth,
    		raw,
    		text,
    		slug,
    		getOptions,
    		options,
    		id
    	});

    	$$self.$inject_state = $$props => {
    		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*text*/ 8) {
    			$$invalidate(2, id = options.headerIds
    			? options.headerPrefix + slug(text)
    			: undefined);
    		}
    	};

    	return [depth, raw, id, text, $$scope, slots];
    }

    class Heading extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { depth: 0, raw: 1, text: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Heading",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*depth*/ ctx[0] === undefined && !('depth' in props)) {
    			console.warn("<Heading> was created without expected prop 'depth'");
    		}

    		if (/*raw*/ ctx[1] === undefined && !('raw' in props)) {
    			console.warn("<Heading> was created without expected prop 'raw'");
    		}

    		if (/*text*/ ctx[3] === undefined && !('text' in props)) {
    			console.warn("<Heading> was created without expected prop 'text'");
    		}
    	}

    	get depth() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set depth(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get raw() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Paragraph.svelte generated by Svelte v3.47.0 */

    const file$j = "node_modules/svelte-markdown/src/renderers/Paragraph.svelte";

    function create_fragment$o(ctx) {
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot) default_slot.c();
    			add_location(p, file$j, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Paragraph', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paragraph> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Paragraph extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Text.svelte generated by Svelte v3.47.0 */

    function create_fragment$n(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Text', slots, ['default']);
    	let { text } = $$props;
    	let { raw } = $$props;
    	const writable_props = ['text', 'raw'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Text> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ text, raw });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, raw, $$scope, slots];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { text: 0, raw: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<Text> was created without expected prop 'text'");
    		}

    		if (/*raw*/ ctx[1] === undefined && !('raw' in props)) {
    			console.warn("<Text> was created without expected prop 'raw'");
    		}
    	}

    	get text() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get raw() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Image.svelte generated by Svelte v3.47.0 */

    const file$i = "node_modules/svelte-markdown/src/renderers/Image.svelte";

    function create_fragment$m(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "title", /*title*/ ctx[1]);
    			attr_dev(img, "alt", /*text*/ ctx[2]);
    			add_location(img, file$i, 6, 0, 97);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*href*/ 1 && !src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 2) {
    				attr_dev(img, "title", /*title*/ ctx[1]);
    			}

    			if (dirty & /*text*/ 4) {
    				attr_dev(img, "alt", /*text*/ ctx[2]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Image', slots, []);
    	let { href = '' } = $$props;
    	let { title = undefined } = $$props;
    	let { text = '' } = $$props;
    	const writable_props = ['href', 'title', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ href, title, text });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, title, text];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { href: 0, title: 1, text: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get href() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Link.svelte generated by Svelte v3.47.0 */

    const file$h = "node_modules/svelte-markdown/src/renderers/Link.svelte";

    function create_fragment$l(ctx) {
    	let a;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "title", /*title*/ ctx[1]);
    			add_location(a, file$h, 5, 0, 74);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*href*/ 1) {
    				attr_dev(a, "href", /*href*/ ctx[0]);
    			}

    			if (!current || dirty & /*title*/ 2) {
    				attr_dev(a, "title", /*title*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { href = '' } = $$props;
    	let { title = undefined } = $$props;
    	const writable_props = ['href', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ href, title });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, title, $$scope, slots];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { href: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get href() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Em.svelte generated by Svelte v3.47.0 */

    const file$g = "node_modules/svelte-markdown/src/renderers/Em.svelte";

    function create_fragment$k(ctx) {
    	let em;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			em = element("em");
    			if (default_slot) default_slot.c();
    			add_location(em, file$g, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);

    			if (default_slot) {
    				default_slot.m(em, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Em', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Em> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Em extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Em",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Del.svelte generated by Svelte v3.47.0 */

    const file$f = "node_modules/svelte-markdown/src/renderers/Del.svelte";

    function create_fragment$j(ctx) {
    	let del;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			del = element("del");
    			if (default_slot) default_slot.c();
    			add_location(del, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, del, anchor);

    			if (default_slot) {
    				default_slot.m(del, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(del);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Del', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Del> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Del extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Del",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Codespan.svelte generated by Svelte v3.47.0 */

    const file$e = "node_modules/svelte-markdown/src/renderers/Codespan.svelte";

    function create_fragment$i(ctx) {
    	let code;
    	let t_value = /*raw*/ ctx[0].replace(/`/g, '') + "";
    	let t;

    	const block = {
    		c: function create() {
    			code = element("code");
    			t = text(t_value);
    			add_location(code, file$e, 4, 0, 37);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, code, anchor);
    			append_dev(code, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*raw*/ 1 && t_value !== (t_value = /*raw*/ ctx[0].replace(/`/g, '') + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(code);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Codespan', slots, []);
    	let { raw } = $$props;
    	const writable_props = ['raw'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Codespan> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
    	};

    	$$self.$capture_state = () => ({ raw });

    	$$self.$inject_state = $$props => {
    		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [raw];
    }

    class Codespan extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { raw: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Codespan",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*raw*/ ctx[0] === undefined && !('raw' in props)) {
    			console.warn("<Codespan> was created without expected prop 'raw'");
    		}
    	}

    	get raw() {
    		throw new Error("<Codespan>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Codespan>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Strong.svelte generated by Svelte v3.47.0 */

    const file$d = "node_modules/svelte-markdown/src/renderers/Strong.svelte";

    function create_fragment$h(ctx) {
    	let strong;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			strong = element("strong");
    			if (default_slot) default_slot.c();
    			add_location(strong, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, strong, anchor);

    			if (default_slot) {
    				default_slot.m(strong, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(strong);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Strong', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Strong> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Strong extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Strong",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Table.svelte generated by Svelte v3.47.0 */

    const file$c = "node_modules/svelte-markdown/src/renderers/Table.svelte";

    function create_fragment$g(ctx) {
    	let table;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			table = element("table");
    			if (default_slot) default_slot.c();
    			add_location(table, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableHead.svelte generated by Svelte v3.47.0 */

    const file$b = "node_modules/svelte-markdown/src/renderers/TableHead.svelte";

    function create_fragment$f(ctx) {
    	let thead;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			if (default_slot) default_slot.c();
    			add_location(thead, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);

    			if (default_slot) {
    				default_slot.m(thead, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableHead', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableHead> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableHead extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableHead",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableBody.svelte generated by Svelte v3.47.0 */

    const file$a = "node_modules/svelte-markdown/src/renderers/TableBody.svelte";

    function create_fragment$e(ctx) {
    	let tbody;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			tbody = element("tbody");
    			if (default_slot) default_slot.c();
    			add_location(tbody, file$a, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tbody, anchor);

    			if (default_slot) {
    				default_slot.m(tbody, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tbody);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableBody', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableBody> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableBody",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableRow.svelte generated by Svelte v3.47.0 */

    const file$9 = "node_modules/svelte-markdown/src/renderers/TableRow.svelte";

    function create_fragment$d(ctx) {
    	let tr;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if (default_slot) default_slot.c();
    			add_location(tr, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			if (default_slot) {
    				default_slot.m(tr, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableRow', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableRow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableRow",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableCell.svelte generated by Svelte v3.47.0 */

    const file$8 = "node_modules/svelte-markdown/src/renderers/TableCell.svelte";

    // (8:0) {:else}
    function create_else_block$1(ctx) {
    	let td;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			td = element("td");
    			if (default_slot) default_slot.c();
    			attr_dev(td, "align", /*align*/ ctx[1]);
    			add_location(td, file$8, 8, 2, 115);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);

    			if (default_slot) {
    				default_slot.m(td, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*align*/ 2) {
    				attr_dev(td, "align", /*align*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(8:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if header}
    function create_if_block$2(ctx) {
    	let th;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			th = element("th");
    			if (default_slot) default_slot.c();
    			attr_dev(th, "align", /*align*/ ctx[1]);
    			add_location(th, file$8, 6, 2, 74);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);

    			if (default_slot) {
    				default_slot.m(th, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*align*/ 2) {
    				attr_dev(th, "align", /*align*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(6:0) {#if header}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*header*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableCell', slots, ['default']);
    	let { header } = $$props;
    	let { align } = $$props;
    	const writable_props = ['header', 'align'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableCell> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('align' in $$props) $$invalidate(1, align = $$props.align);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ header, align });

    	$$self.$inject_state = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('align' in $$props) $$invalidate(1, align = $$props.align);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [header, align, $$scope, slots];
    }

    class TableCell extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { header: 0, align: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableCell",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*header*/ ctx[0] === undefined && !('header' in props)) {
    			console.warn("<TableCell> was created without expected prop 'header'");
    		}

    		if (/*align*/ ctx[1] === undefined && !('align' in props)) {
    			console.warn("<TableCell> was created without expected prop 'align'");
    		}
    	}

    	get header() {
    		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/List.svelte generated by Svelte v3.47.0 */

    const file$7 = "node_modules/svelte-markdown/src/renderers/List.svelte";

    // (8:0) {:else}
    function create_else_block(ctx) {
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			add_location(ul, file$7, 8, 2, 117);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(8:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if ordered}
    function create_if_block$1(ctx) {
    	let ol;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			ol = element("ol");
    			if (default_slot) default_slot.c();
    			attr_dev(ol, "start", /*start*/ ctx[1]);
    			add_location(ol, file$7, 6, 2, 76);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ol, anchor);

    			if (default_slot) {
    				default_slot.m(ol, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*start*/ 2) {
    				attr_dev(ol, "start", /*start*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ol);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(6:0) {#if ordered}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*ordered*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, ['default']);
    	let { ordered } = $$props;
    	let { start } = $$props;
    	const writable_props = ['ordered', 'start'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<List> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ ordered, start });

    	$$self.$inject_state = $$props => {
    		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ordered, start, $$scope, slots];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { ordered: 0, start: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ordered*/ ctx[0] === undefined && !('ordered' in props)) {
    			console.warn("<List> was created without expected prop 'ordered'");
    		}

    		if (/*start*/ ctx[1] === undefined && !('start' in props)) {
    			console.warn("<List> was created without expected prop 'start'");
    		}
    	}

    	get ordered() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ordered(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get start() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set start(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/ListItem.svelte generated by Svelte v3.47.0 */

    const file$6 = "node_modules/svelte-markdown/src/renderers/ListItem.svelte";

    function create_fragment$a(ctx) {
    	let li;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			add_location(li, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListItem', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ListItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class ListItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListItem",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Hr.svelte generated by Svelte v3.47.0 */

    const file$5 = "node_modules/svelte-markdown/src/renderers/Hr.svelte";

    function create_fragment$9(ctx) {
    	let hr;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			add_location(hr, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hr', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hr> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Hr extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hr",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Html.svelte generated by Svelte v3.47.0 */

    function create_fragment$8(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(/*text*/ ctx[0], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 1) html_tag.p(/*text*/ ctx[0]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Html', slots, []);
    	let { text } = $$props;
    	const writable_props = ['text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Html> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ text });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text];
    }

    class Html extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { text: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Html",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<Html> was created without expected prop 'text'");
    		}
    	}

    	get text() {
    		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Blockquote.svelte generated by Svelte v3.47.0 */

    const file$4 = "node_modules/svelte-markdown/src/renderers/Blockquote.svelte";

    function create_fragment$7(ctx) {
    	let blockquote;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			blockquote = element("blockquote");
    			if (default_slot) default_slot.c();
    			add_location(blockquote, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, blockquote, anchor);

    			if (default_slot) {
    				default_slot.m(blockquote, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(blockquote);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Blockquote', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Blockquote> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Blockquote extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Blockquote",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Code.svelte generated by Svelte v3.47.0 */

    const file$3 = "node_modules/svelte-markdown/src/renderers/Code.svelte";

    function create_fragment$6(ctx) {
    	let pre;
    	let code;
    	let t;

    	const block = {
    		c: function create() {
    			pre = element("pre");
    			code = element("code");
    			t = text(/*text*/ ctx[1]);
    			add_location(code, file$3, 5, 18, 74);
    			attr_dev(pre, "class", /*lang*/ ctx[0]);
    			add_location(pre, file$3, 5, 0, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, pre, anchor);
    			append_dev(pre, code);
    			append_dev(code, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);

    			if (dirty & /*lang*/ 1) {
    				attr_dev(pre, "class", /*lang*/ ctx[0]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(pre);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Code', slots, []);
    	let { lang } = $$props;
    	let { text } = $$props;
    	const writable_props = ['lang', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ lang, text });

    	$$self.$inject_state = $$props => {
    		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [lang, text];
    }

    class Code extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { lang: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Code",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*lang*/ ctx[0] === undefined && !('lang' in props)) {
    			console.warn("<Code> was created without expected prop 'lang'");
    		}

    		if (/*text*/ ctx[1] === undefined && !('text' in props)) {
    			console.warn("<Code> was created without expected prop 'text'");
    		}
    	}

    	get lang() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lang(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Br.svelte generated by Svelte v3.47.0 */

    const file$2 = "node_modules/svelte-markdown/src/renderers/Br.svelte";

    function create_fragment$5(ctx) {
    	let br;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			br = element("br");
    			if (default_slot) default_slot.c();
    			add_location(br, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Br', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Br> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Br extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Br",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const defaultRenderers = {
      heading: Heading,
      paragraph: Paragraph,
      text: Text,
      image: Image,
      link: Link,
      em: Em,
      strong: Strong,
      codespan: Codespan,
      del: Del,
      table: Table,
      tablehead: TableHead,
      tablebody: TableBody,
      tablerow: TableRow,
      tablecell: TableCell,
      list: List,
      orderedlistitem: null,
      unorderedlistitem: null,
      listitem: ListItem,
      hr: Hr,
      html: Html,
      blockquote: Blockquote,
      code: Code,
      br: Br,
    };
    const defaultOptions = {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      renderer: null,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      xhtml: false,
    };

    /* node_modules/svelte-markdown/src/SvelteMarkdown.svelte generated by Svelte v3.47.0 */

    function create_fragment$4(ctx) {
    	let parser;
    	let current;

    	parser = new Parser({
    			props: {
    				tokens: /*tokens*/ ctx[0],
    				renderers: /*combinedRenderers*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 1) parser_changes.tokens = /*tokens*/ ctx[0];
    			if (dirty & /*combinedRenderers*/ 2) parser_changes.renderers = /*combinedRenderers*/ ctx[1];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let slugger;
    	let combinedOptions;
    	let combinedRenderers;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SvelteMarkdown', slots, []);
    	let { source = '' } = $$props;
    	let { renderers = {} } = $$props;
    	let { options = {} } = $$props;
    	let { isInline = false } = $$props;
    	const dispatch = createEventDispatcher();
    	let tokens;
    	let lexer;
    	let mounted;

    	setContext(key, {
    		slug: val => slugger ? slugger.slug(val) : '',
    		getOptions: () => combinedOptions
    	});

    	onMount(() => {
    		$$invalidate(7, mounted = true);
    	});

    	const writable_props = ['source', 'renderers', 'options', 'isInline'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SvelteMarkdown> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('source' in $$props) $$invalidate(2, source = $$props.source);
    		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		createEventDispatcher,
    		onMount,
    		Parser,
    		Lexer,
    		Slugger,
    		defaultOptions,
    		defaultRenderers,
    		key,
    		source,
    		renderers,
    		options,
    		isInline,
    		dispatch,
    		tokens,
    		lexer,
    		mounted,
    		combinedOptions,
    		slugger,
    		combinedRenderers
    	});

    	$$self.$inject_state = $$props => {
    		if ('source' in $$props) $$invalidate(2, source = $$props.source);
    		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
    		if ('tokens' in $$props) $$invalidate(0, tokens = $$props.tokens);
    		if ('lexer' in $$props) $$invalidate(6, lexer = $$props.lexer);
    		if ('mounted' in $$props) $$invalidate(7, mounted = $$props.mounted);
    		if ('combinedOptions' in $$props) $$invalidate(8, combinedOptions = $$props.combinedOptions);
    		if ('slugger' in $$props) slugger = $$props.slugger;
    		if ('combinedRenderers' in $$props) $$invalidate(1, combinedRenderers = $$props.combinedRenderers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*source*/ 4) {
    			slugger = source ? new Slugger() : undefined;
    		}

    		if ($$self.$$.dirty & /*options*/ 16) {
    			$$invalidate(8, combinedOptions = { ...defaultOptions, ...options });
    		}

    		if ($$self.$$.dirty & /*combinedOptions, isInline, lexer, source, tokens*/ 357) {
    			{
    				$$invalidate(6, lexer = new Lexer(combinedOptions));

    				$$invalidate(0, tokens = isInline
    				? lexer.inlineTokens(source)
    				: lexer.lex(source));

    				dispatch('parsed', { tokens });
    			}
    		}

    		if ($$self.$$.dirty & /*renderers*/ 8) {
    			$$invalidate(1, combinedRenderers = { ...defaultRenderers, ...renderers });
    		}

    		if ($$self.$$.dirty & /*mounted, tokens*/ 129) {
    			mounted && dispatch('parsed', { tokens });
    		}
    	};

    	return [
    		tokens,
    		combinedRenderers,
    		source,
    		renderers,
    		options,
    		isInline,
    		lexer,
    		mounted,
    		combinedOptions
    	];
    }

    class SvelteMarkdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			source: 2,
    			renderers: 3,
    			options: 4,
    			isInline: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SvelteMarkdown",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get source() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set source(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get renderers() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set renderers(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isInline() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isInline(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/markdown/renderers/img.svelte generated by Svelte v3.47.0 */

    function create_fragment$3(ctx) {
    	let lazyimage;
    	let current;

    	lazyimage = new LazyImage({
    			props: {
    				src: /*url*/ ctx[2],
    				placeholder: "https://via.placeholder.com/250?text=TulioCalil",
    				alt: /*text*/ ctx[1],
    				title: /*title*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(lazyimage.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(lazyimage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const lazyimage_changes = {};
    			if (dirty & /*url*/ 4) lazyimage_changes.src = /*url*/ ctx[2];
    			if (dirty & /*text*/ 2) lazyimage_changes.alt = /*text*/ ctx[1];
    			if (dirty & /*title*/ 1) lazyimage_changes.title = /*title*/ ctx[0];
    			lazyimage.$set(lazyimage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lazyimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lazyimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(lazyimage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function checkUrl(url) {
    	try {
    		new URL(url);
    		return true;
    	} catch(_) {
    		return false;
    	}
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Img', slots, []);
    	let { href = "" } = $$props;
    	let { title = undefined } = $$props;
    	let { text = "" } = $$props;
    	let url = "";
    	const check = checkUrl(href);

    	if (check) {
    		url = href;
    	} else {
    		url = `${"http://localhost:1337"}${href}`;
    	}

    	const writable_props = ['href', 'title', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Img> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(3, href = $$props.href);
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({
    		LazyImage,
    		href,
    		title,
    		text,
    		url,
    		check,
    		checkUrl
    	});

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(3, href = $$props.href);
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, text, url, href];
    }

    class Img extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { href: 3, title: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Img",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get href() {
    		throw new Error("<Img>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Img>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Img>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Img>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Img>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Img>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/markdown/Markdown.svelte generated by Svelte v3.47.0 */

    function create_fragment$2(ctx) {
    	let sveltemarkdown;
    	let current;

    	sveltemarkdown = new SvelteMarkdown({
    			props: {
    				source: /*content*/ ctx[0] ?? "",
    				renderers: { image: Img }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sveltemarkdown.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sveltemarkdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sveltemarkdown_changes = {};
    			if (dirty & /*content*/ 1) sveltemarkdown_changes.source = /*content*/ ctx[0] ?? "";
    			sveltemarkdown.$set(sveltemarkdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sveltemarkdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sveltemarkdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sveltemarkdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Markdown', slots, []);
    	let { content } = $$props;
    	const writable_props = ['content'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Markdown> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('content' in $$props) $$invalidate(0, content = $$props.content);
    	};

    	$$self.$capture_state = () => ({ SvelteMarkdown, ImageComponent: Img, content });

    	$$self.$inject_state = $$props => {
    		if ('content' in $$props) $$invalidate(0, content = $$props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [content];
    }

    class Markdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { content: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Markdown",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*content*/ ctx[0] === undefined && !('content' in props)) {
    			console.warn("<Markdown> was created without expected prop 'content'");
    		}
    	}

    	get content() {
    		throw new Error("<Markdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<Markdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Post.svelte generated by Svelte v3.47.0 */

    const { document: document_1 } = globals;
    const file$1 = "src/routes/Post.svelte";

    // (86:2) {#if showModalImage}
    function create_if_block(ctx) {
    	let modalimage;
    	let current;

    	modalimage = new ModalImage({
    			props: {
    				image: /*modalImageSrc*/ ctx[4],
    				caption: /*modalImageCaption*/ ctx[3]
    			},
    			$$inline: true
    		});

    	modalimage.$on("close-modal", /*toggleModalImage*/ ctx[10]);

    	const block = {
    		c: function create() {
    			create_component(modalimage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalimage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalimage_changes = {};
    			if (dirty & /*modalImageSrc*/ 16) modalimage_changes.image = /*modalImageSrc*/ ctx[4];
    			if (dirty & /*modalImageCaption*/ 8) modalimage_changes.caption = /*modalImageCaption*/ ctx[3];
    			modalimage.$set(modalimage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalimage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(86:2) {#if showModalImage}",
    		ctx
    	});

    	return block;
    }

    // (101:11) <Link to="/post/{slug}#comments">
    function create_default_slot_1$1(ctx) {
    	let span;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("0");
    			t1 = text(" comentarios");
    			attr_dev(span, "data-cusdis-count-page-id", /*slug*/ ctx[8]);
    			add_location(span, file$1, 101, 12, 2880);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(101:11) <Link to=\\\"/post/{slug}#comments\\\">",
    		ctx
    	});

    	return block;
    }

    // (110:8) <Link to="#"           >
    function create_default_slot$1(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "img-fluid");
    			if (!src_url_equal(img.src, img_src_value = /*thumbnailUrl*/ ctx[6])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = "image " + (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || ''));
    			add_location(img, file$1, 110, 11, 3102);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*thumbnailUrl*/ 64 && !src_url_equal(img.src, img_src_value = /*thumbnailUrl*/ ctx[6])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*$post*/ 1 && img_alt_value !== (img_alt_value = "image " + (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || ''))) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(110:8) <Link to=\\\"#\\\"           >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let title_value;
    	let t0;
    	let article;
    	let t1;
    	let div5;
    	let header;
    	let h2;
    	let t2_value = (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || "") + "";
    	let t2;
    	let t3;
    	let div0;
    	let span0;
    	let t4;
    	let t5;
    	let span1;
    	let t6_value = /*readTime*/ ctx[7].minutes + "";
    	let t6;
    	let t7;
    	let span2;
    	let link0;
    	let t8;
    	let div2;
    	let figure;
    	let link1;
    	let t9;
    	let figcaption;
    	let markdown0;
    	let t10;
    	let div1;
    	let markdown1;
    	let t11;
    	let div4;
    	let div3;
    	let t12;
    	let commentbox;
    	let t13;
    	let seo;
    	let current;

    	document_1.title = title_value = "" + (/*blogInfo*/ ctx[1].blogName + "\n    " + ((/*$post*/ ctx[0]?.data?.data[0].attributes?.title)
    	? " - "
    	: "") + "\n    " + (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || ""));

    	let if_block = /*showModalImage*/ ctx[2] && create_if_block(ctx);

    	link0 = new Link$2({
    			props: {
    				to: "/post/" + /*slug*/ ctx[8] + "#comments",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$2({
    			props: {
    				to: "#",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	markdown0 = new Markdown({
    			props: {
    				content: /*$post*/ ctx[0]?.data?.data[0].attributes?.coverLegend
    			},
    			$$inline: true
    		});

    	markdown1 = new Markdown({
    			props: {
    				content: /*$post*/ ctx[0]?.data?.data[0].attributes?.content
    			},
    			$$inline: true
    		});

    	commentbox = new CommentBox({
    			props: {
    				slug: /*slug*/ ctx[8],
    				title: /*$post*/ ctx[0]?.data?.data[0].attributes?.title || ""
    			},
    			$$inline: true
    		});

    	seo = new SEO({
    			props: {
    				teste: /*$post*/ ctx[0]?.data?.data[0].attributes?.title
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			article = element("article");
    			if (if_block) if_block.c();
    			t1 = space();
    			div5 = element("div");
    			header = element("header");
    			h2 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			div0 = element("div");
    			span0 = element("span");
    			t4 = text("Publicado ");
    			t5 = text(/*formatedDate*/ ctx[5]);
    			span1 = element("span");
    			t6 = text(t6_value);
    			t7 = text(" min de leitura");
    			span2 = element("span");
    			create_component(link0.$$.fragment);
    			t8 = space();
    			div2 = element("div");
    			figure = element("figure");
    			create_component(link1.$$.fragment);
    			t9 = space();
    			figcaption = element("figcaption");
    			create_component(markdown0.$$.fragment);
    			t10 = space();
    			div1 = element("div");
    			create_component(markdown1.$$.fragment);
    			t11 = space();
    			div4 = element("div");
    			div3 = element("div");
    			t12 = space();
    			create_component(commentbox.$$.fragment);
    			t13 = space();
    			create_component(seo.$$.fragment);
    			attr_dev(h2, "class", "title mb-2");
    			add_location(h2, file$1, 95, 6, 2559);
    			attr_dev(span0, "class", "date");
    			add_location(span0, file$1, 97, 8, 2672);
    			attr_dev(span1, "class", "time");
    			add_location(span1, file$1, 97, 58, 2722);
    			attr_dev(span2, "class", "comment");
    			add_location(span2, file$1, 99, 9, 2801);
    			attr_dev(div0, "class", "meta mb-3");
    			add_location(div0, file$1, 96, 6, 2640);
    			attr_dev(header, "class", "blog-post-header");
    			add_location(header, file$1, 94, 4, 2519);
    			attr_dev(figcaption, "class", "mt-2 text-center image-caption");
    			add_location(figcaption, file$1, 116, 8, 3276);
    			attr_dev(figure, "class", "blog-banner");
    			add_location(figure, file$1, 108, 6, 3041);
    			attr_dev(div1, "id", "content-body");
    			add_location(div1, file$1, 120, 6, 3450);
    			attr_dev(div2, "class", "blog-post-body");
    			add_location(div2, file$1, 107, 4, 3006);
    			attr_dev(div3, "data-lyket-type", "clap");
    			attr_dev(div3, "data-lyket-namespace", "blog");
    			attr_dev(div3, "data-lyket-id", /*slug*/ ctx[8]);
    			add_location(div3, file$1, 126, 6, 3600);
    			attr_dev(div4, "class", "mt-5");
    			add_location(div4, file$1, 125, 4, 3575);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$1, 93, 2, 2491);
    			attr_dev(article, "class", "blog-post px-3 py-5 p-md-5");
    			add_location(article, file$1, 84, 0, 2287);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, article, anchor);
    			if (if_block) if_block.m(article, null);
    			append_dev(article, t1);
    			append_dev(article, div5);
    			append_dev(div5, header);
    			append_dev(header, h2);
    			append_dev(h2, t2);
    			append_dev(header, t3);
    			append_dev(header, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t4);
    			append_dev(span0, t5);
    			append_dev(div0, span1);
    			append_dev(span1, t6);
    			append_dev(span1, t7);
    			append_dev(div0, span2);
    			mount_component(link0, span2, null);
    			append_dev(div5, t8);
    			append_dev(div5, div2);
    			append_dev(div2, figure);
    			mount_component(link1, figure, null);
    			append_dev(figure, t9);
    			append_dev(figure, figcaption);
    			mount_component(markdown0, figcaption, null);
    			append_dev(div2, t10);
    			append_dev(div2, div1);
    			mount_component(markdown1, div1, null);
    			append_dev(div5, t11);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div5, t12);
    			mount_component(commentbox, div5, null);
    			insert_dev(target, t13, anchor);
    			mount_component(seo, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*blogInfo, $post*/ 3) && title_value !== (title_value = "" + (/*blogInfo*/ ctx[1].blogName + "\n    " + ((/*$post*/ ctx[0]?.data?.data[0].attributes?.title)
    			? " - "
    			: "") + "\n    " + (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || "")))) {
    				document_1.title = title_value;
    			}

    			if (/*showModalImage*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*showModalImage*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(article, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if ((!current || dirty & /*$post*/ 1) && t2_value !== (t2_value = (/*$post*/ ctx[0]?.data?.data[0].attributes?.title || "") + "")) set_data_dev(t2, t2_value);
    			if (!current || dirty & /*formatedDate*/ 32) set_data_dev(t5, /*formatedDate*/ ctx[5]);
    			if ((!current || dirty & /*readTime*/ 128) && t6_value !== (t6_value = /*readTime*/ ctx[7].minutes + "")) set_data_dev(t6, t6_value);
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope, thumbnailUrl, $post*/ 65601) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const markdown0_changes = {};
    			if (dirty & /*$post*/ 1) markdown0_changes.content = /*$post*/ ctx[0]?.data?.data[0].attributes?.coverLegend;
    			markdown0.$set(markdown0_changes);
    			const markdown1_changes = {};
    			if (dirty & /*$post*/ 1) markdown1_changes.content = /*$post*/ ctx[0]?.data?.data[0].attributes?.content;
    			markdown1.$set(markdown1_changes);
    			const commentbox_changes = {};
    			if (dirty & /*$post*/ 1) commentbox_changes.title = /*$post*/ ctx[0]?.data?.data[0].attributes?.title || "";
    			commentbox.$set(commentbox_changes);
    			const seo_changes = {};
    			if (dirty & /*$post*/ 1) seo_changes.teste = /*$post*/ ctx[0]?.data?.data[0].attributes?.title;
    			seo.$set(seo_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(markdown0.$$.fragment, local);
    			transition_in(markdown1.$$.fragment, local);
    			transition_in(commentbox.$$.fragment, local);
    			transition_in(seo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(markdown0.$$.fragment, local);
    			transition_out(markdown1.$$.fragment, local);
    			transition_out(commentbox.$$.fragment, local);
    			transition_out(seo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(article);
    			if (if_block) if_block.d();
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(markdown0);
    			destroy_component(markdown1);
    			destroy_component(commentbox);
    			if (detaching) detach_dev(t13);
    			destroy_component(seo, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let readTime;
    	let thumb;
    	let thumbnailUrl;
    	let formatedDate;
    	let $post;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Post', slots, []);
    	const navigate = useNavigate();
    	let blogInfo;
    	const slug = window.location.pathname.split("/")[2];
    	let showModalImage = false;
    	let modalImageCaption = "";
    	let modalImageSrc = "";
    	const post = useQuery(`post-${slug}`, () => getOnePost(slug));
    	validate_store(post, 'post');
    	component_subscribe($$self, post, value => $$invalidate(0, $post = value));

    	setTimeout(
    		() => {
    			hljs.highlightAll();
    		},
    		1500
    	);

    	const api_url = "http://localhost:1337";

    	const unsubscribe = blogInfoStore.subscribe(value => {
    		$$invalidate(1, blogInfo = value);
    	});

    	function toggleModalImage(element) {
    		if (element && element.target) {
    			$$invalidate(3, modalImageCaption = element.target.alt);
    			$$invalidate(4, modalImageSrc = element.target.src);
    		}

    		$$invalidate(2, showModalImage = !showModalImage);
    	}

    	function setImagesClick() {
    		const images = document.getElementById("content-body").querySelectorAll("img");

    		images.forEach(image => {
    			image.onclick = toggleModalImage;
    		});
    	}

    	setTimeout(
    		() => {
    			setImagesClick();
    		},
    		900
    	);

    	onDestroy(unsubscribe);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Post> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onDestroy,
    		formatDistance: formatDistance$1,
    		pt_br,
    		readingTime,
    		Link: Link$2,
    		useNavigate,
    		useQuery,
    		CommentBox,
    		SEO,
    		getOnePost,
    		ModalImage,
    		Markdown,
    		blogInfoStore,
    		navigate,
    		blogInfo,
    		slug,
    		showModalImage,
    		modalImageCaption,
    		modalImageSrc,
    		post,
    		api_url,
    		unsubscribe,
    		toggleModalImage,
    		setImagesClick,
    		formatedDate,
    		thumb,
    		thumbnailUrl,
    		readTime,
    		$post
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogInfo' in $$props) $$invalidate(1, blogInfo = $$props.blogInfo);
    		if ('showModalImage' in $$props) $$invalidate(2, showModalImage = $$props.showModalImage);
    		if ('modalImageCaption' in $$props) $$invalidate(3, modalImageCaption = $$props.modalImageCaption);
    		if ('modalImageSrc' in $$props) $$invalidate(4, modalImageSrc = $$props.modalImageSrc);
    		if ('formatedDate' in $$props) $$invalidate(5, formatedDate = $$props.formatedDate);
    		if ('thumb' in $$props) $$invalidate(11, thumb = $$props.thumb);
    		if ('thumbnailUrl' in $$props) $$invalidate(6, thumbnailUrl = $$props.thumbnailUrl);
    		if ('readTime' in $$props) $$invalidate(7, readTime = $$props.readTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$post*/ 1) {
    			$$invalidate(7, readTime = readingTime($post?.data?.data[0].attributes?.content, 100));
    		}

    		if ($$self.$$.dirty & /*$post*/ 1) {
    			$$invalidate(11, thumb = $post?.data?.data[0].attributes?.cover?.data.attributes.url);
    		}

    		if ($$self.$$.dirty & /*thumb*/ 2048) {
    			$$invalidate(6, thumbnailUrl = thumb ? `${api_url}${thumb}` : "");
    		}

    		if ($$self.$$.dirty & /*$post*/ 1) {
    			$$invalidate(5, formatedDate = ($post?.data?.data[0].attributes?.publishedAt)
    			? formatDistance$1(new Date($post?.data?.data[0].attributes?.publishedAt), new Date(), { addSuffix: true, locale: pt_br })
    			: "");
    		}
    	};

    	return [
    		$post,
    		blogInfo,
    		showModalImage,
    		modalImageCaption,
    		modalImageSrc,
    		formatedDate,
    		thumbnailUrl,
    		readTime,
    		slug,
    		post,
    		toggleModalImage,
    		thumb
    	];
    }

    class Post extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Post",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    // (39:4) <QueryClientProvider client={queryClient}>
    function create_default_slot_1(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let current;

    	route0 = new Route$1({
    			props: { path: "post/:id", component: Post },
    			$$inline: true
    		});

    	route1 = new Route$1({
    			props: { path: "about", component: Post },
    			$$inline: true
    		});

    	route2 = new Route$1({
    			props: { component: Home },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(39:4) <QueryClientProvider client={queryClient}>",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Router>
    function create_default_slot(ctx) {
    	let nav;
    	let sidebar;
    	let t;
    	let div;
    	let queryclientprovider;
    	let current;
    	sidebar = new Sidebar({ $$inline: true });

    	queryclientprovider = new QueryClientProvider$1({
    			props: {
    				client: /*queryClient*/ ctx[0],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			create_component(sidebar.$$.fragment);
    			t = space();
    			div = element("div");
    			create_component(queryclientprovider.$$.fragment);
    			add_location(nav, file, 33, 2, 903);
    			attr_dev(div, "class", "main-wrapper");
    			add_location(div, file, 37, 2, 937);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			mount_component(sidebar, nav, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(queryclientprovider, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const queryclientprovider_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				queryclientprovider_changes.$$scope = { dirty, ctx };
    			}

    			queryclientprovider.$set(queryclientprovider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(queryclientprovider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(queryclientprovider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(sidebar);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_component(queryclientprovider);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(33:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let googleanalytics;
    	let t0;
    	let router;
    	let t1;
    	let footer;
    	let current;

    	googleanalytics = new GoogleAnalytics({
    			props: { properties: ["123"] },
    			$$inline: true
    		});

    	router = new Router$1({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(googleanalytics.$$.fragment);
    			t0 = space();
    			create_component(router.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(googleanalytics, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(router, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(googleanalytics.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(googleanalytics.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(googleanalytics, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(router, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let blogInfo = {};
    	const queryClient = new QueryClient();

    	blogInfoStore.subscribe(value => {
    		blogInfo = value;
    	});

    	getAllAbout().then(response => {
    		blogInfoStore.set(response.attributes);
    	});

    	console.log("carrega");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router: Router$1,
    		Route: Route$1,
    		GoogleAnalytics,
    		QueryClient,
    		QueryClientProvider: QueryClientProvider$1,
    		getAllAbout,
    		Sidebar,
    		Footer,
    		SEO,
    		Home,
    		Post,
    		blogInfoStore,
    		blogInfo,
    		queryClient
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogInfo' in $$props) blogInfo = $$props.blogInfo;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [queryClient];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.getElementById("app"),
      props: {},
    });

    return app;

})(svelteMetaTags);
//# sourceMappingURL=bundle.js.map
