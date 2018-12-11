document.addEventListener('DOMContentLoaded', () => {
  console.log('sup?')
  const placesURL = 'http://localhost:3000/api/v1/places'
  const usersURL = 'http://localhost:3000/api/v1/users'
  const userDiv = document.getElementById('user-div')
  const placeDiv = document.getElementById('all-places')
  const dayList = document.getElementById('day-list')
  const userPlaceURL = 'http://localhost:3000/api/v1/user_places'
  const userForm = document.getElementById('login-form')
  const usernameField = document.getElementById('username-field')
  const emailField = document.getElementById('email-field')
  let currentUser = null
  const searchForm = document.getElementById('search-form')
  const searchField = document.getElementById('search-field')
  const locationField = document.getElementById('location-field')
  const yelpURL = 'https://api.yelp.com/v3/businesses/search'
  const yelpKey = 'C-x_sT5fVGWeJLcB0wpHaz4bq_zyv-5dTpUlGedFHSCnZRliChGUnzQGKBSvHzeNNpTORuion9CsuES4rjRckkxue44GZ_9zBKO1kDed2pBv4LIUszbpjHCTDerNW3Yx'


  fetchPlaces()
  // fetchUsers ()
  // fetchDay()

  function fetchPlaces() {
    fetch(placesURL, {mode: 'cors'})
    .then(res => res.json())
    .then(showPlaces)
  }

  function fetchUsers() {
    fetch(usersURL)
    .then(res => res.json())
    .then(showUser)
  }

  // function fetchList(e) {
  //   let placeID = e.target.dataset.id
  //   fetch(`${placesURL}/${placeID}`)
  //   .then(res => res.json())
  //   .then(addToDay)
  // }

  // function fetchDay() {
  //   fetch(userPlaceURL)
  //   .then(res => res.json())
  //   .then(showOldPlaces)
  // }

  // function showUsers (users) {
  //   users.forEach(showUser)
  // }

  // searchForm.addEventListener('submit', fetchYelp)
  //
  // function fetchYelp(e){
  //   e.preventDefault()
  //   let searchParams = searchField.value
  //   let location = locationField.value
  //   fetch(`${yelpURL}?term=${searchParams}&location=${location}`,
  //     {mode: 'no-cors',
  //     headers: {
  //   'Authorization': `Bearer ${yelpKey}`}
  // })
  //   .then(console.log)

  // }

  function showUser(user) {
    console.log(user)

    userDiv.innerHTML = ''

    userDiv.dataset.id= user.user.id

    userDiv.innerHTML +=  `
    <h3> ${user.user.username} </h3>
    `
    showOldPlaces(user.userPlaces)

  }

  function showPlaces(places) {
    places.forEach(showPlace)
  }

  function showPlace(place) {
    const placeCard = document.createElement('div')

    placeCard.innerHTML = `
    <h2>${place.name}</h2>
    <h3>${place.address}</h3>
    <p>${place.description}</p>
    <button id='place-button' data-id=${place.id} type="button" name="button">Add to My Day</button>
    `
    placeDiv.append(placeCard)

    const placeBtn = placeCard.querySelector('#place-button')

    placeBtn.addEventListener('click', addToDay)

  }

  function addToDay(e) {

    let userID = userDiv.dataset.id

    let placeID = e.target.dataset.id

    let data = {
      user_id: userID,
      place_id: placeID
    }

    fetch(userPlaceURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(addPlace)
    // .then(res => res.json())
    // .then(console.log)

    // let deleteBtn = listItem.querySelector('#delete-button')
    // listItem.addEventListener('click', deleteItem)
    //
    // function deleteItem() {
    // listItem.remove()
    // }
  }

  function showOldPlaces(places){
    places.forEach(addPlace)
  }

  // function fetchPlaceByID(userPlace) {
  //   console.log(userPlace)
  //   let placeID = userPlace.place_id
  //   fetch(`${placesURL}/${placeID}`)
  //   .then(res => res.json())
  //   .then(addPlace)
  // }

  function addPlace(userPlace) {
    console.log(userPlace)

    let userPlaceID = userPlace.userPlace.id
    let userID = userPlace.user.id

    let listItem = document.createElement('li')

    listItem.innerHTML = `
    <h2>${userPlace.place.name}</h2>
    <h3>${userPlace.place.address}</h3>
    <button id='delete-button' data-id=${userPlace.userPlace.id} type="delete" name="button">Remove</button>
    `

    dayList.append(listItem)

    const deleteBtn = listItem.querySelector('#delete-button')
    deleteBtn.addEventListener('click', deletePlaceFromList)

    function deletePlaceFromList() {
      console.log('deleting...')
      fetch(`${userPlaceURL}/${userPlaceID}`, {
        method:'DELETE'
      })
      listItem.remove()
    }
  }

  userForm.addEventListener('submit', createUser)

  function createUser (e){
    e.preventDefault()
    console.log('hey')
    let username = usernameField.value
    let email = emailField.value
    let data = {username, email}

    fetch(usersURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(showUser)
    // .then(myUserObj => {
    //   if(currentUser === null) {
    //     showUser(myUserObj)
    //   } else {
    //     currentUser = null
    //   }
    // })
    clearForm()
  }

  function clearForm() {
    usernameField.value = ''
    emailField.value = ''
  }



  // LOAD OLD PLACES FUNCTIONS

  // function showDay(places) {
  //   console.log(places)
  //   places.forEach(createOldPlace)
  // }

  // function fetchPreviousPlace() {
  //   console.log('this will work soon')
  //
  //   let placeID = place.place_id
  //
  //   fetch(`${placesURL}/${placeID}`)
  //   .then(res => res.json())
  //   .then(createOldPlace)
  // }
  //
  // function createOldPlace(place){
  //
  //   let listItem = document.createElement('li')
  //
  //
  //   listItem.innerHTML = `
  //   <h2>${place.name}</h2>
  //   <h3>${place.address}</h3>
  //   <button id='delete-button' data-id=${place.id} type="delete" name="button">Remove</button>
  //   `
  //
  //   dayList.append(listItem)
  // }

    // LOAD OLD PLACES FUNCTIONS










})
