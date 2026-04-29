import React, { useState, useEffect, useMemo, useRef } from "react";

const T = {
  green:"#25D366",darkGreen:"#1a9d4a",lightGreenBg:"#25D36612",
  appBg:"linear-gradient(160deg,#0f1117,#121318,#10121a)",
  surface:"#1a1d27",surfaceLight:"#222636",surfaceHover:"#2a2e3d",
  darkCard:"#141722",darkCardLight:"#1e2233",
  sms:"#818cf8",smsDark:"#6366f1",smsBg:"#1e1b4b20",
  email:"#fbbf24",emailDark:"#f59e0b",emailBg:"#78350f20",
  text:"#e8eaf0",textMuted:"#8b92a8",textLight:"#5c6378",
  white:"#ffffff",border:"#2a2e3d",borderLight:"#1e2233",
  radius:16,radiusSm:10,radiusXs:6,
  shadow:"0 4px 24px rgba(0,0,0,0.25)",shadowLg:"0 8px 40px rgba(0,0,0,0.35)",
  font:"'DM Sans',sans-serif",fontDisplay:"'Plus Jakarta Sans',sans-serif",
  fontMono:"'DM Mono',monospace",fontSora:"'Sora',sans-serif",
};
// WhatsApp SVG Logo component
function WhatsAppLogo({size=44}){return(<svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill={T.green}/><path d="M31.2 12.7A12.4 12.4 0 0 0 22 9a12.4 12.4 0 0 0-10.8 18.5L9 35l7.7-2a12.4 12.4 0 0 0 5.3 1.2 12.4 12.4 0 0 0 12.4-12.4c0-3.3-1.3-6.4-3.6-8.8l.4-.3ZM22 32.2a10.3 10.3 0 0 1-5.3-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A10.3 10.3 0 0 1 29.2 14a10.3 10.3 0 0 1-7.2 18.2Zm5.6-7.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.9 8.9 0 0 1-4.2-3.7c-.3-.5 0-.5.2-.9l.3-.5.2-.4v-.4l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.5 3.5 0 0 0-1.1 2.6 6.1 6.1 0 0 0 1.3 3.2 13.9 13.9 0 0 0 5.4 4.8 4 4 0 0 0 2.5.5 3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4Z" fill="#fff"/></svg>)}

// ─── INLINE SVG ICON COMPONENT ───────────────────────────────────
const ICONS={
  messageCircle:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  smartphone:"M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z|M12 18h.01",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z|M22 6l-10 7L2 6",
  shoppingCart:"M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z|M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z|M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6",
  car:"M16 3H8l-4 6h20l-4-6z|M3 9v6a2 2 0 0 0 2 2h1a2 2 0 0 1 4 0h4a2 2 0 0 1 4 0h1a2 2 0 0 0 2-2V9|M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z|M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  utensils:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2|M7 2v20|M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7",
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  plane:"M22 2L11 13|M22 2l-7 20-4-9-9-4 20-7z",
  building:"M3 21h18|M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16|M9 7h1|M14 7h1|M9 11h1|M14 11h1|M9 15h1|M14 15h1",
  hospital:"M3 21h18|M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16|M12 7v4|M10 9h4",
  package:"M16.5 9.4l-9-5.19|M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z|M3.27 6.96L12 12.01l8.73-5.05|M12 22.08V12",
  calendar:"M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z|M16 2v4|M8 2v4|M3 10h18",
  creditCard:"M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z|M1 10h22",
  cpu:"M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z|M9 1v3|M15 1v3|M9 20v3|M15 20v3|M1 9h3|M1 15h3|M20 9h3|M20 15h3",
  clipboard:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2|M9 2h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  refreshCw:"M23 4v6h-6|M1 20v-6h6|M3.51 9a9 9 0 0 1 14.85-3.36L23 10|M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  send:"M22 2L11 13|M22 2l-7 20-4-9-9-4 20-7z",
  trendingUp:"M23 6l-9.5 9.5-5-5L1 18|M17 6h6v6",
  trendingDown:"M23 18l-9.5-9.5-5 5L1 6|M17 18h6v-6",
  checkCircle:"M22 11.08V12a10 10 0 1 1-5.93-9.14|M22 4L12 14.01l-3-3",
  alertTriangle:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z|M12 9v4|M12 17h.01",
  dollarSign:"M12 1v22|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  barChart:"M12 20V10|M18 20V4|M6 20v-4",
  target:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z|M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  megaphone:"M3 11l18-5v12L3 13v-2z|M11.6 16.8a3 3 0 1 1-5.8-1.6",
  settings:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3",
  upload:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12",
  globe:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  fileText:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  loader:"M12 2v4|M12 18v4|M4.93 4.93l2.83 2.83|M16.24 16.24l2.83 2.83|M2 12h4|M18 12h4|M4.93 19.07l2.83-2.83|M16.24 7.76l2.83-2.83",
  lightbulb:"M9 18h6|M10 22h4|M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z",
  heart:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  shuffle:"M16 3h5v5|M4 20L21 3|M21 16v5h-5|M15 15l6 6|M4 4l5 5",
  wrench:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  store:"M3 21h18|M3 10v11|M21 10v11|M5 6l7-4 7 4|M4 10h16|M9 21v-4a3 3 0 0 1 6 0v4",
  arrowLeft:"M19 12H5|M12 19l-7-7 7-7",
  circleDot:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};
function Icon({name,size=16,color="currentColor",style={}}){
  const d=ICONS[name];if(!d)return null;
  const paths=d.split("|");
  return(<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,...style}}>{paths.map((p,i)=><path key={i} d={p}/>)}</svg>);
}

const DISCLAIMER_TEXT = "These benchmarks are for simulation purposes only and do not guarantee results. Actual performance may vary based on message quality, audience targeting, and market conditions.";

function Disclaimer({style={}}){return(<div style={{textAlign:"center",padding:"12px 16px",fontSize:11,color:T.textLight,fontStyle:"italic",borderTop:`1px solid ${T.borderLight}`,marginTop:16,...style}}>{DISCLAIMER_TEXT}</div>)}

const CH_CFG = {
  whatsapp:{color:T.green,dark:T.darkGreen,bg:T.lightGreenBg,label:"WhatsApp",icon:"messageCircle"},
  sms:{color:T.sms,dark:T.smsDark,bg:T.smsBg,label:"SMS",icon:"smartphone"},
  email:{color:T.email,dark:T.emailDark,bg:T.emailBg,label:"Email",icon:"mail"},
};
const COUNTRIES=[
{name:"Argentina",region:"LATAM",continent:"Americas",wap:0.0520,sms:0.0200},{name:"Australia",region:"Developed Asia",continent:"Asia Pacific",wap:0.0732,sms:0.0550},{name:"Bangladesh",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0180,sms:0.0080},{name:"Brazil",region:"LATAM",continent:"Americas",wap:0.0625,sms:0.0250},{name:"Cambodia",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0300,sms:0.0120},{name:"Canada",region:"Developed West",continent:"Americas",wap:0.0260,sms:0.0085},{name:"Chile",region:"LATAM",continent:"Americas",wap:0.0450,sms:0.0190},{name:"Colombia",region:"LATAM",continent:"Americas",wap:0.0380,sms:0.0160},{name:"Denmark",region:"Developed West",continent:"Europe",wap:0.0660,sms:0.0540},{name:"Egypt",region:"MENA",continent:"Middle East & Africa",wap:0.0700,sms:0.0280},{name:"France",region:"Developed West",continent:"Europe",wap:0.1037,sms:0.0700},{name:"Germany",region:"Developed West",continent:"Europe",wap:0.1233,sms:0.0750},{name:"Hong Kong",region:"Developed Asia",continent:"Asia Pacific",wap:0.0745,sms:0.0520},{name:"India",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0095,sms:0.0045},{name:"Indonesia",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0362,sms:0.0180},{name:"Ireland",region:"Developed West",continent:"Europe",wap:0.0520,sms:0.0450},{name:"Israel",region:"MENA",continent:"Middle East & Africa",wap:0.0310,sms:0.0250},{name:"Italy",region:"Developed West",continent:"Europe",wap:0.0610,sms:0.0550},{name:"Japan",region:"Developed Asia",continent:"Asia Pacific",wap:0.1100,sms:0.0600},{name:"Malaysia",region:"Developed Asia",continent:"Asia Pacific",wap:0.0860,sms:0.0350},{name:"Mexico",region:"LATAM",continent:"Americas",wap:0.0420,sms:0.0180},{name:"Myanmar",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0310,sms:0.0130},{name:"Netherlands",region:"Developed West",continent:"Europe",wap:0.1020,sms:0.0680},{name:"New Zealand",region:"Developed Asia",continent:"Asia Pacific",wap:0.0750,sms:0.0500},{name:"Norway",region:"Developed West",continent:"Europe",wap:0.0680,sms:0.0560},{name:"Pakistan",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0200,sms:0.0090},{name:"Peru",region:"LATAM",continent:"Americas",wap:0.0360,sms:0.0150},{name:"Philippines",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0340,sms:0.0150},{name:"Poland",region:"Developed West",continent:"Europe",wap:0.0580,sms:0.0350},{name:"Portugal",region:"Developed West",continent:"Europe",wap:0.0480,sms:0.0380},{name:"Qatar",region:"MENA",continent:"Middle East & Africa",wap:0.0420,sms:0.0360},{name:"Saudi Arabia",region:"MENA",continent:"Middle East & Africa",wap:0.0430,sms:0.0350},{name:"Singapore",region:"Developed Asia",continent:"Asia Pacific",wap:0.0732,sms:0.0420},{name:"South Africa",region:"MENA",continent:"Middle East & Africa",wap:0.0380,sms:0.0200},{name:"South Korea",region:"Developed Asia",continent:"Asia Pacific",wap:0.0980,sms:0.0450},{name:"Spain",region:"Developed West",continent:"Europe",wap:0.0535,sms:0.0480},{name:"Sri Lanka",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0280,sms:0.0120},{name:"Sweden",region:"Developed West",continent:"Europe",wap:0.0640,sms:0.0520},{name:"Switzerland",region:"Developed West",continent:"Europe",wap:0.0870,sms:0.0700},{name:"Taiwan",region:"Developed Asia",continent:"Asia Pacific",wap:0.0820,sms:0.0400},{name:"Thailand",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0350,sms:0.0160},{name:"Turkey",region:"MENA",continent:"Middle East & Africa",wap:0.0170,sms:0.0100},{name:"UAE",region:"MENA",continent:"Middle East & Africa",wap:0.0450,sms:0.0380},{name:"UK",region:"Developed West",continent:"Europe",wap:0.0485,sms:0.0650},{name:"US",region:"Developed West",continent:"Americas",wap:0.0250,sms:0.0080},{name:"Vietnam",region:"Emerging Asia",continent:"Asia Pacific",wap:0.0320,sms:0.0140}
];
const CONTINENTS=["Asia Pacific","Europe","Americas","Middle East & Africa"];
const REGIONS=["Developed West","Developed Asia","Emerging Asia","LATAM","MENA"];
const INDUSTRIES=[
{name:"E-commerce",archetype:"direct",rateLabel:"Conversion Rate"},{name:"Travel & Hospitality",archetype:"direct",rateLabel:"Booking Rate"},{name:"Food Delivery",archetype:"direct",rateLabel:"Order Rate"},{name:"Financial Services",archetype:"direct",rateLabel:"Conversion Rate"},{name:"Automotive",archetype:"leadgen",rateLabel:"Message-to-Test-Drive Rate"},{name:"Real Estate",archetype:"leadgen",rateLabel:"Message-to-Booking Rate"},{name:"Insurance",archetype:"leadgen",rateLabel:"Message-to-Policy Rate"},{name:"Education",archetype:"leadgen",rateLabel:"Message-to-Enrollment Rate"},{name:"Retail (Physical)",archetype:"footfall",rateLabel:"Store Visit Rate"},{name:"QSR",archetype:"footfall",rateLabel:"Order Rate"},{name:"Healthcare",archetype:"footfall",rateLabel:"Appointment Rate"},
];
const CONV={"Developed West":{"E-commerce":1.8,"Travel & Hospitality":2.2,"Food Delivery":2.5,"Financial Services":1.5,"Automotive":0.8,"Real Estate":0.5,"Insurance":1.0,"Education":1.2,"Retail (Physical)":2.0,"QSR":3.0,"Healthcare":2.5},"Developed Asia":{"E-commerce":2.2,"Travel & Hospitality":2.5,"Food Delivery":3.0,"Financial Services":1.8,"Automotive":0.9,"Real Estate":0.6,"Insurance":1.2,"Education":1.5,"Retail (Physical)":2.5,"QSR":3.5,"Healthcare":2.8},"Emerging Asia":{"E-commerce":2.8,"Travel & Hospitality":3.0,"Food Delivery":5.0,"Financial Services":2.0,"Automotive":1.0,"Real Estate":0.7,"Insurance":1.4,"Education":1.8,"Retail (Physical)":3.0,"QSR":4.8,"Healthcare":3.5},"LATAM":{"E-commerce":3.2,"Travel & Hospitality":3.0,"Food Delivery":5.5,"Financial Services":2.0,"Automotive":0.9,"Real Estate":0.6,"Insurance":1.3,"Education":1.8,"Retail (Physical)":3.0,"QSR":5.0,"Healthcare":3.5},"MENA":{"E-commerce":2.5,"Travel & Hospitality":3.2,"Food Delivery":4.0,"Financial Services":2.0,"Automotive":1.0,"Real Estate":0.8,"Insurance":1.3,"Education":1.6,"Retail (Physical)":2.8,"QSR":4.2,"Healthcare":3.2}};
const BENCH={whatsapp:{"Developed West":{deliveryRate:96,openRate:90,ctr:25},"Developed Asia":{deliveryRate:97,openRate:95,ctr:28},"Emerging Asia":{deliveryRate:97,openRate:98,ctr:35},"LATAM":{deliveryRate:97,openRate:98,ctr:38},"MENA":{deliveryRate:96,openRate:97,ctr:32}},sms:{"Developed West":{deliveryRate:90,openRate:98,ctr:20},"Developed Asia":{deliveryRate:88,openRate:98,ctr:18},"Emerging Asia":{deliveryRate:82,openRate:98,ctr:12},"LATAM":{deliveryRate:80,openRate:98,ctr:10},"MENA":{deliveryRate:83,openRate:98,ctr:11}},email:{"Developed West":{deliveryRate:90,openRate:26,ctr:2.3},"Developed Asia":{deliveryRate:88,openRate:24,ctr:2.0},"Emerging Asia":{deliveryRate:85,openRate:21,ctr:1.8},"LATAM":{deliveryRate:84,openRate:20,ctr:2.0},"MENA":{deliveryRate:86,openRate:22,ctr:1.9}}};
const CURRENCIES={"Argentina":{code:"ARS",symbol:"AR$",rate:870},"Australia":{code:"AUD",symbol:"A$",rate:1.53},"Bangladesh":{code:"BDT",symbol:"\u09F3",rate:110},"Brazil":{code:"BRL",symbol:"R$",rate:4.95},"Cambodia":{code:"KHR",symbol:"\u17DB",rate:4100},"Canada":{code:"CAD",symbol:"C$",rate:1.36},"Chile":{code:"CLP",symbol:"CL$",rate:890},"Colombia":{code:"COP",symbol:"COL$",rate:3950},"Denmark":{code:"DKK",symbol:"kr",rate:6.88},"Egypt":{code:"EGP",symbol:"E\u00A3",rate:30.90},"France":{code:"EUR",symbol:"\u20AC",rate:0.92},"Germany":{code:"EUR",symbol:"\u20AC",rate:0.92},"Hong Kong":{code:"HKD",symbol:"HK$",rate:7.82},"India":{code:"INR",symbol:"\u20B9",rate:83.50},"Indonesia":{code:"IDR",symbol:"Rp",rate:15700},"Ireland":{code:"EUR",symbol:"\u20AC",rate:0.92},"Israel":{code:"ILS",symbol:"\u20AA",rate:3.68},"Italy":{code:"EUR",symbol:"\u20AC",rate:0.92},"Japan":{code:"JPY",symbol:"\u00A5",rate:149.50},"Malaysia":{code:"MYR",symbol:"RM",rate:4.42},"Mexico":{code:"MXN",symbol:"MX$",rate:17.20},"Myanmar":{code:"MMK",symbol:"K",rate:2100},"Netherlands":{code:"EUR",symbol:"\u20AC",rate:0.92},"New Zealand":{code:"NZD",symbol:"NZ$",rate:1.66},"Norway":{code:"NOK",symbol:"kr",rate:10.80},"Pakistan":{code:"PKR",symbol:"Rs",rate:280},"Peru":{code:"PEN",symbol:"S/",rate:3.72},"Philippines":{code:"PHP",symbol:"\u20B1",rate:56.20},"Poland":{code:"PLN",symbol:"z\u0142",rate:4.05},"Portugal":{code:"EUR",symbol:"\u20AC",rate:0.92},"Qatar":{code:"QAR",symbol:"QR",rate:3.64},"Saudi Arabia":{code:"SAR",symbol:"\uFDFC",rate:3.75},"Singapore":{code:"SGD",symbol:"S$",rate:1.34},"South Africa":{code:"ZAR",symbol:"R",rate:18.80},"South Korea":{code:"KRW",symbol:"\u20A9",rate:1320},"Spain":{code:"EUR",symbol:"\u20AC",rate:0.92},"Sri Lanka":{code:"LKR",symbol:"Rs",rate:320},"Sweden":{code:"SEK",symbol:"kr",rate:10.50},"Switzerland":{code:"CHF",symbol:"CHF",rate:0.88},"Taiwan":{code:"TWD",symbol:"NT$",rate:31.50},"Thailand":{code:"THB",symbol:"\u0E3F",rate:35.80},"Turkey":{code:"TRY",symbol:"\u20BA",rate:32.50},"UAE":{code:"AED",symbol:"\u062F.\u0625",rate:3.67},"UK":{code:"GBP",symbol:"\u00A3",rate:0.79},"US":{code:"USD",symbol:"$",rate:1},"Vietnam":{code:"VND",symbol:"\u20AB",rate:24500}};

// ─── UTILITY ─────────────────────────────────────────────────────
const fmt=(n,d=0)=>{if(n==null||isNaN(n))return"0";if(Math.abs(n)>=1e9)return(n/1e9).toFixed(1)+"B";if(Math.abs(n)>=1e6)return(n/1e6).toFixed(1)+"M";if(Math.abs(n)>=1e4)return(n/1e3).toFixed(1)+"K";return n.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d})};
const fmtMoney=(n)=>{if(n==null||isNaN(n))return"$0";const a=Math.abs(n),s=n<0?"-":"";if(a>=1e9)return s+"$"+(a/1e9).toFixed(2)+"B";if(a>=1e6)return s+"$"+(a/1e6).toFixed(2)+"M";if(a>=1e3)return s+"$"+(a/1e3).toFixed(1)+"K";return s+"$"+a.toFixed(2)};
const pct=(n,d=1)=>(n||0).toFixed(d)+"%";

// ─── CURRENCY-AWARE DISPLAY MONEY (dm) ───────────────────────────
// Module-level state set by App on each render cycle.
// All results components call dm() which reads these.
let _cRate=1, _cSym="$", _cCode="USD";
const dm=(n)=>{
  if(n==null||isNaN(n))return _cSym+"0";
  const c=n*_cRate,a=Math.abs(c),s=c<0?"-":"",noDec=_cRate>=10;
  if(a>=1e9)return s+_cSym+(a/1e9).toFixed(2)+"B";
  if(a>=1e6)return s+_cSym+(a/1e6).toFixed(2)+"M";
  if(a>=1e3)return s+_cSym+(a/1e3).toFixed(noDec?0:1)+"K";
  return s+_cSym+a.toFixed(noDec?0:2);
};

const deriveAdv=(inp,dealValue,bspMonthly=0)=>{
  const perBroadcast=inp.messages||0,freq=inp.broadcastsPerMonth||1,
    m=perBroadcast*freq, // total monthly messages = per-broadcast × frequency
    dr=(inp.deliveryRate||0)/100,or=(inp.openRate||0)/100,
    ctrV=(inp.ctr||0)/100,cv=(inp.convRate||0)/100,oo=(inp.optOutRate||0)/100,cpm=inp.costPerMsg||0;
  const delivered=m*dr,opened=delivered*or,clicked=opened*ctrV,conversions=clicked*cv,
    revenue=conversions*dealValue,msgSpend=m*cpm,spend=msgSpend+bspMonthly,roi=spend>0?revenue/spend:0,
    rev1k=m>0?(conversions/m)*1000*dealValue:0,cpConv=conversions>0?spend/conversions:0,
    cpClick=clicked>0?spend/clicked:0,reachRate=dr*or*100,moLost=m*oo,yrLost=moLost*12,
    revAtRisk=yrLost*dr*or*ctrV*cv*dealValue;
  return{messages:m,messagesPerBroadcast:perBroadcast,broadcastsPerMonth:freq,delivered,opened,clicked,conversions,revenue,msgSpend,spend,bspMonthlyFee:bspMonthly,roi,rev1k,cpConv,cpClick,
    reachRate,moLost,yrLost,revAtRisk,deliveryRate:inp.deliveryRate,openRate:inp.openRate,
    ctr:inp.ctr,convRate:inp.convRate,optOutRate:inp.optOutRate,costPerMsg:cpm};
};

const globalCSS=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;-webkit-font-smoothing:antialiased}
body{font-family:${T.font};color:${T.text};background:${T.appBg};min-height:100vh}
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
input[type=number]{-moz-appearance:textfield}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2e3d;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#3a3f52}
input[type=range]{cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${T.green};border:3px solid ${T.surface};box-shadow:0 1px 4px rgba(0,0,0,0.5);cursor:pointer;margin-top:-7px}
input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:${T.green};border:3px solid ${T.surface};box-shadow:0 1px 4px rgba(0,0,0,0.5);cursor:pointer}
@media(max-width:640px){html{font-size:14px}}
`;

// ─── ANIMATED COUNT-UP HOOK ──────────────────────────────────────
function useCountUp(target,duration=600){
  const[val,setVal]=useState(0);
  const prev=useRef(0);
  useEffect(()=>{
    if(target===prev.current)return;
    const start=prev.current,diff=target-start;
    const t0=performance.now();
    const tick=(now)=>{
      const elapsed=now-t0,progress=Math.min(elapsed/duration,1);
      const eased=1-Math.pow(1-progress,3); // easeOutCubic
      setVal(start+diff*eased);
      if(progress<1)requestAnimationFrame(tick);
      else{setVal(target);prev.current=target}
    };
    requestAnimationFrame(tick);
  },[target,duration]);
  return val;
}

function AnimatedValue({value,format="money",color,style={}}){
  const num=typeof value==="number"?value:parseFloat(value)||0;
  const animated=useCountUp(num);
  const display=format==="money"?dm(animated):format==="pct"?animated.toFixed(1)+"%":format==="roi"?animated.toFixed(1)+"\u00D7":format==="int"?fmt(Math.round(animated)):dm(animated);
  return <span style={style}>{display}</span>;
}

// ─── RESULTS HERO CARD ──────────────────────────────────────────
function ResultsHeroCard({revenue,roi,mode:m,savings,clientName:cn}){
  const isUtility=m==="utility";
  const mainValue=isUtility?(savings||0):(revenue||0);
  const mainLabel=isUtility?"Monthly Cost Savings":"Monthly Revenue";
  const roiColor=roi>=5?T.green:roi>=2?"#fbbf24":"#f87171";
  const bgGrad=roi>=3?`linear-gradient(135deg,#0a2618,#0d3320)`:roi>=1.5?`linear-gradient(135deg,#2a1f0a,#332608)`:`linear-gradient(135deg,#2a0a0a,#331010)`;
  return(
    <div style={{
      background:bgGrad,borderRadius:T.radius,padding:"32px 24px",marginBottom:24,
      textAlign:"center",animation:"fadeUp 0.5s ease both",
      border:`1.5px solid ${roi>=3?T.green+"30":roi>=1.5?"#fbbf2430":"#f8717130"}`,
    }}>
      {cn&&<div style={{fontSize:12,color:T.textMuted,fontFamily:T.fontMono,marginBottom:8}}>Results for {cn}</div>}
      <div style={{fontSize:13,color:T.textMuted,fontFamily:T.font,fontWeight:500,marginBottom:4}}>{mainLabel}</div>
      <div style={{fontSize:"clamp(36px,6vw,52px)",fontWeight:900,fontFamily:T.fontDisplay,color:T.darkGreen,letterSpacing:"-0.03em",lineHeight:1.1}}>
        <AnimatedValue value={mainValue} format="money"/>
      </div>
      <div style={{fontSize:14,color:T.textMuted,marginTop:8,fontFamily:T.font}}>
        <span style={{fontWeight:700,color:roiColor,fontFamily:T.fontDisplay,fontSize:20}}>
          <AnimatedValue value={roi} format="roi"/>
        </span>
        <span style={{marginLeft:6}}>return on spend</span>
      </div>
      <div style={{fontSize:12,color:T.textLight,marginTop:6,fontFamily:T.fontMono}}>
        {dm(mainValue*12)} projected annually
      </div>
    </div>
  );
}

function Tooltip({text,children}){const[s,set]=useState(false);return(<span style={{position:"relative",display:"inline-flex",alignItems:"center"}} onMouseEnter={()=>set(true)} onMouseLeave={()=>set(false)}>{children}{s&&<span style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",background:T.darkCard,color:"#fff",padding:"8px 12px",borderRadius:T.radiusXs,fontSize:12,fontFamily:T.font,zIndex:1000,animation:"fadeIn 0.15s ease",boxShadow:T.shadowLg,maxWidth:280,whiteSpace:"normal",textAlign:"center",lineHeight:1.4}}>{text}<span style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",border:"5px solid transparent",borderTopColor:T.darkCard}}/></span>}</span>)}

function Card({children,style,delay=0,onClick}){const[h,set]=useState(false);return(<div onClick={onClick} onMouseEnter={()=>onClick&&set(true)} onMouseLeave={()=>set(false)} style={{background:T.surface,borderRadius:T.radius,padding:24,boxShadow:h?T.shadowLg:T.shadow,border:`1px solid ${T.border}`,animation:`fadeUp 0.5s ease ${delay}s both`,transition:"all 0.25s ease",transform:h?"translateY(-2px)":"none",cursor:onClick?"pointer":"default",...style}}>{children}</div>)}

function InsightBox({pills=[],narrative,color=T.green,delay=0}){return(<div style={{background:T.darkCard,borderRadius:T.radius,padding:24,animation:`fadeUp 0.5s ease ${delay}s both`,color:"#fff",border:`1px solid ${T.darkCardLight}`}}>{pills.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>{pills.map((p,i)=><span key={i} style={{display:"inline-flex",alignItems:"center",gap:6,background:`${p.color||color}18`,color:p.color||color,padding:"6px 14px",borderRadius:20,fontSize:13,fontFamily:T.fontMono,fontWeight:500,border:`1px solid ${p.color||color}30`}}>{p.icon&&<span>{p.icon}</span>}{p.label}: <strong>{p.value}</strong></span>)}</div>}{narrative&&<p style={{fontSize:14,lineHeight:1.7,color:T.textMuted,fontFamily:T.font,margin:0}}>{narrative}</p>}</div>)}

function StepIndicator({steps,current,onStep}){return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginBottom:32}}>{steps.map((s,i)=>{const a=i===current,d=i<current;return <div key={i} style={{display:"flex",alignItems:"center",gap:4}}><button onClick={()=>d&&onStep(i)} style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:a?T.green:d?T.darkGreen:T.surfaceHover,color:a||d?"#fff":T.textMuted,border:"none",cursor:d?"pointer":"default",fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,transition:"all 0.3s ease",boxShadow:a?`0 0 0 4px ${T.green}30`:"none"}}>{d?"\u2713":i+1}</button>{i<steps.length-1&&<div style={{width:32,height:2,borderRadius:1,background:d?T.darkGreen:T.surfaceHover,transition:"background 0.3s ease"}}/>}</div>})}</div>)}

function Btn({children,onClick,variant="primary",disabled=false,style:st={},size="md"}){const[h,set]=useState(false);const base={border:"none",cursor:disabled?"not-allowed":"pointer",fontFamily:T.fontDisplay,fontWeight:700,borderRadius:T.radiusSm,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s ease",opacity:disabled?0.5:1,fontSize:size==="sm"?13:size==="lg"?16:14,padding:size==="sm"?"8px 16px":size==="lg"?"14px 28px":"11px 22px"};const vars={primary:{background:h&&!disabled?T.darkGreen:T.green,color:"#fff",boxShadow:h?`0 4px 16px ${T.green}40`:"none"},secondary:{background:h&&!disabled?T.surfaceHover:T.surface,color:T.text,border:`1px solid ${T.border}`},ghost:{background:h&&!disabled?T.surfaceHover:"transparent",color:T.textMuted},dark:{background:h&&!disabled?T.surfaceLight:T.darkCard,color:"#fff"}};return <button onClick={disabled?undefined:onClick} onMouseEnter={()=>set(true)} onMouseLeave={()=>set(false)} style={{...base,...vars[variant],...st}}>{children}</button>}

function InputField({label,value,onChange,suffix,prefix,tooltip,min,max,step,disabled,style:ws}){const[f,set]=useState(false);return(<div style={{marginBottom:16,...ws}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><label style={{fontSize:13,fontWeight:600,color:T.textMuted,fontFamily:T.font}}>{label}</label>{tooltip&&<Tooltip text={tooltip}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:16,height:16,borderRadius:"50%",background:T.surfaceHover,fontSize:10,color:T.textMuted,cursor:"help",fontWeight:700}}>?</span></Tooltip>}</div><div style={{display:"flex",alignItems:"center",borderRadius:T.radiusXs,border:`1.5px solid ${f?T.green:T.border}`,background:disabled?T.darkCard:T.surfaceLight,transition:"border-color 0.2s ease",boxShadow:f?`0 0 0 3px ${T.green}15`:"none",overflow:"hidden"}}>{prefix&&<span style={{padding:"0 0 0 12px",fontSize:14,color:T.textMuted,fontFamily:T.fontMono,fontWeight:500}}>{prefix}</span>}<input type="number" value={value} onChange={e=>{const v=e.target.value;onChange(v===""?"":parseFloat(v)||0)}} onFocus={()=>set(true)} onBlur={()=>set(false)} min={min} max={max} step={step||"any"} disabled={disabled} style={{flex:1,border:"none",outline:"none",padding:"10px 12px",fontSize:14,fontFamily:T.fontMono,fontWeight:500,color:T.text,background:"transparent",width:"100%"}}/>{suffix&&<span style={{padding:"0 12px 0 0",fontSize:13,color:T.textMuted,fontFamily:T.fontMono}}>{suffix}</span>}</div></div>)}

function TabBar({tabs,active,onChange}){return(<div style={{display:"flex",gap:2,background:T.darkCard,borderRadius:T.radiusSm,padding:3,marginBottom:24,overflowX:"auto"}}>{tabs.map((t,i)=><button key={i} onClick={()=>onChange(i)} style={{flex:1,padding:"10px 14px",border:"none",cursor:"pointer",borderRadius:T.radiusXs,fontFamily:T.fontDisplay,fontWeight:600,fontSize:13,whiteSpace:"nowrap",background:active===i?T.surfaceLight:"transparent",color:active===i?T.text:T.textMuted,boxShadow:active===i?"0 1px 4px rgba(0,0,0,0.2)":"none",transition:"all 0.2s ease"}}>{t}</button>)}</div>)}

function ModeToggle({mode,setMode}){return (<div style={{display:"flex",gap:2,background:T.darkCard,borderRadius:T.radiusSm,padding:3,width:"fit-content"}}>{[{k:"basic",l:"Basic"},{k:"advanced",l:"Advanced"},{k:"utility",l:"Utility"}].map(m=> <button key={m.k} onClick={()=>setMode(m.k)} style={{padding:"8px 16px",border:"none",cursor:"pointer",borderRadius:T.radiusXs,fontFamily:T.fontDisplay,fontWeight:700,fontSize:12,background:mode===m.k?T.green:"transparent",color:mode===m.k?"#fff":T.textMuted,transition:"all 0.2s ease",whiteSpace:"nowrap"}}>{m.l}</button>)}</div>)}

function MetricCard({label,value,subtext,color,icon,delay=0}){return(<div style={{background:`${color}08`,border:`1px solid ${color}20`,borderRadius:T.radiusSm,padding:"16px 18px",animation:`fadeUp 0.4s ease ${delay}s both`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>{icon&&<span style={{fontSize:14}}>{icon}</span>}<span style={{fontSize:12,color:T.textMuted,fontFamily:T.font,fontWeight:500}}>{label}</span></div><div style={{fontSize:22,fontWeight:800,fontFamily:T.fontDisplay,color,letterSpacing:"-0.02em"}}>{value}</div>{subtext&&<div style={{fontSize:11,color:T.textMuted,marginTop:4,fontFamily:T.fontMono}}>{subtext}</div>}</div>)}

function ChannelInputPanel({channel,inputs,onChange,region,country,rateLabel}){
  const cfg=CH_CFG[channel],bench=BENCH[channel]?.[region];if(!bench)return null;
  const u=(f,v)=>onChange({...inputs,[f]:v});
  const cont=country?.continent||"";
  const[benchOpen,setBenchOpen]=useState(false);
  return(<Card style={{borderTop:`3px solid ${cfg.color}`,marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><Icon name={cfg.icon} size={20} color={cfg.color}/><span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:18,color:cfg.dark}}>{cfg.label}</span><span style={{padding:"3px 10px",borderRadius:12,background:cfg.bg,fontSize:11,fontFamily:T.fontMono,color:cfg.dark,fontWeight:500}}>{cont}</span></div>
    {/* Primary inputs — always visible */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0 20px"}}>
      <InputField label="Messages per Broadcast" value={inputs.messages} onChange={v=>u("messages",v)} tooltip="Number of subscribers/recipients per broadcast send" min={0}/>
      <InputField label="Broadcasts / Month" value={inputs.broadcastsPerMonth} onChange={v=>u("broadcastsPerMonth",v)} tooltip="How many times per month do you send broadcast campaigns? e.g. 4 = weekly, 8 = twice a week" min={1} max={30}/>
      <InputField label="Cost per Message" value={inputs.costPerMsg} onChange={v=>u("costPerMsg",v)} prefix="$" tooltip={channel==="email"?"Your email platform cost per send":`${cfg.label} cost in ${country?.name||"selected country"}`} min={0} step={0.001}/>
    </div>
    {/* Collapsible funnel benchmarks */}
    <div style={{marginTop:4}}>
      <button onClick={()=>setBenchOpen(!benchOpen)} style={{
        display:"flex",alignItems:"center",gap:8,width:"100%",padding:"10px 14px",
        background:benchOpen?T.surfaceLight:T.surfaceLight,border:`1px solid ${T.borderLight}`,
        borderRadius:T.radiusXs,cursor:"pointer",transition:"all 0.2s ease",
      }}>
        <span style={{fontSize:12,transition:"transform 0.2s ease",transform:benchOpen?"rotate(90deg)":"rotate(0deg)"}}>{"\u25B6"}</span>
        <span style={{fontFamily:T.font,fontWeight:600,fontSize:13,color:T.text}}>Funnel Benchmarks</span>
        {!benchOpen&&<span style={{fontSize:11,color:T.textMuted,fontFamily:T.fontMono,marginLeft:"auto"}}>Using regional defaults for {region}</span>}
      </button>
      {benchOpen&&<div style={{padding:"16px 0 0",animation:"fadeIn 0.2s ease"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0 20px"}}>
          <InputField label="Delivery Rate" value={inputs.deliveryRate} onChange={v=>u("deliveryRate",v)} suffix="%" tooltip={`Benchmark: ${bench.deliveryRate}%`} min={0} max={100}/>
          <InputField label={channel==="whatsapp"?"Read Rate":"Open Rate"} value={inputs.openRate} onChange={v=>u("openRate",v)} suffix="%" tooltip={`Benchmark: ${bench.openRate}%`} min={0} max={100}/>
          <InputField label="Click-Through Rate" value={inputs.ctr} onChange={v=>u("ctr",v)} suffix="%" tooltip={`% of readers who click. Benchmark: ${bench.ctr}%`} min={0} max={100}/>
          <InputField label={rateLabel||"Conversion Rate"} value={inputs.convRate} onChange={v=>u("convRate",v)} suffix="%" tooltip="% of clickers who convert (post-click rate)" min={0} max={100}/>
          {/* Opt-Out Rate hidden for simplicity */}
        </div>
      </div>}
    </div>
  </Card>);
}

function FunnelViz({data,color,label,maxMessages}){
  const steps=[{name:"Sent",value:data.messages},{name:"Delivered",value:data.delivered},{name:"Opened",value:data.opened},{name:"Clicked",value:data.clicked},{name:"Converted",value:data.conversions}];
  const mx=maxMessages||data.messages||1;
  return(<div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,fontFamily:T.fontDisplay,fontWeight:700,fontSize:15,color}}><Icon name={CH_CFG[label]?.icon} size={18} color={CH_CFG[label]?.color}/> {CH_CFG[label]?.label||label}</div>{steps.map((s,i)=>{const w=mx>0?Math.max((s.value/mx)*100,2):2;return <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,animation:`slideIn 0.4s ease ${i*0.08}s both`}}><span style={{width:70,fontSize:11,color:T.textMuted,fontFamily:T.font,fontWeight:500,textAlign:"right",flexShrink:0}}>{s.name}</span><div style={{flex:1,position:"relative",height:26,display:"flex",alignItems:"center"}}><div style={{height:22,borderRadius:4,background:`${color}20`,width:`${w}%`,minWidth:40,position:"relative",transition:"width 0.6s cubic-bezier(0.4,0,0.2,1)",display:"flex",alignItems:"center",paddingLeft:8}}><div style={{height:"100%",borderRadius:4,background:color,width:"100%",position:"absolute",left:0,top:0,opacity:0.8}}/><span style={{position:"relative",zIndex:1,fontSize:11,fontFamily:T.fontMono,fontWeight:500,color:"#fff"}}>{fmt(s.value)}</span></div></div></div>})}</div>);
}

function ScorecardTable({channels,data}){
  const rows=[{key:"messages",label:"Messages Sent",f:v=>fmt(v)},{key:"deliveryRate",label:"Delivery Rate",f:v=>pct(v),h:true},{key:"delivered",label:"Delivered",f:v=>fmt(v),h:true},{key:"openRate",label:"Open / Read Rate",f:v=>pct(v),h:true},{key:"ctr",label:"CTR",f:v=>pct(v),h:true},{key:"convRate",label:"Conversion Rate",f:v=>pct(v,2),h:true},{key:"conversions",label:"Conversions / Mo",f:v=>fmt(v),h:true},{key:"revenue",label:"Revenue / Mo",f:v=>dm(v),h:true},{key:"spend",label:"Spend / Mo",f:v=>dm(v),h:false},{key:"roi",label:"ROI",f:v=>v.toFixed(1)+"\u00D7",h:true},{key:"cpConv",label:"Cost / Conversion",f:v=>dm(v),h:false}];
  const wins={};channels.forEach(c=>wins[c]=0);
  rows.forEach(r=>{if(r.key==="messages")return;let best=null,bv=r.h?-Infinity:Infinity;channels.forEach(c=>{const v=data[c]?.[r.key]??0;if((r.h&&v>bv)||(!r.h&&v<bv)){bv=v;best=c}});if(best)wins[best]++});
  const th={padding:"10px 14px",textAlign:"right",fontFamily:T.fontMono,fontSize:13,fontWeight:500,whiteSpace:"nowrap"};
  return(<div style={{overflowX:"auto",marginBottom:20}}><table style={{width:"100%",minWidth:520,borderCollapse:"collapse",fontFamily:T.font}}><thead><tr style={{borderBottom:`2px solid ${T.border}`}}><th style={{...th,textAlign:"left",fontFamily:T.fontDisplay}}>Metric</th>{channels.map(c=><th key={c} style={{...th,color:CH_CFG[c].dark}}><Icon name={CH_CFG[c].icon} size={14} color={CH_CFG[c].color}/> {CH_CFG[c].label}</th>)}</tr></thead><tbody>{rows.map((r,ri)=>{let best=null;if(r.key!=="messages"){let bv=r.h?-Infinity:Infinity;channels.forEach(c=>{const v=data[c]?.[r.key]??0;if((r.h&&v>bv)||(!r.h&&v<bv)){bv=v;best=c}})}return <tr key={ri} style={{borderBottom:`1px solid ${T.borderLight}`,background:ri%2===0?T.surfaceLight:T.surface}}><td style={{...th,textAlign:"left",fontWeight:600,color:T.text,fontSize:13}}>{r.label}</td>{channels.map(c=>{const v=data[c]?.[r.key]??0,ib=c===best;return <td key={c} style={{...th,fontWeight:ib?600:400,color:ib?CH_CFG[c].dark:T.text,background:ib?`${CH_CFG[c].color}08`:"transparent"}}>{r.f(v)} {ib&&<span style={{color:CH_CFG[c].color}}>{"\u25B2"}</span>}</td>})}</tr>})}</tbody><tfoot><tr style={{borderTop:`2px solid ${T.border}`}}><td style={{...th,textAlign:"left",fontWeight:700,fontFamily:T.fontDisplay}}>Wins</td>{channels.map(c=><td key={c} style={{...th,fontWeight:800,fontSize:16,fontFamily:T.fontDisplay,color:CH_CFG[c].dark}}>{wins[c]} / {rows.length-1}</td>)}</tr></tfoot></table></div>);
}

function ShiftSimulator({waData,compData,compChannel,dealValue}){
  const[sp,setSp]=useState(30);const cfg=CH_CFG[compChannel];
  const sh=useMemo(()=>{
    const sm=compData.messages*(sp/100),wDr=(waData.deliveryRate||96)/100,wOr=(waData.openRate||90)/100,wCtr=(waData.ctr||25)/100,wCv=(waData.convRate||5)/100,wCpm=waData.costPerMsg||0,
      cDr=(compData.deliveryRate||90)/100,cOr=(compData.openRate||90)/100,cCtr=(compData.ctr||10)/100,cCv=(compData.convRate||3)/100;
    const wRev=sm*wDr*wOr*wCtr*wCv*dealValue,wSp=sm*wCpm,cRev=sm*cDr*cOr*cCtr*cCv*dealValue,net=wRev-cRev;
    return{sm,wRev,cRev,net,ann:net*12,wSp,wConv:sm*wDr*wOr*wCtr*wCv};
  },[sp,waData,compData,dealValue]);
  return(<div>
    <div style={{marginBottom:24}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{fontFamily:T.font,fontWeight:600,fontSize:14,color:T.text}}>Shift volume from {cfg.label} to WhatsApp</span><span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:24,color:T.green}}>{sp}%</span></div><input type="range" min={0} max={100} value={sp} onChange={e=>setSp(parseInt(e.target.value))} style={{width:"100%",height:6,borderRadius:3,appearance:"none",WebkitAppearance:"none",background:`linear-gradient(to right,${T.green} ${sp}%,${T.surfaceHover} ${sp}%)`,outline:"none"}}/><div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:11,color:T.textMuted,fontFamily:T.fontMono}}>0%</span><span style={{fontSize:11,color:T.textMuted,fontFamily:T.fontMono}}>100%</span></div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
      <MetricCard label="Messages Shifted" value={fmt(sh.sm)} color={T.green} icon={<Icon name="send" size={14}/>}/>
      <MetricCard label="WA Revenue Gained" value={dm(sh.wRev)} color={T.green} icon={<Icon name="trendingUp" size={14}/>} subtext={`${fmt(sh.wConv)} new conversions`}/>
      <MetricCard label={`${cfg.label} Revenue Lost`} value={dm(sh.cRev)} color={cfg.color} icon={<Icon name="trendingDown" size={14}/>}/>
      <MetricCard label="Net Monthly Gain" value={dm(sh.net)} color={sh.net>=0?T.green:"#f87171"} icon={sh.net>=0?<Icon name="checkCircle" size={14}/>:<Icon name="alertTriangle" size={14}/>}/>
      <MetricCard label="Annual Projection" value={dm(sh.ann)} color={sh.ann>=0?T.darkGreen:"#f87171"} icon={<Icon name="calendar" size={14}/>} subtext="12-month projection"/>
      <MetricCard label="WA Incremental Spend" value={dm(sh.wSp)} color={T.textMuted} icon={<Icon name="dollarSign" size={14}/>}/>
    </div>
    <div style={{background:T.surfaceLight,borderRadius:T.radiusSm,padding:16,marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:12,fontFamily:T.font}}>Revenue per 1,000 Messages</div>
      {[{l:"WhatsApp",v:waData.rev1k||0,c:T.green},{l:cfg.label,v:compData.rev1k||0,c:cfg.color}].map((item,i)=>{const mx=Math.max(waData.rev1k||1,compData.rev1k||1),w=mx>0?(item.v/mx)*100:0;return <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{width:80,fontSize:12,fontFamily:T.font,fontWeight:500,color:T.text}}>{item.l}</span><div style={{flex:1,height:28,background:T.surfaceHover,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:item.c,width:`${Math.max(w,3)}%`,display:"flex",alignItems:"center",paddingLeft:8,transition:"width 0.6s ease"}}><span style={{fontSize:11,fontFamily:T.fontMono,color:"#fff",fontWeight:500}}>{dm(item.v)}</span></div></div></div>})}
    </div>
    <InsightBox pills={[{label:"Shift",value:`${sp}%`,icon:<Icon name="refreshCw" size={14}/>,color:T.green},{label:"Net/Mo",value:dm(sh.net),icon:sh.net>=0?<Icon name="trendingUp" size={14}/>:<Icon name="trendingDown" size={14}/>,color:sh.net>=0?T.green:"#f87171"},{label:"Annual",value:dm(sh.ann),icon:<Icon name="calendar" size={14}/>,color:T.green}]} narrative={`By redirecting ${sp}% of your ${cfg.label} volume (${fmt(sh.sm)} messages) to WhatsApp, you'd generate ${dm(sh.wRev)} in new WhatsApp revenue while losing ${dm(sh.cRev)} from ${cfg.label}. That's a net ${sh.net>=0?"gain":"loss"} of ${dm(Math.abs(sh.net))} per month, or ${dm(Math.abs(sh.ann))} annually.`}/>
  </div>);
}

function AudienceHealthPanel({waData,compData,compChannel,dealValue}){
  const cfg=CH_CFG[compChannel],wML=waData.moLost||0,wYL=waData.yrLost||0,cML=compData.moLost||0,cYL=compData.yrLost||0,wRA=waData.revAtRisk||0,cRA=compData.revAtRisk||0;
  const rPct=compData.optOutRate>0?((compData.optOutRate-waData.optOutRate)/compData.optOutRate*100):0;
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <Card style={{borderTop:`3px solid ${T.green}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Icon name="messageCircle" size={18} color={T.green}/><span style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:16,color:T.darkGreen}}>WhatsApp</span></div><div style={{marginBottom:12}}><div style={{fontSize:12,color:T.textMuted,marginBottom:4}}>Opt-Out Rate</div><div style={{fontSize:28,fontWeight:800,fontFamily:T.fontDisplay,color:T.darkGreen}}>{pct(waData.optOutRate,2)}</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{fontSize:11,color:T.textMuted}}>Lost / Month</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontDisplay}}>{fmt(wML)}</div></div><div><div style={{fontSize:11,color:T.textMuted}}>Lost / Year</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontDisplay}}>{fmt(wYL)}</div></div></div><div style={{marginTop:12}}><div style={{fontSize:11,color:T.textMuted}}>Revenue at Risk (Annual)</div><div style={{fontSize:18,fontWeight:700,fontFamily:T.fontDisplay,color:"#f87171"}}>{dm(wRA)}</div></div></Card>
      <Card style={{borderTop:`3px solid ${cfg.color}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Icon name={cfg.icon} size={18} color={cfg.color}/><span style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:16,color:cfg.dark}}>{cfg.label}</span></div><div style={{marginBottom:12}}><div style={{fontSize:12,color:T.textMuted,marginBottom:4}}>Opt-Out Rate</div><div style={{fontSize:28,fontWeight:800,fontFamily:T.fontDisplay,color:cfg.dark}}>{pct(compData.optOutRate,2)}</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{fontSize:11,color:T.textMuted}}>Lost / Month</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontDisplay}}>{fmt(cML)}</div></div><div><div style={{fontSize:11,color:T.textMuted}}>Lost / Year</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontDisplay}}>{fmt(cYL)}</div></div></div><div style={{marginTop:12}}><div style={{fontSize:11,color:T.textMuted}}>Revenue at Risk (Annual)</div><div style={{fontSize:18,fontWeight:700,fontFamily:T.fontDisplay,color:"#f87171"}}>{dm(cRA)}</div></div></Card>
    </div>
    <InsightBox color={T.green} pills={[{label:"WA Opt-Out",value:pct(waData.optOutRate,2),icon:<Icon name="messageCircle" size={14}/>,color:T.green},{label:`${cfg.label} Opt-Out`,value:pct(compData.optOutRate,2),icon:<Icon name={cfg.icon} size={14}/>,color:cfg.color},{label:"Risk Reduction",value:dm(cRA-wRA),icon:<Icon name="shield" size={14}/>,color:T.green}]} narrative={compChannel==="sms"?`WhatsApp's ${pct(waData.optOutRate,2)} opt-out rate is ${rPct.toFixed(0)}% lower than SMS's ${pct(compData.optOutRate,2)}. Over a year, SMS loses ${fmt(cYL)} subscribers vs WhatsApp's ${fmt(wYL)}. Revenue at risk from SMS churn is ${dm(cRA)}, versus ${dm(wRA)} for WhatsApp.`:`WhatsApp's ${pct(waData.optOutRate,2)} opt-out rate retains more subscribers than Email's ${pct(compData.optOutRate,2)}. Email's lower CTR (${pct(compData.ctr)}% vs ${pct(waData.ctr)}%) means each subscriber generates far less revenue. WhatsApp is the stronger long-term channel.`}/>
  </div>);
}

function ExecutiveSummary({waData,compData,channels,country,industry,clientName:cn}){
  const cc=channels.filter(c=>c!=="whatsapp");
  const name=cn||industry;
  return(<Card style={{background:`linear-gradient(135deg,${T.darkCard} 0%,#1a2235 100%)`,color:"#fff",marginBottom:24,border:"none"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="barChart" size={22}/><span style={{fontFamily:T.fontSora,fontWeight:700,fontSize:18,color:"#fff"}}>Executive Summary</span></div>{cn&&<span style={{padding:"4px 12px",borderRadius:12,background:"rgba(255,255,255,0.1)",fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>Prepared for {cn}</span>}</div><div style={{fontFamily:T.font,fontSize:14,lineHeight:1.8,color:T.textMuted}}><p style={{marginBottom:12}}>For <strong style={{color:"#fff"}}>{name}</strong>{cn?` (${industry})`:""} in <strong style={{color:"#fff"}}>{country}</strong>, WhatsApp messaging generates <strong style={{color:T.green}}>{dm(waData.revenue)}/month</strong> in revenue with a <strong style={{color:T.green}}>{waData.roi.toFixed(1)}&times; ROI</strong> based on {fmt(waData.messages)} monthly messages.</p>{cc.map((ch,i)=>{const c=compData[ch];if(!c)return null;const rd=waData.revenue-c.revenue;return <p key={i} style={{marginBottom:8}}>vs {CH_CFG[ch].label}: WhatsApp drives <strong style={{color:T.green}}>{dm(Math.abs(rd))}</strong>{rd>=0?" more":" less"} monthly revenue and delivers a <strong style={{color:T.green}}>{Math.abs(waData.roi-c.roi).toFixed(1)}&times;</strong>{waData.roi>=c.roi?" higher":" lower"} ROI for {name}.</p>})}</div></Card>);
}

function MonthlyProjection({waData,compData,channels,dealValue}){
  const cc=channels.filter(c=>c!=="whatsapp"),months=Array.from({length:12},(_,i)=>i+1);
  const proj=(d)=>{let a=d.messages;const m=[];for(let i=0;i<12;i++){m.push(a*(d.deliveryRate||96)/100*(d.openRate||90)/100*(d.ctr||25)/100*(d.convRate||5)/100*dealValue);a*=(1-(d.optOutRate||0.5)/100)}return m};
  const wP=proj(waData),cP={};cc.forEach(ch=>{cP[ch]=proj(compData[ch])});
  const all=[...wP,...Object.values(cP).flat()],mx=Math.max(...all,1);
  return(<Card style={{marginBottom:24}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><Icon name="trendingUp" size={20}/><span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16}}>12-Month Revenue Projection</span></div><div style={{fontSize:12,color:T.textMuted,marginBottom:16,fontFamily:T.font}}>Accounts for audience decay from opt-outs</div>
    <div style={{position:"relative",height:240,marginBottom:16}}>
      {[0,0.25,0.5,0.75,1].map((f,i)=><div key={i} style={{position:"absolute",left:0,bottom:f*200+24,width:"100%",display:"flex",alignItems:"center"}}><span style={{width:55,fontSize:10,fontFamily:T.fontMono,color:T.textLight,textAlign:"right",paddingRight:8}}>{dm(mx*f)}</span><div style={{flex:1,height:1,background:T.borderLight}}/></div>)}
      <div style={{position:"absolute",left:60,right:0,bottom:24,height:200,display:"flex",alignItems:"flex-end",gap:2}}>
        {months.map((m,mi)=>{const bg=[{v:wP[mi],c:T.green},...cc.map(ch=>({v:cP[ch][mi],c:CH_CFG[ch].color}))];return <div key={mi} style={{flex:1,display:"flex",alignItems:"flex-end",gap:1,justifyContent:"center",height:"100%"}}>{bg.map((b,bi)=><div key={bi} style={{width:`${90/bg.length}%`,maxWidth:20,height:`${(b.v/mx)*100}%`,minHeight:2,background:b.c,borderRadius:"3px 3px 0 0",transition:"height 0.4s ease",opacity:0.85}}/>)}</div>})}
      </div>
      <div style={{position:"absolute",left:60,right:0,bottom:0,display:"flex"}}>{months.map(m=><div key={m} style={{flex:1,textAlign:"center",fontSize:10,fontFamily:T.fontMono,color:T.textLight}}>M{m}</div>)}</div>
    </div>
    <div style={{display:"flex",gap:16,justifyContent:"center"}}>{[{l:"WhatsApp",c:T.green},...cc.map(ch=>({l:CH_CFG[ch].label,c:CH_CFG[ch].color}))].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:12,borderRadius:3,background:x.c}}/><span style={{fontSize:12,fontFamily:T.font,color:T.textMuted}}>{x.l}</span></div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:`repeat(${1+cc.length},1fr)`,gap:12,marginTop:16}}>
      <div style={{textAlign:"center",padding:12,background:T.lightGreenBg,borderRadius:T.radiusXs}}><div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>WhatsApp (12-Mo)</div><div style={{fontSize:18,fontWeight:800,fontFamily:T.fontDisplay,color:T.darkGreen}}>{dm(wP.reduce((a,b)=>a+b,0))}</div></div>
      {cc.map(ch=><div key={ch} style={{textAlign:"center",padding:12,background:CH_CFG[ch].bg,borderRadius:T.radiusXs}}><div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>{CH_CFG[ch].label} (12-Mo)</div><div style={{fontSize:18,fontWeight:800,fontFamily:T.fontDisplay,color:CH_CFG[ch].dark}}>{dm(cP[ch].reduce((a,b)=>a+b,0))}</div></div>)}
    </div>
  </Card>);
}


const SCENARIOS=[
  {name:"E-commerce Promo",icon:"shoppingCart",country:"Singapore",industry:"E-commerce",messages:50000,dealValue:45},
  {name:"Auto Dealership",icon:"car",country:"UAE",industry:"Automotive",messages:10000,dealValue:35000},
  {name:"QSR Flash Sale",icon:"utensils",country:"Brazil",industry:"QSR",messages:100000,dealValue:12},
  {name:"Insurance Leads",icon:"shield",country:"India",industry:"Insurance",messages:200000,dealValue:500},
  {name:"Travel Bookings",icon:"plane",country:"UK",industry:"Travel & Hospitality",messages:30000,dealValue:850},
  {name:"Healthcare",icon:"hospital",country:"US",industry:"Healthcare",messages:25000,dealValue:150},
];

// ─── UTILITY MESSAGE USE CASES ──────────────────────────────────
const UTIL_CASES=[
  {id:"order_updates",name:"Order & Shipping Updates",icon:"package",cat:"Cost Deflection",
    desc:"Reduce WISMO support calls with proactive delivery updates",
    industries:["E-commerce","Food Delivery","Retail (Physical)"],
    fields:[
      {k:"orders",l:"Orders / Month",tip:"Monthly order volume"},
      {k:"wismoRate",l:"WISMO Call Rate (%)",tip:"% of orders generating a 'where is my order' call",suf:"%"},
      {k:"costPerCall",l:"Cost per Support Call ($)",pre:"$",tip:"Fully loaded agent cost per call"},
      {k:"deflectionRate",l:"Call Deflection Rate (%)",tip:"% of calls avoided with proactive updates",suf:"%"},
      {k:"msgsPerOrder",l:"Messages per Order",tip:"Confirmation + shipped + delivered etc."},
    ],
    calc:(i)=>{const s=i.orders*(i.wismoRate/100)*(i.deflectionRate/100)*i.costPerCall;const msgs=i.orders*i.msgsPerOrder;return{savings:s,msgs,callsDeflected:i.orders*(i.wismoRate/100)*(i.deflectionRate/100)}},
    benchmarks:{
      "E-commerce":{orders:5000,wismoRate:15,costPerCall:5,deflectionRate:65,msgsPerOrder:2},
      "Food Delivery":{orders:10000,wismoRate:25,costPerCall:3,deflectionRate:70,msgsPerOrder:3},
      "Retail (Physical)":{orders:3000,wismoRate:12,costPerCall:5,deflectionRate:60,msgsPerOrder:2},
    }
  },
  {id:"appt_reminders",name:"Appointment Reminders",icon:"calendar",cat:"Cost Deflection",
    desc:"Reduce no-shows with automated WhatsApp reminders",
    industries:["Healthcare","Automotive","Real Estate","Education"],
    fields:[
      {k:"appointments",l:"Appointments / Month",tip:"Total scheduled appointments"},
      {k:"noShowRate",l:"Current No-Show Rate (%)",suf:"%",tip:"% of appointments that are no-shows"},
      {k:"costPerNoShow",l:"Cost per No-Show ($)",pre:"$",tip:"Lost revenue + wasted staff time per empty slot"},
      {k:"reductionPct",l:"No-Show Reduction (%)",suf:"%",tip:"How much WhatsApp reminders reduce no-shows"},
      {k:"msgsPerAppt",l:"Reminders per Appointment",tip:"Typically 1-2 reminders before appointment"},
    ],
    calc:(i)=>{const prevented=i.appointments*(i.noShowRate/100)*(i.reductionPct/100);const s=prevented*i.costPerNoShow;return{savings:s,msgs:i.appointments*i.msgsPerAppt,noShowsPrevented:prevented}},
    benchmarks:{
      "Healthcare":{appointments:2000,noShowRate:18,costPerNoShow:150,reductionPct:45,msgsPerAppt:2},
      "Automotive":{appointments:800,noShowRate:15,costPerNoShow:200,reductionPct:40,msgsPerAppt:2},
      "Real Estate":{appointments:500,noShowRate:22,costPerNoShow:100,reductionPct:45,msgsPerAppt:2},
      "Education":{appointments:1500,noShowRate:12,costPerNoShow:50,reductionPct:40,msgsPerAppt:1},
    }
  },
  {id:"cart_recovery",name:"Abandoned Cart Recovery",icon:"shoppingCart",cat:"Revenue Recovery",
    desc:"Win back abandoned carts with timely WhatsApp nudges",
    industries:["E-commerce","Food Delivery"],
    fields:[
      {k:"cartsAbandoned",l:"Carts Abandoned / Month",tip:"Number of carts abandoned before checkout"},
      {k:"avgCartValue",l:"Average Cart Value ($)",pre:"$"},
      {k:"recoveryRate",l:"WA Recovery Rate (%)",suf:"%",tip:"% of abandoned carts recovered via WhatsApp"},
      {k:"msgsPerCart",l:"Messages per Cart",tip:"Typically 1-2 reminder messages"},
    ],
    calc:(i)=>{const recovered=i.cartsAbandoned*(i.recoveryRate/100);const s=recovered*i.avgCartValue;return{savings:s,msgs:i.cartsAbandoned*i.msgsPerCart,cartsRecovered:recovered}},
    benchmarks:{
      "E-commerce":{cartsAbandoned:8000,avgCartValue:65,recoveryRate:8,msgsPerCart:2},
      "Food Delivery":{cartsAbandoned:15000,avgCartValue:28,recoveryRate:12,msgsPerCart:1},
    }
  },
  {id:"payment_reminders",name:"Payment & Invoice Reminders",icon:"creditCard",cat:"Revenue Recovery",
    desc:"Recover overdue payments with automated WhatsApp reminders",
    industries:["Financial Services","Insurance","E-commerce"],
    fields:[
      {k:"invoices",l:"Invoices / Month",tip:"Total invoices or payment due notices"},
      {k:"overdueRate",l:"Overdue Rate (%)",suf:"%",tip:"% of invoices that become overdue"},
      {k:"avgInvoice",l:"Average Invoice Value ($)",pre:"$"},
      {k:"recoveryRate",l:"WA Recovery Rate (%)",suf:"%",tip:"% of overdue invoices recovered after WA reminder"},
      {k:"msgsPerInvoice",l:"Reminders per Overdue Invoice",tip:"Number of reminder messages sent"},
    ],
    calc:(i)=>{const overdue=i.invoices*(i.overdueRate/100);const recovered=overdue*(i.recoveryRate/100);const s=recovered*i.avgInvoice;return{savings:s,msgs:overdue*i.msgsPerInvoice,paymentsRecovered:recovered}},
    benchmarks:{
      "Financial Services":{invoices:5000,overdueRate:12,avgInvoice:850,recoveryRate:25,msgsPerInvoice:3},
      "Insurance":{invoices:3000,overdueRate:8,avgInvoice:1200,recoveryRate:30,msgsPerInvoice:2},
      "E-commerce":{invoices:4000,overdueRate:10,avgInvoice:120,recoveryRate:22,msgsPerInvoice:2},
    }
  },
  {id:"faq_automation",name:"Automated FAQ & Self-Service",icon:"cpu",cat:"Productivity",
    desc:"Deflect repetitive support queries with WhatsApp chatbot",
    industries:["E-commerce","Financial Services","Insurance","Healthcare","Travel & Hospitality","Education","Retail (Physical)","QSR"],
    fields:[
      {k:"tickets",l:"Support Tickets / Month",tip:"Total inbound support queries"},
      {k:"automatablePct",l:"Automatable (%)",suf:"%",tip:"% of queries that can be handled by chatbot"},
      {k:"costPerTicket",l:"Cost per Ticket ($)",pre:"$",tip:"Fully loaded agent cost per ticket resolution"},
      {k:"resolutionRate",l:"Bot Resolution Rate (%)",suf:"%",tip:"% of automatable queries the bot fully resolves"},
      {k:"msgsPerTicket",l:"Avg Messages per Resolution",tip:"Bot messages needed to resolve a query"},
    ],
    calc:(i)=>{const auto=i.tickets*(i.automatablePct/100)*(i.resolutionRate/100);const s=auto*i.costPerTicket;return{savings:s,msgs:auto*i.msgsPerTicket,ticketsDeflected:auto}},
    benchmarks:{
      "E-commerce":{tickets:3000,automatablePct:40,costPerTicket:6,resolutionRate:72,msgsPerTicket:4},
      "Financial Services":{tickets:2000,automatablePct:35,costPerTicket:9,resolutionRate:65,msgsPerTicket:5},
      "Insurance":{tickets:1500,automatablePct:38,costPerTicket:8,resolutionRate:68,msgsPerTicket:4},
      "Healthcare":{tickets:1200,automatablePct:30,costPerTicket:10,resolutionRate:60,msgsPerTicket:4},
      "Travel & Hospitality":{tickets:2500,automatablePct:42,costPerTicket:7,resolutionRate:70,msgsPerTicket:4},
      "Education":{tickets:800,automatablePct:45,costPerTicket:5,resolutionRate:75,msgsPerTicket:3},
      "Retail (Physical)":{tickets:1000,automatablePct:35,costPerTicket:5,resolutionRate:68,msgsPerTicket:3},
      "QSR":{tickets:2000,automatablePct:50,costPerTicket:3,resolutionRate:78,msgsPerTicket:3},
    }
  },
  {id:"lead_qual",name:"Lead Qualification Chatbot",icon:"clipboard",cat:"Productivity",
    desc:"Automate initial lead screening to save agent time",
    industries:["Automotive","Real Estate","Insurance","Education"],
    fields:[
      {k:"leads",l:"Inbound Leads / Month",tip:"Total new leads requiring qualification"},
      {k:"qualTimeMin",l:"Manual Qualification Time (min)",tip:"Minutes an agent spends qualifying one lead"},
      {k:"agentHourlyCost",l:"Agent Hourly Cost ($)",pre:"$",tip:"Fully loaded hourly cost of a sales agent"},
      {k:"automationPct",l:"Automation Rate (%)",suf:"%",tip:"% of leads the chatbot can pre-qualify"},
      {k:"msgsPerLead",l:"Messages per Lead Qualification",tip:"Bot messages to qualify one lead"},
    ],
    calc:(i)=>{const auto=i.leads*(i.automationPct/100);const hoursSaved=auto*(i.qualTimeMin/60);const s=hoursSaved*i.agentHourlyCost;return{savings:s,msgs:auto*i.msgsPerLead,hoursSaved,leadsAutoQualified:auto}},
    benchmarks:{
      "Automotive":{leads:600,qualTimeMin:15,agentHourlyCost:25,automationPct:50,msgsPerLead:6},
      "Real Estate":{leads:400,qualTimeMin:12,agentHourlyCost:22,automationPct:55,msgsPerLead:5},
      "Insurance":{leads:1000,qualTimeMin:10,agentHourlyCost:20,automationPct:48,msgsPerLead:5},
      "Education":{leads:800,qualTimeMin:8,agentHourlyCost:18,automationPct:55,msgsPerLead:4},
    }
  },
  {id:"renewal_reminders",name:"Renewal & Subscription Reminders",icon:"refreshCw",cat:"Revenue Recovery",
    desc:"Prevent policy/subscription lapses with proactive reminders",
    industries:["Insurance","Education","Financial Services"],
    fields:[
      {k:"renewals",l:"Renewals Due / Month",tip:"Subscriptions or policies up for renewal"},
      {k:"lapseRate",l:"Current Lapse Rate (%)",suf:"%",tip:"% of renewals that lapse without action"},
      {k:"avgRenewalValue",l:"Average Renewal Value ($)",pre:"$"},
      {k:"saveRate",l:"WA Save Rate (%)",suf:"%",tip:"% of at-risk renewals saved via WhatsApp reminders"},
      {k:"msgsPerRenewal",l:"Reminders per Renewal",tip:"Number of reminder messages before expiry"},
    ],
    calc:(i)=>{const atRisk=i.renewals*(i.lapseRate/100);const saved=atRisk*(i.saveRate/100);const s=saved*i.avgRenewalValue;return{savings:s,msgs:atRisk*i.msgsPerRenewal,renewalsSaved:saved}},
    benchmarks:{
      "Insurance":{renewals:2000,lapseRate:15,avgRenewalValue:1800,saveRate:22,msgsPerRenewal:3},
      "Education":{renewals:500,lapseRate:10,avgRenewalValue:2400,saveRate:28,msgsPerRenewal:2},
      "Financial Services":{renewals:1500,lapseRate:8,avgRenewalValue:600,saveRate:25,msgsPerRenewal:2},
    }
  },
  {id:"booking_confirm",name:"Booking Confirmations & Updates",icon:"plane",cat:"Cost Deflection",
    desc:"Reduce booking-related support calls with proactive confirmations",
    industries:["Travel & Hospitality","QSR","Healthcare"],
    fields:[
      {k:"bookings",l:"Bookings / Month",tip:"Total bookings, reservations, or orders"},
      {k:"callRate",l:"Support Call Rate (%)",suf:"%",tip:"% of bookings generating a support call"},
      {k:"costPerCall",l:"Cost per Call ($)",pre:"$"},
      {k:"deflectionPct",l:"Call Deflection Rate (%)",suf:"%",tip:"% of calls prevented by proactive confirmations"},
      {k:"msgsPerBooking",l:"Messages per Booking",tip:"Confirmation + reminder + follow-up"},
    ],
    calc:(i)=>{const deflected=i.bookings*(i.callRate/100)*(i.deflectionPct/100);const s=deflected*i.costPerCall;return{savings:s,msgs:i.bookings*i.msgsPerBooking,callsDeflected:deflected}},
    benchmarks:{
      "Travel & Hospitality":{bookings:3000,callRate:22,costPerCall:7,deflectionPct:60,msgsPerBooking:3},
      "QSR":{bookings:8000,callRate:8,costPerCall:3,deflectionPct:65,msgsPerBooking:1},
      "Healthcare":{bookings:2000,callRate:18,costPerCall:8,deflectionPct:55,msgsPerBooking:2},
    }
  },
];

const UTIL_COST_FACTOR=0.55; // Utility msgs ~55% of marketing msg cost

// ─── UTILITY RESULTS COMPONENT ──────────────────────────────────
function UtilityResults({selectedCases, utilInputs, wapCost, clientName:cn, country, industry}){
  const displayName=cn||industry||"your business";
  const utilRate=wapCost*UTIL_COST_FACTOR;

  const results=selectedCases.map(uc=>{
    const inp=utilInputs[uc.id]||{};
    const r=uc.calc(inp);
    const waCost=r.msgs*utilRate;
    const net=r.savings-waCost;
    const roi=waCost>0?r.savings/waCost:0;
    return{...uc,...r,waCost,net,roi,inp};
  }).sort((a,b)=>b.net-a.net);

  const totalSavings=results.reduce((s,r)=>s+r.savings,0);
  const totalWaCost=results.reduce((s,r)=>s+r.waCost,0);
  const totalMsgs=results.reduce((s,r)=>s+r.msgs,0);
  const totalNet=totalSavings-totalWaCost;
  const totalROI=totalWaCost>0?totalSavings/totalWaCost:0;
  const maxSaving=Math.max(...results.map(r=>r.savings),1);

  const catColors={"Cost Deflection":"#3b82f6","Revenue Recovery":"#10b981","Productivity":"#8b5cf6"};

  return (<div>
    {/* Summary Cards */}
    <Card style={{background:`linear-gradient(135deg,${T.darkCard} 0%,#1a2235 100%)`,color:"#fff",marginBottom:24,border:"none"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Icon name="dollarSign" size={22}/>
          <span style={{fontFamily:T.fontSora,fontWeight:700,fontSize:18}}>Utility Messaging ROI{cn?` for ${cn}`:""}</span>
        </div>
        <span style={{fontSize:11,color:T.textMuted,fontFamily:T.fontMono}}>{country} &middot; {industry}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:16}}>
        {[
          {l:"Total Monthly Savings",v:dm(totalSavings),c:T.green},
          {l:"WhatsApp Cost",v:dm(totalWaCost),c:T.textMuted},
          {l:"Net Monthly Value",v:dm(totalNet),c:totalNet>=0?T.green:"#f87171"},
          {l:"ROI",v:totalROI.toFixed(1)+"\u00D7",c:T.green},
          {l:"Messages / Month",v:fmt(totalMsgs),c:T.textMuted},
          {l:"Annual Net Value",v:dm(totalNet*12),c:T.green},
        ].map((m,i)=> <div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontSize:10,color:T.textMuted,marginBottom:4}}>{m.l}</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:T.fontDisplay,color:m.c}}>{m.v}</div>
        </div>)}
      </div>
      <p style={{fontSize:13,lineHeight:1.7,color:T.textMuted,margin:0}}>
        Across {results.length} utility use cases, {displayName} can save <strong style={{color:"#fff"}}>{dm(totalSavings)}/month</strong> ({dm(totalSavings*12)}/year) for a WhatsApp investment of just <strong style={{color:"#fff"}}>{dm(totalWaCost)}/month</strong>. That's a <strong style={{color:T.green}}>{totalROI.toFixed(1)}&times; return</strong> on every dollar spent.
      </p>
    </Card>

    {/* Per-Use-Case Breakdown */}
    <Card style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <Icon name="barChart" size={18}/>
        <span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16}}>Savings by Use Case</span>
      </div>
      {results.map((r,i)=> <div key={r.id} style={{marginBottom:20,animation:`fadeUp 0.4s ease ${i*0.06}s both`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Icon name={r.icon} size={16} color={T.textMuted}/>
            <span style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,color:T.text}}>{r.name}</span>
            <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:`${catColors[r.cat]||T.green}15`,color:catColors[r.cat]||T.green,fontFamily:T.fontMono}}>{r.cat}</span>
          </div>
          <span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color:T.darkGreen}}>{dm(r.savings)}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <div style={{flex:1,height:24,background:T.surfaceHover,borderRadius:4,overflow:"hidden",position:"relative"}}>
            <div style={{height:"100%",borderRadius:4,background:catColors[r.cat]||T.green,width:`${(r.savings/maxSaving)*100}%`,transition:"width 0.6s ease",opacity:0.8,display:"flex",alignItems:"center",paddingLeft:8,minWidth:r.savings>0?40:0}}>
              <span style={{fontSize:10,fontFamily:T.fontMono,color:"#fff",fontWeight:500}}>{dm(r.savings)}</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:16,fontSize:11,color:T.textMuted,fontFamily:T.fontMono}}>
          <span>WA Cost: {dm(r.waCost)}</span>
          <span>Net: {dm(r.net)}</span>
          <span>ROI: {r.roi.toFixed(1)}&times;</span>
          <span>Msgs: {fmt(r.msgs)}</span>
        </div>
      </div>)}
    </Card>

    {/* Top Insight */}
    {results.length>0&&<InsightBox
      pills={[
        {label:"Top Use Case",value:results[0].name,icon:<Icon name={results[0].icon} size={14}/>,color:T.green},
        {label:"Savings",value:dm(results[0].savings),icon:<Icon name="dollarSign" size={14}/>,color:T.green},
        {label:"ROI",value:results[0].roi.toFixed(1)+"\u00D7",icon:<Icon name="trendingUp" size={14}/>,color:T.green},
      ]}
      narrative={`The highest-impact use case for ${displayName} is ${results[0].name}, delivering ${dm(results[0].savings)}/month in savings at a cost of just ${dm(results[0].waCost)} — a ${results[0].roi.toFixed(1)}\u00D7 return. ${results.length>1?`Combined with ${results.length-1} other use cases, the total value reaches ${dm(totalNet)}/month (${dm(totalNet*12)}/year).`:""}`}
    />}
  </div>);
}

function ExportModal({onClose,allData,channels,dealValue,country,industry,clientName:initName}){
  const[cn,setCn]=useState(initName||""),[st,setSt]=useState({}),[err,setErr]=useState("");
  const name=cn.trim()||"Client",cc=channels.filter(c=>c!=="whatsapp"),wa=allData?.whatsapp;

  const download=(blob,filename)=>{const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url)},100)};

  const genCSV=async()=>{try{setSt(s=>({...s,csv:"loading"}));setErr("");
    const rows=[["Metric",...channels.map(c=>CH_CFG[c].label)]];
    const metrics=[["Messages Sent",c=>fmt(c.messages)],["Delivery Rate",c=>pct(c.deliveryRate)],["Open/Read Rate",c=>pct(c.openRate)],["CTR",c=>pct(c.ctr)],["Conversion Rate",c=>pct(c.convRate,2)],["Conversions/Mo",c=>fmt(c.conversions)],["Revenue/Mo",c=>"$"+c.revenue.toFixed(2)],["Spend/Mo",c=>"$"+c.spend.toFixed(2)],["ROI",c=>c.roi.toFixed(1)+"x"],["Cost/Conversion",c=>"$"+c.cpConv.toFixed(2)],["Rev/1K Msgs",c=>"$"+c.rev1k.toFixed(2)]];
    metrics.forEach(([label,fn])=>{rows.push([label,...channels.map(c=>fn(allData[c]))])});
    rows.push([]);rows.push(["Prepared for",name]);rows.push(["Country",country]);rows.push(["Industry",industry]);rows.push(["Average Order Value","$"+dealValue]);
    const csv=rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
    download(new Blob([csv],{type:"text/csv;charset=utf-8"}),`${name}_WhatsApp_ROI.csv`);
    setSt(s=>({...s,csv:"done"}));
  }catch(e){setErr(`CSV: ${e.message}`);setSt(s=>({...s,csv:null}))}};

  const genHTML=async()=>{try{setSt(s=>({...s,html:"loading"}));setErr("");
    const compCh=cc[0]||"sms",c=allData[compCh];
    const ss=c?Array.from({length:101},(_,p)=>{const sm=(c.messages||0)*(p/100),wR=sm*(wa.deliveryRate||96)/100*(wa.openRate||90)/100*(wa.ctr||25)/100*(wa.convRate||5)/100*dealValue,cR=sm*(c.deliveryRate||90)/100*(c.openRate||90)/100*(c.ctr||10)/100*(c.convRate||3)/100*dealValue;return{p,w:wR,c:cR,n:wR-cR,a:(wR-cR)*12}}):[];
    const chLabel=CH_CFG[compCh]?.label||"Channel";
    // Build scorecard rows
    const scRows=channels.map(ch=>{const d=allData[ch];return{label:CH_CFG[ch].label,msgs:fmt(d.messages),rev:fmtMoney(d.revenue),roi:d.roi.toFixed(1)+"x",cpconv:fmtMoney(d.cpConv),rev1k:fmtMoney(d.rev1k),ctr:pct(d.ctr),conv:fmt(d.conversions)}});
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} - WhatsApp ROI Report</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,system-ui,sans-serif;background:#f8fafc;color:#1e293b;padding:0}
.page{max-width:900px;margin:0 auto;padding:24px}
.cover{background:linear-gradient(135deg,#0d7a3e,#25D366);color:#fff;padding:60px 40px;border-radius:16px;margin-bottom:24px}
.cover h1{font-size:36px;margin-bottom:8px}.cover p{font-size:16px;opacity:0.85}
.card{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:20px}
h2{color:#0d7a3e;font-size:22px;margin-bottom:16px}
table{width:100%;border-collapse:collapse;font-size:14px}th,td{padding:10px 14px;text-align:right;border-bottom:1px solid #e2e8f0}th{background:#f8fafc;font-weight:600;color:#64748b}td:first-child,th:first-child{text-align:left}.best{color:#0d7a3e;font-weight:600}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin:16px 0}
.m{padding:14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0}.m .l{font-size:12px;color:#64748b;margin-bottom:4px}.m .v{font-size:20px;font-weight:700}.g{color:#0d7a3e}.p{color:#6366f1}
.slider{width:100%;height:8px;border-radius:4px;appearance:none;outline:none}
.insight{background:#0f172a;color:#cbd5e1;border-radius:12px;padding:20px;margin-top:16px;font-size:14px;line-height:1.7}
@media print{body{background:#fff}.cover{break-after:page}.card{break-inside:avoid;box-shadow:none;border:1px solid #e2e8f0}}
</style></head><body><div class="page">
<div class="cover"><h1>WhatsApp ROI Analysis</h1><p>Prepared for: ${name}</p><p>${country} &middot; ${industry}</p></div>
<div class="card"><h2>Channel Scorecard</h2><table><thead><tr><th>Metric</th>${scRows.map(r=>"<th>"+r.label+"</th>").join("")}</tr></thead><tbody>
<tr><td>Messages Sent</td>${scRows.map(r=>"<td>"+r.msgs+"</td>").join("")}</tr>
<tr><td>CTR</td>${scRows.map(r=>"<td>"+r.ctr+"</td>").join("")}</tr>
<tr><td>Conversions/Mo</td>${scRows.map(r=>"<td>"+r.conv+"</td>").join("")}</tr>
<tr><td>Revenue/Mo</td>${scRows.map(r=>"<td class='best'>"+r.rev+"</td>").join("")}</tr>
<tr><td>ROI</td>${scRows.map(r=>"<td>"+r.roi+"</td>").join("")}</tr>
<tr><td>Cost/Conversion</td>${scRows.map(r=>"<td>"+r.cpconv+"</td>").join("")}</tr>
<tr><td>Rev/1K Messages</td>${scRows.map(r=>"<td>"+r.rev1k+"</td>").join("")}</tr>
</tbody></table></div>
${c?`<div class="card"><h2>Shift Simulator: ${chLabel} &rarr; WhatsApp</h2>
<div style="display:flex;justify-content:space-between;margin-bottom:12px"><span>Shift percentage:</span><span id="pL" style="font-size:28px;font-weight:800;color:#25D366">30%</span></div>
<input type="range" id="sl" min="0" max="100" value="30" class="slider" style="background:linear-gradient(to right,#25D366 30%,#e2e8f0 30%)">
<div class="grid"><div class="m"><div class="l">WA Revenue Gained</div><div class="v g" id="wr">-</div></div><div class="m"><div class="l">${chLabel} Revenue Lost</div><div class="v p" id="cr">-</div></div><div class="m"><div class="l">Net Monthly Gain</div><div class="v g" id="ng">-</div></div><div class="m"><div class="l">Annual Projection</div><div class="v g" id="an">-</div></div></div>
<div class="insight" id="ins"></div></div>
<script>var d=${JSON.stringify(ss)},s=document.getElementById("sl");function f(n){var a=Math.abs(n),sg=n<0?"-":"";if(a>=1e6)return sg+"$"+(a/1e6).toFixed(2)+"M";if(a>=1e3)return sg+"$"+(a/1e3).toFixed(1)+"K";return sg+"$"+a.toFixed(2)}function u(){var p=+s.value;s.style.background="linear-gradient(to right,#25D366 "+p+"%,#e2e8f0 "+p+"%)";document.getElementById("pL").textContent=p+"%";var r=d[p];document.getElementById("wr").textContent=f(r.w);document.getElementById("cr").textContent=f(r.c);document.getElementById("ng").textContent=f(r.n);document.getElementById("an").textContent=f(r.a);document.getElementById("ins").textContent="Shifting "+p+"% of ${chLabel} volume to WhatsApp yields "+f(r.n)+" net monthly gain ("+f(r.a)+" annually)."}s.addEventListener("input",u);u();</script>`:""}
<div class="card" style="text-align:center;color:#64748b;font-size:12px">Generated by WhatsApp ROI Calculator &middot; ${new Date().toLocaleDateString()}</div>
</div></body></html>`;
    download(new Blob([html],{type:"text/html;charset=utf-8"}),`${name}_WhatsApp_ROI_Report.html`);
    setSt(s=>({...s,html:"done"}));
  }catch(e){setErr(`HTML: ${e.message}`);setSt(s=>({...s,html:null}))}};

  const genSummary=async()=>{try{setSt(s=>({...s,txt:"loading"}));setErr("");
    let txt=`WHATSAPP ROI ANALYSIS\n${"=".repeat(50)}\nPrepared for: ${name}\nCountry: ${country} | Industry: ${industry}\nAverage Order Value: $${dealValue}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    txt+=`CHANNEL COMPARISON\n${"-".repeat(50)}\n`;
    channels.forEach(ch=>{const d=allData[ch];const cfg=CH_CFG[ch];txt+=`\n${cfg.label}:\n  Messages/Mo:     ${fmt(d.messages)}\n  Revenue/Mo:      ${fmtMoney(d.revenue)}\n  ROI:             ${d.roi.toFixed(1)}x\n  Conversions/Mo:  ${fmt(d.conversions)}\n  Cost/Conversion: ${fmtMoney(d.cpConv)}\n  Rev/1K Messages: ${fmtMoney(d.rev1k)}\n  CTR:             ${pct(d.ctr)}\n\n`});
    if(cc.length>0){txt+=`\nKEY INSIGHTS\n${"-".repeat(50)}\n`;cc.forEach(ch=>{const c=allData[ch];const rd=wa.revenue-c.revenue;txt+=`\nWhatsApp vs ${CH_CFG[ch].label}:\n  Revenue advantage: ${fmtMoney(rd)}/month (${fmtMoney(rd*12)}/year)\n  ROI advantage: ${(wa.roi-c.roi).toFixed(1)}x\n  Extra conversions: ${fmt(wa.conversions-c.conversions)}/month\n`})}
    txt+=`\nANNUAL PROJECTION\n${"-".repeat(50)}\n  WhatsApp: ${fmtMoney(wa.revenue*12)}\n`;
    cc.forEach(ch=>{txt+=`  ${CH_CFG[ch].label}: ${fmtMoney(allData[ch].revenue*12)}\n`});
    download(new Blob([txt],{type:"text/plain;charset=utf-8"}),`${name}_WhatsApp_ROI_Summary.txt`);
    setSt(s=>({...s,txt:"done"}));
  }catch(e){setErr(`Summary: ${e.message}`);setSt(s=>({...s,txt:null}))}};

  return (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.2s ease"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:T.surface,borderRadius:T.radius,padding:32,maxWidth:480,width:"100%",boxShadow:T.shadowLg,animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <h3 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,display:"flex",alignItems:"center",gap:8}}><Icon name="upload" size={20}/> Export Report</h3>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:T.textMuted}}>{"\u2715"}</button>
      </div>
      {err&&<div style={{background:"#f8717115",color:"#f87171",padding:12,borderRadius:T.radiusXs,marginBottom:16,fontSize:13}}>{err}</div>}
      <div style={{marginBottom:20}}>
        <label style={{fontSize:13,fontWeight:600,color:T.textMuted,display:"block",marginBottom:6}}>Client / Business Name</label>
        <input type="text" value={cn} onChange={e=>setCn(e.target.value)} placeholder="Enter client name..." style={{width:"100%",padding:"10px 14px",borderRadius:T.radiusXs,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:T.font,outline:"none",background:T.surfaceLight,color:T.text}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {[
          {k:"html",l:"Interactive Report (HTML)",i:<Icon name="globe" size={20}/>,fn:genHTML,d:"Full report + shift simulator"},
          {k:"csv",l:"Spreadsheet Data (CSV)",i:<Icon name="barChart" size={20}/>,fn:genCSV,d:"Opens in Excel / Google Sheets"},
          {k:"txt",l:"Text Summary",i:<Icon name="fileText" size={20}/>,fn:genSummary,d:"Plain text executive summary"},
        ].map(x=> <button key={x.k} onClick={x.fn} disabled={st[x.k]==="loading"} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderRadius:T.radiusSm,border:`1.5px solid ${T.border}`,background:st[x.k]==="done"?T.lightGreenBg:T.surface,cursor:st[x.k]==="loading"?"wait":"pointer",transition:"all 0.2s ease",textAlign:"left"}}>
          <span style={{fontSize:20}}>{st[x.k]==="loading"?<Icon name="loader" size={20}/>:st[x.k]==="done"?<Icon name="checkCircle" size={20} color={T.green}/>:x.i}</span>
          <div><div style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,color:T.text}}>{st[x.k]==="done"?"Downloaded!":x.l}</div><div style={{fontSize:12,color:T.textMuted}}>{x.d}</div></div>
        </button>)}
      </div>
    </div>
  </div>);
}

// ─── BREAK-EVEN CARD ─────────────────────────────────────────────
function BreakEvenCard({waData, dealValue, clientName:cn, broadcastsPerMonth:bpm}) {
  if (!waData || !dealValue) return null;
  const cpm = waData.costPerMsg || 0;
  const dr = (waData.deliveryRate || 96) / 100;
  const or = (waData.openRate || 90) / 100;
  const ctr = (waData.ctr || 25) / 100;
  const cv = (waData.convRate || 5) / 100;
  const convPerMsg = dr * or * ctr * cv;
  const freq = bpm || 4;
  const monthlySpend = waData.spend || 0;
  const beConversions = dealValue > 0 ? Math.ceil(monthlySpend / dealValue) : 0;
  const beMsgs = convPerMsg > 0 ? Math.ceil(beConversions / convPerMsg) : 0;
  const bePctOfVolume = waData.messages > 0 ? ((beMsgs / waData.messages) * 100) : 0;
  const msgsPerBroadcast = waData.messages > 0 && freq > 0 ? waData.messages / freq : 0;
  const beBroadcasts = msgsPerBroadcast > 0 ? Math.ceil(beMsgs / msgsPerBroadcast) : 0;
  const profit = waData.revenue - monthlySpend;
  const pctColor = bePctOfVolume <= 30 ? T.green : bePctOfVolume <= 60 ? "#fbbf24" : "#f87171";

  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.darkCard} 0%, #1a2235 100%)`,
      borderRadius: T.radius, padding: 24, marginBottom: 24, color: "#fff",
      border: `1px solid ${T.darkCardLight}`, animation: "fadeUp 0.5s ease 0.1s both",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <Icon name="target" size={20} color={T.green}/>
        <span style={{fontFamily:T.fontSora,fontWeight:700,fontSize:16}}>Break-Even Analysis</span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:16}}>
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Break-Even Conversions</div>
          <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:T.green}}>{fmt(beConversions)}</div>
          <div style={{fontSize:11,color:T.textLight,marginTop:2}}>to cover {dm(monthlySpend)} spend</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Break-Even Messages</div>
          <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:T.green}}>{fmt(beMsgs)}</div>
          <div style={{fontSize:11,color:T.textLight,marginTop:2}}>{bePctOfVolume.toFixed(1)}% of monthly volume</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>% Volume to Break Even</div>
          <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:pctColor}}>{bePctOfVolume.toFixed(1)}%</div>
          <div style={{fontSize:11,color:T.textLight,marginTop:2}}>{beBroadcasts} of {freq} broadcasts</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Monthly Profit</div>
          <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:profit>=0?T.green:"#f87171"}}>{dm(profit)}</div>
          <div style={{fontSize:11,color:T.textLight,marginTop:2}}>revenue minus spend</div>
        </div>
      </div>

      {/* Visual progress bar */}
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,color:T.textMuted}}>Break-even point</span>
          <span style={{fontSize:11,color:T.green,fontFamily:T.fontMono}}>{bePctOfVolume.toFixed(1)}% of volume ({beBroadcasts}/{freq} broadcasts)</span>
        </div>
        <div style={{height:8,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden",position:"relative"}}>
          <div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg, #ef4444, ${T.green})`,width:`${Math.min(bePctOfVolume, 100)}%`,transition:"width 0.8s ease"}} />
          <div style={{position:"absolute",right:0,top:0,height:"100%",borderRadius:4,background:`${T.green}30`,width:`${Math.max(100 - bePctOfVolume, 0)}%`}} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{fontSize:10,color:T.textLight}}>Cost recovery</span>
          <span style={{fontSize:10,color:T.green}}>Pure profit zone</span>
        </div>
      </div>

      <p style={{fontSize:13,lineHeight:1.7,color:T.textMuted,margin:0}}>
        {cn?`For ${cn}, WhatsApp`:"WhatsApp"} pays for itself after just <strong style={{color:"#fff"}}>{fmt(beConversions)} conversions</strong> ({fmt(beMsgs)} messages).
        At your current send rate of <strong style={{color:"#fff"}}>{freq} broadcasts/month</strong>, that's just <strong style={{color:T.green}}>{bePctOfVolume.toFixed(1)}% of your monthly volume</strong> (~{beBroadcasts} of {freq} broadcasts) — meaning
        {bePctOfVolume < 50
          ? ` the remaining ${(100 - bePctOfVolume).toFixed(0)}% of your volume is pure profit. A strong investment case.`
          : ` you recover costs within ${beBroadcasts} broadcasts. Increasing volume or conversion rate would strengthen the case further.`
        }
      </p>
    </div>
  );
}

// ─── SCENARIO COMPARE (6th Tab) ──────────────────────────────────
function ScenarioCompare({baseInputs, region, countryData, industry, indData, dealValue: baseDV}) {
  const [scA, setScA] = useState({messages:50000, dealValue: baseDV, ctr: baseInputs?.ctr||25, convRate: baseInputs?.convRate||7});
  const [scB, setScB] = useState({messages:100000, dealValue: baseDV, ctr: baseInputs?.ctr||25, convRate: baseInputs?.convRate||7});

  useEffect(() => {
    if (baseInputs) {
      setScA(prev => ({...prev, ctr: baseInputs.ctr||25, convRate: baseInputs.convRate||7, dealValue: baseDV}));
      setScB(prev => ({...prev, ctr: baseInputs.ctr||25, convRate: baseInputs.convRate||7, dealValue: baseDV}));
    }
  }, [baseInputs, baseDV]);

  const calcScenario = (sc) => {
    const dr = (baseInputs?.deliveryRate || 96) / 100;
    const or = (baseInputs?.openRate || 90) / 100;
    const ctr = (sc.ctr || 25) / 100;
    const cv = (sc.convRate || 5) / 100;
    const cpm = baseInputs?.costPerMsg || 0;
    const delivered = sc.messages * dr;
    const opened = delivered * or;
    const clicked = opened * ctr;
    const conversions = clicked * cv;
    const revenue = conversions * sc.dealValue;
    const spend = sc.messages * cpm;
    const roi = spend > 0 ? revenue / spend : 0;
    const rev1k = sc.messages > 0 ? (conversions / sc.messages) * 1000 * sc.dealValue : 0;
    const cpConv = conversions > 0 ? spend / conversions : 0;
    return { messages: sc.messages, conversions, revenue, spend, roi, rev1k, cpConv, ctr: sc.ctr, convRate: sc.convRate, dealValue: sc.dealValue };
  };

  const rA = calcScenario(scA);
  const rB = calcScenario(scB);

  const ScenarioCol = ({label, color, sc, setSc, result, idx}) => (
    <div style={{flex:1,minWidth:250}}>
      <div style={{
        fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color,marginBottom:16,
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{
          width:28,height:28,borderRadius:"50%",background:`${color}15`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:13,fontWeight:800,color,border:`2px solid ${color}`,
        }}>{idx}</span>
        {label}
      </div>
      <InputField label="Messages / Month" value={sc.messages} onChange={v => setSc({...sc, messages:v})} min={0} />
      <InputField label="Avg Order Value ($)" value={sc.dealValue} onChange={v => setSc({...sc, dealValue:v})} prefix="$" min={0} />
      <InputField label="CTR (%)" value={sc.ctr} onChange={v => setSc({...sc, ctr:v})} suffix="%" min={0} max={100} />
      <InputField label="Post-Click Conv. Rate (%)" value={sc.convRate} onChange={v => setSc({...sc, convRate:v})} suffix="%" min={0} max={100} />

      <div style={{background:`${color}08`,border:`1px solid ${color}20`,borderRadius:T.radiusSm,padding:16,marginTop:8}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {l:"Revenue/Mo",v:dm(result.revenue)},
            {l:"Conversions",v:fmt(result.conversions)},
            {l:"ROI",v:result.roi.toFixed(1)+"\u00D7"},
            {l:"Spend/Mo",v:dm(result.spend)},
            {l:"Cost/Conv",v:dm(result.cpConv)},
            {l:"Rev/1K Msgs",v:dm(result.rev1k)},
          ].map((m,i) => (
            <div key={i}>
              <div style={{fontSize:10,color:T.textMuted,marginBottom:2}}>{m.l}</div>
              <div style={{fontSize:15,fontWeight:700,fontFamily:T.fontDisplay,color}}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const revDiff = rA.revenue - rB.revenue;
  const roiDiff = rA.roi - rB.roi;
  const winner = rA.revenue >= rB.revenue ? "A" : "B";

  return (
    <div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:20}}>
        <ScenarioCol label="Scenario A" color={T.green} sc={scA} setSc={setScA} result={rA} idx="A" />
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
          <span style={{fontSize:24,color:T.textLight}}>vs</span>
        </div>
        <ScenarioCol label="Scenario B" color="#8b5cf6" sc={scB} setSc={setScB} result={rB} idx="B" />
      </div>

      <InsightBox
        pills={[
          {label:"Scenario A Rev",value:dm(rA.revenue),icon:"A",color:T.green},
          {label:"Scenario B Rev",value:dm(rB.revenue),icon:"B",color:"#8b5cf6"},
          {label:"Difference",value:dm(Math.abs(revDiff)),icon:winner==="A"?<Icon name="circleDot" size={14} color={T.green}/>:<Icon name="circleDot" size={14} color="#8b5cf6"/>,color:winner==="A"?T.green:"#8b5cf6"},
        ]}
        narrative={`Scenario ${winner} generates ${dm(Math.abs(revDiff))} more monthly revenue (${dm(Math.abs(revDiff)*12)}/year). ${
          winner==="A"
            ? `Scenario A achieves a ${rA.roi.toFixed(1)}\u00D7 ROI vs B's ${rB.roi.toFixed(1)}\u00D7.`
            : `Scenario B achieves a ${rB.roi.toFixed(1)}\u00D7 ROI vs A's ${rA.roi.toFixed(1)}\u00D7.`
        } ${Math.abs(rA.messages-rB.messages)>0?`The volume difference of ${fmt(Math.abs(rA.messages-rB.messages))} messages accounts for ${dm(Math.abs(rA.spend-rB.spend))} in spend difference.`:""}`}
      />
    </div>
  );
}

// ─── LANDING PAGE ────────────────────────────────────────────────
function LandingPage({onStart}){
  const[hov,setHov]=useState(false);
  return(<div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 50% 0%,#25D36610 0%,transparent 60%),linear-gradient(160deg,#0f1117,#121318)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px"}}><style>{globalCSS}</style>
    <div style={{maxWidth:800,width:"100%",textAlign:"center",animation:"fadeUp 0.6s ease both"}}>
      {/* Hero */}
      <div style={{marginBottom:40}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <div style={{boxShadow:`0 8px 32px ${T.green}40`,borderRadius:20}}><WhatsAppLogo size={80}/></div>
        </div>
        <h1 style={{fontFamily:T.fontSora,fontWeight:900,fontSize:"clamp(28px,5vw,44px)",color:T.text,letterSpacing:"-0.04em",lineHeight:1.15,marginBottom:12}}>
          Know Your Numbers<br/>Before You Invest
        </h1>
        <p style={{fontFamily:T.font,fontSize:"clamp(14px,2vw,17px)",color:T.textMuted,lineHeight:1.6,maxWidth:540,margin:"0 auto 32px"}}>
          Build the business case for WhatsApp paid messaging. Model revenue impact, compare channels, and quantify cost savings — backed by regional benchmarks across 46 markets.
        </p>
        <button
          onClick={onStart}
          onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          style={{
            background:hov?T.darkGreen:T.green,color:"#fff",border:"none",
            padding:"16px 40px",borderRadius:T.radiusSm,fontSize:17,fontWeight:800,
            fontFamily:T.fontDisplay,cursor:"pointer",transition:"all 0.25s ease",
            boxShadow:hov?`0 8px 32px ${T.green}50`:`0 4px 20px ${T.green}30`,
            transform:hov?"translateY(-2px)":"none",letterSpacing:"-0.01em",
          }}>
          Calculate Your ROI {"\u2192"}
        </button>
      </div>

      {/* Value Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginBottom:40,textAlign:"left"}}>
        {[
          {icon:"messageCircle",title:"Why WhatsApp?",body:"98% open rates. 3\u00D7 higher CTR than email. 2B+ users worldwide. The channel your customers already use daily."},
          {icon:"barChart",title:"Why Calculate ROI?",body:"Build a data-driven business case. Justify messaging spend. Set realistic targets. Compare against SMS and email benchmarks."},
          {icon:"wrench",title:"How This Tool Helps",body:"Regional benchmarks across 46 markets. Multi-channel comparison. Break-even analysis. Export-ready reports for stakeholder buy-in."},
        ].map((c,i)=>(
          <div key={i} style={{background:T.surface,borderRadius:T.radius,padding:24,boxShadow:T.shadow,border:`1px solid ${T.border}`,animation:`fadeUp 0.5s ease ${0.1+i*0.1}s both`}}>
            <div style={{display:"block",marginBottom:12}}><Icon name={c.icon} size={28} color={T.green}/></div>
            <h3 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color:T.text,marginBottom:8}}>{c.title}</h3>
            <p style={{fontFamily:T.font,fontSize:13,color:T.textMuted,lineHeight:1.6,margin:0}}>{c.body}</p>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <p style={{fontFamily:T.font,fontSize:13,color:T.textLight,marginBottom:12}}>
        WhatsApp messaging benchmarks backed by industry data
      </p>
      <div style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap",marginBottom:16}}>
        {[{val:"98%",label:"Open Rate"},{val:"45\u00D7",label:"Higher CTR vs Email"},{val:"70%",label:"Cart Recovery Rate"},{val:"3\u00D7",label:"Faster Response vs Email"}].map((s,i)=>(
          <span key={i} style={{fontFamily:T.fontMono,fontSize:12,color:T.textMuted,padding:"4px 12px",background:T.surface,borderRadius:20,border:`1px solid ${T.border}`,display:"flex",gap:6,alignItems:"center"}}>
            <span style={{color:T.green,fontWeight:700}}>{s.val}</span>{s.label}
          </span>
        ))}
      </div>

      {/* Disclaimer */}
      <Disclaimer style={{border:"none",borderTop:"none",marginTop:24}}/>
    </div>
  </div>);
}

// ─── MESSAGE TYPE SELECTOR ──────────────────────────────────────
function MessageTypeSelector({onSelect}){
  const[selected,setSelected]=useState(null); // "marketing" | "utility"
  const[subMode,setSubMode]=useState("basic"); // "basic" | "advanced"
  const[hovMk,setHovMk]=useState(false);
  const[hovUt,setHovUt]=useState(false);
  return(
    <div style={{marginBottom:24,animation:"fadeUp 0.5s ease both"}}>
      <h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>What would you like to calculate?</h2>
      <p style={{fontSize:13,color:T.textMuted,marginBottom:16}}>Choose your messaging type to get started</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:600}}>
        {/* Marketing card */}
        <div
          onClick={()=>setSelected("marketing")}
          onMouseEnter={()=>setHovMk(true)} onMouseLeave={()=>setHovMk(false)}
          style={{
            padding:24,borderRadius:T.radius,textAlign:"left",cursor:"pointer",
            border:selected==="marketing"?`2px solid ${T.green}`:`1.5px solid ${T.border}`,
            background:selected==="marketing"?T.lightGreenBg:T.surface,
            transition:"all 0.2s ease",transform:hovMk&&selected!=="marketing"?"translateY(-2px)":"none",
            boxShadow:hovMk?T.shadowLg:T.shadow,
          }}>
          <div style={{marginBottom:12}}><Icon name="megaphone" size={32} color={T.green}/></div>
          <div style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color:selected==="marketing"?T.darkGreen:T.text,marginBottom:4}}>Marketing Messages</div>
          <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>Calculate revenue impact of promotional broadcasts and campaigns</div>
          {selected==="marketing"&&(
            <div style={{marginTop:12,animation:"fadeIn 0.2s ease"}}>
              <div style={{fontSize:11,fontWeight:600,color:T.textMuted,marginBottom:6}}>Select complexity level:</div>
              <div style={{display:"flex",gap:2,background:T.darkCard,borderRadius:T.radiusSm,padding:3,marginBottom:12}}>
                {[{k:"basic",l:"Basic",d:"Single-channel WhatsApp ROI"},{k:"advanced",l:"Advanced",d:"Multi-channel comparison"}].map(m=>
                  <button key={m.k} onClick={(e)=>{e.stopPropagation();setSubMode(m.k)}} style={{
                    flex:1,padding:"8px 12px",border:"none",cursor:"pointer",borderRadius:T.radiusXs,
                    fontFamily:T.fontDisplay,fontWeight:700,fontSize:12,
                    background:subMode===m.k?T.darkCard:"transparent",
                    color:subMode===m.k?"#fff":T.textMuted,transition:"all 0.2s ease",
                  }}>{m.l}</button>
                )}
              </div>
              <div style={{fontSize:11,color:T.textMuted,marginBottom:12,padding:"6px 10px",background:T.surfaceLight,borderRadius:T.radiusXs,border:`1px solid ${T.border}`}}>
                {subMode==="basic"
                  ?"Quick single-channel analysis — WhatsApp funnel, revenue, ROI, and break-even."
                  :"Compare WhatsApp against SMS and/or Email with scorecard, shift simulator, and scenario builder."}
              </div>
              <button onClick={(e)=>{e.stopPropagation();onSelect("marketing",subMode)}} style={{
                width:"100%",padding:"10px 16px",border:"none",cursor:"pointer",borderRadius:T.radiusXs,
                background:T.green,color:"#fff",fontFamily:T.fontDisplay,fontWeight:700,fontSize:13,
                transition:"all 0.2s ease",
              }}>Continue with {subMode==="basic"?"Basic":"Advanced"} {"\u2192"}</button>
            </div>
          )}
        </div>
        {/* Utility card */}
        <div
          onClick={()=>{setSelected("utility");onSelect("utility","utility")}}
          onMouseEnter={()=>setHovUt(true)} onMouseLeave={()=>setHovUt(false)}
          style={{
            padding:24,borderRadius:T.radius,textAlign:"left",cursor:"pointer",
            border:selected==="utility"?`2px solid ${T.green}`:`1.5px solid ${T.border}`,
            background:selected==="utility"?T.lightGreenBg:T.surface,
            transition:"all 0.2s ease",transform:hovUt&&selected!=="utility"?"translateY(-2px)":"none",
            boxShadow:hovUt?T.shadowLg:T.shadow,
          }}>
          <div style={{marginBottom:12}}><Icon name="settings" size={32} color={T.green}/></div>
          <div style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color:selected==="utility"?T.darkGreen:T.text,marginBottom:4}}>Utility Messages</div>
          <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>Quantify cost savings from transactional and service messaging</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
export default function App(){
  const[showLanding,setShowLanding]=useState(true);
  const[msgType,setMsgType]=useState(null); // "marketing" | "utility"
  const[mode,setMode]=useState("basic"),[step,setStep]=useState(0),[country,setCountry]=useState(null),[industry,setIndustry]=useState(null),[compChannels,setCompCh]=useState(["sms"]),[dealValue,setDV]=useState(50),[chInputs,setChI]=useState({}),[rTab,setRTab]=useState(0),[showExport,setShowExp]=useState(false),[showSc,setShowSc]=useState(false),[currencyMode,setCM]=useState("usd");
  const[clientName,setClientName]=useState("");
  const[bspMonthlyFee,setBspMonthly]=useState("");
  const[bspSetupFee,setBspSetup]=useState("");
  const[selUtilCases,setSelUC]=useState([]);
  const[utilInputs,setUtilInp]=useState({});

  const region=country?COUNTRIES.find(c=>c.name===country)?.region:null;
  const countryData=COUNTRIES.find(c=>c.name===country);
  const indData=INDUSTRIES.find(i=>i.name===industry);
  const currencyInfo=country?CURRENCIES[country]:null;
  const totalSteps=mode==="basic"?4:mode==="advanced"?5:5;
  const stepLabels=mode==="basic"?["Country","Industry","Inputs","Results"]:mode==="advanced"?["Country","Industry","Channels","Inputs","Results"]:["Country","Industry","Use Cases","Configure","Results"];

  // SET MODULE-LEVEL CURRENCY for dm() — runs every render
  if(currencyMode==="local"&&currencyInfo&&currencyInfo.code!=="USD"){
    _cRate=currencyInfo.rate;_cSym=currencyInfo.symbol;_cCode=currencyInfo.code;
  }else{_cRate=1;_cSym="$";_cCode="USD";}

  useEffect(()=>{setStep(0);setCountry(null);setIndustry(null);setCompCh(["sms"]);setDV(50);setChI({});setRTab(0);setCM("usd");setClientName("");setSelUC([]);setUtilInp({})},[mode]);

  // Keyboard navigation: Enter to advance, Esc to go back
  useEffect(()=>{
    const handler=(e)=>{
      if(showLanding||!msgType)return;
      if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
      if(e.key==="Enter"&&canGo()&&step<totalSteps-1){e.preventDefault();setStep(s=>s+1)}
      if(e.key==="Escape"&&step>0){e.preventDefault();setStep(s=>s-1)}
    };
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  });

  // Full reset function
  const fullReset=()=>{setMsgType(null);setStep(0);setCountry(null);setIndustry(null);setChI({});setCM("usd");setClientName("");setSelUC([]);setUtilInp({});setBspMonthly("");setBspSetup("")};

  useEffect(()=>{
    if(!region||!industry||!countryData)return;
    const wCO=CONV[region]?.[industry]||2,wB=BENCH.whatsapp[region],wCtr=wB?.ctr||25;
    const wDR=(wB?.deliveryRate||96)/100,wOR=(wB?.openRate||90)/100;
    // postClickConv = overall / (dr × or × ctr)  — correct funnel: sent→delivered→opened→clicked→converted
    const wPC=wCO/(wDR*wOR*(wCtr/100));
    const ni={whatsapp:{messages:chInputs.whatsapp?.messages||50000,broadcastsPerMonth:chInputs.whatsapp?.broadcastsPerMonth||4,deliveryRate:wB?.deliveryRate||96,openRate:wB?.openRate||90,ctr:wCtr,convRate:parseFloat(wPC.toFixed(2)),costPerMsg:countryData.wap}};
    ["sms","email"].forEach(ch=>{const b=BENCH[ch]?.[region];if(!b)return;let pc;if(ch==="sms"){const sDR=b.deliveryRate/100,sOR=b.openRate/100,sCTR=b.ctr/100;pc=(wCO*0.15)/(sDR*sOR*sCTR)}else{pc=wPC*0.30}ni[ch]={messages:chInputs[ch]?.messages||50000,broadcastsPerMonth:chInputs[ch]?.broadcastsPerMonth||4,deliveryRate:b.deliveryRate,openRate:b.openRate,ctr:b.ctr,convRate:parseFloat(pc.toFixed(2)),costPerMsg:ch==="sms"?countryData.sms:0.003}});
    setChI(ni);
  },[region,industry,country]);


  const bspMo=parseFloat(bspMonthlyFee)||0;
  const bspSetup=parseFloat(bspSetupFee)||0;
  const allR=useMemo(()=>{const r={};const ac=mode==="basic"?["whatsapp"]:["whatsapp",...compChannels];ac.forEach(ch=>{if(chInputs[ch])r[ch]=deriveAdv(chInputs[ch],dealValue,ch==="whatsapp"?bspMo:0)});return r},[chInputs,dealValue,mode,compChannels,bspMo]);
  const activeCh=mode==="basic"?["whatsapp"]:["whatsapp",...compChannels];
  const displayName=clientName.trim()||industry||"your business";

  // Annual projection (used in basic mode)
  const annualCalc=useMemo(()=>{
    const w=allR.whatsapp;if(!w)return null;
    let audience=w.messages;let totalRev=0,totalMsgSpend=0;
    const oo=(w.optOutRate||0.5)/100;
    const convPerMsg=(w.deliveryRate/100)*(w.openRate/100)*(w.ctr/100)*(w.convRate/100);
    for(let i=0;i<12;i++){totalRev+=audience*convPerMsg*dealValue;totalMsgSpend+=audience*w.costPerMsg;audience*=(1-oo)}
    const totalBspCost=bspMo*12+bspSetup;
    const totalSpend=totalMsgSpend+totalBspCost;
    const retained=w.messages>0?(audience/w.messages*100):100;
    return{totalRev,totalSpend,totalBspCost,profit:totalRev-totalSpend,retained:retained.toFixed(1)};
  },[allR.whatsapp,dealValue,bspMo,bspSetup]);

  const applySc=(sc)=>{if(!msgType){setMsgType("marketing")}setCountry(sc.country);setIndustry(sc.industry);setDV(sc.dealValue);setTimeout(()=>{setChI(p=>{const u={...p};Object.keys(u).forEach(ch=>{if(u[ch])u[ch]={...u[ch],messages:sc.messages}});return u})},100);setShowSc(false);setStep(mode==="basic"?2:3)};

  // Utility: auto-select use cases and prefill benchmarks when industry changes
  useEffect(()=>{
    if(mode!=="utility"||!industry)return;
    const relevant=UTIL_CASES.filter(uc=>uc.industries.includes(industry));
    setSelUC(relevant.map(uc=>uc.id));
    const inp={};
    relevant.forEach(uc=>{inp[uc.id]=uc.benchmarks[industry]||uc.benchmarks[Object.keys(uc.benchmarks)[0]]||{}});
    setUtilInp(inp);
  },[mode,industry]);

  const canGo=()=>{if(step===0)return!!country;if(step===1)return!!industry;if(mode==="advanced"&&step===2)return compChannels.length>0;if(mode==="utility"&&step===2)return selUtilCases.length>0;return true};

  // Landing page
  if(showLanding) return <LandingPage onStart={()=>setShowLanding(false)}/>;

  // Build breadcrumbs
  const breadcrumbs=[msgType==="marketing"?"Marketing":"Utility"];
  if(msgType==="marketing")breadcrumbs.push(mode==="basic"?"Basic":"Advanced");
  if(country)breadcrumbs.push(country);
  if(industry)breadcrumbs.push(industry);
  const progressPct=msgType?(step/(totalSteps-1))*100:0;

  return(<div style={{minHeight:"100vh",background:T.appBg,padding:"0 16px 40px"}}><style>{globalCSS}</style>
    {/* Sticky Header */}
    <div style={{position:"sticky",top:0,zIndex:100,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",background:"rgba(15,17,23,0.85)",marginLeft:-16,marginRight:-16,padding:"0 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}}>
      <div style={{maxWidth:960,margin:"0 auto",paddingTop:12,paddingBottom:8}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={()=>{setShowLanding(true);fullReset()}} style={{cursor:"pointer",transition:"transform 0.2s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}  title="Back to home">
              <WhatsAppLogo size={36}/>
            </div>
            <div>
              <h1 style={{fontFamily:T.fontSora,fontWeight:800,fontSize:18,color:T.text,letterSpacing:"-0.03em",lineHeight:1.2}}>WhatsApp ROI Calculator</h1>
              {msgType&&<div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                {breadcrumbs.map((b,i)=><span key={i} style={{fontSize:11,color:i===breadcrumbs.length-1?T.darkGreen:T.textMuted,fontFamily:T.fontMono,fontWeight:i===breadcrumbs.length-1?600:400}}>{i>0&&<span style={{margin:"0 4px",color:T.textLight}}>/</span>}{b}</span>)}
              </div>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {msgType&&step>0&&<Btn variant="secondary" size="sm" onClick={()=>setStep(s=>Math.max(0,s-1))}><Icon name="arrowLeft" size={14}/> Back</Btn>}
            {msgType&&<Btn variant="ghost" size="sm" onClick={()=>{fullReset()}}><Icon name="arrowLeft" size={14}/> Change Type</Btn>}
          </div>
        </div>
      </div>
      {/* Progress bar */}
      {msgType&&<div style={{height:3,background:T.borderLight,marginTop:4}}><div style={{height:"100%",background:T.green,width:`${progressPct}%`,transition:"width 0.4s ease",borderRadius:2}}/></div>}
    </div>

    <div style={{maxWidth:960,margin:"0 auto",paddingTop:24,animation:"fadeUp 0.5s ease both"}}>

      {/* Message Type Selection (if not yet chosen) */}
      {!msgType&&<MessageTypeSelector onSelect={(type,m)=>{setMsgType(type);setMode(m)}}/>}

      {/* Calculator Flow (once message type is chosen) */}
      {msgType&&<div>


      <StepIndicator steps={stepLabels} current={step} onStep={setStep}/>

      {/* STEP 0: Country */}
      {step===0&&<Card delay={0.05}><h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>Select Your Market</h2><p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>Choose the country for pricing and benchmark data</p>{CONTINENTS.map(cont=>{const rc=COUNTRIES.filter(c=>c.continent===cont);return <div key={cont} style={{marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:T.textMuted,fontFamily:T.fontSora,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{cont}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{rc.map(c=><button key={c.name} onClick={()=>setCountry(c.name)} style={{padding:"8px 16px",borderRadius:20,border:country===c.name?`2px solid ${T.green}`:`1px solid ${T.border}`,background:country===c.name?T.lightGreenBg:T.surface,color:country===c.name?T.darkGreen:T.text,fontFamily:T.font,fontSize:13,fontWeight:country===c.name?600:400,cursor:"pointer",transition:"all 0.15s ease"}}>{c.name}</button>)}</div></div>})}{country&&countryData&&<div style={{marginTop:16,padding:14,background:T.lightGreenBg,borderRadius:T.radiusSm,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",animation:"fadeUp 0.3s ease"}}><span style={{fontFamily:T.fontDisplay,fontWeight:700,color:T.darkGreen}}>{country}</span><span style={{fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>{countryData.continent}</span><span style={{fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>WAP: ${countryData.wap.toFixed(4)}</span><span style={{fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>SMS: ${countryData.sms.toFixed(4)}</span>{currencyInfo&&<span style={{fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>Currency: {currencyInfo.code} ({currencyInfo.symbol})</span>}</div>}</Card>}

      {/* STEP 1: Industry */}
      {step===1&&<Card delay={0.05}><h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>Select Your Industry</h2><p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>Choose your industry to apply relevant benchmarks</p>{["direct","leadgen","footfall"].map(arch=>{const al=arch==="direct"?"Direct Commerce":arch==="leadgen"?"Lead Generation":"Footfall";return <div key={arch} style={{marginBottom:20}}><div style={{fontSize:12,fontWeight:700,color:T.textMuted,fontFamily:T.fontSora,marginBottom:10}}>{al}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>{INDUSTRIES.filter(i=>i.archetype===arch).map(ind=>{const sel=industry===ind.name;return <button key={ind.name} onClick={()=>setIndustry(ind.name)} style={{padding:"14px 18px",borderRadius:T.radiusSm,textAlign:"left",border:sel?`2px solid ${T.green}`:`1px solid ${T.border}`,background:sel?T.lightGreenBg:T.surface,cursor:"pointer",transition:"all 0.15s ease"}}><div style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,color:sel?T.darkGreen:T.text}}>{ind.name}</div></button>})}</div></div>})}</Card>}

      {/* STEP 2 ADV: Channels */}
      {mode==="advanced"&&step===2&&<Card delay={0.05}><h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>Select Comparison Channels</h2><p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>WhatsApp is always included. Pick at least one to compare.</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:400}}>{["sms","email"].map(ch=>{const cfg=CH_CFG[ch],a=compChannels.includes(ch);return <button key={ch} onClick={()=>{if(a)setCompCh(compChannels.filter(c=>c!==ch));else setCompCh([...compChannels,ch])}} style={{padding:20,borderRadius:T.radiusSm,textAlign:"center",border:a?`2px solid ${cfg.color}`:`1.5px solid ${T.border}`,background:a?cfg.bg:T.surface,cursor:"pointer",transition:"all 0.2s ease"}}><div style={{marginBottom:8,display:"flex",justifyContent:"center"}}><Icon name={cfg.icon} size={28} color={cfg.color}/></div><div style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:16,color:a?cfg.dark:T.text}}>{cfg.label}</div>{a&&<div style={{marginTop:6,fontSize:11,color:cfg.dark,fontFamily:T.fontMono}}>{"\u2713"} Selected</div>}</button>})}</div></Card>}

      {/* UTILITY STEP 2: Use Case Selection */}
      {mode==="utility"&&step===2&&<Card delay={0.05}>
        <h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>Select Use Cases</h2>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:20}}>
          We've pre-selected the most relevant use cases for {industry}. Toggle any on or off.
        </p>
        {["Cost Deflection","Revenue Recovery","Productivity"].map(cat=>{
          const cases=UTIL_CASES.filter(uc=>uc.cat===cat);
          const catColors={"Cost Deflection":"#3b82f6","Revenue Recovery":"#10b981","Productivity":"#8b5cf6"};
          return <div key={cat} style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:catColors[cat],fontFamily:T.fontSora,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>{cat}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:8}}>
              {cases.map(uc=>{
                const active=selUtilCases.includes(uc.id);
                const relevant=uc.industries.includes(industry);
                return <button key={uc.id} onClick={()=>{
                  if(active){setSelUC(selUtilCases.filter(id=>id!==uc.id))}
                  else{
                    setSelUC([...selUtilCases,uc.id]);
                    if(!utilInputs[uc.id]){
                      const bench=uc.benchmarks[industry]||uc.benchmarks[Object.keys(uc.benchmarks)[0]]||{};
                      setUtilInp(p=>({...p,[uc.id]:bench}));
                    }
                  }
                }} style={{
                  padding:"14px 16px",borderRadius:T.radiusSm,textAlign:"left",
                  border:active?`2px solid ${catColors[cat]}`:`1.5px solid ${T.border}`,
                  background:active?`${catColors[cat]}08`:T.surface,
                  cursor:"pointer",transition:"all 0.15s ease",
                  opacity:relevant||active?1:0.6,
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <Icon name={uc.icon} size={18} color={active?catColors[cat]:T.textMuted}/>
                    <span style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,color:active?catColors[cat]:T.text}}>{uc.name}</span>
                    {active&&<span style={{marginLeft:"auto",fontSize:11,color:catColors[cat],fontFamily:T.fontMono}}>{"\u2713"}</span>}
                  </div>
                  <div style={{fontSize:11,color:T.textMuted,lineHeight:1.4}}>{uc.desc}</div>
                  {!relevant&&<div style={{fontSize:10,color:T.textLight,marginTop:4,fontStyle:"italic"}}>Not typical for {industry} — but you can still enable it</div>}
                </button>
              })}
            </div>
          </div>
        })}
        <div style={{padding:12,background:T.surfaceLight,borderRadius:T.radiusXs,fontSize:12,color:T.textMuted}}>
          {selUtilCases.length} use case{selUtilCases.length!==1?"s":""} selected
        </div>
      </Card>}

      {/* UTILITY STEP 3: Configure Inputs */}
      {mode==="utility"&&step===3&&<div>
        <Card delay={0.03} style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <Icon name="building" size={18}/>
            <h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,margin:0}}>Client Details</h2>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <label style={{fontSize:13,fontWeight:600,color:T.textMuted,fontFamily:T.font}}>Client / Business Name</label>
          </div>
          <input type="text" value={clientName} onChange={e=>setClientName(e.target.value)}
            placeholder={`e.g. ${industry||"Acme Corp"}`}
            style={{width:"100%",maxWidth:400,padding:"10px 14px",borderRadius:T.radiusXs,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:T.font,outline:"none",background:T.surfaceLight,color:T.text}}
            onFocus={e=>e.target.style.borderColor=T.green}
            onBlur={e=>e.target.style.borderColor=T.border}
          />
        </Card>
        {UTIL_CASES.filter(uc=>selUtilCases.includes(uc.id)).map((uc,idx)=>{
          const inp=utilInputs[uc.id]||{};
          const catColors={"Cost Deflection":"#3b82f6","Revenue Recovery":"#10b981","Productivity":"#8b5cf6"};
          const cc=catColors[uc.cat]||T.green;
          return <Card key={uc.id} style={{borderTop:`3px solid ${cc}`,marginBottom:16}} delay={idx*0.03}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <Icon name={uc.icon} size={20} color={cc}/>
              <div>
                <span style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:16,color:T.text}}>{uc.name}</span>
                <span style={{marginLeft:8,padding:"2px 8px",borderRadius:10,background:`${cc}12`,color:cc,fontSize:10,fontFamily:T.fontMono}}>{uc.cat}</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0 20px"}}>
              {uc.fields.map(f=> <InputField key={f.k} label={f.l} value={inp[f.k]||0}
                onChange={v=>setUtilInp(p=>({...p,[uc.id]:{...p[uc.id],[f.k]:v}}))}
                suffix={f.suf} prefix={f.pre} tooltip={f.tip} min={0}
              />)}
            </div>
            {/* Mini preview */}
            {(()=>{const r=uc.calc(inp);const waCost=r.msgs*(countryData?.wap||0.05)*UTIL_COST_FACTOR;return <div style={{display:"flex",gap:16,flexWrap:"wrap",padding:"10px 14px",background:T.surfaceLight,borderRadius:T.radiusXs,fontSize:12,fontFamily:T.fontMono,color:T.textMuted}}>
              <span>Savings: <strong style={{color:T.darkGreen}}>{dm(r.savings)}</strong>/mo</span>
              <span>WA Cost: <strong>{dm(waCost)}</strong>/mo</span>
              <span>Messages: <strong>{fmt(r.msgs)}</strong>/mo</span>
            </div>})()}
          </Card>
        })}
      </div>}

      {/* INPUT STEP (Marketing) */}
      {((mode==="basic"&&step===2)||(mode==="advanced"&&step===3))&&<div>
        {/* Client Name */}
        <Card delay={0.03} style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <Icon name="building" size={18}/>
            <h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,margin:0}}>Client Details</h2>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <label style={{fontSize:13,fontWeight:600,color:T.textMuted,fontFamily:T.font}}>Client / Business Name</label>
            <Tooltip text="Used to personalize the report and export. Leave blank to use industry name.">
              <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:16,height:16,borderRadius:"50%",background:T.surfaceHover,fontSize:10,color:T.textMuted,cursor:"help",fontWeight:700}}>?</span>
            </Tooltip>
          </div>
          <input type="text" value={clientName} onChange={e=>setClientName(e.target.value)}
            placeholder={`e.g. ${industry||"Acme Corp"}`}
            style={{
              width:"100%",maxWidth:400,padding:"10px 14px",borderRadius:T.radiusXs,
              border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:T.font,outline:"none",
              transition:"border-color 0.2s ease",background:T.surfaceLight,color:T.text,
            }}
            onFocus={e=>e.target.style.borderColor=T.green}
            onBlur={e=>e.target.style.borderColor=T.border}
          />
          {clientName.trim()&&<div style={{marginTop:8,fontSize:12,color:T.darkGreen,fontFamily:T.font}}>
            Report will be personalized for <strong>{clientName.trim()}</strong>
          </div>}
        </Card>

        <Card delay={0.05} style={{marginBottom:16}}>
          <h2 style={{fontFamily:T.fontDisplay,fontWeight:800,fontSize:20,marginBottom:4}}>Average Order Value</h2>
          <p style={{fontSize:13,color:T.textMuted,marginBottom:16}}>Set your average revenue per conversion</p>
          <div style={{display:"flex",gap:16,alignItems:"flex-end",flexWrap:"wrap"}}>
            <InputField label="Average Order Value (USD)" value={dealValue} onChange={setDV} prefix="$" tooltip="Average revenue per conversion" style={{marginBottom:0,flex:"1 1 200px"}}/>
            {currencyInfo&&currencyInfo.code!=="USD"&&<div style={{padding:"8px 14px",background:T.surfaceLight,borderRadius:T.radiusXs,fontSize:12,fontFamily:T.fontMono,color:T.textMuted,display:"flex",alignItems:"center",height:42}}>{"\u2248"} {currencyInfo.symbol}{(dealValue*currencyInfo.rate).toLocaleString("en-US",{maximumFractionDigits:0})} {currencyInfo.code}</div>}
          </div>
        </Card>
        {activeCh.map(ch=> <ChannelInputPanel key={ch} channel={ch} inputs={chInputs[ch]||{}} onChange={inp=>setChI(p=>({...p,[ch]:inp}))} region={region} country={countryData} rateLabel={indData?.rateLabel}/>)}

        {/* BSP Platform Costs (optional) */}
        <Card delay={0.15} style={{marginBottom:16,border:`1px solid ${T.borderLight}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <Icon name="building" size={18} color={T.textMuted}/>
            <h2 style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:16,color:T.text,margin:0}}>BSP Platform Costs</h2>
            <span style={{fontSize:11,color:T.textLight,fontFamily:T.fontMono,padding:"2px 8px",background:T.surfaceHover,borderRadius:10}}>Optional</span>
          </div>
          <p style={{fontSize:12,color:T.textMuted,marginBottom:16}}>Include your WhatsApp Business Solution Provider fees for a more accurate ROI</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <InputField label="Monthly Platform Fee (USD)" value={bspMonthlyFee} onChange={setBspMonthly} prefix="$" tooltip="Monthly subscription fee charged by your BSP (e.g. respond.io, WATI, Gupshup)" min={0} style={{marginBottom:0,flex:"1 1 200px"}}/>
            <InputField label="One-Time Setup Fee (USD)" value={bspSetupFee} onChange={setBspSetup} prefix="$" tooltip="One-time implementation or onboarding fee charged by your BSP" min={0} style={{marginBottom:0,flex:"1 1 200px"}}/>
          </div>
          {(bspMo>0||bspSetup>0)&&<div style={{marginTop:12,padding:"10px 14px",background:T.surfaceLight,borderRadius:T.radiusXs,fontSize:12,color:T.textMuted,fontFamily:T.fontMono}}>
            {bspMo>0&&<span>Platform: {dm(bspMo)}/mo</span>}
            {bspMo>0&&bspSetup>0&&<span style={{margin:"0 8px",color:T.textLight}}>|</span>}
            {bspSetup>0&&<span>Setup: {dm(bspSetup)} (one-time)</span>}
            <span style={{margin:"0 8px",color:T.textLight}}>|</span>
            <span>Year 1 total: {dm(bspMo*12+bspSetup)}</span>
          </div>}
        </Card>
      </div>}

      {/* RESULTS */}
      {((mode==="basic"&&step===3)||(mode==="advanced"&&step===4))&&<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div><h2 style={{fontFamily:T.fontSora,fontWeight:800,fontSize:22,color:T.text}}>Results{clientName.trim()&&<span style={{fontWeight:600,color:T.darkGreen}}> for {clientName.trim()}</span>}</h2><p style={{fontSize:13,color:T.textMuted}}>{country} &middot; {industry}{currencyMode==="local"&&currencyInfo&&currencyInfo.code!=="USD"&&<span style={{marginLeft:8,fontFamily:T.fontMono,color:T.darkGreen,fontWeight:600}}>(showing in {currencyInfo.code})</span>}</p></div>
          <div style={{display:"flex",gap:8}}>
            {currencyInfo&&currencyInfo.code!=="USD"&&<Btn variant={currencyMode==="local"?"primary":"secondary"} size="sm" onClick={()=>setCM(m=>m==="usd"?"local":"usd")}><Icon name="dollarSign" size={14}/> {currencyMode==="usd"?`Show in ${currencyInfo.code}`:"Show in USD"}</Btn>}
            <Btn variant="dark" size="sm" onClick={()=>setShowExp(true)}><Icon name="upload" size={14}/> Export</Btn>
          </div>
        </div>

        {/* Hero Card */}
        {allR.whatsapp&&<ResultsHeroCard revenue={allR.whatsapp.revenue} roi={allR.whatsapp.roi} mode={mode} clientName={clientName.trim()}/>}

        {mode==="advanced"&&allR.whatsapp&&<ExecutiveSummary waData={allR.whatsapp} compData={allR} channels={activeCh} country={country} industry={industry} clientName={clientName.trim()}/>}


        {/* Break-Even Card - always visible in results */}
        {allR.whatsapp && <BreakEvenCard waData={allR.whatsapp} dealValue={dealValue} clientName={clientName.trim()} broadcastsPerMonth={chInputs.whatsapp?.broadcastsPerMonth||4} />}

        {mode==="basic"&&allR.whatsapp&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}}>
            <MetricCard label="Monthly Revenue" value={dm(allR.whatsapp.revenue)} color={T.green} icon={<Icon name="dollarSign" size={14}/>}/>
            <MetricCard label="Conversions / Mo" value={fmt(allR.whatsapp.conversions)} color={T.green} icon={<Icon name="target" size={14}/>} delay={0.05}/>
            <MetricCard label="ROI" value={allR.whatsapp.roi.toFixed(1)+"\u00D7"} color={T.darkGreen} icon={<Icon name="trendingUp" size={14}/>} delay={0.1}/>
            <MetricCard label="Cost / Conversion" value={dm(allR.whatsapp.cpConv)} color={T.textMuted} icon={<Icon name="dollarSign" size={14}/>} delay={0.15}/>
            <MetricCard label="Monthly Spend" value={dm(allR.whatsapp.spend)} subtext={bspMo>0?`Msg: ${dm(allR.whatsapp.msgSpend)} + BSP: ${dm(bspMo)}`:undefined} color={T.textMuted} icon={<Icon name="dollarSign" size={14}/>} delay={0.2}/>
          </div>
          {/* Annual Projection Card */}
          {annualCalc&&<div style={{background:`linear-gradient(135deg, ${T.darkCard} 0%, #1a2235 100%)`,borderRadius:T.radius,padding:24,marginBottom:20,border:`1px solid ${T.darkCardLight}`,animation:"fadeUp 0.5s ease 0.15s both"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <Icon name="calendar" size={20} color={T.green}/>
              <span style={{fontFamily:T.fontSora,fontWeight:700,fontSize:16,color:"#fff"}}>12-Month Projection</span>
              <span style={{fontSize:11,color:T.textLight,marginLeft:"auto"}}>12-month projection</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
              <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
                <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Annual Revenue</div>
                <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:T.green}}>{dm(annualCalc.totalRev)}</div>
                <div style={{fontSize:11,color:T.textLight,marginTop:2}}>annual estimate</div>
              </div>
              <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
                <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Annual Profit</div>
                <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:annualCalc.profit>=0?T.green:"#f87171"}}>{dm(annualCalc.profit)}</div>
                <div style={{fontSize:11,color:T.textLight,marginTop:2}}>revenue minus spend</div>
              </div>
              <div style={{background:"rgba(255,255,255,0.06)",borderRadius:T.radiusXs,padding:"12px 14px"}}>
                <div style={{fontSize:11,color:T.textMuted,marginBottom:4}}>Annual Spend</div>
                <div style={{fontSize:24,fontWeight:800,fontFamily:T.fontDisplay,color:T.textMuted}}>{dm(annualCalc.totalSpend)}</div>
                <div style={{fontSize:11,color:T.textLight,marginTop:2}}>{annualCalc.totalBspCost>0?"incl. BSP fees":"total messaging cost"}</div>
              </div>
            </div>
          </div>}

          <InsightBox pills={[{label:"Revenue",value:dm(allR.whatsapp.revenue),icon:<Icon name="dollarSign" size={14}/>,color:T.green},{label:"ROI",value:allR.whatsapp.roi.toFixed(1)+"\u00D7",icon:<Icon name="trendingUp" size={14}/>,color:T.green},{label:"Conversions",value:fmt(allR.whatsapp.conversions),icon:<Icon name="target" size={14}/>,color:T.green}]} narrative={`Sending ${fmt(allR.whatsapp.messages)} WhatsApp messages across ${chInputs.whatsapp?.broadcastsPerMonth||4} broadcasts per month for ${displayName} in ${country} yields ${fmt(allR.whatsapp.conversions)} conversions and ${dm(allR.whatsapp.revenue)} in revenue. With a ${allR.whatsapp.roi.toFixed(1)}\u00D7 ROI, the annual revenue potential is ${dm(annualCalc?annualCalc.totalRev:allR.whatsapp.revenue*12)}.`}/>
          <div style={{marginTop:20}}><FunnelViz data={allR.whatsapp} color={T.green} label="whatsapp"/></div>

        </div>}

        {mode==="advanced"&&allR.whatsapp&&<div>
          <TabBar tabs={["Funnel","Scorecard","Cost Efficiency","Shift Simulator","Scenarios"]} active={rTab} onChange={setRTab}/>

          {rTab===0&&<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:20}}>
              {activeCh.map(ch=>{const d=allR[ch];if(!d)return null;const c=CH_CFG[ch];return[<MetricCard key={ch+"r"} label={`${c.label} Reach`} value={pct(d.reachRate)} color={c.color} icon={<Icon name={c.icon} size={14}/>}/>,<MetricCard key={ch+"v"} label={`${c.label} Rev/Mo`} value={dm(d.revenue)} color={c.color} icon={<Icon name="dollarSign" size={14}/>}/>,<MetricCard key={ch+"i"} label={`${c.label} ROI`} value={d.roi.toFixed(1)+"\u00D7"} color={c.color} icon={<Icon name="trendingUp" size={14}/>}/>]})}
            </div>
            <Card style={{marginBottom:16}}>{activeCh.map(ch=>allR[ch]&&<FunnelViz key={ch} data={allR[ch]} color={CH_CFG[ch].color} label={ch} maxMessages={Math.max(...activeCh.map(c=>allR[c]?.messages||0))}/>)}</Card>
            {compChannels.map(ch=>{const c=allR[ch],w=allR.whatsapp;if(!c||!w)return null;const cm=c.ctr>0?(w.ctr/c.ctr).toFixed(1):"\u221E",cp=(w.conversions/w.messages*100).toFixed(2),cc2=c.messages>0?(c.conversions/c.messages*100).toFixed(2):"0";return <InsightBox key={ch} pills={[{label:"WA Reach",value:pct(w.reachRate),color:T.green},{label:`${CH_CFG[ch].label} Reach`,value:pct(c.reachRate),color:CH_CFG[ch].color},{label:"CTR Mul",value:`${cm}\u00D7`,color:T.green}]} narrative={`WhatsApp's ${pct(w.ctr)} CTR is ${cm}\u00D7 stronger than ${CH_CFG[ch].label}'s ${pct(c.ctr)}. Per 100 messages, WhatsApp generates ${cp} conversions vs ${cc2}. This translates to ${dm(w.revenue-c.revenue)} more monthly revenue.`} delay={0.1}/>})}
          </div>}

          {rTab===1&&<div>
            <ScorecardTable channels={activeCh} data={allR}/>
            {compChannels.map(ch=>{const c=allR[ch],w=allR.whatsapp;if(!c||!w)return null;const rp=c.revenue>0?((w.revenue-c.revenue)/c.revenue*100).toFixed(0):"\u221E",es=(w.conversions-c.conversions).toFixed(0);return <InsightBox key={ch} pills={[{label:"Revenue Premium",value:`${rp}%`,color:T.green},{label:"Extra Sales/Mo",value:es,color:T.green},{label:"ROI Delta",value:`${(w.roi-c.roi).toFixed(1)}\u00D7`,color:T.green}]} narrative={`WhatsApp delivers a ${rp}% revenue premium over ${CH_CFG[ch].label}, generating ${Math.abs(parseInt(es))} ${parseInt(es)>=0?"additional":"fewer"} sales per month.`} delay={0.05}/>})}
          </div>}

          {rTab===2&&<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
              {activeCh.map(ch=>{const d=allR[ch];if(!d)return null;return <Card key={ch} style={{borderTop:`3px solid ${CH_CFG[ch].color}`,padding:16}}><div style={{fontFamily:T.fontDisplay,fontWeight:700,fontSize:14,color:CH_CFG[ch].dark,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><Icon name={CH_CFG[ch].icon} size={14} color={CH_CFG[ch].color}/> {CH_CFG[ch].label}</div><div style={{display:"flex",flexDirection:"column",gap:10}}><div><div style={{fontSize:11,color:T.textMuted}}>Rev / 1K Msgs</div><div style={{fontSize:20,fontWeight:800,fontFamily:T.fontDisplay,color:CH_CFG[ch].dark}}>{dm(d.rev1k)}</div></div><div><div style={{fontSize:11,color:T.textMuted}}>Cost / Click</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontMono}}>{dm(d.cpClick)}</div></div><div><div style={{fontSize:11,color:T.textMuted}}>Cost / Conversion</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.fontMono}}>{dm(d.cpConv)}</div></div><div><div style={{fontSize:11,color:T.textMuted}}>ROI</div><div style={{fontSize:20,fontWeight:800,fontFamily:T.fontDisplay,color:CH_CFG[ch].color}}>{d.roi.toFixed(1)}{"\u00D7"}</div></div></div></Card>})}
            </div>
            {compChannels.map(ch=>{const c=allR[ch],w=allR.whatsapp;if(!c||!w)return null;const wE=(w.deliveryRate/100)*(w.openRate/100)*(w.ctr/100)*(w.convRate/100)*100,cE=(c.deliveryRate/100)*(c.openRate/100)*(c.ctr/100)*(c.convRate/100)*100,er=cE>0?(wE/cE).toFixed(1):"\u221E",oc=Math.abs(w.rev1k-c.rev1k)*(c.messages/1000);return <InsightBox key={ch} pills={[{label:"Efficiency",value:`${er}\u00D7`,color:T.green},{label:"Opportunity Cost",value:dm(oc),color:CH_CFG[ch].color},{label:"WA Rev/1K",value:dm(w.rev1k),color:T.green}]} narrative={`WhatsApp is ${er}\u00D7 more efficient than ${CH_CFG[ch].label}. The opportunity cost of using ${CH_CFG[ch].label} for your ${fmt(c.messages)} monthly messages is ~${dm(oc)}/month in foregone revenue.`} delay={0.05}/>})}
          </div>}

          {rTab===3&&<div>{compChannels.map(ch=>{const c=allR[ch],w=allR.whatsapp;if(!c||!w)return null;return <Card key={ch} style={{marginBottom:16}}><ShiftSimulator waData={w} compData={c} compChannel={ch} dealValue={dealValue}/></Card>})}</div>}

          {rTab===4&&<ScenarioCompare baseInputs={chInputs.whatsapp} region={region} countryData={countryData} industry={industry} indData={indData} dealValue={dealValue}/>}

          <MonthlyProjection waData={allR.whatsapp} compData={allR} channels={activeCh} dealValue={dealValue}/>
        </div>}
      </div>}

      {/* UTILITY RESULTS */}
      {mode==="utility"&&step===4&&countryData&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div><h2 style={{fontFamily:T.fontSora,fontWeight:800,fontSize:22,color:T.text}}>Utility ROI{clientName.trim()&&<span style={{fontWeight:600,color:T.darkGreen}}> for {clientName.trim()}</span>}</h2><p style={{fontSize:13,color:T.textMuted}}>{country} &middot; {industry}</p></div>
          </div>
          {(()=>{
            const uCases=UTIL_CASES.filter(uc=>selUtilCases.includes(uc.id));
            const uResults=uCases.map(uc=>{const inp=utilInputs[uc.id]||{};const r=uc.calc(inp);const waCost=r.msgs*countryData.wap*UTIL_COST_FACTOR;return{...r,waCost}});
            const uTotalSavings=uResults.reduce((s,r)=>s+r.savings,0);
            const uTotalCost=uResults.reduce((s,r)=>s+r.waCost,0);
            const uROI=uTotalCost>0?uTotalSavings/uTotalCost:0;
            return <ResultsHeroCard revenue={0} roi={uROI} mode="utility" savings={uTotalSavings-uTotalCost} clientName={clientName.trim()}/>;
          })()}
          <UtilityResults
            selectedCases={UTIL_CASES.filter(uc=>selUtilCases.includes(uc.id))}
            utilInputs={utilInputs}
            wapCost={countryData.wap}
            clientName={clientName.trim()}
            country={country}
            industry={industry}
          />
        </div>
      )}

      {/* Nav */}
      {step<totalSteps-1&&<div style={{display:"flex",justifyContent:"flex-end",marginTop:24,animation:"fadeUp 0.4s ease 0.2s both"}}><Btn variant="primary" onClick={()=>setStep(step+1)} disabled={!canGo()} size="lg">{step===totalSteps-2?"Calculate ROI \u2192":"Continue \u2192"}</Btn></div>}
      {step===totalSteps-1&&<div style={{display:"flex",justifyContent:"flex-end",marginTop:24}}><Btn variant="ghost" onClick={fullReset}><Icon name="refreshCw" size={14}/> Start Over</Btn></div>}

      {showExport&&<ExportModal onClose={()=>setShowExp(false)} allData={allR} channels={activeCh} dealValue={dealValue} country={country} industry={industry} clientName={clientName.trim()}/>}

      <Disclaimer/>
      </div>}{/* end msgType wrapper */}

      {!msgType&&<Disclaimer/>}
    </div>
  </div>);
}
