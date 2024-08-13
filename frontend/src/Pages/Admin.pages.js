import React from "react"
import "../CSS/admin.css"
import axios from "axios"
import { createContext, useContext } from 'react';

const StepContext = createContext();
const useStep = () => useContext(StepContext);




function LoginPage({setStep}){
    const [message_for_frontend , setMsg] = React.useState("")

    const emailContainer = React.useRef(null)
    const passContainer = React.useRef(null)
    

    const handleSubmit = async(e) =>{
        e.preventDefault() ;
        const email = (emailContainer.current.value)
        const password = (passContainer.current.value)

       try {
        alert("please wait, process may take 4-5 seconds")
         const response = await axios.post("https://flashcards-gqs1.onrender.com/api/admin/login", { email, password }, { withCredentials: true })

            if(response.status === 200){
                setStep((prev)=>prev+1)
            }

            setMsg(response.data.message)

            console.log("Logged in")

            emailContainer.current.value = ""
            passContainer.current.value = ""

       } catch (error) {
            console.log(`error : ${error}`)
            setMsg( "Invalid Email or Password")
            alert(error)
            console.log(error.stack)
       }
    }

    return(
        <div className="login_page">
                <div className="left">
                    <div className="left_header heading">
                        <p>FlashCards <span> Admin</span></p>
                    </div>
                    <div className="left_content">
                        <div className="left_container">
                            <div className="bold heading">Log in</div>
                            <div className="login_form">
                                <span><p>E-Mail address</p></span>
                                <input ref={emailContainer} className="email" type="email" placeholder="admin" />
                                <span><p>Password</p></span>
                                <input  ref={passContainer} className="password" type="password" placeholder="admin" />
                                <p className="login_info">
                                    <p>{message_for_frontend}</p>
                                </p>
                                <button onClick={handleSubmit} className="sign_up_btn" >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="right_content">
                        <div className="right_container"></div>
                    </div>
                </div>
        </div>
    )
}

function Header(){
    return(
        <div className="left_header heading">
            <p><span> FlashCards </span>Admin </p>
        </div>
    )
}

function AddCard(){

    const questionContainer = React.useRef(null)
    const answerContainer = React.useRef(null)
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const question = questionContainer.current.value ;
        const answer = answerContainer.current.value ; 

        if(!(question).trim() || !(answer).trim() ){
            alert("Enter both que and answer")
            return
        }else{
            try {
                alert("please wait, process may take 4-5 seconds")
                const response = await axios.post("https://flashcards-gqs1.onrender.com/api/admin/add-card" , { question, answer }, { withCredentials: true })
    
                console.log(response.data)
    
                alert(response.data.message)

                questionContainer.current.value = '';
                answerContainer.current.value = '';
    
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }

    }

    return(
        <div className="admin_right_options">
            <div className="left_header heading">
                <p><span> Add a new Card</span></p>
            </div>
            <div className="area_for_entries">
                <div className="entry">
                    <p>Question </p>
                    <input ref={questionContainer} type="text" placeholder="Enter Question"></input>
                </div>
                <div className="entry">
                    <p>Answer </p>
                    <input ref={answerContainer} type="text" placeholder="Enter Answer"></input>
                </div>
                <div className="entry ent3">
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}

function EditCard(){

    const questionContainer = React.useRef(null)
    const answerContainer = React.useRef(null)
    const findMethodContainer = React.useRef(null)
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const findMethod = findMethodContainer.current.value;
        const newQue = questionContainer.current.value ;
        const newAns = answerContainer.current.value ; 

        if(!(newQue).trim() || !(newAns).trim() || !(findMethod).trim()  ){
            alert("Enter both que and answer")
            return
        }else{
            try {
                alert("please wait, process may take 4-5 seconds")
                const response = await axios.post("https://flashcards-gqs1.onrender.com/api/admin/edit-card" , {findMethod, newQue, newAns }, { withCredentials: true })
    
                console.log(response.data)
    
                alert(response.data.message)

                answerContainer.current.value = '';
                questionContainer.current.value = '';
                findMethodContainer.current.value = '';

    
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
    }

    return(
        <div className="admin_right_options">
            <div className="left_header heading">
                <p><span> Edit Card</span></p>
            </div>
            <div className="area_for_entries">
                <div className="entry">
                    <p>Find Method </p>
                    <input ref={findMethodContainer} type="text" placeholder="Enter ID"></input>
                </div>
                <div className="entry">
                    <p>Question </p>
                    <input ref={questionContainer} type="text" placeholder="Enter Question"></input>
                </div>
                <div className="entry">
                    <p>Answer </p>
                    <input ref={answerContainer} type="text" placeholder="Enter Answer"></input>
                </div>
                <div className="entry ent3">
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}

function DeleteCard(){

    const idContainer = React.useRef(null)
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = idContainer.current.value ;
        console.log(id)
        if(!id  ){
            alert("Enter id")
            return
        }else{
            try {
                alert("please wait, process may take 4-5 seconds")
                const response = await axios.post("https://flashcards-gqs1.onrender.com/api/admin/delete-card" , { id}, { withCredentials: true })
    
                console.log(response.data)
    
                alert(response.data.message)

                idContainer.current.value = '';
    
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
    }

    return(
        <div className="admin_right_options">
            <div className="left_header heading">
                <p><span> Delete a card</span></p>
            </div>
            <div className="area_for_entries">
                <div className="entry">
                    <p>ID </p>
                    <input ref={idContainer} type="text" placeholder="Enter Question"></input>
                </div>
                <div className="entry ent3">
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}
function Logout(){
    const { setStep } = useStep();
     
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            alert("please wait, process may take 4-5 seconds")
            const response = await axios.post("https://flashcards-gqs1.onrender.com/api/admin/logout" , { withCredentials: true })
            alert(response.data)
            setStep(0)

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return(
        <div className="admin_right_options">
            <div className="left_header heading">
                <p><span> Logout</span></p>
            </div>
            <div className="area_for_entries">
                <div className="entry">
                    <p>Confirm Logout </p>
                    <button onClick={handleSubmit} > Logout </button>
                </div>
            </div>
        </div>
    )
}

function AdminPanelMain() {
  const [option, setOption] = React.useState(0);

  function handleClickOnOptions(e) {
    setOption(Number(e.target.value));
  }

  return (
    <div className="admin_panel_main">
      <div className="admin_left_panel">
        <button
          onClick={handleClickOnOptions}
          value={0}
          className={option === 0 ? 'active' : ''}
        >
          Add a new Card
        </button>
        <button
          onClick={handleClickOnOptions}
          value={1}
          className={option === 1 ? 'active' : ''}
        >
          Edit Card
        </button>
        <button
          onClick={handleClickOnOptions}
          value={2}
          className={option === 2 ? 'active' : ''}
        >
          Delete a Card
        </button>
        <button
          onClick={handleClickOnOptions}
          value={3}
          className={option === 2 ? 'active' : ''}
        >
          Logout
        </button>
      </div>
      <div className="admin_right_panel">
        {option === 0 && <AddCard />}
        {option === 1 && <EditCard />}
        {option === 2 && <DeleteCard />}
        {option === 3 && <Logout />}
      </div>
    </div>
  );
}

function AdminPanel(){

    return(
        <div className="admin_panel">
            <Header/>
            <AdminPanelMain/>
        </div>

    )
}

function AdminPage(){

    React.useEffect(()=>{
         fetch("https://flashcards-gqs1.onrender.com").then(res=>res.json()).then(data=>console.log(data)).catch("error while loading server status")
    } , [])

    const [step , setStep] = React.useState(0)


    return(
        <StepContext.Provider value={{ step, setStep }}>
        <div className="admin_page">
             {step === 0 && <LoginPage setStep = {setStep}/>}


             {step === 1 && <AdminPanel/>}
        </div>
        </StepContext.Provider>
    )
}

export default AdminPage

