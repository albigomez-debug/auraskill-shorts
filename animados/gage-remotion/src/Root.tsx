import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/gage/Short";
import { TOTAL, FPS } from "./videos/gage/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Gage" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
