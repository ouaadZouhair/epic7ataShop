import { FaXmark } from "react-icons/fa6";

const AlertNot = ({ message, onClick, alert, show }) => {
    return (
        <div className={`absolute top-0 right-0 border-2 rounded-xl p-3 shadow-lg text-lg text-white flex-row-reverse gap-5 
            ${alert === 'error' ? 'bg-red-600' : ''} 
            ${alert === 'validate' ? 'bg-green-500' : ''} 
            ${show ? 'flex' : 'hidden'}
        `}>
            <FaXmark 
                className="text-white text-bold text-2xl md:text-xl cursor-pointer hover:scale-110 duration-100" 
                onClick={onClick} 
            />
            <p>{message}</p>
        </div>
    );
}

export default AlertNot;
