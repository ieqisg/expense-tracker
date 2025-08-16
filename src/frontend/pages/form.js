import React, { useState } from 'react';
import { Income } from '../forms/income';


function Form() {

    const [currentStep, setCurrentStep] = useState(1)
    

    const handleNext = () => {
        setCurrentStep(currentStep+1)
        console.log(currentStep)
    }

    const handlePrev = () => {
        setCurrentStep(currentStep-1)
        console.log(currentStep)
    }


  return (
    <Income />
  );
}

export default Form;
