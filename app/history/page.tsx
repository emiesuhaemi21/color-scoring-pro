"use client";



import {Search,Users,Calendar,Star,Upload,Download} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function HistoryPage() {

const pathname = usePathname();

const [reports,setReports] =
useState<any[]>([]);


const [openMenu,
setOpenMenu] =
useState<number | null>(null);


const [favorites,
setFavorites] =
useState<number[]>([]);

const [favoriteOnly,
setFavoriteOnly] =
useState(false);

const [showFavorite,
setShowFavorite] =
useState(false);

const [showImport,
setShowImport] =
useState(false);

const [showSearch,setShowSearch] =
useState(false);

const [showCustomer,setShowCustomer] =
useState(false);

const [showDate,setShowDate] =
useState(false);

const [search,setSearch] =
useState("");

const [customerFilter,
setCustomerFilter] =
useState("all");

const [dateFilter,
setDateFilter] =
useState("");


// LOAD REPORT



useEffect(()=>{

const stored =

localStorage.getItem(

"favorite-reports"

);

if(stored){

setFavorites(

JSON.parse(stored)

);

}

},[]);

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

const customers = [

"all",

...new Set(

normalizedReports.map(

r => r.customer

)

)

];

const filteredReports =

normalizedReports.filter(

report => {

const matchFavorite =

!favoriteOnly

||

favorites.includes(
report.id
);    

const matchSearch =

search === ""

||

report.item

.toLowerCase()

.includes(

search.toLowerCase()

)

||

report.customer

.toLowerCase()

.includes(

search.toLowerCase()

);

const matchCustomer =

customerFilter === "all"

||

report.customer ===

customerFilter;

const matchDate =

dateFilter === ""

||

new Date(

report.createdAt

)

.toISOString()

.slice(0,10)

=== dateFilter;

return (

matchSearch

&&

matchCustomer

&&

matchDate

);

}

);


// GROUP CUSTOMER

const groupedReports =
filteredReports.reduce(

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

const importReport = (
e:any
)=>{

const file =

e.target.files?.[0];

if(!file) return;

const reader =

new FileReader();

reader.onload =

(event)=>{

try{

const imported = JSON.parse(
  String(event.target?.result)
);

// validasi file

if(

imported.fileType !==

"ColorScoringReport"

){

alert(

"Invalid CSR file"

);

return;

}

const newReport =

imported.report;


// ambil report yang ada

const currentReports =

JSON.parse(

localStorage.getItem(

"color-scoring-reports"

)

||

"[]"

);


// cek duplikat id

const duplicate =

currentReports.some(

(r:any)=>

r.id === newReport.id

);

if(duplicate){

alert(

"Report already exists"

);

return;

}


const updated = [

...currentReports,

newReport

];


// simpan

localStorage.setItem(

"color-scoring-reports",

JSON.stringify(
updated
)

);


// refresh halaman

setReports(
updated
);

alert(

"Import success"

);

}catch{

alert(

"File CSR tidak valid"

);

}

};

reader.readAsText(
file
);

};

const exportReport = (report:any) => {

const exportData = {

fileType:
"ColorScoringReport",

version:
"1.0",

exportedAt:
new Date().toISOString(),

report

};

const blob =

new Blob(

[

JSON.stringify(

exportData,

null,

2

)

],

{

type:
"application/json"

}

);

const url =

URL.createObjectURL(
blob
);

const a =

document.createElement(
"a"
);

a.href = url;

a.download =

`${report.customer}_${report.item}_${report.rollNo}.csr`;

a.click();

URL.revokeObjectURL(
url
);

};

// DELETE

const toggleFavorite =

(id:number)=>{

const updated =

favorites.includes(id)

? favorites.filter(

f => f !== id

)

: [

...favorites,

id

];

setFavorites(updated);

localStorage.setItem(

"favorite-reports",

JSON.stringify(updated)

);

};

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

href="/customer"

className="
bg-[#1F2937]
border
border-gray-700
px-4
py-3
rounded-2xl
"

>

Customer

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

My Report

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

My Report

</h1>

<p className="
text-gray-400
mt-2
">

My saved reports

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

{/* TOOLBAR */}

<div className="
flex
gap-3
mb-6
flex-wrap
">

<button

onClick={()=>

setShowSearch(
!showSearch
)

}

className="
bg-[#1F2937]
p-3
rounded-xl
"

>

<Search size={18}/>

</button>


<button

onClick={()=>

setShowCustomer(
!showCustomer
)

}

className="
bg-[#1F2937]
p-3
rounded-xl
cursor-pointer
"

title="Search item Report"

>

<Users size={18}/>

</button>


<button

onClick={()=>

setShowDate(
!showDate
)

}

className="
bg-[#1F2937]
p-3
rounded-xl
cursor-pointer
"

title="Search Date Report"

>

<Calendar size={18}/>

</button>

<button

onClick={()=>

setFavoriteOnly(
!favoriteOnly
)

}

className={`
p-3
rounded-xl


${
favoriteOnly

? "bg-yellow-500"

: "bg-[#1F2937]"
}

`}

>

<Star size={18}/>

</button>


<label

className="
bg-[#1F2937]
p-3
rounded-xl
cursor-pointer
"

title="Import Report"

>

<Upload size={18}/>

<input

type="file"

accept=".csr"

hidden

onChange={importReport}

/>

</label>

</div>

{/* SEARCH */}

{showSearch && (

<input

type="text"

placeholder="🔍 Search customer atau item"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="
w-full
mb-4
bg-[#1F2937]
border
border-gray-700
p-3
rounded-xl
outline-none
"

/>

)}


{/* CUSTOMER */}

{showCustomer && (

<select

value={customerFilter}

onChange={(e)=>

setCustomerFilter(
e.target.value
)

}

className="
w-full
mb-4
bg-[#1F2937]
border
border-gray-700
p-3
rounded-xl
"

>

{customers.map(

customer=>(

<option

key={customer}

value={customer}

>

{customer}

</option>

)

)}

</select>

)}


{/* DATE */}

{showDate && (

<input

type="date"

value={dateFilter}

onChange={(e)=>

setDateFilter(
e.target.value
)

}

className="
w-full
mb-6
bg-[#1F2937]
border
border-gray-700
p-3
rounded-xl
"

/>

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

<button

onClick={()=>

toggleFavorite(
report.id
)

}

className="
text-yellow-400
"

>

<Star

size={18}

fill={

favorites.includes(
report.id
)

? "currentColor"

: "none"

}

/>

</button>

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

onClick={()=>{

exportReport(
report
);

setOpenMenu(
null
);

}}

className="
w-full
text-left
px-4
py-2
hover:bg-gray-700
"

>

Export Report

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