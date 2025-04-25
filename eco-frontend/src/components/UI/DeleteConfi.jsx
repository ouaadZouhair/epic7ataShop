import { IoIosWarning } from "react-icons/io";


const DeleteConfi = ({onCancel, onDelete, title}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="absolute top-5 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <IoIosWarning className='text-5xl text-red-500'/>
                    <h3 className="text-xl text-center font-semibold mb-4">
                        Are you sure you want to delete <br /> "{title}"?
                    </h3>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 hover:scale-105 hover:shadow-md duration-150 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 hover:scale-105 hover:shadow-md duration-150 text-white rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfi