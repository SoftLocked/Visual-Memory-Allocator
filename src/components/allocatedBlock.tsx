import { Dispatch, SetStateAction, useEffect } from "react";

const AllocatedBlock = (props: {index: number; size: number; blockState: [{
    isAlloc: boolean;
    size: number;
}[], Dispatch<SetStateAction<{
    isAlloc: boolean;
    size: number;
}[]>>]}) => {
    const {size, index, blockState} = props;
    const [blocks, setBlocks] = blockState;

    useEffect(() => {
        console.log('allocated block here! Stage just changed!');
    }, [blocks]);

    const handleClick = () => {
        setBlocks((prev: { isAlloc: boolean; size: number}[]) => {
            const newBlocks = [...prev];
            console.log('test', newBlocks, index);
            newBlocks[index].isAlloc = false;
            
            if (index+1 < newBlocks.length && !newBlocks[index+1].isAlloc) {
                newBlocks[index].size += newBlocks[index+1].size;
                newBlocks.splice(index+1, 1);
            }

            if (index-1 >= 0 && !newBlocks[index-1].isAlloc) {
                newBlocks[index].size += newBlocks[index-1].size;
                newBlocks.splice(index-1, 1);
            }

            return newBlocks;
        })
    }

    return (
        <div onClick={handleClick} className="h-full min-w-[20em] bg-blue-500 hover:bg-blue-400 border-[0.005em] border-gray-400 font-bold text-white">
            <div className="text-3xl w-full h-full flex flex-col justify-center items-center">
                <h1>Allocated Block</h1>
                <h1>Size: {size} bytes</h1>
            </div>
        </div>
    );
}
 
export default AllocatedBlock;