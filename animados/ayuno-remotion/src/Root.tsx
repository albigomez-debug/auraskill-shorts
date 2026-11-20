import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/ayuno/Short";
import { TOTAL, FPS } from "./videos/ayuno/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Ayuno" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
