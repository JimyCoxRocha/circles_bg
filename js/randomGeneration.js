/// Colocar un espacio por cada generación de por lo menos de 100
import { LocalStorageBG } from "./localStorage.js";
import { Config } from "../config/config.js";

const POSITION_ELEMENTS = Config.LSStorage.CIRCLE_POSITION_ELEMENTS;
const CIRCLES_SHOWN = Config.LSStorage.CIRCLES_SHOWN;
const LS_CIRCLES_REPEAT_SHOWS = Config.LSStorage.CIRCLES_REPEAT_SHOWS;
const MAX_ITERATION = Config.randomGeneration.MAX_ITERATION;


window.onload = function () {
    LocalStorageBG.RemoveKeyStorage(POSITION_ELEMENTS);
    LocalStorageBG.RemoveKeyStorage(CIRCLES_SHOWN);
    LocalStorageBG.RemoveKeyStorage(LS_CIRCLES_REPEAT_SHOWS);
}


const searchNewPosition = (randomHeight, randomWidth) => {
    try {
        const documetss = document.getElementsByClassName("circle-container");
        
        const storage = LocalStorageBG.GetData(POSITION_ELEMENTS);
        if(!storage){
            return false;
        }else{
            
            for (var i = 0; i < documetss.length; i++) {
                 
                if( !documetss[i].firstElementChild?.style?.display || documetss[i].firstElementChild.style.display !== "none"){
                    const AHeight = (documetss[i].style.top.split("px"))[0];
                    const AWidth = (documetss[i].style.left.split("px"))[0];

                    const BWidth = randomWidth;
                    const BHeight = randomHeight;
                    
                    if (
                        (AWidth > (BWidth + window.innerHeight * 0.25) || AWidth < (BWidth + window.innerHeight))
                        &&
                        (AHeight > (BHeight + window.innerHeight * 0.25) || AHeight < (BHeight + window.innerHeight))
                    ){
                        continue;
                    }
                    return true;
                }
            }
            return false;
        }
        
    } catch (error) {
        return false;
    }
}


const availablePosition = () => {
 //   Math.random() * (max - min) + min;
    const heigthMax = (window.innerHeight - (window.innerHeight * 0.30));
    const widthMax = (window.innerWidth - (window.innerWidth * 0.20));
    const heigthMin = (window.innerHeight * 0.02);
    const widthMin = (window.innerWidth * 0.02);
    console.log(innerWidth, (window.innerWidth * 0.05))
    let counter = 0;
    let randomHeight = 0;
    let randomWidth = 0;
    do {
        if(counter >= MAX_ITERATION){
            console.log("break;");
            break;
        }
        randomHeight = Math.floor(Math.random() * (heigthMax - heigthMin));
        randomWidth = Math.floor(Math.random() * (widthMax - widthMin));
        counter += 1;
        
    } while (searchNewPosition(randomHeight, randomWidth));
    return [ randomHeight, randomWidth];
}




export const circleShowPosition = availablePosition;