"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[289],{9289:(e,r,s)=>{s.r(r),s.d(r,{default:()=>A});var t=s(9216),n=s(5865),i=s(5043),a=s(579);var o=s(899),l=s(4858),d=s(8403),c=s(4194),m=s(1787),u=s(7392),h=s(1906),x=s(5139),p=s(3024),g=s(3216);const j=e=>{let{children:r,onSubmit:s,methods:t}=e;return(0,a.jsx)(l.Op,{...t,children:(0,a.jsx)("form",{onSubmit:s,children:r})})};var f=s(2599);function b(e){let{name:r,helperText:s,...t}=e;const{control:n}=(0,l.xW)();return(0,a.jsx)(l.xI,{name:r,control:n,render:e=>{let{field:r,fieldState:{error:n}}=e;return(0,a.jsx)(f.A,{...r,sx:{width:"50%"},value:"number"===typeof r.value&&0===r.value?"":r.value,error:!!n,helperText:n?n.message:s,...t})}})}var w=s(8069);const v=()=>{const[e,r]=(0,i.useState)(!1),{login:s}=(0,w.A)(),n=(0,g.Zp)(),f=o.Ik().shape({username:o.Yj().required("Username is required"),password:o.Yj().required("Password is required")}),v=(0,l.mN)({resolver:(0,d.t)(f),defaultValues:{username:"",password:""}}),{reset:A,setError:S,handleSubmit:y,formState:{errors:k,isSubmitting:q,isSubmitSuccessful:C}}=v;return(0,a.jsxs)(j,{methods:v,onSubmit:y((async e=>{try{const r=await s(e);if(!r||!r.id)throw new Error("Login failed");n("/")}catch(r){console.log(r),A(),S("afterSubmit",{...r,message:r.message})}})),children:[(0,a.jsxs)(t.A,{spacing:3,children:[!!k.afterSubmit&&(0,a.jsx)(c.A,{severity:"error",children:k.afterSubmit.message}),(0,a.jsx)(b,{fullWidth:!0,name:"username",label:"Username"}),(0,a.jsx)(b,{name:"password",label:"Password",type:e?"text":"password",InputProps:{endAdornment:(0,a.jsx)(m.A,{position:"end",children:(0,a.jsx)(u.A,{onClick:()=>r(!e),children:e?(0,a.jsx)(x.A,{}):(0,a.jsx)(p.A,{})})})}})]}),(0,a.jsx)(t.A,{alignItems:"flex-end",sx:{my:2}}),(0,a.jsx)(h.A,{color:"inherit",size:"large",type:"submit",variant:"contained",sx:{width:"50%",bgcolor:"text.primary",color:e=>"light"===e.palette.mode?"common.white":"grey.800","&:hover":{bgcolor:"text.primary",color:e=>"light"===e.palette.mode?"common.white":"grey.800"}},children:"Login"})]})},A=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(t.A,{spacing:2,sx:{margin:"50px",display:"flex"},children:[(0,a.jsx)(n.A,{variant:"h4",children:"Login to Chat"}),(0,a.jsx)(v,{})]})})}}]);
//# sourceMappingURL=289.1dbf4191.chunk.js.map