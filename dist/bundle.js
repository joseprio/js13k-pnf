!function(){'use strict';class t{constructor(t){this.t=0,this.h=0,this.i={},this.seed=t,8>this.seed.length&&(this.seed='padding_'+this.seed),this.seed.length%2==0&&(this.seed='1'+this.seed),this.o=[2972948403,3086140710,2071788248,3026137486,1411764137,2265725585,2923087685,1593177610],this.M=3234042090;for(let t=this.seed.length-1;t>=0;t--){const s=this.seed.charCodeAt(t);this.M=((this.M<<5)+this.M^s^this.M<<s%13+1^this.M>>s%17+1)>>>0,this.o[t%8]^=((this.M>>9)*(this.M%16384+3427)^s)>>>0}}l(){const t=this.seed.charCodeAt(this.t),s=this.o[this.h];return this.M=((this.M<<5)+this.M+s^t^this.M<<t%17+1^this.M>>t%13+1)>>>0,this.o[this.h]=(s>>3^s<<t%19+1^this.M%134217728*3427)>>>0,this.t=(this.t+1)%this.seed.length,this.h=(this.h+1)%8,this.M}u(t){const s=[1160605769,1424711319,876532818,1419174464];let h=1206170165;if(this.i[t])return this.i[t];for(let i=t.length-1;i>=0;i--){const e=t.charCodeAt(i);let n=s[0]^e;n=(n^n<<11)>>>0,n=(n^n>>8)>>>0,s[0]=s[1],s[1]=s[2],s[2]=s[3],s[3]=(s[3]^s[3]>>19^n)>>>0,h=3427*(h^e<<24)^s[3]}for(let t=this.seed.length-1;t>=0;t--){const i=this.seed.charCodeAt(t);let e=s[0]^i;e=(e^e<<11)>>>0,e=(e^e>>8)>>>0,s[0]=s[1],s[1]=s[2],s[2]=s[3],s[3]=(s[3]^s[3]>>19^e)>>>0,h=3427*(h^i<<24)^s[3]}return this.i[t]=h>>>0,this.i[t]}m(t,s){return(4294967296*this.l()+this.l())/0x10000000000000000*(s-t)+t}p(t,s){return Math.floor(this.m(t,s+1))}v(t){return this.m(0,1)<t}g(t,s,h){return(4294967296*this.u(h)+this.u(h+'@'))/0x10000000000000000*(s-t)+t}H(t,s,h){return Math.floor(this.g(t,s+1,h))}k(t,s){return this.g(0,1,s)<t}O(t){return this.v(t)?-1:1}q(t,s){let h=0;for(;this.v(t)&&s>h;)h++;return h}B(t,s,h){let i=0;for(;(4294967296*this.u(h+i)+this.u(h+'@'+i))/0x10000000000000000<t&&s>i;)i++;return i}S(t){let s=0;for(let h=0;t.length>h;h++)s+=t[h];let h=this.m(0,s);for(let s=0;t.length>s;s++)if(h-=t[s],0>h)return s;return 0}D(t,s){let h=0;for(let s=0;t.length>s;s++)h+=t[s];let i=this.g(0,h,s);for(let s=0;t.length>s;s++)if(i-=t[s],0>i)return s;return 0}}function s(t,s,h){return Math.max(s,Math.min(h,t))}function h(t,s){return`rgb(${t.map(t=>t*s*100).join('%,')}%)`}function i(t,s,h){const i=(i,e=(i+6*t)%6)=>h-h*s*Math.max(Math.min(e,4-e,1),0);return[i(5),i(3),i(1)]}function e(e,n,o){return((e,n,o)=>{const a=(t=>{const s=[];return s[0]=.8*t.m(.001,1)*2**t.m(0,8),s[1]=.9*t.m(.01,1)*2**t.m(0,8),s[2]=1*t.m(.001,1)*2**t.m(0,8),s[3]=3*t.m(0,1)*2**t.m(0,8),s[4]=.5*t.m(0,1)*2**t.m(0,8),s[5]=.05*t.m(0,1)*2**t.m(0,8),s[6]=.5*t.m(0,1)*2**t.m(0,8),s})(e),c=[],r=[],M=1+(e.k(.7,'base color +1')?1:0)+e.B(.3,3,'base color count');for(let t=0;M>t;t++){const h='base color'+t;c.push(i(e.g(0,1,h+'hue')**2,s(e.g(-.2,1,h+'saturation'),0,e.g(0,1,h+'saturation bound')**4),s(e.g(.7,1.1,h+'value'),0,1))),r.push(2**e.g(0,6,h+'chances'))}const f=new t(e.seed+n);function l(){let t=c[f.S(r)];return f.v(e.g(0,.5,'base color shift chance')**2)&&(t=[t[0],t[1],t[2]],t[0]=s(t[0]+e.g(0,.6,'base color shift range red')**2*s(f.m(-1,1.2),0,1)*s(f.O(.7)+f.O(.7),-1,1),0,1),t[1]=s(t[1]+e.g(0,.6,'base color shift range green')**2*s(f.m(-1,1.2),0,1)*s(f.O(.7)+f.O(.7),-1,1),0,1),t[2]=s(t[2]+e.g(0,.6,'base color shift range blue')**2*s(f.m(-1,1.2),0,1)*s(f.O(.7)+f.O(.7),-1,1),0,1)),t}o=o||f.m(e.g(2.5,3.5,'size min'),e.g(5,7,'size max'))**3;const u=f.m(e.g(.5,1,'wratio min'),e.g(1,1.3,'wratio max')),d=f.m(e.g(.7,1,'hratio min'),e.g(1.1,1.7,'hratio max')),m=Math.floor(o*u),b=Math.floor(m/2),p=Math.floor(m/6),v=(m-6*p)/2,w=Math.floor(o*d),x=Math.floor(w/2),g=Math.floor(w/6),y=(w-6*g)/2,H=document.createElement('canvas');H.width=m,H.height=w;const k=H.getContext('2d'),O=m*w/20;[()=>{const t=Math.ceil(m*e.g(.1,1,'outline0 iw')/5),s=[[[b-t,0],[b+t,w]]],h=2+Math.floor(f.m(.5,1)*e.g(2,8,'outline0 bc')*o**.5);for(let t=1;h>t;t++){const t=s[f.p(0,s.length-1)],h=[t[0][0]+f.m(0,1)*(t[1][0]-t[0][0]),t[0][1]+f.m(0,1)*(t[1][1]-t[0][1])];(t[0][1]+t[1][1])/2>h[1]&&f.v(e.g(.5,1.5,'outline0 frontbias'))&&(h[1]=t[1][1]-(h[1]-t[0][1]));const i=[f.m(0,1)*m,f.m(0,1)*w],n=O/Math.abs((i[0]-h[0])*(i[1]-h[1]));if(1>n&&(i[0]=h[0]+(i[0]-h[0])*n,i[1]=h[1]+(i[1]-h[1])*n),h[0]>i[0]){const t=h[0];h[0]=i[0],i[0]=t}if(h[1]>i[1]){const t=h[1];h[1]=i[1],i[1]=t}s.push([[Math.floor(h[0]),Math.floor(h[1])],[Math.ceil(i[0]),Math.ceil(i[1])]])}k.fillStyle='#fff';for(let t=0;s.length>t;t++){const h=s[t];k.fillRect(h[0][0],h[0][1],h[1][0]-h[0][0],h[1][1]-h[0][1]),k.fillRect(m-h[1][0],h[0][1],h[1][0]-h[0][0],h[1][1]-h[0][1])}},()=>{const t=Math.max(2,(O/Math.PI)**.5),s=Math.ceil(m*e.g(.1,1,'outline1 iw')/5),h=[],i=Math.floor(w/(2*s));for(let t=0;i>t;t++)h.push({N:[b,w-s*(2*t+1)],r:s});const n=i+Math.floor(f.m(.5,1)*e.g(10,50,'outline1 cc')*o**.5);for(let s=i;n>s;s++){const s=h[Math.max(f.p(0,h.length-1),f.p(0,h.length-1))];let i=f.m(1,t);const n=f.m(Math.max(0,s.r-i),s.r);let o=f.m(0,2*Math.PI);o>Math.PI&&f.v(e.g(.5,1.5,'outline1 frontbias'))&&(o=f.m(0,Math.PI));let a=[s.N[0]+Math.cos(o)*n,s.N[1]+Math.sin(o)*n];i=Math.min(i,a[0],m-a[0],a[1],w-a[1]),h.push({N:a,r:i})}k.fillStyle='#fff';for(let t=0;h.length>t;t++){const s=h[t];k.beginPath(),k.arc(s.N[0],s.N[1],s.r,0,7),k.fill(),k.beginPath(),k.arc(m-s.N[0],s.N[1],s.r,0,7),k.fill()}},()=>{const t=[[b,f.m(0,.05)*w],[b,f.m(.95,1)*w]],s=6/o+e.g(.03,.1,'outline2 basefatness'),h=Math.max(3,Math.ceil(f.m(.05,.1)/s*o**.5));k.lineCap=['round','square'][e.H(0,1,'outline2 linecap')],k.strokeStyle='#fff';for(let i=1;h>i;i++){let h=t[i];h||(h=[f.m(0,1)*m,f.m(0,1)**e.g(.1,1,'outline2 frontbias')*w],t.push(h));const n=1+f.q(e.g(0,1,'outline2 conadjust'),3);for(let i=0;n>i;i++){const i=t[f.p(0,t.length-2)];k.lineWidth=f.m(.7,1)*s*o,k.beginPath(),k.moveTo(i[0],i[1]),k.lineTo(h[0],h[1]),k.stroke(),k.beginPath(),k.moveTo(m-i[0],i[1]),k.lineTo(m-h[0],h[1]),k.stroke()}}}][e.D([1,1,1],'outline type')]();const q=k.getImageData(0,0,m,w);function B(t,s){return q.data[4*(s*m+t)+3]}const S=[];for(let t=0;p>t;t++){S[t]=[];for(let s=0;g>s;s++)S[t][s]={A:t,I:s,x:Math.floor(v+6*(t+.5)),y:Math.floor(y+6*(s+.5))}}const D=[S[Math.floor(p/2)][Math.floor(g/2)]];let N=0;for(;D.length>N;){const t=D[N];if(t.A>0){const s=S[t.A-1][t.I];s.K||(B(s.x,s.y)?(s.K=1,D.push(s)):s.K=2)}if(p-1>t.A){const s=S[t.A+1][t.I];s.K||(B(s.x,s.y)?(s.K=1,D.push(s)):s.K=2)}if(t.I>0){const s=S[t.A][t.I-1];s.K||(B(s.x,s.y)?(s.K=1,D.push(s)):s.K=2)}if(g-1>t.I){const s=S[t.A][t.I+1];s.K||(B(s.x,s.y)?(s.K=1,D.push(s)):s.K=2)}N++}for(let t=0;D.length>t;t++){const s=D[t],h=S[p-1-s.A][s.I];1!=h.K&&(h.K=1,D.push(h))}const A=e.H(1,2,'base component passes'),I=Math.max(1,Math.floor(D.length*e.g(0,1/A,'extra component amount'))),K=A*D.length+I;function C(t,s){const h=Math.floor((t-v)/6),i=Math.floor((s-y)/6);return h>=0&&p>h&&i>=0&&g>i&&1==S[h][i].K}function Q(t){return 1-t[1]/w}function j(t,s){let h=Math.min(1,1-Math.abs(t[0]-b)/b);return s&&(h=Math.min(h,1-Math.abs(t[1]-x)/x)),h}function F(t,s,h,i,n,o,a){const c=(j(s,!0)*(1-1/((m+w)/1e3+1))*e.g(0,1,'master bigness')**.5*(1-z/K))**h;let r=8;if(f.v(e.g(i,n,`com${t} bigchance`)*c)){const h=e.g(o,a,`com${t} bigincchance`);for(;f.v(h*c)&&Math.min(s[0]-r,m-s[0]-r,s[1]-r,w-s[1]-r)>r/2;)r*=1.5}return r}function G(t,s,h){const i=k.createLinearGradient(s[0],s[1],2*t[0]-s[0],2*t[1]-s[1]),e=`rgba(0,0,0,${h})`;return i.addColorStop(0,e),i.addColorStop(.5,'rgba(0,0,0,0)'),i.addColorStop(1,e),i}H.width|=0;const U=[t=>{const i=F(0,t,.3,0,.9,0,.5),e=2*i,n=[Math.ceil(f.m(1,Math.max(2,i/2))),Math.ceil(f.m(1,Math.max(2,i/2)))],o=Math.min(n[0],n[1])*f.m(.1,1.2),a=[n[0]+2*o,n[1]+2*o],c=[Math.ceil(e/a[0]),Math.ceil(e/a[1])],r=[Math.round(c[0]*a[0]/2),Math.round(c[1]*a[1]/2)],M=l();k.fillStyle=`rgba(0,0,0,${f.m(0,.25)})`,k.fillRect(t[0]-r[0]-1,t[1]-r[1]-1,a[0]*c[0]+2,a[1]*c[1]+2),k.fillStyle=h(M,f.m(.4,1)),k.fillRect(t[0]-r[0],t[1]-r[1],a[0]*c[0],a[1]*c[1]),k.fillStyle=h(M,f.m(.4,1));for(let s=0;c[0]>s;s++){const h=t[0]+o+s*a[0]-r[0];for(let s=0;c[1]>s;s++)k.fillRect(h,t[1]+o+s*a[1]-r[1],n[0],n[1])}f.v(s(i/8*(.6*z/K+.3),0,.98))&&(k.fillStyle=G(t,[t[0]+r[0],t[1]],f.m(0,.9)),k.fillRect(t[0]-r[0],t[1]-r[1],a[0]*c[0],a[1]*c[1]))},t=>{const i=F(1,t,.2,.3,1,0,.6),n=Math.ceil(f.m(.8,2)*i),o=Math.ceil(f.m(.8,2)*i),a=f.p(3,Math.max(4,n)),c=Math.max(1,Math.round(n/a)),r=c*a,M=h(l(),f.m(.5,1)),u=f.m(.3,.9);if(f.v(s(e.g(-.2,1.2,'com1 hchance'),0,1))){const s=[t[0]-Math.floor(r/2),t[1]-Math.floor(o/2)];k.fillStyle=`rgba(0,0,0,${f.m(0,.25)})`,k.fillRect(s[0]-1,s[1]-1,r+2,o+2),k.fillStyle=M,k.fillRect(s[0],s[1],r,o);for(let h=0;c>h;h++)k.fillStyle=G([s[0]+(h+.5)*a,t[1]],[s[0]+h*a,t[1]],u),k.fillRect(s[0]+h*a,s[1],a,o)}else{const s=[t[0]-Math.floor(o/2),t[1]-Math.floor(r/2)];k.fillStyle=`rgba(0,0,0,${f.m(0,.25)})`,k.fillRect(s[0]-1,s[1]-1,o+2,r+2),k.fillStyle=M,k.fillRect(s[0],s[1],o,r);for(let h=0;c>h;h++)k.fillStyle=G([t[0],s[1]+(h+.5)*a],[t[0],s[1]+h*a],u),k.fillRect(s[0],s[1]+h*a,r,a)}},t=>{const i=F(2,t,.05,0,1,0,.9),n=Math.ceil(f.m(.6,1.4)*i),o=Math.ceil(f.m(1,2)*i),a=[Math.ceil(Math.max(n*f.m(.7,1)/2,1)),Math.ceil(Math.max(n*f.m(.8,1)/2,1))],c=[Math.floor(s(n*f.m(.05,.25),1,o)),Math.floor(s(n*f.m(.1,.3),1,o))],r=c[0]+c[1],M=f.v(e.g(0,1,'com2 oddchance')**.5),u=Math.max(Math.floor(o/r),1),d=u*r+(M?c[0]:0),m=l(),b=f.m(.6,1),p=f.m(.6,1),v=[h(m,b),h(m,p)],w=1-f.m(.5,.95),x=[h(m,w*b),h(m,w*p)];if(f.v(e.g(0,1,'com2 verticalchance')**.1)){const s=k.createLinearGradient(t[0]-a[0],t[1],t[0]+a[0],t[1]),h=k.createLinearGradient(t[0]-a[1],t[1],t[0]+a[1],t[1]),i=Math.floor(t[1]-d/2);s.addColorStop(0,x[0]),s.addColorStop(.5,v[0]),s.addColorStop(1,x[0]),h.addColorStop(0,x[1]),h.addColorStop(.5,v[1]),h.addColorStop(1,x[1]);for(let e=0;u>e;e++)k.fillStyle=s,k.fillRect(t[0]-a[0],i+e*r,2*a[0],c[0]),k.fillStyle=h,k.fillRect(t[0]-a[1],i+e*r+c[0],2*a[1],c[1]);M&&(k.fillStyle=s,k.fillRect(t[0]-a[0],i+u*r,2*a[0],c[0]))}else{const s=k.createLinearGradient(t[0],t[1]-a[0],t[0],t[1]+a[0]),h=k.createLinearGradient(t[0],t[1]-a[1],t[0],t[1]+a[1]),i=Math.floor(t[0]-d/2);s.addColorStop(0,x[0]),s.addColorStop(.5,v[0]),s.addColorStop(1,x[0]),h.addColorStop(0,x[1]),h.addColorStop(.5,v[1]),h.addColorStop(1,x[1]);for(let e=0;u>e;e++)k.fillStyle=s,k.fillRect(i+e*r,t[1]-a[0],c[0],2*a[0]),k.fillStyle=h,k.fillRect(i+e*r+c[0],t[1]-a[1],c[1],2*a[1]);M&&(k.fillStyle=s,k.fillRect(i+u*r,t[1]-a[0],c[0],2*a[0]))}},t=>{if(f.v(Q(t)-.3)||C(t[0],t[1]+6*1.2)||C(t[0],t[1]+10.8))for(let s=0;100>s;s++){const s=f.S(a);if(3!=s)return void U[s](t)}const s=F(3,t,.1,.6,1,.3,.8),i=f.m(1,2)*s,n=Math.ceil(f.m(.3,1)*s),o=i*f.m(.25,.6),M=(i+o)/2/2,l=Math.max(1,Math.ceil(n*f.m(.08,.25))),u=l+Math.max(1,Math.ceil(n*f.m(.03,.15))),d=Math.ceil(n/u),m=d*u+l,b=c[e.D(r,'com3 basecolor')],p=e.g(.5,.8,'com3 lightness0 mid'),v=p-e.g(.2,.4,'com3 lightness0 edge'),w=e.g(0,.2,'com3 lightness1 edge'),x=[k.createLinearGradient(t[0]-M,t[1],t[0]+M,t[1]),k.createLinearGradient(t[0]-M,t[1],t[0]+M,t[1])],g=Math.ceil(t[1]-m/2),y=[g+l,g+u];x[0].addColorStop(0,h(b,v)),x[0].addColorStop(.5,h(b,p)),x[0].addColorStop(1,h(b,v)),x[1].addColorStop(0,h(b,w)),x[1].addColorStop(.5,h(b,1)),x[1].addColorStop(1,h(b,w)),k.fillStyle=x[0],k.beginPath(),k.moveTo(t[0]-o/2,g),k.lineTo(t[0]+o/2,g),k.lineTo(t[0]+i/2,g+m),k.lineTo(t[0]-i/2,g+m),k.fill(),k.fillStyle=x[1];for(let s=0;d>s;s++){const h=[s*u+l,(s+1)*u],e=[y[0]+s*u,y[1]+s*u],n=[(o+h[0]/m*(i-o))/2,(o+h[1]/m*(i-o))/2];k.beginPath(),k.moveTo(t[0]-n[0],e[0]),k.lineTo(t[0]+n[0],e[0]),k.lineTo(t[0]+n[1],e[1]),k.lineTo(t[0]-n[1],e[1]),k.fill()}},t=>{const s=j(t,!1),i=f.m(.7,1),n=f.m(0,.2),a=l(),c=h(a,i),r=h(a,n),M=Math.max(3,Math.ceil(o*f.m(.4,1)**2*e.g(.02,.1,'com4 maxwidth'))),u=Math.floor(M/2),d=M%2,m=e.g(0,1,'com4 directionc0')**4,p=.1*e.g(0,1,'com4 directionc1')**4,v=.2*e.g(0,1,'com4 directionc2')**4,x=f.S([m*(2-s),p,v*(1+s)]);let g;if(x)if(2>x){const s=Math.min(Math.max(8,w-t[1]-f.p(0,16)),Math.floor(.6*o*f.m(0,1)**e.g(2,7,'com4 hpower1'))),h=t[0]-u,i=t[1],n=k.createLinearGradient(h,i,t[0]+u+d,i);n.addColorStop(0,r),n.addColorStop(.5,c),n.addColorStop(1,r),k.fillStyle=n,k.fillRect(h,i,M,s),g=[t[0],t[1]+s]}else{const s=k.createLinearGradient(t[0],t[1]-u,t[0],t[1]+u+d);s.addColorStop(0,r),s.addColorStop(.5,c),s.addColorStop(1,r),k.fillStyle=s,k.fillRect(t[0],t[1]-u,Math.ceil(b-t[0])+1,M),g=[b,t[1]]}else{const s=Math.min(Math.max(8,t[1]-f.p(0,16)),Math.floor(.7*o*f.m(0,1)**e.g(2,6,'com4 hpower0'))),h=t[0]-u,i=t[1]-s,n=k.createLinearGradient(h,i,t[0]+u+d,i);n.addColorStop(0,r),n.addColorStop(.5,c),n.addColorStop(1,r),k.fillStyle=n,k.fillRect(h,i,M,s),g=[t[0],t[1]-s]}const y=[.6*e.g(0,1,'com4 covercomc0')**2,.2*e.g(0,1,'com4 covercomc1')**2,e.g(0,1,'com4 covercomc2')**2];if(U[f.S(y)](t),C(g[0],g[1])){const t=[g[0]+Math.round(6*f.m(-1,1)),g[1]+Math.round(6*f.m(-1,1))];U[f.S(y)](C(t[0],t[1])?t:g)}},t=>{const s=F(5,t,.1,0,.9,0,.8),i=f.m(.75,1),n=f.m(0,.25),o=l(),a=h(o,i),c=h(o,n),r=1+f.q(e.g(0,1,'com5 multxc'),Math.floor(1.2*(s/8)**.6)),M=1+f.q(e.g(0,1,'com5 multyc'),Math.floor(1.2*(s/8)**.6)),u=f.m(.5,1)*s/Math.max(r,M),d=u+.5,m=[t[0]-u*r,t[1]-u*M];k.fillStyle=`rgba(0,0,0,${f.m(0,.2)})`;for(let t=0;r>t;t++){const s=m[0]+(2*t+1)*u;for(let t=0;M>t;t++){const h=m[1]+(2*t+1)*u;k.beginPath(),k.arc(s,h,u+1,0,7),k.fill()}}for(let t=0;r>t;t++){const s=m[0]+(2*t+1)*u;for(let t=0;M>t;t++){const h=m[1]+(2*t+1)*u,i=k.createRadialGradient(s,h,u/5,s,h,d);i.addColorStop(0,a),i.addColorStop(1,c),k.fillStyle=i,k.beginPath(),k.arc(s,h,d,0,7),k.fill()}}},t=>{if(0>=Y||f.v(Q(t)))return void U[f.S(a.slice(0,6))](t);const s=F(6,t,.05,0,.9,0,.8),i=Math.ceil(2*s*f.m(.6,1)),n=Math.floor(i/2),o=i%2,c=i*f.m(e.g(0,.8,'com6 h1min')**.5,.9)**e.g(.5,1.5,'com6 h1power'),r=Math.floor(c/2),M=Math.max((c-i)/2,i*(f.m(0,.45)+f.m(0,.45))*(e.k(.8,'com6 backnesstype')?e.g(.2,.9,'com6 backness#pos'):e.g(-.2,-.05,'com6 backness#neg'))),u=Math.ceil(s*f.m(.7,1)*e.g(.1,3.5,'com6 width')**.5),d=Math.floor(u/2),m=u%2,b=[[t[0]-d,t[1]+M-r],[t[0]+d+m,t[1]-n],[t[0]+d+m,t[1]+n+o],[t[0]-d,t[1]+M+r+i%2]],p=l();k.fillStyle=`rgba(0,0,0,${f.m(0,.2)})`,k.beginPath(),k.moveTo(b[0][0]-1,b[0][1]),k.lineTo(b[1][0]-1,b[1][1]),k.lineTo(b[2][0]-1,b[2][1]),k.lineTo(b[3][0]-1,b[3][1]),k.fill(),k.fillStyle=h(p,f.m(.7,1)),k.beginPath(),k.moveTo(b[0][0],b[0][1]),k.lineTo(b[1][0],b[1][1]),k.lineTo(b[2][0],b[2][1]),k.lineTo(b[3][0],b[3][1]),k.fill()}];let L=0,Y=0,$=0,z=0;for(;;){let t;if(A>Y)D.length>$?(t=D[$],$++):(Y++,t=D[0],$=1);else{if(L>=I)break;t=D[f.p(0,D.length-1)],L++}let s=[t.x,t.y];for(let h=0;10>h;h++){const h=[t.x+f.p(-6,6),t.y+f.p(-6,6)];if(!(0>h[0]||h[0]>m||0>h[1]||h[1]>w)&&B(h[0],h[1])){s=h;break}}6>Math.abs(s[0]-b)&&f.v(e.g(0,1,'com middleness'))&&(s[0]=b),U[f.S(a)](s),z++}return k.clearRect(b+m%2,0,m,w),k.scale(-1,1),k.drawImage(H,-m,0),H})(e,n,o)}function n(t){const s=((t,s,h)=>{const i=Math.floor(t/h),e=Math.floor(s/h),n=[],o=Math.floor(s/(2*e));for(let h=0;e>h;h++){const a=h%2==0?i:i-1,c=Math.floor(h%2==0?t/(2*i):t/i);for(let r=0;a>r;r++)n.push([c+Math.round((r+1*(Math.random()-.5))*t/i),o+Math.round((h+1*(Math.random()-.5))*s/e)])}return n})(t.width,t.height,Math.max(12,Math.floor(Math.min(t.width,t.height)/12))),h=t.getContext('2d'),i=t.width,e=t.height,n=h.getImageData(0,0,i,e),o=s.map(t=>({C:1e9,j:1e9,F:0,G:0,U:t,L:[]}));for(let t=0;e>t;t++)for(let h=0;i>h;h++){const e=4*(t*i+h);if(0===n.data[e+3])continue;let a,c=1e9;for(let i=0;s.length>i;i++){const e=Math.hypot(s[i][0]-h,s[i][1]-t);c>e&&(c=e,a=i)}const r=o[a];r.C>h&&(r.C=h),h>r.F&&(r.F=h),r.j>t&&(r.j=t),t>r.G&&(r.G=t),r.L.push([h,t,n.data[e],n.data[e+1],n.data[e+2],n.data[e+3]])}const a=[];return o.forEach(t=>{if(1e9>t.C){const s=t.F-t.C+1,h=t.G-t.j+1,i=document.createElement('canvas');i.width=s,i.height=h;const e=i.getContext('2d'),n=e.createImageData(s,h);t.L.forEach(h=>{const i=4*((h[1]-t.j)*s+(h[0]-t.C));n.data[i]=h[2],n.data[i+1]=h[3],n.data[i+2]=h[4],n.data[i+3]=h[5]}),e.putImageData(n,0,0),a.push({U:t.U,canvas:i,Y:[t.C,t.j]})}}),a}function o(t,s,h){const i=1.5+1.5*Math.random(),e=t.U[0]-s/2,n=t.U[1]-h/2,o=Math.hypot(e,n),a=o*o,c=o*i;t.$=(c-o)*((a-n*n)/a)**.5*(e>0?1:-1),t.P=(c-o)*((a-e*e)/a)**.5*(n>0?1:-1),t.angle=(720*Math.random()-360)/((Math.random()+2)*t.canvas.width)*10*(Math.PI/180)}function a(t){const s=t.getContext('2d'),h=s.getImageData(0,0,t.width,t.height),i=[],e=[];for(let t=0;h.width>t;t++)for(let s=0;h.height>s;s++)h.data[4*(s*h.width+t)+3]&&(i.push(t),e.push(s));const n=Math.min(...i),o=Math.min(...e),a=s.getImageData(n,o,1+Math.max(...i)-n,1+Math.max(...e)-o);t.width=a.width,t.height=a.height,s.putImageData(a,0,0)}const c=new(window.AudioContext||webkitAudioContext),r=44100,M=(t=1,s=.05,h=220,i=0,e=0,n=.1,o=0,a=1,M=0,f=0,l=0,u=0,d=0,m=0,b=0,p=0,v=0,w=1,x=0,g=0)=>{let y,H,k,O,q=2*Math.PI,B=M*=500*q/r/r,S=h*=(1+2*s*Math.random()-s)*q/r,D=[],N=0,A=0,I=0,K=1,C=0,Q=0,j=0;for(f*=500*q/r**3,b*=q/r,l*=q/r,u*=r,d=d*r|0,H=(i=i*r+9)+(x*=r)+(e*=r)+(n*=r)+(v*=r)|0;H>I;D[I++]=j)++Q%(100*p|0)||(j=o?o>1?o>2?o>3?Math.sin((N%q)**3):Math.max(Math.min(Math.tan(N),1),-1):1-(2*N/q%2+2)%2:1-4*Math.abs(Math.round(N/q)-N/q):Math.sin(N),j=(d?1-g+g*Math.sin(q*I/d):1)*(j>0?1:-1)*Math.abs(j)**a*t*.3*(i>I?I/i:i+x>I?1-(I-i)/x*(1-w):i+x+e>I?w:H-v>I?(H-I-v)/n*w:0),j=v?j/2+(v>I?0:(H-v>I?1:(H-I)/v)*D[I-v|0]/2):j),y=(h+=M+=f)*Math.cos(b*A++),N+=y-y*m*(1-1e9*(Math.sin(I)+1)%2),K&&++K>u&&(h+=l,S+=l,K=0),!d||++C%d||(h=S,M=B,K||=1);return k=c.createBuffer(1,H,r),k.getChannelData(0).set(D),O=c.createBufferSource(),O.buffer=k,O.connect(c.destination),O.start(),O};function f(){M(...[.1,,467,,.06,.14,4,.1,,,,,,.5,303,.4,,.58,.02,.02])}function l(t){M(...[t,,274,,.03,.67,4,1.11,,,,,.04,.8,,.5,.25,.63,.02])}function u(){M(...[.3,,279,.02,.09,.09,3,1.2,-4.9,-.6,,,,,,,.05,.89,.04,.02])}const d=['#9af','#abf','#ccf','#fef','#fee','#fc9','#fc6'];function m(t){const s=document.createElement('canvas'),{width:h,height:i}=t;s.width=h,s.height=i;const e=t.getContext('2d').getImageData(0,0,h,i),{data:n}=e,{length:o}=n;for(let t=0;o>t;t+=4){const s=n[t+0],h=n[t+1],i=n[t+2];n[t+0]=255-(.393*s+.769*h+.189*i),n[t+1]=255-(.349*s+.686*h+.168*i),n[t+2]=255-(.272*s+.534*h+.131*i)}return s.getContext('2d').putImageData(e,0,0),s}function b(t){const s=document.createElement('canvas');s.width=20,s.height=20;const h=s.getContext('2d');var i=h.createRadialGradient(10,10,0,10,10,10);return i.addColorStop(t,'yellow'),i.addColorStop(1,'red'),h.fillStyle=i,h.beginPath(),h.arc(10,10,10,0,7),h.fill(),s}function p(t){const s=document.createElement('canvas');s.width=t.width,s.height=t.height;const h=s.getContext('2d');return h.scale(1,-1),h.drawImage(t,0,0,t.width,-t.height),s}const v=480,w=700,x=240,g=350;let y,H,k=!1,O=!1,q=-1,B=-1,S=[],D=!1,N=document.getElementById('a');const A=e(new t('piBbgDn4CZqlkqiF'),'ie7jMyCFouoUjkVs',60);a(A);const I=n(A),K=A.width,C=A.height,Q=A.getContext('2d').getImageData(0,0,K,C).data;let j,F,G,U,L,Y=[y,H,K,C,Q];(t=>{const s=document.createElement('canvas');s.width=32,s.height=32;const h=s.getContext('2d');let i,e;t.width>t.height?(i=32,e=32*t.height/t.width):(e=32,i=32*t.width/t.height),h.drawImage(t,0,0,i,e);const n=document.createElement('link');n.setAttribute('rel','icon'),n.setAttribute('href',s.toDataURL()),document.head.appendChild(n)})(A);const $=(()=>{const t=[A];for(let s=0;10>s;s++){const h=document.createElement('canvas'),i=h.getContext('2d');h.width=2*K,h.height=2*C;for(let s=0;3>s;s++)for(let h=0;3>h;h++)i.drawImage(t[0],Math.floor(K/2)-t.length-1+h,Math.floor(C/2)-t.length-1+s);i.globalCompositeOperation='source-in',i.fillStyle=s>5?'cyan':'blue',i.fillRect(0,0,h.width,h.height),i.globalCompositeOperation='source-over',i.drawImage(t[0],Math.floor(K/2)-t.length,Math.floor(C/2)-t.length),a(h),t.unshift(h)}return t.pop(),t.map(s=>{const h=s.getContext('2d');h.globalCompositeOperation='destination-out',h.globalAlpha=.2;for(let i=5;10>i;i++)h.drawImage(t[i],Math.floor((s.width-t[i].width)/2),Math.floor((s.height-t[i].height)/2))}),t.length=5,t})(),z=[],[P,T]=(()=>{const t=document.createElement('canvas');t.width=20,t.height=60;const s=t.getContext('2d');return s.fillStyle='yellow',s.beginPath(),s.moveTo(10,60),s.lineTo(20,10),s.arc(10,10,10,0,Math.PI,!0),s.lineTo(10,60),s.fill(),s.strokeStyle='cyan',s.shadowColor='blue',s.globalCompositeOperation='source-atop',s.shadowBlur=4,s.lineWidth=10,s.beginPath(),s.moveTo(10,70),s.lineTo(23,10),s.arc(10,10,13,0,Math.PI,!0),s.lineTo(10,70),s.stroke(),[t,s.getImageData(0,0,t.width,t.height).data]})(),X=(()=>{const t=[];for(let s=0;9>s;s++)t.push(b(s/10));for(let s=t.length-2;s>=1;s--)t.push(t[s]);return t})(),Z=X[0].getContext('2d').getImageData(0,0,X[0].width,X[0].height).data,[E,J]=(()=>{const t=document.createElement('canvas');t.width=60,t.height=60;const s=t.getContext('2d');var h=s.createRadialGradient(30,30,0,30,30,30);return h.addColorStop(.6,'navy'),h.addColorStop(1,'blue'),s.fillStyle=h,s.beginPath(),s.arc(30,30,30,0,7),s.fill(),[t,s.getImageData(0,0,t.width,t.height).data]})();let V,W,R,_=performance.now(),tt=0;const st=JSON.parse(self.localStorage.pnf_highscores||0)||[];let ht=-1;const it=(()=>{const t=document.createElement('canvas');t.width=100,t.height=100;const s=t.getContext('2d');s.font='bold 20px Helvetica',s.translate(50,50),s.rotate(-Math.PI/2),s.fillStyle='red',s.fillStyle='#fff',s.textAlign='center',s.textBaseline='middle',s.fillText('NEW!',0,0),a(t);const h=document.createElement('canvas');h.width=t.width+10,h.height=t.height+10;const i=h.getContext('2d');return i.fillStyle='red',i.fillRect(0,0,h.width,h.height),i.drawImage(t,5,5),h})();function et(t){W+=t,R=(new Intl.NumberFormat).format(W)}function nt(){const t=Math.max(400,1e3-25*V);Bt+=Ot.p(t,t+400)}let ot,at,ct,rt;function Mt(t){const s=t[0];a(s);const h=s.getContext('2d').getImageData(0,0,s.width,s.height).data,i=m(s),e=n(s);t[1]=h,t[2]=i,t[3]=e}const ft=[['c4pf4K5xHzu4CyZM','Wl9w64KNQvFNbbbU',50,10,.35,0,[]],['VTjHVRDIYTbXk766','a3QM5c7MnbQlWns3',80,30,.27,0,[]],['1fOXvyryYCvwBWPL','I4xttvPYWxB1So2A',230,80,.2,6,[]],['VsM4qdcBSiuCPDGJ','q4D72OvJMb23kSZC',60,20,.4,0,[]],['l4pyu8yF0mt84Q4u','jPU5GcKNpf2JMgoG',100,40,.35,0,[[g]]],['NMp3mtsPHIwzMKYk','dBzvSKo7wpema3S5',220,90,.22,9,[]],['o67yOby6izpasGgo','fyKKupDEId96qQHu',70,20,.5,0,[[g]]],['IU7xqL8UqZIXJQDQ','aVBO8buAfBbQ4DOY',100,40,.35,0,[[g,6]]],['LP6kUeGMn7S5xZzi','p5O7jAQK67mDULTD',230,100,.25,14,[]],['SsSvCKpjLVTGITYH','aOEjI2Owpqpl06ex',65,30,.5,0,[[g]]],['AGUwhB1E94wgKe49','pwUtokX7oS7ZKFK1',110,50,.35,6,[[g,6]]],['qRF6GA3xnzX0lMcH','RIdNudvB6T2ro7C3',240,120,.3,22,[]]];function lt(t,s){const h=s[0]-s[2]/2>t[0]-t[2]/2?[t,s]:[s,t],i=s[1]-s[3]/2>t[1]-t[3]/2?[t,s]:[s,t];if(h[0][0]+h[0][2]/2>h[1][0]-h[1][2]/2&&i[0][1]+i[0][3]/2>i[1][1]-i[1][3]/2){const e=Math.floor(h[1][0]-h[1][2]/2),n=Math.floor(i[1][1]-i[1][3]/2),o=Math.floor(Math.min(h[0][0]+h[0][2]/2,h[1][0]+h[1][2]/2))-e,a=Math.floor(Math.min(i[0][1]+i[0][3]/2,i[1][1]+i[1][3]/2))-n,c=e-Math.floor(t[0]-t[2]/2),r=n-Math.floor(t[1]-t[3]/2),M=e-Math.floor(s[0]-s[2]/2),f=n-Math.floor(s[1]-s[3]/2);for(let h=0;a>h;h++)for(let i=0;o>i;i++)if(t[4][4*((r+h)*t[2]+c+i)+3]>0&&s[4][4*((f+h)*s[2]+M+i)+3]>0)return!0}return!1}function ut(){L?(L--,M(...[.9,,119,,,.44,,.09,5.3,-4.2,,,,.7,-340,.1,.01,.85,.08])):j||(l(1),j=!0)}const dt=[['F','orange',t=>{G=t+6500}],['S','cyan',()=>{M(...[.5,,505,.21,.12,.46,2,1.67,,,58,.02,.28,,,,,.69,.03]),L++}],['B','red',t=>{l(1.5),U=t+1e3,Bt+=1500}]];class mt{constructor(t,s,h,i){this.x=t,this.y=s,this.type=h,this.T=i,this.X=0,this.Z=!0}J(t,s,h){if(this.y+=5*(h-this.T)/32,this.X=(this.X+1)%50,!j&&lt(Y,[this.x,this.y,E.width,E.height,J]))return dt[this.type][2](h),!1;if(this.y-Math.floor(E.height/2)>w)return!1;this.T=h,s.save(),s.translate(this.x,this.y),s.drawImage(E,-Math.floor(E.width/2),-Math.floor(E.height/2)),s.textAlign='center',s.textBaseline='top';let i=65;i+=25>this.X?this.X:50-this.X,s.font='700 '+Math.floor(i/2)+'px Helvetica';const e=s.measureText(dt[this.type][0]),n=e.actualBoundingBoxDescent-e.actualBoundingBoxAscent;return s.fillStyle=dt[this.type][1],s.fillText(dt[this.type][0],0,-Math.floor(n/2)),s.restore(),!0}}class bt{constructor(t,s,h){this.x=t,this.y=s,this.T=h,this.V=10}J(t,s,h){this.y-=20*(h-this.T)/32;const i=[this.x,this.y,P.width,P.height,T];for(let s=0;t.length>s;s++){const e=t[s];if(lt(i,e.W))return e.R(this.V,h),!1}return this.y+Math.floor(P.height/2)>=0&&(this.T=h,s.drawImage(P,this.x-Math.floor(P.width/2),this.y-Math.floor(P.height/2)),!0)}}class pt{constructor(t,s,h,i,e){this.time=e,this.U=t.U,this.canvas=t.canvas,this.Y=t.Y,this.$=t.$,this.P=t.P,this.angle=t.angle,this._=s,this.tt=h,this.st=i}J(t,s,h){const i=h-this.time;if(i>this.st)return!1;const e=this._+this.U[0]+this.$*Math.min(i,this.st)/this.st,n=this.tt+this.U[1]+this.P*Math.min(i,this.st)/this.st;return s.save(),s.globalAlpha=1-(Math.min(i,this.st)/this.st)**2,s.translate(e,n),s.rotate(this.angle*Math.min(i,this.st)/this.st),s.drawImage(this.canvas,this.Y[0]-this.U[0],this.Y[1]-this.U[1]),s.restore(),!0}}class vt{constructor(t,s,h,i,e,n){this.width=X[0].width,this.height=X[0].height,this.x=t,this.y=s;const o=Math.hypot(h-t,i-s);this.ht=(h-t)/o,this.it=(i-s)/o,this.T=n,this.speed=e,this.X=0,this.Z=!0,this.et()}J(t,s,h){if(U>h)return!1;const i=h-this.T;return this.y+=i*this.speed*this.it,this.x+=i*this.speed*this.ht,this.et(),!(lt(Y,this.W)&&(ut(),!j)||this.y-Math.floor(this.height/2)>w||0>this.y+Math.floor(this.height/2)||this.x-Math.floor(this.width/2)>v||0>this.x+Math.floor(this.width/2)||(this.T=h,this.X=(this.X+1)%X.length,s.drawImage(X[this.X],this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),0))}et(){this.W=[this.x,this.y,this.width,this.height,Z]}}function wt(t,s,h,i,e,n){const o=[];for(let a=0;t>a;a++){const c=i+2*a*Math.PI/t;o.push(new vt(s,h,s+Math.round(100*Math.cos(c)),h+Math.round(100*Math.sin(c)),e,n))}return o}class xt{constructor(t,s,h,i,e,n,o,a,c,r,M,f){this.nt=Ot.m(0,2*Math.PI),this.canvas=t,this.ot=s,this.at=h,this.width=t.width,this.height=t.height,this.ct=a,this.x=e,this.y=n,this.T=f,this.rt=0,this.Mt=i,this.speed=o,this.ft=c,this.lt=r,this.ut=M,this.et()}J(t,s,h){const i=this.y;let e=!1;if(0>=this.ct||U>h?e=!0:(this.y+=(h-this.T)*this.speed,this.et(),lt(Y,this.W)&&(ut(),j||(e=!0))),e)return l(this.width/275),et(this.ft),(this.lt>0?wt(this.lt,this.x,this.y+Math.round(17*this.speed),this.nt,.45,h):[]).concat(this.Mt.map(t=>(o(t,this.width,this.height),new pt(t,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),500,h))));if(this.y-Math.floor(this.height/2)>w)return!1;this.T=h;const n=h-this.rt;let a=0;if(400>n&&(a=(400-n)/400),s.save(),s.drawImage(this.canvas,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),a>0&&(s.globalAlpha=a,s.drawImage(this.at,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height)),s.restore(),!j)for(let t=0;this.ut.length>t;t++){const s=this.ut[t][0];if(s>i&&this.y>s){u();const s=this.ut[t][1],i=this.y+Math.round(17*this.speed);return s?[this,...wt(s,this.x,i,this.nt,.3,h)]:[this,new vt(this.x,i,y,H,.3,h)]}}return!0}et(){this.W=[this.x,this.y,this.width,this.height,this.ot]}R(t,s){this.rt=s,this.ct-=t,this.ct>0&&f()}}class gt{constructor(t,s){this.K=0,this.dt=s+2e3,this.ct=Number.MAX_SAFE_INTEGER,this.T=s,this.width=ot.width,this.height=ot.height,this.x=x,this.y=-this.height/2,this.direction=0,this.rt=0,this.bt=t,this.et()}J(t,s,h){let i=!1;if(this.ct>0){const t=h-this.T;0===this.K?h>this.dt&&(this.K=1):1===this.K?(this.y+=.15*t,this.y>150&&(this.y=150,this.ct=100+250*this.bt,this.K=2,this.vt=h,this.wt=0)):0===this.direction?(this.x+=.1*t,this.x+Math.floor(this.width/2)>v&&(this.x=v-Math.floor(this.width/2),this.direction=1)):(this.x-=.1*t,0>this.x-Math.floor(this.width/2)&&(this.x=Math.floor(this.width/2),this.direction=0)),this.et(),lt(Y,this.W)&&(j=!0)}else i=!0;if(i)return M(...[1.1,,369,,.1,1,2,.05,.4,,,,,.7,-1.3,.8,.37,.77,.04]),et(500*V),At=!1,St=h+1e4,Bt=500+h,nt(),Dt=500+h,rt.map(t=>(o(t,this.width,this.height),new pt(t,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),500,h)));this.T=h;const e=h-this.rt;let n=0;if(400>e&&(n=(400-e)/400),s.save(),s.drawImage(ot,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),n>0&&(s.globalAlpha=n,s.drawImage(ct,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height)),s.restore(),!j&&2===this.K&&h>this.vt){u();const t=[];if(5*this.bt>this.wt){let s,i;switch(Math.floor(this.wt/this.bt)){case 0:s=28,i=119;break;case 1:s=42,i=123;break;case 2:s=108,i=94;break;case 3:s=121,i=80;break;default:s=143,i=50}t.push(new vt(this.x-s,this.y+i,this.x-s,this.y+i+100,.5,h)),t.push(new vt(this.x+s,this.y+i,this.x+s,this.y+i+100,.5,h))}else t.push(new vt(this.x,this.y+125,y,H,.3,h));return this.wt++,10*this.bt>this.wt?this.vt=this.wt>5*this.bt?h+200:this.wt===5*this.bt?h+800:this.wt%this.bt?h+180:h+500:(this.wt=0,this.vt=h+800),[this,...t]}return!0}et(){this.W=[this.x,this.y,this.width,this.height,at]}R(t,s){this.rt=s,this.ct-=t,this.ct>0&&f()}}let yt,Ht,kt,Ot,qt,Bt,St,Dt,Nt,At,It,Kt=5;function Ct(t){let s,h,i,e;t.preventDefault(),N.offsetWidth/N.offsetHeight>.6857142857142857?(h=0,e=N.offsetHeight,i=e*v/w,s=Math.floor(N.offsetWidth-i)/2):(s=0,i=N.offsetWidth,e=i*w/v,h=Math.floor(N.offsetHeight-e)/2);let n={};n=t.changedTouches?t.changedTouches[0]:t,q=Math.floor((n.pageX-s)*v/i),B=Math.floor((n.pageY-h)*w/e)}self.ontouchstart=self.onpointerdown=t=>{k=!0,Ct(t)},self.ontouchmove=self.onpointermove=Ct,self.ontouchend=self.onpointerup=t=>{t.preventDefault(),k=!1},self.onkeydown=self.onkeyup=t=>{D=S[t.keyCode]=t.type[5]},N.width=v,N.height=w,N.getContext('2d'),requestAnimationFrame(function s(h){(s=>{switch(tt){case 0:case 1:(s=>{const h=N.getContext('2d');h.fillStyle='#000',h.fillRect(0,0,v,w);let i=(s-_)/3e3;h.save();for(let t=200;t--;){h.fillStyle=d[t%d.length];let s=50/(6-(i+t/13)%6);h.globalAlpha=Math.min(s/100,1),h.beginPath(),h.arc(Math.cos(t)*s+x,Math.sin(t*t)*s+g,s/200,0,7),h.fill()}if(h.restore(),h.fillStyle='#fff',h.textBaseline='middle',h.textAlign='center',1===tt){if(0===st.length)h.font='bold 40px Helvetica',h.fillText('PLANET NOT FOUND',x,g);else{h.font='bold 30px Helvetica',h.fillText('HIGH SCORES',x,100),h.save(),h.textAlign='start',h.textBaseline='top';for(let t=0;st.length>t;t++){t===ht?(h.save(),h.translate(90,185+80*t),h.drawImage(it,-Math.floor(it.width/2),-Math.floor(it.height/2)),h.restore(),h.fillStyle='gold'):h.fillStyle='#fff';const s=Intl.NumberFormat().format(st[t][0]),i=new Date(st[t][1]).toLocaleString();h.font='50px Helvetica',h.fillText(t+1+'',115,160+80*t),h.font='60px Helvetica',h.fillText('{',145,150+80*t),h.font='25px Helvetica',h.fillText(s+' points',170,160+80*t),h.font='15px Helvetica',h.fillText(i,170,190+80*t)}h.restore()}h.font='20px Helvetica',h.fillText('<Press anywhere or any key to play>',x,670),k||D?O||(tt=2,V=0,Ot=new t('enemy'),qt=new t('powerup'),Bt=1e3,St=5e3,Dt=9e3,Nt=0,kt=0,yt=[],Ht=[],_=performance.now(),It=performance.now(),W=0,et(0),j=!1,y=x,H=630,G=0,U=0,L=1,At=!1,ht=-1):O=!1}else if(h.font='italic 30px Helvetica',h.fillText('Loading…',x,g),ot)if(ft.length>z.length)z.push(((s,h,i,...n)=>[p(e(new t(s),h,i)),void 0,void 0,void 0,...n])(...ft[z.length]));else{let t=!0;for(let s=0;t&&z.length>s;s++)z[s][1]||(t=!1,Mt(z[s]));t&&(tt=1)}else ot=p(e(new t('HYj7ADLjQr6icLtO'),'CdiB9N2ZoQWuAxur',270)),a(ot),ct=m(ot),rt=n(ot),at=ot.getContext('2d').getImageData(0,0,ot.width,ot.height).data})(s);break;case 2:(t=>{const s=t-It;if(It=t,s>160)return _+=s,void(S=[]);if(!j){const t=.6*s,h=S[38]||S[90],i=S[40]||S[83],e=S[37]||S[65],n=S[39]||S[68];if(h||i||e||n){const s=(h||i)&&(e||n)?(t**2/2)**.5:t;h&&(H-=s),i&&(H+=s),e&&(y-=s),n&&(y+=s),q=y,B=H}else{let s=q-y,h=B-H;const i=Math.hypot(s,h);t>i?(y=q,H=B):(y+=s/i*t,H+=h/i*t)}0>y-Math.floor(K/2)?y=Math.floor(K/2):y+Math.floor(K/2)>v&&(y=v-Math.floor(K/2)),0>H-Math.floor(C/2)?H=Math.floor(C/2):H+Math.floor(C/2)>w&&(H=w-Math.floor(C/2)),Y=[y,H,K,C,Q]}const h=N.getContext('2d');let i;h.fillStyle='#000',h.fillRect(0,0,v,w);for(let s=100;s--;h.fillStyle=d[s%d.length],h.beginPath(),h.arc(Math.floor(-60*(100-s)*(y-K/2)/(100*(v-K)))+102797*(1+Math.sin(i))*s%540,w*(Math.tan(s/9)+i*(t-_)/3e3)%w,3.3*(i-.3),0,7),h.fill())i=150/(3*s+200);const e=j,n=[],a=[],c=[];function r(s){const i=s.J(Ht,h,t-_);'boolean'==typeof i?i&&(s.Z?a.push(s):n.push(s),s.R&&c.push(s)):Array.isArray(i)&&i.forEach(t=>{s===t?i&&(s.Z?a.push(s):n.push(s),s.R&&c.push(s)):r(t)})}if(yt.forEach(r),!e&&j&&(F=t-_,I.map(s=>(o(s,K,C),new pt(s,y-Math.floor(K/2),H-Math.floor(C/2),1500,t-_))).forEach(r)),yt=n.concat(a),Ht=c,h.fillStyle='#fff',h.textAlign='center',j)h.save(),h.globalAlpha=Math.min(1,(t-_-F)/2e3),h.textBaseline='middle',h.font='40px Helvetica',h.fillText('Game Over',x,g),h.restore();else{if(L){const t=$[Math.max(0,$.length-L)];h.drawImage(t,y-Math.floor(t.width/2),H-Math.floor(t.height/2))}h.drawImage(A,y-Math.floor(K/2),H-Math.floor(C/2))}U>t-_&&(h.save(),h.globalAlpha=(U-t+_)/1e3,h.fillRect(0,0,v,w),h.restore()),h.textBaseline='top',h.font='16px Helvetica',h.fillText(R,x,5);const f=G>t-_;if(!j&&t-_>kt+(f?100:200)&&(Kt=-Kt,yt.push(new bt(y+(f?Kt:0),H-Math.floor(C/2),t-_)),kt=Math.max(t-_),M(...[.04,,292,.02,.01,.08,3,.1,-3.9,,,,,,,,,.74,.04,.43])),t-_>St&&!At&&(V++,V%5?St=t-_+1e4:(At=!0,yt.push(new gt(Math.floor(V/5),t-_)))),t-_>Dt&&!At&&(yt.push(new mt(qt.p(30,450),Math.floor(-E.height/2),Nt,t-_)),Nt=(Nt+1)%dt.length,Dt=t-_+9e3),t-_>Bt&&!At){const s=Ot.p(Math.min(Math.max(V-2,0),z.length-3),Math.min(V,z.length-1)),[h,i,e,n,o,a,c,r]=z[s];yt.push(new xt(h,i,e,n,Ot.p(30,450),Math.floor(-h.height/2),a,o,50*(s+1),c,r,t-_)),nt()}j&&t-_>F+3500&&((()=>{if(W){const t=[W,Date.now()];st.push(t),st.sort((t,s)=>{const h=s[0]-t[0];return 0===h?s[1]-t[1]:h}),st.length=Math.min(st.length,5),ht=st.indexOf(t),self.localStorage.pnf_highscores=JSON.stringify(st)}})(),tt=1,O=k)})(s)}D=!1})(h),requestAnimationFrame(s)})}();
