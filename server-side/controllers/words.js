const fs = require("fs");

const getSelectedWords = async (req, res) => {
  try {
    //read word list form TestData file
    const fileText = fs.readFileSync("TestData.json", "utf8");
    let testData = JSON.parse(fileText);
    let wordList = testData.wordList;

    let selectedWordList = [];
    let selectedPartsOfSpeech = [];
    let selectedWordsNumber = 10

    //choose rondom values from word list
    while (selectedWordList.length < selectedWordsNumber) {
      //pick a rondom value from word list
      let randomIndex = Math.floor(Math.random() * wordList.length);
      let randomWord = wordList[randomIndex];
      let randomPartOfSpeech = randomWord.pos;

      //check if the random part of speech was selected before or not
      let ValidPartOfSpeechNumber = 4
      if (selectedPartsOfSpeech.length < ValidPartOfSpeechNumber && !selectedPartsOfSpeech.includes(randomPartOfSpeech)) { 
        selectedPartsOfSpeech.push(randomPartOfSpeech);
      }

      //check the worst cases of filling the selectedWordList with words that does not contain all of part of speech types
      if (selectedWordList.length > (selectedWordsNumber-ValidPartOfSpeechNumber)) {
        //chech if a type part of speech is still not selected, and try again to force it to be selected, if it is not
        if (selectedPartsOfSpeech.length < ValidPartOfSpeechNumber) {
          continue;
        } else {
          selectedWordList.push(randomWord);
          wordList.splice(randomIndex, 1);     //remove selcted word from wordList not to repeat selected words
        }
      } else {
        selectedWordList.push(randomWord);
        wordList.splice(randomIndex, 1);
      }
    }
    res.send({ selectedWordList: selectedWordList });
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = {
  getSelectedWords,
};
