import { useState, useEffect } from "react";

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
const OXF = "rgba(122,31,31,0.07)";

const BG = "repeating-linear-gradient(transparent,transparent 27px,rgba(26,46,74,0.025) 27px,rgba(26,46,74,0.025) 28px)";

const SCVS = {
  perfectionism:{v:"She is clothed with strength and dignity; she can laugh at the days to come.",r:"Proverbs 31:25"},
  shame:{v:"There is now no condemnation for those who are in Christ Jesus.",r:"Romans 8:1"},
  unknown:{v:"Trust in the Lord with all your heart and lean not on your own understanding.",r:"Proverbs 3:5"},
  scarcity:{v:"My God will meet all your needs according to the riches of his glory in Christ Jesus.",r:"Philippians 4:19"},
  procrastination:{v:"Whatever you do, work at it with all your heart, as working for the Lord.",r:"Colossians 3:23"},
  time:{v:"Teach us to number our days, that we may gain a heart of wisdom.",r:"Psalm 90:12"},
};

const ANCH = [
  {v:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",r:"Proverbs 3:5-6"},
  {v:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",r:"Jeremiah 29:11"},
  {v:"I can do all this through him who gives me strength.",r:"Philippians 4:13"},
  {v:"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you.",r:"Joshua 1:9"},
];

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

const INIT_LIB = [
  {id:"l01",category:"identity",principle:"Words are a real-time readout of which Joe is driving. The old survival anchor shows up first in your mouth.",date:"May 11, 2026"},
  {id:"l02",category:"warfare",principle:"The dark night as a credibility deposit — you can't teach the Weight track from a distance. That experience deposited something real.",date:"May 11, 2026"},
  {id:"l03",category:"identity",principle:"The vertical beam is the path home. Every emotional spike is a decision point. One step back toward the vertical counts.",date:"May 11, 2026"},
  {id:"l04",category:"capacity",principle:"The fatigue is partly the energy cost of operating as Old Joe. Original Joe runs on a different fuel. Less management, more fruit.",date:"May 11, 2026"},
  {id:"l05",category:"stewardship",principle:"Writing it down is a release. You stop carrying the weight of remembering. That creates room to live these principles.",date:"May 11, 2026"},
  {id:"l06",category:"identity",principle:"Your access to truth isn't limited by what the Holy Spirit is willing to give — it's limited by what you can emotionally carry. That's wisdom, not failure.",date:"May 12, 2026"},
  {id:"l07",category:"capacity",principle:"External truth you can receive cleanly. Internal and family truth is where your emotional tank hits its ceiling. Knowing the difference is self-awareness in the Spirit.",date:"May 12, 2026"},
  {id:"l08",category:"identity",principle:"The anger, perfectionism, and wiring that didn't fit the box weren't character flaws. They were the conditions that shaped you. The residue is real but it's not the verdict.",date:"May 12, 2026"},
  {id:"l09",category:"capacity",principle:"Emotional capacity doesn't come fast. It comes faithfully. Decades of transformation brought you here — to the groove.",date:"May 12, 2026"},
  {id:"l10",category:"ministry",principle:"You don't have to go to the deepest emotional depths to pray effectively. High-level intercession is real. The Holy Spirit meets you where your capacity is.",date:"May 12, 2026"},
  {id:"l11",category:"stewardship",principle:"These years are moving fast and you only get one pass at them. Setting your agenda aside wasn't just sacrifice — it was the price of entry into something you'd never had.",date:"May 13, 2026"},
  {id:"l12",category:"identity",principle:"You weren't malicious — you were unanchored. The loneliness was the natural result of a man built for relationship living outside of it.",date:"May 13, 2026"},
  {id:"l13",category:"relationships",principle:"To get back to center from that far off, you had to swing past neutral first. You're building a foundation of godly relationships that will carry you in your later years.",date:"May 13, 2026"},
  {id:"l14",category:"relationships",principle:"God is letting you feel what your sons and daughter feel. You recognize it because you lived it. That's the empathy that makes you the father they need.",date:"May 13, 2026"},
  {id:"l15",category:"identity",principle:"The old ambitions and pride had to go so the God-version could move in. Reluctant willingness still counts as willingness.",date:"May 13, 2026"},
  {id:"l16",category:"capacity",principle:"The guilt you wake up with isn't a character flaw — it's unfinished business sitting in your nervous system. Close the loop, free the mind.",date:"May 15, 2026"},
  {id:"l17",category:"warfare",principle:"The resistance isn't laziness — it's the cost of self-sufficiency that ran unchecked for decades. Not asking questions feels like strength but it keeps you stuck.",date:"May 15, 2026"},
  {id:"l18",category:"capacity",principle:"Tasks aren't good or bad — they're neutral. The emotion you attach is the thing that costs you. Future Joe is the motivation.",date:"May 15, 2026"},
  {id:"l19",category:"relationships",principle:"You don't resist collaboration — you resist entering it without knowing what you bring. The foundation isn't arrogance — it's the prerequisite for showing up well.",date:"May 15, 2026"},
  {id:"l20",category:"identity",principle:"You can't manage your time until you know who you are in this season. Identity isn't a destination — it's the ongoing work of staying anchored to the God-version of Joe.",date:"May 15, 2026"},
  {id:"l21",category:"stewardship",principle:"Planning the next day is stewardship toward the Joe who has to live it. A plan that doesn't account for Shawn and the kids isn't a plan — it's a wish.",date:"May 18, 2026"},
  {id:"l22",category:"relationships",principle:"You carry real weight for every person close to you. That's not a problem to fix, it's a capacity to manage. Daily prayer is the anchor, not the afterthought.",date:"May 18, 2026"},
  {id:"l23",category:"capacity",principle:"Depositing thoughts into the Notebook is the same motion as casting anxiety on Him. You release it, it lands somewhere organized, and your mental path clears.",date:"May 18, 2026"},
  {id:"l24",category:"warfare",principle:"Old patterns don't just fade — they fight. The unconscious prefers the comfort of what it already knows. You don't muscle through it — you partner through it.",date:"May 18, 2026"},
  {id:"l25",category:"capacity",principle:"The high standards aren't the enemy — the paralysis they produce is. Good enough to start beats perfect and stuck.",date:"May 18, 2026"},
  {id:"l26",category:"stewardship",principle:"Financial discipline and physical decluttering eliminate daily friction that drains you before the real work starts. A clear environment for a clear mind.",date:"May 20, 2026"},
  {id:"l27",category:"ministry",principle:"What people respond to when drawn to you isn't your accomplishments. They're encountering the Holy Spirit moving through a man who got out of the way enough to let Him through.",date:"May 20, 2026"},
  {id:"l28",category:"ministry",principle:"Six years of stay-at-home fatherhood, late nights, exhausted listening, saturating your mind with scripture — that wasn't a pause. That was God building the tapestry.",date:"May 20, 2026"},
  {id:"l29",category:"warfare",principle:"The guilt that hits when capacity is low is the entry point for everything else. The intercept happens before the family gets home — small wins, reorientation. That's the reset.",date:"May 20, 2026"},
  {id:"l30",category:"capacity",principle:"On a depleted day, concentrated mental work is off the table in the afternoon. Pre-stage the system, queue background tasks. Keep momentum alive at low capacity.",date:"May 20, 2026"},
  {id:"l31",category:"ministry",principle:"The kids are sleeping better. The physical exhaustion is lifting. The tapestry is organized. This is the season the last six years were preparing for.",date:"May 20, 2026"},
];

const TABS_ROW1 = [
  {id:"dashboard",label:"Map",g:"◎",type:"g"},
  {id:"habits",label:"Habits",g:"✓",type:"g"},
  {id:"prayer",label:"Prayer",type:"cross"},
  {id:"planner",label:"Week",g:"◈",type:"g"},
];
const TABS_ROW2 = [
  {id:"shelf",label:"Shelf",g:"⊡",type:"g"},
  {id:"history",label:"Log",g:"◷",type:"g"},
  {id:"scripture",label:"Word",g:"✦",type:"g"},
  {id:"library",label:"Library",g:"☰",type:"g"},
  {id:"archive",label:"Archive",g:"▣",type:"g"},
];
const TABS=[...TABS_ROW1,...TABS_ROW2];

function SL({children,c=OX}){
  return <div style={{fontSize:9,color:c,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>✦ {children}</div>;
}

function RDot({level}){
  const m={low:GRN,medium:AMB,high:OX};
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:m[level]||TAN,color:"white",fontSize:9,fontWeight:"bold",flexShrink:0}}>{(level||"l")[0].toUpperCase()}</span>;
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
  const hour=new Date().getHours();
  const isMorn=hour>=5&&hour<12;
  const isEve=hour>=19;
  if((!isMorn&&!isEve)||dismissed) return null;
  const tk=new Date().toISOString().slice(0,10);
  const yk=new Date(Date.now()-86400000).toISOString().slice(0,10);
  const th=habits[tk]||{};
  const yh=habits[yk]||{};
  const tD=Object.values(th).filter(Boolean).length;
  const yD=Object.values(yh).filter(Boolean).length;
  const allT=cats.flatMap(c=>c.tasks);
  const pendT=allT.filter(t=>!t.done).length;
  const doneT=allT.filter(t=>t.done).length;
  const actP=prayers.filter(p=>!p.answered).length;
  async function gen(){
    setLoading(true);
    try{
      const p=isMorn
        ?"Write a 4-6 sentence morning orientation for Joe Steen. Christian man, SGM founder, stay-at-home dad, 20 years sober. Anchor: Proverbs 3:5-6. Yesterday: "+yD+"/12 habits. Open tasks: "+pendT+". Praying for "+actP+" people. Direct, warm, faith-grounded. Start with who he is. End with scripture or prayer prompt. No filler."
        :"Write a 4-6 sentence evening wrap-up for Joe Steen. Christian man, SGM founder, stay-at-home dad, 20 years sober. Today: "+tD+"/12 habits, "+doneT+" tasks done, "+pendT+" still open. Direct, warm. Acknowledge what got done. If habits low — data not shame. One thing to hold going into tomorrow. End with rest or prayer.";
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:p}]})});
      const data=await res.json();
      setMsg(data.content?.find(b=>b.type==="text")?.text||"Trust in the Lord with all your heart. Today is a new opportunity.");
    }catch(e){setMsg("Trust in the Lord with all your heart. Today is a new opportunity.");}
    setLoading(false);
  }
  const ac=isMorn?OX:PUR;
  return(
    <div style={{marginBottom:24,background:ac+"08",border:"1px solid "+ac+"30",borderLeft:"3px solid "+ac,borderRadius:2,overflow:"hidden",animation:"fadeIn 0.5s ease"}}>
      <div style={{padding:"14px 16px 12px"}}>
        <SL c={ac}>{isMorn?"Good Morning, Joe":"End of Day, Joe"}</SL>
        {!msg&&!loading
          ?<button onClick={gen} style={{padding:"8px 16px",background:ac,color:"white",border:"none",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>Get My Word</button>
          :loading
          ?<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:14,height:14,borderRadius:"50%",border:"2px solid "+ac,borderTopColor:"transparent",animation:"spin 0.8s linear infinite",flexShrink:0}}/><span style={{fontSize:13,fontStyle:"italic",color:TAN}}>Preparing your word…</span></div>
          :<p style={{fontSize:14,lineHeight:1.8,color:INK,margin:0}}>{msg}</p>
        }
      </div>
      <div style={{display:"flex",borderTop:"1px solid "+ac+"20"}}>
        <button onClick={()=>setDismissed(true)} style={{flex:1,padding:"9px",background:"transparent",border:"none",color:TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11}}>Dismiss</button>
        <button onClick={gen} style={{flex:1,padding:"9px",background:"transparent",border:"none",borderLeft:"1px solid "+ac+"20",color:ac,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11}}>↺ Refresh</button>
      </div>
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
    <div style={{position:"fixed",inset:0,background:PAPER,backgroundImage:BG,zIndex:200,overflowY:"auto",fontFamily:"Georgia,serif",color:INK}}>
      <div style={{background:INK,padding:"16px 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:12,fontFamily:"Georgia,serif",marginBottom:12,padding:0}}>← Back</button>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Ring size={44} pct={pct} color={cat.color} color2={cat.color2||"#6DDCE8"} sw={4}><span style={{fontSize:10,color:cat.color}}>{cat.icon}</span></Ring>
            <div>
              <div style={{color:TAN,fontSize:9,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:2}}>{cat.label}</div>
              <div style={{fontSize:16,fontWeight:"bold",color:"white",lineHeight:1.2}}>{task.label}</div>
            </div>
          </div>
          {task.steps&&task.steps.length>0&&(
            <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1,height:2,background:"rgba(255,255,255,0.1)",borderRadius:1}}>
                <div style={{width:pct+"%",height:"100%",background:cat.color,borderRadius:1,transition:"width 0.4s"}}/>
              </div>
              <span style={{color:TAN,fontSize:11}}>{pct}%</span>
            </div>
          )}
        </div>
      </div>
      <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px 60px"}}>
        {task.roadblock&&SCVS[task.roadblock]&&(
          <div style={{background:OXF,borderLeft:"3px solid "+OX,padding:"14px 18px",marginBottom:28}}>
            <SL>Roadblock: {task.roadblock}</SL>
            <p style={{fontStyle:"italic",fontSize:14,lineHeight:1.75,margin:0}}>"{SCVS[task.roadblock].v}"</p>
            <p style={{color:GOLD,fontSize:12,marginTop:6,marginBottom:0}}>{SCVS[task.roadblock].r}</p>
          </div>
        )}
        {pasteMode?(
          <div>
            <SL>Break this down with Claude</SL>
            <div style={{background:"rgba(255,255,255,0.5)",color:INK,padding:"14px 16px",fontSize:13,fontStyle:"italic",lineHeight:1.65,marginBottom:18,borderRadius:2,border:"1px solid "+FINK}}>
              "Break down this project: <strong style={{color:"white"}}>{task.label}</strong>"
            </div>
            <textarea value={pasteText} onChange={e=>setPasteText(e.target.value)} placeholder={"Paste Claude's breakdown here...\nFormat: 1. Step [resistance] {roadblock}"} rows={7}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.65)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:2}}/>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{const steps=parseSteps(pasteText);if(steps.length){onUpdate({...task,steps});setPasteMode(false);}}}
                style={{flex:1,padding:"11px",background:cat.color,color:"white",border:"none",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:14,borderRadius:2}}>Build My Project</button>
              {task.steps&&task.steps.length>0&&<button onClick={()=>setPasteMode(false)} style={{padding:"11px 18px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Cancel</button>}
            </div>
          </div>
        ):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <SL>Project Steps</SL>
              <button onClick={()=>setPasteMode(true)} style={{background:"transparent",border:"1px solid "+TANL,color:TAN,padding:"3px 10px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:10,borderRadius:2}}>↺ Rebuild</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {task.steps.map((step,idx)=>(
                <div key={step.id} onClick={()=>{const up=task.steps.map(s=>s.id===step.id?{...s,done:!s.done}:s);onUpdate({...task,steps:up,done:up.every(s=>s.done)});}}
                  style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",cursor:"pointer",background:step.done?cat.color+"10":"rgba(255,255,255,0.6)",borderLeft:"3px solid "+(step.done?cat.color:TANL),border:"1px solid "+(step.done?cat.color+"40":FINK),borderRadius:2,transition:"all 0.2s"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,border:"2px solid "+(step.done?cat.color:TANL),background:step.done?cat.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:step.done?"white":TAN,fontSize:step.done?12:13}}>
                    {step.done?"✓":idx+1}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,color:step.done?TAN:INK,textDecoration:step.done?"line-through":"none",lineHeight:1.5}}>{step.label}</div>
                    <div style={{display:"flex",gap:6,marginTop:6,alignItems:"center"}}>
                      <RDot level={step.resistance}/>
                      {step.roadblock&&<span style={{fontSize:10,color:OX,fontStyle:"italic"}}>⚑ {step.roadblock}</span>}
                    </div>
                    {step.roadblock&&SCVS[step.roadblock]&&!step.done&&(
                      <div style={{marginTop:8,padding:"8px 12px",background:OXF,borderLeft:"2px solid rgba(122,31,31,0.3)",fontSize:12,fontStyle:"italic",lineHeight:1.65}}>
                        "{SCVS[step.roadblock].v}" <span style={{color:GOLD,display:"block",marginTop:2,fontStyle:"normal",fontSize:11}}>{SCVS[step.roadblock].r}</span>
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
  const allHabits=[...HABITS,...customHabits];
  const done=allHabits.filter(h=>td[h.id]).length;
  const pct=Math.round(done/allHabits.length*100);
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
  function addHabit(){
    if(!newHabit.label.trim())return;
    setCustomHabits(p=>[...p,{id:"ch"+Date.now(),label:newHabit.label,cat:newHabit.cat}]);
    setNewHabit({label:"",cat:"health"});
    setAddingHabit(false);
  }
  return(
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <SL>Daily Habits</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:13,lineHeight:1.65,marginBottom:16}}>These reset every day. Check them off, watch the streaks build.</p>
      <div style={{marginBottom:24}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:12,color:INK}}>{done} of {allHabits.length} done today</span>
          <span style={{fontSize:12,color:GOLD,fontWeight:"bold"}}>{pct}%</span>
        </div>
        <div style={{height:4,background:TANL,borderRadius:2,opacity:0.4}}>
          <div style={{height:"100%",background:OX,borderRadius:2,width:pct+"%",transition:"width 0.4s"}}/>
        </div>
      </div>
      {HCATS.map(hc=>(
        <div key={hc.id} style={{marginBottom:24}}>
          <div style={{fontSize:9,color:hc.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>✦ {hc.label}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {allHabits.filter(h=>h.cat===hc.id).map(hab=>{
              const dn=!!td[hab.id];
              const str=streaks[hab.id]?.count||0;
              return(
                <div key={hab.id} onClick={()=>toggle(hab.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:dn?hc.color+"10":"rgba(255,255,255,0.55)",border:"1px solid "+(dn?hc.color+"40":FINK),borderLeft:"3px solid "+(dn?hc.color:TANL),borderRadius:2,cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,border:"2px solid "+(dn?hc.color:TANL),background:dn?hc.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {dn&&<span style={{color:"white",fontSize:11}}>✓</span>}
                  </div>
                  <span style={{fontSize:13,color:dn?TAN:INK,textDecoration:dn?"line-through":"none",flex:1,lineHeight:1.4}}>{hab.label}</span>
                  {str>1&&<span style={{fontSize:11,color:hc.color,fontWeight:"bold",flexShrink:0}}>{str} 🔥</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={()=>setAddingHabit(!addingHabit)} style={{width:"100%",marginTop:4,padding:"10px",background:addingHabit?GRN:"transparent",border:"1px solid "+(addingHabit?GRN:TANL),color:addingHabit?"white":TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>
        {addingHabit?"× Close":"+ Add Habit"}
      </button>
      {addingHabit&&(
        <div style={{marginTop:12,padding:"16px",background:"rgba(255,255,255,0.5)",border:"1px solid "+TANL,borderRadius:2}}>
          <SL>New Habit</SL>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input autoFocus value={newHabit.label} onChange={e=>setNewHabit(n=>({...n,label:e.target.value}))} placeholder="Habit name..." onKeyDown={e=>e.key==="Enter"&&addHabit()}
              style={{padding:"9px 12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.8)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2}}/>
            <select value={newHabit.cat} onChange={e=>setNewHabit(n=>({...n,cat:e.target.value}))}
              style={{padding:"9px 12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.8)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2}}>
              {HCATS.map(hc=><option key={hc.id} value={hc.id}>{hc.label}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addHabit} style={{flex:1,padding:"9px",background:"transparent",color:GRN,border:"1px solid "+GRN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Add Habit</button>
              <button onClick={()=>setAddingHabit(false)} style={{padding:"9px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Cancel</button>
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
  const inp={padding:"9px 12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.8)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,width:"100%"};
  return(
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <SL>Prayer</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:13,lineHeight:1.65,marginBottom:16}}>Carry them well. Record what God does.</p>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["active","Active ("+active.length+")"],["answered","Answered ("+answered.length+")"]].map(([v,label])=>(
          <button key={v} onClick={()=>setPv(v)} style={{flex:1,padding:"8px",background:pv===v?OX:"transparent",border:"1px solid "+(pv===v?OX:TANL),color:pv===v?"white":TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>{label}</button>
        ))}
      </div>
      {pv==="active"&&<button onClick={()=>setAdding(!adding)} style={{width:"100%",marginBottom:20,padding:"10px",background:adding?OX:"transparent",border:"1px solid "+(adding?OX:TANL),color:adding?"white":TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>{adding?"× Close":"✦ Add Prayer"}</button>}
      {adding&&(
        <div style={{marginBottom:24,padding:"18px",background:"rgba(255,255,255,0.5)",border:"1px solid "+TANL,borderRadius:2}}>
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
                style={{flex:1,padding:"10px",background:"transparent",color:OX,border:"1px solid "+OX,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Add to Prayer List</button>
              <button onClick={()=>setAdding(false)} style={{padding:"10px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {pv==="active"&&(
        <div>
          {!active.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>No active prayers yet.</div>}
          {grouped.map(({tag,items})=>(
            <div key={tag.id} style={{marginBottom:24}}>
              <div style={{fontSize:9,color:tag.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>{tag.icon} {tag.label}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map(pr=>{
                  const ie=expId===pr.id;
                  return(
                    <div key={pr.id} style={{background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderLeft:"3px solid "+tag.color,borderRadius:2}}>
                      <div onClick={()=>setExpId(ie?null:pr.id)} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 14px",cursor:"pointer"}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:14,fontWeight:"bold",color:INK,marginBottom:4}}>{pr.name}</div>
                          <div style={{fontSize:13,color:INK,lineHeight:1.6,opacity:0.85}}>{pr.request}</div>
                          <div style={{fontSize:10,color:TAN,marginTop:6}}>Added {pr.dateAdded}</div>
                        </div>
                        <span style={{color:TANL,fontSize:16,flexShrink:0,marginTop:2}}>{ie?"−":"+"}</span>
                      </div>
                      {ie&&(
                        <div style={{padding:"12px 14px 14px",borderTop:"1px solid "+FINK}}>
                          {pr.notes&&<div style={{fontSize:13,fontStyle:"italic",color:INK,lineHeight:1.65,marginBottom:12,padding:"8px 12px",background:tag.color+"08",borderLeft:"2px solid "+tag.color+"40"}}>{pr.notes}</div>}
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>setPrayers(p=>p.map(x=>x.id===pr.id?{...x,answered:true,answeredDate:today}:x))}
                              style={{flex:1,padding:"8px",background:"transparent",color:GRN,border:"1px solid "+GRN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>✓ Mark Answered</button>
                            <button onClick={()=>setPrayers(p=>p.filter(x=>x.id!==pr.id))}
                              style={{padding:"8px 12px",background:"transparent",color:OX,border:"1px solid "+OX+"40",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>Remove</button>
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
              <div key={pr.id} onClick={()=>setExpId(ie?null:pr.id)} style={{padding:"12px 14px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderLeft:"3px solid "+GRN,borderRadius:2,cursor:"pointer",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,background:"transparent",border:"2px solid "+GRN,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:GRN,fontSize:11}}>✓</span></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:"bold",color:INK}}>{pr.name}</div>
                    <div style={{fontSize:12,color:INK,lineHeight:1.6,opacity:0.8,marginTop:2}}>{pr.request}</div>
                    <div style={{fontSize:10,color:TAN,marginTop:4}}>{tag&&<span style={{color:tag.color}}>{tag.icon} {tag.label} · </span>}Answered {pr.answeredDate}</div>
                  </div>
                  <span style={{color:TANL,fontSize:16,flexShrink:0}}>{ie?"−":"+"}</span>
                </div>
                {ie&&pr.notes&&<div style={{marginTop:10,padding:"8px 12px",background:GRN+"08",borderLeft:"2px solid "+GRN+"40",fontSize:13,fontStyle:"italic",color:INK,lineHeight:1.65}}>{pr.notes}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DayWeekTab({cats,planner,setPlanner,prayers,habits,shelf,history}){
  const [mode,setMode]=useState("day");
  const [calEvents,setCalEvents]=useState([]);
  const [calToken,setCalToken]=useState(localStorage.getItem("sgm-cal-token")||null);
  const [calLoading,setCalLoading]=useState(false);
  const [calError,setCalError]=useState(null);
  const CLIENT_ID=import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const SCOPES="https://www.googleapis.com/auth/calendar.readonly";

  const tk=new Date().toISOString().slice(0,10);
  const today=new Date();
  const weekDays=Array.from({length:7},(_,i)=>{
    const d=new Date(today);
    d.setDate(today.getDate()-today.getDay()+i);
    return d;
  });

  // Calendar auth
  // Handle OAuth redirect token on page load
  useEffect(()=>{
    const hash=window.location.hash;
    if(hash&&hash.includes("access_token")){
      const token=new URLSearchParams(hash.slice(1)).get("access_token");
      if(token){
        localStorage.setItem("sgm-cal-token",token);
        setCalToken(token);
        fetchEvents(token);
        // Clean up URL
        window.history.replaceState(null,"",window.location.pathname);
      }
    }
  },[]);

  function connectCalendar(){
    if(!CLIENT_ID){setCalError("Client ID not configured.");return;}
    const params=new URLSearchParams({
      client_id:CLIENT_ID,
      redirect_uri:window.location.origin,
      response_type:"token",
      scope:SCOPES,
      prompt:"consent"
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
      const res=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start}&timeMax=${end}&singleEvents=true&orderBy=startTime&maxResults=50`,{
        headers:{Authorization:"Bearer "+token}
      });
      if(res.status===401){
        localStorage.removeItem("sgm-cal-token");
        setCalToken(null);
        setCalError("Session expired. Please reconnect.");
        setCalLoading(false);return;
      }
      const data=await res.json();
      setCalEvents(data.items||[]);
    }catch(e){setCalError("Failed to load calendar.");}
    setCalLoading(false);
  }

  useEffect(()=>{
    if(calToken)fetchEvents(calToken);
  },[calToken]);

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
    <div style={{animation:"fadeIn 0.4s ease"}}>
      {/* Toggle */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {["day","week"].map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px",background:mode===m?"transparent":"transparent",border:mode===m?"1px solid "+OX:"1px solid "+TANL,color:mode===m?OX:TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,letterSpacing:"1px",textTransform:"uppercase",borderRadius:2,transition:"all 0.2s"}}>
            {m==="day"?"Today":"This Week"}
          </button>
        ))}
      </div>

      {mode==="day"&&(
        <div>
          {/* Calendar connect / today events */}
          {!calToken?(
            <div style={{marginBottom:20,padding:"14px 16px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderRadius:2}}>
              <div style={{fontSize:9,color:"#2E6B8A",letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8}}>✦ Calendar</div>
              <button onClick={connectCalendar} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2E6B8A",color:"#2E6B8A",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>
                Connect Google Calendar
              </button>
              {calError&&<div style={{fontSize:11,color:OX,marginTop:8,fontStyle:"italic"}}>{calError}</div>}
            </div>
          ):(
            <div style={{marginBottom:20}}>
              <div style={{fontSize:9,color:"#2E6B8A",letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8}}>✦ Today's Schedule</div>
              {calLoading&&<div style={{fontSize:12,color:TAN,fontStyle:"italic"}}>Loading…</div>}
              {!calLoading&&todayEvents.length===0&&<div style={{fontSize:12,color:TAN,fontStyle:"italic",padding:"10px 12px",border:"1px dashed "+TANL,borderRadius:2}}>No appointments today</div>}
              {todayEvents.map((e,i)=>{
                const time=e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day";
                return(
                  <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",background:"rgba(255,255,255,0.6)",border:"1px solid "+FINK,borderLeft:"3px solid #2E6B8A",borderRadius:2,marginBottom:6}}>
                    <div style={{fontSize:11,color:"#2E6B8A",flexShrink:0,minWidth:60}}>{time}</div>
                    <div style={{fontSize:13,color:INK}}>{e.summary||"(No title)"}</div>
                  </div>
                );
              })}
              <button onClick={()=>{localStorage.removeItem("sgm-cal-token");setCalToken(null);setCalEvents([]);}} style={{marginTop:6,padding:"4px 10px",background:"transparent",border:"1px solid "+TANL,color:TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:10,borderRadius:2}}>Disconnect</button>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
            {[
              {label:"Orientation",value:overall+"%",color:INK},
              {label:"Habits",value:habitDone+"/"+totalHabits,color:"#4AB8C8"},
              {label:"Prayers",value:activeP+" active",color:OX},
            ].map(s=>(
              <div key={s.label} style={{padding:"12px 8px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderRadius:2,textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                <div style={{fontSize:9,color:TAN,letterSpacing:"1px",textTransform:"uppercase",marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Morning thought */}
          <div style={{marginBottom:20}}>
            <SL>Morning Thought</SL>
            <textarea
              value={dp.morningThought||""}
              onChange={e=>updDay({...dp,morningThought:e.target.value})}
              placeholder="What's on your mind this morning? One honest sentence is enough."
              rows={3}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,resize:"none",lineHeight:1.65}}
            />
          </div>

          {/* Today's focus */}
          <div style={{marginBottom:20}}>
            <SL>Today's Focus</SL>
            <textarea
              value={dp.focus||""}
              onChange={e=>updDay({...dp,focus:e.target.value})}
              placeholder="What is the one thing that would make today a win?"
              rows={2}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,resize:"none",lineHeight:1.65}}
            />
          </div>

          {/* Shelf items due today */}
          {shelfWeek>0&&(
            <div style={{marginBottom:20,padding:"14px 16px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+OX,borderRadius:2}}>
              <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6}}>✦ Shelf — This Week</div>
              <div style={{fontSize:13,color:INK}}>{shelfWeek} item{shelfWeek!==1?"s":""} parked for this week</div>
              <div style={{fontSize:11,color:TAN,fontStyle:"italic",marginTop:2}}>Check the Shelf tab to promote to today</div>
            </div>
          )}

          {/* Evening reflection */}
          <div style={{marginBottom:20}}>
            <SL>Evening Reflection</SL>
            <textarea
              value={dp.evening||""}
              onChange={e=>updDay({...dp,evening:e.target.value})}
              placeholder="What happened today that's worth remembering?"
              rows={3}
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,resize:"none",lineHeight:1.65}}
            />
          </div>
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
                  <div key={i} onClick={()=>setSelectedDay(dk)} style={{flex:"0 0 44px",display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px",background:isSelected?"rgba(255,255,255,0.85)":isToday?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.35)",border:"1px solid "+(isSelected?INK:isToday?OX:FINK),borderRadius:2,cursor:"pointer"}}>
                    <div style={{fontSize:9,color:isSelected?INK:isToday?OX:TAN,letterSpacing:"1px",textTransform:"uppercase"}}>{d.toLocaleDateString("en-US",{weekday:"short"})}</div>
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
                <div style={{marginTop:10,padding:"12px 14px",background:"rgba(255,255,255,0.6)",border:"1px solid "+FINK,borderRadius:2}}>
                  <div style={{fontSize:10,color:INK,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:8}}>
                    {selDate.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
                  </div>
                  {selEvs.length===0&&!selPlan.morningThought&&!selPlan.focus&&(
                    <div style={{fontSize:12,color:TAN,fontStyle:"italic"}}>Nothing recorded for this day</div>
                  )}
                  {selEvs.map((e,j)=>{
                    const time=e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day";
                    return(
                      <div key={j} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+FINK}}>
                        <div style={{fontSize:11,color:"#2E6B8A",flexShrink:0,minWidth:55}}>{time}</div>
                        <div style={{fontSize:12,color:INK}}>{e.summary||"(No title)"}</div>
                      </div>
                    );
                  })}
                  {selPlan.morningThought&&<div style={{fontSize:12,color:TAN,fontStyle:"italic",marginTop:6}}>"{selPlan.morningThought}"</div>}
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
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,resize:"none",lineHeight:1.65}}
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
                <div key={s.label} style={{padding:"14px 12px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderRadius:2}}>
                  <div style={{fontSize:22,fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                  <div style={{fontSize:9,color:TAN,letterSpacing:"1px",textTransform:"uppercase",marginTop:4}}>{s.label}</div>
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
              style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2,resize:"none",lineHeight:1.65}}
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
                    <div style={{fontSize:10,color:"#2E6B8A",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:4}}>
                      {d.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
                    </div>
                    {evs.map((e,j)=>{
                      const time=e.start?.dateTime?new Date(e.start.dateTime).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"All day";
                      return(
                        <div key={j} style={{display:"flex",gap:10,padding:"8px 12px",background:"rgba(255,255,255,0.6)",border:"1px solid "+FINK,borderLeft:"3px solid #2E6B8A",borderRadius:2,marginBottom:4}}>
                          <div style={{fontSize:11,color:"#2E6B8A",flexShrink:0,minWidth:60}}>{time}</div>
                          <div style={{fontSize:12,color:INK}}>{e.summary||"(No title)"}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {weekDays.every(d=>eventsForDate(d).length===0)&&(
                <div style={{fontSize:12,color:TAN,fontStyle:"italic",padding:"10px 12px",border:"1px dashed "+TANL,borderRadius:2}}>No appointments this week</div>
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
                <div style={{background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderRadius:2,padding:"12px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
                    {dayLabels.map(l=><div key={l} style={{textAlign:"center",fontSize:9,color:TAN,letterSpacing:"1px",padding:"3px 0"}}>{l}</div>)}
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
                        <div key={i} onClick={()=>setSelectedDay(dk)} style={{textAlign:"center",padding:"6px 2px",borderRadius:2,background:isSelected?"rgba(255,255,255,0.85)":isToday?"rgba(122,31,31,0.08)":"transparent",border:isSelected?"1px solid "+INK:isToday?"1px solid "+OX:"1px solid transparent",position:"relative",cursor:"pointer"}}>
                          <div style={{fontSize:11,color:isSelected?INK:isToday?OX:INK,fontWeight:isToday||isSelected?"bold":"normal"}}>{d}</div>
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
              <div key={k} style={{marginBottom:10,padding:"14px 16px",background:"rgba(255,255,255,0.35)",border:"1px solid "+FINK,borderRadius:2,opacity:0.7}}>
                <div style={{fontSize:9,color:TAN,letterSpacing:"2px",textTransform:"uppercase",marginBottom:6}}>{k.replace("week-","Week of ")}</div>
                {pw.intention&&<p style={{fontSize:13,fontStyle:"italic",color:INK,margin:"0 0 6px"}}>{pw.intention}</p>}
                {pw.thoughts&&typeof pw.thoughts==="string"&&<p style={{fontSize:12,color:TAN,margin:0,lineHeight:1.5}}>{pw.thoughts.slice(0,120)}{pw.thoughts.length>120?"…":""}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function LibraryTab({library,setLibrary}){
  const [ac,setAc]=useState("all");
  const [pm,setPm]=useState(false);
  const [pt,setPt]=useState("");
  const [exp,setExp]=useState({});
  const today=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  const filtered=ac==="all"?library:library.filter(p=>p.category===ac);
  const counts=LCATS.reduce((a,c)=>{a[c.id]=library.filter(p=>p.category===c.id).length;return a;},{});
  function parsePaste(text){
    return text.split("\n").map(l=>l.trim()).filter(l=>l.length>10).map(line=>{
      const cm=line.match(/\[(identity|relationships|capacity|warfare|stewardship|ministry)\]/i);
      return{id:"lib"+Date.now()+Math.random(),category:cm?cm[1].toLowerCase():"identity",principle:line.replace(/\[[^\]]+\]/g,"").trim(),date:today};
    });
  }
  return(
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <SL>Working Library</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:13,lineHeight:1.65,marginBottom:14}}>Principles surfacing from your daily unloads — organized by what they are, not when they came.</p>
      <button onClick={()=>setPm(!pm)} style={{width:"100%",marginBottom:20,padding:"10px",background:pm?OX:"transparent",border:"1px solid "+(pm?OX:TANL),color:pm?"white":TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>
        {pm?"× Close":"✦ Add Principles from Unload"}
      </button>
      {pm&&(
        <div style={{marginBottom:24,padding:"18px",background:"rgba(255,255,255,0.5)",border:"1px solid "+TANL,borderRadius:2}}>
          <SL>Paste from Claude</SL>
          <p style={{fontSize:13,color:INK,lineHeight:1.7,marginBottom:12}}>Format each line: <span style={{fontFamily:"monospace",fontSize:12,color:OX}}>Principle text [category]</span></p>
          <textarea value={pt} onChange={e=>setPt(e.target.value)} placeholder="Paste Claude's formatted principles here..." rows={6}
            style={{width:"100%",padding:"12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",resize:"vertical",lineHeight:1.65,borderRadius:2}}/>
          <button onClick={()=>{const items=parsePaste(pt);if(items.length){setLibrary(p=>[...items,...p]);setPt("");setPm(false);}}}
            style={{marginTop:10,width:"100%",padding:"10px",background:"transparent",color:OX,border:"1px solid "+OX,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Add to Library</button>
        </div>
      )}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
        <button onClick={()=>setAc("all")} style={{padding:"5px 12px",background:ac==="all"?INK:"transparent",color:ac==="all"?"white":TAN,border:"1px solid "+(ac==="all"?INK:TANL),cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,borderRadius:2}}>All ({library.length})</button>
        {LCATS.map(cat=>(
          <button key={cat.id} onClick={()=>setAc(cat.id)} style={{padding:"5px 12px",background:ac===cat.id?cat.color:"transparent",color:ac===cat.id?"white":TAN,border:"1px solid "+(ac===cat.id?cat.color:TANL),cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,borderRadius:2}}>
            {cat.icon} {cat.label} ({counts[cat.id]||0})
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(item=>{
          const cat=LCATS.find(c=>c.id===item.category);
          const ie=exp[item.id];
          return(
            <div key={item.id} onClick={()=>setExp(e=>({...e,[item.id]:!e[item.id]}))} style={{padding:"14px 16px",cursor:"pointer",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+(cat?cat.color:TAN),borderRadius:2}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <p style={{fontSize:14,color:INK,lineHeight:1.7,flex:1,margin:0}}>{item.principle}</p>
                <span style={{color:TANL,fontSize:16,flexShrink:0,marginTop:2}}>{ie?"−":"+"}</span>
              </div>
              {ie&&(
                <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid "+FINK,display:"flex",gap:8}}>
                  {cat&&<span style={{fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:cat.color,opacity:0.85}}>{cat.icon} {cat.label}</span>}
                  <span style={{fontSize:10,color:TANL}}>· {item.date}</span>
                </div>
              )}
            </div>
          );
        })}
        {!filtered.length&&<div style={{textAlign:"center",padding:"40px",color:TAN,fontStyle:"italic"}}>No principles in this category yet.</div>}
      </div>
    </div>
  );
}

function ArchiveTab({cats,library,prayers,habits,streaks,history}){
  const [copied,setCopied]=useState(false);
  const tk=new Date().toISOString().slice(0,10);
  const now=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  function gen(){
    const L=[];
    L.push("SGM LIFE ORIENTATION - ARCHIVE SNAPSHOT");
    L.push("Generated: "+now);
    L.push("================================================");
    L.push("\nLIFE CATEGORIES");
    L.push("------------------------------");
    cats.forEach(cat=>{
      L.push("\n"+cat.label.toUpperCase()+" - "+cat.state);
      cat.tasks.forEach(t=>{
        const st=t.steps&&t.steps.length?" ("+t.steps.filter(x=>x.done).length+"/"+t.steps.length+" steps)":"";
        L.push("  "+(t.done?"✓":"○")+" "+t.label+" ["+t.resistance+"]"+st);
      });
    });
    const active=prayers.filter(p=>!p.answered);
    const answered=prayers.filter(p=>p.answered);
    L.push("\nACTIVE PRAYERS");
    L.push("------------------------------");
    if(!active.length)L.push("  None recorded.");
    active.forEach(p=>L.push("  * "+p.name+" ("+p.relationship+") - "+p.request));
    if(answered.length){
      L.push("\nANSWERED PRAYERS");
      L.push("------------------------------");
      answered.forEach(p=>L.push("  check "+p.name+" - "+p.request+" [Answered "+p.answeredDate+"]"));
    }
    const th=habits[tk]||{};
    L.push("\nHABIT STREAKS");
    L.push("------------------------------");
    L.push("Today: "+Object.values(th).filter(Boolean).length+"/12 completed");
    Object.entries(streaks).forEach(([id,s])=>{if(s.count>1)L.push("  "+id+": "+s.count+" day streak");});
    if(history.length){
      L.push("\nRECENT COMPLETIONS");
      L.push("------------------------------");
      history.slice(0,20).forEach(h=>L.push("  done "+h.task+" ("+h.category+") - "+h.date));
    }
    L.push("\nWORKING LIBRARY");
    L.push("------------------------------");
    ["identity","relationships","capacity","warfare","stewardship","ministry"].forEach(cat=>{
      const items=library.filter(p=>p.category===cat);
      if(!items.length)return;
      L.push("\n"+cat.toUpperCase());
      items.forEach(p=>L.push("  - "+p.principle+" ["+p.date+"]"));
    });
    L.push("\n================================================");
    L.push("End of Archive - Paste into Kingdom Notebook");
    return L.join("\n");
  }
  const taskCount=cats.flatMap(c=>c.tasks).length;
  const doneCount=cats.flatMap(c=>c.tasks).filter(t=>t.done).length;
  return(
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <SL>Archive</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:13,lineHeight:1.65,marginBottom:20}}>Your running backup. Copy and paste into your Kingdom Notebook. If the app ever disappears, nothing is lost.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
        {[["Tasks",doneCount+"/"+taskCount],["Prayers",prayers.filter(p=>!p.answered).length],["Answered",prayers.filter(p=>p.answered).length],["Principles",library.length],["Categories",cats.length],["Completions",history.length]].map(([label,val])=>(
          <div key={label} style={{padding:"12px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderRadius:2,textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:"bold",color:INK,letterSpacing:"-0.5px"}}>{val}</div>
            <div style={{fontSize:10,color:TAN,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>navigator.clipboard.writeText(gen()).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);})}
        style={{width:"100%",marginBottom:20,padding:"12px",background:copied?GRN:INK,color:"white",border:"none",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:14,borderRadius:2,transition:"background 0.3s"}}>
        {copied?"check Copied to Clipboard":"Copy Full Archive"}
      </button>
      <SL>Preview</SL>
      <div style={{background:"rgba(255,255,255,0.4)",border:"1px solid "+FINK,borderRadius:2,padding:"14px 16px",maxHeight:320,overflowY:"auto"}}>
        <pre style={{fontSize:11,color:INK,lineHeight:1.7,margin:0,whiteSpace:"pre-wrap",fontFamily:"Georgia,serif"}}>{gen()}</pre>
      </div>
    </div>
  );
}

function ShelfTab({shelf,setShelf,cats,setCats}){
  const [input,setInput]=useState("");
  const [timeframe,setTimeframe]=useState("week");
  const [filter,setFilter]=useState("all");

  function quickAdd(){
    if(!input.trim())return;
    const item={id:"sh"+Date.now(),label:input.trim(),timeframe,dateAdded:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),promoted:false};
    setShelf(p=>[item,...p]);
    setInput("");
  }

  function promote(item){
    const firstCat=cats[0];
    if(!firstCat)return;
    setCats(prev=>prev.map(c=>c.id!==firstCat.id?c:{...c,tasks:[...c.tasks,{id:"shelf"+Date.now(),label:item.label,resistance:"low",roadblock:null,done:false,steps:[]}]}));
    setShelf(p=>p.filter(s=>s.id!==item.id));
  }

  function remove(id){
    setShelf(p=>p.filter(s=>s.id!==id));
  }

  function changeTimeframe(id,tf){
    setShelf(p=>p.map(s=>s.id===id?{...s,timeframe:tf}:s));
  }

  const filtered=filter==="all"?shelf:shelf.filter(s=>s.timeframe===filter);

  return(
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <SL>The Shelf</SL>
      <p style={{fontStyle:"italic",color:TAN,fontSize:13,lineHeight:1.65,marginBottom:16}}>Out of your head. Not today. Not forgotten.</p>

      {/* Quick capture */}
      <div style={{marginBottom:24,background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderRadius:2,padding:"14px 14px 12px"}}>
        <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:10,opacity:0.8}}>✦ Quick Capture</div>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&quickAdd()}
          placeholder="What needs to get done..."
          style={{width:"100%",padding:"10px 12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.8)",fontFamily:"Georgia,serif",fontSize:14,color:INK,outline:"none",borderRadius:2,marginBottom:10}}
        />
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {SHELF_TIMEFRAMES.map(tf=>(
            <button key={tf.id} onClick={()=>setTimeframe(tf.id)}
              style={{flex:1,padding:"7px 4px",background:timeframe===tf.id?tf.color:"transparent",border:"1px solid "+(timeframe===tf.id?tf.color:TANL),color:timeframe===tf.id?"white":TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:10,borderRadius:2,transition:"all 0.2s"}}>
              {tf.label}
            </button>
          ))}
        </div>
        <button onClick={quickAdd} style={{width:"100%",padding:"9px",background:"transparent",color:INK,border:"1px solid "+INK,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>
          + Add to Shelf
        </button>
      </div>

      {/* Filter */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        <button onClick={()=>setFilter("all")} style={{padding:"5px 12px",background:filter==="all"?INK:"transparent",color:filter==="all"?"white":TAN,border:"1px solid "+(filter==="all"?INK:TANL),cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,borderRadius:2}}>
          All ({shelf.length})
        </button>
        {SHELF_TIMEFRAMES.map(tf=>(
          <button key={tf.id} onClick={()=>setFilter(tf.id)} style={{padding:"5px 12px",background:filter===tf.id?tf.color:"transparent",color:filter===tf.id?"white":TAN,border:"1px solid "+(filter===tf.id?tf.color:TANL),cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,borderRadius:2}}>
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
              {filter==="all"&&<div style={{fontSize:9,color:tf.color,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:8,opacity:0.85}}>✦ {tf.label}</div>}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {items.map(item=>(
                  <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderLeft:"3px solid "+tf.color,borderRadius:2}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:INK,lineHeight:1.4}}>{item.label}</div>
                      <div style={{fontSize:10,color:TAN,marginTop:3}}>{item.dateAdded}</div>
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      {/* Timeframe quick-change */}
                      <select value={item.timeframe} onChange={e=>changeTimeframe(item.id,e.target.value)}
                        style={{padding:"3px 6px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.7)",fontFamily:"Georgia,serif",fontSize:10,color:TAN,outline:"none",borderRadius:2,cursor:"pointer"}}>
                        {SHELF_TIMEFRAMES.map(tf=><option key={tf.id} value={tf.id}>{tf.label}</option>)}
                      </select>
                      <button onClick={()=>promote(item)}
                        style={{padding:"4px 8px",background:"transparent",color:OX,border:"1px solid "+OX,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:10,borderRadius:2,whiteSpace:"nowrap"}}>
                        → Today
                      </button>
                      <button onClick={()=>remove(item.id)}
                        style={{padding:"4px 8px",background:"transparent",color:TANL,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,borderRadius:2}}>
                        ×
                      </button>
                    </div>
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
    <div style={{position:"fixed",inset:0,background:PAPER,zIndex:300,overflowY:"auto",fontFamily:"Georgia,serif",color:INK}}>
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
        <button onClick={onClose} style={{background:"none",border:"none",color:TANL,cursor:"pointer",fontSize:13,fontFamily:"Georgia,serif",padding:0}}>← Back to Map</button>
        <div style={{fontSize:9,color:TAN,letterSpacing:"2.5px",textTransform:"uppercase"}}>Life Snapshot</div>
        <button onClick={handlePrint} style={{background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,padding:"6px 14px",borderRadius:2}}>⬇ Export PDF</button>
      </div>

      <div id="life-snapshot" style={{maxWidth:700,margin:"0 auto",padding:"28px 20px 60px"}}>
        {/* Header */}
        <div style={{borderBottom:"2px solid "+INK,paddingBottom:16,marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:9,color:OX,letterSpacing:"3px",textTransform:"uppercase",marginBottom:4}}>Steen Growth Ministries</div>
            <div style={{fontSize:26,fontWeight:"bold",color:INK,letterSpacing:"-0.5px",lineHeight:1.1}}>Life Snapshot</div>
            <div style={{fontSize:12,color:TAN,fontStyle:"italic",marginTop:4}}>{today}</div>
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
            <div key={m.label} style={{padding:"12px 10px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderTop:"3px solid "+m.color,borderRadius:2,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:"bold",color:m.color,lineHeight:1}}>{m.val}</div>
              <div style={{fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",color:INK,marginTop:4,opacity:0.7}}>{m.label}</div>
              <div style={{fontSize:10,color:TAN,marginTop:2,fontStyle:"italic"}}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Life Categories */}
        <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Life Map</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
          {cats.map(cat=>{
            const done=cat.tasks.filter(t=>t.done).length;
            const total=cat.tasks.length;
            const pct=total?Math.round(done/total*100):0;
            const open=cat.tasks.filter(t=>!t.done);
            return(
              <div key={cat.id} style={{padding:"14px 16px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderLeft:"4px solid "+cat.color,borderRadius:2}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:open.length?10:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,color:cat.color}}>{cat.icon}</span>
                    <span style={{fontSize:14,fontWeight:"bold",color:INK}}>{cat.label}</span>
                    <span style={{fontSize:11,color:TAN,fontStyle:"italic"}}>{cat.state}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    <div style={{width:60,height:4,background:"rgba(26,46,74,0.1)",borderRadius:2}}>
                      <div style={{width:pct+"%",height:"100%",background:cat.color,borderRadius:2,transition:"width 0.4s"}}/>
                    </div>
                    <span style={{fontSize:11,color:cat.color,fontWeight:"bold",minWidth:28,textAlign:"right"}}>{done}/{total}</span>
                  </div>
                </div>
                {open.length>0&&(
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    {open.map(t=>(
                      <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,paddingLeft:4}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:cat.color,flexShrink:0,opacity:0.5}}/>
                        <span style={{fontSize:12,color:INK,lineHeight:1.4}}>{t.label}</span>
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
            <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Active Prayer</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {activePrayers.slice(0,8).map(p=>{
                const tag=RTAGS.find(t=>t.id===p.relationship)||RTAGS[0];
                return(
                  <div key={p.id} style={{padding:"10px 14px",background:"rgba(255,255,255,0.55)",border:"1px solid "+FINK,borderLeft:"3px solid "+OX,borderRadius:2,display:"flex",alignItems:"flex-start",gap:10}}>
                    <span style={{fontSize:12,color:tag.color,flexShrink:0}}>{tag.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:INK,fontWeight:"bold"}}>{p.name}</div>
                      <div style={{fontSize:12,color:TAN,lineHeight:1.4,marginTop:2}}>{p.request}</div>
                    </div>
                  </div>
                );
              })}
              {activePrayers.length>8&&<div style={{fontSize:11,color:TAN,fontStyle:"italic",textAlign:"center",padding:"6px"}}>+{activePrayers.length-8} more on your prayer list</div>}
            </div>
          </div>
        )}

        {/* Shelf snapshot */}
        {shelf.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ The Shelf</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {SHELF_TIMEFRAMES.map(tf=>{
                const items=shelf.filter(s=>s.timeframe===tf.id);
                if(!items.length)return null;
                return(
                  <div key={tf.id}>
                    <div style={{fontSize:9,color:tf.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:5,opacity:0.85}}>— {tf.label}</div>
                    {items.slice(0,5).map(item=>(
                      <div key={item.id} style={{padding:"7px 14px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+tf.color,borderRadius:2,marginBottom:4,fontSize:12,color:INK}}>{item.label}</div>
                    ))}
                    {items.length>5&&<div style={{fontSize:11,color:TAN,fontStyle:"italic",paddingLeft:14,marginBottom:6}}>+{items.length-5} more</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Habits snapshot */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:14,opacity:0.8}}>✦ Habits Today</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {allHabits.map(h=>{
              const done=!!th[h.id];
              const str=streaks[h.id]?.count||0;
              const hcat=HCATS.find(hc=>hc.id===h.cat);
              return(
                <div key={h.id} style={{padding:"5px 10px",background:done?((hcat?.color||GRN)+"18"):"rgba(255,255,255,0.5)",border:"1px solid "+(done?(hcat?.color||GRN)+"50":FINK),borderRadius:2,fontSize:11,color:done?(hcat?.color||GRN):TAN,display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:10}}>{done?"✓":"○"}</span>
                  {h.label}
                  {str>1&&<span style={{fontSize:10,opacity:0.8}}>{str}🔥</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{borderTop:"1px solid rgba(26,46,74,0.15)",paddingTop:16,marginTop:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:10,color:TAN,fontStyle:"italic"}}>"Trust in the Lord with all your heart." — Proverbs 3:5</div>
          <div style={{fontSize:9,color:TAN,opacity:0.6,letterSpacing:"1px"}}>SGM Orientation</div>
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
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content?.find(b=>b.type==="text")?.text||"";
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
      <button onClick={suggest} disabled={aiLoad} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+GOLD,color:GOLD,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>
        {aiLoad?"◎ Planning your day…":"✦ Suggest My Day"}
      </button>
      {aiSug&&(
        <div style={{marginTop:10,padding:"14px 16px",background:GOLD+"08",border:"1px solid "+GOLD+"40",borderRadius:2}}>
          <SL c={GOLD}>Suggested Plan</SL>
          {DAYBLOCKS.map(block=>{
            const tasks=aiSug[block.id]||[];
            if(!tasks.length)return null;
            return(
              <div key={block.id} style={{marginBottom:8}}>
                <div style={{fontSize:10,color:GOLD,letterSpacing:"1px",textTransform:"uppercase",marginBottom:3}}>{block.label}</div>
                {tasks.map((t,i)=><div key={i} style={{fontSize:12,color:INK,padding:"2px 0"}}>· {t}</div>)}
              </div>
            );
          })}
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button onClick={applySug} style={{flex:1,padding:"8px",background:"transparent",color:GOLD,border:"1px solid "+GOLD,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>Apply to Week Tab</button>
            <button onClick={()=>setAiSug(null)} style={{padding:"8px 14px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,borderRadius:2}}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [cats,setCats]=useState(INIT_CATS);
  const [library,setLibrary]=useState(INIT_LIB);
  const [activeCat,setActiveCat]=useState(null);
  const [view,setView]=useState("dashboard");
  const [history,setHistory]=useState([]);
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
  const [showSnapshot,setShowSnapshot]=useState(false);

  const todayVerse=ANCH[new Date().getDay()%ANCH.length];
  const today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

  useEffect(()=>{
    function load(){
      try{const r=localStorage.getItem("sgm3-cats");if(r)setCats(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-history");if(r)setHistory(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-library");if(r)setLibrary(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-habits");if(r)setHabits(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-customhabits");if(r)setCustomHabits(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-streaks");if(r)setStreaks(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-prayers");if(r)setPrayers(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-planner");if(r)setPlanner(JSON.parse(r));}catch(e){}
      try{const r=localStorage.getItem("sgm3-shelf");if(r)setShelf(JSON.parse(r));}catch(e){}
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
    },800);
    return()=>clearTimeout(timer);
  },[cats,history,library,habits,customHabits,streaks,prayers,planner,shelf,loaded]);

  function addTask(catId){
    if(!newTask.label.trim())return;
    setCats(prev=>prev.map(cat=>cat.id!==catId?cat:{...cat,tasks:[...cat.tasks,{id:catId+Date.now(),label:newTask.label,resistance:newTask.resistance,roadblock:newTask.roadblock,done:false,steps:[]}]}));
    setNewTask({label:"",resistance:"low",roadblock:null});
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


  if(!loaded)return <div style={{minHeight:"100vh",background:PAPER,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",fontStyle:"italic",color:TAN}}>Loading…</div>;

  const aC=cats.find(c=>c.id===activeCat);
  const overall=getOverall();
  const inp={padding:"9px 12px",border:"1px solid "+TANL,background:"rgba(255,255,255,0.8)",fontFamily:"Georgia,serif",fontSize:13,color:INK,outline:"none",borderRadius:2};

  return(
    <div style={{minHeight:"100vh",background:PAPER,backgroundImage:"radial-gradient(ellipse at 60% 20%, rgba(184,149,106,0.03) 0%, transparent 60%), "+BG,fontFamily:"Georgia,serif",color:INK,paddingBottom:60}}>
      <style>{"@keyframes pulse{0%,100%{opacity:0.4;transform:scale(0.97)}50%{opacity:0.8;transform:scale(1.03)}} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeSave{0%{opacity:1}80%{opacity:1}100%{opacity:0}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} *{box-sizing:border-box;} button{transition:opacity 0.15s;} button:hover{opacity:0.82;}"}</style>

      <div style={{background:PAPER,position:"sticky",top:0,zIndex:100,borderBottom:"3px solid "+INK}}>
        <div style={{maxWidth:700,margin:"0 auto",padding:"14px 20px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <Logo size={100}/>
            <div style={{width:1,height:90,background:"rgba(26,46,74,0.15)"}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:OX,letterSpacing:"3px",textTransform:"uppercase",marginBottom:2}}>Steen Growth Ministries</div>
              <div style={{fontSize:22,fontWeight:"bold",color:INK,letterSpacing:"-0.5px",lineHeight:1.1}}>Life Orientation</div>
              <div style={{fontSize:11,color:INK,fontStyle:"italic",opacity:0.75,marginTop:3}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).replace(",", " —")}</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(26,46,74,0.12)",paddingTop:4}}>
            {[TABS_ROW1,TABS_ROW2].map((row,ri)=>(
              <div key={ri} style={{display:"flex",paddingBottom:ri===1?4:0}}>
                {row.map(tab=>{
                  const isAct=view===tab.id;
                  const ic=isAct?"white":INK;
                  return(
                    <button key={tab.id} onClick={()=>setView(tab.id)} style={{background:isAct?"rgba(122,31,31,0.06)":"none",border:isAct?"1px solid "+OX:"1px solid transparent",borderRadius:3,padding:"6px 2px 7px",cursor:"pointer",flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center",height:20}}>
                        {tab.type==="cross"?<CrossSVG color={isAct?OX:INK} size={15}/>:<span style={{fontSize:17,color:isAct?OX:INK,lineHeight:1}}>{tab.g}</span>}
                      </span>
                      <span style={{fontSize:9,letterSpacing:"0.05em",color:isAct?OX:TAN,opacity:isAct?1:0.9,lineHeight:1}}>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:700,margin:"0 auto",padding:"24px 20px 0"}}>
        <div style={{borderLeft:"3px solid "+OX,padding:"12px 18px",marginBottom:28,background:OXF}}>
          <div style={{fontSize:9,color:OX,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:6,opacity:0.8}}>Today's Anchor</div>
          <p style={{fontStyle:"italic",fontSize:14,lineHeight:1.75,margin:0}}>"{todayVerse.v}"</p>
          <p style={{color:GOLD,fontSize:12,marginTop:6,marginBottom:0}}>{todayVerse.r}</p>
        </div>

        {view==="dashboard"&&(
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <DailyMsg cats={cats} habits={habits} prayers={prayers} streaks={streaks}/>
            <div style={{display:"flex",justifyContent:"center",marginBottom:36}}>
              <div style={{textAlign:"center"}}>
                <Ring size={140} pct={overall} color="#6DDCE8" color2="#1A2E4A" sw={12} main={true}>
                  <div style={{fontSize:32,fontWeight:"bold",color:INK,lineHeight:1,letterSpacing:"-1px"}}>{overall}%</div>
                  <div style={{fontSize:9,color:TAN,letterSpacing:"2px",textTransform:"uppercase",marginTop:3}}>Today</div>
                </Ring>
                <div style={{marginTop:10,fontSize:13,fontStyle:"italic",color:GOLD}}>Overall Orientation</div>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <button onClick={()=>setShowSnapshot(true)} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid "+INK,color:INK,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:14}}>◎</span> Life Snapshot
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
                  <div key={cat.id} onClick={()=>setActiveCat(isAct?null:cat.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 6px",cursor:"pointer",background:isAct?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.25)",border:"1px solid "+(isAct?cat.color:FINK),borderRadius:2,transition:"all 0.2s"}}>
                    <Ring size={56} pct={pct} color={cat.color} color2={cat.color2||"#6DDCE8"} sw={4}><span style={{fontSize:13,color:cat.color}}>{cat.icon}</span></Ring>
                    <div style={{marginTop:6,fontSize:9,fontWeight:"bold",color:INK,textAlign:"center",lineHeight:1.2}}>{cat.label}</div>
                    <div style={{fontSize:9,color:TAN,marginTop:2}}>{cat.tasks.filter(t=>t.done).length}/{cat.tasks.length}</div>
                  </div>
                );
              })}
            </div>
            {aC&&(
              <div style={{background:"rgba(255,255,255,0.6)",border:"1px solid "+FINK,borderTop:"3px solid "+aC.color,padding:"18px 16px",marginBottom:20,borderRadius:2,animation:"fadeIn 0.3s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:17,fontWeight:"bold",color:aC.color}}>{aC.icon} {aC.label}</div>
                    <div style={{fontStyle:"italic",fontSize:13,color:INK,marginTop:2,opacity:0.7}}>{aC.state}</div>
                  </div>
                  <button onClick={()=>setActiveCat(null)} style={{background:"none",border:"none",color:TAN,cursor:"pointer",fontSize:20}}>x</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {aC.tasks.map(task=>(
                    <div key={task.id} style={{background:task.done?aC.color+"0D":"rgba(255,255,255,0.75)",border:"1px solid "+(task.done?aC.color+"30":FINK),borderRadius:2,overflow:"hidden"}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px"}}>
                        <div onClick={()=>toggleTask(aC.id,task.id)} style={{width:20,height:20,borderRadius:"50%",flexShrink:0,marginTop:1,cursor:"pointer",border:"2px solid "+(task.done?aC.color:TANL),background:task.done?aC.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {task.done&&<span style={{color:"white",fontSize:10}}>v</span>}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,color:task.done?TAN:INK,textDecoration:task.done?"line-through":"none",lineHeight:1.4}}>{task.label}</div>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                            <RDot level={task.resistance}/>
                            {task.roadblock&&<span style={{fontSize:10,color:OX,fontStyle:"italic"}}>{task.roadblock}</span>}
                            {task.steps&&task.steps.length>0&&<span style={{fontSize:10,color:aC.color}}>{task.steps.filter(s=>s.done).length}/{task.steps.length} steps</span>}
                          </div>
                        </div>
                        {!task.done&&<button onClick={()=>setProjectView({catId:aC.id,taskId:task.id})} style={{background:"transparent",border:"1px solid "+aC.color+"50",color:aC.color,padding:"3px 8px",cursor:"pointer",fontSize:10,fontFamily:"Georgia,serif",flexShrink:0,whiteSpace:"nowrap",borderRadius:2}}>Break down</button>}
                      </div>
                      {task.steps&&task.steps.length>0&&(
                        <div style={{height:2,background:FINK,margin:"0 12px 8px"}}>
                          <div style={{height:"100%",background:aC.color,width:Math.round(task.steps.filter(s=>s.done).length/task.steps.length*100)+"%",transition:"width 0.3s"}}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {addingTask?(
                  <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
                    <input autoFocus value={newTask.label} onChange={e=>setNewTask(n=>({...n,label:e.target.value}))} placeholder="Task name..." onKeyDown={e=>e.key==="Enter"&&addTask(aC.id)} style={{...inp,width:"100%"}}/>
                    <div style={{display:"flex",gap:8}}>
                      <select value={newTask.resistance} onChange={e=>setNewTask(n=>({...n,resistance:e.target.value}))} style={{...inp,flex:1}}>
                        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                      </select>
                      <select value={newTask.roadblock||""} onChange={e=>setNewTask(n=>({...n,roadblock:e.target.value||null}))} style={{...inp,flex:1}}>
                        <option value="">No roadblock</option>
                        {Object.keys(SCVS).map(k=><option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>addTask(aC.id)} style={{flex:1,padding:"9px",background:aC.color,color:"white",border:"none",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Add Task</button>
                      <button onClick={()=>setAddingTask(false)} style={{padding:"9px 16px",background:"transparent",color:TAN,border:"1px solid "+TANL,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,borderRadius:2}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <button onClick={()=>setAddingTask(true)} style={{marginTop:10,width:"100%",padding:"8px",background:"transparent",border:"1px dashed "+TANL,color:TAN,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,fontStyle:"italic",borderRadius:2}}>+ Add task</button>
                )}
              </div>
            )}
          </div>
        )}

        {view==="shelf"&&<ShelfTab shelf={shelf} setShelf={setShelf} cats={cats} setCats={setCats}/>}
        {view==="prayer"&&<PrayerTab prayers={prayers} setPrayers={setPrayers}/>}
        {view==="habits"&&<HabitsTab habits={habits} setHabits={setHabits} streaks={streaks} setStreaks={setStreaks} customHabits={customHabits} setCustomHabits={setCustomHabits}/>}
        {view==="planner"&&<DayWeekTab cats={cats} planner={planner} setPlanner={setPlanner} prayers={prayers} habits={habits} shelf={shelf} history={history}/>}

        {view==="history"&&(
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <SL>Completion Log</SL>
            <p style={{fontStyle:"italic",color:TAN,fontSize:13,marginBottom:20,lineHeight:1.65}}>Proof that things get done.</p>
            {!history.length
              ?<div style={{textAlign:"center",padding:"48px",color:TAN,fontStyle:"italic"}}>Complete your first task and it will appear here.</div>
              :history.map(item=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+item.categoryColor,borderRadius:2,marginBottom:6}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,background:item.categoryColor,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontSize:11}}>v</span></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:INK}}>{item.task}</div>
                    <div style={{fontSize:11,color:TAN,marginTop:2}}>{item.category} - {item.date}</div>
                  </div>
                  <RDot level={item.resistance}/>
                </div>
              ))
            }
          </div>
        )}

        {view==="scripture"&&(
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <SL>Scripture for the Roadblocks</SL>
            <p style={{fontStyle:"italic",color:TAN,fontSize:13,marginBottom:20,lineHeight:1.65}}>Every pattern has a word from God to counter it.</p>
            {Object.entries(SCVS).map(([key,val])=>(
              <div key={key} style={{padding:"16px 18px",background:"rgba(255,255,255,0.5)",border:"1px solid "+FINK,borderLeft:"3px solid "+OX,borderRadius:2,marginBottom:10}}>
                <div style={{fontSize:9,letterSpacing:"2.5px",textTransform:"uppercase",color:OX,marginBottom:8,opacity:0.8}}>{key}</div>
                <p style={{fontStyle:"italic",fontSize:14,lineHeight:1.75,margin:0}}>"{val.v}"</p>
                <p style={{color:GOLD,fontSize:12,marginTop:6,marginBottom:0}}>{val.r}</p>
              </div>
            ))}
          </div>
        )}

        {view==="library"&&<LibraryTab library={library} setLibrary={setLibrary}/>}
        {view==="archive"&&<ArchiveTab cats={cats} library={library} prayers={prayers} habits={habits} streaks={streaks} history={history}/>}

      </div>
    </div>
  );
}
