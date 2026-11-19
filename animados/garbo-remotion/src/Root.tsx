import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/garbo/Short";
import { TOTAL, FPS } from "./videos/garbo/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Garbo" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
