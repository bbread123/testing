
tableNode=document.getElementById("table_Names")
outerDiv=document.getElementById("outer-div")
dayHint=document.getElementById('day-hint')
monthAndYear = document.getElementById("monthAndYear");
nextMonthButton=document.getElementById('next_month_button');
searchButton=document.getElementById("search-button");
searchValue=document.getElementById("search-value");
let firstDay = 0;
daysInMonth=31;

let data;
months=["Shrawan","Bhadra"]
current_month=months[0]
getData=async()=>{
    fileName="./"+current_month+".json";
    // response=await fetch(fileName)
    // data=await response.json()
    // //console.log(data)
    fetch(fileName).then((response)=>{
        return response.json()
    }).then((jsoned)=>{
        data=jsoned;
        showCalendar(firstDay, daysInMonth);
    }).catch((error)=>{
        data=""
        showCalendar(firstDay,daysInMonth);
    })
        
    
    
}
getData()




cellClicked=function(event){
    if(data){
    removeChild(tableNode)
    day=event.target.innerHTML;
    dayHint.innerHTML=current_month + ' ' + day;
    console.log(day)
    if(data[day]){
        generateTable(data,day,tableNode)
    }
    else{
        console.log('No data')
    }
    outerDiv.style.display='block';
}
}

function generateTable(data,day,tableNode){
    if(day==-1){
        removeChild(tableNode);
        for(i=0;i<data.length;i++){
            tr=document.createElement("tr")
            for(var key in data[i]){
                // console.log(data[i][key])
                td=document.createElement("td");
                textNode=document.createTextNode(data[i][key])
                td.appendChild(textNode)
                tr.appendChild(td)
            }
            tableNode.appendChild(tr)
        }
        
        outerDiv.style.display='block';
    }
    else{
    for(i=0;i<data[day].length;i++){
        tr=document.createElement("tr")
        for(var key in data[day][i]){
            td=document.createElement("td");
            textNode=document.createTextNode(data[day][i][key])
            td.appendChild(textNode)
            tr.appendChild(td)
            //console.log(data[day][i][key])
        }
        tableNode.appendChild(tr)
        //console.log(tableNode)
    }
}
}
function removeChild(tableNode){
    while(tableNode.hasChildNodes()){
        tableNode.removeChild(tableNode.firstChild)
    }
}


function showCalendar(firstDay, daysInMonth) {


    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = current_month + " " + "2079";

    // creating all cells

    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                cell = document.createElement("td");
                cell.setAttribute('onclick',"cellClicked(event)");
                cellText = document.createTextNode(date);
                if(data[date]){
                cell.style.color="red"
                }
                cell.appendChild(cellText)
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }


}

function back_button_clicked(){
    outerDiv.style.display='none';
}
function nextMonthClicked(){
    if(current_month == months[0]){
    firstDay=3;
    current_month=months[1];
    nextMonthButton.innerHTML="Previous month"
    getData()
    

    }
    else{
        firstDay=5;
        current_month=months[0];
        nextMonthButton.innerHTML="Nextmonth" ;
         getData()

    }
}


searchButton.addEventListener("click",(ev)=>{
    console.log("searcsdfds")
    searchTerm=searchValue.value;
    results=[]
    for(key in data){
        for(innerKey in data[key]){
           if(data[key][innerKey]["Name"].toUpperCase().includes(searchTerm.toUpperCase())){
            results.push(data[key][innerKey])
           }

            }
        }
        generateTable(results,-1,tableNode);
    }
    
)