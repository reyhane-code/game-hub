interface Props {
    itemType: string
}

const EmptyList = ({ itemType }: Props) => {
    return <div>
        <p className="text-2xl h-[50vh] flex items-center justify-center">{`NO ${itemType} were found!`}</p>
    </div>
}



export default EmptyList