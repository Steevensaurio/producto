const BtnForm = ({label, onClick}) => {
    return (
        <div className="flex flex-col space-y-4 w-full items-end">
            <button 
                type="submit"
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                    border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={onClick}
            >
            {label}
            </button>
        </div>
    )
}

export default BtnForm