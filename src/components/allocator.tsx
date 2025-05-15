import { useEffect, useState } from "react";
import AllocatedBlock from "./allocatedBlock"
import FreeBlock from "./freeBlock";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Allocator = () => {
    const [blocks, setBlocks] = useState<{isAlloc: boolean; size: number}[]>([
    ])

    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(blocks);
    }, [blocks]);

    const handleNewPage = () => {
        if (page >= 5) {
            return;
        }
        setPage(page => page+1);
        setBlocks((prev: { isAlloc: boolean; size: number}[]) => {
        
            const newBlocks = [...prev];
            if (newBlocks.length > 0 && !newBlocks[newBlocks.length - 1].isAlloc) {
                newBlocks[newBlocks.length - 1].size += 4096;
            } else {
                newBlocks.push(
                    {
                    isAlloc: false,
                    size: 4096,
                }
            )
            }
            
            return newBlocks;
        })
    }


    return ( 
        <div className="h-[20em] flex flex-row">
            <div className="bg-gray-400 h-full min-w-[5em] hover:bg-green-500">
            </div>
            {blocks.map((block, index) => (
                
                block.isAlloc ? <AllocatedBlock key={index} index={index} size={block.size} blockState={[blocks, setBlocks]}/> : <FreeBlock key={index} index={index} size={block.size} blockState={[blocks, setBlocks]}/>
            ))}
            <div onClick={handleNewPage} className={`${page < 5 ? 'bg-green-300 hover:bg-green-500' : 'bg-gray-400'} flex justify-center items-center h-full min-w-[5em]`}>
                {page < 5 ? <KeyboardArrowRightIcon className="min-w-[3em] min-h-[3em]"/> : <></>}
            </div>
            
        </div>
     );
}
 
export default Allocator;