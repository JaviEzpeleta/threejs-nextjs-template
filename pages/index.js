import { FaGithub } from "react-icons/fa";

import { useThree } from "../hooks/useThree";
import ThreeApp from "../threejs/ThreeApp";

export default function Home() {
  const canvas = useThree(ThreeApp);

  return (
    <div className="relative">
      <div className="absolute top-0 border-2 opacity-80">
        <div className="relative">
          <div className="absolute top-3 right-6">
            <a
              href="https://github.com/JaviEzpeleta/threejs-nextjs-template"
              target="_blank"
            >
              <FaGithub
                size="32"
                className="text-red-300 hover:text-red-400 transition-all"
              />
            </a>
          </div>
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
      </div>
      <div ref={canvas} />
    </div>
  );
}
