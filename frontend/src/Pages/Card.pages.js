import React from "react"
import "../CSS/CardPage.css"
import backBg from "../inverted_bg_back.png"


function CardBG(){
    return(
        <div className="card-bg c1"></div>
    )
}

function CardMain({handleFlip , front , setFront , setNumber , content , number}){
    function handlePrevious(){
        setNumber((prev)=>prev-1)
        setFront(false)
    }
    function handleNext(){
        setNumber((prev)=>prev+1)
        setFront(false)
    }
    let styles;

    if (!front) {
        styles = {
            backgroundImage : `url(${backBg})`,
            color: "white"
        };
    }
    

    return(
    <div style={styles}  onClick={handleFlip} className="card-bg c2 front_card">
        <div className="upper">
            <p className="Number">{number}</p>
            <div className="text_area">
                {front && <p>{content.question}</p>}
                {!front && <p>{content.answer}</p>}
            </div>
        </div>

        <div className="Button_area">
            <button onClick={handlePrevious}  className="previous-button" >Previous</button>
            <button onClick={handleNext} className="next-button" >Next</button>
        </div>
    </div>
    )
}

function Card({content}){

    const [front , setFront]  = React.useState(true)

    function handleFlip(){
        setFront((prev)=>!prev)
    }
    
 
    const [number , setNumber] = React.useState(0)
    if (content.length > 0 && number >= content.length) {
    setNumber(prev => prev % content.length);
    }else if(number < 0){
        setNumber(content.length - 1)
    }

    return(
        <div className="card-area">
            <CardBG/>
            <CardMain setFront={setFront} content={content[number]} handleFlip={handleFlip} number={number} setNumber={setNumber} front={front} />

        </div>
    )
}


function CardPage(){

    const [content, setContent] = React.useState([{question : "what is the powerhouse of the cell" , answer : "mitochondria"}]); 

    React.useEffect(() => {
        fetch("https://flashcards-gqs1.onrender.com/api/cards")
        .then(response => response.json())
        // .then(data=>console.log(data))
        .then(data => setContent(data.data)) 
        .catch(error => console.error("Error fetching data:", error)); 

        fetch("https://flashcards-gqs1.onrender.com").then(res=>res.json()).then(data=>console.log(data)).catch("error while loading server status")
            


    }, []); 
    

    return(
       <div className="CardPage">
        <Card content = {content} />
       </div>
    )
}

export default CardPage