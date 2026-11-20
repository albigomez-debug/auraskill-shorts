import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/alcatraz/Short";
import { TOTAL, FPS } from "./videos/alcatraz/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Alcatraz" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
