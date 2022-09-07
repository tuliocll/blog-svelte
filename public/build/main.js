
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign$1(tar, src) {
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
            return noop;
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
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
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
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
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
            update: noop,
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
            this.$destroy = noop;
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

    const isNumber = value => typeof value === "number";

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
    function writable(value, start = noop) {
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
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
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
            let cleanup = noop;
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
                    cleanup = is_function(result) ? result : noop;
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
    			if (isNumber(to)) {
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

    const file$a = "node_modules/svelte-navigator/src/Router.svelte";

    // (195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}
    function create_if_block$1(ctx) {
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
    			add_location(div, file$a, 195, 1, 5906);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	let if_block = /*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements && create_if_block$1(ctx);

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
    			add_location(div, file$a, 190, 0, 5750);
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId$1 = createCounter();
    const defaultBasepath = "/";

    function instance$a($$self, $$props, $$invalidate) {
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
    			instance$a,
    			create_fragment$a,
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
    			id: create_fragment$a.name
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
    		const target = isNumber(to) ? to : resolve(to);
    		return navigate(target, options);
    	};
    	return navigateRelative;
    }

    /* node_modules/svelte-navigator/src/Route.svelte generated by Svelte v3.47.0 */
    const file$9 = "node_modules/svelte-navigator/src/Route.svelte";

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
    function create_if_block(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				primary: /*primary*/ ctx[1],
    				$$slots: { default: [create_default_slot$2] },
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(97:0) {#if isActive}",
    		ctx
    	});

    	return block;
    }

    // (113:2) {:else}
    function create_else_block(ctx) {
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
    		id: create_else_block.name,
    		type: "else",
    		source: "(113:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (105:2) {#if component !== null}
    function create_if_block_1(ctx) {
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
    			switch_instance_props = assign$1(switch_instance_props, switch_instance_spread_levels[i]);
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
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(105:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    // (98:1) <Router {primary}>
    function create_default_slot$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
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
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(98:1) <Router {primary}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let current;
    	let if_block = /*isActive*/ ctx[2] && create_if_block(ctx);

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
    			add_location(div0, file$9, 95, 0, 2622);
    			set_style(div1, "display", "none");
    			attr_dev(div1, "aria-hidden", "true");
    			attr_dev(div1, "data-svnav-route-end", /*id*/ ctx[5]);
    			add_location(div1, file$9, 121, 0, 3295);
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
    					if_block = create_if_block(ctx);
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId = createCounter();

    function instance$9($$self, $$props, $$invalidate) {
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
    		$$invalidate(23, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
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
    		$$invalidate(23, $$props = assign$1(assign$1({}, $$props), $$new_props));
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

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			path: 12,
    			component: 0,
    			meta: 13,
    			primary: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$9.name
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
    const file$8 = "node_modules/svelte-navigator/src/Link.svelte";

    function create_fragment$8(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let a_levels = [{ href: /*href*/ ctx[0] }, /*ariaCurrent*/ ctx[2], /*props*/ ctx[1]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign$1(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$8, 63, 0, 1735);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
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
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
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
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), $$new_props));
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

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { to: 5, replace: 6, state: 7, getProps: 8 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$8.name
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

    var Link$1 = Link;

    /* src/components/sidebar/Sidebar.svelte generated by Svelte v3.47.0 */
    const file$7 = "src/components/sidebar/Sidebar.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (14:37) <Link to="/">
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*blogName*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*blogName*/ 1) set_data_dev(t, /*blogName*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(14:37) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (42:10) {#each socialNetworks as social}
    function create_each_block_1(ctx) {
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
    			attr_dev(i, "class", i_class_value = "fab " + /*social*/ ctx[9].icon + " fa-fw");
    			add_location(i, file$7, 43, 36, 1221);
    			attr_dev(a, "href", a_href_value = /*social*/ ctx[9].link);
    			add_location(a, file$7, 43, 14, 1199);
    			attr_dev(li, "class", "list-inline-item");
    			add_location(li, file$7, 42, 12, 1155);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, i);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*socialNetworks*/ 8 && i_class_value !== (i_class_value = "fab " + /*social*/ ctx[9].icon + " fa-fw")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*socialNetworks*/ 8 && a_href_value !== (a_href_value = /*social*/ ctx[9].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(42:10) {#each socialNetworks as social}",
    		ctx
    	});

    	return block;
    }

    // (52:8) {#each pages as page}
    function create_each_block$1(ctx) {
    	let li;
    	let a;
    	let i;
    	let i_class_value;
    	let t0_value = /*page*/ ctx[6].name + "";
    	let t0;
    	let t1;
    	let span;
    	let a_href_value;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			i = element("i");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			span.textContent = "(current)";
    			t3 = space();
    			attr_dev(i, "class", i_class_value = "fas " + /*page*/ ctx[6].icon + " fa-fw mr-2");
    			add_location(i, file$7, 54, 15, 1527);
    			attr_dev(span, "class", "sr-only");
    			add_location(span, file$7, 55, 14, 1593);
    			attr_dev(a, "class", "nav-link");
    			attr_dev(a, "href", a_href_value = /*page*/ ctx[6].link);
    			add_location(a, file$7, 53, 12, 1475);
    			attr_dev(li, "class", "nav-item active");
    			add_location(li, file$7, 52, 10, 1434);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, i);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, span);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pages*/ 32 && i_class_value !== (i_class_value = "fas " + /*page*/ ctx[6].icon + " fa-fw mr-2")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*pages*/ 32 && t0_value !== (t0_value = /*page*/ ctx[6].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*pages*/ 32 && a_href_value !== (a_href_value = /*page*/ ctx[6].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(52:8) {#each pages as page}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let header;
    	let h1;
    	let link;
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
    	let t3;
    	let br;
    	let a;
    	let t4;
    	let t5;
    	let ul0;
    	let t6;
    	let hr;
    	let t7;
    	let ul1;
    	let current;

    	link = new Link$1({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value_1 = /*socialNetworks*/ ctx[3];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*pages*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			header = element("header");
    			h1 = element("h1");
    			create_component(link.$$.fragment);
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
    			t3 = text(/*bio*/ ctx[1]);
    			br = element("br");
    			a = element("a");
    			t4 = text(/*aboutMeText*/ ctx[2]);
    			t5 = space();
    			ul0 = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();
    			hr = element("hr");
    			t7 = space();
    			ul1 = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "blog-name pt-lg-4 mb-0");
    			add_location(h1, file$7, 13, 2, 258);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$7, 25, 6, 614);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navigation");
    			attr_dev(button, "aria-controls", "navigation");
    			attr_dev(button, "aria-expanded", "false");
    			attr_dev(button, "aria-label", "Toggle navigation");
    			add_location(button, file$7, 16, 4, 386);
    			attr_dev(img, "class", "profile-image mb-3 rounded-circle mx-auto");
    			if (!src_url_equal(img.src, img_src_value = /*profilePicture*/ ctx[4])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = "image " + /*blogName*/ ctx[0]);
    			add_location(img, file$7, 30, 8, 794);
    			add_location(br, file$7, 37, 15, 981);
    			attr_dev(a, "href", "about.html");
    			add_location(a, file$7, 37, 21, 987);
    			attr_dev(div0, "class", "bio mb-3");
    			add_location(div0, file$7, 36, 8, 943);
    			attr_dev(ul0, "class", "social-list list-inline py-3 mx-auto");
    			add_location(ul0, file$7, 40, 8, 1050);
    			add_location(hr, file$7, 47, 8, 1321);
    			attr_dev(div1, "class", "profile-section pt-3 pt-lg-0");
    			add_location(div1, file$7, 29, 6, 743);
    			attr_dev(ul1, "class", "navbar-nav flex-column text-left");
    			add_location(ul1, file$7, 50, 6, 1348);
    			attr_dev(div2, "id", "navigation");
    			attr_dev(div2, "class", "collapse navbar-collapse flex-column");
    			add_location(div2, file$7, 28, 4, 670);
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-dark");
    			add_location(nav, file$7, 15, 2, 332);
    			attr_dev(header, "class", "header text-center");
    			add_location(header, file$7, 12, 0, 220);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, h1);
    			mount_component(link, h1, null);
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
    			append_dev(div0, a);
    			append_dev(a, t4);
    			append_dev(div1, t5);
    			append_dev(div1, ul0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul0, null);
    			}

    			append_dev(div1, t6);
    			append_dev(div1, hr);
    			append_dev(div2, t7);
    			append_dev(div2, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope, blogName*/ 4097) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (!current || dirty & /*profilePicture*/ 16 && !src_url_equal(img.src, img_src_value = /*profilePicture*/ ctx[4])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*blogName*/ 1 && img_alt_value !== (img_alt_value = "image " + /*blogName*/ ctx[0])) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (!current || dirty & /*bio*/ 2) set_data_dev(t3, /*bio*/ ctx[1]);
    			if (!current || dirty & /*aboutMeText*/ 4) set_data_dev(t4, /*aboutMeText*/ ctx[2]);

    			if (dirty & /*socialNetworks*/ 8) {
    				each_value_1 = /*socialNetworks*/ ctx[3];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*pages*/ 32) {
    				each_value = /*pages*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
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
    			if (detaching) detach_dev(header);
    			destroy_component(link);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
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
    	validate_slots('Sidebar', slots, []);
    	let { blogName } = $$props;
    	let { bio } = $$props;
    	let { aboutMeText } = $$props;
    	let { socialNetworks = [] } = $$props;
    	let { profilePicture } = $$props;
    	let { pages = [] } = $$props;
    	const writable_props = ['blogName', 'bio', 'aboutMeText', 'socialNetworks', 'profilePicture', 'pages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(1, bio = $$props.bio);
    		if ('aboutMeText' in $$props) $$invalidate(2, aboutMeText = $$props.aboutMeText);
    		if ('socialNetworks' in $$props) $$invalidate(3, socialNetworks = $$props.socialNetworks);
    		if ('profilePicture' in $$props) $$invalidate(4, profilePicture = $$props.profilePicture);
    		if ('pages' in $$props) $$invalidate(5, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({
    		Link: Link$1,
    		blogName,
    		bio,
    		aboutMeText,
    		socialNetworks,
    		profilePicture,
    		pages
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(1, bio = $$props.bio);
    		if ('aboutMeText' in $$props) $$invalidate(2, aboutMeText = $$props.aboutMeText);
    		if ('socialNetworks' in $$props) $$invalidate(3, socialNetworks = $$props.socialNetworks);
    		if ('profilePicture' in $$props) $$invalidate(4, profilePicture = $$props.profilePicture);
    		if ('pages' in $$props) $$invalidate(5, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [blogName, bio, aboutMeText, socialNetworks, profilePicture, pages];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			blogName: 0,
    			bio: 1,
    			aboutMeText: 2,
    			socialNetworks: 3,
    			profilePicture: 4,
    			pages: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*blogName*/ ctx[0] === undefined && !('blogName' in props)) {
    			console.warn("<Sidebar> was created without expected prop 'blogName'");
    		}

    		if (/*bio*/ ctx[1] === undefined && !('bio' in props)) {
    			console.warn("<Sidebar> was created without expected prop 'bio'");
    		}

    		if (/*aboutMeText*/ ctx[2] === undefined && !('aboutMeText' in props)) {
    			console.warn("<Sidebar> was created without expected prop 'aboutMeText'");
    		}

    		if (/*profilePicture*/ ctx[4] === undefined && !('profilePicture' in props)) {
    			console.warn("<Sidebar> was created without expected prop 'profilePicture'");
    		}
    	}

    	get blogName() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogName(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bio() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bio(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get aboutMeText() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aboutMeText(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get socialNetworks() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set socialNetworks(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get profilePicture() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set profilePicture(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pages() {
    		throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/footer/Footer.svelte generated by Svelte v3.47.0 */

    const file$6 = "src/components/footer/Footer.svelte";

    function create_fragment$6(ctx) {
    	let footer;
    	let small;
    	let t0;
    	let i;
    	let t1;
    	let a;
    	let t3;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			small = element("small");
    			t0 = text("Designed with ");
    			i = element("i");
    			t1 = text(" by\n    ");
    			a = element("a");
    			a.textContent = "Xiaoying Riley";
    			t3 = text(" for\n    developers");
    			attr_dev(i, "class", "fas fa-heart");
    			set_style(i, "color", "#fb866a");
    			add_location(i, file$6, 3, 19, 432);
    			attr_dev(a, "href", "http://themes.3rdwavemedia.com");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$6, 4, 4, 490);
    			attr_dev(small, "class", "copyright");
    			add_location(small, file$6, 2, 2, 388);
    			attr_dev(footer, "class", "footer text-center py-2 theme-bg-dark");
    			add_location(footer, file$6, 0, 0, 0);
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
    			append_dev(small, a);
    			append_dev(small, t3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
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

    function instance$6($$self, $$props) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/newsletter/Newsletter.svelte generated by Svelte v3.47.0 */

    const file$5 = "src/components/newsletter/Newsletter.svelte";

    function create_fragment$5(ctx) {
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
    			add_location(h2, file$5, 13, 4, 301);
    			attr_dev(div0, "class", "intro");
    			add_location(div0, file$5, 14, 4, 358);
    			attr_dev(label, "class", "sr-only");
    			attr_dev(label, "for", "semail");
    			add_location(label, file$5, 22, 8, 567);
    			attr_dev(input, "type", "email");
    			attr_dev(input, "id", "semail");
    			attr_dev(input, "name", "semail1");
    			attr_dev(input, "class", "form-control mr-md-1 semail");
    			attr_dev(input, "placeholder", "Digite seu email");
    			input.required = true;
    			add_location(input, file$5, 23, 8, 629);
    			attr_dev(div1, "class", "form-group");
    			add_location(div1, file$5, 21, 6, 534);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "btn btn-primary");
    			add_location(button, file$5, 32, 6, 842);
    			attr_dev(form, "class", "signup-form form-inline justify-content-center pt-3");
    			add_location(form, file$5, 17, 4, 416);
    			attr_dev(div2, "class", "container text-center");
    			add_location(div2, file$5, 12, 2, 261);
    			attr_dev(section, "class", "cta-section theme-bg-light py-5");
    			add_location(section, file$5, 11, 0, 209);
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
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

    function handleSubscribe(event) {
    	event.preventDefault();
    	event.target[0].value;
    }

    function instance$5($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			blogName: 0,
    			blogSubtitle: 1,
    			newsletterText: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Newsletter",
    			options,
    			id: create_fragment$5.name
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

    function assign(target, dirtyObject) {
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
      return assign({}, dirtyObject);
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

    /* src/components/post/Post.svelte generated by Svelte v3.47.0 */
    const file$4 = "src/components/post/Post.svelte";

    function create_fragment$4(ctx) {
    	let div4;
    	let div3;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div2;
    	let h3;
    	let a0;
    	let t1;
    	let a0_href_value;
    	let t2;
    	let div0;
    	let span0;
    	let span1;
    	let t5;
    	let t6;
    	let span2;
    	let a1;
    	let t7;
    	let t8;
    	let a1_href_value;
    	let t9;
    	let div1;
    	let t10;
    	let t11;
    	let a2;
    	let t12;
    	let a2_href_value;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t0 = space();
    			div2 = element("div");
    			h3 = element("h3");
    			a0 = element("a");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = `Publicado ${/*formatedDate*/ ctx[6]}`;
    			span1 = element("span");
    			t5 = text(/*readTime*/ ctx[2]);
    			t6 = text(" min de leitura");
    			span2 = element("span");
    			a1 = element("a");
    			t7 = text(/*comments*/ ctx[3]);
    			t8 = text(" comentarios");
    			t9 = space();
    			div1 = element("div");
    			t10 = text(/*preview*/ ctx[4]);
    			t11 = space();
    			a2 = element("a");
    			t12 = text("Continue lendo →");
    			attr_dev(img, "class", "mr-3 img-fluid post-thumb d-none d-md-flex");
    			if (!src_url_equal(img.src, img_src_value = /*thumb*/ ctx[5])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = "image " + /*title*/ ctx[0]);
    			add_location(img, file$4, 20, 4, 422);
    			attr_dev(a0, "href", a0_href_value = "/post/" + /*slug*/ ctx[1]);
    			add_location(a0, file$4, 27, 8, 602);
    			attr_dev(h3, "class", "title mb-1");
    			add_location(h3, file$4, 26, 6, 570);
    			attr_dev(span0, "class", "date");
    			add_location(span0, file$4, 30, 8, 687);
    			attr_dev(span1, "class", "time");
    			add_location(span1, file$4, 30, 58, 737);
    			attr_dev(a1, "href", a1_href_value = "/post/" + /*slug*/ ctx[1] + "#comments");
    			add_location(a1, file$4, 33, 11, 841);
    			attr_dev(span2, "class", "comment");
    			add_location(span2, file$4, 32, 9, 808);
    			attr_dev(div0, "class", "meta mb-1");
    			add_location(div0, file$4, 29, 6, 655);
    			attr_dev(div1, "class", "intro");
    			add_location(div1, file$4, 36, 6, 935);
    			attr_dev(a2, "class", "more-link");
    			attr_dev(a2, "href", a2_href_value = "/post/" + /*slug*/ ctx[1]);
    			add_location(a2, file$4, 39, 6, 992);
    			attr_dev(div2, "class", "media-body");
    			add_location(div2, file$4, 25, 4, 539);
    			attr_dev(div3, "class", "media");
    			add_location(div3, file$4, 19, 2, 398);
    			attr_dev(div4, "class", "item mb-5");
    			add_location(div4, file$4, 18, 0, 372);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, img);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, h3);
    			append_dev(h3, a0);
    			append_dev(a0, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(div0, span1);
    			append_dev(span1, t5);
    			append_dev(span1, t6);
    			append_dev(div0, span2);
    			append_dev(span2, a1);
    			append_dev(a1, t7);
    			append_dev(a1, t8);
    			append_dev(div2, t9);
    			append_dev(div2, div1);
    			append_dev(div1, t10);
    			append_dev(div2, t11);
    			append_dev(div2, a2);
    			append_dev(a2, t12);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*thumb*/ 32 && !src_url_equal(img.src, img_src_value = /*thumb*/ ctx[5])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 1 && img_alt_value !== (img_alt_value = "image " + /*title*/ ctx[0])) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);

    			if (dirty & /*slug*/ 2 && a0_href_value !== (a0_href_value = "/post/" + /*slug*/ ctx[1])) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty & /*readTime*/ 4) set_data_dev(t5, /*readTime*/ ctx[2]);
    			if (dirty & /*comments*/ 8) set_data_dev(t7, /*comments*/ ctx[3]);

    			if (dirty & /*slug*/ 2 && a1_href_value !== (a1_href_value = "/post/" + /*slug*/ ctx[1] + "#comments")) {
    				attr_dev(a1, "href", a1_href_value);
    			}

    			if (dirty & /*preview*/ 16) set_data_dev(t10, /*preview*/ ctx[4]);

    			if (dirty & /*slug*/ 2 && a2_href_value !== (a2_href_value = "/post/" + /*slug*/ ctx[1])) {
    				attr_dev(a2, "href", a2_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Post', slots, []);
    	let { title } = $$props;
    	let { slug } = $$props;
    	let { date } = $$props;
    	let { readTime } = $$props;
    	let { comments } = $$props;
    	let { preview } = $$props;
    	let { thumb } = $$props;
    	const formatedDate = formatDistance$1(new Date(date), new Date(), { addSuffix: true, locale: pt_br });
    	const writable_props = ['title', 'slug', 'date', 'readTime', 'comments', 'preview', 'thumb'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Post> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
    		if ('date' in $$props) $$invalidate(7, date = $$props.date);
    		if ('readTime' in $$props) $$invalidate(2, readTime = $$props.readTime);
    		if ('comments' in $$props) $$invalidate(3, comments = $$props.comments);
    		if ('preview' in $$props) $$invalidate(4, preview = $$props.preview);
    		if ('thumb' in $$props) $$invalidate(5, thumb = $$props.thumb);
    	};

    	$$self.$capture_state = () => ({
    		formatDistance: formatDistance$1,
    		pt_br,
    		title,
    		slug,
    		date,
    		readTime,
    		comments,
    		preview,
    		thumb,
    		formatedDate
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
    		if ('date' in $$props) $$invalidate(7, date = $$props.date);
    		if ('readTime' in $$props) $$invalidate(2, readTime = $$props.readTime);
    		if ('comments' in $$props) $$invalidate(3, comments = $$props.comments);
    		if ('preview' in $$props) $$invalidate(4, preview = $$props.preview);
    		if ('thumb' in $$props) $$invalidate(5, thumb = $$props.thumb);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, slug, readTime, comments, preview, thumb, formatedDate, date];
    }

    class Post$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			title: 0,
    			slug: 1,
    			date: 7,
    			readTime: 2,
    			comments: 3,
    			preview: 4,
    			thumb: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Post",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Post> was created without expected prop 'title'");
    		}

    		if (/*slug*/ ctx[1] === undefined && !('slug' in props)) {
    			console.warn("<Post> was created without expected prop 'slug'");
    		}

    		if (/*date*/ ctx[7] === undefined && !('date' in props)) {
    			console.warn("<Post> was created without expected prop 'date'");
    		}

    		if (/*readTime*/ ctx[2] === undefined && !('readTime' in props)) {
    			console.warn("<Post> was created without expected prop 'readTime'");
    		}

    		if (/*comments*/ ctx[3] === undefined && !('comments' in props)) {
    			console.warn("<Post> was created without expected prop 'comments'");
    		}

    		if (/*preview*/ ctx[4] === undefined && !('preview' in props)) {
    			console.warn("<Post> was created without expected prop 'preview'");
    		}

    		if (/*thumb*/ ctx[5] === undefined && !('thumb' in props)) {
    			console.warn("<Post> was created without expected prop 'thumb'");
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

    	get date() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readTime() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readTime(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get comments() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set comments(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get preview() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set preview(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumb() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumb(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/pagination/Pagination.svelte generated by Svelte v3.47.0 */
    const file$3 = "src/components/pagination/Pagination.svelte";

    function create_fragment$3(ctx) {
    	let nav;
    	let button0;
    	let t0;
    	let i0;
    	let button0_class_value;
    	let t1;
    	let button1;
    	let t2;
    	let i1;
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
    			add_location(i0, file$3, 15, 15, 438);
    			attr_dev(button0, "class", button0_class_value = "nav-link-prev nav-item nav-link rounded-left border-0 " + (/*page*/ ctx[0] === 1 && 'd-none'));
    			add_location(button0, file$3, 11, 2, 289);
    			attr_dev(i1, "class", "arrow-next fas fa-long-arrow-alt-right");
    			add_location(i1, file$3, 20, 13, 620);
    			attr_dev(button1, "class", "nav-link-next nav-item nav-link rounded-right border-0");
    			add_location(button1, file$3, 17, 2, 506);
    			attr_dev(nav, "class", "blog-nav nav nav-justified my-5");
    			add_location(nav, file$3, 10, 0, 241);
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
    					listen_dev(button0, "click", /*previusPage*/ ctx[2], false, false, false),
    					listen_dev(button1, "click", /*nextPage*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*page*/ 1 && button0_class_value !== (button0_class_value = "nav-link-prev nav-item nav-link rounded-left border-0 " + (/*page*/ ctx[0] === 1 && 'd-none'))) {
    				attr_dev(button0, "class", button0_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
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

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Pagination', slots, []);
    	const dispatch = createEventDispatcher();
    	const nextPage = () => dispatch("next-page");
    	const previusPage = () => dispatch("previus-page");
    	let { page = 1 } = $$props;
    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pagination> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		nextPage,
    		previusPage,
    		page
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, nextPage, previusPage];
    }

    class Pagination extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pagination",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get page() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Home.svelte generated by Svelte v3.47.0 */
    const file$2 = "src/routes/Home.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (35:6) {#each posts as post}
    function create_each_block(ctx) {
    	let post;
    	let current;
    	const post_spread_levels = [/*post*/ ctx[12]];
    	let post_props = {};

    	for (let i = 0; i < post_spread_levels.length; i += 1) {
    		post_props = assign$1(post_props, post_spread_levels[i]);
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
    			const post_changes = (dirty & /*posts*/ 8)
    			? get_spread_update(post_spread_levels, [get_spread_object(/*post*/ ctx[12])])
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
    		id: create_each_block.name,
    		type: "each",
    		source: "(35:6) {#each posts as post}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let newsletter;
    	let t0;
    	let section;
    	let div;
    	let t1;
    	let pagination;
    	let current;

    	newsletter = new Newsletter({
    			props: {
    				blogName: /*blogName*/ ctx[0],
    				blogSubtitle: /*blogSubtitle*/ ctx[1],
    				newsletterText: /*newsletterText*/ ctx[2]
    			},
    			$$inline: true
    		});

    	let each_value = /*posts*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	pagination = new Pagination({
    			props: { page: /*currentPage*/ ctx[4] },
    			$$inline: true
    		});

    	pagination.$on("next-page", /*handleNextPage*/ ctx[5]);
    	pagination.$on("previus-page", /*handlePreviusPage*/ ctx[6]);

    	const block = {
    		c: function create() {
    			create_component(newsletter.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(pagination.$$.fragment);
    			attr_dev(div, "class", "container");
    			add_location(div, file$2, 33, 4, 762);
    			attr_dev(section, "class", "blog-list px-3 py-5 p-md-5");
    			add_location(section, file$2, 32, 2, 713);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(newsletter, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(section, t1);
    			mount_component(pagination, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const newsletter_changes = {};
    			if (dirty & /*blogName*/ 1) newsletter_changes.blogName = /*blogName*/ ctx[0];
    			if (dirty & /*blogSubtitle*/ 2) newsletter_changes.blogSubtitle = /*blogSubtitle*/ ctx[1];
    			if (dirty & /*newsletterText*/ 4) newsletter_changes.newsletterText = /*newsletterText*/ ctx[2];
    			newsletter.$set(newsletter_changes);

    			if (dirty & /*posts*/ 8) {
    				each_value = /*posts*/ ctx[3];
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
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const pagination_changes = {};
    			if (dirty & /*currentPage*/ 16) pagination_changes.page = /*currentPage*/ ctx[4];
    			pagination.$set(pagination_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(newsletter.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(pagination.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(newsletter.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(pagination.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(newsletter, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			destroy_component(pagination);
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
    	validate_slots('Home', slots, []);
    	let { blogName } = $$props;
    	let { bio } = $$props;
    	let { profilePicture } = $$props;
    	let { socialNetworks = [] } = $$props;
    	let { pages = [] } = $$props;
    	let { aboutMeText } = $$props;
    	let { blogSubtitle } = $$props;
    	let { newsletterText } = $$props;
    	let { posts = [] } = $$props;
    	let currentPage = 1;

    	function handleNextPage() {
    		$$invalidate(4, currentPage += 1);
    	}

    	function handlePreviusPage() {
    		$$invalidate(4, currentPage -= 1);
    	}

    	const writable_props = [
    		'blogName',
    		'bio',
    		'profilePicture',
    		'socialNetworks',
    		'pages',
    		'aboutMeText',
    		'blogSubtitle',
    		'newsletterText',
    		'posts'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(7, bio = $$props.bio);
    		if ('profilePicture' in $$props) $$invalidate(8, profilePicture = $$props.profilePicture);
    		if ('socialNetworks' in $$props) $$invalidate(9, socialNetworks = $$props.socialNetworks);
    		if ('pages' in $$props) $$invalidate(10, pages = $$props.pages);
    		if ('aboutMeText' in $$props) $$invalidate(11, aboutMeText = $$props.aboutMeText);
    		if ('blogSubtitle' in $$props) $$invalidate(1, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(2, newsletterText = $$props.newsletterText);
    		if ('posts' in $$props) $$invalidate(3, posts = $$props.posts);
    	};

    	$$self.$capture_state = () => ({
    		Newsletter,
    		Post: Post$1,
    		Pagination,
    		blogName,
    		bio,
    		profilePicture,
    		socialNetworks,
    		pages,
    		aboutMeText,
    		blogSubtitle,
    		newsletterText,
    		posts,
    		currentPage,
    		handleNextPage,
    		handlePreviusPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(7, bio = $$props.bio);
    		if ('profilePicture' in $$props) $$invalidate(8, profilePicture = $$props.profilePicture);
    		if ('socialNetworks' in $$props) $$invalidate(9, socialNetworks = $$props.socialNetworks);
    		if ('pages' in $$props) $$invalidate(10, pages = $$props.pages);
    		if ('aboutMeText' in $$props) $$invalidate(11, aboutMeText = $$props.aboutMeText);
    		if ('blogSubtitle' in $$props) $$invalidate(1, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(2, newsletterText = $$props.newsletterText);
    		if ('posts' in $$props) $$invalidate(3, posts = $$props.posts);
    		if ('currentPage' in $$props) $$invalidate(4, currentPage = $$props.currentPage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		blogName,
    		blogSubtitle,
    		newsletterText,
    		posts,
    		currentPage,
    		handleNextPage,
    		handlePreviusPage,
    		bio,
    		profilePicture,
    		socialNetworks,
    		pages,
    		aboutMeText
    	];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			blogName: 0,
    			bio: 7,
    			profilePicture: 8,
    			socialNetworks: 9,
    			pages: 10,
    			aboutMeText: 11,
    			blogSubtitle: 1,
    			newsletterText: 2,
    			posts: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*blogName*/ ctx[0] === undefined && !('blogName' in props)) {
    			console.warn("<Home> was created without expected prop 'blogName'");
    		}

    		if (/*bio*/ ctx[7] === undefined && !('bio' in props)) {
    			console.warn("<Home> was created without expected prop 'bio'");
    		}

    		if (/*profilePicture*/ ctx[8] === undefined && !('profilePicture' in props)) {
    			console.warn("<Home> was created without expected prop 'profilePicture'");
    		}

    		if (/*aboutMeText*/ ctx[11] === undefined && !('aboutMeText' in props)) {
    			console.warn("<Home> was created without expected prop 'aboutMeText'");
    		}

    		if (/*blogSubtitle*/ ctx[1] === undefined && !('blogSubtitle' in props)) {
    			console.warn("<Home> was created without expected prop 'blogSubtitle'");
    		}

    		if (/*newsletterText*/ ctx[2] === undefined && !('newsletterText' in props)) {
    			console.warn("<Home> was created without expected prop 'newsletterText'");
    		}
    	}

    	get blogName() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogName(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bio() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bio(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get profilePicture() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set profilePicture(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get socialNetworks() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set socialNetworks(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pages() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get aboutMeText() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aboutMeText(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blogSubtitle() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogSubtitle(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get newsletterText() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set newsletterText(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posts() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posts(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Post.svelte generated by Svelte v3.47.0 */

    const file$1 = "src/routes/Post.svelte";

    function create_fragment$1(ctx) {
    	let title_value;
    	let t0;
    	let article;
    	let div5;
    	let header;
    	let h20;
    	let t2;
    	let div0;
    	let span0;
    	let span1;
    	let span2;
    	let a0;
    	let t6;
    	let div2;
    	let figure0;
    	let a1;
    	let img0;
    	let img0_src_value;
    	let img0_alt_value;
    	let t7;
    	let figcaption;
    	let t8;
    	let a2;
    	let t10;
    	let p0;
    	let t12;
    	let h30;
    	let t14;
    	let p1;
    	let t15;
    	let a3;
    	let t17;
    	let t18;
    	let pre;
    	let code_1;
    	let t20;
    	let h31;
    	let t22;
    	let p2;
    	let t24;
    	let h50;
    	let t26;
    	let ul;
    	let li0;
    	let t28;
    	let li1;
    	let t30;
    	let li2;
    	let t32;
    	let ol;
    	let li3;
    	let t34;
    	let li4;
    	let t36;
    	let li5;
    	let t38;
    	let h51;
    	let t40;
    	let blockquote0;
    	let p3;
    	let t42;
    	let footer;
    	let t44;
    	let h52;
    	let t46;
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t48;
    	let th1;
    	let t50;
    	let th2;
    	let t52;
    	let th3;
    	let t54;
    	let tbody;
    	let tr1;
    	let th4;
    	let t56;
    	let td0;
    	let t58;
    	let td1;
    	let t60;
    	let td2;
    	let t62;
    	let tr2;
    	let th5;
    	let t64;
    	let td3;
    	let t66;
    	let td4;
    	let t68;
    	let td5;
    	let t70;
    	let tr3;
    	let th6;
    	let t72;
    	let td6;
    	let t74;
    	let td7;
    	let t76;
    	let td8;
    	let t78;
    	let h53;
    	let t80;
    	let blockquote1;
    	let p4;
    	let t81;
    	let br0;
    	let t82;
    	let br1;
    	let t83;
    	let br2;
    	let br3;
    	let t84;
    	let br4;
    	let t85;
    	let br5;
    	let t86;
    	let t87;
    	let a4;
    	let t89;
    	let script0;
    	let script0_src_value;
    	let t90;
    	let h32;
    	let t92;
    	let p5;
    	let t94;
    	let div1;
    	let iframe;
    	let iframe_src_value;
    	let t95;
    	let nav;
    	let a5;
    	let t96;
    	let i0;
    	let t97;
    	let a6;
    	let t98;
    	let i1;
    	let t99;
    	let div4;
    	let div3;
    	let t100;
    	let script1;
    	let t102;
    	let t105;
    	let section;
    	let div6;
    	let h21;
    	let t107;
    	let p6;
    	let t109;
    	let figure1;
    	let a8;
    	let img1;
    	let img1_src_value;
    	document.title = title_value = "" + (/*blogTitle*/ ctx[1] + " - " + /*title*/ ctx[0]);

    	const block = {
    		c: function create() {
    			t0 = space();
    			article = element("article");
    			div5 = element("div");
    			header = element("header");
    			h20 = element("h2");
    			h20.textContent = "Why Every Developer Should Have A Blog";
    			t2 = space();
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Published 3 months ago";
    			span1 = element("span");
    			span1.textContent = "5 min read";
    			span2 = element("span");
    			a0 = element("a");
    			a0.textContent = "4 comments";
    			t6 = space();
    			div2 = element("div");
    			figure0 = element("figure");
    			a1 = element("a");
    			img0 = element("img");
    			t7 = space();
    			figcaption = element("figcaption");
    			t8 = text("Image Credit: ");
    			a2 = element("a");
    			a2.textContent = "made4dev.com (Premium Programming T-shirts)";
    			t10 = space();
    			p0 = element("p");
    			p0.textContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.\n          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean\n          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat\n          vitae, eleifend ac, enim.";
    			t12 = space();
    			h30 = element("h3");
    			h30.textContent = "Code Block Example";
    			t14 = space();
    			p1 = element("p");
    			t15 = text("You can get more info at ");
    			a3 = element("a");
    			a3.textContent = "https://highlightjs.org/";
    			t17 = text(". Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.\n          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean\n          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat\n          vitae, eleifend ac, enim.");
    			t18 = space();
    			pre = element("pre");
    			code_1 = element("code");
    			code_1.textContent = `${/*code*/ ctx[2]}`;
    			t20 = space();
    			h31 = element("h3");
    			h31.textContent = "Typography";
    			t22 = space();
    			p2 = element("p");
    			p2.textContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus.";
    			t24 = space();
    			h50 = element("h5");
    			h50.textContent = "Bullet Points:";
    			t26 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Lorem ipsum dolor sit amet consectetuer.";
    			t28 = space();
    			li1 = element("li");
    			li1.textContent = "Aenean commodo ligula eget dolor.";
    			t30 = space();
    			li2 = element("li");
    			li2.textContent = "Aenean massa cum sociis natoque penatibus.";
    			t32 = space();
    			ol = element("ol");
    			li3 = element("li");
    			li3.textContent = "Lorem ipsum dolor sit amet consectetuer.";
    			t34 = space();
    			li4 = element("li");
    			li4.textContent = "Aenean commodo ligula eget dolor.";
    			t36 = space();
    			li5 = element("li");
    			li5.textContent = "Aenean massa cum sociis natoque penatibus.";
    			t38 = space();
    			h51 = element("h5");
    			h51.textContent = "Quote Example:";
    			t40 = space();
    			blockquote0 = element("blockquote");
    			p3 = element("p");
    			p3.textContent = "You might not think that programmers are artists, but programming is\n            an extremely creative profession. It's logic-based creativity.";
    			t42 = space();
    			footer = element("footer");
    			footer.textContent = "John Romero";
    			t44 = space();
    			h52 = element("h5");
    			h52.textContent = "Table Example:";
    			t46 = space();
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "#";
    			t48 = space();
    			th1 = element("th");
    			th1.textContent = "First";
    			t50 = space();
    			th2 = element("th");
    			th2.textContent = "Last";
    			t52 = space();
    			th3 = element("th");
    			th3.textContent = "Handle";
    			t54 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			th4 = element("th");
    			th4.textContent = "1";
    			t56 = space();
    			td0 = element("td");
    			td0.textContent = "Mark";
    			t58 = space();
    			td1 = element("td");
    			td1.textContent = "Otto";
    			t60 = space();
    			td2 = element("td");
    			td2.textContent = "@mdo";
    			t62 = space();
    			tr2 = element("tr");
    			th5 = element("th");
    			th5.textContent = "2";
    			t64 = space();
    			td3 = element("td");
    			td3.textContent = "Jacob";
    			t66 = space();
    			td4 = element("td");
    			td4.textContent = "Thornton";
    			t68 = space();
    			td5 = element("td");
    			td5.textContent = "@fat";
    			t70 = space();
    			tr3 = element("tr");
    			th6 = element("th");
    			th6.textContent = "3";
    			t72 = space();
    			td6 = element("td");
    			td6.textContent = "Larry";
    			t74 = space();
    			td7 = element("td");
    			td7.textContent = "the Bird";
    			t76 = space();
    			td8 = element("td");
    			td8.textContent = "@twitter";
    			t78 = space();
    			h53 = element("h5");
    			h53.textContent = "Embed A Tweet:";
    			t80 = space();
    			blockquote1 = element("blockquote");
    			p4 = element("p");
    			t81 = text("1969:");
    			br0 = element("br");
    			t82 = text("-what're you doing with that 2KB of RAM?");
    			br1 = element("br");
    			t83 = text("-sending people to the moon");
    			br2 = element("br");
    			br3 = element("br");
    			t84 = text("2017:");
    			br4 = element("br");
    			t85 = text("-what're you\n            doing with that 1.5GB of RAM?");
    			br5 = element("br");
    			t86 = text("-running Slack");
    			t87 = text("\n          — I Am Devloper (@iamdevloper)");
    			a4 = element("a");
    			a4.textContent = "November 3, 2017";
    			t89 = space();
    			script0 = element("script");
    			t90 = space();
    			h32 = element("h3");
    			h32.textContent = "Video Example";
    			t92 = space();
    			p5 = element("p");
    			p5.textContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n          consequat massa quis enim.";
    			t94 = space();
    			div1 = element("div");
    			iframe = element("iframe");
    			t95 = space();
    			nav = element("nav");
    			a5 = element("a");
    			t96 = text("Previous");
    			i0 = element("i");
    			t97 = space();
    			a6 = element("a");
    			t98 = text("Next");
    			i1 = element("i");
    			t99 = space();
    			div4 = element("div");
    			div3 = element("div");
    			t100 = space();
    			script1 = element("script");
    			script1.textContent = "/**\n           *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT\n           *  THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR\n           *  PLATFORM OR CMS.\n           *\n           *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT:\n           *  https://disqus.com/admin/universalcode/#configuration-variables\n           */\n          /*\n                    var disqus_config = function () {\n                        // Replace PAGE_URL with your page's canonical URL variable\n                        this.page.url = PAGE_URL;  \n                        \n                        // Replace PAGE_IDENTIFIER with your page's unique identifier variable\n                        this.page.identifier = PAGE_IDENTIFIER; \n                    };\n                    */\n\n          (function () {\n            // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW\n            var d = document,\n              s = d.createElement(\"script\");\n\n            // IMPORTANT: Replace 3wmthemes with your forum shortname!\n            s.src = \"https://3wmthemes.disqus.com/embed.js\";\n\n            s.setAttribute(\"data-timestamp\", +new Date());\n            (d.head || d.body).appendChild(s);\n          })();";
    			t102 = space();
    			t105 = space();
    			section = element("section");
    			div6 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Promo Section Heading";
    			t107 = space();
    			p6 = element("p");
    			p6.textContent = "You can use this section to promote your side projects etc. Lorem ipsum\n        dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget\n        dolor. Aenean massa.";
    			t109 = space();
    			figure1 = element("figure");
    			a8 = element("a");
    			img1 = element("img");
    			attr_dev(h20, "class", "title mb-2");
    			add_location(h20, file$1, 37, 8, 733);
    			attr_dev(span0, "class", "date");
    			add_location(span0, file$1, 39, 10, 842);
    			attr_dev(span1, "class", "time");
    			add_location(span1, file$1, 39, 58, 890);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$1, 41, 33, 972);
    			attr_dev(span2, "class", "comment");
    			add_location(span2, file$1, 41, 11, 950);
    			attr_dev(div0, "class", "meta mb-3");
    			add_location(div0, file$1, 38, 8, 808);
    			attr_dev(header, "class", "blog-post-header");
    			add_location(header, file$1, 36, 6, 691);
    			attr_dev(img0, "class", "img-fluid");
    			if (!src_url_equal(img0.src, img0_src_value = "assets/images/blog/blog-post-banner.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", img0_alt_value = "image " + /*title*/ ctx[0]);
    			add_location(img0, file$1, 48, 13, 1164);
    			attr_dev(a1, "href", "https://made4dev.com");
    			add_location(a1, file$1, 47, 10, 1120);
    			attr_dev(a2, "href", "https://made4dev.com?ref=devblog");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$1, 55, 26, 1413);
    			attr_dev(figcaption, "class", "mt-2 text-center image-caption");
    			add_location(figcaption, file$1, 54, 10, 1335);
    			attr_dev(figure0, "class", "blog-banner");
    			add_location(figure0, file$1, 46, 8, 1081);
    			add_location(p0, file$1, 61, 8, 1611);
    			attr_dev(h30, "class", "mt-5 mb-3");
    			add_location(h30, file$1, 74, 8, 2374);
    			attr_dev(a3, "href", "https://highlightjs.org/");
    			attr_dev(a3, "target", "_blank");
    			add_location(a3, file$1, 76, 35, 2467);
    			add_location(p1, file$1, 75, 8, 2428);
    			add_location(code_1, file$1, 90, 13, 3336);
    			add_location(pre, file$1, 90, 8, 3331);
    			attr_dev(h31, "class", "mt-5 mb-3");
    			add_location(h31, file$1, 91, 8, 3370);
    			add_location(p2, file$1, 92, 8, 3416);
    			attr_dev(h50, "class", "my-3");
    			add_location(h50, file$1, 97, 8, 3663);
    			attr_dev(li0, "class", "mb-2");
    			add_location(li0, file$1, 99, 10, 3736);
    			attr_dev(li1, "class", "mb-2");
    			add_location(li1, file$1, 100, 10, 3809);
    			attr_dev(li2, "class", "mb-2");
    			add_location(li2, file$1, 101, 10, 3875);
    			attr_dev(ul, "class", "mb-5");
    			add_location(ul, file$1, 98, 8, 3708);
    			attr_dev(li3, "class", "mb-2");
    			add_location(li3, file$1, 104, 10, 3990);
    			attr_dev(li4, "class", "mb-2");
    			add_location(li4, file$1, 105, 10, 4063);
    			attr_dev(li5, "class", "mb-2");
    			add_location(li5, file$1, 106, 10, 4129);
    			attr_dev(ol, "class", "mb-5");
    			add_location(ol, file$1, 103, 8, 3962);
    			attr_dev(h51, "class", "my-3");
    			add_location(h51, file$1, 108, 8, 4216);
    			attr_dev(p3, "class", "mb-2");
    			add_location(p3, file$1, 110, 10, 4328);
    			attr_dev(footer, "class", "blockquote-footer");
    			add_location(footer, file$1, 114, 10, 4526);
    			attr_dev(blockquote0, "class", "blockquote m-lg-5 py-3 pl-4 px-lg-5");
    			add_location(blockquote0, file$1, 109, 8, 4261);
    			attr_dev(h52, "class", "my-3");
    			add_location(h52, file$1, 117, 8, 4612);
    			attr_dev(th0, "scope", "col");
    			add_location(th0, file$1, 121, 14, 4747);
    			attr_dev(th1, "scope", "col");
    			add_location(th1, file$1, 122, 14, 4784);
    			attr_dev(th2, "scope", "col");
    			add_location(th2, file$1, 123, 14, 4825);
    			attr_dev(th3, "scope", "col");
    			add_location(th3, file$1, 124, 14, 4865);
    			add_location(tr0, file$1, 120, 12, 4728);
    			add_location(thead, file$1, 119, 10, 4708);
    			attr_dev(th4, "scope", "row");
    			add_location(th4, file$1, 129, 14, 4979);
    			add_location(td0, file$1, 130, 14, 5016);
    			add_location(td1, file$1, 131, 14, 5044);
    			add_location(td2, file$1, 132, 14, 5072);
    			add_location(tr1, file$1, 128, 12, 4960);
    			attr_dev(th5, "scope", "row");
    			add_location(th5, file$1, 135, 14, 5135);
    			add_location(td3, file$1, 136, 14, 5172);
    			add_location(td4, file$1, 137, 14, 5201);
    			add_location(td5, file$1, 138, 14, 5233);
    			add_location(tr2, file$1, 134, 12, 5116);
    			attr_dev(th6, "scope", "row");
    			add_location(th6, file$1, 141, 14, 5296);
    			add_location(td6, file$1, 142, 14, 5333);
    			add_location(td7, file$1, 143, 14, 5362);
    			add_location(td8, file$1, 144, 14, 5394);
    			add_location(tr3, file$1, 140, 12, 5277);
    			add_location(tbody, file$1, 127, 10, 4940);
    			attr_dev(table, "class", "table table-striped my-5");
    			add_location(table, file$1, 118, 8, 4657);
    			attr_dev(h53, "class", "mb-3");
    			add_location(h53, file$1, 149, 8, 5475);
    			add_location(br0, file$1, 153, 17, 5622);
    			add_location(br1, file$1, 153, 67, 5672);
    			add_location(br2, file$1, 154, 41, 5717);
    			add_location(br3, file$1, 154, 47, 5723);
    			add_location(br4, file$1, 154, 58, 5734);
    			add_location(br5, file$1, 155, 41, 5798);
    			attr_dev(p4, "lang", "en");
    			attr_dev(p4, "dir", "ltr");
    			add_location(p4, file$1, 152, 10, 5581);
    			attr_dev(a4, "href", "https://twitter.com/iamdevloper/status/926458505355235328?ref_src=twsrc%5Etfw");
    			add_location(a4, file$1, 157, 46, 5880);
    			attr_dev(blockquote1, "class", "twitter-tweet");
    			attr_dev(blockquote1, "data-lang", "en");
    			add_location(blockquote1, file$1, 151, 8, 5521);
    			script0.async = true;
    			if (!src_url_equal(script0.src, script0_src_value = "https://platform.twitter.com/widgets.js")) attr_dev(script0, "src", script0_src_value);
    			attr_dev(script0, "charset", "utf-8");
    			add_location(script0, file$1, 162, 8, 6055);
    			attr_dev(h32, "class", "mt-5 mb-3");
    			add_location(h32, file$1, 167, 8, 6180);
    			add_location(p5, file$1, 168, 8, 6229);
    			attr_dev(iframe, "width", "560");
    			attr_dev(iframe, "height", "315");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://www.youtube.com/embed/hnCmSXCZEpU")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    			iframe.allowFullscreen = true;
    			add_location(iframe, file$1, 177, 10, 6663);
    			attr_dev(div1, "class", "embed-responsive embed-responsive-16by9");
    			add_location(div1, file$1, 176, 8, 6599);
    			attr_dev(div2, "class", "blog-post-body");
    			add_location(div2, file$1, 45, 6, 1044);
    			attr_dev(i0, "class", "arrow-prev fas fa-long-arrow-alt-left");
    			add_location(i0, file$1, 192, 19, 7143);
    			attr_dev(a5, "class", "nav-link-prev nav-item nav-link rounded-left");
    			attr_dev(a5, "href", "index.html");
    			add_location(a5, file$1, 189, 8, 7030);
    			attr_dev(i1, "class", "arrow-next fas fa-long-arrow-alt-right");
    			add_location(i1, file$1, 197, 15, 7330);
    			attr_dev(a6, "class", "nav-link-next nav-item nav-link rounded-right");
    			attr_dev(a6, "href", "blog-list.html");
    			add_location(a6, file$1, 194, 8, 7216);
    			attr_dev(nav, "class", "blog-nav nav nav-justified my-5");
    			add_location(nav, file$1, 188, 6, 6976);
    			attr_dev(div3, "id", "disqus_thread");
    			add_location(div3, file$1, 202, 8, 7460);
    			add_location(script1, file$1, 203, 8, 7495);
    			attr_dev(div4, "class", "blog-comments-section");
    			add_location(div4, file$1, 201, 6, 7416);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$1, 35, 4, 661);
    			attr_dev(article, "class", "blog-post px-3 py-5 p-md-5");
    			add_location(article, file$1, 34, 2, 612);
    			attr_dev(h21, "class", "title");
    			add_location(h21, file$1, 248, 6, 9144);
    			add_location(p6, file$1, 249, 6, 9195);
    			attr_dev(img1, "class", "img-fluid");
    			if (!src_url_equal(img1.src, img1_src_value = "assets/images/promo-banner.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "image");
    			add_location(img1, file$1, 256, 11, 9502);
    			attr_dev(a8, "href", "https://made4dev.com");
    			attr_dev(a8, "target", "_blank");
    			add_location(a8, file$1, 255, 8, 9444);
    			attr_dev(figure1, "class", "promo-figure");
    			add_location(figure1, file$1, 254, 6, 9406);
    			attr_dev(div6, "class", "container");
    			add_location(div6, file$1, 247, 4, 9114);
    			attr_dev(section, "class", "promo-section theme-bg-light py-5 text-center");
    			add_location(section, file$1, 246, 2, 9046);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, article, anchor);
    			append_dev(article, div5);
    			append_dev(div5, header);
    			append_dev(header, h20);
    			append_dev(header, t2);
    			append_dev(header, div0);
    			append_dev(div0, span0);
    			append_dev(div0, span1);
    			append_dev(div0, span2);
    			append_dev(span2, a0);
    			append_dev(div5, t6);
    			append_dev(div5, div2);
    			append_dev(div2, figure0);
    			append_dev(figure0, a1);
    			append_dev(a1, img0);
    			append_dev(figure0, t7);
    			append_dev(figure0, figcaption);
    			append_dev(figcaption, t8);
    			append_dev(figcaption, a2);
    			append_dev(div2, t10);
    			append_dev(div2, p0);
    			append_dev(div2, t12);
    			append_dev(div2, h30);
    			append_dev(div2, t14);
    			append_dev(div2, p1);
    			append_dev(p1, t15);
    			append_dev(p1, a3);
    			append_dev(p1, t17);
    			append_dev(div2, t18);
    			append_dev(div2, pre);
    			append_dev(pre, code_1);
    			append_dev(div2, t20);
    			append_dev(div2, h31);
    			append_dev(div2, t22);
    			append_dev(div2, p2);
    			append_dev(div2, t24);
    			append_dev(div2, h50);
    			append_dev(div2, t26);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t28);
    			append_dev(ul, li1);
    			append_dev(ul, t30);
    			append_dev(ul, li2);
    			append_dev(div2, t32);
    			append_dev(div2, ol);
    			append_dev(ol, li3);
    			append_dev(ol, t34);
    			append_dev(ol, li4);
    			append_dev(ol, t36);
    			append_dev(ol, li5);
    			append_dev(div2, t38);
    			append_dev(div2, h51);
    			append_dev(div2, t40);
    			append_dev(div2, blockquote0);
    			append_dev(blockquote0, p3);
    			append_dev(blockquote0, t42);
    			append_dev(blockquote0, footer);
    			append_dev(div2, t44);
    			append_dev(div2, h52);
    			append_dev(div2, t46);
    			append_dev(div2, table);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t48);
    			append_dev(tr0, th1);
    			append_dev(tr0, t50);
    			append_dev(tr0, th2);
    			append_dev(tr0, t52);
    			append_dev(tr0, th3);
    			append_dev(table, t54);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, th4);
    			append_dev(tr1, t56);
    			append_dev(tr1, td0);
    			append_dev(tr1, t58);
    			append_dev(tr1, td1);
    			append_dev(tr1, t60);
    			append_dev(tr1, td2);
    			append_dev(tbody, t62);
    			append_dev(tbody, tr2);
    			append_dev(tr2, th5);
    			append_dev(tr2, t64);
    			append_dev(tr2, td3);
    			append_dev(tr2, t66);
    			append_dev(tr2, td4);
    			append_dev(tr2, t68);
    			append_dev(tr2, td5);
    			append_dev(tbody, t70);
    			append_dev(tbody, tr3);
    			append_dev(tr3, th6);
    			append_dev(tr3, t72);
    			append_dev(tr3, td6);
    			append_dev(tr3, t74);
    			append_dev(tr3, td7);
    			append_dev(tr3, t76);
    			append_dev(tr3, td8);
    			append_dev(div2, t78);
    			append_dev(div2, h53);
    			append_dev(div2, t80);
    			append_dev(div2, blockquote1);
    			append_dev(blockquote1, p4);
    			append_dev(p4, t81);
    			append_dev(p4, br0);
    			append_dev(p4, t82);
    			append_dev(p4, br1);
    			append_dev(p4, t83);
    			append_dev(p4, br2);
    			append_dev(p4, br3);
    			append_dev(p4, t84);
    			append_dev(p4, br4);
    			append_dev(p4, t85);
    			append_dev(p4, br5);
    			append_dev(p4, t86);
    			append_dev(blockquote1, t87);
    			append_dev(blockquote1, a4);
    			append_dev(div2, t89);
    			append_dev(div2, script0);
    			append_dev(div2, t90);
    			append_dev(div2, h32);
    			append_dev(div2, t92);
    			append_dev(div2, p5);
    			append_dev(div2, t94);
    			append_dev(div2, div1);
    			append_dev(div1, iframe);
    			append_dev(div5, t95);
    			append_dev(div5, nav);
    			append_dev(nav, a5);
    			append_dev(a5, t96);
    			append_dev(a5, i0);
    			append_dev(nav, t97);
    			append_dev(nav, a6);
    			append_dev(a6, t98);
    			append_dev(a6, i1);
    			append_dev(div5, t99);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div4, t100);
    			append_dev(div4, script1);
    			append_dev(div4, t102);
    			insert_dev(target, t105, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div6);
    			append_dev(div6, h21);
    			append_dev(div6, t107);
    			append_dev(div6, p6);
    			append_dev(div6, t109);
    			append_dev(div6, figure1);
    			append_dev(figure1, a8);
    			append_dev(a8, img1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*blogTitle, title*/ 3 && title_value !== (title_value = "" + (/*blogTitle*/ ctx[1] + " - " + /*title*/ ctx[0]))) {
    				document.title = title_value;
    			}

    			if (dirty & /*title*/ 1 && img0_alt_value !== (img0_alt_value = "image " + /*title*/ ctx[0])) {
    				attr_dev(img0, "alt", img0_alt_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(article);
    			if (detaching) detach_dev(t105);
    			if (detaching) detach_dev(section);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Post', slots, []);

    	let code = `
function $initHighlight(block, cls) {
    try {
        if (cls.search(/\bno\-highlight\b/) != -1)
        return ({"env":{"NODE_ENV":"development"}})(block, true, 0x0F);
    } catch (e) {
        /* handle exception */
    }
    for (var i = 0 / 2; i < classes.length; i++) {
        if (checkCondition(classes[i]) === undefined)
        console.log('undefined');
    }
}

export  $initHighlight;
  `;

    	let { title } = $$props;
    	let { date } = $$props;
    	let { comments } = $$props;
    	let { thumb } = $$props;
    	let { content } = $$props;
    	let { blogTitle } = $$props;
    	const writable_props = ['title', 'date', 'comments', 'thumb', 'content', 'blogTitle'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Post> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('date' in $$props) $$invalidate(3, date = $$props.date);
    		if ('comments' in $$props) $$invalidate(4, comments = $$props.comments);
    		if ('thumb' in $$props) $$invalidate(5, thumb = $$props.thumb);
    		if ('content' in $$props) $$invalidate(6, content = $$props.content);
    		if ('blogTitle' in $$props) $$invalidate(1, blogTitle = $$props.blogTitle);
    	};

    	$$self.$capture_state = () => ({
    		code,
    		title,
    		date,
    		comments,
    		thumb,
    		content,
    		blogTitle
    	});

    	$$self.$inject_state = $$props => {
    		if ('code' in $$props) $$invalidate(2, code = $$props.code);
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('date' in $$props) $$invalidate(3, date = $$props.date);
    		if ('comments' in $$props) $$invalidate(4, comments = $$props.comments);
    		if ('thumb' in $$props) $$invalidate(5, thumb = $$props.thumb);
    		if ('content' in $$props) $$invalidate(6, content = $$props.content);
    		if ('blogTitle' in $$props) $$invalidate(1, blogTitle = $$props.blogTitle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, blogTitle, code, date, comments, thumb, content];
    }

    class Post extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			title: 0,
    			date: 3,
    			comments: 4,
    			thumb: 5,
    			content: 6,
    			blogTitle: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Post",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Post> was created without expected prop 'title'");
    		}

    		if (/*date*/ ctx[3] === undefined && !('date' in props)) {
    			console.warn("<Post> was created without expected prop 'date'");
    		}

    		if (/*comments*/ ctx[4] === undefined && !('comments' in props)) {
    			console.warn("<Post> was created without expected prop 'comments'");
    		}

    		if (/*thumb*/ ctx[5] === undefined && !('thumb' in props)) {
    			console.warn("<Post> was created without expected prop 'thumb'");
    		}

    		if (/*content*/ ctx[6] === undefined && !('content' in props)) {
    			console.warn("<Post> was created without expected prop 'content'");
    		}

    		if (/*blogTitle*/ ctx[1] === undefined && !('blogTitle' in props)) {
    			console.warn("<Post> was created without expected prop 'blogTitle'");
    		}
    	}

    	get title() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get comments() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set comments(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumb() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumb(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blogTitle() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogTitle(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */
    const file = "src/App.svelte";

    // (27:0) <Router>
    function create_default_slot(ctx) {
    	let nav;
    	let sidebar;
    	let t0;
    	let div;
    	let route0;
    	let t1;
    	let route1;
    	let t2;
    	let route2;
    	let current;

    	sidebar = new Sidebar({
    			props: {
    				blogName: /*blogName*/ ctx[0],
    				bio: /*bio*/ ctx[1],
    				profilePicture: /*profilePicture*/ ctx[2],
    				socialNetworks: /*socialNetworks*/ ctx[3],
    				aboutMeText: /*aboutMeText*/ ctx[5],
    				pages: /*pages*/ ctx[4]
    			},
    			$$inline: true
    		});

    	route0 = new Route$1({
    			props: { path: "post/:id", component: Post },
    			$$inline: true
    		});

    	route1 = new Route$1({
    			props: { path: "about", component: Post },
    			$$inline: true
    		});

    	route2 = new Route$1({
    			props: {
    				path: "/",
    				blogName: /*blogName*/ ctx[0],
    				blogSubtitle: /*blogSubtitle*/ ctx[6],
    				newsletterText: /*newsletterText*/ ctx[7],
    				posts: /*posts*/ ctx[8],
    				component: Home
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			create_component(sidebar.$$.fragment);
    			t0 = space();
    			div = element("div");
    			create_component(route0.$$.fragment);
    			t1 = space();
    			create_component(route1.$$.fragment);
    			t2 = space();
    			create_component(route2.$$.fragment);
    			add_location(nav, file, 27, 1, 501);
    			attr_dev(div, "class", "main-wrapper");
    			add_location(div, file, 31, 2, 605);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			mount_component(sidebar, nav, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(route0, div, null);
    			append_dev(div, t1);
    			mount_component(route1, div, null);
    			append_dev(div, t2);
    			mount_component(route2, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sidebar_changes = {};
    			if (dirty & /*blogName*/ 1) sidebar_changes.blogName = /*blogName*/ ctx[0];
    			if (dirty & /*bio*/ 2) sidebar_changes.bio = /*bio*/ ctx[1];
    			if (dirty & /*profilePicture*/ 4) sidebar_changes.profilePicture = /*profilePicture*/ ctx[2];
    			if (dirty & /*socialNetworks*/ 8) sidebar_changes.socialNetworks = /*socialNetworks*/ ctx[3];
    			if (dirty & /*aboutMeText*/ 32) sidebar_changes.aboutMeText = /*aboutMeText*/ ctx[5];
    			if (dirty & /*pages*/ 16) sidebar_changes.pages = /*pages*/ ctx[4];
    			sidebar.$set(sidebar_changes);
    			const route2_changes = {};
    			if (dirty & /*blogName*/ 1) route2_changes.blogName = /*blogName*/ ctx[0];
    			if (dirty & /*blogSubtitle*/ 64) route2_changes.blogSubtitle = /*blogSubtitle*/ ctx[6];
    			if (dirty & /*newsletterText*/ 128) route2_changes.newsletterText = /*newsletterText*/ ctx[7];
    			if (dirty & /*posts*/ 256) route2_changes.posts = /*posts*/ ctx[8];
    			route2.$set(route2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(sidebar);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(27:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let t;
    	let footer;
    	let current;

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
    			create_component(router.$$.fragment);
    			t = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, blogName, blogSubtitle, newsletterText, posts, bio, profilePicture, socialNetworks, aboutMeText, pages*/ 1023) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    			if (detaching) detach_dev(t);
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
    	let { blogName } = $$props;
    	let { bio } = $$props;
    	let { profilePicture } = $$props;
    	let { socialNetworks = [] } = $$props;
    	let { pages = [] } = $$props;
    	let { aboutMeText } = $$props;
    	let { blogSubtitle } = $$props;
    	let { newsletterText } = $$props;
    	let { posts = [] } = $$props;

    	const writable_props = [
    		'blogName',
    		'bio',
    		'profilePicture',
    		'socialNetworks',
    		'pages',
    		'aboutMeText',
    		'blogSubtitle',
    		'newsletterText',
    		'posts'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(1, bio = $$props.bio);
    		if ('profilePicture' in $$props) $$invalidate(2, profilePicture = $$props.profilePicture);
    		if ('socialNetworks' in $$props) $$invalidate(3, socialNetworks = $$props.socialNetworks);
    		if ('pages' in $$props) $$invalidate(4, pages = $$props.pages);
    		if ('aboutMeText' in $$props) $$invalidate(5, aboutMeText = $$props.aboutMeText);
    		if ('blogSubtitle' in $$props) $$invalidate(6, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(7, newsletterText = $$props.newsletterText);
    		if ('posts' in $$props) $$invalidate(8, posts = $$props.posts);
    	};

    	$$self.$capture_state = () => ({
    		Router: Router$1,
    		Route: Route$1,
    		Sidebar,
    		Footer,
    		Home,
    		Post,
    		blogName,
    		bio,
    		profilePicture,
    		socialNetworks,
    		pages,
    		aboutMeText,
    		blogSubtitle,
    		newsletterText,
    		posts
    	});

    	$$self.$inject_state = $$props => {
    		if ('blogName' in $$props) $$invalidate(0, blogName = $$props.blogName);
    		if ('bio' in $$props) $$invalidate(1, bio = $$props.bio);
    		if ('profilePicture' in $$props) $$invalidate(2, profilePicture = $$props.profilePicture);
    		if ('socialNetworks' in $$props) $$invalidate(3, socialNetworks = $$props.socialNetworks);
    		if ('pages' in $$props) $$invalidate(4, pages = $$props.pages);
    		if ('aboutMeText' in $$props) $$invalidate(5, aboutMeText = $$props.aboutMeText);
    		if ('blogSubtitle' in $$props) $$invalidate(6, blogSubtitle = $$props.blogSubtitle);
    		if ('newsletterText' in $$props) $$invalidate(7, newsletterText = $$props.newsletterText);
    		if ('posts' in $$props) $$invalidate(8, posts = $$props.posts);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		blogName,
    		bio,
    		profilePicture,
    		socialNetworks,
    		pages,
    		aboutMeText,
    		blogSubtitle,
    		newsletterText,
    		posts
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			blogName: 0,
    			bio: 1,
    			profilePicture: 2,
    			socialNetworks: 3,
    			pages: 4,
    			aboutMeText: 5,
    			blogSubtitle: 6,
    			newsletterText: 7,
    			posts: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*blogName*/ ctx[0] === undefined && !('blogName' in props)) {
    			console.warn("<App> was created without expected prop 'blogName'");
    		}

    		if (/*bio*/ ctx[1] === undefined && !('bio' in props)) {
    			console.warn("<App> was created without expected prop 'bio'");
    		}

    		if (/*profilePicture*/ ctx[2] === undefined && !('profilePicture' in props)) {
    			console.warn("<App> was created without expected prop 'profilePicture'");
    		}

    		if (/*aboutMeText*/ ctx[5] === undefined && !('aboutMeText' in props)) {
    			console.warn("<App> was created without expected prop 'aboutMeText'");
    		}

    		if (/*blogSubtitle*/ ctx[6] === undefined && !('blogSubtitle' in props)) {
    			console.warn("<App> was created without expected prop 'blogSubtitle'");
    		}

    		if (/*newsletterText*/ ctx[7] === undefined && !('newsletterText' in props)) {
    			console.warn("<App> was created without expected prop 'newsletterText'");
    		}
    	}

    	get blogName() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogName(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bio() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bio(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get profilePicture() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set profilePicture(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get socialNetworks() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set socialNetworks(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pages() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get aboutMeText() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aboutMeText(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blogSubtitle() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blogSubtitle(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get newsletterText() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set newsletterText(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posts() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posts(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        blogName: "Tulio DEV",
        blogSubtitle: "Um blog feito por DEV para DEVs de verdade.",
        bio: "Postagens sobre Javascript, react, mobile, svelte, arquitetura, backend, bicicleta e jogos.",
        profilePicture:
          "https://media-exp1.licdn.com/dms/image/D4E03AQGj_X7NRslE-g/profile-displayphoto-shrink_800_800/0/1647522768046?e=1656547200&v=beta&t=SKUwMfcXrhoCwao1PoEUTRSMqhAUy3GVGHyj63fr4Gc",
        aboutMeText: "Veja mais sobre mim",
        socialNetworks: [
          {
            icon: "fa-twitter",
            name: "twitter",
            link: "https://twitter.com",
          },
          {
            icon: "fa-linkedin-in",
            name: "",
            link: "",
          },
          {
            icon: "fa-github-alt",
            name: "",
            link: "",
          },
          {
            icon: "fa-stack-overflow",
            name: "",
            link: "",
          },
        ],
        pages: [
          {
            icon: "fa-home",
            name: "Home",
            link: "/",
          },
          {
            icon: "fa-user",
            name: "Sobre mim",
            link: "/about",
          },
        ],
        newsletterText: "Inscreva-se e receba atualizaçãoes direto no seu e-mail!",
        posts: [
          {
            slug: "Why Every Developer Should Have A Blog",
            title: "Why Every Developer Should Have A Blog",
            date: "05-04-1995 12:37:00",
            readTime: "4",
            comments: "2",
            preview:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
            thumb: "assets/images/blog/blog-post-thumb-1.jpg",
          },
          {
            slug: "",
            title: "A Guide to Becoming a Full-Stack Developer",
            date: "02-01-2022 12:37:00",
            readTime: "11",
            comments: "3",
            preview:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
            thumb: "assets/images/blog/blog-post-thumb-2.jpg",
          },
          {
            slug: "High Performance JavaScript",
            title: "High Performance JavaScript",
            date: "05-03-2022 12:37:00",
            readTime: "2",
            comments: "4",
            preview:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
            thumb: "assets/images/blog/blog-post-thumb-3.jpg",
          },
          {
            slug: "Top 5 JavaScript Frameworks",
            title: "Top 5 JavaScript Frameworks",
            date: "01-04-2022 12:37:00",
            readTime: "5",
            comments: "0",
            preview:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
            thumb: "assets/images/blog/blog-post-thumb-4.jpg",
          },
        ],
      },
    });

    return app;

})();
//# sourceMappingURL=main.js.map
