const fs = require("fs");

function validateScore(score) {
  const regex = /^(100|[1-9][0-9]|[0-9])$/; //regex to validate score is digit and between 0 to 100
  if (regex.test(score)) {
    return true;
  } else {
    return false;
  }
}

const getRank = async (req, res) => {
  try {
    //read scores list form TestData file
    const fileText = fs.readFileSync("TestData.json", "utf8");
    let testData = JSON.parse(fileText);
    let scoresList = testData.scoresList;

    let scoresbelowStudentScoreNumber = 0;
    let studentScore = req.body.score;
    
    if (validateScore(studentScore)) {
      //calculate scores below Student Score number
      scoresList.forEach((score) => {
        if (studentScore > score) {
          scoresbelowStudentScoreNumber++;
        }
      });
    } else {
      return res.status(500).send("server error");
    }

    //calculate rank
    let allScoresNumber = scoresList.length;
    let rank = Math.round(
      (scoresbelowStudentScoreNumber / allScoresNumber) * 100 );

    return res.send({ rank: rank });
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = {
  getRank,
};
