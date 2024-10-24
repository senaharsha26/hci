
// Modal Image Gallery
function onclick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}
document.querySelectorAll('.course button').forEach(button => {
  button.addEventListener('click', function () {
    alert('Course clicked');
  });
});

// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  console.log(mySidebar);
  if (mySidebar.style.display === 'none') {
    mySidebar.style.display = 'block';
  } else {
    mySidebar.style.display = 'none';
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
}

const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const signupModal = document.getElementById("signupModal");
const signUpBtn = document.getElementById("signUpBtn");
const joinBtn = document.getElementById("joinBtn");
const closeModal = document.getElementById("close");
const signUpCloseModal = document.getElementById("signUpClose");

const body = document.body;

// Open the modal and apply the blur effect
loginBtn.onclick = function (e) {
  e.preventDefault(); // Prevent default link behavior
  modal.style.display = "block"; // Show the modal
  body.classList.add("blurred"); // Add blur effect
}
signUpBtn.onclick = function (e) {
  e.preventDefault(); // Prevent default link behavior
  signupModal.style.display = "block"; // Show the modal
  body.classList.add("blurred"); // Add blur effect
}

joinBtn.onclick = function (e) {
  e.preventDefault(); // Prevent default link behavior
  signupModal.style.display = "block"; // Show the modal
  body.classList.add("blurred"); // Add blur effect
}

// Close the modal
closeModal.onclick = function () {
  modal.style.display = "none"; // Hide the modal
  body.classList.remove("blurred"); // Remove blur effect
}

signUpCloseModal.onclick = function () {
  signupModal.style.display = "none" // Hide the modal
  body.classList.remove("blurred"); // Remove blur effect
}


window.addEventListener('click', function (event) {
  // Close modal when clicking outside of it
  if (event.target == modal || event.target == signupModal) {
    modal.style.display = "none";
    signupModal.style.display = "none";
    body.classList.remove("blurred");
  }

  // Close the dropdown if the user clicks outside of it
  if (!event.target.matches('i.fa.fa-user-circle-o') && event.target !== modal && event.target !== signupModal ) {
    document.getElementById("dropdownMenu").style.display = 'none';
}
});
document.getElementById("profile-section").style.display = 'none';

function toggleDropdown() {
  document.getElementById("dropdownMenu").style.display = 'block';
  // Toggle the dropdown visibility
  document.getElementById("dropdownMenu").classList.toggle("show");
} 

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json())
    .then(data => {
      const userDetails = data.userDetails;

      if (data.message === "Login successful") {
        modal.style.display = 'none';
        body.classList.remove("blurred");
        alert("Logged in successfully");
        document.getElementById("loginForm").reset();
        document.getElementById("auth-section").style.display = 'none';
        document.getElementById("profile-section").style.display = 'block';
        document.getElementById('user-name').textContent = userDetails.fName + " " + userDetails.lName;
      } else {
        alert("Login failed: " + data.message);
      }
    });

});

document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault();
  // Get the form data
  const fName = document.getElementById('fName').value;
  const lName = document.getElementById('lName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prepare data to send
  const data = { fName: fName, lName: lName, email: email, password: password };

  // Send data using fetch
  fetch('http://localhost:8000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Send as JSON
    },
    body: JSON.stringify(data) // Convert JS object to JSON string
  })
    .then(response => response.json()) // Parse JSON from response
    .then(data => {
      console.log('Success:', data);
      signupModal.style.display = "none" // Hide the modal
      body.classList.remove("blurred"); // Remove blur effect
      alert("Sign up successful!");
      document.getElementById("signupForm").reset();
      document.getElementById("auth-section").style.display = 'none';
      document.getElementById("profile-section").style.display = 'block';
      document.getElementById('user-name').textContent = fName + " " + lName;
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Error signing up.");
    });
});

const videoSection = document.querySelector('div');
const loader = document.querySelector('.loader-box');
function getData() {
const apiKey = 'AIzaSyDpqggWxO8rxBxg2j-mZn-LYJoWK1Pm34c';
const channelId = 'UCWv7vMbMWH4-V0ZXdmDpPBA';
const uploadId = 'UUWv7vMbMWH4-V0ZXdmDpPBA'
const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UUWv7vMbMWH4-V0ZXdmDpPBA&key=${apiKey}`
//const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

fetch(url).then(res => res.json()).then(data => {
  data.items.forEach(el => {
    videoSection.innerHTML += 
    `<a target="_blank" href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="yt-video">
    <img src="${el.snippet.thumbnails.maxres.url}"/>
    <h3>${el.snippet.title}</h3>
    </a>`
  });
}).catch(err => {
  videoSection.innerHTML = `<h3>sorry ${err}</h3>`
});
}



const swiper = new Swiper('.card-slider', {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    renderBullet: function (index, className) {
      return '<li class="' + className + '"></li>';
    },
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.nextArrowBtn',
    prevEl: '.prevArrowBtn',
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
  }
});

console.log(faceapi)

const run = async () => {
  //loading the models is going to use await
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })
  const videoFeedEl = document.getElementById('video')
  console.log(videoFeedEl);
  console.log(stream);
  videoFeedEl.srcObject = stream
  //we need to load our models
  // pre-trained machine learning for our facial detection!
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.ageGenderNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  ])
  const emotions = [];
  // facial detection with points
  let interval = setInterval(async () => {
    // get the video feed and hand it to detectAllFaces method
    let faceAIData = await faceapi.detectAllFaces(videoFeedEl).withFaceLandmarks().withFaceDescriptors().withAgeAndGender().withFaceExpressions()  
    
    // ask AI to guess age and gender with confidence level
    faceAIData.forEach(face => {
      const { age, gender, genderProbability, detection, descriptor } = face
      const strongEmotions = Object.entries(face.expressions).filter(([emotion, value]) => value > 0.9);
      emotions.push(strongEmotions.length > 0 ? strongEmotions[0][0] : "")
      console.log(strongEmotions.length > 0 ? strongEmotions[0][0] : "");
    });
  }, 2000)
  const emptyEmotions = { "angry": 0, "disgusted": 0, "fearful": 0, "happy": 0, "sad": 0, "surprised": 0, "neutral": 0 };
  const frequencyMap = {};
  
  setTimeout(function() {
    clearInterval(interval);  // Stops the interval after 6 seconds
    emotions.forEach(item => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
    });
    let combined = {...emptyEmotions, ...frequencyMap};
    document.getElementById('angry').style.height = combined.angry + '%';
    document.getElementById('disgust').style.height = combined.disgusted + '%';
    document.getElementById('fear').style.height = combined.fearful + '%';
    document.getElementById('happy').style.height = combined.happy + '%';
    document.getElementById('sad').style.height = combined.sad + '%';
    document.getElementById('surprise').style.height = combined.surprised + '%';
    document.getElementById('neutral').style.height = combined.neutral + '%';

    
    console.log(combined);
}, 60000);
}

setInterval(() => {
  run()
}, 60000);

run()

getData();