import React, { useState } from "react";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const [age, setAge] = useState<string>("null");
  const [sex, setSex] = useState<string>("null");
  const [restingBP, setRestingBP] = useState<string>("null");
  const [cholesterol, setCholesterol] = useState<string>("null");
  const [fastingBloodSugar, setFastingBloodSugar] = useState<string>("null");
  const [maxHR, setMaxHR] = useState<string>("null");
  const [exerciseInducedAngina, setExerciseInducedAngina] = useState<string>("null");
  const [oldPeak, setOldPeak] = useState<string>("null");
  const [chestPainType, setChestPainType] = useState<string>("null");
  const [restingECG, setRestingECG] = useState<string>("null");
  const [ST_Slope, setST_Slope] = useState<string>("null");

  const handleInputChange: React.ChangeEventHandler<
  HTMLInputElement | HTMLSelectElement
> = (event) => {
  const { name, value } = event.target;
  
  switch (name) {
    case "age":
      setAge(value);
      break;
    case "sex":
      setSex(value);
      break;
    case "restingBP":
      setRestingBP(value);
      break;
    case "cholesterol":
      setCholesterol(value);
      break;
    case "fastingBloodSugar":
      setFastingBloodSugar(value);
      break;
    case "maxHR":
      setMaxHR(value);
      break;
    case "exerciseInducedAngina":
      setExerciseInducedAngina(value);
      break;
    case "oldPeak":
      setOldPeak(value);
      break;
    case "chestPainType":
      setChestPainType(value);
      break;
    case "restingECG":
      setRestingECG(value);
      break;
    case "ST_Slope":
      setST_Slope(value);
      break;
    default:
      break;
  }
};


// check if all the fields are filled
const [resultMessage, setResultMessage] = useState("");



const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  // Get the form data from state
  const formData = { age, sex, restingBP, cholesterol, fastingBloodSugar, maxHR, exerciseInducedAngina, oldPeak, chestPainType, restingECG, ST_Slope };

  

  // Convert the form data to the desired format
  const convertedData = [
    Number(age),
    sex === "Male" ? 1 : sex === "Female" ? 0 : null,
    Number(restingBP),
    Number(cholesterol),
    fastingBloodSugar === "Yes" ? 1 : fastingBloodSugar === "No" ? 0 : null,
    Number(maxHR),
    exerciseInducedAngina === "Yes" ? 1 : exerciseInducedAngina === "No" ? 0 : null,
    Number(oldPeak),
    chestPainType === "ASY" ? [1, 0, 0, 0] : chestPainType === "ATA" ? [0, 1, 0, 0] : chestPainType === "NAP" ? [0, 0, 1, 0] : chestPainType === "TA" ? [0, 0, 0, 1] : [null, null, null,null],
    restingECG === "LVH" ? [1, 0, 0] : restingECG === "Normal" ? [0, 1, 0] : restingECG === "ST" ? [0, 0, 1] : [null, null, null],
    ST_Slope === "Down" ? [1, 0, 0] : ST_Slope === "Flat" ? [0, 1, 0] : ST_Slope === "Up" ? [0, 0, 1] : [null, null, null],
  ].flat();

  const nullFields = Object.values(formData).some((value) => value === "null");

  // If any fields are empty, display an alert and return
  if (nullFields) {
    alert("Please fill out all form fields");
    return;
  }
// Send the form data to the API endpoint
fetch("http://127.0.0.1:8000/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(convertedData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const prob = parseFloat(Object.keys(data.result)[0]);
    // alert(prob);
    let message;
    if (isNaN(prob)) {
      message = "The model could not make a prediction";
    } else if (prob > 0.65) {
      message = "The model predicted that the person is not likely to have heart disease, with a risk of only " + (100 - (prob * 100)).toFixed(2) + "%";
    } else if (prob >= 0.5) {
      message = `The model predicted that the person is at low risk of heart disease (${(100 - (prob * 100)).toFixed(2)}%).`;
    } else {
      message = `The model predicted that the person has a risk of heart disease (${(100 - (prob * 100)).toFixed(2)}%) and should seek medical attention.`;
    }
    setResultMessage(message);
  })
  .catch((error) => {
    console.error(error);
    setResultMessage("An error occurred. Please try again later.");
});

};





  return (
    <div className="main-container">
      <h1>Heart Failure Prediction</h1>
    <div className="form-container">
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>
        Age:
        <input
          className="form-input"
          type="number"
          name="age"
          value={age}
          onChange={handleInputChange}
        />
      </label>
      <br />
      
    <label>
      Sex:
      <select
        className="form-input"
        name="sex"
        value={sex}
        onChange={handleInputChange}
      >
        <option value="">--Please choose an option--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </label>

        <br />
        <label>
        Resting Blood Pressure:
        <input
          className="form-input"
          type="number"
          name="restingBP"
          value={restingBP}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Cholesterol:
        <input
          className="form-input"
          type="number"
          name="cholesterol"
          value={cholesterol}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Fasting Blood Sugar:
        <select
          className="form-input"
          name="fastingBloodSugar"
          value={fastingBloodSugar}
          onChange={handleInputChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>

      <br />
      <label>
      Maximum Heart Rate:
        <input
          className="form-input"
          type="number"
          name="maxHR"
          value={maxHR}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Exercise-Induced Angina:
        <select
          className="form-input"
          name="exerciseInducedAngina"
          value={exerciseInducedAngina}
          onChange={handleInputChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <br />
      <label>
        Oldpeak:
        <input
          className="form-input"
          type="number"
          name="oldPeak"
          value={oldPeak}
          placeholder="The ST depression induced by exercise relative to rest"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Chest Pain Type:
        <select
          className="form-input"
          name="chestPainType"
          value={chestPainType}
          onChange={handleInputChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="ASY">ASY</option>
          <option value="ATA">ATA</option>
          <option value="NAP">NAP</option>
          <option value="TA">TA</option>
        </select>
      </label>
      <br />
      <label>
        Resting ECG:
        <select
          className="form-input"
          name="restingECG"
          value={restingECG}
          onChange={handleInputChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="LVH">LVH</option>
          <option value="Normal">Normal</option>
          <option value="ST">ST</option>
        </select>
      </label>
      <br />
      <label>
        ST Slope:
        <select className="form-input" name="ST_Slope" value={ST_Slope} onChange={handleInputChange}>
          <option value="">--Please choose an option--</option>
          <option value="Down">Down</option>
          <option value="Flat">Flat</option>
          <option value="Up">Up</option>
        </select>
      </label>
      <br/>
      </div>
      <br/>
      <div>
      <button type="submit" className="submit-button-green" >Submit</button>
      </div>
      <br/>
      <div id="result">{resultMessage}</div>
    </form>
    </div>
    </div>
  );
};

export default App;
     
