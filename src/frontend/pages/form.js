import React, { useState } from 'react';
import { Income } from '../forms/income';
import { User } from '../forms/user';
import { Confirm } from '../forms/confirm';



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
        content = <Confirm setCurrentStep={setCurrentStep} />
      

    }
      

  return (
  <div>
    <div>
      {content}
    </div>
  </div>  
  );
}

export default Form;
