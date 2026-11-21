import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/karansebes/Short";
import { TOTAL, FPS } from "./videos/karansebes/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Karansebes" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
