import Recipient from "../interface/Recipient";

export const EmailChip: React.FC<{ recipient: Recipient; onDelete: () => void; toBeDeleted:Boolean }> = ({
    recipient,
    onDelete,
    toBeDeleted
  }) => {
  
    return (
      <div className={`bg-zinc-200/80 border border-transparent hover:border-zinc-400 text-sm w-min py-1 rounded-full inline-flex items-center ${toBeDeleted ? "border-violet-700 text-violet-700" : "text-zinc-700"}`}>
        <div className="w-6 h-6 flex justify-center items-center text-xs rounded-full bg-violet-600 text-white font-medium ms-1">{recipient.username[0].toUpperCase()}</div>
        <span className="px-3">{recipient.username}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bg-zinc-300/40 hover:bg-zinc-300/60 rounded-full mr-1.5 cursor-pointer"
          viewBox="0 0 16 16"
          onClick={onDelete}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
    );
  };