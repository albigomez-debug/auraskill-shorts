import React from "react";
import { Composition } from "remotion";
import { CervezaShort } from "./videos/cerveza/Cerveza";
import { TOTAL, FPS } from "./videos/cerveza/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Cerveza" component={CervezaShort} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
