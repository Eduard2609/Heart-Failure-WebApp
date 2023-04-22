export const predictHeartDisease = (convertedData: number[]) => {
    return fetch("http://127.0.0.1:8000/predict", {
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
      const prob = parseFloat(Object.keys(data.result)[0]);
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
      return message;
    })
    .catch((error) => {
      console.error(error);
      return "An error occurred. Please try again later.";
    });
  };
  