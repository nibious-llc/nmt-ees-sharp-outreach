(this.webpackJsonpoutreach_code=this.webpackJsonpoutreach_code||[]).push([[0],{107:function(e,a,t){var n=t(98),r=["SharpInterface"];e.exports=function(){var e=new Worker(t.p+"59867d49b5718a0b5d03.worker.js",{name:"[hash].worker.js"});return n(e,r),e}},108:function(e,a,t){var n=t(98),r=["main"];e.exports=function(){var e=new Worker(t.p+"71271b8f9b721a9cef8d.worker.js",{name:"[hash].worker.js"});return n(e,r),e}},110:function(e,a,t){e.exports=t.p+"static/media/island_schematic.285790b3.webp"},111:function(e,a,t){e.exports=t.p+"static/media/numeric_schematic.b611b769.webp"},112:function(e,a,t){e.exports=t.p+"static/media/matrix.60bbf246.webp"},113:function(e,a,t){e.exports=t.p+"static/media/InterfaceChanges.2b0f8b45.webp"},124:function(e,a,t){e.exports=t(232)},129:function(e,a,t){},130:function(e,a,t){},232:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(14),i=t.n(l),o=(t(129),t(130),t(115)),c=t(282),s=t(265),m=t(266),u=t(268),d=t(235),f=Object(s.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function h(e){var a=f();return r.a.createElement(m.a,{position:"static"},r.a.createElement(u.a,null,r.a.createElement(d.a,{variant:"h6",className:a.title},"NMT EES Sharp Interface Calculator")))}var g=t(9),p=t(78),E=t(283),b=t(234),v=t(271),w=t(272),x=t(269),y=t(270),N=t(287),j=t(19),O=t(288),k=t(289),S=Object(s.a)((function(e){return{formControlLabel:{marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:e.spacing(2),marginTop:0},formLabel:{textAlign:"left",color:"black",marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:0}}}));function T(e){var a=S(),t=Object(n.useState)(e.value),l=Object(g.a)(t,2),i=l[0],o=l[1];function c(a){a<e.min||a>e.max||o(a)}return Object(n.useEffect)((function(){o(e.value)}),[e.value]),r.a.createElement(x.a,null,r.a.createElement(O.a,{className:a.formLabel},e.title),r.a.createElement(y.a,{className:a.formControlLabel,control:r.a.createElement(k.a,{disabled:e.disabled,min:e.min,valueLabelDisplay:e.valueLabelDisplay,max:e.max,step:e.step,value:i,marks:!0,onChange:function(e,a){c(a)},onChangeCommitted:function(a,t){c(t),e.onChange(null,t)}}),label:i}))}var C=t(107),_=t.n(C),z=t(108),I=t.n(z),L=Object(s.a)((function(e){return{root:{margin:e.spacing(2),paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},backdrop:{zIndex:e.zIndex.drawer,position:"absolute",color:"#fff",width:"100%",height:"100%"},graphGrid:{positon:"relative"},updatingText:{color:"white"},formControlLabel:{marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:e.spacing(2),marginTop:0},formLabel:{textAlign:"left",color:"black",marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:0}}}));function M(e){var a=Object(n.useState)(null),t=Object(g.a)(a,2),l=t[0],i=t[1],o=Object(n.useState)(null),c=Object(g.a)(o,2),s=c[0],m=c[1],u=Object(n.useState)(60),f=Object(g.a)(u,2),h=f[0],O=f[1],k=Object(n.useState)(-11),S=Object(g.a)(k,2),C=S[0],z=S[1],M=Object(n.useState)(.009),A=Object(g.a)(M,2),q=A[0],R=A[1],B=Object(n.useState)(.3),W=Object(g.a)(B,2),F=W[0],D=W[1],H=Object(n.useState)(10),G=Object(g.a)(H,2),P=G[0],Q=G[1],V=Object(n.useState)(null),K=Object(g.a)(V,2),J=K[0],U=K[1],Y=Object(n.useState)(!1),Z=Object(g.a)(Y,2),$=Z[0],X=Z[1],ee=Object(n.useState)(null),ae=Object(g.a)(ee,2),te=ae[0],ne=ae[1],re=Object(n.useState)(!0),le=Object(g.a)(re,2),ie=le[0],oe=le[1],ce=Object(n.useState)("Calculating Sharp Interface..."),se=Object(g.a)(ce,2),me=se[0],ue=se[1],de=Object(n.useState)(0),fe=Object(g.a)(de,2),he=fe[0],ge=fe[1],pe=Object(n.useState)(0),Ee=Object(g.a)(pe,2),be=Ee[0],ve=Ee[1],we=Object(n.useState)(0),xe=Object(g.a)(we,2),ye=xe[0],Ne=xe[1],je=Object(n.useState)(0),Oe=Object(g.a)(je,2),ke=Oe[0],Se=Oe[1],Te=Object(n.useState)(null),Ce=Object(g.a)(Te,2),_e=Ce[0],ze=Ce[1],Ie=L();function Le(e,a){return a%7===0}function Me(e,a,t){s.onmessage=function(e){if("results"===e.data.type){var a=e.data.data;a[1]=a[1].filter(Le),ne(a),oe(!1)}},s.postMessage([e,a,t]),oe(!0),ue("Calculating Flow Vectors...")}function Ae(e){var a=Math.min.apply(Math,Object(p.a)(te[0].map((function(e){return e.hfem})))),t=Math.max.apply(Math,Object(p.a)(te[0].map((function(e){return e.hfem})))),n=Math.ceil(255/(t-a)*e);return"rgba("+n.toString()+","+n.toString()+","+(255-n).toString()+",1)"}return function(){j.a.defaults.scatter3D=j.a.defaults.scatter;var e=j.a.controllers.scatter.extend({draw:function(e){var a=this.getMeta();if(a.data.length>0){var t=this.chart.chart.ctx;t.save();for(var n=0;n<a.data.length-22;n++){var r=a.data[n],l=a.data[n+1],i=r._view.x,o=r._view.y,c=l._view.x,s=l._view.y,m=a.data[n+21]._view.x,u=a.data[n+21]._view.y,d=a.data[n+22]._view.x,f=a.data[n+22]._view.y;if(!(i>c)&&!(o<s)){var h=t.createLinearGradient(i,o,m,u);h.addColorStop(0,r._view.backgroundColor),h.addColorStop(1,a.data[n+21]._view.backgroundColor),t.fillStyle=h,t.strokeStyle=h,t.lineWidth=-1,t.beginPath(),t.moveTo(i,o),t.lineTo(m,u),t.lineTo(d,f),t.lineTo(c,s),t.lineTo(i,o),t.stroke(),t.fill()}}t.restore()}}});j.a.controllers.scatter3D=e}(),function(){j.a.defaults.vector=j.a.defaults.scatter;var e=j.a.controllers.scatter.extend({draw:function(e){var a=this.getMeta();if(a.data.length>0){var t=this.chart.chart.ctx;t.save();for(var n=0;n<a.data.length;n++){var r=a.data[n],l=r._view.x,i=r._view.y,o=r._view.rotation.qx,c=r._view.rotation.qz,s=Math.sqrt(Math.pow(c,2)+Math.pow(o,2)),m=Math.atan(o/c);c>0&&(m-=Math.PI);var u=8*s;t.beginPath(),t.strokeStyle="rgba(0,0,0,1)",t.translate(l,i),t.rotate(m),t.moveTo(0,0),t.lineTo(0,u),t.lineTo(-3,u-3),t.moveTo(0,u),t.lineTo(3,u-3),t.rotate(-1*m),t.translate(-1*l,-1*i),t.stroke()}t.restore()}}});j.a.controllers.vector=e}(),Object(n.useEffect)((function(){return i(_()()),m(I()()),function(){l.terminate(),s.terminate()}}),[]),Object(n.useEffect)((function(){null!==l&&(l.onmessage=function(a){"results"===a.data.type&&function(a){var t=Object(g.a)(a,4),n=t[0],r=t[1],l=t[2],i=t[3],o=l[l.length-1],c=r[r.length-1];if(Object(E.a)(o)>-5)return ze("Calculated freshwater thickness less than 5 m thickness. Please choose a lower pumping rate or higher permeability."),void oe(!1);U(i),ne(null),$&&Me(h,c,o),e.OnUpdateData(a),ge(Object(E.b)(Object(E.b)(o),Object(E.b)(c))),ve(Object(E.a)(Object(E.a)(o),Object(E.a)(c))),Ne(Object(E.b)(n)),Se(Object(E.a)(n)),!1===$&&oe(!1)}(a.data.data)},oe(!0),ue("Calculating Sharp Interface..."),ze(null),l.postMessage([h,C,q,F,P]))}),[l,h,C,q,F,P]),r.a.createElement(b.a,{className:Ie.root},r.a.createElement(v.a,{container:!0,spacing:3},r.a.createElement(v.a,{item:!0,md:8,xs:12,className:Ie.graphGrid},r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(j.b,{data:{datasets:$?[{type:"vector",data:null==te?null:te[1].map((function(e){return e.point})),rotation:null==te?null:te[1].map((function(e){return{qx:e.qx/Math.sqrt(Math.pow(e.qx,2)+Math.pow(e.qz,2)),qz:e.qz/Math.sqrt(Math.pow(e.qx,2)+Math.pow(e.qz,2))}})),label:"Flow Vectors",backgroundColor:"#000000"},{type:"scatter3D",data:null==te?null:te[0].map((function(e){return{x:e.x,y:e.z}})),label:"hfem",borderColor:null==te?null:te[0].map((function(e){return Ae(e.hfem)})),pointBackgroundColor:null==te?null:te[0].map((function(e){return Ae(e.hfem)}))}]:[{type:"line",data:null==J?null:J.map((function(e){return{x:e.x,y:e.z}})),fill:"bottom",label:"Seawater",backgroundColor:"#ffab55"},{type:"line",data:null==J?null:J.map((function(e){return{x:e.x,y:e.h}})),fill:0,label:"Fresh Water",backgroundColor:"#72a9e1"}]},title:"Freshwater/Saltwater Interface",options:{scales:{yAxes:[{type:"linear",position:"left",scaleLabel:{display:!0,labelString:"Elevation (m)"},ticks:{suggestedMin:he,suggestedMax:be}}],xAxes:[{beginAtZero:!0,type:"linear",position:"bottom",scaleLabel:{display:!0,labelString:"Distance (m)"},ticks:{suggestedMin:ye,suggestedMax:ke,stepSize:h}}]},tooltips:{enabled:!0,callbacks:{label:function(e,a){var t=a.datasets[e.datasetIndex].label||"";return"scatter3D"===a.datasets[e.datasetIndex].type?"hfem: "+te[0][e.index].hfem.toString():"vector"===a.datasets[e.datasetIndex].type?"":t+": "+e.y},title:function(e,a){return"Values"}}},legend:{onClick:function(e){return e.stopPropagation()},labels:{usePointStyle:!0}}}}),_e&&r.a.createElement(v.a,{container:!0,justify:"center",alignItems:"center",style:{position:"absolute",top:0,bottom:0,left:0,right:0,backgroundColor:"red",opacity:"75%",borderRadius:"15px"}},r.a.createElement(d.a,null,r.a.createElement("b",null,_e))),ie&&r.a.createElement(v.a,{container:!0,justify:"center",alignItems:"center",style:{position:"absolute",top:0,bottom:0,left:0,right:0,backgroundColor:"black",opacity:"75%",borderRadius:"15px"}},r.a.createElement(w.a,null),r.a.createElement(d.a,{className:Ie.updatingText},me)))),r.a.createElement(v.a,{item:!0,md:4,xs:12},r.a.createElement(d.a,{variant:"h1"},"Controls"),r.a.createElement(x.a,null,r.a.createElement(T,{disabled:ie,title:"delx (m): Controls the grid size",min:30,valueLabelDisplay:"auto",max:120,value:h,onChange:function(e,a){return O(a)}}),r.a.createElement(T,{disabled:ie,title:"k (m^2): Controls the permeability of aquifer",min:-14,valueLabelDisplay:"auto",max:-10,step:.1,value:C,onChange:function(e,a){return z(a)}}),r.a.createElement(T,{title:"Rech (m/day): The amount of water replenishing the aquifer",disabled:ie,min:.001,valueLabelDisplay:"auto",max:.02,step:.001,value:q,onChange:function(e,a){return R(a)}}),r.a.createElement(T,{title:"Qp (m^3/day/island area): The pumping rate",disabled:ie,min:.1,valueLabelDisplay:"auto",max:1,step:.05,value:F,onChange:function(e,a){return D(a)}}),r.a.createElement(T,{title:"nQp: The node where pumping occurs from",disabled:ie,min:10,valueLabelDisplay:"auto",max:90,value:P,marks:!0,onChange:function(e,a){return Q(a)}}),r.a.createElement(y.a,{className:Ie.formControlLabel,disabled:ie,control:r.a.createElement(N.a,{color:"primary",checked:$,onChange:function(e){X(e.target.checked),null===te&&e.target.checked&&Me(h,J.map((function(e){return e.h})),J.map((function(e){return e.z})))}}),label:"Calculate Flow Vectors"})))))}var A=t(273),q=t(284),R=t(110),B=t.n(R),W=Object(s.a)((function(e){return{root:{paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},backdrop:{zIndex:e.zIndex.drawer,position:"absolute",color:"#fff",width:"100%",height:"100%"},graphGrid:{positon:"relative"},image:{width:"100%"},text:{margin:e.spacing(2)}}}));function F(e){var a=W();return r.a.createElement(A.a,{maxWidth:"lg"},r.a.createElement(b.a,{className:a.root},r.a.createElement(q.a,{textAlign:"left"},r.a.createElement(d.a,{variant:"h1"},"Introduction"),r.a.createElement(d.a,{className:a.text},"Assessing the effects of pumping on island aquifer systems can be carried out using a sharp-interface model. In sharp interface theory, we solve for the position of the water table and the freshwater-seawater transition zone. Both are surfaces that vary depending on the choice of recharge rate, pumping rate, recharge rate, and island size (here controlled by the nodal spacing (\u0394x). These models are statements of water conservation. That is what is coming in (Recharge across the land surface) must be balanced by what is going out (groundwater pumping and discharge to the ocean). The model is called a distributed parameter model which means that the height of the water table and the saltwater interface can vary in each cell."),r.a.createElement(d.a,{className:a.text},"Initially we will calculate saltwater upconing beneath an island that is 6 km wide island by solving two steady-state groundwater flow equations for fresh and saltwater flow. The position of a single pumping well (Q",r.a.createElement("sub",null,"p"),") can be moved  be from the center of the island (node 50) toward the coast line (node 10). You can change many of the variables using a slider bar.")),r.a.createElement(A.a,{maxWidth:"md"},r.a.createElement("img",{className:a.image,src:B.a,alt:"A view of the island layout"}))))}var D=t(116),H=t(237),G=t(111),P=t.n(G),Q=t(112),V=t.n(Q),K=t(113),J=t.n(K),U=t(6),Y=t.n(U),Z=t(275),$=t(279),X=t(278),ee=t(274),ae=t(276),te=t(277),ne=t(285),re=t(114),le=t.n(re),ie=Object(s.a)((function(e){return{root:{paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},image:{width:"100%"},equationNumber:{marginLeft:e.spacing(2)},definitionButton:Object(D.a)({},e.typography),formControlLabel:{marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:e.spacing(2),marginTop:0},formLabel:{textAlign:"left",color:"black",marginLeft:e.spacing(2),marginRight:e.spacing(2),marginBottom:0}}}));function oe(e){var a=e.tex,t=e.equationNumber,n=ie();return r.a.createElement(v.a,{container:!0,alignItems:"center",justify:"center"},r.a.createElement(v.a,{item:!0},r.a.createElement(Y.a.Node,{formula:a})),r.a.createElement(v.a,{item:!0},r.a.createElement(d.a,{className:n.equationNumber},"(",t,")")))}function ce(e){return r.a.createElement(H.a,{onClick:e.onClick},r.a.createElement(d.a,{variant:"button"},e.children),r.a.createElement(le.a,null))}function se(e){var a=Object(n.useState)(null),t=Object(g.a)(a,2),l=t[0],i=t[1],o=Object(n.useState)(0),c=Object(g.a)(o,2),s=c[0],m=c[1],u=Object(n.useState)(""),f=Object(g.a)(u,2),h=f[0],p=f[1],E=r.a.useState(null),w=Object(g.a)(E,2),x=w[0],y=w[1];var N=function(e,a){y(e.currentTarget),p(a)},O=Boolean(x),k=O?"simple-popover":void 0;Object(n.useEffect)((function(){i(e.data),m(0)}),[e]);var S=ie();return r.a.createElement(A.a,{maxWidth:"lg"},r.a.createElement(b.a,{className:S.root},r.a.createElement(ne.a,{id:k,open:O,anchorEl:x,onClose:function(){y(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},r.a.createElement(d.a,null,h)),r.a.createElement(q.a,{textAlign:"left"},r.a.createElement(Y.a.Provider,null,r.a.createElement(d.a,{variant:"h1"},"Equations"),r.a.createElement(d.a,null,"The ordinary differential equations (one for freshwater and one for saltwater) are given by:"),r.a.createElement(oe,{tex:"\\frac{\\partial }{\\partial x}\\left[T^f\\left(x\\right)\\frac{\\partial h}{\\partial x}\\right]=R-Q_p",equationNumber:"1"}),r.a.createElement(oe,{tex:"\\frac{\\partial }{\\partial x}\\left[\\frac{\\rho_s-\\rho_f}{\\rho_s}T^s\\left(x\\right)\\frac{\\partial z}{\\partial x}+\\frac{\\rho_f}{\\rho_s}T^s\\left(x\\right)\\frac{\\partial h}{\\partial x}\\right]=0",equationNumber:"2"}),r.a.createElement(d.a,null,"where ",r.a.createElement(Y.a.Node,{inline:!0,formula:"T^f"})," is the freshwater ",r.a.createElement(ce,{onClick:function(e){return N(e,"Some Definition Goes Here :-)")}},"transmissivity")," ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(T^f = [K^f(h-z)])"}),", ",r.a.createElement(Y.a.Node,{inline:!0,formula:"T^s"})," is the saltwater transmissivity ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(T^s = abs[-1000 - z]K^s)"}),", ",r.a.createElement(Y.a.Node,{inline:!0,formula:"\\rho_s"})," is salt water density, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"\\rho_f"})," is freshwater density, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h"})," is water table elevation, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"z"}),"  is interface position, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"x"}),"  is lateral distance, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"Q_p"}),"  is the pumping rate, ",r.a.createElement(Y.a.Node,{inline:!0,formula:"K^s"}),"  is the salt water hydraulic conductivity and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"K^f"}),"  is the freshwater hydraulic conductivity, and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"R"}),"  is the recharge rate. Recharge is precipitation minus evapotranspiration. Evapotranspiration is the amount of water removed from the soil by plants and direct evaporation of moisture near the land surface."),r.a.createElement(d.a,{variant:"h2"},"Initial Conditions"),r.a.createElement(d.a,null,"While this is ",r.a.createElement(ce,{onClick:function(e){return N(e,"Some OTHER def goes here")}},"steady-state")," problem, we have to assign initial guesses of the values of ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h(x)"})," and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"z(x)"}),". We initial guesses are:"),r.a.createElement(Y.a.Node,{formula:"h(x) = 0m"}),r.a.createElement(Y.a.Node,{formula:"z(x) = -50m"}),r.a.createElement(d.a,null,"Boundary conditions at the coastlines for ",r.a.createElement(ce,{onClick:function(e){return N(e,"Yet another def")}},"hydraulic head")," ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(h)"})," and the position of the freshwater-saltwater interface ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(z)"})," are given by:"),r.a.createElement(Y.a.Node,{formula:"h(x=0) = h(x=L) = 0 m"}),r.a.createElement(Y.a.Node,{formula:"z(x=0) = z(x=L) = \\frac{-\\rho_f T_f \\frac{\\partial h}{\\partial x}}{K_f (\\rho_s - \\rho_f)}"}),r.a.createElement(d.a,null,"The position of the freshwater-saltwater thickness varies depending on the flux to the coastline (Glover, 1959). Values of variables initially set in the model are listed in Table 1. Some of these variables are listed in Figure 1."),r.a.createElement(A.a,{maxWidth:"md"},r.a.createElement(q.a,{textAlign:"center",alignItems:"center"},r.a.createElement("img",{className:S.image,src:P.a,alt:"Schematic diagram numerical grid used in the sharp interface model to be developed in this assignment."}),r.a.createElement(d.a,{variant:"caption"},r.a.createElement("b",null,"Figure 1.")," ",r.a.createElement("i",null,"Schematic diagram numerical grid used in the sharp interface model to be developed in this assignment.")))),r.a.createElement(d.a,null,"The program must calculate interblock transmisivities due to changes in saturated thickness. The variables listed in Figure 2 are as follows:"),r.a.createElement(v.a,{container:!0,direction:"column"},r.a.createElement(v.a,{container:!0,justify:"center"},r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(Y.a.Node,{formula:"\\text{Bfp}(i)=\\frac{T_i^f+T_{i+1}^f}{2}"})),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(Y.a.Node,{formula:"\\text{Bfm}(i)=\\frac{T_i^f+T_{i-1}^f}{2}"}))),r.a.createElement(v.a,{container:!0,justify:"center"},r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(Y.a.Node,{formula:"\\text{Bsp}(i)=\\frac{T_i^s+T_{i+1}^s}{2}"})),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(Y.a.Node,{formula:"\\text{Bsm}(i)=\\frac{T_i^s+T_{i-1}^s}{2}"}),r.a.createElement(d.a,null,"(3)")))),r.a.createElement(d.a,null,"where the matrix coefficients Bfp, Bfm, Bsp, Bsm are the forward (node ",r.a.createElement(Y.a.Node,{formula:"i",inline:!0})," and ",r.a.createElement(Y.a.Node,{formula:"i+1",inline:!0}),") and backwards (node ",r.a.createElement(Y.a.Node,{formula:"i",inline:!0})," and ",r.a.createElement(Y.a.Node,{formula:"i-1",inline:!0}),") averages of the nodal transmissivities. The letters ",r.a.createElement(Y.a.Node,{formula:"f",inline:!0})," and ",r.a.createElement(Y.a.Node,{formula:"s",inline:!0})," denotes freshwater or saltwater transmissivities. "),r.a.createElement(A.a,{maxWidth:"sm"},r.a.createElement(ee.a,{component:b.a},r.a.createElement(Z.a,null,r.a.createElement(ae.a,null,r.a.createElement(te.a,null,r.a.createElement(X.a,null,"Variable"),r.a.createElement(X.a,null,"Value"),r.a.createElement(X.a,null,"Units"))),r.a.createElement($.a,null,r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"Q_p",inline:!0})),r.a.createElement(X.a,null,"0.07"),r.a.createElement(X.a,null,"m/day")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"nQp",inline:!0})),r.a.createElement(X.a,null,"10"),r.a.createElement(X.a,null,"Pumping Node")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"\\rho_f",inline:!0})),r.a.createElement(X.a,null,"1000"),r.a.createElement(X.a,null,"kg/m",r.a.createElement("sup",null,"3"))),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"\\rho_s",inline:!0})),r.a.createElement(X.a,null,"1025"),r.a.createElement(X.a,null,"kg/m",r.a.createElement("sup",null,"3"))),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"K^s",inline:!0})),r.a.createElement(X.a,null,"7.2"),r.a.createElement(X.a,null,"m/day")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"K^f",inline:!0})),r.a.createElement(X.a,null,"8.5"),r.a.createElement(X.a,null,"m/day")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"\\Delta x",inline:!0})),r.a.createElement(X.a,null,"60"),r.a.createElement(X.a,null,"m")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"Nx",inline:!0})),r.a.createElement(X.a,null,"101"),r.a.createElement(X.a,null,"Number of Nodes")),r.a.createElement(te.a,null,r.a.createElement(X.a,null,r.a.createElement(Y.a.Node,{formula:"R",inline:!0})),r.a.createElement(X.a,null,"0.0019"),r.a.createElement(X.a,null,"m/day"))))),r.a.createElement(q.a,{textAlign:"center",alignItems:"center"},r.a.createElement(d.a,{variant:"caption"},r.a.createElement("b",null,"Table 1.")," List of variables and variable values to be used in this problem set."))),r.a.createElement(d.a,null,"These two equations are non-linear and need to be solved simultaneously.  There are a of 101 nodes and two variables (unknowns: ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h"})," and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"z"}),') yielding 202 "degrees of freedom" (unknowns). In the codes, the boundary conditions (elevations of the interface and water table) are specified for nodes ',r.a.createElement(Y.a.Node,{inline:!0,formula:"(1)"})," and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(101)"}),". The base of the domain is at dynamically calculated. Imposing specified values at the two boundaries reduces the number of unknowns to 198 which is the size of the ",r.a.createElement(Y.a.Node,{inline:!0,formula:"A"})," matrix.  The first two unknowns are ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h(2)"})," and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"z(2)"}),". The last two are ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h(100)"})," and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"z(100)"}),".  The ",r.a.createElement(Y.a.Node,{inline:!0,formula:"A"})," matrix and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"B"})," vector for the first"),r.a.createElement(A.a,{maxWidth:"md"},r.a.createElement(q.a,{textAlign:"center",alignItems:"center"},r.a.createElement("img",{className:S.image,src:V.a,alt:"A Matrix and B vector for sharp interface equations using the finite difference method for the first few unknowns."}),r.a.createElement(d.a,{variant:"caption"},r.a.createElement("b",null,"Figure 2.")," ",r.a.createElement("i",null,r.a.createElement(Y.a.Node,{inline:!0,formula:"A"})," Matrix and ",r.a.createElement(Y.a.Node,{inline:!0,formula:"B"})," vector for sharp interface equations using the finite difference method for the first few unknowns. ")))),r.a.createElement(d.a,null,"four nodes (boundary conditions imposed) is shown in Figure 2. The code uses transmissivity with is the product of saturated thickness (the difference between ",r.a.createElement(Y.a.Node,{inline:!0,formula:"h(x)-z(x)"}),") times the hydraulic conductivity. An illustration of how the saturated thickness changes with each iteration is shown in Figure 3. An interactive model is shown in Figure 4."),r.a.createElement(A.a,{maxWidth:"md"},r.a.createElement(q.a,{textAlign:"center",alignItems:"center"},r.a.createElement("img",{className:S.image,src:J.a,alt:"Changes in saturated thickness (h(x)-z(x))with iteration level."}),r.a.createElement(d.a,{variant:"caption"},r.a.createElement("b",null,"Figure 3.")," Changes in saturated thickness ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(h(x)-z(x))"})," with iteration level."))),r.a.createElement(A.a,{maxWidth:"md"},r.a.createElement(q.a,{textAlign:"center",alignItems:"center"},r.a.createElement(j.b,{data:{labels:null==l?null:l[0],datasets:[{data:null==l?null:l[2][s],fill:"bottom",label:"Seawater",backgroundColor:"#ffab55"},{data:null==l?null:l[1][s],fill:0,label:"Fresh Water",backgroundColor:"#72a9e1"}]},title:"Freshwater/Saltwater Interface",options:{scales:{yAxes:[{scaleLabel:{display:!0,labelString:"Elevation (m)"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Distance (m)"}}]},title:{display:!0,test:""},legend:{onClick:function(e){return e.stopPropagation()},labels:{usePointStyle:!0}}}}),r.a.createElement(T,{title:"Iteration: Change which iteration is displayed",min:0,valueLabelDisplay:"auto",max:9,value:s,onChange:function(e,a){m(a)}}),r.a.createElement(d.a,{variant:"caption"},r.a.createElement("b",null,"Figure 4.")," Changes in saturated thickness ",r.a.createElement(Y.a.Node,{inline:!0,formula:"(h(x)-z(x))"})," with interactive iterations."))),r.a.createElement(d.a,{variant:"h2"},"References"),r.a.createElement(d.a,null,"Glover, R.E., 1959. The pattern of fresh\u2010water flow in a coastal aquifer.\xa0Journal of Geophysical Research,\xa064(4), pp.457-459."),r.a.createElement(d.a,null,"Person, M., Taylor, J. and S. L. Dingman, 1998, Sharp-Interface Models of Salt Water Intrusion and Well Head Delineation on Nantucket Island, Massachusetts, Ground Water, v. 36, p. 731-742.")))))}var me=t(286),ue=t(280),de=t(281),fe=t(291),he=Object(s.a)((function(e){return{root:{margin:e.spacing(2),paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},backdrop:{zIndex:e.zIndex.drawer,position:"absolute",color:"#fff",width:"100%",height:"100%"},graphGrid:{positon:"relative"}}}));function ge(e){var a=he(),t=r.a.useState(1),n=Object(g.a)(t,2),l=n[0],i=n[1],o=r.a.useState(null),c=Object(g.a)(o,2),s=c[0],m=c[1];return r.a.createElement("div",null,r.a.createElement(me.a,{value:l,onChange:function(e,a){i(a)},indicatorColor:"primary",textColor:"primary",centered:!0},r.a.createElement(ue.a,{label:"Seawater Intrusion"}),r.a.createElement(ue.a,{label:"Exercises"}),r.a.createElement(ue.a,{label:"Equations"})),r.a.createElement("div",{hidden:0!==l},r.a.createElement(F,null)),r.a.createElement("div",{hidden:1!==l},r.a.createElement(M,{OnUpdateData:function(e){m(e)}}),r.a.createElement(b.a,{className:a.root},r.a.createElement(q.a,{textAlign:"left"},r.a.createElement(d.a,{variant:"h1"},"Activity Questions"),r.a.createElement(de.a,null,r.a.createElement(fe.a,null,"1. Vary the pumping well position (Iwell) from nodes 41, 61, and 81, How does the position of the pumping well effect the water table and interface position? "),r.a.createElement(fe.a,null,"2. How does hydraulic conductivity and the recharge rate influence saturated thickness?"),r.a.createElement(fe.a,null,"3. How many iterations does it takes to converge (Iter variable). How many iterations does it take to achieve convergence? Plot h and z for each iteration for the model run where Qp is at node 51 to demonstrate convergence."),r.a.createElement(fe.a,null,"4. For Iwell = 41, vary the pumping rate (Qp) between 0.15, 0.165, and 0.17? How does the interface respond to changes in pumping rates?"))))),r.a.createElement("div",{hidden:2!==l},r.a.createElement(se,{data:s})))}var pe=Object(o.a)({spacing:8,typography:{h1:{fontFamily:["Roboto","Helvetica","Arial","sans-serif"],fontSize:"2.75rem",letterSpacing:"-0.01562em",lineHeight:1.167,fontWeight:400,marginTop:16,paddingTop:16},h2:{fontFamily:["Roboto","Helvetica","Arial","sans-serif"],fontSize:"2.25rem",fontWeight:400,letterSpacing:"-0.01562em",lineHeight:1.167,marginTop:16},body1:{fontFamily:["Roboto","Helvetica","Arial","sans-serif"],fontSize:"1rem",fontWeight:400,letterSpacing:"0.00938em",lineHeight:1.5,margin:16},caption:{fontFamily:["Roboto","Helvetica","Arial","sans-serif"],fontSize:"0.75rem",letterSpacing:"0.03333em",lineHeight:1.66,fontStyle:"italic"}}});var Ee=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(c.a,{theme:pe},r.a.createElement(h,null),r.a.createElement(ge,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[124,1,2]]]);
//# sourceMappingURL=main.8ae22c59.chunk.js.map