const createEmployeeRecord = (arr) =>{
    return{
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arr) =>{
    return arr.map(ele => createEmployeeRecord(ele))
}

const createTimeInEvent = (emp, t) =>{
    const [date, hour] = t.split(' ')
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    }
    emp.timeInEvents.push(timeInObj)
    return emp
}

const createTimeOutEvent = (emp, t) =>{
    const [date, hour] = t.split(' ')
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    emp.timeOutEvents.push(timeOutObj)
    return emp
}

const hoursWorkedOnDate = (emp, date) => {
    const clockIn = emp.timeInEvents.find(e => e.date === date)
    const clockOut = emp.timeOutEvents.find(e => e.date === date)
    return (clockOut.hour - clockIn.hour)/100
}

const wagesEarnedOnDate = (emp, date) => {
    return hoursWorkedOnDate(emp,date) * emp.payPerHour
}

const allWagesFor = (emp) => {
    const payArr = emp.timeOutEvents.map(e =>{
        return wagesEarnedOnDate(emp, e.date)
    })
    return payArr.reduce((a,b) =>a+b)
}

const calculatePayroll = (arr) => {
    const allPayArr = arr.map(emp => allWagesFor(emp))
    return allPayArr.reduce((a,b) => a+b)
}

const findEmployeeByFirstName = (arr, firstName) =>{
    return arr.find(emp => emp.firstName === firstName)
}