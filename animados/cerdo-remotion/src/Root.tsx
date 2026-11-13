import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/cerdo/Short";
import { TOTAL, FPS } from "./videos/cerdo/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Cerdo" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
