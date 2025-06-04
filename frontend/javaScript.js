
//time and date
function updateDateTime() {
    const now = new Date();

    
    const date = now.toLocaleDateString('en-GB');

    // Format time: HH:MM:SS AM/PM
    const time = now.toLocaleTimeString('en-US');

    document.getElementById("date").innerHTML =   date;
    document.getElementById("time").innerHTML =  time;
  }

  // Update immediately
  updateDateTime();

  // Update every second
  setInterval(updateDateTime, 1000);
// profile pic
 let pp = document.getElementById("ppic");
 let inp = document.getElementById("file-1");
 inp.onchange = function(){
   pp.src = URL.createObjectURL(inp.files[0]);
 }
 //download

  function captureScreenshot() {
      const icon = document.querySelector('.printer');
      icon.style.display = 'none'; // Hide button before capture

      html2canvas(document.body, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        icon.style.display = 'inline-block'; // Show button again
      }).catch(err => {
        alert("Screenshot failed. Check console.");
        console.error(err);
        icon.style.display = 'inline-block';
      });
    }
//show simple data

  document.getElementById("copyAddress").addEventListener("change", function () {
    const showDiv = document.getElementById("show");

    if (this.checked) {
      // Get values from the input fields
      const door = document.getElementById("door").value;
      const street = document.getElementById("Street").value;
      const village = document.getElementById("Village").value;
      const dist = document.getElementById("dist").value;
      const taluk = document.getElementById("mettupalayam").value;
      const pin = document.getElementById("pin").value;

      // Display the data
      showDiv.innerHTML = `
        <h4> Permanent Address:</h4>
        <p><strong>Door No:</strong> ${door}</p>
        <p><strong>Street Name:</strong> ${street}</p>
        <p><strong>Village/Area/City:</strong> ${village}</p>
        <p><strong>District:</strong> ${dist}</p>
        <p><strong>Taluk:</strong> ${taluk}</p>
        <p><strong>Pincode:</strong> ${pin}</p>
      `;
    } else {
      // Clear the div if unchecked
      showDiv.innerHTML = "";
    }
  });

  //drag and dropp
   const previews = document.getElementsByClassName('file-preview');

  function previewFile(event, index) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        previews[index].innerHTML = `<img src="${reader.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`;
      };
      reader.readAsDataURL(file);
    }
  }

  function dragOverHandler(event) {
    event.preventDefault();
    event.currentTarget.style.border = "2px dashed blue";
    event.currentTarget.style.backgroundColor = "#f0f8ff";
  }

  function dragLeaveHandler(event) {
    event.currentTarget.style.border = "1px solid black";
    event.currentTarget.style.backgroundColor = "white";
  }

  function dropHandler(event, index) {
    event.preventDefault();
    event.currentTarget.style.border = "1px solid black";
    event.currentTarget.style.backgroundColor = "white";

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        previews[index].innerHTML = `<img src="${reader.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">`;
      };
      reader.readAsDataURL(file);
    }
  }
//connect form 1 in data base
    const form1 = document.getElementById('form1');

    form1.addEventListener("submit",async(e)=>{
        e.preventDefault();

        const data = {
           work_ :form1[0].value,
           zone: form1[1].value,
           Organization_type :form1[2].value,
           District :form1[3].value,
           Local_Body : form1[4].value,
           Typeof_Core_Sanitary:form1[5].value, 
           NatureOf_Job:form1[6].value,
           Local_Body_last:form1[7].value

        };
         try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Server returned an error!");
    }

    const result = await response.json();
    alert(result.message || "Data submitted successfully!");
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to submit data. Please check your server.");
  }


    })

    //form 2 data store in database

    const form2  = document.getElementById("form2");
    form2.addEventListener("submit",async(e)=>{
        e.preventDefault();

        const data1 = {
            firstname:form2[0].value,
            lastname:form2[1].value,
            gardion:form2[2].value,
            dob:form2[3].value,
            health_id:form2[4].value,
            Status_:form2[5].value,
            Education:form2[6].value,
            Phone_Number:form2[7].value,
            Ration_No:form2[8].value,
            Aadhar_No:form2[9].value,
            Community:form2[10].value
            
        };
         try {
  const response1 = await fetch("http://localhost:3000/add-details", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data1)
  });

  if (!response1.ok) {
    throw new Error("Server returned an error!");
  }

  const result = await response1.json();
  alert(result.message || "Data submitted successfully!");
}  catch (error) {
  console.error("Fetch error:", error);
  alert("Failed to submit data. Please check your server.");
}
    });

    //form 3 data stored in data base
    const form3 = document.getElementById("");

   //save button
 
  function checkInputs() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        alert("Please fill all the fields!");
        return;
      }
    }
    alert("Saved successfully!");
  }



