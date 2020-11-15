var events = [
    {
        id: 1,
        name: "Tết dương lịch",
        dateEvents: new Date(2021, 1, 1),
        status: "vacation",
    },
    {
        id: 2,
        name: "Valentine",
        dateEvents: new Date(2021, 2, 14),
        status: "celebrate",
    },
    {
        id: 3,
        name: "Quốc tế phụ nữ",
        dateEvents: new Date(2021, 3, 8),
        status: "celebrate",
    },
    {
        id: 4,
        name: "Thành lập Đoàn TNCS HCM",
        dateEvents: new Date(2021, 3, 26),
        status: "celebrate",
    },
    {
        id: 5,
        name: "Giải phóng miền Nam- thống nhất đát nước",
        dateEvents: new Date(2021, 4, 30),
        status: "vacation",
    },
    {
        id: 6,
        name: "Quốc tế lao động",
        dateEvents: new Date(2021, 5, 1),
        status: "vacation",
    },
    {
        id: 7,
        name: "Quốc tế thiếu nhi",
        dateEvents: new Date(2021, 7, 27),
        status: "celebrate",
    },
    {
        id: 8,
        name: "Quốc khánh",
        dateEvents: new Date(2021, 9, 2),
        status: "vacation",
    },
    {
        id: 9,
        name: "Phụ nữ việt nam",
        dateEvents: new Date(2021, 10, 20),
        status: "celebrate",
    },
    {
        id: 10,
        name: "Nhà giáo Việt Nam",
        dateEvents: new Date(2021, 11, 20),
        status: "celebrate",
    },
]

console.log(events)
// so ngay trong 1 thang
daysInMonth = (month , year) => {
    return new Date(year , month , 0).getDate();
}

//note : first month = 0 ;
// first week : Sunday -- index 0
// last week : Saturday --- index 6
let today = new Date();
console.log(today.getDay())
// console.log(today.getMonth() + 1)
// console.log(today.getFullYear())
// console.log(today.getDate());
let todayYear = today.getFullYear();
let todayMonth = today.getMonth();
// todayMonth = todayMonth + 1;

let next = document.getElementById("next__month--name");
let previous = document.getElementById("pre__month--name");
let main = document.getElementById("main__month--name");

//calendar origin
showControl = (todayMonth , todayYear) => {

    if (todayMonth === 11) {
        main.innerHTML = todayYear + "." + (todayMonth + 1); 
        next.innerHTML = (todayYear + 1) + "." + "01";
        previous.innerHTML = todayYear + "." + todayMonth;
    }else if (todayMonth === 0) {
        main.innerHTML = todayYear + ".01"; 
        next.innerHTML = todayYear + ".02";
        previous.innerHTML = (todayYear - 1) + ".12"
    }else {
        next.innerHTML = todayYear + "." + ((todayMonth >= 8) ?  (todayMonth + 1 + 1) : ("0" + (todayMonth + 1 + 1)));
        previous.innerHTML = todayYear + "." + ((todayMonth > 9) ? (todayMonth) : ("0" + (todayMonth)));
        main.innerHTML = todayYear + "." + (todayMonth > 8 ? (todayMonth + 1) : ("0" + (todayMonth + 1)));
    }
}

showControl(todayMonth , todayYear);

//next
nextCalendar = () => {
    if(todayMonth === 11) {
        todayYear += 1;
    }else {
        todayYear = todayYear;
    }
    todayMonth = (todayMonth + 1) % 12;
    showCalendar(todayMonth , todayYear);
    showControl(todayMonth , todayYear);
}
//previous
previousCalendar = () => {
    if (todayMonth === 0) {
        todayYear -= 1;
        todayMonth = 11;
    }else {
        todayYear = todayYear;
        todayMonth = todayMonth - 1;
    }
    showCalendar(todayMonth , todayYear);
    showControl(todayMonth , todayYear);
}

showCalendar = (month , year) => {
    // Find first day of month in thu may
    let firstDayInMonth = new Date(year, month).getDay();
    let tableDate = document.getElementById("date");
    let dateStart = 1;

    tableDate.innerHTML = "";
    // a month max 31 day , min 28 day -> max 6 row
    for(let i = 0; i < 6 ; i++) {
        
        let row = document.createElement("tr");
        
        for (let j = 0; j < 7; j++) {
            let column = document.createElement("td");
            let columnTxt;
            if (i === 0 && j < firstDayInMonth) {
                columnTxt = document.createTextNode("");
                column.appendChild(columnTxt);

            } else if (dateStart > daysInMonth(month + 1 , year)) {
                break;
            } else {
                columnTxt = document.createTextNode(dateStart);
                if(dateStart === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    column.classList.add("today");
                }
                column.appendChild(columnTxt);
                for(let {name: n , status : s , dateEvents: d} of events) {
                    if(dateStart === d.getDate() && month === d.getMonth() - 1){
                        let eventDays = document.createElement("span");
                        let eventName = document.createTextNode(n);
                        eventDays.appendChild(eventName);
                        column.appendChild(eventDays);
                        if( s === "vacation") {
                            eventDays.classList.add("vacation");
                        }else if(s === "celebrate"){
                            eventDays.classList.add("celebrate");
                        }
                    }
                }
                dateStart++;
            }

            if (j === 6) {
                column.classList.add("saturday");
            }
           
            column.classList.add("aday");
            column.appendChild(columnTxt);
            row.appendChild(column);
        }
        tableDate.appendChild(row);
    }
}

showCalendar(todayMonth , todayYear)
