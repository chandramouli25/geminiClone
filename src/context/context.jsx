import { createContext, useState } from "react";
import runBot from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index,nextword)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextword);
        },200*index)
    };
    
    const newChat =()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let responses;
        if (prompt !== undefined){
            responses = await runBot(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            responses = await runBot(input)
        }
       
        
        
        let responseArray = responses.split("**");
        console.log('new array ', responseArray)
        let newResponse=""; 
        for(let i=0 ; i<responseArray.length;i++){
            if(i== 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<br> <b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i=0 ;i<newResponseArray.length ;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setResultData(newResponse2)
        // console.log("res",responses,"drs",resultData)
        setLoading(false)
        setInput("")

    }
    // onSent("what is react js")
    // const onSent = async (prompt) => {
    //     setResultData(""); // Clear previous result data
    //     setLoading(true); // Set loading state to true
    //     setShowResult(true); // Show the result container
    //     setRecentPrompt(input); // Store the current input as recent prompt
    //     setInput(""); // Clear input field
    
    //     try {
    //         const responses = await runBot(input); // Run the bot with input
    //         setResultData(responses); // Set result data with bot response
    //         console.log("res", responses);
    //     } catch (error) {
    //         console.error("Error in onSent:", error);
    //         setResultData("An error occurred. Please try again.");
    //     } finally {
    //         setLoading(false); // Ensure loading is set to false after completion
    //     }
    // };
    
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return (<Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>)
}

export default ContextProvider;