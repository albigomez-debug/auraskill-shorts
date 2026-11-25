import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin24/Short";
import { TOTAL, FPS } from "./videos/pimpin24/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin24" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
