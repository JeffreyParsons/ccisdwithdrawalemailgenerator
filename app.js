// Setting variables for HTML elements
let studentName = document.getElementById('name');
let serialNumber = document.getElementById('sn');
let withdrawalDate = document.getElementById('date');
let campus = document.getElementById('campus');
let button = document.getElementById('button');
let openInEmailBtn = document.getElementById('open-email');
let timeofDay = document.getElementById('timeOfDay');
let parentEmail = document.getElementById('email');
let emailDiv = document.getElementById('emailText');
let resetBtn = document.getElementById('reset');
let windowHeight = document.body.scrollHeight;


// Event listeners for the buttons
button.addEventListener('click', generateAndUpdateUI);

resetBtn.addEventListener('click', (e) => {
    clearInputValues();
    emailDiv.innerHTML = '';
    campus.value = '';
});

openInEmailBtn.addEventListener('click', (e)=> {
    createEmail();
    generateAndUpdateUI()
});

// Sets the email template with the values from the inputs and returns the result
function generateEmail() {
    let emailText = `
    <p>Good ${timeofDay.value},</p>
    <p>Your student, ${studentName.value}, was withdrawn from ${campus.value} on ${withdrawalDate.value}.</p>
    <p>Our records indicate that ${studentName.value} has a district-issued device assigned to them, <strong>${serialNumber.value}</strong>. As a result, the $450 Technology Lost Device fee has been applied to their account in Skyward. Once this device and its charger are returned to your student's former campus, this fee will be removed.</p>
    <p>If this device has already been turned in, please give us the date, location, and name of the person with whom this device was turned in.</p>
    <p>Please let us know if you have any questions. Thank you.</p>`

    return emailText;
}

// Displays the email on screen and resets input values if all inputs are filled
function generateAndUpdateUI() {
    if (!campus.value || !studentName.value || !serialNumber.value || !withdrawalDate) {
        emailDiv.innerHTML = "Please Enter All Requested Information";
        // Scroll to bottom of page
        setTimeout(() => {
            window.scroll(0, windowHeight);
        }, 0);
        return;
    }

    emailDiv.innerHTML = generateEmail();
    
    // Scroll to bottom of page
    setTimeout(() => {
        window.scroll(0, windowHeight);
    }, 0);
    
    clearInputValues();
}


// Builds the email in plain text and opens the default email app with all info filled. Only if there are no input blanks
function createEmail() {
    if (!campus.value || !studentName.value || !serialNumber.value || !withdrawalDate || !parentEmail) {
        emailDiv.innerHTML = "Please Enter All Requested Information";
        return;
    }

    let emailBody = `Good ${timeofDay.value},%0A%0AYour student, ${studentName.value}, was withdrawn from ${campus.value} on ${withdrawalDate.value}.%0A%0AOur records indicate that ${studentName.value} has a district-issued device assigned to them, ${serialNumber.value}. As a result, the $450 Technology Lost Device fee has been applied to their account in Skyward. Once this device and its charger are returned to your student's former campus, this fee will be removed.%0A%0AIf this device has already been turned in, please give us the date, location, and name of the person with whom this device was turned in.%0A%0APlease let us know if you have any questions. Thank you.`;

    // Opens default email application due to the "mailto:" part of the attribute
    location.href = `mailto:${parentEmail.value}?subject=${studentName.value} CCISD Laptop Not Returned&body=${emailBody}`;
}

// Resets all input fields except for Campus and Time of Day
function clearInputValues() {
    studentName.value = '';
    serialNumber.value = '';
    withdrawalDate.value = '';
    parentEmail.value = '';

    // Scroll to top of page
    window.scroll(0, 0);
}