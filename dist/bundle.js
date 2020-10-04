(function () {
    'use strict';

    class Randomizer {
        constructor(p_seed) {
            this.seedPosition = 0;
            this.arrayPosition = 0;
            this.hrCache = {};
            this.seed = p_seed;
            if (this.seed.length < 8) {
                this.seed = "padding_" + this.seed;
            }
            if (this.seed.length % 2 == 0) {
                this.seed = "1" + this.seed;
            }
            this.stateArray = [
                2972948403,
                3086140710,
                2071788248,
                3026137486,
                1411764137,
                2265725585,
                2923087685,
                1593177610,
            ];
            this.state = 3234042090;
            for (var i = this.seed.length - 1; i >= 0; i--) {
                var c = this.seed.charCodeAt(i);
                this.state =
                    (((this.state << 5) + this.state) ^
                        c ^
                        (this.state << ((c % 13) + 1)) ^
                        (this.state >> ((c % 17) + 1))) >>>
                        0;
                this.stateArray[i % 8] ^=
                    (((this.state >> 9) * ((this.state % 16384) + 3427)) ^ c) >>> 0;
            }
        }
        //Returns a raw unsigned 32-bit integer from the stream.
        sr() {
            var c = this.seed.charCodeAt(this.seedPosition);
            var lsa = this.stateArray[this.arrayPosition];
            this.state =
                (((this.state << 5) + this.state + lsa) ^
                    c ^
                    (this.state << ((c % 17) + 1)) ^
                    (this.state >> ((c % 13) + 1))) >>>
                    0;
            this.stateArray[this.arrayPosition] =
                ((lsa >> 3) ^
                    (lsa << ((c % 19) + 1)) ^
                    ((this.state % 134217728) * 3427)) >>>
                    0;
            this.seedPosition = (this.seedPosition + 1) % this.seed.length;
            this.arrayPosition = (this.arrayPosition + 1) % 8;
            return this.state;
        }
        //Returns a raw unsigned 32-bit integer based on hashing this object's seed with the specified string.
        /*
        hr_original(seed?: string): number {
          let t = 1206170165;
          if (seed != null) {
            for (let x = seed.length - 1; x >= 0; x--) {
              const c = seed.charCodeAt(x);
              t = ((t << 5) + t) ^ c ^ (t << ((c % 13) + 1)) ^ (t >> ((c % 17) + 1));
            }
          }
          for (let y = this.seed.length - 1; y >= 0; y--) {
            const c = this.seed.charCodeAt(y);
            t = ((t << 5) + t) ^ c ^ (t << ((c % 13) + 1)) ^ (t >> ((c % 17) + 1));
          }
          return t >>> 0;
        }
        */
        //Returns a raw unsigned 32-bit integer based on hashing this object's seed with the specified string
        hr(seed) {
            const state = [1160605769, 1424711319, 876532818, 1419174464];
            let rv = 1206170165;
            if (seed == null) {
                seed = "?/?/?/";
                rv = 3379896793;
            }
            if (this.hrCache.hasOwnProperty(seed)) {
                return this.hrCache[seed];
            }
            for (var x = seed.length - 1; x >= 0; x--) {
                const c = seed.charCodeAt(x);
                let t = state[0] ^ c;
                t = (t ^ (t << 11)) >>> 0;
                t = (t ^ (t >> 8)) >>> 0;
                state[0] = state[1];
                state[1] = state[2];
                state[2] = state[3];
                state[3] = (state[3] ^ (state[3] >> 19) ^ t) >>> 0;
                rv = ((rv ^ (c << 24)) * 3427) ^ state[3];
            }
            for (var y = this.seed.length - 1; y >= 0; y--) {
                const c = this.seed.charCodeAt(y);
                let t = state[0] ^ c;
                t = (t ^ (t << 11)) >>> 0;
                t = (t ^ (t >> 8)) >>> 0;
                state[0] = state[1];
                state[1] = state[2];
                state[2] = state[3];
                state[3] = (state[3] ^ (state[3] >> 19) ^ t) >>> 0;
                rv = ((rv ^ (c << 24)) * 3427) ^ state[3];
            }
            this.hrCache[seed] = rv >>> 0;
            return this.hrCache[seed];
        }
        //Returns a double between the specified minimum and maximum, from the stream.
        sd(min, max) {
            return (((this.sr() * 4294967296 + this.sr()) / 18446744073709551616) *
                (max - min) +
                min);
        }
        //Returns a double between the specified minimum and maximum, by hashing this object's seed with the specified string.
        hd(min, max, seed) {
            return (((this.hr(seed) * 4294967296 + this.hr(seed + "@")) /
                18446744073709551616) *
                (max - min) +
                min);
        }
        //Returns an integer between the specified minimum and maximum, from the stream.
        si(min, max) {
            return Math.floor(((this.sr() * 4294967296 + this.sr()) / 18446744073709551616) *
                (max + 1 - min) +
                min);
        }
        //Returns an integer between the specified minimum and maximum, by hashing this object's seed with the specified string.
        hi(min, max, s) {
            return Math.floor(((this.hr(s) * 4294967296 + this.hr(s + "@")) / 18446744073709551616) *
                (max + 1 - min) +
                min);
        }
        //Returns a boolean with the specified chance of being true (and false otherwise), from the stream
        sb(chance) {
            return (this.sr() * 4294967296 + this.sr()) / 18446744073709551616 < chance;
        }
        //Returns a boolean with the specified chance of being true (and false otherwise), by hashing this object's seed with the specified string.
        hb(chance, s) {
            return ((this.hr(s) * 4294967296 + this.hr(s + "@")) / 18446744073709551616 <
                chance);
        }
        //Returns an integer with the specified chance of being -1 (and 1 otherwise), from the stream.
        ss(chance) {
            return (this.sr() * 4294967296 + this.sr()) / 18446744073709551616 < chance
                ? -1
                : 1;
        }
        //Returns an integer with the specified chance of being -1 (and 1 otherwise), by hashing this object's seed with the specified string.
        /*
        hs(chance: number, seed: string): number {
          return (this.hr(seed) * 4294967296 +
            this.hr(seed + "@")) /
            18446744073709551616 <
            chance
            ? -1
            : 1;
        }
        */
        //Returns an integer {0,1,2,...}, starting from 0, with the specified chance of advancing to each successive integer, from the stream.
        sseq(chance, max) {
            var rv = 0;
            while ((this.sr() * 4294967296 + this.sr()) / 18446744073709551616 < chance &&
                rv < max) {
                rv++;
            }
            return rv;
        }
        //Returns an integer {0,1,2,...}, starting from 0, with the specified chance of advancing to each successive integer, by hashing this object's seed with the specified string.
        hseq(chance, max, seed) {
            var rv = 0;
            while ((this.hr(seed + rv) * 4294967296 + this.hr(seed + "@" + rv)) /
                18446744073709551616 <
                chance &&
                rv < max) {
                rv++;
            }
            return rv;
        }
        //Returns an index of the array chances with the relative probability equal to that element of chances, based on a stream value.
        schoose(chances) {
            let sum = 0;
            for (let i = 0; i < chances.length; i++) {
                sum += chances[i];
            }
            let which = this.sd(0, sum);
            for (let j = 0; j < chances.length; j++) {
                which -= chances[j];
                if (which < 0) {
                    return j;
                }
            }
            return 0;
        }
        //Returns an index of the array chances with the relative probability equal to that element of chances, based on a hash value with the specified seed.
        hchoose(chances, seed) {
            let sum = 0;
            for (let i = 0; i < chances.length; i++) {
                sum += chances[i];
            }
            let which = this.hd(0, sum, seed);
            for (let j = 0; j < chances.length; j++) {
                which -= chances[j];
                if (which < 0) {
                    return j;
                }
            }
            return 0;
        }
    }

    function copyArray(a, begin, end) {
        const rv = new Array(end - begin);
        for (let i = end; i >= begin; i--) {
            rv[i - begin] = a[i];
        }
        return rv;
    }
    function clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
    }
    function hexpad(n, l) {
        //For integer n and length l.
        var s = Math.floor(n).toString(16);
        while (s.length < l) {
            s = "0" + s;
        }
        return s;
    }
    function colorToHex(color) {
        return ("#" +
            hexpad(Math.floor(clamp(color[0], 0, 1) * 255), 2) +
            (hexpad(Math.floor(clamp(color[1], 0, 1) * 255), 2) +
                hexpad(Math.floor(clamp(color[2], 0, 1) * 255), 2)));
    }
    // Take a color and multiplies it with a factor. factor = 0 produces black.
    function scaleColorBy(color, factor) {
        return [color[0] * factor, color[1] * factor, color[2] * factor];
    }
    // Takes a triplet [H,S,V] and returns a triplet [R,G,B], representing the same color. All components are 0 - 1.
    function hsvToRgb(hsv) {
        var c = hsv[1] * hsv[2];
        var m = hsv[2] - c;
        var h = ((hsv[0] % 1) + 1) % 1;
        var hrel = 6 * h;
        var hseg = Math.floor(hrel);
        var x = c * (1 - Math.abs((hrel % 2) - 1));
        switch (hseg) {
            case 0:
                return [c + m, x + m, m];
            case 1:
                return [x + m, c + m, m];
            case 2:
                return [m, c + m, x + m];
            case 3:
                return [m, x + m, c + m];
            case 4:
                return [x + m, m, c + m];
            default:
                return [c + m, m, x + m];
        }
    }

    class Faction {
        constructor(seed) {
            //Respective chances of each component
            this.componentChances = [];
            this.colors = [];
            this.colorChances = [];
            this.seed = seed;
            this.r = new Randomizer(this.seed);
            this.setupComponentChances();
            this.setupColors();
        }
        setupComponentChances() {
            this.componentChances = [];
            const dp = 8; //Default maximum power
            this.componentChances[0] =
                0.8 * this.r.sd(0.001, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[1] =
                0.9 * this.r.sd(0.01, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[2] =
                1 * this.r.sd(0.001, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[3] =
                3 * this.r.sd(0, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[4] =
                0.5 * this.r.sd(0, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[5] =
                0.05 * this.r.sd(0, 1) * Math.pow(2, this.r.sd(0, dp));
            this.componentChances[6] =
                0.5 * this.r.sd(0, 1) * Math.pow(2, this.r.sd(0, dp));
        }
        setupColors() {
            const dp = 6; //Default maximum power.
            const baseColorCount = 1 +
                (this.r.hb(0.7, "base color +1") ? 1 : 0) +
                this.r.hseq(0.3, 3, "base color count");
            for (let i = 0; i < baseColorCount; i++) {
                const ls = "base color" + i;
                this.colors.push(hsvToRgb([
                    Math.pow(this.r.hd(0, 1, ls + "hue"), 2),
                    clamp(this.r.hd(-0.2, 1, ls + "saturation"), 0, Math.pow(this.r.hd(0, 1, ls + "saturation bound"), 4)),
                    clamp(this.r.hd(0.7, 1.1, ls + "value"), 0, 1),
                ]));
                this.colorChances.push(Math.pow(2, this.r.hd(0, dp, ls + "chances")));
            }
        }
        //Where lp is the ship to get the color for.
        getBaseColor(lp) {
            let rv = this.colors[lp.r.schoose(this.colorChances)];
            if (
                lp.r.sb(Math.pow(this.r.hd(0, 0.5, "base color shift chance"), 2))) {
                rv = [rv[0], rv[1], rv[2]];
                rv[0] = clamp(rv[0] +
                    Math.pow(this.r.hd(0, 0.6, "base color shift range red"), 2) *
                        clamp(lp.r.sd(-1, 1.2), 0, 1) *
                        clamp(lp.r.ss(0.7) + lp.r.ss(0.7), -1, 1), 0, 1);
                rv[1] = clamp(rv[1] +
                    Math.pow(this.r.hd(0, 0.6, "base color shift range green"), 2) *
                        clamp(lp.r.sd(-1, 1.2), 0, 1) *
                        clamp(lp.r.ss(0.7) + lp.r.ss(0.7), -1, 1), 0, 1);
                rv[2] = clamp(rv[2] +
                    Math.pow(this.r.hd(0, 0.6, "base color shift range blue"), 2) *
                        clamp(lp.r.sd(-1, 1.2), 0, 1) *
                        clamp(lp.r.ss(0.7) + lp.r.ss(0.7), -1, 1), 0, 1);
            }
            return rv;
        }
    }

    //Size of the component grid
    const COMPONENT_GRID_SIZE = 6;
    //Minimum distance between the edge of the ship outline and the edge of the canvas
    const CANVAS_SHIP_EDGE = 0;
    //Base maximum extent of a component from its origin point. Should be at least equal to cgridsize, but no greater than csedge.
    const COMPONENT_MAXIMUM_SIZE = 8;

    function frontness(lp, v) {
        return 1 - v[1] / lp.h;
    }
    function centerness(lp, v, doX, doY) {
        let rv = 1;
        if (doX) {
            rv = Math.min(rv, 1 - Math.abs(v[0] - lp.hw) / lp.hw);
        }
        if (doY) {
            rv = Math.min(rv, 1 - Math.abs(v[1] - lp.hh) / lp.hh);
        }
        return rv;
    }
    function bigness(lp, v) {
        const effectCenter = centerness(lp, v, true, true);
        const effectShipsize = 1 - 1 / ((lp.w + lp.h) / 1000 + 1);
        const effectFaction = Math.pow(lp.f.r.hd(0, 1, "master bigness"), 0.5);
        const effectStack = 1 - lp.getpcdone();
        return effectCenter * effectShipsize * effectFaction * effectStack;
    }
    function leeway(lp, boundingBox) {
        return [
            Math.min(boundingBox[0][0] - CANVAS_SHIP_EDGE, lp.w - CANVAS_SHIP_EDGE - boundingBox[1][0]),
            Math.min(boundingBox[0][1] - CANVAS_SHIP_EDGE, lp.h - CANVAS_SHIP_EDGE - boundingBox[1][1]),
        ];
    }
    //lp is the ship. amount is the amount of shadow at the edges, 0 - 1 (the middle is always 0). middlep and edgep should be vectors at the middle and edge of the gradient.
    function shadowGradient(ctx, middlePoint, edgePoint, amount) {
        const grad = ctx.createLinearGradient(edgePoint[0], edgePoint[1], middlePoint[0] * 2 - edgePoint[0], middlePoint[1] * 2 - edgePoint[1]);
        const darkness = `rgba(0,0,0,${clamp(amount, 0, 1)})`;
        grad.addColorStop(0, darkness);
        grad.addColorStop(0.5, "rgba(0,0,0,0)");
        grad.addColorStop(1, darkness);
        return grad;
    }
    // Each component function takes an argument 'lp' (for the ship) and 'v' (an integral 2-vector denoting the center of the component)
    const components = [];
    // Bordered block
    components[0] = function (lp, v) {
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.3);
        if (lp.r.sb(lp.f.r.hd(0, 0.9, "com0 bigchance") * bn)) {
            const chance = lp.f.r.hd(0, 0.5, "com0 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        const lcms2 = lcms * 2;
        const dhi = [
            Math.ceil(lp.r.sd(1, Math.max(2, 0.5 * lcms))),
            Math.ceil(lp.r.sd(1, Math.max(2, 0.5 * lcms))),
        ];
        const borderwidth = Math.min(dhi[0], dhi[1]) * lp.r.sd(0.1, 1.2);
        const dho = [dhi[0] + borderwidth * 2, dhi[1] + borderwidth * 2];
        const counts = [Math.ceil(lcms2 / dho[0]), Math.ceil(lcms2 / dho[1])];
        const trv = [
            Math.round((counts[0] * dho[0]) / 2),
            Math.round((counts[1] * dho[1]) / 2),
        ];
        const pcdone = lp.getpcdone();
        const basecolor = lp.f.getBaseColor(lp);
        const icolorh = colorToHex(scaleColorBy(basecolor, lp.r.sd(0.4, 1)));
        const ocolorh = colorToHex(scaleColorBy(basecolor, lp.r.sd(0.4, 1)));
        lp.cfx.fillStyle = "rgba(0,0,0," + lp.r.sd(0, 0.25) + ")";
        lp.cfx.fillRect(v[0] - trv[0] - 1, v[1] - trv[1] - 1, dho[0] * counts[0] + 2, dho[1] * counts[1] + 2);
        lp.cfx.fillStyle = ocolorh;
        lp.cfx.fillRect(v[0] - trv[0], v[1] - trv[1], dho[0] * counts[0], dho[1] * counts[1]);
        lp.cfx.fillStyle = icolorh;
        for (let x = 0; x < counts[0]; x++) {
            const bx = v[0] + borderwidth + x * dho[0] - trv[0];
            for (let y = 0; y < counts[1]; y++) {
                const by = v[1] + borderwidth + y * dho[1] - trv[1];
                lp.cfx.fillRect(bx, by, dhi[0], dhi[1]);
            }
        }
        if (lp.r.sb(clamp((pcdone * 0.6 + 0.3) * (lcms / COMPONENT_MAXIMUM_SIZE), 0, 0.98))) {
            lp.cfx.fillStyle = shadowGradient(lp.cfx, v, [v[0] + trv[0], v[1]], lp.r.sd(0, 0.9));
            lp.cfx.fillRect(v[0] - trv[0], v[1] - trv[1], dho[0] * counts[0], dho[1] * counts[1]);
        }
    };
    // Cylinder array
    components[1] = function (lp, v) {
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.2);
        if (lp.r.sb(lp.f.r.hd(0.3, 1, "com1 bigchance") * bn)) {
            const chance = lp.f.r.hd(0, 0.6, "com1 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        let w = Math.ceil(lp.r.sd(0.8, 2) * lcms);
        const h = Math.ceil(lp.r.sd(0.8, 2) * lcms);
        const cw = lp.r.si(3, Math.max(4, w));
        const count = Math.max(1, Math.round(w / cw));
        w = count * cw;
        const basecolor = lp.f.getBaseColor(lp);
        const ccolor = colorToHex(scaleColorBy(basecolor, lp.r.sd(0.5, 1)));
        const darkness = lp.r.sd(0.3, 0.9);
        // true = horizontal array, false = vertical array
        const orientation = lp.r.sb(clamp(lp.f.r.hd(-0.2, 1.2, "com1 hchance"), 0, 1));
        if (orientation) {
            const bv = [v[0] - Math.floor(w / 2), v[1] - Math.floor(h / 2)];
            lp.cfx.fillStyle = "rgba(0,0,0," + lp.r.sd(0, 0.25) + ")";
            lp.cfx.fillRect(bv[0] - 1, bv[1] - 1, w + 2, h + 2);
            lp.cfx.fillStyle = ccolor;
            lp.cfx.fillRect(bv[0], bv[1], w, h);
            for (let i = 0; i < count; i++) {
                lp.cfx.fillStyle = shadowGradient(lp.cfx, [bv[0] + (i + 0.5) * cw, v[1]], [bv[0] + i * cw, v[1]], darkness);
                lp.cfx.fillRect(bv[0] + i * cw, bv[1], cw, h);
            }
        }
        else {
            const bv = [v[0] - Math.floor(h / 2), v[1] - Math.floor(w / 2)];
            lp.cfx.fillStyle = "rgba(0,0,0," + lp.r.sd(0, 0.25) + ")";
            lp.cfx.fillRect(bv[0] - 1, bv[1] - 1, h + 2, w + 2);
            lp.cfx.fillStyle = ccolor;
            lp.cfx.fillRect(bv[0], bv[1], h, w);
            for (let i = 0; i < count; i++) {
                lp.cfx.fillStyle = shadowGradient(lp.cfx, [v[0], bv[1] + (i + 0.5) * cw], [v[0], bv[1] + i * cw], darkness);
                lp.cfx.fillRect(bv[0], bv[1] + i * cw, w, cw);
            }
        }
    };
    // Banded cylinder
    components[2] = function (lp, v) {
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.05);
        if (lp.r.sb(lp.f.r.hd(0, 1, "com2 bigchance") * bn)) {
            const chance = lp.f.r.hd(0, 0.9, "com2 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        const w = Math.ceil(lp.r.sd(0.6, 1.4) * lcms);
        const h = Math.ceil(lp.r.sd(1, 2) * lcms);
        const wh2 = [
            Math.ceil(clamp((w * lp.r.sd(0.7, 1)) / 2, 1, w)),
            Math.ceil(clamp((w * lp.r.sd(0.8, 1)) / 2, 1, w)),
        ];
        const h2 = [
            Math.floor(clamp(w * lp.r.sd(0.05, 0.25), 1, h)),
            Math.floor(clamp(w * lp.r.sd(0.1, 0.3), 1, h)),
        ];
        const hpair = h2[0] + h2[1];
        const odd = lp.r.sb(Math.pow(lp.f.r.hd(0, 1, "com2 oddchance"), 0.5));
        const count = clamp(Math.floor(h / hpair), 1, h);
        const htotal = count * hpair + (odd ? h2[0] : 0);
        const basecolor = lp.f.getBaseColor(lp);
        const color2 = [
            scaleColorBy(basecolor, lp.r.sd(0.6, 1)),
            scaleColorBy(basecolor, lp.r.sd(0.6, 1)),
        ];
        const darkness = lp.r.sd(0.5, 0.95);
        const lightness = 1 - darkness;
        const colord2 = [
            scaleColorBy(color2[0], lightness),
            scaleColorBy(color2[1], lightness),
        ];
        const orientation = lp.r.sb(Math.pow(lp.f.r.hd(0, 1, "com2 verticalchance"), 0.1));
        if (orientation) {
            const grad2 = [
                lp.cfx.createLinearGradient(v[0] - wh2[0], v[1], v[0] + wh2[0], v[1]),
                lp.cfx.createLinearGradient(v[0] - wh2[1], v[1], v[0] + wh2[1], v[1]),
            ];
            grad2[0].addColorStop(0, colorToHex(colord2[0]));
            grad2[0].addColorStop(0.5, colorToHex(color2[0]));
            grad2[0].addColorStop(1, colorToHex(colord2[0]));
            grad2[1].addColorStop(0, colorToHex(colord2[1]));
            grad2[1].addColorStop(0.5, colorToHex(color2[1]));
            grad2[1].addColorStop(1, colorToHex(colord2[1]));
            const by = Math.floor(v[1] - htotal / 2);
            for (let i = 0; i < count; i++) {
                lp.cfx.fillStyle = grad2[0];
                lp.cfx.fillRect(v[0] - wh2[0], by + i * hpair, wh2[0] * 2, h2[0]);
                lp.cfx.fillStyle = grad2[1];
                lp.cfx.fillRect(v[0] - wh2[1], by + i * hpair + h2[0], wh2[1] * 2, h2[1]);
            }
            if (odd) {
                lp.cfx.fillStyle = grad2[0];
                lp.cfx.fillRect(v[0] - wh2[0], by + count * hpair, wh2[0] * 2, h2[0]);
            }
        }
        else {
            const grad2 = [
                lp.cfx.createLinearGradient(v[0], v[1] - wh2[0], v[0], v[1] + wh2[0]),
                lp.cfx.createLinearGradient(v[0], v[1] - wh2[1], v[0], v[1] + wh2[1]),
            ];
            grad2[0].addColorStop(0, colorToHex(colord2[0]));
            grad2[0].addColorStop(0.5, colorToHex(color2[0]));
            grad2[0].addColorStop(1, colorToHex(colord2[0]));
            grad2[1].addColorStop(0, colorToHex(colord2[1]));
            grad2[1].addColorStop(0.5, colorToHex(color2[1]));
            grad2[1].addColorStop(1, colorToHex(colord2[1]));
            const bx = Math.floor(v[0] - htotal / 2);
            for (let i = 0; i < count; i++) {
                lp.cfx.fillStyle = grad2[0];
                lp.cfx.fillRect(bx + i * hpair, v[1] - wh2[0], h2[0], wh2[0] * 2);
                lp.cfx.fillStyle = grad2[1];
                lp.cfx.fillRect(bx + i * hpair + h2[0], v[1] - wh2[1], h2[1], wh2[1] * 2);
            }
            if (odd) {
                lp.cfx.fillStyle = grad2[0];
                lp.cfx.fillRect(bx + count * hpair, v[1] - wh2[0], h2[0], wh2[0] * 2);
            }
        }
    };
    //Rocket engine (or tries to call another random component if too far forward)
    components[3] = function (lp, v) {
        if (lp.r.sb(frontness(lp, v) - 0.3) ||
            lp.getcellstate(v[0], v[1] + COMPONENT_GRID_SIZE * 1.2) > 0 ||
            lp.getcellstate(v[0], v[1] + COMPONENT_GRID_SIZE * 1.8) > 0) {
            for (let tries = 0; tries < 100; tries++) {
                const which = lp.r.schoose(lp.f.componentChances);
                if (which != 3) {
                    components[which](lp, v);
                    return;
                }
            }
        }
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.1);
        if (lp.r.sb(lp.f.r.hd(0.6, 1, "com3 bigchance") * bn)) {
            const chance = lp.f.r.hd(0.3, 0.8, "com3 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        const w = lp.r.sd(1, 2) * lcms;
        let h = Math.ceil(lp.r.sd(0.3, 1) * lcms);
        const nratio = lp.r.sd(0.25, 0.6);
        const nw = w * nratio;
        const midw = (w + nw) / 2;
        const midwh = midw / 2;
        const h2 = [
            Math.max(1, Math.ceil(h * lp.r.sd(0.08, 0.25))),
            Math.max(1, Math.ceil(h * lp.r.sd(0.03, 0.15))),
        ];
        const hpair = h2[0] + h2[1];
        const count = Math.ceil(h / hpair);
        h = count * hpair + h2[0];
        lp.f.setupColors();
        const basecolor = lp.f.colors[lp.f.r.hchoose(lp.f.colorChances, "com3 basecolor")];
        const lightness0_mid = lp.f.r.hd(0.5, 0.8, "com3 lightness0 mid");
        const lightness0_edge = lightness0_mid - lp.f.r.hd(0.2, 0.4, "com3 lightness0 edge");
        const lightness1_edge = lp.f.r.hd(0, 0.2, "com3 lightness1 edge");
        const grad2 = [
            lp.cfx.createLinearGradient(v[0] - midwh, v[1], v[0] + midwh, v[1]),
            lp.cfx.createLinearGradient(v[0] - midwh, v[1], v[0] + midwh, v[1]),
        ];
        grad2[0].addColorStop(0, colorToHex(scaleColorBy(basecolor, lightness0_edge)));
        grad2[0].addColorStop(0.5, colorToHex(scaleColorBy(basecolor, lightness0_mid)));
        grad2[0].addColorStop(1, colorToHex(scaleColorBy(basecolor, lightness0_edge)));
        grad2[1].addColorStop(0, colorToHex(scaleColorBy(basecolor, lightness1_edge)));
        grad2[1].addColorStop(0.5, colorToHex(basecolor));
        grad2[1].addColorStop(1, colorToHex(scaleColorBy(basecolor, lightness1_edge)));
        const by = Math.ceil(v[1] - h / 2);
        lp.cfx.fillStyle = grad2[0];
        lp.cfx.beginPath();
        lp.cfx.moveTo(v[0] - nw / 2, by);
        lp.cfx.lineTo(v[0] + nw / 2, by);
        lp.cfx.lineTo(v[0] + w / 2, by + h);
        lp.cfx.lineTo(v[0] - w / 2, by + h);
        lp.cfx.fill();
        lp.cfx.fillStyle = grad2[1];
        const byh = [by + h2[0], by + hpair];
        for (let i = 0; i < count; i++) {
            const lyr = [i * hpair + h2[0], (i + 1) * hpair];
            const ly = [byh[0] + i * hpair, byh[1] + i * hpair];
            const lw = [
                (nw + (w - nw) * (lyr[0] / h)) / 2,
                (nw + (w - nw) * (lyr[1] / h)) / 2,
            ];
            lp.cfx.beginPath();
            lp.cfx.moveTo(v[0] - lw[0], ly[0]);
            lp.cfx.lineTo(v[0] + lw[0], ly[0]);
            lp.cfx.lineTo(v[0] + lw[1], ly[1]);
            lp.cfx.lineTo(v[0] - lw[1], ly[1]);
            lp.cfx.fill();
        }
    };
    //Elongated cylinder (calls component 0 - 2 on top of its starting point)
    components[4] = function (lp, v) {
        const cn = centerness(lp, v, true, false);
        const lightmid = lp.r.sd(0.7, 1);
        const lightedge = lp.r.sd(0, 0.2);
        const basecolor = lp.f.getBaseColor(lp);
        const colormid = colorToHex(scaleColorBy(basecolor, lightmid));
        const coloredge = colorToHex(scaleColorBy(basecolor, lightedge));
        const w = Math.max(3, Math.ceil(lp.size *
            Math.pow(lp.r.sd(0.4, 1), 2) *
            lp.f.r.hd(0.02, 0.1, "com4 maxwidth")));
        const hwi = Math.floor(w / 2);
        const hwe = w % 2;
        const forwards = 1 * Math.pow(lp.f.r.hd(0, 1, "com4 directionc0"), 4);
        const backwards = 0.1 * Math.pow(lp.f.r.hd(0, 1, "com4 directionc1"), 4);
        const toCenter = 0.2 * Math.pow(lp.f.r.hd(0, 1, "com4 directionc2"), 4);
        const direction = lp.r.schoose([
            forwards * (2 - cn),
            backwards,
            toCenter * (1 + cn),
        ]);
        let ev = null;
        if (direction == 0) {
            //forwards
            const hlimit = v[1] - CANVAS_SHIP_EDGE;
            const h = Math.min(Math.max(COMPONENT_MAXIMUM_SIZE, hlimit - lp.r.si(0, COMPONENT_MAXIMUM_SIZE * 2)), Math.floor(0.7 * lp.size * Math.pow(lp.r.sd(0, 1), lp.f.r.hd(2, 6, "com4 hpower0"))));
            const bb = [
                [v[0] - hwi, v[1] - h],
                [v[0] + hwi + hwe, v[1]],
            ];
            const grad = lp.cfx.createLinearGradient(bb[0][0], bb[0][1], bb[1][0], bb[0][1]);
            grad.addColorStop(0, coloredge);
            grad.addColorStop(0.5, colormid);
            grad.addColorStop(1, coloredge);
            lp.cfx.fillStyle = grad;
            lp.cfx.fillRect(bb[0][0], bb[0][1], w, h);
            ev = [v[0], v[1] - h];
        }
        else if (direction == 1) {
            //backwards
            const hlimit = lp.h - (CANVAS_SHIP_EDGE + v[1]);
            const h = Math.min(Math.max(COMPONENT_MAXIMUM_SIZE, hlimit - lp.r.si(0, COMPONENT_MAXIMUM_SIZE * 2)), Math.floor(0.6 * lp.size * Math.pow(lp.r.sd(0, 1), lp.f.r.hd(2, 7, "com4 hpower1"))));
            const bb = [
                [v[0] - hwi, v[1]],
                [v[0] + hwi + hwe, v[1] + h],
            ];
            const grad = lp.cfx.createLinearGradient(bb[0][0], bb[0][1], bb[1][0], bb[0][1]);
            grad.addColorStop(0, coloredge);
            grad.addColorStop(0.5, colormid);
            grad.addColorStop(1, coloredge);
            lp.cfx.fillStyle = grad;
            lp.cfx.fillRect(bb[0][0], bb[0][1], w, h);
            ev = [v[0], v[1] + h];
        }
        else if (direction == 2) {
            //to center
            const grad = lp.cfx.createLinearGradient(v[0], v[1] - hwi, v[0], v[1] + hwi + hwe);
            grad.addColorStop(0, coloredge);
            grad.addColorStop(0.5, colormid);
            grad.addColorStop(1, coloredge);
            lp.cfx.fillStyle = grad;
            lp.cfx.fillRect(v[0], v[1] - hwi, Math.ceil(lp.hw - v[0]) + 1, w);
            ev = [Math.floor(lp.hw), v[1]];
        }
        const coverComC = [
            0.6 * Math.pow(lp.f.r.hd(0, 1, "com4 covercomc0"), 2),
            0.2 * Math.pow(lp.f.r.hd(0, 1, "com4 covercomc1"), 2),
            1 * Math.pow(lp.f.r.hd(0, 1, "com4 covercomc2"), 2),
        ];
        components[lp.r.schoose(coverComC)](lp, v);
        if (lp.getcellstate(ev[0], ev[1]) > 0) {
            const nev = [
                ev[0] + Math.round(lp.r.sd(-1, 1) * COMPONENT_GRID_SIZE),
                ev[1] + Math.round(lp.r.sd(-1, 1) * COMPONENT_GRID_SIZE),
            ];
            if (lp.getcellstate(nev[0], nev[1]) > 0) {
                components[lp.r.schoose(coverComC)](lp, nev);
            }
            else {
                components[lp.r.schoose(coverComC)](lp, ev);
            }
        }
    };
    //Ball
    components[5] = function (lp, v) {
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.1);
        if (lp.r.sb(lp.f.r.hd(0, 0.9, "com5 bigchance") * bn)) {
            const chance = lp.f.r.hd(0, 0.8, "com5 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        const lightmid = lp.r.sd(0.75, 1);
        const lightedge = lp.r.sd(0, 0.25);
        const basecolor = lp.f.getBaseColor(lp);
        const colormid = colorToHex(scaleColorBy(basecolor, lightmid));
        const coloredge = colorToHex(scaleColorBy(basecolor, lightedge));
        const countx = 1 +
            lp.r.sseq(lp.f.r.hd(0, 1, "com5 multxc"), Math.floor(1.2 * Math.pow(lcms / COMPONENT_MAXIMUM_SIZE, 0.6)));
        const county = 1 +
            lp.r.sseq(lp.f.r.hd(0, 1, "com5 multyc"), Math.floor(1.2 * Math.pow(lcms / COMPONENT_MAXIMUM_SIZE, 0.6)));
        const smallr = (lp.r.sd(0.5, 1) * lcms) / Math.max(countx, county);
        const drawr = smallr + 0.5;
        const shadowr = smallr + 1;
        const centerr = smallr * 0.2;
        const hw = smallr * countx;
        const hh = smallr * county;
        const bv = [v[0] - hw, v[1] - hh];
        lp.cfx.fillStyle = "rgba(0,0,0," + lp.r.sd(0, 0.2) + ")";
        for (let ax = 0; ax < countx; ax++) {
            const px = bv[0] + (ax * 2 + 1) * smallr;
            for (let ay = 0; ay < county; ay++) {
                const py = bv[1] + (ay * 2 + 1) * smallr;
                lp.cfx.beginPath();
                lp.cfx.arc(px, py, shadowr, 0, 2 * Math.PI);
                lp.cfx.fill();
            }
        }
        for (let ax = 0; ax < countx; ax++) {
            const px = bv[0] + (ax * 2 + 1) * smallr;
            for (let ay = 0; ay < county; ay++) {
                const py = bv[1] + (ay * 2 + 1) * smallr;
                const grad = lp.cfx.createRadialGradient(px, py, centerr, px, py, drawr);
                grad.addColorStop(0, colormid);
                grad.addColorStop(1, coloredge);
                lp.cfx.fillStyle = grad;
                lp.cfx.beginPath();
                lp.cfx.arc(px, py, drawr, 0, 2 * Math.PI);
                lp.cfx.fill();
            }
        }
    };
    //Forward-facing trapezoidal fin
    components[6] = function (lp, v) {
        if (lp.nextpass <= 0 || lp.r.sb(frontness(lp, v))) {
            components[lp.r.schoose(copyArray(lp.f.componentChances, 0, 5))](lp, v);
            return;
        }
        let lcms = COMPONENT_MAXIMUM_SIZE;
        const bn = Math.pow(bigness(lp, v), 0.05);
        if (lp.r.sb(lp.f.r.hd(0, 0.9, "com6 bigchance") * bn)) {
            const chance = lp.f.r.hd(0, 0.8, "com6 bigincchance");
            while (lp.r.sb(chance * bn)) {
                const lw = leeway(lp, [
                    [v[0] - lcms, v[1] - lcms],
                    [v[0] + lcms, v[1] + lcms],
                ]);
                if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
                    lcms *= 1.5;
                }
                else {
                    break;
                }
            }
        }
        const h0 = Math.ceil(lcms * 2 * lp.r.sd(0.6, 1)); //Inner height, longer.
        const hh0i = Math.floor(h0 / 2);
        const hh0e = h0 % 2;
        //Outer height, shorter
        const h1 = h0 *
            Math.pow(lp.r.sd(Math.pow(lp.f.r.hd(0, 0.8, "com6 h1min"), 0.5), 0.9), lp.f.r.hd(0.5, 1.5, "com6 h1power"));
        const hh1i = Math.floor(h1 / 2);
        const hh1e = h0 % 2;
        const backamount = Math.max(0 - (h0 - h1) / 2, h0 *
            (lp.r.sd(0, 0.45) + lp.r.sd(0, 0.45)) *
            (lp.f.r.hb(0.8, "com6 backnesstype")
                ? lp.f.r.hd(0.2, 0.9, "com6 backness#pos")
                : lp.f.r.hd(-0.2, -0.05, "com6 backness#neg")));
        const w = Math.ceil(lcms * lp.r.sd(0.7, 1) * Math.pow(lp.f.r.hd(0.1, 3.5, "com6 width"), 0.5));
        const hwi = Math.floor(w / 2);
        const hwe = w % 2;
        const quad = [
            [v[0] - hwi, v[1] + backamount - hh1i],
            [v[0] + hwi + hwe, v[1] - hh0i],
            [v[0] + hwi + hwe, v[1] + hh0i + hh0e],
            [v[0] - hwi, v[1] + backamount + hh1i + hh1e],
        ];
        const basecolor = lp.f.getBaseColor(lp);
        lp.cfx.fillStyle = "rgba(0,0,0," + lp.r.sd(0, 0.2) + ")";
        lp.cfx.beginPath();
        lp.cfx.moveTo(quad[0][0] - 1, quad[0][1]);
        lp.cfx.lineTo(quad[1][0] - 1, quad[1][1]);
        lp.cfx.lineTo(quad[2][0] - 1, quad[2][1]);
        lp.cfx.lineTo(quad[3][0] - 1, quad[3][1]);
        lp.cfx.fill();
        lp.cfx.fillStyle = colorToHex(scaleColorBy(basecolor, lp.r.sd(0.7, 1)));
        lp.cfx.beginPath();
        lp.cfx.moveTo(quad[0][0], quad[0][1]);
        lp.cfx.lineTo(quad[1][0], quad[1][1]);
        lp.cfx.lineTo(quad[2][0], quad[2][1]);
        lp.cfx.lineTo(quad[3][0], quad[3][1]);
        lp.cfx.fill();
    };
    /*
    components["cabin !UNUSED"] = function (
      lp,
      v //Cabin
    ) {
      if (lp.nextpass <= 0 || lp.r.sb(backness(lp, v))) {
        components[lp.r.schoose(copyArray(lp.f.componentChances, 0, 5))](lp, v);
        return;
      }
      var lcms = cms;
      var bn = Math.pow(bigness(lp, v), 0.1);
      if (
        lp.r.sb(
          (lp.f.cache["com7 bigchance"] == null
            ? (lp.f.cache["com7 bigchance"] = lp.f.r.hd(0, 0.9, "com7 bigchance"))
            : lp.f.cache["com7 bigchance"]) * bn
        )
      ) {
        while (
          lp.r.sb(
            (lp.f.cache["com7 bigincchance"] == null
              ? (lp.f.cache["com7 bigincchance"] = lp.f.r.hd(
                  0,
                  0.9,
                  "com7 bigincchance"
                ))
              : lp.f.cache["com7 bigincchance"]) * bn
          )
        ) {
          var lw = leeway(lp, [
            [v[0] - lcms, v[1] - lcms],
            [v[0] + lcms, v[1] + lcms],
          ]);
          if (Math.min(lw[0], lw[1]) > lcms * 0.5) {
            lcms *= 1.5;
          } else {
            break;
          }
        }
      }
      var h =
        lcms *
        lp.r.sd(1, 2) *
        (lp.f.cache["com7 height"] == null
          ? (lp.f.cache["com7 height"] = lp.f.r.hd(0.5, 1, "com7 height"))
          : lp.f.cache["com7 height"]);
      var hh = h / 2;
      var w =
        1 +
        h *
          (lp.f.cache["com7 width"] == null
            ? (lp.f.cache["com7 width"] = lp.f.r.hd(0.3, 0.8, "com7 width"))
            : lp.f.cache["com7 width"]);
      var hw = w / 2;
      var windowcolor = lp.f.getwindowcolor(lp);
      var lightness0 = lp.r.sd(0.7, 0.9);
      var lightness1 = lp.r.sd(0.4, 0.6);
      var color0 = scaleColorBy(windowcolor, lightness0);
      var color1 = scaleColorBy(windowcolor, lightness1);
      var transparency =
        lp.f.cache["com7 transparency"] == null
          ? (lp.f.cache["com7 transparency"] = lp.f.r.hd(0.3, 0.5, "com7 transparency"))
          : lp.f.cache["com7 transparency"];
      var grad = lp.cfx.createRadialGradient(0, 0, w / 20, 0, 0, w / 2);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(
        0.3,
        "rgba(" +
          clamp(Math.round(color0[0] * 255), 0, 255) +
          ("," + clamp(Math.round(color0[1] * 255), 0, 255)) +
          ("," +
            clamp(Math.round(color0[2] * 255), 0, 255) +
            ("," + (1 - transparency) + ")"))
      );
      grad.addColorStop(
        1,
        "rgba(" +
          clamp(Math.round(color1[0] * 255), 0, 255) +
          ("," + clamp(Math.round(color1[1] * 255), 0, 255)) +
          ("," +
            clamp(Math.round(color1[2] * 255), 0, 255) +
            ("," + (1 - transparency / 2) + ")"))
      );
      lp.cfx.setTransform(1, 0, 0, h / w, v[0], v[1]);
      lp.cfx.fillStyle = grad;
      lp.cfx.beginPath();
      lp.cfx.arc(0, 0, w / 2, 0, pi2);
      lp.cfx.fill();
      lp.cfx.setTransform(1, 0, 0, 1, 0, 0);
    };
    */
    //END COMPONENTS

    //Each outline function takes a single argument 'lp' denoting the ship to draw the outline for.
    const outlines = [];
    //Joined rectangles.
    outlines[0] = function (lp) {
        const csarea = (lp.w - 2 * CANVAS_SHIP_EDGE) * (lp.h - 2 * CANVAS_SHIP_EDGE);
        const csarealimit = csarea * 0.05;
        const initialwidth = Math.ceil((lp.w - 2 * CANVAS_SHIP_EDGE) * lp.f.r.hd(0.1, 1, "outline0 iw") * 0.2);
        const blocks = [
            [
                [lp.hw - initialwidth, CANVAS_SHIP_EDGE],
                [lp.hw + initialwidth, lp.h - CANVAS_SHIP_EDGE],
            ],
        ];
        const blockcount = 2 +
            Math.floor(lp.r.sd(0.5, 1) * lp.f.r.hd(2, 8, "outline0 bc") * Math.sqrt(lp.size));
        for (let i = 1; i < blockcount; i++) {
            const base = blocks[lp.r.si(0, blocks.length - 1)];
            const v0 = [
                base[0][0] + lp.r.sd(0, 1) * (base[1][0] - base[0][0]),
                base[0][1] + lp.r.sd(0, 1) * (base[1][1] - base[0][1]),
            ];
            if (v0[1] < (base[0][1] + base[1][1]) * 0.5 &&
                lp.r.sb(lp.f.r.hd(0.5, 1.5, "outline0 frontbias"))) {
                v0[1] = base[1][1] - (v0[1] - base[0][1]);
            }
            const v1 = [
                clamp(lp.r.sd(0, 1) * lp.w, CANVAS_SHIP_EDGE, lp.w - CANVAS_SHIP_EDGE),
                clamp(lp.r.sd(0, 1) * lp.h, CANVAS_SHIP_EDGE, lp.h - CANVAS_SHIP_EDGE),
            ];
            const area = Math.abs((v1[0] - v0[0]) * (v1[1] - v0[1]));
            const ratio = csarealimit / area;
            if (ratio < 1) {
                v1[0] = v0[0] + (v1[0] - v0[0]) * ratio;
                v1[1] = v0[1] + (v1[1] - v0[1]) * ratio;
            }
            if (v0[0] > v1[0]) {
                const t = v0[0];
                v0[0] = v1[0];
                v1[0] = t;
            }
            if (v0[1] > v1[1]) {
                const t = v0[1];
                v0[1] = v1[1];
                v1[1] = t;
            }
            blocks.push([
                [Math.floor(v0[0]), Math.floor(v0[1])],
                [Math.ceil(v1[0]), Math.ceil(v1[1])],
            ]);
        }
        lp.csx.fillStyle = "#FFFFFF";
        for (let i = 0; i < blocks.length; i++) {
            const lb = blocks[i];
            lp.csx.fillRect(lb[0][0], lb[0][1], lb[1][0] - lb[0][0], lb[1][1] - lb[0][1]);
            lp.csx.fillRect(lp.w - lb[1][0], lb[0][1], lb[1][0] - lb[0][0], lb[1][1] - lb[0][1]);
        }
    };
    //Joined circles
    outlines[1] = function (lp) {
        const csarea = (lp.w - 2 * CANVAS_SHIP_EDGE) * (lp.h - 2 * CANVAS_SHIP_EDGE);
        const csarealimit = csarea * 0.05;
        const csrlimit = Math.max(2, Math.sqrt(csarealimit / Math.PI));
        const initialwidth = Math.ceil((lp.w - 2 * CANVAS_SHIP_EDGE) * lp.f.r.hd(0.1, 1, "outline1 iw") * 0.2);
        const circles = [];
        const initialcount = Math.floor((lp.h - 2 * CANVAS_SHIP_EDGE) / (initialwidth * 2));
        for (let i = 0; i < initialcount; i++) {
            let lv = [lp.hw, lp.h - (CANVAS_SHIP_EDGE + initialwidth * (i * 2 + 1))];
            circles.push({ v: lv, r: initialwidth });
        }
        const circlecount = initialcount +
            Math.floor(lp.r.sd(0.5, 1) * lp.f.r.hd(10, 50, "outline1 cc") * Math.sqrt(lp.size));
        for (let i = initialcount; i < circlecount; i++) {
            const base = circles[Math.max(lp.r.si(0, circles.length - 1), lp.r.si(0, circles.length - 1))];
            let ncr = lp.r.sd(1, csrlimit);
            const pr = lp.r.sd(Math.max(0, base.r - ncr), base.r);
            let pa = lp.r.sd(0, 2 * Math.PI);
            if (pa > Math.PI && lp.r.sb(lp.f.r.hd(0.5, 1.5, "outline1 frontbias"))) {
                pa = lp.r.sd(0, Math.PI);
            }
            let lv = [base.v[0] + Math.cos(pa) * pr, base.v[1] + Math.sin(pa) * pr];
            ncr = Math.min(ncr, lv[0] - CANVAS_SHIP_EDGE);
            ncr = Math.min(ncr, lp.w - CANVAS_SHIP_EDGE - lv[0]);
            ncr = Math.min(ncr, lv[1] - CANVAS_SHIP_EDGE);
            ncr = Math.min(ncr, lp.h - CANVAS_SHIP_EDGE - lv[1]);
            circles.push({ v: lv, r: ncr });
        }
        lp.csx.fillStyle = "#fff";
        for (let i = 0; i < circles.length; i++) {
            const lc = circles[i];
            lp.csx.beginPath();
            lp.csx.arc(lc.v[0], lc.v[1], lc.r, 0, 2 * Math.PI);
            lp.csx.fill();
            lp.csx.beginPath();
            lp.csx.arc(lp.w - lc.v[0], lc.v[1], lc.r, 0, 2 * Math.PI);
            lp.csx.fill();
        }
    };
    //Mess of lines
    outlines[2] = function (lp) {
        const innersize = [lp.w - 2 * CANVAS_SHIP_EDGE, lp.h - 2 * CANVAS_SHIP_EDGE];
        const points = [
            [lp.hw, lp.r.sd(0, 0.05) * innersize[1] + CANVAS_SHIP_EDGE],
            [lp.hw, lp.r.sd(0.95, 1) * innersize[1] + CANVAS_SHIP_EDGE],
        ];
        const basefatness = COMPONENT_GRID_SIZE / lp.size +
            lp.f.r.hd(0.03, 0.1, "outline2 basefatness");
        const basemessiness = 1 / basefatness;
        const pointcount = Math.max(3, Math.ceil(basemessiness * lp.r.sd(0.05, 0.1) * Math.sqrt(lp.size)));
        // @ts-ignore - We're doing it properly
        lp.csx.lineCap = ["round", "square"][lp.f.r.hi(0, 1, "outline2 linecap")];
        lp.csx.strokeStyle = "#fff";
        for (let npi = 1; npi < pointcount; npi++) {
            let np = points[npi];
            if (np == null) {
                np = [
                    lp.r.sd(0, 1) * innersize[0] + CANVAS_SHIP_EDGE,
                    Math.pow(lp.r.sd(0, 1), lp.f.r.hd(0.1, 1, "outline2 frontbias")) *
                        innersize[1] +
                        CANVAS_SHIP_EDGE,
                ];
                points.push(np);
            }
            const cons = 1 + lp.r.sseq(lp.f.r.hd(0, 1, "outline2 conadjust"), 3);
            for (let nci = 0; nci < cons; nci++) {
                const pre = points[lp.r.si(0, points.length - 2)];
                lp.csx.lineWidth = lp.r.sd(0.7, 1) * basefatness * lp.size;
                lp.csx.beginPath();
                lp.csx.moveTo(pre[0], pre[1]);
                lp.csx.lineTo(np[0], np[1]);
                lp.csx.stroke();
                lp.csx.beginPath();
                lp.csx.moveTo(lp.w - pre[0], pre[1]);
                lp.csx.lineTo(lp.w - np[0], np[1]);
                lp.csx.stroke();
            }
        }
    };

    class Ship {
        constructor(p_faction, p_seed, size) {
            this.extradone = 0;
            this.nextpass = 0;
            this.nextcell = 0;
            this.totaldone = 0;
            this.f = p_faction;
            //Base seed for this ship, without appending the faction seed
            this.baseSeed = p_seed;
            this.seed = this.f.seed + this.baseSeed;
            this.r = new Randomizer(this.seed);
            //The initial overall size of this ship, in pixels
            this.size =
                size == null
                    ? this.r.sd(this.f.r.hd(2.5, 3.5, "size min"), this.f.r.hd(5, 7, "size max")) ** 3
                    : size;
            const wratio = this.r.sd(this.f.r.hd(0.5, 1, "wratio min"), this.f.r.hd(1, 1.3, "wratio max"));
            const hratio = this.r.sd(this.f.r.hd(0.7, 1, "hratio min"), this.f.r.hd(1.1, 1.7, "hratio max"));
            this.w = Math.floor(this.size * wratio) + 2 * CANVAS_SHIP_EDGE; //Maximum width of this ship, in pixels.
            this.hw = Math.floor(this.w / 2);
            this.gw = Math.floor((this.w - 2 * CANVAS_SHIP_EDGE) / COMPONENT_GRID_SIZE);
            this.gwextra = (this.w - this.gw * COMPONENT_GRID_SIZE) * 0.5;
            this.h = Math.floor(this.size * hratio) + 2 * CANVAS_SHIP_EDGE; //Maximum height of this ship, in pixels.
            this.hh = Math.floor(this.h / 2);
            this.gh = Math.floor((this.h - 2 * CANVAS_SHIP_EDGE) / COMPONENT_GRID_SIZE);
            this.ghextra = (this.h - this.gh * COMPONENT_GRID_SIZE) * 0.5;
            this.cs = document.createElement("canvas"); //Canvas on which the basic outline of the ship is drawn. Ships face upwards, with front towards Y=0.
            this.cs.setAttribute("width", String(this.w));
            this.cs.setAttribute("height", String(this.h));
            this.csx = this.cs.getContext("2d");
            this.cf = document.createElement("canvas"); //Canvas on which the actual ship components are drawn. Ships face upwards, with front towards Y=0.
            this.cf.setAttribute("width", String(this.w));
            this.cf.setAttribute("height", String(this.h));
            this.cfx = this.cf.getContext("2d");
            outlines[this.f.r.hchoose([1, 1, 1], "outline type")](this);
            this.csd = this.csx.getImageData(0, 0, this.w, this.h);
            this.cgrid = [];
            for (let gx = 0; gx < this.gw; gx++) {
                this.cgrid[gx] = [];
                for (let gy = 0; gy < this.gh; gy++) {
                    this.cgrid[gx][gy] = {
                        gx: gx,
                        gy: gy,
                        x: Math.floor(this.gwextra + (gx + 0.5) * COMPONENT_GRID_SIZE),
                        y: Math.floor(this.ghextra + (gy + 0.5) * COMPONENT_GRID_SIZE),
                        state: 0,
                    }; //state is 0 for unchecked, 1 for checked and good, and -1 for checked and bad.
                }
            }
            this.goodcells = [
                this.cgrid[Math.floor(this.gw / 2)][Math.floor(this.gh / 2)],
            ];
            let nextcheck = 0;
            while (nextcheck < this.goodcells.length) {
                const lcell = this.goodcells[nextcheck];
                if (lcell.gx > 0) {
                    const ncell = this.cgrid[lcell.gx - 1][lcell.gy];
                    if (ncell.state == 0) {
                        if (this.getspa(ncell.x, ncell.y) > 0) {
                            ncell.state = 1;
                            this.goodcells.push(ncell);
                        }
                        else {
                            ncell.state = -1;
                        }
                    }
                }
                if (lcell.gx < this.gw - 1) {
                    const ncell = this.cgrid[lcell.gx + 1][lcell.gy];
                    if (ncell.state == 0) {
                        if (this.getspa(ncell.x, ncell.y) > 0) {
                            ncell.state = 1;
                            this.goodcells.push(ncell);
                        }
                        else {
                            ncell.state = -1;
                        }
                    }
                }
                if (lcell.gy > 0) {
                    const ncell = this.cgrid[lcell.gx][lcell.gy - 1];
                    if (ncell.state == 0) {
                        if (this.getspa(ncell.x, ncell.y) > 0) {
                            ncell.state = 1;
                            this.goodcells.push(ncell);
                        }
                        else {
                            ncell.state = -1;
                        }
                    }
                }
                if (lcell.gy < this.gh - 1) {
                    const ncell = this.cgrid[lcell.gx][lcell.gy + 1];
                    if (ncell.state == 0) {
                        if (this.getspa(ncell.x, ncell.y) > 0) {
                            ncell.state = 1;
                            this.goodcells.push(ncell);
                        }
                        else {
                            ncell.state = -1;
                        }
                    }
                }
                nextcheck++;
            }
            for (let i = 0; i < this.goodcells.length; i++) {
                const lcell = this.goodcells[i];
                const ocell = this.cgrid[this.gw - 1 - lcell.gx][lcell.gy];
                if (ocell.state != 1) {
                    ocell.state = 1;
                    this.goodcells.push(ocell);
                }
            }
            this.passes = this.f.r.hi(1, 2, "base component passes");
            this.extra = Math.max(1, Math.floor(this.goodcells.length *
                this.f.r.hd(0, 1 / this.passes, "extra component amount")));
            this.totalcomponents = this.passes * this.goodcells.length + this.extra;
        }
        // Returns the cell containing (X,Y), if there is one, or null otherwise
        getcell(x, y) {
            const gx = Math.floor((x - this.gwextra) / COMPONENT_GRID_SIZE);
            const gy = Math.floor((y - this.ghextra) / COMPONENT_GRID_SIZE);
            if (gx < 0 || gx >= this.gw || gy < 0 || gy >= this.gh) {
                return null;
            }
            return this.cgrid[gx][gy];
        }
        //Returns the state of the cell containing (X,Y), or 0 if there is no such cell
        getcellstate(x, y) {
            const lcell = this.getcell(x, y);
            if (lcell == null) {
                return 0;
            }
            return lcell.state;
        }
        //Returns the alpha value (0 - 255) for the pixel of csd corresponding to the point (X,Y), or -1 if (X,Y) is out of bounds.
        getspa(x, y) {
            x = Math.floor(x);
            y = Math.floor(y);
            if (x < 0 || x > this.w || y < 0 || y > this.h) {
                return -1;
            }
            return this.csd.data[(y * this.w + x) * 4 + 3];
        }
        getpcdone() {
            return this.totaldone / this.totalcomponents;
        }
        addcomponent() {
            //Generates the next component of this ship. Returns true if the ship is finished, false if there are still more components to add.
            let ncell;
            if (this.nextpass < this.passes) {
                if (this.nextcell < this.goodcells.length) {
                    ncell = this.goodcells[this.nextcell];
                    this.nextcell++;
                }
                else {
                    this.nextpass++;
                    ncell = this.goodcells[0];
                    this.nextcell = 1;
                }
            }
            else if (this.extradone < this.extra) {
                ncell = this.goodcells[this.r.si(0, this.goodcells.length - 1)];
                this.extradone++;
            }
            else {
                return true;
            }
            let lv = [ncell.x, ncell.y];
            for (let t = 0; t < 10; t++) {
                const nv = [
                    ncell.x + this.r.si(-COMPONENT_GRID_SIZE, COMPONENT_GRID_SIZE),
                    ncell.y + this.r.si(-COMPONENT_GRID_SIZE, COMPONENT_GRID_SIZE),
                ];
                if (nv[0] < CANVAS_SHIP_EDGE ||
                    nv[0] > this.w - CANVAS_SHIP_EDGE ||
                    nv[1] < CANVAS_SHIP_EDGE ||
                    nv[1] > this.h - CANVAS_SHIP_EDGE) {
                    continue;
                }
                if (this.getspa(nv[0], nv[1]) <= 0) {
                    continue;
                }
                lv = nv;
                break;
            }
            if (Math.abs(lv[0] - this.hw) < COMPONENT_GRID_SIZE) {
                if (this.r.sb(this.f.r.hd(0, 1, "com middleness"))) {
                    lv[0] = Math.floor(this.hw);
                }
            }
            components[this.r.schoose(this.f.componentChances)](this, lv);
            this.totaldone++;
            return false;
        }
    }

    //
    function renderShip(lp) {
        var done = false;
        do {
            done = lp.addcomponent();
        } while (!done);
        lp.cfx.clearRect(lp.hw + (lp.w % 2), 0, lp.w, lp.h);
        lp.cfx.scale(-1, 1);
        lp.cfx.drawImage(lp.cf, 0 - lp.w, 0);
    }
    function generateFaction(seed) {
        return new Faction(seed);
    }
    function generateShip(faction, seed, size) {
        const newShip = new Ship(faction, seed, size);
        renderShip(newShip);
        // currentship.cf has the canvas with the image
        // currentship.width
        // currentship.height
        return newShip;
    }

    function findTopRow(imageData, width, height) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            return y;
          }
        }
      }
      return -1;
    }

    function findBottomRow(imageData, width, height) {
      for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            return y;
          }
        }
      }
      return -1;
    }

    function findLeftColumn(imageData, width, height) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const index = (y * width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            return x;
          }
        }
      }
      return -1;
    }

    function findRightColumn(imageData, width, height) {
      for (let x = width - 1; x >= 0; x--) {
        for (let y = 0; y < height; y++) {
          const index = (y * width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            return x;
          }
        }
      }
      return -1;
    }

    function trimCanvas(canvas) {
      const ctx = canvas.getContext("2d");
      let w = canvas.width,
        h = canvas.height;
      const imageData = ctx.getImageData(0, 0, w, h);

      const topRow = findTopRow(imageData, w, h),
        bottomRow = findBottomRow(imageData, w, h),
        leftColumn = findLeftColumn(imageData, w, h),
        rightColumn = findRightColumn(imageData, w, h);
      // No need to check all of them; if one is -1, all will be and viceversa
      if (topRow < 0) {
        canvas.width = 0;
        canvas.height = 0;
        return [0, 0];
      }
      w = 1 + rightColumn - leftColumn;
      h = 1 + bottomRow - topRow;
      const cut = ctx.getImageData(leftColumn, topRow, w, h);

      canvas.width = w;
      canvas.height = h;
      ctx.putImageData(cut, 0, 0);
      return [leftColumn, topRow];
    }

    function createFavicon(img) {
      const favicon = document.createElement('canvas');
      favicon.width = 32;
      favicon.height = 32;
      const favCtx = favicon.getContext('2d');
      let destWidth, destHeight;
      if (img.width > img.height) {
        destWidth = 32;
        destHeight = 32 * img.height / img.width;
      } else {
        destHeight = 32;
        destWidth = 32 * img.width / img.height;
      }
      favCtx.drawImage(img, 0, 0, destWidth, destHeight);

      const link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('href', favicon.toDataURL());
      document.head.appendChild(link);
    }

    const MAX_ANGLE = 360;

    function createSplitPoints(width, height, targetSize, noise) {
      const xPoints = Math.floor(width / targetSize);
      const yPoints = Math.floor(height / targetSize);
      const result = [];
      const yOffset = Math.floor(height / (2 * yPoints));
      for (let currentY = 0; currentY < yPoints; currentY++) {
        const iterationXPoints = currentY % 2 === 0 ? xPoints : xPoints - 1;
        const xOffset =
          currentY % 2 === 0
            ? Math.floor(width / (2 * xPoints))
            : Math.floor(width / xPoints);
        for (let currentX = 0; currentX < iterationXPoints; currentX++) {
          result.push([
            xOffset +
              Math.round(
                ((currentX + (Math.random() - 0.5) * 2 * noise) * width) / xPoints
              ),
            yOffset +
              Math.round(
                ((currentY + (Math.random() - 0.5) * 2 * noise) * height) / yPoints
              ),
          ]);
        }
      }
      return result;
    }

    function euclideanDistance(diffX, diffY) {
      return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    function createSprites(targetCanvas) {
      const splitPoints = createSplitPoints(
        targetCanvas.width,
        targetCanvas.height,
        Math.max(
          12,
          Math.floor(Math.min(targetCanvas.width, targetCanvas.height) / 12)
        ),
        0.5
      );
      const targetCtx = targetCanvas.getContext("2d");
      const width = targetCanvas.width,
        height = targetCanvas.height;
      const imageData = targetCtx.getImageData(0, 0, width, height);
      const sprites = [];
      splitPoints.forEach(() => {
        sprites.push({
          minX: -1,
          minY: -1,
          maxX: -1,
          maxY: -1,
          points: [],
        });
      });
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pos = (y * width + x) * 4;
          if (imageData.data[pos + 3] === 0) {
            // Transparent pixel, nothing to do
            continue;
          }
          let minDistance = euclideanDistance(
            splitPoints[0][0] - x,
            splitPoints[0][1] - y
          );
          let minIndex = 0;
          for (let i = 1; i < splitPoints.length; i++) {
            const distance = euclideanDistance(
              splitPoints[i][0] - x,
              splitPoints[i][1] - y
            );
            if (distance < minDistance) {
              minDistance = distance;
              minIndex = i;
            }
          }

          const targetSprite = sprites[minIndex];
          if (targetSprite.minX < 0) {
            targetSprite.minX = x;
            targetSprite.minY = y;
            targetSprite.maxX = x;
            targetSprite.maxY = y;
          } else {
            if (x < targetSprite.minX) {
              targetSprite.minX = x;
            }
            if (x > targetSprite.maxX) {
              targetSprite.maxX = x;
            }
            if (y < targetSprite.minY) {
              targetSprite.minY = y;
            }
            if (y > targetSprite.maxY) {
              targetSprite.maxY = y;
            }
          }
          targetSprite.points.push([
            x,
            y,
            imageData.data[pos],
            imageData.data[pos + 1],
            imageData.data[pos + 2],
            imageData.data[pos + 3],
          ]);
        }
      }
      const result = [];
      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        if (sprite.minX > -1) {
          const shardWidth = sprite.maxX - sprite.minX + 1;
          const shardHeight = sprite.maxY - sprite.minY + 1;
          const shardCanvas = document.createElement("canvas");
          shardCanvas.width = shardWidth;
          shardCanvas.height = shardHeight;
          const shardCtx = shardCanvas.getContext("2d");
          const imgData = shardCtx.getImageData(
            0,
            0,
            shardCanvas.width,
            shardCanvas.height
          );
          sprite.points.forEach((point) => {
            const pos =
              4 *
              ((point[1] - sprite.minY) * shardWidth + (point[0] - sprite.minX));
            imgData.data[pos] = point[2];
            imgData.data[pos + 1] = point[3];
            imgData.data[pos + 2] = point[4];
            imgData.data[pos + 3] = point[5];
          });
          shardCtx.putImageData(imgData, 0, 0);
          const resultShard = {
            center: splitPoints[i],
            canvas: shardCanvas,
            corner: [sprite.minX, sprite.minY],
          };
          result.push(resultShard);
        }
      }
      return result;
    }

    function calculateSpriteFinalState(sprite, width, height) {
      const radiusFactor = 1.5 + 1.5 * Math.random();
      const cx = sprite.center[0] - width / 2;
      const cy = sprite.center[1] - height / 2;
      const distance = Math.sqrt(cx * cx + cy * cy);
      const distanceSquare = distance * distance;
      const finalDistance = distance * radiusFactor;

      sprite.translateX =
        (finalDistance - distance) *
        Math.sqrt((distanceSquare - cy * cy) / distanceSquare) *
        (cx > 0 ? 1 : -1);
      sprite.translateY =
        (finalDistance - distance) *
        Math.sqrt((distanceSquare - cx * cx) / distanceSquare) *
        (cy > 0 ? 1 : -1);
      sprite.angle =
        ((Math.random() * MAX_ANGLE * 2 - MAX_ANGLE) /
          ((Math.random() + 2) * sprite.canvas.width)) *
        10 *
        (Math.PI / 180);
    }

    function hitEffect(canvas) {
      const destCanvas = document.createElement("canvas");
      const { width, height } = canvas;
      destCanvas.width = width;
      destCanvas.height = height;
      const ctx = canvas.getContext("2d");
      const destCtx = destCanvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;
      const { length } = data;
      for (let i = 0; i < length; i += 4) {
        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i + 0] = 255 - (0.393 * r + 0.769 * g + 0.189 * b);
        data[i + 1] = 255 - (0.349 * r + 0.686 * g + 0.168 * b);
        data[i + 2] = 255 - (0.272 * r + 0.534 * g + 0.131 * b);
      }
      destCtx.putImageData(imageData, 0, 0);
      return destCanvas;
    }

    function generateShield(level) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(shipWidth * 2);
      canvas.height = Math.floor(shipHeight * 2);
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2 - 15;
      const centerY = canvas.height / 2 - 30;
      ctx.setTransform(1.5, 0, 0, (shipHeight / shipWidth) * 1.5, 0, 0);
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        30 - level * 3
      );
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.7, "blue");
      grad.addColorStop(1, "cyan");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, shipWidth / 2, 0, 7);
      ctx.fill();
      trimCanvas(canvas);
      return canvas;
    }

    function generateShields() {
      const shields = [];
      for (let c = 0; c < 5; c++) {
        shields.push(generateShield(c));
      }
      return shields;
    }

    function generateBullet() {
      const canvas = document.createElement("canvas");
      canvas.width = 20;
      canvas.height = 60;
      const ctx = canvas.getContext("2d");
      // gold filled rect
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.moveTo(10, 60);
      ctx.lineTo(20, 10);
      ctx.arc(10, 10, 10, 0, Math.PI, true);
      ctx.lineTo(10, 60);
      ctx.fill();

      // shadow
      ctx.strokeStyle = "cyan";
      ctx.shadowColor = "blue";
      // restrict new draw to cover existing pixels
      ctx.globalCompositeOperation = "source-atop";
      // shadowed stroke
      // "source-atop" clips off the undesired outer shadow
      ctx.shadowBlur = 4;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(10, 70);
      ctx.lineTo(23, 10);
      ctx.arc(10, 10, 13, 0, Math.PI, true);
      ctx.lineTo(10, 70);
      ctx.stroke();

      return [canvas, ctx.getImageData(0, 0, canvas.width, canvas.height).data];
    }

    function generateEnemyBulletFrame(colorStop) {
      const canvas = document.createElement("canvas");
      canvas.width = 20;
      canvas.height = 20;
      const ctx = canvas.getContext("2d");
      var grd = ctx.createRadialGradient(10, 10, 0, 10, 10, 10);
      grd.addColorStop(colorStop, "yellow");
      grd.addColorStop(1, "red");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(10, 10, 10, 0, 7);
      ctx.fill();

      return canvas;
    }

    function generateEnemyBullet() {
      const frames = [];
      for (let c = 0; c < 9; c++) {
        frames.push(generateEnemyBulletFrame(c / 10));
      }
      // Inverse animation, copying by reference
      for (let d = frames.length - 2; d >= 1; d--) {
        frames.push(frames[d]);
      }
      return frames;
    }

    function generatePowerupCanvas() {
      const canvas = document.createElement("canvas");
      canvas.width = 60;
      canvas.height = 60;
      const ctx = canvas.getContext("2d");
      var grd = ctx.createRadialGradient(30, 30, 0, 30, 30, 30);
      grd.addColorStop(0.6, "navy");
      grd.addColorStop(1, "blue");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(30, 30, 30, 0, 7);
      ctx.fill();
      return [canvas, ctx.getImageData(0, 0, canvas.width, canvas.height).data];
    }

    function flipCanvas(canvas) {
      const flippedCanvas = document.createElement("canvas");
      flippedCanvas.width = canvas.width;
      flippedCanvas.height = canvas.height;
      const ctx = flippedCanvas.getContext("2d");
      ctx.scale(1, -1);
      ctx.drawImage(canvas, 0, 0, canvas.width, -canvas.height);
      return flippedCanvas;
    }

    function generateNewTag() {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.font = "bold 20px Helvetica";
      ctx.translate(50, 50);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "red";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NEW!", 0, 0);
      trimCanvas(canvas);
      const tagCanvas = document.createElement("canvas");
      tagCanvas.width = canvas.width + 10;
      tagCanvas.height = canvas.height + 10;
      const tagCtx = tagCanvas.getContext("2d");
      tagCtx.fillStyle = "red";
      tagCtx.fillRect(0, 0, tagCanvas.width, tagCanvas.height);
      tagCtx.drawImage(canvas, 5, 5);
      return tagCanvas;
    }

    const CANVAS_WIDTH = 480;
    const CANVAS_HEIGHT = 700;
    const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
    const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
    const SHIP_SPEED = 0.6;
    const STARS_WIDTH = 540;

    let pointer_down = false;
    let introInhibitPress = false;

    let click_x = -1,
      click_y = -1,
      down_x = -1,
      down_y = -1,
      up_x = -1,
      up_y = -1,
      move_x = -1,
      move_y = -1,
      x,
      y,
      keysPressed = {},
      any_key_pressed = false;

    let a = document.getElementById("a");
    const faction = generateFaction("piBbgDn4CZqlkqiF");
    const ship = generateShip(faction, "ie7jMyCFouoUjkVs", 60).cf;

    trimCanvas(ship);

    const destroyedShipSprites = createSprites(ship);
    const shipWidth = ship.width;
    const shipHeight = ship.height;
    const shipMask = ship.getContext('2d').getImageData(0, 0, shipWidth, shipHeight).data;

    let shipHitBox = [
      x,
      y,
      shipWidth,
      shipHeight,
      shipMask,
    ];
    let shipDestroyed;
    let gameOverTime;
    let fastFire;
    const BOMB_DURATION = 1000;
    let bombEffect;
    let shieldLevel;

    // Create favicon
    createFavicon(ship);

    const shields = generateShields();

    const enemyBlueprints = [];

    const [bullet, bulletMask] = generateBullet();
    const enemyBulletFrames = generateEnemyBullet();
    const enemyBulletMask = enemyBulletFrames[0].getContext('2d').getImageData(0, 0, enemyBulletFrames[0].width, enemyBulletFrames[0].height).data;

    const [powerupCanvas, powerupMask] = generatePowerupCanvas();

    let initialTime = performance.now();

    const STATE_LOADING = 0,
      STATE_INTRO = 1,
      STATE_GAME = 2;

    let difficulty;
    let score;
    let scoreText;
    let state = STATE_LOADING;

    const highscores = JSON.parse(localStorage["pnf_highscores"] || "false") || [];
    let highlightHighscore = -1;
    const newTag = generateNewTag();

    function addScore(points) {
      score += points;
      scoreText = new Intl.NumberFormat().format(score);
    }

    function updateNextEnemy() {
      const minNextEnemy = Math.max(400, 1000 - difficulty * 25);
      nextEnemy += enemyRandomizer.si(minNextEnemy, minNextEnemy + 400);
    }

    function updateHighscores() {
      if (score) {
        const newScore = [score, Date.now()];
        highscores.push(newScore);
        // Sort by score
        highscores.sort((a, b) => {
          const scoreDiff = b[0] - a[0];
          if (scoreDiff === 0) {
            // Tie, newer first
            return b[1] - a[1];
          }
          return scoreDiff;
        });
        // Only keep the top 5
        highscores.length = Math.min(highscores.length, 5);
        highlightHighscore = highscores.indexOf(newScore);
        localStorage["pnf_highscores"] = JSON.stringify(highscores);
      }
    }

    let bossShip;
    let bossMask;
    let bossHit;
    let destroyedBossSprites;

    function generateBoss() {
      bossShip = flipCanvas(
        generateShip(generateFaction("HYj7ADLjQr6icLtO"), "CdiB9N2ZoQWuAxur", 270)
          .cf
      );
      trimCanvas(bossShip);
      bossHit = hitEffect(bossShip);
      destroyedBossSprites = createSprites(bossShip);
      bossMask = bossShip.getContext('2d').getImageData(0, 0, bossShip.width, bossShip.height).data;
    }

    function generateEnemy(faction, seed, size, ...more) {
      const enemyShip = flipCanvas(
        generateShip(generateFaction(faction), seed, size).cf
      );
      return [enemyShip, undefined, undefined, undefined, ...more];
    }

    function generateEnemyAssets(enemyBlueprint) {
      const enemyShip = enemyBlueprint[0];
      trimCanvas(enemyShip);
      const mask = enemyShip.getContext('2d').getImageData(0, 0, enemyShip.width, enemyShip.height).data;
      const hitEnemyShip = hitEffect(enemyShip);
      const destroyedEnemyShipSprites = createSprites(enemyShip);
      enemyBlueprint[1] = mask;
      enemyBlueprint[2] = hitEnemyShip;
      enemyBlueprint[3] = destroyedEnemyShipSprites;
    }

    const enemyDefinitions = [
      ["c4pf4K5xHzu4CyZM", "Wl9w64KNQvFNbbbU", 50, 10, 0.35, 0, []],
      ["VTjHVRDIYTbXk766", "a3QM5c7MnbQlWns3", 80, 30, 0.27, 0, []],
      ["1fOXvyryYCvwBWPL", "I4xttvPYWxB1So2A", 230, 80, 0.2, 6, []],

      ["VsM4qdcBSiuCPDGJ", "q4D72OvJMb23kSZC", 60, 20, 0.4, 0, []],
      [
        "l4pyu8yF0mt84Q4u",
        "jPU5GcKNpf2JMgoG",
        100,
        40,
        0.35,
        0,
        [[HALF_CANVAS_HEIGHT]],
      ],
      ["NMp3mtsPHIwzMKYk", "dBzvSKo7wpema3S5", 220, 90, 0.22, 9, []],

      [
        "o67yOby6izpasGgo",
        "fyKKupDEId96qQHu",
        70,
        20,
        0.5,
        0,
        [[HALF_CANVAS_HEIGHT]],
      ],
      [
        "IU7xqL8UqZIXJQDQ",
        "aVBO8buAfBbQ4DOY",
        100,
        40,
        0.35,
        0,
        [[HALF_CANVAS_HEIGHT, 6]],
      ],
      ["LP6kUeGMn7S5xZzi", "p5O7jAQK67mDULTD", 230, 100, 0.25, 14, []],

      [
        "SsSvCKpjLVTGITYH",
        "aOEjI2Owpqpl06ex",
        65,
        30,
        0.5,
        0,
        [[HALF_CANVAS_HEIGHT]],
      ],
      [
        "AGUwhB1E94wgKe49",
        "pwUtokX7oS7ZKFK1",
        110,
        50,
        0.35,
        6,
        [[HALF_CANVAS_HEIGHT, 6]],
      ],
      ["qRF6GA3xnzX0lMcH", "RIdNudvB6T2ro7C3", 240, 120, 0.3, 22, []],
    ];
    //    generateEnemy("KVoA08jfxzGQlU26", "bxfJMJri6hSgr3zD", 220, 80, 0.2),

    function increaseDifficulty() {
      difficulty++;
    }

    function render(now) {
      switch (state) {
        case STATE_LOADING:
        case STATE_INTRO:
          introRender(now);
          break;
        case STATE_GAME:
          gameRender(now);
          break;
      }
      // Any key press detection should have been consumed now
      any_key_pressed = false;
    }

    function newGame() {
      state = STATE_GAME;
      difficulty = 0;
      enemyRandomizer = new Randomizer("enemy");
      powerupRandomizer = new Randomizer("powerup");
      nextEnemy = 1000;
      nextDifficulty = 5000;
      nextPowerup = POWERUP_INTERVAL;
      powerupIndex = 0;
      lastBullet = 0;
      entities = [];
      hitables = [];
      initialTime = performance.now();
      lastTime = performance.now();
      score = 0;
      addScore(0);
      shipDestroyed = false;
      x = HALF_CANVAS_WIDTH;
      y = Math.floor(CANVAS_HEIGHT * 0.9);
      fastFire = 0;
      bombEffect = 0;
      shieldLevel = 1;
      bossTime = false;
      highlightHighscore = -1;
    }

    function introRender(now) {
      // reset
      const ctx = a.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#fff";
      let ellapsed = (now - initialTime) / 3000;

      ctx.save();
      for (let j = 800; j--;) {
        let r = 200 / (4 - ((ellapsed + j / 13) % 4));
        ctx.globalAlpha = Math.min(r / 400, 1);
        ctx.beginPath();
        ctx.arc(
          Math.cos(j) * r + HALF_CANVAS_WIDTH,
          Math.sin(j * j) * r + HALF_CANVAS_HEIGHT,
          r / 800,
          0,
          7
        );
        ctx.fill();
      }

      ctx.restore();
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      if (state === STATE_INTRO) {
        if (highscores.length === 0) {
          ctx.font = "bold 40px Helvetica";
          ctx.fillText("PLANET NOT FOUND", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
        } else {
          ctx.font = "bold 30px Helvetica";
          ctx.fillText("HIGH SCORES", HALF_CANVAS_WIDTH, 100);

          ctx.save();
          ctx.textAlign = "start";
          ctx.textBaseline = "top";
          for (let c = 0; c < highscores.length; c++) {
            if (c === highlightHighscore) {
              ctx.save();
              ctx.translate(90, 185 + 80 * c);
              ctx.drawImage(
                newTag,
                -Math.floor(newTag.width / 2),
                -Math.floor(newTag.height / 2)
              );
              ctx.restore();
              ctx.fillStyle = "gold";
            } else {
              ctx.fillStyle = "#fff";
            }
            const score = Intl.NumberFormat().format(highscores[c][0]);
            const time = new Date(highscores[c][1]).toLocaleString();
            ctx.font = "50px Helvetica";
            ctx.fillText(String(c + 1), 115, 160 + 80 * c);
            ctx.font = "60px Helvetica";
            ctx.fillText("{", 145, 150 + 80 * c);
            ctx.font = "25px Helvetica";
            ctx.fillText(score + " points", 170, 160 + 80 * c);
            ctx.font = "15px Helvetica";
            ctx.fillText(time, 170, 190 + 80 * c);
          }

          ctx.restore();
        }
        ctx.font = "20px Helvetica";
        ctx.fillText(
          "<Press anywhere or any key to play>",
          HALF_CANVAS_WIDTH,
          CANVAS_HEIGHT - 30
        );

        if (pointer_down || any_key_pressed) {
          if (!introInhibitPress) {
            // Start game
            newGame();
          }
        } else {
          introInhibitPress = false;
        }
      } else {
        ctx.font = "italic 30px Helvetica";
        ctx.fillText("Loading…", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
        // Generate assets
        if (!bossShip) {
          generateBoss();
        } else if (enemyBlueprints.length < enemyDefinitions.length) {
          enemyBlueprints.push(
            generateEnemy(...enemyDefinitions[enemyBlueprints.length])
          );
        } else {
          let generatedAllAssets = true;
          for (let c = 0; generatedAllAssets && c < enemyBlueprints.length; c++) {
            if (!enemyBlueprints[c][1]) {
              generatedAllAssets = false;
              generateEnemyAssets(enemyBlueprints[c]);
            }
          }
          if (generatedAllAssets) {
            state = STATE_INTRO;
          }
        }
      }
    }

    function collide(o1, o2) {
      const xs = o1[0] - o1[2] / 2 < o2[0] - o2[2] / 2 ? [o1, o2] : [o2, o1];
      const ys = o1[1] - o1[3] / 2 < o2[1] - o2[3] / 2 ? [o1, o2] : [o2, o1];

      // Do bounding boxes collide
      if (xs[0][0] + xs[0][2] / 2 > xs[1][0] - xs[1][2] / 2 && ys[0][1] + ys[0][3] / 2 > ys[1][1] - ys[1][3] / 2) {
        // Create the collision bounding box
        const cBoundingX = Math.floor(xs[1][0] - xs[1][2] / 2);
        const cBoundingY = Math.floor(ys[1][1] - ys[1][3] / 2);
        const cBoundingWidth = Math.floor(Math.min(xs[0][0] + xs[0][2] / 2, xs[1][0] + xs[1][2] / 2)) - cBoundingX;
        const cBoundingHeight = Math.floor(Math.min(ys[0][1] + ys[0][3] / 2, ys[1][1] + ys[1][3] / 2)) - cBoundingY;

        const o1StartX = cBoundingX - Math.floor(o1[0] - o1[2] / 2);
        const o1StartY = cBoundingY - Math.floor(o1[1] - o1[3] / 2);
        const o2StartX = cBoundingX - Math.floor(o2[0] - o2[2] / 2);
        const o2StartY = cBoundingY - Math.floor(o2[1] - o2[3] / 2);
        for (let c = 0; c < cBoundingHeight; c++) {
          for (let d = 0; d < cBoundingWidth; d++) {
            if (o1[4][((o1StartY + c) * o1[2] + o1StartX + d) * 4 + 3] > 0 &&
              o2[4][((o2StartY + c) * o2[2] + o2StartX + d) * 4 + 3] > 0) {
              //Found common filled pixel!!
              return true;
            }
          }
        }
      }

      return false;
    }

    const powerupDefinitions = [
      [
        "F",
        "orange",
        (time) => {
          fastFire = time + 6500;
        },
      ],
      [
        "S",
        "cyan",
        () => {
          shieldLevel++;
        },
      ],
      [
        "B",
        "red",
        (time) => {
          // Bomb
          bombEffect = time + BOMB_DURATION;
          nextEnemy += 1500;
        },
      ],
    ];

    class Powerup {
      constructor(x, y, typeIndex, time) {
        this.x = x;
        this.y = y;
        this.type = typeIndex;
        this.lastTime = time;
        this.frame = 0;
        this.alwaysOnTop = true;
      }

      run(hitables, ctx, time) {
        this.y += (5 * (time - this.lastTime)) / 32;
        this.frame = (this.frame + 1) % 50;

        const hitBox = [
          this.x,
          this.y,
          powerupCanvas.width,
          powerupCanvas.height,
          powerupMask,
        ];

        // Check powerup against ship
        if (!shipDestroyed && collide(shipHitBox, hitBox)) {
          powerupDefinitions[this.type][2](time);
          return false;
        }

        if (this.y - Math.floor(powerupCanvas.height / 2) > CANVAS_HEIGHT) {
          return false;
        }
        this.lastTime = time;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(
          powerupCanvas,
          -Math.floor(powerupCanvas.width / 2),
          -Math.floor(powerupCanvas.height / 2)
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        let size = 65;
        if (this.frame < 25) {
          size += this.frame;
        } else {
          size += 50 - this.frame;
        }
        ctx.font = "700 " + Math.floor(size / 2) + "px Helvetica";
        const measure = ctx.measureText(powerupDefinitions[this.type][0]);
        const textHeight =
          measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
        ctx.fillStyle = powerupDefinitions[this.type][1];
        ctx.fillText(
          powerupDefinitions[this.type][0],
          0,
          -Math.floor(textHeight / 2)
        );
        ctx.restore();
        return true;
      }
    }

    const BULLET_SPEED = 20;

    class Bullet {
      constructor(x, y, time) {
        this.x = x;
        this.y = y;
        this.lastTime = time;
        this.power = 10;
      }

      run(hitables, ctx, time) {
        this.y -= (BULLET_SPEED * (time - this.lastTime)) / 32;

        const hitBox = [
          this.x,
          this.y,
          bullet.width,
          bullet.height,
          bulletMask,
        ];
        // Check collision with hitables
        for (let c = 0; c < hitables.length; c++) {
          const hitable = hitables[c];
          if (collide(hitBox, hitable.hitBox)) {
            hitable.hit(this.power, time);
            // We're done, get rid of bullet
            return false;
          }
        }

        if (this.y + Math.floor(bullet.height / 2) < 0) {
          return false;
        }
        this.lastTime = time;
        ctx.drawImage(
          bullet,
          this.x - Math.floor(bullet.width / 2),
          this.y - Math.floor(bullet.height / 2)
        );
        return true;
      }
    }

    const ENEMY_EXPLOSION_DURATION = 500;
    const BOSS_EXPLOSION_DURATION = 500;
    const PLAYER_EXPLOSION_DURATION = 1500;

    class Shard {
      constructor(sprite, shipX, shipY, duration, time) {
        this.time = time;
        this.center = sprite.center;
        this.canvas = sprite.canvas;
        this.corner = sprite.corner;
        this.translateX = sprite.translateX;
        this.translateY = sprite.translateY;
        this.angle = sprite.angle;
        this.shipX = shipX;
        this.shipY = shipY;
        this.duration = duration;
      }

      run(hitables, ctx, time) {
        const ellapsed = time - this.time;
        if (ellapsed > this.duration) {
          // Explosion is over
          return false;
        }
        const destX =
          this.shipX +
          this.center[0] +
          (this.translateX * Math.min(ellapsed, this.duration)) / this.duration;
        const destY =
          this.shipY +
          this.center[1] +
          (this.translateY * Math.min(ellapsed, this.duration)) / this.duration;
        ctx.save();
        ctx.globalAlpha =
          1 - (Math.min(ellapsed, this.duration) / this.duration) ** 2;
        ctx.translate(destX, destY);
        ctx.rotate(
          (this.angle * Math.min(ellapsed, this.duration)) / this.duration
        );
        const offsetX = this.corner[0] - this.center[0];
        const offsetY = this.corner[1] - this.center[1];
        ctx.drawImage(this.canvas, offsetX, offsetY);
        ctx.restore();

        return true;
      }
    }

    class EnemyBullet {
      constructor(startX, startY, destinationX, destinationY, speed, time) {
        this.width = enemyBulletFrames[0].width;
        this.height = enemyBulletFrames[0].height;
        this.x = startX;
        this.y = startY;
        const magnitude = Math.sqrt(
          (destinationX - startX) ** 2 + (destinationY - startY) ** 2
        );
        this.xFactor = (destinationX - startX) / magnitude;
        this.yFactor = (destinationY - startY) / magnitude;
        this.lastTime = time;
        this.speed = speed;
        this.frame = 0;
        this.alwaysOnTop = true;
        this.updateHitBox();
      }

      run(hitables, ctx, time) {
        // Destroy bullets if bomb time
        if (bombEffect > time) {
          return false;
        }
        const ellapsed = time - this.lastTime;
        this.y += ellapsed * this.speed * this.yFactor;
        this.x += ellapsed * this.speed * this.xFactor;
        this.updateHitBox();

        // Check collision to ship
        if (collide(shipHitBox, this.hitBox)) {
          if (shieldLevel) {
            shieldLevel--;
            return false;
          }
          shipDestroyed = true;
        }

        // Make it disappear after it leaves the screen
        if (
          this.y - Math.floor(this.height / 2) > CANVAS_HEIGHT ||
          this.y + Math.floor(this.height / 2) < 0 ||
          this.x - Math.floor(this.width / 2) > CANVAS_WIDTH ||
          this.x + Math.floor(this.width / 2) < 0
        ) {
          return false;
        }

        this.lastTime = time;

        this.frame = (this.frame + 1) % enemyBulletFrames.length;
        ctx.drawImage(
          enemyBulletFrames[this.frame],
          this.x - Math.floor(this.width / 2),
          this.y - Math.floor(this.height / 2),
          this.width,
          this.height
        );
        return true;
      }

      updateHitBox() {
        this.hitBox = [
          this.x,
          this.y,
          this.width,
          this.height,
          enemyBulletMask
        ];
      }
    }

    function fireBullets(amount, x, y, initialAngle, speed, time) {
      const bullets = [];
      for (let c = 0; c < amount; c++) {
        const angle = initialAngle + (2 * c * Math.PI) / amount;
        bullets.push(
          new EnemyBullet(
            x,
            y,
            x + Math.round(100 * Math.cos(angle)),
            y + Math.round(100 * Math.sin(angle)),
            speed,
            time
          )
        );
      }
      return bullets;
    }

    class Enemy {
      constructor(
        canvas,
        mask,
        hitCanvas,
        destroyedSprites,
        startX,
        startY,
        speed,
        health,
        points,
        deathBullets,
        fireSequences,
        time
      ) {
        this.fireAngle = enemyRandomizer.sd(0, Math.PI * 2);
        this.canvas = canvas;
        this.mask = mask;
        this.hitCanvas = hitCanvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.health = health;
        this.x = startX;
        this.y = startY;
        this.lastTime = time;
        this.hitTime = 0;
        this.destroyedSprites = destroyedSprites;
        this.speed = speed;
        this.points = points;
        this.deathBullets = deathBullets;
        this.fireSequences = fireSequences;
        this.updateHitBox();
      }

      run(hitables, ctx, time) {
        const originalY = this.y;
        let isDead = false;
        // Destroy enemies if no health or bomb time
        if (this.health <= 0 || bombEffect > time) {
          isDead = true;
        } else {
          const ellapsed = time - this.lastTime;
          this.y += ellapsed * this.speed;
          this.updateHitBox();

          // Check collision to ship
          if (collide(shipHitBox, this.hitBox)) {
            if (shieldLevel) {
              shieldLevel--;
              isDead = true;
            } else {
              shipDestroyed = true;
            }
          }
        }

        if (isDead) {
          // Add score
          addScore(this.points);
          // Return array with pieces
          const returnEntities =
            this.deathBullets > 0
              ? fireBullets(
                this.deathBullets,
                this.x,
                this.y + Math.round(17 * this.speed),
                this.fireAngle,
                0.45,
                time
              )
              : [];

          return returnEntities.concat(
            this.destroyedSprites.map((sprite) => {
              calculateSpriteFinalState(sprite, this.width, this.height);
              return new Shard(
                sprite,
                this.x - Math.floor(this.width / 2),
                this.y - Math.floor(this.height / 2),
                ENEMY_EXPLOSION_DURATION,
                time
              );
            })
          );
        }

        // Make it disappear after it leaves the screen
        if (this.y - Math.floor(this.height / 2) > CANVAS_HEIGHT) {
          return false;
        }

        this.lastTime = time;

        const hitTimeEllapsed = time - this.hitTime;
        let hitTint = 0;
        if (hitTimeEllapsed < 400) {
          hitTint = (400 - hitTimeEllapsed) / 400;
        }
        ctx.save();
        ctx.drawImage(
          this.canvas,
          this.x - Math.floor(this.width / 2),
          this.y - Math.floor(this.height / 2),
          this.width,
          this.height
        );
        if (hitTint > 0) {
          ctx.globalAlpha = hitTint;
          ctx.drawImage(
            this.hitCanvas,
            this.x - Math.floor(this.width / 2),
            this.y - Math.floor(this.height / 2),
            this.width,
            this.height
          );
        }
        ctx.restore();

        if (!shipDestroyed) {
          for (let c = 0; c < this.fireSequences.length; c++) {
            const fireY = this.fireSequences[c][0];
            if (originalY < fireY && this.y > fireY) {
              const bulletAmount = this.fireSequences[c][1];
              const fromY = this.y + Math.round(17 * this.speed);
              if (bulletAmount) {
                // Fire bullet spread, a bit forward as it looks better
                return [
                  this,
                  ...fireBullets(
                    bulletAmount,
                    this.x,
                    fromY,
                    this.fireAngle,
                    0.3,
                    time
                  ),
                ];
              } else {
                // Fire single bullet targeted to the user
                return [this, new EnemyBullet(this.x, fromY, x, y, 0.3, time)];
              }
            }
          }
        }

        return true;
      }

      updateHitBox() {
        this.hitBox = [
          this.x,
          this.y,
          this.width,
          this.height,
          this.mask,
        ];
      }

      hit(power, now) {
        this.hitTime = now;
        this.health -= power;
      }
    }

    const BOSS_WAITING = 0;
    const BOSS_COMING = 1;
    const BOSS_FIGHT = 2;
    const DIRECTION_RIGHT = 0;
    const DIRECTION_LEFT = 1;

    class Boss {
      constructor(level, time) {
        this.state = BOSS_WAITING;
        this.nextState = time + 2000;
        // We want to be basically immortal until we start the fight
        this.health = Number.MAX_SAFE_INTEGER;
        this.lastTime = time;
        this.width = bossShip.width;
        this.height = bossShip.height;
        this.x = HALF_CANVAS_WIDTH;
        this.y = -this.height / 2;
        this.direction = DIRECTION_RIGHT;
        this.hitTime = 0;
        this.level = level;
        this.updateHitBox();
      }

      run(hitables, ctx, time) {
        const originalY = this.y;
        let isDead = false;
        // Destroy enemies if no health or bomb time
        if (this.health <= 0) {
          isDead = true;
        } else {
          const ellapsed = time - this.lastTime;
          if (this.state === BOSS_WAITING) {
            if (time > this.nextState) {
              this.state = BOSS_COMING;
            }
          } else if (this.state === BOSS_COMING) {
            this.y += ellapsed * 0.15;
            if (this.y > 150) {
              this.y = 150;
              // Give it normal health
              this.health = 100 + 250 * this.level;
              this.state = BOSS_FIGHT;
              this.nextBullet = time;
              this.bulletCount = 0;
            }
          } else {
            // Update X
            if (this.direction === DIRECTION_RIGHT) {
              this.x += ellapsed * 0.1;
              if (this.x + Math.floor(this.width / 2) > CANVAS_WIDTH) {
                this.x = CANVAS_WIDTH - Math.floor(this.width / 2);
                this.direction = DIRECTION_LEFT;
              }
            } else {
              this.x -= ellapsed * 0.1;
              if (this.x - Math.floor(this.width / 2) < 0) {
                this.x = Math.floor(this.width / 2);
                this.direction = DIRECTION_RIGHT;
              }
            }
          }

          this.updateHitBox();

          // Check collision to ship
          if (collide(shipHitBox, this.hitBox)) {
            shipDestroyed = true;
          }
        }

        if (isDead) {
          addScore(difficulty * 500);

          // Restore game!
          bossTime = false;
          nextDifficulty = time + 10000;
          nextEnemy = BOSS_EXPLOSION_DURATION + time;
          updateNextEnemy();
          nextPowerup = BOSS_EXPLOSION_DURATION + time;

          return destroyedBossSprites.map((sprite) => {
            calculateSpriteFinalState(sprite, this.width, this.height);
            return new Shard(
              sprite,
              this.x - Math.floor(this.width / 2),
              this.y - Math.floor(this.height / 2),
              BOSS_EXPLOSION_DURATION,
              time
            );
          });
        }

        this.lastTime = time;

        const hitTimeEllapsed = time - this.hitTime;
        let hitTint = 0;
        if (hitTimeEllapsed < 400) {
          hitTint = (400 - hitTimeEllapsed) / 400;
        }
        ctx.save();
        ctx.drawImage(
          bossShip,
          this.x - Math.floor(this.width / 2),
          this.y - Math.floor(this.height / 2),
          this.width,
          this.height
        );
        if (hitTint > 0) {
          ctx.globalAlpha = hitTint;
          ctx.drawImage(
            bossHit,
            this.x - Math.floor(this.width / 2),
            this.y - Math.floor(this.height / 2),
            this.width,
            this.height
          );
        }
        ctx.restore();

        if (!shipDestroyed && this.state === BOSS_FIGHT) {
          // Fire bullets if needed
          if (this.nextBullet < time) {
            const bullets = [];
            if (this.bulletCount < 5 * this.level) {
              let offsetX, offsetY;
              switch (Math.floor(this.bulletCount / this.level)) {
                case 0:
                  offsetX = 28;
                  offsetY = 119;
                  break;
                case 1:
                  offsetX = 42;
                  offsetY = 123;
                  break;
                case 2:
                  offsetX = 108;
                  offsetY = 94;
                  break;
                case 3:
                  offsetX = 121;
                  offsetY = 80;
                  break;
                default:
                  offsetX = 143;
                  offsetY = 50;
                  break;
              }
              // Side bullets
              bullets.push(
                new EnemyBullet(
                  this.x - offsetX,
                  this.y + offsetY,
                  this.x - offsetX,
                  this.y + offsetY + 100,
                  0.5,
                  time
                )
              );
              bullets.push(
                new EnemyBullet(
                  this.x + offsetX,
                  this.y + offsetY,
                  this.x + offsetX,
                  this.y + offsetY + 100,
                  0.5,
                  time
                )
              );
            } else {
              // Targeted bullets
              bullets.push(new EnemyBullet(this.x, this.y + 125, x, y, 0.3, time));
            }
            this.bulletCount++;
            if (this.bulletCount >= 10 * this.level) {
              this.bulletCount = 0;
              this.nextBullet = time + 800;
            } else if (this.bulletCount > 5 * this.level) {
              this.nextBullet = time + 200;
            } else if (this.bulletCount === 5 * this.level) {
              this.nextBullet = time + 800;
            } else {
              // this.bulletCount < 5 * this.level
              if (this.bulletCount % this.level) {
                this.nextBullet = time + 180;
              } else {
                this.nextBullet = time + 500;
              }
            }
            return [this, ...bullets];
          }
        }

        return true;
      }

      updateHitBox() {
        this.hitBox = [
          this.x,
          this.y,
          this.width,
          this.height,
          bossMask,
        ];
      }

      hit(power, now) {
        this.hitTime = now;
        this.health -= power;
      }
    }

    let entities;
    let hitables;
    let lastBullet;
    let bulletOffset = 5;

    let enemyRandomizer;
    let powerupRandomizer;
    let nextEnemy;
    let nextDifficulty;
    let nextPowerup;
    let powerupIndex;
    let bossTime;

    const POWERUP_INTERVAL = 9000;

    let lastTime;
    function gameRender(now) {
      const ellapsed = now - lastTime;
      lastTime = now;
      if (ellapsed > 160) {
        // First frame or detecting a pause
        initialTime += ellapsed;
        // We don't want the controls to get stuck
        keysPressed = [];
        return;
      }

      if (!shipDestroyed) {
        // Check pressed keys
        const toTravel = SHIP_SPEED * ellapsed,
          keyUp = keysPressed['ArrowUp'] || keysPressed['KeyW'],
          keyDown = keysPressed['ArrowDown'] || keysPressed['KeyS'],
          keyLeft = keysPressed['ArrowLeft'] || keysPressed['KeyA'],
          keyRight = keysPressed['ArrowRight'] || keysPressed['KeyD'];

        if (keyUp || keyDown || keyLeft || keyRight) {
          const distance = (keyUp || keyDown) && (keyLeft || keyRight) ? Math.sqrt((toTravel ** 2) / 2) : toTravel;
          if (keyUp) {
            y -= distance;
          }
          if (keyDown) {
            y += distance;
          }
          if (keyLeft) {
            x -= distance;
          }
          if (keyRight) {
            x += distance;
          }
          // We don't want to move to the pointer position unless it's updated
          move_x = x;
          move_y = y;
        } else {
          // Move ship with pointer
          let vx = move_x - x,
            vy = move_y - y;
          const magnitude = Math.sqrt(vx ** 2 + vy ** 2);

          if (magnitude < toTravel) {
            x = move_x;
            y = move_y;
          } else {
            x += vx / magnitude * toTravel;
            y += vy / magnitude * toTravel;
          }
        }
        if (x - Math.floor(shipWidth / 2) < 0) {
          x = Math.floor(shipWidth / 2);
        } else if (x + Math.floor(shipWidth / 2) > CANVAS_WIDTH) {
          x = CANVAS_WIDTH - Math.floor(shipWidth / 2);
        }
        if (y - Math.floor(shipHeight / 2) < 0) {
          y = Math.floor(shipHeight / 2);
        } else if (y + Math.floor(shipHeight / 2) > CANVAS_HEIGHT) {
          y = CANVAS_HEIGHT - Math.floor(shipHeight / 2);
        }
        shipHitBox = [
          x,
          y,
          shipWidth,
          shipHeight,
          shipMask
        ];
      }

      // Reset canvas
      const ctx = a.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Paint background stars
      let s;
      ctx.fillStyle = "#777";

      for (
        let i = 100;
        i--;
        ctx.beginPath(),
        ctx.arc(
          Math.floor(
            ((100 - i) * (CANVAS_WIDTH - STARS_WIDTH) * (x - shipWidth / 2)) /
            (100 * (CANVAS_WIDTH - shipWidth))
          ) +
          ((102797 *
            Math.floor(STARS_WIDTH / 2) *
            (1 + Math.sin(s * STARS_WIDTH))) %
            STARS_WIDTH),
          (CANVAS_HEIGHT * (Math.tan(i / 9) + (s * (now - initialTime)) / 3000)) %
          CANVAS_HEIGHT,
          s * 2,
          0,
          7
        ),
        ctx.fill()
      )
        s = 149 / (i * 3 + 199);

      const previousShipDestroyed = shipDestroyed;

      // Run entities
      const nextEntities = [],
        alwaysOnTop = [],
        nextHitables = [];
      function runEntity(entity) {
        const result = entity.run(hitables, ctx, now - initialTime);
        if (typeof result === "boolean") {
          if (result) {
            if (entity.alwaysOnTop) {
              alwaysOnTop.push(entity);
            } else {
              nextEntities.push(entity);
            }
            if (entity.hit) {
              nextHitables.push(entity);
            }
          }
        } else if (Array.isArray(result)) {
          result.forEach((subEntity) => {
            if (entity === subEntity) {
              // The original wants to be persisted, don't rerun it
              if (result) {
                if (entity.alwaysOnTop) {
                  alwaysOnTop.push(entity);
                } else {
                  nextEntities.push(entity);
                }
                if (entity.hit) {
                  nextHitables.push(entity);
                }
              }
            } else {
              // New subentity, run it
              runEntity(subEntity);
            }
          });
        }
      }
      entities.forEach(runEntity);

      if (!previousShipDestroyed && shipDestroyed) {
        // Record time
        gameOverTime = now - initialTime;
        // add shards
        destroyedShipSprites
          .map((sprite) => {
            calculateSpriteFinalState(sprite, shipWidth, shipHeight);
            return new Shard(
              sprite,
              x - Math.floor(shipWidth / 2),
              y - Math.floor(shipHeight / 2),
              PLAYER_EXPLOSION_DURATION,
              now - initialTime
            );
          })
          .forEach(runEntity);
      }

      entities = nextEntities.concat(alwaysOnTop);
      hitables = nextHitables;

      // Common styles
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";

      if (!shipDestroyed) {
        if (shieldLevel) {
          const shieldCanvas =
            shields[Math.min(shieldLevel - 1, shields.length - 1)];
          // Paint shield
          ctx.drawImage(
            shieldCanvas,
            x - Math.floor(shieldCanvas.width / 2),
            y - Math.floor(shieldCanvas.height / 2) + 5
          );
        }
        // Paint ship
        ctx.drawImage(
          ship,
          x - Math.floor(shipWidth / 2),
          y - Math.floor(shipHeight / 2)
        );
      } else {
        // Paint game over
        ctx.save();
        ctx.globalAlpha = Math.min(1, (now - initialTime - gameOverTime) / 2000);
        ctx.textBaseline = "middle";
        ctx.font = "40px Helvetica";
        ctx.fillText("Game Over", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

        ctx.restore();
      }

      // Paint bomb
      if (bombEffect > now - initialTime) {
        ctx.save();
        ctx.globalAlpha = (bombEffect - now + initialTime) / BOMB_DURATION;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
      }

      // Paint HUD
      ctx.textBaseline = "top";
      ctx.font = "16px Helvetica";
      ctx.fillText(scoreText, HALF_CANVAS_WIDTH, 5);

      const isFastFire = fastFire > now - initialTime;
      // Should we fire?
      if (
        !shipDestroyed &&
        lastBullet + (isFastFire ? 100 : 200) < now - initialTime
      ) {
        bulletOffset = -bulletOffset;
        entities.push(
          new Bullet(
            x + (isFastFire ? bulletOffset : 0),
            y - Math.floor(shipHeight / 2),
            now - initialTime
          )
        );
        lastBullet = Math.max(now - initialTime);
      }
      if (nextDifficulty < now - initialTime && !bossTime) {
        increaseDifficulty();
        if (difficulty % 5) {
          nextDifficulty = now - initialTime + 10000;
        } else {
          bossTime = true;
          entities.push(new Boss(Math.floor(difficulty / 5), now - initialTime));
        }
      }

      // Should we spawn powerup
      if (nextPowerup < now - initialTime && !bossTime) {
        entities.push(
          new Powerup(
            powerupRandomizer.si(30, CANVAS_WIDTH - 30),
            Math.floor(-powerupCanvas.height / 2),
            powerupIndex,
            now - initialTime
          )
        );
        powerupIndex = (powerupIndex + 1) % powerupDefinitions.length;
        nextPowerup = now - initialTime + POWERUP_INTERVAL;
      }

      // Should we spawn enemy
      if (nextEnemy < now - initialTime && !bossTime) {
        const enemyDifficulty = enemyRandomizer.si(
          Math.min(Math.max(difficulty - 2, 0), enemyBlueprints.length - 3),
          Math.min(difficulty, enemyBlueprints.length - 1)
        );

        const [
          enemyShip,
          enemyMask,
          hitEnemyShip,
          destroyedEnemyShipSprites,
          health,
          speed,
          deathBullets,
          fireSequences,
        ] = enemyBlueprints[enemyDifficulty];
        entities.push(
          new Enemy(
            enemyShip,
            enemyMask,
            hitEnemyShip,
            destroyedEnemyShipSprites,
            enemyRandomizer.si(30, CANVAS_WIDTH - 30),
            Math.floor(-enemyShip.height / 2),
            speed,
            health,
            (enemyDifficulty + 1) * 50,
            deathBullets,
            fireSequences,
            now - initialTime
          )
        );
        updateNextEnemy();
      }

      if (shipDestroyed && gameOverTime + 3500 < now - initialTime) {
        // Update highscores if needed
        updateHighscores();

        state = STATE_INTRO;
        introInhibitPress = pointer_down;
      }
    }

    onload = (e) => {
      a.width = CANVAS_WIDTH;
      a.height = CANVAS_HEIGHT;
      let c = a.getContext("2d");
      function renderWrapper(now) {
        render(now);
        requestAnimationFrame(renderWrapper);
      }
      requestAnimationFrame(renderWrapper);
    };

    /* Compute mouse / touch coordinates on the canvas */

    let update_mouse = (e) => {
      let offsetLeft, offsetTop, offsetWidth, offsetHeight;
      if (a.offsetWidth / a.offsetHeight > CANVAS_WIDTH / CANVAS_HEIGHT) {
        // Wider
        offsetTop = 0;
        offsetHeight = a.offsetHeight;
        offsetWidth = offsetHeight * CANVAS_WIDTH / CANVAS_HEIGHT;
        offsetLeft = Math.floor(a.offsetWidth - offsetWidth) / 2;
      } else {
        // Narrower
        offsetLeft = 0;
        offsetWidth = a.offsetWidth;
        offsetHeight = offsetWidth * CANVAS_HEIGHT / CANVAS_WIDTH;
        offsetTop = Math.floor(a.offsetHeight - offsetHeight) / 2;
      }
      let pointer = {};
      if (e.changedTouches) {
        pointer = e.changedTouches[0];
      } else {
        pointer = e;
      }
      return [
        Math.floor(((pointer.pageX - offsetLeft) * CANVAS_WIDTH) / offsetWidth),
        Math.floor(((pointer.pageY - offsetTop) * CANVAS_HEIGHT) / offsetHeight),
      ];
    };

    /* Click */
    onclick = (e) => {
      e.preventDefault();
      [click_x, click_y] = update_mouse(e);
    };

    /* Down */
    self.ontouchstart = self.onpointerdown = (e) => {
      e.preventDefault();
      pointer_down = true;
      [down_x, down_y] = update_mouse(e);
      move_x = down_x;
      move_y = down_y;
    };

    /* Move */
    self.ontouchmove = self.onpointermove = (e) => {
      e.preventDefault();
      [move_x, move_y] = update_mouse(e);
    };

    /* Up */
    self.ontouchend = self.onpointerup = (e) => {
      e.preventDefault();
      pointer_down = false;
      [up_x, up_y] = update_mouse(e);

      /* Add click on mobile */
      if (e.changedTouches) {
        onclick();
      }
    };

    onkeydown = (e) => {
      any_key_pressed = true;
      keysPressed[e.code] = 1;
      e.preventDefault();
    };

    onkeyup = (e) => {
      keysPressed[e.code] = 0;
      e.preventDefault();
    };

}());
