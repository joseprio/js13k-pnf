class t{constructor(t){this.t=0,this.l=0,this.h={},this.seed=t,8>this.seed.length&&(this.seed="padding_"+this.seed),this.seed.length%2==0&&(this.seed="1"+this.seed),this.i=[2972948403,3086140710,2071788248,3026137486,1411764137,2265725585,2923087685,1593177610],this.o=3234042090;for(let t=this.seed.length-1;t>=0;t--){let e=this.seed.charCodeAt(t);this.o=((this.o<<5)+this.o^e^this.o<<e%13+1^this.o>>e%17+1)>>>0,this.i[t%8]^=((this.o>>9)*(this.o%16384+3427)^e)>>>0}}M(){let t=this.seed.charCodeAt(this.t),e=this.i[this.l];return this.o=((this.o<<5)+this.o+e^t^this.o<<t%17+1^this.o>>t%13+1)>>>0,this.i[this.l]=(e>>3^e<<t%19+1^this.o%134217728*3427)>>>0,this.t=(this.t+1)%this.seed.length,this.l=(this.l+1)%8,this.o}u(t){let e=[1160605769,1424711319,876532818,1419174464],a=1206170165;if(t||(t="?/?/?/",a=3379896793),this.h[t])return this.h[t];for(let l=t.length-1;l>=0;l--){let h=t.charCodeAt(l),r=e[0]^h;r=(r^r<<11)>>>0,r=(r^r>>8)>>>0,e[0]=e[1],e[1]=e[2],e[2]=e[3],e[3]=(e[3]^e[3]>>19^r)>>>0,a=3427*(a^h<<24)^e[3]}for(let t=this.seed.length-1;t>=0;t--){let l=this.seed.charCodeAt(t),h=e[0]^l;h=(h^h<<11)>>>0,h=(h^h>>8)>>>0,e[0]=e[1],e[1]=e[2],e[2]=e[3],e[3]=(e[3]^e[3]>>19^h)>>>0,a=3427*(a^l<<24)^e[3]}return this.h[t]=a>>>0,this.h[t]}m(t,e){return(4294967296*this.M()+this.M())/0x10000000000000000*(e-t)+t}p(t,e){return Math.floor(this.m(t,e+1))}v(t){return this.m(0,1)<t}g(t,e,a){return(4294967296*this.u(a)+this.u(a+"@"))/0x10000000000000000*(e-t)+t}H(t,e,a){return Math.floor(this.g(t,e+1,a))}k(t,e){return this.g(0,1,e)<t}S(t){return this.v(t)?-1:1}q(t,e){let a=0;for(;this.v(t)&&e>a;)a++;return a}D(t,e,a){let l=0;for(;(4294967296*this.u(a+l)+this.u(a+"@"+l))/0x10000000000000000<t&&e>l;)l++;return l}K(t){let e=0;for(let a=0;t.length>a;a++)e+=t[a];let a=this.m(0,e);for(let e=0;t.length>e;e++)if(a-=t[e],0>a)return e;return 0}O(t,e){let a=0;for(let e=0;t.length>e;e++)a+=t[e];let l=this.g(0,a,e);for(let e=0;t.length>e;e++)if(l-=t[e],0>l)return e;return 0}}function e(t,e,a){return Math.max(e,Math.min(a,t))}function a(t,e){return`rgb(${t.map(t=>t*e*100).join("%,")}%)`}function l(t,e,a){let l=(l,h=(l+6*t)%6)=>a-a*e*Math.max(Math.min(h,4-h,1),0);return[l(5),l(3),l(1)]}function h(h,r,n){return((h,r,n)=>{let i=(t=>{let e=[];return e[0]=.8*t.m(.001,1)*2**t.m(0,8),e[1]=.9*t.m(.01,1)*2**t.m(0,8),e[2]=1*t.m(.001,1)*2**t.m(0,8),e[3]=3*t.m(0,1)*2**t.m(0,8),e[4]=.5*t.m(0,1)*2**t.m(0,8),e[5]=.05*t.m(0,1)*2**t.m(0,8),e[6]=.5*t.m(0,1)*2**t.m(0,8),e})(h),o=[],f=[],M=1+(h.k(.7,"base color +1")?1:0)+h.D(.3,3,"base color count");for(let t=0;M>t;t++){let a="base color"+t;o.push(l(h.g(0,1,a+"hue")**2,e(h.g(-.2,1,a+"saturation"),0,h.g(0,1,a+"saturation bound")**4),e(h.g(.7,1.1,a+"value"),0,1))),f.push(2**h.g(0,6,a+"chances"))}let s=new t(h.seed+r);function c(){let t=o[s.K(f)];return s.v(h.g(0,.5,"base color shift chance")**2)&&(t=[t[0],t[1],t[2]],t[0]=e(t[0]+h.g(0,.6,"base color shift range red")**2*e(s.m(-1,1.2),0,1)*e(s.S(.7)+s.S(.7),-1,1),0,1),t[1]=e(t[1]+h.g(0,.6,"base color shift range green")**2*e(s.m(-1,1.2),0,1)*e(s.S(.7)+s.S(.7),-1,1),0,1),t[2]=e(t[2]+h.g(0,.6,"base color shift range blue")**2*e(s.m(-1,1.2),0,1)*e(s.S(.7)+s.S(.7),-1,1),0,1)),t}n=n||s.m(h.g(2.5,3.5,"size min"),h.g(5,7,"size max"))**3;let u=s.m(h.g(.5,1,"wratio min"),h.g(1,1.3,"wratio max")),d=s.m(h.g(.7,1,"hratio min"),h.g(1.1,1.7,"hratio max")),m=Math.floor(n*u),b=Math.floor(m/2),p=Math.floor(m/6),v=(m-6*p)/2,g=Math.floor(n*d),w=Math.floor(g/2),x=Math.floor(g/6),y=(g-6*x)/2,H=document.createElement("canvas");H.width=m,H.height=g;let k=H.getContext("2d"),S=m*g/20;[()=>{let t=Math.ceil(m*h.g(.1,1,"outline0 iw")/5),a=[[[b-t,0],[b+t,g]]],l=2+Math.floor(s.m(.5,1)*h.g(2,8,"outline0 bc")*n**.5);for(let t=1;l>t;t++){let t=a[s.p(0,a.length-1)],l=[t[0][0]+s.m(0,1)*(t[1][0]-t[0][0]),t[0][1]+s.m(0,1)*(t[1][1]-t[0][1])];(t[0][1]+t[1][1])/2>l[1]&&s.v(h.g(.5,1.5,"outline0 frontbias"))&&(l[1]=t[1][1]-(l[1]-t[0][1]));let r=[e(s.m(0,1)*m,0,m),e(s.m(0,1)*g,0,g)],n=S/Math.abs((r[0]-l[0])*(r[1]-l[1]));if(1>n&&(r[0]=l[0]+(r[0]-l[0])*n,r[1]=l[1]+(r[1]-l[1])*n),l[0]>r[0]){let t=l[0];l[0]=r[0],r[0]=t}if(l[1]>r[1]){let t=l[1];l[1]=r[1],r[1]=t}a.push([[Math.floor(l[0]),Math.floor(l[1])],[Math.ceil(r[0]),Math.ceil(r[1])]])}k.fillStyle="#fff";for(let t=0;a.length>t;t++){let e=a[t];k.fillRect(e[0][0],e[0][1],e[1][0]-e[0][0],e[1][1]-e[0][1]),k.fillRect(m-e[1][0],e[0][1],e[1][0]-e[0][0],e[1][1]-e[0][1])}},()=>{let t=Math.max(2,(S/Math.PI)**.5),e=Math.ceil(m*h.g(.1,1,"outline1 iw")/5),a=[],l=Math.floor(g/(2*e));for(let t=0;l>t;t++)a.push({B:[b,g-e*(2*t+1)],r:e});let r=l+Math.floor(s.m(.5,1)*h.g(10,50,"outline1 cc")*n**.5);for(let e=l;r>e;e++){let e=a[Math.max(s.p(0,a.length-1),s.p(0,a.length-1))],l=s.m(1,t),r=s.m(Math.max(0,e.r-l),e.r),n=s.m(0,2*Math.PI);n>Math.PI&&s.v(h.g(.5,1.5,"outline1 frontbias"))&&(n=s.m(0,Math.PI));let i=[e.B[0]+Math.cos(n)*r,e.B[1]+Math.sin(n)*r];l=Math.min(l,i[0],m-i[0],i[1],g-i[1]),a.push({B:i,r:l})}k.fillStyle="#fff";for(let t=0;a.length>t;t++){let e=a[t];k.beginPath(),k.arc(e.B[0],e.B[1],e.r,0,7),k.fill(),k.beginPath(),k.arc(m-e.B[0],e.B[1],e.r,0,7),k.fill()}},()=>{let t=[[b,s.m(0,.05)*g],[b,s.m(.95,1)*g]],e=6/n+h.g(.03,.1,"outline2 basefatness"),a=Math.max(3,Math.ceil(s.m(.05,.1)/e*n**.5));k.lineCap=["round","square"][h.H(0,1,"outline2 linecap")],k.strokeStyle="#fff";for(let l=1;a>l;l++){let a=t[l];a||(a=[s.m(0,1)*m,s.m(0,1)**h.g(.1,1,"outline2 frontbias")*g],t.push(a));let r=1+s.q(h.g(0,1,"outline2 conadjust"),3);for(let l=0;r>l;l++){let l=t[s.p(0,t.length-2)];k.lineWidth=s.m(.7,1)*e*n,k.beginPath(),k.moveTo(l[0],l[1]),k.lineTo(a[0],a[1]),k.stroke(),k.beginPath(),k.moveTo(m-l[0],l[1]),k.lineTo(m-a[0],a[1]),k.stroke()}}}][h.O([1,1,1],"outline type")]();let q=k.getImageData(0,0,m,g);function D(t,e){return q.data[4*(e*m+t)+3]}let K=[];for(let t=0;p>t;t++){K[t]=[];for(let e=0;x>e;e++)K[t][e]={C:t,I:e,x:Math.floor(v+6*(t+.5)),y:Math.floor(y+6*(e+.5))}}let O=[K[Math.floor(p/2)][Math.floor(x/2)]],B=0;for(;O.length>B;){let t=O[B];if(t.C>0){let e=K[t.C-1][t.I];e.j||(D(e.x,e.y)?(e.j=1,O.push(e)):e.j=2)}if(p-1>t.C){let e=K[t.C+1][t.I];e.j||(D(e.x,e.y)?(e.j=1,O.push(e)):e.j=2)}if(t.I>0){let e=K[t.C][t.I-1];e.j||(D(e.x,e.y)?(e.j=1,O.push(e)):e.j=2)}if(x-1>t.I){let e=K[t.C][t.I+1];e.j||(D(e.x,e.y)?(e.j=1,O.push(e)):e.j=2)}B++}for(let t=0;O.length>t;t++){let e=O[t],a=K[p-1-e.C][e.I];1!=a.j&&(a.j=1,O.push(a))}let C=h.H(1,2,"base component passes"),I=Math.max(1,Math.floor(O.length*h.g(0,1/C,"extra component amount"))),Q=C*O.length+I;function j(t,e){let a=Math.floor((t-v)/6),l=Math.floor((e-y)/6);return 0>a||a>=p||0>l||l>=x?0:1==K[a][l].j}function F(t){return 1-t[1]/g}function N(t,e){let a=Math.min(1,1-Math.abs(t[0]-b)/b);return e&&(a=Math.min(a,1-Math.abs(t[1]-w)/w)),a}function A(t,e,a,l,r,n,i){let o=(N(e,1)*(1-1/((m+g)/1e3+1))*h.g(0,1,"master bigness")**.5*(1-P/Q))**a,f=8;if(s.v(h.g(l,r,`com${t} bigchance`)*o)){let a=h.g(n,i,`com${t} bigincchance`);for(;s.v(a*o)&&Math.min(e[0]-f,m-e[0]-f,e[1]-f,g-e[1]-f)>f/2;)f*=1.5}return f}function G(t,e,a){let l=k.createLinearGradient(e[0],e[1],2*t[0]-e[0],2*t[1]-e[1]),h=`rgba(0,0,0,${a})`;return l.addColorStop(0,h),l.addColorStop(.5,"rgba(0,0,0,0)"),l.addColorStop(1,h),l}H.width|=0;let U=[t=>{let l=A(0,t,.3,0,.9,0,.5),h=2*l,r=[Math.ceil(s.m(1,Math.max(2,l/2))),Math.ceil(s.m(1,Math.max(2,l/2)))],n=Math.min(r[0],r[1])*s.m(.1,1.2),i=[r[0]+2*n,r[1]+2*n],o=[Math.ceil(h/i[0]),Math.ceil(h/i[1])],f=[Math.round(o[0]*i[0]/2),Math.round(o[1]*i[1]/2)],M=c(),u=a(M,s.m(.4,1)),d=a(M,s.m(.4,1));k.fillStyle=`rgba(0,0,0,${s.m(0,.25)})`,k.fillRect(t[0]-f[0]-1,t[1]-f[1]-1,i[0]*o[0]+2,i[1]*o[1]+2),k.fillStyle=d,k.fillRect(t[0]-f[0],t[1]-f[1],i[0]*o[0],i[1]*o[1]),k.fillStyle=u;for(let e=0;o[0]>e;e++){let a=t[0]+n+e*i[0]-f[0];for(let e=0;o[1]>e;e++)k.fillRect(a,t[1]+n+e*i[1]-f[1],r[0],r[1])}s.v(e(l/8*(.6*P/Q+.3),0,.98))&&(k.fillStyle=G(t,[t[0]+f[0],t[1]],s.m(0,.9)),k.fillRect(t[0]-f[0],t[1]-f[1],i[0]*o[0],i[1]*o[1]))},t=>{let l=A(1,t,.2,.3,1,0,.6),r=Math.ceil(s.m(.8,2)*l),n=Math.ceil(s.m(.8,2)*l),i=s.p(3,Math.max(4,r)),o=Math.max(1,Math.round(r/i));r=o*i;let f=a(c(),s.m(.5,1)),M=s.m(.3,.9);if(s.v(e(h.g(-.2,1.2,"com1 hchance"),0,1))){let e=[t[0]-Math.floor(r/2),t[1]-Math.floor(n/2)];k.fillStyle=`rgba(0,0,0,${s.m(0,.25)})`,k.fillRect(e[0]-1,e[1]-1,r+2,n+2),k.fillStyle=f,k.fillRect(e[0],e[1],r,n);for(let a=0;o>a;a++)k.fillStyle=G([e[0]+(a+.5)*i,t[1]],[e[0]+a*i,t[1]],M),k.fillRect(e[0]+a*i,e[1],i,n)}else{let e=[t[0]-Math.floor(n/2),t[1]-Math.floor(r/2)];k.fillStyle=`rgba(0,0,0,${s.m(0,.25)})`,k.fillRect(e[0]-1,e[1]-1,n+2,r+2),k.fillStyle=f,k.fillRect(e[0],e[1],n,r);for(let a=0;o>a;a++)k.fillStyle=G([t[0],e[1]+(a+.5)*i],[t[0],e[1]+a*i],M),k.fillRect(e[0],e[1]+a*i,r,i)}},t=>{let l=A(2,t,.05,0,1,0,.9),r=Math.ceil(s.m(.6,1.4)*l),n=Math.ceil(s.m(1,2)*l),i=[Math.ceil(e(r*s.m(.7,1)/2,1,r)),Math.ceil(e(r*s.m(.8,1)/2,1,r))],o=[Math.floor(e(r*s.m(.05,.25),1,n)),Math.floor(e(r*s.m(.1,.3),1,n))],f=o[0]+o[1],M=s.v(h.g(0,1,"com2 oddchance")**.5),u=e(Math.floor(n/f),1,n),d=u*f+(M?o[0]:0),m=c(),b=s.m(.6,1),p=s.m(.6,1),v=[a(m,b),a(m,p)],g=1-s.m(.5,.95),w=[a(m,g*b),a(m,g*p)];if(s.v(h.g(0,1,"com2 verticalchance")**.1)){let e=k.createLinearGradient(t[0]-i[0],t[1],t[0]+i[0],t[1]),a=k.createLinearGradient(t[0]-i[1],t[1],t[0]+i[1],t[1]),l=Math.floor(t[1]-d/2);e.addColorStop(0,w[0]),e.addColorStop(.5,v[0]),e.addColorStop(1,w[0]),a.addColorStop(0,w[1]),a.addColorStop(.5,v[1]),a.addColorStop(1,w[1]);for(let h=0;u>h;h++)k.fillStyle=e,k.fillRect(t[0]-i[0],l+h*f,2*i[0],o[0]),k.fillStyle=a,k.fillRect(t[0]-i[1],l+h*f+o[0],2*i[1],o[1]);M&&(k.fillStyle=e,k.fillRect(t[0]-i[0],l+u*f,2*i[0],o[0]))}else{let e=k.createLinearGradient(t[0],t[1]-i[0],t[0],t[1]+i[0]),a=k.createLinearGradient(t[0],t[1]-i[1],t[0],t[1]+i[1]),l=Math.floor(t[0]-d/2);e.addColorStop(0,w[0]),e.addColorStop(.5,v[0]),e.addColorStop(1,w[0]),a.addColorStop(0,w[1]),a.addColorStop(.5,v[1]),a.addColorStop(1,w[1]);for(let h=0;u>h;h++)k.fillStyle=e,k.fillRect(l+h*f,t[1]-i[0],o[0],2*i[0]),k.fillStyle=a,k.fillRect(l+h*f+o[0],t[1]-i[1],o[1],2*i[1]);M&&(k.fillStyle=e,k.fillRect(l+u*f,t[1]-i[0],o[0],2*i[0]))}},t=>{if(s.v(F(t)-.3)||j(t[0],t[1]+6*1.2)||j(t[0],t[1]+10.8))for(let e=0;100>e;e++){let e=s.K(i);if(3!=e)return void U[e](t)}let e=A(3,t,.1,.6,1,.3,.8),l=s.m(1,2)*e,r=Math.ceil(s.m(.3,1)*e),n=l*s.m(.25,.6),M=(l+n)/2/2,c=[Math.max(1,Math.ceil(r*s.m(.08,.25))),Math.max(1,Math.ceil(r*s.m(.03,.15)))],u=c[0]+c[1],d=Math.ceil(r/u);r=d*u+c[0];let m=o[h.O(f,"com3 basecolor")],b=h.g(.5,.8,"com3 lightness0 mid"),p=b-h.g(.2,.4,"com3 lightness0 edge"),v=h.g(0,.2,"com3 lightness1 edge"),g=[k.createLinearGradient(t[0]-M,t[1],t[0]+M,t[1]),k.createLinearGradient(t[0]-M,t[1],t[0]+M,t[1])],w=Math.ceil(t[1]-r/2),x=[w+c[0],w+u];g[0].addColorStop(0,a(m,p)),g[0].addColorStop(.5,a(m,b)),g[0].addColorStop(1,a(m,p)),g[1].addColorStop(0,a(m,v)),g[1].addColorStop(.5,a(m,1)),g[1].addColorStop(1,a(m,v)),k.fillStyle=g[0],k.beginPath(),k.moveTo(t[0]-n/2,w),k.lineTo(t[0]+n/2,w),k.lineTo(t[0]+l/2,w+r),k.lineTo(t[0]-l/2,w+r),k.fill(),k.fillStyle=g[1];for(let e=0;d>e;e++){let a=[e*u+c[0],(e+1)*u],h=[x[0]+e*u,x[1]+e*u],i=[(n+a[0]/r*(l-n))/2,(n+a[1]/r*(l-n))/2];k.beginPath(),k.moveTo(t[0]-i[0],h[0]),k.lineTo(t[0]+i[0],h[0]),k.lineTo(t[0]+i[1],h[1]),k.lineTo(t[0]-i[1],h[1]),k.fill()}},t=>{let e,l=N(t,0),r=s.m(.7,1),i=s.m(0,.2),o=c(),f=a(o,r),M=a(o,i),u=Math.max(3,Math.ceil(n*s.m(.4,1)**2*h.g(.02,.1,"com4 maxwidth"))),d=Math.floor(u/2),m=u%2,p=h.g(0,1,"com4 directionc0")**4,v=.1*h.g(0,1,"com4 directionc1")**4,w=.2*h.g(0,1,"com4 directionc2")**4,x=s.K([p*(2-l),v,w*(1+l)]);if(x)if(2>x){let a=Math.min(Math.max(8,g-t[1]-s.p(0,16)),Math.floor(.6*n*s.m(0,1)**h.g(2,7,"com4 hpower1"))),l=t[0]-d,r=t[1],i=k.createLinearGradient(l,r,t[0]+d+m,r);i.addColorStop(0,M),i.addColorStop(.5,f),i.addColorStop(1,M),k.fillStyle=i,k.fillRect(l,r,u,a),e=[t[0],t[1]+a]}else{let a=k.createLinearGradient(t[0],t[1]-d,t[0],t[1]+d+m);a.addColorStop(0,M),a.addColorStop(.5,f),a.addColorStop(1,M),k.fillStyle=a,k.fillRect(t[0],t[1]-d,Math.ceil(b-t[0])+1,u),e=[b,t[1]]}else{let a=Math.min(Math.max(8,t[1]-s.p(0,16)),Math.floor(.7*n*s.m(0,1)**h.g(2,6,"com4 hpower0"))),l=t[0]-d,r=t[1]-a,i=k.createLinearGradient(l,r,t[0]+d+m,r);i.addColorStop(0,M),i.addColorStop(.5,f),i.addColorStop(1,M),k.fillStyle=i,k.fillRect(l,r,u,a),e=[t[0],t[1]-a]}let y=[.6*h.g(0,1,"com4 covercomc0")**2,.2*h.g(0,1,"com4 covercomc1")**2,h.g(0,1,"com4 covercomc2")**2];if(U[s.K(y)](t),j(e[0],e[1])){let t=[e[0]+Math.round(6*s.m(-1,1)),e[1]+Math.round(6*s.m(-1,1))];U[s.K(y)](j(t[0],t[1])?t:e)}},t=>{let e=A(5,t,.1,0,.9,0,.8),l=s.m(.75,1),r=s.m(0,.25),n=c(),i=a(n,l),o=a(n,r),f=1+s.q(h.g(0,1,"com5 multxc"),Math.floor(1.2*(e/8)**.6)),M=1+s.q(h.g(0,1,"com5 multyc"),Math.floor(1.2*(e/8)**.6)),u=s.m(.5,1)*e/Math.max(f,M),d=u+.5,m=u+1,b=u/5,p=[t[0]-u*f,t[1]-u*M];k.fillStyle=`rgba(0,0,0,${s.m(0,.2)})`;for(let t=0;f>t;t++){let e=p[0]+(2*t+1)*u;for(let t=0;M>t;t++){let a=p[1]+(2*t+1)*u;k.beginPath(),k.arc(e,a,m,0,7),k.fill()}}for(let t=0;f>t;t++){let e=p[0]+(2*t+1)*u;for(let t=0;M>t;t++){let a=p[1]+(2*t+1)*u,l=k.createRadialGradient(e,a,b,e,a,d);l.addColorStop(0,i),l.addColorStop(1,o),k.fillStyle=l,k.beginPath(),k.arc(e,a,d,0,7),k.fill()}}},t=>{if(0>=z||s.v(F(t)))return void U[s.K(i.slice(0,6))](t);let e=A(6,t,.05,0,.9,0,.8),l=Math.ceil(2*e*s.m(.6,1)),r=Math.floor(l/2),n=l%2,o=l*s.m(h.g(0,.8,"com6 h1min")**.5,.9)**h.g(.5,1.5,"com6 h1power"),f=Math.floor(o/2),M=Math.max((o-l)/2,l*(s.m(0,.45)+s.m(0,.45))*(h.k(.8,"com6 backnesstype")?h.g(.2,.9,"com6 backness#pos"):h.g(-.2,-.05,"com6 backness#neg"))),u=Math.ceil(e*s.m(.7,1)*h.g(.1,3.5,"com6 width")**.5),d=Math.floor(u/2),m=u%2,b=[[t[0]-d,t[1]+M-f],[t[0]+d+m,t[1]-r],[t[0]+d+m,t[1]+r+n],[t[0]-d,t[1]+M+f+l%2]],p=c();k.fillStyle=`rgba(0,0,0,${s.m(0,.2)})`,k.beginPath(),k.moveTo(b[0][0]-1,b[0][1]),k.lineTo(b[1][0]-1,b[1][1]),k.lineTo(b[2][0]-1,b[2][1]),k.lineTo(b[3][0]-1,b[3][1]),k.fill(),k.fillStyle=a(p,s.m(.7,1)),k.beginPath(),k.moveTo(b[0][0],b[0][1]),k.lineTo(b[1][0],b[1][1]),k.lineTo(b[2][0],b[2][1]),k.lineTo(b[3][0],b[3][1]),k.fill()}],$=0,z=0,L=0,P=0;for(;;){let t;if(C>z)O.length>L?(t=O[L],L++):(z++,t=O[0],L=1);else{if($>=I)break;t=O[s.p(0,O.length-1)],$++}let e=[t.x,t.y];for(let a=0;10>a;a++){let a=[t.x+s.p(-6,6),t.y+s.p(-6,6)];if(!(0>a[0]||a[0]>m||0>a[1]||a[1]>g)&&D(a[0],a[1])){e=a;break}}6>Math.abs(e[0]-b)&&s.v(h.g(0,1,"com middleness"))&&(e[0]=b),U[s.K(i)](e),P++}return k.clearRect(b+m%2,0,m,g),k.scale(-1,1),k.drawImage(H,-m,0),H})(h,r,n)}function r(t,e){let a=document.createElement("canvas");return a.width=t,a.height=e,a}function n(t,e,a,l){t.beginPath(),t.arc(e,a,l,0,7),t.fill()}function i(t){return t.getContext("2d").getImageData(0,0,t.width,t.height)}function o(t){let e=t.getContext("2d"),a=i(t),l=[],h=[];for(let t=0;a.width>t;t++)for(let e=0;a.height>e;e++)a.data[4*(e*a.width+t)+3]&&(l.push(t),h.push(e));let r=Math.min(...l),n=Math.min(...h),o=e.getImageData(r,n,1+Math.max(...l)-r,1+Math.max(...h)-n);return t.width=o.width,t.height=o.height,e.putImageData(o,0,0),t}function f(t){let e=((t,e,a)=>{let l=Math.floor(t/a),h=Math.floor(e/a),r=[],n=Math.floor(e/(2*h));for(let a=0;h>a;a++){let i=Math.floor(t/((2-a%2)*l));for(let o=0;l-a%2>o;o++)r.push([1e9,1e9,0,0,i+(o+(Math.random()-.5))*t/l,n+(a+(Math.random()-.5))*e/h,[]])}return r})(t.width,t.height,Math.max(12,Math.floor(Math.min(t.width,t.height)/12))),a=t.width,l=t.height,h=i(t);for(let t=0;l>t;t++)for(let l=0;a>l;l++){let r=4*(t*a+l);if(h.data[r+3]){let a,n=1e9;for(let h=0;e.length>h;h++){let r=Math.hypot(e[h][4]-l,e[h][5]-t);n>r&&(n=r,a=e[h])}a[0]=Math.min(l,a[0]),a[2]=Math.max(l,a[2]),a[1]=Math.min(t,a[1]),a[3]=Math.max(t,a[3]),a[6].push([l,t,h.data[r+0],h.data[r+1],h.data[r+2],h.data[r+3]])}}let n=[];return e.map(t=>{if(1e9>t[0]){let e=t[2]-t[0]+1,a=r(e,t[3]-t[1]+1),l=i(a);t[6].map(a=>{let h=4*((a[1]-t[1])*e+(a[0]-t[0]));l.data[h+0]=a[2],l.data[h+1]=a[3],l.data[h+2]=a[4],l.data[h+3]=a[5]}),a.getContext("2d").putImageData(l,0,0),n.push([t[4],t[5],t[0]-t[4],t[1]-t[5],a])}}),n}function M(t,e,a){let l=t[0]-e/2,h=t[1]-a/2,r=Math.hypot(l,h),n=r*r,i=r*(1.5+1.5*Math.random());return[...t,(i-r)*(1-h**2/n)**.5*(l>0?1:-1),(i-r)*(1-l**2/n)**.5*(h>0?1:-1),(720*Math.random()-360*Math.PI)/((Math.random()+2)*t[4].width*18)]}let s=new(window.AudioContext||webkitAudioContext),c=([t,e,a,l,h,r=4,n=0,i=0,o=0,f=0,M=0,c=.1,u=0,d=0,m=0,b=.04,p=0,v=0,g=0])=>{let w,x,y,H,k=2*Math.PI,S=n*=500*k/44100/44100,q=e*=(1+.1*Math.random()-.05)*k/44100,D=[],K=0,O=0,B=0,C=1,I=0,Q=0,j=0;for(M*=500*k/44100**3,d*=k/44100,g*=k/44100,v*=44100,p=44100*p|0,x=(o=44100*o+9)+(b*=44100)+(a*=44100)+(l*=44100)+(f*=44100)|0;x>B;D[B++]=j)++Q%(100*u|0)||(j=r?r>1?r>2?r>3?Math.sin((K%k)**3):Math.max(Math.min(Math.tan(K),1),-1):1-(2*K/k%2+2)%2:1-4*Math.abs(Math.round(K/k)-K/k):Math.sin(K),j=(p?1-i+i*Math.sin(k*B/p):1)*(j>0?1:-1)*Math.abs(j)**c*t*.3*(o>B?B/o:o+b>B?1-(B-o)/b*(1-h):o+b+a>B?h:x-f>B?(x-B-f)/l*h:0),j=f?j/2+(f>B?0:(x-f>B?1:(x-B)/f)*D[B-f|0]/2):j),w=(e+=n+=M)*Math.cos(d*O++),K+=w-w*m*(1-1e9*(Math.sin(B)+1)%2),C&&++C>v&&(e+=g,q+=g,C=0),!p||++I%p||(e=q,n=S,C||=1);return y=s.createBuffer(1,x,44100),y.getChannelData(0).set(D),H=s.createBufferSource(),H.buffer=y,H.connect(s.destination),H.start(),H};function u(){c([.1,467,.06,.14,.58,,,.02,,,,,.4,303,.5,.02])}function d(t){c([t,274,.03,.67,.63,,,,,.25,,1.11,.5,,.8,.02,.04])}function m(){c([.3,279,.09,.09,.89,3,-4.9,.02,.02,.05,-.6,1.2])}function b(t){P.save(),t(),P.restore()}function p(t){let e=r(t.width,t.height),a=i(t),l=a.data;for(let t=0;l.length>t;t+=4){let e=l[t+0],a=l[t+1],h=l[t+2];l[t+0]=255-(.393*e+.769*a+.189*h),l[t+1]=255-(.349*e+.686*a+.168*h),l[t+2]=255-(.272*e+.534*a+.131*h)}return e.getContext("2d").putImageData(a,0,0),e}function v(t){let e=r(20,20),a=e.getContext("2d"),l=a.createRadialGradient(10,10,0,10,10,10);return l.addColorStop(t,"#ff0"),l.addColorStop(1,"#f00"),a.fillStyle=l,n(a,10,10,10),e}function w(t){let e=r(t.width,t.height),a=e.getContext("2d");return a.scale(1,-1),a.drawImage(t,0,0,t.width,-t.height),e}let x,y,H,k,S,q,D,K,O,B,C,I,Q,j,F,N,A,G,U,$,z=["#9af","#abf","#ccf","#fef","#fee","#fc9","#fc6"],L=g,P=L.getContext("2d"),Y=o(h(new t("piBbgDn4CZqlkqiF"),"ie7jMyCFouoUjkVs",60)),Z=f(Y),J=Y.width,T=Y.height,V=Math.floor(J/2),W=Math.floor(T/2),X=i(Y).data,E=(()=>{let t=[Y];for(let e=0;10>e;e++){let a=r(2*J,2*T),l=a.getContext("2d");for(let e=0;3>e;e++)for(let a=0;3>a;a++)l.drawImage(t[0],V-t.length-1+a,W-t.length-1+e);l.globalCompositeOperation="source-in",l.fillStyle=e>5?"#0ff":"#00f",l.fillRect(0,0,a.width,a.height),l.globalCompositeOperation="source-over",l.drawImage(t[0],V-t.length,W-t.length),t.unshift(o(a))}return t.pop(),t.map(e=>{let a=e.getContext("2d");a.globalCompositeOperation="destination-out",a.globalAlpha=.2;for(let l=5;10>l;l++)a.drawImage(t[l],Math.floor((e.width-t[l].width)/2),Math.floor((e.height-t[l].height)/2))}),t.length=5,t})(),R=[],[_,tt]=(()=>{let t=r(20,60),e=t.getContext("2d");return e.fillStyle="#ff0",e.beginPath(),e.moveTo(10,60),e.lineTo(0,10),e.arc(10,10,10,Math.PI,0),e.lineTo(10,60),e.fill(),e.strokeStyle="#0ff",e.shadowColor="#00f",e.globalCompositeOperation="source-atop",e.shadowBlur=4,e.lineWidth=10,e.beginPath(),e.moveTo(10,70),e.lineTo(-3,10),e.arc(10,10,13,Math.PI,0),e.lineTo(10,70),e.stroke(),[t,i(t).data]})(),et=(()=>{let t=[];for(let e=0;9>e;e++)t.unshift(v(e/10)),t.push(v(e/10));return t})(),at=i(et[0]).data,[lt,ht]=(()=>{let t=r(60,60),e=t.getContext("2d"),a=e.createRadialGradient(30,30,0,30,30,30);return a.addColorStop(.6,"#008"),a.addColorStop(1,"#00f"),e.fillStyle=a,n(e,30,30,30),[t,i(t).data]})(),rt=JSON.parse(localStorage.pnf_highscores||0)||[],nt=(()=>{let t=r(100,100),e=t.getContext("2d");e.font="bold 20px Helvetica",e.translate(50,50),e.rotate(-Math.PI/2),e.fillStyle="#fff",e.textAlign="center",e.fillText("NEW!",0,0),o(t);let a=r(t.width+10,t.height+10),l=a.getContext("2d");return l.fillStyle="#f00",l.fillRect(0,0,a.width,a.height),l.drawImage(t,5,5),a})(),it=0,ot=0,ft=[],Mt=0,st=performance.now(),ct=0;function ut(t){j+=t,F=(new Intl.NumberFormat).format(j)}function dt(){let t=Math.max(400,1e3-25*Q);Kt+=qt.p(t,t+400)}function mt(t){let e=o(t[0]);t[1]=i(e).data,t[2]=p(e),t[3]=f(e)}(t=>{let e=r(32,32),a=e.getContext("2d"),l=32,h=32;t.width>t.height?h*=t.height/t.width:l*=t.width/t.height,a.drawImage(t,0,0,l,h);let n=document.createElement("link");n.setAttribute("rel","icon"),n.setAttribute("href",e.toDataURL()),document.head.appendChild(n)})(Y);let bt=[["c4pf4K5xHzu4CyZM","Wl9w64KNQvFNbbbU",50,10,.35,0,[]],["VTjHVRDIYTbXk766","a3QM5c7MnbQlWns3",80,30,.27,0,[]],["1fOXvyryYCvwBWPL","I4xttvPYWxB1So2A",230,80,.2,6,[]],["VsM4qdcBSiuCPDGJ","q4D72OvJMb23kSZC",60,20,.4,0,[]],["l4pyu8yF0mt84Q4u","jPU5GcKNpf2JMgoG",100,40,.35,0,[[350]]],["NMp3mtsPHIwzMKYk","dBzvSKo7wpema3S5",220,90,.22,9,[]],["o67yOby6izpasGgo","fyKKupDEId96qQHu",70,20,.5,0,[[350]]],["IU7xqL8UqZIXJQDQ","aVBO8buAfBbQ4DOY",100,40,.35,0,[[350,6]]],["LP6kUeGMn7S5xZzi","p5O7jAQK67mDULTD",230,100,.25,14,[]],["SsSvCKpjLVTGITYH","aOEjI2Owpqpl06ex",65,30,.5,0,[[350]]],["AGUwhB1E94wgKe49","pwUtokX7oS7ZKFK1",110,50,.35,6,[[350,6]]],["qRF6GA3xnzX0lMcH","RIdNudvB6T2ro7C3",240,120,.3,22,[]]];function pt(t,e){let a=Math.round(t[0]-t[2]/2),l=Math.round(t[1]-t[3]/2),h=Math.round(e[0]-e[2]/2),r=Math.round(e[1]-e[3]/2);if(h+e[2]>a&&a+t[2]>h&&r+e[3]>l&&l+t[3]>r){let n=Math.min(a+t[2],h+e[2]),i=Math.min(l+t[3],r+e[3]),[o,f,M]=a>h?[0,a-h,n-a]:[h-a,0,n-h],[s,c,u]=l>r?[0,l-r,i-l]:[r-l,0,i-r];for(let a=0;u>a;a++)for(let l=0;M>l;l++)if(t[4][4*((s+a)*t[2]+o+l)+3]>0&&e[4][4*((c+a)*e[2]+f+l)+3]>0)return 1}}function vt(){I?(I--,c([.9,119,0,.44,.85,0,5.3,,,.01,-4.2,.09,.1,-340,.7,.08])):K||(d(1),K=1)}let gt,wt,xt,yt=[["F","#fa0",t=>{B=t+6500}],["S","#0ff",()=>{c([.5,505,.12,.46,.69,2,,,.21,,,1.67,,,,.03,.28,.02,58]),I++}],["B","#f00",t=>{d(1.5),C=t+1e3,Kt+=1500}]];function Ht(t,e,a,l,h){return r=>{let n=(r-h)/l;if(1>=n)return b(()=>{P.globalAlpha=1-n**2,P.translate(e+t[0]+t[5]*n,a+t[1]+t[6]*n),P.rotate(t[7]*n),P.drawImage(t[4],t[2],t[3])}),1}}function kt(t,e,a,l,h,r){let n=et[0].width,i=et[0].height,o=Math.hypot(a-t,l-e),f=(a-t)/o,M=(l-e)/o;return a=>{if(C>a)return;let l=a-r;return pt(D,[t+=l*h*f,e+=l*h*M,n,i,at])&&(vt(),!K)||e-i/2>700||0>e+i/2||t-n/2>480||0>t+n/2?void 0:(r=a,P.drawImage(et[a%et.length|0],t-n/2,e-i/2),2)}}function St(t,e,a,l,h,r){let n=[];for(let i=0;t>i;i++){let o=l+2*i*Math.PI/t;n.push(kt(e,a,e+100*Math.cos(o),a+100*Math.sin(o),h,r))}return n}let qt,Dt,Kt,Ot,Bt,Ct,It,Qt,jt=5;function Ft(t){t.preventDefault();let e=480/700,[a,l]=L.offsetWidth/L.offsetHeight>e?[L.offsetHeight*e,L.offsetHeight]:[L.offsetWidth,L.offsetWidth/e],[h]=t.changedTouches||[t];return[Math.floor(480*(h.pageX-(L.offsetWidth-a)/2)/a),Math.floor(700*(h.pageY-(L.offsetHeight-l)/2)/l)]}self.onmousedown=t=>{Ft(t),it=1},self.ontouchstart=t=>{[x,y]=Ft(t),it=1},self.onmousemove=t=>{[H,k]=Ft(t)},self.ontouchmove=t=>{let[e,a]=Ft(t);H+=e-x,k+=a-y,x=e,y=a},self.ontouchend=self.onmouseup=t=>{Ft(t),it=0},self.onkeydown=self.onkeyup=t=>{Mt=ft[t.keyCode]=t.type[5]},L.width=480,L.height=700,function e(a){2===ct?(t=>{let e=t-Qt;Qt=t,e>160&&(st+=e,ft=[]);let a=t-st;if(!K){let t=.6*e,a=ft[38]||ft[90],l=ft[40]||ft[83],h=ft[37]||ft[65],r=ft[39]||ft[68];if(a||l||h||r){let e=t/((a||l)&&(h||r)?2**.5:1);a&&(q-=e),l&&(q+=e),h&&(S-=e),r&&(S+=e),H=S,k=q}else{let e=H-S,a=k-q,l=Math.hypot(e,a);t>l?(S=H,q=k):(S+=e/l*t,q+=a/l*t)}V>S?S=V:S>480-V&&(S=480-V),W>q?q=W:q>700-W&&(q=700-W),D=[S,q,J,T,X]}P.fillStyle="#002",P.fillRect(0,0,480,700);for(let t,e=100;e--;P.fillStyle=z[e%z.length],n(P,Math.floor(-60*(100-e)*(S-V)/(100*(480-J)))+102797*(1+Math.sin(t))*e%540,700*(Math.tan(e/9)+t*a/3e3)%700,3.3*(t-.3)))t=150/(3*e+200);let l=K,h=[],r=[],i=[];function o(t){let e=[],l=t(a,e);l&&(l-2?h.push(t):r.push(t),l.call&&i.push(l)),e.map(o)}if(gt.map(o),!l&&K&&(O=a,Z.map(t=>Ht(M(t,J,T),S-V,q-W,1500,a)).map(o)),gt=h.concat(r),wt=i,P.fillStyle="#fff",P.textAlign="center",K)b(()=>{P.globalAlpha=Math.min(1,(a-O)/2e3),P.textBaseline="middle",P.font="40px Helvetica",P.fillText("Game Over",240,350)});else{if(I){let t=E[Math.max(0,E.length-I)];P.drawImage(t,S-t.width/2,q-t.height/2)}P.drawImage(Y,S-V,q-W)}C>a&&b(()=>{P.globalAlpha=(C-a)/1e3,P.fillRect(0,0,480,700)}),P.textBaseline="top",P.font="16px Helvetica",P.fillText(F,240,5);let f=B>a;if(!K&&a>xt+(f?100:200)&&(jt=-jt,gt.push(((t,e,a)=>l=>{let h=[t,e-=20*(l-a)/32,_.width,_.height,tt];for(let t=0;wt.length>t;t++)if(wt[t](h,10,l))return;if(e+_.height/2>=0)return a=l,P.drawImage(_,t-_.width/2,e-_.height/2),1})(S+(f?jt:0),q-Math.floor(T/2),a)),xt=Math.max(a),c([.04,292,.01,.08,.74,3,-3.9,.43,.02])),a>Ot&&!It&&(++Q%5?Ot=a+1e4:(It=1,gt.push(((t,e)=>{let a,l,h=A.width,r=A.height,n=0,i=e+2e3,o=1e9,f=e,s=240,d=-r/2,p=0,v=0,g=0;function w(t,e,l){if(pt(t,a))return v=l,o-=e,o>0&&u(),1}return(e,u)=>{let x=0;if(o>0){let a=e-f;0===n?e>i&&(n=1):1===n?(d+=.15*a,d>150&&(d=150,o=100+250*t,n=2,l=e)):0===p?(s+=.1*a,s+h/2>480&&(s=480-h/2,p=1)):(s-=.1*a,0>s-h/2&&(s=h/2,p=0))}else x=1;if(x)return c([1.1,369,.1,1,.77,2,.4,,,.37,,.05,.8,-1.3,.7]),ut(500*t),It=0,Ot=e+1e4,Kt=500+e,dt(),Bt=500+e,void $.map(t=>u.push(Ht(M(t,h,r),s-h/2,d-r/2,500,e)));a=[s,d,h,r,G],pt(D,a)&&(K=1),f=e,P.drawImage(A,s-h/2,d-r/2);let y=400-e+v;if(y>0&&b(()=>{P.globalAlpha=y/400,P.drawImage(U,s-h/2,d-r/2)}),!K&&2===n&&e>l){if(m(),5*t>g){let[a,l]=[[28,119],[42,123],[108,94],[121,80],[143,50],[28,119]][Math.floor(g/t)];u.push(kt(s-a,d+l,s-a,d+l+100,.5,e),kt(s+a,d+l,s+a,d+l+100,.5,e))}else u.push(kt(s,d+125,S,q,.3,e));g++,10*t>g?l=g>5*t?e+200:g===5*t?e+800:g%t?e+180:e+500:(g=0,l=e+800)}return w}})(Math.floor(Q/5),a)))),a>Bt&&!It&&(gt.push(((t,e,a,l)=>h=>{let r=[t,e+=5*(h-l)/32,lt.width,lt.height,ht],n=1.5+Math.sin(h/200)/2;if(K||!pt(D,r)){if(700>=e-Math.floor(lt.height/2))return l=h,b(()=>{P.translate(t,e),P.drawImage(lt,-lt.width/2,-lt.height/2),P.textAlign="center",P.textBaseline="top",P.font="700 "+Math.floor(25*n)+"px Helvetica";let l=P.measureText(yt[a][0]),h=l.actualBoundingBoxDescent-l.actualBoundingBoxAscent;P.fillStyle=yt[a][1],P.fillText(yt[a][0],0,-Math.floor(h/2))}),2}else yt[a][2](h)})(Dt.p(30,450),Math.floor(-lt.height/2),Ct++,a)),Ct%=yt.length,Bt=a+9e3),a>Kt&&!It){let t=qt.p(Math.min(Math.max(Q-2,0),R.length-3),Math.min(Q,R.length-1));gt.push((([t,e,a,l,h,r,n,i],o,f,s)=>{let c,p=qt.m(0,2*Math.PI),v=t.width,g=t.height,w=-t.height/2,x=0;function y(t,e,a){if(pt(t,c))return x=a,(h-=e)>0&&u(),1}return(u,H)=>{let k=w,O=0;if(0>=h||C>u?O=1:(w+=(u-s)*r,c=[o,w,v,g,e],pt(D,c)&&(vt(),K||(O=1))),O)return d(v/275),ut(f),n>0&&H.push(...St(n,o,w+17*r,p,.45,u)),void l.map(t=>H.push(Ht(M(t,v,g),o-v/2,w-g/2,500,u)));if(w-g/2>700)return;s=u,P.drawImage(t,o-v/2,w-g/2);let B=400-u+x;if(B>0&&b(()=>{P.globalAlpha=B/400,P.drawImage(a,o-v/2,w-g/2)}),!K)for(let t=0;i.length>t;t++){let e=i[t][0];if(e>k&&w>e){m();let e=i[t][1],a=w+17*r;e?H.push(...St(e,o,a,p,.3,u)):H.push(kt(o,a,S,q,.3,u))}}return y}})(R[t],qt.p(30,450),50*(t+1),a)),dt()}K&&a>O+3500&&((()=>{let t=[j,Date.now()];j&&(rt.push(t),rt.sort((t,e)=>e[0]-t[0]||e[1]-t[1]),rt.length=Math.min(rt.length,5),localStorage.pnf_highscores=JSON.stringify(rt)),N=rt.indexOf(t)})(),ct=1,ot=it)})(a):(e=>{if(P.fillStyle="#002",P.fillRect(0,0,480,700),b(()=>{for(let t=200;t--;){P.fillStyle=z[t%z.length];let a=50/(6-(e/3e3+t/13)%6);P.globalAlpha=Math.min(a/100,1),n(P,Math.cos(t)*a+240,Math.sin(t*t)*a+350,a/200)}}),P.fillStyle="#fff",P.textBaseline="middle",P.textAlign="center",1===ct)P.font="italic small-caps 40px Futura-CondensedMedium,sans-serif-condensed,sans-serif",rt.length?(P.fillText("High Scores",240,100),b(()=>{P.textAlign="start",P.textBaseline="top";for(let t=0;rt.length>t;t++){P.fillStyle="#fff",t===N&&(P.drawImage(nt,90-Math.floor(nt.width/2),185+80*t-Math.floor(nt.height/2)),P.fillStyle="#fc6");let e=Intl.NumberFormat().format(rt[t][0]),a=new Date(rt[t][1]).toLocaleString();P.font="50px Helvetica",P.fillText(t+1,115,160+80*t),P.font="60px Helvetica",P.fillText("{",145,150+80*t),P.font="25px Helvetica",P.fillText(e+" points",170,160+80*t),P.font="15px Helvetica",P.fillText(a,170,190+80*t)}})):P.fillText("Planet Not Found",240,350),P.font="20px Helvetica",P.fillText("<Press anywhere or any key to play>",240,670),it||Mt?ot||(ct=2,qt=new t("enemy"),Dt=new t("powerup"),Kt=1e3,Ot=5e3,Bt=9e3,gt=[],wt=[],Qt=st=performance.now(),ut(Q=Ct=xt=C=B=j=0),K=0,H=S=240,k=q=630,I=1,It=0):ot=0;else if(P.font="italic 30px Helvetica",P.fillText("Loading…",240,350),A)if(bt.length>R.length)R.push((([e,a,l,...r])=>[w(h(new t(e),a,l)),0,0,0,...r])(bt[R.length]));else{for(let t=0;R.length>t;t++)if(!R[t][1])return void mt(R[t]);ct=1}else A=w(o(h(new t("HYj7ADLjQr6icLtO"),"CdiB9N2ZoQWuAxur",270))),U=p(A),$=f(A),G=i(A).data})(a),Mt=0,requestAnimationFrame(e)}(st);
