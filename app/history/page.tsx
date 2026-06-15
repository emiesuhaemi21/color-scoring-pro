"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function HistoryPage() {

const pathname = usePathname();

const [reports,setReports] =
useState<any[]>([]);

const [openMenu,
setOpenMenu] =
useState<number | null>(null);


// LOAD REPORT

useEffect(()=>{

const stored =
localStorage.getItem(
"color-scoring-reports"
);

if(stored){

setReports(
JSON.parse(stored)
);

}

},[]);


// NORMALIZE DATA

const normalizedReports =
reports.map((report)=>({

...report,

customer:

report.customer ||

report.jobInfo?.customer ||

"Unknown Customer",

item:

report.item ||

report.jobInfo?.item ||

"Unknown Item",

rollNo:

report.rollNo ||

report.jobInfo?.rollNo ||

"001",

createdAt:

report.createdAt ||

report.date,

}));


// GROUP CUSTOMER

const groupedReports =
normalizedReports.reduce(

(acc,report)=>{

const customer =
report.customer;

const item =
report.item;

if(!acc[customer]){

acc[customer] = {};

}

if(!acc[customer][item]){

acc[customer][item]=[];

}

acc[customer][item]
.push(report);

return acc;

},

{} as Record<
string,
Record<string,any[]>
>

);


// DELETE

const deleteReport = (
id:number
)=>{

const filtered =
reports.filter(
report=>
report.id !== id
);

setReports(filtered);

localStorage.setItem(

"color-scoring-reports",

JSON.stringify(
filtered
)

);

};


return(

<main className="
min-h-screen
bg-[#111827]
text-white
p-5
">

{/* TOP NAV */}

<div className="
flex
flex-wrap
gap-3
mb-8
">

<a

href="/"

className={`
border
px-4
py-3
rounded-2xl

${
pathname==="/"

? "bg-cyan-500"

: "bg-[#1F2937]"
}

`}

>

Home

</a>

<a

href="/new-report"

className="
bg-[#1F2937]
border
border-gray-700
px-4
py-3
rounded-2xl
"

>

New Report

</a>

<a

href="/color-library"

className="
bg-[#1F2937]
border
border-gray-700
px-4
py-3
rounded-2xl
"

>

Color Library

</a>

<a

href="/history"

className="
bg-cyan-500
border
border-cyan-400
px-4
py-3
rounded-2xl
"

>

History

</a>

<a

href="/settings"

className="
bg-[#1F2937]
border
border-gray-700
px-4
py-3
rounded-2xl
"

>

Settings

</a>

</div>


{/* HEADER */}

<div className="mb-8">

<h1 className="
text-4xl
font-bold
">

History

</h1>

<p className="
text-gray-400
mt-2
">

Saved QC Reports

</p>

</div>


{/* EMPTY */}

{reports.length===0 &&(

<div className="
bg-[#1F2937]
rounded-3xl
p-6
text-center
">

No Saved Reports

</div>

)}


{/* CUSTOMER */}

<div className="space-y-8">

{Object.entries(

groupedReports

).map(

([customer,items])=>(

<div

key={customer}

>

<h2 className="
text-2xl
font-bold
mb-4
">

{customer}

</h2>


{/* ITEM */}

{Object.entries(

items as Record<string, any[]>

).map(

([item, rolls]) => (


<div

key={item}

className="
bg-[#1F2937]
rounded-3xl
p-5
mb-5
border
border-gray-700
"

>

<h3 className="
text-cyan-400
font-bold
text-lg
mb-4
">

{item}

</h3>


{/* ROLL */}

<div className="
space-y-3
">

{rolls.map(

(report:any)=>(

<div

key={report.id}

className="
flex
justify-between
items-center
border-b
border-gray-700
pb-3
"

>

<div className="
flex
items-center
gap-6
">

<div>

Roll

{report.rollNo}

</div>

<div className="
text-sm
text-gray-400
">

{new Date(

report.createdAt

).toLocaleString()}

</div>

<div className="
flex
items-center
gap-2
">

<div

className={`
w-3
h-3
rounded-full

${

report.totalScore >=95

? "bg-green-500"

: report.totalScore >=90

? "bg-yellow-500"

: report.totalScore >=80

? "bg-orange-500"

: "bg-red-500"

}

`}

/>

<span>

{report.totalScore}

</span>

</div>

</div>


<div className="
relative
">

<button

onClick={()=>

setOpenMenu(

openMenu===report.id

? null

: report.id

)

}

className="
text-2xl
text-gray-400
"

>

⋮

</button>


{openMenu===

report.id &&(

<div className="
absolute
right-0
top-10
bg-[#111827]
border
border-gray-700
rounded-xl
w-32
z-50
overflow-hidden
">

<button

onClick={()=>

window.location.href=

`/report/${report.id}`

}

className="
w-full
p-3
text-left
hover:bg-gray-700
"

>

View

</button>


<button

onClick={()=>

window.location.href=

`/measurement?copy=${report.id}`

}

className="
w-full
p-3
text-left
hover:bg-gray-700
text-cyan-400
"

>

Add Roll

</button>


<button

onClick={()=>

window.location.href=

`/measurement?edit=${report.id}`

}

className="
w-full
p-3
text-left
hover:bg-gray-700
"

>

Edit

</button>


<button

onClick={()=>

deleteReport(
report.id
)

}

className="
w-full
p-3
text-left
text-red-400
hover:bg-gray-700
"

>

Delete

</button>

</div>

)}

</div>

</div>

)

)}

</div>

</div>

)

)}

</div>

)

)}

</div>

</main>

);

}