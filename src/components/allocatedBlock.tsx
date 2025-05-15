import { useEffect } from "react";

const AllocatedBlock = (props: {id: string; index: number; size: number; blockState: any}) => {
    const {id, size, blockState} = props;
    let {index} = props;
    const [blocks, setBlocks] = blockState;

    useEffect(() => {
        console.log('allocated block here! Stage just changed!');
        for (let i = index-2; i < index + 2; i++) {
            if (i < 0 || i >= blocks.length) {
                continue;
            }
            if (id == blocks[i].id) {
                index = i;
                break;
            }
        }
    }, [blocks]);

    const handleClick = () => {
        setBlocks((prev: { isAlloc: boolean; size: number; id: string}[]) => {
            const newBlocks = [...prev];
            console.log('test', newBlocks, index);
            newBlocks[index].isAlloc = false;
            
            if (index+1 < newBlocks.length && !newBlocks[index+1].isAlloc) {
                newBlocks[index].size += newBlocks[index+1].size/2;
                newBlocks.splice(index+1, 1);
            }

            if (index-1 >= 0 && !newBlocks[index-1].isAlloc) {
                newBlocks[index].size += newBlocks[index-1].size/2;
                newBlocks.splice(index-1, 1);
            }

            return newBlocks;
        })
    }

    return (
        <div onClick={handleClick} className="h-full min-w-[20em] bg-red-200 hover:bg-red-300 border-[0.005em] border-gray-400 font-bold text-white">
            <div className="text-3xl w-full h-full flex flex-col justify-center items-center">
                <h1>Allocated Block</h1>
                <h1>Size: {size} bytes</h1>
            </div>
        </div>
    );
}
 
export default AllocatedBlock;