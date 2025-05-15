import { Box, Button, Modal, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'var(--color-blue-300)',
    boxShadow: 24,
    p: 4,
  };

const FreeBlock = (props: {id: string; index: number; size: number; blockState: any}) => {
    const {id, size, blockState} = props;
    let {index} = props;
    const [blocks, setBlocks] = blockState;

    const [bytes, setBytes] = useState(32);
    const handleChange = (event:any, newValue:number) => {
        setBytes(newValue);
      };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log('free block here! Stage just changed!');
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

    const handleConfirm = () => {

        console.log('bytes', bytes);

        setBlocks((prev: { isAlloc: boolean; size: number; id: string}[]) => {
        
            const newBlocks = [...prev];
            newBlocks[index].size -= bytes/2;
            if (newBlocks[index].size <= bytes/2) {
                newBlocks.splice(index, 1);
            }
            newBlocks.splice(index, 0, {
                isAlloc: true,
                size: bytes,
                id: crypto.randomUUID()
            })
            
            return newBlocks;

        })

        
    }
    

    return (
        <>
        <div onClick={handleOpen} className="h-full min-w-[20em] bg-blue-200 hover:bg-blue-300 border-[0.005em] border-gray-400 font-bold text-white">
            <div className="text-3xl w-full h-full flex flex-col justify-center items-center">
                <h1>Free Block</h1>
                <h1>Size: {size} bytes</h1>
            </div>
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} className="flex flex-col">
            <Typography variant="h4" style={{"fontWeight": 700, "marginBottom": 40}} className="text-center text-white">Bytes to Allocate</Typography>
        <Slider
        aria-label="Allocation Size"
        value={bytes}
        onChange={handleChange}
        shiftStep={512}
        step={32}
        min={32}
        max={size}
        valueLabelDisplay="on"
        style={{"marginBottom": 30}}
        />
        <Button onClick={handleConfirm} variant="contained" className="mt-10"><Typography style={{"fontWeight": 700}}>Allocate</Typography></Button>
        </Box>
        </Modal>
        </>
    );
}
 
export default FreeBlock;