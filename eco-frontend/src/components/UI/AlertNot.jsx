import { FaXmark } from "react-icons/fa6";

const AlertNot = ({ message, onClick, alert, show }) => {
    return (
        <div className={`absolute top-0 right-0 border-l-8 ${alert === 'error' && 'border-red-600'} ${alert === 'validate' && 'border-green-500'} rounded-xl p-3 shadow-lg text-lg font-semibold ${alert === 'error' ? 'text-red-600' : ''} ${alert === 'validate' ? 'text-green-500' : ''} flex-row-reverse gap-5 
            ${alert === 'error' ? 'bg-red-200' : ''} 
            ${alert === 'validate' ? 'bg-green-200' : ''} 
            ${show ? 'flex' : 'hidden'}
        `}>
            <FaXmark 
                className="${alert === 'error' && 'text-red-600'} ${alert === 'validate' && 'text-green-600'} text-semibold text-2xl md:text-xl cursor-pointer hover:scale-110 duration-100" 
                onClick={onClick} 
            />
            <p>{message}</p>
        </div>
    );
}

export default AlertNot;
