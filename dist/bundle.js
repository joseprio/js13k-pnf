class t{constructor(t){this.t=0,this.o=0,this.h={},this.seed=t,8>this.seed.length&&(this.seed="padding_"+this.seed),this.seed.length%2==0&&(this.seed="1"+this.seed),this.i=[2972948403,3086140710,2071788248,3026137486,1411764137,2265725585,2923087685,1593177610],this.M=3234042090;for(let t=this.seed.length-1;t>=0;t--){const n=this.seed.charCodeAt(t);this.M=((this.M<<5)+this.M^n^this.M<<n%13+1^this.M>>n%17+1)>>>0,this.i[t%8]^=((this.M>>9)*(this.M%16384+3427)^n)>>>0}}l(){const t=this.seed.charCodeAt(this.t),n=this.i[this.o];return this.M=((this.M<<5)+this.M+n^t^this.M<<t%17+1^this.M>>t%13+1)>>>0,this.i[this.o]=(n>>3^n<<t%19+1^this.M%134217728*3427)>>>0,this.t=(this.t+1)%this.seed.length,this.o=(this.o+1)%8,this.M}u(t){const n=[1160605769,1424711319,876532818,1419174464];let o=1206170165;if(t||(t="?/?/?/",o=3379896793),this.h[t])return this.h[t];for(let e=t.length-1;e>=0;e--){const s=t.charCodeAt(e);let c=n[0]^s;c=(c^c<<11)>>>0,c=(c^c>>8)>>>0,n[0]=n[1],n[1]=n[2],n[2]=n[3],n[3]=(n[3]^n[3]>>19^c)>>>0,o=3427*(o^s<<24)^n[3]}for(let t=this.seed.length-1;t>=0;t--){const e=this.seed.charCodeAt(t);let s=n[0]^e;s=(s^s<<11)>>>0,s=(s^s>>8)>>>0,n[0]=n[1],n[1]=n[2],n[2]=n[3],n[3]=(n[3]^n[3]>>19^s)>>>0,o=3427*(o^e<<24)^n[3]}return this.h[t]=o>>>0,this.h[t]}m(t,n){return(4294967296*this.l()+this.l())/0x10000000000000000*(n-t)+t}p(t,n){return Math.floor(this.m(t,n+1))}v(t){return this.m(0,1)<t}g(t,n,o){return(4294967296*this.u(o)+this.u(o+"@"))/0x10000000000000000*(n-t)+t}H(t,n,o){return Math.floor(this.g(t,n+1,o))}k(t,n){return this.g(0,1,n)<t}S(t){return this.v(t)?-1:1}q(t,n){let o=0;for(;this.v(t)&&n>o;)o++;return o}D(t,n,o){let e=0;for(;(4294967296*this.u(o+e)+this.u(o+"@"+e))/0x10000000000000000<t&&n>e;)e++;return e}K(t){let n=0;for(let o=0;t.length>o;o++)n+=t[o];let o=this.m(0,n);for(let n=0;t.length>n;n++)if(o-=t[n],0>o)return n;return 0}O(t,n){let o=0;for(let n=0;t.length>n;n++)o+=t[n];let e=this.g(0,o,n);for(let n=0;t.length>n;n++)if(e-=t[n],0>e)return n;return 0}}function n(t,n,o){return Math.max(n,Math.min(o,t))}function o(t,n){return`rgb(${t.map(t=>t*n*100).join("%,")}%)`}function e(t,n,o){const e=(e,s=(e+6*t)%6)=>o-o*n*Math.max(Math.min(s,4-s,1),0);return[e(5),e(3),e(1)]}function s(s,c,a){return((s,c,a)=>{const h=(t=>{const n=[];return n[0]=.8*t.m(.001,1)*2**t.m(0,8),n[1]=.9*t.m(.01,1)*2**t.m(0,8),n[2]=1*t.m(.001,1)*2**t.m(0,8),n[3]=3*t.m(0,1)*2**t.m(0,8),n[4]=.5*t.m(0,1)*2**t.m(0,8),n[5]=.05*t.m(0,1)*2**t.m(0,8),n[6]=.5*t.m(0,1)*2**t.m(0,8),n})(s),r=[],i=[],f=1+(s.k(.7,"base color +1")?1:0)+s.D(.3,3,"base color count");for(let t=0;f>t;t++){const o="base color"+t;r.push(e(s.g(0,1,o+"hue")**2,n(s.g(-.2,1,o+"saturation"),0,s.g(0,1,o+"saturation bound")**4),n(s.g(.7,1.1,o+"value"),0,1))),i.push(2**s.g(0,6,o+"chances"))}const M=new t(s.seed+c);function l(){let t=r[M.K(i)];return M.v(s.g(0,.5,"base color shift chance")**2)&&(t=[t[0],t[1],t[2]],t[0]=n(t[0]+s.g(0,.6,"base color shift range red")**2*n(M.m(-1,1.2),0,1)*n(M.S(.7)+M.S(.7),-1,1),0,1),t[1]=n(t[1]+s.g(0,.6,"base color shift range green")**2*n(M.m(-1,1.2),0,1)*n(M.S(.7)+M.S(.7),-1,1),0,1),t[2]=n(t[2]+s.g(0,.6,"base color shift range blue")**2*n(M.m(-1,1.2),0,1)*n(M.S(.7)+M.S(.7),-1,1),0,1)),t}a=a||M.m(s.g(2.5,3.5,"size min"),s.g(5,7,"size max"))**3;const u=M.m(s.g(.5,1,"wratio min"),s.g(1,1.3,"wratio max")),d=M.m(s.g(.7,1,"hratio min"),s.g(1.1,1.7,"hratio max")),m=Math.floor(a*u),b=Math.floor(m/2),p=Math.floor(m/6),v=(m-6*p)/2,g=Math.floor(a*d),w=Math.floor(g/2),x=Math.floor(g/6),y=(g-6*x)/2,H=document.createElement("canvas");H.width=m,H.height=g;const k=H.getContext("2d"),S=m*g/20;[()=>{const t=Math.ceil(m*s.g(.1,1,"outline0 iw")/5),o=[[[b-t,0],[b+t,g]]],e=2+Math.floor(M.m(.5,1)*s.g(2,8,"outline0 bc")*a**.5);for(let t=1;e>t;t++){const t=o[M.p(0,o.length-1)],e=[t[0][0]+M.m(0,1)*(t[1][0]-t[0][0]),t[0][1]+M.m(0,1)*(t[1][1]-t[0][1])];(t[0][1]+t[1][1])/2>e[1]&&M.v(s.g(.5,1.5,"outline0 frontbias"))&&(e[1]=t[1][1]-(e[1]-t[0][1]));const c=[n(M.m(0,1)*m,0,m),n(M.m(0,1)*g,0,g)],a=S/Math.abs((c[0]-e[0])*(c[1]-e[1]));if(1>a&&(c[0]=e[0]+(c[0]-e[0])*a,c[1]=e[1]+(c[1]-e[1])*a),e[0]>c[0]){const t=e[0];e[0]=c[0],c[0]=t}if(e[1]>c[1]){const t=e[1];e[1]=c[1],c[1]=t}o.push([[Math.floor(e[0]),Math.floor(e[1])],[Math.ceil(c[0]),Math.ceil(c[1])]])}k.fillStyle="#fff";for(let t=0;o.length>t;t++){const n=o[t];k.fillRect(n[0][0],n[0][1],n[1][0]-n[0][0],n[1][1]-n[0][1]),k.fillRect(m-n[1][0],n[0][1],n[1][0]-n[0][0],n[1][1]-n[0][1])}},()=>{const t=Math.max(2,(S/Math.PI)**.5),n=Math.ceil(m*s.g(.1,1,"outline1 iw")/5),o=[],e=Math.floor(g/(2*n));for(let t=0;e>t;t++)o.push({B:[b,g-n*(2*t+1)],r:n});const c=e+Math.floor(M.m(.5,1)*s.g(10,50,"outline1 cc")*a**.5);for(let n=e;c>n;n++){const n=o[Math.max(M.p(0,o.length-1),M.p(0,o.length-1))];let e=M.m(1,t);const c=M.m(Math.max(0,n.r-e),n.r);let a=M.m(0,2*Math.PI);a>Math.PI&&M.v(s.g(.5,1.5,"outline1 frontbias"))&&(a=M.m(0,Math.PI));let h=[n.B[0]+Math.cos(a)*c,n.B[1]+Math.sin(a)*c];e=Math.min(e,h[0],m-h[0],h[1],g-h[1]),o.push({B:h,r:e})}k.fillStyle="#fff";for(let t=0;o.length>t;t++){const n=o[t];k.beginPath(),k.arc(n.B[0],n.B[1],n.r,0,7),k.fill(),k.beginPath(),k.arc(m-n.B[0],n.B[1],n.r,0,7),k.fill()}},()=>{const t=[[b,M.m(0,.05)*g],[b,M.m(.95,1)*g]],n=6/a+s.g(.03,.1,"outline2 basefatness"),o=Math.max(3,Math.ceil(M.m(.05,.1)/n*a**.5));k.lineCap=["round","square"][s.H(0,1,"outline2 linecap")],k.strokeStyle="#fff";for(let e=1;o>e;e++){let o=t[e];o||(o=[M.m(0,1)*m,M.m(0,1)**s.g(.1,1,"outline2 frontbias")*g],t.push(o));const c=1+M.q(s.g(0,1,"outline2 conadjust"),3);for(let e=0;c>e;e++){const e=t[M.p(0,t.length-2)];k.lineWidth=M.m(.7,1)*n*a,k.beginPath(),k.moveTo(e[0],e[1]),k.lineTo(o[0],o[1]),k.stroke(),k.beginPath(),k.moveTo(m-e[0],e[1]),k.lineTo(m-o[0],o[1]),k.stroke()}}}][s.O([1,1,1],"outline type")]();const q=k.getImageData(0,0,m,g);function D(t,n){return q.data[4*(n*m+t)+3]}const K=[];for(let t=0;p>t;t++){K[t]=[];for(let n=0;x>n;n++)K[t][n]={C:t,I:n,x:Math.floor(v+6*(t+.5)),y:Math.floor(y+6*(n+.5))}}const O=[K[Math.floor(p/2)][Math.floor(x/2)]];let B=0;for(;O.length>B;){const t=O[B];if(t.C>0){const n=K[t.C-1][t.I];n.j||(D(n.x,n.y)?(n.j=1,O.push(n)):n.j=2)}if(p-1>t.C){const n=K[t.C+1][t.I];n.j||(D(n.x,n.y)?(n.j=1,O.push(n)):n.j=2)}if(t.I>0){const n=K[t.C][t.I-1];n.j||(D(n.x,n.y)?(n.j=1,O.push(n)):n.j=2)}if(x-1>t.I){const n=K[t.C][t.I+1];n.j||(D(n.x,n.y)?(n.j=1,O.push(n)):n.j=2)}B++}for(let t=0;O.length>t;t++){const n=O[t],o=K[p-1-n.C][n.I];1!=o.j&&(o.j=1,O.push(o))}const C=s.H(1,2,"base component passes"),I=Math.max(1,Math.floor(O.length*s.g(0,1/C,"extra component amount"))),Q=C*O.length+I;function j(t,n){const o=Math.floor((t-v)/6),e=Math.floor((n-y)/6);return 0>o||o>=p||0>e||e>=x?0:1==K[o][e].j}function F(t){return 1-t[1]/g}function N(t,n){let o=Math.min(1,1-Math.abs(t[0]-b)/b);return n&&(o=Math.min(o,1-Math.abs(t[1]-w)/w)),o}function A(t,n,o,e,c,a,h){const r=(N(n,1)*(1-1/((m+g)/1e3+1))*s.g(0,1,"master bigness")**.5*(1-P/Q))**o;let i=8;if(M.v(s.g(e,c,`com${t} bigchance`)*r)){const o=s.g(a,h,`com${t} bigincchance`);for(;M.v(o*r)&&Math.min(n[0]-i,m-n[0]-i,n[1]-i,g-n[1]-i)>i/2;)i*=1.5}return i}function G(t,n,o){const e=k.createLinearGradient(n[0],n[1],2*t[0]-n[0],2*t[1]-n[1]),s=`rgba(0,0,0,${o})`;return e.addColorStop(0,s),e.addColorStop(.5,"rgba(0,0,0,0)"),e.addColorStop(1,s),e}H.width|=0;const U=[t=>{const e=A(0,t,.3,0,.9,0,.5),s=2*e,c=[Math.ceil(M.m(1,Math.max(2,e/2))),Math.ceil(M.m(1,Math.max(2,e/2)))],a=Math.min(c[0],c[1])*M.m(.1,1.2),h=[c[0]+2*a,c[1]+2*a],r=[Math.ceil(s/h[0]),Math.ceil(s/h[1])],i=[Math.round(r[0]*h[0]/2),Math.round(r[1]*h[1]/2)],f=l(),u=o(f,M.m(.4,1)),d=o(f,M.m(.4,1));k.fillStyle=`rgba(0,0,0,${M.m(0,.25)})`,k.fillRect(t[0]-i[0]-1,t[1]-i[1]-1,h[0]*r[0]+2,h[1]*r[1]+2),k.fillStyle=d,k.fillRect(t[0]-i[0],t[1]-i[1],h[0]*r[0],h[1]*r[1]),k.fillStyle=u;for(let n=0;r[0]>n;n++){const o=t[0]+a+n*h[0]-i[0];for(let n=0;r[1]>n;n++)k.fillRect(o,t[1]+a+n*h[1]-i[1],c[0],c[1])}M.v(n(e/8*(.6*P/Q+.3),0,.98))&&(k.fillStyle=G(t,[t[0]+i[0],t[1]],M.m(0,.9)),k.fillRect(t[0]-i[0],t[1]-i[1],h[0]*r[0],h[1]*r[1]))},t=>{const e=A(1,t,.2,.3,1,0,.6);let c=Math.ceil(M.m(.8,2)*e);const a=Math.ceil(M.m(.8,2)*e),h=M.p(3,Math.max(4,c)),r=Math.max(1,Math.round(c/h));c=r*h;const i=o(l(),M.m(.5,1)),f=M.m(.3,.9);if(M.v(n(s.g(-.2,1.2,"com1 hchance"),0,1))){const n=[t[0]-Math.floor(c/2),t[1]-Math.floor(a/2)];k.fillStyle=`rgba(0,0,0,${M.m(0,.25)})`,k.fillRect(n[0]-1,n[1]-1,c+2,a+2),k.fillStyle=i,k.fillRect(n[0],n[1],c,a);for(let o=0;r>o;o++)k.fillStyle=G([n[0]+(o+.5)*h,t[1]],[n[0]+o*h,t[1]],f),k.fillRect(n[0]+o*h,n[1],h,a)}else{const n=[t[0]-Math.floor(a/2),t[1]-Math.floor(c/2)];k.fillStyle=`rgba(0,0,0,${M.m(0,.25)})`,k.fillRect(n[0]-1,n[1]-1,a+2,c+2),k.fillStyle=i,k.fillRect(n[0],n[1],a,c);for(let o=0;r>o;o++)k.fillStyle=G([t[0],n[1]+(o+.5)*h],[t[0],n[1]+o*h],f),k.fillRect(n[0],n[1]+o*h,c,h)}},t=>{const e=A(2,t,.05,0,1,0,.9),c=Math.ceil(M.m(.6,1.4)*e),a=Math.ceil(M.m(1,2)*e),h=[Math.ceil(n(c*M.m(.7,1)/2,1,c)),Math.ceil(n(c*M.m(.8,1)/2,1,c))],r=[Math.floor(n(c*M.m(.05,.25),1,a)),Math.floor(n(c*M.m(.1,.3),1,a))],i=r[0]+r[1],f=M.v(s.g(0,1,"com2 oddchance")**.5),u=n(Math.floor(a/i),1,a),d=u*i+(f?r[0]:0),m=l(),b=M.m(.6,1),p=M.m(.6,1),v=[o(m,b),o(m,p)],g=1-M.m(.5,.95),w=[o(m,g*b),o(m,g*p)];if(M.v(s.g(0,1,"com2 verticalchance")**.1)){const n=k.createLinearGradient(t[0]-h[0],t[1],t[0]+h[0],t[1]),o=k.createLinearGradient(t[0]-h[1],t[1],t[0]+h[1],t[1]),e=Math.floor(t[1]-d/2);n.addColorStop(0,w[0]),n.addColorStop(.5,v[0]),n.addColorStop(1,w[0]),o.addColorStop(0,w[1]),o.addColorStop(.5,v[1]),o.addColorStop(1,w[1]);for(let s=0;u>s;s++)k.fillStyle=n,k.fillRect(t[0]-h[0],e+s*i,2*h[0],r[0]),k.fillStyle=o,k.fillRect(t[0]-h[1],e+s*i+r[0],2*h[1],r[1]);f&&(k.fillStyle=n,k.fillRect(t[0]-h[0],e+u*i,2*h[0],r[0]))}else{const n=k.createLinearGradient(t[0],t[1]-h[0],t[0],t[1]+h[0]),o=k.createLinearGradient(t[0],t[1]-h[1],t[0],t[1]+h[1]),e=Math.floor(t[0]-d/2);n.addColorStop(0,w[0]),n.addColorStop(.5,v[0]),n.addColorStop(1,w[0]),o.addColorStop(0,w[1]),o.addColorStop(.5,v[1]),o.addColorStop(1,w[1]);for(let s=0;u>s;s++)k.fillStyle=n,k.fillRect(e+s*i,t[1]-h[0],r[0],2*h[0]),k.fillStyle=o,k.fillRect(e+s*i+r[0],t[1]-h[1],r[1],2*h[1]);f&&(k.fillStyle=n,k.fillRect(e+u*i,t[1]-h[0],r[0],2*h[0]))}},t=>{if(M.v(F(t)-.3)||j(t[0],t[1]+6*1.2)||j(t[0],t[1]+10.8))for(let n=0;100>n;n++){const n=M.K(h);if(3!=n)return void U[n](t)}const n=A(3,t,.1,.6,1,.3,.8),e=M.m(1,2)*n;let c=Math.ceil(M.m(.3,1)*n);const a=e*M.m(.25,.6),f=(e+a)/2/2,l=[Math.max(1,Math.ceil(c*M.m(.08,.25))),Math.max(1,Math.ceil(c*M.m(.03,.15)))],u=l[0]+l[1],d=Math.ceil(c/u);c=d*u+l[0];const m=r[s.O(i,"com3 basecolor")],b=s.g(.5,.8,"com3 lightness0 mid"),p=b-s.g(.2,.4,"com3 lightness0 edge"),v=s.g(0,.2,"com3 lightness1 edge"),g=[k.createLinearGradient(t[0]-f,t[1],t[0]+f,t[1]),k.createLinearGradient(t[0]-f,t[1],t[0]+f,t[1])],w=Math.ceil(t[1]-c/2),x=[w+l[0],w+u];g[0].addColorStop(0,o(m,p)),g[0].addColorStop(.5,o(m,b)),g[0].addColorStop(1,o(m,p)),g[1].addColorStop(0,o(m,v)),g[1].addColorStop(.5,o(m,1)),g[1].addColorStop(1,o(m,v)),k.fillStyle=g[0],k.beginPath(),k.moveTo(t[0]-a/2,w),k.lineTo(t[0]+a/2,w),k.lineTo(t[0]+e/2,w+c),k.lineTo(t[0]-e/2,w+c),k.fill(),k.fillStyle=g[1];for(let n=0;d>n;n++){const o=[n*u+l[0],(n+1)*u],s=[x[0]+n*u,x[1]+n*u],h=[(a+o[0]/c*(e-a))/2,(a+o[1]/c*(e-a))/2];k.beginPath(),k.moveTo(t[0]-h[0],s[0]),k.lineTo(t[0]+h[0],s[0]),k.lineTo(t[0]+h[1],s[1]),k.lineTo(t[0]-h[1],s[1]),k.fill()}},t=>{const n=N(t,0),e=M.m(.7,1),c=M.m(0,.2),h=l(),r=o(h,e),i=o(h,c),f=Math.max(3,Math.ceil(a*M.m(.4,1)**2*s.g(.02,.1,"com4 maxwidth"))),u=Math.floor(f/2),d=f%2,m=s.g(0,1,"com4 directionc0")**4,p=.1*s.g(0,1,"com4 directionc1")**4,v=.2*s.g(0,1,"com4 directionc2")**4,w=M.K([m*(2-n),p,v*(1+n)]);let x;if(w)if(2>w){const n=Math.min(Math.max(8,g-t[1]-M.p(0,16)),Math.floor(.6*a*M.m(0,1)**s.g(2,7,"com4 hpower1"))),o=t[0]-u,e=t[1],c=k.createLinearGradient(o,e,t[0]+u+d,e);c.addColorStop(0,i),c.addColorStop(.5,r),c.addColorStop(1,i),k.fillStyle=c,k.fillRect(o,e,f,n),x=[t[0],t[1]+n]}else{const n=k.createLinearGradient(t[0],t[1]-u,t[0],t[1]+u+d);n.addColorStop(0,i),n.addColorStop(.5,r),n.addColorStop(1,i),k.fillStyle=n,k.fillRect(t[0],t[1]-u,Math.ceil(b-t[0])+1,f),x=[b,t[1]]}else{const n=Math.min(Math.max(8,t[1]-M.p(0,16)),Math.floor(.7*a*M.m(0,1)**s.g(2,6,"com4 hpower0"))),o=t[0]-u,e=t[1]-n,c=k.createLinearGradient(o,e,t[0]+u+d,e);c.addColorStop(0,i),c.addColorStop(.5,r),c.addColorStop(1,i),k.fillStyle=c,k.fillRect(o,e,f,n),x=[t[0],t[1]-n]}const y=[.6*s.g(0,1,"com4 covercomc0")**2,.2*s.g(0,1,"com4 covercomc1")**2,s.g(0,1,"com4 covercomc2")**2];if(U[M.K(y)](t),j(x[0],x[1])){const t=[x[0]+Math.round(6*M.m(-1,1)),x[1]+Math.round(6*M.m(-1,1))];U[M.K(y)](j(t[0],t[1])?t:x)}},t=>{const n=A(5,t,.1,0,.9,0,.8),e=M.m(.75,1),c=M.m(0,.25),a=l(),h=o(a,e),r=o(a,c),i=1+M.q(s.g(0,1,"com5 multxc"),Math.floor(1.2*(n/8)**.6)),f=1+M.q(s.g(0,1,"com5 multyc"),Math.floor(1.2*(n/8)**.6)),u=M.m(.5,1)*n/Math.max(i,f),d=u+.5,m=u+1,b=u/5,p=[t[0]-u*i,t[1]-u*f];k.fillStyle=`rgba(0,0,0,${M.m(0,.2)})`;for(let t=0;i>t;t++){const n=p[0]+(2*t+1)*u;for(let t=0;f>t;t++){const o=p[1]+(2*t+1)*u;k.beginPath(),k.arc(n,o,m,0,7),k.fill()}}for(let t=0;i>t;t++){const n=p[0]+(2*t+1)*u;for(let t=0;f>t;t++){const o=p[1]+(2*t+1)*u,e=k.createRadialGradient(n,o,b,n,o,d);e.addColorStop(0,h),e.addColorStop(1,r),k.fillStyle=e,k.beginPath(),k.arc(n,o,d,0,7),k.fill()}}},t=>{if(0>=z||M.v(F(t)))return void U[M.K(h.slice(0,6))](t);const n=A(6,t,.05,0,.9,0,.8),e=Math.ceil(2*n*M.m(.6,1)),c=Math.floor(e/2),a=e%2,r=e*M.m(s.g(0,.8,"com6 h1min")**.5,.9)**s.g(.5,1.5,"com6 h1power"),i=Math.floor(r/2),f=Math.max((r-e)/2,e*(M.m(0,.45)+M.m(0,.45))*(s.k(.8,"com6 backnesstype")?s.g(.2,.9,"com6 backness#pos"):s.g(-.2,-.05,"com6 backness#neg"))),u=Math.ceil(n*M.m(.7,1)*s.g(.1,3.5,"com6 width")**.5),d=Math.floor(u/2),m=u%2,b=[[t[0]-d,t[1]+f-i],[t[0]+d+m,t[1]-c],[t[0]+d+m,t[1]+c+a],[t[0]-d,t[1]+f+i+e%2]],p=l();k.fillStyle=`rgba(0,0,0,${M.m(0,.2)})`,k.beginPath(),k.moveTo(b[0][0]-1,b[0][1]),k.lineTo(b[1][0]-1,b[1][1]),k.lineTo(b[2][0]-1,b[2][1]),k.lineTo(b[3][0]-1,b[3][1]),k.fill(),k.fillStyle=o(p,M.m(.7,1)),k.beginPath(),k.moveTo(b[0][0],b[0][1]),k.lineTo(b[1][0],b[1][1]),k.lineTo(b[2][0],b[2][1]),k.lineTo(b[3][0],b[3][1]),k.fill()}];let $=0,z=0,L=0,P=0;for(;;){let t;if(C>z)O.length>L?(t=O[L],L++):(z++,t=O[0],L=1);else{if($>=I)break;t=O[M.p(0,O.length-1)],$++}let n=[t.x,t.y];for(let o=0;10>o;o++){const o=[t.x+M.p(-6,6),t.y+M.p(-6,6)];if(!(0>o[0]||o[0]>m||0>o[1]||o[1]>g)&&D(o[0],o[1])){n=o;break}}6>Math.abs(n[0]-b)&&M.v(s.g(0,1,"com middleness"))&&(n[0]=b),U[M.K(h)](n),P++}return k.clearRect(b+m%2,0,m,g),k.scale(-1,1),k.drawImage(H,-m,0),H})(s,c,a)}function c(t,n){const o=document.createElement("canvas");return o.width=t,o.height=n,o}function a(t,n,o,e){t.beginPath(),t.arc(n,o,e,0,7),t.fill()}function h(t){return t.getContext("2d").getImageData(0,0,t.width,t.height)}function r(t){const n=t.getContext("2d"),o=h(t),e=[],s=[];for(let t=0;o.width>t;t++)for(let n=0;o.height>n;n++)o.data[4*(n*o.width+t)+3]&&(e.push(t),s.push(n));const c=Math.min(...e),a=Math.min(...s),r=n.getImageData(c,a,1+Math.max(...e)-c,1+Math.max(...s)-a);return t.width=r.width,t.height=r.height,n.putImageData(r,0,0),t}function i(t){const n=((t,n,o)=>{const e=Math.floor(t/o),s=Math.floor(n/o),c=[],a=Math.floor(n/(2*s));for(let o=0;s>o;o++){const h=Math.floor(t/((2-o%2)*e));for(let r=0;e-o%2>r;r++)c.push([1e9,1e9,0,0,h+(r+(Math.random()-.5))*t/e,a+(o+(Math.random()-.5))*n/s,[]])}return c})(t.width,t.height,Math.max(12,Math.floor(Math.min(t.width,t.height)/12))),o=t.width,e=t.height,s=h(t);for(let t=0;e>t;t++)for(let e=0;o>e;e++){const c=4*(t*o+e);if(s.data[c+3]){let o,a=1e9;for(let s=0;n.length>s;s++){const c=Math.hypot(n[s][4]-e,n[s][5]-t);a>c&&(a=c,o=n[s])}o[0]=Math.min(e,o[0]),o[2]=Math.max(e,o[2]),o[1]=Math.min(t,o[1]),o[3]=Math.max(t,o[3]),o[6].push([e,t,s.data[c+0],s.data[c+1],s.data[c+2],s.data[c+3]])}}const a=[];return n.map(t=>{if(1e9>t[0]){const n=t[2]-t[0]+1,o=c(n,t[3]-t[1]+1),e=h(o);t[6].map(o=>{const s=4*((o[1]-t[1])*n+(o[0]-t[0]));e.data[s+0]=o[2],e.data[s+1]=o[3],e.data[s+2]=o[4],e.data[s+3]=o[5]}),o.getContext("2d").putImageData(e,0,0),a.push([t[4],t[5],t[0]-t[4],t[1]-t[5],o])}}),a}function f(t,n,o){const e=t[0]-n/2,s=t[1]-o/2,c=Math.hypot(e,s),a=c*c,h=c*(1.5+1.5*Math.random());return[...t,(h-c)*(1-s**2/a)**.5*(e>0?1:-1),(h-c)*(1-e**2/a)**.5*(s>0?1:-1),(720*Math.random()-360*Math.PI)/((Math.random()+2)*t[4].width*18)]}const M=new(window.AudioContext||webkitAudioContext),l=([t,n,o,e,s,c=4,a=0,h=0,r=0,i=0,f=0,l=.1,u=0,d=0,m=0,b=.04,p=0,v=0,g=0])=>{let w,x,y,H,k=2*Math.PI,S=a*=500*k/44100/44100,q=n*=(1+.1*Math.random()-.05)*k/44100,D=[],K=0,O=0,B=0,C=1,I=0,Q=0,j=0;for(f*=500*k/44100**3,d*=k/44100,g*=k/44100,v*=44100,p=44100*p|0,x=(r=44100*r+9)+(b*=44100)+(o*=44100)+(e*=44100)+(i*=44100)|0;x>B;D[B++]=j)++Q%(100*u|0)||(j=c?c>1?c>2?c>3?Math.sin((K%k)**3):Math.max(Math.min(Math.tan(K),1),-1):1-(2*K/k%2+2)%2:1-4*Math.abs(Math.round(K/k)-K/k):Math.sin(K),j=(p?1-h+h*Math.sin(k*B/p):1)*(j>0?1:-1)*Math.abs(j)**l*t*.3*(r>B?B/r:r+b>B?1-(B-r)/b*(1-s):r+b+o>B?s:x-i>B?(x-B-i)/e*s:0),j=i?j/2+(i>B?0:(x-i>B?1:(x-B)/i)*D[B-i|0]/2):j),w=(n+=a+=f)*Math.cos(d*O++),K+=w-w*m*(1-1e9*(Math.sin(B)+1)%2),C&&++C>v&&(n+=g,q+=g,C=0),!p||++I%p||(n=q,a=S,C||=1);return y=M.createBuffer(1,x,44100),y.getChannelData(0).set(D),H=M.createBufferSource(),H.buffer=y,H.connect(M.destination),H.start(),H};function u(){l([.1,467,.06,.14,.58,,,.02,,,,,.4,303,.5,.02])}function d(t){l([t,274,.03,.67,.63,,,,,.25,,1.11,.5,,.8,.02,.04])}function m(){l([.3,279,.09,.09,.89,3,-4.9,.02,.02,.05,-.6,1.2])}function b(t){H.save(),t(),H.restore()}function p(t){const n=c(t.width,t.height),o=h(t),e=o.data;for(let t=0;e.length>t;t+=4){const n=e[t+0],o=e[t+1],s=e[t+2];e[t+0]=255-(.393*n+.769*o+.189*s),e[t+1]=255-(.349*n+.686*o+.168*s),e[t+2]=255-(.272*n+.534*o+.131*s)}return n.getContext("2d").putImageData(o,0,0),n}function v(t){const n=c(20,20),o=n.getContext("2d"),e=o.createRadialGradient(10,10,0,10,10,10);return e.addColorStop(t,"#ff0"),e.addColorStop(1,"#f00"),o.fillStyle=e,a(o,10,10,10),n}function w(t){const n=c(t.width,t.height),o=n.getContext("2d");return o.scale(1,-1),o.drawImage(t,0,0,t.width,-t.height),n}const x=["#9af","#abf","#ccf","#fef","#fee","#fc9","#fc6"],y=g,H=y.getContext("2d"),k=r(s(new t("piBbgDn4CZqlkqiF"),"ie7jMyCFouoUjkVs",60)),S=i(k),q=k.width,D=k.height,K=Math.floor(q/2),O=Math.floor(D/2),B=h(k).data,C=(()=>{const t=[k];for(let n=0;10>n;n++){const o=c(2*q,2*D),e=o.getContext("2d");for(let n=0;3>n;n++)for(let o=0;3>o;o++)e.drawImage(t[0],K-t.length-1+o,O-t.length-1+n);e.globalCompositeOperation="source-in",e.fillStyle=n>5?"#0ff":"#00f",e.fillRect(0,0,o.width,o.height),e.globalCompositeOperation="source-over",e.drawImage(t[0],K-t.length,O-t.length),t.unshift(r(o))}return t.pop(),t.map(n=>{const o=n.getContext("2d");o.globalCompositeOperation="destination-out",o.globalAlpha=.2;for(let e=5;10>e;e++)o.drawImage(t[e],Math.floor((n.width-t[e].width)/2),Math.floor((n.height-t[e].height)/2))}),t.length=5,t})(),I=[],[Q,j]=(()=>{const t=c(20,60),n=t.getContext("2d");return n.fillStyle="#ff0",n.beginPath(),n.moveTo(10,60),n.lineTo(0,10),n.arc(10,10,10,Math.PI,0),n.lineTo(10,60),n.fill(),n.strokeStyle="#0ff",n.shadowColor="#00f",n.globalCompositeOperation="source-atop",n.shadowBlur=4,n.lineWidth=10,n.beginPath(),n.moveTo(10,70),n.lineTo(-3,10),n.arc(10,10,13,Math.PI,0),n.lineTo(10,70),n.stroke(),[t,h(t).data]})(),F=(()=>{const t=[];for(let n=0;9>n;n++)t.unshift(v(n/10)),t.push(v(n/10));return t})(),N=h(F[0]).data,[A,G]=(()=>{const t=c(60,60),n=t.getContext("2d"),o=n.createRadialGradient(30,30,0,30,30,30);return o.addColorStop(.6,"#008"),o.addColorStop(1,"#00f"),n.fillStyle=o,a(n,30,30,30),[t,h(t).data]})(),U=JSON.parse(localStorage.pnf_highscores||0)||[],$=(()=>{const t=c(100,100),n=t.getContext("2d");n.font="bold 20px Helvetica",n.translate(50,50),n.rotate(-Math.PI/2),n.fillStyle="#fff",n.textAlign="center",n.fillText("NEW!",0,0),r(t);const o=c(t.width+10,t.height+10),e=o.getContext("2d");return e.fillStyle="#f00",e.fillRect(0,0,o.width,o.height),e.drawImage(t,5,5),o})();let z,L,P,Y,Z,J,T,V,W,X,E,R,_,tt,nt,ot,et,st,ct,at,ht=0,rt=0,it=[],ft=0,Mt=performance.now(),lt=0;function ut(t){tt+=t,nt=(new Intl.NumberFormat).format(tt)}function dt(){const t=Math.max(400,1e3-25*_);Kt+=qt.p(t,t+400)}function mt(t){const n=r(t[0]);t[1]=h(n).data,t[2]=p(n),t[3]=i(n)}(t=>{const n=c(32,32),o=n.getContext("2d");let e=32,s=32;t.width>t.height?s*=t.height/t.width:e*=t.width/t.height,o.drawImage(t,0,0,e,s);const a=document.createElement("link");a.setAttribute("rel","icon"),a.setAttribute("href",n.toDataURL()),document.head.appendChild(a)})(k);const bt=[["c4pf4K5xHzu4CyZM","Wl9w64KNQvFNbbbU",50,10,.35,0,[]],["VTjHVRDIYTbXk766","a3QM5c7MnbQlWns3",80,30,.27,0,[]],["1fOXvyryYCvwBWPL","I4xttvPYWxB1So2A",230,80,.2,6,[]],["VsM4qdcBSiuCPDGJ","q4D72OvJMb23kSZC",60,20,.4,0,[]],["l4pyu8yF0mt84Q4u","jPU5GcKNpf2JMgoG",100,40,.35,0,[[350]]],["NMp3mtsPHIwzMKYk","dBzvSKo7wpema3S5",220,90,.22,9,[]],["o67yOby6izpasGgo","fyKKupDEId96qQHu",70,20,.5,0,[[350]]],["IU7xqL8UqZIXJQDQ","aVBO8buAfBbQ4DOY",100,40,.35,0,[[350,6]]],["LP6kUeGMn7S5xZzi","p5O7jAQK67mDULTD",230,100,.25,14,[]],["SsSvCKpjLVTGITYH","aOEjI2Owpqpl06ex",65,30,.5,0,[[350]]],["AGUwhB1E94wgKe49","pwUtokX7oS7ZKFK1",110,50,.35,6,[[350,6]]],["qRF6GA3xnzX0lMcH","RIdNudvB6T2ro7C3",240,120,.3,22,[]]];function pt(t,n){const o=Math.round(t[0]-t[2]/2),e=Math.round(t[1]-t[3]/2),s=Math.round(n[0]-n[2]/2),c=Math.round(n[1]-n[3]/2);if(s+n[2]>o&&o+t[2]>s&&c+n[3]>e&&e+t[3]>c){const a=Math.min(o+t[2],s+n[2]),h=Math.min(e+t[3],c+n[3]),[r,i,f]=o>s?[0,o-s,a-o]:[s-o,0,a-s],[M,l,u]=e>c?[0,e-c,h-e]:[c-e,0,h-c];for(let o=0;u>o;o++)for(let e=0;f>e;e++)if(t[4][4*((M+o)*t[2]+r+e)+3]>0&&n[4][4*((l+o)*n[2]+i+e)+3]>0)return 1}}function vt(){R?(R--,l([.9,119,0,.44,.85,0,5.3,,,.01,-4.2,.09,.1,-340,.7,.08])):V||(d(1),V=1)}const gt=[["F","#fa0",t=>{X=t+6500}],["S","#0ff",()=>{l([.5,505,.12,.46,.69,2,,,.21,,,1.67,,,,.03,.28,.02,58]),R++}],["B","#f00",t=>{d(1.5),E=t+1e3,Kt+=1500}]];function wt(t,n,o,e,s){return c=>{const a=(c-s)/e;if(1>=a)return b(()=>{H.globalAlpha=1-a**2,H.translate(n+t[0]+t[5]*a,o+t[1]+t[6]*a),H.rotate(t[7]*a),H.drawImage(t[4],t[2],t[3])}),1}}function xt(t,n,o,e,s,c){const a=F[0].width,h=F[0].height,r=Math.hypot(o-t,e-n),i=(o-t)/r,f=(e-n)/r;return o=>{if(E>o)return;const e=o-c;return pt(T,[t+=e*s*i,n+=e*s*f,a,h,N])&&(vt(),!V)||n-h/2>700||0>n+h/2||t-a/2>480||0>t+a/2?void 0:(c=o,H.drawImage(F[o%F.length|0],t-a/2,n-h/2),2)}}function yt(t,n,o,e,s,c){const a=[];for(let h=0;t>h;h++){const r=e+2*h*Math.PI/t;a.push(xt(n,o,n+100*Math.cos(r),o+100*Math.sin(r),s,c))}return a}let Ht,kt,St,qt,Dt,Kt,Ot,Bt,Ct,It,Qt,jt=5;function Ft(t){t.preventDefault();const n=480/700,[o,e]=y.offsetWidth/y.offsetHeight>n?[y.offsetHeight*n,y.offsetHeight]:[y.offsetWidth,y.offsetWidth/n],[s]=t.changedTouches||[t];return[Math.floor(480*(s.pageX-(y.offsetWidth-o)/2)/o),Math.floor(700*(s.pageY-(y.offsetHeight-e)/2)/e)]}self.onmousedown=t=>{Ft(t),ht=1},self.ontouchstart=t=>{[z,L]=Ft(t),ht=1},self.onmousemove=t=>{[P,Y]=Ft(t)},self.ontouchmove=t=>{const[n,o]=Ft(t);P+=n-z,Y+=o-L,z=n,L=o},self.ontouchend=self.onmouseup=t=>{Ft(t),ht=0},self.onkeydown=self.onkeyup=t=>{ft=it[t.keyCode]=t.type[5]},y.width=480,y.height=700,function n(o){2===lt?(t=>{const n=t-Qt;Qt=t,n>160&&(Mt+=n,it=[]);const o=t-Mt;if(!V){const t=.6*n,o=it[38]||it[90],e=it[40]||it[83],s=it[37]||it[65],c=it[39]||it[68];if(o||e||s||c){const n=t/((o||e)&&(s||c)?2**.5:1);o&&(J-=n),e&&(J+=n),s&&(Z-=n),c&&(Z+=n),P=Z,Y=J}else{const n=P-Z,o=Y-J,e=Math.hypot(n,o);t>e?(Z=P,J=Y):(Z+=n/e*t,J+=o/e*t)}K>Z?Z=K:Z>480-K&&(Z=480-K),O>J?J=O:J>700-O&&(J=700-O),T=[Z,J,q,D,B]}H.fillStyle="#002",H.fillRect(0,0,480,700);for(let t,n=100;n--;H.fillStyle=x[n%x.length],a(H,Math.floor(-60*(100-n)*(Z-K)/(100*(480-q)))+102797*(1+Math.sin(t))*n%540,700*(Math.tan(n/9)+t*o/3e3)%700,3.3*(t-.3)))t=150/(3*n+200);const e=V,s=[],c=[],h=[];function r(t){const n=[],e=t(o,n);e&&(e-2?s.push(t):c.push(t),e.call&&h.push(e)),n.map(r)}if(Ht.map(r),!e&&V&&(W=o,S.map(t=>wt(f(t,q,D),Z-K,J-O,1500,o)).map(r)),Ht=s.concat(c),kt=h,H.fillStyle="#fff",H.textAlign="center",V)b(()=>{H.globalAlpha=Math.min(1,(o-W)/2e3),H.textBaseline="middle",H.font="40px Helvetica",H.fillText("Game Over",240,350)});else{if(R){const t=C[Math.max(0,C.length-R)];H.drawImage(t,Z-t.width/2,J-t.height/2)}H.drawImage(k,Z-K,J-O)}E>o&&b(()=>{H.globalAlpha=(E-o)/1e3,H.fillRect(0,0,480,700)}),H.textBaseline="top",H.font="16px Helvetica",H.fillText(nt,240,5);const i=X>o;if(!V&&o>St+(i?100:200)&&(jt=-jt,Ht.push(((t,n,o)=>e=>{const s=[t,n-=20*(e-o)/32,Q.width,Q.height,j];for(let t=0;kt.length>t;t++)if(kt[t](s,10,e))return;if(n+Q.height/2>=0)return o=e,H.drawImage(Q,t-Q.width/2,n-Q.height/2),1})(Z+(i?jt:0),J-Math.floor(D/2),o)),St=Math.max(o),l([.04,292,.01,.08,.74,3,-3.9,.43,.02])),o>Ot&&!It&&(++_%5?Ot=o+1e4:(It=1,Ht.push(((t,n)=>{const o=et.width,e=et.height;let s,c,a=0,h=n+2e3,r=1e9,i=n,M=240,d=-e/2,p=0,v=0,g=0;function w(t,n,o){if(pt(t,s))return v=o,r-=n,r>0&&u(),1}return(n,u)=>{let x=0;if(r>0){const e=n-i;0===a?n>h&&(a=1):1===a?(d+=.15*e,d>150&&(d=150,r=100+250*t,a=2,c=n)):0===p?(M+=.1*e,M+o/2>480&&(M=480-o/2,p=1)):(M-=.1*e,0>M-o/2&&(M=o/2,p=0))}else x=1;if(x)return l([1.1,369,.1,1,.77,2,.4,,,.37,,.05,.8,-1.3,.7]),ut(500*t),It=0,Ot=n+1e4,Kt=500+n,dt(),Bt=500+n,void at.map(t=>u.push(wt(f(t,o,e),M-o/2,d-e/2,500,n)));s=[M,d,o,e,st],pt(T,s)&&(V=1),i=n,H.drawImage(et,M-o/2,d-e/2);const y=400-n+v;if(y>0&&b(()=>{H.globalAlpha=y/400,H.drawImage(ct,M-o/2,d-e/2)}),!V&&2===a&&n>c){if(m(),5*t>g){const[o,e]=[[28,119],[42,123],[108,94],[121,80],[143,50],[28,119]][Math.floor(g/t)];u.push(xt(M-o,d+e,M-o,d+e+100,.5,n),xt(M+o,d+e,M+o,d+e+100,.5,n))}else u.push(xt(M,d+125,Z,J,.3,n));g++,10*t>g?c=g>5*t?n+200:g===5*t?n+800:g%t?n+180:n+500:(g=0,c=n+800)}return w}})(Math.floor(_/5),o)))),o>Bt&&!It&&(Ht.push(((t,n,o,e)=>s=>{const c=[t,n+=5*(s-e)/32,A.width,A.height,G],a=1.5+Math.sin(s/200)/2;if(V||!pt(T,c)){if(700>=n-Math.floor(A.height/2))return e=s,b(()=>{H.translate(t,n),H.drawImage(A,-A.width/2,-A.height/2),H.textAlign="center",H.textBaseline="top",H.font="700 "+Math.floor(25*a)+"px Helvetica";const e=H.measureText(gt[o][0]),s=e.actualBoundingBoxDescent-e.actualBoundingBoxAscent;H.fillStyle=gt[o][1],H.fillText(gt[o][0],0,-Math.floor(s/2))}),2}else gt[o][2](s)})(Dt.p(30,450),Math.floor(-A.height/2),Ct++,o)),Ct%=gt.length,Bt=o+9e3),o>Kt&&!It){const t=qt.p(Math.min(Math.max(_-2,0),I.length-3),Math.min(_,I.length-1));Ht.push((([t,n,o,e,s,c,a,h],r,i,M)=>{const l=qt.m(0,2*Math.PI),p=t.width,v=t.height;let g,w=-t.height/2,x=0;function y(t,n,o){if(pt(t,g))return x=o,(s-=n)>0&&u(),1}return(u,k)=>{const S=w;let q=0;if(0>=s||E>u?q=1:(w+=(u-M)*c,g=[r,w,p,v,n],pt(T,g)&&(vt(),V||(q=1))),q)return d(p/275),ut(i),a>0&&k.push(...yt(a,r,w+17*c,l,.45,u)),void e.map(t=>k.push(wt(f(t,p,v),r-p/2,w-v/2,500,u)));if(w-v/2>700)return;M=u,H.drawImage(t,r-p/2,w-v/2);const D=400-u+x;if(D>0&&b(()=>{H.globalAlpha=D/400,H.drawImage(o,r-p/2,w-v/2)}),!V)for(let t=0;h.length>t;t++){const n=h[t][0];if(n>S&&w>n){m();const n=h[t][1],o=w+17*c;n?k.push(...yt(n,r,o,l,.3,u)):k.push(xt(r,o,Z,J,.3,u))}}return y}})(I[t],qt.p(30,450),50*(t+1),o)),dt()}V&&o>W+3500&&((()=>{const t=[tt,Date.now()];tt&&(U.push(t),U.sort((t,n)=>n[0]-t[0]||n[1]-t[1]),U.length=Math.min(U.length,5),localStorage.pnf_highscores=JSON.stringify(U)),ot=U.indexOf(t)})(),lt=1,rt=ht)})(o):(n=>{if(H.fillStyle="#002",H.fillRect(0,0,480,700),b(()=>{for(let t=200;t--;){H.fillStyle=x[t%x.length];const o=50/(6-(n/3e3+t/13)%6);H.globalAlpha=Math.min(o/100,1),a(H,Math.cos(t)*o+240,Math.sin(t*t)*o+350,o/200)}}),H.fillStyle="#fff",H.textBaseline="middle",H.textAlign="center",1===lt)H.font="italic small-caps 40px Futura-CondensedMedium,sans-serif-condensed,sans-serif",U.length?(H.fillText("High Scores",240,100),b(()=>{H.textAlign="start",H.textBaseline="top";for(let t=0;U.length>t;t++){H.fillStyle="#fff",t===ot&&(H.drawImage($,90-Math.floor($.width/2),185+80*t-Math.floor($.height/2)),H.fillStyle="#fc6");const n=Intl.NumberFormat().format(U[t][0]),o=new Date(U[t][1]).toLocaleString();H.font="50px Helvetica",H.fillText(t+1,115,160+80*t),H.font="60px Helvetica",H.fillText("{",145,150+80*t),H.font="25px Helvetica",H.fillText(n+" points",170,160+80*t),H.font="15px Helvetica",H.fillText(o,170,190+80*t)}})):H.fillText("Planet Not Found",240,350),H.font="20px Helvetica",H.fillText("<Press anywhere or any key to play>",240,670),ht||ft?rt||(lt=2,qt=new t("enemy"),Dt=new t("powerup"),Kt=1e3,Ot=5e3,Bt=9e3,Ht=[],kt=[],Qt=Mt=performance.now(),ut(_=Ct=St=E=X=tt=0),V=0,P=Z=240,Y=J=630,R=1,It=0):rt=0;else if(H.font="italic 30px Helvetica",H.fillText("Loading…",240,350),et)if(bt.length>I.length)I.push((([n,o,e,...c])=>[w(s(new t(n),o,e)),0,0,0,...c])(bt[I.length]));else{for(let t=0;I.length>t;t++)if(!I[t][1])return void mt(I[t]);lt=1}else et=w(r(s(new t("HYj7ADLjQr6icLtO"),"CdiB9N2ZoQWuAxur",270))),ct=p(et),at=i(et),st=h(et).data})(o),ft=0,requestAnimationFrame(n)}(Mt);
