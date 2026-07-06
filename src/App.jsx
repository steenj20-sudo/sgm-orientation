// SGM Orientation v101 — Image of the Day cache key bumped to v4 to force regeneration past stale pre-fix cached data; Word for Today's Work box darkened to steel blue #2E5B8A
import { useState, useEffect, useRef } from "react";

// Inject Inter font
if(typeof document!=="undefined"&&!document.getElementById("inter-font")){
  const link=document.createElement("link");
  link.id="inter-font";
  link.rel="stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

const INK = "#1A2E4A";
const PAPER = "#F5F0E8";
const OX = "#7A1F1F";
const TAN = "#B8956A";
const TANL = "#D4B896";
const GOLD = "#9C7A3A";
const GRN = "#1A5C2A";
const AMB = "#7A5200";
const PUR = "#4A3A7A";
const FINK = "rgba(26,46,74,0.12)";
const CYAN = "#6DDCE8";
const OXF = "rgba(122,31,31,0.07)";
const BODY = "'Inter',system-ui,sans-serif";
const SERIF = "Georgia,'Playfair Display',serif";
const CARD = {background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:10};
const SEC = {fontSize:15,color:"#3a4a5a",fontFamily:BODY,lineHeight:1.75};

const BG = "repeating-linear-gradient(transparent,transparent 27px,rgba(26,46,74,0.025) 27px,rgba(26,46,74,0.025) 28px)";

async function claudeAPI(prompt,max_tokens=1000){
  const key=import.meta.env.VITE_ANTHROPIC_API_KEY;
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-api-key":key||"",
      "anthropic-version":"2023-06-01",
      "anthropic-dangerous-direct-browser-access":"true",
    },
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens,messages:[{role:"user",content:prompt}]})
  });
  const data=await res.json();
  if(data.error)throw new Error(data.error.message||"API error");
  return data.content?.find(b=>b.type==="text")?.text||"";
}

const SCVS = {
  perfectionism:{v:"She is clothed with strength and dignity; she can laugh at the days to come.",r:"Proverbs 31:25"},
  shame:{v:"There is now no condemnation for those who are in Christ Jesus.",r:"Romans 8:1"},
  unknown:{v:"Trust in the Lord with all your heart and lean not on your own understanding.",r:"Proverbs 3:5"},
  scarcity:{v:"My God will meet all your needs according to the riches of his glory in Christ Jesus.",r:"Philippians 4:19"},
  procrastination:{v:"Whatever you do, work at it with all your heart, as working for the Lord.",r:"Colossians 3:23"},
  time:{v:"Teach us to number our days, that we may gain a heart of wisdom.",r:"Psalm 90:12"},
};

const ANCH = [
  {v:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",r:"Proverbs 3:5-6",app:"Where are you leaning on your own understanding today instead of trusting Him with the next step? Name it, then hand it over — out loud if you have to."},
  {v:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",r:"Jeremiah 29:11",app:"The uncertainty you're carrying isn't evidence He's absent. Let this be permission to stop trying to see the whole plan today — just take the next right step."},
  {v:"I can do all this through him who gives me strength.",r:"Philippians 4:13",app:"What's the one task you've been avoiding because it feels too big? Ask for strength specifically for that thing, then start it for five minutes."},
  {v:"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you.",r:"Joshua 1:9",app:"Courage isn't the absence of fear — it's moving anyway. What's one thing fear has been keeping you from doing today?"},
  {v:"Cast all your anxiety on him because he cares for you.",r:"1 Peter 5:7",app:"What's the thing sitting heaviest on you right now? Write it down, hand it to Him in prayer, and notice if your shoulders drop even a little."},
  {v:"He gives strength to the weary and increases the power of the weak.",r:"Isaiah 40:29",app:"If you're running on empty today, that's not a disqualifier — it's exactly where He meets you. Ask for strength instead of pushing through alone."},
  {v:"Let your yes be yes and your no be no.",r:"Matthew 5:37",app:"Where have you been over-explaining or hedging instead of just being clear today? Practice one direct, simple answer."},
  {v:"Carry each other's burdens, and in this way you will fulfill the law of Christ.",r:"Galatians 6:2",app:"Who in your life is carrying something heavy right now? One small act today — a text, a prayer, a question — can lighten it."},
  {v:"Fix your eyes on Jesus, the author and perfecter of faith.",r:"Hebrews 12:2",app:"When the spike of anger or anxiety hits today, that's your cue. One breath back toward Him counts as a win — it doesn't have to be perfect."},
  {v:"And we know that in all things God works for the good of those who love him.",r:"Romans 8:28",app:"Think of one thing from your past that felt wasted or wrong. Ask Him to show you, even briefly, how He's already redeeming it."},
  {v:"My grace is sufficient for you, for my power is made perfect in weakness.",r:"2 Corinthians 12:9",app:"Where do you feel least capable today? That's not the place to hide — it's the place His strength shows up clearest."},
  {v:"Commit to the Lord whatever you do, and he will establish your plans.",r:"Proverbs 16:3",app:"Before you dive into today's tasks, name one of them out loud as an offering to Him — not just a to-do."},
  {v:"Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.",r:"Philippians 4:6",app:"What's the specific anxious thought looping today? Turn it into a specific prayer request instead of letting it just spin."},
  {v:"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.",r:"Ephesians 2:8",app:"Notice today if you're trying to earn approval — from God, from people, from yourself. Grace means you can stop performing."},
  {v:"I planted the seed, Apollos watered it, but God has been making it grow.",r:"1 Corinthians 3:6",app:"You don't have to have every answer today. Just plant the seed in front of you and trust Him with the growth."},
  {v:"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",r:"2 Corinthians 5:17",app:"If someone today treats you like the old version of you, that's their lens, not your identity. You don't have to defend the new — just live it."},
  {v:"For am I now seeking the approval of man, or of God?",r:"Galatians 1:10",app:"Where today are you tempted to shape your words around what someone wants to hear? Choose honesty over approval, even gently."},
  {v:"Guard your heart above all else, for it determines the course of your life.",r:"Proverbs 4:23",app:"What's trying to get into your heart today — comparison, offense, fear? Naming it is the first guard rail."},
  {v:"But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God.",r:"John 3:21",app:"Is there something you've been keeping in the dark out of discomfort? Bringing it into the light, even to one trusted person, breaks its power."},
  {v:"Do not worry about tomorrow, for tomorrow will worry about itself.",r:"Matthew 6:34",app:"Today only needs today's grace. If your mind jumps ahead, gently bring it back to what's actually in front of you right now."},
];

const STACK_COLORS=["#9C7A3A","#1BAEE8","#1A5C2A","#7A1F1F","#6B4E7A","#B8700A"];

const LCATS = [
  {id:"identity",label:"Identity",icon:"✦",color:OX},
  {id:"relationships",label:"Relationships",icon:"♡",color:"#7A4F6A"},
  {id:"capacity",label:"Capacity",icon:"◈",color:GRN},
  {id:"warfare",label:"Warfare",icon:"⚑",color:PUR},
  {id:"stewardship",label:"Stewardship",icon:"◎",color:AMB},
  {id:"ministry",label:"Ministry",icon:"⊕",color:GOLD},
];

const RTAGS = [
  {id:"church",label:"Church",color:OX,icon:"✦"},
  {id:"family",label:"Family",color:TAN,icon:"⌂"},
  {id:"friend",label:"Friend",color:GRN,icon:"♡"},
  {id:"work",label:"Work",color:GOLD,icon:"◎"},
  {id:"online",label:"Online",color:PUR,icon:"◈"},
];

const DAYBLOCKS = [
  {id:"morning",label:"Morning",desc:"High energy. Hard things first."},
  {id:"midday",label:"Midday",desc:"Momentum. Keep it moving."},
  {id:"afternoon",label:"Afternoon",desc:"Low capacity. Background tasks."},
  {id:"evening",label:"Evening",desc:"Family. Rest. Tomorrow prep."},
];

const SHELF_TIMEFRAMES = [
  {id:"week",label:"This Week",color:OX},
  {id:"month",label:"This Month",color:GOLD},
  {id:"someday",label:"Someday",color:TAN},
];

const HABITS = [
  {id:"h1",label:"Vitamins",cat:"health"},
  {id:"h2",label:"Creatine",cat:"health"},
  {id:"h3",label:"Turmeric",cat:"health"},
  {id:"h4",label:"Blood pressure & Zyrtec",cat:"health"},
  {id:"h5",label:"Protein with each meal",cat:"health"},
  {id:"h6",label:"Stretch a.m.",cat:"health"},
  {id:"h7",label:"Stretch p.m.",cat:"health"},
  {id:"h8",label:"Nail care",cat:"health"},
  {id:"h9",label:"Floss & mouthwash p.m.",cat:"health"},
  {id:"h10",label:"Scripture reading & prayer",cat:"faith"},
  {id:"h11",label:"Unload to Gemini",cat:"mind"},
  {id:"h12",label:"Email triage",cat:"mind"},
];

const HCATS = [
  {id:"health",label:"Health & Body",color:GRN},
  {id:"faith",label:"Faith & Spirit",color:OX},
  {id:"mind",label:"Mind & Systems",color:GOLD},
];

const INIT_CATS = [
  {id:"faith",label:"Faith",icon:"✦",color:"#1A2E4A",color2:"#6DDCE8",state:"Intentional. Holy Spirit is speaking.",tasks:[
    {id:"f1",label:"Morning prayer & orientation",resistance:"low",roadblock:"unknown",done:false,steps:[]},
    {id:"f2",label:"Kingdom Notebook deposit",resistance:"medium",roadblock:"procrastination",done:false,steps:[]},
    {id:"f3",label:"Celebrate Recovery prep",resistance:"low",roadblock:null,done:false,steps:[]},
  ]},
  {id:"family",label:"Family & Kids",icon:"⌂",color:"#2E6B8A",color2:"#6DDCE8",state:"Healthy. Present and engaged.",tasks:[
    {id:"fa1",label:"Graduation — Bloomington Creek 5:30pm",resistance:"low",roadblock:null,done:false,steps:[]},
    {id:"fa2",label:"Dinner at Suzie's after graduation",resistance:"low",roadblock:null,done:false,steps:[]},
    {id:"fa3",label:"Dad rides up — confirmed",resistance:"low",roadblock:null,done:true,steps:[]},
  ]},
  {id:"sgm",label:"SGM",icon:"⊕",color:"#1A7A8A",color2:"#6DDCE8",state:"Built. Needs review pass before launch.",tasks:[
    {id:"s1",label:"Full module review pass",resistance:"high",roadblock:"perfectionism",done:false,steps:[]},
    {id:"s2",label:"SGM Learning Hub session",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
    {id:"s3",label:"Warrior Track modules",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
    {id:"s4",label:"Certifications — legitimize SGM",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
  ]},
  {id:"shawn",label:"Shawn & Imprint",icon:"♡",color:"#3A9AAA",color2:"#6DDCE8",state:"Collaborative. Communication improving.",tasks:[
    {id:"sh1",label:"Return Shawn's shoes",resistance:"low",roadblock:null,done:false,steps:[]},
    {id:"sh2",label:"Schedule money conversation",resistance:"high",roadblock:"shame",done:false,steps:[]},
    {id:"sh3",label:"Wedding travel — confirm details",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
  ]},
  {id:"health",label:"Health & Fitness",icon:"◈",color:"#4AB8C8",color2:"#6DDCE8",state:"On track. 200g protein, 5-day split.",tasks:[
    {id:"hf1",label:"Today's workout",resistance:"low",roadblock:"time",done:false,steps:[]},
    {id:"hf2",label:"Hit protein target",resistance:"low",roadblock:null,done:false,steps:[]},
    {id:"hf3",label:"Log in MyFitnessPal",resistance:"low",roadblock:null,done:false,steps:[]},
  ]},
  {id:"golf",label:"Golf",icon:"◎",color:"#5ACAD8",color2:"#6DDCE8",state:"Simulator active. Reset protocol in progress.",tasks:[
    {id:"g1",label:"Simulator session — pre-reset protocol",resistance:"medium",roadblock:"perfectionism",done:false,steps:[]},
    {id:"g2",label:"One-sentence voice note after session",resistance:"low",roadblock:null,done:false,steps:[]},
  ]},
  {id:"house",label:"House",icon:"⌂",color:"#3A5A7A",color2:"#6DDCE8",state:"Ongoing maintenance and projects.",tasks:[
    {id:"ho1",label:"Pool robot — run weekly",resistance:"low",roadblock:null,done:false,steps:[]},
    {id:"ho2",label:"Pool cabinets Phase 1 — empty and sort",resistance:"medium",roadblock:"perfectionism",done:false,steps:[]},
    {id:"ho3",label:"Teak furniture restoration",resistance:"high",roadblock:"unknown",done:false,steps:[]},
  ]},
  {id:"finances",label:"Finances",icon:"◈",color:"#2A4A6A",color2:"#6DDCE8",state:"Open loop. Needs emotionless review.",tasks:[
    {id:"fi1",label:"Jeep note payment setup",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
    {id:"fi2",label:"Schedule money conversation with Shawn",resistance:"high",roadblock:"shame",done:false,steps:[]},
    {id:"fi3",label:"Wedding travel — book flights and rental car",resistance:"medium",roadblock:"unknown",done:false,steps:[]},
  ]},
];

const INIT_LIB = [];

const TABS_ROW1 = [
  {id:"planner",label:"Week",g:"◈",type:"g"},
  {id:"habits",label:"Habits",g:"✓",type:"g"},
  {id:"dashboard",label:"Map",g:"◎",type:"g"},
];
const TABS_ROW2 = [
  {id:"scripture",label:"Word",g:"✦",type:"g"},
  {id:"library",label:"Identity",g:"☰",type:"g"},
  {id:"prayer",label:"Prayer",type:"cross"},
  {id:"history",label:"Field Notes",g:"◷",type:"g"},
  {id:"letstalk",label:"Let's Talk",g:"♡",type:"g"},
];
const TABS=[...TABS_ROW1,...TABS_ROW2];

function SL({children,c=OX}){
  return <div style={{fontSize:13,fontWeight:600,color:c,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10,opacity:0.9,fontFamily:"'Inter',system-ui,sans-serif"}}>✦ {children}</div>;
}

function RDot({level}){
  const m={low:GRN,medium:AMB,high:OX};
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:m[level]||TAN,color:"white",fontSize:12,fontWeight:"bold",flexShrink:0}}>{(level||"l")[0].toUpperCase()}</span>;
}

function Ring({size,pct,color,color2,sw=6,main=false,children}){
  const r=(size-sw)/2,circ=2*Math.PI*r,off=circ-(pct/100)*circ;
  const id="rg"+Math.round(size)+(color||"").replace("#","");
  const c1=color||"#6DDCE8",c2=color2||"#1A2E4A";
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      {main&&(
        <svg width={size} height={size} style={{position:"absolute",top:0,left:0,overflow:"visible"}}>
          <defs>
            <radialGradient id={id+"fill"} cx="42%" cy="42%" r="58%">
              <stop offset="0%" stopColor={c1} stopOpacity="0.20"/>
              <stop offset="35%" stopColor="#4A8FA8" stopOpacity="0.10"/>
              <stop offset="70%" stopColor={c2} stopOpacity="0.06"/>
              <stop offset="100%" stopColor={c2} stopOpacity="0.01"/>
            </radialGradient>
          </defs>
          <circle cx={size/2} cy={size/2} r={r-sw/2-2} fill={`url(#${id}fill)`}/>
          <circle cx={size/2} cy={size/2} r={(r-sw/2-2)*0.80} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.09"/>
          <circle cx={size/2} cy={size/2} r={(r-sw/2-2)*0.58} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.06"/>
          <circle cx={size/2} cy={size/2} r={(r-sw/2-2)*0.36} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.04"/>
          <circle cx={size/2} cy={size/2} r={r+sw/2+2} fill="none" stroke={c2} strokeWidth="0.8" opacity="0.04"/>
        </svg>
      )}
      <svg width={size} height={size} style={{transform:"rotate(-90deg)",position:"absolute",top:0,left:0}}>
        <defs>
          <linearGradient id={id} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c1}/>
            <stop offset="100%" stopColor={c2}/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(26,46,74,0.07)" strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/>
        {main&&<circle cx={size/2} cy={size/2} r={r-sw/2} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.07"/>}
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>{children}</div>
    </div>
  );
}

const SGM_LOGO_URI = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIxNSA4MCAzNDAgNzgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiM2RERDRTgiIG9wYWNpdHk9IjEuMDAwMDAwIiBzdHJva2U9Im5vbmUiIAoJZD0iCk0yMTkuOTI4MDI0LDYyMC41NTA5MDMgCglDMjEyLjE5MzIwNyw2MjguOTI5NDQzIDIwMi42Mjg3OTksNjMyLjE2Mjg0MiAxOTEuNTU0Nzk0LDYzMS44MzYyNDMgCglDMTgzLjk0MDU2Nyw2MzEuNjExNjk0IDE3Ni4zMTQzNDYsNjMxLjc5MzIxMyAxNjguMTM1NzU3LDYzMS43OTMyMTMgCglDMTY4LjEzNTc1Nyw1NzYuOTY5OTcxIDE2OC4xMzU3NTcsNTIyLjc0ODUzNSAxNjguMTM1NzU3LDQ2OC4xOTAxODYgCglDMTMzLjAwNzI3OCw0NjguMTkwMTg2IDk4LjQ0NzUzMyw0NjguMTkwMTg2IDYyLjgxNzgyNSw0NjguMTkwMTg2IAoJQzYzLjIzMjM0Niw0NzQuNjM4Mjc1IDYyLjkxMjc4OCw0ODEuMDE3NTc4IDY0LjIwOTA0NSw0ODcuMDQ5NjUyIAoJQzY1Ljk1NDMwMCw0OTUuMTcxMDgyIDczLjM4MTMwMiw0OTkuNzkyNTExIDgyLjg2MjcyNCw0OTkuODE4NjY1IAoJQzEwMi41MjUzNjgsNDk5Ljg3Mjg5NCAxMjIuMTg4NDU0LDQ5OS43OTA3NzEgMTQxLjg1MDg5MSw0OTkuODc1MDMxIAoJQzE1MC4wNTY5MzEsNDk5LjkxMDE4NyAxNTQuOTkyMTcyLDUwNC42MTgwNzMgMTU1LjUxNjMyNyw1MTIuOTkyMDY1IAoJQzE1My44OTcxMjUsNTEzLjA2NTEyNSAxNTIuMjgzOTgxLDUxMy4yMDAxMzQgMTUwLjY3MDc0Niw1MTMuMjAxNDE2IAoJQzEyOC4zNDE4NTgsNTEzLjIxODg3MiAxMDYuMDEyODYzLDUxMy4yNjQxNjAgODMuNjg0MTIwLDUxMy4yMDg1NTcgCglDNjIuNDM1MDQ3LDUxMy4xNTU1NzkgNDkuODQ3ODAxLDUwMC41NjMxNzEgNDkuNzIwNjIzLDQ3OS4zMjUwNDMgCglDNDkuNjcxODI5LDQ3MS4xNzcwNjMgNDkuNzEyNjczLDQ2My4wMjg1NjQgNDkuNzEyNjczLDQ1NC41MjIxNTYgCglDOTMuNzA3MDM5LDQ1NC41MjIxNTYgMTM3LjI4NzkwMyw0NTQuNTIyMTU2IDE4MS42NDI0MTAsNDU0LjUyMjE1NiAKCUMxODEuNjQyNDEwLDUwOC44MTQ2MDYgMTgxLjY0MjQxMCw1NjMuMTU1MDkwIDE4MS42NDI0MTAsNjE3Ljc4NTE1NiAKCUMxODguMDEyNjA0LDYxNy43ODUxNTYgMTkzLjcxMzUzMSw2MTguNDQ1MjUxIDE5OS4xOTc4MTUsNjE3LjYzNjQxNCAKCUMyMDguMzA5NDMzLDYxNi4yOTI3MjUgMjEzLjc1MDkzMSw2MDguNjY5NjE3IDIxMy43ODMwMjAsNTk4LjM2NzM3MSAKCUMyMTMuODQ0MjY5LDU3OC43MDQ3NzMgMjEzLjc0MzUwMCw1NTkuMDQxNTY1IDIxMy44NDk0NTcsNTM5LjM3OTMzMyAKCUMyMTMuODk0MDU4LDUzMS4xMDE4MDcgMjE5LjE4MDU1Nyw1MjUuODQ2Mzc1IDIyNy4xODcxMTksNTI2LjI4MjcxNSAKCUMyMjcuMTg3MTE5LDUyNy44Nzc4NjkgMjI3LjE4NzEwMyw1MjkuNTA2NjUzIDIyNy4xODcxMzQsNTMxLjEzNTQzNyAKCUMyMjcuMTg3NDg1LDU1My40NjQzNTUgMjI3LjA5NTkxNyw1NzUuNzkzODg0IDIyNy4yMzgzMjcsNTk4LjEyMTg4NyAKCUMyMjcuMjg3ODQyLDYwNS44ODY5MDIgMjI1LjU5MDM2Myw2MTIuOTQwMTI1IDIyMC42OTE3MTEsNjE5LjQ3NTQ2NCAKCUMyMjAuMjk4ODQzLDYxOS44OTQxMDQgMjIwLjA5MjEwMiw2MjAuMDY5NzAyIDIxOS45MjgwMjQsNjIwLjU1MDkwMyAKeiIvPgo8cGF0aCBmaWxsPSIjNDU4RUQzIiBvcGFjaXR5PSIxLjAwMDAwMCIgc3Ryb2tlPSJub25lIiAKCWQ9IgpNMjMwLjQ1ODkyMyw0OTkuODU4MzM3IAoJQzI2Mi41NjgwNTQsNDk5Ljg4OTU1NyAyOTQuMjIyNTk1LDQ5OS43ODkyNDYgMzI1Ljg3NDYzNCw1MDAuMDIyNzM2IAoJQzMzMC45MzE0NTgsNTAwLjA2MDA1OSAzMzIuOTE2MDc3LDQ5OC42OTY2MjUgMzMyLjIxMDkzOCw0OTMuNTk0MTc3IAoJQzMzMS44NzE5NDgsNDkxLjE0MTIzNSAzMzIuMTc0MjI1LDQ4OC42MDM2MDcgMzMyLjEyOTczMCw0ODYuMTA1MzE2IAoJQzMzMS45MzY3MDcsNDc1LjI2NTUzMyAzMjQuNzQxNjM4LDQ2OC4wMTkwNDMgMzEzLjc5MjYwMyw0NjcuOTU2NzI2IAoJQzI5NC42MzQzMDgsNDY3Ljg0NzY4NyAyNzUuNDc0ODg0LDQ2Ny45NDQwNjEgMjU2LjMxNjQzNyw0NjcuODUzNzkwIAoJQzI1My42ODI2NDgsNDY3Ljg0MTQwMCAyNTAuOTU4MTc2LDQ2Ny41ODExNDYgMjQ4LjQzODQ3Nyw0NjYuODYzODAwIAoJQzI0Mi45NzU0OTQsNDY1LjMwODU2MyAyMzkuODQ5MTIxLDQ2MC4zNzM2NTcgMjQwLjQ1MjYzNyw0NTQuMzQ3NDQzIAoJQzI0MS45OTY0NzUsNDU0LjI3OTkzOCAyNDMuNjEyNDU3LDQ1NC4xNDg3MTIgMjQ1LjIyODQ4NSw0NTQuMTQ3NzY2IAoJQzI2Ny43MTkzMzAsNDU0LjEzNDQ2MCAyOTAuMjEwMzI3LDQ1NC4wOTQwNTUgMzEyLjcwMTAxOSw0NTQuMTUyOTU0IAoJQzMzMi4xNDI5MTQsNDU0LjIwMzg1NyAzNDUuNjgwNjM0LDQ2Ny42ODcwNzMgMzQ1Ljg4ODY0MSw0ODcuMTI0MjY4IAoJQzM0NS45NjE3MzEsNDkzLjk1NDA3MSAzNDUuNjUzOTAwLDUwMC43OTg3OTggMzQ2LjAxMTIzMCw1MDcuNjEwOTYyIAoJQzM0Ni4yNDQ0MTUsNTEyLjA1NjUxOSAzNDQuNzU4Nzg5LDUxMy4yNDQ4MTIgMzQwLjM3NjEyOSw1MTMuMjI2NTAxIAoJQzMwMS43MjU4OTEsNTEzLjA2NDg4MCAyNjMuMDc0NzA3LDUxMy4xMzg2MTEgMjI0LjQyMzc4Miw1MTMuMTIzOTYyIAoJQzIxMy44MzQ2NDEsNTEzLjExOTkzNCAyMTMuODM1ODkyLDUxMy4wOTEwMDMgMjEzLjgzNjMzNCw1MDIuNzE2NjE0IAoJQzIxMy44MzgzNjQsNDUzLjczNjU0MiAyMTMuODQwNzE0LDQwNC43NTY0MzkgMjEzLjgzOTk1MSwzNTUuNzc2MzY3IAoJQzIxMy44Mzk4NTksMzQ5LjIxNzAxMCAyMTMuODMxOTI0LDM0OS4yMTY4ODggMjA3LjIzMTcyMCwzNDkuMjExMTIxIAoJQzIwNS41NjU3MzUsMzQ5LjIwOTY1NiAyMDMuODk5NjEyLDM0OS4xOTUwOTkgMjAyLjIzMzc2NSwzNDkuMjEwNDQ5IAoJQzE4OC45MDUwNjAsMzQ5LjMzMzI1MiAxODEuOTI5MzM3LDM1Ni4yODczODQgMTgxLjg5NjEwMywzNjkuNTk2ODMyIAoJQzE4MS44NDgyODIsMzg4Ljc1NTU4NSAxODEuOTI1MTI1LDQwNy45MTQ4MjUgMTgxLjgyMDY3OSw0MjcuMDczMTgxIAoJQzE4MS43NzI0MDAsNDM1LjkzMTYxMCAxNzYuNzI4NTE2LDQ0MS4zODcyNjggMTY4LjA4MDc1MCw0NDEuNTE2NjYzIAoJQzE2OC4wODA3NTAsNDM5Ljc1OTAzMyAxNjguMDgwODQxLDQzOC4wMDQ5NDQgMTY4LjA4MDczNCw0MzYuMjUwODU0IAoJQzE2OC4wNzkzNjEsNDEzLjc2MDA3MSAxNjguMDMxMTU4LDM5MS4yNjkxMzUgMTY4LjA5MDc1OSwzNjguNzc4NTAzIAoJQzE2OC4xNDE4NzYsMzQ5LjQ4NzMzNSAxODEuNTAxNDA0LDMzNi4wNzE4OTkgMjAwLjcxNTQ1NCwzMzUuOTI5OTAxIAoJQzIwNy44Nzg2OTMsMzM1Ljg3Njk4NCAyMTUuMDU3MTE0LDMzNi4yMjQ0NTcgMjIyLjIwMTQ2MiwzMzUuODU4ODg3IAoJQzIyNi44Nzk3MDAsMzM1LjYxOTQ3NiAyMjcuMTk2NzYyLDMzNy44OTgzNzYgMjI3LjE4OTYyMSwzNDEuNTc4MTg2IAoJQzIyNy4xMDA0OTQsMzg3LjU1OTMyNiAyMjcuMTIxMDYzLDQzMy41NDA2NDkgMjI3LjExNjQwOSw0NzkuNTIxOTQyIAoJQzIyNy4xMTU4NjAsNDg0Ljg1MzA1OCAyMjYuOTI4MjIzLDQ5MC4xOTc0NzkgMjI3LjI3MjU1Miw0OTUuNTA2ODM2IAlDMjI3LjM2OTU4Myw0OTcuMDAzMDgyIDIyOS4wNDk1NjEsNDk4LjM5NjY2NyAyMzAuNDU4OTIzLDQ5OS44NTgzMzcgCnoiLz48cGF0aCBmaWxsPSIjNDQ4Q0QxIiBvcGFjaXR5PSIxLjAwMDAwMCIgc3Ryb2tlPSJub25lIiAKCWQ9IgpNMTQyLjE4MzQxMSw2MjcuMDAwMDAwIAoJQzE0Mi4xODQzMjYsNTk5LjE3MTIwNCAxNDIuMDgzMTE1LDU3MS44NDE2NzUgMTQyLjI4Nzg4OCw1NDQuNTE0NDY1IApDMTQyLjMyMTMwNCw1NDAuMDUzNTI4IDE0MS4wNDAxMzEsNTM4LjgzODI1NyAxMzYuNjUyNDIwLDUzOC45Mzg1MzggCglDMTI0LjMyNzg3Myw1MzkuMjIwMzM3IDExMS45OTI0MDEsNTM5LjAyNTE0NiA5OS42NjEyNDAsNTM5LjAxNTMyMCAKCUM5NC4xNzczMzAsNTM5LjAxMDkyNSA5MC4wMzYzMzksNTM2LjY4NzI1NiA4Ny40NjU1MTUsNTMxLjc5OTUwMCAKCUM4NC44NTI0MTcsNTI2LjgzMTE3NyA4NS43OTc2NzYsNTI1LjIyNjYyNCA5MS4zNzUzOTcsNTI1LjIxNjczNiAKCUMxMDUuMjA2MjY4LDUyNS4xOTIyNjEgMTE5LjAzNzIyNCw1MjUuMjIwMTU0IDEzMi44NjgxNDksNTI1LjIyNTk1MiAKCUMxMzguNzAwNTAwLDUyNS4yMjgzOTQgMTQ0LjU0NDYxNyw1MjUuNDU1NzUwIDE1MC4zNjEzNTksNTI1LjE1NTAyOSAKCUMxNTQuNzI2NjM5LDUyNC45MjkxOTkgMTU2LjEwMjIwMyw1MjYuNDI3OTc5IDE1Ni4wNzk1NTksNTMwLjg0NTUyMCAKCUMxNTUuOTE1NDY2LDU2Mi44Mzk0MTcgMTU1Ljk5MTkyOCw1OTQuODM0NTM0IDE1NS45OTIyMzMsNjI2LjgyOTIyNCAKCUMxNTUuOTkyMjY0LDYzMC4xNjE5ODcgMTU1Ljk5MTAxMyw2MzMuNDk0ODEyIDE1NS45OTI0NjIsNjM2LjgyNzU3NiAKCUMxNTUuOTk1NTYwLDY0My45NjA1MTAgMTU1Ljk5NjE0MCw2NDMuOTUxNDc3IDE2Mi44ODk2MTgsNjQzLjk1MDAxMiAKCUMxNzIuODg3OTU1LDY0My45NDc4NzYgMTgyLjg4NjMyMiw2NDMuOTQ4ODUzIDE5Mi44ODQ1ODMsNjQzLjk3OTE4NyAKCUMxOTQuMzQ0OTU1LDY0My45ODM2NDMgMTk1LjgwNDc5NCw2NDQuMTU4Mzg2IDE5Ny4yNDY4NTcsNjQ0LjI1MzExMyAKCUMxOTcuMTIyMjk5LDY1MS4zNDg4NzcgMTkzLjIxMTEzNiw2NTYuNDk1MTE3IDE4Ni4yNjEzNjgsNjU3LjAwNjUzMSAKCUMxNzYuMTUxMTU0LDY1Ny43NTAzNjYgMTY1Ljk2ODAzMyw2NTcuNTgzMTMwIDE1NS44MTUwMzMsNjU3LjY0NjI0MCAKCUMxNDIuMTg0NjE2LDY1Ny43MzA5NTcgMTQyLjE4NDA5Nyw2NTcuNjY2MjYwIDE0Mi4xODMxODIsNjQzLjk5NzAwOSAKCUMxNDIuMTgyODE2LDYzOC40OTc5ODYgMTQyLjE4MzE4Miw2MzIuOTk5MDIzIDE0Mi4xODM0MTEsNjI3LjAwMDAwMCAKeiIvPjwvc3ZnPg==";
function Logo({size=32}){
  return <img src={SGM_LOGO_URI} width={size} height={Math.round(size*1.4)} alt="SGM" style={{display:"block",objectFit:"cover",objectPosition:"center",flexShrink:0}}/>;
}

function CrossSVG({color="#FFFFFF",size=13}){
  return (
    <svg width={size} height={Math.round(size*1.25)} viewBox="0 0 13 16" fill="none" style={{flexShrink:0}}>
      <rect x="5" y="0" width="3" height="16" rx="0.6" fill={color}/>
      <rect x="0" y="4.5" width="13" height="3" rx="0.6" fill={color}/>
    </svg>
  );
}

function DailyMsg({cats,habits,prayers,streaks}){
  const [msg,setMsg]=useState(null);
  const [loading,setLoading]=useState(false);
  const [dismissed,setDismissed]=useState(false);
  if(dismissed) return null;
  const tk=new Date().toISOString().slice(0,10);
  const th=habits[tk]||{};
  const tD=Object.values(th).filter(Boolean).length;
  const allT=cats.flatMap(c=>c.tasks);
  const pendT=allT.filter(t=>!t.done);
  const doneT=allT.filter(t=>t.done).length;
  const actP=prayers.filter(p=>!p.answered).length;
  // Pull roadblock tags from open tasks to make this specific, not generic
  const roadblocks=[...new Set(pendT.map(t=>t.roadblock).filter(Boolean))];
  async function gen(){
    setLoading(true);
    try{
      const p="Write a 4-6 sentence encouraging word for Joe Steen as he works through his life projects and tasks today. Christian man, SGM founder, stay-at-home dad, 20 years sober. Anchor: Proverbs 3:5-6. Open tasks: "+pendT.length+(roadblocks.length?" (roadblocks he's facing: "+roadblocks.join(", ")+")":"")+". Habits today: "+tD+"/12. Praying for "+actP+" people. Direct, warm, faith-grounded — speak to the actual roadblocks if any are named, not generically. End with scripture or a short prayer prompt tied to pushing through resistance. No filler, no cheerleading.";
      const text=await claudeAPI(p,1000);
      setMsg(text||"Trust in the Lord with all your heart. Today is a new opportunity.");
    }catch(e){setMsg("Trust in the Lord with all your heart. Today is a new opportunity.");}
    setLoading(false);
  }
  const ac="#2E5B8A";
  return(
    <div style={{marginBottom:24,background:ac+"12",border:"1px solid "+ac+"45",borderLeft:"3px solid "+ac,borderRadius:8,overflow:"hidden",animation:"fadeIn 0.5s ease"}}>
      <div style={{padding:"14px 16px 12px"}}>
        <SL c={ac}>A Word For Today's Work</SL>
        {!msg&&!loading
          ?<button onClick={gen} style={{padding:"8px 16px",background:ac,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Get My Word</button>
          :loading
          ?<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:14,height:14,borderRadius:"50%",border:"2px solid "+ac,borderTopColor:"transparent",animation:"spin 0.8s linear infinite",flexShrink:0}}/><span style={{fontSize:15,fontStyle:"italic",color:TAN}}>Preparing your word…</span></div>
          :<p style={{fontSize:15,lineHeight:1.8,color:INK,margin:0}}>{msg}</p>
        }
      </div>
      <div style={{display:"flex",borderTop:"1px solid "+ac+"20"}}>
        <button onClick={()=>setDismissed(true)} style={{flex:1,padding:"9px",background:"transparent",border:"none",color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:12}}>Dismiss</button>
        <button onClick={gen} style={{flex:1,padding:"9px",background:"transparent",border:"none",borderLeft:"1px solid "+ac+"20",color:ac,cursor:"pointer",fontFamily:BODY,fontSize:12}}>↺ Refresh</button>
      </div>
    </div>
  );
}

function AppInsights({cats,library,prayers,checkIns,letstalk,shelf,habits}){
  const [insight,setInsight]=useState(null);
  const [loading,setLoading]=useState(false);
  const tk=new Date().toISOString().slice(0,10);
  const th=habits[tk]||{};
  const habitDone=Object.values(th).filter(Boolean).length;
  const totalHabits=HABITS.length;
  const thisWeek=new Date();thisWeek.setDate(thisWeek.getDate()-7);
  const weekStr=thisWeek.toISOString().slice(0,10);

  // Build a rich data picture across all tabs
  function buildContext(){
    const lines=[];
    // Identity
    const recentLib=library.filter(p=>p.date&&p.date>=weekStr);
    lines.push(`Identity deposits this week: ${recentLib.length} (total: ${library.length})`);
    if(recentLib.length)lines.push(`Latest principle: "${recentLib[0]?.principle?.slice(0,80)}"`);
    // Prayer
    const activePrayers=prayers.filter(p=>!p.answered);
    const answeredPrayers=prayers.filter(p=>p.answered);
    lines.push(`Active prayers: ${activePrayers.length}. Answered: ${answeredPrayers.length}.`);
    // Habits
    lines.push(`Habits today: ${habitDone}/${totalHabits}`);
    // Check In
    const recentCI=(checkIns||[]).slice(0,10);
    const pushCount=recentCI.filter(c=>/push/i.test(c.call)).length;
    const restCount=recentCI.filter(c=>/rest/i.test(c.call)).length;
    if(recentCI.length)lines.push(`Last ${recentCI.length} Check Ins: push through ${pushCount}x, rest ${restCount}x`);
    if(recentCI[0]?.loop)lines.push(`Most recent loop: "${recentCI[0].loop.slice(0,80)}"`);
    // Let's Talk
    const lt=letstalk||[];
    const deeperCards=lt.filter(c=>c.section==="deeper");
    const peopleCards=lt.filter(c=>c.section==="people");
    const topicCards=lt.filter(c=>c.section!=="deeper"&&c.section!=="people");
    lines.push(`Let's Talk: ${topicCards.length} topic cards, ${deeperCards.length} Going Deeper entries, ${peopleCards.length} people tracked`);
    // Shelf
    lines.push(`Shelf: ${(shelf||[]).length} items captured`);
    // Tasks
    const allTasks=cats.flatMap(c=>c.tasks);
    const done=allTasks.filter(t=>t.done).length;
    lines.push(`Tasks: ${done} done, ${allTasks.length-done} open`);
    return lines.join("\n");
  }

  async function generate(){
    setLoading(true);setInsight(null);
    const ctx=buildContext();
    const prompt=`You are giving Joe Steen a brief, honest read of what his SGM Orientation app is actually doing for him right now — not generic encouragement, but a real picture based on his actual data. Joe is a stay-at-home dad, founder of SGM, 20 years sober, leads Celebrate Recovery. Anchor verse: Proverbs 3:5-6.\n\nHere is his current app data:\n${ctx}\n\nWrite 3-4 sentences that:\n1. Name 2-3 specific things the app is actually tracking or showing about his life right now\n2. Name one honest observation or pattern worth his attention\n3. End with one short, grounded forward sentence — not a pep talk, just what\u2019s next\n\nPlain English. No filler. No "great job." Sound like a trusted friend reading the data alongside him.`;
    try{
      const result=await claudeAPI(prompt,400);
      setInsight(result);
    }catch(e){
      setInsight("Couldn't reach Claude right now. But the data is here — open any tab and the work continues.");
    }
    setLoading(false);
  }

  return(
    <div style={{marginBottom:20,background:INK,borderRadius:10,overflow:"hidden",animation:"fadeIn 0.4s ease"}}>
      <div style={{padding:"14px 16px 12px"}}>
        <div style={{fontSize:11,color:CYAN,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>✦ What Your App Is Doing Right Now</div>
        {!insight&&!loading&&(
          <button onClick={generate}
            style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+CYAN+"60",color:CYAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
            Get Today's Read
          </button>
        )}
        {loading&&(
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:14,height:14,borderRadius:"50%",border:"2px solid "+CYAN,borderTopColor:"transparent",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
            <span style={{fontSize:15,fontStyle:"italic",color:"rgba(255,255,255,0.5)"}}>Reading across your tabs…</span>
          </div>
        )}
        {insight&&!loading&&(
          <p style={{fontSize:15,lineHeight:1.85,color:"rgba(255,255,255,0.88)",margin:0,fontFamily:BODY}}>{insight}</p>
        )}
      </div>
      {insight&&(
        <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          <button onClick={()=>setInsight(null)} style={{flex:1,padding:"9px",background:"transparent",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontFamily:BODY,fontSize:12}}>Clear</button>
          <button onClick={generate} style={{flex:1,padding:"9px",background:"transparent",border:"none",borderLeft:"1px solid rgba(255,255,255,0.08)",color:CYAN,cursor:"pointer",fontFamily:BODY,fontSize:12}}>↺ Refresh</button>
        </div>
      )}
    </div>
  );
}


function ProjectScreen({task,cat,onBack,onUpdate}){
  const [pasteMode,setPasteMode]=useState(!task.steps||!task.steps.length);
  const [pasteText,setPasteText]=useState("");
  const pct=task.steps&&task.steps.length?Math.round(task.steps.filter(s=>s.done).length/task.steps.length*100):0;
  function parseSteps(text){
    return text.split("\n").map(l=>l.trim()).filter(Boolean).reduce((acc,line)=>{
      const m=line.match(/^(\d+)\.\s+(.+)/);
      if(m){
        const c2=m[2];
        const rm=c2.match(/\[(low|medium|high)\]/i);
        const bm=c2.match(/\{([^}]+)\}/i);
        acc.push({id:"s"+Date.now()+Math.random(),label:c2.replace(/\[(low|medium|high)\]/i,"").replace(/\{[^}]+\}/i,"").trim(),resistance:rm?rm[1].toLowerCase():"low",roadblock:bm?bm[1].toLowerCase():null,done:false});
      }
      return acc;
    },[]);
  }
  return(
    <div style={{position:"fixed",inset:0,background:PAPER,backgroundImage:BG,zIndex:200,overflowY:"auto",fontFamily:BODY,color:INK}}>
      <div style={{background:INK,padding:"16px 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:15,fontFamily:BODY,marginBottom:12,padding:0}}>← Back</button>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Ring size={44} pct={pct} color={cat.color} color2={cat.color2||"#6DDCE8"} sw={4}><span style={{fontSize:13,color:cat.color}}>{cat.icon}</span></Ring>
            <div>
              <div style={{color:TAN,fontSize:12,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:2}}>{cat.label}</div>
              <div style={{fontSize:16,fontWeight:"bold",color:"white",lineHeight:1.2}}>{task.label}</div>
            </div>
          </div>
          {task.steps&&task.steps.length>0&&(
            <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1,height:2,background:"rgba(255,255,255,0.1)",borderRadius:1}}>
                <div style={{width:pct+"%",height:"100%",background:cat.color,borderRadius:1,transition:"width 0.4s"}}/>
              </div>
              <span style={{color:TAN,fontSize:12}}>{pct}%</span>
            </div>
          )}
        </div>
      </div>
      <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px 140px"}}>
        {task.roadblock&&SCVS[task.roadblock]&&(
          <div style={{background:OXF,borderLeft:"3px solid "+OX,padding:"14px 18px",marginBottom:28}}>
            <SL>Roadblock: {task.roadblock}</SL>
            <p style={{fontStyle:"italic",fontSize:15,lineHeight:1.75,margin:0}}>"{SCVS[task.roadblock].v}"</p>
            <p style={{color:GOLD,fontSize:15,marginTop:6,marginBottom:0}}>{SCVS[task.roadblock].r}</p>
          </div>
        )}
        {pasteMode?(
          <div>
            <SL>Break this down with Claude</SL>
            <div style={{background:"white",color:INK,padding:"14px 16px",fontSize:15,fontStyle:"italic",lineHeight:1.65,marginBottom:18,borderRadius:8,border:"1px solid "+FINK}}>
              "Break down this project: <strong style={{color:"white"}}>{task.label}</strong>"
            </div>
            <textarea value={pasteText} onChange={e=>setPasteText(e.target.value)} placeholder={"Paste Claude's breakdown here...\nFormat: 1. Step [resistance] {roadblock}"} rows={7}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8}}/>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{const steps=parseSteps(pasteText);if(steps.length){onUpdate({...task,steps});setPasteMode(false);}}}
                style={{flex:1,padding:"11px",background:cat.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Build My Project</button>
              {task.steps&&task.steps.length>0&&<button onClick={()=>setPasteMode(false)} style={{padding:"11px 18px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>}
            </div>
          </div>
        ):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <SL>Project Steps</SL>
              <button onClick={()=>setPasteMode(true)} style={{background:"transparent",border:"1px solid "+TANL,color:TAN,padding:"3px 10px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>↺ Rebuild</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {task.steps.map((step,idx)=>(
                <div key={step.id} onClick={()=>{const up=task.steps.map(s=>s.id===step.id?{...s,done:!s.done}:s);onUpdate({...task,steps:up,done:up.every(s=>s.done)});}}
                  style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",cursor:"pointer",background:step.done?cat.color+"10":"white",borderLeft:"3px solid "+(step.done?cat.color:TANL),border:"1px solid "+(step.done?cat.color+"40":FINK),borderRadius:8,transition:"all 0.2s"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,border:"2px solid "+(step.done?cat.color:TANL),background:step.done?cat.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:step.done?"white":TAN,fontSize:step.done?12:13}}>
                    {step.done?"✓":idx+1}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,color:step.done?TAN:INK,textDecoration:step.done?"line-through":"none",lineHeight:1.5}}>{step.label}</div>
                    <div style={{display:"flex",gap:6,marginTop:6,alignItems:"center"}}>
                      <RDot level={step.resistance}/>
                      {step.roadblock&&<span style={{fontSize:13,color:OX,fontStyle:"italic"}}>⚑ {step.roadblock}</span>}
                    </div>
                    {step.roadblock&&SCVS[step.roadblock]&&!step.done&&(
                      <div style={{marginTop:8,padding:"8px 12px",background:OXF,borderLeft:"2px solid rgba(122,31,31,0.3)",fontSize:15,fontStyle:"italic",lineHeight:1.65}}>
                        "{SCVS[step.roadblock].v}" <span style={{color:GOLD,display:"block",marginTop:2,fontStyle:"normal",fontSize:12}}>{SCVS[step.roadblock].r}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HabitsTab({habits,setHabits,streaks,setStreaks,customHabits,setCustomHabits}){
  const tk=new Date().toISOString().slice(0,10);
  const yk=new Date(Date.now()-86400000).toISOString().slice(0,10);
  const td=habits[tk]||{};
  const [addingHabit,setAddingHabit]=useState(false);
  const [newHabit,setNewHabit]=useState({label:"",cat:"health"});
  const [deletedHabits,setDeletedHabits]=useState(()=>{
    try{return JSON.parse(localStorage.getItem("sgm3-deleted-habits")||"[]");}catch(e){return[];}
  });
  const [editMode,setEditMode]=useState(false);

  const allHabits=[...HABITS.filter(h=>!deletedHabits.includes(h.id)),...customHabits];
  const done=allHabits.filter(h=>td[h.id]).length;
  const pct=Math.round(done/allHabits.length*100)||0;

  function toggle(id){
    const cur=habits[tk]||{};
    const nowDone=!cur[id];
    setHabits(p=>({...p,[tk]:{...cur,[id]:nowDone}}));
    if(nowDone){
      setStreaks(p=>{
        const s=p[id]||{count:0,lastDate:null};
        const nc=(s.lastDate===yk||s.lastDate===tk)?s.count+(s.lastDate===tk?0:1):1;
        return{...p,[id]:{count:nc,lastDate:tk}};
      });
    }
  }

  function deleteHabit(id,isCustom){
    if(isCustom){
      setCustomHabits(p=>p.filter(h=>h.id!==id));
    }else{
      const updated=[...deletedHabits,id];
      setDeletedHabits(updated);
      localStorage.setItem("sgm3-deleted-habits",JSON.stringify(updated));
    }
  }

  function addHabit(){
    if(!newHabit.label.trim())return;
    setCustomHabits(p=>[...p,{id:"ch"+Date.now(),label:newHabit.label,cat:newHabit.cat}]);
    setNewHabit({label:"",cat:"health"});
    setAddingHabit(false);
  }
  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <SL>Daily Habits</SL>
        <button onClick={()=>setEditMode(e=>!e)}
          style={{background:editMode?OX:"transparent",border:"1px solid "+(editMode?OX:TANL),color:editMode?"white":TAN,padding:"4px 12px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,marginBottom:10}}>
          {editMode?"Done":"Edit"}
        </button>
      </div>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,lineHeight:1.65,marginBottom:16}}>These reset every day. Check them off, watch the streaks build.</p>
      <div style={{marginBottom:24}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:15,color:INK}}>{done} of {allHabits.length} done today</span>
          <span style={{fontSize:15,color:GOLD,fontWeight:"bold"}}>{pct}%</span>
        </div>
        <div style={{height:4,background:TANL,borderRadius:8,opacity:0.4}}>
          <div style={{height:"100%",background:OX,borderRadius:8,width:pct+"%",transition:"width 0.4s"}}/>
        </div>
      </div>
      {HCATS.map(hc=>(
        <div key={hc.id} style={{marginBottom:24}}>
          <div style={{fontSize:12,color:hc.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>✦ {hc.label}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {allHabits.filter(h=>h.cat===hc.id).map(hab=>{
              const dn=!!td[hab.id];
              const str=streaks[hab.id]?.count||0;
              return(
                <div key={hab.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:dn?hc.color+"10":"white",border:"1px solid "+(dn?hc.color+"40":FINK),borderLeft:"3px solid "+(dn?hc.color:TANL),borderRadius:8,transition:"all 0.2s"}}>
                  <div onClick={()=>!editMode&&toggle(hab.id)} style={{width:22,height:22,borderRadius:"50%",flexShrink:0,border:"2px solid "+(dn?hc.color:TANL),background:dn?hc.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:editMode?"default":"pointer"}}>
                    {dn&&<span style={{color:"white",fontSize:12}}>✓</span>}
                  </div>
                  <span onClick={()=>!editMode&&toggle(hab.id)} style={{fontSize:15,color:dn?TAN:INK,textDecoration:dn?"line-through":"none",flex:1,lineHeight:1.4,cursor:editMode?"default":"pointer"}}>{hab.label}</span>
                  {!editMode&&str>1&&<span style={{fontSize:13,color:hc.color,fontWeight:"bold",flexShrink:0}}>{str} 🔥</span>}
                  {editMode&&(
                    <button onClick={()=>deleteHabit(hab.id,!!hab.id.startsWith("ch"))}
                      style={{background:"transparent",border:"1px solid "+OX,color:OX,width:26,height:26,borderRadius:"50%",cursor:"pointer",fontFamily:BODY,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0,lineHeight:1}}>×</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={()=>setAddingHabit(!addingHabit)} style={{width:"100%",marginTop:4,padding:"10px",background:addingHabit?GRN:"transparent",border:"1px solid "+(addingHabit?GRN:TANL),color:addingHabit?"white":TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
        {addingHabit?"× Close":"+ Add Habit"}
      </button>
      {addingHabit&&(
        <div style={{marginTop:12,padding:"16px",background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:8}}>
          <SL>New Habit</SL>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input autoFocus value={newHabit.label} onChange={e=>setNewHabit(n=>({...n,label:e.target.value}))} placeholder="Habit name..." onKeyDown={e=>e.key==="Enter"&&addHabit()}
              style={{padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8}}/>
            <select value={newHabit.cat} onChange={e=>setNewHabit(n=>({...n,cat:e.target.value}))}
              style={{padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8}}>
              {HCATS.map(hc=><option key={hc.id} value={hc.id}>{hc.label}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addHabit} style={{flex:1,padding:"9px",background:"transparent",color:GRN,border:"1px solid "+GRN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Add Habit</button>
              <button onClick={()=>setAddingHabit(false)} style={{padding:"9px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PrayerTab({prayers,setPrayers}){
  const [pv,setPv]=useState("active");
  const [adding,setAdding]=useState(false);
  const [expId,setExpId]=useState(null);
  const [form,setForm]=useState({name:"",relationship:"church",request:"",notes:""});
  const today=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  const active=prayers.filter(p=>!p.answered);
  const answered=prayers.filter(p=>p.answered);
  const grouped=RTAGS.reduce((acc,tag)=>{const items=active.filter(p=>p.relationship===tag.id);if(items.length)acc.push({tag,items});return acc;},[]);
  const inp={padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,width:"100%"};
  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      <SL>Prayer</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,lineHeight:1.65,marginBottom:16}}>Carry them well. Record what God does.</p>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["active","Active ("+active.length+")"],["answered","Answered ("+answered.length+")"]].map(([v,label])=>(
          <button key={v} onClick={()=>setPv(v)} style={{flex:1,padding:"8px",background:pv===v?OX:"transparent",border:"1px solid "+(pv===v?OX:TANL),color:pv===v?"white":TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>{label}</button>
        ))}
      </div>
      {pv==="active"&&<button onClick={()=>setAdding(!adding)} style={{width:"100%",marginBottom:20,padding:"10px",background:adding?OX:"transparent",border:"1px solid "+(adding?OX:TANL),color:adding?"white":TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>{adding?"× Close":"✦ Add Prayer"}</button>}
      {adding&&(
        <div style={{marginBottom:24,padding:"18px",background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:8}}>
          <SL>New Prayer</SL>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Person's name..." style={inp}/>
            <select value={form.relationship} onChange={e=>setForm(f=>({...f,relationship:e.target.value}))} style={inp}>
              {RTAGS.map(t=><option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
            </select>
            <textarea value={form.request} onChange={e=>setForm(f=>({...f,request:e.target.value}))} placeholder="What are you praying for..." rows={3} style={{...inp,resize:"vertical",lineHeight:1.6}}/>
            <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Notes — what God is doing (optional)..." rows={2} style={{...inp,resize:"vertical",lineHeight:1.6}}/>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{if(!form.name.trim()||!form.request.trim())return;setPrayers(p=>[{id:"p"+Date.now(),...form,dateAdded:today,answered:false,answeredDate:null},...p]);setForm({name:"",relationship:"church",request:"",notes:""});setAdding(false);}}
                style={{flex:1,padding:"10px",background:"transparent",color:OX,border:"1px solid "+OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Add to Prayer List</button>
              <button onClick={()=>setAdding(false)} style={{padding:"10px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {pv==="active"&&(
        <div>
          {!active.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>No active prayers yet.</div>}
          {grouped.map(({tag,items})=>(
            <div key={tag.id} style={{marginBottom:24}}>
              <div style={{fontSize:12,color:tag.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>{tag.icon} {tag.label}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map(pr=>{
                  const ie=expId===pr.id;
                  return(
                    <div key={pr.id} style={{background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+tag.color,borderRadius:8}}>
                      <div onClick={()=>setExpId(ie?null:pr.id)} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 14px",cursor:"pointer"}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:15,fontWeight:"bold",color:INK,marginBottom:4}}>{pr.name}</div>
                          <div style={{fontSize:15,color:INK,lineHeight:1.6,opacity:0.85}}>{pr.request}</div>
                          <div style={{fontSize:13,color:TAN,marginTop:6}}>Added {pr.dateAdded}</div>
                        </div>
                        <span style={{color:TANL,fontSize:16,flexShrink:0,marginTop:2}}>{ie?"−":"+"}</span>
                      </div>
                      {ie&&(
                        <div style={{padding:"12px 14px 14px",borderTop:"1px solid "+FINK}}>
                          {pr.notes&&<div style={{fontSize:15,fontStyle:"italic",color:INK,lineHeight:1.65,marginBottom:12,padding:"8px 12px",background:tag.color+"08",borderLeft:"2px solid "+tag.color+"40"}}>{pr.notes}</div>}
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>setPrayers(p=>p.map(x=>x.id===pr.id?{...x,answered:true,answeredDate:today}:x))}
                              style={{flex:1,padding:"8px",background:"transparent",color:GRN,border:"1px solid "+GRN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>✓ Mark Answered</button>
                            <button onClick={()=>setPrayers(p=>p.filter(x=>x.id!==pr.id))}
                              style={{padding:"8px 12px",background:"transparent",color:OX,border:"1px solid "+OX+"40",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Remove</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {pv==="answered"&&(
        <div>
          {!answered.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}><div style={{fontSize:24,marginBottom:12}}>✦</div>Answered prayers appear here. This is your testimony log.</div>}
          {answered.map(pr=>{
            const tag=RTAGS.find(t=>t.id===pr.relationship);
            const ie=expId===pr.id;
            return(
              <div key={pr.id} style={{padding:"12px 14px",background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+GRN,borderRadius:8,marginBottom:8}}>
                <div onClick={()=>setExpId(ie?null:pr.id)} style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,background:"transparent",border:"2px solid "+GRN,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:GRN,fontSize:12}}>✓</span></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:"bold",color:INK}}>{pr.name}</div>
                    <div style={{fontSize:15,color:INK,lineHeight:1.6,opacity:0.8,marginTop:2}}>{pr.request}</div>
                    <div style={{fontSize:13,color:TAN,marginTop:4}}>{tag&&<span style={{color:tag.color}}>{tag.icon} {tag.label} · </span>}Answered {pr.answeredDate}</div>
                  </div>
                  <span style={{color:TANL,fontSize:16,flexShrink:0}}>{ie?"−":"+"}</span>
                </div>
                {ie&&(
                  <div style={{marginTop:10}}>
                    {pr.notes&&<div style={{padding:"8px 12px",background:GRN+"08",borderLeft:"2px solid "+GRN+"40",fontSize:15,fontStyle:"italic",color:INK,lineHeight:1.65,marginBottom:8}}>{pr.notes}</div>}
                    <button onClick={()=>setPrayers(p=>p.map(x=>x.id===pr.id?{...x,answered:false,answeredDate:null}:x))}
                      style={{width:"100%",padding:"7px",background:"transparent",border:"1px solid "+OX,color:OX,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                      ↩ Move back to active prayer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SwipeableEventCard({event,time,onEdit,onDelete}){
  const [dragX,setDragX]=useState(0);
  const [dragging,setDragging]=useState(false);
  const [confirmDelete,setConfirmDelete]=useState(false);
  const startXRef=useRef(0);
  const startDragXRef=useRef(0);
  const ACTION_W=140; // total width of revealed action buttons

  function onTouchStart(e){
    startXRef.current=e.touches[0].clientX;
    startDragXRef.current=dragX;
    setDragging(true);
  }
  function onTouchMove(e){
    if(!dragging)return;
    const dx=e.touches[0].clientX-startXRef.current;
    const clamped=Math.max(-ACTION_W,Math.min(0,startDragXRef.current+dx));
    setDragX(clamped);
  }
  function onTouchEnd(){
    setDragging(false);
    setDragX(d=>d<-ACTION_W/2?-ACTION_W:0);
  }

  return(
    <div style={{position:"relative",marginBottom:6,borderRadius:8,overflow:"hidden"}}>
      {/* Action buttons revealed behind the card */}
      <div style={{position:"absolute",top:0,right:0,bottom:0,width:ACTION_W,display:"flex"}}>
        <button onClick={()=>{onEdit();setDragX(0);}}
          style={{flex:1,background:"#2E6B8A",border:"none",color:"white",cursor:"pointer",fontFamily:BODY,fontSize:12}}>
          Edit
        </button>
        <button onClick={()=>{if(confirmDelete){onDelete();setDragX(0);setConfirmDelete(false);}else{setConfirmDelete(true);}}}
          style={{flex:1,background:OX,border:"none",color:"white",cursor:"pointer",fontFamily:BODY,fontSize:12}}>
          {confirmDelete?"Confirm?":"Delete"}
        </button>
      </div>

      {/* Foreground card content — slides left on swipe */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={()=>{if(dragX!==0){setDragX(0);setConfirmDelete(false);}}}
        style={{
          display:"flex",gap:10,padding:"10px 12px",
          background:PAPER,border:"1px solid "+FINK,borderLeft:"3px solid #2E6B8A",borderRadius:8,
          transform:`translateX(${dragX}px)`,
          transition:dragging?"none":"transform 0.2s ease",
          touchAction:"pan-y",
          position:"relative",zIndex:1,
        }}>
        <div style={{fontSize:13,color:"#2E6B8A",flexShrink:0,minWidth:60}}>{time}</div>
        <div style={{fontSize:15,color:INK,flex:1}}>{event.summary||"(No title)"}</div>
        <button onClick={(ev)=>{ev.stopPropagation();onEdit();}} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:15,flexShrink:0,padding:"0 2px"}}>✎</button>
      </div>
    </div>
  );
}

function DayWeekTab({cats,planner,setPlanner,prayers,habits,shelf,history,stack,setStack,setView,todayVerse,checkIns,setCheckIns,library,letstalk}){
  const [mode,setMode]=useState("morning");
  const [calEvents,setCalEvents]=useState([]);
  const [calLoading,setCalLoading]=useState(false);
  const [calError,setCalError]=useState(null);
  const CLIENT_ID=import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const SCOPES="https://www.googleapis.com/auth/calendar";

  const [showNewEvent,setShowNewEvent]=useState(false);
  const [creatingEvent,setCreatingEvent]=useState(false);
  const [createError,setCreateError]=useState(null);
  const [editingEventId,setEditingEventId]=useState(null);

  // Morning flow state
  const [bibleStudy,setBibleStudy]=useState(()=>{
    try{const s=JSON.parse(localStorage.getItem("sgm3-bible-study")||"{}");return s[new Date().toISOString().slice(0,10)]||{};}catch(e){return{};}
  });
  const [studyExpanded,setStudyExpanded]=useState(false);
  const [articleExpanded,setArticleExpanded]=useState(false);
  const [studyLoading,setStudyLoading]=useState(false);

  // Check-In — free-speak loop reader
  const [checkInOpen,setCheckInOpen]=useState(false);
  const [checkInInput,setCheckInInput]=useState("");
  const [checkInResult,setCheckInResult]=useState(null);
  const [checkInLoading,setCheckInLoading]=useState(false);

  async function processCheckIn(){
    if(!checkInInput.trim())return;
    setCheckInLoading(true);setCheckInResult(null);
    const prompt=`You are helping Joe Steen in the middle of his day. He is a stay-at-home dad, founder of SGM, 20 years sober, leads Celebrate Recovery. He just spoke freely about how he's feeling and what he has to do. He has his own frameworks for this exact moment: the Future Self Reframe (instead of "do it now," ask what life looks like 2-3 days out if he acts vs doesn't), and the Familiarity Trap (avoidance often returns to a known, comfortable mindset that feels like home, even when it's not serving him). The system behind task avoidance — high empathy, pattern sensitivity — is the same system behind his ministry effectiveness. Avoidance is usually avoiding the feeling, not the task itself.\n\nHere's what Joe just said:\n${checkInInput}\n\nRespond in this exact format, short and direct, no fluff, like a trusted friend who knows him well:\n\nTHE LOOP: [Name what's actually happening in 1-2 sentences — the feeling and the pull, in plain language]\nSCRIPTURE: [One short verse that fits, with reference]\nTHE CALL: [One direct sentence: push through, or rest — pick one, don't hedge]\nHOW TO DO IT RIGHT: [1-2 sentences on how to do that responsibly — if push through, what's the smallest next action; if rest, what makes it actual rest and not avoidance]\n\nBe honest, not soft. No "you've got this" filler. Plain English.`;
    try{
      const result=await claudeAPI(prompt,500);
      setCheckInResult(result);
      const loopMatch=result.match(/THE LOOP:(.+?)(?=SCRIPTURE:|$)/si);
      const callMatch=result.match(/THE CALL:(.+?)(?=HOW TO DO IT RIGHT:|$)/si);
      const entry={
        id:Date.now(),
        date:new Date().toISOString().slice(0,10),
        time:new Date().toISOString(),
        input:checkInInput.trim(),
        loop:loopMatch?loopMatch[1].trim():"",
        call:callMatch?callMatch[1].trim():"",
        full:result,
      };
      setCheckIns(p=>[entry,...(p||[])]);
    }catch(e){
      setCheckInResult("Couldn't reach Claude right now. Take a breath, name the loop yourself, and make the call.");
    }
    setCheckInLoading(false);
  }

  function clearCheckIn(){
    setCheckInInput("");setCheckInResult(null);setCheckInOpen(false);setCheckInTab("today");
  }

  const [checkInTab,setCheckInTab]=useState("today");
  const [insightResult,setInsightResult]=useState(null);
  const [insightLoading,setInsightLoading]=useState(false);

  async function generateInsight(){
    if(!checkIns?.length)return;
    setInsightLoading(true);setInsightResult(null);
    const entries=checkIns.slice(0,20);
    const summary=entries.map((e,i)=>`[${e.date}] You said: ${e.input}\nLoop: ${e.loop}\nCall: ${e.call}`).join("\n\n");
    const prompt=`You are helping Joe Steen understand his own patterns across his recent Check In entries. Joe is a stay-at-home dad, founder of SGM, 20 years sober, leads Celebrate Recovery. His own frameworks: the Familiarity Trap (avoidance returns to a known comfortable mindset), the Future Self Reframe (act for the person you're becoming), and the insight that avoidance is avoiding the feeling, not the task.\n\nHere are his recent Check In entries (newest first):\n\n${summary}\n\nWrite a short, honest pattern read — 3-4 sentences max. Name the loop that keeps showing up most, when it tends to hit, and one honest observation about the pattern of his calls (push through vs rest). Don't be soft. Don't be a coach. Sound like a trusted friend who's been watching closely. Plain English, no filler.\n\nReturn only the pattern read. Nothing else.`;
    try{
      const result=await claudeAPI(prompt,300);
      setInsightResult(result);
    }catch(e){
      setInsightResult("Couldn't reach Claude right now. Try again in a moment.");
    }
    setInsightLoading(false);
  }
  const [articleLoading,setArticleLoading]=useState(false);
  const [studyContent,setStudyContent]=useState(null);
  const [articleContent,setArticleContent]=useState(null);
  const [studySaved,setStudySaved]=useState(false);
  const [recapExpanded,setRecapExpanded]=useState(false);
  const [recapContent,setRecapContent]=useState(()=>{
    try{const r=JSON.parse(localStorage.getItem("sgm3-recap")||"{}");const yk=new Date(Date.now()-86400000).toISOString().slice(0,10);return r.date===yk?r.text:null;}catch(e){return null;}
  });
  const [recapLoading,setRecapLoading]=useState(false);

  const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);

  function buildRecapData(){
    const yStack=JSON.parse(localStorage.getItem("sgm3-stack")||"{}")[yesterday]||[];
    const yStudy=JSON.parse(localStorage.getItem("sgm3-bible-study")||"{}")[yesterday];
    const yHistory=history.filter(h=>h.date===yesterday);
    const yLib=JSON.parse(localStorage.getItem("sgm3-library")||"[]").filter(p=>p.date&&p.date.slice(0,10)===yesterday);
    return{yStack,yStudy,yHistory,yLib};
  }

  async function generateRecap(){
    const{yStack,yStudy,yHistory,yLib}=buildRecapData();
    if(!yStack.length&&!yStudy&&!yHistory.length&&!yLib.length)return;
    setRecapLoading(true);
    const dataParts=[];
    if(yStack.length)dataParts.push("Stack wins: "+yStack.map(w=>w.label).join(", "));
    if(yHistory.length)dataParts.push("Completed tasks: "+yHistory.map(h=>h.label||h.task).filter(Boolean).join(", "));
    if(yLib.length)dataParts.push("Library deposits: "+yLib.map(p=>p.principle).filter(Boolean).join(" | "));
    if(yStudy?.ref)dataParts.push("Anchor verse: "+yStudy.ref+(yStudy.observation?" — Joe wrote: \""+yStudy.observation.slice(0,200)+"\"":""));
    try{
      const text=await claudeAPI(`You are writing a brief morning recap for Joe Steen — stay-at-home dad, founder of Steen Growth Ministries, 20 years sober, leads Celebrate Recovery. Write 2-3 warm sentences (no more) that acknowledge what he did yesterday and set a forward tone for today. Use his data below. Sound like a trusted friend — honest, warm, direct. No self-help filler. No "great job" cheerleading. Just name what happened and hand him toward today.\n\nYesterday's data:\n${dataParts.join("\n")}\n\nReturn only the 2-3 sentence paragraph. Nothing else.`,200);
      if(text){
        setRecapContent(text);
        localStorage.setItem("sgm3-recap",JSON.stringify({date:yesterday,text}));
      }
    }catch(e){}
    setRecapLoading(false);
  }

  // Auto-generate recap on mount if data exists and no cached version
  useEffect(()=>{
    if(!recapContent&&!recapLoading){
      const{yStack,yStudy,yHistory,yLib}=buildRecapData();
      if(yStack.length||yStudy||yHistory.length||yLib.length)generateRecap();
    }
  },[]);
  const [newEvent,setNewEvent]=useState({
    title:"",
    date:new Date().toISOString().slice(0,10),
    endDate:new Date().toISOString().slice(0,10),
    startTime:"09:00",
    endTime:"10:00",
    allDay:false,
    location:"",
    notes:"",
  });

  const tk=new Date().toISOString().slice(0,10);
  const today=new Date();
  const weekDays=Array.from({length:7},(_,i)=>{
    const d=new Date(today);
    d.setDate(today.getDate()-today.getDay()+i);
    return d;
  });

  // Calendar auth — authorization code + refresh token flow (long-lived)
  const [calToken,setCalToken]=useState(localStorage.getItem("sgm-cal-access-token")||null);

  function getRefreshToken(){return localStorage.getItem("sgm-cal-refresh-token");}

  async function exchangeCode(code){
    setCalLoading(true);setCalError(null);
    try{
      const res=await fetch("/api/google-token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"exchange",code,redirect_uri:window.location.origin})});
      const data=await res.json();
      if(data.access_token){
        localStorage.setItem("sgm-cal-access-token",data.access_token);
        if(data.refresh_token)localStorage.setItem("sgm-cal-refresh-token",data.refresh_token);
        setCalToken(data.access_token);
        fetchEvents(data.access_token);
      }else{
        setCalError("Could not connect calendar.");
      }
    }catch(e){setCalError("Could not connect calendar.");}
    window.history.replaceState(null,"",window.location.pathname);
    setCalLoading(false);
  }

  async function refreshAccessToken(){
    const rt=getRefreshToken();
    if(!rt)return null;
    try{
      const res=await fetch("/api/google-token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"refresh",refresh_token:rt})});
      const data=await res.json();
      if(data.access_token){
        localStorage.setItem("sgm-cal-access-token",data.access_token);
        setCalToken(data.access_token);
        return data.access_token;
      }
    }catch(e){}
    return null;
  }

  // Handle OAuth redirect — authorization code arrives in query string
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const code=params.get("code");
    if(code)exchangeCode(code);
    // Migrate old implicit-flow token if present
    const legacy=localStorage.getItem("sgm-cal-token");
    if(legacy){localStorage.removeItem("sgm-cal-token");}
  },[]);

  function connectCalendar(){
    if(!CLIENT_ID){setCalError("Client ID not configured.");return;}
    const params=new URLSearchParams({
      client_id:CLIENT_ID,
      redirect_uri:window.location.origin,
      response_type:"code",
      scope:SCOPES,
      access_type:"offline",
      prompt:"consent",
      include_granted_scopes:"true"
    });
    window.location.href="https://accounts.google.com/o/oauth2/v2/auth?"+params.toString();
  }

  function initGoogleAuth(){}

  async function fetchEvents(token){
    setCalLoading(true);setCalError(null);
    try{
      const now=new Date();
      const start=new Date(now.getFullYear(),now.getMonth(),1).toISOString();
      const end=new Date(now.getFullYear(),now.getMonth()+2,0).toISOString();
      const url=`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start}&timeMax=${end}&singleEvents=true&orderBy=startTime&maxResults=50`;
      let res=await fetch(url,{headers:{Authorization:"Bearer "+token}});
      if(res.status===401){
        const newToken=await refreshAccessToken();
        if(newToken){
          res=await fetch(url,{headers:{Authorization:"Bearer "+newToken}});
        }else{
          localStorage.removeItem("sgm-cal-access-token");
          localStorage.removeItem("sgm-cal-refresh-token");
          setCalToken(null);
          setCalError("Session expired. Please reconnect.");
          setCalLoading(false);return;
        }
      }
      const data=await res.json();
      setCalEvents(data.items||[]);
    }catch(e){setCalError("Failed to load calendar.");}
    setCalLoading(false);
  }

  useEffect(()=>{
    if(calToken)fetchEvents(calToken);
  },[calToken]);

  async function generateStudy(verse,ref){
    setStudyLoading(true);
    try{
      const prompt=`You are generating a structured morning Bible study for Joe Steen, founder of Steen Growth Ministries. Joe is a stay-at-home dad, 20 years sober, leads Celebrate Recovery, and is building a digital formation platform. His anchor verse is Proverbs 3:5-6. His voice: honest, warm, direct — like a trusted friend over coffee.

Today's verse: "${verse}" — ${ref}

Generate a concise morning Bible study in this exact JSON format:
{
  "who": "Who wrote this, when, and what was happening in their world (2 sentences max)",
  "jesus_thread": "How this connects to Jesus — one clear sentence",
  "theological_point": "The core truth this passage makes — one sentence",
  "book_structure": "Where this sits in the larger book and why it matters here — one sentence",
  "spiritual_application": "One practical spiritual application for Joe today — direct, personal, specific",
  "emotional_application": "One emotional/relational application for Joe today — honest, warm, not generic"
}

Return ONLY valid JSON, no markdown, no extra text.`;

      const text=await claudeAPI(prompt,1000);
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      setStudyContent(parsed);
      localStorage.setItem("sgm3-study-content",JSON.stringify({date:new Date().toISOString().slice(0,10),content:parsed,verse,ref}));
    }catch(e){setStudyContent({error:true});}
    setStudyLoading(false);
  }

  async function generateArticle(){
    setArticleLoading(true);
    try{
      const themes=["early church fathers","apostle Paul","the Gospels","church history","biblical archaeology","Christian theology","the Desert Fathers","reformation history","biblical geography","the Holy Land"];
      const theme=themes[new Date().getDate()%themes.length];

      // Fetch painting FIRST so Claude can write about the actual image
      let imageUrl=null;
      let imageCredit="";
      let paintingTitle="";
      let paintingArtist="";
      let paintingDate="";
      let paintingDesc="";
      try{
        const metTerms=["Christ","Madonna","saint Paul","Moses","angel","crucifixion","resurrection","biblical","Jerusalem","apostle"];
        const searchTerm=metTerms[new Date().getDate()%metTerms.length];
        const searchRes=await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(searchTerm)}&isPublicDomain=true&medium=Paintings&hasImages=true`);
        const searchData=await searchRes.json();
        if(searchData.objectIDs&&searchData.objectIDs.length>0){
          const ids=searchData.objectIDs.slice(0,50);
          for(let i=0;i<10;i++){
            const idx=(new Date().getDate()+i)%ids.length;
            const objRes=await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${ids[idx]}`);
            const objData=await objRes.json();
            if(objData.primaryImage&&objData.primaryImage.length>0){
              if(objData.primaryImageSmall){
                const img=new Image();
                await new Promise(res=>{img.onload=res;img.onerror=res;img.src=objData.primaryImageSmall;});
                if(img.naturalHeight>img.naturalWidth)continue;
              }
              imageUrl=objData.primaryImage;
              paintingTitle=objData.title||"";
              paintingArtist=objData.artistDisplayName||"";
              paintingDate=objData.objectDate||"";
              paintingDesc=objData.objectDescription||objData.medium||"";
              imageCredit=[paintingTitle,paintingArtist,paintingDate,objData.repository].filter(Boolean).join(" · ");
              break;
            }
          }
        }
      }catch(imgErr){console.log("Met API:",imgErr.message);}

      // Now write about the ACTUAL painting that was fetched
      const paintingContext=imageUrl
        ?`The painting shown today is: "${paintingTitle}"${paintingArtist?" by "+paintingArtist:""}${paintingDate?", "+paintingDate:""}. ${paintingDesc}`
        :`No specific painting available — write about the theme generally.`;

      const prompt=`You are writing a short enriching article for Joe Steen's morning devotional app. Joe is a visual, creative thinker who loves faith, family, SGM ministry, and learning.

Today's painting: ${paintingContext}
Today's theme: ${theme}

Write a short article about this SPECIFIC painting and its connection to faith. In this exact JSON format:
{
  "headline": "A compelling headline about this specific painting — specific, not generic",
  "image_description": "2-3 sentences describing exactly what the viewer sees in THIS painting — the scene, the figures, the light, the emotion — then why it matters spiritually. Write as if you're standing in front of it.",
  "body": "3-4 paragraphs about this painting's historical and spiritual significance. Warm, intelligent, enriching. Something a curious faith-filled person would want to read at 6am."
}

Return ONLY valid JSON, no markdown, no extra text.`;

      const text=await claudeAPI(prompt,1200);
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      const result={...parsed,description:parsed.image_description||parsed.body||parsed.description,imageUrl,imageCredit};
      setArticleContent(result);
      localStorage.setItem("sgm3-article-v4",JSON.stringify({date:new Date().toISOString().slice(0,10),content:result}));
    }catch(e){
      console.error("Article error:",e);
      setArticleContent({error:true,msg:e.message||"Could not load enrichment."});
    }
    setArticleLoading(false);
  }

  // Load cached content on mount
  useEffect(()=>{
    const today=new Date().toISOString().slice(0,10);
    try{
      const sc=JSON.parse(localStorage.getItem("sgm3-study-content")||"{}");
      if(sc.date===today&&sc.content)setStudyContent(sc.content);
    }catch(e){}
    try{
      const ac=JSON.parse(localStorage.getItem("sgm3-article-v4")||"{}");
      if(ac.date===today&&ac.content)setArticleContent(ac.content);
    }catch(e){}
  },[]);

  function saveStudy(){
    const today=new Date().toISOString().slice(0,10);
    const saved=JSON.parse(localStorage.getItem("sgm3-bible-study")||"{}");
    saved[today]={...bibleStudy,verse:todayVerse.v,ref:todayVerse.r,studyContent,date:today};
    localStorage.setItem("sgm3-bible-study",JSON.stringify(saved));
    setStudySaved(true);
    setTimeout(()=>setStudySaved(false),2500);
  }

  async function handleSaveEvent(){
    if(!newEvent.title.trim()){setCreateError("Add a title for the event.");return;}
    const ed=newEvent.endDate||newEvent.date;
    if(ed<newEvent.date){setCreateError("End date can't be before start date.");return;}
    if(!newEvent.allDay&&ed===newEvent.date&&newEvent.startTime>=newEvent.endTime){setCreateError("End time must be after start time.");return;}
    setCreatingEvent(true);setCreateError(null);
    try{
      if(editingEventId){
        await updateCalEvent(editingEventId,newEvent,calToken);
      }else{
        await createEvent(newEvent,calToken);
      }
      setShowNewEvent(false);
      setEditingEventId(null);
      const todayStr=new Date().toISOString().slice(0,10);
      setNewEvent({title:"",date:todayStr,endDate:todayStr,startTime:"09:00",endTime:"10:00",allDay:false,location:"",notes:""});
      fetchEvents(calToken);
    }catch(e){
      setCreateError(e.message||"Could not save event.");
    }
    setCreatingEvent(false);
  }

  function startEditEvent(ev){
    const isAllDay=!!ev.start?.date;
    const startD=ev.start?.date||(ev.start?.dateTime?new Date(ev.start.dateTime).toISOString().slice(0,10):new Date().toISOString().slice(0,10));
    let endD=startD;
    if(isAllDay&&ev.end?.date){
      endD=addDaysISO(ev.end.date,-1); // convert from exclusive back to inclusive
    }else if(ev.end?.dateTime){
      endD=new Date(ev.end.dateTime).toISOString().slice(0,10);
    }
    setNewEvent({
      title:ev.summary||"",
      date:startD,
      endDate:endD,
      startTime:ev.start?.dateTime?new Date(ev.start.dateTime).toTimeString().slice(0,5):"09:00",
      endTime:ev.end?.dateTime?new Date(ev.end.dateTime).toTimeString().slice(0,5):"10:00",
      allDay:isAllDay,
      location:ev.location||"",
      notes:ev.description||"",
    });
    setEditingEventId(ev.id);
    setShowNewEvent(true);
    setCreateError(null);
  }

  async function handleDeleteEvent(eventId){
    try{
      await deleteCalEvent(eventId,calToken);
      fetchEvents(calToken);
    }catch(e){
      setCalError(e.message||"Could not delete event.");
    }
  }


  function addDaysISO(dateStr,days){
    const d=new Date(dateStr+"T00:00:00");
    d.setDate(d.getDate()+days);
    return d.toISOString().slice(0,10);
  }

  async function createEvent(eventData,token){
    const endDate=eventData.endDate||eventData.date;
    const body={
      summary:eventData.title,
      location:eventData.location||undefined,
      description:eventData.notes||undefined,
      start:eventData.allDay
        ?{date:eventData.date}
        :{dateTime:new Date(eventData.date+"T"+eventData.startTime).toISOString()},
      end:eventData.allDay
        ?{date:addDaysISO(endDate,1)} // Google's all-day end date is exclusive
        :{dateTime:new Date(endDate+"T"+eventData.endTime).toISOString()},
    };
    const url="https://www.googleapis.com/calendar/v3/calendars/primary/events";
    let res=await fetch(url,{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(res.status===401){
      const newToken=await refreshAccessToken();
      if(newToken){
        res=await fetch(url,{method:"POST",headers:{Authorization:"Bearer "+newToken,"Content-Type":"application/json"},body:JSON.stringify(body)});
      }else{
        throw new Error("Session expired. Please reconnect.");
      }
    }
    if(!res.ok){
      const err=await res.json().catch(()=>({}));
      throw new Error(err.error?.message||"Could not create event.");
    }
    return await res.json();
  }

  async function deleteCalEvent(eventId,token){
    const url="https://www.googleapis.com/calendar/v3/calendars/primary/events/"+eventId;
    let res=await fetch(url,{method:"DELETE",headers:{Authorization:"Bearer "+token}});
    if(res.status===401){
      const newToken=await refreshAccessToken();
      if(newToken){
        res=await fetch(url,{method:"DELETE",headers:{Authorization:"Bearer "+newToken}});
      }else{
        throw new Error("Session expired. Please reconnect.");
      }
    }
    if(!res.ok&&res.status!==410){
      throw new Error("Could not delete event.");
    }
  }

  async function updateCalEvent(eventId,eventData,token){
    const endDate=eventData.endDate||eventData.date;
    const body={
      summary:eventData.title,
      location:eventData.location||undefined,
      description:eventData.notes||undefined,
      start:eventData.allDay
        ?{date:eventData.date}
        :{dateTime:new Date(eventData.date+"T"+eventData.startTime).toISOString()},
      end:eventData.allDay
        ?{date:addDaysISO(endDate,1)}
        :{dateTime:new Date(endDate+"T"+eventData.endTime).toISOString()},
    };
    const url="https://www.googleapis.com/calendar/v3/calendars/primary/events/"+eventId;
    let res=await fetch(url,{method:"PATCH",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(res.status===401){
      const newToken=await refreshAccessToken();
      if(newToken){
        res=await fetch(url,{method:"PATCH",headers:{Authorization:"Bearer "+newToken,"Content-Type":"application/json"},body:JSON.stringify(body)});
      }else{
        throw new Error("Session expired. Please reconnect.");
      }
    }
    if(!res.ok){
      const err=await res.json().catch(()=>({}));
      throw new Error(err.error?.message||"Could not update event.");
    }
    return await res.json();
  }

  // Get events for a specific date
  function eventsForDate(d){
    const dk=d.toISOString().slice(0,10);
    return calEvents.filter(e=>{
      const start=(e.start?.dateTime||e.start?.date||"").slice(0,10);
      return start===dk;
    });
  }

  // Get events for today
  const todayEvents=eventsForDate(today);

  // Monthly calendar
  const monthDays=()=>{
    const year=today.getFullYear(),month=today.getMonth();
    const first=new Date(year,month,1).getDay();
    const days=new Date(year,month+1,0).getDate();
    return{first,days,year,month};
  };

  // Daily thought
  const dp=planner[tk]||{};
  function updDay(u){setPlanner(p=>({...p,[tk]:u}));}

  // Weekly intention
  const wk=`week-${today.getFullYear()}-${Math.ceil((today.getDate()-today.getDay()+1)/7)}`;
  const wp=planner[wk]||{intention:"",thoughts:""};
  function updWeek(u){setPlanner(p=>({...p,[wk]:u}));}

  // Stats
  const todayHabits=habits[tk]||{};
  const habitDone=Object.values(todayHabits).filter(Boolean).length;
  const totalHabits=Object.keys(todayHabits).length||1;
  const overall=cats.length?Math.round(cats.flatMap(c=>c.tasks).filter(t=>t.done).length/Math.max(cats.flatMap(c=>c.tasks).length,1)*100):0;
  const activeP=prayers.filter(p=>!p.answered).length;
  const shelfWeek=shelf.filter(s=>s.timeframe==="week").length;
  const [selectedDay,setSelectedDay]=useState(tk);

  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      {/* Toggle — three tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {[["morning","Morning"],["today","Today"],["week","This Week"]].map(([m,label])=>(
          <button key={m} onClick={()=>setMode(m)}
            style={{flex:1,padding:"9px 4px",background:"transparent",border:mode===m?"1px solid "+OX:"1px solid "+TANL,color:mode===m?OX:TAN,cursor:"pointer",fontFamily:BODY,fontSize:13,letterSpacing:"0.5px",textTransform:"uppercase",borderRadius:8,transition:"all 0.2s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* ── MORNING TAB ── */}
      {mode==="morning"&&(
        <div>
          {(recapContent||recapLoading)&&(
            <div style={{marginBottom:20,paddingBottom:16,borderBottom:"1px solid "+FINK,animation:"fadeIn 0.4s ease"}}>
              <div style={{fontSize:13,fontFamily:BODY,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:TAN,marginBottom:8}}>✦ Yesterday</div>
              {recapLoading&&<div style={{fontSize:15,color:TAN,fontStyle:"italic",fontFamily:BODY}}>Reflecting on yesterday…</div>}
              {recapContent&&(<><p style={{fontSize:15,lineHeight:1.8,color:INK,margin:"0 0 8px",fontFamily:SERIF,fontStyle:"italic"}}>{recapContent}</p><div onClick={()=>setRecapExpanded(e=>!e)} style={{fontSize:13,color:GOLD,fontFamily:BODY,opacity:0.8,cursor:"pointer"}}>{recapExpanded?"▲ Close":"↓ Keep reading"}</div>{recapExpanded&&(<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid "+FINK,animation:"fadeIn 0.2s ease"}}><p style={{fontSize:15,lineHeight:1.8,color:"#3a4a5a",margin:0,fontFamily:BODY}}>You showed up yesterday. That’s the work. Today is a new page — same you, fresh start.</p></div>)}</>)}
            </div>
          )}
          <div style={{...CARD,marginBottom:16,overflow:"hidden",animation:"fadeIn 0.4s ease"}}>
            <div style={{position:"relative",overflow:"hidden",minHeight:180,background:"linear-gradient(135deg, #1A2E4A 0%, #2E5C8A 50%, #1BAEE8 100%)"}}>
              {articleContent&&!articleContent.error&&articleContent.imageUrl?(<img src={articleContent.imageUrl} alt={articleContent.headline} style={{width:"100%",maxHeight:280,objectFit:"contain",display:"block",background:"#111820"}}/>):(
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:180,flexDirection:"column",gap:12}}>
                  {articleLoading?<><div style={{width:20,height:20,border:"2px solid rgba(109,220,232,0.5)",borderTopColor:CYAN,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{color:"rgba(255,255,255,0.5)",fontFamily:BODY,fontSize:14}}>Loading…</span></>:<button onClick={generateArticle} style={{padding:"10px 20px",background:"transparent",border:"1px solid rgba(109,220,232,0.5)",color:CYAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>✦ Load Image of the Day</button>}
                </div>
              )}
            </div>
            {articleContent&&!articleContent.error&&(<div style={{padding:"14px 16px"}}><div style={{fontSize:13,fontFamily:BODY,fontWeight:600,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.8}}>✦ Image of the Day</div><div style={{fontSize:15,fontWeight:"bold",color:INK,lineHeight:1.4,marginBottom:6}}>{articleContent.headline}</div>{articleContent.period&&<div style={{fontSize:13,color:TAN,marginBottom:8}}>{articleContent.period}</div>}<div onClick={()=>setArticleExpanded(e=>!e)} style={{fontSize:13,color:GOLD,cursor:"pointer",opacity:0.85}}>{articleExpanded?"▲ Less":"↓ More"}</div>{articleExpanded&&articleContent.description&&(<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid "+FINK,animation:"fadeIn 0.2s ease"}}><p style={{fontSize:15,lineHeight:1.75,color:INK,margin:0,fontFamily:BODY}}>{articleContent.description}</p></div>)}</div>)}
          </div>
          <div style={{marginBottom:20,background:"#2E5B8A",borderRadius:10,overflow:"hidden",animation:"fadeIn 0.4s ease"}}>
            <div style={{padding:"18px 16px 12px"}}>
              <div style={{fontSize:13,fontFamily:BODY,fontWeight:600,color:"rgba(109,220,232,0.8)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>✦ Today’s Anchor</div>
              <p style={{fontSize:18,lineHeight:1.8,color:"white",margin:"0 0 8px",fontFamily:SERIF,fontStyle:"italic"}}>"{todayVerse?.v}"</p>
              <p style={{color:"rgba(184,149,106,0.9)",fontSize:15,margin:"0 0 10px",fontFamily:BODY}}>{todayVerse?.r}</p>
              {todayVerse?.app&&(<div style={{padding:"10px 14px",background:"rgba(255,255,255,0.08)",borderLeft:"3px solid rgba(109,220,232,0.5)",borderRadius:8,marginBottom:10}}><div style={{fontSize:15,color:"rgba(255,255,255,0.75)",fontFamily:BODY,lineHeight:1.65}}>{todayVerse.app.split(".")[0]}.</div></div>)}
            </div>
            <button onClick={()=>{setStudyExpanded(e=>!e);if(!studyContent&&!studyLoading&&todayVerse)generateStudy(todayVerse.v,todayVerse.r);}} style={{width:"100%",padding:"10px 16px",background:studyExpanded?"rgba(255,255,255,0.1)":"transparent",border:"none",borderTop:"1px solid rgba(255,255,255,0.12)",color:"rgba(109,220,232,0.8)",cursor:"pointer",fontFamily:BODY,fontSize:13,textAlign:"left",display:"flex",justifyContent:"space-between"}}><span>{studyExpanded?"▲ Close study":"↓ Open morning study"}</span><span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontStyle:"italic"}}>tap to expand</span></button>
            {studyExpanded&&(<div style={{padding:"16px",background:"white",borderTop:"1px solid "+FINK,animation:"fadeIn 0.25s ease"}}>
              {studyLoading&&<div style={{fontSize:15,color:TAN,fontStyle:"italic",textAlign:"center",padding:"20px",fontFamily:BODY}}>Preparing your study…</div>}
              {studyContent&&!studyContent.error&&(<div>
                {[{label:"Context",key:"who"},{label:"The Jesus Thread",key:"jesus_thread"},{label:"Theological Point",key:"theological_point"},{label:"Book Structure",key:"book_structure"}].map(({label,key})=>studyContent[key]&&(<div key={key} style={{marginBottom:14}}><div style={{fontSize:12,color:OX,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.8}}>✦ {label}</div><p style={{fontSize:15,lineHeight:1.75,color:INK,margin:0}}>{studyContent[key]}</p></div>))}
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                  {studyContent.spiritual_application&&(<div style={{padding:"11px 14px",background:OX+"08",borderLeft:"3px solid "+OX,borderRadius:8}}><div style={{fontSize:12,color:OX,letterSpacing:"2px",textTransform:"uppercase",marginBottom:4,opacity:0.8}}>Spiritual</div><p style={{fontSize:15,lineHeight:1.65,color:INK,margin:0}}>{studyContent.spiritual_application}</p></div>)}
                  {studyContent.emotional_application&&(<div style={{padding:"11px 14px",background:GOLD+"10",borderLeft:"3px solid "+GOLD,borderRadius:8}}><div style={{fontSize:12,color:GOLD,letterSpacing:"2px",textTransform:"uppercase",marginBottom:4,opacity:0.8}}>Emotional</div><p style={{fontSize:15,lineHeight:1.65,color:INK,margin:0}}>{studyContent.emotional_application}</p></div>)}
                </div>
                <div style={{marginBottom:12}}><div style={{fontSize:12,color:OX,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ Your Prayer</div><textarea value={bibleStudy.prayer||""} onChange={e=>setBibleStudy(s=>({...s,prayer:e.target.value}))} placeholder="Respond to what you just read — a prayer in your own words." rows={4} style={{width:"100%",padding:"12px 14px",border:"1px solid "+OX+"40",background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.75,borderRadius:8}}/></div>
                <div style={{marginBottom:14}}><div style={{fontSize:12,color:OX,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ Your Observation</div><textarea value={bibleStudy.observation||""} onChange={e=>setBibleStudy(s=>({...s,observation:e.target.value}))} placeholder="What’s the first thing that hit you?" rows={3} style={{width:"100%",padding:"12px 14px",border:"1px solid "+OX+"40",background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.75,borderRadius:8}}/></div>
                <button onClick={saveStudy} style={{width:"100%",padding:"10px",background:studySaved?GRN:"transparent",border:"1px solid "+(studySaved?GRN:OX),color:studySaved?"white":OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"all 0.3s"}}>{studySaved?"✓ Saved to Field Notes":"Save Study → Field Notes"}</button>
              </div>)}
              {studyContent?.error&&(<div style={{textAlign:"center",padding:"16px"}}><p style={{color:TAN,fontStyle:"italic",fontSize:15,marginBottom:10}}>Could not generate study. Try again.</p><button onClick={()=>generateStudy(todayVerse.v,todayVerse.r)} style={{background:"transparent",border:"1px solid "+OX,color:OX,padding:"8px 16px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>Retry</button></div>)}
              {!studyContent&&!studyLoading&&(<button onClick={()=>generateStudy(todayVerse.v,todayVerse.r)} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+OX,color:OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Generate Study</button>)}
            </div>)}
          </div>
          <AppInsights cats={cats} library={library||[]} prayers={prayers} checkIns={checkIns||[]} letstalk={letstalk||[]} shelf={shelf||[]} habits={habits}/>
          <div style={{background:"white",border:"1px solid "+OX+"40",borderLeft:"3px solid "+OX,borderRadius:10,overflow:"hidden",animation:"fadeIn 0.25s ease",marginBottom:20}}>
            <div style={{display:"flex",gap:6,padding:"12px 16px 10px",borderBottom:"1px solid "+FINK}}>
              <div style={{fontSize:13,color:OX,letterSpacing:"2px",textTransform:"uppercase",opacity:0.85,flex:1,display:"flex",alignItems:"center"}}>✦ Check In</div>
              <button onClick={()=>setCheckInTab("today")} style={{padding:"5px 12px",background:checkInTab==="today"?INK:"transparent",color:checkInTab==="today"?"white":TAN,border:"1px solid "+(checkInTab==="today"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:7}}>Today</button>
              <button onClick={()=>{setCheckInTab("insights");if(!insightResult&&checkIns?.length)generateInsight();}} style={{padding:"5px 12px",background:checkInTab==="insights"?INK:"transparent",color:checkInTab==="insights"?"white":TAN,border:"1px solid "+(checkInTab==="insights"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:7}}>Insights{checkIns?.length?` (${checkIns.length})`:""}</button>
            </div>
            {checkInTab==="today"&&(<div style={{padding:"14px 16px 16px",animation:"fadeIn 0.2s ease"}}>
              {!checkInResult&&(<><textarea value={checkInInput} onChange={e=>setCheckInInput(e.target.value)} rows={4} placeholder="How are you feeling right now? What’s on your plate? Just talk it out..." style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8,marginBottom:10}}/><button onClick={processCheckIn} disabled={!checkInInput.trim()||checkInLoading} style={{width:"100%",padding:"11px",background:checkInInput.trim()&&!checkInLoading?OX:"rgba(26,46,74,0.2)",color:"white",border:"none",cursor:checkInInput.trim()&&!checkInLoading?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8}}>{checkInLoading?"Reading the loop...":"Read This"}</button>{checkInLoading&&(<div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0 0"}}><div style={{width:16,height:16,border:"2px solid "+OX,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:14,color:TAN,fontStyle:"italic"}}>Naming the loop...</span></div>)}</>)}
              {checkInResult&&(<div style={{animation:"fadeIn 0.3s ease"}}><p style={{fontSize:15,lineHeight:1.9,color:INK,margin:"0 0 16px",whiteSpace:"pre-wrap"}}>{checkInResult}</p><div style={{display:"flex",gap:8}}><button onClick={()=>{setCheckInInput("");setCheckInResult(null);}} style={{flex:1,padding:"9px",background:"transparent",border:"1px solid "+OX,color:OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Talk It Out Again</button><button onClick={()=>{setCheckInTab("insights");if(!insightResult&&checkIns?.length)generateInsight();}} style={{padding:"9px 12px",background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>See Patterns</button></div></div>)}
            </div>)}
            {checkInTab==="insights"&&(<div style={{padding:"14px 16px 16px",animation:"fadeIn 0.2s ease"}}>
              {!checkIns?.length?(<p style={{fontSize:15,color:TAN,fontStyle:"italic",textAlign:"center",padding:"20px 0"}}>No entries yet. Come back after your first Check In.</p>):(<>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>{[["Total",(checkIns||[]).length],["Push",(checkIns||[]).filter(c=>/push/i.test(c.call)).length],["Rest",(checkIns||[]).filter(c=>/rest/i.test(c.call)).length]].map(([label,val])=>(<div key={label} style={{background:"rgba(245,240,232,0.8)",border:"1px solid "+FINK,borderRadius:8,padding:"10px 8px",textAlign:"center"}}><div style={{fontSize:22,fontWeight:"bold",color:INK,fontFamily:SERIF,letterSpacing:"-0.5px"}}>{val}</div><div style={{fontSize:11,color:TAN,textTransform:"uppercase",letterSpacing:"0.5px",marginTop:2}}>{label}</div></div>))}</div>
                {insightLoading&&(<div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 0",justifyContent:"center"}}><div style={{width:16,height:16,border:"2px solid "+OX,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:14,color:TAN,fontStyle:"italic"}}>Reading your patterns...</span></div>)}
                {!insightResult&&!insightLoading&&(<button onClick={generateInsight} style={{width:"100%",padding:"11px",background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,marginBottom:14}}>✦ Generate Pattern Read</button>)}
                {insightResult&&!insightLoading&&(<div style={{background:INK,borderRadius:10,padding:"14px 16px",marginBottom:14,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:-20,right:-20,width:100,height:100,background:"radial-gradient(circle,rgba(108,220,232,0.07),transparent 70%)",borderRadius:"50%"}}/><div style={{fontSize:11,color:CYAN,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>✦ Pattern Read — {checkIns.length} {checkIns.length===1?"entry":"entries"}</div><p style={{fontSize:15,color:"white",lineHeight:1.75,margin:"0 0 10px",fontFamily:BODY}}>{insightResult}</p><button onClick={generateInsight} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.35)",cursor:"pointer",fontFamily:BODY,fontSize:12,padding:0}}>Refresh ↻</button></div>)}
                <div style={{fontSize:11,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>✦ Recent Entries</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>{(checkIns||[]).slice(0,8).map(entry=>{const isPush=/push/i.test(entry.call);const callColor=isPush?GRN:"#2E5B8A";return(<div key={entry.id} style={{background:"rgba(245,240,232,0.6)",border:"1px solid "+FINK,borderLeft:"3px solid "+callColor,borderRadius:8,padding:"10px 12px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:callColor,fontWeight:"bold",letterSpacing:"1.5px",textTransform:"uppercase"}}>{isPush?"Push Through":"Rest"}</span><span style={{fontSize:12,color:TAN}}>{entry.date}</span></div><p style={{fontSize:14,color:INK,lineHeight:1.55,margin:0}}>{entry.loop||entry.input?.slice(0,100)}</p></div>);})}</div>
              </>)}
            </div>)}
          </div>
        </div>
      )}

      {/* ── TODAY TAB ── */}
      {mode==="today"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:20}}>
            {[{label:"Orientation",value:overall+"%",color:INK},{label:"Habits",value:habitDone+"/"+totalHabits,color:"#4AB8C8"},{label:"Prayers",value:activeP+" active",color:OX}].map(s=>(<div key={s.label} style={{padding:"12px 8px",background:"white",border:"1px solid "+FINK,borderRadius:8,textAlign:"center"}}><div style={{fontSize:18,fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div><div style={{fontSize:12,color:TAN,letterSpacing:"1px",textTransform:"uppercase",marginTop:4}}>{s.label}</div></div>))}
            <div onClick={()=>setView("history")} style={{padding:"10px 6px",background:"white",border:"1px solid "+FINK,borderRadius:8,textAlign:"center",cursor:"pointer"}}><div style={{fontSize:18,fontWeight:"bold",color:GOLD,lineHeight:1}}>{stack.length}</div><div style={{fontSize:12,color:TAN,letterSpacing:"1px",textTransform:"uppercase",marginTop:4}}>The Stack</div>{stack.length>0&&(<div style={{display:"flex",justifyContent:"center",gap:3,marginTop:6,flexWrap:"wrap"}}>{stack.slice(-5).map((w,i)=>(<div key={w.id} style={{width:10,height:10,borderRadius:"50%",background:STACK_COLORS[w.colorIdx%STACK_COLORS.length],flexShrink:0}}/>))}</div>)}</div>
          </div>
          <div style={{marginBottom:20}}><SL>Morning Thought</SL><textarea value={dp.morningThought||""} onChange={e=>updDay({...dp,morningThought:e.target.value})} placeholder="What’s on your mind this morning? One honest sentence is enough." rows={3} style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"none",lineHeight:1.65}}/></div>
          <div style={{marginBottom:20}}><SL>Today’s Focus</SL><textarea value={dp.focus||""} onChange={e=>updDay({...dp,focus:e.target.value})} placeholder="What is the one thing that would make today a win?" rows={2} style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"none",lineHeight:1.65}}/></div>
          {!calToken?(<div style={{marginBottom:20,padding:"14px 16px",background:"white",border:"1px solid rgba(46,107,138,0.3)",borderLeft:"3px solid #2E6B8A",borderRadius:8}}><div style={{fontSize:12,color:"#2E6B8A",letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6}}>✦ Calendar</div><p style={{fontSize:14,color:TAN,fontStyle:"italic",marginBottom:10,lineHeight:1.6}}>Connect your Google Calendar to see today’s schedule here every morning.</p><button onClick={connectCalendar} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2E6B8A",color:"#2E6B8A",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Connect Google Calendar</button>{calError&&<div style={{fontSize:13,color:OX,marginTop:8,fontStyle:"italic"}}>{calError}</div>}</div>):(
            <div style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontSize:12,color:"#2E6B8A",letterSpacing:"2.5px",textTransform:"uppercase"}}>✦ Today’s Schedule</div><button onClick={()=>{if(showNewEvent){setShowNewEvent(false);setEditingEventId(null);setCreateError(null);}else{const todayStr=new Date().toISOString().slice(0,10);setNewEvent({title:"",date:todayStr,endDate:todayStr,startTime:"09:00",endTime:"10:00",allDay:false,location:"",notes:""});setEditingEventId(null);setShowNewEvent(true);setCreateError(null);}}} style={{background:showNewEvent?"#2E6B8A":"transparent",border:"1px solid #2E6B8A",color:showNewEvent?"white":"#2E6B8A",padding:"4px 10px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>{showNewEvent?"× Close":"+ New Event"}</button></div>
              {showNewEvent&&(<div style={{marginBottom:16,padding:"14px",background:"white",border:"1px solid #2E6B8A40",borderRadius:8,animation:"fadeIn 0.25s ease"}}><input value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} placeholder="Event title..." style={{width:"100%",padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,marginBottom:8}}/><div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}><div><div style={{fontSize:13,color:TAN,marginBottom:4}}>Start date</div><input type="date" value={newEvent.date} onChange={e=>{const v=e.target.value;setNewEvent(n=>({...n,date:v,endDate:(n.endDate&&n.endDate>=v)?n.endDate:v}));}} style={{width:"100%",padding:"9px 10px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,boxSizing:"border-box"}}/></div><div><div style={{fontSize:13,color:TAN,marginBottom:4}}>End date <span style={{opacity:0.7,fontStyle:"italic"}}>(only change for multi-day)</span></div><input type="date" value={newEvent.endDate} min={newEvent.date} onChange={e=>setNewEvent(n=>({...n,endDate:e.target.value}))} style={{width:"100%",padding:"9px 10px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,boxSizing:"border-box"}}/></div></div><label style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer"}}><input type="checkbox" checked={newEvent.allDay} onChange={e=>setNewEvent(n=>({...n,allDay:e.target.checked}))}/><span style={{fontSize:13,color:TAN,fontStyle:"italic"}}>All day</span></label>{!newEvent.allDay&&(<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}><div><div style={{fontSize:12,color:TAN,marginBottom:4}}>Start</div><input type="time" value={newEvent.startTime} onChange={e=>setNewEvent(n=>({...n,startTime:e.target.value}))} style={{width:"100%",padding:"9px 10px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,boxSizing:"border-box"}}/></div><div><div style={{fontSize:12,color:TAN,marginBottom:4}}>End</div><input type="time" value={newEvent.endTime} onChange={e=>setNewEvent(n=>({...n,endTime:e.target.value}))} style={{width:"100%",padding:"9px 10px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,boxSizing:"border-box"}}/></div></div>)}<input value={newEvent.location} onChange={e=>setNewEvent(n=>({...n,location:e.target.value}))} placeholder="Location (optional)..." style={{width:"100%",padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,marginBottom:8}}/><textarea value={newEvent.notes} onChange={e=>setNewEvent(n=>({...n,notes:e.target.value}))} placeholder="Notes (optional)..." rows={3} style={{width:"100%",padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"vertical",lineHeight:1.6,marginBottom:10}}/>{createError&&<div style={{fontSize:13,color:OX,fontStyle:"italic",marginBottom:10}}>{createError}</div>}<button onClick={handleSaveEvent} disabled={creatingEvent} style={{width:"100%",padding:"10px",background:creatingEvent?"transparent":"#2E6B8A",border:"1px solid #2E6B8A",color:creatingEvent?"#2E6B8A":"white",cursor:creatingEvent?"default":"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>{creatingEvent?(editingEventId?"Saving changes…":"Adding to calendar…"):(editingEventId?"Save Changes":"Add to Calendar")}</button></div>)}
              {calLoading&&<div style={{fontSize:15,color:TAN,fontStyle:"italic"}}>Loading…</div>}
              {!calLoading&&todayEvents.length===0&&<div style={{fontSize:15,color:TAN,fontStyle:"italic",padding:"10px 12px",border:"1px dashed "+TANL,borderRadius:8}}>No appointments today — tap + New Event to add one.</div>}
              {todayEvents.map((e,i)=>(<SwipeableEventCard key={e.id||i} event={e} time={e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day"} onEdit={()=>startEditEvent(e)} onDelete={()=>handleDeleteEvent(e.id)}/>))}
              <button onClick={()=>{localStorage.removeItem("sgm-cal-access-token");localStorage.removeItem("sgm-cal-refresh-token");setCalToken(null);setCalEvents([]);}} style={{marginTop:6,padding:"4px 10px",background:"transparent",border:"1px solid "+TANL,color:TANL,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>Disconnect</button>
            </div>
          )}
          {shelfWeek>0&&(<div style={{marginBottom:20,padding:"14px 16px",background:"white",border:"1px solid rgba(184,149,106,0.22)",borderLeft:"3px solid "+OX,borderRadius:8}}><div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6}}>✦ Shelf — This Week</div><div style={{fontSize:15,color:INK}}>{shelfWeek} item{shelfWeek!==1?"s":""} parked for this week</div><div style={{fontSize:13,color:TAN,fontStyle:"italic",marginTop:2}}>Check the Shelf on the Map tab to promote to today</div></div>)}
          <div style={{marginBottom:20}}><SL>Evening Reflection</SL><textarea value={dp.evening||""} onChange={e=>updDay({...dp,evening:e.target.value})} placeholder="What happened today that’s worth remembering?" rows={3} style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"none",lineHeight:1.65}}/></div>
        </div>
      )}

      {mode==="week"&&(
        <div>
          {/* Week at a glance */}
          <div style={{marginBottom:20}}>
            <SL>Week at a Glance</SL>
            <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:4}}>
              {weekDays.map((d,i)=>{
                const dk=d.toISOString().slice(0,10);
                const isToday=dk===tk;
                const isSelected=dk===selectedDay;
                const dp2=planner[dk]||{};
                const hasMorning=!!(dp2.morningThought||dp2.focus);
                const evs=calToken?eventsForDate(d):[];
                return(
                  <div key={i} onClick={()=>setSelectedDay(dk)} style={{flex:"0 0 44px",display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px",background:isSelected?"rgba(255,255,255,0.85)":isToday?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.35)",border:"1px solid "+(isSelected?INK:isToday?OX:FINK),borderRadius:8,cursor:"pointer"}}>
                    <div style={{fontSize:12,color:isSelected?INK:isToday?OX:TAN,letterSpacing:"1px",textTransform:"uppercase"}}>{d.toLocaleDateString("en-US",{weekday:"short"})}</div>
                    <div style={{fontSize:16,fontWeight:"bold",color:isSelected?INK:isToday?OX:INK,marginTop:2}}>{d.getDate()}</div>
                    <div style={{width:6,height:6,borderRadius:"50%",background:evs.length?"#2E6B8A":hasMorning?"#4AB8C8":"transparent",border:"1px solid "+TANL,marginTop:4}}/>
                  </div>
                );
              })}
            </div>
            {/* Selected day events */}
            {selectedDay&&(()=>{
              const selDate=new Date(selectedDay+"T12:00:00");
              const selEvs=calToken?eventsForDate(selDate):[];
              const selPlan=planner[selectedDay]||{};
              return(
                <div style={{marginTop:10,padding:"12px 14px",background:"white",border:"1px solid "+FINK,borderRadius:8}}>
                  <div style={{fontSize:13,color:INK,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:8}}>
                    {selDate.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
                  </div>
                  {selEvs.length===0&&!selPlan.morningThought&&!selPlan.focus&&(
                    <div style={{fontSize:15,color:TAN,fontStyle:"italic"}}>Nothing recorded for this day</div>
                  )}
                  {selEvs.map((e,j)=>{
                    const time=e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day";
                    return(
                      <div key={j} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+FINK}}>
                        <div style={{fontSize:13,color:"#2E6B8A",flexShrink:0,minWidth:55}}>{time}</div>
                        <div style={{fontSize:15,color:INK}}>{e.summary||"(No title)"}</div>
                      </div>
                    );
                  })}
                  {selPlan.morningThought&&<div style={{fontSize:15,color:TAN,fontStyle:"italic",marginTop:6}}>"{selPlan.morningThought}"</div>}
                </div>
              );
            })()}
          </div>

          {/* Weekly intention */}
          <div style={{marginBottom:20}}>
            <SL>Weekly Intention</SL>
            <textarea
              value={wp.intention||""}
              onChange={e=>updWeek({...wp,intention:e.target.value})}
              placeholder="What does this week need to accomplish? One clear sentence."
              rows={2}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"none",lineHeight:1.65}}
            />
          </div>

          {/* Weekly stats */}
          <div style={{marginBottom:20}}>
            <SL>Week Pulse</SL>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[
                {label:"Overall",value:overall+"%",color:INK},
                {label:"Active Prayers",value:activeP,color:OX},
                {label:"Shelf This Week",value:shelfWeek+" items",color:"#2E6B8A"},
                {label:"Tasks Done",value:cats.flatMap(c=>c.tasks).filter(t=>t.done).length+" total",color:"#4AB8C8"},
              ].map(s=>(
                <div key={s.label} style={{padding:"14px 12px",background:"white",border:"1px solid "+FINK,borderRadius:8}}>
                  <div style={{fontSize:22,fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                  <div style={{fontSize:12,color:TAN,letterSpacing:"1px",textTransform:"uppercase",marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly thoughts */}
          <div style={{marginBottom:20}}>
            <SL>Weekly Thoughts</SL>
            <textarea
              value={wp.thoughts||""}
              onChange={e=>updWeek({...wp,thoughts:e.target.value})}
              placeholder="Notes, observations, things God is showing you this week…"
              rows={4}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,resize:"none",lineHeight:1.65}}
            />
          </div>

          {/* Week events from calendar */}
          {calToken&&(
            <div style={{marginBottom:20}}>
              <SL>This Week's Appointments</SL>
              {weekDays.map((d,i)=>{
                const evs=eventsForDate(d);
                if(!evs.length)return null;
                return(
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{fontSize:13,color:"#2E6B8A",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:4}}>
                      {d.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
                    </div>
                    {evs.map((e,j)=>{
                      const time=e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day";
                      return(
                        <div key={j} style={{display:"flex",gap:10,padding:"8px 12px",background:"white",border:"1px solid "+FINK,borderLeft:"3px solid #2E6B8A",borderRadius:8,marginBottom:4}}>
                          <div style={{fontSize:13,color:"#2E6B8A",flexShrink:0,minWidth:60}}>{time}</div>
                          <div style={{fontSize:15,color:INK}}>{e.summary||"(No title)"}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {weekDays.every(d=>eventsForDate(d).length===0)&&(
                <div style={{fontSize:15,color:TAN,fontStyle:"italic",padding:"10px 12px",border:"1px dashed "+TANL,borderRadius:8}}>No appointments this week</div>
              )}
            </div>
          )}

          {/* Month Calendar */}
          <div style={{marginBottom:20}}>
            <SL>{today.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</SL>
            {(()=>{
              const {first,days,year,month}=monthDays();
              const cells=[];
              for(let i=0;i<first;i++)cells.push(null);
              for(let d=1;d<=days;d++)cells.push(d);
              const dayLabels=["Su","Mo","Tu","We","Th","Fr","Sa"];
              return(
                <div style={{background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:8,padding:"12px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
                    {dayLabels.map(l=><div key={l} style={{textAlign:"center",fontSize:12,color:TAN,letterSpacing:"1px",padding:"3px 0"}}>{l}</div>)}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                    {cells.map((d,i)=>{
                      if(!d)return<div key={i}/>;
                      const date=new Date(year,month,d);
                      const dk=date.toISOString().slice(0,10);
                      const isToday=dk===tk;
                      const isSelected=dk===selectedDay;
                      const evs=calToken?eventsForDate(date):[];
                      return(
                        <div key={i} onClick={()=>setSelectedDay(dk)} style={{textAlign:"center",padding:"6px 2px",borderRadius:8,background:isSelected?"rgba(255,255,255,0.85)":isToday?"rgba(122,31,31,0.08)":"transparent",border:isSelected?"1px solid "+INK:isToday?"1px solid "+OX:"1px solid transparent",position:"relative",cursor:"pointer"}}>
                          <div style={{fontSize:13,color:isSelected?INK:isToday?OX:INK,fontWeight:isToday||isSelected?"bold":"normal"}}>{d}</div>
                          {evs.length>0&&<div style={{width:4,height:4,borderRadius:"50%",background:"#2E6B8A",margin:"2px auto 0"}}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Past week archive preview */}
          {Object.keys(planner).filter(k=>k.startsWith("week-")&&k!==wk).slice(-3).reverse().map(k=>{
            const pw=planner[k]||{};
            if(!pw.intention&&!pw.thoughts)return null;
            return(
              <div key={k} style={{marginBottom:10,padding:"14px 16px",background:"rgba(255,255,255,0.35)",border:"1px solid "+FINK,borderRadius:8,opacity:0.7}}>
                <div style={{fontSize:12,color:TAN,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6}}>{k.replace("week-","Week of ")}</div>
                {pw.intention&&<p style={{fontSize:15,fontStyle:"italic",color:INK,margin:"0 0 6px"}}>{pw.intention}</p>}
                {pw.thoughts&&typeof pw.thoughts==="string"&&<p style={{fontSize:15,color:TAN,margin:0,lineHeight:1.5}}>{pw.thoughts.slice(0,120)}{pw.thoughts.length>120?"…":""}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function StackSection({stack,setStack}){
  const [input,setInput]=useState("");
  const [editingId,setEditingId]=useState(null);
  const [editDuration,setEditDuration]=useState("");
  const today=new Date().toISOString().slice(0,10);
  const DURATIONS=["5 min","15 min","30 min","~1 hr","~2 hrs","~3 hrs","~4 hrs","half day","all day"];

  function addWin(){
    if(!input.trim())return;
    const win={
      id:"sw"+Date.now(),
      label:input.trim(),
      colorIdx:stack.length,
      time:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}),
      date:today,
      duration:"",
    };
    setStack(s=>[...s,win]);
    setInput("");
  }

  function removeWin(id){
    setStack(s=>s.filter(w=>w.id!==id));
    if(editingId===id)setEditingId(null);
  }

  function openEdit(win){
    setEditingId(win.id);
    setEditDuration(win.duration||"");
  }

  function saveDuration(id){
    setStack(s=>s.map(w=>w.id===id?{...w,duration:editDuration.trim()}:w));
    setEditingId(null);
    setEditDuration("");
  }

  return(
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <SL>The Stack</SL>
        <span style={{fontSize:13,color:TAN,fontStyle:"italic"}}>{stack.length} win{stack.length!==1?"s":""} today</span>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&addWin()}
          placeholder="Start stacking — completed, partial, anything you moved."
          style={{flex:1,padding:"10px 14px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8}}
        />
        <button onClick={addWin}
          style={{padding:"10px 16px",background:GOLD,border:"none",color:"white",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,flexShrink:0}}>
          Stack it
        </button>
      </div>

      {stack.length===0&&(
        <div style={{textAlign:"center",padding:"24px",color:TAN,fontStyle:"italic",fontSize:15,border:"1px dashed "+TANL,borderRadius:8}}>
          What's on your mind today? Go ahead and start stacking — completed, partial, anything you touched counts.
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {stack.map((win)=>{
          const col=STACK_COLORS[win.colorIdx%STACK_COLORS.length];
          const isEditing=editingId===win.id;
          return(
            <div key={win.id} style={{background:"white",border:"1px solid rgba(184,149,106,0.2)",borderLeft:"4px solid "+col,borderRadius:8,overflow:"hidden"}}>

              {/* Win row */}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/>
                <div style={{flex:1,fontSize:15,color:INK,lineHeight:1.5,fontFamily:BODY}}>{win.label}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                  <div style={{fontSize:13,color:TAN,fontFamily:BODY}}>{win.time}</div>
                  <button onClick={()=>removeWin(win.id)}
                    style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:16,padding:"2px 4px",flexShrink:0,lineHeight:1}}>×</button>
                </div>
              </div>

              {/* Duration row */}
              <div style={{padding:"0 14px 11px",display:"flex",alignItems:"center",gap:8}}>
                {win.duration&&!isEditing
                  ?<button onClick={()=>openEdit(win)}
                      style={{fontSize:13,color:col,fontWeight:"bold",background:col+"18",padding:"4px 12px",borderRadius:12,border:"1px solid "+col+"40",cursor:"pointer",fontFamily:BODY}}>
                      {win.duration} — tap to edit
                    </button>
                  :<button onClick={()=>openEdit(win)}
                      style={{fontSize:13,color:TAN,background:"transparent",padding:"4px 12px",borderRadius:12,border:"1px dashed "+TANL,cursor:"pointer",fontFamily:BODY}}>
                      + How long did this take?
                    </button>
                }
              </div>

              {/* Inline duration picker */}
              {isEditing&&(
                <div style={{padding:"12px 14px",borderTop:"1px solid "+col+"25",background:col+"06",animation:"fadeIn 0.2s ease"}}>
                  <div style={{fontSize:13,color:col,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10,opacity:0.85,fontFamily:BODY,fontWeight:600}}>How long did this take?</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                    {DURATIONS.map(d=>(
                      <button key={d} onClick={()=>setEditDuration(d)}
                        style={{padding:"6px 12px",background:editDuration===d?col:"transparent",color:editDuration===d?"white":TAN,border:"1px solid "+(editDuration===d?col:TANL),cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:12,transition:"all 0.15s"}}>
                        {d}
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <input value={editDuration} onChange={e=>setEditDuration(e.target.value)}
                      placeholder="Or type — e.g. 45 min"
                      onKeyDown={e=>e.key==="Enter"&&saveDuration(win.id)}
                      style={{flex:1,padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:6}}/>
                    <button onClick={()=>saveDuration(win.id)}
                      style={{padding:"9px 18px",background:col,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:6,flexShrink:0}}>
                      Save
                    </button>
                    <button onClick={()=>setEditingId(null)}
                      style={{padding:"9px 12px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:6,flexShrink:0}}>
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {stack.length>0&&(
        <div style={{marginTop:10,display:"flex",gap:4,flexWrap:"wrap"}}>
          {stack.map(w=>(
            <div key={w.id} style={{width:12,height:12,borderRadius:"50%",background:STACK_COLORS[w.colorIdx%STACK_COLORS.length]}}/>
          ))}
        </div>
      )}

      <div style={{height:1,background:FINK,margin:"20px 0"}}/>
    </div>
  );
}

function LibraryInsights({library,setAc,ac}){
  const [open,setOpen]=useState(false);
  const [aiMode,setAiMode]=useState(null);
  const [aiResult,setAiResult]=useState("");
  const [aiLoading,setAiLoading]=useState(false);

  if(!library.length)return null;

  const counts=LCATS.reduce((a,c)=>{a[c.id]=library.filter(p=>p.category===c.id).length;return a;},{});
  const maxCount=Math.max(...Object.values(counts),1);

  // Heaviest = most active battleground
  const heaviest=LCATS.slice().sort((a,b)=>(counts[b.id]||0)-(counts[a.id]||0))[0];
  const heaviestCount=counts[heaviest.id]||0;

  // Pattern frequency
  const patternMap={};
  library.forEach(e=>{
    if(e.pattern){
      const p=e.pattern.trim().toLowerCase();
      patternMap[p]=(patternMap[p]||0)+1;
    }
  });
  const topPatterns=Object.entries(patternMap).sort((a,b)=>b[1]-a[1]).slice(0,6);

  async function runAI(mode){
    setAiMode(mode);
    setAiLoading(true);
    setAiResult("");
    const principles=library.filter(e=>e.category===heaviest.id).map(e=>e.principle).slice(0,6).join("\n");
    const allPatterns=topPatterns.map(([p,n])=>`${p} (${n}x)`).join(", ");
    const prompt=mode==="prayer"
      ?`You are a pastoral coach for Joe Steen, founder of SGM. Joe's Library is a record of where the Holy Spirit keeps having to meet him — more principles in a category means more friction and struggle there, not more wisdom. His most active battleground right now is "${heaviest.label}" with ${heaviestCount} entries. His most recurring patterns — the specific weapons being used against him — are: ${allPatterns}. Some of what he's been naming in ${heaviest.label}: ${principles||"nothing yet"}.\n\nWrite Joe a short, honest, personal prayer — 4-6 sentences — for this specific fight. Written in first person from Joe's perspective. Speak to the real battle, not a generic one. No filler, no self-help language. Acknowledge the struggle directly.`
      :`You are a pastoral coach for Joe Steen, founder of SGM. Joe's Library reveals his interior warfare — the patterns that keep taking him out. His most active battleground is "${heaviest.label}". His most repeated patterns are: ${allPatterns}.\n\nGive Joe 2-3 scripture passages (reference + verse text) that speak directly to these specific patterns as spiritual weapons, not encouragement. For each one, one sentence in Joe's voice on why this verse is a weapon for him in this particular fight. Real and honest, no filler.`;
    try{
      const result=await claudeAPI(prompt,600);
      setAiResult(result);
    }catch(e){
      setAiResult("Couldn't reach Claude right now. Try again in a moment.");
    }
    setAiLoading(false);
  }

  function closeAI(){setAiMode(null);setAiResult("");setAiLoading(false);}

  return(
    <div style={{marginBottom:20}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",padding:"11px 16px",background:open?"rgba(156,122,58,0.12)":"rgba(255,255,255,0.5)",border:"1px solid "+(open?GOLD:TANL),borderRadius:8,cursor:"pointer",fontFamily:BODY,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.2s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:15,color:GOLD}}>✦</span>
          <span style={{fontSize:15,color:INK,fontWeight:"bold"}}>Identity Insights</span>
          <span style={{fontSize:13,color:TAN,fontStyle:"italic"}}>{library.length} principles</span>
        </div>
        <span style={{fontSize:13,color:GOLD}}>{open?"▲ close":"▼ open"}</span>
      </button>

      {open&&(
        <div style={{border:"1px solid "+GOLD+"40",borderTop:"none",borderRadius:"0 0 2px 2px",background:"white",padding:"18px 16px",animation:"fadeIn 0.25s ease"}}>

          {/* Framing line */}
          <p style={{fontSize:15,color:TAN,fontStyle:"italic",lineHeight:1.7,margin:"0 0 18px",borderLeft:"3px solid "+GOLD,paddingLeft:12}}>
            More principles in a category means more friction there — not more wisdom. This is a map of where the battle is heaviest.
          </p>

          {/* Category bars */}
          <div style={{fontSize:12,color:GOLD,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.9}}>✦ Active Battlegrounds — tap to filter</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
            {LCATS.slice().sort((a,b)=>(counts[b.id]||0)-(counts[a.id]||0)).map((cat,i)=>{
              const count=counts[cat.id]||0;
              const pct=Math.max((count/maxCount)*100,count>0?5:0);
              const isActive=ac===cat.id;
              const isHeaviest=i===0&&count>0;
              return(
                <button key={cat.id} onClick={()=>setAc(isActive?"all":cat.id)}
                  style={{background:"none",border:"none",padding:0,cursor:"pointer",textAlign:"left",width:"100%"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
                    <span style={{fontSize:13,color:cat.color,width:16,textAlign:"center"}}>{cat.icon}</span>
                    <span style={{fontSize:13,color:isActive?cat.color:INK,fontFamily:BODY,fontWeight:isActive?"bold":"normal",flex:1}}>{cat.label}</span>
                    {isHeaviest&&<span style={{fontSize:12,color:cat.color,background:cat.color+"18",padding:"2px 8px",borderRadius:10,border:"1px solid "+cat.color+"40",fontFamily:BODY}}>most active</span>}
                    <span style={{fontSize:13,color:count>0?cat.color:TANL,fontWeight:"bold"}}>{count}</span>
                  </div>
                  <div style={{height:9,background:"rgba(26,46,74,0.07)",borderRadius:4,overflow:"hidden",marginLeft:26}}>
                    <div style={{
                      height:"100%",
                      width:pct+"%",
                      background:count>0?`linear-gradient(to right, ${cat.color}, ${cat.color}CC)`:"transparent",
                      borderRadius:4,
                      transition:"width 0.6s ease",
                      boxShadow:isActive?"0 0 8px "+cat.color+"70":"none",
                      opacity:isActive?1:0.8,
                    }}/>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recurring patterns */}
          {topPatterns.length>0&&(
            <div style={{marginBottom:22}}>
              <div style={{fontSize:12,color:GOLD,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.9}}>✦ Weapons Being Used Against You</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {topPatterns.map(([pattern,count],i)=>{
                  const col=LCATS[i%LCATS.length].color;
                  const size=i===0?15:i<3?13:12;
                  return(
                    <div key={pattern} style={{padding:"5px 12px",background:col+"14",border:"1px solid "+col+"40",borderRadius:12,display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:size,color:col,fontFamily:BODY,fontStyle:"italic"}}>{pattern}</span>
                      <span style={{fontSize:12,color:col,opacity:0.75,fontWeight:"bold"}}>{count}×</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active battleground — prayer + scripture */}
          {heaviestCount>0&&(
            <div style={{background:heaviest.color+"0D",border:"1px solid "+heaviest.color+"35",borderLeft:"3px solid "+heaviest.color,borderRadius:8,padding:"12px 14px",marginBottom:aiMode?0:0}}>
              <div style={{fontSize:12,color:heaviest.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>✦ Heaviest Fight Right Now</div>
              <p style={{fontSize:15,color:INK,margin:"0 0 12px",lineHeight:1.7}}>
                <span style={{fontWeight:"bold",color:heaviest.color}}>{heaviest.icon} {heaviest.label}</span> keeps coming up — {heaviestCount} principles and counting. The Holy Spirit keeps meeting you here because the enemy keeps pressing here.
              </p>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>aiMode==="prayer"?closeAI():runAI("prayer")}
                  style={{flex:1,padding:"9px 10px",background:aiMode==="prayer"?heaviest.color:"transparent",color:aiMode==="prayer"?"white":heaviest.color,border:"1px solid "+heaviest.color,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,transition:"all 0.2s"}}>
                  {aiMode==="prayer"&&aiLoading?"Writing...":"Pray into this fight"}
                </button>
                <button onClick={()=>aiMode==="scripture"?closeAI():runAI("scripture")}
                  style={{flex:1,padding:"9px 10px",background:aiMode==="scripture"?heaviest.color:"transparent",color:aiMode==="scripture"?"white":heaviest.color,border:"1px solid "+heaviest.color,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,transition:"all 0.2s"}}>
                  {aiMode==="scripture"&&aiLoading?"Finding...":"Scripture for this fight"}
                </button>
              </div>
            </div>
          )}

          {/* AI result */}
          {aiMode&&(
            <div style={{padding:"14px 16px",background:"white",border:"1px solid "+heaviest.color+"40",borderTop:"none",animation:"fadeIn 0.3s ease"}}>
              {aiLoading
                ?<div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0"}}>
                    <div style={{width:16,height:16,border:"2px solid "+heaviest.color,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                    <span style={{fontSize:15,color:TAN,fontStyle:"italic"}}>{aiMode==="prayer"?"Writing your prayer...":"Finding your weapons..."}</span>
                  </div>
                :<div>
                    <div style={{fontSize:12,color:heaviest.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>✦ {aiMode==="prayer"?"A Prayer for This Fight":"Scripture for Your Patterns"}</div>
                    <p style={{fontSize:15,lineHeight:1.9,color:INK,margin:"0 0 14px",whiteSpace:"pre-wrap"}}>{aiResult}</p>
                    <button onClick={closeAI} style={{background:"none",border:"1px solid "+TANL,color:TAN,padding:"6px 14px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>Close</button>
                  </div>
              }
            </div>
          )}

        </div>
      )}
    </div>
  );
}

function LibraryTab({library,setLibrary}){
  const [ac,setAc]=useState("all");
  const [showDeposit,setShowDeposit]=useState(false);
  const [pt,setPt]=useState("");
  const [expanded,setExpanded]=useState(null);
  const [copied,setCopied]=useState(null);
  const [showPrompt,setShowPrompt]=useState(false);
  const [promptCopied,setPromptCopied]=useState(false);
  const [parseError,setParseError]=useState(false);
  const DEPOSIT_PROMPT=`I'm going to paste my Gemini unload below. For each major insight or principle you find, format it exactly like this — one block per principle, separated by three dashes:

PRINCIPLE: One clear sentence capturing the core insight, in my voice
CATEGORY: one of — identity, relationships, capacity, warfare, stewardship, ministry
DATE: [today's date]
CONTEXT: 2-3 sentences in my voice, first person. What was happening, what God showed me, why it matters to me specifically. Use my actual words and details from the unload — real names, real situations.
PATTERN: The specific struggle or survival anchor this speaks to (one phrase — e.g. perfectionism, shame, over-explanation, avoidance, unbelief)
SCRIPTURE: Short verse, 15 words or less
REF: Book chapter:verse
TAG: A short reference tag, 2-4 words, for finding this principle later (e.g. "office move", "empath switch", "morning anchor")
---

Rules:
- Stay in my voice throughout — don't sanitize or make it generic
- Pull real details from the unload (names, places, situations)
- One principle per block — don't combine two insights into one
- CATEGORY must be exactly one of the six options listed
- TAG should be short and specific enough to search for later, not generic
- Extract every significant principle you find — aim for 6-10 per session
- Do not add any extra text before or after the blocks

Here is my unload:

[PASTE GEMINI OUTPUT HERE]`;

  function copyPrompt(){
    navigator.clipboard?.writeText(DEPOSIT_PROMPT).then(()=>{setPromptCopied(true);setTimeout(()=>setPromptCopied(false),2200);});
  }
  const today=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});

  const filtered=ac==="all"?library:library.filter(p=>p.category===ac);
  const counts=LCATS.reduce((a,c)=>{a[c.id]=library.filter(p=>p.category===c.id).length;return a;},{});
  const latest=library[0]||null;
  const latestCat=LCATS.find(c=>c.id===latest?.category)||LCATS[0];
  const listEntries=ac==="all"?(library.length>1?library.slice(1):library):filtered;

  function parsePaste(text){
    // Split on --- separator
    const blocks=text.split(/\n---+\n/).map(b=>b.trim()).filter(Boolean);
    if(!blocks.length)return[];
    const results=[];
    blocks.forEach(block=>{
      const get=(key)=>{
        const m=block.match(new RegExp("^"+key+":\\s*(.+)$","mi"));
        return m?m[1].trim():"";
      };
      const principle=get("PRINCIPLE");
      const category=(get("CATEGORY")||"identity").toLowerCase().trim();
      const date=get("DATE")||today;
      const context=get("CONTEXT");
      const pattern=get("PATTERN");
      const scripture=get("SCRIPTURE");
      const ref=get("REF");
      const tag=get("TAG");
      if(principle){
        results.push({
          id:"lib"+Date.now()+Math.random(),
          principle,
          category:["identity","relationships","capacity","warfare","stewardship","ministry"].includes(category)?category:"identity",
          date,context,pattern,scripture,scriptureRef:ref,tag,
        });
      }
    });
    return results;
  }

  function deleteEntry(id){
    setLibrary(p=>p.filter(item=>item.id!==id));
    setExpanded(null);
  }

  function handleDeposit(){
    setParseError(false);
    const items=parsePaste(pt);
    if(!items.length){setParseError(true);return;}
    setLibrary(p=>[...items,...p]);
    setPt("");
    setShowDeposit(false);
    setAc("all");
  }

  function share(entry){
    const cat=LCATS.find(c=>c.id===entry.category);
    const lines=[`${cat?.icon||"✦"} ${cat?.label||""}`,``,`"${entry.principle}"`];
    if(entry.context)lines.push(``,entry.context);
    if(entry.scripture)lines.push(``,`"${entry.scripture}" — ${entry.scriptureRef||""}`);
    if(entry.tag)lines.push(``,`#${entry.tag}`);
    lines.push(``,`— Joe Steen / Steen Growth Ministries`);
    navigator.clipboard?.writeText(lines.join("\n")).then(()=>{setCopied(entry.id);setTimeout(()=>setCopied(null),2200);});
  }

  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      {/* Insights panel */}
      <LibraryInsights library={library} setAc={setAc} ac={ac}/>

      {/* Deposit button + panel */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <SL>Identity</SL>
        <button onClick={()=>{setShowDeposit(d=>!d);setParseError(false);}}
          style={{background:showDeposit?OX:"transparent",border:"1px solid "+(showDeposit?OX:TANL),color:showDeposit?"white":TAN,padding:"6px 14px",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
          {showDeposit?"× Close":"+ Deposit"}
        </button>
      </div>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,marginBottom:20,lineHeight:1.65}}>The space between who you think you are and who God says you are. Track it, name it, walk in freedom.</p>

      {showDeposit&&(
        <div style={{marginBottom:24,padding:"16px",background:"white",border:"1px solid "+TANL,borderRadius:8,animation:"fadeIn 0.3s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <SL>Paste from Claude</SL>
            <button onClick={()=>setShowPrompt(p=>!p)}
              style={{background:"transparent",border:"1px solid "+TANL,color:TAN,width:22,height:22,borderRadius:"50%",cursor:"pointer",fontFamily:BODY,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:-2}}>?</button>
          </div>
          {showPrompt&&(
            <div style={{marginBottom:14,padding:"12px 14px",background:"rgba(26,46,74,0.04)",border:"1px solid "+FINK,borderRadius:8,animation:"fadeIn 0.2s ease"}}>
              <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ Claude Prompt</div>
              <pre style={{fontSize:13,color:INK,lineHeight:1.7,margin:"0 0 10px",whiteSpace:"pre-wrap",fontFamily:BODY,opacity:0.85}}>{DEPOSIT_PROMPT}</pre>
              <button onClick={copyPrompt}
                style={{width:"100%",padding:"7px",background:"transparent",border:"1px solid "+(promptCopied?GRN:TANL),color:promptCopied?GRN:TAN,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                {promptCopied?"✓ Copied":"Copy Prompt"}
              </button>
            </div>
          )}
          <p style={{fontSize:15,color:TAN,lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>Paste the full formatted output from your Claude session. All principles will be added at once.</p>
          <textarea value={pt} onChange={e=>{setPt(e.target.value);setParseError(false);}}
            placeholder={"PRINCIPLE: The vine has two axes working at once...\nCATEGORY: identity\nDATE: May 23, 2026\nCONTEXT: This came from a 4:30am session where...\nPATTERN: Over-reliance on personal framework\nSCRIPTURE: I am the vine; you are the branches.\nREF: John 15:5\n---\nPRINCIPLE: next principle here..."}
            rows={10}
            style={{width:"100%",padding:"12px",border:"1px solid "+(parseError?OX:TANL),background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.7,borderRadius:8,marginBottom:10}}/>
          {parseError&&<p style={{fontSize:15,color:OX,fontStyle:"italic",marginBottom:10}}>Nothing found — make sure the format matches, with PRINCIPLE: at the start of each block and --- between them.</p>}
          <button onClick={handleDeposit} disabled={!pt.trim()}
            style={{width:"100%",padding:"10px",background:"transparent",color:OX,border:"1px solid "+OX,cursor:pt.trim()?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8,opacity:pt.trim()?1:0.5}}>
            ✦ Add to Identity
          </button>
        </div>
      )}

      {/* Category filter strip */}
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:20,paddingBottom:2}}>
        <button onClick={()=>setAc("all")}
          style={{padding:"5px 12px",background:ac==="all"?INK:"transparent",color:ac==="all"?"white":TAN,border:"1px solid "+(ac==="all"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,whiteSpace:"nowrap",flexShrink:0}}>
          All ({library.length})
        </button>
        {LCATS.map(cat=>(
          <button key={cat.id} onClick={()=>setAc(cat.id)}
            style={{padding:"5px 12px",background:ac===cat.id?cat.color:"transparent",color:ac===cat.id?"white":TAN,border:"1px solid "+(ac===cat.id?cat.color:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,whiteSpace:"nowrap",flexShrink:0}}>
            {cat.icon} {cat.label} ({counts[cat.id]||0})
          </button>
        ))}
      </div>

      {/* Featured — latest deposit */}
      {latest&&ac==="all"&&(
        <div style={{marginBottom:20}}>
          <div style={{borderLeft:"3px solid "+OX,padding:"10px 16px",marginBottom:14,background:"rgba(122,31,31,0.07)"}}>
            <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:4,opacity:0.8}}>Latest Deposit</div>
            <p style={{fontStyle:"italic",fontSize:15,lineHeight:1.6,margin:0,color:INK,opacity:0.75}}>What the Holy Spirit deposited most recently.</p>
          </div>
          <div style={{background:"white",border:"1px solid "+latestCat.color+"40",borderTop:"4px solid "+latestCat.color,borderRadius:8,overflow:"hidden"}}>
            <div style={{padding:"13px 16px 0",display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:15,color:latestCat.color}}>{latestCat.icon}</span>
              <span style={{fontSize:12,color:latestCat.color,letterSpacing:"2px",textTransform:"uppercase"}}>{latestCat.label}</span>
              <span style={{marginLeft:"auto",fontSize:13,color:TANL}}>{latest.date}</span>
            </div>
            <div style={{padding:"11px 16px 10px"}}>
              <p style={{fontSize:15,lineHeight:1.75,color:INK,margin:0,fontStyle:"italic"}}>&ldquo;{latest.principle}&rdquo;</p>
            </div>
            <button onClick={()=>setExpanded(expanded===latest.id?null:latest.id)}
              style={{width:"100%",padding:"9px 16px",background:expanded===latest.id?latestCat.color+"10":"transparent",border:"none",borderTop:"1px solid "+latestCat.color+"25",color:latestCat.color,cursor:"pointer",fontFamily:BODY,fontSize:15,textAlign:"left",display:"flex",justifyContent:"space-between"}}>
              <span>{expanded===latest.id?"▲ Close":"↓ Full context + scripture"}</span>
              <span style={{fontSize:13,color:TANL,fontStyle:"italic"}}>tap to expand</span>
            </button>
            {expanded===latest.id&&(
              <div style={{padding:"16px",borderTop:"1px solid "+latestCat.color+"20",animation:"fadeIn 0.25s ease"}}>
                {latest.context&&<><div style={{fontSize:12,color:latestCat.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ In Your Words</div>
                <p style={{fontSize:15,lineHeight:1.8,color:INK,margin:"0 0 14px"}}>{latest.context}</p></>}
                {latest.pattern&&<div style={{fontSize:13,color:TAN,fontStyle:"italic",marginBottom:14}}>Pattern: {latest.pattern}</div>}
                {latest.tag&&<div style={{display:"inline-block",fontSize:13,color:latestCat.color,border:"1px solid "+latestCat.color+"50",borderRadius:12,padding:"3px 10px",marginBottom:14}}>#{latest.tag}</div>}
                {latest.scripture&&(
                  <div style={{borderLeft:"3px solid "+latestCat.color,padding:"10px 14px",background:latestCat.color+"08",marginBottom:14}}>
                    <p style={{fontStyle:"italic",fontSize:15,lineHeight:1.65,margin:0,color:INK}}>&ldquo;{latest.scripture}&rdquo;</p>
                    <p style={{color:GOLD,fontSize:13,margin:"6px 0 0"}}>{latest.scriptureRef}</p>
                  </div>
                )}
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>share(latest)}
                    style={{flex:1,padding:"9px",background:"transparent",border:"1px solid "+latestCat.color,color:latestCat.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
                    {copied===latest.id?"✓ Copied to clipboard":"↗ Share this principle"}
                  </button>
                  <button onClick={()=>{if(window.confirm("Delete this principle? This can't be undone."))deleteEntry(latest.id);}}
                    style={{padding:"9px 14px",background:"transparent",border:"1px solid "+TANL,color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* List */}
      {ac!=="all"&&<div style={{fontSize:13,fontFamily:BODY,fontWeight:600,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:12,opacity:0.8}}>✦ {LCATS.find(c=>c.id===ac)?.label||"Principles"}</div>}
      {ac==="all"&&library.length>1&&<div style={{fontSize:13,fontFamily:BODY,fontWeight:600,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:12,opacity:0.8}}>✦ All Principles</div>}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {listEntries.map(item=>{
          const cat=LCATS.find(c=>c.id===item.category)||LCATS[0];
          const isExp=expanded===item.id;
          return(
            <div key={item.id} style={{background:"white",border:"1px solid rgba(184,149,106,0.2)",borderLeft:"4px solid "+cat.color,borderRadius:10,overflow:"hidden",transition:"border-color 0.2s"}}>
              <div onClick={()=>setExpanded(isExp?null:item.id)} style={{padding:"14px 16px",cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <span style={{fontSize:13,fontFamily:BODY,fontWeight:600,color:cat.color,letterSpacing:"2px",textTransform:"uppercase"}}>{cat.icon} {cat.label}</span>
                  <span style={{marginLeft:"auto",fontSize:13,color:TAN,fontFamily:BODY,flexShrink:0}}>{item.date}</span>
                </div>
                <p style={{fontSize:15,lineHeight:1.7,color:INK,margin:"0 0 8px",fontStyle:"italic",fontFamily:SERIF}}>&ldquo;{item.principle}&rdquo;</p>
                <div style={{fontSize:13,color:isExp?cat.color:TAN,fontFamily:BODY,transition:"color 0.2s"}}>{isExp?"▲ Close":"▼ Full context + scripture"}</div>
              </div>
              {isExp&&(
                <div style={{padding:"0 16px 16px",borderTop:"1px solid "+cat.color+"20",animation:"fadeIn 0.25s ease"}}>
                  {item.context&&<><div style={{paddingTop:14,fontSize:13,fontFamily:BODY,fontWeight:600,color:cat.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ In Your Words</div>
                  <p style={{fontSize:15,lineHeight:1.8,color:"#2a3a4a",fontFamily:BODY,margin:"0 0 12px"}}>{item.context}</p></>}
                  {item.pattern&&<div style={{fontSize:15,color:TAN,fontStyle:"italic",fontFamily:BODY,marginBottom:12}}>Pattern: {item.pattern}</div>}
                  {item.tag&&<div style={{display:"inline-block",fontSize:13,color:cat.color,border:"1px solid "+cat.color+"50",borderRadius:12,padding:"3px 10px",marginBottom:12,fontFamily:BODY}}>#{item.tag}</div>}
                  {item.scripture&&(
                    <div style={{borderLeft:"3px solid "+cat.color,padding:"12px 14px",background:cat.color+"08",marginBottom:12,borderRadius:"0 6px 6px 0"}}>
                      <p style={{fontStyle:"italic",fontSize:15,lineHeight:1.7,margin:0,color:INK,fontFamily:SERIF}}>&ldquo;{item.scripture}&rdquo;</p>
                      <p style={{color:GOLD,fontSize:13,margin:"6px 0 0",fontFamily:BODY}}>{item.scriptureRef}</p>
                    </div>
                  )}
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>share(item)}
                      style={{flex:1,padding:"9px",background:"transparent",border:"1px solid "+cat.color,color:cat.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:6}}>
                      {copied===item.id?"✓ Copied to clipboard":"↗ Share this principle"}
                    </button>
                    <button onClick={()=>{if(window.confirm("Delete this principle? This can't be undone."))deleteEntry(item.id);}}
                      style={{padding:"9px 14px",background:"transparent",border:"1px solid "+TANL,color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:6}}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!listEntries.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic",fontFamily:BODY}}><div style={{fontSize:22,marginBottom:10}}>✦</div>No principles in this category yet.</div>}
      </div>
    </div>
  );
}

function FieldNotesTab({stack,setStack,history,cats,library,prayers,habits,streaks}){
  const [view,setView]=useState("today");
  const [joiceInputs,setJoeInputs]=useState(()=>{
    try{const s=JSON.parse(localStorage.getItem("sgm3-fieldnotes")||"{}");const tk=new Date().toISOString().slice(0,10);return s[tk]||{};}catch(e){return{};}
  });

  // Save joiceInputs to localStorage keyed by date whenever they change
  useEffect(()=>{
    try{
      const tk=new Date().toISOString().slice(0,10);
      const saved=JSON.parse(localStorage.getItem("sgm3-fieldnotes")||"{}");
      saved[tk]=joiceInputs;
      localStorage.setItem("sgm3-fieldnotes",JSON.stringify(saved));
    }catch(e){}
  },[joiceInputs]);
  const [copied,setCopied]=useState(false);
  const today=new Date().toISOString().slice(0,10);
  const tk=today;
  const todayHabits=habits[tk]||{};

  // Pattern surfacing — find recurring categories in library and stack
  function getPatterns(){
    const catCounts={};
    library.forEach(p=>{catCounts[p.category]=(catCounts[p.category]||0)+1;});
    const topCat=Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0];
    const patterns=library.map(p=>p.pattern).filter(Boolean);
    const patternCounts={};
    patterns.forEach(p=>{patternCounts[p]=(patternCounts[p]||0)+1;});
    const topPattern=Object.entries(patternCounts).sort((a,b)=>b[1]-a[1])[0];
    return{topCat,topPattern};
  }

  // Group history by date
  function getRecentDays(){
    const days={};
    history.forEach(item=>{
      if(!days[item.date])days[item.date]=[];
      days[item.date].push(item);
    });
    return Object.entries(days).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,14);
  }

  // Notion export — two layer format
  function buildNotionExport(){
    const now=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
    const L=[];
    L.push("FIELD NOTE — "+now);
    L.push("========================================");
    L.push("");
    L.push("THE STACK");
    L.push("----------------------------------------");
    if(stack.length){
      stack.forEach(w=>L.push("• "+w.label+(w.duration?" ["+w.duration+"]":"")+" ("+w.time+")"));
    }else{
      L.push("No stack entries today.");
    }
    if(joiceInputs.stack){L.push("");L.push("In Joe's Words: "+joiceInputs.stack);}
    L.push("");
    L.push("COMPLETIONS");
    L.push("----------------------------------------");
    const todayHistory=history.filter(h=>h.date===today);
    if(todayHistory.length){
      todayHistory.forEach(h=>L.push("✓ "+h.task+" ["+h.category+"]"));
    }else{
      L.push("No completions logged today.");
    }
    if(joiceInputs.completions){L.push("");L.push("In Joe's Words: "+joiceInputs.completions);}
    L.push("");
    L.push("HABIT SNAPSHOT");
    L.push("----------------------------------------");
    const habitDone=Object.values(todayHabits).filter(Boolean).length;
    L.push("Completed: "+habitDone+" habits today");
    if(joiceInputs.habits){L.push("");L.push("In Joe's Words: "+joiceInputs.habits);}
    L.push("");
    L.push("PATTERN FLAG");
    L.push("----------------------------------------");
    const {topCat,topPattern}=getPatterns();
    if(topCat)L.push("Most active area: "+topCat[0]+" ("+topCat[1]+" Library entries)");
    if(topPattern)L.push("Recurring pattern: "+topPattern[0]+" ("+topPattern[1]+"x)");
    if(joiceInputs.pattern){L.push("");L.push("In Joe's Words: "+joiceInputs.pattern);}
    L.push("");
    L.push("FIELD NOTE");
    L.push("----------------------------------------");
    if(joiceInputs.fieldnote){L.push(joiceInputs.fieldnote);}else{L.push("(No field note written today)");}
    L.push("");
    L.push("========================================");
    L.push("End of Field Note — Paste into Kingdom Notebook > Archive");
    return L.join("\n");
  }

  const {topCat,topPattern}=getPatterns();
  const recentDays=getRecentDays();

  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      {/* Header with view toggle */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <SL>Field Notes</SL>
        <div style={{display:"flex",gap:6}}>
          {["today","recent","archive"].map(v=>(
            <button key={v} onClick={()=>setView(v)}
              style={{padding:"4px 10px",background:view===v?INK:"transparent",color:view===v?"white":TAN,border:"1px solid "+(view===v?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,textTransform:"capitalize"}}>
              {v==="archive"?"Archive":v==="recent"?"Recent":"Today"}
            </button>
          ))}
        </div>
      </div>

      {/* TODAY VIEW */}
      {view==="today"&&(
        <div>
          {/* The Stack */}
          <StackSection stack={stack} setStack={setStack}/>

          {/* In Joe's Words — Stack */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:12,color:GOLD,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.8}}>✦ In Joe's Words — The Stack</div>
            <textarea value={joiceInputs.stack||""} onChange={e=>setJoeInputs(p=>({...p,stack:e.target.value}))}
              placeholder="How did today's stack feel? What surprised you? What was harder than expected?"
              rows={3} style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8}}/>
          </div>

          {/* Completions */}
          <div style={{marginBottom:16}}>
            <SL>Completions Today</SL>
            {history.filter(h=>h.date===today).length===0
              ?<p style={{fontStyle:"italic",color:TAN,fontSize:13}}>Complete a project task and it will appear here.</p>
              :history.filter(h=>h.date===today).map(item=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+item.categoryColor,borderRadius:8,marginBottom:6}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:item.categoryColor,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"white",fontSize:11}}>✓</span></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,color:INK}}>{item.task}</div>
                    <div style={{fontSize:13,color:TAN,marginTop:2}}>{item.category}</div>
                  </div>
                </div>
              ))
            }
            <textarea value={joiceInputs.completions||""} onChange={e=>setJoeInputs(p=>({...p,completions:e.target.value}))}
              placeholder="In Joe's Words — what's worth noting about today's completions?"
              rows={2} style={{width:"100%",marginTop:8,padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8}}/>
          </div>

          {/* Pattern flag */}
          {(topCat||topPattern)&&(
            <div style={{marginBottom:16,padding:"14px 16px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+GOLD,borderRadius:8}}>
              <div style={{fontSize:12,color:GOLD,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8,opacity:0.8}}>✦ Pattern Surfacing</div>
              {topCat&&<p style={{fontSize:15,color:INK,margin:"0 0 4px"}}>Most active area: <strong>{topCat[0]}</strong> ({topCat[1]} Library entries)</p>}
              {topPattern&&<p style={{fontSize:15,color:INK,margin:0}}>Recurring pattern: <strong>{topPattern[0]}</strong> ({topPattern[1]}×)</p>}
              <textarea value={joiceInputs.pattern||""} onChange={e=>setJoeInputs(p=>({...p,pattern:e.target.value}))}
                placeholder="In Joe's Words — what do you make of this pattern?"
                rows={2} style={{width:"100%",marginTop:10,padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8}}/>
            </div>
          )}

          {/* Field Note — free voice entry */}
          <div style={{marginBottom:20}}>
            <SL>Today's Field Note</SL>
            <textarea value={joiceInputs.fieldnote||""} onChange={e=>setJoeInputs(p=>({...p,fieldnote:e.target.value}))}
              placeholder="One honest paragraph about today. What God is doing. What you're carrying. What you want to remember."
              rows={5} style={{width:"100%",padding:"12px 14px",border:"1px solid "+OX+"40",background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.75,borderRadius:8}}/>
          </div>

          {/* Copy to Notion */}
          <button onClick={()=>navigator.clipboard?.writeText(buildNotionExport()).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);})}
            style={{width:"100%",padding:"12px",background:copied?GRN:INK,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"background 0.3s",marginBottom:6}}>
            {copied?"✓ Copied to Clipboard — Paste into Notion":"Copy Field Note → Paste into Notion"}
          </button>
          <p style={{fontSize:13,color:TAN,fontStyle:"italic",textAlign:"center",margin:0}}>Paste into Kingdom Notebook → Archive in Notion</p>
        </div>
      )}

      {/* RECENT VIEW — last 14 days */}
      {view==="recent"&&(
        <div>
          <p style={{fontStyle:"italic",color:TAN,fontSize:15,marginBottom:16,lineHeight:1.65}}>Last 14 days — patterns emerge when you look back.</p>
          {!recentDays.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>Complete tasks and they'll appear here.</div>}
          {recentDays.map(([date,items])=>(
            <div key={date} style={{marginBottom:12}}>
              <div style={{fontSize:13,color:GOLD,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>
                {new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
              </div>
              {items.map(item=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+item.categoryColor,borderRadius:8,marginBottom:4}}>
                  <div style={{fontSize:15,color:INK,flex:1}}>{item.task}</div>
                  <div style={{fontSize:13,color:TAN,flexShrink:0}}>{item.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ARCHIVE VIEW */}
      {view==="archive"&&(
        <div>
          <p style={{fontStyle:"italic",color:TAN,fontSize:15,marginBottom:16,lineHeight:1.65}}>Everything logged — searchable record of your growth.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
            {[["Completions",history.length],["Principles",library.length],["Prayers",prayers.filter(p=>p.answered).length]].map(([label,val])=>(
              <div key={label} style={{padding:"12px 8px",background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:8,textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:"bold",color:INK}}>{val}</div>
                <div style={{fontSize:12,color:TAN,textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
          {history.length===0
            ?<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>Your record builds as you complete tasks.</div>
            :history.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+item.categoryColor,borderRadius:8,marginBottom:5}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:item.categoryColor,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"white",fontSize:10}}>✓</span></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,color:INK}}>{item.task}</div>
                  <div style={{fontSize:13,color:TAN,marginTop:1}}>{item.category} · {item.date}</div>
                </div>
                <RDot level={item.resistance}/>
              </div>
            ))
          }
        </div>
      )}

      {/* SGM Guides — moved here from Shelf */}
      <GuidesSection/>
    </div>
  );
}

function ArchiveTab({cats,library,prayers,habits,streaks,history,shelf,letstalk,checkIns,lastArchivedAt,setLastArchivedAt}){
  const [copied,setCopied]=useState(false);
  const [showFull,setShowFull]=useState(false);
  const now=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const nowISO=new Date().toISOString();
  const lastDate=lastArchivedAt?new Date(lastArchivedAt):null;

  function idTime(id){
    // Extract a timestamp from common id shapes used across the app
    if(typeof id==="number")return id;
    if(typeof id==="string"){
      const m=id.match(/(\d{10,})/);
      if(m)return parseInt(m[1]);
    }
    return null;
  }

  function isNew(item){
    if(!lastArchivedAt)return true; // first ever archive — everything is "new"
    const t=idTime(item.id);
    if(t)return t>lastArchivedAt;
    if(item.date){
      const dt=new Date(item.date).getTime();
      if(!isNaN(dt))return dt>=new Date(lastDate.toDateString()).getTime();
    }
    return false;
  }

  function genSection(forceFull){
    const L=[];
    const filt=(arr)=>forceFull?arr:(arr||[]).filter(isNew);
    const tag=(date,type,content)=>`[${date}] [${type}] ${content}`;

    // Check In
    const newCheckIns=filt(checkIns||[]);
    if(newCheckIns.length){
      L.push("## CHECK IN");
      newCheckIns.forEach(c=>{
        L.push(tag(c.date,"CHECK IN",c.input));
        if(c.loop)L.push(`  Loop: ${c.loop}`);
        if(c.call)L.push(`  Call: ${c.call}`);
      });
      L.push("");
    }

    // Field Notes — read from localStorage keyed by date
    try{
      const allNotes=JSON.parse(localStorage.getItem("sgm3-fieldnotes")||"{}");
      const noteEntries=Object.entries(allNotes).sort((a,b)=>b[0].localeCompare(a[0]));
      const newNotes=forceFull?noteEntries:noteEntries.filter(([date])=>{
        if(!lastArchivedAt)return true;
        return new Date(date).getTime()>=new Date(new Date(lastArchivedAt).toDateString()).getTime();
      });
      if(newNotes.length){
        L.push("## FIELD NOTES");
        newNotes.forEach(([date,note])=>{
          if(note.fieldnote)L.push(tag(date,"FIELD NOTE",note.fieldnote));
          if(note.stack)L.push(tag(date,"FIELD NOTE — STACK",note.stack));
          if(note.pattern)L.push(tag(date,"FIELD NOTE — PATTERN",note.pattern));
        });
        L.push("");
      }
    }catch(e){}

    // Bible Study — read from localStorage
    try{
      const allStudy=JSON.parse(localStorage.getItem("sgm3-bible-study")||"{}");
      const studyEntries=Object.entries(allStudy).sort((a,b)=>b[0].localeCompare(a[0]));
      const newStudy=forceFull?studyEntries:studyEntries.filter(([date])=>{
        if(!lastArchivedAt)return true;
        return new Date(date).getTime()>=new Date(new Date(lastArchivedAt).toDateString()).getTime();
      });
      if(newStudy.length){
        L.push("## BIBLE STUDY");
        newStudy.forEach(([date,s])=>{
          if(s.ref)L.push(tag(date,"BIBLE STUDY",s.ref));
          if(s.prayer)L.push(`  Prayer: ${s.prayer}`);
          if(s.observation)L.push(`  Observation: ${s.observation}`);
        });
        L.push("");
      }
    }catch(e){}

    // Tasks completed
    const newCompletions=filt(history);
    if(newCompletions.length){
      L.push("## TASKS COMPLETED");
      newCompletions.forEach(h=>L.push(tag(h.date,"TASK",`${h.task} (${h.category})`)));
      L.push("");
    }

    // Prayers
    const newPrayers=filt(prayers.filter(p=>!p.answered));
    const newAnswered=filt(prayers.filter(p=>p.answered));
    if(newPrayers.length){
      L.push("## PRAYERS");
      newPrayers.forEach(p=>L.push(tag(p.dateAdded||"—","PRAYER",`${p.name} (${p.relationship}) — ${p.request}`)));
      L.push("");
    }
    if(newAnswered.length){
      L.push("## ANSWERED PRAYERS");
      newAnswered.forEach(p=>L.push(tag(p.answeredDate||"—","ANSWERED",`${p.name} — ${p.request}`)));
      L.push("");
    }

    // Identity deposits
    const newLib=filt(library);
    if(newLib.length){
      L.push("## IDENTITY DEPOSITS");
      newLib.forEach(p=>L.push(tag(p.date,"IDENTITY: "+p.category.toUpperCase(),p.principle+(p.scripture?` — "${p.scripture}" ${p.scriptureRef||""}`:""))));
      L.push("");
    }

    // Shelf
    const newShelf=filt(shelf||[]);
    if(newShelf.length){
      L.push("## SHELF");
      newShelf.forEach(s=>L.push(tag(s.dateAdded||"—","SHELF",`${s.label} (${s.timeframe})`)));
      L.push("");
    }

    // Let's Talk
    const lt=letstalk||[];
    const ltNew=filt(lt);
    if(ltNew.length){
      L.push("## LET'S TALK");
      ltNew.forEach(c=>{
        const sectionLabel=c.section==="deeper"?"GOING DEEPER":c.section==="people"?"PEOPLE I KNOW":(LT_SECTIONS.find(s=>s.id===c.section)?.label||c.section).toUpperCase();
        L.push(tag(c.date,`LET'S TALK: ${sectionLabel}`,c.topic));
        if(c.position)L.push(`  Position: ${c.position}`);
        if(c.wiring)L.push(`  Wiring: ${c.wiring}`);
        if(c.friction)L.push(`  Friction: ${c.friction}`);
        if(c.bestway)L.push(`  How to love well: ${c.bestway}`);
        if(c.insight)L.push(`  Insight: ${c.insight}`);
        if(c.scripture)L.push(`  Scripture: ${c.scripture}`);
        if(c.inwords)L.push(`  In Joe's Words: ${c.inwords}`);
      });
      L.push("");
    }

    // People I Know conversation logs
    const peopleCards=lt.filter(c=>c.section==="people"&&c.conversationLog?.length);
    const newLogLines=[];
    peopleCards.forEach(card=>{
      const newEntries=forceFull?card.conversationLog:card.conversationLog.filter(e=>{
        const t=idTime(e.id);
        return t?t>lastArchivedAt:false;
      });
      newEntries.forEach(e=>{
        newLogLines.push(tag(e.date,`PEOPLE: ${card.topic}`,`(${e.tone}) ${e.notes}`));
      });
    });
    if(newLogLines.length){
      L.push("## PEOPLE I KNOW — CONVERSATIONS");
      newLogLines.forEach(l=>L.push(l));
      L.push("");
    }

    // Habits — full snapshot only
    if(forceFull){
      const tk2=new Date().toISOString().slice(0,10);
      const th=habits[tk2]||{};
      L.push("## HABITS (current snapshot)");
      L.push(tag(tk2,"HABITS",Object.values(th).filter(Boolean).length+" completed today"));
      Object.entries(streaks).forEach(([id,s])=>{if(s.count>1)L.push(`  ${id}: ${s.count} day streak`);});
      L.push("");
    }

    return L;
  }

  function gen(forceFull){
    const L=[];
    const now2=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
    L.push("# SGM LIFE ORIENTATION — "+(forceFull?"FULL SNAPSHOT":"ARCHIVE"));
    L.push(`Generated: ${now2}`);
    if(!forceFull&&lastDate)L.push(`New since: ${lastDate.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"})}`);
    L.push("================================================");
    L.push("Search tip: use [TYPE] keywords e.g. [IDENTITY] [CHECK IN] [PRAYER] [PEOPLE: Name]");
    L.push("");
    const body=genSection(forceFull);
    if(!body.length){
      L.push("Nothing new since your last archive.");
    }else{
      L.push(...body);
    }
    L.push("================================================");
    L.push("End of Archive — Paste into Kingdom Notebook > SGM Daily Archive");
    return L.join("\n");
  }

  const newBody=genSection(false);
  const hasNew=newBody.length>0;

  function handleCopy(){
    navigator.clipboard.writeText(gen(showFull)).then(()=>{
      setCopied(true);
      if(!showFull)setLastArchivedAt(Date.now());
      setTimeout(()=>setCopied(false),2500);
    });
  }

  const taskCount=cats.flatMap(c=>c.tasks).length;
  const doneCount=cats.flatMap(c=>c.tasks).filter(t=>t.done).length;

  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      <SL>Archive</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,lineHeight:1.65,marginBottom:10}}>Your running backup. Copy what's new and paste into your Kingdom Notebook. Nothing is lost even if you skip a night — it just waits here until you copy it.</p>
      <p style={{fontSize:13,color:TAN,marginBottom:20}}>{lastArchivedAt?"Last archived: "+new Date(lastArchivedAt).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"Never archived yet — everything below is new."}</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
        {[["Tasks",doneCount+"/"+taskCount],["Prayers",prayers.filter(p=>!p.answered).length],["Answered",prayers.filter(p=>p.answered).length],["Principles",library.length],["Shelf",(shelf||[]).length],["Let's Talk",(letstalk||[]).length],["Check Ins",(checkIns||[]).length]].map(([label,val])=>(
          <div key={label} style={{padding:"12px",background:"white",border:"1px solid rgba(184,149,106,0.22)",borderRadius:8,textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:"bold",color:INK,letterSpacing:"-0.5px"}}>{val}</div>
            <div style={{fontSize:13,color:TAN,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:16}}>
        <button onClick={()=>setShowFull(false)} style={{flex:1,padding:"7px",background:!showFull?INK:"transparent",color:!showFull?"white":TAN,border:"1px solid "+(!showFull?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          New Since Last Time {hasNew?"":"(none)"}
        </button>
        <button onClick={()=>setShowFull(true)} style={{flex:1,padding:"7px",background:showFull?INK:"transparent",color:showFull?"white":TAN,border:"1px solid "+(showFull?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          Full Snapshot
        </button>
      </div>

      <button onClick={handleCopy} disabled={!showFull&&!hasNew}
        style={{width:"100%",marginBottom:10,padding:"12px",background:copied?GRN:((!showFull&&!hasNew)?"rgba(26,46,74,0.2)":INK),color:"white",border:"none",cursor:(!showFull&&!hasNew)?"default":"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"background 0.3s"}}>
        {copied?"check Copied to Clipboard":showFull?"Copy Full Snapshot":"Copy New Entries"}
      </button>
      {!showFull&&(
        <p style={{fontSize:13,color:TAN,fontStyle:"italic",marginBottom:20,textAlign:"center"}}>Copying resets the "new since" marker to now. Full Snapshot never resets it.</p>
      )}
      {showFull&&<div style={{marginBottom:20}}/>}

      <SL>Preview</SL>
      <div style={{background:"rgba(255,255,255,0.4)",border:"1px solid "+FINK,borderRadius:8,padding:"14px 16px",maxHeight:320,overflowY:"auto"}}>
        <pre style={{fontSize:13,color:INK,lineHeight:1.7,margin:0,whiteSpace:"pre-wrap",fontFamily:BODY}}>{gen(showFull)}</pre>
      </div>
    </div>
  );
}

const SGM_GUIDES = [
  {
    id:"rtb",
    label:"Root, Trunk & Branch",
    abbr:"RTB",
    color:OX,
    desc:"A personal framework for understanding how you're built — the roots that feed you, the trunk that holds you, and the branches that extend into the world.",
    prompt:`You are generating a personal formation framework for Joe Steen using the Root, Trunk & Branch model.\n\nROOT = What feeds you at the source level. Spiritual inputs, anchor relationships, foundational truths that hold everything up.\nTRUNK = Core identity, character, and values. Who you are when no one's watching. The load-bearing center.\nBRANCH = Where you extend into the world — ministry, family, work, influence. What grows from who you are.\n\nGenerate Joe's RTB as a structured HTML-style text output:\n\nROOT\n• [3-4 roots Joe draws from — his faith, his sobriety, his anchor verse Proverbs 3:5-6, his family]\n\nTRUNK\n• [3-4 core identity statements about Joe — empath, systems thinker, discipler, 20 years sober, visual learner]\n\nBRANCH\n• [3-4 active branches — SGM, Celebrate Recovery, family/dad season, discipleship relationships]\n\nClose with one sentence in Joe's voice about what this framework means for how he lives right now.\n\nHonest. Plain English. No filler. Written as if Joe is reading his own map.`
  },
  {
    id:"idf",
    label:"Internal Deployment Framework",
    abbr:"IDF",
    color:GOLD,
    desc:"How you deploy your internal resources — capacity, energy, attention, and care — across the areas of your life that matter most.",
    prompt:`You are generating a personal framework for Joe Steen called the Internal Deployment Framework (IDF).\n\nThe IDF maps how Joe deploys his internal resources — emotional capacity, mental energy, spiritual attention, and relational care — across his life.\n\nJoe's context: stay-at-home dad (youngest Xenya born Dec 2024), founder of SGM, leads Celebrate Recovery at City Church, 20 years sober, wife Shawn runs Imprint Pediatric Therapy. Anchor verse Proverbs 3:5-6. Visual learner, natural empath, systems thinker.\n\nGenerate his IDF across these deployment zones:\n\nSPIRITUAL DEPLOYMENT\n• How Joe's faith and spiritual formation resources get deployed day to day\n\nFAMILY DEPLOYMENT\n• How Joe shows up for Shawn, the kids, and the home in this season\n\nMINISTRY DEPLOYMENT\n• SGM and Celebrate Recovery — where and how he extends outward\n\nCAPACITY MANAGEMENT\n• What threatens his capacity and what restores it — honest, specific\n\nANCHOR\n• One sentence on what holds the whole deployment together\n\nHonest, plain English, written in Joe's voice. No filler. No self-help language.`
  },
  {
    id:"glf",
    label:"Ground Level Framework",
    abbr:"GLF",
    color:"#2E6B8A",
    desc:"A street-level map of where you actually are right now — not the vision, not the goals, but the honest ground-floor reality of this season.",
    prompt:`You are generating a personal framework for Joe Steen called the Ground Level Framework (GLF).\n\nThe GLF is not about vision or goals. It is an honest street-level map of where Joe actually is right now — the real terrain of this season.\n\nJoe's context: stay-at-home dad (youngest Xenya born Dec 2024, plus two older kids), founder of SGM (building in the margins), leads Celebrate Recovery at City Church, 20 years sober, wife Shawn runs Imprint Pediatric Therapy. Anchor verse Proverbs 3:5-6.\n\nGenerate the GLF across these ground-level categories:\n\nWHERE I AM NOW\n• The honest 2-3 sentence summary of this life season — no spin\n\nWHAT'S WORKING\n• 2-3 real things that are actually working in Joe's life right now\n\nWHAT'S OPEN\n• 2-3 honest open loops or unresolved things Joe is carrying\n\nWHAT I KNOW TO BE TRUE\n• 2-3 settled convictions Joe holds that don't change regardless of circumstances\n\nWHAT'S NEXT AT GROUND LEVEL\n• The one next right step — not the plan, just the next thing\n\nHonest, plain English, first-person where it fits. No filler. No self-help language. Written like Joe is looking at a map of his own terrain.`
  },
];

function ShelfSection({shelf,setShelf,cats,setCats}){
  const [input,setInput]=useState("");
  const [timeframe,setTimeframe]=useState("week");
  const [filter,setFilter]=useState("all");
  const [promotingId,setPromotingId]=useState(null);

  function quickAdd(){
    if(!input.trim())return;
    const item={id:"sh"+Date.now(),label:input.trim(),timeframe,dateAdded:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),promoted:false};
    setShelf(p=>[item,...p]);
    setInput("");
  }

  function promoteToCat(item,catId){
    const cat=cats.find(c=>c.id===catId);
    if(!cat)return;
    setCats(prev=>prev.map(c=>c.id!==catId?c:{...c,tasks:[...c.tasks,{id:"shelf"+Date.now(),label:item.label,resistance:"low",roadblocks:[],roadblock:null,done:false,steps:[]}]}));
    setShelf(p=>p.filter(s=>s.id!==item.id));
    setPromotingId(null);
  }

  function remove(id){
    setShelf(p=>p.filter(s=>s.id!==id));
  }

  function changeTimeframe(id,tf){
    setShelf(p=>p.map(s=>s.id===id?{...s,timeframe:tf}:s));
  }

  const filtered=filter==="all"?shelf:shelf.filter(s=>s.timeframe===filter);

  return(
    <div style={{marginTop:32}}>
      <div style={{height:1,background:FINK,marginBottom:24}}/>
      <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>✦ The Shelf</div>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,lineHeight:1.65,marginBottom:16}}>Out of your head. Not today. Not forgotten.</p>

      {/* Quick capture */}
      <div style={{marginBottom:24,background:"white",border:"1px solid "+FINK,borderRadius:8,padding:"14px 14px 12px"}}>
        <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>✦ Quick Capture</div>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&quickAdd()}
          placeholder="What needs to get done..."
          style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8,marginBottom:10}}
        />
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {SHELF_TIMEFRAMES.map(tf=>(
            <button key={tf.id} onClick={()=>setTimeframe(tf.id)}
              style={{flex:1,padding:"7px 4px",background:timeframe===tf.id?tf.color:"transparent",border:"1px solid "+(timeframe===tf.id?tf.color:TANL),color:timeframe===tf.id?"white":TAN,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,transition:"all 0.2s"}}>
              {tf.label}
            </button>
          ))}
        </div>
        <button onClick={quickAdd} style={{width:"100%",padding:"9px",background:"transparent",color:INK,border:"1px solid "+INK,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
          + Add to Shelf
        </button>
      </div>

      {/* Filter */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        <button onClick={()=>setFilter("all")} style={{padding:"5px 12px",background:filter==="all"?INK:"transparent",color:filter==="all"?"white":TAN,border:"1px solid "+(filter==="all"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          All ({shelf.length})
        </button>
        {SHELF_TIMEFRAMES.map(tf=>(
          <button key={tf.id} onClick={()=>setFilter(tf.id)} style={{padding:"5px 12px",background:filter===tf.id?tf.color:"transparent",color:filter===tf.id?"white":TAN,border:"1px solid "+(filter===tf.id?tf.color:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
            {tf.label} ({shelf.filter(s=>s.timeframe===tf.id).length})
          </button>
        ))}
      </div>

      {/* Items */}
      {!filtered.length&&(
        <div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>
          <div style={{fontSize:22,marginBottom:10}}>⊡</div>
          Shelf is clear. Capture something to get it out of your head.
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {SHELF_TIMEFRAMES.filter(tf=>filter==="all"?true:tf.id===filter).map(tf=>{
          const items=filtered.filter(s=>s.timeframe===tf.id);
          if(!items.length)return null;
          return(
            <div key={tf.id} style={{marginBottom:8}}>
              {filter==="all"&&<div style={{fontSize:12,color:tf.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>✦ {tf.label}</div>}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {items.map(item=>(
                  <div key={item.id} style={{padding:"11px 14px",background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+tf.color,borderRadius:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,color:INK,lineHeight:1.4}}>{item.label}</div>
                        <div style={{fontSize:13,color:TAN,marginTop:3}}>{item.dateAdded}</div>
                      </div>
                      <div style={{display:"flex",gap:6,flexShrink:0}}>
                        <select value={item.timeframe} onChange={e=>changeTimeframe(item.id,e.target.value)}
                          style={{padding:"3px 6px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:13,color:TAN,outline:"none",borderRadius:8,cursor:"pointer"}}>
                          {SHELF_TIMEFRAMES.map(tf=><option key={tf.id} value={tf.id}>{tf.label}</option>)}
                        </select>
                        <button onClick={()=>setPromotingId(promotingId===item.id?null:item.id)}
                          style={{padding:"4px 8px",background:promotingId===item.id?OX:"transparent",color:promotingId===item.id?"white":OX,border:"1px solid "+OX,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8,whiteSpace:"nowrap"}}>
                          → Project
                        </button>
                        <button onClick={()=>remove(item.id)}
                          style={{padding:"4px 8px",background:"transparent",color:TANL,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                          ×
                        </button>
                      </div>
                    </div>
                    {promotingId===item.id&&(
                      <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid "+FINK}}>
                        <div style={{fontSize:13,color:TAN,fontStyle:"italic",marginBottom:8}}>Move to which category?</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {cats.map(cat=>(
                            <button key={cat.id} onClick={()=>promoteToCat(item,cat.id)}
                              style={{padding:"5px 10px",background:"transparent",color:cat.color,border:"1px solid "+cat.color,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                              {cat.icon} {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GuidesSection(){
  const [activeGuide,setActiveGuide]=useState(null);
  const [guideResult,setGuideResult]=useState({});
  const [guideLoading,setGuideLoading]=useState({});
  const [copiedGuide,setCopiedGuide]=useState(null);

  async function generateGuide(guide){
    if(guideLoading[guide.id])return;
    setGuideLoading(p=>({...p,[guide.id]:true}));
    setGuideResult(p=>({...p,[guide.id]:null}));
    try{
      const text=await claudeAPI(guide.prompt,1000);
      setGuideResult(p=>({...p,[guide.id]:text}));
    }catch(e){
      setGuideResult(p=>({...p,[guide.id]:"Couldn't reach Claude right now. Try again in a moment."}));
    }
    setGuideLoading(p=>({...p,[guide.id]:false}));
  }

  function copyGuide(guide){
    const text=guideResult[guide.id];
    if(!text)return;
    navigator.clipboard?.writeText(guide.label+"\n\n"+text).then(()=>{setCopiedGuide(guide.id);setTimeout(()=>setCopiedGuide(null),2000);});
  }

  return(
    <div style={{marginTop:32}}>
      <div style={{height:1,background:FINK,marginBottom:24}}/>
      <div style={{fontSize:12,color:GOLD,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.9}}>✦ SGM Guides</div>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,lineHeight:1.65,marginBottom:16}}>Personal orientation frameworks. Tap to generate or review.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SGM_GUIDES.map(guide=>{
          const isOpen=activeGuide===guide.id;
          const result=guideResult[guide.id];
          const loading=guideLoading[guide.id];
          return(
            <div key={guide.id} style={{background:"white",border:"1px solid rgba(184,149,106,0.22)",borderLeft:"3px solid "+guide.color,borderRadius:10,overflow:"hidden"}}>
              <div onClick={()=>setActiveGuide(isOpen?null:guide.id)}
                style={{padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:guide.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:3,opacity:0.85}}>{guide.abbr}</div>
                  <div style={{fontSize:16,color:INK,fontWeight:"bold",fontFamily:SERIF,marginBottom:2}}>{guide.label}</div>
                  <div style={{fontSize:14,color:TAN,lineHeight:1.5,fontStyle:"italic"}}>{guide.desc}</div>
                </div>
                <span style={{color:guide.color,fontSize:16,flexShrink:0}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div style={{borderTop:"1px solid "+FINK,padding:"14px 16px 16px",animation:"fadeIn 0.25s ease"}}>
                  {!result&&!loading&&(
                    <button onClick={()=>generateGuide(guide)}
                      style={{width:"100%",padding:"11px",background:"transparent",border:"1px solid "+guide.color,color:guide.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
                      Generate {guide.abbr}
                    </button>
                  )}
                  {loading&&(
                    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0"}}>
                      <div style={{width:16,height:16,border:"2px solid "+guide.color,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                      <span style={{fontSize:15,color:TAN,fontStyle:"italic"}}>Building your {guide.abbr}...</span>
                    </div>
                  )}
                  {result&&!loading&&(
                    <div>
                      <p style={{fontSize:15,lineHeight:1.9,color:INK,margin:"0 0 16px",whiteSpace:"pre-wrap"}}>{result}</p>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>copyGuide(guide)}
                          style={{flex:1,padding:"9px",background:copiedGuide===guide.id?GRN:"transparent",color:copiedGuide===guide.id?"white":guide.color,border:"1px solid "+(copiedGuide===guide.id?GRN:guide.color),cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"all 0.2s"}}>
                          {copiedGuide===guide.id?"Copied":"Copy"}
                        </button>
                        <button onClick={()=>generateGuide(guide)}
                          style={{padding:"9px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const WORD_CATS=[
  {id:"warfare",label:"Warfare",icon:"⚑",color:OX},
  {id:"identity",label:"Identity",icon:"♡",color:"#7A4F6A"},
  {id:"rest",label:"Rest",icon:"◈",color:"#2E5B8A"},
  {id:"faith",label:"Faith",icon:"◎",color:GRN},
  {id:"surrender",label:"Surrender",icon:"✦",color:GOLD},
  {id:"relationships",label:"Relationships",icon:"⊕",color:"#B8700A"},
  {id:"purpose",label:"Purpose",icon:"◉",color:CYAN},
];

// Migrate legacy SCVS roadblock verses into the new unified pool
const SCVS_MIGRATED=[
  {id:"scvs-shame",verse:"There is now no condemnation for those who are in Christ Jesus.",ref:"Romans 8:1",category:"warfare",note:"The shutdown command for condemnation. Present tense — already decided."},
  {id:"scvs-unknown",verse:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",ref:"Proverbs 3:5-6",category:"identity",note:"The verse for every moment of over-reliance on your own understanding. The pathway verse."},
  {id:"scvs-scarcity",verse:"My God will meet all your needs according to the riches of his glory in Christ Jesus.",ref:"Philippians 4:19",category:"faith",note:"For the scarcity mindset. Not some needs — all needs. His riches, not yours."},
  {id:"scvs-procrastination",verse:"Whatever you do, work at it with all your heart, as working for the Lord.",ref:"Colossians 3:23",category:"purpose",note:"Reframes any task as an act of worship. Changes who you're working for."},
  {id:"scvs-time",verse:"Teach us to number our days, that we may gain a heart of wisdom.",ref:"Psalm 90:12",category:"surrender",note:"For seasons of feeling like time is running out. Wisdom starts with acknowledging it's finite."},
  {id:"scvs-perfectionism",verse:"She is clothed with strength and dignity; she can laugh at the days to come.",ref:"Proverbs 31:25",category:"identity",note:"Perfectionism is fear of the future. This verse laughs at it."},
];

function WordTab(){
  const [userVerses,setUserVerses]=useState(()=>{try{return JSON.parse(localStorage.getItem("sgm3-manual-verses")||"[]");}catch(e){return[];}});
  const [mode,setMode]=useState("browse"); // browse | category
  const [activeCat,setActiveCat]=useState("all");
  const [expandedId,setExpandedId]=useState(null);
  const [addOpen,setAddOpen]=useState(false);
  const [addInput,setAddInput]=useState("");
  const [addLoading,setAddLoading]=useState(false);
  const [builtCard,setBuiltCard]=useState(null);
  const [editingNote,setEditingNote]=useState({});
  const [copied,setCopied]=useState(null);

  // Unified verse pool — migrated SCVS + user verses
  const allVerses=[...SCVS_MIGRATED,...userVerses];

  function saveVerses(updated){
    setUserVerses(updated);
    localStorage.setItem("sgm3-manual-verses",JSON.stringify(updated));
  }

  async function buildCard(){
    if(!addInput.trim())return;
    setAddLoading(true);setBuiltCard(null);
    const prompt=`You are helping Joe Steen add a verse to his personal scripture library. He is a stay-at-home dad, founder of SGM, 20 years sober, leads Celebrate Recovery. His anchor verse is Proverbs 3:5-6.\n\nHe typed: "${addInput}"\n\nDo the following:\n1. Identify the full verse text if he only gave a reference, or confirm the text if he gave it\n2. Confirm the exact reference (book chapter:verse)\n3. Assign ONE category from this list: warfare, identity, rest, faith, surrender, relationships, purpose\n4. Write a SHORT honest note (1-2 sentences max) about what this verse speaks to — in plain English, from Joe's perspective, not generic\n\nRespond ONLY in this exact format, nothing else:\nVERSE: [full verse text, no quotes]\nREF: [Book chapter:verse]\nCATEGORY: [one word from the list]\nNOTE: [1-2 sentence note]`;
    try{
      const result=await claudeAPI(prompt,300);
      const get=(key)=>{const m=result.match(new RegExp(key+":(.+?)(?=\\n[A-Z]+:|$)","si"));return m?m[1].trim():"";};
      const cat=get("CATEGORY").toLowerCase().trim();
      setBuiltCard({
        verse:get("VERSE"),
        ref:get("REF"),
        category:WORD_CATS.find(c=>c.id===cat)?cat:"faith",
        note:get("NOTE"),
      });
    }catch(e){
      setBuiltCard({verse:addInput,ref:"",category:"faith",note:""});
    }
    setAddLoading(false);
  }

  function saveBuiltCard(){
    if(!builtCard?.verse)return;
    const entry={id:"mv"+Date.now(),...builtCard,userNote:""};
    saveVerses([entry,...userVerses]);
    setBuiltCard(null);setAddInput("");setAddOpen(false);
  }

  function removeVerse(id){
    if(SCVS_MIGRATED.find(v=>v.id===id))return; // can't delete built-ins
    saveVerses(userVerses.filter(v=>v.id!==id));
    setExpandedId(null);
  }

  function copyVerse(v){
    navigator.clipboard?.writeText(`"${v.verse}" — ${v.ref}`).then(()=>{setCopied(v.id);setTimeout(()=>setCopied(null),2000);});
  }

  function saveNote(id,text){
    const isUser=userVerses.find(v=>v.id===id);
    if(isUser){
      saveVerses(userVerses.map(v=>v.id===id?{...v,userNote:text}:v));
    }
    setEditingNote(p=>({...p,[id]:undefined}));
  }

  const catCounts=WORD_CATS.reduce((a,c)=>{a[c.id]=allVerses.filter(v=>v.category===c.id).length;return a;},{});
  const filtered=activeCat==="all"?allVerses:allVerses.filter(v=>v.category===activeCat);
  const expandedVerse=allVerses.find(v=>v.id===expandedId);
  const expandedCat=expandedVerse?WORD_CATS.find(c=>c.id===expandedVerse.category)||WORD_CATS[0]:null;

  return(
    <div style={{paddingBottom:40}}>

      {/* Add box */}
      <div style={{background:"white",border:"1px solid "+OX+"30",borderLeft:"3px solid "+OX,borderRadius:10,marginBottom:20,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:addOpen?"1px solid "+FINK:"none"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:11,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",opacity:0.85}}>✦ Add a Verse</div>
            <button onClick={()=>{setAddOpen(o=>!o);setBuiltCard(null);setAddInput("");}}
              style={{background:addOpen?OX:"transparent",border:"1px solid "+(addOpen?OX:TANL),color:addOpen?"white":TAN,padding:"4px 12px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:7}}>
              {addOpen?"× Close":"+ Add"}
            </button>
          </div>
          {!addOpen&&<p style={{fontSize:13,color:TAN,margin:"6px 0 0",fontStyle:"italic"}}>Type a verse, a reference, or just a few words — Claude builds the card.</p>}
        </div>
        {addOpen&&(
          <div style={{padding:"14px 16px",animation:"fadeIn 0.2s ease"}}>
            {!builtCard&&(<>
              <textarea value={addInput} onChange={e=>setAddInput(e.target.value)} rows={3}
                placeholder={"Type or paste a verse, or just the reference (e.g. John 3:16)..."}
                style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:PAPER,fontFamily:SERIF,fontSize:15,fontStyle:"italic",color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8,marginBottom:10}}/>
              <button onClick={buildCard} disabled={!addInput.trim()||addLoading}
                style={{width:"100%",padding:"11px",background:addInput.trim()&&!addLoading?OX:"rgba(26,46,74,0.2)",color:"white",border:"none",cursor:addInput.trim()&&!addLoading?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8}}>
                {addLoading?"Building your card...":"✦ Build Card"}
              </button>
              {addLoading&&(
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0 0",justifyContent:"center"}}>
                  <div style={{width:16,height:16,border:"2px solid "+OX,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                  <span style={{fontSize:14,color:TAN,fontStyle:"italic"}}>Reading the verse and building the card...</span>
                </div>
              )}
            </>)}
            {builtCard&&!addLoading&&(
              <div style={{animation:"fadeIn 0.25s ease"}}>
                <div style={{fontSize:11,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>✦ Card Built — Review &amp; Save</div>
                {(()=>{
                  const bc=WORD_CATS.find(c=>c.id===builtCard.category)||WORD_CATS[0];
                  return(
                    <div style={{background:bc.color+"0D",border:"1px solid "+bc.color+"30",borderRadius:10,overflow:"hidden",marginBottom:12}}>
                      <div style={{background:bc.color,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:16,color:"white"}}>{bc.icon}</span>
                        <span style={{fontSize:12,color:"white",letterSpacing:"2px",textTransform:"uppercase",opacity:0.9}}>{bc.label}</span>
                        <span style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginLeft:"auto"}}>Auto-assigned</span>
                      </div>
                      <div style={{padding:"14px 16px"}}>
                        <p style={{fontFamily:SERIF,fontSize:17,fontStyle:"italic",color:INK,lineHeight:1.65,margin:"0 0 8px"}}>"{builtCard.verse}"</p>
                        <p style={{fontSize:14,color:GOLD,margin:"0 0 12px",letterSpacing:"0.5px"}}>{builtCard.ref}</p>
                        {builtCard.note&&(
                          <div style={{padding:"8px 12px",background:"white",borderLeft:"2px solid "+bc.color,borderRadius:"0 6px 6px 0",fontSize:14,color:INK,lineHeight:1.6,fontStyle:"italic"}}>{builtCard.note}</div>
                        )}
                      </div>
                    </div>
                  );
                })()}
                <div style={{fontSize:13,color:TAN,marginBottom:8}}>Change category if needed:</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                  {WORD_CATS.map(c=>(
                    <button key={c.id} onClick={()=>setBuiltCard(p=>({...p,category:c.id}))}
                      style={{padding:"4px 10px",background:builtCard.category===c.id?c.color:"transparent",color:builtCard.category===c.id?"white":c.color,border:"1px solid "+c.color,cursor:"pointer",fontFamily:BODY,fontSize:12,borderRadius:8}}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={saveBuiltCard} style={{flex:1,padding:"11px",background:INK,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save to Word</button>
                  <button onClick={()=>{setBuiltCard(null);setAddInput("");}} style={{padding:"11px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Discard</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mode toggle */}
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        <button onClick={()=>{setMode("browse");setActiveCat("all");}}
          style={{flex:1,padding:"8px",background:mode==="browse"?INK:"transparent",color:mode==="browse"?"white":TAN,border:"1px solid "+(mode==="browse"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          Browse
        </button>
        <button onClick={()=>setMode("category")}
          style={{flex:1,padding:"8px",background:mode==="category"?INK:"transparent",color:mode==="category"?"white":TAN,border:"1px solid "+(mode==="category"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          By Category
        </button>
      </div>

      {/* Category filter strip — browse mode only */}
      {mode==="browse"&&(
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:20,paddingBottom:2,scrollbarWidth:"none"}}>
          <button onClick={()=>setActiveCat("all")}
            style={{padding:"5px 12px",background:activeCat==="all"?INK:"transparent",color:activeCat==="all"?"white":TAN,border:"1px solid "+(activeCat==="all"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:12,borderRadius:20,whiteSpace:"nowrap",flexShrink:0}}>
            All ({allVerses.length})
          </button>
          {WORD_CATS.filter(c=>catCounts[c.id]>0).map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(c.id)}
              style={{padding:"5px 12px",background:activeCat===c.id?c.color:"transparent",color:activeCat===c.id?"white":c.color,border:"1px solid "+c.color,cursor:"pointer",fontFamily:BODY,fontSize:12,borderRadius:20,whiteSpace:"nowrap",flexShrink:0}}>
              {c.icon} {c.label} ({catCounts[c.id]})
            </button>
          ))}
        </div>
      )}

      {/* BROWSE MODE */}
      {mode==="browse"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {filtered.map(v=>{
            const cat=WORD_CATS.find(c=>c.id===v.category)||WORD_CATS[0];
            return(
              <div key={v.id} onClick={()=>setExpandedId(v.id)}
                style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 10px rgba(26,46,74,0.07)",cursor:"pointer",transition:"box-shadow 0.2s"}}>
                <div style={{background:cat.color+"14",padding:"10px 16px",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:15,color:cat.color}}>{cat.icon}</span>
                  <span style={{fontSize:11,color:cat.color,letterSpacing:"2.5px",textTransform:"uppercase",fontWeight:"bold",opacity:0.9}}>{cat.label}</span>
                </div>
                <div style={{padding:"12px 16px 14px"}}>
                  <p style={{fontFamily:SERIF,fontSize:17,fontStyle:"italic",color:INK,lineHeight:1.65,margin:"0 0 8px"}}>"{v.verse}"</p>
                  <p style={{fontSize:14,color:GOLD,margin:"0 0 8px",letterSpacing:"0.5px"}}>{v.ref}</p>
                  {(v.note||v.userNote)&&(
                    <p style={{fontSize:13,color:TAN,margin:0,lineHeight:1.55,fontStyle:"italic",paddingTop:8,borderTop:"1px solid "+FINK}}>
                      {v.userNote||v.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BY CATEGORY MODE */}
      {mode==="category"&&(
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {WORD_CATS.filter(c=>catCounts[c.id]>0).map(cat=>{
            const catVerses=allVerses.filter(v=>v.category===cat.id);
            return(
              <div key={cat.id}>
                <div style={{background:cat.color,padding:"10px 14px",borderRadius:"10px 10px 0 0",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18,color:"white"}}>{cat.icon}</span>
                  <span style={{fontSize:12,color:"white",letterSpacing:"2.5px",textTransform:"uppercase",fontWeight:"bold"}}>{cat.label}</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginLeft:"auto"}}>{catVerses.length} {catVerses.length===1?"verse":"verses"}</span>
                </div>
                <div style={{background:"white",border:"1px solid "+FINK,borderTop:"none",borderRadius:"0 0 10px 10px"}}>
                  {catVerses.map((v,i)=>(
                    <div key={v.id} onClick={()=>setExpandedId(v.id)} style={{padding:"12px 16px",borderBottom:i<catVerses.length-1?"1px solid "+FINK:"none",cursor:"pointer",display:"flex",alignItems:"flex-start",gap:10}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:cat.color,flexShrink:0,marginTop:7}}/>
                      <div>
                        <p style={{fontFamily:SERIF,fontSize:15,fontStyle:"italic",color:INK,lineHeight:1.6,margin:"0 0 3px"}}>"{v.verse.length>80?v.verse.slice(0,80)+"...":v.verse}"</p>
                        <p style={{fontSize:13,color:TAN,margin:0}}>{v.ref}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Expanded card overlay */}
      {expandedId&&expandedVerse&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,46,74,0.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn 0.2s ease"}}
          onClick={()=>setExpandedId(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:PAPER,width:"100%",maxWidth:700,maxHeight:"85vh",borderRadius:"16px 16px 0 0",overflowY:"auto",animation:"fadeIn 0.25s ease"}}>
            <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{fontSize:11,color:expandedCat.color,letterSpacing:"2.5px",textTransform:"uppercase",fontWeight:"bold"}}>{expandedCat.icon} {expandedCat.label}</div>
              <button onClick={()=>setExpandedId(null)} style={{background:"transparent",border:"1px solid "+TANL,color:TAN,width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
            </div>
            <p style={{fontFamily:SERIF,fontSize:22,fontStyle:"italic",color:INK,lineHeight:1.6,padding:"0 20px",margin:"0 0 8px"}}>"{expandedVerse.verse}"</p>
            <p style={{fontSize:15,color:GOLD,padding:"0 20px",margin:"0 0 16px",letterSpacing:"0.5px"}}>{expandedVerse.ref}</p>
            <div style={{height:1,background:FINK,margin:"0 20px 16px"}}/>
            {expandedVerse.note&&(
              <div style={{padding:"0 20px",marginBottom:16}}>
                <div style={{fontSize:11,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>✦ Note</div>
                <div style={{fontSize:14,color:INK,lineHeight:1.65,fontStyle:"italic",padding:"10px 12px",background:expandedCat.color+"0D",borderLeft:"2px solid "+expandedCat.color,borderRadius:"0 6px 6px 0"}}>{expandedVerse.note}</div>
              </div>
            )}
            <div style={{padding:"0 20px",marginBottom:16}}>
              <div style={{fontSize:11,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>✦ What This Has Meant to Me</div>
              {editingNote[expandedId]!==undefined?(
                <div>
                  <textarea value={editingNote[expandedId]} onChange={e=>setEditingNote(p=>({...p,[expandedId]:e.target.value}))} rows={3}
                    style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8,marginBottom:8}}/>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>saveNote(expandedId,editingNote[expandedId])} style={{flex:1,padding:"8px",background:INK,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:14,borderRadius:8}}>Save</button>
                    <button onClick={()=>setEditingNote(p=>({...p,[expandedId]:undefined}))} style={{padding:"8px 12px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:14,borderRadius:8}}>Cancel</button>
                  </div>
                </div>
              ):(
                <div onClick={()=>setEditingNote(p=>({...p,[expandedId]:expandedVerse.userNote||""}))}
                  style={{padding:"10px 12px",background:"white",border:"1px solid "+TANL,borderRadius:8,cursor:"text",minHeight:60}}>
                  {expandedVerse.userNote
                    ?<p style={{fontSize:15,color:INK,lineHeight:1.65,margin:0,fontFamily:BODY}}>{expandedVerse.userNote}</p>
                    :<p style={{fontSize:14,color:TAN,lineHeight:1.65,margin:0,fontStyle:"italic"}}>Tap to write what this verse has meant to you — when it hit, how it helped, what changed...</p>
                  }
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:8,padding:"0 20px 30px"}}>
              <button onClick={()=>copyVerse(expandedVerse)} style={{flex:1,padding:"10px",background:"transparent",color:expandedCat.color,border:"1px solid "+expandedCat.color,cursor:"pointer",fontFamily:BODY,fontSize:14,borderRadius:8}}>
                {copied===expandedVerse.id?"✓ Copied":"Copy Verse"}
              </button>
              {!SCVS_MIGRATED.find(v=>v.id===expandedId)&&(
                <button onClick={()=>removeVerse(expandedId)} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:14,borderRadius:8}}>Delete</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LifeSnapshotOverlay({cats,habits,prayers,shelf,streaks,onClose}){
  const today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const tk=new Date().toISOString().slice(0,10);
  const th=habits[tk]||{};
  const allHabits=HABITS;
  const habitsDone=allHabits.filter(h=>th[h.id]).length;
  const habitsTotal=allHabits.length;
  const activePrayers=prayers.filter(p=>!p.answered);
  const answeredPrayers=prayers.filter(p=>p.answered);
  const shelfTotal=shelf.length;
  const shelfThisWeek=shelf.filter(s=>s.timeframe==="week").length;
  const overallTasks=cats.flatMap(c=>c.tasks);
  const overallDone=overallTasks.filter(t=>t.done).length;
  const overallPct=overallTasks.length?Math.round(overallDone/overallTasks.length*100):0;

  function handlePrint(){window.print();}

  return(
    <div style={{position:"fixed",inset:0,background:PAPER,zIndex:300,overflowY:"auto",fontFamily:BODY,color:INK}}>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #life-snapshot, #life-snapshot * { visibility: visible !important; }
          #life-snapshot { position: absolute; left: 0; top: 0; width: 100%; padding: 0 !important; }
          #snap-close-bar { display: none !important; }
          @page { margin: 18mm; }
        }
      `}</style>

      {/* Close / Print bar */}
      <div id="snap-close-bar" style={{background:INK,padding:"12px 20px",position:"sticky",top:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onClose} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:15,fontFamily:BODY,padding:0}}>← Back to Map</button>
        <div style={{fontSize:12,color:TAN,letterSpacing:"2.5px",textTransform:"uppercase"}}>Life Snapshot</div>
        <button onClick={handlePrint} style={{background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:BODY,fontSize:15,padding:"6px 14px",borderRadius:8}}>⬇ Export PDF</button>
      </div>

      <div id="life-snapshot" style={{maxWidth:700,margin:"0 auto",padding:"28px 20px 60px"}}>
        {/* Header */}
        <div style={{borderBottom:"2px solid "+INK,paddingBottom:16,marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:12,color:OX,letterSpacing:"3px",textTransform:"uppercase",marginBottom:4}}>Steen Growth Ministries</div>
            <div style={{fontSize:26,fontWeight:"bold",color:INK,letterSpacing:"-0.5px",lineHeight:1.1}}>Life Snapshot</div>
            <div style={{fontSize:15,color:TAN,fontStyle:"italic",marginTop:4}}>{today}</div>
          </div>
          <Logo size={60}/>
        </div>

        {/* Overall pulse */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:28}}>
          {[
            {label:"Overall",val:overallPct+"%",sub:"orientation",color:INK},
            {label:"Habits",val:habitsDone+"/"+habitsTotal,sub:"done today",color:GRN},
            {label:"Prayer",val:activePrayers.length,sub:"active",color:OX},
            {label:"Shelf",val:shelfTotal,sub:shelfThisWeek+" this week",color:GOLD},
          ].map(m=>(
            <div key={m.label} style={{padding:"12px 10px",background:"white",border:"1px solid "+FINK,borderTop:"3px solid "+m.color,borderRadius:8,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:"bold",color:m.color,lineHeight:1}}>{m.val}</div>
              <div style={{fontSize:12,letterSpacing:"1.5px",textTransform:"uppercase",color:INK,marginTop:4,opacity:0.7}}>{m.label}</div>
              <div style={{fontSize:13,color:TAN,marginTop:2,fontStyle:"italic"}}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Life Categories */}
        <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Life Map</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
          {cats.map(cat=>{
            const done=cat.tasks.filter(t=>t.done).length;
            const total=cat.tasks.length;
            const pct=total?Math.round(done/total*100):0;
            const open=cat.tasks.filter(t=>!t.done);
            return(
              <div key={cat.id} style={{padding:"14px 16px",background:"white",border:"1px solid "+FINK,borderLeft:"4px solid "+cat.color,borderRadius:8}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:open.length?10:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,color:cat.color}}>{cat.icon}</span>
                    <span style={{fontSize:15,fontWeight:"bold",color:INK}}>{cat.label}</span>
                    <span style={{fontSize:13,color:TAN,fontStyle:"italic"}}>{cat.state}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    <div style={{width:60,height:4,background:"rgba(26,46,74,0.1)",borderRadius:8}}>
                      <div style={{width:pct+"%",height:"100%",background:cat.color,borderRadius:8,transition:"width 0.4s"}}/>
                    </div>
                    <span style={{fontSize:13,color:cat.color,fontWeight:"bold",minWidth:28,textAlign:"right"}}>{done}/{total}</span>
                  </div>
                </div>
                {open.length>0&&(
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    {open.map(t=>(
                      <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,paddingLeft:4}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:cat.color,flexShrink:0,opacity:0.5}}/>
                        <span style={{fontSize:15,color:INK,lineHeight:1.4}}>{t.label}</span>
                        <RDot level={t.resistance}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prayer snapshot */}
        {activePrayers.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Active Prayer</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {activePrayers.slice(0,8).map(p=>{
                const tag=RTAGS.find(t=>t.id===p.relationship)||RTAGS[0];
                return(
                  <div key={p.id} style={{padding:"10px 14px",background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+OX,borderRadius:8,display:"flex",alignItems:"flex-start",gap:10}}>
                    <span style={{fontSize:15,color:tag.color,flexShrink:0}}>{tag.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,color:INK,fontWeight:"bold"}}>{p.name}</div>
                      <div style={{fontSize:15,color:TAN,lineHeight:1.4,marginTop:2}}>{p.request}</div>
                    </div>
                  </div>
                );
              })}
              {activePrayers.length>8&&<div style={{fontSize:13,color:TAN,fontStyle:"italic",textAlign:"center",padding:"6px"}}>+{activePrayers.length-8} more on your prayer list</div>}
            </div>
          </div>
        )}

        {/* Shelf snapshot */}
        {shelf.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ The Shelf</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {SHELF_TIMEFRAMES.map(tf=>{
                const items=shelf.filter(s=>s.timeframe===tf.id);
                if(!items.length)return null;
                return(
                  <div key={tf.id}>
                    <div style={{fontSize:12,color:tf.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:5,opacity:0.85}}>— {tf.label}</div>
                    {items.slice(0,5).map(item=>(
                      <div key={item.id} style={{padding:"7px 14px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+tf.color,borderRadius:8,marginBottom:4,fontSize:15,color:INK}}>{item.label}</div>
                    ))}
                    {items.length>5&&<div style={{fontSize:13,color:TAN,fontStyle:"italic",paddingLeft:14,marginBottom:6}}>+{items.length-5} more</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Habits snapshot */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Habits Today</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {allHabits.map(h=>{
              const done=!!th[h.id];
              const str=streaks[h.id]?.count||0;
              const hcat=HCATS.find(hc=>hc.id===h.cat);
              return(
                <div key={h.id} style={{padding:"5px 10px",background:done?((hcat?.color||GRN)+"18"):"rgba(255,255,255,0.5)",border:"1px solid "+(done?(hcat?.color||GRN)+"50":FINK),borderRadius:8,fontSize:13,color:done?(hcat?.color||GRN):TAN,display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:11}}>{done?"✓":"○"}</span>
                  {h.label}
                  {str>1&&<span style={{fontSize:13,opacity:0.8}}>{str}🔥</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{borderTop:"1px solid rgba(26,46,74,0.15)",paddingTop:16,marginTop:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,color:TAN,fontStyle:"italic"}}>"Trust in the Lord with all your heart." — Proverbs 3:5</div>
          <div style={{fontSize:12,color:TAN,opacity:0.6,letterSpacing:"1px"}}>SGM Orientation</div>
        </div>
      </div>
    </div>
  );
}

function AISuggestButton({cats,planner,setPlanner}){
  const tk=new Date().toISOString().slice(0,10);
  const [aiLoad,setAiLoad]=useState(false);
  const [aiSug,setAiSug]=useState(null);
  const dp=planner[tk]||{};
  function updDay(u){setPlanner(p=>({...p,[tk]:u}));}
  async function suggest(){
    setAiLoad(true);setAiSug(null);
    try{
      const tasks=cats.flatMap(c=>c.tasks.filter(t=>!t.done).map(t=>"- "+t.label+" ["+t.resistance+"] ("+c.label+")")).join("\n");
      const prompt="Help Joe plan his day. Highest energy morning, lowest afternoon, evenings are family.\n\nOpen tasks:\n"+tasks+"\n\nDistribute across Morning, Midday, Afternoon, Evening. Morning: 2-3 high/medium. Midday: 2-3 medium. Afternoon: low only. Evening: family/rest.\n\nRespond ONLY:\nMORNING: task | task\nMIDDAY: task | task\nAFTERNOON: task | task\nEVENING: task";
      const text=await claudeAPI(prompt,1000);
      const parsed={};
      ["MORNING","MIDDAY","AFTERNOON","EVENING"].forEach(b=>{
        const m=text.match(new RegExp(b+": (.+)"));
        if(m)parsed[b.toLowerCase()]=m[1].split("|").map(t=>t.trim()).filter(Boolean);
      });
      setAiSug(parsed);
    }catch(e){setAiSug(null);}
    setAiLoad(false);
  }
  function applySug(){
    if(!aiSug)return;
    const u={...dp,focus:(dp.focus||"")+(dp.focus?"\n":"")+Object.entries(aiSug).map(([b,ts])=>b.toUpperCase()+": "+ts.join(", ")).join("\n")};
    updDay(u);setAiSug(null);
  }
  return(
    <div>
      <button onClick={suggest} disabled={aiLoad} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
        {aiLoad?"◎ Planning your day…":"✦ Suggest My Day"}
      </button>
      {aiSug&&(
        <div style={{marginTop:10,padding:"14px 16px",background:GOLD+"08",border:"1px solid "+GOLD+"40",borderRadius:8}}>
          <SL c={GOLD}>Suggested Plan</SL>
          {DAYBLOCKS.map(block=>{
            const tasks=aiSug[block.id]||[];
            if(!tasks.length)return null;
            return(
              <div key={block.id} style={{marginBottom:8}}>
                <div style={{fontSize:13,color:GOLD,letterSpacing:"1px",textTransform:"uppercase",marginBottom:3}}>{block.label}</div>
                {tasks.map((t,i)=><div key={i} style={{fontSize:15,color:INK,padding:"2px 0"}}>· {t}</div>)}
              </div>
            );
          })}
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button onClick={applySug} style={{flex:1,padding:"8px",background:"transparent",color:GOLD,border:"1px solid "+GOLD,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Apply to Week Tab</button>
            <button onClick={()=>setAiSug(null)} style={{padding:"8px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}

const LT_SECTIONS=[
  {id:"home",label:"Home",icon:"⌂",color:"#2E6B8A",mode:"topic",desc:"Shawn & the kids. Articulating life, growth, and vision to the people closest to you."},
  {id:"faith",label:"Faith Conversations",icon:"✦",color:OX,mode:"topic",desc:"Friends, pastors, conference connections. Deep faith dialogue, your positions."},
  {id:"just",label:"Just Talking",icon:"◎",color:GOLD,mode:"topic",desc:"Casual social. Who you are, what you love. Faith may come up naturally."},
  {id:"new",label:"New Believers",icon:"◈",color:GRN,mode:"topic",desc:"Keeping it simple and warm, not overwhelming."},
  {id:"gospel",label:"Sharing the Gospel",icon:"⊕",color:PUR,mode:"topic",desc:"How you'd actually start it, what you'd say, common responses."},
  {id:"deeper",label:"Going Deeper",icon:"⬇",color:"#2E5B8A",mode:"deeper",desc:"You heard something and you're not done with it yet. Paste what you captured and let's pull out what matters."},
  {id:"people",label:"People I Know",icon:"♡",color:"#7A4F6A",mode:"map",desc:"A private structured profile for relationships. Captures how you interpret them, how they're wired, and where friction tends to come from. Built entirely for prayer and self-awareness — no judgment. Your internal map to love and intercede more specifically."},
];

const LT_TOPIC_PROMPT=`Develop a Topic — Let's Talk Card

Paste anything you heard, read, or thought about — a podcast clip, sermon quote, article, or idea. Claude extrapolates the key points, frames your position, and builds it into a conversation card ready to use in your voice.

Format your card like this:
TOPIC: [Name or topic]
SECTION: [Home / Faith Conversations / Just Talking / New Believers / Sharing the Gospel]
YOUR POSITION: [What you actually believe or want to communicate]
KEY POINTS: [2-3 things that need to land]
HOW IT USUALLY GOES: [What typically happens in this kind of conversation]
SCRIPTURE: [Optional — one verse that anchors it]
IN JOE'S WORDS: [Anything extra in your own voice]

Ask Claude: "Help me develop a Let's Talk card for [name/topic]. Here's my raw thinking: [your notes or paste]"`;

const LT_MAP_PROMPT=`Relationship Map — People I Know

A private structured profile for relationships. Built entirely for prayer and self-awareness — not judgment. Your internal map to love and intercede more specifically.

Format your profile like this:
TOPIC: [Person's name]
SECTION: People I Know
HOW THEY'RE WIRED: [What you've observed about how they think, feel, and process life]
WHERE FRICTION COMES FROM: [Patterns, triggers, or dynamics that create distance]
HOW TO LOVE THEM WELL: [Specific ways to reach them, what they need most from you]
SCRIPTURE: [Optional — a verse you're praying for them]
IN JOE'S WORDS: [Your honest internal read]

Ask Claude: "Help me build a relationship profile for [name]. Here's my honest read: [your notes]"

These are your observations — not facts, not verdicts. Written to help you love better, pray more specifically, and show up with grace. Between you and God.`;

const TONE_TAGS=[
  {id:"warm",label:"Warm",color:GRN},
  {id:"tense",label:"Tense",color:OX},
  {id:"distant",label:"Distant",color:TAN},
  {id:"breakthrough",label:"Breakthrough",color:GOLD},
  {id:"hard",label:"Hard",color:PUR},
  {id:"routine",label:"Routine",color:"#2E6B8A"},
];

function ConversationLog({card,onUpdateLog}){
  const [adding,setAdding]=useState(false);
  const [input,setInput]=useState("");
  const [tone,setTone]=useState("warm");
  const [aiHelp,setAiHelp]=useState(false);
  const [aiLoading,setAiLoading]=useState(false);
  const [editingEntry,setEditingEntry]=useState(null);
  const [editNotes,setEditNotes]=useState("");
  const [editTone,setEditTone]=useState("warm");
  const log=card.conversationLog||[];

  async function aiAssist(){
    if(!input.trim())return;
    setAiLoading(true);
    const prompt=`You are helping Joe Steen log a conversation he had with ${card.topic}, for his private relationship notes (for prayer and self-awareness only — never shown to the other person). Joe's raw notes:\n\n${input}\n\nIn 2-3 honest sentences, reflect back what happened and suggest which tone tag fits best from this list: Warm, Tense, Distant, Breakthrough, Hard, Routine. Format:\n\nREFLECTION: [2-3 sentences]\nSUGGESTED TONE: [one tag from the list]`;
    try{
      const result=await claudeAPI(prompt,400);
      const toneMatch=result.match(/SUGGESTED TONE:\s*(\w+)/i);
      const reflMatch=result.match(/REFLECTION:(.+?)(?=SUGGESTED TONE|$)/si);
      if(toneMatch){
        const found=TONE_TAGS.find(t=>t.label.toLowerCase()===toneMatch[1].toLowerCase().trim());
        if(found)setTone(found.id);
      }
      if(reflMatch)setInput(p=>p+"\n\n— "+reflMatch[1].trim());
    }catch(e){}
    setAiLoading(false);
    setAiHelp(false);
  }

  function saveEntry(){
    if(!input.trim())return;
    const entry={id:Date.now(),date:new Date().toISOString().slice(0,10),tone,notes:input.trim()};
    onUpdateLog([entry,...log]);
    setInput("");setAdding(false);setTone("warm");
  }

  function deleteEntry(id){
    onUpdateLog(log.filter(e=>e.id!==id));
  }

  function startEditEntry(entry){
    setEditNotes(entry.notes);
    setEditTone(entry.tone);
    setEditingEntry(entry.id);
  }

  function saveEditEntry(){
    if(!editNotes.trim())return;
    onUpdateLog(log.map(e=>e.id===editingEntry?{...e,notes:editNotes.trim(),tone:editTone}:e));
    setEditingEntry(null);
  }

  function cancelEditEntry(){
    setEditingEntry(null);
  }

  // Pattern surfacing — tone frequency across this person's log
  const toneCounts={};
  log.forEach(e=>{toneCounts[e.tone]=(toneCounts[e.tone]||0)+1;});
  const topTone=Object.entries(toneCounts).sort((a,b)=>b[1]-a[1])[0];
  const topToneTag=topTone?TONE_TAGS.find(t=>t.id===topTone[0]):null;

  return(
    <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid "+FINK}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:13,color:"#7A4F6A",letterSpacing:"2px",textTransform:"uppercase",opacity:0.85}}>✦ Conversation Log</div>
        <button onClick={()=>setAdding(a=>!a)}
          style={{background:adding?"#7A4F6A":"transparent",border:"1px solid #7A4F6A",color:adding?"white":"#7A4F6A",padding:"4px 10px",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
          {adding?"Cancel":"+ Log Conversation"}
        </button>
      </div>

      {topToneTag&&log.length>=3&&(
        <div style={{padding:"8px 12px",background:topToneTag.color+"10",borderLeft:"3px solid "+topToneTag.color,borderRadius:8,marginBottom:12}}>
          <p style={{fontSize:13,color:INK,margin:0,lineHeight:1.6,fontStyle:"italic"}}>
            Pattern: <strong>{topToneTag.label}</strong> shows up most ({topTone[1]} of {log.length} logged conversations).
          </p>
        </div>
      )}

      {adding&&(
        <div style={{marginBottom:14,padding:"12px",background:"#7A4F6A08",border:"1px solid #7A4F6A30",borderRadius:8}}>
          <div style={{fontSize:13,color:TAN,marginBottom:6}}>What happened, what was said, what you noticed...</div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
            placeholder="Raw notes on the conversation..."
            style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8,marginBottom:10}}/>
          <button onClick={aiAssist} disabled={!input.trim()||aiLoading}
            style={{width:"100%",padding:"8px",background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:input.trim()?"pointer":"default",fontFamily:BODY,fontSize:13,borderRadius:8,marginBottom:10,opacity:input.trim()?1:0.5}}>
            {aiLoading?"Reading the tone...":"✦ Help me read the tone"}
          </button>
          <div style={{fontSize:13,color:TAN,marginBottom:6}}>Tone</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {TONE_TAGS.map(t=>(
              <button key={t.id} onClick={()=>setTone(t.id)}
                style={{padding:"5px 10px",background:tone===t.id?t.color:"transparent",color:tone===t.id?"white":t.color,border:"1px solid "+t.color,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={saveEntry} disabled={!input.trim()}
            style={{width:"100%",padding:"9px",background:"#7A4F6A",color:"white",border:"none",cursor:input.trim()?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8,opacity:input.trim()?1:0.5}}>
            Save Entry
          </button>
        </div>
      )}

      {!log.length&&!adding&&(
        <p style={{fontSize:13,color:TAN,fontStyle:"italic",margin:0}}>No conversations logged yet. Start tracking after you talk.</p>
      )}

      {log.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {log.map(entry=>{
            const toneTag=TONE_TAGS.find(t=>t.id===entry.tone)||TONE_TAGS[0];
            const isEditing=editingEntry===entry.id;
            if(isEditing){
              return(
                <div key={entry.id} style={{padding:"10px 12px",background:"white",border:"1px solid "+toneTag.color+"60",borderLeft:"3px solid "+toneTag.color,borderRadius:8}}>
                  <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} rows={3}
                    style={{width:"100%",padding:"8px 10px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:14,color:INK,outline:"none",resize:"vertical",lineHeight:1.6,borderRadius:6,marginBottom:8}}/>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                    {TONE_TAGS.map(t=>(
                      <button key={t.id} onClick={()=>setEditTone(t.id)}
                        style={{padding:"3px 8px",background:editTone===t.id?t.color:"transparent",color:editTone===t.id?"white":t.color,border:"1px solid "+t.color,cursor:"pointer",fontFamily:BODY,fontSize:12,borderRadius:6}}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={saveEditEntry} style={{flex:1,padding:"6px",background:toneTag.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:6}}>Save</button>
                    <button onClick={cancelEditEntry} style={{padding:"6px 10px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:6}}>Cancel</button>
                  </div>
                </div>
              );
            }
            return(
              <div key={entry.id} style={{padding:"10px 12px",background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+toneTag.color,borderRadius:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                  <span style={{fontSize:12,color:toneTag.color,letterSpacing:"1.5px",textTransform:"uppercase",fontWeight:"bold"}}>{toneTag.label}</span>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:12,color:TAN}}>{entry.date}</span>
                    <button onClick={()=>startEditEntry(entry)} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:12,padding:0}}>Edit</button>
                    <button onClick={()=>deleteEntry(entry.id)} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:13,padding:0}}>×</button>
                  </div>
                </div>
                <p style={{fontSize:14,color:INK,lineHeight:1.6,margin:0,whiteSpace:"pre-wrap"}}>{entry.notes}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LetsTalkTab({letstalk,setLetstalk}){
  const [section,setSection]=useState("home");
  const [showAdd,setShowAdd]=useState(false);
  const [showPrompt,setShowPrompt]=useState(false);
  const [copied,setCopied]=useState(false);
  const [expandedCard,setExpandedCard]=useState(null);
  const [pasteMode,setPasteMode]=useState(false);
  const [pasteText,setPasteText]=useState("");
  const [topicCard,setTopicCard]=useState({topic:"",position:"",keypoints:"",howgoes:"",scripture:"",inwords:""});
  const [mapCard,setMapCard]=useState({topic:"",wiring:"",friction:"",bestway:"",scripture:"",inwords:""});
  const [deeperInput,setDeeperInput]=useState("");
  const [deeperSource,setDeeperSource]=useState("");
  const [deeperResult,setDeeperResult]=useState(null);
  const [deeperLoading,setDeeperLoading]=useState(false);
  const [copiedCard,setCopiedCard]=useState(null);
  const [developMode,setDevelopMode]=useState(false);
  const [developInput,setDevelopInput]=useState("");
  const [developResult,setDevelopResult]=useState(null);
  const [developLoading,setDevelopLoading]=useState(false);
  const [editingCard,setEditingCard]=useState(null);
  const [editForm,setEditForm]=useState({});

  const sec=LT_SECTIONS.find(s=>s.id===section)||LT_SECTIONS[0];
  const isMap=sec.mode==="map";
  const isDeeper=sec.mode==="deeper";
  const cards=(letstalk||[]).filter(c=>c.section===section);
  const activePrompt=isMap?LT_MAP_PROMPT:LT_TOPIC_PROMPT;

  const TOPIC_FIELDS=[
    {key:"position",label:"Your Position",ph:"What you actually believe or want to communicate..."},
    {key:"keypoints",label:"Key Points",ph:"2-3 things that need to land..."},
    {key:"howgoes",label:"How It Usually Goes",ph:"What typically happens in this kind of conversation..."},
    {key:"scripture",label:"Scripture (optional)",ph:"One verse that anchors it..."},
    {key:"inwords",label:"In Joe's Words",ph:"Anything extra in your own voice..."},
  ];
  const MAP_FIELDS=[
    {key:"wiring",label:"How They're Wired",ph:"How they think, feel, and process life..."},
    {key:"friction",label:"Where Friction Comes From",ph:"Patterns or dynamics that create distance..."},
    {key:"bestway",label:"How to Love Them Well",ph:"Specific ways to reach them, what they need most..."},
    {key:"scripture",label:"Scripture (optional)",ph:"A verse you're praying for them..."},
    {key:"inwords",label:"In Joe's Words",ph:"Your honest internal read..."},
  ];
  const activeFields=isMap?MAP_FIELDS:TOPIC_FIELDS;
  const activeForm=isMap?mapCard:topicCard;
  const setActiveForm=isMap?setMapCard:setTopicCard;

  async function processDeeper(){
    if(!deeperInput.trim())return;
    setDeeperLoading(true);setDeeperResult(null);
    const prompt=`You are helping Joe Steen process something he heard or encountered. Joe is a stay-at-home dad, 20 years sober, founder of SGM. His anchor verse is Proverbs 3:5-6.\n\nSource: ${deeperSource||"not specified"}\n\nWhat Joe captured:\n${deeperInput}\n\nDo three things:\n1. WHAT'S HERE — Pull out the 2-3 most important ideas in plain language.\n2. WHAT JOE THINKS — Based on what he wrote, what does he seem to believe or be wrestling with? Be honest.\n3. GOING DEEPER — One question he could sit with, and one scripture that speaks to the core of this.\n\nTight, no filler. Write like an honest friend who knows Joe well.`;
    try{const result=await claudeAPI(prompt,800);setDeeperResult(result);}
    catch(e){setDeeperResult("Couldn't reach Claude right now. Try again.");}
    setDeeperLoading(false);
  }

  async function processDevelop(){
    if(!developInput.trim())return;
    setDevelopLoading(true);setDevelopResult(null);
    const prompt=`You are helping Joe Steen develop a conversation card for his "${sec.label}" context. Joe is a stay-at-home dad, 20 years sober, founder of SGM, leads Celebrate Recovery. His anchor verse is Proverbs 3:5-6. His voice is honest, warm, direct — like a trusted friend over coffee.\n\nSection context: ${sec.desc}\n\nHere is Joe's raw thinking:\n${developInput}\n\nBuild this into a Let's Talk card. Return in this exact format:\n\nTOPIC: [Name or topic — one line]\nYOUR POSITION: [What Joe actually believes or wants to communicate — in his voice, 2-3 sentences]\nKEY POINTS: [2-3 things that need to land — numbered]\nHOW IT USUALLY GOES: [What typically happens in this kind of conversation — honest, 1-2 sentences]\nSCRIPTURE: [One verse that anchors it, if applicable — or leave blank]\nIN JOE'S WORDS: [One honest sentence from Joe's perspective on why this conversation matters]\n\nNo extra text before or after the card format. Stay in Joe's voice throughout.`;
    try{const result=await claudeAPI(prompt,800);setDevelopResult(result);}
    catch(e){setDevelopResult("Couldn't reach Claude right now. Try again.");}
    setDevelopLoading(false);
  }

  function saveDevelopCard(){
    if(!developResult)return;
    const get=(label)=>{const m=developResult.match(new RegExp(label+":(.+?)(?=\\n[A-Z]|$)","si"));return m?m[1].trim():"";};
    const card={
      id:Date.now(),section,date:new Date().toISOString().slice(0,10),_mode:"topic",
      topic:get("TOPIC")||developInput.slice(0,60)+"...",
      position:get("YOUR POSITION"),
      keypoints:get("KEY POINTS"),
      howgoes:get("HOW IT USUALLY GOES"),
      scripture:get("SCRIPTURE"),
      inwords:get("IN JOE'S WORDS"),
    };
    setLetstalk(p=>[card,...(p||[])]);
    setDevelopInput("");setDevelopResult(null);setDevelopMode(false);
  }

  function saveDeeperCard(){
    if(!deeperResult)return;
    const card={id:Date.now(),section:"deeper",date:new Date().toISOString().slice(0,10),_mode:"deeper",topic:deeperSource||deeperInput.slice(0,60)+"...",raw:deeperInput,insight:deeperResult};
    setLetstalk(p=>[card,...(p||[])]);
    setDeeperInput("");setDeeperSource("");setDeeperResult(null);
  }

  function copyForClaude(card){
    const txt=`SGM Going Deeper\n\nSource: ${card.topic}\n\nWhat I captured:\n${card.raw||""}\n\nInsight so far:\n${card.insight||""}\n\nHelp me go deeper on this. What am I missing? What question should I be sitting with? What does this mean for how I live, lead, or love?`;
    navigator.clipboard.writeText(txt).then(()=>{setCopiedCard(card.id);setTimeout(()=>setCopiedCard(null),2000);});
  }

  function addCard(){
    const base=isMap?mapCard:topicCard;
    if(!base.topic.trim())return;
    const card={id:Date.now(),section,date:new Date().toISOString().slice(0,10),...base,_mode:sec.mode};
    setLetstalk(p=>[card,...(p||[])]);
    if(isMap)setMapCard({topic:"",wiring:"",friction:"",bestway:"",scripture:"",inwords:""});
    else setTopicCard({topic:"",position:"",keypoints:"",howgoes:"",scripture:"",inwords:""});
    setShowAdd(false);
  }

  function parsePaste(text){
    const get=(label)=>{const m=text.match(new RegExp(label+":(.+?)(?=\\n[A-Z]|$)","si"));return m?m[1].trim():"";};
    return{topic:get("TOPIC"),section,_mode:sec.mode,position:get("YOUR POSITION"),keypoints:get("KEY POINTS"),howgoes:get("HOW IT USUALLY GOES"),wiring:get("HOW THEY'RE WIRED"),friction:get("WHERE FRICTION COMES FROM"),bestway:get("HOW TO LOVE THEM WELL"),scripture:get("SCRIPTURE"),inwords:get("IN JOE'S WORDS"),id:Date.now(),date:new Date().toISOString().slice(0,10)};
  }

  function depositPaste(){
    const card=parsePaste(pasteText);
    if(!card.topic)return;
    setLetstalk(p=>[card,...(p||[])]);
    setPasteText("");setPasteMode(false);
  }

  function deleteCard(id){setLetstalk(p=>(p||[]).filter(c=>c.id!==id));setExpandedCard(null);}

  function startEditCard(card){
    setEditForm({topic:card.topic,position:card.position||"",keypoints:card.keypoints||"",howgoes:card.howgoes||"",wiring:card.wiring||"",friction:card.friction||"",bestway:card.bestway||"",scripture:card.scripture||"",inwords:card.inwords||"",raw:card.raw||"",insight:card.insight||""});
    setEditingCard(card.id);
  }

  function saveEditCard(){
    if(!editForm.topic?.trim())return;
    setLetstalk(p=>p.map(c=>c.id===editingCard?{...c,...editForm}:c));
    setEditingCard(null);
    setEditForm({});
  }

  function cancelEditCard(){
    setEditingCard(null);
    setEditForm({});
  }
  function copyPrompt(){navigator.clipboard.writeText(activePrompt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}

  const ta={width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8};
  const inp2={width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8};

  return(
    <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color:INK,marginBottom:4,letterSpacing:"-0.5px"}}>Let's Talk</div>
      <p style={{fontStyle:"italic",color:TAN,fontSize:15,marginBottom:16,lineHeight:1.65}}>Conversation prep for the people in your life.</p>

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {LT_SECTIONS.map(s=>(
          <button key={s.id} onClick={()=>{setSection(s.id);setShowAdd(false);setExpandedCard(null);setPasteMode(false);setShowPrompt(false);setDevelopMode(false);setDevelopResult(null);setDevelopInput("");setEditingCard(null);}}
            style={{padding:"6px 12px",background:section===s.id?s.color:"transparent",color:section===s.id?"white":TAN,border:"1px solid "+(section===s.id?s.color:TANL),cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"all 0.2s"}}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div style={{padding:"12px 14px",background:sec.color+"10",borderLeft:"3px solid "+sec.color,borderRadius:8,marginBottom:16}}>
        <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,fontWeight:"bold"}}>
          {sec.icon} {isDeeper?"Going Deeper":isMap?"Relationship Map":"Develop a Topic"}
        </div>
        <p style={{fontSize:15,color:INK,margin:0,lineHeight:1.7,fontStyle:"italic"}}>{sec.desc}</p>
        {isMap&&(
          <p style={{fontSize:15,color:TAN,margin:"10px 0 0",lineHeight:1.65,borderTop:"1px solid "+sec.color+"25",paddingTop:10}}>
            These are your observations, not facts or verdicts. Written to help you love better, pray more specifically, and show up with grace. Between you and God.
          </p>
        )}
      </div>

      {isDeeper&&(
        <div style={{animation:"fadeIn 0.3s ease"}}>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:15,color:TAN,marginBottom:4}}>Where did this come from?</div>
            <input value={deeperSource} onChange={e=>setDeeperSource(e.target.value)} placeholder="Podcast, sermon, conversation, book, video..." style={inp2}/>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:15,color:TAN,marginBottom:4}}>What did you capture? Paste it all in.</div>
            <textarea value={deeperInput} onChange={e=>setDeeperInput(e.target.value)} rows={6}
              placeholder="Dump everything here — notes, quotes, what hit you, what you're still chewing on. Nothing is too raw."
              style={ta}/>
          </div>
          <button onClick={processDeeper} disabled={!deeperInput.trim()||deeperLoading}
            style={{width:"100%",padding:"12px",background:deeperInput.trim()&&!deeperLoading?sec.color:"rgba(26,46,74,0.2)",color:"white",border:"none",cursor:deeperInput.trim()&&!deeperLoading?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8,marginBottom:12}}>
            {deeperLoading?"Going deeper...":"Go Deeper"}
          </button>
          {deeperLoading&&(
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 0"}}>
              <div style={{width:16,height:16,border:"2px solid "+sec.color,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
              <span style={{fontSize:15,color:TAN,fontStyle:"italic"}}>Processing what you captured...</span>
            </div>
          )}
          {deeperResult&&!deeperLoading&&(
            <div style={{padding:"16px",background:"white",border:"1px solid "+sec.color+"40",borderTop:"3px solid "+sec.color,borderRadius:8,marginBottom:16,animation:"fadeIn 0.3s ease"}}>
              <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12,opacity:0.85}}>Going Deeper</div>
              <p style={{fontSize:15,lineHeight:1.9,color:INK,margin:"0 0 16px",whiteSpace:"pre-wrap"}}>{deeperResult}</p>
              <div style={{display:"flex",gap:8}}>
                <button onClick={saveDeeperCard} style={{flex:1,padding:"10px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save This</button>
                <button onClick={()=>{setDeeperResult(null);setDeeperInput("");setDeeperSource("");}} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Clear</button>
              </div>
            </div>
          )}
          {cards.length>0&&(
            <div style={{marginTop:8}}>
              <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>Saved</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {cards.map(card=>(
                  <div key={card.id} style={{background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+sec.color,borderRadius:8,overflow:"hidden"}}>
                    <div onClick={()=>setExpandedCard(expandedCard===card.id?null:card.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,color:INK,fontWeight:"bold",marginBottom:2}}>{card.topic}</div>
                        <div style={{fontSize:15,color:TAN}}>{card.date}</div>
                      </div>
                      <span style={{fontSize:15,color:sec.color,marginLeft:10}}>{expandedCard===card.id?"▲":"▼"}</span>
                    </div>
                    {expandedCard===card.id&&(
                      <div style={{padding:"0 14px 14px",borderTop:"1px solid "+FINK,animation:"fadeIn 0.2s ease"}}>
                        {editingCard===card.id?(
                          <div style={{marginTop:12}}>
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:13,color:TAN,marginBottom:4}}>Source</div>
                              <input value={editForm.topic||""} onChange={e=>setEditForm(f=>({...f,topic:e.target.value}))} style={inp2}/>
                            </div>
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:13,color:TAN,marginBottom:4}}>What You Captured</div>
                              <textarea value={editForm.raw||""} onChange={e=>setEditForm(f=>({...f,raw:e.target.value}))} rows={4} style={ta}/>
                            </div>
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:13,color:TAN,marginBottom:4}}>Going Deeper Insight</div>
                              <textarea value={editForm.insight||""} onChange={e=>setEditForm(f=>({...f,insight:e.target.value}))} rows={5} style={ta}/>
                            </div>
                            <div style={{display:"flex",gap:8,marginTop:4}}>
                              <button onClick={saveEditCard} style={{flex:1,padding:"10px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save Changes</button>
                              <button onClick={cancelEditCard} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
                            </div>
                          </div>
                        ):(<>
                          {card.raw&&<div style={{marginTop:12}}>
                            <div style={{fontSize:13,color:TAN,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.7}}>What You Captured</div>
                            <p style={{fontSize:15,color:TAN,lineHeight:1.7,fontStyle:"italic",margin:0}}>{card.raw}</p>
                          </div>}
                          {card.insight&&<div style={{marginTop:14}}>
                            <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>Going Deeper</div>
                            <p style={{fontSize:15,color:INK,lineHeight:1.8,margin:0,whiteSpace:"pre-wrap"}}>{card.insight}</p>
                          </div>}
                          <div style={{marginTop:14,display:"flex",gap:8}}>
                            <button onClick={()=>copyForClaude(card)} style={{flex:1,padding:"8px",background:copiedCard===card.id?GRN:"transparent",color:copiedCard===card.id?"white":sec.color,border:"1px solid "+(copiedCard===card.id?GRN:sec.color),cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"all 0.2s"}}>
                              {copiedCard===card.id?"Copied":"Copy for Claude"}
                            </button>
                            <button onClick={()=>startEditCard(card)} style={{padding:"8px 14px",background:"transparent",border:"1px solid "+sec.color,color:sec.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Edit</button>
                            <button onClick={()=>deleteCard(card.id)} style={{padding:"8px 14px",background:"transparent",border:"1px solid "+OX+"60",color:OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Delete</button>
                          </div>
                        </>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isDeeper&&(<>
        {!isMap&&(
          <div style={{marginBottom:16}}>
            <button onClick={()=>{setDevelopMode(d=>!d);setShowAdd(false);setPasteMode(false);setShowPrompt(false);setDevelopResult(null);setDevelopInput("");}}
              style={{width:"100%",padding:"11px",background:developMode?sec.color:"transparent",border:"1px solid "+sec.color,color:developMode?"white":sec.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,marginBottom:developMode?12:0}}>
              {developMode?"× Close":"✦ Develop a Topic"}
            </button>
            {developMode&&(
              <div style={{animation:"fadeIn 0.25s ease"}}>
                <div style={{fontSize:15,color:TAN,marginBottom:8}}>Paste your raw thinking — a quote, a note, what's on your mind. Claude builds the card.</div>
                <textarea value={developInput} onChange={e=>setDevelopInput(e.target.value)} rows={5}
                  placeholder={"What's the topic or conversation you're trying to prepare for? Dump your raw thinking here — notes, what you believe, how it usually goes, what you want to say..."}
                  style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:8,marginBottom:10}}/>
                <button onClick={processDevelop} disabled={!developInput.trim()||developLoading}
                  style={{width:"100%",padding:"11px",background:developInput.trim()&&!developLoading?sec.color:"rgba(26,46,74,0.2)",color:"white",border:"none",cursor:developInput.trim()&&!developLoading?"pointer":"default",fontFamily:BODY,fontSize:15,borderRadius:8,marginBottom:10}}>
                  {developLoading?"Building your card...":"Build Card"}
                </button>
                {developLoading&&(
                  <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0"}}>
                    <div style={{width:16,height:16,border:"2px solid "+sec.color,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                    <span style={{fontSize:15,color:TAN,fontStyle:"italic"}}>Building your Let's Talk card...</span>
                  </div>
                )}
                {developResult&&!developLoading&&(
                  <div style={{padding:"16px",background:"white",border:"1px solid "+sec.color+"40",borderTop:"3px solid "+sec.color,borderRadius:8,animation:"fadeIn 0.3s ease"}}>
                    <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12,opacity:0.85}}>Your Card</div>
                    <p style={{fontSize:15,lineHeight:1.9,color:INK,margin:"0 0 16px",whiteSpace:"pre-wrap"}}>{developResult}</p>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={saveDevelopCard} style={{flex:1,padding:"10px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save Card</button>
                      <button onClick={()=>{setDevelopResult(null);setDevelopInput("");}} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Clear</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <button onClick={()=>{setShowAdd(s=>!s);setPasteMode(false);setShowPrompt(false);setDevelopMode(false);}}
            style={{flex:1,padding:"10px",background:"transparent",border:"1px dashed "+sec.color,color:sec.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>
            {showAdd?"Cancel":"+ Add Card"}
          </button>
          <button onClick={()=>{setShowPrompt(s=>!s);setShowAdd(false);setPasteMode(false);}}
            style={{padding:"10px 16px",background:"transparent",border:"1px solid "+TANL,color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>?</button>
        </div>
        {showPrompt&&(
          <div style={{marginBottom:16,padding:"14px 16px",background:"white",border:"1px solid "+TANL,borderRadius:8,animation:"fadeIn 0.2s ease"}}>
            <div style={{fontSize:13,color:GOLD,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10,fontWeight:"bold"}}>{isMap?"Relationship Map":"Develop a Topic"}</div>
            <pre style={{fontFamily:BODY,fontSize:15,color:INK,lineHeight:1.75,whiteSpace:"pre-wrap",margin:"0 0 12px"}}>{activePrompt}</pre>
            <div style={{display:"flex",gap:8}}>
              <button onClick={copyPrompt} style={{flex:1,padding:"9px",background:copied?GRN:GOLD,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,transition:"background 0.3s"}}>{copied?"Copied":"Copy Prompt"}</button>
              <button onClick={()=>{setShowPrompt(false);setPasteMode(true);}} style={{flex:1,padding:"9px",background:"transparent",border:"1px solid "+sec.color,color:sec.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Paste Card</button>
            </div>
          </div>
        )}
        {pasteMode&&(
          <div style={{marginBottom:16,padding:"14px 16px",background:"white",border:"1px solid "+TANL,borderRadius:8,animation:"fadeIn 0.2s ease"}}>
            <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8,fontWeight:"bold"}}>Paste from Claude</div>
            <textarea value={pasteText} onChange={e=>setPasteText(e.target.value)} rows={8}
              placeholder={isMap?"TOPIC: ...\nHOW THEY'RE WIRED: ...\nWHERE FRICTION COMES FROM: ...\nHOW TO LOVE THEM WELL: ...\nSCRIPTURE: ...\nIN JOE'S WORDS: ...":"TOPIC: ...\nYOUR POSITION: ...\nKEY POINTS: ...\nHOW IT USUALLY GOES: ...\nSCRIPTURE: ...\nIN JOE'S WORDS: ..."}
              style={{...ta,marginBottom:10}}/>
            <div style={{display:"flex",gap:8}}>
              <button onClick={depositPaste} style={{flex:1,padding:"10px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Deposit Card</button>
              <button onClick={()=>{setPasteMode(false);setPasteText("");}} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
            </div>
          </div>
        )}
        {showAdd&&(
          <div style={{marginBottom:20,padding:"16px",background:"white",border:"1px solid "+sec.color+"40",borderTop:"3px solid "+sec.color,borderRadius:8,animation:"fadeIn 0.2s ease"}}>
            <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:14,fontWeight:"bold"}}>{isMap?"New Relationship Profile":"New Card"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <div style={{fontSize:15,color:TAN,marginBottom:4}}>{isMap?"Person's Name":"Topic / Person"}</div>
                <input value={activeForm.topic} onChange={e=>setActiveForm(f=>({...f,topic:e.target.value}))} placeholder={isMap?"Name...":"Topic or name..."} style={inp2}/>
              </div>
              {activeFields.map(f=>(
                <div key={f.key}>
                  <div style={{fontSize:15,color:TAN,marginBottom:4}}>{f.label}</div>
                  <textarea value={activeForm[f.key]||""} onChange={e=>setActiveForm(ff=>({...ff,[f.key]:e.target.value}))} placeholder={f.ph} rows={2} style={ta}/>
                </div>
              ))}
              <div style={{display:"flex",gap:8}}>
                <button onClick={addCard} style={{flex:1,padding:"11px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save</button>
                <button onClick={()=>setShowAdd(false)} style={{padding:"11px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {cards.length===0&&!showAdd&&!pasteMode&&(
          <div style={{padding:"24px 16px",textAlign:"center",border:"1px dashed "+TANL,borderRadius:8}}>
            <p style={{color:TAN,fontStyle:"italic",fontSize:15,margin:0}}>No cards yet for {sec.label}. Add one above or paste from Claude.</p>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {cards.map(card=>{
            const fields=(card._mode==="map"||isMap)?MAP_FIELDS:TOPIC_FIELDS;
            return(
              <div key={card.id} style={{background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+sec.color,borderRadius:8,overflow:"hidden"}}>
                <div onClick={()=>setExpandedCard(expandedCard===card.id?null:card.id)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:16,color:INK,fontWeight:"bold",marginBottom:4}}>{card.topic}</div>
                    {(card.position||card.wiring)&&(
                      <div style={{fontSize:15,color:TAN,lineHeight:1.5,fontStyle:"italic"}}>
                        {(card.position||card.wiring||"").slice(0,80)}{(card.position||card.wiring||"").length>80?"...":""}
                      </div>
                    )}
                    {(card._mode==="map"||isMap)&&card.conversationLog?.length>0&&(
                      <div style={{fontSize:12,color:"#7A4F6A",marginTop:4}}>{card.conversationLog.length} conversation{card.conversationLog.length===1?"":"s"} logged</div>
                    )}
                  </div>
                  <div style={{fontSize:15,color:sec.color,marginLeft:10,flexShrink:0}}>{expandedCard===card.id?"▲":"▼"}</div>
                </div>
                {expandedCard===card.id&&(
                  <div style={{padding:"0 16px 16px",borderTop:"1px solid "+FINK,animation:"fadeIn 0.2s ease"}}>
                    {editingCard===card.id?(
                      <div style={{marginTop:12}}>
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:13,color:TAN,marginBottom:4}}>{isMap?"Person's Name":"Topic / Person"}</div>
                          <input value={editForm.topic||""} onChange={e=>setEditForm(f=>({...f,topic:e.target.value}))} style={inp2}/>
                        </div>
                        {fields.map(f=>(
                          <div key={f.key} style={{marginBottom:10}}>
                            <div style={{fontSize:13,color:TAN,marginBottom:4}}>{f.label}</div>
                            <textarea value={editForm[f.key]||""} onChange={e=>setEditForm(ff=>({...ff,[f.key]:e.target.value}))} rows={2} style={ta}/>
                          </div>
                        ))}
                        <div style={{display:"flex",gap:8,marginTop:4}}>
                          <button onClick={saveEditCard} style={{flex:1,padding:"10px",background:sec.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Save Changes</button>
                          <button onClick={cancelEditCard} style={{padding:"10px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
                        </div>
                      </div>
                    ):(<>
                      {fields.filter(f=>card[f.key]).map(f=>(
                        <div key={f.key} style={{marginTop:12}}>
                          <div style={{fontSize:13,color:sec.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:4,opacity:0.8}}>{f.label}</div>
                          <p style={{fontSize:15,lineHeight:1.75,color:INK,margin:0}}>{card[f.key]}</p>
                        </div>
                      ))}
                      {(card._mode==="map"||isMap)&&(
                        <ConversationLog card={card} onUpdateLog={(newLog)=>{
                          setLetstalk(p=>p.map(c=>c.id===card.id?{...c,conversationLog:newLog}:c));
                        }}/>
                      )}
                      <div style={{marginTop:14,display:"flex",gap:8,justifyContent:"flex-end"}}>
                        <button onClick={()=>startEditCard(card)} style={{padding:"6px 14px",background:"transparent",border:"1px solid "+sec.color,color:sec.color,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Edit</button>
                        <button onClick={()=>deleteCard(card.id)} style={{padding:"6px 14px",background:"transparent",border:"1px solid "+OX+"60",color:OX,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Delete</button>
                      </div>
                    </>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>)}
    </div>
  );
}


const WHERE_GUIDE_TABS=[
  {tab:"Week",icon:"◈",desc:"Your morning. Today's verse and study, your day plan, calendar, yesterday's recap."},
  {tab:"Habits",icon:"✓",desc:"Daily checklist that resets every day. Vitamins, prayer, stretching — the small stuff."},
  {tab:"Map",icon:"◎",desc:"Your life areas — Faith, Family, SGM, Health, etc. Projects and tasks live here, plus the Shelf for quick capture and a morning word for whatever you're working through."},
  {tab:"Word",icon:"✦",desc:"Your personal scripture library — verses for specific struggles, the ones that have carried you through, and the ones you're memorizing. Browse by category or pull up exactly what you need in the moment."},
  {tab:"Identity",icon:"☰",desc:"Where the real battle gets tracked. Deposit a principle when God shows you something about a pattern. Also has the SGM Guides (RTB, IDF, GLF)."},
  {tab:"Prayer",icon:"+",desc:"People and requests you're carrying. Mark answered prayers as a testimony log."},
  {tab:"Field Notes",icon:"◷",desc:"End-of-day honest reflection. The Stack, completions, one paragraph about today."},
  {tab:"Let's Talk",icon:"♡",desc:"Conversation prep, things you heard that stuck with you, and your read on the people in your life."},
  {tab:"Archive",icon:"⊡",desc:"Your backup. Copy what's new and paste into Notion."},
];

const WHERE_GUIDE_SITUATIONS=[
  {q:"Something just happened with a person — Shawn, a kid, a friend",a:"Let's Talk → People I Know",icon:"♡",color:"#7A4F6A"},
  {q:"I need to remember to do something, but not right now",a:"Shelf (on Map)",icon:"⊡",color:OX},
  {q:"I heard something — sermon, podcast, conversation — and I'm not done with it",a:"Let's Talk → Going Deeper",icon:"⬇",color:"#2E5B8A"},
  {q:"I'm wrestling with shame, perfectionism, or a pattern I keep hitting",a:"Identity",icon:"☰",color:OX},
  {q:"Someone needs prayer",a:"Prayer",icon:"+",color:OX},
  {q:"I have a hard or important conversation coming up",a:"Let's Talk → Develop a Topic",icon:"✦",color:OX},
  {q:"I want to be honest about how today actually went",a:"Field Notes",icon:"◷",color:GOLD},
  {q:"I just want to check off the basics and move on",a:"Habits",icon:"✓",color:GRN},
  {q:"I need to see everything going on in my life at once",a:"Map",icon:"◎",color:"#1A7A8A"},
];

const WHY_BUILT_THIS=[
  {
    h:"The problem",
    body:"I had 20 years of life experience, sobriety, scripture, and lessons learned the hard way — and nowhere to put any of it. It lived in my head, in scattered notes, in conversations I'd have once and never capture again. I'd learn something real and then lose it because there was no system catching it."
  },
  {
    h:"What this actually is",
    body:"A personal operating system for my life — tasks, prayer, habits, scripture, and the people I love — all in one place, built so that nothing I learn or notice gets lost. When I catch a pattern in myself, I can record it. When I have a hard conversation coming up, I can prep for it. When I talk to someone and notice something worth remembering, it's saved instead of forgotten by next week."
  },
  {
    h:"Why it's not just a to-do app",
    body:"To-do apps track tasks. This tracks growth — the tasks, but also the why behind them, the patterns underneath them, and the relationships they touch. It's the difference between checking a box and actually understanding myself better over time."
  },
  {
    h:"How AI fits in",
    body:"AI is the microphone, not the message. It doesn't think for me or tell me what to believe — it helps me capture my own thinking faster, organize what I already know, and ask better questions. Everything that comes out of it still has to pass through me first."
  },
  {
    h:"Who it's for",
    body:"Right now, just me. It's the proving ground for Steen Growth Ministries — everything I'm building for other people eventually gets tested on myself first. If it doesn't actually help me grow, it's not ready to hand to anyone else."
  },
];

const PROBLEM_SOLVED=[
  {
    tab:"Week",icon:"◈",color:"#1A7A8A",
    problem:"Mornings without direction — scattered between calendar and to-do lists, no spiritual anchor before the day started pulling at me.",
    helping:"One place that opens with scripture and a study, shows what's actually on the calendar, and sets the tone before anything else competes for my attention.",
    temp:"Calm. This is the one that starts the day right."
  },
  {
    tab:"Habits",icon:"✓",color:GRN,
    problem:"I'd forget the small stuff — vitamins, stretching, prayer — not because it didn't matter, but because nothing was tracking it.",
    helping:"A short daily checklist that resets every morning. I check it off, I watch the streak build, and the small stuff stops slipping.",
    temp:"Light. Almost satisfying. Low effort, real payoff."
  },
  {
    tab:"Map",icon:"◎",color:"#1A7A8A",
    problem:"My life felt like too many moving pieces at once — Faith, Family, SGM, Health — with no way to see all of it together. And my head was the only place ideas and half-formed tasks lived, so I was either dropping things or carrying mental weight all day trying not to forget them.",
    helping:"Every area of my life lives here as its own category, with real tasks and real progress — plus the Shelf right underneath, so anything not ready for today gets captured and off my mind instead of lost.",
    temp:"Grounding. It quiets the noise of 'what am I forgetting.'"
  },
  {
    tab:"Word",icon:"✦",color:OX,
    problem:"I'd know scripture existed for what I was going through — a roadblock, a pattern, a moment of fear — but couldn't always find the right verse when I actually needed it. And the verses that have personally meant the most to me were scattered everywhere.",
    helping:"One place for all of it — verses organized by what they speak to, the ones I've personally held onto, and space to note what each one has meant to me. When something hits, I can find the right word fast instead of searching.",
    temp:"Grounding. Feels like having the right ammunition already loaded."
  },
  {
    tab:"Identity",icon:"☰",color:OX,
    problem:"The same patterns — shame, perfectionism, fear — kept resurfacing and I had no record of it, so I'd relearn the same lesson from scratch every single time it came back around.",
    helping:"Every time God shows me something about a pattern, I deposit it right here, tagged, dated. Now I can actually see what keeps recurring instead of getting blindsided by it again.",
    temp:"This is the one that confronts me the most, but it's also the one doing the deepest work."
  },
  {
    tab:"Prayer",icon:"+",color:OX,
    problem:"I'd promise someone I'd pray for them and then genuinely lose track — not from not caring, just from not having anywhere to put it.",
    helping:"Every name and request lives here. I can see who I'm carrying, and when something gets answered, it becomes part of my testimony instead of disappearing.",
    temp:"Faithful. This one keeps me honest about who I said I'd carry."
  },
  {
    tab:"Field Notes",icon:"◷",color:GOLD,
    problem:"Most days just blurred together — I'd finish one without ever really processing what actually happened in it.",
    helping:"A few minutes at the end of the day to be honest about what I did, what I'm carrying, and what's worth remembering — before it's gone.",
    temp:"Reflective. Slows me down enough to actually notice my own life."
  },
  {
    tab:"Let's Talk",icon:"♡",color:"#7A4F6A",
    problem:"I'd walk into important conversations underprepared, or hear something that stuck with me and lose the thread before I ever did anything with it, or struggle to remember the real patterns in how I relate to the people closest to me.",
    helping:"A place to prep conversations before they happen, capture what's still sitting with me after I hear something, and keep an honest read on the people I love so I can pray for them and show up better.",
    temp:"This one does the most — conversation prep, processing, and relationship awareness, all in one place."
  },
  {
    tab:"Archive",icon:"⊡",color:INK,
    problem:"Everything lived only in this app — if it ever broke or disappeared, years of growth would go with it.",
    helping:"A running, dated backup that only shows what's new since I last copied it, so I can paste it into Notion without duplicating or losing anything, even if I miss a few nights.",
    temp:"Insurance. Quiet in the background until I need it."
  },
];


const DAILY_WORKFLOW=[
  {time:"Morning",icon:"◉",color:OX,steps:["Open Morning tab — read Yesterday's Recap","Load Image of the Day","Read Today's Anchor verse, tap to open the study","Respond with your prayer and observation","Check In — talk out how you're feeling and what's ahead","Tap 'Get Today's Read' to see what your app is tracking"]},
  {time:"Through the Day",icon:"◈",color:"#2E5B8A",steps:["Something happens with a person → People I Know (Let's Talk)","Hear something that sticks → Going Deeper (Let's Talk)","Task or idea that can wait → Shelf (on Map)","Wrestling with a pattern → Identity deposit","Someone needs prayer → Prayer tab","Feeling off or stuck → Check In on Morning tab"]},
  {time:"Today Tab",icon:"◎",color:GRN,steps:["Set your Morning Thought and Today's Focus","Check your calendar — add anything that belongs there","Work from the task list in Map","Log completions as you go"]},
  {time:"Evening",icon:"✦",color:GOLD,steps:["Evening Reflection in Today tab — one honest sentence","Open Archive — tap Copy, paste into Notion Kingdom Notebook","That's it. You're done."]},
];

const WORKFLOW_ENCOURAGEMENT="This app works when you use it like a companion, not a system. You don't have to do it perfectly. Open it, put something in, close it. That's the whole thing.";

function WhereGuideOverlay({onClose}){
  const [tab,setTab]=useState("tabs");
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,46,74,0.55)",zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn 0.2s ease"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:PAPER,width:"100%",maxWidth:700,maxHeight:"82vh",borderRadius:"16px 16px 0 0",overflowY:"auto",animation:"fadeIn 0.25s ease"}}>
        <div style={{position:"sticky",top:0,background:PAPER,borderBottom:"1px solid "+FINK,padding:"16px 20px 12px",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontFamily:SERIF,fontSize:20,fontWeight:700,color:INK}}>{tab==="tabs"?"Quick Reference":tab==="why"?"Why I Built This":tab==="workflow"?"Daily Workflow":"What It Solves"}</div>
            <button onClick={onClose} style={{background:"transparent",border:"1px solid "+TANL,color:TAN,width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>setTab("tabs")} style={{flex:1,padding:"7px 3px",background:tab==="tabs"?INK:"transparent",color:tab==="tabs"?"white":TAN,border:"1px solid "+(tab==="tabs"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:11,borderRadius:8,letterSpacing:"0.3px"}}>
              Quick Ref
            </button>
            <button onClick={()=>setTab("why")} style={{flex:1,padding:"7px 3px",background:tab==="why"?INK:"transparent",color:tab==="why"?"white":TAN,border:"1px solid "+(tab==="why"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:11,borderRadius:8,letterSpacing:"0.3px"}}>
              Why Built
            </button>
            <button onClick={()=>setTab("problem")} style={{flex:1,padding:"7px 3px",background:tab==="problem"?INK:"transparent",color:tab==="problem"?"white":TAN,border:"1px solid "+(tab==="problem"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:11,borderRadius:8,letterSpacing:"0.3px"}}>
              What Solves
            </button>
            <button onClick={()=>setTab("workflow")} style={{flex:1,padding:"7px 3px",background:tab==="workflow"?INK:"transparent",color:tab==="workflow"?"white":TAN,border:"1px solid "+(tab==="workflow"?INK:TANL),cursor:"pointer",fontFamily:BODY,fontSize:11,borderRadius:8,letterSpacing:"0.3px"}}>
              Daily Flow
            </button>
          </div>
        </div>

        <div style={{padding:"16px 20px 40px"}}>
          {tab==="problem"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <p style={{fontStyle:"italic",color:TAN,fontSize:14,lineHeight:1.65,margin:"0 0 4px"}}>The actual friction each tab solves, in plain terms.</p>
              {PROBLEM_SOLVED.map((p,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(26,46,74,0.08)"}}>
                  <div style={{background:p.color,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20,color:"white"}}>{p.icon}</span>
                    <span style={{fontSize:16,color:"white",fontWeight:"bold",fontFamily:SERIF}}>{p.tab}</span>
                  </div>
                  <div style={{padding:"14px 16px"}}>
                    <div style={{marginBottom:12}}>
                      <div style={{fontSize:11,color:p.color,letterSpacing:"2px",textTransform:"uppercase",fontWeight:"bold",marginBottom:4,opacity:0.85}}>The problem I had</div>
                      <p style={{fontSize:14,lineHeight:1.65,color:INK,margin:0}}>{p.problem}</p>
                    </div>
                    <div style={{marginBottom:12,padding:"10px 12px",background:p.color+"0D",borderLeft:"3px solid "+p.color,borderRadius:6}}>
                      <div style={{fontSize:11,color:p.color,letterSpacing:"2px",textTransform:"uppercase",fontWeight:"bold",marginBottom:4,opacity:0.85}}>How this is helping</div>
                      <p style={{fontSize:14,lineHeight:1.65,color:INK,margin:0}}>{p.helping}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:13,color:TAN,fontStyle:"italic"}}>{p.temp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab==="tabs"&&(
            <div>
              <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>✦ What Each Tab Does</div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
                {WHERE_GUIDE_TABS.map((t,i)=>(
                  <div key={i} style={{background:"white",border:"1px solid "+FINK,borderRadius:8,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <span style={{fontSize:18,color:OX,flexShrink:0,marginTop:1}}>{t.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,color:INK,fontWeight:"bold",marginBottom:3}}>{t.tab}</div>
                      <div style={{fontSize:14,color:TAN,lineHeight:1.55}}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.85}}>✦ In The Moment</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {WHERE_GUIDE_SITUATIONS.map((s,i)=>(
                  <div key={i} style={{background:"white",border:"1px solid "+FINK,borderLeft:"3px solid "+s.color,borderRadius:8,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <span style={{fontSize:18,color:s.color,flexShrink:0,marginTop:1}}>{s.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,color:INK,lineHeight:1.5,marginBottom:4}}>{s.q}</div>
                      <div style={{fontSize:14,color:s.color,fontWeight:"bold"}}>→ {s.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="workflow"&&(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <p style={{fontStyle:"italic",color:TAN,fontSize:14,lineHeight:1.65,margin:0}}>The daily rhythm — morning to evening. Use this to re-enter after a few days away.</p>
              {DAILY_WORKFLOW.map((block,i)=>(
                <div key={i} style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(26,46,74,0.06)"}}>
                  <div style={{background:block.color,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,color:"white"}}>{block.icon}</span>
                    <span style={{fontSize:12,color:"white",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"bold",opacity:0.95}}>{block.time}</span>
                  </div>
                  <div style={{padding:"10px 14px 12px"}}>
                    {block.steps.map((step,j)=>(
                      <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:j<block.steps.length-1?8:0}}>
                        <div style={{width:18,height:18,borderRadius:"50%",border:"1px solid "+block.color,color:block.color,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,fontWeight:"bold"}}>{j+1}</div>
                        <span style={{fontSize:14,color:INK,lineHeight:1.55,fontFamily:BODY}}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{background:INK,borderRadius:10,padding:"16px",marginTop:4}}>
                <div style={{fontSize:11,color:CYAN,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>✦ Remember</div>
                <p style={{fontSize:15,color:"rgba(255,255,255,0.85)",lineHeight:1.8,margin:0,fontFamily:BODY,fontStyle:"italic"}}>{WORKFLOW_ENCOURAGEMENT}</p>
              </div>
            </div>
          )}
          {tab==="why"&&(
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              {WHY_BUILT_THIS.map((s,i)=>(
                <div key={i}>
                  <div style={{fontSize:12,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.85}}>✦ {s.h}</div>
                  <p style={{fontSize:15,lineHeight:1.8,color:INK,margin:0}}>{s.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default function App(){
  const [cats,setCats]=useState(INIT_CATS);
  const [library,setLibrary]=useState(INIT_LIB);
  const [activeCat,setActiveCat]=useState(null);
  const [view,setView]=useState("planner");
  const [history,setHistory]=useState([]);
  const [stack,setStack]=useState(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("sgm3-stack")||"{}");
      const todayKey=new Date().toISOString().slice(0,10);
      return saved[todayKey]||[];
    }catch(e){return[];}
  });
  const [loaded,setLoaded]=useState(false);
  const [saveStatus,setSaveStatus]=useState("");
  const [addingTask,setAddingTask]=useState(false);
  const [newTask,setNewTask]=useState({label:"",resistance:"low",roadblock:null});
  const [projectView,setProjectView]=useState(null);
  const [habits,setHabits]=useState({});
  const [customHabits,setCustomHabits]=useState([]);
  const [streaks,setStreaks]=useState({});
  const [prayers,setPrayers]=useState([]);
  const [planner,setPlanner]=useState({});
  const [shelf,setShelf]=useState([]);
  const [letstalk,setLetstalk]=useState([]);
  const [checkIns,setCheckIns]=useState([]);
  const [showSnapshot,setShowSnapshot]=useState(false);
  const [showCompleted,setShowCompleted]=useState({});
  const [lastArchivedAt,setLastArchivedAt]=useState(null);
  const [showWhereGuide,setShowWhereGuide]=useState(false);

  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  const todayVerse=ANCH[dayOfYear%ANCH.length]||ANCH[0]||{v:"Trust in the Lord with all your heart and lean not on your own understanding.",r:"Proverbs 3:5",app:"Trust Him today."};
  const today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  // Fix iOS bounce-scroll bleed — match body/html background to the dark header
  // so overscroll at the top doesn't reveal the lighter Paper tone behind it.
  useEffect(()=>{
    document.documentElement.style.background=INK;
    document.body.style.background=INK;
    return()=>{
      document.documentElement.style.background="";
      document.body.style.background="";
    };
  },[]);

  useEffect(()=>{
    function load(){
      // v27 — clear old library format, start fresh
      const libVer=localStorage.getItem("sgm3-lib-version");
      if(libVer!=="v27"){localStorage.removeItem("sgm3-library");localStorage.setItem("sgm3-lib-version","v27");}
      try{const r=localStorage.getItem("sgm3-cats");if(r)setCats(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-history");if(r)setHistory(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-library");if(r)setLibrary(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-habits");if(r)setHabits(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-customhabits");if(r)setCustomHabits(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-streaks");if(r)setStreaks(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-prayers");if(r)setPrayers(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-planner");if(r)setPlanner(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-shelf");if(r)setShelf(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-letstalk");if(r)setLetstalk(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-checkins");if(r)setCheckIns(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-last-archived");if(r)setLastArchivedAt(JSON.parse(r));}catch(e){}
      setLoaded(true);
    }
    load();
  },[]);

  useEffect(()=>{
    if(!loaded)return;
    const timer=setTimeout(()=>{
      try{localStorage.setItem("sgm3-cats",JSON.stringify(cats));}catch(e){}
      try{localStorage.setItem("sgm3-history",JSON.stringify(history));}catch(e){}
      try{localStorage.setItem("sgm3-library",JSON.stringify(library));}catch(e){}
      try{localStorage.setItem("sgm3-habits",JSON.stringify(habits));}catch(e){}
      try{localStorage.setItem("sgm3-customhabits",JSON.stringify(customHabits));}catch(e){}
      try{localStorage.setItem("sgm3-streaks",JSON.stringify(streaks));}catch(e){}
      try{localStorage.setItem("sgm3-prayers",JSON.stringify(prayers));}catch(e){}
      try{localStorage.setItem("sgm3-planner",JSON.stringify(planner));}catch(e){}
      try{localStorage.setItem("sgm3-shelf",JSON.stringify(shelf));}catch(e){}
      try{localStorage.setItem("sgm3-letstalk",JSON.stringify(letstalk));}catch(e){}
      try{localStorage.setItem("sgm3-checkins",JSON.stringify(checkIns));}catch(e){}
      try{localStorage.setItem("sgm3-last-archived",JSON.stringify(lastArchivedAt));}catch(e){}
      try{
        const todayKey=new Date().toISOString().slice(0,10);
        const saved=JSON.parse(localStorage.getItem("sgm3-stack")||"{}");
        saved[todayKey]=stack;
        localStorage.setItem("sgm3-stack",JSON.stringify(saved));
      }catch(e){}
    },800);
    return()=>clearTimeout(timer);
  },[cats,history,library,habits,customHabits,streaks,prayers,planner,shelf,stack,letstalk,checkIns,lastArchivedAt,loaded]);

  // Stack daily reset
  useEffect(()=>{
    const todayKey=new Date().toISOString().slice(0,10);
    if(stack.length>0&&stack[0].date&&stack[0].date!==todayKey){setStack([]);}
    const now=new Date();
    const msUntilMidnight=(new Date(now.getFullYear(),now.getMonth(),now.getDate()+1)-now)+1000;
    const timer=setTimeout(()=>setStack([]),msUntilMidnight);
    return()=>clearTimeout(timer);
  },[]);

  function addTask(catId){
    if(!newTask.label.trim())return;
    setCats(prev=>prev.map(cat=>cat.id!==catId?cat:{...cat,tasks:[...cat.tasks,{id:catId+Date.now(),label:newTask.label,resistance:newTask.resistance,roadblocks:newTask.roadblocks||[],roadblock:newTask.roadblocks?.[0]||null,done:false,steps:[]}]}));
    setNewTask({label:"",resistance:"low",roadblocks:[]});
    setAddingTask(false);
  }

  const manualSave = ()=>{
    try{localStorage.setItem("sgm3-cats",JSON.stringify(cats));}catch(e){}
    try{localStorage.setItem("sgm3-history",JSON.stringify(history));}catch(e){}
    try{localStorage.setItem("sgm3-library",JSON.stringify(library));}catch(e){}
    try{localStorage.setItem("sgm3-habits",JSON.stringify(habits));}catch(e){}
    try{localStorage.setItem("sgm3-streaks",JSON.stringify(streaks));}catch(e){}
    try{localStorage.setItem("sgm3-prayers",JSON.stringify(prayers));}catch(e){}
    try{localStorage.setItem("sgm3-planner",JSON.stringify(planner));}catch(e){}
    try{localStorage.setItem("sgm3-shelf",JSON.stringify(shelf));}catch(e){}
  };

  function getCatPct(cat){
    const simple=cat.tasks.filter(t=>!t.steps||!t.steps.length);
    const stepped=cat.tasks.filter(t=>t.steps&&t.steps.length);
    const total=simple.length+stepped.flatMap(t=>t.steps).length;
    if(!total)return 0;
    return Math.round((simple.filter(t=>t.done).length+stepped.flatMap(t=>t.steps.filter(s=>s.done)).length)/total*100);
  }

  function getOverall(){
    const all=cats.flatMap(c=>c.tasks);
    return all.length?Math.round(all.filter(t=>t.done).length/all.length*100):0;
  }

  function toggleTask(catId,taskId){
    let completed=null;
    setCats(prev=>prev.map(cat=>{
      if(cat.id!==catId)return cat;
      return{...cat,tasks:cat.tasks.map(t=>{
        if(t.id!==taskId)return t;
        const nowDone=!t.done;
        if(nowDone)completed={id:Date.now(),date:today,category:cat.label,categoryColor:cat.color,task:t.label,resistance:t.resistance};
        return{...t,done:nowDone};
      })};
    }));
    if(completed)setHistory(h=>[completed,...h]);
  }

  function updateTask(catId,updTask){
    setCats(prev=>prev.map(cat=>cat.id!==catId?cat:{...cat,tasks:cat.tasks.map(t=>t.id===updTask.id?updTask:t)}));
  }

  if(projectView){
    const pCat=cats.find(c=>c.id===projectView.catId);
    const pTask=pCat?.tasks.find(t=>t.id===projectView.taskId);
    if(pCat&&pTask)return <ProjectScreen task={pTask} cat={pCat} onBack={()=>setProjectView(null)} onUpdate={ut=>updateTask(pCat.id,ut)}/>;
  }

  if(showSnapshot)return <LifeSnapshotOverlay cats={cats} habits={habits} prayers={prayers} shelf={shelf} streaks={streaks} onClose={()=>setShowSnapshot(false)}/>;


  if(!loaded)return <div style={{minHeight:"100vh",background:PAPER,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:BODY,fontStyle:"italic",color:TAN}}>Loading…</div>;

  const aC=cats.find(c=>c.id===activeCat);
  const overall=getOverall();
  const inp={padding:"9px 12px",border:"1px solid "+TANL,background:"white",fontFamily:BODY,fontSize:15,color:INK,outline:"none",borderRadius:8};

  return(
    <div style={{minHeight:"100vh",background:INK,fontFamily:BODY,color:INK,paddingBottom:80}}>
      <style>{"@keyframes pulse{0%,100%{opacity:0.4;transform:scale(0.97)}50%{opacity:0.8;transform:scale(1.03)}} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeSave{0%{opacity:1}80%{opacity:1}100%{opacity:0}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} *{box-sizing:border-box;} button{transition:opacity 0.15s;} button:hover{opacity:0.82;}"}</style>

      <div style={{background:INK,position:"sticky",top:0,zIndex:100,width:"100%",left:0,right:0,overflow:"hidden"}}>
        <div style={{maxWidth:700,margin:"0 auto",padding:"14px 20px 0",background:INK}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div onClick={()=>{setView("planner");window.scrollTo({top:0,behavior:"instant"});}} style={{cursor:"pointer"}}>
              <Logo size={100}/>
            </div>
            <div style={{width:1,height:90,background:"rgba(255,255,255,0.18)"}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:TANL,letterSpacing:"3px",textTransform:"uppercase",marginBottom:2}}>Steen Growth Ministries</div>
              <div style={{fontSize:22,fontWeight:"bold",color:"white",letterSpacing:"-0.5px",lineHeight:1.1}}>Life Orientation</div>
              <div style={{fontSize:13,color:TANL,fontStyle:"italic",opacity:0.85,marginTop:3}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).replace(",", " —")}</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:4}}>
            {[TABS_ROW1,TABS_ROW2].map((row,ri)=>(
              <div key={ri} style={{display:"flex",paddingBottom:ri===1?4:0}}>
                {row.map(tab=>{
                  const isAct=view===tab.id;
                  return(
                    <button key={tab.id} onClick={()=>{setView(tab.id);window.scrollTo({top:0,behavior:"instant"});}} style={{background:isAct?"rgba(109,220,232,0.14)":"none",border:isAct?"1px solid #6DDCE8":"1px solid transparent",borderRadius:3,padding:"7px 2px 8px",cursor:"pointer",flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center",height:24}}>
                        {tab.type==="cross"?<CrossSVG color={isAct?"#6DDCE8":TANL} size={19}/>:<span style={{fontSize:tab.g==="✦"?26:21,color:isAct?"#6DDCE8":TANL,lineHeight:1}}>{tab.g}</span>}
                      </span>
                      <span style={{fontSize:12,fontWeight:isAct?"bold":"normal",letterSpacing:"0.04em",color:isAct?"#6DDCE8":TANL,opacity:isAct?1:0.85,lineHeight:1}}>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {/* Gradient transition band */}
        <div style={{height:6,background:"linear-gradient(to right, #1A2E4A, #1BAEE8, #6DDCE8, #1BAEE8, #1A2E4A)"}}/>
        <div style={{height:2,background:INK}}/>
      </div>

      <div style={{maxWidth:700,margin:"0 auto",padding:"24px 20px 0",background:PAPER,minHeight:"calc(100vh - 180px)"}}>

        {view==="dashboard"&&(
          <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
            <DailyMsg cats={cats} habits={habits} prayers={prayers} streaks={streaks}/>
            <div style={{display:"flex",justifyContent:"center",marginBottom:36}}>
              <div style={{textAlign:"center"}}>
                <Ring size={140} pct={overall} color="#6DDCE8" color2="#1A2E4A" sw={12} main={true}>
                  <div style={{fontSize:32,fontWeight:"bold",color:INK,lineHeight:1,letterSpacing:"-1px"}}>{overall}%</div>
                  <div style={{fontSize:12,color:TAN,letterSpacing:"2px",textTransform:"uppercase",marginTop:3}}>Overall</div>
                </Ring>
                <div style={{marginTop:10,fontSize:15,fontStyle:"italic",color:GOLD}}>Life Projects</div>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <button onClick={()=>setShowSnapshot(true)} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+INK,color:INK,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:15}}>◎</span> Life Snapshot
              </button>
            </div>
            <div style={{marginBottom:16}}>
              <AISuggestButton cats={cats} planner={planner} setPlanner={setPlanner}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:28}}>
              {cats.map(cat=>{
                const pct=getCatPct(cat);
                const isAct=activeCat===cat.id;
                return(
                  <div key={cat.id} onClick={()=>setActiveCat(isAct?null:cat.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 6px",cursor:"pointer",background:isAct?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.25)",border:"1px solid "+(isAct?cat.color:FINK),borderRadius:8,transition:"all 0.2s"}}>
                    <Ring size={56} pct={pct} color={cat.color} color2={cat.color2||"#6DDCE8"} sw={4}><span style={{fontSize:15,color:cat.color}}>{cat.icon}</span></Ring>
                    <div style={{marginTop:6,fontSize:12,fontWeight:"bold",color:INK,textAlign:"center",lineHeight:1.2}}>{cat.label}</div>
                    <div style={{fontSize:12,color:TAN,marginTop:2}}>{cat.tasks.filter(t=>t.done).length}/{cat.tasks.length}</div>
                  </div>
                );
              })}
            </div>
            {aC&&(
              <div style={{background:"white",border:"1px solid "+FINK,borderTop:"3px solid "+aC.color,padding:"18px 16px",marginBottom:20,borderRadius:8,animation:"fadeIn 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:17,fontWeight:"bold",color:aC.color}}>{aC.icon} {aC.label}</div>
                    <div style={{fontStyle:"italic",fontSize:15,color:INK,marginTop:2,opacity:0.7}}>{aC.state}</div>
                  </div>
                  <button onClick={()=>setActiveCat(null)} style={{background:"none",border:"none",color:TAN,cursor:"pointer",fontSize:20}}>x</button>
                </div>

                {/* Active projects */}
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {aC.tasks.filter(t=>!t.done).map(task=>(
                    <div key={task.id} style={{background:"white",border:"1px solid "+FINK,borderRadius:8,overflow:"hidden"}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px"}}>
                        <div onClick={()=>toggleTask(aC.id,task.id)} style={{width:20,height:20,borderRadius:"50%",flexShrink:0,marginTop:1,cursor:"pointer",border:"2px solid "+TANL,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}/>
                        <div style={{flex:1}}>
                          <div style={{fontSize:15,color:INK,lineHeight:1.4}}>{task.label}</div>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,flexWrap:"wrap"}}>
                            <RDot level={task.resistance}/>
                            {(task.roadblocks&&task.roadblocks.length>0?task.roadblocks:[task.roadblock].filter(Boolean)).map(rb=>(
                              <span key={rb} style={{fontSize:13,color:OX,fontStyle:"italic"}}>{rb}</span>
                            ))}
                            {task.steps&&task.steps.length>0&&<span style={{fontSize:13,color:aC.color}}>{task.steps.filter(s=>s.done).length}/{task.steps.length} steps</span>}
                          </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                          <button onClick={()=>setProjectView({catId:aC.id,taskId:task.id})} style={{background:"transparent",border:"1px solid "+aC.color+"50",color:aC.color,padding:"3px 8px",cursor:"pointer",fontSize:13,fontFamily:BODY,borderRadius:8,whiteSpace:"nowrap"}}>Break down</button>
                          <button onClick={()=>{setShelf(s=>[...s,{id:"sh"+Date.now(),label:task.label,timeframe:"week",note:"From "+aC.label}]);setCats(prev=>prev.map(c=>c.id!==aC.id?c:{...c,tasks:c.tasks.filter(t=>t.id!==task.id)}));}}
                            style={{background:"transparent",border:"1px solid "+TANL,color:TAN,padding:"3px 8px",cursor:"pointer",fontSize:13,fontFamily:BODY,borderRadius:8,whiteSpace:"nowrap"}}>→ Shelf</button>
                        </div>
                      </div>
                      {task.steps&&task.steps.length>0&&(
                        <div style={{height:2,background:FINK,margin:"0 12px 8px"}}>
                          <div style={{height:"100%",background:aC.color,width:Math.round(task.steps.filter(s=>s.done).length/task.steps.length*100)+"%",transition:"width 0.3s"}}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Completed projects — collapsed section */}
                {aC.tasks.filter(t=>t.done).length>0&&(
                  <div style={{marginTop:12}}>
                    <button onClick={()=>setShowCompleted(s=>({...s,[aC.id]:!s[aC.id]}))}
                      style={{width:"100%",padding:"6px",background:"transparent",border:"1px solid "+FINK,color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:13,fontStyle:"italic",borderRadius:8,textAlign:"left"}}>
                      {showCompleted[aC.id]?"▲":"▼"} Completed ({aC.tasks.filter(t=>t.done).length})
                    </button>
                    {showCompleted[aC.id]&&(
                      <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:6}}>
                        {aC.tasks.filter(t=>t.done).map(task=>(
                          <div key={task.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:aC.color+"08",border:"1px solid "+aC.color+"25",borderRadius:8}}>
                            <div onClick={()=>toggleTask(aC.id,task.id)} style={{width:18,height:18,borderRadius:"50%",flexShrink:0,cursor:"pointer",border:"2px solid "+aC.color,background:aC.color,display:"flex",alignItems:"center",justifyContent:"center"}}>
                              <span style={{color:"white",fontSize:10}}>✓</span>
                            </div>
                            <div style={{fontSize:15,color:TAN,textDecoration:"line-through",flex:1}}>{task.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Add project form */}
                {addingTask?(
                  <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                    <input autoFocus value={newTask.label} onChange={e=>setNewTask(n=>({...n,label:e.target.value}))} placeholder="Project name..." onKeyDown={e=>e.key==="Enter"&&addTask(aC.id)} style={{...inp,width:"100%"}}/>
                    <select value={newTask.resistance} onChange={e=>setNewTask(n=>({...n,resistance:e.target.value}))} style={{...inp,width:"100%"}}>
                      <option value="low">Low resistance</option><option value="medium">Medium resistance</option><option value="high">High resistance</option>
                    </select>
                    <div>
                      <div style={{fontSize:13,color:TAN,marginBottom:6,fontStyle:"italic"}}>Roadblocks (select all that apply):</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                        {Object.keys(SCVS).map(k=>{
                          const sel=(newTask.roadblocks||[]).includes(k);
                          return(
                            <button key={k} onClick={()=>setNewTask(n=>{const rb=n.roadblocks||[];return{...n,roadblocks:sel?rb.filter(r=>r!==k):[...rb,k]};})}
                              style={{padding:"4px 10px",background:sel?OX:"transparent",color:sel?"white":TAN,border:"1px solid "+(sel?OX:TANL),cursor:"pointer",fontFamily:BODY,fontSize:13,borderRadius:8}}>
                              {k}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>addTask(aC.id)} style={{flex:1,padding:"9px",background:aC.color,color:"white",border:"none",cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Add Project</button>
                      <button onClick={()=>setAddingTask(false)} style={{padding:"9px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:BODY,fontSize:15,borderRadius:8}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <button onClick={()=>setAddingTask(true)} style={{marginTop:10,width:"100%",padding:"8px",background:"transparent",border:"1px dashed "+TANL,color:TAN,cursor:"pointer",fontFamily:BODY,fontSize:15,fontStyle:"italic",borderRadius:8}}>+ Add project</button>
                )}
              </div>
            )}

            {/* Shelf — merged into Map */}
            <ShelfSection shelf={shelf} setShelf={setShelf} cats={cats} setCats={setCats}/>
          </div>
        )}

        {view==="prayer"&&<PrayerTab prayers={prayers} setPrayers={setPrayers}/>}
        {view==="habits"&&<HabitsTab habits={habits} setHabits={setHabits} streaks={streaks} setStreaks={setStreaks} customHabits={customHabits} setCustomHabits={setCustomHabits}/>}
        {view==="planner"&&<DayWeekTab cats={cats} planner={planner} setPlanner={setPlanner} prayers={prayers} habits={habits} shelf={shelf} history={history} stack={stack} setStack={setStack} setView={setView} todayVerse={todayVerse} checkIns={checkIns} setCheckIns={setCheckIns} library={library} letstalk={letstalk}/>}

        {view==="history"&&(
          <FieldNotesTab
            stack={stack}
            setStack={setStack}
            history={history}
            cats={cats}
            library={library}
            prayers={prayers}
            habits={habits}
            streaks={streaks}
          />
        )}

        {view==="scripture"&&(
          <div style={{animation:"fadeIn 0.4s ease",paddingBottom:40}}>
            <SL>The Word</SL>
            <p style={{fontStyle:"italic",color:TAN,fontSize:15,marginBottom:20,lineHeight:1.65}}>Your personal scripture library — verses for the roadblocks, the ones that have carried you, and the ones you're working to hold onto. Organized the way you need them, ready when you do.</p>
            <WordTab/>
          </div>
        )}

        {view==="library"&&<LibraryTab library={library} setLibrary={setLibrary}/>}
        {view==="archive"&&<ArchiveTab cats={cats} library={library} prayers={prayers} habits={habits} streaks={streaks} history={history} shelf={shelf} letstalk={letstalk} checkIns={checkIns} lastArchivedAt={lastArchivedAt} setLastArchivedAt={setLastArchivedAt}/>}
        {view==="letstalk"&&<LetsTalkTab letstalk={letstalk} setLetstalk={setLetstalk}/>}

      </div>

      {/* Floating Where Guide button */}
      <button onClick={()=>setShowWhereGuide(true)}
        style={{position:"fixed",bottom:20,right:16,width:50,height:50,borderRadius:"50%",background:INK,border:"2px solid #6DDCE8",color:"#6DDCE8",fontSize:20,fontFamily:SERIF,fontWeight:"bold",cursor:"pointer",zIndex:90,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(0,0,0,0.25)"}}>
        ?
      </button>
      {showWhereGuide&&<WhereGuideOverlay onClose={()=>setShowWhereGuide(false)}/>}
    </div>
  );
}
