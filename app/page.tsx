"use client";
import React, { useEffect, useRef, useState } from "react";
import Recipient from "./interface/Recipient";
import { EmailChip } from "./components/EmailChip";
import { Popup } from "./components/Popop";



const exampleRecipients: Recipient[] = [
  { email: "john.doe@example.com", username: "johndoe" },
  { email: "jane.smith@example.com", username: "janesmith" },
  { email: "alexander.wang@example.com", username: "alexwang" },
  { email: "emily.jones@example.com", username: "emilyjones" },
  { email: "david.white@example.com", username: "davidwhite" },
  { email: "susan.miller@example.com", username: "susanmiller" },
  { email: "ryan.jackson@example.com", username: "ryanjackson" },
  { email: "natalie.chen@example.com", username: "nataliechen" },
  { email: "matthew.brown@example.com", username: "matthewbrown" },
  { email: "olivia.kim@example.com", username: "oliviakim" },
  { email: "william.wilson@example.com", username: "williamwilson" },
  { email: "lily.smith@example.com", username: "lilysmith" },
  { email: "daniel.robinson@example.com", username: "danielrobinson" },
  { email: "ava.anderson@example.com", username: "avaanderson" },
  { email: "ethan.hall@example.com", username: "ethanhall" },
];


const RecipientInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isDeletionActivitated, setIsDeletionActivated] = useState(false); // This state will be used to style and delete chip on the click of backspace


  useEffect(() => {
    handleOpenPopup();
  }, [inputValue])
  

  const handleClosePopup = () => {
    setShowPopup(false);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue.length < 1 && selectedRecipients.length >=1) {
      if(isDeletionActivitated){
        handleChipDelete(selectedRecipients[selectedRecipients.length-1].email)
      }else{
        setIsDeletionActivated(true);
        setTimeout(() => {
          setIsDeletionActivated(false);
        }, 3000);
      }
    }
  };

  const handleChipDelete = (id: string) => {
    const updatedRecipients = selectedRecipients.filter(
      (recipient) => recipient.email !== id
    );
    setSelectedRecipients(updatedRecipients);
    setShowPopup(false);
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleOpenPopup = () => {
    const inputElement = document.getElementById("recipientInput"); // Replace 'your-input-id' with the actual ID of your input element
    if (inputElement) {
      const rect = inputElement.getBoundingClientRect();
      setPopupPosition({ top: rect.bottom, left: rect.left });
      setShowPopup(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col mx-auto mt-6 rounded-lg bg-white shadow-sm border w-full sm:w-[520px] p-3">
        <p className="text-sm text-zinc-500 mb-2">To</p>
        <div className="flex flex-wrap gap-2">
        {selectedRecipients.map((recipient, index) => (
          <EmailChip
            key={recipient.email}
            recipient={recipient}
            onDelete={() => handleChipDelete(recipient.email)}
            toBeDeleted={isDeletionActivitated && (selectedRecipients.length -1 === index) && inputValue.length < 1}
            
          />
        ))}
        <input
          id="recipientInput"
          type="text"
          value={inputValue}
          onClick={handleOpenPopup}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          placeholder="Type email here"
          className="outline-none py-1 grow"
        />
        </div>

      </div>
      {showPopup && (
        <Popup
          recipients={exampleRecipients}
          onClose={handleClosePopup}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          inputValue={inputValue}
          selectedRecipients={selectedRecipients}
          setSelectedRecipients={setSelectedRecipients}
        />
      )}

    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <RecipientInput />    </div>
  );
};

export default Home;
