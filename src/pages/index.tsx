import Allocator from "@/components/allocator";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <>
    <Typography variant="h2" style={{fontWeight: 700}} className="text-center w-screen pt-[1em] fixed">Interactive <span className="text-blue-400">Dynamic Memory</span> Allocator</Typography>
    <div className="h-screen flex flex-col justify-center">
      
      <Allocator/>
    </div>
    </>
  );
}
