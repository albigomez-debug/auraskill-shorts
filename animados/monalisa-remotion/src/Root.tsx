import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/monalisa/Short";
import { TOTAL, FPS } from "./videos/monalisa/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Monalisa" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
