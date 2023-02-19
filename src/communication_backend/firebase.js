// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import axios from 'axios';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebaseconfig";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "firebase/analytics";

// Initialize Firebase, auth config and database using our config data
const app = initializeApp(firebaseConfig)
const auth = getAuth();
const apiurl = 'http://ec2-18-143-108-76.ap-southeast-1.compute.amazonaws.com:3001'
const analytics = getAnalytics(app)


export async function createUserAccount(data) {
  return axios.post(`${apiurl}/signup`, data).then(res => res)
}

export async function loginUser(email, password) {
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
    const user = userCredential.user
    const token = await user.getIdToken()
    let res = await axios.get('http://ec2-18-143-108-76.ap-southeast-1.compute.amazonaws.com:3001/login',
      { headers: { authorization: `Bearer ${token}` } });
    //store token instead 
    console.log(res)
    return (res)
  }

  catch (error) {
    console.log(`${error.code}: ${error.message}`)
    alert('Login Failed. Check your email and password and try again.') //forget password
    return ('error')
  }

}

export const updateDefaultSettings = (userid, game, data) => {
  try {
    return axios.post(`${apiurl}/update/${userid}/settings/${game}`, data).then(res => res.data)
  }
  catch (e) {
    alert('Your updated settings cannot be saved at the moment. Press OK to continue playing witout syncing your settings.')
    console.log(e)
  }
}


function calculateAverage(dict) {
  let newDict = {}
  for (const [key, targetArr] of Object.entries(dict)) {
    let total = 0
    for (let i = 0; i < targetArr.length; i++) {
      total += targetArr[i]
    }
    newDict[key] = total / targetArr.length //log average back under key in the new dict 
  }
  return (newDict)
}

export const postGameData = async function (userid, game, data, calculate) {
  //test userid is legit anot 
  try {
    let banana = await getUserIdFromToken(userid)
    if (banana === 401) {
      alert('Session timed out. Please login again to ensure data is saved!')
      window.location.href = './login'
    }
  }
  catch (e) {
    //assumes if this is called, there is uid, but uid unable to convert to token, and issue is from timeout. 
    alert('Session timed out. Please login again to ensure data is saved!')
    window.location.href = './login'
  }

  if (calculate === false) {
    console.log('posting data...')
    return axios.post(`${apiurl}/update/${userid}/game-based-performance/${game}`, data).then(res => res.data)
  }
  else if (calculate !== true)
  //for square, mode to be calculated is stored in calculate
  {
    //calculate based on data
    let calculated = calculateAverage(data[calculate])

    //add to current calculations
    let resp = await getCurrentPerformance(userid, game)
    let existingCalc = resp.data
    if (!existingCalc['average'] || !existingCalc['average'][calculate]) {
      //if average does not already exist 
      if (!existingCalc['average']) { data['average'] = {} }
      //convert calculated to a dict with arrays 
      data['average'][calculate] = {}
      for (const [key, value] of Object.entries(calculated)) {
        data['average'][calculate][key] = [value]
      }
    }
    else if (existingCalc['average'][calculate]['Level'].length < 9) {
      data['average'][calculate] = existingCalc['average'][calculate]
      for (const [key, value] of Object.entries(calculated)) {
        data['average'][calculate][key].push(value)
      }
    }
    else if (existingCalc['average'][calculate]['Level'].length >= 9) {
      for (const [key, value] of Object.entries(calculated)) {
        data['average'][calculate][key].push(value)
      }
      let newCalcDict = calculateAverage(existingCalc['average'][calculate])
      for (const [key, value] of Object.entries(newCalcDict)) {
        data['average'][calculate][key] = [value]
      }
    }

    //update new arr to be empty, then post, along with updated average
    for (const [key, value] of Object.entries(data[calculate])) {
      data[calculate][key] = []
    }

    return axios.post(`${apiurl}/update/${userid}/game-based-performance/square`, data).then(res => res.data)
  }
  else if (calculate === true) {
    // calculate based on data
    let calculated = calculateAverage(data)

    let resp = await getCurrentPerformance(userid, game)
    let existingCalc = resp.data
    if (!existingCalc['average']) {
      data['average'] = {}
      for (const [key, value] of Object.entries(calculated)) {
        data['average'][key] = [value]
      }
    }//if completely non exisitent 
    else {
      data['average'] = existingCalc['average']
      let keyArr = Object.keys(data)
      let length = existingCalc['average'][keyArr[0]].length
      console.log(length)
      //push to exisiting array 
      for (const [key, value] of Object.entries(calculated)) {
        data['average'][key].push(value)
      }
      //calculate new average if > than 10 values, then store new average 
      if (length >= 9) {
        for (const [key, value] of Object.entries(calculateAverage(data['average']))) {
          data['average'][key] = [value]
        }
      }
    }
    //update new arr to be empty, then post, along with updated average
    for (const [key, value] of Object.entries(calculated)) {
      data[key] = []
    }
    return await axios.post(`${apiurl}/update/${userid}/game-based-performance/${game}`, data).then(res => res.data)
  }
}

export const getCurrentPerformance = async function (userid, game) {
  //get current performance just to post it 
  console.log('hi')
  try {
    let resp = await axios.get(`${apiurl}/getdata/${userid}/game-based-performance/${game}`).then(res => res)
    console.log(resp.data)
    if (resp.data === "") { return ({ data: null }) }
    else { return resp }
  }

  catch (error) {
    if (error.response.data === 'Error. No data available') {
      return ({ data: null })
    }
    if (error.response.status === 401) {
      alert('Session timed out. Please log in again to view this page')
      window.location.href = '/login'
      return
    }
    console.log(error.response.data)
    return (404)

  }
}

export async function addCoins(userid, coinsadded) {
  console.log('adding coins ')
  try {
    let resp = await axios.get(`${apiurl}/getdict/${userid}/user`).then(res => res.data)
    console.log(resp)
    let oldcoins = resp.coins
    let newcoins = oldcoins + coinsadded //everything here should be of type int
    axios.post(`${apiurl}/update/${userid}/user/nokey`, { ...resp, coins: newcoins }).then(res => res.data)
    //need for it to return a status, for the next await function to execute?
    return (200)
  }

  catch (error) {
    console.log(error)
    if (error.response.data === 'Error. No data available') {
      return ({ data: null })
    }
    console.log(error.response.data)
    return (404)
  }
}


export async function getDefaultSettings(userid, game) {
  try {
    return await axios.get(`${apiurl}/getdata/${userid}/settings/${game}`).then(res => res)
  }
  catch (error) {
    let message = 'Session timed out, unable to load saved settings. Press OK to proceed with default settings, or cancel to re-login.'
    if (window.confirm(message) === false) { window.location.href = './login' }
    console.log(error.response.data)
    return
  }
}

const getUserIdFromToken = async function (token) {
  try {
    console.log('converting token')
    let res = await axios.get(`${apiurl}/convertToken/${token}`).then(res => res)
    return (res.data)
  }
  catch (error) {
    console.log('unable to convert token')
    console.log(error.response.data)
    return (error.response.status)

  }
} //used for google analytics usage, separate from firebase server 

export const logUsage = async function (event_name, userid) {
  //custom params for use
  let uid = await getUserIdFromToken(userid)
  try {
    setUserProperties(analytics, { User_ID: uid })
    logEvent(analytics, event_name, {
      uid: userid
    })
  }
  catch (e) {
    console.log('unable to log properties')
    return
  }
}

export const logGame = async function (userid, game_name, game_stats) {
  let uid = await getUserIdFromToken(userid)
  try {
    setUserProperties(analytics, { User_ID: uid })
    logEvent(analytics, game_name, game_stats)
  }
  catch (e) {
    console.log('unable to log properties')
    return
  }
}

export async function updateStats(uid, game, newPerformance) {
  try {
    let banana = await getUserIdFromToken(uid)
    if (banana === 401) {
      alert('Session timed out. Please login again to ensure data is saved!')
      window.location.href = './login'
    }
  }
  catch (e) {
    //assumes if this is called, there is uid, but uid unable to convert to token, and issue is from timeout. 
    alert('Session timed out. Please login again to ensure data is saved!')
    window.location.href = './login'
  }

  const keyArr = Object.keys(newPerformance)
  let resp = await getCurrentPerformance(uid, game)
  let oldPerformance = resp.data
  if (resp.data === null) {
    let postPerformance = {}
    for (const [key, value] of Object.entries(newPerformance)) {
      postPerformance[key] = [value]
    }
    await postGameData(uid, game, postPerformance, false)
    return
  }
  else {
    if (game === 'cooking') {
      //cooking not all stats are always reflected. create new arr if does not exisit. 
      for (let i = 0; i < keyArr.length; i++) {
        let currentkey = keyArr[i]
        if (!oldPerformance[currentkey]) { oldPerformance[currentkey] = [] }
      }
    }
    for (let i = 0; i < keyArr.length; i++) {
      let currentkey = keyArr[i]
      oldPerformance[currentkey].push(newPerformance[currentkey])
    }
    let calculate
    oldPerformance[keyArr[0]].length >= 10 ? calculate = true : calculate = false
    await postGameData(uid, game, oldPerformance, calculate)
    //check calculations under post Game Data, get average?
    return

  }
}