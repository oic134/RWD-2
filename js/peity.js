// Peity jQuery plugin version 3.3.0
// (c) 2018 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
!function(t,i,e,n){var a=t.fn.peity=function(i,e){return l&&this.each(function(){var n=t(this),h=n.data("_peity");h?(i&&(h.type=i),t.extend(h.opts,e)):(h=new r(n,i,t.extend({},a.defaults[i],n.data("peity"),e)),n.change(function(){h.draw()}).data("_peity",h)),h.draw()}),this},r=function(t,i,e){this.$el=t,this.type=i,this.opts=e},h=r.prototype,s=h.svgElement=function(e,n){return t(i.createElementNS("http://www.w3.org/2000/svg",e)).attr(n)},l="createElementNS"in i&&s("svg",{})[0].createSVGRect;h.draw=function(){var t=this.opts;a.graphers[this.type].call(this,t),t.after&&t.after.call(this,t)},h.fill=function(){var i=this.opts.fill;return t.isFunction(i)?i:function(t,e){return i[e%i.length]}},h.prepare=function(t,i){return this.$svg||this.$el.hide().after(this.$svg=s("svg",{class:"peity"})),this.$svg.empty().data("_peity",this).attr({height:i,width:t})},h.values=function(){return t.map(this.$el.text().split(this.opts.delimiter),function(t){return parseFloat(t)})},a.defaults={},a.graphers={},a.register=function(t,i,e){this.defaults[t]=i,this.graphers[t]=e},a.register("pie",{fill:["#ff9900","#fff4dd","#ffc66e"],radius:8},function(i){if(!i.delimiter){var n=this.$el.text().match(/[^0-9\.]/);i.delimiter=n?n[0]:","}var a=t.map(this.values(),function(t){return t>0?t:0});if("/"==i.delimiter){var r=a[0],h=a[1];a=[r,e.max(0,h-r)]}for(var l=0,p=a.length,o=0;l<p;l++)o+=a[l];o||(p=2,o=1,a=[0,1]);var f=2*i.radius,c=this.prepare(i.width||f,i.height||f),u=c.width()/2,d=c.height()/2,g=e.min(u,d),v=i.innerRadius;"donut"!=this.type||v||(v=.5*g);var m=e.PI,y=this.fill(),w=this.scale=function(t,i){var n=t/o*m*2-m/2;return[i*e.cos(n)+u,i*e.sin(n)+d]},x=0;for(l=0;l<p;l++){var k,$=a[l],j=$/o;if(0!=j){if(1==j)if(v){var A=u-.01,E=d-g,F=d-v;k=s("path",{d:["M",u,E,"A",g,g,0,1,1,A,E,"L",A,F,"A",v,v,0,1,0,u,F].join(" "),"data-value":$})}else k=s("circle",{cx:u,cy:d,"data-value":$,r:g});else{var M=x+$,S=["M"].concat(w(x,g),"A",g,g,0,j>.5?1:0,1,w(M,g),"L");v?S=S.concat(w(M,v),"A",v,v,0,j>.5?1:0,0,w(x,v)):S.push(u,d),x+=$,k=s("path",{d:S.join(" "),"data-value":$})}k.attr("fill",y.call(this,$,l,a)),c.append(k)}}}),a.register("donut",t.extend(!0,{},a.defaults.pie),function(t){a.graphers.pie.call(this,t)}),a.register("line",{delimiter:",",fill:"#c6d9fd",height:16,min:0,stroke:"#4d89f9",strokeWidth:1,width:32},function(t){var i=this.values();1==i.length&&i.push(i[0]);for(var a=e.max.apply(e,t.max==n?i:i.concat(t.max)),r=e.min.apply(e,t.min==n?i:i.concat(t.min)),h=this.prepare(t.width,t.height),l=t.strokeWidth,p=h.width(),o=h.height()-l,f=a-r,c=this.x=function(t){return t*(p/(i.length-1))},u=this.y=function(t){var i=o;return f&&(i-=(t-r)/f*o),i+l/2},d=u(e.max(r,0)),g=[0,d],v=0;v<i.length;v++)g.push(c(v),u(i[v]));g.push(p,d),t.fill&&h.append(s("polygon",{fill:t.fill,points:g.join(" ")})),l&&h.append(s("polyline",{fill:"none",points:g.slice(2,g.length-2).join(" "),stroke:t.stroke,"stroke-width":l,"stroke-linecap":"square"}))}),a.register("bar",{delimiter:",",fill:["#4D89F9"],height:16,min:0,padding:.1,width:32},function(t){for(var i=this.values(),a=e.max.apply(e,t.max==n?i:i.concat(t.max)),r=e.min.apply(e,t.min==n?i:i.concat(t.min)),h=this.prepare(t.width,t.height),l=h.width(),p=h.height(),o=a-r,f=t.padding,c=this.fill(),u=this.x=function(t){return t*l/i.length},d=this.y=function(t){return p-(o?(t-r)/o*p:1)},g=0;g<i.length;g++){var v,m=u(g+f),y=u(g+1-f)-m,w=i[g],x=d(w),k=x,$=x;o?w<0?k=d(e.min(a,0)):$=d(e.max(r,0)):v=1,0==(v=$-k)&&(v=1,a>0&&o&&k--),h.append(s("rect",{"data-value":w,fill:c.call(this,w,g,i),x:m,y:k,width:y,height:v}))}})}(jQuery,document,Math);