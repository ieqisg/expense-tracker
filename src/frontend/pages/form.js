import React, { useState } from 'react';
import { Income } from '../forms/income';
import { User } from '../forms/user';
import { Expenses } from '../forms/expenses';


function Form() {

    const [currentStep, setCurrentStep] = useState(1)

    let content;

    switch (currentStep) {
      case 1:
        content = <User setCurrentStep={setCurrentStep} />
        break;
      case 2:
        content = <Income setCurrentStep={setCurrentStep} />
        break
      case 3:
        content = <Expenses setCurrentStep={setCurrentStep} />

    }
      

  return (
    
    <div>
      {content}
    </div>
  );
}

export default Form;
