const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
bookName = document.querySelector(".chapter .name"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter");

function randomVerse(){
    // add class change button
    quoteBtn.classList.add("loading")
    quoteBtn.innerHTML ="Loading Verse..."
    // fetching random quotes/data from thd API and parsing it into JS object
    fetch("https://labs.bible.org/api/?passage=random&type=json&callback").then(res => res.json()).then(result =>{
        quoteText.innerHTML = result[0].text;
        console.log(quoteText);
        bookName.innerHTML =result[0].bookname + " "+ result[0].chapter+ ":" +result[0].verse;
        quoteBtn.innerHTML ="New Verse";
        // when verses show remove loading class
        quoteBtn.classList.remove("loading")
    });
}
soundBtn.addEventListener("click", ()=>{
    // the SpeechSynthesisUtterance is a web speech api that represent a speech request 
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} ${bookName.innerHTML}`);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", ()=>{
   navigator.clipboard.writeText(quoteText.innerHTML+bookName.innerHTML);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerHTML+bookName.innerHTML}`
    window.open(tweetUrl, "_blank");
 });

quoteBtn.addEventListener("click", randomVerse);