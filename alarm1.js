// for reading input from html page
let contan= document.getElementById("alarms");
let time= document.getElementById("time");
let btn = document.getElementById("setAlarm")
let almTimesArray=[];
let count=0;
let maxValue=3;
let alarmAudio= document.getElementById("alarm-audio");
alarmAudio.src="./audiolist/WhatsApp Audio 2024-02-02 at 16.32.35_ed0a8543.mp3";
alarmAudio.load();

// for showing current time


function timeChangeFunction(){
    let curr= new Date();

    let hours=curr.getHours();
    let minutes=String(curr.getMinutes()).padStart(2,'0');
    let seconds=String(curr.getSeconds()).padStart(2,'0');
    let period = hours>12 ?"PM":"AM";

    if(hours>  12){
        hours=hours%12
    }
    hours=String(hours).padStart(2,'0');    

    currentTime= `${hours}:${minutes}:${seconds} ${period}`

   time.innerText=`${hours}:${minutes}:${seconds} ${period}`

   // for comparison between currentTime and set alarms time

   checkAlarm(currentTime);
     

}


// functionality for setting alarm by user

function alarmSetFunction(){

    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second= document.getElementById('second');

    // const{hour, minute, second}= document.forms[0];

    if(!hour.value || hour.value>12){
        alert('Hour Must be between 0 - 12 ')
        return ;
    }
    if(!minute.value || minute.value>60){
        alert('Minute must be between 0 - 60')
        return;
    }
    if(!second.value || second.value>60){
        alert('Second Must be between 0 - 60') 
        return;
    }
    
    

     let input = `${hour.value.padStart(2,'0')}:${minute.value.padStart(2,'0')}:${second.value.padStart('2',0)} ${zone.value}`
                hour.value='';
                minute.value='';
                second.value='';
                zone.value=''

                // only four alarms are allowed here
    if(almTimesArray.includes(input)){
        alert(`You cannot set multiple alarms for the same time.`)
        return;
    }

    // if count for counting alarms set by users
    if(count<maxValue){
        // creating new div alarm
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
        alarmDiv.innerHTML=`
            <span>${input}</span>
            <button class="delete-alarm">
             Delete
            </button>
             `;
             
            //  creating addEventListener when 'delet-alarm' btn click it will be deleted

             alarmDiv.querySelector(".delete-alarm").addEventListener("click",()=>{
                alarmDiv.remove();
                count--;

                const index= almTimesArray.indexOf(input);
                if(index!== -1){
                    almTimesArray.splice(index, 1);
                    
                }
             })


             // appending created alarm to HTML Element

             contan.appendChild(alarmDiv);
             count++;
             almTimesArray.push(input);


             return almTimesArray;



    }else{
        alert('You can only set a maximum of 4 Alarms')
    }
}


//  for showing alarms by user
function showAlarmFunction(){
    // getting all alarms in array format
    let alarms = contan.querySelectorAll(".alarm");
    alarms.forEach((alarm)=>{
        let deleteButton=alarm.querySelector(".delete-alarm");
        
        // removed from set HTML element delete event listener is created
        deleteButton.addEventListener('click',()=>{
            alarmDiv.remove();
            count--;
            const alarmIndex = almTimesArray.indexOf(input);
            if(alarmIndex!==-1){
                almTimesArray.splice(alarmIndex,1);
            }
        })
    })
}
showAlarmFunction();
setInterval(timeChangeFunction,1000);
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();

// if alarm time and current time are equal it will ring alarm and also it will displayed alert to wake-up
function checkAlarm(timeString){
    // alert function
    almTimesArray.forEach(alarm=>{
        // condition for comparison
        if(alarm==timeString){
            // alert 
            // for playing ringtone
            alarmAudio.play();
            alert('Time To wake-up');


            // after 33 second it will stopped
            setTimeout(function(){
                
                alarmAudio.pause();
                // reseting audio to  starting position.
                alarmAudio.currentTime=0;
            },33000 )
        }

      

    })

}









