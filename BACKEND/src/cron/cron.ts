import  { CronJob } from 'cron';
import https from 'https';

const job = new CronJob('*/14 * * * *', () => {
    console.log('running every 14 minutes');

    https.get(`${process.env.API_LINK}api/health`, (res) => {
        console.log(res.statusCode);
    }).on('error', (error) => {
        console.error("Error", error);
    });
});


export default job;


//CRON EXPLANATION 

//CRON JOBS ARE SCHEDULED TASKS THAT RUN PERIODICALLY AT FIXED INTERVALLS
//WE WANT TO SEND 1 GET REQUEST FOR EVERY 14 MINUTES 


// HOW TO DEFINE "SCHEDULE" ? 

// YOU DEFINE A SCHEDULE USING A CRON EXPRESSION , WHICH CONSISTES OF 5 FIELDS REPRESENTING:

//MINUTE, HOUR, DAY OF THE MONTH, DATA OF THE WEEK 

// * 14 * * * * => EVERY 14 MINUTES