!function(){"use strict";class t{constructor(t){this.t=0,this.h=0,this.i={},this.seed=t,this.seed.length<8&&(this.seed="padding_"+this.seed),this.seed.length%2==0&&(this.seed="1"+this.seed),this.o=[2972948403,3086140710,2071788248,3026137486,1411764137,2265725585,2923087685,1593177610],this.M=3234042090;for(var s=this.seed.length-1;s>=0;s--){var h=this.seed.charCodeAt(s);this.M=((this.M<<5)+this.M^h^this.M<<h%13+1^this.M>>h%17+1)>>>0,this.o[s%8]^=((this.M>>9)*(this.M%16384+3427)^h)>>>0}}u(){var t=this.seed.charCodeAt(this.t),s=this.o[this.h];return this.M=((this.M<<5)+this.M+s^t^this.M<<t%17+1^this.M>>t%13+1)>>>0,this.o[this.h]=(s>>3^s<<t%19+1^this.M%134217728*3427)>>>0,this.t=(this.t+1)%this.seed.length,this.h=(this.h+1)%8,this.M}l(t){const s=[1160605769,1424711319,876532818,1419174464];let h=1206170165;if(null==t&&(t="?/?/?/",h=3379896793),this.i.hasOwnProperty(t))return this.i[t];for(var i=t.length-1;i>=0;i--){const n=t.charCodeAt(i);let e=s[0]^n;e=(e^e<<11)>>>0,e=(e^e>>8)>>>0,s[0]=s[1],s[1]=s[2],s[2]=s[3],s[3]=(s[3]^s[3]>>19^e)>>>0,h=3427*(h^n<<24)^s[3]}for(var n=this.seed.length-1;n>=0;n--){const t=this.seed.charCodeAt(n);let i=s[0]^t;i=(i^i<<11)>>>0,i=(i^i>>8)>>>0,s[0]=s[1],s[1]=s[2],s[2]=s[3],s[3]=(s[3]^s[3]>>19^i)>>>0,h=3427*(h^t<<24)^s[3]}return this.i[t]=h>>>0,this.i[t]}m(t,s){return(4294967296*this.u()+this.u())/0x10000000000000000*(s-t)+t}v(t,s){return Math.floor(this.m(t,s+1))}p(t){return this.m(0,1)<t}g(t,s,h){return(4294967296*this.l(h)+this.l(h+"@"))/0x10000000000000000*(s-t)+t}k(t,s,h){return Math.floor(this.g(t,s+1,h))}H(t,s){return this.g(0,1,s)<t}O(t){return this.p(t)?-1:1}q(t,s){for(var h=0;this.p(t)&&h<s;)h++;return h}B(t,s,h){for(var i=0;(4294967296*this.l(h+i)+this.l(h+"@"+i))/0x10000000000000000<t&&i<s;)i++;return i}S(t){let s=0;for(let h=0;h<t.length;h++)s+=t[h];let h=this.m(0,s);for(let s=0;s<t.length;s++)if(h-=t[s],h<0)return s;return 0}D(t,s){let h=0;for(let s=0;s<t.length;s++)h+=t[s];let i=this.g(0,h,s);for(let s=0;s<t.length;s++)if(i-=t[s],i<0)return s;return 0}}function s(t,s,h){return Math.max(s,Math.min(h,t))}function h(t){var h=Math.floor(255*s(t,0,1)).toString(16);return h.length<2&&(h="0"+h),h}function i(t){return"#"+h(t[0])+h(t[1])+h(t[2])}function n(t,s){return i([t[0]*s,t[1]*s,t[2]*s])}function e(t){var s=t[1]*t[2],h=t[2]-s,i=(t[0]%1+1)%1*6,n=Math.floor(i),e=s*(1-Math.abs(i%2-1));switch(n){case 0:return[s+h,e+h,h];case 1:return[e+h,s+h,h];case 2:return[h,s+h,e+h];case 3:return[h,e+h,s+h];case 4:return[e+h,h,s+h];default:return[s+h,h,e+h]}}function o(t,h,i){const[n,e]=h;let o=n[i.S(e)];return i.p(t.g(0,.5,"base color shift chance")**2)&&(o=[o[0],o[1],o[2]],o[0]=s(o[0]+t.g(0,.6,"base color shift range red")**2*s(i.m(-1,1.2),0,1)*s(i.O(.7)+i.O(.7),-1,1),0,1),o[1]=s(o[1]+t.g(0,.6,"base color shift range green")**2*s(i.m(-1,1.2),0,1)*s(i.O(.7)+i.O(.7),-1,1),0,1),o[2]=s(o[2]+t.g(0,.6,"base color shift range blue")**2*s(i.m(-1,1.2),0,1)*s(i.O(.7)+i.O(.7),-1,1),0,1)),o}function c(t,s){return 1-s[1]/t}function a(t,s,h,i){let n=Math.min(1,1-Math.abs(h[0]-t)/t);return i&&(n=Math.min(n,1-Math.abs(h[1]-s)/s)),n}function r(t,s,h,i,n,e,o){return a(i,n,e,!0)*(1-1/((s+h)/1e3+1))*t.g(0,1,"master bigness")**.5*(1-o)}function f(t,s,h){return[Math.min(h[0][0]-0,t-0-h[1][0]),Math.min(h[0][1]-0,s-0-h[1][1])]}function M(t,h,i,n){const e=t.createLinearGradient(i[0],i[1],2*h[0]-i[0],2*h[1]-i[1]),o=`rgba(0,0,0,${s(n,0,1)})`;return e.addColorStop(0,o),e.addColorStop(.5,"rgba(0,0,0,0)"),e.addColorStop(1,o),e}const u=[function(t,h,i,e,c,a,u,l,m,d,b,v,p,w){let g=8;const x=r(i,e,c,a,u,m,p/w)**.3;if(h.p(i.g(0,.9,"com0 bigchance")*x)){const t=i.g(0,.5,"com0 bigincchance");for(;h.p(t*x);){const t=f(e,c,[[m[0]-g,m[1]-g],[m[0]+g,m[1]+g]]);if(!(Math.min(t[0],t[1])>.5*g))break;g*=1.5}}const y=2*g,k=[Math.ceil(h.m(1,Math.max(2,.5*g))),Math.ceil(h.m(1,Math.max(2,.5*g)))],H=Math.min(k[0],k[1])*h.m(.1,1.2),O=[k[0]+2*H,k[1]+2*H],q=[Math.ceil(y/O[0]),Math.ceil(y/O[1])],B=[Math.round(q[0]*O[0]/2),Math.round(q[1]*O[1]/2)],S=o(i,b,h),D=n(S,h.m(.4,1)),N=n(S,h.m(.4,1));t.fillStyle="rgba(0,0,0,"+h.m(0,.25)+")",t.fillRect(m[0]-B[0]-1,m[1]-B[1]-1,O[0]*q[0]+2,O[1]*q[1]+2),t.fillStyle=N,t.fillRect(m[0]-B[0],m[1]-B[1],O[0]*q[0],O[1]*q[1]),t.fillStyle=D;for(let s=0;s<q[0];s++){const h=m[0]+H+s*O[0]-B[0];for(let s=0;s<q[1];s++)t.fillRect(h,m[1]+H+s*O[1]-B[1],k[0],k[1])}h.p(s(g/8*(.6*p/w+.3),0,.98))&&(t.fillStyle=M(t,m,[m[0]+B[0],m[1]],h.m(0,.9)),t.fillRect(m[0]-B[0],m[1]-B[1],O[0]*q[0],O[1]*q[1]))},function(t,h,i,e,c,a,u,l,m,d,b,v,p,w){let g=8;const x=r(i,e,c,a,u,m,p/w)**.2;if(h.p(i.g(.3,1,"com1 bigchance")*x)){const t=i.g(0,.6,"com1 bigincchance");for(;h.p(t*x);){const t=f(e,c,[[m[0]-g,m[1]-g],[m[0]+g,m[1]+g]]);if(!(Math.min(t[0],t[1])>g/2))break;g*=1.5}}let y=Math.ceil(h.m(.8,2)*g);const k=Math.ceil(h.m(.8,2)*g),H=h.v(3,Math.max(4,y)),O=Math.max(1,Math.round(y/H));y=O*H;const q=n(o(i,b,h),h.m(.5,1)),B=h.m(.3,.9);if(h.p(s(i.g(-.2,1.2,"com1 hchance"),0,1))){const s=[m[0]-Math.floor(y/2),m[1]-Math.floor(k/2)];t.fillStyle="rgba(0,0,0,"+h.m(0,.25)+")",t.fillRect(s[0]-1,s[1]-1,y+2,k+2),t.fillStyle=q,t.fillRect(s[0],s[1],y,k);for(let h=0;h<O;h++)t.fillStyle=M(t,[s[0]+(h+.5)*H,m[1]],[s[0]+h*H,m[1]],B),t.fillRect(s[0]+h*H,s[1],H,k)}else{const s=[m[0]-Math.floor(k/2),m[1]-Math.floor(y/2)];t.fillStyle="rgba(0,0,0,"+h.m(0,.25)+")",t.fillRect(s[0]-1,s[1]-1,k+2,y+2),t.fillStyle=q,t.fillRect(s[0],s[1],k,y);for(let h=0;h<O;h++)t.fillStyle=M(t,[m[0],s[1]+(h+.5)*H],[m[0],s[1]+h*H],B),t.fillRect(s[0],s[1]+h*H,y,H)}},function(t,h,i,e,c,a,M,u,l,m,d,b,v,p){let w=8;const g=r(i,e,c,a,M,l,v/p)**.05;if(h.p(i.g(0,1,"com2 bigchance")*g)){const t=i.g(0,.9,"com2 bigincchance");for(;h.p(t*g);){const t=f(e,c,[[l[0]-w,l[1]-w],[l[0]+w,l[1]+w]]);if(!(Math.min(t[0],t[1])>.5*w))break;w*=1.5}}const x=Math.ceil(h.m(.6,1.4)*w),y=Math.ceil(h.m(1,2)*w),k=[Math.ceil(s(x*h.m(.7,1)/2,1,x)),Math.ceil(s(x*h.m(.8,1)/2,1,x))],H=[Math.floor(s(x*h.m(.05,.25),1,y)),Math.floor(s(x*h.m(.1,.3),1,y))],O=H[0]+H[1],q=h.p(i.g(0,1,"com2 oddchance")**.5),B=s(Math.floor(y/O),1,y),S=B*O+(q?H[0]:0),D=o(i,d,h),N=h.m(.6,1),I=h.m(.6,1),K=[n(D,N),n(D,I)],A=1-h.m(.5,.95),Q=[n(D,A*N),n(D,A*I)];if(h.p(i.g(0,1,"com2 verticalchance")**.1)){const s=t.createLinearGradient(l[0]-k[0],l[1],l[0]+k[0],l[1]),h=t.createLinearGradient(l[0]-k[1],l[1],l[0]+k[1],l[1]);s.addColorStop(0,Q[0]),s.addColorStop(.5,K[0]),s.addColorStop(1,Q[0]),h.addColorStop(0,Q[1]),h.addColorStop(.5,K[1]),h.addColorStop(1,Q[1]);const i=Math.floor(l[1]-S/2);for(let n=0;n<B;n++)t.fillStyle=s,t.fillRect(l[0]-k[0],i+n*O,2*k[0],H[0]),t.fillStyle=h,t.fillRect(l[0]-k[1],i+n*O+H[0],2*k[1],H[1]);q&&(t.fillStyle=s,t.fillRect(l[0]-k[0],i+B*O,2*k[0],H[0]))}else{const s=t.createLinearGradient(l[0],l[1]-k[0],l[0],l[1]+k[0]),h=t.createLinearGradient(l[0],l[1]-k[1],l[0],l[1]+k[1]);s.addColorStop(0,Q[0]),s.addColorStop(.5,K[0]),s.addColorStop(1,Q[0]),h.addColorStop(0,Q[1]),h.addColorStop(.5,K[1]),h.addColorStop(1,Q[1]);const i=Math.floor(l[0]-S/2);for(let n=0;n<B;n++)t.fillStyle=s,t.fillRect(i+n*O,l[1]-k[0],H[0],2*k[0]),t.fillStyle=h,t.fillRect(i+n*O+H[0],l[1]-k[1],H[1],2*k[1]);q&&(t.fillStyle=s,t.fillRect(i+B*O,l[1]-k[0],H[0],2*k[0]))}},function(t,s,h,e,o,a,M,l,m,d,b,v,p,w,g){if(s.p(c(o,m)-.3)||g(m[0],m[1]+6*1.2)>0||g(m[0],m[1]+10.8)>0)for(let i=0;i<100;i++){const i=s.S(d);if(3!=i)return void u[i](t,s,h,e,o,a,M,l,m,d,b,v,p,w,g)}let x=8;const y=r(h,e,o,a,M,m,p/w)**.1;if(s.p(h.g(.6,1,"com3 bigchance")*y)){const t=h.g(.3,.8,"com3 bigincchance");for(;s.p(t*y);){const t=f(e,o,[[m[0]-x,m[1]-x],[m[0]+x,m[1]+x]]);if(!(Math.min(t[0],t[1])>.5*x))break;x*=1.5}}const k=s.m(1,2)*x;let H=Math.ceil(s.m(.3,1)*x);const O=k*s.m(.25,.6),q=(k+O)/2/2,B=[Math.max(1,Math.ceil(H*s.m(.08,.25))),Math.max(1,Math.ceil(H*s.m(.03,.15)))],S=B[0]+B[1],D=Math.ceil(H/S);H=D*S+B[0];const[N,I]=b,K=N[h.D(I,"com3 basecolor")],A=h.g(.5,.8,"com3 lightness0 mid"),Q=A-h.g(.2,.4,"com3 lightness0 edge"),j=h.g(0,.2,"com3 lightness1 edge"),C=[t.createLinearGradient(m[0]-q,m[1],m[0]+q,m[1]),t.createLinearGradient(m[0]-q,m[1],m[0]+q,m[1])];C[0].addColorStop(0,n(K,Q)),C[0].addColorStop(.5,n(K,A)),C[0].addColorStop(1,n(K,Q)),C[1].addColorStop(0,n(K,j)),C[1].addColorStop(.5,i(K)),C[1].addColorStop(1,n(K,j));const F=Math.ceil(m[1]-H/2);t.fillStyle=C[0],t.beginPath(),t.moveTo(m[0]-O/2,F),t.lineTo(m[0]+O/2,F),t.lineTo(m[0]+k/2,F+H),t.lineTo(m[0]-k/2,F+H),t.fill(),t.fillStyle=C[1];const G=[F+B[0],F+S];for(let s=0;s<D;s++){const h=[s*S+B[0],(s+1)*S],i=[G[0]+s*S,G[1]+s*S],n=[(O+h[0]/H*(k-O))/2,(O+h[1]/H*(k-O))/2];t.beginPath(),t.moveTo(m[0]-n[0],i[0]),t.lineTo(m[0]+n[0],i[0]),t.lineTo(m[0]+n[1],i[1]),t.lineTo(m[0]-n[1],i[1]),t.fill()}},function(t,s,h,i,e,c,r,f,M,l,m,d,b,v,p){const w=a(c,r,M,!1),g=s.m(.7,1),x=s.m(0,.2),y=o(h,m,s),k=n(y,g),H=n(y,x),O=Math.max(3,Math.ceil(f*s.m(.4,1)**2*h.g(.02,.1,"com4 maxwidth"))),q=Math.floor(O/2),B=O%2,S=1*h.g(0,1,"com4 directionc0")**4,D=.1*h.g(0,1,"com4 directionc1")**4,N=.2*h.g(0,1,"com4 directionc2")**4,I=s.S([S*(2-w),D,N*(1+w)]);let K=null;if(I){if(1==I){const n=Math.min(Math.max(8,e-(0+M[1])-s.v(0,16)),Math.floor(.6*f*s.m(0,1)**h.g(2,7,"com4 hpower1"))),o=M[0]-q,c=M[1],a=t.createLinearGradient(o,c,M[0]+q+B,c);a.addColorStop(0,H),a.addColorStop(.5,k),a.addColorStop(1,H),t.fillStyle=a,t.fillRect(o,c,i,n),K=[M[0],M[1]+n]}else if(2==I){const s=t.createLinearGradient(M[0],M[1]-q,M[0],M[1]+q+B);s.addColorStop(0,H),s.addColorStop(.5,k),s.addColorStop(1,H),t.fillStyle=s,t.fillRect(M[0],M[1]-q,Math.ceil(c-M[0])+1,i),K=[c,M[1]]}}else{const i=Math.min(Math.max(8,M[1]-0-s.v(0,16)),Math.floor(.7*f*s.m(0,1)**h.g(2,6,"com4 hpower0"))),n=M[0]-q,e=M[1]-i,o=t.createLinearGradient(n,e,M[0]+q+B,e);o.addColorStop(0,H),o.addColorStop(.5,k),o.addColorStop(1,H),t.fillStyle=o,t.fillRect(n,e,O,i),K=[M[0],M[1]-i]}const A=[.6*h.g(0,1,"com4 covercomc0")**2,.2*h.g(0,1,"com4 covercomc1")**2,h.g(0,1,"com4 covercomc2")**2];if(u[s.S(A)](t,s,h,i,e,c,r,f,M,l,m,d,b,v,p),p(K[0],K[1])>0){const n=[K[0]+Math.round(6*s.m(-1,1)),K[1]+Math.round(6*s.m(-1,1))];p(n[0],n[1])>0?u[s.S(A)](t,s,h,i,e,c,r,f,n,l,m,d,b,v,p):u[s.S(A)](t,s,h,i,e,c,r,f,K,l,m,d,b,v,p)}},function(t,s,h,i,e,c,a,M,u,l,m,d,b,v){let p=8;const w=r(h,i,e,c,a,u,b/v)**.1;if(s.p(h.g(0,.9,"com5 bigchance")*w)){const t=h.g(0,.8,"com5 bigincchance");for(;s.p(t*w);){const t=f(i,e,[[u[0]-p,u[1]-p],[u[0]+p,u[1]+p]]);if(!(Math.min(t[0],t[1])>.5*p))break;p*=1.5}}const g=s.m(.75,1),x=s.m(0,.25),y=o(h,m,s),k=n(y,g),H=n(y,x),O=1+s.q(h.g(0,1,"com5 multxc"),Math.floor(1.2*(p/8)**.6)),q=1+s.q(h.g(0,1,"com5 multyc"),Math.floor(1.2*(p/8)**.6)),B=s.m(.5,1)*p/Math.max(O,q),S=B+.5,D=B+1,N=.2*B,I=[u[0]-B*O,u[1]-B*q];t.fillStyle="rgba(0,0,0,"+s.m(0,.2)+")";for(let s=0;s<O;s++){const h=I[0]+(2*s+1)*B;for(let s=0;s<q;s++){const i=I[1]+(2*s+1)*B;t.beginPath(),t.arc(h,i,D,0,2*Math.PI),t.fill()}}for(let s=0;s<O;s++){const h=I[0]+(2*s+1)*B;for(let s=0;s<q;s++){const i=I[1]+(2*s+1)*B,n=t.createRadialGradient(h,i,N,h,i,S);n.addColorStop(0,k),n.addColorStop(1,H),t.fillStyle=n,t.beginPath(),t.arc(h,i,S,0,2*Math.PI),t.fill()}}},function(t,s,h,i,e,a,M,l,m,d,b,v,p,w,g){if(v<=0||s.p(c(e,m)))return void u[s.S(d.slice(0,6))](t,s,h,i,e,a,M,l,m,d,b,v,p,w,g);let x=8;const y=r(h,i,e,a,M,m,p/w)**.05;if(s.p(h.g(0,.9,"com6 bigchance")*y)){const t=h.g(0,.8,"com6 bigincchance");for(;s.p(t*y);){const t=f(i,e,[[m[0]-x,m[1]-x],[m[0]+x,m[1]+x]]);if(!(Math.min(t[0],t[1])>.5*x))break;x*=1.5}}const k=Math.ceil(2*x*s.m(.6,1)),H=Math.floor(k/2),O=k%2,q=k*s.m(h.g(0,.8,"com6 h1min")**.5,.9)**h.g(.5,1.5,"com6 h1power"),B=Math.floor(q/2),S=k%2,D=Math.max(0-(k-q)/2,k*(s.m(0,.45)+s.m(0,.45))*(h.H(.8,"com6 backnesstype")?h.g(.2,.9,"com6 backness#pos"):h.g(-.2,-.05,"com6 backness#neg"))),N=Math.ceil(x*s.m(.7,1)*h.g(.1,3.5,"com6 width")**.5),I=Math.floor(N/2),K=N%2,A=[[m[0]-I,m[1]+D-B],[m[0]+I+K,m[1]-H],[m[0]+I+K,m[1]+H+O],[m[0]-I,m[1]+D+B+S]],Q=o(h,b,s);t.fillStyle="rgba(0,0,0,"+s.m(0,.2)+")",t.beginPath(),t.moveTo(A[0][0]-1,A[0][1]),t.lineTo(A[1][0]-1,A[1][1]),t.lineTo(A[2][0]-1,A[2][1]),t.lineTo(A[3][0]-1,A[3][1]),t.fill(),t.fillStyle=n(Q,s.m(.7,1)),t.beginPath(),t.moveTo(A[0][0],A[0][1]),t.lineTo(A[1][0],A[1][1]),t.lineTo(A[2][0],A[2][1]),t.lineTo(A[3][0],A[3][1]),t.fill()}],l=[function(t,h,i,n,e,o,c){const a=(i-0)*(n-0)*.05,r=Math.ceil((i-0)*h.g(.1,1,"outline0 iw")*.2),f=[[[e-r,0],[e+r,n-0]]],M=2+Math.floor(t.m(.5,1)*h.g(2,8,"outline0 bc")*Math.sqrt(o));for(let e=1;e<M;e++){const e=f[t.v(0,f.length-1)],o=[e[0][0]+t.m(0,1)*(e[1][0]-e[0][0]),e[0][1]+t.m(0,1)*(e[1][1]-e[0][1])];o[1]<.5*(e[0][1]+e[1][1])&&t.p(h.g(.5,1.5,"outline0 frontbias"))&&(o[1]=e[1][1]-(o[1]-e[0][1]));const c=[s(t.m(0,1)*i,0,i-0),s(t.m(0,1)*n,0,n-0)],r=a/Math.abs((c[0]-o[0])*(c[1]-o[1]));if(r<1&&(c[0]=o[0]+(c[0]-o[0])*r,c[1]=o[1]+(c[1]-o[1])*r),o[0]>c[0]){const t=o[0];o[0]=c[0],c[0]=t}if(o[1]>c[1]){const t=o[1];o[1]=c[1],c[1]=t}f.push([[Math.floor(o[0]),Math.floor(o[1])],[Math.ceil(c[0]),Math.ceil(c[1])]])}c.fillStyle="#fff";for(let t=0;t<f.length;t++){const s=f[t];c.fillRect(s[0][0],s[0][1],s[1][0]-s[0][0],s[1][1]-s[0][1]),c.fillRect(i-s[1][0],s[0][1],s[1][0]-s[0][0],s[1][1]-s[0][1])}},function(t,s,h,i,n,e,o){const c=Math.max(2,Math.sqrt((h-0)*(i-0)*.05/Math.PI)),a=Math.ceil((h-0)*s.g(.1,1,"outline1 iw")*.2),r=[],f=Math.floor((i-0)/(2*a));for(let t=0;t<f;t++)r.push({N:[n,i-(0+a*(2*t+1))],r:a});const M=f+Math.floor(t.m(.5,1)*s.g(10,50,"outline1 cc")*Math.sqrt(e));for(let n=f;n<M;n++){const n=r[Math.max(t.v(0,r.length-1),t.v(0,r.length-1))];let e=t.m(1,c);const o=t.m(Math.max(0,n.r-e),n.r);let a=t.m(0,2*Math.PI);a>Math.PI&&t.p(s.g(.5,1.5,"outline1 frontbias"))&&(a=t.m(0,Math.PI));let f=[n.N[0]+Math.cos(a)*o,n.N[1]+Math.sin(a)*o];e=Math.min(e,f[0]-0,h-0-f[0],f[1]-0,i-0-f[1]),r.push({N:f,r:e})}o.fillStyle="#fff";for(let t=0;t<r.length;t++){const s=r[t];o.beginPath(),o.arc(s.N[0],s.N[1],s.r,0,2*Math.PI),o.fill(),o.beginPath(),o.arc(h-s.N[0],s.N[1],s.r,0,2*Math.PI),o.fill()}},function(t,s,h,i,n,e,o){const c=[h-0,i-0],a=[[n,t.m(0,.05)*c[1]+0],[n,t.m(.95,1)*c[1]+0]],r=6/e+s.g(.03,.1,"outline2 basefatness"),f=Math.max(3,Math.ceil(1/r*t.m(.05,.1)*Math.sqrt(e)));o.lineCap=["round","square"][s.k(0,1,"outline2 linecap")],o.strokeStyle="#fff";for(let i=1;i<f;i++){let n=a[i];null==n&&(n=[t.m(0,1)*c[0]+0,t.m(0,1)**s.g(.1,1,"outline2 frontbias")*c[1]+0],a.push(n));const f=1+t.q(s.g(0,1,"outline2 conadjust"),3);for(let s=0;s<f;s++){const s=a[t.v(0,a.length-2)];o.lineWidth=t.m(.7,1)*r*e,o.beginPath(),o.moveTo(s[0],s[1]),o.lineTo(n[0],n[1]),o.stroke(),o.beginPath(),o.moveTo(h-s[0],s[1]),o.lineTo(h-n[0],n[1]),o.stroke()}}}];function m(t,s,h){return s<0||s>t.width||h<0||h>t.height?-1:t.data[4*(h*t.width+s)+3]}function d(s){return new t(s)}function b(h,i,n){return function(h,i,n){const o=function(t){const s=[];return s[0]=.8*t.m(.001,1)*2**t.m(0,8),s[1]=.9*t.m(.01,1)*2**t.m(0,8),s[2]=1*t.m(.001,1)*2**t.m(0,8),s[3]=3*t.m(0,1)*2**t.m(0,8),s[4]=.5*t.m(0,1)*2**t.m(0,8),s[5]=.05*t.m(0,1)*2**t.m(0,8),s[6]=.5*t.m(0,1)*2**t.m(0,8),s}(h),c=function(t){const h=[],i=[],n=1+(t.H(.7,"base color +1")?1:0)+t.B(.3,3,"base color count");for(let o=0;o<n;o++){const n="base color"+o;h.push(e([t.g(0,1,n+"hue")**2,s(t.g(-.2,1,n+"saturation"),0,t.g(0,1,n+"saturation bound")**4),s(t.g(.7,1.1,n+"value"),0,1)])),i.push(2**t.g(0,6,n+"chances"))}return[h,i]}(h),a=new t(h.seed+i);n=null==n?a.m(h.g(2.5,3.5,"size min"),h.g(5,7,"size max"))**3:n;const r=a.m(h.g(.5,1,"wratio min"),h.g(1,1.3,"wratio max")),f=a.m(h.g(.7,1,"hratio min"),h.g(1.1,1.7,"hratio max")),M=Math.floor(n*r)+0,d=Math.floor(M/2),b=Math.floor((M-0)/6),v=.5*(M-6*b),p=Math.floor(n*f)+0,w=Math.floor(p/2),g=Math.floor((p-0)/6),x=.5*(p-6*g),y=document.createElement("canvas");y.width=M,y.height=p;const k=y.getContext("2d");l[h.D([1,1,1],"outline type")](a,h,M,p,d,n,k);const H=k.getImageData(0,0,M,p),O=[];for(let t=0;t<b;t++){O[t]=[];for(let s=0;s<g;s++)O[t][s]={I:t,K:s,x:Math.floor(v+6*(t+.5)),y:Math.floor(x+6*(s+.5)),A:0}}const q=[O[Math.floor(b/2)][Math.floor(g/2)]];let B=0;for(;B<q.length;){const t=q[B];if(t.I>0){const s=O[t.I-1][t.K];0==s.A&&(m(H,s.x,s.y)>0?(s.A=1,q.push(s)):s.A=-1)}if(t.I<b-1){const s=O[t.I+1][t.K];0==s.A&&(m(H,s.x,s.y)>0?(s.A=1,q.push(s)):s.A=-1)}if(t.K>0){const s=O[t.I][t.K-1];0==s.A&&(m(H,s.x,s.y)>0?(s.A=1,q.push(s)):s.A=-1)}if(t.K<g-1){const s=O[t.I][t.K+1];0==s.A&&(m(H,s.x,s.y)>0?(s.A=1,q.push(s)):s.A=-1)}B++}for(let t=0;t<q.length;t++){const s=q[t],h=O[b-1-s.I][s.K];1!=h.A&&(h.A=1,q.push(h))}const S=h.k(1,2,"base component passes"),D=Math.max(1,Math.floor(q.length*h.g(0,1/S,"extra component amount"))),N=S*q.length+D,I=document.createElement("canvas");I.width=M,I.height=p;const K=I.getContext("2d");function A(t,s){const h=Math.floor((t-v)/6),i=Math.floor((s-x)/6);return h<0||h>=b||i<0||i>=g?0:O[h][i].A}let Q=0,j=0,C=0,F=0;for(;;){let t;if(j<S)C<q.length?(t=q[C],C++):(j++,t=q[0],C=1);else{if(!(Q<D))break;t=q[a.v(0,q.length-1)],Q++}let s=[t.x,t.y];for(let h=0;h<10;h++){const h=[t.x+a.v(-6,6),t.y+a.v(-6,6)];if(!(h[0]<0||h[0]>M-0||h[1]<0||h[1]>p-0||m(H,h[0],h[1])<=0)){s=h;break}}Math.abs(s[0]-d)<6&&a.p(h.g(0,1,"com middleness"))&&(s[0]=d),u[a.S(o)](K,a,h,M,p,d,w,n,s,o,c,j,F,N,A),F++}return K.clearRect(d+M%2,0,M,p),K.scale(-1,1),K.drawImage(I,0-M,0),I}(h,i,n)}function v(t){const s=function(t,s,h,i){const n=Math.floor(t/h),e=Math.floor(s/h),o=[],c=Math.floor(s/(2*e));for(let h=0;h<e;h++){const i=h%2==0?n:n-1,a=Math.floor(h%2==0?t/(2*n):t/n);for(let r=0;r<i;r++)o.push([a+Math.round((r+1*(Math.random()-.5))*t/n),c+Math.round((h+1*(Math.random()-.5))*s/e)])}return o}(t.width,t.height,Math.max(12,Math.floor(Math.min(t.width,t.height)/12))),h=t.getContext("2d"),i=t.width,n=t.height,e=h.getImageData(0,0,i,n),o=s.map(t=>({j:1e9,C:1e9,F:0,G:0,U:t,points:[]}));for(let t=0;t<n;t++)for(let h=0;h<i;h++){const n=4*(t*i+h);if(0===e.data[n+3])continue;let c,a=1e9;for(let i=0;i<s.length;i++){const n=Math.hypot(s[i][0]-h,s[i][1]-t);n<a&&(a=n,c=i)}const r=o[c];h<r.j&&(r.j=h),h>r.F&&(r.F=h),t<r.C&&(r.C=t),t>r.G&&(r.G=t),r.points.push([h,t,e.data[n],e.data[n+1],e.data[n+2],e.data[n+3]])}const c=[];return o.forEach(t=>{if(t.j<1e9){const s=t.F-t.j+1,h=t.G-t.C+1,i=document.createElement("canvas");i.width=s,i.height=h;const n=i.getContext("2d"),e=n.createImageData(s,h);t.points.forEach(h=>{const i=4*((h[1]-t.C)*s+(h[0]-t.j));e.data[i]=h[2],e.data[i+1]=h[3],e.data[i+2]=h[4],e.data[i+3]=h[5]}),n.putImageData(e,0,0),c.push({U:t.U,canvas:i,L:[t.j,t.C]})}}),c}function p(t,s,h){const i=1.5+1.5*Math.random(),n=t.U[0]-s/2,e=t.U[1]-h/2,o=Math.sqrt(n*n+e*e),c=o*o,a=o*i;t.Y=(a-o)*Math.sqrt((c-e*e)/c)*(n>0?1:-1),t.P=(a-o)*Math.sqrt((c-n*n)/c)*(e>0?1:-1),t.angle=(720*Math.random()-360)/((Math.random()+2)*t.canvas.width)*10*(Math.PI/180)}function w(t){const s=t.getContext("2d");let h=t.width,i=t.height;const n=s.getImageData(0,0,h,i),e=function(t,s,h){for(let i=0;i<h;i++)for(let h=0;h<s;h++)if(t.data[4*(i*s+h)+3]>0)return i;return-1}(n,h,i),o=function(t,s,h){for(let i=h-1;i>=0;i--)for(let h=0;h<s;h++)if(t.data[4*(i*s+h)+3]>0)return i;return-1}(n,h,i),c=function(t,s,h){for(let i=0;i<s;i++)for(let n=0;n<h;n++)if(t.data[4*(n*s+i)+3]>0)return i;return-1}(n,h,i),a=function(t,s,h){for(let i=s-1;i>=0;i--)for(let n=0;n<h;n++)if(t.data[4*(n*s+i)+3]>0)return i;return-1}(n,h,i);if(e<0)return t.width=0,t.height=0,[0,0];h=1+a-c,i=1+o-e;const r=s.getImageData(c,e,h,i);return t.width=h,t.height=i,s.putImageData(r,0,0),[c,e]}function g(t){const s=document.createElement("canvas"),{width:h,height:i}=t;s.width=h,s.height=i;const n=t.getContext("2d").getImageData(0,0,h,i),{data:e}=n,{length:o}=e;for(let t=0;t<o;t+=4){const s=e[t+0],h=e[t+1],i=e[t+2];e[t+0]=255-(.393*s+.769*h+.189*i),e[t+1]=255-(.349*s+.686*h+.168*i),e[t+2]=255-(.272*s+.534*h+.131*i)}return s.getContext("2d").putImageData(n,0,0),s}function x(t){const s=document.createElement("canvas");s.width=Math.floor(2*U),s.height=Math.floor(2*L);const h=s.getContext("2d"),i=s.width/2-15,n=s.height/2-30;h.setTransform(1.5,0,0,L/U*1.5,0,0);const e=h.createRadialGradient(i,n,10,i,n,30-3*t);return e.addColorStop(0,"transparent"),e.addColorStop(.7,"blue"),e.addColorStop(1,"cyan"),h.fillStyle=e,h.beginPath(),h.arc(i,n,U/2,0,7),h.fill(),w(s),s}function y(t){const s=document.createElement("canvas");s.width=20,s.height=20;const h=s.getContext("2d");var i=h.createRadialGradient(10,10,0,10,10,10);return i.addColorStop(t,"yellow"),i.addColorStop(1,"red"),h.fillStyle=i,h.beginPath(),h.arc(10,10,10,0,7),h.fill(),s}function k(t){const s=document.createElement("canvas");s.width=t.width,s.height=t.height;const h=s.getContext("2d");return h.scale(1,-1),h.drawImage(t,0,0,t.width,-t.height),s}const H=480,O=700,q=240,B=350;let S,D,N=!1,I=!1,K=-1,A=-1,Q={},j=!1,C=document.getElementById("a");const F=b(d("piBbgDn4CZqlkqiF"),"ie7jMyCFouoUjkVs",60);w(F);const G=v(F),U=F.width,L=F.height,Y=F.getContext("2d").getImageData(0,0,U,L).data;let z,P,T,X,Z,E=[S,D,U,L,Y];!function(t){const s=document.createElement("canvas");s.width=32,s.height=32;const h=s.getContext("2d");let i,n;t.width>t.height?(i=32,n=32*t.height/t.width):(n=32,i=32*t.width/t.height),h.drawImage(t,0,0,i,n);const e=document.createElement("link");e.setAttribute("rel","icon"),e.setAttribute("href",s.toDataURL()),document.head.appendChild(e)}(F);const J=function(){const t=[];for(let s=0;s<5;s++)t.push(x(s));return t}(),V=[],[W,R]=function(){const t=document.createElement("canvas");t.width=20,t.height=60;const s=t.getContext("2d");return s.fillStyle="yellow",s.beginPath(),s.moveTo(10,60),s.lineTo(20,10),s.arc(10,10,10,0,Math.PI,!0),s.lineTo(10,60),s.fill(),s.strokeStyle="cyan",s.shadowColor="blue",s.globalCompositeOperation="source-atop",s.shadowBlur=4,s.lineWidth=10,s.beginPath(),s.moveTo(10,70),s.lineTo(23,10),s.arc(10,10,13,0,Math.PI,!0),s.lineTo(10,70),s.stroke(),[t,s.getImageData(0,0,t.width,t.height).data]}(),$=function(){const t=[];for(let s=0;s<9;s++)t.push(y(s/10));for(let s=t.length-2;s>=1;s--)t.push(t[s]);return t}(),_=$[0].getContext("2d").getImageData(0,0,$[0].width,$[0].height).data,[tt,st]=function(){const t=document.createElement("canvas");t.width=60,t.height=60;const s=t.getContext("2d");var h=s.createRadialGradient(30,30,0,30,30,30);return h.addColorStop(.6,"navy"),h.addColorStop(1,"blue"),s.fillStyle=h,s.beginPath(),s.arc(30,30,30,0,7),s.fill(),[t,s.getImageData(0,0,t.width,t.height).data]}();let ht,it,nt,et=performance.now(),ot=0;const ct=JSON.parse(self.localStorage.pnf_highscores||0)||[];let at=-1;const rt=function(){const t=document.createElement("canvas");t.width=100,t.height=100;const s=t.getContext("2d");s.font="bold 20px Helvetica",s.translate(50,50),s.rotate(-Math.PI/2),s.fillStyle="red",s.fillStyle="#fff",s.textAlign="center",s.textBaseline="middle",s.fillText("NEW!",0,0),w(t);const h=document.createElement("canvas");h.width=t.width+10,h.height=t.height+10;const i=h.getContext("2d");return i.fillStyle="red",i.fillRect(0,0,h.width,h.height),i.drawImage(t,5,5),h}();function ft(t){it+=t,nt=(new Intl.NumberFormat).format(it)}function Mt(){const t=Math.max(400,1e3-25*ht);Kt+=Nt.v(t,t+400)}let ut,lt,mt,dt;function bt(t){const s=t[0];w(s);const h=s.getContext("2d").getImageData(0,0,s.width,s.height).data,i=g(s),n=v(s);t[1]=h,t[2]=i,t[3]=n}const vt=[["c4pf4K5xHzu4CyZM","Wl9w64KNQvFNbbbU",50,10,.35,0,[]],["VTjHVRDIYTbXk766","a3QM5c7MnbQlWns3",80,30,.27,0,[]],["1fOXvyryYCvwBWPL","I4xttvPYWxB1So2A",230,80,.2,6,[]],["VsM4qdcBSiuCPDGJ","q4D72OvJMb23kSZC",60,20,.4,0,[]],["l4pyu8yF0mt84Q4u","jPU5GcKNpf2JMgoG",100,40,.35,0,[[B]]],["NMp3mtsPHIwzMKYk","dBzvSKo7wpema3S5",220,90,.22,9,[]],["o67yOby6izpasGgo","fyKKupDEId96qQHu",70,20,.5,0,[[B]]],["IU7xqL8UqZIXJQDQ","aVBO8buAfBbQ4DOY",100,40,.35,0,[[B,6]]],["LP6kUeGMn7S5xZzi","p5O7jAQK67mDULTD",230,100,.25,14,[]],["SsSvCKpjLVTGITYH","aOEjI2Owpqpl06ex",65,30,.5,0,[[B]]],["AGUwhB1E94wgKe49","pwUtokX7oS7ZKFK1",110,50,.35,6,[[B,6]]],["qRF6GA3xnzX0lMcH","RIdNudvB6T2ro7C3",240,120,.3,22,[]]];function pt(t,s){const h=t[0]-t[2]/2<s[0]-s[2]/2?[t,s]:[s,t],i=t[1]-t[3]/2<s[1]-s[3]/2?[t,s]:[s,t];if(h[0][0]+h[0][2]/2>h[1][0]-h[1][2]/2&&i[0][1]+i[0][3]/2>i[1][1]-i[1][3]/2){const n=Math.floor(h[1][0]-h[1][2]/2),e=Math.floor(i[1][1]-i[1][3]/2),o=Math.floor(Math.min(h[0][0]+h[0][2]/2,h[1][0]+h[1][2]/2))-n,c=Math.floor(Math.min(i[0][1]+i[0][3]/2,i[1][1]+i[1][3]/2))-e,a=n-Math.floor(t[0]-t[2]/2),r=e-Math.floor(t[1]-t[3]/2),f=n-Math.floor(s[0]-s[2]/2),M=e-Math.floor(s[1]-s[3]/2);for(let h=0;h<c;h++)for(let i=0;i<o;i++)if(t[4][4*((r+h)*t[2]+a+i)+3]>0&&s[4][4*((M+h)*s[2]+f+i)+3]>0)return!0}return!1}const wt=[["F","orange",t=>{T=t+6500}],["S","cyan",()=>{Z++}],["B","red",t=>{X=t+1e3,Kt+=1500}]];class gt{constructor(t,s,h,i){this.x=t,this.y=s,this.type=h,this.T=i,this.frame=0,this.X=!0}Z(t,s,h){if(this.y+=5*(h-this.T)/32,this.frame=(this.frame+1)%50,!z&&pt(E,[this.x,this.y,tt.width,tt.height,st]))return wt[this.type][2](h),!1;if(this.y-Math.floor(tt.height/2)>O)return!1;this.T=h,s.save(),s.translate(this.x,this.y),s.drawImage(tt,-Math.floor(tt.width/2),-Math.floor(tt.height/2)),s.textAlign="center",s.textBaseline="top";let i=65;i+=this.frame<25?this.frame:50-this.frame,s.font="700 "+Math.floor(i/2)+"px Helvetica";const n=s.measureText(wt[this.type][0]),e=n.actualBoundingBoxDescent-n.actualBoundingBoxAscent;return s.fillStyle=wt[this.type][1],s.fillText(wt[this.type][0],0,-Math.floor(e/2)),s.restore(),!0}}class xt{constructor(t,s,h){this.x=t,this.y=s,this.T=h,this.J=10}Z(t,s,h){this.y-=20*(h-this.T)/32;const i=[this.x,this.y,W.width,W.height,R];for(let s=0;s<t.length;s++){const n=t[s];if(pt(i,n.V))return n.W(this.J,h),!1}return!(this.y+Math.floor(W.height/2)<0||(this.T=h,s.drawImage(W,this.x-Math.floor(W.width/2),this.y-Math.floor(W.height/2)),0))}}class yt{constructor(t,s,h,i,n){this.time=n,this.U=t.U,this.canvas=t.canvas,this.L=t.L,this.Y=t.Y,this.P=t.P,this.angle=t.angle,this.R=s,this.$=h,this.duration=i}Z(t,s,h){const i=h-this.time;if(i>this.duration)return!1;const n=this.R+this.U[0]+this.Y*Math.min(i,this.duration)/this.duration,e=this.$+this.U[1]+this.P*Math.min(i,this.duration)/this.duration;return s.save(),s.globalAlpha=1-(Math.min(i,this.duration)/this.duration)**2,s.translate(n,e),s.rotate(this.angle*Math.min(i,this.duration)/this.duration),s.drawImage(this.canvas,this.L[0]-this.U[0],this.L[1]-this.U[1]),s.restore(),!0}}class kt{constructor(t,s,h,i,n,e){this.width=$[0].width,this.height=$[0].height,this.x=t,this.y=s;const o=Math.sqrt((h-t)**2+(i-s)**2);this._=(h-t)/o,this.tt=(i-s)/o,this.T=e,this.speed=n,this.frame=0,this.X=!0,this.st()}Z(t,s,h){if(X>h)return!1;const i=h-this.T;if(this.y+=i*this.speed*this.tt,this.x+=i*this.speed*this._,this.st(),pt(E,this.V)){if(Z)return Z--,!1;z=!0}return!(this.y-Math.floor(this.height/2)>O||this.y+Math.floor(this.height/2)<0||this.x-Math.floor(this.width/2)>H||this.x+Math.floor(this.width/2)<0||(this.T=h,this.frame=(this.frame+1)%$.length,s.drawImage($[this.frame],this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),0))}st(){this.V=[this.x,this.y,this.width,this.height,_]}}function Ht(t,s,h,i,n,e){const o=[];for(let c=0;c<t;c++){const a=i+2*c*Math.PI/t;o.push(new kt(s,h,s+Math.round(100*Math.cos(a)),h+Math.round(100*Math.sin(a)),n,e))}return o}class Ot{constructor(t,s,h,i,n,e,o,c,a,r,f,M){this.ht=Nt.m(0,2*Math.PI),this.canvas=t,this.mask=s,this.it=h,this.width=t.width,this.height=t.height,this.nt=c,this.x=n,this.y=e,this.T=M,this.et=0,this.ot=i,this.speed=o,this.points=a,this.ct=r,this.at=f,this.st()}Z(t,s,h){const i=this.y;let n=!1;if(this.nt<=0||X>h?n=!0:(this.y+=(h-this.T)*this.speed,this.st(),pt(E,this.V)&&(Z?(Z--,n=!0):z=!0)),n)return ft(this.points),(this.ct>0?Ht(this.ct,this.x,this.y+Math.round(17*this.speed),this.ht,.45,h):[]).concat(this.ot.map(t=>(p(t,this.width,this.height),new yt(t,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),500,h))));if(this.y-Math.floor(this.height/2)>O)return!1;this.T=h;const e=h-this.et;let o=0;if(e<400&&(o=(400-e)/400),s.save(),s.drawImage(this.canvas,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),o>0&&(s.globalAlpha=o,s.drawImage(this.it,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height)),s.restore(),!z)for(let t=0;t<this.at.length;t++){const s=this.at[t][0];if(i<s&&this.y>s){const s=this.at[t][1],i=this.y+Math.round(17*this.speed);return s?[this,...Ht(s,this.x,i,this.ht,.3,h)]:[this,new kt(this.x,i,S,D,.3,h)]}}return!0}st(){this.V=[this.x,this.y,this.width,this.height,this.mask]}W(t,s){this.et=s,this.nt-=t}}class qt{constructor(t,s){this.A=0,this.rt=s+2e3,this.nt=Number.MAX_SAFE_INTEGER,this.T=s,this.width=ut.width,this.height=ut.height,this.x=q,this.y=-this.height/2,this.direction=0,this.et=0,this.level=t,this.st()}Z(t,s,h){let i=!1;if(this.nt<=0)i=!0;else{const t=h-this.T;0===this.A?h>this.rt&&(this.A=1):1===this.A?(this.y+=.15*t,this.y>150&&(this.y=150,this.nt=100+250*this.level,this.A=2,this.ft=h,this.Mt=0)):0===this.direction?(this.x+=.1*t,this.x+Math.floor(this.width/2)>H&&(this.x=H-Math.floor(this.width/2),this.direction=1)):(this.x-=.1*t,this.x-Math.floor(this.width/2)<0&&(this.x=Math.floor(this.width/2),this.direction=0)),this.st(),pt(E,this.V)&&(z=!0)}if(i)return ft(500*ht),Ct=!1,At=h+1e4,Kt=500+h,Mt(),Qt=500+h,dt.map(t=>(p(t,this.width,this.height),new yt(t,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),500,h)));this.T=h;const n=h-this.et;let e=0;if(n<400&&(e=(400-n)/400),s.save(),s.drawImage(ut,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height),e>0&&(s.globalAlpha=e,s.drawImage(mt,this.x-Math.floor(this.width/2),this.y-Math.floor(this.height/2),this.width,this.height)),s.restore(),!z&&2===this.A&&this.ft<h){const t=[];if(this.Mt<5*this.level){let s,i;switch(Math.floor(this.Mt/this.level)){case 0:s=28,i=119;break;case 1:s=42,i=123;break;case 2:s=108,i=94;break;case 3:s=121,i=80;break;default:s=143,i=50}t.push(new kt(this.x-s,this.y+i,this.x-s,this.y+i+100,.5,h)),t.push(new kt(this.x+s,this.y+i,this.x+s,this.y+i+100,.5,h))}else t.push(new kt(this.x,this.y+125,S,D,.3,h));return this.Mt++,this.Mt>=10*this.level?(this.Mt=0,this.ft=h+800):this.ft=this.Mt>5*this.level?h+200:this.Mt===5*this.level?h+800:this.Mt%this.level?h+180:h+500,[this,...t]}return!0}st(){this.V=[this.x,this.y,this.width,this.height,lt]}W(t,s){this.et=s,this.nt-=t}}let Bt,St,Dt,Nt,It,Kt,At,Qt,jt,Ct,Ft,Gt=5;function Ut(t){let s,h,i,n;t.preventDefault(),C.offsetWidth/C.offsetHeight>.6857142857142857?(h=0,n=C.offsetHeight,i=n*H/O,s=Math.floor(C.offsetWidth-i)/2):(s=0,i=C.offsetWidth,n=i*O/H,h=Math.floor(C.offsetHeight-n)/2);let e={};e=t.changedTouches?t.changedTouches[0]:t,K=Math.floor((e.pageX-s)*H/i),A=Math.floor((e.pageY-h)*O/n)}self.ontouchstart=self.onpointerdown=t=>{N=!0,Ut(t)},self.ontouchmove=self.onpointermove=Ut,self.ontouchend=self.onpointerup=t=>{t.preventDefault(),N=!1},self.onkeydown=t=>{j=!0,Q[t.code]=1,t.preventDefault()},self.onkeyup=t=>{Q[t.code]=0,t.preventDefault()},C.width=H,C.height=O,C.getContext("2d"),requestAnimationFrame(function s(h){(function(s){switch(ot){case 0:case 1:!function(s){const h=C.getContext("2d");h.fillStyle="#000",h.fillRect(0,0,H,O),h.fillStyle="#fff";let i=(s-et)/3e3;h.save();for(let t=200;t--;){let s=50/(6-(i+t/13)%6);h.globalAlpha=Math.min(s/100,1),h.beginPath(),h.arc(Math.cos(t)*s+q,Math.sin(t*t)*s+B,s/200,0,7),h.fill()}if(h.restore(),h.textBaseline="middle",h.textAlign="center",1===ot){if(0===ct.length)h.font="bold 40px Helvetica",h.fillText("PLANET NOT FOUND",q,B);else{h.font="bold 30px Helvetica",h.fillText("HIGH SCORES",q,100),h.save(),h.textAlign="start",h.textBaseline="top";for(let t=0;t<ct.length;t++){t===at?(h.save(),h.translate(90,185+80*t),h.drawImage(rt,-Math.floor(rt.width/2),-Math.floor(rt.height/2)),h.restore(),h.fillStyle="gold"):h.fillStyle="#fff";const s=Intl.NumberFormat().format(ct[t][0]),i=new Date(ct[t][1]).toLocaleString();h.font="50px Helvetica",h.fillText(t+1+"",115,160+80*t),h.font="60px Helvetica",h.fillText("{",145,150+80*t),h.font="25px Helvetica",h.fillText(s+" points",170,160+80*t),h.font="15px Helvetica",h.fillText(i,170,190+80*t)}h.restore()}h.font="20px Helvetica",h.fillText("<Press anywhere or any key to play>",q,670),N||j?I||(ot=2,ht=0,Nt=new t("enemy"),It=new t("powerup"),Kt=1e3,At=5e3,Qt=9e3,jt=0,Dt=0,Bt=[],St=[],et=performance.now(),Ft=performance.now(),it=0,ft(0),z=!1,S=q,D=630,T=0,X=0,Z=1,Ct=!1,at=-1):I=!1}else if(h.font="italic 30px Helvetica",h.fillText("Loading…",q,B),ut)if(V.length<vt.length)V.push(function(t,s,h,...i){return[k(b(d(t),s,h)),void 0,void 0,void 0,...i]}(...vt[V.length]));else{let t=!0;for(let s=0;t&&s<V.length;s++)V[s][1]||(t=!1,bt(V[s]));t&&(ot=1)}else ut=k(b(d("HYj7ADLjQr6icLtO"),"CdiB9N2ZoQWuAxur",270)),w(ut),mt=g(ut),dt=v(ut),lt=ut.getContext("2d").getImageData(0,0,ut.width,ut.height).data}(s);break;case 2:!function(t){const s=t-Ft;if(Ft=t,s>160)return et+=s,void(Q={});if(!z){const t=.6*s,h=Q.ArrowUp||Q.KeyW,i=Q.ArrowDown||Q.KeyS,n=Q.ArrowLeft||Q.KeyA,e=Q.ArrowRight||Q.KeyD;if(h||i||n||e){const s=(h||i)&&(n||e)?Math.sqrt(t**2/2):t;h&&(D-=s),i&&(D+=s),n&&(S-=s),e&&(S+=s),K=S,A=D}else{let s=K-S,h=A-D;const i=Math.sqrt(s**2+h**2);i<t?(S=K,D=A):(S+=s/i*t,D+=h/i*t)}S-Math.floor(U/2)<0?S=Math.floor(U/2):S+Math.floor(U/2)>H&&(S=H-Math.floor(U/2)),D-Math.floor(L/2)<0?D=Math.floor(L/2):D+Math.floor(L/2)>O&&(D=O-Math.floor(L/2)),E=[S,D,U,L,Y]}const h=C.getContext("2d");let i;h.fillStyle="#000",h.fillRect(0,0,H,O),h.fillStyle="#777";for(let s=100;s--;h.beginPath(),h.arc(Math.floor(-60*(100-s)*(S-U/2)/(100*(H-U)))+102797*(1+Math.sin(i))*s%540,O*(Math.tan(s/9)+i*(t-et)/3e3)%O,2*i,0,7),h.fill())i=149/(3*s+199);const n=z,e=[],o=[],c=[];function a(s){const i=s.Z(St,h,t-et);"boolean"==typeof i?i&&(s.X?o.push(s):e.push(s),s.W&&c.push(s)):Array.isArray(i)&&i.forEach(t=>{s===t?i&&(s.X?o.push(s):e.push(s),s.W&&c.push(s)):a(t)})}if(Bt.forEach(a),!n&&z&&(P=t-et,G.map(s=>(p(s,U,L),new yt(s,S-Math.floor(U/2),D-Math.floor(L/2),1500,t-et))).forEach(a)),Bt=e.concat(o),St=c,h.fillStyle="#fff",h.textAlign="center",z)h.save(),h.globalAlpha=Math.min(1,(t-et-P)/2e3),h.textBaseline="middle",h.font="40px Helvetica",h.fillText("Game Over",q,B),h.restore();else{if(Z){const t=J[Math.min(Z-1,J.length-1)];h.drawImage(t,S-Math.floor(t.width/2),D-Math.floor(t.height/2)+5)}h.drawImage(F,S-Math.floor(U/2),D-Math.floor(L/2))}X>t-et&&(h.save(),h.globalAlpha=(X-t+et)/1e3,h.fillStyle="#fff",h.fillRect(0,0,H,O),h.restore()),h.textBaseline="top",h.font="16px Helvetica",h.fillText(nt,q,5);const r=T>t-et;if(!z&&Dt+(r?100:200)<t-et&&(Gt=-Gt,Bt.push(new xt(S+(r?Gt:0),D-Math.floor(L/2),t-et)),Dt=Math.max(t-et)),At<t-et&&!Ct&&(ht++,ht%5?At=t-et+1e4:(Ct=!0,Bt.push(new qt(Math.floor(ht/5),t-et)))),Qt<t-et&&!Ct&&(Bt.push(new gt(It.v(30,450),Math.floor(-tt.height/2),jt,t-et)),jt=(jt+1)%wt.length,Qt=t-et+9e3),Kt<t-et&&!Ct){const s=Nt.v(Math.min(Math.max(ht-2,0),V.length-3),Math.min(ht,V.length-1)),[h,i,n,e,o,c,a,r]=V[s];Bt.push(new Ot(h,i,n,e,Nt.v(30,450),Math.floor(-h.height/2),c,o,50*(s+1),a,r,t-et)),Mt()}z&&P+3500<t-et&&(function(){if(it){const t=[it,Date.now()];ct.push(t),ct.sort((t,s)=>{const h=s[0]-t[0];return 0===h?s[1]-t[1]:h}),ct.length=Math.min(ct.length,5),at=ct.indexOf(t),self.localStorage.pnf_highscores=JSON.stringify(ct)}}(),ot=1,I=N)}(s)}j=!1})(h),requestAnimationFrame(s)})}();
