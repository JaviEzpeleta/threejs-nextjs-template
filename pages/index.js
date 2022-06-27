import { useState } from "react";

import { useThree } from "../hooks/useThree";
import ThreeApp from "../threejs/ThreeApp";

export default function Home() {
  const canvas = useThree(ThreeApp);

  return (
    <div className="relative">
      <div className="absolute top-0 border-2 opacity-80">
        <div className="text-red-500 bg-white w-72 m-4 p-4 rounded-md shadow-lg">
          F: flip Pepe
          <br />
          S: spin Pepe
          <br />
          ARROWS: move Pepe
          <br />
          SPACE: spin all objects
          <br />
          ENTER: move Pepe forward
          <br />
          SHIFT: move Pepe backward
        </div>
      </div>
      <div ref={canvas} />
    </div>
  );
}
