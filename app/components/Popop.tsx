import { useEffect, useRef, useState } from "react";
import Recipient from "../interface/Recipient";

interface PopupProps {
  recipients: Recipient[];
  onClose: () => void;
  style?: React.CSSProperties;
  inputValue: String;
  selectedRecipients: Recipient[];
  setSelectedRecipients: (recipients: Recipient[]) => void; // Assuming setSelectedRecipients takes an array of Recipient
}

export const Popup: React.FC<PopupProps> = ({
  recipients,
  onClose,
  style,
  inputValue,
  selectedRecipients,
  setSelectedRecipients,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(0); //This state keeps track of current recipient selected via keyboard clicks
  const [filteredRecipients, setFilteredRecipients] = useState(recipients);

  useEffect(() => {
    let filtered = recipients.filter(
      (recipient) =>
        (recipient.email.toLowerCase().includes(inputValue.toLowerCase()) ||
          recipient.username
            .toLowerCase()
            .includes(inputValue.toLowerCase())) &&
        !selectedRecipients.some(
          (selected) => selected.email === recipient.email
        )
    );
    setFilteredRecipients(filtered);
  }, [inputValue, recipients]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSelection(filteredRecipients[selected]);
      } else if (event.key === "ArrowUp") {
        if (selected !== 0) {
          setSelected(selected - 1);
        }
      } else if (event.key === "ArrowDown") {
        if (selected !== filteredRecipients.length - 1) {
          setSelected(selected + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, filteredRecipients]);

  const handleSelection = (selectedRecipient: Recipient) => {
    onClose();
    setSelected(0);
    setSelectedRecipients([...selectedRecipients, selectedRecipient]);
    setFilteredRecipients((prevFilteredRecipients) =>
      prevFilteredRecipients.filter(
        (recipient) => recipient.email !== selectedRecipient.email
      )
    );
  };

  return (
    <>
      {filteredRecipients.length >= 1 && (
        <div className="max-w-96 absolute" style={{ ...style }} ref={popupRef}>
          <div className="bg-white py-4 rounded-md shadow-lg border">
            <ul className="max-h-72 overflow-y-scroll recipientList">
              {filteredRecipients.map((recipient, index) => {
                const initials = recipient.username[0].toUpperCase();
                const isSelected = index === selected;
                return (
                  <li
                    key={recipient.email}
                    className={`py-2 text-sm hover:bg-zinc-100/80 cursor-pointer ${
                      isSelected && "bg-zinc-100"
                    }`}
                    onClick={() => handleSelection(recipient)}
                  >
                    <div className="flex items-center gap-2 px-2">
                      <div className="h-10 w-10 flex justify-center items-center rounded-full font-semibold bg-violet-600 text-white">
                        {initials}
                      </div>
                      <p className="font-medium">{recipient.username}</p>
                      <p className="text-xs text-zinc-500">{recipient.email}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
