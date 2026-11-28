import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/babuino/Short";
import { TOTAL, FPS } from "./videos/babuino/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Babuino" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
